import test from "node:test";
import assert from "node:assert/strict";
import { onRequest } from "../../functions/_middleware.js";

const CHROME = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
const PAGE = '<!doctype html><html lang="en"><body class="home"><main>Dictivo</main></body></html>';

function context(path, { headers = {}, cf = { country: "DE" }, origin = "https://dictivo.app", contentType = "text/html; charset=utf-8" } = {}) {
  const request = new Request(new URL(path, origin), {
    headers: { "user-agent": CHROME, "sec-fetch-dest": "document", "sec-fetch-site": "none", ...headers },
  });
  Object.defineProperty(request, "cf", { value: cf, configurable: true });
  const calls = { next: 0, input: undefined };
  return {
    request,
    calls,
    next: async (input) => {
      calls.next++;
      calls.input = input;
      return new Response(PAGE, {
        status: 200,
        headers: { "content-type": contentType, etag: '"abc"', "content-security-policy": "default-src 'self'" },
      });
    },
  };
}

test("redirects an entry visit with no-store and keeps the query string", async () => {
  const response = await onRequest(context("/?utm_source=google"));
  assert.equal(response.status, 302);
  assert.equal(response.headers.get("location"), "/de/?utm_source=google");
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.equal(response.headers.get("x-dictivo-locale-route"), "country:de");
});

test("passes through with static headers intact", async () => {
  const ctx = context("/", { cf: { country: "US" } });
  const response = await onRequest(ctx);
  assert.equal(response.status, 200);
  assert.equal(ctx.calls.next, 1);
  assert.equal(response.headers.get("content-security-policy"), "default-src 'self'");
  assert.equal(response.headers.get("x-dictivo-locale-route"), "country:en");
  assert.equal(await response.text(), PAGE);
});

test("?lang= stores the choice in a first-party cookie", async () => {
  const response = await onRequest(context("/fr/?lang=fr", { headers: { "sec-fetch-site": "same-origin" } }));
  assert.equal(response.headers.get("location"), "/fr/");
  assert.equal(response.headers.get("set-cookie"), "dictivo_lang=fr; Path=/; Max-Age=31536000; SameSite=Lax; Secure; HttpOnly");
});

test("EU visitors outside Germany get the prompt instead of a redirect", async () => {
  const ctx = context("/", { cf: { country: "FR" }, headers: { "if-none-match": '"abc"', "if-modified-since": "Mon, 14 Sep 2026 00:00:00 GMT" } });
  const response = await onRequest(ctx);
  const body = await response.text();
  assert.equal(response.status, 200);
  assert.match(body, /<body class="home"><aside class="locale-suggestion" lang="fr"/);
  assert.match(body, /href="\/fr\/\?lang=fr">Voir en français</);
  assert.match(body, /href="\/\?lang=en">Rester en anglais</);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.equal(response.headers.get("x-dictivo-locale-route"), "suggest:fr");
  assert.equal(response.headers.get("etag"), null);
  assert.equal(response.headers.get("content-security-policy"), "default-src 'self'");
  assert.equal(ctx.calls.input.headers.get("if-none-match"), null);
  assert.equal(ctx.calls.input.headers.get("if-modified-since"), null);
});

test("the prompt is skipped for non-HTML responses", async () => {
  const response = await onRequest(context("/", { cf: { country: "FR" }, contentType: "application/json" }));
  assert.equal(response.headers.get("x-dictivo-locale-route"), "suggest:fr:skipped");
  assert.equal(await response.text(), PAGE);
});

test("the test country header only works on preview hosts", async () => {
  const headers = { "x-dictivo-test-country": "JP" };
  assert.equal((await onRequest(context("/", { headers, cf: { country: "US" } }))).status, 200);
  const preview = await onRequest(context("/", { headers, cf: { country: "US" }, origin: "https://feat-ip-locale-routing.dictivo-app.pages.dev" }));
  assert.equal(preview.headers.get("location"), "/ja/");
});

test("fails open when routing throws", async () => {
  const ctx = context("/");
  Object.defineProperty(ctx.request, "cf", { get() { throw new Error("boom"); } });
  assert.equal((await onRequest(ctx)).status, 200);
});
