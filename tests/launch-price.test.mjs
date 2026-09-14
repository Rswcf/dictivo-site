import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { LOCALES } from "../data/site-content.mjs";
import { LOCAL_OFFER, introPriceExpired, offerDate } from "../data/local-offer.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
const htmlFiles = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  if (statSync(path).isDirectory()) return htmlFiles(path);
  return name.endsWith(".html") ? [path] : [];
});

test("offer dates read naturally in every language", () => {
  assert.equal(offerDate("2026-10-31", "en"), "31 October 2026");
  assert.equal(offerDate("2026-11-01", "de"), "1. November 2026");
  assert.equal(offerDate("2026-11-01", "fr"), "1er novembre 2026");
  assert.equal(offerDate("2026-10-31", "es"), "31 de octubre de 2026");
  assert.equal(offerDate("2026-11-01", "it"), "1º novembre 2026");
  assert.equal(offerDate("2026-10-31", "nl"), "31 oktober 2026");
  assert.equal(offerDate("2026-11-01", "pt"), "1º de novembro de 2026");
  assert.equal(offerDate("2026-10-31", "zh"), "2026年10月31日");
  assert.equal(offerDate("2026-10-31", "ja"), "2026年10月31日");
  assert.equal(offerDate("2026-10-31", "ko"), "2026년 10월 31일");
  assert.throws(() => offerDate("2026-10-31", "xx"));
});

test("the introductory price expires the day the regular price starts", () => {
  assert.ok(LOCAL_OFFER.regularPriceFrom > LOCAL_OFFER.introPriceUntil);
  assert.equal(introPriceExpired("2026-10-31"), false);
  assert.equal(introPriceExpired("2026-11-01"), true);
});

test("no page shows a struck-through or undated regular price", () => {
  const stale = /tier-price-was|regular price \$49|regulär \$49|prix normal \$49|precio normal \$49|prezzo regolare \$49|reguliere prijs \$49|preço normal \$49|常规价 \$49|常規價 \$49|通常価格 \$49|정가는 \$49|launch price|Aktionspreis/;
  for (const file of htmlFiles(dist)) assert.doesNotMatch(readFileSync(file, "utf8"), stale, file);
});

test("every homepage dates the introductory price and states the regular price", () => {
  for (const locale of LOCALES) {
    const html = readFileSync(`${dist}${locale.path.slice(1)}index.html`, "utf8");
    const dateLocale = locale.code === "zh-hant" ? "zh" : locale.code;
    assert.ok(html.includes(offerDate(LOCAL_OFFER.introPriceUntil, dateLocale)), `${locale.code}: missing introductory end date`);
    assert.ok(html.includes(offerDate(LOCAL_OFFER.regularPriceFrom, dateLocale)), `${locale.code}: missing regular price date`);
    assert.match(html, /data-price-cents="4900"/, `${locale.code}: missing regular price`);
    assert.match(html, /"priceValidUntil":\s*"2026-10-31"/, `${locale.code}: missing priceValidUntil`);
  }
});
