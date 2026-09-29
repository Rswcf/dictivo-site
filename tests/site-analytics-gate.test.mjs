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

test("/?self=1 stores the dictivo-self flag and stops page views, download decoration and download clicks", () => {
  const storage = memoryStorage();
  const page = loadPage("https://dictivo.app/?self=1", { storage });
  assert.equal(storage.getItem("dictivo-self"), "1");
  assert.deepEqual(storage.keys(), ["dictivo-self"], "only the flag is stored");
  const link = downloadLink();
  page.context.sendDownloadClick(link);
  assert.equal(link.href, DOWNLOAD);
  assert.equal(page.events.length, 0);
  assert.equal(page.fetched.length, 0);
  assert.equal(page.location.search, "?self=1", "the address is not rewritten");
});

test("the flag keeps excluding later visits without the parameter, and /?self=0 removes it", () => {
  const storage = memoryStorage({ "dictivo-self": "1" });
  const later = loadPage("https://dictivo.app/about/", { storage });
  const link = downloadLink();
  later.context.sendDownloadClick(link);
  assert.equal(later.events.length, 0);
  assert.equal(link.href, DOWNLOAD);

  const reset = loadPage("https://dictivo.app/?self=0", { storage });
  assert.equal(storage.getItem("dictivo-self"), null);
  assert.equal(reset.events.length, 1, "the page that removes the flag is counted again");
  assert.equal(reset.events[0].event, "page_view");

  const afterwards = loadPage("https://dictivo.app/", { storage });
  assert.equal(afterwards.events.length, 1);
  assert.deepEqual(storage.keys(), [], "nothing else was stored");
});

test("a page without the flag stores nothing at all", () => {
  const storage = memoryStorage();
  const page = loadPage("https://dictivo.app/?utm_source=newsletter", { storage });
  page.context.sendDownloadClick(downloadLink());
  assert.equal(page.events.length, 2);
  assert.deepEqual(storage.keys(), []);
});

test("/?self=1 keeps campaign carry-over and the checkout channel working", () => {
  const storage = memoryStorage();
  const page = loadPage("https://dictivo.app/ja/?utm_source=newsletter&utm_medium=email&self=1", { storage });
  assert.equal(storage.getItem("dictivo-self"), "1");
  assert.equal(page.events.length, 0);
  const guide = click(page, pageLink("https://dictivo.app/ja/guides/first-local-dictation/"));
  assert.equal(guide.searchParams.get("utm_source"), "newsletter");
  assert.equal(guide.searchParams.get("utm_medium"), "email");
  assert.equal(guide.searchParams.has("self"), false, "the flag parameter is not carried to other pages");
  assert.equal(guide.searchParams.has("visitId"), false);
  const checkout = click(page, pageLink("https://dictivo.app/checkout/local"));
  assert.equal(checkout.searchParams.get("checkout[custom][channel]"), "newsletter");
});

test("other self values leave the flag as it was", () => {
  for (const value of ["", "true", "01", "2", "yes", "1%20"]) {
    const empty = memoryStorage();
    const counted = loadPage(`https://dictivo.app/?self=${value}`, { storage: empty });
    assert.equal(empty.getItem("dictivo-self"), null, `self=${value}: the flag was set`);
    assert.equal(counted.events.length, 1, `self=${value}: the page view was not sent`);
    const flagged = memoryStorage({ "dictivo-self": "1" });
    const excluded = loadPage(`https://dictivo.app/?self=${value}`, { storage: flagged });
    assert.equal(flagged.getItem("dictivo-self"), "1", `self=${value}: the flag was removed`);
    assert.equal(excluded.events.length, 0, `self=${value}: a beacon was sent`);
  }
});

