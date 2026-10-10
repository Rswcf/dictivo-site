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
  // 13 page groups × 11 locales + the en/ja first-dictation guide (2026-09-14)
  // + the en/ja Mac dictation troubleshooting guide and the en/ja shortcut guide (2026-10-09).
  assert.ok(Object.keys(routes.pages).length >= 13 * LOCALES.length + 6);
  assert.deepEqual(routes.pages["/guides/mac-dictation-not-working/"], {
    locale: "en",
    alternates: { en: "/guides/mac-dictation-not-working/", ja: "/ja/guides/mac-dictation-not-working/" },
  });
  assert.deepEqual(routes.pages["/guides/mac-dictation-shortcut/"], {
    locale: "en",
    alternates: { en: "/guides/mac-dictation-shortcut/", ja: "/ja/guides/mac-dictation-shortcut/" },
  });
  assert.equal(routes.pages["/ja/guides/mac-dictation-shortcut/"].locale, "ja");
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

// Pages applies _redirects only to requests the Function does not take, so these
// shortcuts must stay out of _routes.json. A visitor redirected to /#downloads may then
// be sent on to a translated homepage; the browser keeps the fragment, and every
// homepage carries both section ids.
test("/download leads to the homepage section", () => {
  const redirects = readFileSync(`${root}dist/_redirects`, "utf8");
  for (const [path, target] of [["/download", "/#downloads"], ["/download/", "/#downloads"]]) {
    assert.ok(redirects.split("\n").includes(`${path} ${target} 302`), `${path} → ${target}`);
    assert.ok(!routedToFunction(path), path);
  }
  for (const locale of LOCALES) {
    const html = readFileSync(`${root}dist${locale.path}index.html`, "utf8");
    for (const id of ["pricing", "downloads"]) assert.ok(html.includes(` id="${id}"`), `${locale.code}: #${id}`);
  }
});

// /pricing/ is a page since 2026-10-09. Without a _redirects rule, Pages answers /pricing
// with its own 308 to /pricing/. The page is English-only, so every visitor stays on it.
test("/pricing/ is an English-only page that the language Function passes through", () => {
  const redirects = readFileSync(`${root}dist/_redirects`, "utf8");
  assert.ok(!redirects.split("\n").some((line) => /^\/pricing\b/.test(line)), "no /pricing redirect");
  assert.ok(readFileSync(`${root}dist/pricing/index.html`, "utf8").includes('<html lang="en">'));
  assert.ok(languageChoicePaths(`${root}dist`).includes("/pricing/"));
  assert.ok(routedToFunction("/pricing/"));
  assert.ok(!routes.pages["/pricing/"], "not a translated page");
  for (const country of ["DE", "JP", "FR", "US"]) {
    assert.deepEqual(decide("/pricing/", { country }), { action: "pass", reason: "unmapped" }, country);
  }
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

test("the troubleshooting guide sends Japanese visitors to the Japanese guide and keeps everyone else", () => {
  const path = "/guides/mac-dictation-not-working/";
  const jp = decide(path, { country: "JP" });
  assert.equal(jp.action, "redirect");
  assert.equal(jp.location, "/ja/guides/mac-dictation-not-working/");
  // No German translation: German visitors stay on the English page.
  assert.deepEqual(decide(path, { country: "DE" }), { action: "pass", reason: "country:de" });
  assert.equal(decide(path, { country: "FR" }).action, "pass");
  assert.equal(decide("/ja/guides/mac-dictation-not-working/", { country: "US" }).action, "pass");
});

test("the shortcut guide sends Japanese visitors to the Japanese guide and keeps everyone else", () => {
  const path = "/guides/mac-dictation-shortcut/";
  const jp = decide(path, { country: "JP" });
  assert.equal(jp.action, "redirect");
  assert.equal(jp.location, "/ja/guides/mac-dictation-shortcut/");
  // No German translation of this guide: German visitors stay on the English page.
  assert.deepEqual(decide(path, { country: "DE" }), { action: "pass", reason: "country:de" });
  assert.equal(decide(path, { country: "FR" }).action, "pass");
  assert.equal(decide("/ja/guides/mac-dictation-shortcut/", { country: "US" }).action, "pass");
});

test("the dictation software guide is English-only, so every visitor stays on it", () => {
  const path = "/guides/best-dictation-software/";
  assert.equal(routes.pages[path], undefined);
  assert.ok(routedToFunction(path), "its ?lang= choice still reaches the Function");
  for (const country of ["US", "JP", "DE", "FR", "TW"]) assert.deepEqual(decide(path, { country }), { action: "pass", reason: "unmapped" }, country);
});

test("translated pages never redirect or prompt on entry", () => {
  for (const [path, page] of Object.entries(routes.pages)) {
    if (page.locale === "en") continue;
    for (const country of ["US", "DE", "FR", "JP", "TW"]) assert.equal(decide(path, { country }).action, "pass", path);
  }
});
