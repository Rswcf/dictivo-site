import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LOCALES } from "../../data/site-content.mjs";
import { FILM_COPY, PRODUCT_FILM } from "../../data/product-film.mjs";
import { html as escape } from "../../scripts/lib/html.mjs";

// Homepage layout from the 2026-11-03 simplification (P2). It reads only dist/.
const dist = new URL("../../dist/", import.meta.url).pathname;
const read = (path) => readFileSync(join(dist, path), "utf8");
const homes = LOCALES.map((locale) => (locale.code === "en" ? "index.html" : `${locale.code}/index.html`));

test("Cloud Fast is one column of the privacy section and keeps the #cloud-fast anchor", () => {
  for (const home of homes) {
    const html = read(home);
    assert.equal((html.match(/id="cloud-fast"/g) || []).length, 1, home);
    assert.match(html, /<article class="trust-column trust-column--network" id="cloud-fast">/, home);
    assert.doesNotMatch(html, /class="cloud-comparison"/, home);
    assert.doesNotMatch(html, /<nav[\s\S]*?href="#cloud-fast"[\s\S]*?<\/nav>/, `${home}: no header nav item`);
  }
});

test("the hero Windows install help starts hidden; site.js shows it to Windows visitors", () => {
  for (const home of homes) {
    const hero = read(home).match(/<section class="hero[\s\S]*?<\/section>/)[0];
    const links = hero.match(/<a\b[^>]*data-windows-install-help[^>]*>/g) || [];
    assert.ok(links.length > 0, home);
    for (const link of links) assert.match(link, /\shidden\b/, home);
  }
  const script = readFileSync(new URL("../../assets/site.js", import.meta.url), "utf8");
  assert.match(script, /visitorPlatform === "windows"[\s\S]{0,120}\[data-windows-install-help\]\[hidden\]/);
});

// 2026-11-12: the homepage film lost its caption (watch link and credit) and the hero its
// first-sentence link. /demo/ keeps the disclosure: real screen recordings, AI-generated voice and
// music, and a link to the film credits. The CC BY 4.0 / VCTK credit of the old film is gone.
test("the hero has no eyebrow, no first-sentence link and no film caption", () => {
  for (const home of homes) {
    const html = read(home);
    const hero = html.match(/<section class="hero[\s\S]*?<\/section>/)[0];
    assert.doesNotMatch(hero, /class="eyebrow"/, home);
    assert.doesNotMatch(hero, /class="first-dictation-link"/, home);
    const figure = hero.match(/<figure class="hero-film" id="demo-video">[\s\S]*?<\/figure>/)?.[0];
    assert.ok(figure, `${home}: hero film missing`);
    assert.doesNotMatch(figure, /<figcaption/, home);
    assert.doesNotMatch(html, /CC BY|VCTK/, home);
  }
});

test("/demo/ keeps the film disclosure and the link to the film credits", () => {
  const html = read("demo/index.html");
  const figure = html.match(/<figure class="hero-film film-watch">[\s\S]*?<\/figure>/)?.[0] ?? "";
  const caption = figure.match(/<figcaption>([\s\S]*?)<\/figcaption>/)?.[1] ?? "";
  assert.ok(caption.includes(`<a href="${PRODUCT_FILM.credits}">${escape(FILM_COPY.en.credit)}</a>`), caption);
  assert.match(FILM_COPY.en.credit, /\bAI-generated voice and music\b/);
  assert.doesNotMatch(html, /CC BY|VCTK/);
});

test("the privacy, pricing and download sections carry no introductions or explanatory notes", () => {
  for (const home of homes) {
    const html = read(home);
    const section = (id) => html.match(new RegExp(`<section\\b[^>]*\\bid="${id}"[\\s\\S]*?<\\/section>`))[0];
    const privacy = section("privacy");
    assert.match(privacy, /<h2 id="privacy-title">[^<]*<\/h2>\s*<\/div>/, `${home}: privacy heading stands alone`);
    assert.doesNotMatch(privacy, /trust-column-lede/, home);
    const columns = [...privacy.matchAll(/<ul class="trust-list[^"]*">([\s\S]*?)<\/ul>/g)].map((match) => (match[1].match(/<li>/g) || []).length);
    assert.deepEqual(columns, [3, 3], `${home}: bullets per privacy column`);
    assert.equal((section("pricing").match(/class="pricing-footnote"/g) || []).length, 1, home);
    const downloads = section("downloads");
    assert.match(downloads, /<h2 id="downloads-title">[^<]*<\/h2>\s*<\/div>/, `${home}: downloads heading stands alone`);
    const mac = downloads.match(/<article class="download-card" data-platform-card="macos">([\s\S]*?)<\/article>/)[1];
    const macBody = mac.match(/<\/h3>\s*<p>([^<]*)<\/p>/)?.[1] ?? "";
    assert.equal(macBody.split(/[.。](?:\s|$)|。/).filter((part) => part.trim()).length, 1, `${home}: Mac card body "${macBody}"`);
    const windows = downloads.match(/<article class="download-card" data-platform-card="windows">([\s\S]*?)<\/article>/)?.[1];
    if (windows) assert.match(windows, /<\/h3>\s*<div class="download-actions">/, `${home}: Windows card body paragraph`);
  }
});

test("the footer groups its links into three columns and drops the tagline", () => {
  for (const home of homes) {
    const footer = read(home).match(/<footer[\s\S]*?<\/footer>/)[0];
    assert.equal((footer.match(/class="footer-column"/g) || []).length, 3, home);
    assert.doesNotMatch(footer, /footer-tagline|footer-beta/, home);
  }
});

// 2026-11-04: workflow, Mac advisor, trust strip, comparison cards, language list and FAQ left the
// homepage. The advisor lives on /mac-model-guide/, comparisons and languages in the footer and header.
test("the homepage has four sections and no FAQPage node", () => {
  for (const home of homes) {
    const html = read(home);
    const main = html.match(/<main[\s\S]*?<\/main>/)[0];
    const ids = [...main.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.deepEqual(ids, ["demo", "privacy", "pricing", "downloads"], home);
    assert.doesNotMatch(html, /"FAQPage"/, home);
  }
});