test("storage that is missing or throws counts as not excluded, and the rest of the script still runs", () => {
  const cases = [
    ["no storage object", {}],
    ["storage access throws", { storageBlocked: true }],
    ["setItem throws", { storage: { getItem: () => null, setItem: () => { throw new Error("QuotaExceededError"); }, removeItem: () => {} } }],
    ["getItem throws", { storage: { getItem: () => { throw new Error("SecurityError"); }, setItem: () => {}, removeItem: () => {} } }],
  ];
  for (const [name, options] of cases) {
    const page = loadPage("https://dictivo.app/?self=1", options);
    assert.equal(page.events.length, 1, `${name}: the page view was not sent`);
    const link = downloadLink();
    page.context.sendDownloadClick(link);
    assert.equal(new URL(link.href).searchParams.get("visitId"), page.events[0].visitId, `${name}: the download link was not decorated`);
    assert.equal(typeof page.handlers.click, "function", `${name}: the click handler was not registered, so an exception escaped`);
  }
});

// The whole script, the way a browser runs it on a page: unlike the analytics slice above, this
// reaches the code after it, such as the lookup of the element an address's anchor names. Like a
// browser, querySelector throws for an id selector that is not a CSS identifier; an identifier
// cannot start with a digit (or a hyphen and a digit), so "#0.3.48" is not a valid selector.
const ID_SELECTOR = /^#(?:-?[A-Za-z_]|--)[\w-]*$/;

function loadWholePage(url, { sections = [], links = [] } = {}) {
  const events = [];
  const location = new URL(url);
  const byId = new Map(sections.map((section) => [section.id, section]));
  class IntersectionObserver { observe() {} unobserve() {} }
  const context = vm.createContext({
    URL, URLSearchParams, IntersectionObserver, location,
    crypto: { randomUUID, getRandomValues: webcrypto.getRandomValues.bind(webcrypto) },
    window: { location, IntersectionObserver },
    document: {
      referrer: "", documentElement: { lang: "en" },
      addEventListener: () => {},
      getElementById: (id) => byId.get(id) ?? null,
      querySelector: (selector) => {
        if (!selector.startsWith("#")) return null;
        if (!ID_SELECTOR.test(selector)) throw new DOMException(`'${selector}' is not a valid selector.`, "SyntaxError");
        return byId.get(selector.slice(1)) ?? null;
      },
      querySelectorAll: (selector) => ({ "a.download-link": links, ".reveal": sections })[selector] ?? [],
    },
    navigator: { sendBeacon: (endpoint, body) => { events.push({ endpoint, ...JSON.parse(body) }); return true; } },
    fetch: () => Promise.resolve({ ok: true }),
  });
  vm.runInContext(script, context);
  return { events };
}

function revealSection(id) {
  const classes = new Set(["reveal"]);
  return { id, classes, classList: { contains: (name) => classes.has(name), add: (name) => classes.add(name) } };
}

test("an anchor that starts with a digit, like the changelog's #0.3.48, lets the whole script run, and a download click is still decorated and sent", () => {
  // An ordinary id keeps working, and a malformed escape names no section.
  for (const [hash, named] of [["#0.3.48", "0.3.48"], ["#release-0-3-48", "release-0-3-48"], ["#%E4", null]]) {
    const sections = [revealSection("0.3.48"), revealSection("release-0-3-48")];
    const listeners = {};
    const link = Object.assign(downloadLink(), { addEventListener: (name, listener) => { listeners[name] = listener; } });
    let page;
    assert.doesNotThrow(() => { page = loadWholePage(`https://dictivo.app/changelog/${hash}`, { sections, links: [link] }); }, `${hash}: site.js threw while loading`);
    for (const section of sections) {
      assert.equal(section.classes.has("is-in"), section.id === named, `${hash}: section ${section.id} ${section.id === named ? "is not" : "is"} shown at once`);
    }
    assert.equal(typeof listeners.click, "function", `${hash}: the download link has no click listener`);
    listeners.click();
    const href = new URL(link.href);
    assert.equal(href.searchParams.get("visitId"), page.events[0].visitId, `${hash}: the download link was not decorated`);
    assert.equal(href.searchParams.get("instrumentationVersion"), "web-linked-v1", `${hash}: the download link was not decorated`);
    assert.deepEqual(page.events.map((event) => event.event), ["page_view", "download_cta_clicked"], `${hash}: the page view and the download click`);
  }
});
