import test from "node:test";
import assert from "node:assert/strict";
import { HANT, addHant, toHant } from "../scripts/lib/hant.mjs";

test("converts Simplified strings with Taiwan phrasing", () => {
  assert.equal(toHant("隐私优先的本地听写软件，下载视频"), "隱私優先的本地聽寫軟體，下載影片");
});

test("applies reviewed Taiwan/Hong Kong software wording", () => {
  assert.equal(toHant("语言菜单只改变显示语言"), "語言選單只改變顯示語言");
  assert.equal(toHant("会发送你的文本到任何文本框"), "會傳送你的文字到任何文字方塊");
  assert.equal(toHant("用许可证邮箱激活，无需账号"), "用授權信箱啟用，無需帳號");
  assert.equal(toHant("本地识别语音，识别码不变"), "本地辨識語音，識別碼不變");
  assert.equal(toHant("阻止网络访问，打开辅助程序"), "阻止網路存取，開啟輔助程式");
  assert.equal(toHant("如果输入是已有采访录音"), "如果輸入是已有採訪錄音");
  assert.equal(toHant("可能提示「未知发布者」"), "可能提示「未知的發行者」");
  assert.equal(toHant("再用日常专有名词组成的句子测试"), "再用日常專有名詞組成的句子測試");
  assert.equal(toHant("全局快捷键和更准确的隐私声明"), "全域快捷鍵和更準確的隱私聲明");
  assert.equal(toHant("价格与套餐，质量选项，安装包，粘贴，用户"), "價格與方案，品質選項，安裝檔，貼上，使用者");
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
