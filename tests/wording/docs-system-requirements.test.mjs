import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DOCS_SYSTEM_REQUIREMENTS_LASTMOD, docsSystemRequirementsCopy } from "../../data/docs-system-requirements.mjs";

// Docs page S (Batch B2): what Dictivo needs on a Mac and on Windows x64. Facts: the desktop app at
// the tag in DOCS_CHECKED_VERSION (private_fast.rs, autostart.rs, tauri.conf.json, the release
// workflow), the installed app's Info.plist (LSMinimumSystemVersion) and binary architectures, and
// pages the site already publishes. The shared shape is in tests/structure/docs-pages.test.mjs.
const read = (path) => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const windows = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const copy = docsSystemRequirementsCopy({ windows });
const page = () => read("docs/system-requirements/index.html");
const main = (html) => html.split("<main")[1].split("</main>")[0];
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\s+/g, " ");
const section = (html, n) => html.slice(html.indexOf(`id="docs-system-requirements-section-${n}"`)).split("</section>")[0];
const quickReference = (html) => html.slice(html.indexOf('id="docs-system-requirements-quick-reference"')).split("</section>")[0];
const rows = (html) => [...html.split("<tbody>")[1].split("</tbody>")[0].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(([, row]) =>
  [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(([, cell]) => text(cell).trim()),
);

const SECTIONS = [
  "Mac",
  "Windows",
  "Memory and processor: how Dictivo decides",
  "Disk space",
  "Microphone and permissions",
  "Network",
  "All Dictivo docs",
];

test("the system requirements page is ready, dated by its constant, and keeps its section order", () => {
  assert.equal(copy.ready, true);
  assert.equal(copy.lastmod, DOCS_SYSTEM_REQUIREMENTS_LASTMOD);
  const html = page();
  assert.ok(html.includes("<h1>Dictivo system requirements for Mac and Windows</h1>"));
  assert.ok(html.includes(`<time datetime="${DOCS_SYSTEM_REQUIREMENTS_LASTMOD}">`));
  assert.deepEqual(
    [...main(html).matchAll(/<h2 id="docs-system-requirements-section-\d+-title">([^<]*)<\/h2>/g)].map(([, title]) => title),
    SECTIONS,
  );
});

test("the quick reference has seven rows for Mac and Windows, and the Mac row gives the declared minimum", () => {
  const table = rows(quickReference(main(page())));
  assert.deepEqual(
    table.map(([requirement]) => requirement),
    ["Processor", "Operating system", "Memory for the default models", "Disk space", "Microphone", "Network", "Start at login"],
  );
  for (const row of table) {
    assert.equal(row.length, 3, row[0]);
    for (const cell of row) assert.ok(cell.length > 0 && !/TODO/.test(cell), row[0]);
  }
  // The 0.3.57 engine imports libc++ symbols from macOS 15.4, so Local needs 15.4; the app still declares 10.13.
  const [, macOs, windowsOs] = table[1];
  assert.match(macOs, /^Local dictation needs macOS 15\.4 or later\. On older macOS, the local engine does not start\./);
  assert.match(macOs, /declares macOS 10\.13 or later/);
  assert.match(macOs, /macOS 13 or later/);
  assert.doesNotMatch(macOs, /not published/);
  assert.match(windowsOs, /Windows 10 and 11/);
  assert.match(table[0][2], /no ARM build/);
  assert.match(table[6][1], /macOS 13 or later/);
});

test("the memory table gives the default model per tier for the three groups", () => {
  const body = rows(section(main(page()), 3));
  assert.equal(body.length, 3);
  assert.deepEqual(body[0].slice(1), ["Small", "Large v3 Turbo Q5", "Large v3"]);
  assert.deepEqual(body[1].slice(1), ["Base", "Small", "Large v3 Turbo Q5"]);
  assert.deepEqual(body[2].slice(1), ["Tiny", "Base", "Small"]);
});

test("the page states the platforms, engines and limits as the source states them", () => {
  const body = text(main(page()));
  for (const phrase of [
    "universal app for Apple Silicon and Intel Macs",
    "In Dictivo 0.3.57, Local dictation needs macOS 15.4 or later",
    "The app declares macOS 10.13 or later",
    "not the minimum for Local dictation",
    "Start at login needs macOS 13 or later",
    "Apple Silicon",
    "Intel",
    "x64",
    "no ARM build",
    "16 GB",
    "8 GB",
    "Metal",
    "Vulkan",
    "Visual C++",
    "not Authenticode-signed",
    "256 MB",
  ]) {
    assert.ok(body.includes(phrase), `missing: ${phrase}`);
  }
  assert.doesNotMatch(body, /ARM64/);
  assert.doesNotMatch(body, /not published/);
  assert.doesNotMatch(body, /whisper/i);
  assert.ok(!page().includes('<span class="price">'));
  assert.equal((JSON.stringify(copy).match(/\{\{price\./g) || []).length, 0);
});

test("the page links the model guide, the installer guide and the sibling docs pages", () => {
  const body = main(page());
  for (const href of ["/mac-model-guide/", "/guides/windows-installer-blocked/", "/docs/models-and-languages/", "/docs/macos-permissions/", "/docs/offline/"]) {
    assert.ok(body.includes(`href="${href}"`), `missing link ${href}`);
  }
});

test("the FAQ asks five questions, from Intel Macs to the GPU", () => {
  assert.equal(copy.faqs.length, 5);
  assert.equal(copy.faqs[0][0], "Does Dictivo run on Intel Macs?");
  assert.equal(copy.faqs.at(-1)[0], "Do I need a GPU?");
  const macOs = copy.faqs.find(([question]) => question === "Which macOS version do I need?");
  assert.match(macOs[1], /^For Local dictation in Dictivo 0\.3\.57, macOS 15\.4 or later\./);
  assert.match(macOs[1], /declares macOS 10\.13 or later/);
  const intel = copy.faqs.find(([question]) => question === "Does Dictivo run on Intel Macs?");
  assert.match(intel[1], /Local dictation needs macOS 15\.4 or later on every Mac/);
  // The answer box no longer leads with the declared minimum.
  assert.match(copy.answer, /In Dictivo 0\.3\.57, Local dictation needs macOS 15\.4 or later\./);
  assert.doesNotMatch(copy.answer, /10\.13/);
  const arm = copy.faqs.find(([question]) => question === "Does Dictivo run on Windows on ARM?");
  assert.match(arm[1], /no ARM build/);
});
