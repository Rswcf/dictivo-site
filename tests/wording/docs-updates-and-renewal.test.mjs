import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCAL_OFFER } from "../../data/local-offer.mjs";
import { DOCS_CHECKED_VERSION } from "../../data/docs-shared.mjs";
import { DOCS_UPDATES_LASTMOD, docsUpdatesCopy } from "../../data/docs-updates-and-renewal.mjs";

// Docs page U (Batch B2): how updates are found, verified and installed, what the included months
// cover, what changes when they end, and optional renewal. Facts: the desktop app at the tag in
// DOCS_CHECKED_VERSION (updater.rs, lib.rs, tauri.conf.json, displayLanguage.ts, SettingsView.tsx,
// localOffer.ts) and the site's pricing copy. The shared shape is in tests/structure/docs-pages.test.mjs.
const read = (path) => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const windows = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const copy = docsUpdatesCopy({ windows });
const page = () => read("docs/updates-and-renewal/index.html");
const main = (html) => html.split("<main")[1].split("</main>")[0];
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\s+/g, " ");
const section = (html, n) => html.slice(html.indexOf(`id="docs-updates-section-${n}"`)).split("</section>")[0];
const months = LOCAL_OFFER.includedUpdateMonths;

const SECTIONS = [
  "When Dictivo checks for updates",
  "How an update installs",
  `What the ${months} months include`,
  `What happens when the ${months} months end`,
  "Renewal",
  "Updates and your network",
  "All Dictivo docs",
];

test("the updates page is ready, dated by its constant, and answers its question first", () => {
  assert.equal(copy.ready, true);
  assert.equal(copy.lastmod, DOCS_UPDATES_LASTMOD);
  const html = page();
  assert.ok(html.includes("<h1>How Dictivo updates work, and what renewal changes</h1>"));
  assert.ok(html.includes(`<time datetime="${DOCS_UPDATES_LASTMOD}">`));
  assert.deepEqual(
    [...main(html).matchAll(/<h2 id="docs-updates-section-\d+-title">([^<]*)<\/h2>/g)].map(([, title]) => title),
    SECTIONS,
  );
});

test("the updates page states the check timing, the host, the included months and what keeps working", () => {
  const body = text(main(page()));
  for (const phrase of ["24 hours", "five seconds", `${months} months`, "keeps working", "downloads.dictivo.app", "Check for updates", "brew upgrade --cask dictivo"]) {
    assert.ok(body.includes(phrase), `missing: ${phrase}`);
  }
  // The update window is a Local-license rule; installs without a license keep getting updates.
  assert.match(text(section(main(page()), 3)), /without a Local license/);
  assert.match(text(section(main(page()), 3)), /Tiny/);
  assert.doesNotMatch(body, /lifetime/i);
  assert.doesNotMatch(body, /subscription/i);
});

test("the renewal price is the page's one price, a token in the renewal section", () => {
  const html = page();
  assert.equal((html.match(/<span class="price">/g) || []).length, 1);
  assert.equal((section(main(html), 5).match(/<span class="price">/g) || []).length, 1);
  assert.equal(JSON.stringify(copy.sections[4]).match(/\{\{price\.renewal\.inline\}\}/g)?.length, 1);
  assert.equal((JSON.stringify(copy).match(/\{\{price\./g) || []).length, 1);
  assert.ok(section(main(html), 5).includes('href="/pricing/"'));
});

test("the updates page links the pricing FAQ, update verification and the connections page", () => {
  const body = main(page());
  for (const href of ["/pricing/#pricing-faq", "/security/#updates", "/docs/connections/"]) {
    assert.ok(body.includes(`href="${href}"`), `missing link ${href}`);
  }
});

test("the updates FAQ asks five questions and answers the update switch honestly", () => {
  assert.equal(copy.faqs.length, 5);
  assert.equal(copy.faqs[0][0], "Does Dictivo update itself?");
  assert.equal(copy.faqs.at(-1)[0], "Can I turn off update checks?");
  assert.match(copy.faqs.at(-1)[1], new RegExp(`Dictivo ${DOCS_CHECKED_VERSION.replace(/\./g, "\\.")} has no setting`));
  assert.ok(copy.faqs.some(([question]) => question === `What happens after the ${months} months of updates?`));
});
