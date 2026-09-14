import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCALES } from "../../data/site-content.mjs";
import { STATIC_EXCLUDES, buildLocaleRoutes, buildRoutesConfig, languageChoicePaths } from "../../lib/locale-routing/build-routes.mjs";
import { localeForCountry, requiresConsent } from "../../lib/locale-routing/countries.mjs";
import { COOKIE_NAME, decideLocaleRoute } from "../../lib/locale-routing/decide.mjs";

const root = new URL("../../", import.meta.url).pathname;
const routes = buildLocaleRoutes({ distDir: `${root}dist`, locales: LOCALES });
const config = JSON.parse(readFileSync(`${root}dist/_routes.json`, "utf8"));
const BASE = "https://dictivo.app";
const CHROME = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
const COUNTRIES = (() => {
  const names = new Intl.DisplayNames(["en"], { type: "region" });
  const codes = [];
  for (let a = 65; a <= 90; a++) for (let b = 65; b <= 90; b++) {
    const code = String.fromCharCode(a, b);
    if (names.of(code) !== code) codes.push(code);
  }
  return [...codes, "XX", "T1"];
})();

const matches = (rule, path) =>
  new RegExp(`^${rule.split("*").map((part) => part.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".*")}$`).test(path);
const routedToFunction = (path) =>
  config.include.some((rule) => matches(rule, path)) && !config.exclude.some((rule) => matches(rule, path));
const pathOf = (href) => new URL(href, BASE).pathname;

function decide(path, { country, region = "", acceptLanguage = "", cookie = "" }) {
  return decideLocaleRoute({
    method: "GET",
    url: new URL(path, BASE),
    headers: new Headers({ "user-agent": CHROME, "sec-fetch-dest": "document", "sec-fetch-site": "cross-site", "accept-language": acceptLanguage, cookie }),
    country,
    region,
    routes,
  });
}

test("the map covers every translated page in all 11 locales", () => {
  assert.deepEqual(routes.locales, LOCALES.map((locale) => locale.code));
  // 13 page groups × 11 locales + the en/ja first-dictation guide (2026-09-14).
  assert.ok(Object.keys(routes.pages).length >= 13 * LOCALES.length + 2);
  assert.equal(routes.pages["/"].alternates["zh-hant"], "/zh-hant/");
  assert.equal(routes.pages["/zh-hant/compare/"].locale, "zh-hant");
  assert.deepEqual(JSON.parse(readFileSync(`${root}lib/locale-routing/generated/routes.json`, "utf8")), routes);
});

test("_routes.json sends every mapped page, and nothing static, to the Function", () => {
  const choicePaths = languageChoicePaths(`${root}dist`);
  assert.deepEqual(config, buildRoutesConfig(routes, choicePaths));
  assert.ok(!config.include.includes("/*"));
  for (const rule of STATIC_EXCLUDES) assert.ok(config.exclude.includes(rule), rule);
  assert.ok(config.include.length + config.exclude.length <= 100);
  for (const path of Object.keys(routes.pages)) assert.ok(routedToFunction(path), path);
  assert.ok(choicePaths.length >= LOCALES.length, `${choicePaths.length} language choice paths`);
  for (const path of choicePaths) assert.ok(routedToFunction(path), `language choice ${path}`);
  for (const path of ["/checkout/local", "/checkout/cloud-fast", "/checkout/local-renewal", "/download/mac",
    "/downloads/Dictivo-macOS-universal.dmg", "/assets/site.css", "/cloud-fast", "/downloads.json", "/sitemap.xml",
    "/de/llms.txt", "/about/"]) assert.ok(!routedToFunction(path), path);
  assert.match(readFileSync(`${root}dist/_redirects`, "utf8"), /^\/checkout\/local https:\/\/\S+ 302$/m);
});

test("entry decisions land on a translation of the same page, prompt in the EU, and never loop", () => {
  const englishPages = Object.entries(routes.pages).filter(([, page]) => page.locale === "en");
  const cases = [];
  for (const country of COUNTRIES) for (const acceptLanguage of ["", "fr-CH,fr;q=0.9", "zh-TW", "zh-CN", "it", "en-CA"]) {
    for (const region of ["", "QC"]) cases.push({ country, region, acceptLanguage, cookie: "" });
  }
  for (const country of ["US", "DE", "FR", "TW", "CH"]) for (const locale of routes.locales) {
    cases.push({ country, region: "", acceptLanguage: "", cookie: `${COOKIE_NAME}=${locale}` });
  }
  let redirects = 0;
  let suggestions = 0;
  for (const [path, page] of englishPages) for (const input of cases) {
    const label = `${path} ${JSON.stringify(input)}`;
    const first = decide(path, input);
    const saved = input.cookie ? input.cookie.split("=")[1] : null;
    const expected = saved ?? localeForCountry(input.country, input);
    const target = expected === "en" ? undefined : page.alternates[expected];
    if (!target) {
      assert.equal(first.action, "pass", label);
      continue;
    }
    if (!saved && requiresConsent(input.country)) {
      assert.equal(first.action, "suggest", label);
      assert.equal(pathOf(first.acceptHref), target, label);
      const accepted = decide(first.acceptHref, input);
      assert.equal(accepted.setCookie, expected, label);
      assert.equal(decide(accepted.location, { ...input, cookie: `${COOKIE_NAME}=${expected}` }).action, "pass", label);
      suggestions++;
      continue;
    }
    assert.equal(first.action, "redirect", label);
    assert.equal(pathOf(first.location), target, label);
    assert.equal(decide(first.location, input).action, "pass", `loop at ${first.location}`);
    redirects++;
  }
  assert.ok(redirects > 10_000, `only ${redirects} redirects exercised`);
  assert.ok(suggestions > 1_000, `only ${suggestions} prompts exercised`);
});

test("translated pages never redirect or prompt on entry", () => {
  for (const [path, page] of Object.entries(routes.pages)) {
    if (page.locale === "en") continue;
    for (const country of ["US", "DE", "FR", "JP", "TW"]) assert.equal(decide(path, { country }).action, "pass", path);
  }
});
