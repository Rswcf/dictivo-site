import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { firstPublished } from "../../data/first-published.mjs";
import { PRICING_LASTMOD } from "../../data/local-offer.mjs";
import { DOCS_PAGES, DOCS_INDEX_COPY, DOCS_INDEX_LASTMOD, docsEntries, readyDocsEntries } from "../../data/docs-index.mjs";
import { DOCS_CHECKED, DOCS_CHECKED_VERSION, DOCS_SHARED, docsPath, formatDocsDate } from "../../data/docs-shared.mjs";

// The docs section (Batch B2): /docs/ and one English reference page per registry entry. Every
// shared surface (pages, sitemap, llms.txt, footer) follows data/docs-index.mjs, and an entry
// reaches dist/ only when its data file says ready: true. Page wording has its own test in
// tests/wording/docs-<slug>.test.mjs.
const dist = new URL("../../dist/", import.meta.url).pathname;
const read = (path) => readFileSync(`${dist}${path}`, "utf8");
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const windows = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const entries = docsEntries({ windows });
const ready = readyDocsEntries({ windows });
const notReady = entries.filter((entry) => !entry.ready);
const BASE = "https://dictivo.app";
const urlOf = (slug) => `${BASE}${docsPath(slug)}`;
const fileOf = (slug) => `${docsPath(slug).slice(1)}index.html`;

const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, body]) => [JSON.parse(body)].flat());
const alternates = (html) => [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]);
const main = (html) => html.split("<main")[1].split("</main>")[0];
const footer = (html) => html.split("<footer")[1].split("</footer>")[0];
const decode = (value) => value.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
const text = (html) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
const words = (sentence) => sentence.trim().split(/\s+/).length;
const latestDate = (...dates) => dates.filter(Boolean).sort().at(-1);
const sectionBody = (html, id) => html.slice(html.indexOf(`id="${id}"`)).split("</section>")[0];
const hrefs = (html) => [...html.matchAll(/<a [^>]*href="([^"]+)"/g)].map(([, href]) => decode(href));

// "/x/#id" or "https://dictivo.app/x/" -> the dist file that serves it; null for other hosts.
function builtFile(href) {
  if (!href.startsWith("/") && !href.startsWith(`${BASE}/`)) return null;
  const path = href.replace(BASE, "").split("#")[0].split("?")[0];
  return `${dist}${path.slice(1)}${path.endsWith("/") ? "index.html" : ""}`;
}

// A page task may link a sibling whose own task has not landed yet. Task 9 removes this skip once
// every entry is ready.
const pendingSibling = (href) => notReady.some((entry) => href.replace(BASE, "").startsWith(docsPath(entry.slug)));

const ORDER = [
  "system-requirements",
  "install-and-uninstall",
  "macos-permissions",
  "models-and-languages",
  "offline",
  "connections",
  "license-and-devices",
  "updates-and-renewal",
];

