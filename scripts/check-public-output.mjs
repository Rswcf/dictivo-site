import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const publicRoot = resolve(root, "dist");

const tombstoneRoots = ["data/", "scripts/", "tmp/", ".github/"];
const tombstoneFiles = new Set([".gitignore", "README.md", "wrangler.toml"]);
const textExtensions = new Set([".html", ".js", ".css", ".vtt", ".xml", ".txt", ".json"]);
const forbiddenContent = [
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
  /来源/,
  /核对/,
  /ソース/,
  /출처/,
  /公開コード/,
  /公开代码/,
  /공개 코드/,
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
}

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
