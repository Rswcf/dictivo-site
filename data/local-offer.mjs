// Commercial terms shared by the pricing copy and comparison calculations. Keep the
// introductory offer separate from the regular price; renewing updates is always optional.
// On regularPriceFrom, update this file, the copy and the API first, and raise the store price last
// (runbook: docs/release/2026-11-01-local-price-rise-runbook.zh-CN.md in the desktop repository).
export const LOCAL_OFFER = Object.freeze({
  price: 29,
  regularPrice: 49,
  introPriceUntil: "2026-10-31",
  regularPriceFrom: "2026-11-01",
  updateRenewal: 24,
  includedUpdateMonths: 12,
  trialDays: 14,
  personalDevices: 3,
});

// Cloud Fast, per month.
export const CLOUD_FAST_MONTHLY_PRICE = 8.99;

// The last day any displayed Dictivo price or its tax wording changed. Pages that show a
// price report at least this date in the sitemap, so search engines recrawl them.
export const PRICING_LASTMOD = "2026-09-16";

const DATE_LOCALES = { en: "en-GB", de: "de-DE", fr: "fr-FR", es: "es-ES", it: "it-IT", nl: "nl-NL", pt: "pt-BR", zh: "zh-CN", ja: "ja-JP", ko: "ko-KR" };

// "31 October 2026", "1. November 2026", "1er novembre 2026", "2026年10月31日" …
export function offerDate(isoDate, locale) {
  if (!DATE_LOCALES[locale]) throw new Error(`offerDate: no date format for ${locale}`);
  const date = new Date(`${isoDate}T00:00:00Z`);
  const text = new Intl.DateTimeFormat(DATE_LOCALES[locale], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(date);
  if (date.getUTCDate() !== 1) return text;
  if (locale === "fr") return text.replace(/^1 /, "1er ");
  if (locale === "it" || locale === "pt") return text.replace(/^1 /, "1º ");
  return text;
}

// The copy promises the regular price from regularPriceFrom, so a build after
// introPriceUntil must not keep advertising the introductory price.
export function introPriceExpired(today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(new Date())) {
  return Boolean(LOCAL_OFFER.introPriceUntil) && today > LOCAL_OFFER.introPriceUntil;
}
