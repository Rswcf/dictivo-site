import test from "node:test";
import assert from "node:assert/strict";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { LOCALES } from "../data/site-content.mjs";

// squirrelscan's perf/lcp-hints (2026-10-08 audit) found the homepage hero poster, the
// largest contentful paint on desktop, without a preload; perf/lazy-above-fold found the
// Local result screenshot lazy-loaded near the top of three pages.
const root = new URL("../", import.meta.url).pathname;
const dist = join(root, "dist");
const homes = LOCALES.map((locale) => (locale.code === "en" ? "index.html" : `${locale.code}/index.html`));

const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([a-z-]+)="([^"]*)"/g)].map(([, name, value]) => [name, value.replace(/&amp;/g, "&")]));
const head = (html) => html.slice(0, html.indexOf("</head>"));
const imagePreloads = (html) => [...head(html).matchAll(/<link rel="preload" as="image"[^>]*>/g)].map(([tag]) => attrs(tag));
const heroPoster = (html) => attrs(/<button class="hero-video-poster"[\s\S]*?(<img [^>]*>)/.exec(html)?.[1] ?? "");
const images = (html) => [...html.matchAll(/<img [^>]*>/g)].map(([tag]) => attrs(tag));
const files = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? files(path) : [path];
});

function assertPreloadMatchesPoster(html, name) {
  const preloads = imagePreloads(html);
  assert.equal(preloads.length, 1, `${name}: image preloads in <head>`);
  const [preload] = preloads;
  const img = heroPoster(html);
  assert.ok(img.src, `${name}: the hero poster <img> is missing`);
  assert.equal(preload.href, img.src, `${name}: preload href and <img src>`);
  assert.equal(preload.imagesrcset, img.srcset, `${name}: imagesrcset and srcset`);
  assert.equal(preload.imagesizes, img.sizes, `${name}: imagesizes and sizes`);
  assert.equal(preload.fetchpriority, "high", `${name}: preload priority`);
  assert.equal(img.fetchpriority, "high", `${name}: <img> priority`);
  assert.ok(!("loading" in img), `${name}: the LCP image must not be lazy`);
  assert.ok(!("media" in preload), `${name}: the poster can be the LCP on phones too`);
}

test("each homepage preloads its hero poster with the <img>'s own src, srcset and sizes", () => {
  for (const home of homes) assertPreloadMatchesPoster(readFileSync(join(dist, home), "utf8"), home);
});

test("an image preload on any page names an image that page renders eagerly", () => {
  for (const file of files(dist).filter((path) => path.endsWith(".html"))) {
    const html = readFileSync(file, "utf8");
    for (const preload of imagePreloads(html)) {
      const target = images(html).find((img) => img.src === preload.href);
      assert.ok(target, `${relative(dist, file)}: preload ${preload.href} has no matching <img>`);
      assert.notEqual(target.loading, "lazy", `${relative(dist, file)}: ${preload.href} is preloaded but lazy`);
    }
  }
});

// Run the deploy step itself on a copy of the homepages: it fingerprints site.css and site.js
// and must leave the image preload and the <img> it matches untouched.
test("after inject-asset-version.mjs the preload still matches the <img>", () => {
  const work = mkdtempSync(join(tmpdir(), "dictivo-inject-"));
  try {
    mkdirSync(join(work, "scripts"));
    copyFileSync(join(root, "scripts/inject-asset-version.mjs"), join(work, "scripts/inject-asset-version.mjs"));
    for (const path of ["assets/site.css", "assets/site.js", ...homes]) {
      mkdirSync(dirname(join(work, "dist", path)), { recursive: true });
      copyFileSync(join(dist, path), join(work, "dist", path));
    }
    execFileSync(process.execPath, [join(work, "scripts/inject-asset-version.mjs")], { stdio: "pipe" });
    for (const home of homes) {
      const before = readFileSync(join(dist, home), "utf8");
      const after = readFileSync(join(work, "dist", home), "utf8");
      assert.match(after, /\/assets\/site\.[0-9a-f]{12}\.js/, `${home}: site.js was not fingerprinted, so the step did not run`);
      assert.ok(!after.includes("/assets/site.js?v="), `${home}: a site.js placeholder is left`);
      assertPreloadMatchesPoster(after, `${home} after fingerprinting`);
      assert.deepEqual(imagePreloads(after), imagePreloads(before), `${home}: fingerprinting changed the image preload`);
    }
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
});

test("the Local result screenshot near the top of the media kit and first-dictation guides is not lazy", () => {
  for (const path of ["media-kit/index.html", "guides/first-local-dictation/index.html", "ja/guides/first-local-dictation/index.html"]) {
    const html = readFileSync(join(dist, path), "utf8");
    const screenshot = images(html).find((img) => img.src === "/assets/native-demo-2026-09/result.png");
    assert.ok(screenshot, `${path}: the screenshot is missing`);
    assert.ok(!("loading" in screenshot), `${path}: the screenshot is lazy`);
  }
});

test("no page lazy-loads the first image in its main content", () => {
  for (const file of files(dist).filter((path) => path.endsWith(".html"))) {
    const html = readFileSync(file, "utf8");
    const main = html.split("<main")[1];
    if (!main) continue;
    const first = images(main)[0];
    if (first) assert.notEqual(first.loading, "lazy", `${relative(dist, file)}: the first image is lazy`);
  }
});
