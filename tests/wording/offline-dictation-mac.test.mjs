import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { firstPublished } from "../../data/first-published.mjs";
import { PRICING_LASTMOD, introOfferActive } from "../../data/local-offer.mjs";
import {
  OFFLINE_DICTATION_GUIDE_EN_CHECKED,
  OFFLINE_GUIDE_PRICES_CHECKED,
  offlineDictationGuideEnCopy,
  offlineDictationGuideLastmod,
} from "../../data/offline-dictation-guide.mjs";

// The English offline Mac dictation guide in the answer-page shape (Batch B1): the query as H1, a
// short dated answer, the "What is Dictivo?" block, the ways people ask, a dated fact table, a
// signed method note, then the trial panel, sections, FAQ, related pages and references. The ten
// translated pages keep their own shape; this file checks that they did not pick up the new one.
const read = (path) => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const path = "/guides/offline-dictation-on-mac/";
const url = `https://dictivo.app${path}`;
const route = "guides/offline-dictation-on-mac";
const page = () => read(`${path.slice(1)}index.html`);
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const hasWindowsRelease = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const copy = offlineDictationGuideEnCopy({ windows: hasWindowsRelease });
const lastmod = offlineDictationGuideLastmod("en");
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, body]) => [JSON.parse(body)].flat());
const alternates = (html) => [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]);
const between = (html, from, to) => html.slice(html.indexOf(from), html.indexOf(to, html.indexOf(from)));
const main = (html) => html.split("<main")[1].split("</main>")[0];
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\s+/g, " ");
const tableAfter = (html, id) => html.slice(html.indexOf(`id="${id}"`)).match(/<table class="compare-table">[\s\S]*?<\/table>/)[0];
const rows = (table) => [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(([, row]) => [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(([, cell]) => cell.trim()));
const checkedOn = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${OFFLINE_DICTATION_GUIDE_EN_CHECKED}T00:00:00Z`));
const DICTIVO_PRICES = introOfferActive() ? 3 : 2;
const SECTIONS = 6;
const FAQS = [
  "Is Dictivo fully offline?",
  "Does Apple Dictation work offline on a Mac?",
  "Which Mac dictation apps keep speech on the Mac?",
  "Is Wispr Flow an offline dictation app?",
  "Can I install Dictivo with Homebrew?",
  "How can I check that a dictation app does not upload my audio?",
  "Do I need an Apple Silicon Mac for offline dictation?",
  "Which apps handle recorded files?",
];
const INTENTS = [
  "offline dictation mac",
  "dictation app mac without internet",
  "which Mac dictation apps process audio locally",
  "private dictation app for mac",
  "does Apple Dictation work offline",
  "free offline dictation mac",
];
const HEADERS = ["App", "Does speech stay on the Mac?", "Cloud or workflow caveat", "Best fit", "Price / purchase model", "Checked on"];
const APPS = ["Dictivo Local", "Apple Dictation", "Handy", "VoiceInk", "Superwhisper", "MacWhisper", "Voice Type", "Voibe", "Aiko", "Wispr Flow"];
// Voice Type and Aiko keep the site's own check; every other row was re-read for this page (Voibe's
// price in a live spot-check the same day).
const SITE_CHECKED = ["Voice Type", "Aiko"];
const LOCALIZED = ["de", "fr", "es", "it", "nl", "pt", "zh", "zh-hant", "ja", "ko"];
const BREW = "<code>brew install --cask deepviewsdev/tap/dictivo</code>";
// The query words other B1 pages target stay out of this page's headings and intent rows.
const OTHER_QUERIES = /subscription|one-time|lifetime|buy once|best dictation app/i;

test("the English offline guide keeps its translations and has the query as its heading", () => {
  const html = page();
  assert.ok(html.includes('<html lang="en">'));
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.ok(html.includes("<h1>Offline dictation on Mac: which apps keep speech on your Mac?</h1>"));
  assert.ok(html.includes("<title>Offline Dictation on Mac: Local Speech-to-Text Compared</title>"));
  assert.ok(html.includes(`<link rel="canonical" href="${url}" />`));
  const links = alternates(html);
  assert.equal(links.length, 12, "11 languages plus x-default");
  assert.deepEqual(links.find(([lang]) => lang === "en"), ["en", url]);
  assert.deepEqual(links.find(([lang]) => lang === "x-default"), ["x-default", url]);
  for (const code of LOCALIZED) assert.ok(links.some(([, href]) => href === `https://dictivo.app/${code}${path}`), code);
  assert.equal(copy.navLabel, "Offline Mac dictation");
  for (const heading of [copy.title, copy.metaTitle, copy.metaDescription, ...copy.sections.map((section) => section.title), ...copy.intentRows.map((row) => row[0])]) {
    assert.doesNotMatch(heading, OTHER_QUERIES, heading);
  }
});

