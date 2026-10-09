import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { firstPublished } from "../data/first-published.mjs";
import { MAC_DICTATION_NOT_WORKING_LASTMOD } from "../data/mac-dictation-not-working-guide.mjs";

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
const path = "/guides/mac-dictation-not-working/";
const url = `https://dictivo.app${path}`;
const jaPath = "/ja/guides/mac-dictation-not-working/";
const jaUrl = `https://dictivo.app${jaPath}`;
const page = () => read(`${path.slice(1)}index.html`);
const release = JSON.parse(readFileSync(new URL("../data/release.json", import.meta.url), "utf8"));
const hasWindowsRelease = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, body]) => [JSON.parse(body)].flat());
const alternates = (html) => [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]);
const between = (html, from, to) => html.slice(html.indexOf(from), html.indexOf(to, html.indexOf(from)));
const footer = (html) => html.slice(html.lastIndexOf('<footer class="site-footer"'));

test("the English troubleshooting guide is self-canonical and paired with the Japanese guide", () => {
  const html = page();
  assert.ok(html.includes('<html lang="en">'));
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.ok(html.includes("<h1>Mac dictation not working: what to check, by symptom</h1>"));
  assert.ok(html.includes("<title>Mac Dictation Not Working? What to Check, by Symptom</title>"));
  assert.ok(html.includes(`<link rel="canonical" href="${url}" />`));
  const pair = [["en", url], ["ja", jaUrl], ["x-default", url]];
  assert.deepEqual(alternates(html), pair);
  assert.deepEqual(alternates(read(`${jaPath.slice(1)}index.html`)), pair, "the Japanese guide lists the same alternates");
  const sitemap = read("sitemap.xml");
  for (const loc of [url, jaUrl]) {
    const block = sitemap.match(new RegExp(`<url>\\s*<loc>${loc.replaceAll(".", "\\.")}</loc>[\\s\\S]*?</url>`))[0];
    assert.deepEqual([...block.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]), pair, loc);
  }
});

test("each guide's language menu offers the other translation and the other homepages", () => {
  const menu = (html) => Object.fromEntries([...html.matchAll(/<a href="([^"]+)" lang="([^"]+)" hreflang="\2"/g)].map(([, href, lang]) => [lang, href.replaceAll("&amp;", "&")]));
  const en = menu(page());
  const ja = menu(read(`${jaPath.slice(1)}index.html`));
  for (const links of [en, ja]) {
    assert.equal(links.en, `${path}?lang=en`);
    assert.equal(links.ja, `${jaPath}?lang=ja`);
    assert.equal(links.de, "/de/?lang=de");
  }
});

test("the answer comes first, then the quick reference, contents, symptoms, Dictivo, trial, FAQ and references", () => {
  const html = page();
  const order = [
    'id="troubleshooting-answer"',
    'id="troubleshooting-quick-reference"',
    '<nav class="doc-section"',
    ...Array.from({ length: 9 }, (_, index) => `id="troubleshooting-section-${index + 1}"`),
    'id="troubleshooting-dictivo"',
    "data-guide-trial",
    'id="troubleshooting-faq"',
    'id="troubleshooting-references"',
  ];
  const positions = order.map((marker) => [marker, html.indexOf(marker)]);
  for (const [marker, position] of positions) assert.ok(position > 0, `missing ${marker}`);
  for (let index = 1; index < positions.length; index++) {
    assert.ok(positions[index - 1][1] < positions[index][1], `${positions[index - 1][0]} before ${positions[index][0]}`);
  }
  const table = between(html, 'id="troubleshooting-quick-reference"', "</table>");
  assert.deepEqual([...table.matchAll(/<th scope="col">([^<]*)<\/th>/g)].map(([, cell]) => cell), ["Symptom", "First thing to check", "Where"]);
  assert.equal((table.match(/<th scope="row">/g) || []).length, 9);
  assert.equal((between(html, '<nav class="doc-section"', "</nav>").match(/href="#troubleshooting-section-\d-title"/g) || []).length, 9);
});

