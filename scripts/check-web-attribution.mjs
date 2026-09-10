import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { randomUUID, webcrypto } from "node:crypto";
import vm from "node:vm";

const script = readFileSync(new URL("../assets/site.js", import.meta.url), "utf8");
const start = script.indexOf("function normalizeDownloadPlatform(");
const end = script.indexOf("function fillTemplate(", start);
assert(start >= 0 && end > start, "Analytics test boundary must exist");
const analytics = script.slice(start, end);

function loadPage(url, referrer = "") {
  const events = [];
  const handlers = {};
  const location = new URL(url);
  const context = vm.createContext({
    URL, URLSearchParams,
    crypto: { randomUUID, getRandomValues: webcrypto.getRandomValues.bind(webcrypto) },
    window: { location },
    document: {
      referrer, documentElement: { lang: "en" },
      querySelectorAll: () => [],
      addEventListener: (name, handler) => { handlers[name] = handler; },
    },
    navigator: { sendBeacon: (endpoint, body) => { events.push({ endpoint, ...JSON.parse(body) }); return true; } },
    fetch: () => { throw new Error("Unexpected fallback request"); },
  });
  vm.runInContext(analytics, context);
  return { context, events, handlers, location };
}

function link(href, download = false) {
  return {
    href, dataset: download ? { platform: "macos", artifact: "dmg", downloadContent: "hero_top_mac" } : {},
    hasAttribute: () => false,
    classList: { contains: (name) => download && name === "download-link" },
  };
}

function navigate(page, anchor, overrides = {}) {
  page.handlers.click({ isTrusted: true, defaultPrevented: false, target: { closest: () => anchor }, ...overrides });
  return new URL(anchor.href, page.location);
}

const landing = loadPage("https://dictivo.app/compare/wispr-flow-alternative/?utm_source=newsletter&utm_medium=email&utm_campaign=local-trial&utm_content=feature&private_note=omit");
assert.equal(landing.events[0].source, "newsletter");
const next = navigate(landing, link("https://dictivo.app/#pricing"));
assert.equal(next.searchParams.get("utm_source"), "newsletter");
assert.equal(next.searchParams.get("utm_content"), "feature");
assert.equal(next.hash, "#pricing");
assert(!next.searchParams.has("private_note"));
assert(!next.searchParams.has("visitId"));

const home = loadPage(next.href, landing.location.href);
assert.equal(home.events[0].source, "newsletter");
assert.notEqual(home.events[0].visitId, landing.events[0].visitId, "Each page must have a fresh visit id");
const download = link("https://api.dictivo.app/download/mac?version=0.3.46&utm_source=site&utm_medium=download_cta&utm_campaign=release-0.3.46&utm_content=hero_top_mac", true);
home.context.sendDownloadClick(download);
const clicked = home.events.at(-1);
const redirect = new URL(download.href);
assert.equal(clicked.event, "download_cta_clicked");
assert.equal(clicked.source, "newsletter");
assert.equal(clicked.medium, "email");
assert.equal(clicked.campaign, "local-trial");
assert.equal(clicked.content, "hero_top_mac", "CTA position is separate from campaign source");
assert.equal(clicked.releaseVersion, "0.3.46");
assert.equal(clicked.visitId, home.events[0].visitId);
assert.equal(clicked.referrer, "https://dictivo.app/");
for (const field of ["source", "medium", "campaign", "content"]) assert.equal(redirect.searchParams.get(`utm_${field}`), clicked[field]);
assert.equal(redirect.searchParams.get("visitId"), clicked.visitId);
assert.equal(redirect.searchParams.get("instrumentationVersion"), "web-linked-v1");

const organic = loadPage("https://dictivo.app/ja/compare/superwhisper-alternative/", "https://www.google.com/search?q=private+query");
const organicNext = navigate(organic, link("https://dictivo.app/ja/"));
assert.equal(organicNext.searchParams.get("utm_source"), "www.google.com");
assert(!organicNext.href.includes("private"));
assert.equal(loadPage(organicNext.href, organic.location.href).events[0].source, "www.google.com");

for (const href of ["https://example.com/", "https://dictivo.app/checkout/local", "https://dictivo.app/download/mac", "https://dictivo.app/downloads.json", "mailto:support@dictivo.app", "https://dictivo.app/?utm_source=other#pricing"]) {
  const anchor = link(href);
  navigate(home, anchor);
  assert.equal(anchor.href, href, `Leave destination unchanged: ${href}`);
}
const prevented = link("https://dictivo.app/about/");
navigate(home, prevented, { defaultPrevented: true });
assert.equal(prevented.href, "https://dictivo.app/about/");
const synthetic = link("https://dictivo.app/about/");
navigate(home, synthetic, { isTrusted: false });
assert.equal(synthetic.href, "https://dictivo.app/about/");

const direct = loadPage("https://dictivo.app/");
assert.equal(loadPage("https://dictivo.app/", "https://www.dictivo.app/about/").events[0].source, "direct", "The www alias is not an acquisition source");
assert.equal(navigate(direct, link("https://dictivo.app/about/")).search, "");
const directDownload = link("https://api.dictivo.app/download/mac?version=0.3.46&utm_campaign=release-0.3.46", true);
direct.context.sendDownloadClick(directDownload);
assert.equal(direct.events.at(-1).source, "direct");
assert.equal(direct.events.at(-1).campaign, undefined);

for (const host of ["127.0.0.1:4173", "preview.dictivo-app.pages.dev"]) assert.equal(loadPage(`https://${host}/`).events.length, 0, "Preview views must not reach production analytics");
assert(!/\b(localStorage|sessionStorage)\s*[.\[]|document\.cookie\s*=/.test(analytics), "No persistent browser tracking");
console.log("Web attribution checks passed: campaign handoff, fresh page ids, CTA/redirect parity, referrer privacy, navigation exclusions, and preview isolation.");