test("the registry lists eight pages in the order a new user needs them, each with final metadata", () => {
  assert.equal(DOCS_PAGES.length, 8);
  assert.deepEqual(entries.map((entry) => entry.slug), ORDER);
  assert.equal(new Set(entries.map((entry) => entry.slug)).size, 8);
  for (const entry of entries) {
    const title = [...entry.metaTitle].length;
    const description = [...entry.metaDescription].length;
    assert.ok(title >= 1 && title <= 60, `${entry.slug}: title is ${title} characters`);
    assert.ok(description >= 120 && description <= 160, `${entry.slug}: description is ${description} characters`);
    for (const value of [entry.metaTitle, entry.metaDescription]) assert.doesNotMatch(value, /\$|\{\{/, entry.slug);
    assert.equal(entry.route, `docs/${entry.slug}`);
    assert.match(entry.idPrefix, /^docs-/, entry.slug);
    assert.match(entry.mainId, /^docs-/, entry.slug);
    assert.match(entry.llmsQuestion, /\?$/, entry.slug);
    assert.match(entry.summary, /^[^.!?]+\.$/, `${entry.slug}: summary is one sentence`);
    assert.ok([...entry.navLabel].length <= 24, `${entry.slug}: navLabel`);
    assert.equal(typeof entry.ready, "boolean", entry.slug);
    assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(entry.lastmod), entry.slug);
    assert.ok(firstPublished(entry.route, "en"), entry.slug);
  }
  assert.ok(ready.length >= 1, "no docs page is ready");
});

test("a page that is not ready is not built, listed or linked", () => {
  const sitemap = read("sitemap.xml");
  const llms = read("llms.txt");
  const index = read("docs/index.html");
  for (const entry of notReady) {
    assert.ok(!existsSync(`${dist}${fileOf(entry.slug)}`), `${entry.slug} is built`);
    assert.ok(!sitemap.includes(urlOf(entry.slug)), `${entry.slug} is in the sitemap`);
    assert.ok(!llms.includes(urlOf(entry.slug)), `${entry.slug} is in llms.txt`);
    assert.ok(!index.includes(`href="${docsPath(entry.slug)}"`), `${entry.slug} is linked from /docs/`);
  }
});

test("each ready docs page is English only, with one h1, its own canonical and an article og:type", () => {
  for (const entry of ready) {
    const html = read(fileOf(entry.slug));
    const url = urlOf(entry.slug);
    assert.match(html, /<html lang="en">/, entry.slug);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, entry.slug);
    assert.ok(html.includes(`<h1>${entry.title.replace(/&/g, "&amp;").replace(/'/g, "&#39;")}</h1>`), `${entry.slug}: h1`);
    assert.equal(decode(html.match(/<title>([^<]*)<\/title>/)[1]), entry.metaTitle, entry.slug);
    assert.ok(html.includes(`<link rel="canonical" href="${url}" />`), entry.slug);
    assert.deepEqual(alternates(html), [["en", url], ["x-default", url]], entry.slug);
    assert.ok(html.includes('<meta property="og:type" content="article" />'), entry.slug);
  }
});

test("each ready docs page renders in the fixed order, with the method line and the docs nav last", () => {
  for (const entry of ready) {
    const body = main(read(fileOf(entry.slug)));
    const p = entry.idPrefix;
    const sections = entry.sections.length;
    const markers = [
      "<h1>",
      'class="doc-lede"',
      `class="doc-meta">Last updated <time datetime="${entry.lastmod}">`,
      'class="doc-environment"',
      `id="${p}-answer"`,
      ...(entry.quickReference ? [`id="${p}-quick-reference"`] : []),
      "<nav",
      ...Array.from({ length: sections + 1 }, (_, index) => `id="${p}-section-${index + 1}"`),
      ...(entry.showTrial ? ["data-guide-trial"] : []),
      `id="${p}-faq"`,
      `id="${p}-references"`,
    ];
    const positions = markers.map((marker) => body.indexOf(marker));
    markers.forEach((marker, index) => assert.ok(positions[index] >= 0, `${entry.slug}: missing ${marker}`));
    assert.deepEqual([...positions].sort((a, b) => a - b), positions, `${entry.slug}: order`);
    assert.ok(!body.includes(`id="${p}-section-${sections + 2}"`), `${entry.slug}: the docs nav is the last section`);

    const environment = text(body.match(/<p class="doc-environment">([\s\S]*?)<\/p>/)[1]);
    assert.ok(environment.startsWith(`${DOCS_SHARED.environmentLabel}: `), entry.slug);
    for (const part of [`Dictivo ${DOCS_CHECKED_VERSION}`, "Dictivo team", formatDocsDate(DOCS_CHECKED)]) {
      assert.ok(environment.includes(part), `${entry.slug}: method line misses ${part}`);
    }

    const nav = sectionBody(body, `${p}-section-${sections + 1}`);
    assert.ok(nav.includes(`>${DOCS_SHARED.navTitle}</h2>`), `${entry.slug}: docs nav title`);
    const navLinks = hrefs(nav);
    assert.deepEqual(
      navLinks,
      [docsPath(), ...ready.filter((other) => other.slug !== entry.slug).map((other) => docsPath(other.slug))],
      `${entry.slug}: docs nav links`,
    );
  }
});

