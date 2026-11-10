import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { firstPublished } from "../../data/first-published.mjs";
import { PRICING_LASTMOD, introOfferActive } from "../../data/local-offer.mjs";
import { OFFLINE_GUIDE_PRICES_CHECKED } from "../../data/offline-dictation-guide.mjs";
import {
  SPEECH_TO_TEXT_MAC_GUIDE_CHECKED,
  SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD,
  speechToTextMacGuideCopy,
} from "../../data/speech-to-text-mac-guide.mjs";
import { JA_SPEECH_GUIDE_READY } from "../../data/ja-speech-to-text-mac-guide.mjs";

// The Mac speech-to-text guide in the answer-page shape (Batch B1): the query as H1, a short
// dated answer, the "What is Dictivo?" block, the ways people ask, a dated fact table, a signed
// method note, then the trial panel, sections, FAQ, related pages and references.
const read = (path) => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const path = "/guides/best-speech-to-text-apps-for-mac/";
const url = `https://dictivo.app${path}`;
const route = "guides/best-speech-to-text-apps-for-mac";
const page = () => read(`${path.slice(1)}index.html`);
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const hasWindowsRelease = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const copy = speechToTextMacGuideCopy({ windows: hasWindowsRelease });
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, body]) => [JSON.parse(body)].flat());
const alternates = (html) => [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]);
const between = (html, from, to) => html.slice(html.indexOf(from), html.indexOf(to, html.indexOf(from)));
const main = (html) => html.split("<main")[1].split("</main>")[0];
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\s+/g, " ");
const tableAfter = (html, id) => html.slice(html.indexOf(`id="${id}"`)).match(/<table class="compare-table">[\s\S]*?<\/table>/)[0];
const rows = (table) => [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(([, row]) => [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(([, cell]) => cell.trim()));
const year = SPEECH_TO_TEXT_MAC_GUIDE_CHECKED.slice(0, 4);
const checkedOn = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${SPEECH_TO_TEXT_MAC_GUIDE_CHECKED}T00:00:00Z`));
const DICTIVO_PRICES = introOfferActive() ? 3 : 2;
const SECTIONS = 7;
const FAQS = 8;
const INTENTS = [
  "best dictation app for mac",
  "speech to text mac",
  "voice to text mac app",
  "transcribe audio to text mac free",
  "dictation software for mac",
  "best free dictation app for mac",
];
const HEADERS = ["Option", "Best fit", "Privacy or platform caveat", "When to choose it", "Price / purchase model", "Checked on"];
const OPTIONS = ["Dictivo Local", "Apple Dictation", "Handy", "MacWhisper", "Spokenly", "Superwhisper", "VoiceInk", "Voice Type", "Voibe", "Wispr Flow"];
// Voice Type keeps the site's own check; every other row was re-read for this page (Spokenly Pro
// and Voibe prices in a live spot-check the same day).
const SITE_CHECKED = ["Voice Type"];
const NEW_PAGES = [
  "https://dictivo.app/guides/offline-dictation-on-windows/",
  "https://dictivo.app/guides/dictation-app-mac-windows-one-time-license/",
  "https://dictivo.app/guides/mac-dictation-app-no-subscription/",
  "https://dictivo.app/guides/dictate-into-claude-code-and-cursor-on-mac/",
];

test("the Mac speech-to-text guide is a self-canonical English page with the query as its heading", () => {
  const html = page();
  assert.ok(html.includes('<html lang="en">'));
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.ok(html.includes(`<h1>Best speech-to-text and dictation apps for Mac in ${year}, by workflow</h1>`));
  assert.ok(html.includes(`<title>Best Speech-to-Text and Dictation Apps for Mac (${year})</title>`));
  assert.ok(html.includes(`<link rel="canonical" href="${url}" />`));
  // The Japanese twin (Batch B3) joins the alternates once it is built.
  assert.deepEqual(alternates(html), [["en", url], ...(JA_SPEECH_GUIDE_READY ? [["ja", `https://dictivo.app/ja${path}`]] : []), ["x-default", url]]);
  assert.equal(copy.navLabel, "Speech-to-text apps for Mac");
});

