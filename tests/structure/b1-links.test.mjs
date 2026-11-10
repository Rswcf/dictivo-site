import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

// Batch B1 adds three English answer guides. The English footer and the English compare hub link
// them; other languages do not. Every link in the five B1 related tables, and every /guides/ link on
// the five pages, lands on a built page.
const dist = new URL("../../dist/", import.meta.url).pathname;
const read = (path) => readFileSync(`${dist}${path}`, "utf8");
const main = (html) => html.split("<main")[1].split("</main>")[0];
const footer = (html) => html.split("<footer")[1].split("</footer>")[0];

const NEW_PAGES = [
  "/guides/dictation-app-mac-windows-one-time-license/",
  "/guides/mac-dictation-app-no-subscription/",
  "/guides/dictate-into-claude-code-and-cursor-on-mac/",
];
const B1_PAGES = [
  ["/guides/offline-dictation-on-mac/", "offline-guide"],
  ["/guides/best-speech-to-text-apps-for-mac/", "speech-to-text-mac"],
  ["/guides/dictation-app-mac-windows-one-time-license/", "one-time-license"],
  ["/guides/mac-dictation-app-no-subscription/", "no-subscription"],
  ["/guides/dictate-into-claude-code-and-cursor-on-mac/", "claude-code"],
];

// "/guides/x/#id" or "https://dictivo.app/guides/x/" -> the dist file that serves it.
function builtFile(href) {
  const path = href.replace(/^https:\/\/dictivo\.app/, "").split("#")[0].split("?")[0];
  if (!path.startsWith("/")) return null;
  return `${dist}${path.slice(1)}${path.endsWith("/") ? "index.html" : ""}`;
}

test("the English footer links the three new guides in order; the German footer links none", () => {
  for (const path of ["index.html", "pricing/index.html", "guides/offline-dictation-on-windows/index.html"]) {
    const links = footer(read(path));
    const positions = NEW_PAGES.map((page) => links.indexOf(`href="${page}"`));
    assert.ok(positions.every((at) => at >= 0), `${path}: footer misses a new guide (${positions})`);
    assert.deepEqual([...positions].sort((a, b) => a - b), positions, `${path}: footer order`);
    assert.ok(links.indexOf('href="/guides/best-speech-to-text-apps-for-mac/"') < positions[0], `${path}: new links follow the speech guide`);
  }
  for (const path of ["de/index.html", "ja/index.html"]) {
    const links = footer(read(path));
    // An exact href: /ja/guides/mac-dictation-app-no-subscription/ contains the English path.
    for (const page of NEW_PAGES) assert.ok(!links.includes(`href="${page}"`), `${path}: footer links ${page}`);
  }
});

test("the English compare hub links the one-time license guide under its introduction", () => {
  const en = main(read("compare/index.html"));
  const hero = en.split("</section>")[0];
  assert.ok(hero.includes('href="/guides/best-dictation-software/"'));
  assert.ok(hero.includes(`href="${NEW_PAGES[0]}"`), "hero misses the one-time license link");
  assert.ok(hero.indexOf('href="/guides/best-dictation-software/"') < hero.indexOf(`href="${NEW_PAGES[0]}"`));
  assert.ok(!main(read("de/compare/index.html")).includes(NEW_PAGES[0]));
});

test("every link in the five B1 related tables resolves to a built page", () => {
  for (const [page, prefix] of B1_PAGES) {
    const body = main(read(`${page.slice(1)}index.html`));
    const section = body.split(`aria-labelledby="${prefix}-related"`)[1]?.split("</section>")[0];
    assert.ok(section, `${page}: no related table`);
    const hrefs = [...section.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
    assert.ok(hrefs.length >= 3, `${page}: only ${hrefs.length} related links`);
    for (const href of hrefs) {
      const file = builtFile(href);
      assert.ok(file && existsSync(file), `${page}: related link ${href} has no built page`);
    }
  }
  const related = (page, prefix) => main(read(`${page.slice(1)}index.html`)).split(`aria-labelledby="${prefix}-related"`)[1].split("</section>")[0];
  assert.ok(related(...B1_PAGES[2]).includes(`https://dictivo.app${NEW_PAGES[1]}`), "the one-time license guide links the no-subscription guide");
});

test("every /guides/ link on the five B1 pages resolves to a built page", () => {
  for (const [page] of B1_PAGES) {
    const html = read(`${page.slice(1)}index.html`);
    const hrefs = [...html.matchAll(/href="((?:https:\/\/dictivo\.app)?\/(?:[a-z-]+\/)?guides\/[^"]*)"/g)].map((m) => m[1]);
    assert.ok(hrefs.length > 0, page);
    for (const href of hrefs) {
      const file = builtFile(href);
      assert.ok(file && existsSync(file), `${page}: ${href} has no built page`);
    }
  }
});
