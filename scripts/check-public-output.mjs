import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const publicRoot = resolve(root, "dist");

const tombstoneRoots = ["data/", "scripts/", "tmp/", ".github/"];
const tombstoneFiles = new Set([".gitignore", "README.md", "wrangler.toml"]);
const textExtensions = new Set([".html", ".js", ".css", ".vtt", ".xml", ".txt", ".json"]);
const forbiddenContent = [
  /href=["']\/download\/windows/i,
  /href=["']\/downloads\/Dictivo-Windows-x64/i,
  /sources checked/i,
  /source links/i,
  /source section/i,
  /facts re-?checked/i,
  /price\/trial\/privacy sources/i,
  /downloads\.json/i,
  /GitHub Release/i,
  /Lemon Squeezy/i,
  /request metadata/i,
  /machine-readable/i,
  /client-side analytics/i,
  /provider-facing/i,
  /provider details/i,
  /whisper\.cpp/i,
  /closed-source/i,
  /public-code/i,
  /source-auditable/i,
  /source available/i,
  /Cloudflare/i,
  /\bR2\b/i,
  /api token/i,
  /private github/i,
  /scripts\/generate-site/i,
  /data\/compare-pages/i,
  /tmp\//i,
  /fuentes/i,
  /fontes/i,
  /fonti/i,
  /bronnen/i,
  /Quellen/i,
  /事实核对/,
  /最后更新/,
  /来源/,
  /核对/,
  /最終更新/,
  /마지막 업데이트/,
  /Zuletzt aktualisiert/,
  /Dernière mise à jour/,
  /Última actualización/,
  /Ultimo aggiornamento/,
  /Laatst bijgewerkt/,
  /Última atualização/,
  /ソース/,
  /출처/,
  /公開コード/,
  /公开代码/,
  /공개 코드/,
];
const forbiddenCompareContent = [
  /last updated/i,
  /as of May 25, 2026/i,
  /May 25, 2026/i,
  /2026-05-25/i,
  /facts re-?checked/i,
  /事实核对/,
  /最后更新/,
  /核对/,
  /最終更新/,
  /마지막 업데이트/,
  /Zuletzt aktualisiert/,
  /Dernière mise à jour/,
  /Última actualización/,
  /Ultimo aggiornamento/,
  /Laatst bijgewerkt/,
  /Última atualização/,
];

function extension(file) {
  const index = file.lastIndexOf(".");
  return index === -1 ? "" : file.slice(index);
}

function listFiles(dir = publicRoot, prefix = "") {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const relative = `${prefix}${entry.name}`;
    if (entry.isDirectory()) {
      files.push(...listFiles(resolve(dir, entry.name), `${relative}/`));
      continue;
    }
    if (entry.isFile()) files.push(relative);
  }
  return files;
}

if (!existsSync(publicRoot)) {
  fail("Missing dist/. Run node scripts/generate-site.mjs first.");
}

const failures = [];

for (const file of listFiles()) {
  if (isLegacyTombstone(file)) {
    verifyTombstone(file);
    continue;
  }
  if (!textExtensions.has(extension(file))) continue;
  const body = readFileSync(resolve(publicRoot, file), "utf8");
  for (const pattern of forbiddenContent) {
    if (pattern.test(body)) {
      failures.push(`${file}: matched ${pattern}`);
    }
  }
  if (isComparePage(file)) {
    for (const pattern of forbiddenCompareContent) {
      if (pattern.test(body)) {
        failures.push(`${file}: matched compare-only ${pattern}`);
      }
    }
  }
}

verifyWindowsDownloadsHeldBack();

if (failures.length > 0) {
  fail(`Public output check failed:\n${failures.map((line) => `  - ${line}`).join("\n")}`);
}

console.log("Public output check passed.");

function fail(message) {
  console.error(message);
  process.exit(1);
}

function isLegacyTombstone(file) {
  return tombstoneFiles.has(file) || tombstoneRoots.some((root) => file.startsWith(root));
}

function isComparePage(file) {
  return file.startsWith("compare/") || file.includes("/compare/");
}

function verifyTombstone(file) {
  const abs = resolve(publicRoot, file);
  if (file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    const bytes = readFileSync(abs);
    if (bytes.length < 32 || bytes.length > 1024) failures.push(`${file}: unexpected tombstone image size`);
    return;
  }

  const body = readFileSync(abs, "utf8");
  const expected = file.endsWith(".mjs") || file.endsWith(".js") ? "// Not available.\n" : file.endsWith(".json") ? "{}\n" : "Not available.\n";
  if (body !== expected) failures.push(`${file}: unexpected tombstone body`);
}

function verifyWindowsDownloadsHeldBack() {
  const redirectsPath = resolve(publicRoot, "_redirects");
  if (existsSync(redirectsPath)) {
    const redirects = readFileSync(redirectsPath, "utf8");
    const forbiddenRedirects = [
      /^\/download\/windows\s+https?:\/\/\S+/im,
      /^\/download\/windows-msi\s+https?:\/\/\S+/im,
      /^\/downloads\/Dictivo-Windows-x64\.(exe|msi)\s+https?:\/\/\S+/im,
    ];
    for (const pattern of forbiddenRedirects) {
      if (pattern.test(redirects)) failures.push(`_redirects: Windows public download matched ${pattern}`);
    }
  }

  const downloadsPath = resolve(publicRoot, "downloads.json");
  if (!existsSync(downloadsPath)) return;

  const manifest = JSON.parse(readFileSync(downloadsPath, "utf8"));
  for (const artifact of manifest.artifacts ?? []) {
    if (artifact.platform !== "windows") continue;
    if (artifact.status !== "coming-later") {
      failures.push(`downloads.json: Windows artifact ${artifact.label ?? artifact.fileName} is not coming-later`);
    }
    if (/^https?:\/\/downloads\.dictivo\.app/i.test(String(artifact.url ?? ""))) {
      failures.push(`downloads.json: Windows artifact ${artifact.label ?? artifact.fileName} points at downloads.dictivo.app`);
    }
  }
}
