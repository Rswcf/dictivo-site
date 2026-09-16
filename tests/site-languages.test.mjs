import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCALES } from "../data/site-content.mjs";
import { toHant } from "../scripts/lib/hant.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;

test("every homepage names every display language the site offers", () => {
  for (const locale of LOCALES) {
    const html = readFileSync(`${dist}${locale.path.slice(1)}index.html`, "utf8");
    const paragraph = /<section[^>]*id="languages"[\s\S]*?<p>([\s\S]*?)<\/p>/.exec(html)?.[1];
    assert.ok(paragraph, `${locale.code}: languages paragraph not found`);
    for (const other of LOCALES.filter((item) => item.code !== "en")) {
      // The Traditional Chinese page is converted from the Simplified one, names included.
      const name = locale.code === "zh-hant" ? toHant(other.nativeName) : other.nativeName;
      assert.ok(paragraph.includes(name), `${locale.code}: languages paragraph omits ${other.nativeName}`);
    }
  }
});
