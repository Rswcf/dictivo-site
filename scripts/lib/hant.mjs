import * as OpenCC from "opencc-js";

// Traditional Chinese pages are derived from the Simplified copy at build time.
export const HANT = "zh-hant";

const convert = OpenCC.Converter({ from: "cn", to: "twp" });

// Context fixes for phrase conversions reviewed against the site copy. Keep each one covered by a test.
// OpenCC segments phrases, so some mainland wording survives; these use Taiwan/Hong Kong software terms.
const HANT_FIXES = [
  [/隻/g, "只"],
  [/云/g, "雲"],
  [/采訪/g, "採訪"],
  [/菜單/g, "選單"],
  [/粘貼/g, "貼上"],
  [/用戶/g, "使用者"],
  [/打開/g, "開啟"],
  [/輔助程序/g, "輔助程式"],
  [/發送/g, "傳送"],
  [/質量/g, "品質"],
  [/賬號/g, "帳號"],
  [/文本框/g, "文字方塊"],
  [/文本/g, "文字"],
  [/套餐/g, "方案"],
  [/許可證/g, "授權"],
  [/安裝包/g, "安裝檔"],
  [/郵箱/g, "信箱"],
  [/識別(?!碼)/g, "辨識"],
  [/網路訪問/g, "網路存取"],
  // Phrase segmentation mistakes found in the 2026-09-14 review of every twp substitution.
  [/未知釋出者/g, "未知的發行者"],
  [/名片語成/g, "名詞組成"],
  [/全域性/g, "全域"],
  [/隱私宣告/g, "隱私聲明"],
];

function convertString(value) {
  return HANT_FIXES.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), convert(value));
}

export function toHant(value) {
  if (typeof value === "string") return convertString(value);
  if (typeof value === "function") return (...args) => toHant(value(...args));
  if (Array.isArray(value)) return value.map(toHant);
  if (value && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, toHant(entry)]));
  }
  return value;
}

export function addHant(map) {
  if (!map?.zh) throw new Error("addHant: map has no zh entry");
  map[HANT] = toHant(map.zh);
  return map;
}
