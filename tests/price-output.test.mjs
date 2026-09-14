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
const span = (cents, form, country) => `<span class="price" data-price-cents="${cents}" data-price-form="${form}" data-price-country="${country}">`;
const walk = (value, visit) => {
  if (Array.isArray(value)) value.forEach((item) => walk(item, visit));
  else if (value && typeof value === "object") {
    visit(value);
    Object.values(value).forEach((item) => walk(item, visit));
  }
};

// Home country, Local card figure, Cloud Fast card figure (static HTML, before site.js runs).
const HOME_PRICES = {
  en: ["US", "$29", "$6.99"],
  de: ["DE", "34,51 US$", "8,32 US$"],
  fr: ["FR", "34,80 $ US", "8,39 $ US"],
  es: ["ES", "35,09 US$", "8,46 US$"],
  it: ["IT", "35,38 US$", "8,53 US$"],
  nl: ["NL", "US$ 35,09", "US$ 8,46"],
  pt: ["BR", "US$ 29", "US$ 6,99"],
  zh: ["CN", "US$29", "US$6.99"],
  "zh-hant": ["TW", "US$30.45", "US$7.34"],
  ja: ["JP", "US$31.90", "US$7.69"],
  ko: ["KR", "US$31.90", "US$7.69"],
};

test("pricing cards show the home country's figure and tax line", () => {
  for (const locale of LOCALES) {
    const [country, local, cloudFast] = HOME_PRICES[locale.code];
    const html = readFileSync(`${dist}${locale.path.slice(1)}index.html`, "utf8");
    assert.ok(html.includes(`<p class="tier-price">${span(2900, "main", country)}${local}</span><small>`), `${locale.code}: Local card`);
    assert.ok(html.includes(`<p class="tier-price">${span(699, "main", country)}${cloudFast}</span><small>`), `${locale.code}: Cloud Fast card`);
    assert.ok(html.includes(`<p class="tier-tax">${span(2900, "note", country)}`), `${locale.code}: Local tax line`);
    assert.ok(html.includes(`<p class="tier-tax">${span(699, "note", country)}`), `${locale.code}: Cloud Fast tax line`);
  }
});

test("paid offers in structured data are marked as excluding tax", () => {
  let offers = 0;
  for (const file of htmlFiles()) {
    for (const [, json] of readFileSync(file, "utf8").matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      walk(JSON.parse(json), (node) => {
        if (node["@type"] !== "Offer" || !["Dictivo Local", "Cloud Fast"].includes(node.name)) return;
        offers += 1;
        assert.equal(node.priceCurrency, "USD", file);
        assert.equal(node.priceSpecification?.valueAddedTaxIncluded, false, `${file}: ${node.name}`);
        assert.equal(node.priceSpecification?.price, node.price, `${file}: ${node.name}`);
      });
    }
  }
  assert.ok(offers >= LOCALES.length * 2 + 66, `found only ${offers} paid offers`);
});

test("no price placeholder reaches the public site", () => {
  for (const file of files(dist)) {
    if (/\.(html|txt|js|json|xml|css)$/.test(file)) assert.equal(readFileSync(file, "utf8").includes("{{price."), false, file);
  }
});
