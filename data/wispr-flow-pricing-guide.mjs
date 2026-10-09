import { LOCAL_OFFER } from "./local-offer.mjs";
import { guideLocalPrice } from "./local-offer-copy.mjs";

// What each Wispr Flow plan costs, as Wispr Flow's own pricing page, help center and terms
// state it. Every figure was read on WISPR_FLOW_PRICING_CHECKED from the page the reference
// list names. Where Wispr's pages disagree (student pricing, tax) both statements appear with
// their source; time-limited promotions are left out. Dictivo appears only in the closing
// section, disclosed as this site's product; its price comes from the Local offer.
// Monthly re-check: docs/research/2026-10-08-ahrefs-audit/price-watch.md in the desktop repository.
export const WISPR_FLOW_PRICING_LASTMOD = "2026-10-09";
export const WISPR_FLOW_PRICING_CHECKED = "2026-10-09";

const checked = `(checked ${WISPR_FLOW_PRICING_CHECKED})`;
const checkedOn = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${WISPR_FLOW_PRICING_CHECKED}T00:00:00Z`));

export const WISPR_FLOW_SOURCES = {
  pricing: "https://wisprflow.ai/pricing",
  plans: "https://docs.wisprflow.ai/articles/9559327591-flow-plans-and-what-s-included",
  discounts: "https://docs.wisprflow.ai/articles/1128761434-flow-discounts",
  students: "https://wisprflow.ai/students",
  tax: "https://docs.wisprflow.ai/articles/6671605687-vat-gst-tax-on-wispr-flow-invoices",
  wordCap: "https://docs.wisprflow.ai/articles/4760791189-free-tier-weekly-word-cap-and-bonus-words-remove-desktop-trial-experiment",
  trial: "https://docs.wisprflow.ai/articles/7140488640-trial-end-value-summary-in-wispr-flow",
  billing: "https://docs.wisprflow.ai/articles/4152811715-manage-your-billing-invoices-company-details-payment-method-and-cancellation",
  terms: "https://wisprflow.ai/terms-of-service",
  dataControls: "https://wisprflow.ai/data-controls",
};

export const WISPR_FLOW_PRICING_REFERENCES = [
  [`Wispr Flow: Pricing ${checked}`, WISPR_FLOW_SOURCES.pricing],
  [`Wispr Flow Help Center: Flow plans and what's included ${checked}`, WISPR_FLOW_SOURCES.plans],
  [`Wispr Flow Help Center: Request a Flow discount or fix student pricing ${checked}`, WISPR_FLOW_SOURCES.discounts],
  [`Wispr Flow: Flow for Students ${checked}`, WISPR_FLOW_SOURCES.students],
  [`Wispr Flow Help Center: VAT, GST & tax on Wispr Flow invoices ${checked}`, WISPR_FLOW_SOURCES.tax],
  [`Wispr Flow Help Center: Free tier weekly word cap and bonus words ${checked}`, WISPR_FLOW_SOURCES.wordCap],
  [`Wispr Flow Help Center: Trial End Value Summary in Wispr Flow ${checked}`, WISPR_FLOW_SOURCES.trial],
  [`Wispr Flow Help Center: Manage billing, invoices and cancellation ${checked}`, WISPR_FLOW_SOURCES.billing],
  [`Wispr Flow: Terms of Service, last updated 19 August 2026 ${checked}`, WISPR_FLOW_SOURCES.terms],
  [`Wispr Flow: Data Controls ${checked}`, WISPR_FLOW_SOURCES.dataControls],
];

