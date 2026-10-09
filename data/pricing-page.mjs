import { LOCAL_OFFER } from "./local-offer.mjs";

// /pricing/: English only for now. The renderer reads PRICING_PAGE_COPY[code], so another
// language is added here without changing it; until then that language's pricing links keep
// pointing at its homepage section. Copy here never names the Local price or an offer date:
// those sentences come from the pricing functions in data/local-offer-copy.mjs, which follow
// the 2026-11-01 rollover by themselves. Renewal and Cloud Fast prices do not change then and
// stay placeholders here.
export const PRICING_PAGE_LASTMOD = "2026-10-09";

const { includedUpdateMonths: months, personalDevices: devices, trialDays } = LOCAL_OFFER;

export const PRICING_PAGE_COPY = {
  en: {
    navLabel: "Pricing",
    metaTitle: "Dictivo Pricing: Buy Local Once, Free Tier, Cloud Fast",
    metaDescription:
      `What Dictivo costs: a free Tiny tier, a one-time Local license with ${months} months of updates for up to ${devices} devices, and optional Cloud Fast by the month.`,
    eyebrow: "Pricing",
    title: "Dictivo pricing: what Local costs and what it includes",
    lede: "Prices are in US dollars, tax included: the total you see is the total you pay at checkout. Nothing on this page needs a Dictivo account to read or to try.",
    answerTitle: "Short answer",
    plansTitle: "Free, Local and Cloud Fast",
    plansIntro: "The same three plans as on the homepage. The table below sets them side by side.",
    tableTitle: "The three options side by side",
    tableCaption: (checked) => `Dictivo plans compared. Prices in US dollars, tax included. Checked on ${checked}.`,
    tableHeaders: ["", "Free Local", "Dictivo Local", "Cloud Fast"],
    // The Dictivo Local price cell is pricingPlanPrice(); `null` marks where it goes.
    tableRows: (windows) => [
      ["Price", "Free", null, "{{price.cloudFast.inline}} a month"],
      ["Local models", `Tiny model included; every local model for ${trialDays} days`, "Every local model", "Not needed - uses cloud transcription for the recordings you choose"],
      ["Where audio is processed", "On your device", "On your device", "Uploaded for the recordings you send through Cloud Fast"],
      ["Updates", "App updates included", `${months} months included, then optional renewal at {{price.renewal.inline}} a year`, "Not affected by Cloud Fast"],
      ["Devices", "-", `Up to ${devices} personal devices`, { html: '<a href="/terms/">See terms</a>' }],
      ["Trial / free minutes", `${trialDays}-day full Local trial; 10 lifetime Cloud Fast minutes on this device`, "-", "10 free minutes on this device"],
      ["Refund", "-", "14-day no-questions refund", "14-day no-questions refund"],
      ...[windows ? "macOS; Windows x64" : "macOS"].map((platforms) => ["Platforms", platforms, platforms, platforms]),
    ],
    audioNote: ["Local and Cloud Fast treat audio differently.", "See where dictation audio goes in each mode", "/privacy/where-dictation-audio-goes/"],
    sections: [
      {
        id: "pricing-section-license",
        title: "What the Local license includes",
        paragraphs: [
          `A Local license is perpetual for the version you buy. It includes ${months} months of updates and new local models, and it covers up to ${devices} personal devices. You may use it for personal, professional and commercial work.`,
          "After you buy, return to Dictivo and activate Local with the license key from your purchase email. You do not create a Dictivo account to do this.",
          `When the ${months} months end, the version you have keeps working. Renewing updates is optional at {{price.renewal.inline}} a year and is needed only for future app updates and new local models.`,
        ],
      },
      {
        id: "pricing-section-free",
        title: "What is free",
        paragraphs: [
          `The Tiny local model is free forever. Every new install also starts a ${trialDays}-day full Local trial with every local model unlocked, plus 10 lifetime Cloud Fast minutes on that device. The trial needs no card and no Dictivo account.`,
          "When the trial ends, Dictivo keeps working with the Tiny model. Nothing is charged unless you decide to buy.",
        ],
        links: [["Try your first sentence with the trial", "/guides/first-local-dictation/"]],
      },
      {
        id: "pricing-section-cloud-fast",
        title: "Cloud Fast",
        paragraphs: [
          "Use Local when words are private. Use Cloud Fast for low-sensitivity work when waiting breaks your flow.",
          "Cloud Fast is {{price.cloudFast.inline}} a month and includes 1,500 transcription minutes per month. It works standalone or alongside Dictivo Local, and it uploads only the recordings you choose to send through it. Local mode stays available whenever privacy matters more.",
        ],
      },
      // The price-change section (pricingPriceChangeSection) renders here while the introductory offer runs.
      {
        id: "pricing-section-refunds",
        title: "Refunds and the EU right of withdrawal",
        paragraphs: [
          "Every purchase has a 14-day no-questions refund. To request one, email support@dictivo.app with the purchase email and order reference.",
          "If you are a consumer in the European Union, you also have a statutory right to withdraw from a distance contract within 14 days, without giving a reason. That right exists independently of the refund policy: it is granted by law, not by us.",
        ],
        links: [["Refund policy", "/refund/"], ["Terms of use", "/terms/"]],
      },
    ],
    priceChangeId: "pricing-section-price-change",
    priceChangeBefore: "pricing-section-refunds",
    faqTitle: "Pricing questions",
    lastUpdated: "Last updated",
  },
};
