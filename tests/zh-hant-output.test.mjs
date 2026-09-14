import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import * as OpenCC from "opencc-js";

// Character-only conversion finds leftover Simplified characters without judging phrase choices.
const toTraditionalCharacters = OpenCC.Converter({ from: "cn", to: "tw" });
const dist = new URL("../dist/", import.meta.url).pathname;
const list = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? list(path) : [path];
});
const zhFiles = list(join(dist, "zh")).map((path) => relative(join(dist, "zh"), path));
const zhHtml = zhFiles.filter((file) => file.endsWith(".html"));
const visibleText = (html) => html
  .replace(/<script[\s\S]*?<\/script>/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replaceAll("简体中文", " ");

test("every zh file has a zh-hant twin", () => {
  for (const file of zhFiles) assert.ok(existsSync(join(dist, "zh-hant", file)), `missing zh-hant/${file}`);
});

test("zh-hant pages are Traditional Chinese, not English fallbacks", () => {
  for (const file of zhHtml) {
    const page = readFileSync(join(dist, "zh-hant", file), "utf8");
    const text = visibleText(page);
    assert.match(page, /<html lang="zh-Hant">/, file);
    assert.ok((text.match(/[一-鿿]/g) || []).length > 200, `${file}: too little Chinese text`);
    // 游標 (cursor) and 里程碑 (milestone) are standard Traditional words whose single characters
    // a character-only conversion would wrongly flag, so they are removed before checking.
    const leftovers = [...text.replaceAll("游標", " ").replaceAll("里程碑", " ")]
      .filter((char) => toTraditionalCharacters(char) !== char);
    assert.deepEqual([...new Set(leftovers)], [], `${file}: unconverted Simplified characters`);
  }
});

test("zh-hant pages link to Simplified pages only as language choices", () => {
  for (const file of zhHtml) {
    const page = readFileSync(join(dist, "zh-hant", file), "utf8")
      .replace(/<link rel="alternate"[^>]*>/g, "")
      .replace(/<a href="\/zh\/[^"]*"[^>]*hreflang="zh-Hans"[^>]*>/g, "");
    assert.doesNotMatch(page, /href="\/zh\//, file);
  }
});

test("hreflang, OG locale, sitemap and film captions include zh-Hant", () => {
  const home = readFileSync(join(dist, "zh-hant/index.html"), "utf8");
  assert.match(readFileSync(join(dist, "index.html"), "utf8"), /hreflang="zh-Hant" href="https:\/\/dictivo\.app\/zh-hant\/"/);
  assert.match(home, /og:locale" content="zh_TW"/);
  assert.match(home, /srclang="zh-Hant" label="繁體中文" src="[^"]+" default/);
  assert.match(readFileSync(join(dist, "sitemap.xml"), "utf8"), /<loc>https:\/\/dictivo\.app\/zh-hant\/<\/loc>/);
  assert.ok(existsSync(join(dist, "assets/film-v08/captions.zh-Hant.vtt")));
});
