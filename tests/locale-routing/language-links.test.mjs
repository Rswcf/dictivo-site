import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCALES } from "../../data/site-content.mjs";

const dist = new URL("../../dist/", import.meta.url).pathname;

test("language menu and homepage pills link with ?lang= of the target language", () => {
  for (const file of ["index.html", "zh-hant/index.html", "de/compare/index.html", "guides/mac-dictation-benchmark-method/index.html"]) {
    const html = readFileSync(`${dist}${file}`, "utf8");
    const links = [...html.matchAll(/<a href="([^"]+)" lang="([^"]+)" hreflang="\2"/g)];
    assert.ok(links.length >= LOCALES.length, `${file}: ${links.length} language links`);
    for (const [, href, htmlLang] of links) {
      const code = LOCALES.find((locale) => locale.htmlLang === htmlLang).code;
      assert.equal(new URL(href.replaceAll("&amp;", "&"), "https://dictivo.app").searchParams.get("lang"), code, `${file} ${href}`);
    }
  }
});