test("each ready docs page has a short answer, a FAQ that matches its schema, and dated sources", () => {
  for (const entry of ready) {
    const html = read(fileOf(entry.slug));
    const answer = text(sectionBody(main(html), `${entry.idPrefix}-answer`).match(/<p>([\s\S]*?)<\/p>/)[1]);
    assert.ok(words(answer) >= 40 && words(answer) <= 80, `${entry.slug}: answer has ${words(answer)} words`);
    assert.ok(answer.includes("Dictivo"), entry.slug);

    assert.ok(entry.faqs.length >= 3 && entry.faqs.length <= 6, `${entry.slug}: ${entry.faqs.length} FAQs`);
    const visible = [...html.matchAll(/<span class="faq-question">([\s\S]*?)<\/span>/g)].map(([, question]) => decode(question));
    const faqPage = jsonLd(html).find((node) => node["@type"] === "FAQPage");
    assert.deepEqual(visible, faqPage.mainEntity.map((question) => question.name), `${entry.slug}: FAQ schema`);
    assert.deepEqual(visible, entry.faqs.map(([question]) => question), entry.slug);

    assert.ok(entry.references.length >= 1, entry.slug);
    for (const [label, href] of entry.references) {
      assert.match(href, /^https:\/\//, `${entry.slug}: ${href}`);
      if (!href.startsWith(`${BASE}/`)) assert.match(label, /\(checked \d{4}-\d{2}-\d{2}\)$/, `${entry.slug}: ${label}`);
    }
  }
});

test("each ready docs page carries Organization, TechArticle, FAQPage and a three-crumb breadcrumb", () => {
  for (const entry of ready) {
    const html = read(fileOf(entry.slug));
    const url = urlOf(entry.slug);
    const nodes = jsonLd(html);
    assert.deepEqual(nodes.map((node) => node["@type"]), ["Organization", "TechArticle", "FAQPage", "BreadcrumbList"], entry.slug);
    const article = nodes[1];
    assert.equal(article.headline, entry.metaTitle, entry.slug);
    assert.equal(article.datePublished, firstPublished(entry.route, "en"), entry.slug);
    assert.equal(article.dateModified, entry.lastmod, entry.slug);
    assert.equal(article.image, html.match(/<meta property="og:image" content="([^"]+)"/)[1], entry.slug);
    assert.ok(Array.isArray(article.about) && article.about.length > 0, entry.slug);
    assert.deepEqual(
      nodes[3].itemListElement.map((crumb) => [crumb.position, crumb.name, crumb.item]),
      [
        [1, "Home", `${BASE}/`],
        [2, DOCS_INDEX_COPY.navLabel, `${BASE}/docs/`],
        [3, entry.navLabel, url],
      ],
      entry.slug,
    );
  }
});

test("docs pages keep to the copy rules: no banned words, no typed price, no address but support", () => {
  for (const entry of ready) {
    const html = read(fileOf(entry.slug));
    const body = main(html);
    const visible = text(body);
    assert.doesNotMatch(
      visible,
      /lifetime updates|lifetime licen|forever updates|types directly|types into|inserts text|accura|fastest|most accurate|best overall|winner|#1|launch price|\btested\b/i,
      entry.slug,
    );
    assert.doesNotMatch(visible, /Lemon Squeezy|whisper\.cpp|downloads\.json|GitHub Release|Cloudflare|\bR2\b/i, entry.slug);
    assert.ok(!text(body.replace(/<span class="price">[\s\S]*?<\/span>/g, "")).includes("$"), `${entry.slug}: a typed $`);
    for (const address of visible.match(/[\w.+-]*@[\w-]+(\.[\w-]+)*/g) || []) assert.equal(address, "support@dictivo.app", entry.slug);
    assert.doesNotMatch(html, /FILL_IN|TODO|undefined|\{\{price\./, entry.slug);
  }
});

test("docs pages reach the sitemap and the English llms.txt only", () => {
  const sitemap = read("sitemap.xml");
  const llms = read("llms.txt");
  for (const entry of ready) {
    const url = urlOf(entry.slug);
    const priced = read(fileOf(entry.slug)).includes('<span class="price">');
    const lastmod = latestDate(entry.lastmod, priced && PRICING_LASTMOD);
    assert.match(sitemap, new RegExp(`<loc>${url}</loc>\\s*<lastmod>${lastmod}</lastmod>`), entry.slug);
    assert.ok(llms.includes(`[${entry.navLabel}](${url})`), `${entry.slug}: llms.txt pages`);
    assert.ok(llms.includes(`- ${entry.llmsQuestion} → [${entry.navLabel}](${url})`), `${entry.slug}: llms.txt question`);
  }
  assert.match(sitemap, new RegExp(`<loc>${BASE}/docs/</loc>\\s*<lastmod>${DOCS_INDEX_LASTMOD}</lastmod>`));
  assert.ok(llms.includes(`[${DOCS_INDEX_COPY.navLabel}](${BASE}/docs/)`));
  for (const path of ["de/llms.txt", "ja/llms.txt"]) assert.ok(!read(path).includes("/docs/"), path);
});

test("only the install page carries the trial panel, and no docs page carries the guide intro", () => {
  for (const entry of ready) {
    const html = read(fileOf(entry.slug));
    assert.equal((html.match(/data-guide-trial/g) || []).length, entry.trialSource ? 1 : 0, entry.slug);
    assert.ok(!html.includes("data-guide-intro"), entry.slug);
  }
});

test("every in-site link on a docs page lands on a built page", () => {
  for (const file of ["docs/index.html", ...ready.map((entry) => fileOf(entry.slug))]) {
    for (const href of hrefs(read(file))) {
      const built = builtFile(href);
      if (!built || pendingSibling(href)) continue;
      assert.ok(existsSync(built), `${file}: ${href} has no built page`);
    }
  }
});

test("the docs index lists the ready pages and describes them as a collection", () => {
  const html = read("docs/index.html");
  const body = main(html);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.match(html, /<html lang="en">/);
  assert.ok(html.includes(`<link rel="canonical" href="${BASE}/docs/" />`));
  assert.deepEqual(alternates(html), [["en", `${BASE}/docs/`], ["x-default", `${BASE}/docs/`]]);
  assert.equal(decode(html.match(/<title>([^<]*)<\/title>/)[1]), DOCS_INDEX_COPY.metaTitle);
  assert.ok(body.includes(`<time datetime="${DOCS_INDEX_LASTMOD}">`));
  const environment = text(body.match(/<p class="doc-environment">([\s\S]*?)<\/p>/)[1]);
  assert.ok(environment.includes(`Dictivo ${DOCS_CHECKED_VERSION}`) && environment.includes("Dictivo team"));
  const answer = text(sectionBody(body, "docs-index-answer").match(/<p>([\s\S]*?)<\/p>/)[1]);
  assert.ok(words(answer) >= 40 && words(answer) <= 80, `index answer has ${words(answer)} words`);

  const pages = sectionBody(body, "docs-index-pages");
  for (const entry of ready) {
    assert.ok(pages.includes(`<a href="${docsPath(entry.slug)}">${entry.navLabel}</a>`), `index misses ${entry.slug}`);
  }
  assert.deepEqual(hrefs(pages), ready.map((entry) => docsPath(entry.slug)));
  const related = hrefs(sectionBody(body, "docs-index-related"));
  assert.deepEqual(related, DOCS_INDEX_COPY.relatedLinks.map(([, href]) => href));

  const nodes = jsonLd(html);
  assert.deepEqual(nodes.map((node) => node["@type"]), ["Organization", "CollectionPage", "ItemList", "BreadcrumbList"]);
  const [, collection, itemList, breadcrumb] = nodes;
  assert.equal(collection.url, `${BASE}/docs/`);
  assert.equal(collection.dateModified, DOCS_INDEX_LASTMOD);
  assert.equal(collection.inLanguage, "en");
  assert.equal(collection.isPartOf?.["@type"], "WebSite");
  assert.deepEqual(
    itemList.itemListElement.map((item) => [item.position, item.name, item.url]),
    ready.map((entry, index) => [index + 1, entry.navLabel, urlOf(entry.slug)]),
  );
  assert.deepEqual(
    breadcrumb.itemListElement.map((crumb) => [crumb.position, crumb.name, crumb.item]),
    [
      [1, "Home", `${BASE}/`],
      [2, DOCS_INDEX_COPY.navLabel, `${BASE}/docs/`],
    ],
  );
  assert.doesNotMatch(text(body), /lifetime|\$|\btested\b|Lemon Squeezy/i);
});

test("the English footer links the docs directly after Security; other languages do not", () => {
  for (const path of ["index.html", "pricing/index.html", "guides/offline-dictation-on-windows/index.html", "docs/index.html"]) {
    const links = footer(read(path));
    assert.match(links, /<a href="\/security\/">[^<]*<\/a>\s*<a href="\/docs\/">Docs<\/a>/, path);
    assert.equal((links.match(/href="\/docs\/"/g) || []).length, 1, path);
  }
  for (const path of ["de/index.html", "ja/index.html"]) assert.ok(!footer(read(path)).includes("/docs/"), path);
});
