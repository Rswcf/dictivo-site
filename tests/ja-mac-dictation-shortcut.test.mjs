import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { firstPublished } from "../data/first-published.mjs";
import { JA_MAC_DICTATION_SHORTCUT_LASTMOD, jaMacDictationShortcutCopy } from "../data/ja-mac-dictation-shortcut-guide.mjs";
import { formatPrice } from "../data/price-display.mjs";
import { INTRO_OFFER, INTRO_PHRASES, REGULAR_OFFER } from "./helpers/offer-states.mjs";

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
const path = "/ja/guides/mac-dictation-shortcut/";
const url = `https://dictivo.app${path}`;
const enPath = "/guides/mac-dictation-shortcut/";
const enUrl = `https://dictivo.app${enPath}`;
const page = () => read(`${path.slice(1)}index.html`);
const release = JSON.parse(readFileSync(new URL("../data/release.json", import.meta.url), "utf8"));
const hasWindowsRelease = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const copy = (windows = hasWindowsRelease) =>
  jaMacDictationShortcutCopy({
    windows,
    troubleshootingPath: "/ja/guides/mac-dictation-not-working/",
    pricingPath: "/ja/#pricing",
    firstDictationPath: "/ja/guides/first-local-dictation/",
  });
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, body]) => [JSON.parse(body)].flat());
const alternates = (html) => [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]);
const between = (html, from, to) => html.slice(html.indexOf(from), html.indexOf(to, html.indexOf(from)));
const footer = (html) => html.slice(html.lastIndexOf('<footer class="site-footer"'));
const main = (html) => html.split("<main")[1].split("</main>")[0];
// Visible text: tags dropped and the entities the renderer writes decoded.
const text = (html) =>
  html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&").replace(/\s+/g, " ");
const menu = (html) => Object.fromEntries([...html.matchAll(/<a href="([^"]+)" lang="([^"]+)" hreflang="\2"/g)].map(([, href, lang]) => [lang, href.replaceAll("&amp;", "&")]));
const SECTIONS = 7;

test("the Japanese shortcut guide is self-canonical and paired with the English shortcut guide", () => {
  const html = page();
  const c = copy();
  assert.ok(html.includes('<html lang="ja">'));
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.equal(c.title, "Macの音声入力ショートカット：確認・変更と、効かないときの対処");
  assert.ok(html.includes(`<h1>${c.title}</h1>`));
  assert.ok(html.includes(`<title>${c.metaTitle}</title>`));
  assert.ok(html.includes(`<link rel="canonical" href="${url}" />`));
  const pair = [["en", enUrl], ["ja", url], ["x-default", enUrl]];
  assert.deepEqual(alternates(html), pair);
  assert.deepEqual(alternates(read(`${enPath.slice(1)}index.html`)), pair, "the English guide lists the same alternates");
  const sitemap = read("sitemap.xml");
  for (const loc of [enUrl, url]) {
    const block = sitemap.match(new RegExp(`<url>\\s*<loc>${loc.replaceAll(".", "\\.")}</loc>[\\s\\S]*?</url>`))[0];
    assert.deepEqual([...block.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]), pair, loc);
  }
});

test("each shortcut guide's language menu offers the other translation and the other homepages", () => {
  const en = menu(read(`${enPath.slice(1)}index.html`));
  const ja = menu(page());
  for (const links of [en, ja]) {
    assert.equal(links.en, `${enPath}?lang=en`);
    assert.equal(links.ja, `${path}?lang=ja`);
    assert.equal(links.de, "/de/?lang=de");
  }
});

test("the answer comes first, then the shortcut table, contents, sections, Dictivo, trial, FAQ and references", () => {
  const html = page();
  const order = [
    'id="ja-shortcut-answer"',
    'id="ja-shortcut-quick-reference"',
    "<nav aria-label=",
    ...Array.from({ length: SECTIONS }, (_, index) => `id="ja-shortcut-section-${index + 1}"`),
    'id="ja-shortcut-dictivo"',
    "data-guide-trial",
    'id="ja-shortcut-faq"',
    'id="ja-shortcut-references"',
  ];
  const positions = order.map((marker) => [marker, html.indexOf(marker)]);
  for (const [marker, position] of positions) assert.ok(position > 0, `missing ${marker}`);
  for (let index = 1; index < positions.length; index++) {
    assert.ok(positions[index - 1][1] < positions[index][1], `${positions[index - 1][0]} before ${positions[index][0]}`);
  }
  assert.equal((between(html, "<nav aria-label=", "</nav>").match(/href="#ja-shortcut-section-\d-title"/g) || []).length, SECTIONS);
  assert.equal(copy().faqs.length, 7);
});