test("the guide keeps the answer-page order", () => {
  const body = main(page());
  const order = [
    'id="offline-guide-answer"',
    "data-guide-intro",
    'id="offline-guide-intents"',
    'id="offline-guide-table"',
    'id="offline-guide-method"',
    "data-guide-trial",
    ...Array.from({ length: SECTIONS }, (_, index) => `id="offline-guide-section-${index + 1}"`),
    'id="offline-guide-faq"',
    'id="offline-guide-related"',
    'id="offline-guide-references"',
  ];
  const positions = order.map((marker) => body.indexOf(marker));
  order.forEach((marker, index) => assert.ok(positions[index] > 0, `missing ${marker}`));
  for (let index = 1; index < order.length; index += 1) assert.ok(positions[index - 1] < positions[index], `${order[index - 1]} before ${order[index]}`);
  assert.ok(!body.includes(`id="offline-guide-section-${SECTIONS + 1}"`), "no extra section");
  assert.ok(!body.includes("offline-guide-benchmark-method"), "the benchmark section moved to the related table");
});

test("the short answer is 50 to 70 words, names Dictivo and carries a number and the check date", () => {
  const html = page();
  const answer = text(html.match(/id="offline-guide-answer">[\s\S]*?<p>([\s\S]*?)<\/p>/)[1]).trim();
  const words = answer.split(/\s+/).length;
  assert.ok(words >= 50 && words <= 70, `${words} words: ${answer}`);
  for (const name of ["Dictivo Local", "Apple Dictation"]) assert.ok(answer.includes(name), name);
  assert.match(answer, /Intel/);
  assert.match(answer, /\d/);
  assert.ok(answer.includes(checkedOn), checkedOn);
  assert.ok(answer.includes(String(APPS.length)), "the number of apps compared");
  assert.doesNotMatch(answer, /accura/i);
});

test("the intent table lists the ways people ask, in order", () => {
  const [header, ...body] = rows(tableAfter(page(), "offline-guide-intents"));
  assert.deepEqual(header, ["How people ask", "Short answer", "What to check"]);
  assert.equal(body.length, INTENTS.length);
  for (const row of body) assert.equal(row.length, 3, row[0]);
  assert.deepEqual(body.map((row) => text(row[0]).trim()), INTENTS);
});

