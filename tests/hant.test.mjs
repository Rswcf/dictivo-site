import test from "node:test";
import assert from "node:assert/strict";
import { HANT, addHant, toHant } from "../scripts/lib/hant.mjs";

test("converts Simplified strings with Taiwan phrasing", () => {
  assert.equal(toHant("隐私优先的本地听写软件，下载视频"), "隱私優先的本地聽寫軟體，下載影片");
});

test("keeps ASCII placeholders, URLs and markup untouched", () => {
  assert.equal(toHant('<a href="/compare/">{competitor} 价格 $29</a>'), '<a href="/compare/">{competitor} 價格 $29</a>');
});

test("deep-converts arrays and objects, wraps functions, passes other values through", () => {
  const pattern = /简体/g;
  const out = toHant({ list: ["软件"], nested: { text: "网络" }, note: (v) => `版本 ${v} 下载`, pattern, count: 3, empty: null });
  assert.deepEqual(out.list, ["軟體"]);
  assert.equal(out.nested.text, "網路");
  assert.equal(out.note("1.0"), "版本 1.0 下載");
  assert.equal(out.pattern, pattern);
  assert.equal(out.count, 3);
  assert.equal(out.empty, null);
});

test("addHant derives zh-hant from zh only", () => {
  const map = { en: "Software", ja: "ソフトウェア", zh: "软件" };
  addHant(map);
  assert.equal(HANT, "zh-hant");
  assert.equal(map[HANT], "軟體");
  assert.equal(map.ja, "ソフトウェア");
  assert.throws(() => addHant({ en: "x" }), /no zh entry/);
});
