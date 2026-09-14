import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCALES } from "../data/site-content.mjs";
import {
  NO_TAX_COUNTRIES, PRICE_HOME_COUNTRY, TAX_RATES, TAX_VERIFIED_ON, formatPrice, priceLanguage, priceTreatment,
} from "../data/price-display.mjs";

// "_" marks a non-breaking space in the expected strings.
const nbsp = (text) => text.replaceAll("_", " ");
const price = (country, lang, form, cents = 2900) => formatPrice({ cents, form, lang, country });

test("markets that require tax-inclusive prices lead with the total", () => {
  assert.equal(price("DE", "de", "main"), nbsp("34,51_US$"));
  assert.equal(price("DE", "de", "note"), nbsp("inkl. 19_% MwSt. · netto 29_US$"));
  assert.equal(price("DE", "de", "inline"), nbsp("34,51_US$ inkl. MwSt."));
  assert.equal(price("DE", "de", "main", 699), nbsp("8,32_US$"));
  assert.equal(price("DE", "de", "note", 699), nbsp("inkl. 19_% MwSt. · netto 6,99_US$"));
  assert.equal(price("AT", "de", "note"), nbsp("inkl. 20_% MwSt. · netto 29_US$"));
  assert.equal(price("CH", "de", "main"), nbsp("31,35_US$"));
  assert.equal(price("CH", "de", "note"), nbsp("inkl. 8,1_% MWST · netto 29_US$"));
  assert.equal(price("FR", "fr", "main"), nbsp("34,80_$_US"));
  assert.equal(price("FR", "fr", "note"), nbsp("TTC, TVA 20_% incluse · 29_$_US HT"));
  assert.equal(price("FR", "fr", "inline"), nbsp("34,80_$_US TTC"));
  assert.equal(price("ES", "es", "main"), nbsp("35,09_US$"));
  assert.equal(price("ES", "es", "note"), nbsp("IVA del 21_% incluido · 29_US$ sin IVA"));
  assert.equal(price("IT", "it", "main"), nbsp("35,38_US$"));
  assert.equal(price("IT", "it", "note"), nbsp("IVA 22% inclusa · 29_US$ IVA esclusa"));
  assert.equal(price("NL", "nl", "main"), nbsp("US$_35,09"));
  assert.equal(price("NL", "nl", "inline"), nbsp("US$_35,09 incl. btw"));
  assert.equal(price("PT", "pt", "inline"), nbsp("US$_35,67 com IVA"));
  assert.equal(price("GB", "en", "main"), "US$34.80");
  assert.equal(price("GB", "en", "note"), "incl. 20% VAT · US$29 before tax");
  assert.equal(price("GB", "en", "inline"), "US$34.80 incl. VAT");
  assert.equal(price("AU", "en", "note"), "incl. 10% GST · US$29 before tax");
  assert.equal(price("JP", "ja", "main"), "US$31.90");
  assert.equal(price("JP", "ja", "note"), "税込（消費税10%）· 税抜 US$29");
  assert.equal(price("JP", "ja", "inline"), "US$31.90（税込）");
  assert.equal(price("TW", "zh-Hant", "main"), "US$30.45");
  assert.equal(price("TW", "zh-Hant", "note"), "含 5% 營業稅 · 未稅 US$29");
  assert.equal(price("TW", "zh-hant", "inline"), "US$30.45（含稅）");
  assert.equal(price("KR", "ko", "main"), "US$31.90");
  assert.equal(price("KR", "ko", "note"), "부가세 10% 포함 · 부가세 별도 US$29");
  assert.equal(price("KR", "ko", "inline"), "US$31.90(부가세 포함)");
});

test("tax is rounded half up to the cent", () => {
  assert.equal(price("FI", "en", "main"), "US$36.40"); // 2900 × 25.5% = 739.5 cents
  assert.equal(price("HU", "en", "main"), "US$36.83");
  assert.equal(price("LU", "en", "main"), "US$33.93");
  assert.equal(price("GB", "en", "main", 699), "US$8.39"); // 139.8 cents
  assert.equal(price("DE", "en", "main", 2400), "US$28.56");
  assert.equal(price("DE", "en", "main", 7700), "US$91.63");
});

