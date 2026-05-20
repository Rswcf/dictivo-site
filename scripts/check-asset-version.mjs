import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const htmlFiles = readdirSync(root).filter((name) => name.endsWith(".html"));

const BARE = /\/assets\/site\.(?:css|js)(?!\?v=)/g;

const failures = [];

for (const file of htmlFiles) {
  const html = readFileSync(resolve(root, file), "utf8");
  const bare = html.match(BARE);
  if (bare) {
    failures.push(`${file}: ${bare.length} reference(s) missing ?v= cache buster: ${[...new Set(bare)].join(", ")}`);
  }
}

if (failures.length > 0) {
  console.error("Asset version check failed:");
  for (const line of failures) console.error("  - " + line);
  console.error("\nEvery /assets/site.css and /assets/site.js reference MUST include ?v=<token>.");
  console.error("The deploy workflow rewrites the token to the commit SHA; locally any token is fine.");
  process.exit(1);
}

console.log(`Asset version check passed across ${htmlFiles.length} HTML file(s).`);
