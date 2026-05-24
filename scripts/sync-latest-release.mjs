import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const outputPath = resolve(root, "data/release.json");
const owner = process.env.DICTIVO_DESKTOP_OWNER || "Rswcf";
const repo = process.env.DICTIVO_DESKTOP_REPO || "Dictivo";
const releaseTag = process.env.DICTIVO_DESKTOP_RELEASE_TAG;

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

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
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

const release = await fetchJson(releaseUrl);

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
    url: dmg.browser_download_url,
    sha256: normalizeDigest(dmg),
    size: dmg.size || null,
  },
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, JSON.stringify(manifest, null, 2) + "\n");

console.log(`Synced Dictivo desktop release ${manifest.tag} to ${outputPath}`);
console.log(`DMG: ${manifest.dmg.fileName}`);