test("the fact table prices and dates every app and keeps Dictivo prices in placeholders", () => {
  const html = page();
  assert.ok(html.includes('id="offline-guide-table"'), "llms.txt links #offline-guide-table");
  const [header, ...body] = rows(tableAfter(html, "offline-guide-table"));
  assert.deepEqual(header, HEADERS);
  assert.deepEqual(body.map((row) => text(row[0]).trim()), APPS);
  for (const row of body) {
    const name = text(row[0]).trim();
    assert.equal(row.length, HEADERS.length, name);
    const date = SITE_CHECKED.includes(name) ? OFFLINE_GUIDE_PRICES_CHECKED : OFFLINE_DICTATION_GUIDE_EN_CHECKED;
    assert.ok(row.at(-1).includes(`<time datetime="${date}">`), `${name}: checked ${date}`);
    for (const cell of row) assert.doesNotMatch(cell, /undefined|null|NaN|\{\{price\.|FILL_IN/, name);
    const spans = (row[4].match(/<span class="price">/g) || []).length;
    if (name === "Dictivo Local") {
      assert.equal(spans, DICTIVO_PRICES, "Dictivo prices come from price placeholders");
    } else {
      assert.equal(spans, 0, `${name}: no Dictivo price span`);
      assert.doesNotMatch(row.join(" ").replace(/<span class="price">[^<]*<\/span>/g, ""), /US\$/, name);
    }
  }
  const handy = body.find((row) => row[0] === "Handy");
  assert.equal(handy[4], "Free and open source (MIT license)");
  const apple = text(body.find((row) => row[0] === "Apple Dictation")[1]);
  assert.match(apple, /Apple silicon/);
  assert.match(apple, /Intel/);
});

test("the method note is signed by the Dictivo team with the check date", () => {
  const html = page();
  const method = text(between(html, 'id="offline-guide-method"', "</section>"));
  assert.ok(method.includes("Dictivo team"));
  assert.ok(method.includes(checkedOn), checkedOn);
  assert.doesNotMatch(method, /\btested\b/, "no hands-on test is claimed");
  const visible = text(main(html)).replaceAll("support@dictivo.app", "");
  assert.ok(!visible.includes("@"), "no e-mail address other than support");
});

test("the page keeps the site's wording rules", () => {
  const body = main(page());
  const table = tableAfter(body, "offline-guide-table");
  const rest = text(body.replace(table, ""));
  assert.doesNotMatch(rest, /lifetime updates|types directly|types into|inserts text|accura|fastest|most accurate|best overall|winner|#1|launch price/i);
  assert.doesNotMatch(text(table), /types directly|types into|inserts text|accura/i);
  assert.doesNotMatch(page(), /FILL_IN|TODO|undefined|\{\{price\./);
  const fit = text(between(body, 'id="offline-guide-section-3"', "</section>"));
  assert.ok(fit.includes(hasWindowsRelease
    ? "One Dictivo Local license covers both desktop platforms, macOS and Windows x64"
    : "Windows x64 downloads are temporarily unavailable"));
});

test("the Homebrew command appears once, in the try-it steps", () => {
  const body = main(page());
  assert.equal(body.split(BREW).length - 1, 1);
  assert.ok(between(body, 'id="offline-guide-section-5"', "</section>").includes(BREW));
  const references = between(body, 'id="offline-guide-references"', "</section>");
  assert.ok(references.includes('<a href="https://github.com/deepviewsdev/homebrew-tap">'));
});

test("the structured data repeats the visible title, FAQ and fact table", () => {
  const html = page();
  const nodes = jsonLd(html);
  assert.deepEqual(nodes.map((node) => node["@type"]), ["Organization", "TechArticle", "FAQPage", "ItemList", "BreadcrumbList"]);
  const article = nodes.find((node) => node["@type"] === "TechArticle");
  assert.equal(article.headline, text(html.match(/<title>([^<]*)<\/title>/)[1]).trim());
  assert.equal(article.datePublished, firstPublished(route, "en"));
  assert.equal(article.dateModified, lastmod);
  assert.equal(article.image, html.match(/<meta property="og:image" content="([^"]+)"/)[1]);

  const questions = [...main(html).matchAll(/<span class="faq-question">([^<]+)<\/span>/g)].map(([, question]) => text(question).trim());
  assert.deepEqual(questions, FAQS);
  assert.deepEqual(nodes.find((node) => node["@type"] === "FAQPage").mainEntity.map((item) => item.name), questions);

  const table = tableAfter(html, "offline-guide-table");
  const list = nodes.find((node) => node["@type"] === "ItemList");
  assert.equal(list.name, "Mac dictation apps by whether speech stays on the Mac");
  assert.deepEqual(list.itemListElement.map((item) => item.name), APPS);
  for (const item of list.itemListElement) {
    assert.ok(typeof item.description === "string" && item.description.length > 0, item.name);
    assert.ok(text(table).includes(item.description), `${item.name}: description is not in the table`);
  }
});

test("the page date, sitemap and llms.txt agree", () => {
  const html = page();
  assert.ok(between(html, '<p class="doc-meta">', "</p>").includes(`<time datetime="${lastmod}">`));
  const sitemapDate = lastmod > PRICING_LASTMOD ? lastmod : PRICING_LASTMOD;
  assert.match(read("sitemap.xml"), new RegExp(`<loc>${url.replaceAll(".", "\\.")}</loc>\\s*<lastmod>${sitemapDate}</lastmod>`));
  const llms = read("llms.txt");
  assert.ok(llms.includes(`[${copy.navLabel}](${url})`));
  assert.ok(llms.includes(`${url}#offline-guide-table`));
  // The guide is translated, so each language's llms.txt keeps its own entry (unlike the new pages).
});

test("downloads carry the guide's attribution", () => {
  const html = page();
  const intro = html.match(/<section[^>]*data-guide-intro[^>]*>[\s\S]*?<\/section>/)[0];
  const introContents = [...intro.matchAll(/data-download-content="([^"]+)"/g)].map(([, content]) => content);
  assert.deepEqual(introContents, hasWindowsRelease ? ["offline_guide_intro_mac", "offline_guide_intro_windows"] : ["offline_guide_intro_mac"]);
  assert.ok(intro.includes("utm_content=offline_guide_intro_mac"));
  const trial = html.match(/<section[^>]*data-guide-trial[^>]*>[\s\S]*?<\/section>/)[0];
  assert.deepEqual([...trial.matchAll(/data-download-content="([^"]+)"/g)].map(([, content]) => content), ["offline_guide_mac"]);
  assert.ok(trial.includes("utm_content=offline_guide_mac"));
});

test("sections keep the pinned in-body links; related pages add the other answer pages", () => {
  const body = main(page());
  const section = (n) => between(body, `id="offline-guide-section-${n}"`, "</section>");
  assert.match(section(1), /<a href="\/compare\/wispr-flow-alternative\/">[^<]*Wispr Flow[^<]*<\/a>/);
  assert.ok(section(2).includes('href="/guides/mac-dictation-not-working/"'));
  assert.ok(section(3).includes('href="/guides/best-dictation-software/"'));
  assert.ok(section(4).includes('href="/privacy/local-dictation-network-test/"'));
  assert.ok(section(5).includes('href="/guides/first-local-dictation/"'));
  assert.ok(section(6).includes('href="/pricing/"'));
  const related = between(body, 'id="offline-guide-related"', "</section>");
  for (const href of [
    "https://dictivo.app/guides/offline-dictation-on-windows/",
    "https://dictivo.app/guides/best-speech-to-text-apps-for-mac/",
    "https://dictivo.app/guides/mac-dictation-app-no-subscription/",
    "https://dictivo.app/guides/dictation-app-mac-windows-one-time-license/",
    "https://dictivo.app/guides/dictate-into-claude-code-and-cursor-on-mac/",
    "https://dictivo.app/guides/best-dictation-software/",
    "https://dictivo.app/guides/mac-dictation-benchmark-method/#human-speech-example",
    "https://dictivo.app/privacy/where-dictation-audio-goes/",
    "https://dictivo.app/privacy/local-dictation-network-test/",
    "https://dictivo.app/compare/wispr-flow-alternative/",
  ]) {
    assert.ok(related.includes(`<a href="${href}">`), href);
  }
  const references = between(body, 'id="offline-guide-references"', "</section>");
  for (const href of ["https://github.com/cjpais/Handy", "https://handy.computer/download", "https://support.apple.com/en-us/guide/mac-help/mh40584/14.0/mac/14.0"]) {
    const link = references.match(new RegExp(`<li><a href="${href.replace(/[.]/g, "\\.")}">([^<]+)</a></li>`));
    assert.ok(link, href);
    assert.ok(link[1].includes(`(checked ${OFFLINE_DICTATION_GUIDE_EN_CHECKED})`), `${href} is not dated`);
  }
});

test("the translated offline guides keep their own shape", () => {
  for (const code of ["de", "fr", "ja", "zh-hant"]) {
    const html = read(`${code}${path}index.html`);
    assert.ok(!html.includes("brew"), `${code}: Homebrew`);
    assert.ok(!html.includes("offline-guide-intents"), `${code}: intent table`);
    assert.ok(!html.includes("offline-guide-method"), `${code}: method note`);
    assert.ok(html.includes('id="offline-guide-table"'), `${code}: table id`);
  }
  // The Japanese guide's own date; it does not move with the English rebuild.
  assert.ok(read(`ja${path}index.html`).includes('<time datetime="2026-11-10">'));
});
