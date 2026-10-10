import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import vm from "node:vm";
import { LOCALES } from "../data/site-content.mjs";
import { toHant } from "../scripts/lib/hant.mjs";

// At 880 px and below site.css hides .nav-links. Until 2026-10-10 nothing opened them again, so a
// phone header showed only the language menu and Downloads (a site scanner's cold email said so).
// Each header now carries a menu button (WAI-ARIA disclosure: aria-controls, aria-expanded) that
// assets/site.js reveals and wires up.
const dist = new URL("../dist/", import.meta.url).pathname;
const files = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? files(path) : [path];
});
const pages = files(dist).filter((path) => path.endsWith(".html")).map((path) => ({ path: relative(dist, path), html: readFileSync(path, "utf8") }));
const MENU = { en: "Menu", de: "Menü", fr: "Menu", es: "Menú", it: "Menu", nl: "Menu", pt: "Menu", zh: "菜单", "zh-hant": toHant("菜单"), ja: "メニュー", ko: "메뉴" };
const codeForLang = Object.fromEntries(LOCALES.map((locale) => [locale.htmlLang, locale.code]));
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([a-z-]+)(?:="([^"]*)")?/g)].slice(1).map(([, name, value]) => [name, value ?? ""]));

test("every page header has a hidden menu button that controls its navigation", () => {
  const withHeader = pages.filter((page) => page.html.includes('class="site-header"'));
  assert.ok(withHeader.length > 100, `only ${withHeader.length} pages with a header`);
  for (const { path, html } of withHeader) {
    const header = /<header class="site-header"[\s\S]*?<\/header>/.exec(html)[0];
    const nav = /<nav class="nav-links"[^>]*>/.exec(header)?.[0];
    assert.ok(nav, `${path}: no .nav-links`);
    const id = attrs(nav).id;
    assert.ok(id, `${path}: .nav-links needs an id`);
    const buttons = [...header.matchAll(/<button class="nav-toggle"[^>]*>/g)].map(([tag]) => attrs(tag));
    assert.equal(buttons.length, 1, `${path}: menu buttons`);
    const [button] = buttons;
    assert.equal(button.type, "button", path);
    assert.equal(button["aria-controls"], id, `${path}: aria-controls`);
    assert.equal(button["aria-expanded"], "false", `${path}: aria-expanded`);
    assert.ok("hidden" in button, `${path}: the button stays hidden until site.js wires it up`);
    const code = codeForLang[/<html lang="([^"]+)"/.exec(html)?.[1]];
    assert.ok(code, `${path}: unknown page language`);
    assert.equal(button["aria-label"], MENU[code], `${path}: menu label for ${code}`);
  }
});

function cssBlock(css, opener) {
  const start = css.indexOf(opener);
  assert.ok(start >= 0, `site.css: ${opener} missing`);
  let depth = 0;
  for (let at = css.indexOf("{", start); at < css.length; at += 1) {
    if (css[at] === "{") depth += 1;
    if (css[at] === "}" && --depth === 0) return css.slice(start, at + 1);
  }
  throw new Error(`site.css: ${opener} is not closed`);
}
const rule = (css, selector) => new RegExp(`(^|\\n)\\s*${selector.replace(/[.[\]()]/g, "\\$&")}\\s*\\{([^}]*)\\}`).exec(css)?.[2] ?? "";

