import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { formatPrice } from "../data/price-display.mjs";
import { PRICE_AMOUNTS, browserPriceScript, priceToken, resolvePriceTokens, schemaPrice } from "../scripts/lib/price-tokens.mjs";

const page = (lang, head, body) => `<!doctype html>\n<html lang="${lang}">\n<head>${head}</head>\n<body>${body}</body>\n</html>`;
const schema = (text) => `<script type="application/ld+json">{"text":"${text}"}</script>`;

test("amounts follow the commercial terms", () => {
  assert.deepEqual({ ...PRICE_AMOUNTS }, { local: 2900, regular: 4900, renewal: 2400, threeYear: 7700, cloudFast: 699 });
  assert.equal(schemaPrice("local"), "29");
  assert.equal(schemaPrice("cloudFast"), "6.99");
  assert.equal(priceToken("local", "main"), "{{price.local.main}}");
  assert.throws(() => priceToken("lifetime", "main"));
  assert.throws(() => priceToken("local", "headline"));
  assert.throws(() => schemaPrice("lifetime"));
});

test("placeholders in page text become spans for the language's home country", () => {
  const html = resolvePriceTokens("de/index.html", page("de", "<title>Dictivo</title>",
    `<p class="tier-price">${priceToken("local", "main")}<small>einmalig</small></p><p>Verlängerung ${priceToken("renewal", "inline")} pro Jahr</p>`));
  assert.ok(html.includes('<span class="price" data-price-cents="2900" data-price-form="main" data-price-country="DE">34,51 US$</span><small>'), html);
  assert.ok(html.includes('<span class="price" data-price-cents="2400" data-price-form="inline" data-price-country="DE">28,56 US$ inkl. MwSt.</span> pro Jahr'), html);
  assert.equal(html.includes("{{price."), false);
  const hant = resolvePriceTokens("zh-hant/index.html", page("zh-Hant", "", priceToken("local", "note")));
  assert.ok(hant.includes('data-price-country="TW">含 5% 營業稅 · 未稅 US$29</span>'), hant);
});

test("dollar signs in prices are never read as replacement patterns", () => {
  const html = resolvePriceTokens("index.html", page("en", schema(`${priceToken("local", "inline")}'s`),
    `<p>${priceToken("local", "inline")}'s price, ${priceToken("cloudFast", "main")}&amp; ${priceToken("local", "main")}\`</p>`));
  assert.ok(html.includes('data-price-country="US">$29</span>\'s price'), html);
  assert.ok(html.includes('data-price-country="US">$6.99</span>&amp;'), html);
  assert.ok(html.includes('data-price-country="US">$29</span>`'), html);
  assert.ok(html.includes('{"text":"$29\'s"}'), html);
});

test("structured data gets plain text for the home country", () => {
  const ja = resolvePriceTokens("ja/index.html", page("ja", schema(`Local ${priceToken("local", "inline")}`), "<p>ok</p>"));
  assert.ok(ja.includes('{"text":"Local US$31.90（税込）"}'), ja);
  const de = resolvePriceTokens("de/index.html", page("de", schema(`Kostet ${priceToken("local", "inline")} einmalig`), ""));
  const parsed = JSON.parse(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(de)[1]);
  assert.equal(parsed.text, "Kostet 34,51 US$ inkl. MwSt. einmalig");
});

test("prices are refused where they cannot follow the visitor", () => {
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

test("the browser bundle formats exactly like the build", () => {
  const context = vm.createContext({});
  vm.runInContext(`${browserPriceScript()}\nglobalThis.DictivoPrice = DictivoPrice;`, context);
  for (const lang of ["en", "de", "fr", "es", "it", "nl", "pt", "zh-Hans", "zh-Hant", "ja", "ko"]) {
    for (const country of ["US", "CA", "SG", "DE", "AT", "CH", "FI", "GB", "JP", "KR", "TW", "AU", "BR", "CN", "XX"]) {
      for (const form of ["main", "note", "inline"]) {
        for (const cents of [2900, 699, 7700]) {
          const input = { cents, form, lang, country };
          assert.equal(context.DictivoPrice.formatPrice(input), formatPrice(input), JSON.stringify(input));
        }
      }
    }
  }
});
