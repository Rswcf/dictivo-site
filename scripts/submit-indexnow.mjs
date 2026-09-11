// Submit all sitemap URLs to IndexNow (Bing, Yandex, and partners).
// The key file must be publicly served at https://dictivo.app/<key>.txt.
// Usage: node scripts/submit-indexnow.mjs

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const KEY = "a466589ed8677749e2b7fdd18c7ddcf6";
const HOST = "dictivo.app";

const sitemap = readFileSync(resolve(import.meta.dirname, "../dist/sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length === 0) throw new Error("No URLs found in dist/sitemap.xml — run generate-site.mjs first.");
if (urls.length > 10000 || urls.some((url) => new URL(url).origin !== `https://${HOST}`)) {
  throw new Error("IndexNow accepts at most 10,000 URLs from this site's canonical host.");
}
const keyLocation = `https://${HOST}/${KEY}.txt`;
const keyResponse = await fetch(keyLocation, { signal: AbortSignal.timeout(15000) });
if (keyResponse.status !== 200 || (await keyResponse.text()).trim() !== KEY) {
  throw new Error("The public IndexNow verification file is missing or does not match. Publish it before submitting URLs.");
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  signal: AbortSignal.timeout(30000),
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation,
    urlList: urls,
  }),
});

if (response.status !== 200 && response.status !== 202) {
  console.error(`IndexNow rejected ${urls.length} URLs: HTTP ${response.status}. No successful submission recorded.`);
  console.error((await response.text()).slice(0, 2000));
  process.exit(1);
}
console.log(`IndexNow ${response.status === 202 ? "received (key validation pending)" : "accepted"} ${urls.length} URLs: HTTP ${response.status}. This is not evidence of indexing or ranking.`);
