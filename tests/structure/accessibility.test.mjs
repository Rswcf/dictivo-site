import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import vm from "node:vm";
import { LOCALES } from "../../data/site-content.mjs";

// Keyboard and screen-reader fixes from the 2026-11-03 site review. They read only dist/.
const dist = new URL("../../dist/", import.meta.url).pathname;
const files = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? files(path) : [path];
});
const read = (path) => readFileSync(join(dist, path), "utf8");
const homes = LOCALES.map((locale) => (locale.code === "en" ? "index.html" : `${locale.code}/index.html`));

test("each homepage skip link jumps to the start of <main>, not past the page to the downloads", () => {
  for (const home of homes) {
    const html = read(home);
    assert.match(html, /<a class="skip-link" href="#main">/, home);
    assert.match(html, /<main id="main">/, home);
  }
  assert.match(read("404.html"), /<a class="skip-link" href="#not-found">/);
});

test("the Mac advisor selects have names, take their label from <label>, and announce only the summary", () => {
  const pages = files(dist).filter((path) => path.endsWith(".html")).map((path) => relative(dist, path))
    .filter((path) => read(path).includes("data-mac-advisor"));
  assert.ok(pages.length >= 11, `${pages.length} pages with the advisor`);
  for (const page of pages) {
    const html = read(page);
    assert.match(html, /<select name="mac-family" data-mac-family>/, page);
    assert.match(html, /<select name="mac-memory" data-mac-memory>/, page);
    assert.equal([...html.matchAll(/aria-live=/g)].length, 1, `${page}: one live region`);
    assert.match(html, /<p data-mac-summary aria-live="polite">/, page);
  }
});

test("a table wrapper becomes a named, focusable region only while it scrolls", () => {
  const script = readFileSync(new URL("../../assets/site.js", import.meta.url), "utf8");
  const start = script.indexOf("\nfunction initTableScroll(");
  assert.ok(start >= 0, "site.js must define a top-level function initTableScroll(wrap)");
  let observed;
  const context = vm.createContext({ window: { ResizeObserver: true }, ResizeObserver: class { constructor(fn) { observed = fn; } observe() {} } });
  vm.runInContext(script.slice(start, script.indexOf("\n}\n", start) + 3), context);
  const attributes = new Map();
  const wrap = {
    scrollWidth: 900, clientWidth: 360,
    querySelector: () => ({ textContent: " Dictivo compared with Dragon " }),
    set tabIndex(value) { attributes.set("tabindex", String(value)); },
    setAttribute: (name, value) => attributes.set(name, value),
    removeAttribute: (name) => attributes.delete(name),
  };
  context.initTableScroll(wrap);
  assert.deepEqual(Object.fromEntries(attributes), { tabindex: "0", role: "region", "aria-label": "Dictivo compared with Dragon" });
  wrap.clientWidth = 1200;
  observed();
  assert.deepEqual(Object.fromEntries(attributes), {}, "a table that fits is not a tab stop");
});
