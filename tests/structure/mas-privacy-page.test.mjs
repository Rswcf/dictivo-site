import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { LOCALES } from "../../data/site-content.mjs";
import { MAS_PRIVACY_LASTMOD } from "../../data/mas-privacy-page.mjs";
import { buildLocaleRoutes } from "../../lib/locale-routing/build-routes.mjs";
import { COOKIE_NAME, decideLocaleRoute } from "../../lib/locale-routing/decide.mjs";
import { onRequest } from "../../functions/_middleware.js";

// /privacy/mac-app-store/ is the privacy policy that the Mac App Store edition links to. App Review
// opens it, and Guideline 3.1.1(a) forbids links that lead to other ways to buy, so the page is
// bare: no shared header, nav or footer, no script, and no link to another dictivo.app page. Until
// the App Store edition ships it is also hidden: noindex, outside the sitemap and llms.txt, and
// linked from no other page. These tests read only dist/.
const root = new URL("../../", import.meta.url).pathname;
const dist = join(root, "dist");
const PATH = "/privacy/mac-app-store/";
const FILE = join(dist, "privacy/mac-app-store/index.html");
const URL_SELF = `https://dictivo.app${PATH}`;
const ALLOWED_LINKS = new Set(["mailto:support@dictivo.app", "https://www.apple.com/legal/privacy/"]);
const CHROME = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

const files = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? files(path) : [path];
});
const page = readFileSync(FILE, "utf8");
const head = page.slice(page.indexOf("<head>"), page.indexOf("</head>"));
const body = page.slice(page.indexOf("<body"), page.indexOf("</body>"));

test("the page is written once, as privacy/mac-app-store/index.html", () => {
  // AGENTS.md: pages live at slug/index.html only. The .html 301s exist only for the nine pages
  // that were once written twice (html-twins.test.mjs); a new page has no old address.
  assert.ok(!existsSync(join(dist, "privacy/mac-app-store.html")), "privacy/mac-app-store.html is written");
  assert.match(page, /^<!doctype html>\n<html lang="en">/);
});

test("the page runs no script and loads nothing that needs one", () => {
  assert.doesNotMatch(page, /<script/i, "a <script> element");
  assert.doesNotMatch(page, /\son[a-z]+\s*=/i, "an inline event handler");
  assert.doesNotMatch(page, /javascript:/i);
  assert.doesNotMatch(page, /site\.js/);
  assert.doesNotMatch(page, /application\/ld\+json/);
  // The CSP allows style-src 'self' only, so no inline style either.
  assert.doesNotMatch(page, /<style|\sstyle="/i);
  // Classes that site.js reveals or wires up.
  assert.doesNotMatch(page, /class="[^"]*\b(reveal|nav-toggle|language-menu|download-link)\b/);
});

