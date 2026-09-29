import { LOCAL_OFFER, introOfferActive, offerDate } from "./local-offer.mjs";
import { formatPrice } from "./price-display.mjs";

// Every Dictivo Local sentence and schema.org Offer added for the introductory price is
// built here, from an offer object, so the 2026-11-01 rollover (dates cleared in
// data/local-offer.mjs) needs no copy change: with introOfferActive() false they state the
// regular price once, with no dates. Page copy keeps price placeholders; llms.txt and
// structured data get plain figures from the same offer.

const GUIDE_COPY = {
  en: {
    intro: (until, from, months) => `{{price.local.inline}} once until ${until}, then {{price.regular.inline}} from ${from}. Includes ${months} months of updates; optional renewal at {{price.renewal.inline}} a year.`,
    regular: (months) => `{{price.local.inline}} once. Includes ${months} months of updates; optional renewal at {{price.renewal.inline}} a year.`,
  },
  // German prices never end a sentence: "inkl. MwSt." already ends in a full stop.
  de: {
    intro: (until, from, months) => `Bis zum ${until} einmalig {{price.local.inline}}, ab dem ${from} einmalig {{price.regular.inline}}, jeweils mit ${months} Monaten Updates; danach optionale Verlängerung für {{price.renewal.inline}} pro Jahr.`,
    regular: (months) => `Einmalig {{price.local.inline}} mit ${months} Monaten Updates; danach optionale Verlängerung für {{price.renewal.inline}} pro Jahr.`,
  },
  ja: {
    intro: (until, from, months) => `${until}まで{{price.local.inline}}、${from}より{{price.regular.inline}}。${months}か月のアップデート付きで、以降の更新は任意で年{{price.renewal.inline}}。`,
    regular: (months) => `{{price.local.inline}}。${months}か月のアップデート付きで、以降の更新は任意で年{{price.renewal.inline}}。`,
  },
  zh: {
    intro: (until, from, months) => `截至 ${until} 为 {{price.local.inline}}，${from} 起为 {{price.regular.inline}}；含 ${months} 个月更新，之后可选每年 {{price.renewal.inline}} 续订。`,
    regular: (months) => `{{price.local.inline}} 一次买断；含 ${months} 个月更新，之后可选每年 {{price.renewal.inline}} 续订。`,
  },
};

// The Dictivo cell of the offline and speech-to-text guide price tables.
export function guideLocalPrice(locale, offer = LOCAL_OFFER) {
  const copy = GUIDE_COPY[locale];
  if (!copy) throw new Error(`No guide price copy for ${locale}`);
  const months = offer.includedUpdateMonths;
  return introOfferActive(offer)
    ? copy.intro(offerDate(offer.introPriceUntil, locale), offerDate(offer.regularPriceFrom, locale), months)
    : copy.regular(months);
}

// The media kit's "Paid Local" fact and its one-time license claim (English only).
export function mediaKitLocalFacts(offer = LOCAL_OFFER) {
  const months = offer.includedUpdateMonths;
  const renewal = `Update renewal ({{price.renewal.inline}} a year) is optional after the first year.`;
  if (!introOfferActive(offer)) {
    return {
      paidLocal: `{{price.local.inline}} once, including ${months} months of updates. ${renewal}`,
      licenseClaim: "One-time Local license ({{price.local.inline}})",
    };
  }
  const until = offerDate(offer.introPriceUntil, "en");
  const from = offerDate(offer.regularPriceFrom, "en");
  return {
    paidLocal: `{{price.local.inline}} once at the introductory price until ${until}; {{price.regular.inline}} once from ${from}. Both include ${months} months of updates. ${renewal}`,
    licenseClaim: `One-time Local license ({{price.local.inline}} until ${until}, then {{price.regular.inline}})`,
  };
}

const money = (dollars, lang = "en") => formatPrice({ cents: Math.round(dollars * 100), form: "inline", lang });

// The first line of the English llms.txt price section.
export function llmsLocalPriceLine(offer = LOCAL_OFFER) {
  const tail = "Prices are in US dollars, tax included.";
  if (!introOfferActive(offer)) return `Dictivo Local: ${money(offer.price)} once. ${tail}`;
  return `Dictivo Local: ${money(offer.price)} once until ${offerDate(offer.introPriceUntil, "en")} (introductory price), then ${money(offer.regularPrice)} once from ${offerDate(offer.regularPriceFrom, "en")}. ${tail}`;
}

// Structured-data price strings ("29", "8.99"), matching schemaPrice().
const schemaAmount = (dollars) => {
  const cents = Math.round(dollars * 100);
  return cents % 100 === 0 ? String(cents / 100) : (cents / 100).toFixed(2);
};

function offerNode(dollars, validity) {
  const price = schemaAmount(dollars);
  return {
    "@type": "Offer",
    name: "Dictivo Local",
    price,
    priceCurrency: "USD",
    ...validity,
    priceSpecification: { "@type": "PriceSpecification", price, priceCurrency: "USD", valueAddedTaxIncluded: true },
  };
}

// Dictivo Local Offers: introductory (until introPriceUntil) and regular (from
// regularPriceFrom) while the introductory offer runs, then the one current price, undated.
export function localOfferNodes(offer = LOCAL_OFFER) {
  if (!introOfferActive(offer)) return [offerNode(offer.price)];
  return [
    offerNode(offer.price, { priceValidUntil: offer.introPriceUntil }),
    offerNode(offer.regularPrice, { priceValidFrom: offer.regularPriceFrom }),
  ];
}
