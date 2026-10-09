import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { LOCAL_OFFER, PRICING_LASTMOD, introOfferActive, offerDate } from "../data/local-offer.mjs";
import { pricingFaqs, pricingPageAnswer, pricingPriceChangeSection } from "../data/local-offer-copy.mjs";
import { PRICING_PAGE_COPY, PRICING_PAGE_LASTMOD } from "../data/pricing-page.mjs";
import { priceText } from "../scripts/lib/price-tokens.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
const read = (path) => readFileSync(`${dist}${path}`, "utf8");
const url = "https://dictivo.app/pricing/";
const page = () => read("pricing/index.html");
const release = JSON.parse(readFileSync(new URL("../data/release.json", import.meta.url), "utf8"));
const hasWindowsRelease = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, body]) => [JSON.parse(body)].flat());
const alternates = (html) => [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]);
// Rendered prices back to plain text, as a reader sees them.
const visible = (markup) => markup
  .replace(/<span class="price">([^<]*)<\/span>/g, "$1")
  .replace(/<!--\/?email_off-->/g, "")
  .replaceAll("&amp;", "&")
  .replaceAll("&#39;", "'")
  .replaceAll("&quot;", '"');
const resolved = (text) => text.replace(/\{\{price\.(\w+)\.(\w+)\}\}/g, (_token, amount, form) => priceText(amount, "en", form));
const section = (html, id) => {
  const start = html.indexOf(`id="${id}"`);
  assert.ok(start > 0, `missing #${id}`);
  return html.slice(start, html.indexOf("</section>", start));
};
const header = (html) => html.slice(html.indexOf('<header class="site-header"'), html.indexOf("</header>"));
const footer = (html) => html.slice(html.lastIndexOf('<footer class="site-footer"'));

test("/pricing/ is a self-canonical English page and no longer a redirect", () => {
  const html = page();
  assert.ok(html.includes('<html lang="en">'));
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.ok(html.includes("<h1>Dictivo pricing: what Local costs and what it includes</h1>"));
  assert.ok(html.includes(`<link rel="canonical" href="${url}" />`));
  assert.deepEqual(alternates(html), [["en", url], ["x-default", url]]);
  const redirects = read("_redirects").split("\n");
  assert.ok(!redirects.some((line) => /^\/pricing\b/.test(line)), "no /pricing redirect");
  for (const line of ["/download /#downloads 302", "/download/ /#downloads 302"]) assert.ok(redirects.includes(line), line);
});

test("the short answer comes before the plans and states the offer terms", () => {
  const html = page();
  assert.ok(html.indexOf('id="pricing-answer"') < html.indexOf('class="pricing-band"'), "answer precedes the cards");
  const answer = section(html, "pricing-answer").match(/<p>([\s\S]*?)<\/p>/)[1];
  assert.equal(visible(answer), resolved(pricingPageAnswer("en")));
  assert.ok(html.indexOf('class="pricing-band"') < html.indexOf('class="compare-table"'), "cards precede the table");
});

