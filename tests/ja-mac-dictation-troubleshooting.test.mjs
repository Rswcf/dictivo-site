import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
const path = "/ja/guides/mac-dictation-not-working/";
const url = `https://dictivo.app${path}`;
const enUrl = "https://dictivo.app/guides/mac-dictation-not-working/";
const page = () => read(`${path.slice(1)}index.html`);
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, body]) => JSON.parse(body));

test("the Japanese troubleshooting guide is self-canonical, paired with the English guide, with agreeing dates", () => {
  const html = page();
  assert.ok(html.includes('<html lang="ja">'));
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  assert.ok(html.includes("<h1>Macで音声入力できないときの直し方</h1>"));
  assert.ok(html.includes("<title>Macで音声入力できないときの直し方｜症状別の確認手順</title>"));
  assert.ok(html.includes(`<link rel="canonical" href="${url}" />`));
  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]);
  assert.deepEqual(alternates, [["en", enUrl], ["ja", url], ["x-default", enUrl]]);

  const lastmod = html.match(/<time datetime="(\d{4}-\d{2}-\d{2})">/)[1];
  const article = jsonLd(html).find((item) => item["@type"] === "TechArticle");
  assert.equal(article.dateModified, lastmod);
  assert.match(read("sitemap.xml"), new RegExp(`<loc>${url.replaceAll(".", "\\.")}</loc>\\s*<lastmod>${lastmod}</lastmod>`));
});

test("the answer comes first and the page states only documented facts with disclosure", () => {
  const html = page();
  const answer = html.indexOf('id="ja-troubleshooting-answer"');
  const firstSymptom = html.indexOf('id="ja-troubleshooting-section-1"');
  assert.ok(answer > 0 && firstSymptom > answer, "answer precedes the first symptom");
  assert.ok(html.indexOf("音声コントロール", answer) < firstSymptom, "the answer names Voice Control");
  assert.ok(html.includes("当サイトの製品"), "Dictivo is disclosed as our product");

  const ld = jsonLd(html);
  const article = ld.find((item) => item["@type"] === "TechArticle");
  const faq = ld.find((item) => item["@type"] === "FAQPage");
  assert.equal(article.inLanguage, "ja");
  assert.equal(faq.inLanguage, "ja");
  assert.ok(faq.mainEntity.length >= 4);

  for (const banned of ["FILL_IN", "TODO", "undefined", "{{price."]) assert.ok(!html.includes(banned), banned);
  if (!html.includes('id="ja-troubleshooting-field-test"')) {
    for (const untested of ["「まる」", "「てん」", "「かいぎょう」"]) assert.ok(!html.includes(untested), untested);
  }
});

test("Japanese readers can reach the guide and its trial panel attributes downloads to it", () => {
  const html = page();
  assert.ok(html.includes("utm_content=ja_troubleshooting_mac"));
  for (const entry of ["ja/index.html", "ja/compare/index.html", "ja/guides/offline-dictation-on-mac/index.html"]) {
    assert.ok(read(entry).includes(`href="${path}"`), entry);
  }
  assert.ok(read("ja/llms.txt").includes(url));
  // Other homepages link their own language's guide, never the Japanese one.
  assert.ok(!read("de/index.html").includes(`href="${path}"`), "the German homepage does not link the Japanese guide");
  assert.ok(!read("index.html").includes(`href="${path}"`), "the English homepage does not link the Japanese guide");
  assert.ok(
    !read("ja/guides/offline-dictation-on-mac/index.html").includes("Macで音声入力できないときの切り分け"),
    "the offline guide no longer competes with a generic heading",
  );
});
