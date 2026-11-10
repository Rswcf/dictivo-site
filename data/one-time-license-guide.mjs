import { LOCAL_OFFER } from "./local-offer.mjs";
import { guideLocalPrice } from "./local-offer-copy.mjs";

// /guides/dictation-app-mac-windows-one-time-license/ (Batch B1, English only): dictation apps that
// run on both Mac and Windows and sell a one-time license (or are free). Every fact about another
// product was read on ONE_TIME_LICENSE_GUIDE_CHECKED on that vendor's own pages (competitor facts
// file of that date in the desktop repository), listed under Evidence links. Prices are as the
// vendor shows them, in its currency, never "US$". "Not stated" means the page read does not say
// it. Rows are alphabetical; Dictivo is last and labelled. Dictivo's price comes from the Local
// offer through price tokens. Mac-only apps belong on the no-subscription and offline Mac guides.
export const ONE_TIME_LICENSE_GUIDE_LASTMOD = "2026-11-10";
export const ONE_TIME_LICENSE_GUIDE_CHECKED = "2026-11-10";

const checked = `(checked ${ONE_TIME_LICENSE_GUIDE_CHECKED})`;

export const ONE_TIME_LICENSE_GUIDE_REFERENCES = [
  [`Handy: price and local transcription ${checked}`, "https://handy.computer/"],
  [`Handy downloads ${checked}`, "https://handy.computer/download"],
  [`Handy on GitHub: README and license ${checked}`, "https://github.com/cjpais/Handy"],
  [`JesType: platforms, prices and license ${checked}`, "https://jestype.com/"],
  [`JesType documentation: devices, updates and license checks ${checked}`, "https://jestype.com/docs/"],
  [`Koegaki: platforms, price, devices and license check ${checked}`, "https://koegaki.com/"],
  [`Lazytype: platforms and plans ${checked}`, "https://lazytype.com/"],
  [`Lazytype FAQ: default engine ${checked}`, "https://lazytype.com/faq"],
  [`Speakpad: platforms, price and license terms ${checked}`, "https://speakpad.app/"],
  [`Spokenly pricing: plans and Local+ ${checked}`, "https://spokenly.app/pricing"],
  [`Spokenly: platforms, devices and account ${checked}`, "https://spokenly.app/"],
  [`Superwhisper: platforms ${checked}`, "https://superwhisper.com/"],
  [`Superwhisper plans: Lifetime, devices and models ${checked}`, "https://superwhisper.com/docs/billing/plans"],
  [`Voicetypr: platforms and local default ${checked}`, "https://voicetypr.com/"],
  [`Voicetypr billing: prices, devices and updates ${checked}`, "https://voicetypr.com/help/billing"],
  [`Voicetypr privacy: account and network use ${checked}`, "https://voicetypr.com/help/privacy"],
  [`Voicetypr on GitHub: platforms and license ${checked}`, "https://github.com/ideaplexa/voicetypr"],
  [`Voxtira pricing: licenses, devices and updates ${checked}`, "https://voxtira.com/pricing"],
  [`Voxtira: on-device processing ${checked}`, "https://voxtira.com/"],
  ["Dictivo Homebrew tap", "https://github.com/deepviewsdev/homebrew-tap"],
];

