import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCALES } from "../data/site-content.mjs";
import { PRICE_LANGUAGES, formatPrice, priceLanguage } from "../data/price-display.mjs";

// "_" marks a non-breaking space in the expected strings.
const nbsp = (text) => text.replaceAll("_", " ");
const price = (lang, form, cents = 2900) => formatPrice({ cents, form, lang });

test("every language shows one tax-inclusive figure", () => {
  const expected = {
    en: ["US$29", "tax included", "US$29"],
    de: ["29_US$", "inkl. MwSt.", "29_US$ inkl. MwSt."],
    fr: ["29_$_US", "TTC", "29_$_US TTC"],
    es: ["29_US$", "IVA incluido", "29_US$ IVA incluido"],
    it: ["29_US$", "IVA inclusa", "29_US$ IVA inclusa"],
    nl: ["US$_29", "incl. btw", "US$_29 incl. btw"],
    pt: ["US$_29", "impostos incluídos", "US$_29 com impostos"],
    zh: ["US$29", "含税", "US$29"],
    "zh-hant": ["US$29", "含稅", "US$29（含稅）"],
    ja: ["US$29", "税込", "US$29（税込）"],
    ko: ["US$29", "부가세 포함", "US$29(부가세 포함)"],
  };
  assert.deepEqual(Object.keys(expected), [...PRICE_LANGUAGES]);
  for (const [lang, [main, note, inline]] of Object.entries(expected)) {
    assert.equal(price(lang, "main"), nbsp(main), `${lang} main`);
    assert.equal(price(lang, "note"), nbsp(note), `${lang} note`);
    assert.equal(price(lang, "inline"), nbsp(inline), `${lang} inline`);
  }
});

test("cents use the language's decimal separator", () => {
  assert.equal(price("en", "main", 899), "US$8.99");
  assert.equal(price("de", "main", 899), nbsp("8,99_US$"));
  assert.equal(price("fr", "inline", 899), nbsp("8,99_$_US TTC"));
  assert.equal(price("nl", "main", 899), nbsp("US$_8,99"));
  assert.equal(price("pt", "inline", 899), nbsp("US$_8,99 com impostos"));
  assert.equal(price("ja", "inline", 899), "US$8.99（税込）");
  assert.equal(price("en", "main", 4900), "US$49");
  assert.equal(price("de", "inline", 7700), nbsp("77_US$ inkl. MwSt."));
  assert.equal(price("en", "main", 2400), "US$24");
});

test("html lang values map to price languages", () => {
  for (const locale of LOCALES) assert.ok(PRICE_LANGUAGES.includes(priceLanguage(locale.code)), locale.code);
  assert.equal(priceLanguage("zh-Hans"), "zh");
  assert.equal(priceLanguage("zh-Hant"), "zh-hant");
  assert.equal(priceLanguage("zh-TW"), "zh-hant");
  assert.equal(priceLanguage("en-GB"), "en");
  assert.throws(() => priceLanguage("sv"));
  assert.throws(() => priceLanguage("constructor"));
});

test("bad input is refused", () => {
  assert.throws(() => formatPrice({ cents: 2900, form: "headline", lang: "en" }));
  assert.throws(() => formatPrice({ cents: 29.5, form: "main", lang: "en" }));
  assert.throws(() => formatPrice({ cents: -1, form: "main", lang: "en" }));
  assert.throws(() => formatPrice({ cents: 2900, form: "main", lang: "xx" }));
});

test("no template leftovers in any language or form", () => {
  for (const lang of PRICE_LANGUAGES) {
    for (const form of ["main", "note", "inline"]) {
      for (const cents of [2900, 899, 7700]) {
        assert.doesNotMatch(formatPrice({ cents, form, lang }), /[{}#]|undefined|NaN/, `${lang} ${form} ${cents}`);
      }
    }
  }
});

test("the module carries no tax table and no forbidden public terms", () => {
  const source = readFileSync(new URL("../data/price-display.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(source, /TAX_RATES|NO_TAX_COUNTRIES|TAX_VERIFIED_ON|cdn-cgi/);
  assert.doesNotMatch(source, /Lemon Squeezy|Cloudflare|request metadata/i);
  assert.doesNotMatch(source, /^\s*import\s/m);
});
