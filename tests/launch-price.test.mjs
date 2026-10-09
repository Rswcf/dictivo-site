import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { LOCALES } from "../data/site-content.mjs";
import { LOCAL_OFFER, introOfferActive, introPriceExpired, offerDate } from "../data/local-offer.mjs";
import { formatPrice } from "../data/price-display.mjs";
import { INTRO_FIGURES, INTRO_OFFER, INTRO_PHRASES, REGULAR_OFFER } from "./helpers/offer-states.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
const filesEndingIn = (dir, ext) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  if (statSync(path).isDirectory()) return filesEndingIn(path, ext);
  return name.endsWith(ext) ? [path] : [];
});
const htmlFiles = (dir) => filesEndingIn(dir, ".html");
const textFiles = () => [...htmlFiles(dist), ...filesEndingIn(dist, ".txt")];
// A page's own "updated" date sits in <time>; a page changed on 31 October may show that day there.
const withoutTimes = (text) => text.replace(/<time\b[^>]*>[\s\S]*?<\/time>/g, "");
const priceSpans = (html) => [...html.matchAll(/<span class="price">([^<]*)<\/span>/g)].map(([, text]) => text);
// "US$29" or "29 US$ inkl. MwSt.", but not "US$299".
const showsFigure = (span, figure) => span.startsWith(figure) && !/[\d.,]/.test(span[figure.length] ?? "");

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

// check-public-output.mjs fails the daily deploy while introPriceExpired() is true, so a build after
// the last introductory day cannot keep advertising it; the runbook's cleared dates switch it off.
test("the introductory price expires the day the regular price starts", () => {
  assert.ok(INTRO_OFFER.regularPriceFrom > INTRO_OFFER.introPriceUntil);
  assert.equal(introPriceExpired("2026-10-31", INTRO_OFFER), false);
  assert.equal(introPriceExpired("2026-11-01", INTRO_OFFER), true);
  for (const today of ["2026-10-31", "2026-11-01", "2027-06-01"]) assert.equal(introPriceExpired(today, REGULAR_OFFER), false, today);
  assert.equal(introPriceExpired("2026-11-01"), introPriceExpired("2026-11-01", LOCAL_OFFER));
  assert.equal(introPriceExpired("2026-11-01"), introOfferActive(), "the deploy guard follows the offer");
});

test("no page shows a struck-through or undated regular price", () => {
  const stale = /tier-price-was|regular price \$49|regulär \$49|prix normal \$49|precio normal \$49|prezzo regolare \$49|reguliere prijs \$49|preço normal \$49|常规价 \$49|常規價 \$49|通常価格 \$49|정가는 \$49|launch price|Aktionspreis/;
  for (const file of htmlFiles(dist)) assert.doesNotMatch(readFileSync(file, "utf8"), stale, file);
});

test("every homepage dates the introductory price while it runs, and states the one regular price after it", () => {
  for (const locale of LOCALES) {
    const html = readFileSync(`${dist}${locale.path.slice(1)}index.html`, "utf8");
    const dateLocale = locale.code === "zh-hant" ? "zh" : locale.code;
    const regular = formatPrice({ cents: LOCAL_OFFER.regularPrice * 100, form: "main", lang: locale.code });
    assert.ok(priceSpans(html).some((span) => showsFigure(span, regular)), `${locale.code}: missing regular price ${regular}`);
    if (introOfferActive()) {
      assert.ok(html.includes(offerDate(LOCAL_OFFER.introPriceUntil, dateLocale)), `${locale.code}: missing introductory end date`);
      assert.ok(html.includes(offerDate(LOCAL_OFFER.regularPriceFrom, dateLocale)), `${locale.code}: missing regular price date`);
      assert.ok(html.includes(`"priceValidUntil":"${LOCAL_OFFER.introPriceUntil}"`), `${locale.code}: missing priceValidUntil`);
    } else {
      const until = offerDate(INTRO_OFFER.introPriceUntil, dateLocale);
      assert.equal(withoutTimes(html).includes(until), false, `${locale.code}: still dates the introductory offer (${until})`);
      assert.doesNotMatch(html, /priceValid(Until|From)/, `${locale.code}: dated Offer`);
    }
  }
});

// The runbook's check after steps 1 and 2, as a test. While the offer runs, it checks instead that
// every phrase and figure it looks for is really on the site, so it cannot pass vacuously later.
test("once the introductory offer ends, no page or llms.txt names its price, dates or labels", () => {
  const files = textFiles();
  if (introOfferActive()) {
    const all = files.map((file) => readFileSync(file, "utf8")).join("\n");
    for (const phrase of INTRO_PHRASES) assert.ok(all.includes(phrase), `"${phrase}" is not on the site; update tests/helpers/offer-states.mjs`);
    const spans = priceSpans(all);
    for (const figure of INTRO_FIGURES) assert.ok(spans.some((span) => showsFigure(span, figure)), `no price span shows ${figure}`);
    return;
  }
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    for (const phrase of INTRO_PHRASES) assert.equal(withoutTimes(text).includes(phrase), false, `${file}: "${phrase}" belongs to the introductory offer`);
    for (const span of priceSpans(text)) {
      for (const figure of INTRO_FIGURES) assert.equal(showsFigure(span, figure), false, `${file}: price span "${span}" shows the introductory price`);
    }
    assert.doesNotMatch(text, /priceValid(Until|From)|US\$29(?![\d.])/, `${file}: introductory Offer or price`);
  }
});
