import test from "node:test";
import assert from "node:assert/strict";
import { LOCAL_OFFER, introOfferActive, offerDate } from "../data/local-offer.mjs";
import {
  guideLocalPrice,
  llmsLocalPriceLine,
  localOfferNodes,
  mediaKitLocalFacts,
  pricingAnchor,
  pricingFaqs,
  pricingPageAnswer,
  pricingPlanPrice,
  pricingPriceChangeSection,
} from "../data/local-offer-copy.mjs";

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

// The /pricing/ page builds every sentence that names a Dictivo price or an offer date here.
const PRICING_DATED = /2026|until|from 1 November|introductory/;
const LITERAL_PRICE = /US\$|\$\d/;
const pricingTexts = (offer, options) => [
  pricingPageAnswer("en", offer),
  pricingPlanPrice("en", offer),
  ...(pricingPriceChangeSection("en", offer) ? [pricingPriceChangeSection("en", offer).title, ...pricingPriceChangeSection("en", offer).paragraphs] : []),
  ...pricingFaqs("en", offer, options).flat(),
];

test("the pricing page answer and plan price state one undated price after the rollover", () => {
  for (const text of [pricingPageAnswer("en", AFTER), pricingPlanPrice("en", AFTER)]) {
    assert.equal(count(text, "{{price.local.inline}}"), 1, text);
    assert.equal(count(text, "{{price.regular."), 0, text);
    assert.doesNotMatch(text, PRICING_DATED, text);
    assert.doesNotMatch(text, BROKEN, text);
  }
  assert.ok(pricingPageAnswer("en", AFTER).startsWith("Dictivo Local is {{price.local.inline}} once."), pricingPageAnswer("en", AFTER));
  for (const text of [pricingPageAnswer("en"), pricingPlanPrice("en")]) {
    assert.equal(count(text, "{{price.local.inline}}"), 1, text);
    assert.equal(count(text, "{{price.regular.inline}}"), 1, text);
    assert.ok(text.includes(offerDate(LOCAL_OFFER.introPriceUntil, "en")), text);
    assert.ok(text.includes(offerDate(LOCAL_OFFER.regularPriceFrom, "en")), text);
    assert.doesNotMatch(text, BROKEN, text);
  }
  // The license terms come from the offer, not from the copy.
  for (const offer of [LOCAL_OFFER, AFTER]) {
    const answer = pricingPageAnswer("en", offer);
    assert.ok(answer.includes(`${offer.includedUpdateMonths} months of updates`), answer);
    assert.ok(answer.includes(`up to ${offer.personalDevices} personal devices`), answer);
    assert.ok(answer.includes(`${offer.trialDays}-day full Local trial`), answer);
    assert.equal(count(answer, "{{price.renewal.inline}}"), 1, answer);
    assert.equal(count(answer, "{{price.cloudFast.inline}}"), 1, answer);
  }
  const changed = pricingPageAnswer("en", { ...AFTER, includedUpdateMonths: 18, personalDevices: 5, trialDays: 7 });
  for (const expected of ["18 months", "up to 5 personal devices", "7-day full Local trial"]) assert.ok(changed.includes(expected), changed);
  assert.equal(pricingPlanPrice("en"), guideLocalPrice("en"));
  assert.equal(pricingPlanPrice("en", AFTER), guideLocalPrice("en", AFTER));
});

test("the pricing page price-change section exists only while the introductory offer runs", () => {
  assert.equal(pricingPriceChangeSection("en", AFTER), null);
  const section = pricingPriceChangeSection("en");
  assert.ok(section.title.includes(offerDate(LOCAL_OFFER.regularPriceFrom, "en")), section.title);
  const body = section.paragraphs.join(" ");
  assert.equal(count(body, "{{price.local.inline}}"), 1, body);
  assert.equal(count(body, "{{price.regular.inline}}"), 1, body);
  assert.ok(body.includes(offerDate(LOCAL_OFFER.introPriceUntil, "en")), body);
  assert.ok(body.includes(offerDate(LOCAL_OFFER.regularPriceFrom, "en")), body);
  assert.ok(body.includes(`${LOCAL_OFFER.includedUpdateMonths} months of updates`) && body.includes(`up to ${LOCAL_OFFER.personalDevices} personal devices`), body);
  assert.doesNotMatch(body, /buy before|hurry|last chance/i, body);
  assert.doesNotMatch(body, BROKEN, body);
});

test("the pricing FAQ drops the price-change question after the rollover", () => {
  for (const windows of [true, false]) {
    const before = pricingFaqs("en", LOCAL_OFFER, { windows });
    const after = pricingFaqs("en", AFTER, { windows });
    assert.equal(before.length, 9, `windows ${windows}`);
    assert.equal(after.length, before.length - 1, `windows ${windows}`);
    assert.ok(before.some(([question]) => question === "When does the Local price change?"));
    assert.ok(!after.some(([question]) => /price change/i.test(question)), JSON.stringify(after));
    for (const [question, answer] of after) {
      assert.doesNotMatch(`${question} ${answer}`, PRICING_DATED, question);
      assert.equal(count(answer, "{{price.regular."), 0, question);
      assert.doesNotMatch(`${question} ${answer}`, BROKEN, question);
    }
    for (const [question, answer] of before) assert.doesNotMatch(`${question} ${answer}`, BROKEN, question);
    const [subscriptionQuestion, subscriptionAnswer] = before[0];
    assert.equal(subscriptionQuestion, "Is Dictivo a subscription?");
    assert.ok(subscriptionAnswer.startsWith("No."), subscriptionAnswer);
    assert.ok(subscriptionAnswer.includes(offerDate(LOCAL_OFFER.introPriceUntil, "en")), subscriptionAnswer);
    assert.equal(count(after[0][1], "{{price.local.inline}}"), 1, after[0][1]);
    const platformAnswer = before.find(([question]) => question === "Is the price the same on Windows and Mac?")[1];
    assert.equal(/Windows x64/.test(platformAnswer), windows, platformAnswer);
    if (!windows) assert.match(platformAnswer, /temporarily unavailable/, platformAnswer);
  }
  assert.deepEqual(pricingFaqs("en").map(([question]) => question), pricingFaqs("en", LOCAL_OFFER, { windows: false }).map(([question]) => question));
});

test("pricing page sentences never write a Dictivo price literally and exist only in English", () => {
  for (const offer of [LOCAL_OFFER, AFTER]) for (const windows of [true, false]) {
    for (const text of pricingTexts(offer, { windows })) assert.doesNotMatch(text, LITERAL_PRICE, text);
  }
  for (const make of [pricingPageAnswer, pricingPlanPrice, pricingPriceChangeSection, pricingFaqs]) {
    assert.throws(() => make("de"), /No pricing page copy for de/, make.name);
  }
});