test("the answer names Voice Control and Microphone source; Dictivo appears only in its disclosed section", () => {
  const html = page();
  const answer = between(html, 'id="troubleshooting-answer"', "</section>");
  for (const term of ["Voice Control", "Microphone source"]) assert.ok(answer.includes(term), term);
  const dictivo = between(html, 'id="troubleshooting-dictivo"', "</section>");
  assert.match(dictivo, /<p>Dictivo is this site&#39;s product\.|<p>Dictivo is this site's product\./);
  assert.ok(dictivo.includes("pastes the text into the app you are using"));
  assert.ok(dictivo.includes('href="/pricing/"') && dictivo.includes('href="/guides/first-local-dictation/"'));
  assert.equal(dictivo.includes("Ctrl+Shift+Space"), hasWindowsRelease, "Windows shortcut only while Windows is public");
  const symptoms = between(html, 'id="troubleshooting-section-1"', 'id="troubleshooting-dictivo"');
  const quickReference = between(html, 'id="troubleshooting-answer"', "<nav");
  for (const part of [symptoms, quickReference]) assert.ok(!part.includes("Dictivo"), "symptom sections do not name Dictivo");
});

test("the guide makes no undocumented fixes, comparisons or typing claims", () => {
  const html = page();
  assert.doesNotMatch(html, /FILL_IN|TODO|undefined|\{\{price\.|killall|corespeechd|plist|cache|Low Power|Screen Time|types directly|types into|inserts text|accura/i);
  assert.doesNotMatch(html, /Press (Control|Right Command|Option) Key Twice/);
});

test("every reference is an Apple or Google help page with its check date", () => {
  const html = page();
  const references = [...between(html, 'id="troubleshooting-references"', "</ul>").matchAll(/<li><a href="([^"]+)">([^<]+)<\/a><\/li>/g)];
  assert.equal(references.filter(([, href]) => href.startsWith("https://support.apple.com/guide/mac-help/")).length, 6);
  assert.equal(references.filter(([, href]) => href.startsWith("https://support.google.com/")).length, 1);
  for (const [, href, label] of references) assert.match(label, /\(checked 2026-\d\d-\d\d\)$/, href);
});

test("the guide is a TechArticle with an image, the Organization as publisher, and no FAQ schema", () => {
  const html = page();
  const ld = jsonLd(html);
  const article = ld.find((node) => node["@type"] === "TechArticle");
  assert.equal(article.inLanguage, "en");
  assert.equal(article.headline, "Mac Dictation Not Working? What to Check, by Symptom");
  assert.ok(article.image.startsWith("https://dictivo.app/assets/"), article.image);
  assert.deepEqual(article.publisher, { "@id": "https://dictivo.app/#org" });
  assert.deepEqual(article.author, { "@id": "https://dictivo.app/#org" });
  assert.equal(article.datePublished, firstPublished("guides/mac-dictation-not-working", "en"));
  assert.equal(article.dateModified, MAC_DICTATION_NOT_WORKING_LASTMOD);
  assert.ok(!ld.some((node) => node["@type"] === "FAQPage"), "no FAQPage");
  const crumbs = ld.find((node) => node["@type"] === "BreadcrumbList").itemListElement;
  assert.equal(crumbs[1].item, url);
  assert.ok(html.includes(`<time datetime="${MAC_DICTATION_NOT_WORKING_LASTMOD}">`));
});

test("English readers reach the guide, and its trial panel attributes downloads to it", () => {
  const html = page();
  assert.ok(html.includes("utm_content=troubleshooting_mac"));
  assert.ok(footer(read("index.html")).includes(`href="${path}"`), "English footer");
  assert.ok(!read("de/index.html").includes(`href="${path}"`), "German homepage");
  assert.ok(read("llms.txt").includes(url));
  assert.match(read("sitemap.xml"), new RegExp(`<loc>${url.replaceAll(".", "\\.")}</loc>\\s*<lastmod>${MAC_DICTATION_NOT_WORKING_LASTMOD}</lastmod>`));
});

test("the Mac speech-to-text guide and the macOS Dictation comparison link to the guide in English only", () => {
  const anchor = new RegExp(`<a href="(?:https://dictivo\\.app)?${path}">[^<]+</a>`);
  for (const entry of ["guides/best-speech-to-text-apps-for-mac/index.html", "compare/macos-dictation-alternative/index.html"]) {
    assert.match(read(entry).split("<main")[1].split("</main>")[0], anchor, entry);
  }
  const compare = read("compare/macos-dictation-alternative/index.html");
  const strengths = between(compare, 'id="compare-section-1"', "</section>");
  assert.ok(strengths.includes(`<a href="${path}">If built-in Dictation is not working, check these settings first</a>`), "link sits in the strengths section");
  for (const locale of ["de", "ja", "zh-hant"]) {
    // The Japanese footer links the Japanese guide; no localized comparison links the English one.
    assert.ok(!read(`${locale}/compare/macos-dictation-alternative/index.html`).includes(`href="${path}"`), `${locale} comparison`);
  }
});
