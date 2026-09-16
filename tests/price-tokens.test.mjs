import test from "node:test";
import assert from "node:assert/strict";
import { PRICE_AMOUNTS, priceToken, resolvePriceTokens, schemaPrice } from "../scripts/lib/price-tokens.mjs";

const page = (lang, head, body) => `<!doctype html>\n<html lang="${lang}">\n<head>${head}</head>\n<body>${body}</body>\n</html>`;
const schema = (text) => `<script type="application/ld+json">{"text":"${text}"}</script>`;

test("amounts follow the commercial terms", () => {
  assert.deepEqual({ ...PRICE_AMOUNTS }, { local: 2900, regular: 4900, renewal: 2400, threeYear: 7700, cloudFast: 899 });
  assert.equal(schemaPrice("local"), "29");
  assert.equal(schemaPrice("cloudFast"), "8.99");
  assert.equal(priceToken("local", "main"), "{{price.local.main}}");
  assert.throws(() => priceToken("lifetime", "main"));
  assert.throws(() => priceToken("local", "headline"));
  assert.throws(() => schemaPrice("lifetime"));
});

test("placeholders in page text become plain price spans", () => {
  const html = resolvePriceTokens("de/index.html", page("de", "<title>Dictivo</title>",
    `<p class="tier-price">${priceToken("local", "main")}<small>einmalig</small></p><p>Verlängerung ${priceToken("renewal", "inline")} pro Jahr</p>`));
  assert.ok(html.includes('<span class="price">29 US$</span><small>'), html);
  assert.ok(html.includes('<span class="price">24 US$ inkl. MwSt.</span> pro Jahr'), html);
  assert.doesNotMatch(html, /data-price-/);
  assert.equal(html.includes("{{price."), false);
  const hant = resolvePriceTokens("zh-hant/index.html", page("zh-Hant", "", priceToken("cloudFast", "note")));
  assert.ok(hant.includes('<span class="price">含稅</span>'), hant);
});

test("dollar signs in prices are never read as replacement patterns", () => {
  const html = resolvePriceTokens("index.html", page("en", schema(`${priceToken("local", "inline")}'s`),
    `<p>${priceToken("local", "inline")}'s price, ${priceToken("cloudFast", "main")}&amp; ${priceToken("local", "main")}\`</p>`));
  assert.ok(html.includes('<span class="price">US$29</span>\'s price'), html);
  assert.ok(html.includes('<span class="price">US$8.99</span>&amp;'), html);
  assert.ok(html.includes('<span class="price">US$29</span>`'), html);
  assert.ok(html.includes('{"text":"US$29\'s"}'), html);
});

test("structured data gets plain text", () => {
  const ja = resolvePriceTokens("ja/index.html", page("ja", schema(`Local ${priceToken("local", "inline")}`), "<p>ok</p>"));
  assert.ok(ja.includes('{"text":"Local US$29（税込）"}'), ja);
  const de = resolvePriceTokens("de/index.html", page("de", schema(`Kostet ${priceToken("local", "inline")} einmalig`), ""));
  const parsed = JSON.parse(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(de)[1]);
  assert.equal(parsed.text, "Kostet 29 US$ inkl. MwSt. einmalig");
});

test("prices are refused where they must not appear", () => {
  assert.throws(() => resolvePriceTokens("index.html", page("en", `<title>Dictivo ${priceToken("local", "inline")}</title>`, "")), /titles and meta tags/);
  assert.throws(() => resolvePriceTokens("index.html", page("en", `<meta name="description" content="${priceToken("local", "inline")}">`, "")), /titles and meta tags/);
  assert.throws(() => resolvePriceTokens("index.html", page("en", "", `<a title="${priceToken("local", "inline")}">x</a>`)), /inside an HTML tag/);
  assert.throws(() => resolvePriceTokens("llms.txt", `Dictivo ${priceToken("local", "inline")}`), /HTML pages/);
  assert.throws(() => resolvePriceTokens("index.html", page("en", "", "{{price.lifetime.inline}}")), /lifetime/);
  assert.throws(() => resolvePriceTokens("index.html", page("en", "", "{{price.local.headline}}")), /headline/);
  assert.throws(() => resolvePriceTokens("index.html", "<body>{{price.local.inline}}</body>"), /html lang/);
  const plain = page("en", "<title>Dictivo</title>", "<p>$85-$180 a year</p>");
  assert.equal(resolvePriceTokens("index.html", plain), plain);
});
