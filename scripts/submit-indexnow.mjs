// Submit all sitemap URLs to IndexNow (Bing, Yandex, and partners).
// The key file must be publicly served at https://dictivo.app/<key>.txt.
// Usage: node scripts/submit-indexnow.mjs

import { appendFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const KEY = "a466589ed8677749e2b7fdd18c7ddcf6";
const HOST = "dictivo.app";
// This participating endpoint verified our existing key (HTTP 200, 2026-09-20).
// Submit once: IndexNow participants share URLs. https://www.indexnow.org/faq
const ENDPOINT = "https://yandex.com/indexnow";

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

console.log(`Submitting ${urls.length} URLs to ${ENDPOINT}; public key file verified.`);
const response = await fetch(ENDPOINT, {
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

const status = response.status === 200 ? "accepted" : response.status === 202 ? "received (key validation pending)" : "rejected";
const result = `IndexNow ${status} ${urls.length} URLs via ${ENDPOINT}: HTTP ${response.status}.`;
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### IndexNow submission\n\n${result}\n\nAcceptance is not evidence of indexing, ranking, or Bing-specific processing.\n`);
}
if (response.status !== 200 && response.status !== 202) {
  console.error(`${result} No successful submission recorded.`);
  console.error((await response.text()).slice(0, 2000));
  process.exit(1);
}
if (response.status === 202 && process.env.GITHUB_ACTIONS === "true") {
  console.log("::warning::IndexNow key validation is pending; HTTP 202 is not verified ownership.");
}
console.log(`${result} This is not evidence of indexing or ranking.`);