test("the guide keeps the answer-page order", () => {
  const body = main(page());
  const order = [
    'id="speech-to-text-mac-answer"',
    "data-guide-intro",
    'id="speech-to-text-mac-intents"',
    'id="speech-to-text-mac-table"',
    'id="speech-to-text-mac-method"',
    "data-guide-trial",
    ...Array.from({ length: SECTIONS }, (_, index) => `id="speech-to-text-mac-section-${index + 1}"`),
    'id="speech-to-text-mac-faq"',
    'id="speech-to-text-mac-related"',
    'id="speech-to-text-mac-references"',
  ];
  const positions = order.map((marker) => body.indexOf(marker));
  order.forEach((marker, index) => assert.ok(positions[index] > 0, `missing ${marker}`));
  for (let index = 1; index < order.length; index += 1) assert.ok(positions[index - 1] < positions[index], `${order[index - 1]} before ${order[index]}`);
  assert.ok(!body.includes(`id="speech-to-text-mac-section-${SECTIONS + 1}"`), "no extra section");
});

test("the short answer is 50 to 70 words, names Dictivo and carries a number and the check date", () => {
  const html = page();
  const answer = text(html.match(/id="speech-to-text-mac-answer">[\s\S]*?<p>([\s\S]*?)<\/p>/)[1]).trim();
  const words = answer.split(/\s+/).length;
  assert.ok(words >= 50 && words <= 70, `${words} words: ${answer}`);
  for (const name of ["Dictivo Local", "MacWhisper", "Apple Dictation"]) assert.ok(answer.includes(name), name);
  assert.match(answer, /\d/);
  assert.ok(answer.includes(checkedOn), checkedOn);
  assert.ok(answer.includes(String(OPTIONS.length)), "the number of apps compared");
});

test("the intent table lists the ways people ask, in order", () => {
  const [header, ...body] = rows(tableAfter(page(), "speech-to-text-mac-intents"));
  assert.deepEqual(header, ["How people ask", "Best-fit workflow", "What to check"]);
  assert.equal(body.length, INTENTS.length);
  for (const row of body) assert.equal(row.length, 3, row[0]);
  assert.deepEqual(body.map((row) => text(row[0]).trim()), INTENTS);
});

