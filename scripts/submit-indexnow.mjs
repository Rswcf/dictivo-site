// Submit all sitemap URLs to IndexNow (Bing, Yandex, and partners).
// The key file must be publicly served at https://dictivo.app/<key>.txt.
// Usage: node scripts/submit-indexnow.mjs

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const KEY = "c5df5e411109537ea4eeadaf411f6618";
const HOST = "dictivo.app";

const sitemap = readFileSync(resolve(import.meta.dirname, "../dist/sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length === 0) throw new Error("No URLs found in dist/sitemap.xml — run generate-site.mjs first.");

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  }),
});

console.log(`Submitted ${urls.length} URLs to IndexNow: HTTP ${response.status}`);
if (!response.ok && response.status !== 202) {
  console.error(await response.text());
  process.exit(1);
}
