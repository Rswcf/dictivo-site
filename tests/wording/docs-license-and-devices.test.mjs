import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCAL_OFFER } from "../../data/local-offer.mjs";
import { DOCS_LICENSE_LASTMOD, docsLicenseCopy } from "../../data/docs-license-and-devices.mjs";

// Docs page L (Batch B2): what one Dictivo Local license covers, activation without an account, the
// device limit, reinstall and the system keychain, the trial, and refunds. Facts: the desktop app at
// the tag in DOCS_CHECKED_VERSION (license.rs, credential_store.rs, lib.rs, deepLink.ts,
// displayLanguage.ts) and the site's pricing, terms and refund copy. The shared shape is in
// tests/structure/docs-pages.test.mjs.
const read = (path) => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const windows = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const copy = docsLicenseCopy({ windows });
const page = () => read("docs/license-and-devices/index.html");
const main = (html) => html.split("<main")[1].split("</main>")[0];
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\s+/g, " ");
const section = (html, n) => html.slice(html.indexOf(`id="docs-license-section-${n}"`)).split("</section>")[0];
const devices = LOCAL_OFFER.personalDevices;

const SECTIONS = [
  "What you buy",
  "Activation",
  "Devices",
  "Reinstall and the system keychain",
  "Trial and the free model",
  "Refunds and disabled licenses",
  "All Dictivo docs",
];

test("the license page is ready, dated by its constant, and keeps its section order", () => {
  assert.equal(copy.ready, true);
  assert.equal(copy.lastmod, DOCS_LICENSE_LASTMOD);
  const html = page();
  assert.ok(html.includes("<h1>Dictivo license and devices: what one purchase covers</h1>"));
  assert.ok(html.includes(`<time datetime="${DOCS_LICENSE_LASTMOD}">`));
  assert.deepEqual(
    [...main(html).matchAll(/<h2 id="docs-license-section-\d+-title">([^<]*)<\/h2>/g)].map(([, title]) => title),
    SECTIONS,
  );
});

test("the license page states the device limit, the remove button, the license host, the link and the keychain", () => {
  const body = text(main(page()));
  for (const phrase of [
    `${devices} personal devices`,
    "Remove license from this device",
    "api.lemonsqueezy.com",
    "dictivo://activate",
    "14-day",
    `${LOCAL_OFFER.includedUpdateMonths} months of updates`,
    "keeps working",
    "support@dictivo.app",
  ]) {
    assert.ok(body.includes(phrase), `missing: ${phrase}`);
  }
  assert.match(body, /keychain/i);
  // A reinstall restores the license from the keychain copy and spends no device.
  assert.match(text(section(main(page()), 4)), /does not use (up )?one of your/i);
  // One key covers both platforms only while Windows downloads are public.
  assert.match(body, windows ? /macOS and Windows x64/ : /Windows downloads are temporarily unavailable/);
  assert.doesNotMatch(body, /lifetime/i);
  // The only currency on the page is the rendered price token.
  assert.doesNotMatch(text(main(page()).replace(/<span class="price">[\s\S]*?<\/span>/g, "")), /US\$|\$/);
});

test("the Local price is the page's one price, a token in the first section", () => {
  const html = page();
  assert.equal((html.match(/<span class="price">/g) || []).length, 1);
  assert.equal((section(main(html), 1).match(/<span class="price">/g) || []).length, 1);
  assert.equal(JSON.stringify(copy.sections[0]).match(/\{\{price\.local\.inline\}\}/g)?.length, 1);
  assert.equal((JSON.stringify(copy).match(/\{\{price\./g) || []).length, 1);
  for (const [, answer] of copy.faqs) assert.doesNotMatch(answer, /\{\{price\./);
});

test("the license page links pricing, terms, refunds and the connections page", () => {
  const body = main(page());
  for (const href of ["/pricing/", "/terms/", "/refund/", "/docs/connections/"]) {
    assert.ok(body.includes(`href="${href}"`), `missing link ${href}`);
  }
});

test("the license FAQ asks six questions, from the account to refunds", () => {
  assert.equal(copy.faqs.length, 6);
  assert.equal(copy.faqs[0][0], "Do I need a Dictivo account?");
  assert.equal(copy.faqs.at(-1)[0], "Does a refund disable the license?");
  const subscription = copy.faqs.find(([question]) => question === "Is the license a subscription?");
  assert.ok(subscription, "subscription question");
  assert.match(subscription[1], /Dictivo Local/);
  assert.match(subscription[1], /Cloud Fast/);
});
