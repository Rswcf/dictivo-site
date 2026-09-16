// How a Dictivo price reads in each site language. Every buyer pays the same
// tax-inclusive total in US dollars; only the typography and the "tax included"
// wording change with the language. No imports, so the build can reason about it alone.

// money: "#" is the number. note: the line under a card figure. inline: the price
// inside a sentence, where {price} is the money string.
const COPY = {
  en: { money: "US$#", decimal: ".", note: "tax included", inline: "{price}" },
  de: { money: "# US$", decimal: ",", note: "inkl. MwSt.", inline: "{price} inkl. MwSt." },
  fr: { money: "# $ US", decimal: ",", note: "TTC", inline: "{price} TTC" },
  es: { money: "# US$", decimal: ",", note: "IVA incluido", inline: "{price} IVA incluido" },
  it: { money: "# US$", decimal: ",", note: "IVA inclusa", inline: "{price} IVA inclusa" },
  nl: { money: "US$ #", decimal: ",", note: "incl. btw", inline: "{price} incl. btw" },
  pt: { money: "US$ #", decimal: ",", note: "impostos incluídos", inline: "{price} com impostos" },
  zh: { money: "US$#", decimal: ".", note: "含税", inline: "{price}" },
  "zh-hant": { money: "US$#", decimal: ".", note: "含稅", inline: "{price}（含稅）" },
  ja: { money: "US$#", decimal: ".", note: "税込", inline: "{price}（税込）" },
  ko: { money: "US$#", decimal: ".", note: "부가세 포함", inline: "{price}(부가세 포함)" },
};

export const PRICE_LANGUAGES = Object.freeze(Object.keys(COPY));
const PRICE_FORMS = ["main", "note", "inline"];

// Accepts page codes ("zh-hant") and <html lang> values ("zh-Hans", "zh-Hant", "en-GB").
export function priceLanguage(lang) {
  const code = String(lang ?? "").toLowerCase();
  const language = code.startsWith("zh") ? (/^zh-(hant|tw|hk|mo)\b/.test(code) ? "zh-hant" : "zh") : code.split("-")[0];
  if (!Object.hasOwn(COPY, language)) throw new Error(`No price copy for language "${lang}"`);
  return language;
}

export function formatPrice({ cents, form, lang }) {
  if (!Number.isInteger(cents) || cents < 0) throw new Error(`Price must be whole cents, got ${cents}`);
  if (!PRICE_FORMS.includes(form)) throw new Error(`Unknown price form "${form}"`);
  const copy = COPY[priceLanguage(lang)];
  if (form === "note") return copy.note;
  const number = cents % 100 === 0 ? String(cents / 100) : (cents / 100).toFixed(2).replace(".", copy.decimal);
  const money = copy.money.replace("#", number);
  return form === "main" ? money : copy.inline.replace("{price}", money);
}