test("site.css shows the menu button and the open panel only at phone widths", () => {
  const css = readFileSync(new URL("../assets/site.css", import.meta.url), "utf8");
  assert.match(rule(css, ".nav-toggle"), /display:\s*none/, "the button is hidden on wide screens");
  const phone = cssBlock(css, "@media (max-width: 880px)");
  assert.match(phone, /\.nav-links\s*\{\s*display:\s*none/, "the links stay hidden until opened");
  assert.match(rule(phone, ".nav-toggle:not([hidden])"), /display:\s*inline-flex/);
  assert.match(rule(phone, ".site-header.is-nav-open .nav-links"), /display:\s*grid/);
  // Measured with every locale's labels (2026-10-10): French needs 441 px with the wordmark and
  // 375 px with the language name; below that the header would overflow.
  assert.match(rule(cssBlock(css, "@media (max-width: 440px)"), ".brand-name"), /display:\s*none/);
  assert.match(rule(cssBlock(css, "@media (max-width: 374px)"), ".language-menu summary strong"), /display:\s*none/);
});

// Run initSiteNav from site.js against a minimal stand-in for the header.
function runInitSiteNav(header, documentStub) {
  const script = readFileSync(new URL("../assets/site.js", import.meta.url), "utf8");
  const start = script.indexOf("\nfunction initSiteNav(");
  assert.ok(start >= 0, "site.js must define a top-level function initSiteNav(header)");
  const context = vm.createContext({ document: documentStub });
  vm.runInContext(script.slice(start, script.indexOf("\n}\n", start) + 3), context);
  context.initSiteNav(header);
}

function fakeHeader() {
  const on = (target) => (type, fn) => { (target.listeners[type] ??= []).push(fn); };
  const fire = (target, type, event = {}) => (target.listeners[type] ?? []).forEach((fn) => fn(event));
  const classes = new Set();
  const toggle = { hidden: true, focused: false, listeners: {}, attributes: { "aria-expanded": "false" } };
  toggle.addEventListener = on(toggle);
  toggle.getAttribute = (name) => toggle.attributes[name];
  toggle.setAttribute = (name, value) => { toggle.attributes[name] = String(value); };
  toggle.focus = () => { toggle.focused = true; };
  const link = { closest: (selector) => (selector === "a" ? link : null) };
  const nav = { listeners: {} };
  nav.addEventListener = on(nav);
  const languageMenu = { open: false, listeners: {} };
  languageMenu.addEventListener = on(languageMenu);
  const inside = new Set([toggle, nav, link, languageMenu]);
  const header = {
    classList: { contains: (name) => classes.has(name), toggle: (name, force) => (force ? classes.add(name) : classes.delete(name)) },
    contains: (node) => inside.has(node),
    querySelector: (selector) => ({ ".nav-toggle": toggle, ".nav-links": nav, ".language-menu": languageMenu })[selector] ?? null,
  };
  const documentStub = { listeners: {} };
  documentStub.addEventListener = on(documentStub);
  const isOpen = () => {
    const expanded = toggle.attributes["aria-expanded"];
    assert.equal(classes.has("is-nav-open"), expanded === "true", "the header class and aria-expanded disagree");
    return expanded === "true";
  };
  return { header, documentStub, toggle, nav, link, languageMenu, fire, isOpen };
}

test("the menu button opens and closes the navigation and reports its state", () => {
  const h = fakeHeader();
  runInitSiteNav(h.header, h.documentStub);
  assert.equal(h.toggle.hidden, false, "site.js shows the button");
  assert.equal(h.isOpen(), false);
  h.fire(h.toggle, "click");
  assert.equal(h.isOpen(), true);
  h.fire(h.toggle, "click");
  assert.equal(h.isOpen(), false);
});

test("Escape, a click outside the header and a chosen link close the menu", () => {
  const h = fakeHeader();
  runInitSiteNav(h.header, h.documentStub);

  h.fire(h.toggle, "click");
  h.fire(h.documentStub, "keydown", { key: "Escape" });
  assert.equal(h.isOpen(), false);
  assert.equal(h.toggle.focused, true, "Escape returns focus to the button");

  h.fire(h.toggle, "click");
  h.fire(h.documentStub, "click", { target: h.link });
  assert.equal(h.isOpen(), true, "a click inside the header keeps it open");
  h.fire(h.documentStub, "click", { target: {} });
  assert.equal(h.isOpen(), false);

  h.fire(h.toggle, "click");
  h.fire(h.nav, "click", { target: h.link });
  assert.equal(h.isOpen(), false, "a same-page link such as /#privacy closes the menu");

  h.toggle.focused = false;
  h.fire(h.documentStub, "keydown", { key: "Escape" });
  assert.equal(h.toggle.focused, false, "Escape does nothing while the menu is closed");
});

test("the menu and the language menu never stay open together", () => {
  const h = fakeHeader();
  runInitSiteNav(h.header, h.documentStub);
  h.languageMenu.open = true;
  h.fire(h.toggle, "click");
  assert.equal(h.isOpen(), true);
  assert.equal(h.languageMenu.open, false, "opening the menu closes the language menu");
  h.languageMenu.open = true;
  h.fire(h.languageMenu, "toggle");
  assert.equal(h.isOpen(), false, "opening the language menu closes the menu");
});
