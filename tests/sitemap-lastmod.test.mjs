import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { PRICING_LASTMOD } from "../data/local-offer.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;

test("pages that show a price report a sitemap date no older than the last price change", () => {
  const sitemap = readFileSync(`${dist}sitemap.xml`, "utf8");
  let priced = 0;
  for (const [, loc, lastmod] of sitemap.matchAll(/<loc>https:\/\/dictivo\.app([^<]*)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) {
    const file = `${dist}${loc.slice(1)}${loc.endsWith("/") ? "index.html" : ""}`;
    if (!existsSync(file) || !readFileSync(file, "utf8").includes('<span class="price">')) continue;
    priced += 1;
    assert.ok(lastmod >= PRICING_LASTMOD, `${loc}: sitemap lastmod ${lastmod} is older than ${PRICING_LASTMOD}`);
  }
  // 11 homepages, 66 comparison pages plus the English hub, the Windows guide, two
  // first-dictation guides, the media kit and the terms.
  assert.ok(priced >= 11 + 66 + 1 + 5, `only ${priced} priced pages found in the sitemap`);
});