test("the answer and the table name Apple's settings, and Dictivo's column holds its defaults", () => {
  const html = page();
  const answer = text(between(html, 'id="ja-shortcut-answer"', "</section>"));
  for (const term of ["キーボード", "ショートカット", "音声コントロール", "fn + D", "カスタマイズ"]) assert.ok(answer.includes(term), term);
  const table = between(html, 'id="ja-shortcut-quick-reference"', "</table>");
  assert.equal((table.match(/<table/g) || []).length, 1, "one table");
  assert.deepEqual([...table.matchAll(/<th scope="col">([^<]*)<\/th>/g)].map(([, cell]) => cell), ["操作", "macOS標準の音声入力", "Dictivo（当サイトの製品）"]);
  const rows = table.split("<tbody>")[1].split("<tr>").slice(1);
  assert.equal(rows.length, 5);
  for (const row of rows) assert.equal((row.match(/<t[hd][\s>]/g) || []).length, 3, row);
  const dictivo = rows.map((row) => row.match(/<td>[\s\S]*?<\/td>/g)[1]).join(" ");
  for (const shortcut of ["Cmd+Shift+Space", "Cmd+Shift+V"]) assert.ok(dictivo.includes(shortcut), shortcut);
  assert.equal(html.includes("Ctrl+Shift+Space"), hasWindowsRelease, "Windows shortcut only while Windows is public");
  assert.equal(html.includes("Ctrl+Shift+V"), hasWindowsRelease, "Windows Paste Last only while Windows is public");
});

test("Dictivo appears only in the table's own column and its disclosed section", () => {
  const html = page();
  for (const part of [between(html, 'id="ja-shortcut-answer"', 'id="ja-shortcut-quick-reference"'), between(html, 'id="ja-shortcut-section-1"', 'id="ja-shortcut-dictivo"')]) {
    assert.ok(!part.includes("Dictivo"), "the macOS sections do not name Dictivo");
  }
  const dictivo = between(html, 'id="ja-shortcut-dictivo"', "</section>");
  assert.match(dictivo, /<p>ここからは当サイトの製品の案内です。/);
  assert.ok(dictivo.includes("貼り付けます"), "the desktop app pastes");
  assert.ok(dictivo.includes("「設定」→「ホットキー」（英語表示ではSettings → Hotkeys）"));
  assert.ok(dictivo.includes('href="/ja/guides/first-local-dictation/"') && dictivo.includes('href="/ja/#pricing"'));
});

