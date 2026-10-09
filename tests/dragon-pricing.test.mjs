import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { firstPublished } from "../data/first-published.mjs";
import { LOCAL_OFFER, PRICING_LASTMOD, introOfferActive, offerDate } from "../data/local-offer.mjs";
import { INTRO_OFFER, REGULAR_OFFER } from "./helpers/offer-states.mjs";
import { DRAGON_PRICING_CHECKED, DRAGON_PRICING_LASTMOD, dragonPricingCopy } from "../data/dragon-pricing-guide.mjs";

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
const path = "/guides/dragon-pricing/";
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
const expectedLastmod = DRAGON_PRICING_LASTMOD > PRICING_LASTMOD ? DRAGON_PRICING_LASTMOD : PRICING_LASTMOD;


test("the Dragon pricing page is a self-canonical English-only page", () => {
  const html = page();
  assert.ok(html.includes('<html lang="en">'));
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.ok(html.includes("<h1>What Dragon dictation costs: Professional, Medical One, Anywhere and Mac</h1>"));
  assert.ok(html.includes("<title>Dragon Dictation Pricing: Professional, Medical One, Mac</title>"));
  assert.ok(html.includes(`<link rel="canonical" href="${url}" />`));
  assert.deepEqual(alternates(html), [["en", url], ["x-default", url]]);
});

test("the answer comes first, then the product table, contents, sections, Dictivo, trial, FAQ and references", () => {
  const html = page();
  const order = [
    'id="dragon-pricing-answer"',
    'id="dragon-pricing-quick-reference"',
    "<nav aria-label=",
    ...Array.from({ length: 5 }, (_, index) => `id="dragon-pricing-section-${index + 1}"`),
    'id="dragon-pricing-dictivo"',
    "data-guide-trial",
    'id="dragon-pricing-faq"',
    'id="dragon-pricing-references"',
  ];
  const positions = order.map((marker) => [marker, html.indexOf(marker)]);
  for (const [marker, position] of positions) assert.ok(position > 0, `missing ${marker}`);
  for (let index = 1; index < positions.length; index++) {
    assert.ok(positions[index - 1][1] < positions[index][1], `${positions[index - 1][0]} before ${positions[index][0]}`);
  }
});

