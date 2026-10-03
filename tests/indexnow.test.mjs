import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Exercise the CLI with a fake transport: no search-engine notifications in tests.
// `previous` is the live sitemap saved before deployment: a string is written to a
// file, "missing" names a file that does not exist, and undefined leaves it unset.
function runSubmission({ keyStatus = 200, keyBody, submitStatus = 200, previous } = {}) {
  const directory = mkdtempSync(join(tmpdir(), "dictivo-indexnow-"));
  const summary = join(directory, "summary.md");
  const previousPath = join(directory, "live-sitemap.xml");
  if (typeof previous === "string" && previous !== "missing") writeFileSync(previousPath, previous);
  const key = readFileSync(new URL("../a466589ed8677749e2b7fdd18c7ddcf6.txt", import.meta.url), "utf8");
  try {
    const result = spawnSync(process.execPath, ["--input-type=module", "-e", `
      import assert from 'node:assert/strict';
      let requests = 0;
      globalThis.fetch = async (url, options) => {
        requests++;
        console.log('FETCH_CALLED');
        if (requests === 1) {
          assert.equal(url, 'https://dictivo.app/a466589ed8677749e2b7fdd18c7ddcf6.txt');
          return new Response(${JSON.stringify(keyBody ?? key)}, { status: ${keyStatus} });
        }
        assert.equal(requests, 2, 'No retry or extra provider submission');
        assert.equal(url, 'https://yandex.com/indexnow');
        assert.equal(options.method, 'POST');
        const payload = JSON.parse(options.body);
        assert.equal(payload.host, 'dictivo.app');
        assert.equal(payload.key, ${JSON.stringify(key.trim())});
        assert.equal(payload.keyLocation, 'https://dictivo.app/' + payload.key + '.txt');
        assert.ok(payload.urlList.length > 0 && payload.urlList.length <= 10000);
        assert.ok(payload.urlList.every(url => new URL(url).origin === 'https://dictivo.app'));
        console.log('SUBMISSION_SENT ' + JSON.stringify(payload.urlList));
        return new Response('provider result', { status: ${submitStatus} });
      };
      await import(${JSON.stringify(new URL("../scripts/submit-indexnow.mjs", import.meta.url).href)});
    `], {
      encoding: "utf8",
      env: { ...process.env, GITHUB_STEP_SUMMARY: summary, GITHUB_ACTIONS: "true", INDEXNOW_PREVIOUS_SITEMAP: previous === undefined ? "" : previousPath },
    });
    let summaryText = "";
    try { summaryText = readFileSync(summary, "utf8"); } catch (error) { if (error.code !== "ENOENT") throw error; }
    const sent = result.stdout.match(/SUBMISSION_SENT (.*)/);
    return { ...result, summary: summaryText, urlList: sent ? JSON.parse(sent[1]) : null };
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

test("IndexNow accepted response records the actual provider and status", () => {
  const result = runSubmission();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.summary, /accepted \d+ URLs via https:\/\/yandex.com\/indexnow: HTTP 200/);
});

test("IndexNow pending verification is not reported as accepted", () => {
  const result = runSubmission({ submitStatus: 202 });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.summary, /received \(key validation pending\)/);
  assert.match(result.stdout, /::warning::/);
  assert.doesNotMatch(result.summary, /accepted \d+ URLs/);
});

test("IndexNow ownership rejection fails the CLI and records rejection", () => {
  const result = runSubmission({ submitStatus: 403 });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /No successful submission recorded/);
  assert.match(result.summary, /rejected .*HTTP 403/);
});

for (const scenario of [{ keyStatus: 403 }, { keyBody: "wrong-key" }]) {
  test(`IndexNow blocks submission when key preflight fails: ${JSON.stringify(scenario)}`, () => {
    const result = runSubmission(scenario);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /verification file is missing or does not match/);
    assert.doesNotMatch(result.stdout, /SUBMISSION_SENT/);
    assert.equal(result.summary, "");
  });
}

const sitemap = readFileSync(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const blocks = sitemap.match(/  <url>[\s\S]*?<\/url>\n/g);

test("IndexNow sends nothing when the live sitemap already matches", () => {
  const result = runSubmission({ previous: sitemap });
  assert.equal(result.status, 0, result.stderr);
  assert.doesNotMatch(result.stdout, /FETCH_CALLED/, "no key preflight and no submission");
  assert.match(result.summary, /submitted no URLs/);
  assert.match(result.summary, new RegExp(`0 of ${sitemapUrls.length} sitemap URLs`));
});

test("IndexNow sends only URLs that were added, re-dated or removed", () => {
  const added = blocks[1].match(/<loc>([^<]+)<\/loc>/)[1];
  const redated = blocks[2].match(/<loc>([^<]+)<\/loc>/)[1];
  const removed = "https://dictivo.app/retired-page/";
  const previous = sitemap
    .replace(blocks[1], "")
    .replace(blocks[2], blocks[2].replace(/<lastmod>[^<]+<\/lastmod>/, "<lastmod>2000-01-01</lastmod>"))
    .replace("</urlset>", `  <url>\n    <loc>${removed}</loc>\n    <lastmod>2026-01-01</lastmod>\n  </url>\n</urlset>`);
  const result = runSubmission({ previous });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(result.urlList, [added, redated, removed]);
  assert.match(result.summary, /accepted 3 URLs via https:\/\/yandex.com\/indexnow: HTTP 200/);
  assert.match(result.summary, new RegExp(`3 of ${sitemapUrls.length} sitemap URLs changed since the live sitemap \\(1 added, 1 re-dated, 1 removed\\)`));
});

for (const [name, previous] of [["an error page", "<!doctype html><title>Error</title>"], ["no file", "missing"]]) {
  test(`IndexNow sends every sitemap URL when the live sitemap is ${name}`, () => {
    const result = runSubmission({ previous });
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(result.urlList, sitemapUrls);
    assert.match(result.summary, /could not be read/);
  });
}

test("IndexNow refuses a removed URL from another host", () => {
  const previous = sitemap.replace("</urlset>", "  <url>\n    <loc>https://example.com/</loc>\n  </url>\n</urlset>");
  const result = runSubmission({ previous });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /canonical host/);
  assert.doesNotMatch(result.stdout, /FETCH_CALLED/);
});
