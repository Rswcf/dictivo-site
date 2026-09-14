// How a Dictivo price reads to a buyer in each billing country. Prices are net US
// dollars and the checkout adds the billing country's tax. Where consumer law asks for
// a tax-inclusive price, the total is the headline figure and the net price sits beside
// it. No imports: the build ships this file to browsers inside site.js.

// Tax the checkout added on top of a net price, in basis points (1900 = 19%), checked on
// prefilled checkouts on TAX_VERIFIED_ON. The deploy check fails six months later.
export const TAX_VERIFIED_ON = "2026-09-15";
export const TAX_RATES = Object.freeze({
  AT: 2000, BE: 2100, BG: 2000, CY: 1900, CZ: 2100, DE: 1900, DK: 2500, EE: 2400, ES: 2100,
  FI: 2550, FR: 2000, GR: 2400, HR: 2500, HU: 2700, IE: 2300, IT: 2200, LT: 2100, LU: 1700,
  LV: 2100, MT: 1800, NL: 2100, PL: 2300, PT: 2300, RO: 2100, SE: 2500, SI: 2200, SK: 2300,
  CH: 810, GB: 2000, IS: 2400, LI: 810, NO: 2500, TR: 2000,
  AE: 500, AU: 1000, IN: 1800, JP: 1000, KR: 1000, NZ: 1500, SG: 900, TW: 500, ZA: 1500,
});

// Billing countries where the checkout added no tax.
export const NO_TAX_COUNTRIES = Object.freeze(["BR", "CN", "HK", "IL", "MX"]);

// Consumer prices may be shown before tax here: US and Canadian rates depend on the state
// or province, and Singapore does not require GST-inclusive prices from overseas sellers.
const PRICE_BEFORE_TAX_COUNTRIES = new Set(["CA", "SG", "US"]);
const GST_COUNTRIES = new Set(["AU", "IN", "NZ", "SG"]);

// The billing country a page assumes until the visitor's own country is known.
export const PRICE_HOME_COUNTRY = Object.freeze({
  en: "US", de: "DE", fr: "FR", es: "ES", it: "IT", nl: "NL", pt: "BR", zh: "CN", "zh-hant": "TW", ja: "JP", ko: "KR",
});

const PRICE_FORMS = ["main", "note", "inline"];

// money/percent: "#" is the number. Templates: {total} includes tax, {net} is before tax,
// {rate} is the percentage, {tax} the tax's name. "main" is the figure, "note" the line
// under it, "inline" the price inside a sentence.
const COPY = {
  en: {
    money: "US$#", decimal: ".", percent: "#%",
    tax: { vat: "VAT", gst: "GST", JP: "consumption tax" },
    inclusiveNote: "incl. {rate} {tax} · {net} before tax", inclusiveInline: "{total} incl. {tax}",
    rateNote: "plus {rate} {tax}", rateInline: "{net} + {rate} {tax}",
    openNote: "plus applicable taxes", openInline: "{net} + tax",
    countries: { US: { money: "$#", openNote: "plus applicable sales tax", openInline: "{net}" } },
  },
  de: {
    money: "# US$", decimal: ",", percent: "# %",
    tax: { vat: "MwSt.", gst: "GST", CH: "MWST", LI: "MWST" },
    inclusiveNote: "inkl. {rate} {tax} · netto {net}", inclusiveInline: "{total} inkl. {tax}",
    rateNote: "zzgl. {rate} {tax}", rateInline: "{net} zzgl. {rate} {tax}",
    openNote: "zzgl. anfallender Steuern", openInline: "{net} zzgl. Steuern",
  },
  fr: {
    money: "# $ US", decimal: ",", percent: "# %",
    tax: { vat: "TVA", gst: "GST" },
    inclusiveNote: "TTC, {tax} {rate} incluse · {net} HT", inclusiveInline: "{total} TTC",
    rateNote: "+ {tax} {rate}", rateInline: "{net} + {tax} {rate}",
    openNote: "taxes applicables en sus", openInline: "{net} HT",
  },
  es: {
    money: "# US$", decimal: ",", percent: "# %",
    tax: { vat: "IVA", gst: "GST" },
    inclusiveNote: "{tax} del {rate} incluido · {net} sin {tax}", inclusiveInline: "{total} {tax} incluido",
    rateNote: "+ {rate} de {tax}", rateInline: "{net} + {rate} de {tax}",
    openNote: "impuestos aplicables aparte", openInline: "{net} + impuestos",
  },
  it: {
    money: "# US$", decimal: ",", percent: "#%",
    tax: { vat: "IVA", gst: "GST" },
    inclusiveNote: "{tax} {rate} inclusa · {net} {tax} esclusa", inclusiveInline: "{total} {tax} inclusa",
    rateNote: "+ {tax} {rate}", rateInline: "{net} + {tax} {rate}",
    openNote: "più eventuali imposte", openInline: "{net} + imposte",
  },
  nl: {
    money: "US$ #", decimal: ",", percent: "#%",
    tax: { vat: "btw", gst: "GST" },
    inclusiveNote: "incl. {rate} {tax} · {net} excl. {tax}", inclusiveInline: "{total} incl. {tax}",
    rateNote: "+ {rate} {tax}", rateInline: "{net} + {rate} {tax}",
    openNote: "excl. eventuele belastingen", openInline: "{net} excl. belastingen",
  },
  pt: {
    money: "US$ #", decimal: ",", percent: "#%",
    tax: { vat: "IVA", gst: "GST" },
    inclusiveNote: "{rate} de {tax} incluído · {net} sem {tax}", inclusiveInline: "{total} com {tax}",
    rateNote: "+ {rate} de {tax}", rateInline: "{net} + {rate} de {tax}",
    openNote: "mais impostos aplicáveis", openInline: "{net} + impostos",
  },
  zh: {
    money: "US$#", decimal: ".", percent: "#%",
    tax: { vat: "增值税", gst: "消费税", JP: "消费税" },
    inclusiveNote: "含 {rate} {tax} · 税前 {net}", inclusiveInline: "{total}（含税）",
    rateNote: "另加 {rate} {tax}", rateInline: "{net} + {rate} {tax}",
    openNote: "另加适用税费", openInline: "{net}（另加税费）",
  },
  "zh-hant": {
    money: "US$#", decimal: ".", percent: "#%",
    tax: { vat: "增值稅", gst: "消費稅", JP: "消費稅", TW: "營業稅" },
    inclusiveNote: "含 {rate} {tax} · 未稅 {net}", inclusiveInline: "{total}（含稅）",
    rateNote: "另加 {rate} {tax}", rateInline: "{net} + {rate} {tax}",
    openNote: "另加適用稅費", openInline: "{net}（另加稅費）",
  },
  ja: {
    money: "US$#", decimal: ".", percent: "#%",
    tax: { vat: "付加価値税", gst: "消費税", JP: "消費税" },
    inclusiveNote: "税込（{tax}{rate}）· 税抜 {net}", inclusiveInline: "{total}（税込）",
    rateNote: "別途{tax}{rate}", rateInline: "{net}＋{tax}{rate}",
    openNote: "税別（該当する税金は別途）", openInline: "{net}（税別）",
  },
  ko: {
    money: "US$#", decimal: ".", percent: "#%",
    tax: { vat: "부가세" },
    inclusiveNote: "{tax} {rate} 포함 · {tax} 별도 {net}", inclusiveInline: "{total}({tax} 포함)",
    rateNote: "{tax} {rate} 별도", rateInline: "{net} + {tax} {rate}",
    openNote: "해당 세금 별도", openInline: "{net}(세금 별도)",
  },
};