// `windows` mirrors hasWindowsRelease; `offer` is the Local offer (a test passes the
// post-rollover terms). Only the Dictivo section quotes a Dictivo price.
export function wisprFlowPricingCopy({ windows, offer = LOCAL_OFFER }) {
  const platforms = windows ? "Mac and Windows" : "Mac";
  return {
    navLabel: "Wispr Flow pricing",
    metaTitle: "Wispr Flow Pricing: Free, Pro, Growth and Student Plans",
    metaDescription:
      "Wispr Flow plans checked against its own pricing page and help center: free weekly word limits, Pro and Growth by month or year, student pricing, tax, refunds.",
    eyebrow: "Wispr Flow pricing facts",
    title: "Wispr Flow pricing: what each plan costs and what it includes",
    lede:
      "Wispr Flow is a cloud dictation app with a free plan and paid plans billed per user. This page lists what Wispr Flow's own pricing page, help center and terms say about each plan, in US dollars, with the date we read them.",
    environmentLabel: "Checked",
    environment: `wisprflow.ai/pricing, the Wispr Flow help center and its Terms of Service (last updated 19 August 2026), read on ${checkedOn}. Prices change; each source is linked under References.`,
    answerTitle: "Short answer",
    answer:
      "Wispr Flow Free costs $0 and allows 2,000 dictated words a week on desktop and 1,000 on mobile. Pro is $15 per user per month billed monthly, or $144 per user per year billed annually ($12 a month). Growth, for teams, is $23 per user per month or $216 per user per year for dictation only, and $33 or $312 with the Notetaker included. Enterprise is priced by contract. The pricing page says students and educators with an education email get 50% off Pro. These are US dollar list prices; checkout in another currency shows that currency's own fixed price.",
    quickReference: {
      title: "Wispr Flow plans at a glance",
      caption: `Wispr Flow list prices in US dollars per user, from its pricing page and help center, checked on ${checkedOn}.`,
      headers: ["Plan", "Billed monthly", "Billed annually", "Dictation", "For"],
      rows: [
        ["Free", "$0", "$0", "2,000 words a week on desktop, 1,000 on mobile", "Individuals"],
        ["Pro", "$15 a month", "$144 a year ($12 a month)", "Unlimited", "Individuals and teams"],
        ["Growth, dictation only", "$23 a month", "$216 a year ($18 a month)", "Unlimited", "Teams; bought by an admin"],
        ["Growth with Notetaker", "$33 a month", "$312 a year ($26 a month)", "Unlimited", "Teams; bought by an admin"],
        ["Enterprise", "Custom", "Custom; new agreements are annual", "Unlimited", "Organizations, through sales"],
        ["Student (paid)", "$7.50 a month", "$72 a year", "Everything in Pro", "Students Wispr recognizes"],
      ],
    },
    tocLabel: "On this page",
    sections: [
      {
        kicker: "Free",
        title: "The free plan and its weekly limit",
        paragraphs: [
          "Flow Free is $0 and, in the pricing page's words, \"You never need a credit card to start.\" It allows 2,000 dictated words a week on Mac and Windows and 1,000 a week on mobile, where iPhone and Android share one allowance. On desktop the count resets on Sunday at 12 a.m. Pacific Time. Free also includes the Notetaker with a weekly meeting limit.",
          "Wispr's help center describes a standard 14-day Pro trial, set up at your first desktop login if you have not had one before; when it ends, the account moves to Flow Free. The Android app offers no new free trial.",
        ],
      },
      {
        kicker: "Pro",
        title: "Pro: monthly or annual billing",
        paragraphs: [
          "Pro is $15 per user per month billed monthly, or $144 per user per year billed annually, which the help center describes as a $12 monthly equivalent and a 20% saving. The pricing page lists unlimited dictation, longer Notetaker history, a shared dictionary and snippets, a shared team workspace, centralized billing and user management, team usage analytics, priority support and early access to new features.",
          "The help center says Pro, Growth and Enterprise can record up to 150 Notetaker meetings a week. Pro can be bought by card in the desktop app, through the App Store on iPhone and through Google Play on Android; the iPhone app also offers a weekly Pro plan. A Pro team needs no minimum number of seats.",
        ],
      },
      {
        kicker: "Teams",
        title: "Growth and Enterprise for teams",
        paragraphs: ["Growth comes in two versions, priced per user:"],
        table: {
          caption: `Wispr Flow Growth list prices in US dollars per user, checked on ${checkedOn}.`,
          headers: ["Growth option", "Billed monthly", "Billed annually"],
          rows: [
            ["Dictation only", "$23 a month", "$216 a year ($18 a month)"],
            ["Dictation and Notetaker", "$33 a month", "$312 a year ($26 a month)"],
          ],
        },
        notes: [
          "An admin buys Growth in the admin portal, by card only, monthly or annually; the help center says it has no platform fee or volume discounts. Over Pro it adds single sign-on with SAML, several email domains in one organization, organization-wide HIPAA enforcement with a signed business associate agreement, admin control over model training and individual usage reporting.",
          "Enterprise has custom pricing through Wispr's sales team. The help center says new Enterprise agreements are annual and billed by invoice or purchase order, and the pricing page lists free IT admin seats among its additions.",
        ],
      },
      {
        kicker: "Discounts",
        title: "Student, educator and nonprofit pricing",
        paragraphs: [
          "Wispr Flow describes its student offer in three places, and they differ:",
        ],
        steps: [
          "The pricing page FAQ: \"Students and educators with an education email get 50% off Flow Pro\", and nonprofit organizations get discounted Flow Pro, with no percentage given.",
          "The help center: students Wispr recognizes (by a .edu or listed university email domain) get paid Student pricing of $7.50 a month or $72 a year, and selected student accounts get an annual $0 plan; there is no monthly free student plan. Every discount, including educator and nonprofit, needs verification.",
          "The student page: sign in with an education email and \"we'll auto-activate your student offer: 3 months free, then $6/month (50% off).\"",
        ],
        notes: ["The price shown at checkout is the one that applies to your account."],
      },
      {
        kicker: "Billing terms",
        title: "Currency, tax, cancellation and refunds",
        paragraphs: [
          "The help center says checkout picks the currency from your region and defaults to US dollars. Each of 24 supported currencies has its own fixed price rather than a conversion, and existing subscribers keep their original price and currency. The figures on this page are the US dollar list prices.",
          "On tax, the help center says: \"The price shown at checkout is the final amount charged: we do not add VAT, GST, or other local sales tax.\" The Terms of Service say: \"You are responsible for all applicable taxes, and we will charge tax when required to do so.\"",
          "The pricing page says there are no commitments and you can cancel anytime. For card subscriptions, the help center says upgrades take effect immediately and downgrades at the end of the billing period. The Terms of Service say: \"Refunds are only issued if required by law.\" Subscriptions bought through the App Store or Google Play are managed, and refunded, by Apple or Google.",
        ],
      },
      {
        kicker: "Processing",
        title: "Where transcription happens",
        paragraphs: [
          "Wispr Flow's Data Controls page says: \"Transcription always occurs on the cloud.\" Its privacy settings change what Wispr stores, not where transcription runs. The pricing page lists dictation on Mac, Windows, iOS and Android.",
        ],
      },
    ],
    fieldTest: null,
    dictivo: {
      kicker: "Another option",
      title: "If you want a one-time local license instead",
      paragraphs: [
        "Dictivo is this site's product.",
        `If you want a one-time purchase with local dictation, Dictivo Local is ${guideLocalPrice("en", offer)} In Local mode it transcribes on your computer with a downloaded model instead of uploading the recording, then pastes the text into the app you are using.`,
        `It is a desktop app for ${platforms}. It has no mobile app and no meeting notetaker, so it does not replace those parts of Wispr Flow. The Tiny model is free, and a ${offer.trialDays}-day full Local trial needs no card.`,
      ],
      links: [
        ["Dictivo vs Wispr Flow: the full comparison", "/compare/wispr-flow-alternative/"],
        ["Dictivo pricing", "/pricing/"],
      ],
    },
    faqTitle: "Wispr Flow pricing questions",
    faqs: [
      ["Is Wispr Flow free?", "Yes, Flow Free costs $0 and needs no credit card. It allows 2,000 dictated words a week on desktop and 1,000 on mobile; Pro and the team plans have no dictation limit."],
      ["How much is Wispr Flow Pro?", "$15 per user per month billed monthly, or $144 per user per year billed annually ($12 a month), in US dollars. Other currencies have their own fixed prices at checkout."],
      [
        "Is there a Wispr Flow student discount?",
        "Yes. The pricing page says students and educators with an education email get 50% off Pro. The help center lists paid Student pricing of $7.50 a month or $72 a year and an annual $0 plan for selected student accounts, and the student page offers 3 months free, then $6 a month.",
      ],
      [
        "Does Wispr Flow add tax?",
        "The help center says the checkout price is the final amount and that Wispr does not add VAT, GST or other local sales tax. The Terms of Service say Wispr will charge tax when required to do so.",
      ],
      ["Can I get a refund from Wispr Flow?", "The Terms of Service say refunds are only issued if required by law. You can cancel at any time; App Store and Google Play purchases are refunded by Apple or Google."],
      ["What happens when I reach the free weekly limit?", "Dictation is limited until the weekly reset (Sunday, 12 a.m. Pacific Time on desktop), or until you upgrade to a paid plan."],
      ["Does Wispr Flow have a one-time or lifetime plan?", "The pricing page lists monthly and annual billing only, with no one-time or lifetime plan."],
    ],
    referencesTitle: "References",
  };
}
