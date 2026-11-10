import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCAL_OFFER } from "../../data/local-offer.mjs";
import { DOCS_MODELS_LASTMOD, docsModelsCopy } from "../../data/docs-models-and-languages.mjs";

// Docs page M (Batch B2): the seven local speech models, their sizes, who can use them, how Dictivo
// picks a default, where models come from and live, and the dictation languages. Facts: the desktop
// app at the tag in DOCS_CHECKED_VERSION (private_fast.rs catalog and default_model_for_tier,
// ModelManager.tsx, tierDisplay.ts, packages/shared index.ts, displayLanguage.ts). The shared shape
// is in tests/structure/docs-pages.test.mjs.
const read = (path) => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const windows = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const copy = docsModelsCopy({ windows });
const page = () => read("docs/models-and-languages/index.html");
const main = (html) => html.split("<main")[1].split("</main>")[0];
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\s+/g, " ");
const section = (html, n) => html.slice(html.indexOf(`id="docs-models-section-${n}"`)).split("</section>")[0];
const rows = (html) => [...html.split("<tbody>")[1].split("</tbody>")[0].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(([, row]) =>
  [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(([, cell]) => text(cell).trim()),
);
const headers = (html) => [...html.split("<thead>")[1].split("</thead>")[0].matchAll(/<th scope="col">([^<]*)<\/th>/g)].map(([, cell]) => cell);

const SECTIONS = [
  "The seven models",
  "How Dictivo picks a model",
  "Where models come from and where they live",
  "Languages",
  "Switching and deleting models",
  "What the models do not do",
  "All Dictivo docs",
];

const MODELS = [
  ["Tiny", "~75 MB"],
  ["Base", "~142 MB"],
  ["Small", "~469 MB"],
  ["Medium Q5", "~540 MB"],
  ["Large v3 Turbo Q5", "~600 MB"],
  ["Large v3 Turbo", "~1.6 GB"],
  ["Large v3", "~3.1 GB"],
];

test("the models page is ready, dated by its constant, and keeps its section order", () => {
  assert.equal(copy.ready, true);
  assert.equal(copy.lastmod, DOCS_MODELS_LASTMOD);
  const html = page();
  assert.ok(html.includes("<h1>Dictivo local models and languages</h1>"));
  assert.ok(html.includes(`<time datetime="${DOCS_MODELS_LASTMOD}">`));
  assert.deepEqual(
    [...main(html).matchAll(/<h2 id="docs-models-section-\d+-title">([^<]*)<\/h2>/g)].map(([, title]) => title),
    SECTIONS,
  );
});

test("the model table lists the seven catalog models with the catalog sizes and who can use them", () => {
  const table = section(main(page()), 1);
  assert.deepEqual(headers(table).map(text), ["Model", "Download size", "Who can use it", "Dictivo's default for"]);
  const body = rows(table);
  assert.deepEqual(body.map(([model, size]) => [model, size]), MODELS);
  assert.equal(body[0][2], "Free forever");
  for (const row of body.slice(1)) assert.equal(row[2], `${LOCAL_OFFER.trialDays}-day trial or Local license`, row[0]);
  // default_model_for_tier never returns Medium Q5 or Large v3 Turbo.
  for (const name of ["Medium Q5", "Large v3 Turbo"]) {
    assert.equal(body.find(([model]) => model === name)[3], "Not a default; available to choose", name);
  }
  for (const row of body) assert.ok(row[3].length > 0, row[0]);
});

test("the languages list has the eleven app labels, and the page names Auto-detect and the interface count", () => {
  const languages = section(main(page()), 4);
  const items = [...languages.split("<ul>")[1].split("</ul>")[0].matchAll(/<li>([\s\S]*?)<\/li>/g)].map(([, item]) => text(item).trim());
  assert.equal(items.length, 11);
  assert.deepEqual(items, ["English", "Deutsch", "Français", "Español", "Italiano", "Nederlands", "Português", "中文", "日本語", "한국어", "Tiếng Việt"]);
  const body = text(languages);
  assert.ok(body.includes("Auto-detect"));
  assert.match(body, /10 interface languages/);
});

test("the models page states the hosts, the folder, the disk margin and the honest limits", () => {
  const body = text(main(page()));
  for (const phrase of [
    "downloads.dictivo.app",
    "huggingface.co",
    "private-fast/models",
    "256 MB",
    "Auto-detect",
    "Re-run setup",
    "Settings › Engine",
    "checksum",
    "Dictivo has no mobile app.",
    "Dictivo is for live dictation and does not import recorded files.",
  ]) {
    assert.ok(body.includes(phrase), `missing: ${phrase}`);
  }
  assert.doesNotMatch(body, /whisper/i);
  assert.doesNotMatch(body, /ggerganov|resolve\/main|ggml/i);
  assert.doesNotMatch(body, /lifetime/i);
  // No price on this page.
  assert.ok(!page().includes('<span class="price">'));
  assert.equal((JSON.stringify(copy).match(/\{\{price\./g) || []).length, 0);
});

test("the models page links system requirements, the Mac model guide and the connections page", () => {
  const body = main(page());
  for (const href of ["/docs/system-requirements/", "/mac-model-guide/", "/docs/connections/"]) {
    assert.ok(body.includes(`href="${href}"`), `missing link ${href}`);
  }
});

test("the models FAQ asks five questions, from the free model to importing a file", () => {
  assert.equal(copy.faqs.length, 5);
  assert.equal(copy.faqs[0][0], "Which model is free?");
  assert.equal(copy.faqs.at(-1)[0], "Can I use a model file I already have?");
  assert.match(copy.faqs[0][1], /Tiny/);
});
