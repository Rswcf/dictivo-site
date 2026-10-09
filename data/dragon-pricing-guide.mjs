import { LOCAL_OFFER } from "./local-offer.mjs";
import { guideLocalPrice } from "./local-offer-copy.mjs";

// What each Dragon product costs, as Nuance and Microsoft publish it. Every figure and status
// below was read on DRAGON_PRICING_CHECKED from the page in DRAGON_SOURCES that the reference
// list names; anything those pages do not state (a current Dragon Professional price, reseller
// quotes, set-up fees) is left out. Dragon Professional v16's product page no longer shows a
// price, so this page says so instead of repeating an old figure. Dictivo appears only in the
// closing section, disclosed as this site's product; its price comes from the Local offer.
// Monthly re-check: docs/research/2026-10-08-ahrefs-audit/price-watch.md in the desktop repository.
export const DRAGON_PRICING_LASTMOD = "2026-10-09";
export const DRAGON_PRICING_CHECKED = "2026-10-09";

const checked = `(checked ${DRAGON_PRICING_CHECKED})`;
const checkedOn = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${DRAGON_PRICING_CHECKED}T00:00:00Z`));

export const DRAGON_SOURCES = {
  professional: "https://dragon.nuance.com/en-us/dragon-professional",
  professionalDataSheet: "https://dragon.nuance.com/shared/data-sheets/ds-dragon-professional-v16-en-us.pdf",
  professionalAnywhere: "https://dragon.nuance.com/en-us/dragon-professional-anywhere",
  v15Notice: "https://nuance.custhelp.com/app/answers/detail/a_id/29838",
  macEndOfLife: "https://nuance.custhelp.com/app/answers/detail/a_id/27843",
  medicalOneMarketplace: "https://marketplace.microsoft.com/en-us/product/nuance_gskaff.dragon_medical_one_per_user?tab=PlansAndPrice",
  medicalOne: "https://www.microsoft.com/en-us/health-solutions/clinical-workflow/dragon-medical-one",
  medicalOneMac: "https://learn.microsoft.com/en-us/industry/healthcare/dragon-medical-one/admin/using-dragon-medical-one-with-mac",
  anywhereAppStore: "https://apps.apple.com/us/app/dragon-anywhere/id1024652126",
};

export const DRAGON_PRICING_REFERENCES = [
  [`Nuance: Dragon Professional product page ${checked}`, DRAGON_SOURCES.professional],
  [`Nuance: Dragon Professional v16 data sheet ${checked}`, DRAGON_SOURCES.professionalDataSheet],
  [`Nuance: Dragon Professional Anywhere ${checked}`, DRAGON_SOURCES.professionalAnywhere],
  [`Nuance support: Dragon Professional v14 and v15 Product Advisory Notice ${checked}`, DRAGON_SOURCES.v15Notice],
  [`Nuance support: Dragon Professional for Mac 6, end of life and end of support dates ${checked}`, DRAGON_SOURCES.macEndOfLife],
  [`Microsoft Marketplace: Dragon Medical One per user - US, plans and pricing ${checked}`, DRAGON_SOURCES.medicalOneMarketplace],
  [`Microsoft: Dragon Medical One ${checked}`, DRAGON_SOURCES.medicalOne],
  [`Microsoft Learn: Using Dragon Medical One with Mac ${checked}`, DRAGON_SOURCES.medicalOneMac],
  [`App Store: Dragon Anywhere by Nuance Communications, version history ${checked}`, DRAGON_SOURCES.anywhereAppStore],
];

// `windows` mirrors hasWindowsRelease; `offer` is the Local offer (a test passes the
// post-rollover terms). Only the Dictivo section quotes a Dictivo price.
export function dragonPricingCopy({ windows, offer = LOCAL_OFFER }) {
  const platforms = windows ? "Mac and Windows" : "Mac";
  return {
    navLabel: "Dragon pricing",
    metaTitle: "Dragon Dictation Pricing: Professional, Medical One, Mac",
    metaDescription:
      "What Dragon costs, checked against Nuance and Microsoft: Professional v16, Dragon Medical One per user, Anywhere Mobile, and what happened to Dragon for Mac.",
    eyebrow: "Dragon pricing facts",
    title: "What Dragon dictation costs: Professional, Medical One, Anywhere and Mac",
    lede:
      "Dragon is sold as several separate products, each with its own license. This page lists what Nuance and Microsoft publish about each one: the price, whether it is a subscription or a one-time license, whether you can still buy it, and where it runs.",
    environmentLabel: "Checked",
    environment: `Nuance's Dragon product pages and support articles, the Dragon Medical One listing on Microsoft Marketplace and Microsoft Learn, read on ${checkedOn}. Prices change; each source is linked under References.`,
    answerTitle: "Short answer",
    answer: `Nuance's Dragon Professional page (version 16, for Windows 10 and 11) no longer publishes a price: on ${checkedOn} it offered Contact us, and the old Nuance store address led to the same page. Dragon Medical One is a per-user cloud subscription; its Microsoft Marketplace listing shows $123 per user per month on a 1-year term ($1,476 per user per year) and asks buyers to confirm eligibility with Microsoft first. Dragon Anywhere Mobile has not been sold or renewable since 1 July 2026, and Dragon Home 15 has not been sold since 27 February 2023. Dragon for Mac was discontinued on 22 October 2018: existing licenses keep working without updates, and Dragon Medical One runs on a Mac only through Windows.`,
    quickReference: {
      title: "Dragon products at a glance",
      caption: `Dragon editions, prices and availability as published by Nuance and Microsoft, checked on ${checkedOn}.`,
      headers: ["Product", "Price published by Nuance or Microsoft", "License", "Can you buy it now?", "Runs on"],
      rows: [
        ["Dragon Professional v16", "Not published on Nuance's product page", "Installed on the PC; the product page does not state the license term", "Through Contact us on Nuance's page or an authorized Nuance reseller", "Windows 10 and 11"],
        ["Dragon Professional Anywhere", "Not published", "Cloud-hosted subscription", "Through Contact us on Nuance's page", "Windows"],
        ["Dragon Medical One", "$123 per user per month on a 1-year term (Microsoft Marketplace)", "Cloud subscription, per user", "Yes, after Microsoft confirms eligibility", "Windows; on a Mac only through Windows"],
        ["Dragon Anywhere Mobile", "-", "Subscription", "No: no new subscriptions or renewals since 1 July 2026", "iOS and Android"],
        ["Dragon Home 15", "-", "Perpetual", "No: not sold since 27 February 2023", "Windows"],
        ["Dragon Professional Individual for Mac 6", "-", "Perpetual; no updates after 22 October 2018", "No: discontinued on 22 October 2018", "macOS"],
      ],
    },
    tocLabel: "On this page",
    sections: [
      {
        kicker: "Windows desktop",
        title: "Dragon Professional v16: no published price",
        paragraphs: [
          `Nuance's Dragon Professional page describes version 16 as optimized for Windows 11 and compatible with Windows 10. On ${checkedOn} it showed no price and no checkout, only Contact us, and the Nuance store address for Dragon Professional led back to the same page. The same site lists Dragon Legal and Dragon Law Enforcement as separate products.`,
          "The v16 data sheet lists Windows 10 or 11 (or Windows Server 2016, 2019 or 2022), 4 GB of RAM and 8 GB of free disk space, and an internet connection for the product download and automatic activation.",
          "In its notice about the version 16 release, Nuance said that customers with a maintenance and support contract could upgrade free, that version 15 users without one would get discounted upgrade pricing, and that customers could reach Nuance through its website, an authorized Nuance reseller or a Nuance account executive. The same notice calls version 14 and 15 licenses perpetual. The Dragon Professional page does not state the license term for version 16, so ask Nuance or the reseller before you buy.",
        ],
      },
      {
        kicker: "Healthcare edition",
        title: "Dragon Medical One: a per-user subscription",
        paragraphs: [
          "Dragon Medical One is a cloud-based speech product for clinical documentation. Microsoft's Dragon Medical One page links to a Microsoft Marketplace listing, published by Nuance, that shows three plans, each a 1-year subscription priced per user:",
        ],
        table: {
          caption: `Dragon Medical One per user - US on Microsoft Marketplace, prices in US dollars as listed, checked on ${checkedOn}.`,
          headers: ["Plan on the listing", "Price per user", "Term", "Per user for the term"],
          rows: [
            ["DMO, HS, Term, User License (DMONE-TERM)", "$123 a month", "1-year subscription", "$1,476"],
            ["DMO and PMM, HS, Term, User License (DMOPMM-TERM)", "$99 a month", "1-year subscription", "$1,188"],
            ["PMM, Term, Authorized User License (PMOBILE-TERM)", "$20 a month", "1-year subscription", "$240"],
          ],
        },
        notes: [
          "PMM is PowerMic Mobile, which the listing describes as turning a smartphone into a microphone for Dragon Medical One. The listing asks buyers to contact Microsoft before purchasing to confirm eligibility and the purchasing process. It gives sell prices in US dollars and does not say whether tax is included.",
          "Microsoft's Dragon Medical One page also invites customers to migrate to Dragon Copilot. It does not publish a Dragon Copilot price.",
        ],
      },
      {
        kicker: "Mac",
        title: "Dragon on a Mac",
        paragraphs: [
          "Nuance discontinued Dragon Professional Individual for Mac on 22 October 2018. Its notice says owners of version 6 have a perpetual license and may keep using it, and that Nuance provides no updates after that date. The Dragon Professional v16 data sheet lists Windows only.",
          "Microsoft Learn says Dragon Medical One is a native Windows app that cannot be installed directly on a Mac. It can run on a Mac in three ways: in a Windows virtual machine such as Parallels Desktop or VMware Fusion, where dictating at the cursor in native macOS apps is not supported; in Windows installed through Boot Camp; or as a virtual app published with a tool such as Citrix, with the Mac as the endpoint.",
        ],
      },
      {
        kicker: "Discontinued",
        title: "Editions you can no longer buy",
        paragraphs: [
          "Dragon Anywhere Mobile: in the App Store notes for version 1.96, Nuance wrote that as of 1 July 2026 Dragon Anywhere Mobile is no longer available for sale, and that new subscriptions and renewals are no longer possible. The app uses cloud-based speech recognition and needs an internet connection to dictate.",
          "Dragon Home 15: Nuance's February 2023 notice says the English and German versions of Dragon Home 15, along with the version 15 Professional, Legal and Law Enforcement editions, were no longer available for purchase after 27 February 2023.",
        ],
      },
      {
        kicker: "License types",
        title: "Subscription or one-time license?",
        steps: [
          "Subscription: Dragon Medical One (per user, 1-year term on Microsoft Marketplace) and Dragon Professional Anywhere, which Nuance describes as cloud-hosted with subscription-based pricing. Dragon Anywhere Mobile was a subscription until it stopped being sold.",
          "Installed on the PC: Dragon Professional v16. Its product page does not state whether the license is perpetual or a term; confirm with Nuance or the reseller.",
          "Perpetual: Nuance's own description of the discontinued Dragon Professional Individual for Mac 6 and of Dragon versions 14 and 15.",
        ],
      },
    ],
    fieldTest: null,
    dictivo: {
      kicker: "Another option",
      title: "If you want a one-time local license",
      paragraphs: [
        `Dictivo is this site's product. It is a general-purpose dictation app for ${platforms}, not a clinical documentation product, and this page makes no claim about medical use.`,
        `If you want a one-time purchase with local dictation, Dictivo Local is ${guideLocalPrice("en", offer)} In Local mode it transcribes on your computer with a downloaded model, then pastes the text into the app you are using. The Tiny model is free, and a ${offer.trialDays}-day full Local trial needs no card.`,
      ],
      links: [
        ["Dictivo vs Dragon: the full comparison", "/compare/dragon-alternative/"],
        ["Dictivo pricing", "/pricing/"],
      ],
    },
    faqTitle: "Dragon pricing questions",
    faqs: [
      [
        "How much does Dragon Professional cost?",
        `Nuance's Dragon Professional page does not publish a price for version 16. On ${checkedOn} it offered Contact us; Nuance also sells through authorized resellers.`,
      ],
      [
        "Is Dragon a subscription or a one-time purchase?",
        "It depends on the product. Dragon Medical One and Dragon Professional Anywhere are subscriptions. Dragon Professional v16 is installed on the PC, and its product page does not state the license term. Nuance described the discontinued Mac edition and Dragon versions 14 and 15 as perpetual licenses.",
      ],
      [
        "How much does Dragon Medical One cost?",
        "Its Microsoft Marketplace listing shows $123 per user per month on a 1-year subscription ($1,476 per user for the year), $99 per user per month for the plan that includes PowerMic Mobile, and $20 per user per month for PowerMic Mobile alone. Buyers confirm eligibility with Microsoft before purchasing.",
      ],
      [
        "Can I still buy Dragon for Mac?",
        "No. Nuance discontinued Dragon Professional Individual for Mac on 22 October 2018. Existing version 6 licenses keep working but receive no updates.",
      ],
      [
        "Does Dragon Medical One work on a Mac?",
        "Not natively. Microsoft Learn says it is a Windows app; on a Mac it runs in a Windows virtual machine, in Windows through Boot Camp, or as a published virtual app.",
      ],
      [
        "Can I still buy Dragon Anywhere?",
        "No. Nuance's App Store notes say that as of 1 July 2026 Dragon Anywhere Mobile is no longer for sale and existing subscriptions cannot be renewed.",
      ],
      [
        "What happened to Dragon Home?",
        "Nuance stopped selling Dragon Home 15 after 27 February 2023, as part of the release of Dragon version 16. Nuance's current product pages list no Home edition.",
      ],
    ],
    referencesTitle: "References",
  };
}
