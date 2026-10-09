import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { firstPublished } from "../data/first-published.mjs";
import { WINDOWS_VOICE_TYPING_CHECKED, WINDOWS_VOICE_TYPING_LASTMOD, windowsVoiceTypingCopy } from "../data/windows-voice-typing-guide.mjs";

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
const path = "/guides/windows-voice-typing-not-working/";
const url = `https://dictivo.app${path}`;
const page = () => read(`${path.slice(1)}index.html`);
const release = JSON.parse(readFileSync(new URL("../data/release.json", import.meta.url), "utf8"));
const hasWindowsRelease = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, body]) => [JSON.parse(body)].flat());
const alternates = (html) => [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]);
const between = (html, from, to) => html.slice(html.indexOf(from), html.indexOf(to, html.indexOf(from)));
const footer = (html) => html.slice(html.lastIndexOf('<footer class="site-footer"'));
const main = (html) => html.split("<main")[1].split("</main>")[0];
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/\s+/g, " ");
const SECTIONS = 10;

test("the Windows voice typing guide is a self-canonical English-only page", () => {
  const html = page();
  assert.ok(html.includes('<html lang="en">'));
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.ok(html.includes("<h1>Windows voice typing not working: what to check, by symptom</h1>"));
  assert.ok(html.includes("<title>Windows Voice Typing Not Working? Fixes by Symptom (Win+H)</title>"));
  assert.ok(html.includes(`<link rel="canonical" href="${url}" />`));
  assert.deepEqual(alternates(html), [["en", url], ["x-default", url]]);
});

test("the answer comes first, then the symptom table, contents, sections, Dictivo, trial, FAQ and references", () => {
  const html = page();
  const order = [
    'id="windows-voice-typing-answer"',
    'id="windows-voice-typing-quick-reference"',
    "<nav aria-label=",
    ...Array.from({ length: SECTIONS }, (_, index) => `id="windows-voice-typing-section-${index + 1}"`),
    ...(hasWindowsRelease ? ['id="windows-voice-typing-dictivo"', "data-guide-trial"] : []),
    'id="windows-voice-typing-faq"',
    'id="windows-voice-typing-references"',
  ];
  const positions = order.map((marker) => [marker, html.indexOf(marker)]);
  for (const [marker, position] of positions) assert.ok(position > 0, `missing ${marker}`);
  for (let index = 1; index < positions.length; index++) {
    assert.ok(positions[index - 1][1] < positions[index][1], `${positions[index - 1][0]} before ${positions[index][0]}`);
  }
  const rows = between(html, 'id="windows-voice-typing-quick-reference"', "</table>").split("<tbody>")[1].split("<tr>").slice(1);
  assert.equal(rows.length, SECTIONS - 1, "one quick-reference row per symptom");
  for (const row of rows) assert.equal((row.match(/<t[hd][\s>]/g) || []).length, 3, row);
});

