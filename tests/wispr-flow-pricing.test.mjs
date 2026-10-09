import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { firstPublished } from "../data/first-published.mjs";
import { LOCAL_OFFER, PRICING_LASTMOD, introOfferActive, offerDate } from "../data/local-offer.mjs";
import { WISPR_FLOW_PRICING_CHECKED, WISPR_FLOW_PRICING_LASTMOD, wisprFlowPricingCopy } from "../data/wispr-flow-pricing-guide.mjs";

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
const path = "/guides/wispr-flow-pricing/";
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
const expectedLastmod = WISPR_FLOW_PRICING_LASTMOD > PRICING_LASTMOD ? WISPR_FLOW_PRICING_LASTMOD : PRICING_LASTMOD;

// data/local-offer.mjs as the 2026-11-01 runbook (step 1) leaves it.
const AFTER = Object.freeze({ ...LOCAL_OFFER, price: 49, regularPrice: 49, introPriceUntil: null, regularPriceFrom: null });
const INTRO = Object.freeze({ ...LOCAL_OFFER, price: 29, regularPrice: 49, introPriceUntil: "2026-10-31", regularPriceFrom: "2026-11-01" });

test("the Wispr Flow pricing page is a self-canonical English-only page", () => {
  const html = page();
  assert.ok(html.includes('<html lang="en">'));
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.ok(html.includes("<h1>Wispr Flow pricing: what each plan costs and what it includes</h1>"));
  assert.ok(html.includes("<title>Wispr Flow Pricing: Free, Pro, Growth and Student Plans</title>"));
  assert.ok(html.includes(`<link rel="canonical" href="${url}" />`));
  assert.deepEqual(alternates(html), [["en", url], ["x-default", url]]);
});

test("the answer comes first, then the plan table, contents, sections, Dictivo, trial, FAQ and references", () => {
  const html = page();
  const order = [
    'id="wispr-pricing-answer"',
    'id="wispr-pricing-quick-reference"',
    "<nav aria-label=",
    ...Array.from({ length: 6 }, (_, index) => `id="wispr-pricing-section-${index + 1}"`),
    'id="wispr-pricing-dictivo"',
    "data-guide-trial",
    'id="wispr-pricing-faq"',
    'id="wispr-pricing-references"',
  ];
  const positions = order.map((marker) => [marker, html.indexOf(marker)]);
  for (const [marker, position] of positions) assert.ok(position > 0, `missing ${marker}`);
  for (let index = 1; index < positions.length; index++) {
    assert.ok(positions[index - 1][1] < positions[index][1], `${positions[index - 1][0]} before ${positions[index][0]}`);
  }
});

