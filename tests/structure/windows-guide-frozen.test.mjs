import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { OFFLINE_DICTATION_WINDOWS_GUIDE_LASTMOD } from "../../data/offline-dictation-windows-guide.mjs";

// The Windows offline guide is the site's most-cited page. The Batch B1 answer pages copy its
// shape but must not change its <main> or its date. Shared header and footer may change.
const read = (path) => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const page = () => read("guides/offline-dictation-on-windows/index.html");
const main = (html) => html.split("<main")[1].split("</main>")[0];
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, body]) => [JSON.parse(body)].flat());
const rows = (table) => [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(([, row]) => [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(([, cell]) => cell));
const NEW_SLUGS = [
  "/guides/dictation-app-mac-windows-one-time-license/",
  "/guides/mac-dictation-app-no-subscription/",
  "/guides/dictate-into-claude-code-and-cursor-on-mac/",
];

test("the Windows offline guide keeps its date", () => {
  assert.equal(OFFLINE_DICTATION_WINDOWS_GUIDE_LASTMOD, "2026-10-17");
  assert.ok(main(page()).includes('datetime="2026-10-17"'));
});

test("the Windows offline guide gains none of the answer-page parts", () => {
  const body = main(page());
  assert.ok(!body.includes("brew install"), "no Homebrew command");
  assert.ok(!body.includes("data-guide-intro"), "no intro block");
  assert.doesNotMatch(body, /\sid="[^"]*-method"/, "no method section");
  for (const slug of NEW_SLUGS) assert.ok(!body.includes(slug), `links ${slug}`);
});

test("the Windows offline guide keeps its schema and its fact table", () => {
  const html = page();
  assert.deepEqual(jsonLd(html).map((node) => node["@type"]), ["Organization", "TechArticle", "FAQPage", "ItemList", "BreadcrumbList"]);
  const body = main(html);
  const at = body.indexOf('id="offline-dictation-windows-apps"');
  assert.ok(at > 0, "fact table section");
  const table = body.slice(at).match(/<table class="compare-table">[\s\S]*?<\/table>/)[0];
  const [header, ...data] = rows(table);
  assert.equal(header.length, 4);
  assert.equal(data.length, 9);
  for (const row of data) assert.equal(row.length, 4);
});
