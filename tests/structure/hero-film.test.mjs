import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";
import { LOCALES } from "../../data/site-content.mjs";
import { PRODUCT_FILM, RETIRED_FILM_URLS } from "../../data/product-film.mjs";

// The homepage film used to sit in the page as a hidden <video>, and its poster="poster.jpg"
// (74 KB) downloaded on every visit next to the poster <img> the visitor actually sees.
// Lighthouse mobile, local build, 2026-10-10: LCP 2.26 s with it, 1.82 s without it.
// Now the player waits in a <template> until the visitor presses play; <noscript> keeps the
// native player for browsers without JavaScript.
const dist = new URL("../../dist/", import.meta.url).pathname;
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

test("each homepage poster and its preload come from the current film", () => {
  const srcset = `${PRODUCT_FILM.posterSmall} 800w, ${PRODUCT_FILM.poster} 1600w, ${PRODUCT_FILM.posterLarge} 2160w`;
  for (const home of homes) {
    const html = readFileSync(`${dist}${home}`, "utf8");
    const img = /<img\b[^>]*>/.exec(heroFigure(html))?.[0] ?? "";
    assert.ok(img.includes(`src="${PRODUCT_FILM.poster}"`) && img.includes(`srcset="${srcset}"`), `${home}: ${img}`);
    assert.ok(html.includes(`imagesrcset="${srcset}"`), `${home}: the poster preload must match the <img>`);
    assert.doesNotMatch(html, /film-v08/, home);
  }
  for (const path of [PRODUCT_FILM.poster, PRODUCT_FILM.posterSmall, PRODUCT_FILM.posterLarge]) assert.ok(existsSync(`${dist}${path.slice(1)}`), path);
});

// 2026-11-12: the 68-second film replaced the 35-second film-v08 files. Old embeds and shared links
// follow a 301 to the file that replaced them.
test("every public film-v08 URL is a 301 to a film file that exists", () => {
  const rules = readFileSync(`${dist}_redirects`, "utf8").split("\n");
  const names = ["dictivo-film-1080p.mp4", "dictivo-film-4k.mp4", "poster.jpg", "poster-800.webp", "captions.en.vtt", "captions.zh-CN.vtt", "captions.zh-Hant.vtt", "CREDITS.txt"];
  assert.deepEqual(RETIRED_FILM_URLS.map(([from]) => from), names.map((name) => `/assets/film-v08/${name}`));
  for (const [from, to] of RETIRED_FILM_URLS) {
    assert.ok(to.endsWith(`/${from.split("/").pop()}`) && to !== from, `${from} → ${to}`);
    assert.ok(rules.includes(`${from} ${to} 301`), `${from} has no 301`);
    assert.ok(existsSync(`${dist}${to.slice(1)}`), `${to} is not in dist/`);
  }
  assert.ok(!existsSync(`${dist}assets/film-v08`), "the old film folder is still published");
});

// Run initHeroFilm from site.js against a minimal stand-in for the figure and the window.
function runInitHeroFilm(film, { innerHeight = 779 } = {}) {
  const script = readFileSync(new URL("../../assets/site.js", import.meta.url), "utf8");
  const start = script.indexOf("\nfunction initHeroFilm(");
  assert.ok(start >= 0, "site.js must define a top-level function initHeroFilm(film)");
  const context = vm.createContext({ window: { innerHeight } });
  vm.runInContext(script.slice(start, script.indexOf("\n}\n", start) + 3), context);
  context.initHeroFilm(film);
}

// box: where the <video> lands once it replaces the template (getBoundingClientRect).
function fakeFilm({ withTemplate = true, box = { top: 89, bottom: 696 } } = {}) {
  const calls = [];
  const scrolls = [];
  const clone = {
    play: () => { calls.push("play"); return Promise.resolve(); },
    focus: () => calls.push("focus"),
    getBoundingClientRect: () => box,
    scrollIntoView: (options) => { calls.push("scroll"); scrolls.push(options); },
  };
  const button = { hidden: true, listeners: {}, addEventListener(type, fn) { this.listeners[type] = fn; } };
  const template = {
    content: { querySelector: (selector) => (selector === "video" ? { cloneNode: (deep) => { assert.equal(deep, true); return clone; } } : null) },
    replaceWith: (node) => calls.push(node === clone ? "replace" : "replace-other"),
  };
  const film = { querySelector: (selector) => (selector === ".hero-video-poster" ? button : selector === "template" && withTemplate ? template : null) };
  return { film, button, calls, scrolls };
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

// 2026-11-12: the 1080px film can run below the window (1440 x 779: 47 % of it in view), so the
// visitor would start it without seeing its lower half or its controls.
test("pressing play scrolls the player into view, centred, when the window cuts it", () => {
  for (const box of [{ top: 496, bottom: 1104 }, { top: -40, bottom: 568 }]) {
    const { film, button, calls, scrolls } = fakeFilm({ box });
    runInitHeroFilm(film, { innerHeight: 779 });
    button.listeners.click();
    // The scroll comes after play(), so it cannot delay the start.
    assert.deepEqual(calls, ["replace", "focus", "play", "scroll"], JSON.stringify(box));
    // No behavior option: html's scroll-behavior in site.css decides smooth or instant (reduced motion).
    assert.deepEqual({ ...scrolls[0] }, { block: "center" });
  }
});

test("pressing play does not scroll when the whole player is already in the window", () => {
  for (const box of [{ top: 89, bottom: 696 }, { top: 0, bottom: 779 }]) {
    const { film, button, calls } = fakeFilm({ box });
    runInitHeroFilm(film, { innerHeight: 779 });
    button.listeners.click();
    assert.deepEqual(calls, ["replace", "focus", "play"], JSON.stringify(box));
  }
});

test("a figure without a template, like the /demo/ player, is left alone", () => {
  const { film, button } = fakeFilm({ withTemplate: false });
  runInitHeroFilm(film);
  assert.equal(button.hidden, true);
  assert.equal(button.listeners.click, undefined);
});
