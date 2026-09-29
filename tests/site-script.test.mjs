import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const dist = new URL("../dist/", import.meta.url).pathname;
// The exact line assetTags() in scripts/generate-site.mjs emits for every generated page.
const tag = '<script src="/assets/site.js?v=local" defer></script>';

test("the changelog, security and not-found pages load site.js from their head, once, with the shared tag", () => {
  const home = readFileSync(`${dist}index.html`, "utf8");
  assert.ok(home.includes(tag), "index.html: the shared script tag changed; update this test and the three hand-written heads together");
  assert.equal(home.split("/assets/site.js").length - 1, 1, "home page references site.js exactly once");
  for (const path of ["changelog/index.html", "changelog.html", "security/index.html", "security.html", "404.html"]) {
    const html = readFileSync(`${dist}${path}`, "utf8");
    const at = html.indexOf(tag);
    assert.ok(at > 0, `${path}: the site.js tag is missing`);
    assert.ok(at < html.indexOf("</head>"), `${path}: the site.js tag must be inside <head>`);
    assert.equal(html.split("/assets/site.js").length - 1, 1, `${path}: site.js is referenced more than once`);
  }
});
