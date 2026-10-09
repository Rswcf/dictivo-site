import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCAL_OFFER, introOfferActive, offerDate } from "../data/local-offer.mjs";
import { MEDIA_KIT_LASTMOD } from "../data/media-kit.mjs";

const html = () => readFileSync(new URL("../dist/media-kit/index.html", import.meta.url), "utf8");
const span = (dollars) => `<span class="price">US$${dollars}</span>`;
const count = (text, token) => text.split(token).length - 1;

// While the introductory offer runs, the media kit dates it and names the regular price; after the
// 2026-11-01 rollover it states the one price, undated. Either way every figure is a placeholder.
test("the media kit states the Local price from placeholders, dated only while the introductory offer runs", () => {
  const page = html();
  const row = page.match(/<th scope="row">Paid Local<\/th>\s*<td>([\s\S]*?)<\/td>/)[1];
  const claim = page.match(/One-time Local license \(([\s\S]*?)\)<\/td>/)[1];
  assert.ok(row.includes(span(LOCAL_OFFER.price)), row);
  assert.ok(claim.includes(span(LOCAL_OFFER.price)), claim);
  assert.ok(row.includes(`${LOCAL_OFFER.includedUpdateMonths} months of updates`), row);
  assert.ok(row.includes(span(LOCAL_OFFER.updateRenewal)), row);
  if (introOfferActive()) {
    assert.ok(row.includes(span(LOCAL_OFFER.regularPrice)), row);
    assert.ok(row.includes(offerDate(LOCAL_OFFER.introPriceUntil, "en")), row);
    assert.ok(row.includes(offerDate(LOCAL_OFFER.regularPriceFrom, "en")), row);
    assert.match(row, /introductory/i);
    assert.ok(claim.includes(span(LOCAL_OFFER.regularPrice)), claim);
  } else {
    assert.equal(count(row, '<span class="price">'), 2, `one Local price and the renewal: ${row}`);
    assert.equal(count(claim, '<span class="price">'), 1, claim);
    for (const text of [row, claim]) assert.doesNotMatch(text, /introductory|until|2026/i, text);
  }
  assert.equal(MEDIA_KIT_LASTMOD, "2026-09-29");
  assert.ok(page.includes(`"dateModified":"${MEDIA_KIT_LASTMOD}"`));
});
