import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Pages added since the 2026-10-08 audit, which found 118 of 237 titles or descriptions
// outside these limits. New pages are held to them by test.
const PAGES = [
  ["pricing/index.html", "https://dictivo.app/pricing/", "en"],
  ["guides/mac-dictation-not-working/index.html", "https://dictivo.app/guides/mac-dictation-not-working/", "en"],
  ["guides/mac-dictation-shortcut/index.html", "https://dictivo.app/guides/mac-dictation-shortcut/", "en"],
  ["guides/dragon-pricing/index.html", "https://dictivo.app/guides/dragon-pricing/", "en"],
  ["guides/wispr-flow-pricing/index.html", "https://dictivo.app/guides/wispr-flow-pricing/", "en"],
  ["guides/windows-voice-typing-not-working/index.html", "https://dictivo.app/guides/windows-voice-typing-not-working/", "en"],
  ["guides/best-dictation-software/index.html", "https://dictivo.app/guides/best-dictation-software/", "en"],
  ["ja/guides/mac-dictation-shortcut/index.html", "https://dictivo.app/ja/guides/mac-dictation-shortcut/", "ja"],
];

// Characters, as JavaScript counts them. Japanese search results show about 30 full-width
// characters of a title and 80-120 of a description, so Japanese gets its own range.
const LIMITS = {
  en: { title: [1, 60], description: [120, 160] },
  de: { title: [1, 60], description: [120, 160] },
  ja: { title: [1, 32], description: [70, 120] },
};

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
const meta = (html, pattern) => decode(html.match(pattern)?.[1] ?? "");

test("new pages keep titles and descriptions within search-result limits and free of prices", () => {
  for (const [path, url, locale] of PAGES) {
    const html = read(path);
    const title = meta(html, /<title>([^<]*)<\/title>/);
    const description = meta(html, /<meta name="description" content="([^"]*)"/);
    const limits = LIMITS[locale];
    assert.ok(title.length >= limits.title[0] && title.length <= limits.title[1], `${path}: title is ${title.length} characters: ${title}`);
    assert.ok(description.length >= limits.description[0] && description.length <= limits.description[1], `${path}: description is ${description.length} characters`);
    for (const text of [title, description]) assert.doesNotMatch(text, /\$|US\$/, `${path}: ${text}`);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${path}: one h1`);
    assert.equal(meta(html, /<meta property="og:title" content="([^"]*)"/), title, `${path}: og:title`);
    assert.equal(meta(html, /<meta property="og:description" content="([^"]*)"/), description, `${path}: og:description`);
    assert.equal(meta(html, /<link rel="canonical" href="([^"]*)"/), url, `${path}: canonical`);
    assert.equal(meta(html, /<meta property="og:url" content="([^"]*)"/), url, `${path}: og:url`);
  }
});
