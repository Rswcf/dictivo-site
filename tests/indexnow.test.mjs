import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Exercise the CLI with a fake transport: no search-engine notifications in tests.
function runSubmission({ keyStatus = 200, keyBody, submitStatus = 200 } = {}) {
  const directory = mkdtempSync(join(tmpdir(), "dictivo-indexnow-"));
  const summary = join(directory, "summary.md");
  const key = readFileSync(new URL("../a466589ed8677749e2b7fdd18c7ddcf6.txt", import.meta.url), "utf8");
  try {
    const result = spawnSync(process.execPath, ["--input-type=module", "-e", `
      import assert from 'node:assert/strict';
      let requests = 0;
      globalThis.fetch = async (url, options) => {
        requests++;
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
        console.log('SUBMISSION_SENT');
        return new Response('provider result', { status: ${submitStatus} });
      };
      await import(${JSON.stringify(new URL("../scripts/submit-indexnow.mjs", import.meta.url).href)});
    `], { encoding: "utf8", env: { ...process.env, GITHUB_STEP_SUMMARY: summary, GITHUB_ACTIONS: "true" } });
    let summaryText = "";
    try { summaryText = readFileSync(summary, "utf8"); } catch (error) { if (error.code !== "ENOENT") throw error; }
    return { ...result, summary: summaryText };
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
