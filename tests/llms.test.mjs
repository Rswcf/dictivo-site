import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { LOCAL_OFFER, introOfferActive, offerDate } from "../data/local-offer.mjs";
import { llmsLocalPriceLine } from "../data/local-offer-copy.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
const llms = () => readFileSync(`${dist}llms.txt`, "utf8");
const section = (text, title) => {
  const start = text.indexOf(`## ${title}\n`);
  assert.ok(start >= 0, `missing section ${title}`);
  const rest = text.slice(start + title.length + 4);
  return rest.slice(0, rest.search(/\n## |$/));
};

// Both introductory figures with their dates while the offer runs; one undated price after it.
test("llms.txt states prices and licence terms from the offer terms", () => {
  const prices = section(llms(), "Prices and license");
  assert.ok(prices.includes(llmsLocalPriceLine()), `missing "${llmsLocalPriceLine()}"`);
  if (!introOfferActive()) assert.doesNotMatch(prices, /until|introductory|from \d/, prices);
  for (const expected of [
    ...(introOfferActive()
      ? [
        `US$${LOCAL_OFFER.price} once until ${offerDate(LOCAL_OFFER.introPriceUntil, "en")}`,
        `US$${LOCAL_OFFER.regularPrice} once from ${offerDate(LOCAL_OFFER.regularPriceFrom, "en")}`,
      ]
      : [`Dictivo Local: US$${LOCAL_OFFER.price} once.`]),
    `${LOCAL_OFFER.includedUpdateMonths} months of updates`,
    `US$${LOCAL_OFFER.updateRenewal} a year`,
    `up to ${LOCAL_OFFER.personalDevices} personal devices`,
    `${LOCAL_OFFER.trialDays}-day`,
    "US$8.99 a month",
    "tax included",
  ]) assert.ok(prices.includes(expected), `missing "${expected}"`);
});

test("llms.txt defines Local and Cloud Fast in one sentence each", () => {
  const modes = section(llms(), "Local and Cloud Fast").trim().split("\n");
  assert.equal(modes.length, 2);
  assert.match(modes[0], /^- Local: .*does not send .*audio to a transcription server\.$/);
  assert.match(modes[1], /^- Cloud Fast: .*only the selected recording.*\.$/);
});

test("llms.txt maps each tracked question to an English page that exists", () => {
  const list = section(llms(), "Questions and the pages that answer them").trim().split("\n");
  assert.ok(list.length >= 10, `only ${list.length} questions`);
  const paths = new Set();
  for (const line of list) {
    const match = line.match(/^- (.+\?) → \[[^\]]+\]\((https:\/\/dictivo\.app\/[^)]*)\)/);
    assert.ok(match, line);
    const path = new URL(match[2]).pathname;
    paths.add(path);
    assert.ok(existsSync(`${dist}${path.slice(1)}${path.endsWith("/") ? "index.html" : ""}`), `${path} does not exist`);
    assert.doesNotMatch(path, /^\/(de|fr|es|it|nl|pt|zh|zh-hant|ja|ko)\//, `${path}: locale URL in the English file`);
  }
  for (const path of ["/guides/offline-dictation-on-mac/", "/privacy/local-dictation-network-test/", "/guides/mac-dictation-benchmark-method/", "/privacy/where-dictation-audio-goes/"]) {
    assert.ok(paths.has(path), `${path} not mapped`);
  }
});

test("the English llms.txt adds no locale URLs", () => {
  assert.doesNotMatch(llms(), /https:\/\/dictivo\.app\/(de|fr|es|it|nl|pt|zh|zh-hant|ja|ko)\//);
});
