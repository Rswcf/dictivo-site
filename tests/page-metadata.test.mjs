import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Pages added since the 2026-10-08 audit, which found 118 of 237 titles or descriptions
// outside these limits. New pages are held to them by test.
const PAGES = [
  ["pricing/index.html", "https://dictivo.app/pricing/"],
  ["guides/mac-dictation-not-working/index.html", "https://dictivo.app/guides/mac-dictation-not-working/"],
  ["guides/mac-dictation-shortcut/index.html", "https://dictivo.app/guides/mac-dictation-shortcut/"],
];

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
const meta = (html, pattern) => decode(html.match(pattern)?.[1] ?? "");

test("new pages keep titles and descriptions within search-result limits and free of prices", () => {
  for (const [path, url] of PAGES) {
    const html = read(path);
    const title = meta(html, /<title>([^<]*)<\/title>/);
    const description = meta(html, /<meta name="description" content="([^"]*)"/);
    assert.ok(title.length > 0 && title.length <= 60, `${path}: title is ${title.length} characters: ${title}`);
    assert.ok(description.length >= 120 && description.length <= 160, `${path}: description is ${description.length} characters`);
    for (const text of [title, description]) assert.doesNotMatch(text, /\$|US\$/, `${path}: ${text}`);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${path}: one h1`);
    assert.equal(meta(html, /<meta property="og:title" content="([^"]*)"/), title, `${path}: og:title`);
    assert.equal(meta(html, /<meta property="og:description" content="([^"]*)"/), description, `${path}: og:description`);
    assert.equal(meta(html, /<link rel="canonical" href="([^"]*)"/), url, `${path}: canonical`);
    assert.equal(meta(html, /<meta property="og:url" content="([^"]*)"/), url, `${path}: og:url`);
  }
});
