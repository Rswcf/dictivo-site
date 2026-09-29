import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCAL_OFFER, offerDate } from "../data/local-offer.mjs";
import { MEDIA_KIT_LASTMOD } from "../data/media-kit.mjs";

const html = () => readFileSync(new URL("../dist/media-kit/index.html", import.meta.url), "utf8");

test("the media kit states the introductory price, its end date and the regular price from placeholders", () => {
  const page = html();
  const row = page.match(/<th scope="row">Paid Local<\/th>\s*<td>([\s\S]*?)<\/td>/)[1];
  assert.ok(row.includes('<span class="price">US$29</span>'), row);
  assert.ok(row.includes('<span class="price">US$49</span>'), row);
  assert.ok(row.includes(offerDate(LOCAL_OFFER.introPriceUntil, "en")), row);
  assert.ok(row.includes(offerDate(LOCAL_OFFER.regularPriceFrom, "en")), row);
  assert.match(row, /introductory/i);
  const claim = page.match(/One-time Local license \(([\s\S]*?)\)<\/td>/)[1];
  assert.ok(claim.includes('<span class="price">US$49</span>'), claim);
  assert.equal(MEDIA_KIT_LASTMOD, "2026-09-29");
  assert.ok(page.includes(`"dateModified":"${MEDIA_KIT_LASTMOD}"`));
});
