import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { DRAGON_PRICE_STATUS, DRAGON_PROFESSIONAL_PRICE_SENTENCE } from "../data/dragon-price-status.mjs";
import { COMPARE_PAGES } from "../data/compare-pages.mjs";

// Nuance no longer lists a Dragon Professional price. Every page says so in one wording, and gives
// the last price only with the date of the archived store page that showed it.
const dist = new URL("../dist/", import.meta.url).pathname;
const files = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? files(path) : [path];
});
const pages = () => files(dist).filter((path) => /\.html$|llms\.txt$/.test(path));
const read = (path) => readFileSync(`${dist}${path}`, "utf8");
const text = (html) => html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ");
// The archive date as each language writes it.
const ARCHIVE_DATES = ["11 February 2025", "11. Februar 2025", "11 février 2025", "11 de febrero de 2025", "11 febbraio 2025", "11 februari 2025", "11 de fevereiro de 2025", "2025 年 2 月 11 日", "2025年2月11日", "2025년 2월 11일"];

test("no page states $699.99, and $699 only beside the archive date of the store page that showed it", () => {
  let mentions = 0;
  for (const file of pages()) {
    const body = readFileSync(file, "utf8");
    assert.ok(!body.includes("699.99"), `${relative(dist, file)} still states $699.99`);
    const visible = text(body);
    for (const match of visible.matchAll(/\$699\b/g)) {
      mentions += 1;
      const around = visible.slice(Math.max(0, match.index - 300), match.index + 200);
      assert.ok(ARCHIVE_DATES.some((date) => around.includes(date)), `${relative(dist, file)}: "$699" without its archive date: …${around}…`);
    }
  }
  // 11 Dragon comparisons, the Windows offline guide and the Dragon pricing page.
  assert.ok(mentions >= 13, `only ${mentions} mentions of the last list price`);
});

test("English pages use the one Dragon Professional price sentence", () => {
  const sentence = DRAGON_PROFESSIONAL_PRICE_SENTENCE.replaceAll("'", "&#39;");
  for (const path of ["compare/dragon-alternative/index.html", "guides/offline-dictation-on-windows/index.html", "guides/dragon-pricing/index.html"]) {
    assert.ok(read(path).includes(sentence), path);
  }
  assert.match(DRAGON_PROFESSIONAL_PRICE_SENTENCE, /checked on 9 October 2026/);
  assert.equal(DRAGON_PRICE_STATUS.checked, "2026-10-09");
  assert.match(DRAGON_PROFESSIONAL_PRICE_SENTENCE, new RegExp(`\\${DRAGON_PRICE_STATUS.lastListPrice}, a one-time payment`));
});

test("the Dragon comparison cites the archived store page and no longer compares against an old price", () => {
  const page = COMPARE_PAGES.find((item) => item.slug === "dragon-alternative");
  assert.ok(page.sources.includes(DRAGON_PRICE_STATUS.lastListArchive));
  assert.doesNotMatch(page.title, /\$/);
  assert.doesNotMatch(JSON.stringify(page), /1\/24|699\.99|Without the \$699/);
  for (const prefix of ["", "de/", "ja/", "zh-hant/"]) {
    const html = read(`${prefix}compare/dragon-alternative/index.html`);
    assert.ok(html.includes(`href="${DRAGON_PRICE_STATUS.lastListArchive}"`), `${prefix}: archived store page in the sources`);
    assert.ok(html.includes('datetime="2026-10-09"'), `${prefix}: review date`);
  }
  assert.ok(!read("index.html").includes("$699"), "English homepage teaser title");
  assert.ok(!read("compare/index.html").includes("$699"), "comparison hub");
});
