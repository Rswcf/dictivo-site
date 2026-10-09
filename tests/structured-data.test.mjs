import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { LOCALES } from "../data/site-content.mjs";
import { LOCAL_OFFER } from "../data/local-offer.mjs";
import { COMPARE_PAGES } from "../data/compare-pages.mjs";
import { firstPublished } from "../data/first-published.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
const ORG_ID = "https://dictivo.app/#org";
const SAME_AS = ["https://www.producthunt.com/products/dictivo", "https://trustmrr.com/startup/dictivo"];
const HOME_LABELS = { en: "Home", de: "Startseite", fr: "Accueil", es: "Inicio", it: "Home", nl: "Home", pt: "Início", zh: "首页", "zh-hant": "首頁", ja: "ホーム", ko: "홈" };

const files = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? files(path) : [path];
});
const htmlFiles = () => files(dist).filter((path) => path.endsWith(".html"));
const nodes = (file) => [...readFileSync(file, "utf8").matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .flatMap(([, json]) => [JSON.parse(json)].flat());
const walk = (value, visit, key = "") => {
  if (Array.isArray(value)) value.forEach((item) => walk(item, visit, key));
  else if (value && typeof value === "object") {
    visit(value, key);
    Object.entries(value).forEach(([child, item]) => walk(item, visit, child));
  }
};
const prefix = (code) => (code === "en" ? "" : `${code}/`);
const page = (path) => `${dist}${path}`;

test("every page names one Organization and points publisher and author at it", () => {
  let pagesWithOrg = 0;
  for (const file of htmlFiles()) {
    const organizations = [];
    const references = [];
    for (const node of nodes(file)) {
      walk(node, (value, key) => {
        if (value["@type"] === "Organization") organizations.push(value);
        if (key === "publisher" || key === "author") references.push(value);
      });
    }
    if (!organizations.length && !references.length) continue;
    pagesWithOrg += 1;
    assert.equal(organizations.length, 1, `${file}: ${organizations.length} Organization nodes`);
    const [org] = organizations;
    assert.equal(org["@id"], ORG_ID, file);
    assert.equal(org.url, "https://dictivo.app/", file);
    assert.equal(org.email, "support@dictivo.app", file);
    assert.ok(org.logo, file);
    assert.deepEqual(org.sameAs, SAME_AS, file);
    for (const reference of references) assert.deepEqual(reference, { "@id": ORG_ID }, `${file}: inline publisher/author`);
  }
  assert.ok(pagesWithOrg >= 11 + 66 + 11 + 5, `only ${pagesWithOrg} pages carry the Organization`);
});

test("sameAs appears only on the Organization", () => {
  for (const file of htmlFiles()) {
    for (const node of nodes(file)) {
      walk(node, (value) => {
        if (value.sameAs) assert.equal(value["@type"], "Organization", `${file}: sameAs on ${value["@type"]}`);
      });
    }
  }
});

const appNode = (file) => nodes(file).find((node) => node["@type"] === "SoftwareApplication");
const localOffers = (app) => [app.offers].flat().filter((offer) => offer.name === "Dictivo Local");

test("comparison pages describe the software itself and list both Local prices", () => {
  for (const locale of LOCALES) {
    const home = appNode(page(`${prefix(locale.code)}index.html`));
    assert.deepEqual(home.publisher, { "@id": ORG_ID }, `${locale.code}: homepage app publisher`);
    for (const compare of COMPARE_PAGES) {
      const file = page(`${prefix(locale.code)}compare/${compare.slug}/index.html`);
      const app = appNode(file);
      assert.equal(app.description, home.description, `${file}: description is not the product description`);
      assert.equal(app.url, home.url, file);
      assert.deepEqual(app.publisher, { "@id": ORG_ID }, file);
    }
  }
});

test("the introductory and the regular Local offer both appear, dated from LOCAL_OFFER", () => {
  const targets = [
    ...LOCALES.flatMap((locale) => [
      `${prefix(locale.code)}index.html`,
      ...COMPARE_PAGES.map((compare) => `${prefix(locale.code)}compare/${compare.slug}/index.html`),
    ]),
    "pricing/index.html",
  ];
  for (const path of targets) {
    const offers = localOffers(appNode(page(path)));
    assert.equal(offers.length, 2, `${path}: ${offers.length} Local offers`);
    const intro = offers.find((offer) => offer.priceValidUntil);
    const regular = offers.find((offer) => offer.priceValidFrom);
    assert.equal(intro?.price, String(LOCAL_OFFER.price), path);
    assert.equal(intro.priceValidUntil, LOCAL_OFFER.introPriceUntil, path);
    assert.equal(regular?.price, String(LOCAL_OFFER.regularPrice), path);
    assert.equal(regular.priceValidFrom, LOCAL_OFFER.regularPriceFrom, path);
    assert.equal(regular.priceValidUntil, undefined, path);
  }
});

test("breadcrumbs start at the language's homepage with its own label", () => {
  let crumbs = 0;
  for (const file of htmlFiles()) {
    const code = LOCALES.find((locale) => locale.code !== "en" && file.startsWith(`${dist}${locale.code}/`))?.code || "en";
    for (const node of nodes(file)) {
      if (node["@type"] !== "BreadcrumbList") continue;
      const [first] = node.itemListElement;
      crumbs += 1;
      assert.equal(first.item, `https://dictivo.app/${prefix(code)}`, file);
      assert.equal(first.name, HOME_LABELS[code], file);
    }
  }
  assert.ok(crumbs > 100, `only ${crumbs} breadcrumbs`);
});

const publishedRoutes = () => [
  ...LOCALES.map((locale) => [`${prefix(locale.code)}guides/offline-dictation-on-mac/index.html`, "guides/offline-dictation-on-mac", locale.code]),
  ["guides/best-speech-to-text-apps-for-mac/index.html", "guides/best-speech-to-text-apps-for-mac", "en"],
  ["guides/mac-dictation-benchmark-method/index.html", "guides/mac-dictation-benchmark-method", "en"],
  ["guides/offline-dictation-on-windows/index.html", "guides/offline-dictation-on-windows", "en"],
  ["guides/first-local-dictation/index.html", "guides/first-local-dictation", "en"],
  ["ja/guides/first-local-dictation/index.html", "guides/first-local-dictation", "ja"],
  ["guides/mac-dictation-not-working/index.html", "guides/mac-dictation-not-working", "en"],
  ["guides/mac-dictation-shortcut/index.html", "guides/mac-dictation-shortcut", "en"],
  ["ja/guides/mac-dictation-not-working/index.html", "guides/mac-dictation-not-working", "ja"],
  ...LOCALES.flatMap((locale) => [
    ...COMPARE_PAGES.map((compare) => [`${prefix(locale.code)}compare/${compare.slug}/index.html`, `compare/${compare.slug}`, locale.code]),
    ...["privacy/where-dictation-audio-goes", "privacy/local-dictation-network-test"].map((slug) => [`${prefix(locale.code)}${slug}/index.html`, slug, locale.code]),
  ]),
];

test("guides, comparisons and privacy answers carry datePublished from their first commit", () => {
  const routes = publishedRoutes();
  assert.ok(routes.length >= 11 + 5 + 66 + 22, `only ${routes.length} routes`);
  for (const [path, route, code] of routes) {
    const dated = nodes(page(path)).filter((node) => node.datePublished);
    assert.equal(dated.length, 1, `${path}: ${dated.length} nodes with datePublished`);
    assert.equal(dated[0].datePublished, firstPublished(route, code), path);
    assert.ok(dated[0].dateModified >= dated[0].datePublished, `${path}: modified ${dated[0].dateModified} before published`);
  }
  assert.equal(firstPublished("compare/dragon-alternative", "de"), "2026-07-12");
  assert.equal(firstPublished("compare/wispr-flow-alternative", "zh-hant"), "2026-09-14");
  assert.throws(() => firstPublished("guides/unknown"));
  // The troubleshooting guide shipped in Japanese first; each language keeps its own date.
  assert.equal(firstPublished("guides/mac-dictation-not-working", "ja"), "2026-09-26");
  assert.equal(firstPublished("guides/mac-dictation-not-working", "en"), "2026-10-09");
  assert.throws(() => firstPublished("guides/mac-dictation-not-working", "de"), /mac-dictation-not-working \(de\)/);
});