test("the page states Wispr Flow's own prices, limits and terms, with both statements where they differ", () => {
  const html = page();
  const answer = text(between(html, 'id="wispr-pricing-answer"', "</section>"));
  for (const fact of ["$0", "2,000", "1,000", "$15 per user per month", "$144 per user per year", "$12 a month", "$23", "$216", "$33", "$312", "50% off Pro"]) {
    assert.ok(answer.includes(fact), fact);
  }
  const table = between(html, 'id="wispr-pricing-quick-reference"', "</table>");
  const rows = table.split("<tbody>")[1].split("<tr>").slice(1);
  assert.equal(rows.length, 6);
  for (const row of rows) assert.equal((row.match(/<t[hd][\s>]/g) || []).length, 5, row);
  for (const figure of ["$7.50 a month", "$72 a year", "$26 a month", "$18 a month"]) assert.ok(table.includes(figure), figure);
  const growth = between(html, 'id="wispr-pricing-section-3"', "</section>");
  assert.equal(growth.split("<tbody>")[1].split("<tr>").slice(1).length, 2, "two Growth options");
  const students = text(between(html, 'id="wispr-pricing-section-4"', "</section>"));
  for (const statement of ["50% off Flow Pro", "$7.50 a month or $72 a year", "3 months free, then $6/month"]) assert.ok(students.includes(statement), statement);
  const billing = text(between(html, 'id="wispr-pricing-section-5"', "</section>"));
  assert.ok(billing.includes("we do not add VAT, GST, or other local sales tax"));
  assert.ok(billing.includes("we will charge tax when required to do so"));
  assert.ok(billing.includes("Refunds are only issued if required by law"));
  assert.ok(text(between(html, 'id="wispr-pricing-section-6"', "</section>")).includes("Transcription always occurs on the cloud"));
  // Time-limited promotions stay out; struck-through or misread prices too.
  assert.doesNotMatch(main(html), /October 31|through October|CRED|Zepto|\$30\b|\$10\b/);
  assert.ok(html.includes(`checked on ${new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${WISPR_FLOW_PRICING_CHECKED}T00:00:00Z`))}`));
});

test("Dictivo appears only in its disclosed section and the trial panel", () => {
  const html = page();
  const sections = between(html, 'id="wispr-pricing-answer"', 'id="wispr-pricing-dictivo"');
  assert.ok(!sections.includes("Dictivo"), "the Wispr Flow sections do not name Dictivo");
  const faq = between(html, 'id="wispr-pricing-faq"', "</section>");
  assert.ok(!faq.includes("Dictivo"), "the FAQ does not name Dictivo");
  const dictivo = between(html, 'id="wispr-pricing-dictivo"', "</section>");
  assert.match(dictivo, /<p>Dictivo is this site(&#39;|')s product\./);
  assert.ok(dictivo.includes("pastes the text into the app you are using"));
  assert.ok(dictivo.includes("no mobile app and no meeting notetaker"));
  assert.ok(dictivo.includes('href="/compare/wispr-flow-alternative/"'));
  assert.ok(dictivo.includes('href="/pricing/"'));
  assert.equal(dictivo.includes("Mac and Windows"), hasWindowsRelease, "Windows only while Windows downloads are public");
  assert.doesNotMatch(html, /FILL_IN|TODO|undefined|\{\{price\.|types directly|types into|inserts text|accura|launch price/i);
  assert.doesNotMatch(withoutPrices(html), /US\$/);
});

test("the Dictivo price comes from the Local offer, dated only while the introductory price runs", () => {
  const dictivo = between(page(), 'id="wispr-pricing-dictivo"', "</section>");
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
    const after = wisprFlowPricingCopy({ windows, offer: AFTER });
    const sentence = after.dictivo.paragraphs.join(" ");
    assert.equal(count(sentence, "{{price.local.inline}}"), 1, sentence);
    assert.equal(count(sentence, "{{price.regular."), 0, sentence);
    assert.equal(count(sentence, "{{price.renewal.inline}}"), 1, sentence);
    assert.doesNotMatch(sentence, /2026|until|from 1 November|introductory/, sentence);
    assert.doesNotMatch(sentence, /undefined|null|NaN|Invalid Date/, sentence);

    const before = wisprFlowPricingCopy({ windows, offer: INTRO }).dictivo.paragraphs.join(" ");
    assert.equal(count(before, "{{price.local.inline}}"), 1, before);
    assert.equal(count(before, "{{price.regular.inline}}"), 1, before);
    assert.ok(before.includes(offerDate(INTRO.introPriceUntil, "en")) && before.includes(offerDate(INTRO.regularPriceFrom, "en")), before);

    // Only the Dictivo section quotes a Dictivo price, and no copy writes one literally.
    for (const copy of [after, wisprFlowPricingCopy({ windows, offer: INTRO })]) {
      const { dictivo, ...rest } = copy;
      assert.ok(!JSON.stringify(rest).includes("{{price."), "price placeholders outside the Dictivo section");
      assert.doesNotMatch(JSON.stringify(copy), /US\$|\$29\b|\$49\b|\$24\b/);
      assert.doesNotMatch(`${copy.metaTitle} ${copy.metaDescription}`, /\$/);
    }
  }
});

test("every reference is a Wispr Flow page with its check date", () => {
  const references = [...between(page(), 'id="wispr-pricing-references"', "</ul>").matchAll(/<li><a href="([^"]+)">([^<]+)<\/a><\/li>/g)];
  assert.equal(references.length, 10);
  for (const [, href, label] of references) {
    assert.ok(["wisprflow.ai", "docs.wisprflow.ai"].includes(new URL(href).hostname), href);
    assert.ok(label.endsWith(`(checked ${WISPR_FLOW_PRICING_CHECKED})`), label);
  }
});

test("the Wispr Flow pricing page is a TechArticle with an image and no FAQ or Offer schema", () => {
  const html = page();
  const ld = jsonLd(html);
  const article = ld.find((node) => node["@type"] === "TechArticle");
  assert.equal(article.inLanguage, "en");
  assert.equal(article.headline, "Wispr Flow Pricing: Free, Pro, Growth and Student Plans");
  assert.equal(article.image, html.match(/<meta property="og:image" content="([^"]+)"/)[1]);
  assert.deepEqual(article.author, { "@type": "Organization", "@id": "https://dictivo.app/#org", name: "Dictivo", url: "https://dictivo.app/" });
  assert.equal(article.publisher["@id"], "https://dictivo.app/#org");
  assert.equal(article.datePublished, firstPublished("guides/wispr-flow-pricing", "en"));
  assert.equal(article.dateModified, expectedLastmod);
  assert.ok(!ld.some((node) => node["@type"] === "FAQPage"), "no FAQPage");
  assert.ok(!JSON.stringify(ld).includes('"Offer"'), "no Offer for another vendor's prices");
  assert.equal(ld.find((node) => node["@type"] === "BreadcrumbList").itemListElement[1].item, url);
  assert.ok(html.includes(`<time datetime="${expectedLastmod}">`));
});

test("readers reach the Wispr Flow pricing page from the Wispr Flow comparison, the Windows guide and llms.txt", () => {
  const html = page();
  assert.ok(html.includes("utm_content=wispr_pricing"));
  assert.ok(html.includes('data-platform="macos"'));
  const compare = read("compare/wispr-flow-alternative/index.html");
  assert.ok(main(compare).includes(`href="${path}"`), "English Wispr Flow comparison");
  assert.ok(compare.includes('datetime="2026-10-09"'), "English comparison re-checked on 2026-10-09");
  const de = read("de/compare/wispr-flow-alternative/index.html");
  assert.ok(!de.includes(path), "German Wispr Flow comparison");
  assert.ok(de.includes('datetime="2026-09-18"') && !de.includes('datetime="2026-10-09"'), "German comparison keeps its date");
  assert.ok(main(read("guides/offline-dictation-on-windows/index.html")).includes(`href="${url}"`), "Windows guide related pages");
  assert.ok(read("llms.txt").includes(url));
  assert.ok(!read("de/llms.txt").includes(url));
  assert.match(read("sitemap.xml"), new RegExp(`<loc>${url.replaceAll(".", "\\.")}</loc>\\s*<lastmod>${expectedLastmod}</lastmod>`));
  assert.match(read("sitemap.xml"), /<loc>https:\/\/dictivo\.app\/compare\/wispr-flow-alternative\/<\/loc>\s*<lastmod>2026-10-09<\/lastmod>/);
});