test("the answer and the sections follow Microsoft's documents, and nothing Microsoft does not suggest", () => {
  const html = page();
  const answer = text(between(html, 'id="windows-voice-typing-answer"', "</section>"));
  for (const fact of ["Online speech recognition", "Settings > Privacy & security > Microphone", "Settings > System > Sound > Input", "Windows logo key + Spacebar"]) {
    assert.ok(answer.includes(fact), fact);
  }
  const offline = text(between(html, `id="windows-voice-typing-section-${SECTIONS}"`, "</section>"));
  for (const fact of ["Azure Speech", "Voice access can", "Dictation mode", "22H2", "Fluid dictation does not make voice typing an offline feature"]) {
    assert.ok(offline.includes(fact), fact);
  }
  assert.ok(between(html, `id="windows-voice-typing-section-${SECTIONS}"`, "</section>").includes('href="/guides/offline-dictation-on-windows/"'));
  assert.ok(text(html).includes("Turn off Windows Key hotkeys"));
  assert.ok(text(html).includes("Allow users to enable online speech recognition services"));
  assert.ok(text(html).includes("Voice typing needs access to your microphone. You'll need to turn this on in settings to use speech to text."));
  assert.doesNotMatch(text(main(html)), /\bsfc\b|DISM|regedit|registry|reinstall Windows|Reset this PC|types directly|types into|inserts text|accura/i);
  assert.doesNotMatch(html, /FILL_IN|TODO|undefined|\{\{price\.|<span class="price">|launch price/);
});

test("Dictivo appears only in its disclosed section and the trial panel, and only while Windows downloads are public", () => {
  const html = page();
  const sections = between(html, 'id="windows-voice-typing-answer"', 'id="windows-voice-typing-faq"').split(/id="windows-voice-typing-dictivo"/)[0];
  assert.ok(!sections.includes("Dictivo"), "the Microsoft sections do not name Dictivo");
  assert.ok(!between(html, 'id="windows-voice-typing-faq"', "</section>").includes("Dictivo"), "the FAQ does not name Dictivo");
  assert.equal(html.includes('id="windows-voice-typing-dictivo"'), hasWindowsRelease);
  assert.equal(html.includes("data-guide-trial"), hasWindowsRelease);
  assert.equal(html.includes("Ctrl+Shift+Space"), hasWindowsRelease);
  if (hasWindowsRelease) {
    const dictivo = between(html, 'id="windows-voice-typing-dictivo"', "</section>");
    assert.match(dictivo, /<p>Dictivo is this site(&#39;|')s product\./);
    assert.ok(dictivo.includes("pastes the text into the app you are using"));
    assert.ok(dictivo.includes('href="/pricing/"'));
    assert.ok(html.includes("utm_content=troubleshooting_windows"));
    assert.ok(html.includes('data-platform="windows"'));
  }
  // While Windows downloads are off, the copy names no Dictivo Windows download at all.
  const off = windowsVoiceTypingCopy({ windows: false, offlineGuidePath: "/guides/offline-dictation-on-windows/" });
  assert.equal(off.dictivo, null);
  assert.doesNotMatch(JSON.stringify(off), /Dictivo|Download for Windows|Windows x64/);
});

test("every reference is a Microsoft Support or Microsoft Learn page with its check date", () => {
  const references = [...between(page(), 'id="windows-voice-typing-references"', "</ul>").matchAll(/<li><a href="([^"]+)">([^<]+)<\/a><\/li>/g)];
  assert.equal(references.length, 12);
  for (const [, href, label] of references) {
    assert.ok(["support.microsoft.com", "learn.microsoft.com"].includes(new URL(href).hostname), href);
    assert.ok(label.endsWith(`(checked ${WINDOWS_VOICE_TYPING_CHECKED})`), label);
  }
});

test("the Windows voice typing guide is a TechArticle with an image and no FAQ schema", () => {
  const html = page();
  const ld = jsonLd(html);
  const article = ld.find((node) => node["@type"] === "TechArticle");
  assert.equal(article.inLanguage, "en");
  assert.equal(article.headline, "Windows Voice Typing Not Working? Fixes by Symptom (Win+H)");
  assert.equal(article.image, html.match(/<meta property="og:image" content="([^"]+)"/)[1]);
  assert.deepEqual(article.author, { "@type": "Organization", "@id": "https://dictivo.app/#org", name: "Dictivo", url: "https://dictivo.app/" });
  assert.equal(article.publisher["@id"], "https://dictivo.app/#org");
  assert.equal(article.datePublished, firstPublished("guides/windows-voice-typing-not-working", "en"));
  assert.equal(article.dateModified, WINDOWS_VOICE_TYPING_LASTMOD);
  assert.ok(!ld.some((node) => node["@type"] === "FAQPage"), "no FAQPage");
  assert.equal(ld.find((node) => node["@type"] === "BreadcrumbList").itemListElement[1].item, url);
  assert.ok(html.includes(`<time datetime="${WINDOWS_VOICE_TYPING_LASTMOD}">`));
});

test("readers reach the Windows voice typing guide from the footer, the Windows offline guide and llms.txt", () => {
  assert.ok(footer(read("index.html")).includes(`href="${path}"`), "English footer");
  assert.ok(!read("de/index.html").includes(path), "German homepage");
  const windowsGuide = main(read("guides/offline-dictation-on-windows/index.html"));
  assert.ok(between(windowsGuide, 'id="offline-dictation-windows-section-1"', "</section>").includes(`href="${path}"`), "Voice Access vs Win+H section");
  assert.ok(windowsGuide.includes(`href="${url}"`), "related pages");
  assert.ok(read("llms.txt").includes(url));
  assert.ok(!read("de/llms.txt").includes(url));
  assert.match(read("sitemap.xml"), new RegExp(`<loc>${url.replaceAll(".", "\\.")}</loc>\\s*<lastmod>${WINDOWS_VOICE_TYPING_LASTMOD}</lastmod>`));
});
