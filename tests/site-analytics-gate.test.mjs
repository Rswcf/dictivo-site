import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { randomUUID, webcrypto } from "node:crypto";
import vm from "node:vm";

// The analytics section of assets/site.js runs in a bare vm context, the same
// way scripts/check-web-attribution.mjs loads it: no DOM, a fake window,
// document and navigator, and a sendBeacon/fetch pair that records payloads.
const script = readFileSync(new URL("../assets/site.js", import.meta.url), "utf8");
const start = script.indexOf("function normalizeDownloadPlatform(");
const end = script.indexOf("function fillTemplate(", start);
assert.ok(start >= 0 && end > start, "the analytics section of site.js must keep its boundaries");
const analytics = script.slice(start, end);

const DOWNLOAD = "https://api.dictivo.app/download/mac?version=0.3.52";

function memoryStorage(entries = {}) {
  const items = new Map(Object.entries(entries));
  return {
    getItem: (key) => (items.has(key) ? items.get(key) : null),
    setItem: (key, value) => { items.set(key, String(value)); },
    removeItem: (key) => { items.delete(key); },
    keys: () => [...items.keys()],
  };
}

function loadPage(url, { storage, storageBlocked = false, sendBeacon = true, referrer = "" } = {}) {
  const events = [];
  const fetched = [];
  const handlers = {};
  const window = { location: new URL(url) };
  if (storageBlocked) {
    Object.defineProperty(window, "localStorage", { get() { throw new Error("SecurityError: The operation is insecure."); } });
  } else if (storage) {
    window.localStorage = storage;
  }
  const context = vm.createContext({
    URL, URLSearchParams,
    crypto: { randomUUID, getRandomValues: webcrypto.getRandomValues.bind(webcrypto) },
    window,
    document: {
      referrer, documentElement: { lang: "en" },
      querySelectorAll: () => [],
      addEventListener: (name, handler) => { handlers[name] = handler; },
    },
    navigator: sendBeacon ? { sendBeacon: (endpoint, body) => { events.push({ endpoint, ...JSON.parse(body) }); return true; } } : {},
    fetch: (endpoint, init) => { fetched.push({ endpoint, ...JSON.parse(init.body) }); return Promise.resolve({ ok: true }); },
  });
  vm.runInContext(analytics, context);
  return { context, events, fetched, handlers, location: window.location };
}

function downloadLink(href = DOWNLOAD) {
  return {
    href,
    dataset: { platform: "macos", artifact: "dmg", downloadContent: "hero_top_mac" },
    hasAttribute: () => false,
    classList: { contains: (name) => name === "download-link" },
  };
}

function pageLink(href) {
  return { href, dataset: {}, hasAttribute: () => false, classList: { contains: () => false } };
}

function click(page, anchor) {
  page.handlers.click({ isTrusted: true, defaultPrevented: false, target: { closest: () => anchor } });
  return new URL(anchor.href, page.location);
}

test("the public site sends a page view and, on click, decorates the download link and sends the click", () => {
  const page = loadPage("https://dictivo.app/");
  assert.equal(page.events.length, 1);
  assert.equal(page.events[0].event, "page_view");
  const link = downloadLink();
  page.context.sendDownloadClick(link);
  const href = new URL(link.href);
  assert.equal(href.searchParams.get("visitId"), page.events[0].visitId);
  assert.equal(href.searchParams.get("instrumentationVersion"), "web-linked-v1");
  assert.equal(page.events.length, 2);
  assert.equal(page.events[1].event, "download_cta_clicked");
  assert.equal(page.fetched.length, 0);
});

test("local and preview hosts leave download links untouched and send nothing", () => {
  for (const host of ["127.0.0.1:4173", "localhost:4173", "preview.dictivo-app.pages.dev", "dictivo-app.pages.dev"]) {
    const page = loadPage(`https://${host}/?utm_source=newsletter`);
    const link = downloadLink();
    page.context.sendDownloadClick(link);
    assert.equal(link.href, DOWNLOAD, `${host}: the download link was rewritten`);
    assert.equal(page.events.length, 0, `${host}: a beacon was sent`);
    assert.equal(page.fetched.length, 0, `${host}: a fetch was sent`);
  }
});

test("without sendBeacon the public site falls back to fetch and preview hosts still send nothing", () => {
  const preview = loadPage("https://preview.dictivo-app.pages.dev/", { sendBeacon: false });
  preview.context.sendDownloadClick(downloadLink());
  assert.equal(preview.fetched.length, 0);
  const page = loadPage("https://dictivo.app/", { sendBeacon: false });
  page.context.sendDownloadClick(downloadLink());
  assert.deepEqual(page.fetched.map((request) => request.event), ["page_view", "download_cta_clicked"]);
  assert.equal(page.events.length, 0);
});
