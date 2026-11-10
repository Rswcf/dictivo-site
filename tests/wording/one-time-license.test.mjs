import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { firstPublished } from "../../data/first-published.mjs";
import { PRICING_LASTMOD, introOfferActive } from "../../data/local-offer.mjs";
import {
  ONE_TIME_LICENSE_GUIDE_CHECKED,
  ONE_TIME_LICENSE_GUIDE_LASTMOD,
  oneTimeLicenseGuideCopy,
} from "../../data/one-time-license-guide.mjs";

// Dictation apps for Mac and Windows with a one-time license (Batch B1, page C): the query as H1,
// a short dated answer, the "What is Dictivo?" block, the ways people ask, a dated fact table with
// Dictivo last, a signed method note, then the trial panel, sections, FAQ, related pages and
// references. Every row runs on both desktop systems.
const read = (path) => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const path = "/guides/dictation-app-mac-windows-one-time-license/";
const url = `https://dictivo.app${path}`;
const route = "guides/dictation-app-mac-windows-one-time-license";
const page = () => read(`${path.slice(1)}index.html`);
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const hasWindowsRelease = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const copy = oneTimeLicenseGuideCopy({ windows: hasWindowsRelease });
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, body]) => [JSON.parse(body)].flat());
const alternates = (html) => [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]);
const between = (html, from, to) => html.slice(html.indexOf(from), html.indexOf(to, html.indexOf(from)));
const main = (html) => html.split("<main")[1].split("</main>")[0];
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\s+/g, " ");
const tableAfter = (html, id) => html.slice(html.indexOf(`id="${id}"`)).match(/<table class="compare-table">[\s\S]*?<\/table>/)[0];
const rows = (table) => [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(([, row]) => [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(([, cell]) => cell.trim()));
const words = (sentence) => sentence.trim().split(/\s+/).length;
const checkedOn = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${ONE_TIME_LICENSE_GUIDE_CHECKED}T00:00:00Z`));
const DICTIVO_PRICES = introOfferActive() ? 3 : 2;
const SECTIONS = 6;
const FAQS = 8;
const H1 = "Which dictation apps work on both Mac and Windows with a one-time license?";
const TITLE = "Dictation Apps for Mac and Windows With a One-Time License";
const INTENTS = [
  "dictation app for Mac and Windows one-time license",
  "dictation software for both Mac and PC",
  "cross-platform dictation app buy once",
  "one license for Mac and Windows dictation",
  "dictation app lifetime license Windows and Mac",
];
const HEADERS = ["Product", "Runs on", "One license covers Mac and Windows?", "One-time price", "Devices per license", "Updates included", "Transcribes on the device by default?", "Checked"];
const DICTIVO = "Dictivo (this site's product)";
const PRODUCTS = ["Handy", "JesType", "Koegaki", "Lazytype", "Speakpad", "Spokenly", "Superwhisper", "Voicetypr", "Voxtira", DICTIVO];
const COMPETITORS = /Handy|JesType|Koegaki|Lazytype|Speakpad|Spokenly|Superwhisper|Voicetypr|Voxtira/;
const column = (name) => HEADERS.indexOf(name);

test("the one-time license guide is a self-canonical English page with the query as its heading", () => {
  const html = page();
  assert.ok(html.includes('<html lang="en">'));
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.ok(html.includes(`<h1>${H1}</h1>`));
  assert.ok(html.includes(`<title>${TITLE}</title>`));
  assert.ok(html.includes(`<link rel="canonical" href="${url}" />`));
  assert.deepEqual(alternates(html), [["en", url], ["x-default", url]]);
  assert.equal(copy.navLabel, "One-time license, Mac and Windows");
});

test("the lede says who wrote the page before it names any other product", () => {
  const body = text(main(page()));
  const lede = text(page().match(/<p class="doc-lede">([\s\S]*?)<\/p>/)[1]);
  assert.match(lede, /^Dictivo wrote this page/);
  assert.ok(lede.split(". ")[0].includes("one of the apps"), "the first sentence discloses that Dictivo makes one of the apps");
  const disclosure = body.indexOf("Dictivo wrote this page");
  assert.ok(disclosure > 0 && disclosure < body.search(COMPETITORS), "disclosure before the first other product name");
});

test("the guide keeps the answer-page order", () => {
  const body = main(page());
  const order = [
    'id="one-time-license-answer"',
    "data-guide-intro",
    'id="one-time-license-intents"',
    'id="one-time-license-table"',
    'id="one-time-license-method"',
    "data-guide-trial",
    ...Array.from({ length: SECTIONS }, (_, index) => `id="one-time-license-section-${index + 1}"`),
    'id="one-time-license-faq"',
    'id="one-time-license-related"',
    'id="one-time-license-references"',
  ];
  const positions = order.map((marker) => body.indexOf(marker));
  order.forEach((marker, index) => assert.ok(positions[index] > 0, `missing ${marker}`));
  for (let index = 1; index < order.length; index += 1) assert.ok(positions[index - 1] < positions[index], `${order[index - 1]} before ${order[index]}`);
  assert.ok(!body.includes(`id="one-time-license-section-${SECTIONS + 1}"`), "no extra section");
});

test("the short answer is 50 to 70 words, names Dictivo without a price and carries a number and the check date", () => {
  const html = page();
  const answer = text(html.match(/id="one-time-license-answer">[\s\S]*?<p>([\s\S]*?)<\/p>/)[1]).trim();
  assert.ok(words(answer) >= 50 && words(answer) <= 70, `${words(answer)} words: ${answer}`);
  for (const name of ["Dictivo", "JesType", "Koegaki", "Spokenly", "Superwhisper", "Speakpad", "€14.95"]) assert.ok(answer.includes(name), name);
  assert.match(answer, /\d/);
  assert.ok(answer.includes(checkedOn), checkedOn);
  assert.ok(!html.match(/id="one-time-license-answer">[\s\S]*?<\/section>/)[0].includes('<span class="price">'), "no Dictivo price in the answer");
  // The other Windows state keeps the answer within the limits too.
  const other = oneTimeLicenseGuideCopy({ windows: !hasWindowsRelease }).answer;
  assert.ok(words(other) >= 50 && words(other) <= 70, `${words(other)} words: ${other}`);
});

test("the intent table lists the ways people ask, in order", () => {
  const [header, ...body] = rows(tableAfter(page(), "one-time-license-intents"));
  assert.equal(header.length, 3);
  assert.equal(body.length, INTENTS.length);
  for (const row of body) assert.equal(row.length, 3, row[0]);
  assert.deepEqual(body.map((row) => text(row[0]).trim()), INTENTS);
});

test("the fact table lists every product in order, dates every row and keeps Dictivo prices in placeholders", () => {
  const [header, ...body] = rows(tableAfter(page(), "one-time-license-table"));
  assert.deepEqual(header, HEADERS);
  assert.deepEqual(body.map((row) => text(row[0]).trim()), PRODUCTS);
  for (const row of body) {
    const name = text(row[0]).trim();
    assert.equal(row.length, HEADERS.length, name);
    assert.ok(row.at(-1).includes(`<time datetime="${ONE_TIME_LICENSE_GUIDE_CHECKED}">`), `${name}: checked ${ONE_TIME_LICENSE_GUIDE_CHECKED}`);
    for (const cell of row) assert.doesNotMatch(cell, /undefined|null|NaN|\{\{price\.|FILL_IN/, name);
    const spans = (row.join(" ").match(/<span class="price">/g) || []).length;
    if (name === DICTIVO) {
      assert.equal((row[column("One-time price")].match(/<span class="price">/g) || []).length, DICTIVO_PRICES, "Dictivo prices come from price placeholders");
    } else {
      assert.equal(spans, 0, `${name}: no Dictivo price span`);
      assert.doesNotMatch(row.join(" "), /US\$/, name);
    }
  }
  const cell = (product, name) => text(body.find((row) => text(row[0]).trim() === product)[column(name)]).trim();
  const covers = "One license covers Mac and Windows?";
  if (hasWindowsRelease) assert.equal(cell(DICTIVO, covers), "Yes");
  else assert.match(cell(DICTIVO, covers), /temporarily unavailable/);
  assert.match(cell("Speakpad", covers), /^No\b/);
  for (const product of ["JesType", "Koegaki", "Spokenly", "Superwhisper"]) assert.match(cell(product, covers), /^Yes\b/, product);
  for (const product of ["Lazytype", "Voicetypr", "Voxtira"]) assert.match(cell(product, covers), /^Not stated\b/, product);
  assert.match(cell("Lazytype", "Transcribes on the device by default?"), /^No\b/);
  assert.match(cell("JesType", "One-time price"), /€14\.95/);
  assert.match(cell("Superwhisper", "One-time price"), /\$249\.99/);
  assert.match(cell("Spokenly", "One-time price"), /\$29 once/);
  assert.equal(cell("Spokenly", "Updates included"), "Not stated");
  assert.match(cell(DICTIVO, "Updates included"), /12 months/);
  assert.doesNotMatch(cell(DICTIVO, "Updates included"), /lifetime|forever/i);
});

test("the method note is signed by the Dictivo team with the check date and claims no hands-on test", () => {
  const html = page();
  const method = text(between(html, 'id="one-time-license-method"', "</section>"));
  assert.ok(method.includes("Dictivo team"));
  assert.ok(method.includes(checkedOn), checkedOn);
  assert.match(method, /vendor/i, "facts come from vendor pages");
  assert.doesNotMatch(method, /\btested\b/, "no hands-on test is claimed");
  const visible = text(main(html)).replaceAll("support@dictivo.app", "");
  assert.ok(!visible.includes("@"), "no e-mail address other than support");
});

test("the page keeps the site's wording rules", () => {
  const body = main(page());
  const table = tableAfter(body, "one-time-license-table");
  const rest = text(body.replace(table, ""));
  assert.doesNotMatch(rest, /lifetime updates|types directly|types into|inserts text|accura|fastest|most accurate|best overall|winner|#1|launch price/i);
  assert.doesNotMatch(text(table), /types directly|types into|inserts text|accura/i);
  assert.doesNotMatch(page(), /FILL_IN|TODO|undefined|\{\{price\./);
  // Every product in the table runs on both systems; Mac-only apps belong on other pages.
  for (const name of ["VoiceInk", "MacWhisper", "Voice Type", "Voibe"]) {
    assert.ok(!text(table).includes(name), `${name} is Mac only`);
    for (const heading of [H1, TITLE, copy.metaDescription]) assert.ok(!heading.includes(name), `${name} in a heading`);
  }
  assert.ok(text(body).includes("pastes"), "Dictivo pastes the text");
});

test("the structured data repeats the visible title, FAQ and fact table", () => {
  const html = page();
  const nodes = jsonLd(html);
  assert.deepEqual(nodes.map((node) => node["@type"]), ["Organization", "TechArticle", "FAQPage", "ItemList", "BreadcrumbList"]);
  const article = nodes.find((node) => node["@type"] === "TechArticle");
  assert.equal(article.headline, text(html.match(/<title>([^<]*)<\/title>/)[1]).trim());
  assert.equal(article.datePublished, firstPublished(route, "en"));
  assert.equal(article.dateModified, ONE_TIME_LICENSE_GUIDE_LASTMOD);
  assert.equal(article.image, html.match(/<meta property="og:image" content="([^"]+)"/)[1]);

  const questions = [...main(html).matchAll(/<span class="faq-question">([^<]+)<\/span>/g)].map(([, question]) => text(question).trim());
  assert.equal(questions.length, FAQS);
  assert.equal(questions[0], "Is there a dictation app with one license for both Mac and Windows?");
  assert.equal(questions.at(-1), "Does Dictivo run on Windows ARM or Linux?");
  assert.deepEqual(nodes.find((node) => node["@type"] === "FAQPage").mainEntity.map((item) => item.name), questions);

  const table = tableAfter(html, "one-time-license-table");
  const list = nodes.find((node) => node["@type"] === "ItemList");
  assert.equal(list.name, "Dictation apps for Mac and Windows with a one-time license");
  assert.deepEqual(list.itemListElement.map((item) => item.name), PRODUCTS);
  for (const item of list.itemListElement) {
    assert.ok(typeof item.description === "string" && item.description.length > 0, item.name);
    assert.ok(text(table).includes(item.description), `${item.name}: description is not in the table`);
  }
});

test("the page date, sitemap and llms.txt agree", () => {
  const html = page();
  assert.ok(between(html, '<p class="doc-meta">', "</p>").includes(`<time datetime="${ONE_TIME_LICENSE_GUIDE_LASTMOD}">`));
  const lastmod = ONE_TIME_LICENSE_GUIDE_LASTMOD > PRICING_LASTMOD ? ONE_TIME_LICENSE_GUIDE_LASTMOD : PRICING_LASTMOD;
  assert.match(read("sitemap.xml"), new RegExp(`<loc>${url.replaceAll(".", "\\.")}</loc>\\s*<lastmod>${lastmod}</lastmod>`));
  const llms = read("llms.txt");
  assert.ok(llms.includes(`[${copy.navLabel}](${url})`));
  assert.ok(llms.includes(`- ${H1} → [${copy.navLabel}](${url})`));
  assert.ok(!read("de/llms.txt").includes(url), "English only");
});

test("downloads carry the guide's attribution", () => {
  const html = page();
  const intro = html.match(/<section[^>]*data-guide-intro[^>]*>[\s\S]*?<\/section>/)[0];
  const introContents = [...intro.matchAll(/data-download-content="([^"]+)"/g)].map(([, content]) => content);
  assert.deepEqual(introContents, hasWindowsRelease ? ["one_time_guide_intro_mac", "one_time_guide_intro_windows"] : ["one_time_guide_intro_mac"]);
  assert.ok(intro.includes("utm_content=one_time_guide_intro_mac"));
  const trial = html.match(/<section[^>]*data-guide-trial[^>]*>[\s\S]*?<\/section>/)[0];
  assert.deepEqual([...trial.matchAll(/data-download-content="([^"]+)"/g)].map(([, content]) => content), hasWindowsRelease ? ["one_time_guide_mac", "one_time_guide_windows"] : ["one_time_guide_mac"]);
  assert.ok(trial.includes("utm_content=one_time_guide_mac"));
});

test("the setup section offers the Homebrew command once and the Windows installer caveat", () => {
  const body = main(page());
  assert.equal(body.split("<code>brew install --cask deepviewsdev/tap/dictivo</code>").length - 1, 1);
  const steps = text(between(body, 'id="one-time-license-section-5"', "</section>"));
  assert.ok(steps.includes("brew install --cask deepviewsdev/tap/dictivo"));
  if (hasWindowsRelease) assert.match(steps, /SmartScreen/);
  else assert.match(steps, /temporarily unavailable/);
  assert.ok(between(body, 'id="one-time-license-section-5"', "</section>").includes('href="/guides/first-local-dictation/"'));
});

test("related pages and evidence links", () => {
  const related = between(page(), 'id="one-time-license-related"', "</section>");
  for (const href of [
    "https://dictivo.app/guides/offline-dictation-on-windows/",
    "https://dictivo.app/guides/offline-dictation-on-mac/",
    "https://dictivo.app/guides/best-speech-to-text-apps-for-mac/",
    "https://dictivo.app/guides/mac-dictation-app-no-subscription/",
    "https://dictivo.app/compare/superwhisper-alternative/",
    "https://dictivo.app/pricing/",
    "https://dictivo.app/privacy/where-dictation-audio-goes/",
  ]) {
    assert.ok(related.includes(`<a href="${href}">`), href);
  }
  const references = between(page(), 'id="one-time-license-references"', "</section>");
  const links = [...references.matchAll(/<li><a href="([^"]+)">([^<]+)<\/a><\/li>/g)].map(([, href, label]) => [href, text(label)]);
  for (const host of ["superwhisper.com", "handy.computer", "jestype.com", "voicetypr.com", "koegaki.com", "speakpad.app", "spokenly.app", "voxtira.com", "lazytype.com"]) {
    const found = links.filter(([href]) => new URL(href).hostname === host);
    assert.ok(found.length > 0, host);
    for (const [href, label] of found) assert.ok(label.endsWith(`(checked ${ONE_TIME_LICENSE_GUIDE_CHECKED})`), `${href} is not dated`);
  }
  assert.ok(links.some(([href]) => href === "https://github.com/deepviewsdev/homebrew-tap"), "Homebrew tap");
});
