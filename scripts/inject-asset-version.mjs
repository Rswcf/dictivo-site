import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const root = resolve(new URL("..", import.meta.url).pathname);

function resolveVersionToken() {
  const fromEnv = process.env.GITHUB_SHA;
  if (fromEnv && /^[0-9a-f]{7,40}$/i.test(fromEnv)) {
    return fromEnv.slice(0, 12);
  }
  try {
    return execSync("git rev-parse --short=12 HEAD", { cwd: root }).toString().trim();
  } catch {
    return new Date().toISOString().slice(0, 10).replace(/-/g, "");
  }
}

const token = resolveVersionToken();
const PATTERN = /(\/assets\/site\.(?:css|js))\?v=[A-Za-z0-9_.-]+/g;

const htmlFiles = readdirSync(root).filter((name) => name.endsWith(".html"));
let totalReplacements = 0;
const touched = [];

for (const file of htmlFiles) {
  const path = resolve(root, file);
  const before = readFileSync(path, "utf8");
  let fileReplacements = 0;
  const after = before.replace(PATTERN, (_match, asset) => {
    fileReplacements += 1;
    return `${asset}?v=${token}`;
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

console.log(`Injected asset version token "${token}" into ${touched.length} file(s):`);
for (const entry of touched) console.log("  - " + entry);
console.log(`Total replacements: ${totalReplacements}.`);
