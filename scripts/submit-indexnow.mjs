// Submit changed sitemap URLs to IndexNow (Bing, Yandex, and partners).
// The key file must be publicly served at https://dictivo.app/<key>.txt.
// Usage: node scripts/submit-indexnow.mjs
//
// IndexNow wants only URLs that were added, updated or deleted. When
// INDEXNOW_PREVIOUS_SITEMAP names the live sitemap saved before deployment, only
// URLs added, re-dated (<lastmod>) or removed since then are sent. Without it,
// every sitemap URL is sent.

import { appendFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const KEY = "a466589ed8677749e2b7fdd18c7ddcf6";
const HOST = "dictivo.app";
// This participating endpoint verified our existing key (HTTP 200, 2026-09-20).
// Submit once: IndexNow participants share URLs. https://www.indexnow.org/faq
const ENDPOINT = "https://yandex.com/indexnow";

function sitemapEntries(xml) {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .map(([, block]) => ({ loc: block.match(/<loc>([^<]+)<\/loc>/)?.[1], lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] }))
    .filter((entry) => entry.loc);
}

const current = sitemapEntries(readFileSync(resolve(import.meta.dirname, "../dist/sitemap.xml"), "utf8"));
if (current.length === 0) throw new Error("No URLs found in dist/sitemap.xml — run generate-site.mjs first.");

const previousPath = process.env.INDEXNOW_PREVIOUS_SITEMAP;
let previous = [];
if (previousPath) {
  try {
    previous = sitemapEntries(readFileSync(previousPath, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

let urls;
let scope;
if (previous.length > 0) {
  const before = new Map(previous.map((entry) => [entry.loc, entry.lastmod]));
  const now = new Set(current.map((entry) => entry.loc));
  const changed = current.filter((entry) => !before.has(entry.loc) || before.get(entry.loc) !== entry.lastmod);
  const added = changed.filter((entry) => !before.has(entry.loc)).length;
  const removed = [...before.keys()].filter((loc) => !now.has(loc));
  urls = [...changed.map((entry) => entry.loc), ...removed];
  scope = `${urls.length} of ${current.length} sitemap URLs changed since the live sitemap (${added} added, ${changed.length - added} re-dated, ${removed.length} removed).`;
} else {
  urls = current.map((entry) => entry.loc);
  scope = previousPath
    ? `All ${current.length} sitemap URLs: the live sitemap saved before deployment could not be read.`
    : `All ${current.length} sitemap URLs: no previous sitemap was given.`;
}
if (urls.length > 10000 || urls.some((url) => new URL(url).origin !== `https://${HOST}`)) {
  throw new Error("IndexNow accepts at most 10,000 URLs from this site's canonical host.");
}

function report(result, note = "") {
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### IndexNow submission\n\n${result}\n\n${scope}\n${note && `\n${note}\n`}`);
  }
}

if (urls.length === 0) {
  const result = "IndexNow submitted no URLs.";
  report(result);
  console.log(`${result} ${scope}`);
} else {
  const keyLocation = `https://${HOST}/${KEY}.txt`;
  const keyResponse = await fetch(keyLocation, { signal: AbortSignal.timeout(15000) });
  if (keyResponse.status !== 200 || (await keyResponse.text()).trim() !== KEY) {
    throw new Error("The public IndexNow verification file is missing or does not match. Publish it before submitting URLs.");
  }

  console.log(`Submitting ${urls.length} URLs to ${ENDPOINT}; public key file verified. ${scope}`);
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
  report(result, "Acceptance is not evidence of indexing, ranking, or Bing-specific processing.");
  if (response.status !== 200 && response.status !== 202) {
    console.error(`${result} No successful submission recorded.`);
    console.error((await response.text()).slice(0, 2000));
    process.exit(1);
  }
  if (response.status === 202 && process.env.GITHUB_ACTIONS === "true") {
    console.log("::warning::IndexNow key validation is pending; HTTP 202 is not verified ownership.");
  }
  console.log(`${result} This is not evidence of indexing or ranking.`);
}
