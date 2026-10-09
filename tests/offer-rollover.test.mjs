import test from "node:test";
import assert from "node:assert/strict";
import { LOCAL_OFFER, introOfferActive, offerDate } from "../data/local-offer.mjs";
import { guideLocalPrice, llmsLocalPriceLine, localOfferNodes, mediaKitLocalFacts, pricingAnchor } from "../data/local-offer-copy.mjs";

// data/local-offer.mjs as the 2026-11-01 runbook (step 1) leaves it.
const AFTER = Object.freeze({ ...LOCAL_OFFER, price: 49, regularPrice: 49, introPriceUntil: null, regularPriceFrom: null });
const GUIDE_LOCALES = ["en", "de", "ja", "zh"];
const BROKEN = /Invalid Date|null|undefined|NaN/;
const count = (text, token) => text.split(token).length - 1;

test("the introductory offer is on only while both dates are set and the prices differ", () => {
  assert.equal(introOfferActive(LOCAL_OFFER), true);
  assert.equal(introOfferActive(), true);
  assert.equal(introOfferActive(AFTER), false);
  assert.equal(introOfferActive({ ...LOCAL_OFFER, introPriceUntil: null }), false);
  assert.equal(introOfferActive({ ...LOCAL_OFFER, regularPriceFrom: null }), false);
  assert.equal(introOfferActive({ ...LOCAL_OFFER, price: LOCAL_OFFER.regularPrice }), false);
});

test("guide price cells state one price after the rollover and both prices before it", () => {
  for (const locale of GUIDE_LOCALES) {
    const after = guideLocalPrice(locale, AFTER);
    assert.equal(count(after, "{{price.local.inline}}"), 1, `${locale}: ${after}`);
    assert.equal(count(after, "{{price.regular."), 0, `${locale}: ${after}`);
    assert.equal(count(after, "{{price.renewal.inline}}"), 1, `${locale}: ${after}`);
    assert.doesNotMatch(after, BROKEN, locale);
    assert.doesNotMatch(after, /2026|until|bis zum|まで|截至/, `${locale}: dated clause after the rollover: ${after}`);
    assert.ok(after.includes(String(AFTER.includedUpdateMonths)), locale);

    const before = guideLocalPrice(locale);
    assert.equal(count(before, "{{price.local.inline}}"), 1, locale);
    assert.equal(count(before, "{{price.regular.inline}}"), 1, locale);
    assert.ok(before.includes(offerDate(LOCAL_OFFER.introPriceUntil, locale)), locale);
    assert.ok(before.includes(offerDate(LOCAL_OFFER.regularPriceFrom, locale)), locale);
    assert.doesNotMatch(before, BROKEN, locale);
  }
  assert.throws(() => guideLocalPrice("fr"), /No guide price copy/);
});

// Every language the homepage copy is written in; Traditional Chinese is converted from zh.
const HOME_LOCALES = ["en", "de", "fr", "es", "it", "nl", "pt", "zh", "ja", "ko"];

test("the homepage pricing anchor states one price, dated only while the introductory offer runs", () => {
  for (const locale of HOME_LOCALES) {
    const after = pricingAnchor(locale, AFTER);
    assert.equal(count(after, "{{price.local.inline}}"), 1, `${locale}: ${after}`);
    assert.equal(count(after, "{{price."), 1, `${locale}: ${after}`);
    assert.doesNotMatch(after, BROKEN, locale);
    assert.doesNotMatch(after, /2026|until|bis zum|jusqu|hasta|fino al|tot en met|até|截至|まで|까지/, `${locale}: dated clause after the rollover: ${after}`);
    assert.match(after, /85/, `${locale}: subscription range: ${after}`);

    const before = pricingAnchor(locale);
    assert.equal(count(before, "{{price.local.inline}}"), 1, `${locale}: ${before}`);
    assert.equal(count(before, "{{price."), 1, `${locale}: ${before}`);
    assert.ok(before.includes(offerDate(LOCAL_OFFER.introPriceUntil, locale)), `${locale}: ${before}`);
    assert.doesNotMatch(before, BROKEN, locale);
    assert.equal(before.replace(offerDate(LOCAL_OFFER.introPriceUntil, locale), "").includes("2026"), false, `${locale}: ${before}`);
    // Dictivo's own figures come from placeholders; a literal "US$" would read as one.
    assert.doesNotMatch(`${before} ${after}`, /US\$|米ドル/, locale);
  }
  // German prices never end a sentence: "inkl. MwSt." already ends in a full stop.
  for (const text of [pricingAnchor("de"), pricingAnchor("de", AFTER)]) assert.doesNotMatch(text, /\{\{price\.local\.inline\}\}\./, text);
  assert.equal(
    pricingAnchor("en"),
    "Subscription dictation apps run $85-$180 every year - Dictivo Local is {{price.local.inline}} once until 31 October 2026.",
  );
  assert.equal(pricingAnchor("en", AFTER), "Subscription dictation apps run $85-$180 every year - Dictivo Local is {{price.local.inline}} once.");
  assert.throws(() => pricingAnchor("zh-hant"), /No pricing anchor copy/);
});

test("media kit facts drop the introductory clause after the rollover", () => {
  const after = mediaKitLocalFacts(AFTER);
  for (const text of [after.paidLocal, after.licenseClaim]) {
    assert.equal(count(text, "{{price.regular."), 0, text);
    assert.equal(count(text, "{{price.local.inline}}"), 1, text);
    assert.doesNotMatch(text, BROKEN, text);
    assert.doesNotMatch(text, /introductory|until|2026/, text);
  }
  const before = mediaKitLocalFacts();
  assert.match(before.paidLocal, /introductory price until 31 October 2026; \{\{price\.regular\.inline\}\} once from 1 November 2026/);
  assert.match(before.licenseClaim, /until 31 October 2026, then \{\{price\.regular\.inline\}\}/);
});

test("the llms.txt price line names only the regular price after the rollover", () => {
  assert.equal(llmsLocalPriceLine(AFTER), "Dictivo Local: US$49 once. Prices are in US dollars, tax included.");
  assert.equal(
    llmsLocalPriceLine(),
    "Dictivo Local: US$29 once until 31 October 2026 (introductory price), then US$49 once from 1 November 2026. Prices are in US dollars, tax included.",
  );
});

test("structured data lists one undated Local offer after the rollover", () => {
  const after = localOfferNodes(AFTER);
  assert.equal(after.length, 1);
  assert.equal(after[0].price, "49");
  assert.equal(after[0].priceSpecification.price, "49");
  assert.equal(after[0].priceSpecification.valueAddedTaxIncluded, true);
  assert.ok(!("priceValidUntil" in after[0]) && !("priceValidFrom" in after[0]), JSON.stringify(after));
  assert.doesNotMatch(JSON.stringify(after), BROKEN);

  const before = localOfferNodes();
  assert.equal(before.length, 2);
  assert.deepEqual(before.map((offer) => [offer.price, offer.priceValidUntil, offer.priceValidFrom]), [
    ["29", "2026-10-31", undefined],
    ["49", undefined, "2026-11-01"],
  ]);
});
