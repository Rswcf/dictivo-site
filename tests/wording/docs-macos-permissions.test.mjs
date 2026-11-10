import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DOCS_PERMISSIONS_LASTMOD, docsPermissionsCopy } from "../../data/docs-macos-permissions.mjs";

// Docs page P (Batch B2): the three macOS permissions Dictivo asks for, what each one does and what
// happens without it. Facts: the desktop app at the tag in DOCS_CHECKED_VERSION (displayLanguage.ts
// permissions copy, Info.plist, Entitlements.plist, lib.rs, permissions_macos.rs, clipboard.rs,
// windows_paste.rs, settingsStore.ts). The shared shape is in tests/structure/docs-pages.test.mjs.
const read = (path) => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const windows = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const copy = docsPermissionsCopy({ windows });
const page = () => read("docs/macos-permissions/index.html");
const main = (html) => html.split("<main")[1].split("</main>")[0];
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\s+/g, " ");
const section = (html, n) => html.slice(html.indexOf(`id="docs-permissions-section-${n}"`)).split("</section>")[0];
const quickReference = (html) => html.slice(html.indexOf('id="docs-permissions-quick-reference"')).split("</table>")[0];
const rows = (table) =>
  [...table.split("<tbody>")[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(([, row]) =>
    [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(([, cell]) => text(cell).trim()),
  );

const SECTIONS = [
  "Microphone (required)",
  "Accessibility (recommended)",
  "Automation, shown as Auto paste (optional)",
  "What Dictivo declares",
  "Windows",
  "All Dictivo docs",
];

test("the permissions page is ready, dated by its constant, and keeps its section order", () => {
  assert.equal(copy.ready, true);
  assert.equal(copy.lastmod, DOCS_PERMISSIONS_LASTMOD);
  const html = page();
  assert.ok(html.includes("<h1>Which macOS permissions Dictivo asks for, and why</h1>"));
  assert.ok(html.includes(`<time datetime="${DOCS_PERMISSIONS_LASTMOD}">`));
  assert.deepEqual(
    [...main(html).matchAll(/<h2 id="docs-permissions-section-\d+-title">([^<]*)<\/h2>/g)].map(([, title]) => title),
    SECTIONS,
  );
});

test("the quick reference lists the three permissions with the app's own requirement words", () => {
  const table = quickReference(main(page()));
  assert.deepEqual(
    [...table.matchAll(/<th scope="col">([^<]*)<\/th>/g)].map(([, header]) => header),
    ["Permission", "Dictivo says", "What it is for", "Without it"],
  );
  const body = rows(table);
  assert.deepEqual(body.map((row) => row[0]), ["Microphone", "Accessibility", "Automation (shown as Auto paste)"]);
  assert.deepEqual(body.map((row) => row[1]), ["Required", "Recommended", "Optional"]);
  assert.ok(body.every((row) => row.length === 4 && row.every((cell) => cell.length > 0)));
});

test("the page explains the paste: clipboard, Cmd+V through System Events, and the fallback", () => {
  const body = text(main(page()));
  for (const phrase of ["System Events", "Cmd+V", "Cmd+Shift+V", "stays in Dictivo", "pastes", "Settings › Privacy", "Open settings"]) {
    assert.ok(body.includes(phrase), `missing: ${phrase}`);
  }
  assert.doesNotMatch(body, /types directly|types into|inserts text/i);
  assert.match(text(section(main(page()), 3)), /stays in Dictivo and on the clipboard/);
});

test("section 4 names exactly what the app declares, and what it does not request", () => {
  const declared = text(section(main(page()), 4));
  for (const key of [
    "NSMicrophoneUsageDescription",
    "NSAppleEventsUsageDescription",
    "com.apple.security.device.audio-input",
    "com.apple.security.automation.apple-events",
    "Dictivo records microphone audio only when you start dictation.",
    "Input Monitoring",
    "Screen Recording",
  ]) {
    assert.ok(declared.includes(key), `section 4 misses ${key}`);
  }
  assert.doesNotMatch(text(main(page())), /Full Disk Access|Location|Contacts|Calendar/);
});

test("the Windows section says Accessibility is not required", () => {
  const windowsSection = text(section(main(page()), 5));
  assert.match(windowsSection, /not required/);
  assert.match(windowsSection, /microphone/i);
});

test("the permissions page links the first-dictation guide and the connections page, and cites Apple", () => {
  const body = main(page());
  for (const href of ["/guides/first-local-dictation/", "/docs/connections/"]) {
    assert.ok(body.includes(`href="${href}"`), `missing link ${href}`);
  }
  const apple = copy.references.filter(([, href]) => href.startsWith("https://support.apple.com/"));
  assert.ok(apple.length >= 2, "fewer than two Apple help pages");
  for (const [label] of apple) assert.match(label, /\(checked \d{4}-\d{2}-\d{2}\)$/, label);
});

test("the permissions FAQ asks five questions in the planned order", () => {
  assert.equal(copy.faqs.length, 5);
  assert.equal(copy.faqs[0][0], "Why does Dictivo ask for Accessibility?");
  assert.equal(copy.faqs.at(-1)[0], "How do I change a permission later?");
  assert.ok(copy.faqs.some(([question]) => question === "Does Dictivo record when I am not dictating?"));
});
