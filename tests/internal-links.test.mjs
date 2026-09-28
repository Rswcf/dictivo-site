import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
const main = (html) => html.split("<main")[1].split("</main>")[0];

test("guide related-page tables use descriptive anchor text instead of bare URLs", () => {
  for (const path of ["guides/best-speech-to-text-apps-for-mac/index.html", "guides/offline-dictation-on-windows/index.html"]) {
    const body = main(read(path));
    assert.ok(!/<a href="https:\/\/dictivo\.app\/[^"]*">https:\/\/dictivo\.app/.test(body), `${path}: a link still uses its URL as anchor text`);
  }
  const mac = main(read("guides/best-speech-to-text-apps-for-mac/index.html"));
  assert.match(mac, /<a href="https:\/\/dictivo\.app\/compare\/wispr-flow-alternative\/">Wispr Flow alternative<\/a>/);
});

test("the English offline guide links to the Wispr Flow comparison from its body", () => {
  const body = main(read("guides/offline-dictation-on-mac/index.html"));
  assert.match(body, /<a href="\/compare\/wispr-flow-alternative\/">[^<]*Wispr Flow[^<]*<\/a>/);
});

test("the benchmark guide body points readers to the first-dictation practice", () => {
  const body = main(read("guides/mac-dictation-benchmark-method/index.html"));
  assert.ok(body.includes('href="/guides/first-local-dictation/"'));
});