test("the plan cards reuse the homepage tiers with links that work away from the homepage", () => {
  const html = page();
  const band = html.slice(html.indexOf('class="pricing-band"'), html.indexOf('class="compare-table"'));
  assert.deepEqual([...band.matchAll(/data-od-id="(tier-[^"]+)"/g)].map(([, id]) => id), ["tier-free", "tier-local", "tier-cloud-fast"]);
  const free = band.slice(band.indexOf('data-od-id="tier-free"'), band.indexOf('data-od-id="tier-local"'));
  assert.match(free, /<a class="button button-secondary" href="\/#downloads">/, "Free card goes to the homepage downloads");
  assert.ok(!free.includes("data-download-content"), "the Free card link is not a download");
  assert.ok(band.includes('href="/checkout/local" data-local-checkout'));
  assert.ok(band.includes('href="/checkout/cloud-fast" data-cloud-fast-checkout'));
  assert.equal((band.match(/<p class="tier-tax"><span class="price">tax included<\/span>/g) || []).length, 2);
  // .doc-section restyles paragraphs, lists and links, so the cards must not sit inside one.
  const beforeBand = html.slice(0, html.indexOf('class="pricing-band"'));
  assert.ok(beforeBand.lastIndexOf("</section>") > beforeBand.lastIndexOf("<section"), "cards are outside every section");
  // Without offline-guide-page the comparison table keeps its 760px minimum and fits the desktop column.
  assert.ok(html.includes('<main class="doc-page" id="pricing-page">'));
  assert.ok(!html.includes("checkout-pending"), "no hidden checkout note");
  assert.ok(html.includes("license key from your purchase email"));
});

test("the comparison table prices Local from the offer and gates Windows", () => {
  const html = page();
  assert.equal((html.match(/class="compare-table"/g) || []).length, 1);
  const table = html.slice(html.indexOf('class="compare-table"'), html.indexOf("</table>"));
  const head = [...table.split("</thead>")[0].matchAll(/<th scope="col">([^<]*)<\/th>/g)].map(([, cell]) => cell);
  assert.deepEqual(head, ["", "Free Local", "Dictivo Local", "Cloud Fast"]);
  const rows = table.split("</thead>")[1].split("<tr>").slice(1);
  assert.ok(rows.length >= 7, `${rows.length} rows`);
  for (const row of rows) assert.equal((row.match(/<t[hd][\s>]/g) || []).length, 4, row);
  const price = rows.find((row) => row.includes('<th scope="row">Price</th>'));
  const localCell = price.match(/<td>[\s\S]*?<\/td>/g)[1];
  assert.equal((localCell.match(/<span class="price">/g) || []).length, introOfferActive() ? 3 : 2, localCell);
  if (introOfferActive()) assert.ok(localCell.includes(offerDate(LOCAL_OFFER.introPriceUntil, "en")), localCell);
  const platforms = rows.find((row) => row.includes('<th scope="row">Platforms</th>'));
  assert.equal(platforms.includes("Windows x64"), hasWindowsRelease, platforms);
  assert.ok(table.includes(`Checked on ${new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${PRICING_PAGE_LASTMOD}T00:00:00Z`))}`));
});

test("the price-change section and its FAQ appear only while the introductory offer runs", () => {
  const html = page();
  assert.equal(html.includes('id="pricing-section-price-change"'), Boolean(pricingPriceChangeSection("en")));
  assert.equal(html.includes("When does the Local price change?"), introOfferActive());
  const faq = section(html, "pricing-faq");
  const questions = [...faq.matchAll(/<span class="faq-question">([^<]*)<\/span>/g)].map(([, question]) => visible(question));
  assert.deepEqual(questions, pricingFaqs("en", LOCAL_OFFER, { windows: hasWindowsRelease }).map(([question]) => question));
  assert.ok(html.indexOf('id="pricing-answer"') < html.indexOf('id="pricing-faq"'));
});

test("the pricing page describes the software with every offer and no FAQ schema", () => {
  const ld = jsonLd(page());
  assert.equal(ld.filter((node) => node["@type"] === "Organization").length, 1);
  assert.equal(ld.find((node) => node["@type"] === "Organization")["@id"], "https://dictivo.app/#org");
  assert.ok(!ld.some((node) => node["@type"] === "FAQPage"), "no FAQPage");
  const app = ld.find((node) => node["@type"] === "SoftwareApplication");
  const home = jsonLd(read("index.html")).find((node) => node["@type"] === "SoftwareApplication");
  assert.deepEqual(app, home, "the same SoftwareApplication node as the homepage");
  const offers = [app.offers].flat();
  assert.ok(offers.some((offer) => offer.name === "Free Local" && offer.price === "0"));
  const local = offers.filter((offer) => offer.name === "Dictivo Local");
  assert.equal(local.length, introOfferActive() ? 2 : 1);
  if (introOfferActive()) {
    assert.equal(local.find((offer) => offer.priceValidUntil)?.priceValidUntil, LOCAL_OFFER.introPriceUntil);
    assert.equal(local.find((offer) => offer.priceValidFrom)?.priceValidFrom, LOCAL_OFFER.regularPriceFrom);
  }
  assert.equal(offers.find((offer) => offer.name === "Cloud Fast")?.price, "8.99");
  const crumbs = ld.find((node) => node["@type"] === "BreadcrumbList").itemListElement;
  assert.deepEqual(crumbs[1], { "@type": "ListItem", position: 2, name: "Pricing", item: url });
});

test("the pricing page carries no placeholders, literal offer dates or banned price wording", () => {
  const html = page();
  assert.doesNotMatch(html, /FILL_IN|TODO|undefined|\{\{price\.|Lemon Squeezy|launch price|regular price|tier-price-was/);
  // Offer dates and the Local price only come from data/local-offer-copy.mjs.
  for (const copy of Object.values(PRICING_PAGE_COPY)) {
    const text = JSON.stringify({ ...copy, tableCaption: copy.tableCaption("CHECKED"), tableRows: [copy.tableRows(true), copy.tableRows(false)] });
    assert.doesNotMatch(text, /2026|until|from 1 November|introductory|\{\{price\.(local|regular)\./);
  }
});

test("the sitemap lists /pricing/ with a date no older than the last price change", () => {
  const sitemap = read("sitemap.xml");
  const block = sitemap.match(/<url>\s*<loc>https:\/\/dictivo\.app\/pricing\/<\/loc>[\s\S]*?<\/url>/)?.[0];
  assert.ok(block, "pricing entry");
  const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)[1];
  assert.ok(lastmod >= PRICING_LASTMOD && lastmod >= PRICING_PAGE_LASTMOD, lastmod);
  assert.ok(page().includes(`<time datetime="${lastmod}">`), "visible date matches the sitemap");
  assert.deepEqual([...block.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]), [["en", url], ["x-default", url]]);
  assert.match(block, /<priority>0\.9<\/priority>/);
});

test("English pricing links lead to /pricing/; other languages keep their homepage section", () => {
  assert.ok(header(read("index.html")).includes('href="/pricing/"'), "English header");
  assert.ok(footer(read("index.html")).includes('href="/pricing/"'), "English footer");
  assert.ok(read("index.html").includes('<a class="button button-outline" href="#pricing">'), "the hero button stays on the homepage");
  assert.ok(header(read("de/index.html")).includes('href="/de/#pricing"'), "German header");
  assert.ok(!read("de/index.html").includes('href="/pricing/"'), "German homepage");
  const trial = read("guides/offline-dictation-on-mac/index.html").match(/<section[^>]*data-guide-trial[^>]*>[\s\S]*?<\/section>/)[0];
  assert.ok(trial.includes('href="/pricing/"'), "guide trial panel");
  assert.ok(read("demo/index.html").includes('<a href="/pricing/">See pricing</a>'), "film page");
  assert.ok(read("llms.txt").includes(`[Pricing](${url})`));
  assert.ok(!read("llms.txt").includes("/#pricing"), "English llms.txt");
  assert.ok(read("de/llms.txt").includes("https://dictivo.app/de/#pricing"), "German llms.txt");
  assert.ok(existsSync(`${dist}pricing/index.html`));
});
