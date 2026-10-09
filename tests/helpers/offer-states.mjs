import { LOCAL_OFFER, offerDate } from "../../data/local-offer.mjs";
import { PRICE_LANGUAGES, formatPrice } from "../../data/price-display.mjs";

// The two states data/local-offer.mjs moves between on 2026-11-01. Tests of the offer functions
// pass one of these explicitly, and tests of the built site branch on introOfferActive(), so the
// suite passes unchanged before and after the runbook clears the dates.
// Runbook: docs/release/2026-11-01-local-price-rise-runbook.zh-CN.md in the desktop repository.

// The introductory offer, as shipped until 31 October 2026.
export const INTRO_OFFER = Object.freeze({ ...LOCAL_OFFER, price: 29, regularPrice: 49, introPriceUntil: "2026-10-31", regularPriceFrom: "2026-11-01" });

// data/local-offer.mjs as the runbook (step 1) leaves it.
export const REGULAR_OFFER = Object.freeze({ ...LOCAL_OFFER, price: 49, regularPrice: 49, introPriceUntil: null, regularPriceFrom: null });

// The homepage languages with their own date format; Traditional Chinese uses the zh one.
export const DATE_LOCALES = ["en", "de", "fr", "es", "it", "nl", "pt", "zh", "ja", "ko"];

// Wording that belongs to the introductory offer only: its last day in every homepage language
// (every dated price sentence names it), the "introductory price" label of each language's pricing
// card (zh-hant as OpenCC writes it), and the /pricing/ price-change section and question.
// 1 November 2026 is left out: pages changed that day may show it as their own date.
export const INTRO_PHRASES = Object.freeze([
  ...new Set(DATE_LOCALES.map((locale) => offerDate(INTRO_OFFER.introPriceUntil, locale))),
  "introductory price", "Einführungspreis", "prix de lancement", "precio de lanzamiento", "prezzo di lancio",
  "introductieprijs", "preço de lançamento", "启动价", "啟動價", "ローンチ価格", "런칭 가격",
  "Price change on", "When does the Local price change?",
]);

// The introductory Local figure as a price span shows it in each language ("US$29", "29 US$" …).
export const INTRO_FIGURES = Object.freeze([...new Set(PRICE_LANGUAGES.map((lang) => formatPrice({ cents: INTRO_OFFER.price * 100, form: "main", lang })))]);
