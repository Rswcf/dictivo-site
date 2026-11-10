import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { firstPublished } from "../../data/first-published.mjs";
import { PRICING_LASTMOD, introOfferActive } from "../../data/local-offer.mjs";
import { OFFLINE_GUIDE_PRICES_CHECKED } from "../../data/offline-dictation-guide.mjs";
import {
  NO_SUBSCRIPTION_GUIDE_CHECKED,
  NO_SUBSCRIPTION_GUIDE_LASTMOD,
  noSubscriptionGuideCopy,
} from "../../data/no-subscription-guide.mjs";

// The Mac dictation with no subscription guide (Batch B1): the query as H1, a short dated
// answer, the "What is Dictivo?" block, the ways people ask, a dated fact table, a signed method
// note, then the trial panel, sections, FAQ, related pages and references. The page answers the
// Mac-only question; the Mac and Windows one-time-license guide owns the cross-platform one.
const read = (path) => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const path = "/guides/mac-dictation-app-no-subscription/";
const url = `https://dictivo.app${path}`;
const route = "guides/mac-dictation-app-no-subscription";
const page = () => read(`${path.slice(1)}index.html`);
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const hasWindowsRelease = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const copy = noSubscriptionGuideCopy({ windows: hasWindowsRelease });
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, body]) => [JSON.parse(body)].flat());
const alternates = (html) => [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]);
const between = (html, from, to) => html.slice(html.indexOf(from), html.indexOf(to, html.indexOf(from)));
const main = (html) => html.split("<main")[1].split("</main>")[0];
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\s+/g, " ");
const tableAfter = (html, id) => html.slice(html.indexOf(`id="${id}"`)).match(/<table class="compare-table">[\s\S]*?<\/table>/)[0];
const rows = (table) => [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(([, row]) => [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(([, cell]) => cell.trim()));
const formatDate = (isoDate) => new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${isoDate}T00:00:00Z`));
const checkedOn = formatDate(NO_SUBSCRIPTION_GUIDE_CHECKED);
const DICTIVO_PRICES = introOfferActive() ? 3 : 2;
const DICTIVO = "Dictivo (this site's product)";
const SECTIONS = 6;
const INTENTS = [
  "dictation app mac no subscription",
  "one time purchase dictation app mac",
  "lifetime license dictation mac",
  "mac dictation app buy once",
  "free dictation app mac no subscription",
  "is Dictivo a subscription",
];
const HEADERS = ["App", "Mac requirement", "How you pay", "One-time price", "Updates included", "Transcribes on the Mac by default?", "Checked"];
const APPS = ["Apple Dictation", "Handy", "JesType", "MacWhisper", "Spokenly", "Superwhisper", "Voibe", "Voice Type", "VoiceInk", "Voicetypr", "Wispr Flow", DICTIVO];
const HOW_YOU_PAY = [
  "Included with macOS",
  "Free (open source)",
  "One-time",
  "Free tier + one-time Pro",
  "Free tier + one-time Local+ (Pro is a subscription)",
  "Subscription or one-time Lifetime",
  "Subscription or one-time lifetime",
  "One-time (App Store in-app purchase)",
  "One-time",
  "One-time",
  "Subscription only",
  "One-time (Dictivo Local)",
];
// Voibe and Voice Type keep the site's own check; every other competitor row was re-read for this page.
const SITE_CHECKED = ["Voibe", "Voice Type"];
const FAQS = [
  "Which Mac dictation apps have no subscription?",
  "Is Dictivo a subscription?",
  "What happens after Dictivo's 12 months of updates?",
  "Does Superwhisper have a one-time price?",
  "Is MacWhisper a one-time purchase?",
  "Which no-subscription Mac dictation apps are free?",
  "Do one-time Mac dictation apps work offline?",
  "Can I use one Dictivo license on more than one Mac?",
];
// This page answers the Mac question; the Mac and Windows license guide and the offline guide own theirs.
const OFF_TOPIC = /windows|cross-platform|offline/i;
// Products that appear only on the Mac and Windows one-time-license guide.
const OTHER_PAGE_PRODUCTS = /Speakpad|Koegaki|Lazytype|Voxtira|FluidVoice|Aiko/;

test("the no-subscription guide is a self-canonical English page with the query as its heading", () => {
  const html = page();
  assert.ok(html.includes('<html lang="en">'));
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.ok(html.includes("<h1>Which Mac dictation apps have no subscription?</h1>"));
  assert.ok(html.includes("<title>Mac Dictation Apps With No Subscription: One-Time Options</title>"));
  assert.ok(html.includes(`<link rel="canonical" href="${url}" />`));
  assert.deepEqual(alternates(html), [["en", url], ["x-default", url]]);
  assert.equal(copy.navLabel, "Mac dictation, no subscription");
});

test("the guide does not target the Windows, cross-platform or offline queries", () => {
  const html = page();
  const body = main(html);
  const description = html.match(/<meta name="description" content="([^"]*)"/)[1];
  assert.equal(description, "Mac dictation apps you buy once or use free, with no subscription: Dictivo, VoiceInk, MacWhisper, Superwhisper, Voice Type, Spokenly and Handy, with prices.");
  const title = html.match(/<title>([^<]*)<\/title>/)[1];
  const h1 = body.match(/<h1>([^<]*)<\/h1>/)[1];
  const headings = [...body.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(([, heading]) => text(heading).trim());
  assert.ok(headings.length >= SECTIONS + 7, `only ${headings.length} h2 headings`);
  const [, ...intentRows] = rows(tableAfter(html, "no-subscription-intents"));
  for (const value of [title, h1, description, ...headings, ...intentRows.map((row) => text(row[0]).trim())]) {
    assert.doesNotMatch(value, OFF_TOPIC, value);
  }
  assert.doesNotMatch(text(body), OTHER_PAGE_PRODUCTS, "names only apps in its own table");
});

test("the lede discloses that Dictivo writes the page before it names another product", () => {
  const lede = text(page().match(/<p class="doc-lede">([\s\S]*?)<\/p>/)[1]);
  const disclosure = lede.indexOf("Dictivo");
  assert.ok(disclosure === 0, lede);
  assert.match(lede, /this site's product/);
  for (const name of APPS.slice(0, -1)) {
    const at = lede.indexOf(name);
    if (at >= 0) assert.ok(at > lede.indexOf("this site's product"), name);
  }
});

test("the guide keeps the answer-page order", () => {
  const body = main(page());
  const order = [
    'id="no-subscription-answer"',
    "data-guide-intro",
    'id="no-subscription-intents"',
    'id="no-subscription-table"',
    'id="no-subscription-method"',
    "data-guide-trial",
    ...Array.from({ length: SECTIONS }, (_, index) => `id="no-subscription-section-${index + 1}"`),
    'id="no-subscription-faq"',
    'id="no-subscription-related"',
    'id="no-subscription-references"',
  ];
  const positions = order.map((marker) => body.indexOf(marker));
  order.forEach((marker, index) => assert.ok(positions[index] > 0, `missing ${marker}`));
  for (let index = 1; index < order.length; index += 1) assert.ok(positions[index - 1] < positions[index], `${order[index - 1]} before ${order[index]}`);
  assert.ok(!body.includes(`id="no-subscription-section-${SECTIONS + 1}"`), "no extra section");
});

test("the short answer is 50 to 70 words, names Dictivo and carries the count, the lowest prices and the check date", () => {
  const html = page();
  const answer = text(html.match(/id="no-subscription-answer">[\s\S]*?<p>([\s\S]*?)<\/p>/)[1]).trim();
  const words = answer.split(/\s+/).length;
  assert.ok(words >= 50 && words <= 70, `${words} words: ${answer}`);
  assert.ok(answer.includes("Dictivo"));
  assert.match(answer, /\d/);
  assert.ok(answer.includes(checkedOn), checkedOn);
  assert.ok(answer.includes(String(APPS.length)), "the number of options compared");
  assert.ok(answer.includes(String(APPS.length - 1)), "the number with no subscription");
  for (const fact of ["Wispr Flow", "JesType", "€14.95", "Voice Type", "$19.99", "12 months of updates"]) assert.ok(answer.includes(fact), fact);
  assert.ok(!answer.includes('<span class="price">') && !html.match(/id="no-subscription-answer">[\s\S]*?<\/section>/)[0].includes('class="price"'), "no Dictivo price in the answer");
});

test("the intent table lists the ways people ask, in order", () => {
  const [header, ...body] = rows(tableAfter(page(), "no-subscription-intents"));
  assert.equal(header.length, 3);
  assert.equal(body.length, INTENTS.length);
  for (const row of body) assert.equal(row.length, 3, row[0]);
  assert.deepEqual(body.map((row) => text(row[0]).trim()), INTENTS);
});

test("the fact table lists twelve apps alphabetically with Dictivo last, dated per row", () => {
  const [header, ...body] = rows(tableAfter(page(), "no-subscription-table"));
  assert.deepEqual(header, HEADERS);
  assert.deepEqual(body.map((row) => text(row[0]).trim()), APPS);
  assert.deepEqual(body.map((row) => text(row[2]).trim()), HOW_YOU_PAY);
  for (const row of body) {
    const name = text(row[0]).trim();
    assert.equal(row.length, HEADERS.length, name);
    const date = SITE_CHECKED.includes(name) ? OFFLINE_GUIDE_PRICES_CHECKED : NO_SUBSCRIPTION_GUIDE_CHECKED;
    assert.ok(row.at(-1).includes(`<time datetime="${date}">`), `${name}: checked ${date}`);
    for (const cell of row) assert.doesNotMatch(cell, /undefined|null|NaN|\{\{price\.|FILL_IN/, name);
    const spans = row.map((cell) => (cell.match(/<span class="price">/g) || []).length);
    if (name === DICTIVO) {
      assert.equal(spans[3], DICTIVO_PRICES, "Dictivo prices come from price placeholders");
      assert.equal(spans.reduce((sum, count) => sum + count, 0), DICTIVO_PRICES, "prices only in the price cell");
    } else {
      assert.equal(spans.reduce((sum, count) => sum + count, 0), 0, `${name}: no Dictivo price span`);
      assert.doesNotMatch(row.join(" "), /US\$/, name);
    }
  }
  const cell = (name, index) => text(body.find((row) => text(row[0]).trim() === name)[index]).trim();
  assert.equal(cell("Wispr Flow", 2), "Subscription only");
  assert.equal(cell("VoiceInk", 1), "Apple Silicon, macOS 14.4 or later (pricing page)");
  assert.equal(cell("Voibe", 5), "On-Device Mode only; Intel Macs use cloud transcription");
  assert.match(cell("JesType", 3), /€14\.95/);
  assert.match(cell("Voice Type", 3), /\$19\.99/);
  assert.match(cell(DICTIVO, 1), /Apple Silicon and Intel/);
  assert.ok(cell(DICTIVO, 1).includes(hasWindowsRelease ? "Windows x64" : "temporarily unavailable"));
  assert.doesNotMatch(cell(DICTIVO, 4), /lifetime/i);
  for (const name of ["JesType", "MacWhisper", "VoiceInk", "Voicetypr"]) {
    assert.equal(cell(name, 4), 'All updates included (vendor says "lifetime")', name);
  }
});

test("the method note says the facts come from vendor pages and is signed by the Dictivo team", () => {
  const html = page();
  const method = text(between(html, 'id="no-subscription-method"', "</section>"));
  assert.ok(method.includes("Dictivo team"));
  assert.ok(method.includes(checkedOn), checkedOn);
  assert.match(method, /vendor/i);
  assert.doesNotMatch(method, /\btested\b/, "no hands-on test is claimed");
  const visible = text(main(html)).replaceAll("support@dictivo.app", "");
  assert.ok(!visible.includes("@"), "no e-mail address other than support");
});

test("the page keeps the site's wording rules", () => {
  const body = main(page());
  const table = tableAfter(body, "no-subscription-table");
  const rest = text(body.replace(table, ""));
  assert.doesNotMatch(rest, /lifetime updates|types directly|types into|inserts text|accura|fastest|most accurate|best overall|winner|#1|launch price/i);
  assert.doesNotMatch(text(table), /types directly|types into|inserts text|accura/i);
  assert.doesNotMatch(page(), /FILL_IN|TODO|undefined|\{\{price\./);
  assert.ok(rest.includes("pastes"), "Dictivo pastes the text");
  assert.equal((body.match(/<code>brew install --cask deepviewsdev\/tap\/dictivo<\/code>/g) || []).length, 1, "the Homebrew command once");
  const fit = between(body, 'id="no-subscription-section-4"', "</section>");
  for (const href of ['href="/pricing/"', 'href="/pricing/#pricing-faq"']) assert.ok(fit.includes(href), href);
  assert.ok(between(body, 'id="no-subscription-section-2"', "</section>").includes('href="/guides/dictation-app-mac-windows-one-time-license/"'));
  assert.ok(between(body, 'id="no-subscription-section-5"', "</section>").includes('href="/guides/first-local-dictation/"'));
  assert.ok(between(body, 'id="no-subscription-section-6"', "</section>").includes('href="/pricing/"'));
});

test("the structured data repeats the visible title, FAQ and fact table", () => {
  const html = page();
  const nodes = jsonLd(html);
  assert.deepEqual(nodes.map((node) => node["@type"]), ["Organization", "TechArticle", "FAQPage", "ItemList", "BreadcrumbList"]);
  const article = nodes.find((node) => node["@type"] === "TechArticle");
  assert.equal(article.headline, text(html.match(/<title>([^<]*)<\/title>/)[1]).trim());
  assert.equal(article.datePublished, firstPublished(route, "en"));
  assert.equal(article.dateModified, NO_SUBSCRIPTION_GUIDE_LASTMOD);
  assert.equal(article.image, html.match(/<meta property="og:image" content="([^"]+)"/)[1]);

  const questions = [...main(html).matchAll(/<span class="faq-question">([^<]+)<\/span>/g)].map(([, question]) => text(question).trim());
  assert.deepEqual(questions, FAQS);
  assert.deepEqual(nodes.find((node) => node["@type"] === "FAQPage").mainEntity.map((item) => item.name), questions);

  const table = tableAfter(html, "no-subscription-table");
  const list = nodes.find((node) => node["@type"] === "ItemList");
  assert.equal(list.name, "Mac dictation apps with no subscription");
  assert.deepEqual(list.itemListElement.map((item) => item.name), APPS);
  assert.deepEqual(list.itemListElement.map((item) => item.description), HOW_YOU_PAY);
  for (const item of list.itemListElement) assert.ok(text(table).includes(item.description), `${item.name}: description is not in the table`);
});

test("the page date, sitemap and llms.txt agree", () => {
  const html = page();
  assert.ok(between(html, '<p class="doc-meta">', "</p>").includes(`<time datetime="${NO_SUBSCRIPTION_GUIDE_LASTMOD}">`));
  const lastmod = NO_SUBSCRIPTION_GUIDE_LASTMOD > PRICING_LASTMOD ? NO_SUBSCRIPTION_GUIDE_LASTMOD : PRICING_LASTMOD;
  assert.match(read("sitemap.xml"), new RegExp(`<loc>${url.replaceAll(".", "\\.")}</loc>\\s*<lastmod>${lastmod}</lastmod>`));
  const llms = read("llms.txt");
  assert.ok(llms.includes(`[${copy.navLabel}](${url})`));
  assert.ok(llms.includes(`- Which Mac dictation apps have no subscription? → [${copy.navLabel}](${url})`));
  assert.ok(!read("de/llms.txt").includes(url), "English only");
});

test("downloads carry the guide's attribution", () => {
  const html = page();
  const intro = html.match(/<section[^>]*data-guide-intro[^>]*>[\s\S]*?<\/section>/)[0];
  const introContents = [...intro.matchAll(/data-download-content="([^"]+)"/g)].map(([, content]) => content);
  assert.deepEqual(introContents, hasWindowsRelease ? ["no_subscription_guide_intro_mac", "no_subscription_guide_intro_windows"] : ["no_subscription_guide_intro_mac"]);
  assert.ok(intro.includes("utm_content=no_subscription_guide_intro_mac"));
  const trial = html.match(/<section[^>]*data-guide-trial[^>]*>[\s\S]*?<\/section>/)[0];
  assert.deepEqual([...trial.matchAll(/data-download-content="([^"]+)"/g)].map(([, content]) => content), ["no_subscription_guide_mac"]);
  assert.ok(trial.includes("utm_content=no_subscription_guide_mac"));
});

test("related pages and references", () => {
  const related = between(page(), 'id="no-subscription-related"', "</section>");
  for (const href of [
    "https://dictivo.app/guides/offline-dictation-on-mac/",
    "https://dictivo.app/guides/best-speech-to-text-apps-for-mac/",
    "https://dictivo.app/guides/dictation-app-mac-windows-one-time-license/",
    "https://dictivo.app/compare/superwhisper-alternative/",
    "https://dictivo.app/compare/macwhisper-alternative/",
    "https://dictivo.app/compare/voiceink-alternative/",
    "https://dictivo.app/pricing/",
    "https://dictivo.app/refund/",
  ]) {
    assert.ok(related.includes(`<a href="${href}">`), href);
  }
  assert.ok(!related.includes("offline-dictation-on-windows"), "the Windows guide is not a related page here");
  const references = between(page(), 'id="no-subscription-references"', "</section>");
  const links = [...references.matchAll(/<li><a href="([^"]+)">([^<]+)<\/a><\/li>/g)].map(([, href, label]) => [href, text(label)]);
  assert.ok(links.some(([href]) => href === "https://github.com/deepviewsdev/homebrew-tap"), "Homebrew tap");
  for (const host of ["support.apple.com", "github.com/cjpais/Handy", "jestype.com", "macwhisper.com", "spokenly.app", "superwhisper.com", "tryvoiceink.com", "voicetypr.com", "wisprflow.ai"]) {
    const link = links.find(([href]) => href.includes(host));
    assert.ok(link, host);
    assert.ok(link[1].includes(`(checked ${NO_SUBSCRIPTION_GUIDE_CHECKED})`), `${host} is not dated`);
  }
  for (const host of ["getvoibe.com/pricing", "apps.apple.com/us/app/voice-type"]) {
    const link = links.find(([href]) => href.includes(host));
    assert.ok(link, host);
    assert.ok(link[1].includes(OFFLINE_GUIDE_PRICES_CHECKED), `${host} keeps the site's check date`);
  }
});
