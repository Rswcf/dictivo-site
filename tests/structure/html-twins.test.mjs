import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

// The site writes each page once, as slug/index.html. Old .html addresses reach it through a
// 301 in _redirects, so links from before 2026-11-04 keep working.
const dist = new URL("../../dist/", import.meta.url).pathname;
const TWINS = ["privacy", "terms", "refund", "contact", "about", "security", "changelog",
  "privacy/where-dictation-audio-goes", "privacy/local-dictation-network-test"];

test("old .html addresses are 301 redirects, not copies of the page", () => {
  const redirects = readFileSync(`${dist}_redirects`, "utf8");
  for (const slug of TWINS) {
    assert.ok(!existsSync(`${dist}${slug}.html`), `${slug}.html is still written`);
    assert.ok(existsSync(`${dist}${slug}/index.html`), `${slug}/index.html is missing`);
    assert.ok(redirects.split("\n").includes(`/${slug}.html /${slug}/ 301`), `${slug}.html has no 301`);
  }
});
