import { OFFLINE_GUIDE_PRICES_CHECKED } from "./offline-dictation-guide.mjs";

// 2026-10-09: Related pages gained the Mac dictation troubleshooting and shortcut guides.
// 2026-10-10: Related pages gained the cross-platform dictation software guide.
// 2026-11-10 (Batch B1): rebuilt in the answer-page shape of the Windows offline guide. Ten rows;
// Handy and Spokenly are new. Every row except Voice Type and Voibe was re-read on
// SPEECH_TO_TEXT_MAC_GUIDE_CHECKED (competitor facts file of that date in the desktop repository);
// Voice Type and Voibe keep the site's OFFLINE_GUIDE_PRICES_CHECKED facts. The title's year is the
// year of SPEECH_TO_TEXT_MAC_GUIDE_CHECKED.
export const SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD = "2026-11-10";
export const SPEECH_TO_TEXT_MAC_GUIDE_CHECKED = "2026-11-10";

export const SPEECH_TO_TEXT_MAC_GUIDE_REFERENCES = [
  ["Dictivo offline dictation guide", "https://dictivo.app/guides/offline-dictation-on-mac/"],
  ["Dictivo benchmark method", "https://dictivo.app/guides/mac-dictation-benchmark-method/"],
  ["Dictivo Mac model guide", "https://dictivo.app/mac-model-guide/"],
  ["Dictivo audio path", "https://dictivo.app/privacy/where-dictation-audio-goes/"],
  ["Dictivo privacy proof", "https://dictivo.app/privacy-proof/"],
  ["Superwhisper local and cloud models", "https://superwhisper.com/models"],
  ["Superwhisper plans, checked 2026-09-29", "https://superwhisper.com/docs/billing/plans"],
  ["Wispr Flow data controls", "https://wisprflow.ai/data-controls"],
  ["Wispr Flow pricing, checked 2026-09-29", "https://wisprflow.ai/pricing"],
  ["MacWhisper dictation, file transcription and pricing, checked 2026-09-29", "https://www.macwhisper.com/"],
  ["MacWhisper privacy and optional cloud features", "https://docs.macwhisper.com/article/52-keeping-transcriptions-private"],
  ["VoiceInk privacy and optional cloud services", "https://tryvoiceink.com/privacy"],
  ["VoiceInk pricing, checked 2026-09-29", "https://tryvoiceink.com/pricing"],
  ["Voice Type App Store listing and price, checked 2026-09-29", "https://apps.apple.com/us/app/voice-type-offline-dictation/id6736525125?mt=12"],
  ["Voibe on-device and cloud modes", "https://www.getvoibe.com/security/"],
  ["Voibe pricing, checked 2026-09-29", "https://www.getvoibe.com/pricing/"],
  ["Aiko US App Store listing and price, checked 2026-09-29", "https://apps.apple.com/us/app/aiko/id1672085276?platform=mac"],
  ["Apple Dictation support", "https://support.apple.com/guide/mac-help/use-dictation-mh40584/mac"],
  [`Apple: Use Dictation on Mac, macOS 14 guide (checked ${SPEECH_TO_TEXT_MAC_GUIDE_CHECKED})`, "https://support.apple.com/en-us/guide/mac-help/mh40584/14.0/mac/14.0"],
  [`Wispr Flow: What is Flow (checked ${SPEECH_TO_TEXT_MAC_GUIDE_CHECKED})`, "https://docs.wisprflow.ai/articles/2772472373-what-is-flow"],
  [`Handy on GitHub: README and license (checked ${SPEECH_TO_TEXT_MAC_GUIDE_CHECKED})`, "https://github.com/cjpais/Handy"],
  [`Handy downloads (checked ${SPEECH_TO_TEXT_MAC_GUIDE_CHECKED})`, "https://handy.computer/download"],
  [`Spokenly pricing (checked ${SPEECH_TO_TEXT_MAC_GUIDE_CHECKED})`, "https://spokenly.app/pricing"],
  [`Spokenly platforms and account (checked ${SPEECH_TO_TEXT_MAC_GUIDE_CHECKED})`, "https://spokenly.app/"],
];

