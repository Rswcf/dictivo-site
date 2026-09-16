import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { LOCALES } from "../data/site-content.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
const files = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? files(path) : [path];
});
const htmlFiles = () => files(dist).filter((path) => path.endsWith(".html"));
const walk = (value, visit) => {
  if (Array.isArray(value)) value.forEach((item) => walk(item, visit));
  else if (value && typeof value === "object") {
    visit(value);
    Object.values(value).forEach((item) => walk(item, visit));
  }
};
const nbsp = (text) => text.replaceAll("_", " ");

// Local figure, Cloud Fast figure, tax note — as rendered in the static HTML.
const HOME_PRICES = {
  en: ["US$29", "US$8.99", "tax included"],
  de: ["29_US$", "8,99_US$", "inkl. MwSt."],
  fr: ["29_$_US", "8,99_$_US", "TTC"],
  es: ["29_US$", "8,99_US$", "IVA incluido"],
  it: ["29_US$", "8,99_US$", "IVA inclusa"],
  nl: ["US$_29", "US$_8,99", "incl. btw"],
  pt: ["US$_29", "US$_8,99", "impostos incluídos"],
  zh: ["US$29", "US$8.99", "含税"],
  "zh-hant": ["US$29", "US$8.99", "含稅"],
  ja: ["US$29", "US$8.99", "税込"],
  ko: ["US$29", "US$8.99", "부가세 포함"],
};

test("pricing cards show one figure and a tax-included note in every language", () => {
  for (const locale of LOCALES) {
    const [local, cloudFast, note] = HOME_PRICES[locale.code].map(nbsp);
    const html = readFileSync(`${dist}${locale.path.slice(1)}index.html`, "utf8");
    assert.ok(html.includes(`<p class="tier-price"><span class="price">${local}</span><small>`), `${locale.code}: Local card`);
    assert.ok(html.includes(`<p class="tier-price"><span class="price">${cloudFast}</span><small>`), `${locale.code}: Cloud Fast card`);
    assert.equal((html.match(new RegExp(`<p class="tier-tax"><span class="price">${note}</span>`, "g")) || []).length, 2, `${locale.code}: tax notes`);
    assert.doesNotMatch(html, /data-price-|\{\{price\./, locale.code);
  }
});

test("paid offers in structured data are marked as including tax", () => {
  let offers = 0;
  for (const file of htmlFiles()) {
    for (const [, json] of readFileSync(file, "utf8").matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      walk(JSON.parse(json), (node) => {
        if (node["@type"] !== "Offer" || !["Dictivo Local", "Cloud Fast"].includes(node.name)) return;
        offers += 1;
        assert.equal(node.priceCurrency, "USD", file);
        assert.equal(node.priceSpecification?.valueAddedTaxIncluded, true, `${file}: ${node.name}`);
        assert.equal(node.priceSpecification?.price, node.price, `${file}: ${node.name}`);
        if (node.name === "Cloud Fast") assert.equal(node.price, "8.99", file);
      });
    }
  }
  assert.ok(offers >= LOCALES.length * 2 + 66, `found only ${offers} paid offers`);
});

const withoutPrices = (html) => html
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "")
  .replace(/<span class="price">[^<]*<\/span>/g, "");
const DICTIVO_FIGURE = /\$(?:29|24|49|77)(?!\d)(?![.,]\d)|\$(?:6|8)\.99|US\$|29米ドル/g;

test("every Dictivo price on the site comes from a placeholder", () => {
  for (const file of htmlFiles()) {
    const text = withoutPrices(readFileSync(file, "utf8"));
    for (const match of text.matchAll(DICTIVO_FIGURE)) {
      // Whisperstream ($29) and VoiceInk ($25 / $39 / $49) share figures with Dictivo.
      const before = text.slice(Math.max(0, match.index - 300), match.index);
      assert.match(before, /Whisperstream|VoiceInk|\$25|\$39/, `${file}: unconverted "${match[0]}" after "…${before.slice(-50)}"`);
    }
  }
});

test("titles, meta descriptions and llms.txt carry no Dictivo price", () => {
  for (const file of htmlFiles()) {
    const html = readFileSync(file, "utf8");
    const head = html.slice(0, html.search(/<body[\s>]/)).replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "");
    assert.doesNotMatch(head, /\$(?:29|24|77)(?!\d)(?![.,]\d)|\$(?:6|8)\.99|US\$|29米ドル/, file);
  }
  for (const file of files(dist).filter((path) => path.endsWith("llms.txt"))) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /\$(?:29|24)(?!\d)|\$(?:6|8)\.99|US\$/, file);
  }
});

test("German prices never end a sentence", () => {
  // "inkl. MwSt." already ends in a full stop.
  for (const file of htmlFiles().filter((path) => path.startsWith(`${dist}de/`))) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /inkl\. MwSt\.<\/span>\./, file);
  }
});

test("the terms say prices include tax and are in US dollars", () => {
  const terms = readFileSync(`${dist}terms/index.html`, "utf8");
  assert.match(terms, /Prices include applicable sales tax and VAT/);
  assert.match(terms, /refunds are issued in US dollars/);
  assert.match(terms, /datetime="2026-09-16"/);
});

test("the old country machinery is gone from the public site", () => {
  const js = readFileSync(`${dist}assets/site.js`, "utf8");
  assert.doesNotMatch(js, /cdn-cgi\/trace|DictivoPrice|price_country|showVisitorPrices/);
});

test("no price placeholder reaches the public site", () => {
  for (const file of files(dist)) {
    if (/\.(html|txt|js|json|xml|css)$/.test(file)) assert.equal(readFileSync(file, "utf8").includes("{{price."), false, file);
  }
});
