// Visitor country → site locale. Countries outside these languages get English.
export const COUNTRIES_BY_LOCALE = Object.freeze({
  de: ["DE", "AT", "LI"],
  fr: ["FR", "MC", "GF", "GP", "MQ", "RE", "YT", "PM", "BL", "MF", "WF", "PF", "NC", "TF", "SN", "CI", "ML", "BF",
    "NE", "TG", "BJ", "GN", "GA", "CG", "CD", "CF", "TD", "MG", "DJ", "KM", "BI", "HT"],
  es: ["ES", "MX", "GT", "HN", "SV", "NI", "CR", "PA", "CU", "DO", "CO", "VE", "EC", "PE", "BO", "CL", "AR", "PY",
    "UY", "GQ"],
  it: ["IT", "SM", "VA"],
  nl: ["NL", "SR", "AW", "CW", "SX", "BQ"],
  pt: ["PT", "BR", "AO", "MZ", "CV", "GW", "ST", "TL"],
  zh: ["CN"],
  "zh-hant": ["TW", "HK", "MO"],
  ja: ["JP"],
  ko: ["KR"],
});

// The first language is the default; the others win only when the browser prefers them.
export const MULTILINGUAL_COUNTRIES = Object.freeze({
  CH: ["de", "fr", "it"],
  BE: ["nl", "fr", "de"],
  LU: ["fr", "de"],
  CA: ["en", "fr"],
  CM: ["fr", "en"],
  PR: ["es", "en"],
  SG: ["en", "zh"],
});

// EU Geo-blocking Regulation (EU) 2018/302 Art. 3(2): no location-based redirect without explicit consent.
// Germany is excluded: a German trader serving German visitors is a purely internal situation (Q&A §2.1.3).
export const CONSENT_REQUIRED_COUNTRIES = Object.freeze(new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GF", "GP", "MQ", "RE", "YT", "MF", "IS", "LI", "NO",
]));

const REGION_CANDIDATES = { "CA-QC": ["fr", "en"] };

const COUNTRY_CANDIDATES = {
  ...Object.fromEntries(
    Object.entries(COUNTRIES_BY_LOCALE).flatMap(([locale, countries]) => countries.map((country) => [country, [locale]])),
  ),
  ...MULTILINGUAL_COUNTRIES,
};

export function requiresConsent(country) {
  return CONSENT_REQUIRED_COUNTRIES.has(String(country || "").toUpperCase());
}

export function candidatesFor(country, region = "") {
  const countryCode = String(country || "").toUpperCase();
  const regionCode = String(region || "").toUpperCase();
  return REGION_CANDIDATES[`${countryCode}-${regionCode}`] || COUNTRY_CANDIDATES[countryCode] || ["en"];
}

export function parseAcceptLanguage(header) {
  return String(header || "")
    .split(",")
    .map((part, index) => {
      const [tag = "", ...params] = part.trim().split(";");
      const q = params.map((param) => param.trim()).find((param) => param.startsWith("q="));
      const quality = q === undefined ? 1 : Number(q.slice(2));
      return { tag: tag.trim().toLowerCase(), quality: Number.isFinite(quality) ? quality : 0, index };
    })
    .filter((item) => item.tag && item.tag !== "*" && item.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index)
    .map((item) => item.tag);
}

export function siteLocaleForLanguageTag(tag) {
  const [primary, ...rest] = String(tag).toLowerCase().split("-");
  if (primary !== "zh") return primary;
  return rest.some((part) => ["hant", "tw", "hk", "mo"].includes(part)) ? "zh-hant" : "zh";
}

export function localeForCountry(country, { region = "", acceptLanguage = "" } = {}) {
  const candidates = candidatesFor(country, region);
  if (candidates.length === 1) return candidates[0];
  for (const tag of parseAcceptLanguage(acceptLanguage)) {
    const locale = siteLocaleForLanguageTag(tag);
    if (candidates.includes(locale)) return locale;
  }
  return candidates[0];
}