test("markets that allow prices before tax show the net price", () => {
  assert.equal(price("US", "en", "main"), "$29");
  assert.equal(price("US", "en", "note"), "plus applicable sales tax");
  assert.equal(price("US", "en", "inline"), "$29");
  assert.equal(price("US", "en", "main", 699), "$6.99");
  assert.equal(price("CA", "en", "main"), "US$29");
  assert.equal(price("CA", "en", "note"), "plus applicable taxes");
  assert.equal(price("CA", "en", "inline"), "US$29 + tax");
  assert.equal(price("SG", "en", "main"), "US$29");
  assert.equal(price("SG", "en", "note"), "plus 9% GST");
  assert.equal(price("SG", "en", "inline"), "US$29 + 9% GST");
  assert.equal(price("SG", "zh", "inline"), "US$29 + 9% 消费税");
  assert.equal(price("US", "de", "main"), nbsp("29_US$"));
  assert.equal(price("US", "de", "note"), "zzgl. anfallender Steuern");
  assert.equal(price("US", "ja", "inline"), "US$29（税別）");
});

test("markets where the checkout adds no tax show the price alone", () => {
  assert.equal(price("BR", "pt", "main"), nbsp("US$_29"));
  assert.equal(price("BR", "pt", "note"), "");
  assert.equal(price("BR", "pt", "inline"), nbsp("US$_29"));
  assert.equal(price("CN", "zh-Hans", "inline"), "US$29");
  assert.equal(price("CN", "zh", "note"), "");
  assert.equal(price("MX", "es", "inline"), nbsp("29_US$"));
  assert.equal(price("HK", "zh-Hant", "main", 699), "US$6.99");
  assert.equal(price("IL", "en", "note"), "");
});

test("unknown countries show the net price plus applicable tax", () => {
  for (const country of ["XX", "T1", "", undefined, null, "BD", "constructor"]) {
    assert.deepEqual(priceTreatment(country), { kind: "open" }, String(country));
  }
  assert.equal(price(undefined, "en", "note"), "plus applicable taxes");
  assert.equal(price("BD", "fr", "inline"), nbsp("29_$_US HT"));
});

test("every language renders every treatment without leftovers", () => {
  for (const lang of Object.keys(PRICE_HOME_COUNTRY)) {
    for (const country of ["DE", "CH", "JP", "TW", "AU", "IN", "SG", "US", "CA", "BR", "XX"]) {
      for (const form of ["main", "note", "inline"]) {
        const text = formatPrice({ cents: 699, form, lang, country });
        assert.doesNotMatch(text, /[{}#]|undefined|NaN/, `${lang} ${country} ${form}: ${text}`);
      }
    }
  }
});

test("the tax table covers the EU and never contradicts the no-tax list", () => {
  const eu = ["AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO", "SE", "SI", "SK"];
  for (const code of eu) assert.ok(TAX_RATES[code] > 0, code);
  for (const [code, basisPoints] of Object.entries(TAX_RATES)) {
    assert.match(code, /^[A-Z]{2}$/);
    assert.ok(Number.isInteger(basisPoints) && basisPoints > 0 && basisPoints < 3000, code);
  }
  for (const code of NO_TAX_COUNTRIES) assert.equal(Object.hasOwn(TAX_RATES, code), false, code);
  assert.match(TAX_VERIFIED_ON, /^\d{4}-\d{2}-\d{2}$/);
});

test("every page language has price copy and a home country", () => {
  for (const locale of LOCALES) assert.ok(PRICE_HOME_COUNTRY[priceLanguage(locale.code)], locale.code);
  assert.equal(priceLanguage("zh-Hans"), "zh");
  assert.equal(priceLanguage("zh-Hant"), "zh-hant");
  assert.equal(priceLanguage("en-GB"), "en");
  assert.throws(() => priceLanguage("sv"));
  assert.throws(() => priceLanguage("constructor"));
  assert.throws(() => formatPrice({ cents: 2900, form: "headline", lang: "en", country: "US" }));
  assert.throws(() => formatPrice({ cents: 29.5, form: "main", lang: "en", country: "US" }));
});

test("the formatter can ship to browsers unchanged", () => {
  const source = readFileSync(new URL("../data/price-display.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(source, /^\s*import\s/m);
  assert.doesNotMatch(source, /Lemon Squeezy|Cloudflare|request metadata/i);
});
