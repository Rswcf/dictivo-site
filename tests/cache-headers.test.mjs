import test from "node:test";
import assert from "node:assert/strict";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Cloudflare Pages applies every _headers rule that matches a path, in file order, and joins a
// header set twice with a comma. Fonts got "max-age=31536000, immutable, public, max-age=300,
// must-revalidate" that way (live, 2026-10-10). A rule's "! Cache-Control" line deletes the value
// set by earlier rules before the rule sets its own, so the long-lived rules must come after
// /assets/* and detach its Cache-Control. Source: workers-sdk asset-worker attachCustomHeaders().
const root = new URL("../", import.meta.url).pathname;
const dist = join(root, "dist");
const IMMUTABLE = "public, max-age=31536000, immutable";

function parseHeaders(text) {
  const rules = [];
  for (const line of text.split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    if (!/^\s/.test(line)) {
      rules.push({ path: line.trim(), set: {}, unset: [] });
    } else if (line.trim().startsWith("! ")) {
      rules.at(-1).unset.push(line.trim().slice(2).toLowerCase());
    } else {
      const at = line.indexOf(":");
      rules.at(-1).set[line.slice(0, at).trim().toLowerCase()] = line.slice(at + 1).trim();
    }
  }
  return rules;
}

// The same pattern syntax as Pages: "*" is a splat, ":name" matches up to the next "/".
const pattern = (path) => new RegExp(`^${path.split("*").map((part) => part.replace(/[-/\\^$+?.()|[\]{}]/g, "\\$&").replace(/:[A-Za-z]\w*/g, "[^/]+")).join(".*")}$`);
const rules = parseHeaders(readFileSync(join(root, "_headers"), "utf8"));
const matching = (path) => rules.filter((rule) => pattern(rule.path).test(path));

// Cache-Control as Pages sends it: delete on "!", set the first time, append after that.
function cacheControl(path) {
  let value;
  for (const rule of matching(path)) {
    if (rule.unset.includes("cache-control")) value = undefined;
    const set = rule.set["cache-control"];
    if (set) value = value === undefined ? set : `${value}, ${set}`;
  }
  return value;
}

// The file names inject-asset-version.mjs gives site.css and site.js at deploy time.
function fingerprintedNames() {
  const work = mkdtempSync(join(tmpdir(), "dictivo-headers-"));
  try {
    mkdirSync(join(work, "scripts"));
    mkdirSync(join(work, "dist/assets"), { recursive: true });
    copyFileSync(join(root, "scripts/inject-asset-version.mjs"), join(work, "scripts/inject-asset-version.mjs"));
    for (const path of ["assets/site.css", "assets/site.js", "index.html"]) copyFileSync(join(dist, path), join(work, "dist", path));
    execFileSync(process.execPath, [join(work, "scripts/inject-asset-version.mjs")], { stdio: "pipe" });
    return readdirSync(join(work, "dist/assets")).filter((name) => /^site\..+\.(css|js)$/.test(name)).map((name) => `/assets/${name}`);
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

test("long-lived /assets/ rules come after /assets/* and detach its Cache-Control", () => {
  const generic = rules.findIndex((rule) => rule.path === "/assets/*");
  assert.ok(generic >= 0, "the /assets/* rule is missing");
  const specific = rules.filter((rule) => rule.path !== "/assets/*" && rule.path.startsWith("/assets/") && rule.set["cache-control"]);
  assert.ok(specific.length >= 5, "fonts, ui, favicon and the two fingerprinted files need their own rule");
  for (const rule of specific) {
    assert.ok(rules.indexOf(rule) > generic, `${rule.path}: must come after /assets/*`);
    assert.ok(rule.unset.includes("cache-control"), `${rule.path}: must detach the Cache-Control of /assets/*`);
  }
});

test("fingerprinted site.css and site.js are cached for a year as immutable, the unhashed files are not", () => {
  const names = fingerprintedNames();
  assert.equal(names.length, 2, `inject-asset-version.mjs created ${names.join(", ")}`);
  for (const name of names) assert.equal(cacheControl(name), IMMUTABLE, name);
  for (const name of ["/assets/site.css", "/assets/site.js"]) assert.equal(cacheControl(name), "public, max-age=300, must-revalidate", name);
});

test("fonts, UI screenshots and the favicon send one immutable Cache-Control", () => {
  for (const path of ["/assets/fonts/inter-latin.woff2", "/assets/ui/05-history.png", "/assets/favicon.svg"]) {
    assert.equal(cacheControl(path), IMMUTABLE, path);
  }
});

test("no file under /assets/ gets two max-age values", () => {
  const files = (dir, prefix) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? files(join(dir, entry.name), `${prefix}${entry.name}/`) : [`${prefix}${entry.name}`]);
  for (const path of [...files(join(dist, "assets"), "/assets/"), ...fingerprintedNames()]) {
    const value = cacheControl(path) ?? "";
    assert.ok((value.match(/max-age=/g) || []).length <= 1, `${path}: ${value}`);
  }
});
