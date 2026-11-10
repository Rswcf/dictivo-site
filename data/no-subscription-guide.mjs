import { guideLocalPrice } from "./local-offer-copy.mjs";
import { OFFLINE_GUIDE_PRICES_CHECKED } from "./offline-dictation-guide.mjs";

// 2026-11-10 (Batch B1): new answer page for "dictation app mac no subscription". Twelve rows,
// alphabetical with Dictivo last. Every competitor row except Voice Type was read on
// NO_SUBSCRIPTION_GUIDE_CHECKED (competitor facts file of that date in the desktop repository, and
// a live price spot-check the same day for Spokenly Pro and Voibe); Voice Type keeps the site's
// OFFLINE_GUIDE_PRICES_CHECKED facts. No app was tested by
// hand: the facts come from vendor pages and documentation. The Mac and Windows license question
// belongs to /guides/dictation-app-mac-windows-one-time-license/, so the H1, title, description,
// intent rows and headings avoid "Windows", "cross-platform" and "offline".
export const NO_SUBSCRIPTION_GUIDE_LASTMOD = "2026-11-10";
export const NO_SUBSCRIPTION_GUIDE_CHECKED = "2026-11-10";

const checkedLabel = `(checked ${NO_SUBSCRIPTION_GUIDE_CHECKED})`;

export const NO_SUBSCRIPTION_GUIDE_REFERENCES = [
  ["Dictivo pricing and license terms", "https://dictivo.app/pricing/"],
  ["Dictivo audio path", "https://dictivo.app/privacy/where-dictation-audio-goes/"],
  [`Apple: Use Dictation on Mac, macOS 14 guide ${checkedLabel}`, "https://support.apple.com/en-us/guide/mac-help/mh40584/14.0/mac/14.0"],
  [`Handy on GitHub: README and license ${checkedLabel}`, "https://github.com/cjpais/Handy"],
  [`Handy downloads ${checkedLabel}`, "https://handy.computer/download"],
  [`JesType: platforms, prices and license ${checkedLabel}`, "https://jestype.com/"],
  [`JesType documentation: updates and license checks ${checkedLabel}`, "https://jestype.com/docs/"],
  [`MacWhisper: features and pricing ${checkedLabel}`, "https://macwhisper.com/"],
  [`MacWhisper licensing and devices ${checkedLabel}`, "https://docs.macwhisper.com/article/39-licensing"],
  [`Spokenly pricing ${checkedLabel}`, "https://spokenly.app/pricing"],
  [`Spokenly: plans and monthly price ${checkedLabel}`, "https://spokenly.app/"],
  [`Superwhisper plans ${checkedLabel}`, "https://superwhisper.com/docs/billing/plans"],
  [`Superwhisper platforms and local models ${checkedLabel}`, "https://superwhisper.com/"],
  [`VoiceInk pricing and requirements ${checkedLabel}`, "https://tryvoiceink.com/pricing"],
  [`Voicetypr billing ${checkedLabel}`, "https://voicetypr.com/help/billing"],
  [`Voicetypr platforms and local processing ${checkedLabel}`, "https://voicetypr.com/"],
  [`Wispr Flow pricing ${checkedLabel}`, "https://wisprflow.ai/pricing"],
  [`Wispr Flow: What is Flow ${checkedLabel}`, "https://docs.wisprflow.ai/articles/2772472373-what-is-flow"],
  [`Voibe pricing and platforms ${checkedLabel}`, "https://www.getvoibe.com/pricing/"],
  ["Voibe security", "https://www.getvoibe.com/security/"],
  ["Voice Type App Store listing and price, checked 2026-09-29", "https://apps.apple.com/us/app/voice-type-offline-dictation/id6736525125?mt=12"],
  ["Dictivo Homebrew tap", "https://github.com/deepviewsdev/homebrew-tap"],
];

