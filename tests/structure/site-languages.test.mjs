import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCALES } from "../../data/site-content.mjs";

const dist = new URL("../../dist/", import.meta.url).pathname;

// The homepage language list was removed on 2026-11-04; the header language menu is the one list.
test("every homepage's header language menu links to every display language", () => {
  for (const locale of LOCALES) {
    const html = readFileSync(`${dist}${locale.path.slice(1)}index.html`, "utf8");
    const menu = /<div class="language-menu-panel"[\s\S]*?<\/div>/.exec(html)?.[0];
    assert.ok(menu, `${locale.code}: language menu not found`);
    for (const other of LOCALES) {
      // Each name keeps its own script: the zh-hant conversion skips the menu's lang-tagged links.
      const name = other.nativeName;
      assert.ok(menu.includes(`hreflang="${other.htmlLang}"`), `${locale.code}: menu omits ${other.code}`);
      assert.ok(menu.includes(name), `${locale.code}: menu omits ${other.nativeName}`);
    }
  }
});
