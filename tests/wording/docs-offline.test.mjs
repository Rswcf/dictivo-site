import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCAL_OFFER } from "../../data/local-offer.mjs";
import { DOCS_OFFLINE_LASTMOD, docsOfflineCopy } from "../../data/docs-offline.mjs";

// Docs page O (Batch B2): what Dictivo does with no network, and which actions need one. Facts: the
// desktop app at the tag in DOCS_CHECKED_VERSION (license.rs, private_fast.rs, model_download.rs,
// updater.rs, lib.rs, localOffer.ts, trialCensus.ts, installCensus.ts, displayLanguage.ts Connections
// rows) and the site's privacy pages. The shared shape is in tests/structure/docs-pages.test.mjs.
const read = (path) => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const windows = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const copy = docsOfflineCopy({ windows });
const page = () => read("docs/offline/index.html");
const main = (html) => html.split("<main")[1].split("</main>")[0];
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\s+/g, " ");
const tableAfter = (html, marker) => html.slice(html.indexOf(marker)).split("</table>")[0];
const rowHeaders = (table) => [...table.matchAll(/<th scope="row">([^<]*)<\/th>/g)].map(([, cell]) => text(cell).trim());
const columnHeaders = (table) => [...table.matchAll(/<th scope="col">([^<]*)<\/th>/g)].map(([, cell]) => text(cell).trim());

const ROWS = [
  "Local dictation with a downloaded model",
  "Paste into the active app",
  `Starting the ${LOCAL_OFFER.trialDays}-day trial`,
  "First download of a model",
  "Importing a model from a file",
  "Activating, refreshing or removing a license",
  "Using an already active license",
  "Update check",
  "Cloud Fast",
  "Showing the Local price in the app",
  "Trial, install and statistics reports",
  "Buying or renewing (opens the browser)",
];

const SECTIONS = [
  "Local dictation needs no network",
  "The one thing that needs a download first",
  "What uses the network, and when",
  "Lock Cloud Fast",
  "How to verify it yourself",
  "All Dictivo docs",
];

test("the offline page is ready, dated by its constant, and keeps its headline", () => {
  assert.equal(copy.ready, true);
  assert.equal(copy.lastmod, DOCS_OFFLINE_LASTMOD);
  const html = page();
  assert.ok(html.includes("<h1>What Dictivo does offline, and what needs the network</h1>"));
  assert.ok(html.includes(`<time datetime="${DOCS_OFFLINE_LASTMOD}">`));
  assert.deepEqual(
    [...main(html).matchAll(/<h2 id="docs-offline-section-\d+-title">([^<]*)<\/h2>/g)].map(([, title]) => title),
    SECTIONS,
  );
});

test("the quick reference lists the twelve actions in order, in three columns", () => {
  const table = tableAfter(main(page()), 'id="docs-offline-quick-reference"');
  assert.deepEqual(columnHeaders(table), ["Action", "Needs a network?", "What happens offline"]);
  assert.deepEqual(rowHeaders(table), ROWS);
  for (const row of table.split("<tr>").slice(2)) {
    assert.equal((row.match(/<t[hd][\s>]/g) || []).length, 3, row);
  }
});

test("the offline page names the boundary, the model import and the hosts", () => {
  const body = text(main(page()));
  for (const phrase of ["Lock Cloud Fast", "import", "transcription server", "downloads.dictivo.app", "app.dictivo.app", "api.lemonsqueezy.com"]) {
    assert.ok(body.includes(phrase), `missing: ${phrase}`);
  }
  // The trial starts with a file on the device; a license that is already active needs no check.
  assert.match(text(tableAfter(main(page()), 'id="docs-offline-quick-reference"')), /Starting the \d+-day trial No/);
  assert.doesNotMatch(body, /never connects|never uses the network|lifetime/i);
  assert.doesNotMatch(body, /Lemon Squeezy|ggerganov|resolve\/main/);
});

test("the offline page links the network test, the lock, connections and models", () => {
  const body = main(page());
  for (const href of [
    "/privacy/local-dictation-network-test/",
    "/privacy/where-dictation-audio-goes/",
    "/security/#lock-cloud-fast",
    "/docs/connections/",
    "/docs/models-and-languages/",
  ]) {
    assert.ok(body.includes(`href="${href}"`), `missing link ${href}`);
  }
});

test("the offline page carries no price", () => {
  assert.equal((page().match(/<span class="price">/g) || []).length, 0);
  assert.equal((JSON.stringify(copy).match(/\{\{price\./g) || []).length, 0);
});

test("the offline FAQ asks five questions, from offline use to Cloud Fast", () => {
  assert.equal(copy.faqs.length, 5);
  assert.equal(copy.faqs[0][0], "Does Dictivo work offline?");
  assert.equal(copy.faqs.at(-1)[0], "Does Cloud Fast work offline?");
  assert.ok(copy.faqs.some(([question]) => question === "Can I set up Dictivo on a computer that is never online?"));
});