test("the page has its own minimal head and none of the shared header, nav or footer", () => {
  for (const pattern of [/<header/i, /<nav/i, /<footer/i, /site-header/, /site-footer/, /skip-link/, /language-menu/, /hreflang/]) {
    assert.doesNotMatch(page, pattern, String(pattern));
  }
  assert.match(head, /<meta charset="utf-8" \/>/);
  assert.match(head, /<meta name="viewport" content="width=device-width, initial-scale=1" \/>/);
  assert.match(head, /<meta name="robots" content="noindex" \/>/);
  assert.equal(head.match(/<title>([^<]*)<\/title>/)?.[1], "Privacy Policy for Dictivo from the Mac App Store");
  assert.ok(head.includes('<meta name="description" content="'), "meta description");
  assert.equal([...head.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map((match) => match[1]).join(), URL_SELF);
  // Only the canonical, the favicon and the stylesheet. check-asset-version.mjs needs ?v= on site.css.
  const links = [...head.matchAll(/<link\b[^>]*>/g)].map(([tag]) => tag);
  assert.deepEqual(links, [
    `<link rel="canonical" href="${URL_SELF}" />`,
    '<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />',
    '<link rel="stylesheet" href="/assets/site.css?v=local" />',
  ]);
  assert.equal((page.match(/<h1[\s>]/g) || []).length, 1, "one h1");
});

test("the body links only to the support address and Apple's privacy policy", () => {
  const hrefs = [...body.matchAll(/\shref="([^"]*)"/g)].map((match) => match[1]);
  assert.ok(hrefs.length >= 2, `${hrefs.length} links`);
  for (const href of hrefs) assert.ok(ALLOWED_LINKS.has(href), `body link to ${href}`);
  for (const href of ALLOWED_LINKS) assert.ok(hrefs.includes(href), `no link to ${href}`);
  // Nothing in the body loads or submits anything.
  assert.doesNotMatch(body, /\s(src|srcset|action|formaction|data)=/i);
  assert.doesNotMatch(body, /<(img|iframe|form|object|embed|video|audio|picture|source)\b/i);
  // The host names are text, not links.
  assert.ok(body.includes("<code>downloads.dictivo.app</code>"));
  assert.ok(body.includes("<code>huggingface.co</code>"));
});

test("every support address sits inside email_off, so edge email obfuscation adds no script", () => {
  const outside = body.replace(/<!--email_off-->[\s\S]*?<!--\/email_off-->/g, "");
  assert.ok(!outside.includes("support@dictivo.app"), "an address outside <!--email_off-->");
  assert.ok(!outside.includes("mailto:"), "a mailto link outside <!--email_off-->");
  assert.ok((body.match(/<!--email_off--><a href="mailto:support@dictivo.app">support@dictivo.app<\/a><!--\/email_off-->/g) || []).length >= 1);
});

test("the Last updated stamp reads MAS_PRIVACY_LASTMOD in the legal pages' format", () => {
  const legal = readFileSync(join(dist, "privacy/index.html"), "utf8").match(/<p class="doc-meta">Last updated <time datetime="[^"]+">[A-Z][a-z]+ \d{1,2}, \d{4}<\/time><\/p>/);
  assert.ok(legal, "the /privacy/ stamp changed format; follow it here");
  const shown = new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${MAS_PRIVACY_LASTMOD}T00:00:00Z`));
  assert.ok(body.includes(`<p class="doc-meta">Last updated <time datetime="${MAS_PRIVACY_LASTMOD}">${shown}</time></p>`), shown);
});

test("the page is hidden: not in the sitemap or any llms.txt, and no other file links to it", () => {
  const sitemap = readFileSync(join(dist, "sitemap.xml"), "utf8");
  assert.ok(!sitemap.includes("mac-app-store"), "sitemap.xml names the page");
  const llms = files(dist).filter((file) => file.endsWith("llms.txt"));
  assert.ok(llms.length >= 11, `${llms.length} llms.txt files`);
  for (const file of llms) assert.ok(!readFileSync(file, "utf8").includes("mac-app-store"), relative(dist, file));
  // Every text file in dist/, _redirects, _headers and _routes.json included.
  const text = files(dist).filter((file) => file !== FILE && /\.(html|txt|xml|json|js|css)$|\/_redirects$|\/_headers$/.test(file));
  assert.ok(text.length > 200, `only ${text.length} text files`);
  for (const name of ["_redirects", "_headers", "_routes.json", "sitemap.xml", "privacy/index.html"]) {
    assert.ok(text.includes(join(dist, name)), `${name} is not searched`);
  }
  const naming = text.filter((file) => readFileSync(file, "utf8").includes("/privacy/mac-app-store"));
  assert.deepEqual(naming.map((file) => relative(dist, file)), []);
});

// The Function (functions/_middleware.js) takes every /privacy/* request, because the two /privacy/
// sub-pages are translated. It redirects or prompts only on pages in the route map, and the map holds only pages
// with hreflang alternates (lib/locale-routing/build-routes.mjs). This page has none, so
// decideLocaleRoute() returns pass("unmapped") for every visitor (lib/locale-routing/decide.mjs).
const routes = buildLocaleRoutes({ distDir: dist, locales: LOCALES });
const COUNTRIES = (() => {
  const names = new Intl.DisplayNames(["en"], { type: "region" });
  const codes = [];
  for (let a = 65; a <= 90; a++) for (let b = 65; b <= 90; b++) {
    const code = String.fromCharCode(a, b);
    if (names.of(code) !== code) codes.push(code);
  }
  return [...codes, "XX", "T1", ""];
})();

function decide(path, { country, acceptLanguage = "", cookie = "", site = "none" }) {
  return decideLocaleRoute({
    method: "GET",
    url: new URL(path, "https://dictivo.app"),
    headers: new Headers({ "user-agent": CHROME, "sec-fetch-dest": "document", "sec-fetch-site": site, "accept-language": acceptLanguage, cookie }),
    country,
    region: "",
    routes,
  });
}

test("the language Function never redirects or prompts on the page, for any country or saved language", () => {
  assert.equal(routes.pages[PATH], undefined, "the page is in the route map");
  assert.deepEqual(JSON.parse(readFileSync(join(root, "lib/locale-routing/generated/routes.json"), "utf8")).pages[PATH], undefined);
  let cases = 0;
  for (const path of [PATH, PATH.slice(0, -1), `${PATH}?utm_source=app`]) {
    for (const country of COUNTRIES) for (const acceptLanguage of ["", "de-DE,de;q=0.9", "ja", "fr-CH,fr;q=0.9", "zh-TW"]) {
      for (const site of ["none", "cross-site", "same-origin"]) {
        assert.deepEqual(decide(path, { country, acceptLanguage, site }), { action: "pass", reason: "unmapped" }, `${path} ${country} ${acceptLanguage} ${site}`);
        cases++;
      }
    }
    for (const country of ["DE", "JP", "FR", "US"]) for (const locale of routes.locales) {
      assert.deepEqual(decide(path, { country, cookie: `${COOKIE_NAME}=${locale}` }), { action: "pass", reason: "unmapped" }, `${path} ${country} cookie ${locale}`);
      cases++;
    }
  }
  assert.ok(cases > 10_000, `only ${cases} cases`);
  // A ?lang= choice is saved and leads back to this same page, never to a language path.
  for (const locale of routes.locales) {
    const decision = decide(`${PATH}?lang=${locale}`, { country: "DE" });
    assert.equal(decision.action, "redirect", locale);
    assert.equal(decision.location, PATH, locale);
  }
});

function context(path, { country, cookie = "" }) {
  const headers = { "user-agent": CHROME, "sec-fetch-dest": "document", "sec-fetch-site": "none", accept: "text/html" };
  if (cookie) headers.cookie = cookie;
  const request = new Request(new URL(path, "https://dictivo.app"), { headers });
  Object.defineProperty(request, "cf", { value: { country }, configurable: true });
  return {
    request,
    next: async () => new Response(page, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } }),
  };
}

test("through the Function, visitors from DE, JP, FR and elsewhere get the built page unchanged", async () => {
  const visits = [
    ...["DE", "JP", "FR", "IT", "ES", "NL", "PT", "BR", "CN", "TW", "KR", "AT", "CH", "US"].map((country) => ({ country })),
    { country: "DE", cookie: `${COOKIE_NAME}=de` },
    { country: "FR", cookie: `${COOKIE_NAME}=ja` },
  ];
  for (const visit of visits) {
    const label = JSON.stringify(visit);
    const response = await onRequest(context(PATH, visit));
    assert.equal(response.status, 200, label);
    assert.equal(response.headers.get("location"), null, label);
    assert.equal(response.headers.get("x-dictivo-locale-route"), "unmapped", label);
    // The EU prompt would inject an <aside> with links to a translation; the body must be the file as built.
    assert.equal(await response.text(), page, label);
  }
});
