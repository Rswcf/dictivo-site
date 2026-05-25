import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const outputPath = resolve(root, "data/release.json");
const owner = process.env.DICTIVO_DESKTOP_OWNER || "Rswcf";
const repo = process.env.DICTIVO_DESKTOP_REPO || "Dictivo";
const releaseTag = process.env.DICTIVO_DESKTOP_RELEASE_TAG;
// Release metadata (filename, size, digest) is read from the private GitHub
// repo, but the public download URL must point at the Cloudflare R2 mirror —
// the GitHub repo is private, so its release assets 404 for everyone but the
// owner. The release CI uploads the DMG to downloads.dictivo.app/<tag>/.
const downloadsHost = (process.env.DICTIVO_DOWNLOADS_HOST || "https://downloads.dictivo.app").replace(/\/+$/, "");

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

let release;
try {
  release = await fetchJson(releaseUrl);
} catch (error) {
  // The desktop repo is private, so the default CI github.token gets a 404.
  // Don't break the deploy: keep the already-committed data/release.json (whose
  // download URLs already point at R2). Provide DICTIVO_DESKTOP_TOKEN (a PAT
  // with read access to the private repo) to re-enable live metadata refresh.
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

if (!dmg) {
  throw new Error(`Release ${tag} has no Dictivo_*_universal.dmg asset.`);
}

const manifest = {
  version,
  tag,
  channel: "stable",
  updatedAt: isoDate(),
  publishedAt: release.published_at || null,
  releaseUrl: release.html_url,
  dmg: {
    fileName: dmg.name,
    url: `${downloadsHost}/${tag}/${dmg.name}`,
    sha256: normalizeDigest(dmg),
    size: dmg.size || null,
  },
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, JSON.stringify(manifest, null, 2) + "\n");

console.log(`Synced Dictivo desktop release ${manifest.tag} to ${outputPath}`);
console.log(`DMG: ${manifest.dmg.fileName}`);
