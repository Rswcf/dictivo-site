import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCALES } from "../../data/site-content.mjs";

// 2026-11-22: the homepage film (a mostly light picture) sat straight on the near-black page and
// looked pasted on. site.css now frames it with a translucent ring and a soft mint glow. /demo/
// shares the .hero-film class, so every frame rule is scoped to .hero-film:not(.film-watch).
// It reads only dist/ and site.css.
const dist = new URL("../../dist/", import.meta.url).pathname;
const homes = LOCALES.map((locale) => (locale.code === "en" ? "index.html" : `${locale.code}/index.html`));
const css = readFileSync(new URL("../../assets/site.css", import.meta.url), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");

function cssBlock(source, opener) {
  const start = source.indexOf(opener);
  assert.ok(start >= 0, `site.css: ${opener} missing`);
  let depth = 0;
  for (let at = source.indexOf("{", start); at < source.length; at += 1) {
    if (source[at] === "{") depth += 1;
    if (source[at] === "}" && --depth === 0) return source.slice(start, at + 1);
  }
  throw new Error(`site.css: ${opener} is not closed`);
}
const rule = (source, selector) => new RegExp(`(^|[\\n{}])\\s*${selector.replace(/[.[\]()>]/g, "\\$&")}\\s*\\{([^}]*)\\}`).exec(source)?.[2] ?? "";
const FRAME = ".hero-film:not(.film-watch)";
const INNER = `${FRAME} > .hero-video-poster,\n${FRAME} video`;

test("the homepage film carries the frame and the /demo/ film does not", () => {
  for (const home of homes) {
    const html = readFileSync(`${dist}${home}`, "utf8");
    assert.equal((html.match(/<figure class="hero-film" id="demo-video">/g) || []).length, 1, `${home}: hero film figure`);
    assert.doesNotMatch(html, /film-watch/, `${home}: the homepage film must not be a /demo/ film`);
  }
  const demo = readFileSync(`${dist}demo/index.html`, "utf8");
  assert.equal((demo.match(/<figure class="hero-film film-watch">/g) || []).length, 1, "/demo/ film figure");
});

test("site.css draws the ring and the glow on the homepage film only", () => {
  const ring = rule(css, FRAME);
  for (const part of [/isolation:\s*isolate/, /padding:\s*10px/, /border-radius:\s*31px/, /border:\s*1px solid/, /background:\s*linear-gradient/]) assert.match(ring, part);
  assert.match(rule(css, `${FRAME}::before`), /radial-gradient\(56% 60% at 50% 50%, rgb\(125 211 199 \/ 62%\)[\s\S]*filter:\s*blur\(54px\)/);
  // The dark fill keeps the ring from framing the glow while the poster is still invisible.
  assert.match(rule(css, `${FRAME}::after`), /inset:\s*10px;[\s\S]*background:\s*#050807/);
  assert.match(rule(css, INNER), /border:\s*0;[\s\S]*border-radius:\s*21px/);

  const phone = cssBlock(css, "@media (max-width: 560px)");
  assert.match(rule(phone, FRAME), /border-radius:\s*20px;[\s\S]*padding:\s*6px/);
  assert.match(rule(phone, `${FRAME}::after`), /inset:\s*6px/);
  assert.match(rule(phone, `${FRAME}::after,\n  ${INNER.replace("\n", "\n  ")}`), /border-radius:\s*14px/);

  // /demo/ keeps the plain film: no rule outside the scope gives .hero-film a ring or a glow.
  for (const [, selector, body] of css.matchAll(/([^{}]*\.hero-film[^{}]*)\{([^}]*)\}/g)) {
    if (/padding|isolation|filter|gradient/.test(body) && !/figcaption/.test(selector)) {
      for (const part of selector.split(",")) assert.ok(part.includes(FRAME), `unscoped frame rule: ${part.trim()}`);
    }
  }
  assert.match(rule(css, ".hero-video-poster,\n.hero-film video"), /border:\s*1px solid[\s\S]*0 34px 130px/, "the plain film keeps its border and shadow");
});