const formatDate = (isoDate) =>
  new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${isoDate}T00:00:00Z`));

// [Option, Best fit, Privacy or platform caveat, When to choose it]. The generator adds the price
// and "Checked on" cells. The ItemList description is the "When to choose it" cell.
const APP_ROWS = [
  [
    "Dictivo Local",
    "Live dictation into the app you are using, started with a global shortcut.",
    "Local mode transcribes on the Mac after the model download. Cloud Fast, an optional paid add-on, uploads the selected recording.",
    "Choose it for everyday dictation into Mail, notes, a browser or an AI assistant when audio should stay on the Mac.",
  ],
  [
    "Apple Dictation",
    "Built-in dictation in any text field.",
    "On a Mac with Apple silicon, supported languages are processed on the Mac. On an Intel Mac, or for other languages, speech is sent to Apple.",
    "Choose it first for occasional dictation with no extra app.",
  ],
  [
    "Handy",
    "Free, open-source dictation app for Mac, Windows and Linux.",
    "Transcribes on the computer with local models. The project describes no cloud transcription. Builds exist for Apple Silicon and Intel Macs.",
    "Choose it when you want a free local app whose source code you can read.",
  ],
  [
    "MacWhisper",
    "Audio and video file transcription, plus system-wide dictation.",
    "Transcribes with local models. Optional remote models send audio to the provider you choose.",
    "Choose it when you transcribe recordings, such as interviews or meetings, and also want live dictation.",
  ],
  [
    "Spokenly",
    "Dictation on macOS, Windows, Linux and iPhone.",
    "The free plan uses on-device models and works offline. Your own API keys or the Pro plan send audio to a cloud provider. Local+ on several devices needs a Spokenly account.",
    "Choose it when you want one dictation app on several platforms, with a free local plan.",
  ],
  [
    "Superwhisper",
    "Configurable dictation modes with local and cloud models.",
    "The free plan uses local models. Pro adds cloud voice models and AI modes, so check which model each mode uses.",
    "Choose it when you want modes, model choice and the same license on Windows and phones.",
  ],
  [
    "VoiceInk",
    "Local Mac dictation app, open source under GPL-3.0.",
    "Transcribes on the device. Optional Cloud Enhancement sends text, not audio. Runs only on Apple Silicon Macs.",
    "Choose it for local dictation on an Apple Silicon Mac with a one-time license.",
  ],
  [
    "Voice Type",
    "Simple hold-to-talk dictation in any text field.",
    "Its App Store listing says no internet is required and audio stays on the device. It may contact Apple for receipt validation.",
    "Choose it when you want a small dictation app from the Mac App Store.",
  ],
  [
    "Voibe",
    "Simple dictation with on-device and cloud modes.",
    "Speech stays on the Mac only in On-Device Mode. Intel Macs use cloud transcription.",
    "Choose it when you want a simple workflow and can use On-Device Mode.",
  ],
  [
    "Wispr Flow",
    "Cloud voice typing on Mac, Windows, iOS and Android.",
    "Transcription needs an internet connection, so speech leaves the Mac. Setup includes creating an account or signing in.",
    "Choose it when cloud processing is acceptable and you want the same tool on your phone.",
  ],
];

// Rows that keep the site's 2026-09-29 facts (OFFLINE_DICTATION_GUIDE_COPY.en) instead of a re-read.
const SITE_CHECKED_ROWS = ["Voice Type", "Voibe"];

// Price cells for apps without an entry in the generator's GUIDE_PRICE_SOURCES, as the vendor
// shows them on SPEECH_TO_TEXT_MAC_GUIDE_CHECKED.
const HAND_PRICES = {
  Handy: "Free and open source (MIT license)",
  Spokenly: "Free; Local+ $29 once; Pro $12 a month or $144 a year",
};

export function speechToTextMacGuideCopy({ windows, checked = SPEECH_TO_TEXT_MAC_GUIDE_CHECKED } = {}) {
  const checkedOn = formatDate(checked);
  const year = checked.slice(0, 4);
  const platforms = windows
    ? "One Dictivo Local license covers both desktop platforms, macOS and Windows x64, at the same price."
    : "macOS is available. Windows x64 downloads are temporarily unavailable.";
  return {
    navLabel: "Speech-to-text apps for Mac",
    metaTitle: `Best Speech-to-Text and Dictation Apps for Mac (${year})`,
    metaDescription: "Speech-to-text and dictation apps for Mac compared by workflow: live dictation into any app, offline use, file transcription and cloud voice typing, priced.",
    title: `Best speech-to-text and dictation apps for Mac in ${year}, by workflow`,
    lede: "The right Mac speech-to-text app depends on the job: live dictation into the app you use, transcription of recorded files, cloud voice typing, or the dictation built into macOS.",
    answerTitle: "Short answer",
    answer: `The table compares ${APP_ROWS.length} speech-to-text and dictation apps for Mac and dates every row; most were checked on ${checkedOn}. Start with Apple Dictation, built into macOS. For live dictation into any app with audio kept on the Mac, try Dictivo Local, this site's product. For live dictation plus file transcription, try MacWhisper. Choose a cloud app such as Wispr Flow only when uploading speech is acceptable.`,
    intentTitle: "Which speech-to-text question are you asking?",
    intentCaption: "Common ways people search for a Mac speech-to-text app, and what to check for each",
    intentHeaders: ["How people ask", "Best-fit workflow", "What to check"],
    intentRows: [
      [
        "best dictation app for mac",
        "A shortcut-driven app that puts live speech into the app you are using.",
        "The shortcut, the permission setup, and whether the text lands where the cursor is.",
      ],
      [
        "speech to text mac",
        "Apple Dictation first; a dedicated app when you need more control.",
        "Whether you need live dictation, file transcription, or both.",
      ],
      [
        "voice to text mac app",
        "Live dictation into Mail, notes, browsers and code editors.",
        "Where audio is processed and how much editing the text needs.",
      ],
      [
        "transcribe audio to text mac free",
        "A file transcription app with a free version, such as MacWhisper.",
        "Import and export formats, and which models the free version includes.",
      ],
      [
        "dictation software for mac",
        "A desktop dictation app with a global shortcut.",
        "The purchase model, the update terms, and which Macs it supports.",
      ],
      [
        "best free dictation app for mac",
        "Apple Dictation, then a free app such as Handy or a free plan.",
        "The limits of the free plan and whether speech leaves the Mac.",
      ],
    ],
    appTitle: "Mac speech-to-text apps compared",
    appCaption: "Mac dictation, transcription and voice typing apps by workflow, with prices and check dates",
    appHeaders: ["Option", "Best fit", "Privacy or platform caveat", "When to choose it", "Price / purchase model", "Checked on"],
    appRows: APP_ROWS,
    handPrices: HAND_PRICES,
    rowChecked: Object.fromEntries(APP_ROWS.map(([name]) => [name, SITE_CHECKED_ROWS.includes(name) ? OFFLINE_GUIDE_PRICES_CHECKED : checked])),
    methodTitle: "How this page was checked",
    method: [
      "We read each vendor's own pages on the date in the Checked on column. The pages are listed under Evidence links. Prices are shown as each vendor shows them, in its own currency.",
      "Dictivo facts come from Dictivo's own documentation and the app's source code.",
      "This page does not measure speed or error rates, and it does not score the apps against each other.",
    ],
    methodSignature: `Dictivo team, ${checkedOn}.`,
    sections: [
      {
        title: "What this comparison does and does not measure",
        paragraphs: [
          "Dictivo wrote this guide, and Dictivo is this site's product. The guide groups apps by task, processing location, platform and purchase model. It uses the vendors' public pages linked under Evidence links. It is a shortlist, not a scored ranking.",
          "For a useful trial, dictate the same short email and a paragraph from your own work in each app. Include names or specialist terms you use. Compare the corrections, the time from stopping to usable text, and whether the text lands in your usual app. Repeat with the local or cloud settings you would actually use.",
          "The linked Dictivo benchmark documents one hardware and audio setup. It does not compare Dictivo with the apps listed here.",
        ],
      },
      {
        title: "What can you try without buying a Mac dictation app?",
        paragraphs: [
          "Start with Apple Dictation for occasional input in a text field. Handy is free and open source. Spokenly and Superwhisper have free plans with local models, and MacWhisper's free version transcribes files with local models. Check the limits and features in your installed version.",
          "Dictivo offers Tiny free forever and a 14-day full Local trial. Use that time to compare the editing effort on your own Mac. A paid local license is useful only if its workflow saves enough work for you. This guide does not rank paid apps above free ones.",
        ],
        bullets: [
          "For an existing audio file, test an app with file import and the export format you need. Do not assume a live dictation app replaces a meeting-transcription tool.",
          "For writing straight into an app, test the shortcut, the permission setup and where the text lands. A transcript that looks right in the app's own window may still need manual pasting elsewhere.",
          "For offline use, install the model first and check the selected processing mode. “Free” and “on-device” describe different things.",
        ],
      },
      {
        title: "Start with workflow, not brand names",
        paragraphs: [
          "Speech-to-text is too broad as a buying category. A product that is good for transcribing a podcast can be awkward for replacing typing in Slack. A product built for fast cloud dictation can be the wrong fit when the key requirement is keeping speech audio local.",
          "Before choosing a Mac speech-to-text app, decide whether the input is live speech or an existing recording, whether the destination is the active app or an exported file, and whether local audio processing is required or just preferred.",
        ],
        bullets: [
          "Live dictation: check the shortcut, where the text lands, local history and repeated vocabulary.",
          "File transcription: check import formats, exports, speaker labels, subtitles and batch jobs.",
          "Cloud AI dictation: check speed, rewriting quality, mobile support, team controls and retention policy.",
          "Offline dictation: check model fit, download size and whether the default mode uploads anything.",
        ],
      },
      {
        title: "Check how the app works on your Mac",
        paragraphs: [
          "Before buying, try the app on the Mac and in the language you actually use. A demo on a different machine will not tell you whether a large local model feels responsive on yours.",
          "A Mac dictation app has to fit macOS permissions, global shortcuts, text placement in the active app, Apple Silicon or Intel performance, local model download size, and your tolerance for cloud processing. Those are practical product details, not generic AI-writing features.",
        ],
        bullets: [
          "A good Mac dictation workflow puts text where the cursor already is.",
          "A good local workflow explains which model can run comfortably on your Mac.",
          "A good privacy story separates on-device transcription from optional cloud speed or rewriting.",
        ],
      },
      {
        title: "Where Dictivo fits in the Mac speech-to-text category",
        paragraphs: [
          `Dictivo is a local-first dictation app for the Mac, with Apple Silicon and Intel support. It is not a meeting recorder or a cloud AI writing suite. Press the shortcut, speak, and Dictivo pastes the text into the app you are using. ${platforms}`,
          "Try it with a task you repeat: draft a reply, capture a note after a meeting, or explain a change to an AI assistant. Check how much editing remains and whether the text lands correctly in your usual app. Dictivo is for live dictation and does not import recorded files.",
        ],
        bullets: [
          "Use Dictivo Local for sensitive everyday dictation into the current app.",
          "Use Cloud Fast only for selected low-sensitivity recordings where speed matters more than keeping audio local.",
          "Use the benchmark method page to see how Dictivo chooses local model tiers.",
        ],
      },
      {
        title: "Before using sensitive work material",
        paragraphs: [
          "Use invented names and non-sensitive sample text during your first trial. Check where audio and text are processed, how history is stored, and how to delete it before dictating confidential material.",
          "Local-first dictation can be useful for sensitive drafts, notes and private writing. Regulated production workflows still need their own policy, contract and security review before use.",
        ],
        bullets: [
          "Check local processing and any optional cloud features separately.",
          "Follow your organization's rules for confidential information.",
          "Local processing alone does not make an app suitable for a regulated workflow.",
        ],
      },
      {
        title: "How to test speech-to-text on your Mac",
        paragraphs: [
          "Start with one real task: a reply in Mail, a note, or a prompt in an AI assistant. Use the same short passage in each app so that you can compare the correction effort fairly.",
          "For Dictivo, download the desktop app, choose Local, and install a model. Click in a text field, press the default Command–Shift–Space shortcut, speak your draft, and press the shortcut again. Dictivo pastes the text into that app. The first-use guide includes a practice field and permission troubleshooting.",
          "Once the model is installed, try another Local recording with the internet disconnected. This checks offline transcription on your machine; it is not a full privacy audit. If you paste text into an online service, that service receives the text even though Dictivo transcribed the audio locally.",
        ],
        bullets: [
          "Compare the time to usable text, including your corrections, rather than only the transcription animation.",
          "Check your everyday language, names, punctuation, and the apps in which you will use the result.",
          "Use Local when audio must stay on the device. Optional Cloud Fast sends audio for remote transcription; try it separately with non-sensitive content.",
          "Buy only after the workflow works on your own Mac. A file-import or meeting-recording workflow may call for a different tool.",
        ],
      },
    ],
    faqTitle: "Mac speech-to-text questions",
    faqs: [
      [
        "What is the best speech-to-text app for Mac?",
        "It depends on the workflow. For live dictation with audio kept on the Mac, shortlist Dictivo Local, Handy, VoiceInk, Voice Type, Spokenly's free plan, Superwhisper with local models, and Voibe in On-Device Mode. MacWhisper handles both live dictation and audio or video files. For cloud voice typing across devices, compare Wispr Flow.",
      ],
      [
        "Is there a free speech-to-text app for Mac?",
        "Yes. Apple Dictation is included with macOS. Handy is free and open source. Spokenly and Superwhisper have free plans with local models, and MacWhisper has a free version. Dictivo includes Tiny free forever and a 14-day full Local trial. Compare each option's workflow and limits before paying.",
      ],
      [
        "What is the best dictation app for Mac?",
        "For most people it is a shortcut-first app that puts text into the active app. Dictivo is built for that live workflow: it pastes the text into the app you are using. File transcription apps fit better when the audio already exists as a recording.",
      ],
      [
        "Can speech-to-text on Mac work offline?",
        "Yes, if the app uses a local speech model after installation. Check offline use separately from zero-retention cloud processing, because those are different privacy models.",
      ],
      [
        "Is voice-to-text the same as dictation?",
        "Voice-to-text is the broad category. Dictation usually means live speech becomes text where you are typing. Transcription usually means converting an existing recording into text.",
      ],
      [
        "Should I choose Dictivo or MacWhisper?",
        "Both offer live dictation. Compare setup, model speed, correction effort, and whether the text lands in your usual app. MacWhisper also handles existing recordings, subtitles and batch transcription; Dictivo focuses on the shortcut dictation workflow.",
      ],
      [
        "Should I choose Dictivo or Wispr Flow?",
        "Choose Dictivo when local Mac dictation and a one-time Local license matter. Choose Wispr Flow when cloud AI rewriting, mobile support and cross-device voice typing matter more.",
      ],
      [
        "Which Mac app transcribes audio files for free?",
        "MacWhisper. Its free version transcribes audio and video files with local models on the Mac; Pro is a one-time purchase. Dictivo is for live dictation and does not import recorded files.",
      ],
    ],
    relatedTitle: "Related Dictivo pages",
    relatedRows: [
      [
        "First local dictation",
        "Install a model, practice a draft, and fix common setup problems before buying.",
        "https://dictivo.app/guides/first-local-dictation/",
      ],
      [
        "Offline dictation guide",
        "Compare which Mac dictation apps can keep audio local.",
        "https://dictivo.app/guides/offline-dictation-on-mac/",
      ],
      [
        "Wispr Flow alternative",
        "Compare local-first Mac dictation with a cloud AI voice workflow.",
        "https://dictivo.app/compare/wispr-flow-alternative/",
      ],
      [
        "Superwhisper alternative",
        "Compare two local-capable dictation workflows by focus and price.",
        "https://dictivo.app/compare/superwhisper-alternative/",
      ],
      [
        "MacWhisper alternative",
        "Compare dictation workflows and support for recorded files.",
        "https://dictivo.app/compare/macwhisper-alternative/",
      ],
      [
        "Benchmark method",
        "See how Dictivo maps local model fit and real-time factor.",
        "https://dictivo.app/guides/mac-dictation-benchmark-method/",
      ],
      [
        "Mac dictation not working",
        "Check built-in macOS Dictation settings symptom by symptom, following Apple's help.",
        "https://dictivo.app/guides/mac-dictation-not-working/",
      ],
      [
        "Mac dictation shortcut",
        "Find, change or fix the built-in macOS Dictation shortcut.",
        "https://dictivo.app/guides/mac-dictation-shortcut/",
      ],
      [
        "Best dictation software across Mac and Windows",
        "Cross-platform picks by need: free, fully local, Windows, several languages and buy-once.",
        "https://dictivo.app/guides/best-dictation-software/",
      ],
      [
        "Offline dictation on Windows",
        "Compare Windows dictation tools by where audio is processed.",
        "https://dictivo.app/guides/offline-dictation-on-windows/",
      ],
      [
        "Dictation apps for Mac and Windows with a one-time license",
        "Compare apps where one purchase covers both desktop platforms.",
        "https://dictivo.app/guides/dictation-app-mac-windows-one-time-license/",
      ],
      [
        "Mac dictation apps with no subscription",
        "Compare Mac dictation apps you can buy once.",
        "https://dictivo.app/guides/mac-dictation-app-no-subscription/",
      ],
      [
        "Dictate into Claude Code and Cursor",
        "Speak prompts into coding tools on a Mac.",
        "https://dictivo.app/guides/dictate-into-claude-code-and-cursor-on-mac/",
      ],
    ],
    referencesTitle: "Evidence links",
  };
}