const formatDate = (isoDate) =>
  new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${isoDate}T00:00:00Z`));

export const ONE_TIME_LICENSE_DICTIVO_ROW = "Dictivo (this site's product)";

// [Product, Runs on, One license covers Mac and Windows?, One-time price, Devices per license,
// Updates included, Transcribes on the device by default?]. The generator adds the Checked cell.
// The ItemList description is the "Runs on" cell, so keep those cells plain text.
function factRows(windows) {
  const unavailable = "Windows downloads are temporarily unavailable.";
  return [
    [
      "Handy",
      "macOS (Apple Silicon and Intel), Windows (x64 and ARM), Linux",
      "Not applicable: Handy is free",
      "Free and open source (MIT license)",
      "Not applicable (free)",
      "Not applicable (free)",
      "Yes. The project describes no cloud transcription.",
    ],
    [
      "JesType",
      "macOS 13.4 or later on Apple Silicon only, Windows 10 or later (64-bit)",
      "Yes. One key activates the Mac or the Windows app.",
      "€14.95 Personal, €34.95 Pro, €49.95 Team",
      "1, 3 or 6, by plan",
      'All updates included (vendor says "lifetime")',
      "Yes, after a model download. A paid license must go online for a check at least every 30 days.",
    ],
    [
      "Koegaki",
      "macOS 14 or later, Windows 10 and 11 (64-bit), Linux (Debian 12, Ubuntu 22.04 or later)",
      "Yes, and Linux as well",
      "$30",
      "Up to 10 of your own computers",
      'All updates included (vendor says "for life")',
      "Yes. The app also makes a daily online license check.",
    ],
    [
      "Lazytype",
      "macOS 12 or later, Windows 10 and 11",
      "Not stated. Both plans list Windows and macOS.",
      "€25 once (Personal plan). Pro is €5 a month.",
      "Not stated",
      "Not stated",
      "No. The default engine is a cloud service. An offline engine is included; you switch it on.",
    ],
    [
      "Speakpad",
      "macOS 14 or later on Apple Silicon, Windows 10 and 11 (64-bit, with an ARM build)",
      "No. Each license covers one platform.",
      "$19",
      "Up to 2 computers of one platform",
      "Free updates for version 1",
      "Yes, after the first model download",
    ],
    [
      "Spokenly",
      "macOS, Windows, Linux, iPhone",
      "Yes. Local+ works on every supported device where you sign in with the same Spokenly account.",
      "$29 once (Local+). Also a free plan, and Pro at $12 a month or $144 a year.",
      "Every supported device signed in to one Spokenly account",
      "Not stated",
      "Yes. The free plan uses on-device models and works offline. Your own API keys or Pro use cloud providers.",
    ],
    [
      "Superwhisper",
      "Mac, Windows, iOS, Android",
      "Yes. The paid license covers every platform the app supports.",
      "$249.99 (Lifetime plan). Also $8.49 a month or $84.99 a year.",
      "No device limit for Mac and Windows computers",
      "Not stated",
      "Not stated. The free plan uses local models only; Pro adds cloud models.",
    ],
    [
      "Voicetypr",
      "macOS 14 or later (Apple Silicon recommended, Intel best-effort), Windows 10 or later",
      "Not stated",
      "$39, $69, $99 or $199",
      "1, 2, 4 or 10, by price",
      'All updates included (vendor says "lifetime")',
      "Yes. Cloud transcription is optional.",
    ],
    [
      "Voxtira",
      "Mac (Apple Silicon and Intel), Windows",
      "Not stated",
      "$29 (1 device) or $39 (3 devices)",
      "1 or 3",
      "12 months of free updates. After that: not stated.",
      "Yes, after the first setup",
    ],
    [
      ONE_TIME_LICENSE_DICTIVO_ROW,
      windows ? "macOS (Apple Silicon and Intel), Windows x64" : `macOS (Apple Silicon and Intel). ${unavailable}`,
      windows ? "Yes" : unavailable,
      guideLocalPrice("en"),
      `Up to ${LOCAL_OFFER.personalDevices} personal devices`,
      `${LOCAL_OFFER.includedUpdateMonths} months, then optional renewal (see the price)`,
      "Yes, in Local mode. Cloud Fast is a separate online option.",
    ],
  ];
}

export function oneTimeLicenseGuideCopy({ windows, checked = ONE_TIME_LICENSE_GUIDE_CHECKED, lastmod = ONE_TIME_LICENSE_GUIDE_LASTMOD } = {}) {
  const checkedOn = formatDate(checked);
  const rows = factRows(windows);
  const devices = LOCAL_OFFER.personalDevices;
  const months = LOCAL_OFFER.includedUpdateMonths;
  const answer = windows
    ? `Five of the ten apps in the table sell one license that covers both Mac and Windows: JesType, Koegaki, Spokenly, Superwhisper and Dictivo. Speakpad sells a separate license per platform. Voicetypr, Voxtira and Lazytype do not say. Handy is free. The cheapest confirmed cross-platform license is JesType Personal at €14.95 for one device. We read the vendor pages on ${checkedOn}.`
    : `Four of the ten apps in the table sell one license that covers both Mac and Windows: JesType, Koegaki, Spokenly and Superwhisper. Dictivo's Windows downloads are temporarily unavailable. Speakpad sells a separate license per platform. Voicetypr, Voxtira and Lazytype do not say. Handy is free. The cheapest confirmed cross-platform license is JesType Personal at €14.95. We read the vendor pages on ${checkedOn}.`;
  const dictivoPlatforms = windows
    ? `One Dictivo Local license covers both desktop platforms, macOS and Windows x64, at the same price, on up to ${devices} personal devices.`
    : `Dictivo Local covers up to ${devices} personal devices. macOS is available. Windows x64 downloads are temporarily unavailable.`;
  return {
    navLabel: "One-time license, Mac and Windows",
    metaTitle: "Dictation Apps for Mac and Windows With a One-Time License",
    metaDescription: "Ten dictation apps for Mac and Windows with no subscription, compared: whether one license covers both systems, devices, updates and on-device processing.",
    title: "Which dictation apps work on both Mac and Windows with a one-time license?",
    lede: "Dictivo wrote this page, and Dictivo makes one of the apps listed. The table compares dictation apps that run on both Mac and Windows and that you can use without a subscription. It shows whether one license covers both systems, how many devices it covers, which updates it includes and where speech is transcribed.",
    lastUpdated: lastmod,
    answerTitle: "Short answer",
    answer,
    intentTitle: "Which one-time license question are you asking?",
    intentCaption: "Common ways people search for a Mac and Windows dictation app they buy once, and what to check for each",
    intentHeaders: ["How people ask", "What they usually want", "What to check"],
    intentRows: [
      [
        "dictation app for Mac and Windows one-time license",
        "One purchase that works on a Mac and on a Windows PC.",
        "Whether the license names both systems, and how many devices it covers.",
      ],
      [
        "dictation software for both Mac and PC",
        "The same dictation app on a Mac and on a Windows PC.",
        "Whether both versions exist today, and whether each needs its own license.",
      ],
      [
        "cross-platform dictation app buy once",
        "A one-time price instead of a monthly fee, on both systems.",
        "Which updates the price includes, and whether the default engine is in the cloud.",
      ],
      [
        "one license for Mac and Windows dictation",
        "One license key for a mix of Mac and Windows computers.",
        "Whether the vendor counts licenses per platform, per device or per account.",
      ],
      [
        "dictation app lifetime license Windows and Mac",
        "A license that does not expire.",
        "Whether the word lifetime covers the license, the updates, or both.",
      ],
    ],
    factTitle: "Mac and Windows dictation apps with a one-time license, compared",
    factCaption: "Dictation apps that run on Mac and Windows: license scope, one-time price, devices, updates and default processing, with check dates",
    factHeaders: ["Product", "Runs on", "One license covers Mac and Windows?", "One-time price", "Devices per license", "Updates included", "Transcribes on the device by default?", "Checked"],
    factRows: rows,
    methodTitle: "How this page was checked",
    method: [
      "We read each vendor's own pages on the date in the Checked column. The pages are listed under Evidence links. Prices are shown as each vendor shows them, in its own currency.",
      "Not stated means that the vendor pages we read do not say it. We did not fill gaps from memory or from other sites.",
      "Dictivo facts come from Dictivo's own pages and the app's source code.",
      "We did not install the other apps. This page does not measure speed or error rates, and it does not score the apps against each other.",
    ],
    methodSignature: `Dictivo team, ${checkedOn}.`,
    sections: [
      {
        title: "What 'one license for Mac and Windows' means",
        paragraphs: [
          "Vendors count a license in one of three ways: per platform, per device or per account. The way they count decides whether one purchase covers a Mac and a Windows PC.",
        ],
        bullets: [
          "Per platform: a Speakpad license covers one system, on up to two computers of that type. A Mac and a Windows PC need two licenses.",
          "Per device, on any supported system: Koegaki covers up to 10 of your own computers on Mac, Windows or Linux. JesType covers 1, 3 or 6 devices, by plan, and you can mix Mac and Windows.",
          windows
            ? `Per device, Mac and Windows x64: one Dictivo Local license covers up to ${devices} personal devices on either system.`
            : `Per device: one Dictivo Local license covers up to ${devices} personal devices. Windows x64 downloads are temporarily unavailable.`,
          "Per account: Spokenly Local+ works on every supported device where you sign in with the same Spokenly account.",
          "No device limit: Superwhisper's paid license covers every platform the app supports, with no device limit for Mac and Windows computers.",
          "Not stated: Voicetypr, Voxtira and Lazytype do not say whether one license covers both systems. Ask the vendor before you buy for two computers.",
        ],
      },
      {
        title: "What a one-time price includes: updates",
        paragraphs: [
          "A one-time price buys the right to use the app. Updates are a separate promise, and vendors make different ones.",
        ],
        bullets: [
          `Dictivo Local: a one-time purchase that you keep forever. It includes ${months} months of updates. After that, renewal is optional at {{price.renewal.inline}} a year. Without renewal, the version you have keeps working.`,
          "Voxtira: 12 months of free updates. The vendor does not say what happens after that.",
          "Speakpad: free updates for version 1.",
          "JesType, Koegaki and Voicetypr: the vendors say that all updates are included.",
          "Spokenly, Superwhisper and Lazytype: the pages we read state no update terms for the one-time plan.",
          "Handy: free and open source, so there is no license to renew.",
        ],
      },
      {
        title: "One-time does not always mean on-device",
        paragraphs: [
          "A one-time price says nothing about where speech is transcribed. Check the default engine before you dictate private text.",
        ],
        bullets: [
          "Lazytype: the default engine is a cloud service. The Personal plan includes an offline engine, which you switch on.",
          "Superwhisper: the free plan uses local models. Pro adds cloud voice models, and the vendor does not say which model is the default.",
          "Spokenly: the free plan uses on-device models. Your own API keys or the Pro plan send audio to a cloud provider.",
          "Voicetypr: transcribes offline by default. Cloud transcription is an option you choose.",
          "Dictivo: Local mode transcribes on the device after the model download. Cloud Fast is a separate, optional add-on that uploads the selected recording.",
          "License checks: some apps go online even when they transcribe locally. Koegaki checks the license daily. A paid JesType license must go online at least every 30 days. Dictivo uses the network for updates, license checks and optional Cloud Fast.",
        ],
      },
      {
        title: "Where Dictivo fits",
        paragraphs: [
          `Dictivo Local is a one-time purchase with no subscription. ${dictivoPlatforms}`,
          "Press the shortcut, speak, and Dictivo pastes the text into the app you are using. Local mode keeps dictation audio on the device. Cloud Fast is a separate add-on at {{price.cloudFast.inline}} a month for selected recordings.",
          `Dictivo has a ${LOCAL_OFFER.trialDays}-day full Local trial with no card and no account. The Tiny model is free forever. Dictivo has no mobile app, no Windows ARM build and no Linux build.`,
        ],
        bullets: [
          { html: '<a href="/privacy/where-dictation-audio-goes/">Where dictation audio goes</a> in Local mode and in Cloud Fast.' },
        ],
        link: { href: "/pricing/", label: "See Dictivo pricing" },
      },
      {
        title: "Try the same sentence on both computers",
        paragraphs: [
          "Use the trial to check one license on both systems. Dictate the same sentence on each computer and compare the results.",
        ],
        steps: [
          "On the Mac, use the Mac download button on this page.",
          { html: "Or install Dictivo with Homebrew: <code>brew install --cask deepviewsdev/tap/dictivo</code>. Homebrew installs the same signed app as the download button, and the app updates itself." },
          windows
            ? "On the Windows PC, use the Windows x64 installer. The Windows installer is not yet Authenticode-signed, so you may see up to two warnings. If SmartScreen shows an unknown-publisher notice when you run the installer, choose 'More info', then 'Run anyway'."
            : "Windows x64 downloads are temporarily unavailable. Start with the Mac steps.",
          "On each computer, choose Local and install a model.",
          "Click in a text field. Press Cmd+Shift+Space on the Mac or Ctrl+Shift+Space on Windows, speak the same sentence, and press the shortcut again.",
          "Compare the text on each computer and the corrections it needs.",
        ],
        link: { href: "/guides/first-local-dictation/", label: "First local dictation: setup and practice" },
      },
      {
        title: "When is a one-time license worth it?",
        paragraphs: [
          "A one-time license saves money when you would otherwise pay a subscription for several years. Compare the cost over the time you expect to use the app.",
          "Three years of Dictivo Local with updates cost {{price.threeYear.inline}} in total: the purchase and two optional renewals. Superwhisper's Lifetime plan is $249.99 once, and its yearly plan is $84.99 a year.",
          "A cheaper license can still be the right choice. JesType Personal is €14.95 for one device, Speakpad is $19 for one platform, Spokenly Local+ is $29 once for every device on one account, and Handy is free. Compare the device count, the update terms and the default engine, not only the price.",
        ],
        link: { href: "/pricing/", label: "Dictivo pricing and renewal terms" },
      },
    ],
    faqTitle: "One-time license questions",
    faqs: [
      [
        "Is there a dictation app with one license for both Mac and Windows?",
        windows
          ? "Yes. In this table, JesType, Koegaki, Spokenly, Superwhisper and Dictivo Local each sell one license that covers both systems. Speakpad sells one license per platform. Voicetypr, Voxtira and Lazytype do not say on the pages we read."
          : "Yes. In this table, JesType, Koegaki, Spokenly and Superwhisper each sell one license that covers both systems. Dictivo's Windows downloads are temporarily unavailable. Speakpad sells one license per platform. Voicetypr, Voxtira and Lazytype do not say on the pages we read.",
      ],
      [
        "Which cross-platform dictation apps have no subscription?",
        "JesType, Koegaki, Speakpad, Voicetypr and Voxtira sell one-time licenses and no subscription plan. Lazytype, Spokenly and Superwhisper sell a one-time plan beside a subscription. Handy is free. Dictivo Local is a one-time purchase; Cloud Fast is a separate monthly add-on.",
      ],
      [
        "Does one Dictivo Local license cover Mac and Windows?",
        windows
          ? `Yes. One Dictivo Local license covers both desktop platforms, macOS and Windows x64, at the same price. It covers up to ${devices} personal devices.`
          : `The license covers up to ${devices} personal devices. macOS is available now. Windows x64 downloads are temporarily unavailable.`,
      ],
      [
        "Does a one-time price include updates forever?",
        `Not always. Dictivo Local includes ${months} months of updates, then optional renewal at {{price.renewal.inline}} a year. Voxtira includes 12 months, and Speakpad covers version 1. JesType, Koegaki and Voicetypr say that all updates are included. Superwhisper and Lazytype state no update terms on the pages we read.`,
      ],
      [
        "Which of these apps work offline on both systems?",
        "Handy, JesType, Koegaki, Speakpad, Voicetypr and Voxtira transcribe on the device by default, and so does Dictivo in Local mode. Lazytype uses a cloud engine by default. Spokenly and Superwhisper use local models on their free plans and offer cloud models as options. Model downloads and some license checks still need the internet.",
      ],
      [
        "Is Superwhisper's lifetime license cross-platform?",
        "Yes. Superwhisper says its paid license works on every platform it supports, with no device limit for Mac and Windows computers. The Lifetime plan is $249.99 once. The plans page states no update terms for Lifetime.",
      ],
      [
        "Is there a free dictation app for both Mac and Windows?",
        `Yes. Handy is free and open source under the MIT license, with builds for macOS, Windows and Linux. Spokenly and Superwhisper have free plans with local models. Dictivo includes the Tiny model free forever and a ${LOCAL_OFFER.trialDays}-day full Local trial.`,
      ],
      [
        "Does Dictivo run on Windows ARM or Linux?",
        windows
          ? "No. Dictivo runs on macOS, on Apple Silicon and Intel Macs, and on Windows x64. There is no Windows ARM build and no Linux build."
          : "No. Dictivo runs on macOS, on Apple Silicon and Intel Macs. Windows x64 downloads are temporarily unavailable. There is no Windows ARM build and no Linux build.",
      ],
    ],
    relatedTitle: "Related Dictivo pages",
    relatedRows: [
      [
        "Offline dictation on Windows",
        "Compare Windows dictation tools by where audio is processed.",
        "https://dictivo.app/guides/offline-dictation-on-windows/",
      ],
      [
        "Offline dictation on Mac",
        "Compare which Mac dictation apps keep audio on the device.",
        "https://dictivo.app/guides/offline-dictation-on-mac/",
      ],
      [
        "Best speech-to-text apps for Mac",
        "Mac speech-to-text apps by workflow, with prices and check dates.",
        "https://dictivo.app/guides/best-speech-to-text-apps-for-mac/",
      ],
      [
        "Mac dictation apps with no subscription",
        "Compare Mac dictation apps you can buy once.",
        "https://dictivo.app/guides/mac-dictation-app-no-subscription/",
      ],
      [
        "Superwhisper alternative",
        "Compare Dictivo and Superwhisper by focus and price.",
        "https://dictivo.app/compare/superwhisper-alternative/",
      ],
      [
        "Pricing",
        "Dictivo Local, update renewal and Cloud Fast prices.",
        "https://dictivo.app/pricing/",
      ],
      [
        "Where dictation audio goes",
        "What leaves the device in Local mode and in Cloud Fast.",
        "https://dictivo.app/privacy/where-dictation-audio-goes/",
      ],
    ],
    referencesTitle: "Evidence links",
  };
}
