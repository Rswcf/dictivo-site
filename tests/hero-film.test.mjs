import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { LOCALES } from "../data/site-content.mjs";
import { PRODUCT_FILM } from "../data/product-film.mjs";

// The homepage film used to sit in the page as a hidden <video>, and its poster="poster.jpg"
// (74 KB) downloaded on every visit next to the poster <img> the visitor actually sees.
// Lighthouse mobile, local build, 2026-10-10: LCP 2.26 s with it, 1.82 s without it.
// Now the player waits in a <template> until the visitor presses play; <noscript> keeps the
// native player for browsers without JavaScript.
const dist = new URL("../dist/", import.meta.url).pathname;
const homes = LOCALES.map((locale) => (locale.code === "en" ? "index.html" : `${locale.code}/index.html`));
const heroFigure = (html) => /<figure class="hero-film" id="demo-video">([\s\S]*?)<\/figure>/.exec(html)?.[1] ?? "";
const inner = (html, tag) => new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`).exec(html)?.[1].trim() ?? "";

test("each homepage keeps the film player out of the page until play, with a native fallback", () => {
  for (const home of homes) {
    const figure = heroFigure(readFileSync(`${dist}${home}`, "utf8"));
    assert.ok(figure, `${home}: hero film missing`);
    const outside = figure.replace(/<template[\s\S]*?<\/template>/g, "").replace(/<noscript>[\s\S]*?<\/noscript>/g, "");
    assert.doesNotMatch(outside, /<video|<track/, `${home}: a player outside <template> and <noscript> loads its poster and captions`);

    const player = inner(figure, "template");
    assert.equal((player.match(/<video\b/g) || []).length, 1, `${home}: <template> must hold one <video>`);
    const video = /<video\b[^>]*>/.exec(player)[0];
    for (const part of [`src="${PRODUCT_FILM.video}"`, `poster="${PRODUCT_FILM.poster}"`, 'preload="none"', "controls", "playsinline"]) {
      assert.ok(video.includes(part), `${home}: <video> lacks ${part}`);
    }
    assert.ok(player.includes(PRODUCT_FILM.captions), `${home}: captions missing`);
    assert.equal(inner(figure, "noscript"), player, `${home}: the <noscript> player must match the <template> player`);

    const order = ["hero-video-poster", "<template", "<noscript>", "<figcaption"].map((part) => figure.indexOf(part));
    assert.deepEqual([...order].sort((a, b) => a - b), order, `${home}: button, template, noscript, figcaption order`);
    assert.ok(order.every((at) => at >= 0), `${home}: missing part ${order}`);
  }
});

// Run initHeroFilm from site.js against a minimal stand-in for the figure.
function runInitHeroFilm(film) {
  const script = readFileSync(new URL("../assets/site.js", import.meta.url), "utf8");
  const start = script.indexOf("\nfunction initHeroFilm(");
  assert.ok(start >= 0, "site.js must define a top-level function initHeroFilm(film)");
  const context = vm.createContext({});
  vm.runInContext(script.slice(start, script.indexOf("\n}\n", start) + 3), context);
  context.initHeroFilm(film);
}

function fakeFilm({ withTemplate = true } = {}) {
  const calls = [];
  const clone = { play: () => { calls.push("play"); return Promise.resolve(); }, focus: () => calls.push("focus") };
  const button = { hidden: true, listeners: {}, addEventListener(type, fn) { this.listeners[type] = fn; } };
  const template = {
    content: { querySelector: (selector) => (selector === "video" ? { cloneNode: (deep) => { assert.equal(deep, true); return clone; } } : null) },
    replaceWith: (node) => calls.push(node === clone ? "replace" : "replace-other"),
  };
  const film = { querySelector: (selector) => (selector === ".hero-video-poster" ? button : selector === "template" && withTemplate ? template : null) };
  return { film, button, calls };
}

test("pressing play puts the player where the template was and starts it in the same click", () => {
  const { film, button, calls } = fakeFilm();
  runInitHeroFilm(film);
  assert.equal(button.hidden, false, "the poster button is shown once JavaScript runs");
  assert.deepEqual(calls, [], "nothing loads before play");
  button.listeners.click();
  assert.equal(button.hidden, true);
  // play() must run inside the click so browsers count it as started by the visitor.
  assert.deepEqual(calls, ["replace", "focus", "play"]);
});

test("a figure without a template, like the /demo/ player, is left alone", () => {
  const { film, button } = fakeFilm({ withTemplate: false });
  runInitHeroFilm(film);
  assert.equal(button.hidden, true);
  assert.equal(button.listeners.click, undefined);
});