test("the fact table prices and dates every option and keeps Dictivo prices in placeholders", () => {
  const [header, ...body] = rows(tableAfter(page(), "speech-to-text-mac-table"));
  assert.deepEqual(header, HEADERS);
  assert.deepEqual(body.map((row) => text(row[0]).trim()), OPTIONS);
  for (const row of body) {
    const name = text(row[0]).trim();
    assert.equal(row.length, HEADERS.length, name);
    const date = SITE_CHECKED.includes(name) ? OFFLINE_GUIDE_PRICES_CHECKED : SPEECH_TO_TEXT_MAC_GUIDE_CHECKED;
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
  assert.equal(text(handy[4]).trim(), "Free and open source (MIT license)");
  const spokenly = body.find((row) => row[0] === "Spokenly");
  assert.match(text(spokenly[4]), /\$29 once/);
  assert.match(text(spokenly[4]), /Pro \$15 a month, or \$144 a year \(\$12 a month billed yearly\)/);
  assert.match(text(body.find((row) => row[0] === "Voibe")[4]), /\$9\.90 a month, \$99 a year, or \$199 once/);
});

test("the method note is signed by the Dictivo team with the check date", () => {
  const html = page();
  const method = text(between(html, 'id="speech-to-text-mac-method"', "</section>"));
  assert.ok(method.includes("Dictivo team"));
  assert.ok(method.includes(checkedOn), checkedOn);
  assert.doesNotMatch(method, /\btested\b/, "no hands-on test is claimed");
  const visible = text(main(html)).replaceAll("support@dictivo.app", "");
  assert.ok(!visible.includes("@"), "no e-mail address other than support");
});

test("the page keeps the site's wording rules", () => {
  const body = main(page());
  const table = tableAfter(body, "speech-to-text-mac-table");
  const rest = text(body.replace(table, ""));
  assert.doesNotMatch(rest, /lifetime updates|types directly|types into|inserts text|accura|fastest|most accurate|best overall|winner|#1|launch price/i);
  assert.doesNotMatch(text(table), /types directly|types into|inserts text|accura/i);
  assert.doesNotMatch(page(), /FILL_IN|TODO|undefined|\{\{price\./);
  const fit = text(between(body, 'id="speech-to-text-mac-section-5"', "</section>"));
  assert.ok(fit.includes(hasWindowsRelease
    ? "One Dictivo Local license covers both desktop platforms, macOS and Windows x64"
    : "Windows x64 downloads are temporarily unavailable"));
});

test("the structured data repeats the visible title, FAQ and fact table", () => {
  const html = page();
  const nodes = jsonLd(html);
  assert.deepEqual(nodes.map((node) => node["@type"]), ["Organization", "TechArticle", "FAQPage", "ItemList", "BreadcrumbList"]);
  const article = nodes.find((node) => node["@type"] === "TechArticle");
  assert.equal(article.headline, text(html.match(/<title>([^<]*)<\/title>/)[1]).trim());
  assert.equal(article.datePublished, firstPublished(route, "en"));
  assert.equal(article.dateModified, SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD);
  assert.equal(article.image, html.match(/<meta property="og:image" content="([^"]+)"/)[1]);

  const questions = [...main(html).matchAll(/<span class="faq-question">([^<]+)<\/span>/g)].map(([, question]) => text(question).trim());
  assert.equal(questions.length, FAQS);
  assert.equal(questions.at(-1), "Which Mac app transcribes audio files for free?");
  assert.deepEqual(nodes.find((node) => node["@type"] === "FAQPage").mainEntity.map((item) => item.name), questions);

  const table = tableAfter(html, "speech-to-text-mac-table");
  const list = nodes.find((node) => node["@type"] === "ItemList");
  assert.equal(list.name, "Mac speech-to-text apps by workflow");
  assert.deepEqual(list.itemListElement.map((item) => item.name), OPTIONS);
  for (const item of list.itemListElement) {
    assert.ok(typeof item.description === "string" && item.description.length > 0, item.name);
    assert.ok(text(table).includes(item.description), `${item.name}: description is not in the table`);
  }
});

test("the page date, sitemap and llms.txt agree", () => {
  const html = page();
  assert.ok(between(html, '<p class="doc-meta">', "</p>").includes(`<time datetime="${SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD}">`));
  const lastmod = SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD > PRICING_LASTMOD ? SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD : PRICING_LASTMOD;
  assert.match(read("sitemap.xml"), new RegExp(`<loc>${url.replaceAll(".", "\\.")}</loc>\\s*<lastmod>${lastmod}</lastmod>`));
  const llms = read("llms.txt");
  assert.ok(llms.includes(`[${copy.navLabel}](${url})`));
  assert.ok(llms.includes("Which speech-to-text app fits my Mac workflow?"));
  // Unlike the new B1 pages, this guide has been in every language's llms.txt page list since
  // before B1 (next to the Windows guide); B1 does not change that.
});

test("downloads carry the guide's attribution", () => {
  const html = page();
  const intro = html.match(/<section[^>]*data-guide-intro[^>]*>[\s\S]*?<\/section>/)[0];
  const introContents = [...intro.matchAll(/data-download-content="([^"]+)"/g)].map(([, content]) => content);
  assert.deepEqual(introContents, hasWindowsRelease ? ["speech_guide_intro_mac", "speech_guide_intro_windows"] : ["speech_guide_intro_mac"]);
  assert.ok(intro.includes("utm_content=speech_guide_intro_mac"));
  const trial = html.match(/<section[^>]*data-guide-trial[^>]*>[\s\S]*?<\/section>/)[0];
  assert.deepEqual([...trial.matchAll(/data-download-content="([^"]+)"/g)].map(([, content]) => content), ["speech_guide_mac"]);
  assert.ok(trial.includes("utm_content=speech_guide_mac"));
});

test("related pages keep the pinned links and add the Windows guide and the new answer pages", () => {
  const related = between(page(), 'id="speech-to-text-mac-related"', "</section>");
  for (const href of [
    ...NEW_PAGES,
    "https://dictivo.app/guides/best-dictation-software/",
    "https://dictivo.app/guides/mac-dictation-not-working/",
    "https://dictivo.app/guides/mac-dictation-shortcut/",
    "https://dictivo.app/compare/wispr-flow-alternative/",
  ]) {
    assert.ok(related.includes(`<a href="${href}">`), href);
  }
  const references = between(page(), 'id="speech-to-text-mac-references"', "</section>");
  for (const href of ["https://github.com/cjpais/Handy", "https://spokenly.app/pricing"]) {
    const link = references.match(new RegExp(`<li><a href="${href.replace(/[.]/g, "\\.")}">([^<]+)</a></li>`));
    assert.ok(link, href);
    assert.ok(link[1].includes(`(checked ${SPEECH_TO_TEXT_MAC_GUIDE_CHECKED})`), `${href} is not dated`);
  }
});
