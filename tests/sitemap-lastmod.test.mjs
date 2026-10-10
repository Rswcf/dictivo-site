import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { PRICING_LASTMOD } from "../data/local-offer.mjs";
import { LOCALES } from "../data/site-content.mjs";
import { HOME_CONVERSION_LASTMOD, HOME_CONVERSION_LOCALE_LASTMOD, HOME_SHARED_CONTENT_LASTMOD } from "../data/home-conversion.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
// A page that shows a Dictivo price reports at least PRICING_LASTMOD in the sitemap (see renderSitemap),
// so these expectations hold before and after the 2026-11-01 price change moves PRICING_LASTMOD.
const showsPrice = (html) => html.includes('<span class="price">');
const atLeastPricing = (date) => (PRICING_LASTMOD > date ? PRICING_LASTMOD : date);

test("homepage sitemap dates include shared body edits and both global and locale copy changes", () => {
  const sitemap = readFileSync(`${dist}sitemap.xml`, "utf8");
  const dates = new Map([...sitemap.matchAll(/<loc>https:\/\/dictivo\.app([^<]*)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map((m) => [m[1], m[2]]));
  for (const locale of LOCALES) {
    const body = readFileSync(`${dist}${locale.path.slice(1)}index.html`, "utf8");
    assert.ok(body.includes(`href="${locale.path}guides/offline-dictation-on-mac/"`), locale.code);
    for (const date of [HOME_SHARED_CONTENT_LASTMOD, HOME_CONVERSION_LASTMOD, HOME_CONVERSION_LOCALE_LASTMOD[locale.code]].filter(Boolean)) {
      assert.ok(dates.get(locale.path) >= date, `${locale.path}: sitemap date must include ${date}`);
    }
  }
});

test("pages that show a price report a sitemap date no older than the last price change", () => {
  const sitemap = readFileSync(`${dist}sitemap.xml`, "utf8");
  let priced = 0;
  for (const [, loc, lastmod] of sitemap.matchAll(/<loc>https:\/\/dictivo\.app([^<]*)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) {
    const file = `${dist}${loc.slice(1)}${loc.endsWith("/") ? "index.html" : ""}`;
    if (!existsSync(file) || !readFileSync(file, "utf8").includes('<span class="price">')) continue;
    priced += 1;
    assert.ok(lastmod >= PRICING_LASTMOD, `${loc}: sitemap lastmod ${lastmod} is older than ${PRICING_LASTMOD}`);
  }
  // 11 homepages, 66 comparison pages, the Windows guide, two first-dictation
  // guides, the media kit and the terms. Hubs link to pricing without quoting it.
  assert.ok(priced >= 11 + 66 + 5, `only ${priced} priced pages found in the sitemap`);
});


test("comparison refresh is scoped to changed pages and languages", () => {
  const sitemap = readFileSync(`${dist}sitemap.xml`, "utf8");
  const dates = new Map([...sitemap.matchAll(/<loc>https:\/\/dictivo\.app([^<]*)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map((m) => [m[1], m[2]]));
  const locales = ["", "de/", "fr/", "es/", "it/", "nl/", "pt/", "zh/", "zh-hant/", "ja/", "ko/"];
  for (const locale of locales) {
    // English 2026-10-09: the Dragon comparison title it lists changed; 2026-10-10: it links the
    // dictation software guide.
    assert.equal(dates.get(`/${locale}compare/`), atLeastPricing(locale === "de/" ? "2026-10-04" : locale === "" ? "2026-10-10" : "2026-09-20"));
    const superPath = `/${locale}compare/superwhisper-alternative/`;
    const macPath = `/${locale}compare/macwhisper-alternative/`;
    assert.equal(dates.get(superPath), atLeastPricing("2026-09-18"));
    const macDate = locale === "de/" ? "2026-10-04" : locale ? "2026-09-12" : "2026-09-18";
    assert.equal(dates.get(macPath), atLeastPricing(macDate));
    assert.equal(dates.get(`/${locale}compare/voiceink-alternative/`), atLeastPricing("2026-09-12"));
    for (const path of [superPath, macPath]) {
      const body = readFileSync(`${dist}${path.slice(1)}index.html`, "utf8");
      const date = body.match(/<time datetime="([^"]+)"/)[1];
      assert.ok(dates.get(path) >= date, `${path}: sitemap older than visible review`);
    }
  }
});

test("Guide dates reflect scoped trial improvements without redating unchanged setup guides", () => {
  const sitemap = readFileSync(`${dist}sitemap.xml`, "utf8");
  const dates = new Map([...sitemap.matchAll(/<loc>https:\/\/dictivo\.app([^<]*)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map((m) => [m[1], m[2]]));
  for (const [path, date] of [
    // 2026-09-29: the answer comes first and the table gained price and check-date columns.
    // 2026-10-09 (Japanese): the built-in dictation section links the shortcut guide.
    // 2026-10-10 (English): the Dictivo fit section links the dictation software guide.
    ["/ja/guides/offline-dictation-on-mac/", "2026-10-09"],
    ["/guides/offline-dictation-on-mac/", "2026-10-10"],
    ["/ja/guides/first-local-dictation/", "2026-09-18"],
    ["/guides/first-local-dictation/", "2026-09-11"],
  ]) {
    const body = readFileSync(`${dist}${path.slice(1)}index.html`, "utf8");
    assert.ok(body.includes(`"dateModified":"${date}"`) || body.includes(`"dateModified": "${date}"`), path);
    assert.equal(dates.get(path), showsPrice(body) ? atLeastPricing(date) : date, path);
  }
});