test("the page states what Nuance and Microsoft publish, and no Dragon Professional price", () => {
  const html = page();
  const answer = text(between(html, 'id="dragon-pricing-answer"', "</section>"));
  for (const fact of ["no longer publishes a price", "$123 per user per month", "$1,476", "1 July 2026", "27 February 2023", "22 October 2018"]) {
    assert.ok(answer.includes(fact), fact);
  }
  // Nuance's product page shows no price; old list prices and reseller quotes stay out.
  assert.doesNotMatch(main(html), /\$699|\$678|\$599|\$525|\$399|\$299|\$150|\$89|\$79|\$14\.99|\$15/);
  const table = between(html, 'id="dragon-pricing-quick-reference"', "</table>");
  const rows = table.split("<tbody>")[1].split("<tr>").slice(1);
  assert.equal(rows.length, 6);
  for (const row of rows) assert.equal((row.match(/<t[hd][\s>]/g) || []).length, 5, row);
  const medicalOne = between(html, 'id="dragon-pricing-section-2"', "</section>");
  const plans = medicalOne.split("<tbody>")[1].split("<tr>").slice(1);
  assert.equal(plans.length, 3);
  for (const figure of ["$123 a month", "$1,476", "$99 a month", "$1,188", "$20 a month", "$240"]) assert.ok(medicalOne.includes(figure), figure);
  assert.ok(medicalOne.includes("does not say whether tax is included"));
  assert.ok(html.includes(`checked on ${new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${DRAGON_PRICING_CHECKED}T00:00:00Z`))}`));
});

test("Dictivo appears only in its disclosed section and the trial panel, with no medical claim", () => {
  const html = page();
  const sections = between(html, 'id="dragon-pricing-answer"', 'id="dragon-pricing-dictivo"');
  assert.ok(!sections.includes("Dictivo"), "the Dragon sections do not name Dictivo");
  const faq = between(html, 'id="dragon-pricing-faq"', "</section>");
  assert.ok(!faq.includes("Dictivo"), "the FAQ does not name Dictivo");
  const dictivo = between(html, 'id="dragon-pricing-dictivo"', "</section>");
  assert.match(dictivo, /<p>Dictivo is this site(&#39;|')s product\./);
  assert.ok(dictivo.includes("not a clinical documentation product"));
  assert.ok(dictivo.includes("pastes the text into the app you are using"));
  assert.ok(dictivo.includes('href="/compare/dragon-alternative/"'));
  assert.ok(dictivo.includes('href="/pricing/"'));
  assert.equal(dictivo.includes("Mac and Windows"), hasWindowsRelease, "Windows only while Windows downloads are public");
  assert.doesNotMatch(html, /FILL_IN|TODO|undefined|\{\{price\.|types directly|types into|inserts text|accura|launch price|HIPAA|clinically/i);
  assert.doesNotMatch(withoutPrices(html), /US\$/);
});

test("the Dictivo price comes from the Local offer, dated only while the introductory price runs", () => {
  const dictivo = between(page(), 'id="dragon-pricing-dictivo"', "</section>");
  const prices = (dictivo.match(/<span class="price">/g) || []).length;
  if (introOfferActive()) {
    assert.equal(prices, 3, "local, regular and renewal");
    assert.ok(dictivo.includes(offerDate(LOCAL_OFFER.introPriceUntil, "en")));
    assert.ok(dictivo.includes(offerDate(LOCAL_OFFER.regularPriceFrom, "en")));
  } else {
    assert.equal(prices, 2, "local and renewal");
    assert.doesNotMatch(dictivo, /until|from 1 November/);
  }
});

test("the Dictivo sentence states one undated price after the 1 November rollover", () => {
  for (const windows of [true, false]) {
    const after = dragonPricingCopy({ windows, offer: REGULAR_OFFER });
    const sentence = after.dictivo.paragraphs.join(" ");
    assert.equal(count(sentence, "{{price.local.inline}}"), 1, sentence);
    assert.equal(count(sentence, "{{price.regular."), 0, sentence);
    assert.equal(count(sentence, "{{price.renewal.inline}}"), 1, sentence);
    assert.doesNotMatch(sentence, /2026|until|from 1 November|introductory/, sentence);
    assert.doesNotMatch(sentence, /undefined|null|NaN|Invalid Date/, sentence);

    const before = dragonPricingCopy({ windows, offer: INTRO_OFFER }).dictivo.paragraphs.join(" ");
    assert.equal(count(before, "{{price.local.inline}}"), 1, before);
    assert.equal(count(before, "{{price.regular.inline}}"), 1, before);
    assert.ok(before.includes(offerDate(INTRO_OFFER.introPriceUntil, "en")) && before.includes(offerDate(INTRO_OFFER.regularPriceFrom, "en")), before);

    // Only the Dictivo section quotes a Dictivo price, and no copy writes one literally.
    for (const copy of [after, dragonPricingCopy({ windows, offer: INTRO_OFFER })]) {
      const { dictivo, ...rest } = copy;
      assert.ok(!JSON.stringify(rest).includes("{{price."), "price placeholders outside the Dictivo section");
      assert.doesNotMatch(JSON.stringify(copy), /US\$|\$29\b|\$49\b|\$24\b/);
      assert.doesNotMatch(`${copy.metaTitle} ${copy.metaDescription}`, /\$/);
    }
  }
});

test("every reference is a Nuance, Microsoft or App Store page with its check date", () => {
  const references = [...between(page(), 'id="dragon-pricing-references"', "</ul>").matchAll(/<li><a href="([^"]+)">([^<]+)<\/a><\/li>/g)];
  assert.equal(references.length, 9);
  const official = new Set(["dragon.nuance.com", "nuance.custhelp.com", "marketplace.microsoft.com", "www.microsoft.com", "learn.microsoft.com", "apps.apple.com"]);
  for (const [, href, label] of references) {
    assert.ok(official.has(new URL(href.replaceAll("&amp;", "&")).hostname), href);
    assert.ok(label.endsWith(`(checked ${DRAGON_PRICING_CHECKED})`), label);
  }
});

test("the Dragon pricing page is a TechArticle with an image and no FAQ or Offer schema", () => {
  const html = page();
  const ld = jsonLd(html);
  const article = ld.find((node) => node["@type"] === "TechArticle");
  assert.equal(article.inLanguage, "en");
  assert.equal(article.headline, "Dragon Dictation Pricing: Professional, Medical One, Mac");
  assert.equal(article.image, html.match(/<meta property="og:image" content="([^"]+)"/)[1]);
  assert.deepEqual(article.author, { "@type": "Organization", "@id": "https://dictivo.app/#org", name: "Dictivo", url: "https://dictivo.app/" });
  assert.equal(article.publisher["@id"], "https://dictivo.app/#org");
  assert.equal(article.datePublished, firstPublished("guides/dragon-pricing", "en"));
  assert.equal(article.dateModified, expectedLastmod);
  assert.ok(!ld.some((node) => node["@type"] === "FAQPage"), "no FAQPage");
  assert.ok(!JSON.stringify(ld).includes('"Offer"'), "no Offer for another vendor's prices");
  assert.equal(ld.find((node) => node["@type"] === "BreadcrumbList").itemListElement[1].item, url);
  assert.ok(html.includes(`<time datetime="${expectedLastmod}">`));
});

test("readers reach the Dragon pricing page from the Dragon comparison, the Windows guide and llms.txt", () => {
  const html = page();
  assert.ok(html.includes("utm_content=dragon_pricing"));
  assert.ok(html.includes(`data-platform="${hasWindowsRelease ? "windows" : "macos"}"`));
  const compare = read("compare/dragon-alternative/index.html");
  assert.ok(main(compare).includes(`href="${path}"`), "English Dragon comparison");
  assert.ok(compare.includes('datetime="2026-10-09"'), "the comparison was re-dated with its Dragon price wording");
  assert.ok(!read("de/compare/dragon-alternative/index.html").includes(path), "German Dragon comparison");
  assert.ok(main(read("guides/offline-dictation-on-windows/index.html")).includes(`href="${url}"`), "Windows guide related pages");
  assert.ok(read("llms.txt").includes(url));
  assert.ok(!read("de/llms.txt").includes(url));
  assert.match(read("sitemap.xml"), new RegExp(`<loc>${url.replaceAll(".", "\\.")}</loc>\\s*<lastmod>${expectedLastmod}</lastmod>`));
});
