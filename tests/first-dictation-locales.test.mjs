import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCALES } from "../data/site-content.mjs";

const read = path => readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
const guidePath = locale => `${locale.path}guides/first-local-dictation/`;

test("every display language has a discoverable practice page with reciprocal alternates", () => {
  const sitemap = read("sitemap.xml");
  for (const locale of LOCALES) {
    const path = guidePath(locale);
    const page = read(`${path.slice(1)}index.html`);
    assert.ok(page.includes(`<html lang="${locale.htmlLang}">`), path);
    assert.ok(page.includes(`<link rel="canonical" href="https://dictivo.app${path}"`), path);
    assert.ok(sitemap.includes(`<loc>https://dictivo.app${path}</loc>`), path);
    for (const other of LOCALES) {
      assert.ok(page.includes(`hreflang="${other.htmlLang}" href="https://dictivo.app${guidePath(other)}"`), `${path} -> ${other.code}`);
    }
    for (const entry of ["", "compare/", "guides/offline-dictation-on-mac/"]) {
      assert.ok(read(`${locale.path.slice(1)}${entry}index.html`).includes(`href="${path}"`), `${locale.code}: missing entry ${entry}`);
    }
  }
});

test("localized practice pages retain labeled input, recovery controls and download attribution", () => {
  for (const locale of LOCALES) {
    const page = read(`${guidePath(locale).slice(1)}index.html`);
    assert.equal((page.match(/<h1>/g) || []).length, 1, locale.code);
    assert.ok(page.includes('for="practice-text"'), locale.code);
    assert.ok(page.includes('aria-describedby="practice-privacy"'), locale.code);
    assert.ok(page.includes('data-practice-clear'), locale.code);
    assert.ok(page.includes('data-cleared-message="') && !page.includes('data-cleared-message=""'), locale.code);
    assert.ok(page.includes('utm_content=first_dictation_mac'), locale.code);
    assert.ok(page.includes('utm_content=first_dictation_windows'), locale.code);
    assert.ok(!page.includes('undefined'), locale.code);
    assert.ok(!page.includes('getUserMedia'), locale.code);
  }
});
