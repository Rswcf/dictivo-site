import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const outputPath = process.env.DICTIVO_RELEASE_OUTPUT_PATH
  ? resolve(process.env.DICTIVO_RELEASE_OUTPUT_PATH)
  : resolve(root, "data/release.json");
const owner = process.env.DICTIVO_DESKTOP_OWNER || "Rswcf";
const repo = process.env.DICTIVO_DESKTOP_REPO || "Dictivo";
const releaseTag = process.env.DICTIVO_DESKTOP_RELEASE_TAG;
// The desktop release workflow should dispatch a complete release payload to
// avoid requiring this public site repo to read the private desktop repo.
// Manual/scheduled syncs still fall back to GitHub Release metadata when a
// private-read token is available.
const downloadsHost = (process.env.DICTIVO_DOWNLOADS_HOST || "https://downloads.dictivo.app").replace(/\/+$/, "");
const existingManifest = readExistingReleaseManifest();

const apiBase = `https://api.github.com/repos/${owner}/${repo}`;
const releaseUrl = releaseTag
  ? `${apiBase}/releases/tags/${encodeURIComponent(releaseTag)}`
  : `${apiBase}/releases/latest`;

function isoDate(value = new Date()) {
  return value.toISOString().slice(0, 10);
}

async function fetchJson(url) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "dictivo-site-release-sync",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // Prefer a dedicated PAT that can read the private desktop repo; the default
  // Actions github.token is scoped to this site repo only and cannot read it.
  const token = process.env.DICTIVO_DESKTOP_TOKEN || process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub release request failed: ${response.status} ${response.statusText}\n${body}`);
  }

  return response.json();
}

function normalizeDigest(asset) {
  const digest = asset.digest || "";
  if (digest.startsWith("sha256:")) {
    return digest.slice("sha256:".length);
  }
  return digest || null;
}

const dispatchedRelease = readDispatchedRelease();
if (dispatchedRelease) {
  const manifest = manifestFromDispatch(dispatchedRelease);
  writeManifest(manifest);
  console.log(`Synced Dictivo desktop release ${manifest.tag} from repository_dispatch payload to ${outputPath}`);
  console.log(`DMG: ${manifest.dmg.fileName}`);
  if (manifest.windows) {
    console.log(`Windows EXE: ${manifest.windows.exe.fileName}`);
    console.log(`Windows MSI: ${manifest.windows.msi.fileName}`);
  }
  process.exit(0);
}

let release;
try {
  release = await fetchJson(releaseUrl);
} catch (error) {
    // Don't break the deploy if the desktop release cannot be reached: keep the
    // already-committed data/release.json, whose download URLs already point at R2.
    // DICTIVO_DESKTOP_TOKEN can still be used when GitHub API limits or repo
    // permissions require a dedicated token.
  if (existsSync(outputPath)) {
    console.warn(`⚠ Could not refresh release metadata: ${error.message}`);
    console.warn(`Keeping existing ${outputPath}. Set DICTIVO_DESKTOP_TOKEN to re-enable live refresh.`);
    process.exit(0);
  }
  throw error;
}

if (release.draft) {
  throw new Error(`Release ${release.tag_name} is a draft and should not be published on dictivo.app.`);
}

if (release.prerelease) {
  throw new Error(`Release ${release.tag_name} is a prerelease and should not be published on dictivo.app.`);
}

const tag = release.tag_name;
const version = tag?.replace(/^v/i, "");

if (!tag || !version || !/^\d+\.\d+\.\d+(?:[.-].+)?$/.test(version)) {
  throw new Error(`Unexpected release tag: ${tag || "(missing)"}`);
}

const dmg = release.assets?.find((asset) => /^Dictivo_.+_universal\.dmg$/.test(asset.name));
const windowsExe = release.assets?.find((asset) => /^Dictivo_.+_x64-setup\.exe$/.test(asset.name));
const windowsMsi = release.assets?.find((asset) => /^Dictivo_.+_x64_en-US\.msi$/.test(asset.name));

if (!dmg) {
  throw new Error(`Release ${tag} has no Dictivo_*_universal.dmg asset.`);
}

const manifest = manifestFromGitHubRelease({ release, tag, version, dmg, windowsExe, windowsMsi });

writeManifest(manifest);

console.log(`Synced Dictivo desktop release ${manifest.tag} to ${outputPath}`);
console.log(`DMG: ${manifest.dmg.fileName}`);
if (manifest.windows) {
  console.log(`Windows EXE: ${manifest.windows.exe.fileName}`);
  console.log(`Windows MSI: ${manifest.windows.msi.fileName}`);
}

function readExistingReleaseManifest() {
  if (!existsSync(outputPath)) return null;
  try {
    return JSON.parse(readFileSync(outputPath, "utf8"));
  } catch {
    return null;
  }
}

function booleanEnv(value, fallback) {
  if (value === undefined) return fallback;
  if (/^(1|true|yes|on)$/i.test(value)) return true;
  if (/^(0|false|no|off)$/i.test(value)) return false;
  return fallback;
}

function publicWindowsDownloads() {
  return booleanEnv(
    process.env.DICTIVO_PUBLIC_WINDOWS_DOWNLOADS,
    existingManifest?.publicWindowsDownloads === true,
  );
}

function writeManifest(manifest) {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(manifest, null, 2) + "\n");
}

function readDispatchedRelease() {
  const raw = process.env.DICTIVO_RELEASE_PAYLOAD;
  if (!raw) return null;

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch (error) {
    throw new Error(`DICTIVO_RELEASE_PAYLOAD is not valid JSON: ${error.message}`);
  }

  const releasePayload = payload?.release ?? payload;
  if (!releasePayload?.dmg) {
    console.log("DICTIVO_RELEASE_PAYLOAD does not contain a complete release object; falling back to GitHub release sync.");
    return null;
  }
  return releasePayload;
}

function manifestFromDispatch(payload) {
  const schema = optionalString(payload.schema, "release.schema");
  if (schema && schema !== "dictivo-site-release.v1") {
    throw new Error(`Unsupported release payload schema: ${schema}`);
  }

  const tag = requiredString(payload.tag, "release.tag");
  const version = requiredString(payload.version, "release.version");
  validateTagAndVersion(tag, version);

  const publishedAt = optionalString(payload.publishedAt, "release.publishedAt");
  const updatedAt = optionalString(payload.updatedAt, "release.updatedAt") || isoDate(publishedAt ? new Date(publishedAt) : new Date());
  const windows = normalizeWindowsPayload(payload.windows, tag);

  return {
    version,
    tag,
    channel: optionalString(payload.channel, "release.channel") || "stable",
    updatedAt,
    publishedAt: publishedAt || null,
    releaseUrl: optionalString(payload.releaseUrl, "release.releaseUrl") || null,
    publicWindowsDownloads: publicWindowsDownloads(),
    dmg: normalizeDispatchArtifact(payload.dmg, {
      label: "release.dmg",
      tag,
      filePattern: /^Dictivo_.+_universal\.dmg$/,
    }),
    windows,
  };
}

function manifestFromGitHubRelease({ release, tag, version, dmg, windowsExe, windowsMsi }) {
  return {
    version,
    tag,
    channel: "stable",
    updatedAt: isoDate(),
    publishedAt: release.published_at || null,
    releaseUrl: release.html_url,
    publicWindowsDownloads: publicWindowsDownloads(),
    dmg: {
      fileName: dmg.name,
      url: `${downloadsHost}/${tag}/${dmg.name}`,
      sha256: normalizeDigest(dmg),
      size: dmg.size || null,
    },
    windows: windowsExe && windowsMsi
      ? {
          exe: {
            fileName: windowsExe.name,
            url: `${downloadsHost}/${tag}/${windowsExe.name}`,
            sha256: normalizeDigest(windowsExe),
            size: windowsExe.size || null,
          },
          msi: {
            fileName: windowsMsi.name,
            url: `${downloadsHost}/${tag}/${windowsMsi.name}`,
            sha256: normalizeDigest(windowsMsi),
            size: windowsMsi.size || null,
          },
        }
      : null,
  };
}

function normalizeWindowsPayload(windows, tag) {
  if (windows == null) return null;
  if (typeof windows !== "object") {
    throw new Error("release.windows must be an object or null.");
  }
  if (!windows.exe || !windows.msi) {
    throw new Error("release.windows must include both exe and msi artifacts when present.");
  }
  return {
    exe: normalizeDispatchArtifact(windows.exe, {
      label: "release.windows.exe",
      tag,
      filePattern: /^Dictivo_.+_x64-setup\.exe$/,
    }),
    msi: normalizeDispatchArtifact(windows.msi, {
      label: "release.windows.msi",
      tag,
      filePattern: /^Dictivo_.+_x64_en-US\.msi$/,
    }),
  };
}

function normalizeDispatchArtifact(artifact, { label, tag, filePattern }) {
  if (!artifact || typeof artifact !== "object") {
    throw new Error(`${label} must be an object.`);
  }
  const fileName = requiredString(artifact.fileName, `${label}.fileName`);
  const url = requiredString(artifact.url, `${label}.url`);
  const sha256 = requiredString(artifact.sha256, `${label}.sha256`);
  const size = requiredPositiveInteger(artifact.size, `${label}.size`);

  if (!filePattern.test(fileName)) {
    throw new Error(`${label}.fileName has an unexpected installer name: ${fileName}`);
  }
  const expectedPrefix = `${downloadsHost}/${tag}/`;
  if (!url.startsWith(expectedPrefix)) {
    throw new Error(`${label}.url must point at ${expectedPrefix}`);
  }
  if (!/^[a-f0-9]{64}$/i.test(sha256)) {
    throw new Error(`${label}.sha256 must be a 64-character SHA-256 hex digest.`);
  }

  return {
    fileName,
    url,
    sha256: sha256.toLowerCase(),
    size,
  };
}

function validateTagAndVersion(tag, version) {
  if (!/^v\d+\.\d+\.\d+(?:[.-].+)?$/i.test(tag)) {
    throw new Error(`Unexpected release tag: ${tag}`);
  }
  if (!/^\d+\.\d+\.\d+(?:[.-].+)?$/.test(version)) {
    throw new Error(`Unexpected release version: ${version}`);
  }
  if (tag.replace(/^v/i, "") !== version) {
    throw new Error(`release.tag ${tag} does not match release.version ${version}`);
  }
}

function requiredString(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${label} must be a non-empty string.`);
  }
  return value.trim();
}

function optionalString(value, label) {
  if (value == null || value === "") return null;
  if (typeof value !== "string") {
    throw new Error(`${label} must be a string when present.`);
  }
  return value.trim();
}

function requiredPositiveInteger(value, label) {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`${label} must be a positive integer.`);
  }
  return value;
}
