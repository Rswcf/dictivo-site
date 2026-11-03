import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

// Removing a section must not leave a link, a redirect or llms.txt pointing at an id
// that no longer exists. This test reads only the built site.
const dist = new URL("../../dist/", import.meta.url).pathname;
const files = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? files(path) : [path];
});
const pages = files(dist).filter((file) => file.endsWith(".html"));

// "/x/" and "/x" serve dist/x/index.html; "/x.html" serves dist/x.html.
function targetFile(path) {
  if (path.endsWith(".html")) return join(dist, path);
  return join(dist, path.replace(/\/?$/, "/"), "index.html");
}

const idCache = new Map();
function hasId(file, id) {
  if (!idCache.has(file)) {
    const ids = new Set([...readFileSync(file, "utf8").matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
    idCache.set(file, ids);
  }
  return idCache.get(file).has(id);
}

// Returns a problem description, or null when the link resolves.
function check(href, fromFile) {
  const url = new URL(href, "https://dictivo.app/");
  if (url.origin !== "https://dictivo.app") return null;
  const id = decodeURIComponent(url.hash.slice(1));
  const file = href.startsWith("#") ? fromFile : targetFile(url.pathname);
  if (!href.startsWith("#") && !/\/$|\.html$|^\/[^.]*$/.test(url.pathname)) return null; // assets, downloads, txt
  if (!existsSync(file)) return `${href}: ${file.slice(dist.length)} does not exist`;
  if (id && !hasId(file, id)) return `${href}: no id="${id}" in ${file.slice(dist.length)}`;
  return null;
}

test("every in-site link with a fragment lands on an element with that id", () => {
  let checked = 0;
  const problems = [];
  for (const file of pages) {
    for (const [, href] of readFileSync(file, "utf8").matchAll(/\shref="([^"]*#[^"]+)"/g)) {
      checked += 1;
      const problem = check(href.replaceAll("&amp;", "&"), file);
      if (problem) problems.push(`${file.slice(dist.length)} → ${problem}`);
    }
  }
  assert.ok(checked > 500, `only ${checked} fragment links found`);
  assert.deepEqual(problems, []);
});

test("every site-internal redirect points at a page, and at an id when it names one", () => {
  const rules = readFileSync(join(dist, "_redirects"), "utf8").split("\n")
    .map((line) => line.trim().split(/\s+/))
    .filter(([source, destination]) => source && !source.startsWith("#") && destination?.startsWith("/") && destination !== "/404.html");
  assert.ok(rules.length >= 20, `only ${rules.length} internal redirects found`);
  const problems = rules.map(([source, destination]) => check(destination, null) && `${source} → ${check(destination, null)}`).filter(Boolean);
  assert.deepEqual(problems, []);
});

test("every dictivo.app link with a fragment in an llms.txt lands on that id", () => {
  const llms = files(dist).filter((file) => file.endsWith("llms.txt"));
  assert.ok(llms.length >= 11, `${llms.length} llms.txt files`);
  const problems = [];
  for (const file of llms) {
    for (const [href] of readFileSync(file, "utf8").matchAll(/https:\/\/dictivo\.app\/[^\s)>\]]*#[^\s)>\]]+/g)) {
      const problem = check(href, null);
      if (problem) problems.push(`${file.slice(dist.length)} → ${problem}`);
    }
  }
  assert.deepEqual(problems, []);
});
