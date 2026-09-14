import * as OpenCC from "opencc-js";

// Traditional Chinese pages are derived from the Simplified copy at build time.
export const HANT = "zh-hant";

const convert = OpenCC.Converter({ from: "cn", to: "twp" });

// Context fixes for phrase conversions reviewed against the site copy. Keep each one covered by a test.
const HANT_FIXES = [];

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
