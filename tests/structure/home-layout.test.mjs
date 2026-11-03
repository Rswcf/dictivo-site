import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LOCALES } from "../../data/site-content.mjs";

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

test("the hero has no eyebrow and the film caption keeps only the watch link and the credit", () => {
  for (const home of homes) {
    const html = read(home);
    const hero = html.match(/<section class="hero[\s\S]*?<\/section>/)[0];
    assert.doesNotMatch(hero, /class="eyebrow"/, home);
    assert.match(html, /<figcaption><a href="\/demo\/">[^<]+<\/a><br><a href="[^"]+CREDITS\.txt">[^<]*CC BY 4\.0<\/a><\/figcaption>/, home);
  }
});

test("the footer groups its links into three columns and drops the tagline", () => {
  for (const home of homes) {
    const footer = read(home).match(/<footer[\s\S]*?<\/footer>/)[0];
    assert.equal((footer.match(/class="footer-column"/g) || []).length, 3, home);
    assert.doesNotMatch(footer, /footer-tagline|footer-beta/, home);
  }
});
