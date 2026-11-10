import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { firstPublished } from "../../data/first-published.mjs";
import { PRICING_LASTMOD, introOfferActive } from "../../data/local-offer.mjs";
import {
  CLAUDE_CODE_GUIDE_CHECKED,
  CLAUDE_CODE_GUIDE_LASTMOD,
  CLAUDE_CODE_GUIDE_REFERENCES,
  claudeCodeGuideCopy,
} from "../../data/claude-code-guide.mjs";

// The "dictate into Claude Code and Cursor on a Mac" answer page (Batch B1): the query as H1, a
// short dated answer, the "What is Dictivo?" block, the ways people ask, a dated fact table, a
// signed method note, then the trial panel, sections, FAQ, related pages and references. The
// Claude Code and Cursor cells come from their own documentation pages, read on the check date.
const read = (path) => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const path = "/guides/dictate-into-claude-code-and-cursor-on-mac/";
const url = `https://dictivo.app${path}`;
const route = "guides/dictate-into-claude-code-and-cursor-on-mac";
const page = () => read(`${path.slice(1)}index.html`);
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const hasWindowsRelease = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const copy = claudeCodeGuideCopy({ windows: hasWindowsRelease });
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, body]) => [JSON.parse(body)].flat());
const alternates = (html) => [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]);
const between = (html, from, to) => html.slice(html.indexOf(from), html.indexOf(to, html.indexOf(from)));
const main = (html) => html.split("<main")[1].split("</main>")[0];
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\s+/g, " ");
const tableAfter = (html, id) => html.slice(html.indexOf(`id="${id}"`)).match(/<table class="compare-table">[\s\S]*?<\/table>/)[0];
const rows = (table) => [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(([, row]) => [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(([, cell]) => cell.trim()));
const section = (html, n) => between(html, `id="claude-code-section-${n}"`, "</section>");
const checkedOn = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${CLAUDE_CODE_GUIDE_CHECKED}T00:00:00Z`));
const DICTIVO_PRICES = introOfferActive() ? 3 : 2;
const SECTIONS = 6;
const FAQS = [
  "Does Claude Code have built-in voice dictation?",
  "Does Cursor have voice input?",
  "Can I dictate into the terminal with Dictivo?",
  "Does Dictivo's shortcut clash with Cursor's?",
  "Does my speech leave the Mac?",
  "Do I need an account to dictate into Claude Code with Dictivo?",
  "Can I install Dictivo with Homebrew?",
];
const INTENTS = [
  "dictate into Claude Code",
  "voice to text for Cursor on Mac",
  "Claude Code voice dictation offline",
  "talk to the Cursor agent instead of typing",
  "dictation app for coding on a Mac",
];
const HEADERS = ["Option", "Works in a terminal (Claude Code)?", "Works in Cursor's chat and editor?", "Speech processed on the Mac?", "Account or sign-in needed?", "Price", "Checked"];
const OPTIONS = ["Claude Code built-in voice", "Cursor built-in voice", "macOS Dictation", "Superwhisper", "Dictivo (this site's product)"];
const DICTIVO = "Dictivo (this site's product)";
const DOCS = {
  claudeCode: "https://code.claude.com/docs/en/voice-dictation",
  cursor: "https://cursor.com/docs/agent/voice-chat",
};
const BREW = "<code>brew install --cask deepviewsdev/tap/dictivo</code>";
// Products the page must not name: the fact table's products, Homebrew and the terminal apps
// Terminal, iTerm2 and Warp are the only ones allowed.
const OTHER_PRODUCTS = /Wispr|Handy|VoiceInk|MacWhisper|Spokenly|Voibe|Aiko|Voice Type|Dragon|Whisper\b|Grok|VS Code|Visual Studio|Copilot|ChatGPT|Perplexity|Windsurf|Codex|Gemini|JesType|Voicetypr|Koegaki|Speakpad|Voxtira|Lazytype|FluidVoice|SoX|WSL/;

test("the Claude Code and Cursor guide is a self-canonical English page with the query as its heading", () => {
  const html = page();
  assert.ok(html.includes('<html lang="en">'));
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.ok(html.includes("<h1>How to dictate prompts into Claude Code and Cursor on a Mac</h1>"));
  assert.ok(html.includes("<title>Dictate Into Claude Code and Cursor on a Mac (Setup Guide)</title>"));
  assert.ok(html.includes('<meta name="description" content="How to speak prompts into Claude Code and Cursor on a Mac: their built-in voice features, macOS Dictation, and an offline app that pastes into the terminal." />'));
  assert.ok(html.includes(`<link rel="canonical" href="${url}" />`));
  assert.deepEqual(alternates(html), [["en", url], ["x-default", url]]);
  assert.equal(copy.navLabel, "Dictate into Claude Code and Cursor");
});

test("the lede discloses Dictivo before it names another product", () => {
  const lede = text(page().match(/<p class="doc-lede">([\s\S]*?)<\/p>/)[1]);
  const disclosure = lede.search(/Dictivo is this site's product/);
  assert.ok(disclosure >= 0, lede);
  for (const name of ["Claude Code", "Cursor", "macOS Dictation", "Superwhisper"]) {
    const at = lede.indexOf(name);
    if (at >= 0) assert.ok(disclosure < at, `${name} before the disclosure`);
  }
});

test("the guide keeps the answer-page order", () => {
  const body = main(page());
  const order = [
    'id="claude-code-answer"',
    "data-guide-intro",
    'id="claude-code-intents"',
    'id="claude-code-table"',
    'id="claude-code-method"',
    "data-guide-trial",
    ...Array.from({ length: SECTIONS }, (_, index) => `id="claude-code-section-${index + 1}"`),
    'id="claude-code-faq"',
    'id="claude-code-related"',
    'id="claude-code-references"',
  ];
  const positions = order.map((marker) => body.indexOf(marker));
  order.forEach((marker, index) => assert.ok(positions[index] > 0, `missing ${marker}`));
  for (let index = 1; index < order.length; index += 1) assert.ok(positions[index - 1] < positions[index], `${order[index - 1]} before ${order[index]}`);
  assert.ok(!body.includes(`id="claude-code-section-${SECTIONS + 1}"`), "no extra section");
  assert.ok(body.includes('<main class="doc-page offline-guide-page" id="claude-code-guide">') || page().includes('<main class="doc-page offline-guide-page" id="claude-code-guide">'));
});

test("the short answer is 50 to 70 words, names Dictivo, its paste and shortcut, and carries the check date", () => {
  const html = page();
  const answer = text(html.match(/id="claude-code-answer">[\s\S]*?<p>([\s\S]*?)<\/p>/)[1]).trim();
  const words = answer.split(/\s+/).length;
  assert.ok(words >= 50 && words <= 70, `${words} words: ${answer}`);
  for (const phrase of ["Dictivo", "macOS Dictation", "Cmd+V", "Cmd+Shift+Space", "Local mode"]) assert.ok(answer.includes(phrase), phrase);
  assert.match(answer, /\d/);
  assert.ok(answer.includes(checkedOn), checkedOn);
});

test("the intent table lists the ways people ask, in order", () => {
  const [header, ...body] = rows(tableAfter(page(), "claude-code-intents"));
  assert.equal(header.length, 3);
  assert.equal(body.length, INTENTS.length);
  for (const row of body) assert.equal(row.length, 3, row[0]);
  assert.deepEqual(body.map((row) => text(row[0]).trim()), INTENTS);
});

test("the fact table dates every option and keeps Dictivo prices in placeholders", () => {
  const [header, ...body] = rows(tableAfter(page(), "claude-code-table"));
  assert.deepEqual(header.map((cell) => text(cell).trim()), HEADERS);
  assert.deepEqual(body.map((row) => text(row[0]).trim()), OPTIONS);
  for (const row of body) {
    const name = text(row[0]).trim();
    assert.equal(row.length, HEADERS.length, name);
    assert.ok(row.at(-1).includes(`<time datetime="${CLAUDE_CODE_GUIDE_CHECKED}">`), `${name}: checked ${CLAUDE_CODE_GUIDE_CHECKED}`);
    for (const cell of row) assert.doesNotMatch(cell, /undefined|null|NaN|\{\{price\.|FILL_IN/, name);
    const spans = (row[5].match(/<span class="price">/g) || []).length;
    if (name === DICTIVO) {
      assert.equal(spans, DICTIVO_PRICES, "Dictivo prices come from price placeholders");
    } else {
      assert.equal((row.join(" ").match(/<span class="price">/g) || []).length, 0, `${name}: no Dictivo price span`);
      assert.doesNotMatch(row.join(" "), /US\$/, name);
    }
  }
  const cells = Object.fromEntries(body.map((row) => [text(row[0]).trim(), row.map((cell) => text(cell).trim())]));
  // Claude Code: its documentation says audio streams to Anthropic for transcription and needs a Claude.ai sign-in.
  assert.match(cells["Claude Code built-in voice"][1], /^Yes/);
  assert.match(cells["Claude Code built-in voice"][3], /^No/);
  assert.match(cells["Claude Code built-in voice"][4], /^Yes/);
  // Cursor: the documentation does not say where dictation audio is processed.
  assert.match(cells["Cursor built-in voice"][3], /^Not stated/);
  assert.match(cells["Cursor built-in voice"][2], /Cmd\+Shift\+Space/);
  assert.match(cells[DICTIVO][1], /^Yes/);
  assert.match(cells[DICTIVO][1], /pastes/i);
  assert.match(cells[DICTIVO][3], /^Yes, in Local mode/);
  assert.match(cells[DICTIVO][4], /^No account/);
  assert.match(cells.Superwhisper[5], /\$249\.99/);
});

test("the method note says where the facts come from, claims no test and is signed by the Dictivo team", () => {
  const html = page();
  const method = text(between(html, 'id="claude-code-method"', "</section>"));
  assert.ok(method.includes("Dictivo team"));
  assert.ok(method.includes(checkedOn), checkedOn);
  assert.match(method, /documentation/);
  assert.match(method, /source code/);
  assert.doesNotMatch(method, /\btested\b/, "no hands-on test is claimed");
  const visible = text(main(html)).replaceAll("support@dictivo.app", "");
  assert.ok(!visible.includes("@"), "no e-mail address other than support");
});

test("the page keeps the site's wording rules and names no other product", () => {
  const body = main(page());
  const table = tableAfter(body, "claude-code-table");
  const rest = text(body.replace(table, ""));
  assert.doesNotMatch(rest, /lifetime updates|types directly|types into|inserts text|accura|fastest|most accurate|best overall|winner|#1|launch price/i);
  assert.doesNotMatch(text(table), /types directly|types into|inserts text|accura/i);
  assert.match(text(body), /pastes/);
  assert.doesNotMatch(page(), /FILL_IN|TODO|undefined|\{\{price\./);
  assert.doesNotMatch(text(body), OTHER_PRODUCTS);
  assert.doesNotMatch(text(body), /\btested\b/);
});

test("the Dictivo sections give the shortcuts, the paste, the permissions, the Homebrew command and the Cursor clash", () => {
  const body = main(page());
  assert.equal(body.split(BREW).length - 1, 1, "the Homebrew command appears once, as code");
  const dictivo = text(section(body, 3)) + text(section(body, 4));
  for (const phrase of ["Cmd+Shift+Space", "Cmd+Shift+V", "Cmd+V", "Microphone", "Accessibility", "Automation"]) assert.ok(dictivo.includes(phrase), phrase);
  const setup = section(body, 4);
  assert.ok(setup.includes("<ol>"), "setup is a numbered list");
  assert.ok(setup.includes(BREW), "the Homebrew command is a setup step");
  // Cursor's documentation lists Cmd+Shift+Space for dictation in the IDE, Dictivo's default.
  assert.match(text(setup), /Settings › Hotkeys/);
  assert.ok(text(section(body, 2)).includes("macOS Dictation"));
  assert.ok(section(body, 2).includes('href="/guides/mac-dictation-shortcut/"'));
  assert.ok(section(body, 5).includes('href="/privacy/where-dictation-audio-goes/"'));
  assert.ok(text(section(body, 5)).includes("Cloud Fast"));
  assert.ok(section(body, 6).includes('href="/guides/best-speech-to-text-apps-for-mac/"'));
  const limits = text(section(body, 6));
  assert.ok(limits.includes("Dictivo has no mobile app."));
  assert.ok(limits.includes("Dictivo is for live dictation and does not import recorded files."));
  const faq = body.slice(body.indexOf('id="claude-code-faq"'));
  const clash = text(between(faq, "shortcut clash with Cursor", "</details>"));
  assert.match(clash, /Cmd\+Shift\+Space/);
  assert.match(clash, /Settings › Hotkeys/);
});

test("the structured data repeats the visible title, FAQ and fact table", () => {
  const html = page();
  const nodes = jsonLd(html);
  assert.deepEqual(nodes.map((node) => node["@type"]), ["Organization", "TechArticle", "FAQPage", "ItemList", "BreadcrumbList"]);
  const article = nodes.find((node) => node["@type"] === "TechArticle");
  assert.equal(article.headline, text(html.match(/<title>([^<]*)<\/title>/)[1]).trim());
  assert.equal(article.datePublished, firstPublished(route, "en"));
  assert.ok(article.datePublished <= article.dateModified);
  assert.equal(article.dateModified, CLAUDE_CODE_GUIDE_LASTMOD);
  assert.equal(article.image, html.match(/<meta property="og:image" content="([^"]+)"/)[1]);

  const questions = [...main(html).matchAll(/<span class="faq-question">([^<]+)<\/span>/g)].map(([, question]) => text(question).trim());
  assert.deepEqual(questions, FAQS);
  assert.deepEqual(nodes.find((node) => node["@type"] === "FAQPage").mainEntity.map((item) => item.name), questions);

  const table = tableAfter(html, "claude-code-table");
  const list = nodes.find((node) => node["@type"] === "ItemList");
  assert.equal(list.name, "Ways to dictate into Claude Code and Cursor on a Mac");
  assert.deepEqual(list.itemListElement.map((item) => item.name), OPTIONS);
  const speechCells = rows(table).slice(1).map((row) => text(row[3]).trim());
  list.itemListElement.forEach((item, index) => {
    assert.ok(typeof item.description === "string" && item.description.length > 0, item.name);
    assert.equal(item.description, speechCells[index], `${item.name}: description is the "Speech processed on the Mac?" cell`);
  });
});

test("the page date, sitemap and llms.txt agree", () => {
  const html = page();
  assert.ok(between(html, '<p class="doc-meta">', "</p>").includes(`<time datetime="${CLAUDE_CODE_GUIDE_LASTMOD}">`));
  const lastmod = CLAUDE_CODE_GUIDE_LASTMOD > PRICING_LASTMOD ? CLAUDE_CODE_GUIDE_LASTMOD : PRICING_LASTMOD;
  assert.match(read("sitemap.xml"), new RegExp(`<loc>${url.replaceAll(".", "\\.")}</loc>\\s*<lastmod>${lastmod}</lastmod>`));
  const llms = read("llms.txt");
  assert.ok(llms.includes(`[${copy.navLabel}](${url})`));
  assert.ok(llms.includes(`How can I dictate prompts into Claude Code or Cursor on a Mac? → [${copy.navLabel}](${url})`));
  assert.ok(!read("de/llms.txt").includes(url), "English only");
});

test("downloads carry the guide's attribution", () => {
  const html = page();
  const intro = html.match(/<section[^>]*data-guide-intro[^>]*>[\s\S]*?<\/section>/)[0];
  const introContents = [...intro.matchAll(/data-download-content="([^"]+)"/g)].map(([, content]) => content);
  assert.deepEqual(introContents, hasWindowsRelease ? ["claude_code_guide_intro_mac", "claude_code_guide_intro_windows"] : ["claude_code_guide_intro_mac"]);
  assert.ok(intro.includes("utm_content=claude_code_guide_intro_mac"));
  const trial = html.match(/<section[^>]*data-guide-trial[^>]*>[\s\S]*?<\/section>/)[0];
  assert.deepEqual([...trial.matchAll(/data-download-content="([^"]+)"/g)].map(([, content]) => content), ["claude_code_guide_mac"]);
  assert.ok(trial.includes("utm_content=claude_code_guide_mac"));
});

test("related pages and dated references", () => {
  const related = between(page(), 'id="claude-code-related"', "</section>");
  for (const href of [
    "https://dictivo.app/guides/offline-dictation-on-mac/",
    "https://dictivo.app/guides/best-speech-to-text-apps-for-mac/",
    "https://dictivo.app/guides/mac-dictation-app-no-subscription/",
    "https://dictivo.app/guides/dictation-app-mac-windows-one-time-license/",
    "https://dictivo.app/guides/first-local-dictation/",
    "https://dictivo.app/guides/mac-dictation-shortcut/",
    "https://dictivo.app/privacy/where-dictation-audio-goes/",
  ]) {
    assert.ok(related.includes(`<a href="${href}">`), href);
  }
  assert.ok(!related.includes("offline-dictation-on-windows"), "the Windows guide is not linked");
  const references = between(page(), 'id="claude-code-references"', "</section>");
  for (const href of [DOCS.claudeCode, DOCS.cursor]) {
    const link = references.match(new RegExp(`<li><a href="${href.replace(/[.]/g, "\\.")}">([^<]+)</a></li>`));
    assert.ok(link, href);
    assert.ok(link[1].includes(`(checked ${CLAUDE_CODE_GUIDE_CHECKED})`), `${href} is not dated`);
  }
  for (const href of ["https://github.com/deepviewsdev/homebrew-tap", "https://dictivo.app/privacy/where-dictation-audio-goes/", "https://superwhisper.com/"]) {
    assert.ok(CLAUDE_CODE_GUIDE_REFERENCES.some(([, link]) => link === href), href);
    assert.ok(references.includes(`<a href="${href}">`), href);
  }
});
