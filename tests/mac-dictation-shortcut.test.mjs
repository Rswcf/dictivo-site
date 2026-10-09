import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { firstPublished } from "../data/first-published.mjs";
import { MAC_DICTATION_SHORTCUT_LASTMOD } from "../data/mac-dictation-shortcut-guide.mjs";

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
const path = "/guides/mac-dictation-shortcut/";
const url = `https://dictivo.app${path}`;
const page = () => read(`${path.slice(1)}index.html`);
const release = JSON.parse(readFileSync(new URL("../data/release.json", import.meta.url), "utf8"));
const hasWindowsRelease = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, body]) => [JSON.parse(body)].flat());
const alternates = (html) => [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]);
const between = (html, from, to) => html.slice(html.indexOf(from), html.indexOf(to, html.indexOf(from)));
const footer = (html) => html.slice(html.lastIndexOf('<footer class="site-footer"'));
const main = (html) => html.split("<main")[1].split("</main>")[0];

test("the shortcut guide is self-canonical and paired with the Japanese shortcut guide", () => {
  const html = page();
  assert.ok(html.includes('<html lang="en">'));
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.ok(html.includes("<h1>The Mac dictation shortcut: where it is, how to change it, and why it stops working</h1>"));
  assert.ok(html.includes("<title>Mac Dictation Shortcut: Default, Change It, Fix Conflicts</title>"));
  assert.ok(html.includes(`<link rel="canonical" href="${url}" />`));
  const jaUrl = "https://dictivo.app/ja/guides/mac-dictation-shortcut/";
  assert.deepEqual(alternates(html), [["en", url], ["ja", jaUrl], ["x-default", url]]);
});

test("the answer comes first, then the shortcut table, contents, sections, Dictivo, trial, FAQ and references", () => {
  const html = page();
  const order = [
    'id="shortcut-answer"',
    'id="shortcut-quick-reference"',
    '<nav aria-label=',
    ...Array.from({ length: 6 }, (_, index) => `id="shortcut-section-${index + 1}"`),
    'id="shortcut-dictivo"',
    "data-guide-trial",
    'id="shortcut-faq"',
    'id="shortcut-references"',
  ];
  const positions = order.map((marker) => [marker, html.indexOf(marker)]);
  for (const [marker, position] of positions) assert.ok(position > 0, `missing ${marker}`);
  for (let index = 1; index < positions.length; index++) {
    assert.ok(positions[index - 1][1] < positions[index][1], `${positions[index - 1][0]} before ${positions[index][0]}`);
  }
});

test("the shortcut table compares macOS Dictation with Dictivo's documented defaults", () => {
  const html = page();
  const table = between(html, 'id="shortcut-quick-reference"', "</table>");
  assert.deepEqual([...table.matchAll(/<th scope="col">([^<]*)<\/th>/g)].map(([, cell]) => cell.replaceAll("&#39;", "'")), ["Action", "Built-in macOS Dictation", "Dictivo (this site's product)"]);
  const rows = table.split("<tbody>")[1].split("<tr>").slice(1);
  assert.equal(rows.length, 5);
  for (const row of rows) assert.equal((row.match(/<t[hd][\s>]/g) || []).length, 3, row);
  const dictivo = rows.map((row) => row.match(/<td>[\s\S]*?<\/td>/g)[1]).join(" ");
  for (const shortcut of ["Cmd+Shift+Space", "Cmd+Shift+V"]) assert.ok(dictivo.includes(shortcut), shortcut);
  assert.equal(html.includes("Ctrl+Shift+Space"), hasWindowsRelease, "Windows shortcut only while Windows is public");
});

