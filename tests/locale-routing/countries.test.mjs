import test from "node:test";
import assert from "node:assert/strict";
import {
  CONSENT_REQUIRED_COUNTRIES,
  COUNTRIES_BY_LOCALE,
  MULTILINGUAL_COUNTRIES,
  localeForCountry,
  parseAcceptLanguage,
  requiresConsent,
  siteLocaleForLanguageTag,
} from "../../lib/locale-routing/countries.mjs";

test("single-language countries map to their site locale", () => {
  for (const [country, locale] of [
    ["DE", "de"], ["AT", "de"], ["FR", "fr"], ["SN", "fr"], ["RE", "fr"], ["MX", "es"], ["AR", "es"], ["BR", "pt"],
    ["AO", "pt"], ["IT", "it"], ["SM", "it"], ["SR", "nl"], ["CN", "zh"], ["TW", "zh-hant"], ["HK", "zh-hant"],
    ["MO", "zh-hant"], ["JP", "ja"], ["KR", "ko"], ["de", "de"],
  ]) assert.equal(localeForCountry(country), locale, country);
});

test("countries outside the target languages, unknown and Tor get English", () => {
  for (const country of ["US", "GB", "IN", "RU", "MA", "AD", "XX", "T1", "", undefined]) {
    assert.equal(localeForCountry(country), "en", String(country));
  }
});

test("multilingual countries use the browser's preference among their languages", () => {
  assert.equal(localeForCountry("CH"), "de");
  assert.equal(localeForCountry("CH", { acceptLanguage: "fr-CH,fr;q=0.9,en;q=0.8" }), "fr");
  assert.equal(localeForCountry("CH", { acceptLanguage: "en-US,it;q=0.5" }), "it");
  assert.equal(localeForCountry("CH", { acceptLanguage: "en-US" }), "de");
  assert.equal(localeForCountry("BE"), "nl");
  assert.equal(localeForCountry("BE", { acceptLanguage: "fr-BE" }), "fr");
  assert.equal(localeForCountry("LU"), "fr");
  assert.equal(localeForCountry("CA"), "en");
  assert.equal(localeForCountry("CA", { acceptLanguage: "fr-CA" }), "fr");
  assert.equal(localeForCountry("CA", { region: "QC" }), "fr");
  assert.equal(localeForCountry("CA", { region: "QC", acceptLanguage: "en-CA" }), "en");
  assert.equal(localeForCountry("CM", { acceptLanguage: "en-GB" }), "en");
  assert.equal(localeForCountry("PR"), "es");
  assert.equal(localeForCountry("SG"), "en");
  assert.equal(localeForCountry("SG", { acceptLanguage: "zh-CN,zh;q=0.9" }), "zh");
  assert.equal(localeForCountry("SG", { acceptLanguage: "zh-TW" }), "en");
});

test("Accept-Language parsing honors q-values, order, wildcards and q=0", () => {
  assert.deepEqual(parseAcceptLanguage("fr;q=0.5, de-CH, *;q=0.1, en;q=0"), ["de-ch", "fr"]);
  assert.deepEqual(parseAcceptLanguage(undefined), []);
  assert.equal(siteLocaleForLanguageTag("zh-Hant-TW"), "zh-hant");
  assert.equal(siteLocaleForLanguageTag("zh-HK"), "zh-hant");
  assert.equal(siteLocaleForLanguageTag("zh-Hans-CN"), "zh");
  assert.equal(siteLocaleForLanguageTag("pt-BR"), "pt");
});

test("every country appears once", () => {
  const listed = [...Object.values(COUNTRIES_BY_LOCALE).flat(), ...Object.keys(MULTILINGUAL_COUNTRIES)];
  assert.equal(new Set(listed).size, listed.length);
});

test("EU and EEA visitors except Germany must consent before a language redirect", () => {
  for (const country of ["FR", "AT", "BE", "LU", "IT", "ES", "PT", "NL", "RE", "GF", "LI", "NO", "fr"]) {
    assert.equal(requiresConsent(country), true, country);
  }
  for (const country of ["DE", "CH", "PF", "NC", "US", "JP", "TW", "GB", "", undefined]) {
    assert.equal(requiresConsent(country), false, String(country));
  }
  assert.equal(CONSENT_REQUIRED_COUNTRIES.size, 35);
});
