import { LOCAL_OFFER } from "./local-offer.mjs";
import { guideLocalPrice } from "./local-offer-copy.mjs";
import { DRAGON_PRICE_STATUS, DRAGON_PROFESSIONAL_PRICE_SENTENCE } from "./dragon-price-status.mjs";

// Dictation software for Mac and Windows, grouped by need. Every platform, processing and price
// statement about another product was read on BEST_DICTATION_SOFTWARE_CHECKED on that vendor's own
// page, linked under References. Prices are as the vendor states them (its currency, never "US$");
// built-in tools are "built in", not "free", because their vendors state no price.
// Dictivo is disclosed in the first sentence, listed last, and appears only in the groups it fits;
// its price comes from the Local offer. Nothing on the page ranks accuracy or speed.
// The year in the title is the year of the last full check, so it changes only when every price
// is re-read (first re-check of 2027: 4 January).
// Monthly re-check: docs/research/2026-10-08-ahrefs-audit/price-watch.md in the desktop repository.
export const BEST_DICTATION_SOFTWARE_LASTMOD = "2026-10-10";
export const BEST_DICTATION_SOFTWARE_CHECKED = "2026-10-10";

const year = BEST_DICTATION_SOFTWARE_CHECKED.slice(0, 4);
const checked = `(checked ${BEST_DICTATION_SOFTWARE_CHECKED})`;
const checkedOn = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${BEST_DICTATION_SOFTWARE_CHECKED}T00:00:00Z`));

export const BEST_DICTATION_SOFTWARE_SOURCES = {
  appleMac: "https://support.apple.com/guide/mac-help/mh40584/mac",
  appleFeatures: "https://www.apple.com/macos/feature-availability/",
  appleIphone: "https://support.apple.com/guide/iphone/iph2c0651d2/ios",
  voiceTyping: "https://support.microsoft.com/en-us/accessibility/windows/use-voice-typing-to-talk-instead-of-type-on-your-pc",
  voiceAccess: "https://support.microsoft.com/en-us/accessibility/windows/voice-access/set-up-voice-access",
  wordDictate: "https://support.microsoft.com/en-us/office/dictate-your-documents-in-word-3876e05f-3fcc-418f-b8ab-db7ce0d11d3c",
  googleDocs: "https://support.google.com/docs/answer/4492226?hl=en",
  gboard: "https://support.google.com/gboard/answer/2781851?hl=en",
  dragon: DRAGON_PRICE_STATUS.productPage,
  handy: "https://handy.computer/",
  handyGithub: "https://github.com/cjpais/Handy",
  macwhisper: "https://www.macwhisper.com/",
  spokenly: "https://spokenly.app/pricing",
  spokenlyWindows: "https://spokenly.app/windows",
  superwhisperPlans: "https://superwhisper.com/docs/billing/plans",
  superwhisperModels: "https://superwhisper.com/models",
  superwhisperWindows: "https://superwhisper.com/docs/get-started/windows",
  superwhisper: "https://superwhisper.com/",
  voiceinkPricing: "https://tryvoiceink.com/pricing",
  voiceink: "https://tryvoiceink.com/",
  voibePricing: "https://www.getvoibe.com/pricing/",
  voibeSecurity: "https://www.getvoibe.com/security/",
  wisprPricing: "https://wisprflow.ai/pricing",
  wisprData: "https://wisprflow.ai/data-controls",
};

const S = BEST_DICTATION_SOFTWARE_SOURCES;

export const BEST_DICTATION_SOFTWARE_REFERENCES = [
  [`Apple: Use Dictation on Mac ${checked}`, S.appleMac],
  [`Apple: macOS Feature Availability, Dictation languages ${checked}`, S.appleFeatures],
  [`Apple: Dictate text on iPhone ${checked}`, S.appleIphone],
  [`Microsoft: Use voice typing to talk instead of type on your PC ${checked}`, S.voiceTyping],
  [`Microsoft: Set up voice access ${checked}`, S.voiceAccess],
  [`Microsoft: Dictate your documents in Word ${checked}`, S.wordDictate],
  [`Google Docs Editors Help: Type & edit with your voice ${checked}`, S.googleDocs],
  [`Gboard Help: Type with your voice ${checked}`, S.gboard],
  [`Nuance: Dragon Professional (Windows) ${checked}`, S.dragon],
  [`Handy ${checked}`, S.handy],
  [`Handy on GitHub: README and license ${checked}`, S.handyGithub],
  [`MacWhisper: features and pricing ${checked}`, S.macwhisper],
  [`Spokenly: plans and pricing ${checked}`, S.spokenly],
  [`Spokenly for Windows ${checked}`, S.spokenlyWindows],
  [`Superwhisper: plans and pricing ${checked}`, S.superwhisperPlans],
  [`Superwhisper: speech recognition models ${checked}`, S.superwhisperModels],
  [`Superwhisper on Windows ${checked}`, S.superwhisperWindows],
  [`Superwhisper: languages ${checked}`, S.superwhisper],
  [`VoiceInk: pricing ${checked}`, S.voiceinkPricing],
  [`VoiceInk: privacy and open source ${checked}`, S.voiceink],
  [`Voibe: pricing ${checked}`, S.voibePricing],
  [`Voibe: security, on-device and cloud modes ${checked}`, S.voibeSecurity],
  [`Wispr Flow: pricing ${checked}`, S.wisprPricing],
  [`Wispr Flow: data controls ${checked}`, S.wisprData],
];

// The order of the table and the product notes: built-in tools, then apps alphabetically, then
// Dictivo. Each name is the row label and the note heading.
export const BEST_DICTATION_SOFTWARE_ORDER = [
  "macOS Dictation",
  "Windows voice typing (Win+H)",
  "Windows voice access",
  "Google Docs voice typing",
  "Microsoft Word Dictate",
  "Dragon Professional v16",
  "Handy",
  "MacWhisper",
  "Spokenly",
  "Superwhisper",
  "Voibe",
  "VoiceInk",
  "Wispr Flow",
  "Dictivo (this site's product)",
];

// The line under the comparison hub's introduction (English hub only).
export const BEST_DICTATION_SOFTWARE_HUB_LINK = Object.freeze({
  label: "Not choosing between Dictivo and one other app? See the best dictation software by need: free, fully local, Windows and buy-once picks",
  href: "/guides/best-dictation-software/",
});

// `windows` mirrors hasWindowsRelease; `offer` is the Local offer (a test passes the
// post-rollover terms). Dictivo's price appears in its table row, its buy-once entry and its note.
export function bestDictationSoftwareCopy({ windows, offer = LOCAL_OFFER }) {
  const dictivoPrice = guideLocalPrice("en", offer);
  const dictivoPlatforms = windows ? "Mac and Windows" : "Mac";
  return {
    dictivoPrice,
    navLabel: "Best dictation software",
    metaTitle: `Best Dictation Software ${year}: Mac, Windows & Free Options`,
    metaDescription:
      "Dictation software for Mac and Windows grouped by need: free, offline, Windows, several languages or bought once, with prices from each vendor's own page.",
    eyebrow: "Dictation software guide",
    title: `Best dictation software in ${year}, by what you need`,
    lede:
      "This guide is written by Dictivo, which makes one of the apps listed. It groups dictation software for Mac and Windows by what you need, with each product's platforms, where it turns speech into text and its price, as each vendor publishes them.",
    environmentLabel: "Checked",
    environment: `each vendor's own product, pricing and help pages, read on ${checkedOn} and linked under References. No vendor paid to be listed. Nothing here is an accuracy or speed ranking: the apps were not tested against each other for this page.`,
    answerTitle: "Short answer",
    answer: `The right dictation software depends on your computer and on whether your voice may leave it. To pay nothing extra, start with what is built in: Dictation in macOS, voice typing (Windows key + H) or voice access in Windows 11, and voice typing in Google Docs. For free dictation that stays on your computer on Mac, Windows and Linux, Handy is free and open source, and Superwhisper and Spokenly have free local models. To buy once instead of subscribing, VoiceInk and MacWhisper (Mac) and Dictivo (${dictivoPlatforms}) sell one-time licenses, and Superwhisper and Voibe offer lifetime licenses beside their subscriptions. For dictation on a phone as well as a computer, Wispr Flow runs in the cloud on Mac, Windows, iPhone and Android. Dragon Professional is still sold for Windows, through Nuance's sales team.`,
    quickReference: {
      title: "Dictation software at a glance",
      caption: `Built-in tools first, then apps in alphabetical order, with Dictivo (this site's product) last. Prices in each vendor's currency, as published on its own site, checked on ${checkedOn}.`,
      headers: ["Software", "Runs on", "Where speech becomes text", "Free option", "Paid price"],
      rows: [
        ["macOS Dictation", "Mac", "Keyboard settings show whether it is processed on your Mac", "Built into macOS", "No separate price"],
        ["Windows voice typing (Win+H)", "Windows 11", "Online, by Azure Speech services; needs an internet connection", "Built into Windows", "No separate price"],
        ["Windows voice access", "Windows 11, version 22H2 and later", "On the PC, after a one-time language download", "Built into Windows 11", "No separate price"],
        ["Google Docs voice typing", "Google Docs in current Chrome, Edge or Safari", "Your browser's speech-to-text service", "Part of Google Docs", "No separate price"],
        ["Microsoft Word Dictate", "Word for Microsoft 365 on Windows and Mac, and Word for the web", "Online; needs a reliable internet connection", "No: Microsoft 365 subscribers only", "Part of a Microsoft 365 subscription"],
        ["Dragon Professional v16", "Windows 10 and 11", "Installed on the PC", "No", "No public price: sales contact only"],
        ["Handy", "Mac, Windows and Linux", "On your computer; works offline", "Free and open source (MIT license)", "None"],
        ["MacWhisper", "Mac", "Local models on the Mac; remote models optional", "Free version", "€64 once for Pro, with lifetime updates"],
        ["Spokenly", "Mac, Windows, Linux and iPhone", "Local models offline; Pro adds cloud models", "Local models, with no account", "Pro $9.99 a month or $99.99 a year"],
        ["Superwhisper", "Mac, Windows, iPhone and Android", "Local models on the device; Pro adds cloud models", "Unlimited dictation with local Whisper models", "Pro $8.49 a month, $84.99 a year or $249.99 once"],
        ["Voibe", "Mac and Windows", "On the Mac in On-Device Mode; Windows and Intel Macs use a zero-retention cloud mode", "Voibe Free: limited words on one device", "Dictation $7.50 a month, $75 a year or $149 once, per seat"],
        ["VoiceInk", "Mac with Apple silicon, macOS 14.4 or later", "On the Mac; optional Cloud Enhancement sends text, not audio", "Free trial", "$25 once for 1 Mac, $39 for 2, $49 for 3"],
        ["Wispr Flow", "Mac, Windows, iPhone and Android", "In the cloud", "2,000 words a week on desktop, 1,000 on mobile", "Pro $15 a month, or $12 a month billed annually, per user"],
        ["Dictivo (this site's product)", windows ? "Mac and Windows x64" : "Mac", "On the computer in Local mode; optional Cloud Fast uploads only the recordings you send", "Tiny model; 14-day full Local trial", dictivoPrice],
      ],
    },
    tocLabel: "On this page",
    sections: [
      {
        kicker: "Free",
        title: "Which dictation software is free?",
        paragraphs: [
          "Start with what your computer already has. Dictation in macOS, voice typing and voice access in Windows 11, and voice typing in Google Docs come with the system or app, with no separate price. They differ in where speech is processed: Windows voice typing needs an internet connection, while voice access works on the PC after a one-time language download.",
          "These apps say they are free, within the limits given:",
        ],
        bullets: [
          "Handy is free and open source (MIT license) on Mac, Windows and Linux, and works completely offline.",
          "Superwhisper's free plan allows unlimited dictation with its local Whisper models. Spokenly's local models are free with no word cap and no account, on Mac, Windows and Linux.",
          "MacWhisper has a free version for the Mac.",
          "Wispr Flow Free allows 2,000 words a week on desktop and 1,000 on mobile. Voibe Free allows a limited number of words on one Mac or Windows PC.",
          `Dictivo's Tiny model is free with no time limit, and every new install gets a ${offer.trialDays}-day trial of the larger local models, which need the paid license afterwards.`,
        ],
        notes: [`Free plans change: the limits above are as each vendor published them on ${checkedOn}.`],
      },
      {
        kicker: "Fully local",
        title: "Which dictation software works offline, without uploading your voice?",
        paragraphs: [
          "If recordings must not leave your computer, choose software that runs its speech model on the computer, and check that the mode you use is the local one: several apps offer both.",
        ],
        bullets: [
          "Handy (Mac, Windows, Linux) transcribes on your computer and works completely offline.",
          "Windows voice access (Windows 11, version 22H2 and later) writes text without an internet connection, once it has downloaded its language files for on-device speech recognition.",
          "macOS Dictation: Keyboard settings show whether your dictation is processed on the Mac rather than sent to Apple.",
          "VoiceInk processes voice transcription on the Mac. MacWhisper runs local models on the Mac and also offers remote ones.",
          "Superwhisper and Spokenly run local models on the device on Mac and Windows; their cloud models are a separate choice.",
          "Voibe transcribes on the Mac in On-Device Mode; on Windows and Intel Macs it uses a zero-retention cloud mode instead.",
          `Dictivo (${dictivoPlatforms}) transcribes on the computer in Local mode, once a model is installed; its optional Cloud Fast uploads only the recordings you send through it.`,
        ],
        notes: [
          "Not local: Windows voice typing (Win+H) and Word Dictate need an internet connection, and Wispr Flow says transcription always occurs in the cloud. Local processing alone does not make a tool suitable for regulated work; follow your organization's rules.",
        ],
        links: [
          ["Offline dictation on Mac, compared", "/guides/offline-dictation-on-mac/"],
          ["Offline dictation on Windows, compared", "/guides/offline-dictation-on-windows/"],
        ],
      },
      {
        kicker: "Windows",
        title: "What dictation software works on Windows?",
        paragraphs: [
          "Windows 11 has two built-in options: voice typing, which you start with Windows key + H in a text field and which needs an internet connection, and voice access, which works on the PC after setup. These separate apps also run on Windows:",
        ],
        bullets: [
          "Handy: free, open source and offline.",
          "Superwhisper: Windows 10 and 11, on x64 and ARM64; one Pro license covers Mac, Windows, iPhone and Android.",
          "Spokenly: Windows 10 and 11, 64-bit, from the Microsoft Store; local models are free.",
          "Voibe: every paid seat includes Mac and Windows; on Windows it transcribes in its zero-retention cloud mode.",
          "Wispr Flow: cloud dictation on Windows, Mac, iPhone and Android.",
          "Dragon Professional v16: Windows 10 and 11, sold through Nuance's sales team.",
          ...(windows ? ["Dictivo: Windows x64, with Local mode on the PC. Its installer is not yet code-signed, so Windows may show a warning during setup."] : []),
        ],
        links: [
          ["Windows voice typing not working: what to check", "/guides/windows-voice-typing-not-working/"],
          ["Dragon pricing, edition by edition", "/guides/dragon-pricing/"],
        ],
      },
      {
        kicker: "Mac",
        title: "What about dictation software for Mac?",
        paragraphs: [
          "Besides macOS Dictation, these all run on a Mac: MacWhisper, VoiceInk, Superwhisper, Spokenly, Voibe, Wispr Flow, Handy and Dictivo. VoiceInk needs a Mac with Apple silicon and macOS 14.4 or later. For a Mac-only comparison by workflow, including apps for transcribing recordings, see the Mac guide.",
        ],
        links: [
          ["Best speech-to-text apps for Mac, compared by workflow", "/guides/best-speech-to-text-apps-for-mac/"],
          ["Mac dictation not working: what to check", "/guides/mac-dictation-not-working/"],
        ],
      },
      {
        kicker: "Several languages",
        title: "Which dictation software handles several languages?",
        paragraphs: ["Language support below is as each vendor lists it; check your own language and accent during a trial."],
        bullets: [
          "Wispr Flow lists 100+ languages, Superwhisper 100+ languages and dialects, and Spokenly 100+ languages for offline dictation. MacWhisper's transcription supports 100 languages.",
          "Handy's Parakeet V3 model detects the language automatically; it also offers Whisper models.",
          "macOS Dictation can be set up for several languages and switch between them; Apple's feature availability page lists the languages for each Dictation feature.",
          "Windows voice access is available in 15 languages and dialects. Windows voice typing and Google Docs voice typing each publish their own list of supported languages.",
        ],
      },
      {
        kicker: "Buy once",
        title: "Which dictation apps can you buy once instead of subscribing?",
        bullets: [
          "VoiceInk is currently listed at $25 for one Mac, $39 for two or $49 for three, with lifetime updates and a 14-day money-back guarantee.",
          "MacWhisper Pro is €64 per license, with lifetime updates.",
          "Superwhisper Pro Lifetime is $249.99 once; monthly and annual plans also exist.",
          "Voibe Dictation is $149 per seat once for lifetime access, which Voibe marks as a limited-time option.",
          `Dictivo Local is ${dictivoPrice}`,
        ],
        notes: ["Wispr Flow and Spokenly Pro are monthly or annual subscriptions, and Dragon Professional has no public price."],
      },
      {
        kicker: "Phone and computer",
        title: "Which dictation apps work on a phone as well as a computer?",
        paragraphs: [
          "Wispr Flow runs on Mac, Windows, iPhone and Android. One Superwhisper Pro license covers unlimited Macs and Windows PCs plus an iPhone and an Android phone. Spokenly Pro is available on macOS, Windows, Linux and iOS.",
          "Phones also have dictation built in. Apple says iPhone Dictation is processed on the iPhone in many languages with no internet connection required, and on Android, the microphone key in Gboard lets you talk to write in most places where you can type. Dictivo has no mobile app.",
        ],
      },
      {
        kicker: "Recordings and meetings",
        title: "What if you also need to transcribe recordings or meetings?",
        paragraphs: [
          "Live dictation and transcribing a recording are different jobs. MacWhisper transcribes audio and video files and can record meetings in Zoom, Teams and other apps; Superwhisper Pro adds file transcription; Voibe Work and Wispr Flow's Notetaker take meeting notes. Dictivo is for live dictation and does not import recorded files.",
        ],
      },
      {
        kicker: "Product notes",
        title: "Each product in brief",
        paragraphs: ["In the same order as the table. Each note gives what the vendor publishes and who the product suits; the limits are the ones the vendor states."],
        entries: [
          {
            title: "macOS Dictation",
            paragraphs: [
              "Built into macOS: place the cursor where the text should go and press the Microphone key or the Dictation shortcut. Keyboard settings show whether general dictation is processed on your Mac and not sent to Apple's Siri servers. It suits occasional dictation with nothing to install. Apple notes that Dictation is not available in all languages or regions, and that it stops after 30 seconds without speech.",
            ],
            links: [["Mac dictation shortcut: where it is and how to change it", "/guides/mac-dictation-shortcut/"]],
          },
          {
            title: "Windows voice typing and voice access",
            paragraphs: [
              "Voice typing starts with Windows key + H in a text field and uses Microsoft's online speech recognition (Azure Speech services), so it needs an internet connection. Voice access, in Windows 11 version 22H2 and later, controls the PC and writes text without an internet connection once its language files are downloaded; Microsoft lists 15 languages and dialects for it. Both suit anyone on Windows 11 who wants to try dictation before installing anything.",
            ],
          },
          {
            title: "Google Docs voice typing",
            paragraphs: [
              "In Google Docs, choose Tools > Voice typing and click the microphone. Google says it works in current Chrome, Edge and Safari, and that your browser controls the speech-to-text service before the text reaches Docs. It suits people who already write in Google Docs; it works in Docs and in Slides speaker notes, not in other apps, and its voice commands are English only.",
            ],
          },
          {
            title: "Microsoft Word Dictate",
            paragraphs: [
              "Word's Dictate button turns speech into text in Word for Microsoft 365 on Windows and Mac and in Word for the web. Microsoft says it needs a microphone and a reliable internet connection, and that it is available only to Microsoft 365 subscribers. It suits people who already pay for Microsoft 365 and write in Word.",
            ],
          },
          {
            title: "Dragon Professional v16",
            paragraphs: [
              "Nuance's long-running dictation software for Windows 10 and 11, installed on the PC; Nuance also lists Dragon Legal and Dragon Law Enforcement. It suits organizations that already run Dragon. It runs only on Windows, and it is bought through Nuance's sales team.",
              DRAGON_PROFESSIONAL_PRICE_SENTENCE,
            ],
            links: [["Dragon pricing, edition by edition", "/guides/dragon-pricing/"]],
          },
          {
            title: "Handy",
            paragraphs: [
              "A free, open-source (MIT license) app for Mac, Windows and Linux: press a shortcut, speak, and it pastes the text into the app you are using. It runs Whisper or Parakeet models on your computer and works completely offline. It suits anyone who wants free local dictation in a simple tool; its maintainers list known issues, such as limited Wayland support on Linux.",
            ],
          },
          {
            title: "MacWhisper",
            paragraphs: [
              "A Mac app for transcribing audio and video files that also offers system-wide dictation. Its local models process content on your Mac, and you can switch to remotely hosted models. The free version is free forever; MacWhisper Pro is €64 per license, paid once, with lifetime updates. It suits people who transcribe recordings, meetings or subtitles as well as dictate.",
            ],
          },
          {
            title: "Spokenly",
            paragraphs: [
              "Dictation for Mac, Windows, Linux and iPhone. Its local Whisper and Parakeet models are free with no word cap, no trial clock and no account, and work offline; you can also connect your own API keys without paying Spokenly. Pro, at $9.99 a month or $99.99 a year, adds Spokenly's cloud models and AI text cleanup. It suits people who want free local dictation with an optional cloud upgrade.",
            ],
          },
          {
            title: "Superwhisper",
            paragraphs: [
              "Dictation for Mac, Windows, iPhone and Android. The free plan allows unlimited dictation with local Whisper models, and Superwhisper says nothing you dictate on it leaves your device. Pro adds cloud models, AI modes and file transcription for $8.49 a month, $84.99 a year or $249.99 once, and one license covers all your devices. It suits people who want configurable modes and a choice of models.",
            ],
          },
          {
            title: "Voibe",
            paragraphs: [
              "Dictation for Mac and Windows, with a Voibe Work plan that adds meeting notes. On the Mac, On-Device Mode transcribes locally; Windows and Intel Macs use a zero-retention cloud mode. Voibe Free allows limited words on one device; Voibe Dictation is $7.50 a month, $75 a year or $149 once per seat, with a 30-day money-back guarantee. It suits people who want one seat to cover a Mac and a Windows PC.",
            ],
          },
          {
            title: "VoiceInk",
            paragraphs: [
              "A Mac dictation app for Apple silicon Macs running macOS 14.4 or later. It transcribes on the Mac; its optional Cloud Enhancement processes transcribed text, not your voice. It is currently listed at $25 once for one Mac, $39 for two or $49 for three, with lifetime updates and a 14-day money-back guarantee, and its source code is published on GitHub. It suits Mac users who want local dictation bought once.",
            ],
          },
          {
            title: "Wispr Flow",
            paragraphs: [
              "Cloud dictation for Mac, Windows, iPhone and Android; Wispr Flow says transcription always occurs in the cloud. Free allows 2,000 words a week on desktop and 1,000 on mobile; Pro is $15 per user a month, or $12 a month billed annually, with unlimited dictation. It suits people who dictate on a computer and a phone and are comfortable with cloud processing.",
            ],
            links: [["Wispr Flow pricing, plan by plan", "/guides/wispr-flow-pricing/"]],
          },
          {
            title: "Dictivo (this site's product)",
            paragraphs: [
              `Dictivo is this site's product. It is a desktop dictation app for ${dictivoPlatforms}: in Local mode it transcribes on the computer after a model is installed, then pastes the text into the app you are using. Optional Cloud Fast, at {{price.cloudFast.inline}} a month, uploads only the recordings you send through it. The Tiny model is free, and a ${offer.trialDays}-day full Local trial needs no card or Dictivo account.`,
              `Dictivo Local is ${dictivoPrice} It has no mobile app and does not import recorded files.`,
            ],
            links: [
              ["Dictivo pricing", "/pricing/"],
              ["Set up your first local dictation", "/guides/first-local-dictation/"],
            ],
          },
        ],
      },
      {
        kicker: "Before you pay",
        title: "How to compare dictation software before you pay",
        paragraphs: [
          "Dictate the same short paragraph in each tool, with names and terms from your own work, and count the corrections you make. Dictate into the app you actually write in: a transcript that looks right in a tool's own window may still need pasting elsewhere.",
          "If your audio must stay on the computer, install the local model, switch off the network and dictate again. Keep cloud and AI rewriting features off until you have read where they send your words.",
        ],
      },
    ],
    fieldTest: null,
    dictivo: null,
    faqTitle: "Dictation software questions",
    faqs: [
      [
        "What is the best free dictation software?",
        "For occasional dictation, use what is built into your system: Dictation in macOS, or voice typing and voice access in Windows 11. For a free app that works offline on Mac, Windows and Linux, Handy is free and open source; Superwhisper and Spokenly also have free local models.",
      ],
      [
        "Is there dictation software that works offline?",
        `Yes. Handy, VoiceInk, MacWhisper's local models, Superwhisper and Spokenly with local models, Voibe's On-Device Mode on the Mac, Windows voice access and Dictivo's Local mode transcribe on the computer. Windows voice typing (Win+H) needs an internet connection, and Wispr Flow transcribes in the cloud.`,
      ],
      [
        "What dictation software works on Windows 11?",
        `Windows 11 includes voice typing (Windows key + H, needs an internet connection) and voice access (works on the PC after setup). Apps that run on Windows include Handy, Superwhisper, Spokenly, Voibe, Wispr Flow and Dragon Professional${windows ? ", and Dictivo" : ""}.`,
      ],
      [
        "Can you still buy Dragon?",
        "Nuance sells Dragon Professional v16 for Windows through its sales team and no longer lists a public price on its product page. The Dragon pricing guide covers each Dragon edition.",
      ],
      [
        "Which dictation software works on both Mac and Windows?",
        `Handy, Superwhisper, Spokenly, Voibe and Wispr Flow${windows ? ", and Dictivo" : ""} run on both. One Superwhisper Pro license covers both platforms, and each paid Voibe seat includes Mac and Windows.`,
      ],
      [
        "What about dictation on iPhone and Android?",
        "Both have it built in: Apple says iPhone Dictation is processed on the iPhone in many languages without an internet connection, and on Android you can talk to write with the microphone key in Gboard. Wispr Flow and Superwhisper also have iPhone and Android apps, and Spokenly has an iPhone app.",
      ],
      [
        "Which dictation apps are a one-time purchase?",
        "VoiceInk ($25 to $49), MacWhisper Pro (€64), Superwhisper Pro Lifetime ($249.99), Voibe Dictation Lifetime ($149 per seat) and Dictivo Local are sold once. Wispr Flow and Spokenly Pro are subscriptions.",
      ],
    ],
    referencesTitle: "References",
  };
}