test("the guide names only the shortcut options Apple documents", () => {
  const html = page();
  assert.ok(html.includes("Option-Z"));
  assert.ok(html.includes("Press Fn (Function) Key Twice"));
  assert.doesNotMatch(html, /Press (Control|Right Command|Left Command|Option|Command) Key Twice/);
  assert.doesNotMatch(html, /FILL_IN|TODO|undefined|\{\{price\.|killall|corespeechd|plist|cache|Low Power|Screen Time|types directly|types into|inserts text|accura/i);
  const sections = between(html, 'id="shortcut-section-1"', 'id="shortcut-dictivo"');
  assert.ok(!sections.includes("Dictivo"), "the macOS sections do not name Dictivo");
  const dictivo = between(html, 'id="shortcut-dictivo"', "</section>");
  assert.match(dictivo, /<p>Dictivo is this site(&#39;|')s product\./);
  assert.ok(dictivo.includes("pastes the text into the app you are using"));
  assert.ok(dictivo.includes("Settings &gt; Hotkeys"));
});

test("every reference is an Apple help page with its check date", () => {
  const references = [...between(page(), 'id="shortcut-references"', "</ul>").matchAll(/<li><a href="([^"]+)">([^<]+)<\/a><\/li>/g)];
  assert.ok(references.length >= 3);
  for (const [, href, label] of references) {
    assert.ok(href.startsWith("https://support.apple.com/guide/mac-help/"), href);
    assert.match(label, /\(checked 2026-\d\d-\d\d\)$/, href);
  }
});

test("the shortcut guide is a TechArticle with an image and no FAQ schema", () => {
  const html = page();
  const ld = jsonLd(html);
  const article = ld.find((node) => node["@type"] === "TechArticle");
  assert.equal(article.inLanguage, "en");
  assert.equal(article.headline, "Mac Dictation Shortcut: Default, Change It, Fix Conflicts");
  assert.ok(article.image.startsWith("https://dictivo.app/assets/"), article.image);
  assert.equal(article.image, "https://dictivo.app/assets/native-demo-2026-09/result.png");
  assert.deepEqual(article.author, { "@type": "Organization", "@id": "https://dictivo.app/#org", name: "Dictivo", url: "https://dictivo.app/" });
  assert.equal(article.publisher["@id"], "https://dictivo.app/#org");
  assert.equal(article.publisher.name, "Dictivo");
  assert.equal(article.publisher.logo.url, "https://dictivo.app/assets/favicon.svg");
  assert.equal(article.datePublished, firstPublished("guides/mac-dictation-shortcut", "en"));
  assert.equal(article.dateModified, MAC_DICTATION_SHORTCUT_LASTMOD);
  assert.ok(!ld.some((node) => node["@type"] === "FAQPage"), "no FAQPage");
  assert.equal(ld.find((node) => node["@type"] === "BreadcrumbList").itemListElement[1].item, url);
  assert.ok(html.includes(`<time datetime="${MAC_DICTATION_SHORTCUT_LASTMOD}">`));
});

test("readers reach the shortcut guide from the footer, the troubleshooting guide and the speech guide", () => {
  const html = page();
  assert.ok(html.includes("utm_content=shortcut_mac"));
  assert.ok(footer(read("index.html")).includes(`href="${path}"`), "English footer");
  assert.ok(!read("de/index.html").includes(`href="${path}"`), "German homepage");
  const troubleshooting = read("guides/mac-dictation-not-working/index.html");
  assert.ok(between(troubleshooting, 'id="troubleshooting-section-2"', "</section>").includes(`href="${path}"`), "troubleshooting symptom 2");
  assert.ok(main(read("guides/best-speech-to-text-apps-for-mac/index.html")).includes(`href="${url}"`), "speech guide related pages");
  assert.ok(main(html).includes('href="/guides/mac-dictation-not-working/"'), "links back to the troubleshooting guide");
  assert.ok(read("llms.txt").includes(url));
  assert.match(read("sitemap.xml"), new RegExp(`<loc>${url.replaceAll(".", "\\.")}</loc>\\s*<lastmod>${MAC_DICTATION_SHORTCUT_LASTMOD}</lastmod>`));
});
