import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DOCS_CONNECTIONS_LASTMOD, docsConnectionsCopy } from "../../data/docs-connections.mjs";

// Docs page C (Batch B2): every host the Dictivo desktop app can contact, with its paths, when it
// connects, what it sends and what happens if a network blocks it. Facts: the desktop app at the tag
// in DOCS_CHECKED_VERSION (serviceHosts.ts, license.rs, cloud_fast.rs, cloudFastEngine.ts,
// trialCensus.ts, installCensus.ts, trialReminder.ts, analyticsEmitter.ts, localOffer.ts,
// private_fast.rs, network_diagnostics.rs, tauri.conf.json, displayLanguage.ts Connections rows) and
// security.html #network-traffic. The shared shape is in tests/structure/docs-pages.test.mjs.
const read = (path) => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const windows = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const copy = docsConnectionsCopy({ windows });
const page = () => read("docs/connections/index.html");
const main = (html) => html.split("<main")[1].split("</main>")[0];
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\s+/g, " ");
const section = (html, n) => html.slice(html.indexOf(`id="docs-connections-section-${n}"`)).split("</section>")[0];
const table = (html) => section(main(html), 1).split("</table>")[0];
const rowHeaders = (html) => [...html.matchAll(/<th scope="row">([^<]*)<\/th>/g)].map(([, cell]) => text(cell).trim());
const columnHeaders = (html) => [...html.matchAll(/<th scope="col">([^<]*)<\/th>/g)].map(([, cell]) => text(cell).trim());
const rows = (html) => html.split("<tbody>")[1].split("</tr>").filter((row) => row.includes("<th"));

const HOSTS = ["downloads.dictivo.app", "app.dictivo.app", "api.dictivo.app", "api.lemonsqueezy.com", "huggingface.co"];

// Every path the tag calls, per host row. huggingface.co is named by host only: its path names the
// speech engine, which the site does not name.
const PATHS = [
  ["/latest.json", "/models/ggml-&lt;model&gt;.bin"],
  [
    "/v1/installs/census",
    "/v1/trials/activations",
    "/v1/trials/reminders",
    "/v1/trials/reminders/cancel",
    "/v1/analytics/events",
    "/v1/cloud-fast/claim",
    "/v1/local-offer",
    "/health",
  ],
  ["/v1/cloud-fast/entitlement", "/v1/cloud-fast/session", "/v1/cloud-fast/transcribe", "/v1/cloud-fast/device/deactivate", "/health"],
  ["/v1/licenses/activate", "/v1/licenses/validate", "/v1/licenses/deactivate"],
  [],
];

const SECTIONS = [
  "The list",
  "What never leaves the device",
  "Reports that are sent whatever you choose, and the one setting",
  "Run check",
  "Two things that look like app connections but are not",
  "Allow-list for a managed network and how to verify",
  "All Dictivo docs",
];

test("the connections page is ready, wide, dated by its constant, and keeps its headline", () => {
  assert.equal(copy.ready, true);
  assert.equal(copy.wide, true);
  assert.equal(copy.lastmod, DOCS_CONNECTIONS_LASTMOD);
  const html = page();
  assert.ok(html.includes("<h1>Every server the Dictivo desktop app contacts, and why</h1>"));
  assert.ok(html.includes('<main class="doc-page offline-guide-page"'));
  assert.ok(html.includes(`<time datetime="${DOCS_CONNECTIONS_LASTMOD}">`));
  assert.deepEqual(
    [...main(html).matchAll(/<h2 id="docs-connections-section-\d+-title">([^<]*)<\/h2>/g)].map(([, title]) => title),
    SECTIONS,
  );
});

test("the list has the five hosts in order, with the exact columns", () => {
  const list = table(page());
  assert.deepEqual(columnHeaders(list), ["Host", "Paths", "When", "What it sends", "If your network blocks it"]);
  assert.deepEqual(rowHeaders(list), HOSTS);
  for (const row of rows(list)) assert.equal((row.match(/<t[hd][\s>]/g) || []).length, 5);
});

test("each host row names every path the app calls, in code, and no engine path", () => {
  const list = table(page());
  rows(list).forEach((row, index) => {
    const paths = row.split("</th>")[1].split("</td>")[0];
    assert.deepEqual([...paths.matchAll(/<code>([^<]*)<\/code>/g)].map(([, path]) => path), PATHS[index], HOSTS[index]);
  });
  assert.doesNotMatch(list, /ggerganov|resolve\/main/);
});

test("the connections page states the audio boundary, Run check and the old host use", () => {
  const body = text(main(page()));
  for (const phrase of ["Run check", "0.3.51", "The only request that carries audio is a Cloud Fast transcription", "placeholder key", "off by default"]) {
    assert.ok(body.includes(phrase), `missing: ${phrase}`);
  }
  assert.ok(body.indexOf("app.dictivo.app") < body.indexOf("api.dictivo.app"));
  assert.doesNotMatch(body, /never connects|never uses the network|lifetime/i);
  assert.doesNotMatch(page(), /Lemon Squeezy/);
  assert.doesNotMatch(body, /ggerganov|resolve\/main/);
});

test("the allow-list names the five hosts and the site, and nothing else", () => {
  const allow = section(main(page()), 6);
  const listed = [...allow.split("</ul>")[0].matchAll(/<li><code>([^<]*)<\/code>/g)].map(([, host]) => host);
  assert.deepEqual(listed, [...HOSTS, "dictivo.app"]);
});

test("the connections page links the security table, the lock and the network test", () => {
  const body = main(page());
  for (const href of ["/security/#network-traffic", "/security/#lock-cloud-fast", "/privacy/local-dictation-network-test/", "/privacy/where-dictation-audio-goes/", "/privacy/"]) {
    assert.ok(body.includes(`href="${href}"`), `missing link ${href}`);
  }
});

test("the connections page carries no price", () => {
  assert.equal((page().match(/<span class="price">/g) || []).length, 0);
  assert.equal((JSON.stringify(copy).match(/\{\{price\./g) || []).length, 0);
});

test("the connections FAQ asks six questions, from audio to blocking everything", () => {
  assert.equal(copy.faqs.length, 6);
  assert.equal(copy.faqs[0][0], "Does Dictivo send my audio anywhere?");
  assert.equal(copy.faqs.at(-1)[0], "Can I block everything and still dictate?");
  assert.ok(copy.faqs.some(([question]) => question === "Does the license check run every time I start Dictivo?"));
});
