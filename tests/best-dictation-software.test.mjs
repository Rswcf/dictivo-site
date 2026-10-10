import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { firstPublished } from "../data/first-published.mjs";
import { LOCAL_OFFER, PRICING_LASTMOD, introOfferActive, offerDate } from "../data/local-offer.mjs";
import { COMPARE_PAGES } from "../data/compare-pages.mjs";
import { OFFLINE_DICTATION_GUIDE_COPY } from "../data/offline-dictation-guide.mjs";
import { INTRO_OFFER, REGULAR_OFFER } from "./helpers/offer-states.mjs";
import {
  BEST_DICTATION_SOFTWARE_CHECKED,
  BEST_DICTATION_SOFTWARE_LASTMOD,
  BEST_DICTATION_SOFTWARE_ORDER,
  bestDictationSoftwareCopy,
} from "../data/best-dictation-software-guide.mjs";

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
const path = "/guides/best-dictation-software/";
const url = `https://dictivo.app${path}`;
const page = () => read(`${path.slice(1)}index.html`);
const release = JSON.parse(readFileSync(new URL("../data/release.json", import.meta.url), "utf8"));
const hasWindowsRelease = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, body]) => [JSON.parse(body)].flat());
const alternates = (html) => [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]);
const between = (html, from, to) => html.slice(html.indexOf(from), html.indexOf(to, html.indexOf(from)));
const main = (html) => html.split("<main")[1].split("</main>")[0];
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ");
const withoutPrices = (html) => html.replace(/<span class="price">[^<]*<\/span>/g, "");
const count = (value, token) => value.split(token).length - 1;
const section = (html, n) => between(html, `id="best-software-section-${n}"`, "</section>");
const tableRows = (table) => table.split("<tbody>")[1].split("<tr>").slice(1).map((row) => [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(([, cell]) => text(cell).trim()));
const figures = (value) => [...new Set(value.match(/[$€]\d[\d,]*(?:\.\d+)?/g) || [])].sort();
const year = BEST_DICTATION_SOFTWARE_CHECKED.slice(0, 4);
const checkedOn = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${BEST_DICTATION_SOFTWARE_CHECKED}T00:00:00Z`));
const expectedLastmod = BEST_DICTATION_SOFTWARE_LASTMOD > PRICING_LASTMOD ? BEST_DICTATION_SOFTWARE_LASTMOD : PRICING_LASTMOD;
const COMPETITORS = /Wispr|Superwhisper|MacWhisper|VoiceInk|Spokenly|Voibe|Dragon|Handy/;

test("the dictation software guide is a self-canonical English-only page titled with the year it was checked", () => {
  const html = page();
  assert.ok(html.includes('<html lang="en">'));
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.ok(html.includes(`<h1>Best dictation software in ${year}, by what you need</h1>`));
  assert.ok(html.includes(`<title>Best Dictation Software ${year}: Mac, Windows &amp; Free Options</title>`));
  assert.ok(html.includes(`<link rel="canonical" href="${url}" />`));
  assert.deepEqual(alternates(html), [["en", url], ["x-default", url]]);
  // The navigation label, used by llms.txt and the breadcrumb, carries no year.
  assert.doesNotMatch(bestDictationSoftwareCopy({ windows: true }).navLabel, /\d{4}/);
});

test("the page says who wrote it before it names any other product", () => {
  const body = text(main(page()));
  const disclosure = body.indexOf("This guide is written by Dictivo, which makes one of the apps listed.");
  assert.ok(disclosure > 0, "disclosure in the lede");
  assert.ok(disclosure < body.search(COMPETITORS), "disclosure before the first product name");
  assert.ok(body.includes("No vendor paid to be listed."));
  assert.ok(body.includes("Nothing here is an accuracy or speed ranking"));
  assert.ok(body.includes(`read on ${checkedOn}`));
});

test("the answer comes first, then the table, contents, groups by need, product notes, trial, FAQ and references", () => {
  const html = page();
  const order = [
    'class="doc-lede"',
    'id="best-software-answer"',
    'id="best-software-quick-reference"',
    "<nav aria-label=",
    ...Array.from({ length: 10 }, (_, index) => `id="best-software-section-${index + 1}"`),
    "data-guide-trial",
    'id="best-software-faq"',
    'id="best-software-references"',
  ];
  const positions = order.map((marker) => [marker, html.indexOf(marker)]);
  for (const [marker, position] of positions) assert.ok(position > 0, `missing ${marker}`);
  for (let index = 1; index < positions.length; index++) {
    assert.ok(positions[index - 1][1] < positions[index][1], `${positions[index - 1][0]} before ${positions[index][0]}`);
  }
  // Groups are unordered lists: picks, not a ranking.
  for (const n of [1, 2, 3, 5, 6]) assert.ok(section(html, n).includes("<ul>") && !section(html, n).includes("<ol>"), `section ${n}`);
  assert.ok(!html.includes('id="best-software-dictivo"'), "no separate closing Dictivo section");
});

test("the table lists built-in tools, then apps alphabetically, then Dictivo, with five facts each", () => {
  const html = page();
  const rows = tableRows(between(html, 'id="best-software-quick-reference"', "</table>"));
  assert.deepEqual(rows.map((row) => row[0]), BEST_DICTATION_SOFTWARE_ORDER.map((name) => name.replace("'", "'")));
  for (const row of rows) assert.equal(row.length, 5, row[0]);
  const apps = BEST_DICTATION_SOFTWARE_ORDER.slice(5, -1);
  assert.deepEqual(apps, [...apps].sort((a, b) => a.localeCompare(b)), "apps in alphabetical order");
  const dictivo = rows.at(-1);
  assert.equal(dictivo[0], "Dictivo (this site's product)");
  assert.equal(dictivo[1].includes("Windows"), hasWindowsRelease, "Windows only while Windows downloads are public");
  assert.ok(between(html, 'id="best-software-quick-reference"', "</table>").includes(`checked on ${checkedOn}`));
});

test("other products' prices match what the vendor and the site's other pages state", () => {
  const html = page();
  const rows = new Map(tableRows(between(html, 'id="best-software-quick-reference"', "</table>")).map((row) => [row[0], row]));
  const pricing = (slug) => COMPARE_PAGES.find((item) => item.slug === slug).rows.find((row) => row.label === "Pricing model").competitor;
  // Each source is where the site already states that price; the two must not drift apart.
  const same = [
    ["Superwhisper", pricing("superwhisper-alternative")],
    ["MacWhisper", pricing("macwhisper-alternative")],
    ["VoiceInk", pricing("voiceink-alternative")],
    ["Wispr Flow", pricing("wispr-flow-alternative")],
  ];
  for (const [app, source] of same) assert.deepEqual(figures(rows.get(app)[4]), figures(source), app);
  // Voibe: the Mac offline guide also gives the struck-through list price.
  for (const figure of figures(rows.get("Voibe")[4])) assert.ok(OFFLINE_DICTATION_GUIDE_COPY.en.prices.Voibe.includes(figure), `Voibe ${figure}`);
  assert.deepEqual(figures(rows.get("Spokenly")[4]), ["$9.99", "$99.99"]);
  assert.ok(rows.get("Wispr Flow")[3].includes("2,000 words a week on desktop, 1,000 on mobile"));
  // Dragon: no price in the table; the one sentence, with its archive date, in the note.
  assert.equal(rows.get("Dragon Professional v16")[4], "No public price: sales contact only");
  assert.ok(text(section(html, 9)).includes("archived 11 February 2025"));
  // Built-in tools are built in, never called free.
  for (const app of BEST_DICTATION_SOFTWARE_ORDER.slice(0, 4)) assert.doesNotMatch(rows.get(app)[3], /free/i, app);
  assert.doesNotMatch(withoutPrices(main(html)), /US\$/);
});

test("Dictivo appears only in the groups it fits, and states its limits", () => {
  const html = page();
  const has = (n) => text(section(html, n)).includes("Dictivo");
  for (const n of [1, 2, 4, 6]) assert.ok(has(n), `section ${n} includes Dictivo`);
  assert.equal(has(3), hasWindowsRelease, "Windows group only while Windows downloads are public");
  assert.ok(!has(5), "several languages: no published language list");
  assert.ok(!has(10), "the testing advice names no product");
  const phone = text(section(html, 7));
  assert.equal(count(phone, "Dictivo"), 1);
  assert.ok(phone.includes("Dictivo has no mobile app."));
  const recordings = text(section(html, 8));
  assert.equal(count(recordings, "Dictivo"), 1);
  assert.ok(recordings.includes("Dictivo is for live dictation and does not import recorded files."));
  const notes = section(html, 9);
  const headings = [...notes.matchAll(/<h3 id="best-software-section-9-entry-\d+">([^<]+)<\/h3>/g)].map(([, title]) => title.replace("&#39;", "'"));
  assert.equal(headings.length, 13);
  assert.equal(headings.at(-1), "Dictivo (this site's product)");
  const dictivo = notes.slice(notes.lastIndexOf("<h3"));
  assert.match(dictivo, /<p>Dictivo is this site(&#39;|')s product\./);
  assert.ok(dictivo.includes("pastes the text into the app you are using"));
  assert.ok(dictivo.includes("It has no mobile app and does not import recorded files."));
  assert.ok(dictivo.includes('href="/pricing/"'));
  // Only the Dictivo items quote a Dictivo price.
  const body = main(html);
  for (const match of body.matchAll(/<span class="price">/g)) {
    const before = body.slice(0, match.index);
    const start = Math.max(before.lastIndexOf("<tr>"), before.lastIndexOf("<li>"), before.lastIndexOf("<h3"));
    assert.ok(before.slice(start).includes("Dictivo"), `price outside a Dictivo item: …${before.slice(-120)}`);
  }
});

test("the Dictivo price comes from the Local offer, dated only while the introductory price runs", () => {
  const body = main(page());
  const prices = count(body, '<span class="price">');
  if (introOfferActive()) {
    assert.equal(prices, 3 * 3 + 1, "local, regular and renewal in three places, plus Cloud Fast");
    assert.equal(count(text(body), offerDate(LOCAL_OFFER.introPriceUntil, "en")), 3);
  } else {
    assert.equal(prices, 2 * 3 + 1, "local and renewal in three places, plus Cloud Fast");
    assert.equal(count(text(body), "from 1 November"), 0);
  }
});

test("after the 1 November rollover every Dictivo sentence states one undated price", () => {
  for (const windows of [true, false]) {
    const after = bestDictationSoftwareCopy({ windows, offer: REGULAR_OFFER });
    assert.equal(count(after.dictivoPrice, "{{price.local.inline}}"), 1);
    assert.equal(count(after.dictivoPrice, "{{price.regular."), 0);
    assert.equal(count(after.dictivoPrice, "{{price.renewal.inline}}"), 1);
    assert.doesNotMatch(after.dictivoPrice, /2026|until|from 1 November|introductory|undefined|null|NaN/);
    const before = bestDictationSoftwareCopy({ windows, offer: INTRO_OFFER });
    assert.equal(count(before.dictivoPrice, "{{price.local.inline}}"), 1);
    assert.equal(count(before.dictivoPrice, "{{price.regular.inline}}"), 1);
    assert.ok(before.dictivoPrice.includes(offerDate(INTRO_OFFER.introPriceUntil, "en")));
    for (const copy of [after, before]) {
      // Every string with a price placeholder is Dictivo's own: its price cell or a Dictivo sentence.
      const strings = [];
      const walk = (value) => (typeof value === "string" ? strings.push(value) : value && typeof value === "object" && Object.values(value).forEach(walk));
      walk(copy);
      for (const value of strings.filter((item) => item.includes("{{price."))) {
        assert.ok(value === copy.dictivoPrice || value.includes("Dictivo"), value);
        if (copy === after) assert.doesNotMatch(value, /until|from 1 November|introductory/, value);
      }
      assert.doesNotMatch(JSON.stringify(copy), /US\$|\$29\b|\$24\b|\$77\b|\$97\b|\$8\.99/);
      assert.doesNotMatch(`${copy.metaTitle} ${copy.metaDescription}`, /\$/);
    }
  }
});

test("the page makes no ranking or accuracy claims and keeps the site's wording rules", () => {
  // The environment line is the one place that says what the page is not.
  const body = text(main(page())).replace("Nothing here is an accuracy or speed ranking", "");
  assert.doesNotMatch(body, /accura|fastest|most accurate|best overall|winner|#1|types directly|types into|inserts text|launch price/i);
  assert.equal(count(body, "tested"), 1, "only 'the apps were not tested against each other'");
  assert.doesNotMatch(page(), /FILL_IN|TODO|undefined|\{\{price\./);
});

test("every reference is a vendor's own page with the check date", () => {
  const references = [...between(page(), 'id="best-software-references"', "</ul>").matchAll(/<li><a href="([^"]+)">([^<]+)<\/a><\/li>/g)];
  assert.ok(references.length >= 20, `${references.length} references`);
  const hosts = [
    "support.apple.com", "www.apple.com", "support.microsoft.com", "support.google.com", "dragon.nuance.com", "handy.computer", "github.com",
    "www.macwhisper.com", "spokenly.app", "superwhisper.com", "tryvoiceink.com", "www.getvoibe.com", "wisprflow.ai",
  ];
  for (const [, href, label] of references) {
    assert.ok(hosts.includes(new URL(href).hostname), href);
    assert.ok(label.endsWith(`(checked ${BEST_DICTATION_SOFTWARE_CHECKED})`), label);
  }
});

test("the guide is a TechArticle with an image and no list, FAQ, review or offer schema", () => {
  const html = page();
  const ld = jsonLd(html);
  assert.deepEqual(ld.map((node) => node["@type"]), ["Organization", "TechArticle", "BreadcrumbList"]);
  const article = ld[1];
  assert.equal(article.inLanguage, "en");
  assert.equal(article.headline, `Best Dictation Software ${year}: Mac, Windows & Free Options`);
  assert.equal(article.image, html.match(/<meta property="og:image" content="([^"]+)"/)[1]);
  assert.equal(article.publisher["@id"], "https://dictivo.app/#org");
  assert.equal(article.author["@id"], "https://dictivo.app/#org");
  assert.equal(article.datePublished, firstPublished("guides/best-dictation-software", "en"));
  assert.equal(article.dateModified, expectedLastmod);
  assert.doesNotMatch(JSON.stringify(ld), /"(ItemList|FAQPage|Offer|Product|Review|AggregateRating)"/);
  assert.equal(ld[2].itemListElement[1].item, url);
  assert.ok(html.includes(`<time datetime="${expectedLastmod}">`));
  assert.match(read("sitemap.xml"), new RegExp(`<loc>${url.replaceAll(".", "\\.")}</loc>\\s*<lastmod>${expectedLastmod}</lastmod>`));
});

test("the trial panel offers the Mac download and, while public, the Windows one", () => {
  const trial = between(page(), "data-guide-trial", "</section>");
  assert.ok(trial.includes("data-platform-downloads"));
  assert.ok(trial.includes("utm_content=best_software_mac"));
  assert.equal(trial.includes("utm_content=best_software_windows"), hasWindowsRelease);
  assert.ok(trial.includes('href="/pricing/"'));
});

test("llms.txt lists the guide in English only", () => {
  const llms = read("llms.txt");
  assert.ok(llms.includes(`[Best dictation software](${url})`));
  assert.ok(llms.includes("Which dictation software is free, works offline, or runs on Windows as well as Mac?"));
  assert.ok(!read("de/llms.txt").includes(url));
});

test("readers reach the guide from the Mac list, both offline guides and the English comparison hub", () => {
  const link = `href="${path}"`;
  const absolute = `href="${url}"`;
  assert.ok(main(read("guides/best-speech-to-text-apps-for-mac/index.html")).includes(absolute), "Mac list related pages");
  assert.ok(main(read("guides/offline-dictation-on-windows/index.html")).includes(absolute), "Windows offline guide related pages");
  assert.ok(main(read("guides/offline-dictation-on-mac/index.html")).includes(link), "Mac offline guide, English");
  assert.ok(main(read("compare/index.html")).includes(link), "English comparison hub");
  for (const other of ["de/", "ja/", "fr/", "zh-hant/"]) {
    assert.ok(!read(`${other}compare/index.html`).includes(path), `${other} comparison hub`);
    assert.ok(!read(`${other}guides/offline-dictation-on-mac/index.html`).includes(path), `${other} offline guide`);
  }
  // The guide links back to the Mac list with a descriptive anchor, so the two split the work.
  assert.ok(section(page(), 4).includes('<a href="/guides/best-speech-to-text-apps-for-mac/">Best speech-to-text apps for Mac, compared by workflow</a>'));
  const sitemap = read("sitemap.xml");
  for (const [loc, date] of [["guides/best-speech-to-text-apps-for-mac/", "2026-10-10"], ["guides/offline-dictation-on-windows/", "2026-10-10"], ["guides/offline-dictation-on-mac/", "2026-10-10"]]) {
    const lastmod = date > PRICING_LASTMOD ? date : PRICING_LASTMOD;
    assert.match(sitemap, new RegExp(`<loc>https://dictivo\\.app/${loc}</loc>\\s*<lastmod>${lastmod}</lastmod>`), loc);
  }
});
