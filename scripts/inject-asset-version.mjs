import { copyFileSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const publicRoot = resolve(root, "dist");

function listHtmlFiles(dir = publicRoot, prefix = "") {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      files.push(...listHtmlFiles(resolve(dir, entry.name), `${prefix}${entry.name}/`));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(`${prefix}${entry.name}`);
    }
  }
  return files;
}

const PATTERN = /(\/assets\/site\.(?:css|js))\?v=[A-Za-z0-9_.-]+/g;
const fingerprintedAssets = new Map();

for (const extension of ["css", "js"]) {
  const sourceName = `site.${extension}`;
  const sourcePath = resolve(publicRoot, "assets", sourceName);
  const contents = readFileSync(sourcePath);
  const fingerprint = createHash("sha256").update(contents).digest("hex").slice(0, 12);
  const fingerprintedName = `site.${fingerprint}.${extension}`;
  copyFileSync(sourcePath, resolve(publicRoot, "assets", fingerprintedName));
  fingerprintedAssets.set(`/assets/${sourceName}`, `/assets/${fingerprintedName}`);
}

const htmlFiles = listHtmlFiles();
let totalReplacements = 0;
const touched = [];

for (const file of htmlFiles) {
  const path = resolve(publicRoot, file);
  const before = readFileSync(path, "utf8");
  let fileReplacements = 0;
  const after = before.replace(PATTERN, (_match, asset) => {
    fileReplacements += 1;
    return fingerprintedAssets.get(asset);
  });
  if (fileReplacements > 0 && after !== before) {
    writeFileSync(path, after);
    touched.push(`${file} (${fileReplacements})`);
    totalReplacements += fileReplacements;
  }
}

if (totalReplacements === 0) {
  console.error("inject-asset-version: no ?v= placeholders found. Run check-asset-version.mjs first.");
  process.exit(1);
}

console.log("Created content-addressed assets:");
for (const [source, fingerprinted] of fingerprintedAssets) console.log(`  - ${source} -> ${fingerprinted}`);
console.log(`Injected fingerprinted asset paths into ${touched.length} file(s):`);
for (const entry of touched) console.log("  - " + entry);
console.log(`Total replacements: ${totalReplacements}.`);