test("the guide names only what Apple documents and no untested or invented option", () => {
  const body = text(main(page()));
  assert.doesNotMatch(
    body,
    /FILL_IN|TODO|undefined|\{\{price\.|直接入力|タイプ|右のCommand|Commandキーを2回|Controlキーを2回|F5|「まる」|「てん」|「かいぎょう」|「キーボードショートカット」をクリック|精度|Settings > Hotkeys|Press and hold|Paste Last/,
  );
  for (const documented of ["「Fn（ファンクション）キーを2回押す」", "Option＋Zキー", "fn + D：音声入力を開始／停止します", "設定できる場合がある"]) {
    assert.ok(body.includes(documented), documented);
  }
});

test("every reference is an Apple Japanese page with its check date", () => {
  const references = [...between(page(), 'id="ja-shortcut-references"', "</ul>").matchAll(/<li><a href="([^"]+)">([^<]+)<\/a><\/li>/g)];
  assert.equal(references.length, 7);
  assert.equal(references.filter(([, href]) => href.startsWith("https://support.apple.com/ja-jp/")).length, 6);
  assert.equal(references.filter(([, href]) => href.startsWith("https://www.apple.com/jp/macos/feature-availability/")).length, 1);
  for (const [, href, label] of references) assert.match(label, /（2026-\d{2}-\d{2}確認）$/, href);
});

test("the guide is a TechArticle with an image, the Organization as publisher, and no FAQ schema", () => {
  const html = page();
  const ld = jsonLd(html);
  assert.equal(ld.filter((node) => node["@type"] === "Organization").length, 1);
  const article = ld.find((node) => node["@type"] === "TechArticle");
  assert.equal(article.inLanguage, "ja");
  assert.equal(article.headline, copy().metaTitle);
  assert.ok(article.image.startsWith("https://dictivo.app/assets/"), article.image);
  assert.equal(article.author["@id"], "https://dictivo.app/#org");
  assert.equal(article.publisher["@id"], "https://dictivo.app/#org");
  assert.equal(article.datePublished, firstPublished("guides/mac-dictation-shortcut", "ja"));
  assert.equal(article.dateModified, JA_MAC_DICTATION_SHORTCUT_LASTMOD);
  assert.ok(!ld.some((node) => node["@type"] === "FAQPage"), "no FAQPage");
  const crumbs = ld.find((node) => node["@type"] === "BreadcrumbList").itemListElement;
  assert.equal(crumbs[1].item, url);
  assert.equal(crumbs[1].name, "Macの音声入力ショートカット");
});

test("the visible date, dateModified and sitemap agree, and the trial panel attributes downloads to the guide", () => {
  const html = page();
  assert.ok(html.includes("utm_content=ja_shortcut_mac"));
  const visible = html.match(/<time datetime="(\d{4}-\d{2}-\d{2})">/)[1];
  assert.equal(visible, JA_MAC_DICTATION_SHORTCUT_LASTMOD);
  assert.equal(jsonLd(html).find((node) => node["@type"] === "TechArticle").dateModified, visible);
  assert.match(read("sitemap.xml"), new RegExp(`<loc>${url.replaceAll(".", "\\.")}</loc>\\s*<lastmod>${visible}</lastmod>`));
});

// The guide quotes no Dictivo price, so the 1 November rollover changes nothing on it: no price span,
// no figure or introductory wording from either offer state, and a sitemap date of its own.
test("the guide quotes no Dictivo price before or after the 1 November price change", () => {
  const html = page();
  const body = text(main(html));
  assert.ok(!html.includes('<span class="price">'));
  for (const offer of [INTRO_OFFER, REGULAR_OFFER]) {
    const figure = formatPrice({ cents: offer.price * 100, form: "main", lang: "ja" });
    assert.ok(!body.includes(figure), `${figure} on the page`);
  }
  for (const windows of [false, true]) assert.doesNotMatch(JSON.stringify(copy(windows)), /US\$|\$\d/, "a price in the copy");
  for (const phrase of INTRO_PHRASES) assert.ok(!body.includes(phrase), phrase);
  assert.match(read("sitemap.xml"), new RegExp(`<loc>${url.replaceAll(".", "\\.")}</loc>\\s*<lastmod>${JA_MAC_DICTATION_SHORTCUT_LASTMOD}</lastmod>`));
});

test("Japanese readers reach the guide from every Japanese footer and llms.txt, other languages do not", () => {
  assert.ok(footer(read("ja/index.html")).includes(`href="${path}"`), "Japanese footer");
  assert.ok(read("ja/llms.txt").includes(url));
  assert.ok(!read("index.html").includes(`href="${path}"`), "English homepage");
  assert.ok(!read("de/index.html").includes(`href="${path}"`), "German homepage");
  assert.ok(!read("llms.txt").includes(url), "the English llms.txt lists no locale URL");
  assert.equal((main(page()).match(/href="\/ja\/guides\/mac-dictation-not-working\/"/g) || []).length, 2, "sections 4 and 5 link the troubleshooting guide");
});

test("the Japanese offline guide links the shortcut guide from its built-in dictation section", () => {
  const offline = read("ja/guides/offline-dictation-on-mac/index.html");
  const section = between(offline, 'id="offline-guide-section-1"', "</section>");
  assert.ok(section.includes(`<a href="${path}">Macの音声入力ショートカットを確認・変更する方法</a>`));
  assert.ok(offline.includes('<time datetime="2026-10-09">'), "redated for the link");
  // Its title and its shortcut question stay until the 2026-11-08 review of both pages in Search Console.
  assert.ok(offline.includes("<title>Macのオフライン音声入力：設定・ショートカット・アプリ比較</title>"));
  assert.ok(offline.includes("Macの音声入力のショートカットは？"));
});