// Accepts page codes ("zh-hant") and <html lang> values ("zh-Hans", "zh-Hant", "en-GB").
export function priceLanguage(lang) {
  const code = String(lang ?? "").toLowerCase();
  const language = code.startsWith("zh") ? (/^zh-(hant|tw|hk|mo)\b/.test(code) ? "zh-hant" : "zh") : code.split("-")[0];
  if (!Object.hasOwn(COPY, language)) throw new Error(`No price copy for language "${lang}"`);
  return language;
}

export function priceTreatment(country) {
  const code = String(country ?? "").toUpperCase();
  const basisPoints = Object.hasOwn(TAX_RATES, code) ? TAX_RATES[code] : undefined;
  if (NO_TAX_COUNTRIES.includes(code)) return { kind: "none" };
  if (PRICE_BEFORE_TAX_COUNTRIES.has(code)) return basisPoints ? { kind: "rate", basisPoints } : { kind: "open" };
  return basisPoints ? { kind: "inclusive", basisPoints } : { kind: "open" };
}

export function formatPrice({ cents, form, lang, country }) {
  if (!Number.isInteger(cents) || cents < 0) throw new Error(`Price must be whole cents, got ${cents}`);
  if (!PRICE_FORMS.includes(form)) throw new Error(`Unknown price form "${form}"`);
  const language = priceLanguage(lang);
  const code = String(country ?? "").toUpperCase();
  const copy = { ...COPY[language], ...COPY[language].countries?.[code] };
  const fill = (template, values) => template.replace(/\{(\w+)\}/g, (_match, key) => values[key]);
  const money = (amount) => fill(copy.money.replace("#", "{amount}"), {
    amount: amount % 100 === 0 ? String(amount / 100) : (amount / 100).toFixed(2).replace(".", copy.decimal),
  });
  const net = money(cents);
  const treatment = priceTreatment(code);

  if (treatment.kind === "none") return form === "note" ? "" : net;
  if (treatment.kind === "open") {
    if (form === "main") return net;
    return fill(form === "note" ? copy.openNote : copy.openInline, { net });
  }

  const values = {
    net,
    total: money(cents + Math.round((cents * treatment.basisPoints) / 10000)),
    rate: fill(copy.percent.replace("#", "{number}"), { number: String(treatment.basisPoints / 100).replace(".", copy.decimal) }),
    tax: copy.tax[code] ?? (GST_COUNTRIES.has(code) ? copy.tax.gst : undefined) ?? copy.tax.vat,
  };
  if (treatment.kind === "rate") {
    if (form === "main") return net;
    return fill(form === "note" ? copy.rateNote : copy.rateInline, values);
  }
  if (form === "main") return values.total;
  return fill(form === "note" ? copy.inclusiveNote : copy.inclusiveInline, values);
}
