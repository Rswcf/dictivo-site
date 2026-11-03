import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

// Every class that site.css styles appears on a built page or in site.js. Dead rules made up 23%
// of site.css before 2026-11-04; this keeps them from coming back.
const dist = new URL("../../dist/", import.meta.url).pathname;
const files = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? files(path) : [path];
});
// Rendered only in states the build does not produce today.
const ELSEWHERE = new Set([
  "tier-price-was", // a crossed-out price while an introductory offer runs (data/local-offer.mjs)
  "locale-suggestion", "locale-suggestion-accept", "locale-suggestion-stay", // lib/locale-routing/suggestion.mjs
]);

test("site.css styles no class that the site never uses", () => {
  const used = new Set();
  for (const file of files(dist).filter((path) => path.endsWith(".html"))) {
    for (const match of readFileSync(file, "utf8").matchAll(/class="([^"]*)"/g)) match[1].split(/\s+/).forEach((name) => used.add(name));
  }
  const script = readFileSync(new URL("../../assets/site.js", import.meta.url), "utf8");
  const css = readFileSync(new URL("../../assets/site.css", import.meta.url), "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/url\([^)]*\)/g, "")
    .replace(/"[^"]*"/g, "");
  const styled = new Set([...css.matchAll(/\.([a-zA-Z_][\w-]*)/g)].map((match) => match[1]));
  const unused = [...styled].filter((name) => !used.has(name) && !ELSEWHERE.has(name) && !script.includes(name));
  assert.deepEqual(unused, []);
});
