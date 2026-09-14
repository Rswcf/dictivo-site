import test from "node:test";
import assert from "node:assert/strict";
import { COOKIE_NAME, decideLocaleRoute } from "../../lib/locale-routing/decide.mjs";

const CHROME = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
const home = { en: "/", de: "/de/", fr: "/fr/", nl: "/nl/", zh: "/zh/", "zh-hant": "/zh-hant/", ja: "/ja/" };
const guide = { en: "/guide/", ja: "/ja/guide/" };
const routes = {
  locales: ["en", "de", "fr", "es", "nl", "zh", "zh-hant", "ja", "ko"],
  pages: {
    ...Object.fromEntries(Object.entries(home).map(([locale, path]) => [path, { locale, alternates: home }])),
    ...Object.fromEntries(Object.entries(guide).map(([locale, path]) => [path, { locale, alternates: guide }])),
  },
};

function decide(path, { country = "US", region = "", method = "GET", headers = {} } = {}) {
  return decideLocaleRoute({
    method,
    url: new URL(path, "https://dictivo.app"),
    headers: new Headers({ "user-agent": CHROME, "sec-fetch-dest": "document", "sec-fetch-site": "none", ...headers }),
    country,
    region,
    routes,
  });
}

test("entry on an English page goes to the visitor country's translation", () => {
  assert.deepEqual(decide("/", { country: "DE" }), { action: "redirect", location: "/de/", reason: "country:de" });
  assert.equal(decide("/?utm_source=google&x=1", { country: "DE" }).location, "/de/?utm_source=google&x=1");
  assert.equal(decide("/", { country: "CH" }).location, "/de/");
  assert.equal(decide("/", { country: "TW" }).location, "/zh-hant/");
  assert.equal(decide("/", { country: "CN" }).location, "/zh/");
  assert.equal(decide("/guide/", { country: "JP" }).location, "/ja/guide/");
  assert.equal(decide("/", { method: "HEAD", country: "JP" }).location, "/ja/");
});

test("English countries, missing translations and unknown countries stay put", () => {
  assert.deepEqual(decide("/", { country: "US" }), { action: "pass", reason: "country:en" });
  assert.deepEqual(decide("/", { country: "KR" }), { action: "pass", reason: "country:ko" });
  assert.equal(decide("/guide/", { country: "DE" }).action, "pass");
  assert.equal(decide("/", { country: "" }).action, "pass");
});

test("EU visitors outside Germany get a consent prompt instead of a redirect", () => {
  assert.deepEqual(decide("/", { country: "FR" }), {
    action: "suggest", locale: "fr", acceptHref: "/fr/?lang=fr", stayHref: "/?lang=en", reason: "suggest:fr",
  });
  assert.deepEqual(decide("/?utm_source=x", { country: "FR" }), {
    action: "suggest", locale: "fr", acceptHref: "/fr/?utm_source=x&lang=fr", stayHref: "/?utm_source=x&lang=en", reason: "suggest:fr",
  });
  assert.equal(decide("/", { country: "AT" }).acceptHref, "/de/?lang=de");
  assert.equal(decide("/", { country: "BE" }).acceptHref, "/nl/?lang=nl");
  assert.equal(decide("/", { country: "LU" }).acceptHref, "/fr/?lang=fr");
  assert.equal(decide("/", { country: "FR", headers: { "sec-fetch-site": "same-origin" } }).action, "suggest");
  assert.deepEqual(decide("/guide/", { country: "FR" }), { action: "pass", reason: "country:fr" });
  assert.deepEqual(decide("/", { country: "ES" }), { action: "pass", reason: "country:es" });
});

test("language URLs are explicit choices and are never redirected", () => {
  assert.deepEqual(decide("/de/", { country: "FR" }), { action: "pass", reason: "explicit-locale" });
  assert.equal(decide("/ja/guide/", { country: "US" }).action, "pass");
});

test("a saved language choice beats the country", () => {
  assert.deepEqual(decide("/", { country: "DE", headers: { cookie: `${COOKIE_NAME}=en` } }), { action: "pass", reason: "cookie:en" });
  assert.deepEqual(decide("/", { country: "US", headers: { cookie: `${COOKIE_NAME}=fr` } }), { action: "redirect", location: "/fr/", reason: "cookie:fr" });
  assert.equal(decide("/", { country: "FR", headers: { cookie: `${COOKIE_NAME}=fr` } }).location, "/fr/");
  assert.deepEqual(decide("/", { country: "FR", headers: { cookie: `${COOKIE_NAME}=en` } }), { action: "pass", reason: "cookie:en" });
  assert.equal(decide("/", { country: "DE", headers: { cookie: `${COOKIE_NAME}=xx` } }).location, "/de/");
});

test("internal clicks, crawlers, subresources and other methods are never redirected", () => {
  assert.deepEqual(decide("/", { country: "DE", headers: { "sec-fetch-site": "same-origin" } }), { action: "pass", reason: "internal" });
  assert.equal(decide("/", { country: "US", headers: { "sec-fetch-site": "same-origin", cookie: `${COOKIE_NAME}=fr` } }).reason, "internal");
  assert.equal(decide("/", { country: "FR", headers: { "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" } }).reason, "automated");
  assert.equal(decide("/", { country: "DE", headers: { "sec-fetch-dest": "iframe" } }).reason, "subresource");
  assert.equal(decide("/", { country: "DE", method: "POST" }).reason, "method");
  assert.equal(decide("/about/", { country: "DE" }).reason, "unmapped");
});

test("?lang= saves the choice and returns to the clean URL for everyone", () => {
  assert.deepEqual(decide("/de/?lang=de&utm_source=reddit", { country: "US", headers: { "sec-fetch-site": "same-origin" } }), {
    action: "redirect", location: "/de/?utm_source=reddit", setCookie: "de", reason: "lang:de",
  });
  assert.deepEqual(decide("/?lang=xx", { country: "DE" }), { action: "redirect", location: "/", reason: "lang:invalid" });
  assert.equal(decide("/zh-hant/?lang=zh-hant", { headers: { "user-agent": "Twitterbot/1.0" } }).setCookie, "zh-hant");
  // English-only pages have no hreflang group but still carry the language menu.
  assert.deepEqual(decide("/english-only/?lang=en", { headers: { "sec-fetch-site": "same-origin" } }), {
    action: "redirect", location: "/english-only/", setCookie: "en", reason: "lang:en",
  });
});