const formatDate = (isoDate) =>
  new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${isoDate}T00:00:00Z`));

const DICTIVO = "Dictivo (this site's product)";

// Rows that keep the site's 2026-09-29 facts (OFFLINE_DICTATION_GUIDE_COPY.en) instead of a re-read.
const SITE_CHECKED_ROWS = ["Voice Type"];

// [App, Mac requirement, How you pay, One-time price, Updates included, Transcribes on the Mac by
// default?]. The generator adds the "Checked" cell. The ItemList description is "How you pay".
function factRows(windows) {
  return [
    [
      "Apple Dictation",
      "Built into macOS. On-device processing needs Apple Silicon and a supported language.",
      "Included with macOS",
      "n/a (included with macOS)",
      "n/a (part of macOS)",
      "On Apple Silicon, for supported languages. On an Intel Mac, speech is sent to Apple.",
    ],
    [
      "Handy",
      "Apple Silicon and Intel builds. Minimum macOS: Not stated.",
      "Free (open source)",
      "n/a (free, MIT license)",
      "n/a (free)",
      "Yes. The project describes no cloud transcription.",
    ],
    [
      "JesType",
      "Apple Silicon only, macOS 13.4 or later",
      "One-time",
      "Personal €14.95 (1 device), Pro €34.95 (3 devices), Team €49.95 (6 devices)",
      'All updates included (vendor says "lifetime")',
      "Yes, after a model download. The license is checked online; a paid license works without a connection for up to 30 days.",
    ],
    [
      "MacWhisper",
      "Not stated",
      "Free tier + one-time Pro",
      "Pro €64 once",
      'All updates included (vendor says "lifetime")',
      "Yes, with local models. Remote models are optional.",
    ],
    [
      "Spokenly",
      "Not stated",
      "Free tier + one-time Local+ (Pro is a subscription)",
      "Local+ $29 once. Pro is $15 a month, or $144 a year ($12 a month billed yearly).",
      "Not stated",
      "Yes on the free plan, which uses on-device models. Your own API keys or Pro send audio to a cloud provider.",
    ],
    [
      "Superwhisper",
      "Not stated. The vendor says its local models run well only on Apple Silicon.",
      "Subscription or one-time Lifetime",
      "Lifetime $249.99 once. Pro is $8.49 a month or $84.99 a year.",
      "Not stated. The vendor says Lifetime keys never expire.",
      "The free plan uses local models. Pro adds cloud models; the default is not stated.",
    ],
    [
      "Voibe",
      "Not stated",
      "Subscription or one-time lifetime",
      "$199 per seat once for lifetime access. Also $9.90 a month or $99 a year.",
      "Every future update of the lifetime plan included (vendor statement)",
      "On-Device Mode only; Intel Macs use cloud transcription",
    ],
    [
      "Voice Type",
      "Not stated",
      "One-time (App Store in-app purchase)",
      "$19.99 once, after 7 days free",
      "Not stated",
      "Yes. Its App Store listing says audio stays on the device.",
    ],
    [
      "VoiceInk",
      "Apple Silicon, macOS 14.4 or later (pricing page)",
      "One-time",
      "Solo $25 (1 Mac), Personal $39 (2 Macs), Extended $49 (3 Macs)",
      'All updates included (vendor says "lifetime")',
      "Yes. Optional Cloud Enhancement sends text, not audio.",
    ],
    [
      "Voicetypr",
      "macOS 14 or later. Apple Silicon recommended; Intel is best-effort.",
      "One-time",
      "$39 (1 device), $69 (2), $99 (4), $199 (10)",
      'All updates included (vendor says "lifetime")',
      "Yes. Cloud transcription is optional.",
    ],
    [
      "Wispr Flow",
      "Not stated",
      "Subscription only",
      "None. Pro is $15 a month, or $12 a month billed yearly.",
      "n/a (subscription)",
      "No. Transcription needs an internet connection.",
    ],
    [
      DICTIVO,
      windows
        ? "Apple Silicon and Intel. Minimum macOS: Not stated. The same license also covers Windows x64."
        : "Apple Silicon and Intel. Minimum macOS: Not stated. Windows downloads are temporarily unavailable.",
      "One-time (Dictivo Local)",
      guideLocalPrice("en"),
      "12 months included, then optional renewal. The version you bought keeps working.",
      "Yes in Local mode. Cloud Fast, an optional monthly add-on, uploads the recordings you send through it.",
    ],
  ];
}

export function noSubscriptionGuideCopy({ windows, checked = NO_SUBSCRIPTION_GUIDE_CHECKED, lastmod = NO_SUBSCRIPTION_GUIDE_LASTMOD } = {}) {
  const checkedOn = formatDate(checked);
  const siteCheckedOn = formatDate(OFFLINE_GUIDE_PRICES_CHECKED);
  const rows = factRows(windows);
  const free = rows.filter(([, , pay]) => pay !== "Subscription only").length;
  const dictivoPlatforms = windows
    ? "Dictivo runs on Mac and Windows x64."
    : "Dictivo runs on Mac; its Windows downloads are temporarily unavailable.";
  const devices = windows
    ? "Yes. One Dictivo Local license covers up to 3 personal devices. They can be Macs or Windows x64 PCs, at the same price."
    : "Yes. One Dictivo Local license covers up to 3 personal Macs. Windows downloads are temporarily unavailable.";
  return {
    navLabel: "Mac dictation, no subscription",
    metaTitle: "Mac Dictation Apps With No Subscription: One-Time Options",
    metaDescription: "Mac dictation apps you buy once or use free, with no subscription: Dictivo, VoiceInk, MacWhisper, Superwhisper, Voice Type, Spokenly and Handy, with prices.",
    title: "Which Mac dictation apps have no subscription?",
    lede: `Dictivo writes this page, and Dictivo is this site's product. The table shows ${rows.length} Mac dictation options: how you pay, what a one-time price costs, which updates it includes and where speech is turned into text.`,
    lastUpdated: lastmod,
    answerTitle: "Short answer",
    answer: `Of the ${rows.length} Mac dictation options in the table, ${free} need no subscription; only Wispr Flow is subscription-only. The lowest one-time prices are JesType Personal at €14.95 and Voice Type at $19.99 on the App Store. Dictivo Local, this site's product, is a one-time purchase that includes 12 months of updates. Most rows were checked on ${checkedOn}; Voice Type on ${siteCheckedOn}.`,
    intentTitle: "Which no-subscription question are you asking?",
    intentCaption: "Common ways people search for a Mac dictation app without a subscription, and what to check for each",
    intentHeaders: ["How people ask", "Short answer", "What to check"],
    intentRows: [
      [
        "dictation app mac no subscription",
        `${free} of the ${rows.length} options in the table need no subscription. Wispr Flow is subscription-only.`,
        "Whether a one-time price includes future updates.",
      ],
      [
        "one time purchase dictation app mac",
        "JesType, VoiceInk, Voicetypr, Voice Type and Dictivo Local sell one-time licenses. MacWhisper, Spokenly, Superwhisper and Voibe sell one next to other plans.",
        "Which plan the one-time price buys, and how many Macs it covers.",
      ],
      [
        "lifetime license dictation mac",
        "Superwhisper and Voibe sell a lifetime license next to their subscriptions.",
        "A lifetime license is not always a promise of every future update. Read the update terms.",
      ],
      [
        "mac dictation app buy once",
        "One-time prices in the table start at €14.95 (JesType Personal) and $19.99 (Voice Type).",
        "The device limit and the Mac chips the app supports.",
      ],
      [
        "free dictation app mac no subscription",
        "Apple Dictation is built in. Handy is free and open source. MacWhisper, Spokenly and Superwhisper have free tiers.",
        "The limits of the free tier and where speech is processed.",
      ],
      [
        "is Dictivo a subscription",
        "No. Dictivo Local is a one-time purchase with 12 months of updates. Renewal is optional.",
        "Cloud Fast is a separate monthly add-on. You do not need it to use Dictivo Local.",
      ],
    ],
    factTitle: "Mac dictation apps with no subscription, compared",
    factCaption: "Mac dictation apps by how you pay, one-time price, included updates and where speech is processed, with check dates",
    factHeaders: ["App", "Mac requirement", "How you pay", "One-time price", "Updates included", "Transcribes on the Mac by default?", "Checked"],
    factRows: rows,
    rowChecked: Object.fromEntries(rows.map(([name]) => [name, SITE_CHECKED_ROWS.includes(name) ? OFFLINE_GUIDE_PRICES_CHECKED : checked])),
    methodTitle: "How this page was checked",
    method: [
      "The facts about other apps come from each vendor's own pages and documentation, read on the date in the Checked column. The pages are listed under Evidence links. We did not install or use the apps for this page.",
      "Prices are shown as each vendor shows them, in its own currency. Where a vendor page did not state a fact, the cell says Not stated.",
      "Dictivo facts come from Dictivo's own pages and the app's source code. This page does not measure speed or error rates, and it does not score the apps against each other.",
    ],
    methodSignature: `Dictivo team, ${checkedOn}.`,
    sections: [
      {
        title: "No subscription is not the same as updates forever",
        paragraphs: [
          "A one-time price buys the app. It does not always buy every future version. Read what each vendor says about updates before you pay.",
          "JesType, MacWhisper, VoiceInk and Voicetypr say their one-time price includes all updates; their own word is \"lifetime\". Voibe says its lifetime seat includes every future update of that plan. Superwhisper says Lifetime keys never expire, but its plans page does not state update terms. Spokenly and Voice Type do not state update terms on the pages we read.",
          "Dictivo Local includes 12 months of updates. After that, renewal is optional. The version you bought keeps working without it.",
        ],
      },
      {
        title: "Mac-only, or also on a PC?",
        paragraphs: [
          "Apple Dictation, MacWhisper and VoiceInk are Mac apps. MacWhisper and VoiceInk also mention iPhone or iPad versions.",
          `Handy, JesType, Spokenly, Superwhisper, Voibe, Voicetypr and Wispr Flow also run on Windows. ${dictivoPlatforms}`,
          "For Voice Type, this page uses its Mac listing only.",
        ],
        link: {
          label: "Need one license for Mac and Windows? Compare dictation apps with a one-time license for both",
          href: "/guides/dictation-app-mac-windows-one-time-license/",
        },
      },
      {
        title: "Apple Silicon or Intel",
        paragraphs: [
          "Check your Mac's chip before you buy. Some apps in the table do not run on Intel Macs, and some change how they work there.",
        ],
        bullets: [
          "VoiceInk and JesType run only on Apple Silicon Macs.",
          "Voicetypr recommends Apple Silicon and supports Intel Macs on a best-effort basis.",
          "Superwhisper says its local models run well only on Apple Silicon.",
          "Voibe uses cloud transcription on Intel Macs.",
          "Apple Dictation sends speech to Apple on an Intel Mac.",
          "Handy offers separate builds for Apple Silicon and Intel Macs.",
          "Dictivo runs on Apple Silicon and Intel Macs.",
        ],
      },
      {
        title: "Where Dictivo fits",
        paragraphs: [
          "Dictivo Local is a one-time purchase. You keep it forever. It includes 12 months of updates, and renewal after that is optional.",
          "In Local mode, Dictivo transcribes on your Mac after the model download. Press the shortcut, speak, and Dictivo pastes the text into the app you are using.",
          "The Tiny model is free forever. A 14-day trial of every local model needs no card and no Dictivo account. Cloud Fast is the only monthly option, and it is optional.",
        ],
        bullets: [
          { html: 'What happens after the 12 months of updates: <a href="/pricing/#pricing-faq">pricing questions</a>.' },
        ],
        link: { label: "See Dictivo pricing and license terms", href: "/pricing/" },
      },
      {
        title: "Try before you buy",
        paragraphs: [
          "Try the app on your own Mac, with your own words, before you pay. The trial includes every local model.",
        ],
        steps: [
          "Download Dictivo with the download button on this page.",
          { html: "Or install with Homebrew: <code>brew install --cask deepviewsdev/tap/dictivo</code>. The cask installs the same signed, notarized universal app." },
          "Open Dictivo, choose Set up Local, and download the recommended model.",
          "Allow Microphone access, and Accessibility access when Dictivo asks.",
          "Click a text field in any app and press Cmd+Shift+Space. Speak, then press the shortcut again. Dictivo pastes the text.",
          "Repeat with a note or an email you write every week, and check how much you need to fix.",
        ],
        link: { label: "Follow the first local dictation guide", href: "/guides/first-local-dictation/" },
      },
      {
        title: "When is paying once worth it?",
        paragraphs: [
          "A subscription costs money every month you use it. Wispr Flow Pro is $12 to $15 a month. A one-time license costs once, and the version you bought keeps working.",
          "Paying once makes sense when you dictate most days and expect to use the app for more than a year. Check the update terms too: they decide what you get after the first year.",
          "If you dictate only now and then, start with Apple Dictation or a free app. Pay only when a paid app saves you real work on your own Mac.",
        ],
        link: { label: "Compare Dictivo's one-time price and renewal", href: "/pricing/" },
      },
    ],
    faqTitle: "No-subscription Mac dictation questions",
    faqs: [
      [
        "Which Mac dictation apps have no subscription?",
        "In this table: Apple Dictation (built in), Handy (free), JesType, MacWhisper Pro, Spokenly Local+, Superwhisper Lifetime, Voibe lifetime, Voice Type, VoiceInk, Voicetypr and Dictivo Local. Superwhisper and Voibe also sell subscriptions. Wispr Flow is subscription-only.",
      ],
      [
        "Is Dictivo a subscription?",
        "No. Dictivo Local is a one-time purchase that you keep forever. It includes 12 months of updates, and renewal is optional. Cloud Fast is a separate, optional monthly add-on.",
      ],
      [
        "What happens after Dictivo's 12 months of updates?",
        "The version you have keeps working. You can renew updates for {{price.renewal.inline}} a year, or keep using your version without renewing.",
      ],
      [
        "Does Superwhisper have a one-time price?",
        "Yes. Superwhisper sells a Lifetime plan for $249.99 once, next to Pro at $8.49 a month or $84.99 a year. Its plans page does not state update terms for Lifetime.",
      ],
      [
        "Is MacWhisper a one-time purchase?",
        "Yes. MacWhisper Pro is €64 once, and MacWhisper says it includes all updates. There is also a free version. The personal license has a soft limit of 3 devices.",
      ],
      [
        "Which no-subscription Mac dictation apps are free?",
        "Apple Dictation is included with macOS. Handy is free and open source under the MIT license. MacWhisper, Spokenly and Superwhisper have free tiers. Dictivo's Tiny model is free forever.",
      ],
      [
        "Do one-time Mac dictation apps work offline?",
        "Many do, but check the default. JesType, MacWhisper, VoiceInk, Voicetypr, Voice Type and Dictivo Local transcribe on the Mac by default. Voibe does so only in On-Device Mode, and Superwhisper Pro adds cloud models. Wispr Flow needs an internet connection.",
      ],
      [
        "Can I use one Dictivo license on more than one Mac?",
        devices,
      ],
    ],
    relatedTitle: "Related Dictivo pages",
    relatedRows: [
      [
        "Offline dictation on Mac",
        "Compare which Mac dictation apps keep speech on the Mac.",
        "https://dictivo.app/guides/offline-dictation-on-mac/",
      ],
      [
        "Best speech-to-text apps for Mac",
        "Compare Mac dictation apps by workflow.",
        "https://dictivo.app/guides/best-speech-to-text-apps-for-mac/",
      ],
      [
        "Dictation apps for Mac and Windows with a one-time license",
        "Compare apps where one purchase covers both desktop platforms.",
        "https://dictivo.app/guides/dictation-app-mac-windows-one-time-license/",
      ],
      [
        "Superwhisper alternative",
        "Compare Dictivo with Superwhisper by focus and price.",
        "https://dictivo.app/compare/superwhisper-alternative/",
      ],
      [
        "MacWhisper alternative",
        "Compare Dictivo with MacWhisper for dictation and recorded files.",
        "https://dictivo.app/compare/macwhisper-alternative/",
      ],
      [
        "VoiceInk alternative",
        "Compare Dictivo with VoiceInk, another one-time Mac app.",
        "https://dictivo.app/compare/voiceink-alternative/",
      ],
      [
        "Pricing",
        "Dictivo's one-time price, included updates and renewal.",
        "https://dictivo.app/pricing/",
      ],
      [
        "Refunds",
        "Dictivo's refund terms.",
        "https://dictivo.app/refund/",
      ],
    ],
    referencesTitle: "Evidence links",
  };
}
