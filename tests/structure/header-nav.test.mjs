import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LOCALES } from "../../data/site-content.mjs";

// Batch A (2026-11-10): the compare hub is the third header link on every generated page, and the
// homepage pricing section links the language's compare hub (English also links the buyer guide).
// It reads only dist/.
const dist = new URL("../../dist/", import.meta.url).pathname;
const read = (path) => readFileSync(join(dist, path), "utf8");
const prefix = (code) => (code === "en" ? "" : `${code}/`);
const hubPath = (code) => `${LOCALES.find((locale) => locale.code === code).path}compare/`;
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
const links = (markup) => [...markup.matchAll(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map(([, href, label]) => ({ href, label: decode(label.replace(/<[^>]+>/g, "").trim()) }));

const COMPARE_LABEL = {
  en: "Compare", de: "Vergleich", fr: "Comparatif", es: "Comparar", it: "Confronto",
  nl: "Vergelijken", pt: "Comparar", zh: "对比", ja: "比較", ko: "비교",
};

const PAGES = [
  ...LOCALES.map((locale) => [`${prefix(locale.code)}index.html`, locale.code]),
  ["pricing/index.html", "en"],
  ["guides/dragon-pricing/index.html", "en"],
  ["de/compare/wispr-flow-alternative/index.html", "de"],
  ["demo/index.html", "en"],
];

test("the header nav holds three links; the third opens the language's compare hub", () => {
  for (const [path, code] of PAGES) {
    const html = read(path);
    const header = /<header class="site-header"[\s\S]*?<\/header>/.exec(html)?.[0];
    assert.ok(header, `${path}: no site header`);
    const nav = /<nav class="nav-links"[^>]*>([\s\S]*?)<\/nav>/.exec(header)?.[1];
    assert.ok(nav, `${path}: no .nav-links`);
    const items = links(nav);
    assert.equal(items.length, 3, `${path}: ${items.length} header links`);
    assert.equal(items[2].href, hubPath(code), `${path}: third header link`);
    if (code === "zh-hant") assert.ok(items[2].label.length > 0, `${path}: empty compare label`);
    else assert.equal(items[2].label, COMPARE_LABEL[code], `${path}: compare label`);
  }
});

test("each homepage pricing section links its compare hub in a second footnote", () => {
  for (const locale of LOCALES) {
    const path = `${prefix(locale.code)}index.html`;
    const html = read(path);
    const pricing = /<section class="pricing-section[^"]*" id="pricing"[\s\S]*?<\/section>/.exec(html)?.[0];
    assert.ok(pricing, `${path}: no #pricing section`);
    const footnotes = [...pricing.matchAll(/<p class="pricing-footnote">([\s\S]*?)<\/p>/g)].map((match) => match[1]);
    assert.equal(footnotes.length, 2, `${path}: ${footnotes.length} pricing footnotes`);
    const items = links(footnotes[1]);
    // The link text is the hub page's own heading, so the reader lands on what the link promised.
    const hubHeading = decode(/<h1 id="compare-hub-title">([^<]*)<\/h1>/.exec(read(`${prefix(locale.code)}compare/index.html`))?.[1] ?? "");
    assert.ok(hubHeading, `${locale.code}: compare hub has no heading`);
    assert.deepEqual(items[0], { href: hubPath(locale.code), label: hubHeading }, `${path}: compare hub link`);
    if (locale.code === "en") {
      assert.equal(items.length, 2, `${path}: ${items.length} links in the second footnote`);
      assert.deepEqual(items[1], { href: "/guides/best-dictation-software/", label: "Best dictation software" }, path);
      assert.match(footnotes[1], /<\/a> · <a /, `${path}: links separated by " · "`);
    } else {
      assert.equal(items.length, 1, `${path}: ${items.length} links in the second footnote`);
    }
  }
  assert.ok(!read("de/index.html").includes("/pricing/"), "the German homepage links no /pricing/ page");
});
