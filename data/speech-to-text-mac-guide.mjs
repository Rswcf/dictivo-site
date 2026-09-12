export const SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD = "2026-09-12";

export const SPEECH_TO_TEXT_MAC_GUIDE_REFERENCES = [
  ["Dictivo offline dictation guide", "https://dictivo.app/guides/offline-dictation-on-mac/"],
  ["Dictivo benchmark method", "https://dictivo.app/guides/mac-dictation-benchmark-method/"],
  ["Dictivo Mac model guide", "https://dictivo.app/mac-model-guide/"],
  ["Dictivo audio path", "https://dictivo.app/privacy/where-dictation-audio-goes/"],
  ["Dictivo privacy proof", "https://dictivo.app/privacy-proof/"],
  ["Superwhisper local and cloud models", "https://superwhisper.com/models"],
  ["Wispr Flow data controls", "https://wisprflow.ai/data-controls"],
  ["MacWhisper dictation and file transcription", "https://www.macwhisper.com/"],
  ["MacWhisper privacy and optional cloud features", "https://docs.macwhisper.com/article/52-keeping-transcriptions-private"],
  ["VoiceInk privacy and optional cloud services", "https://tryvoiceink.com/privacy"],
  ["Voice Type App Store listing", "https://apps.apple.com/us/app/voice-type-offline-dictation/id6736525125?mt=12"],
  ["Voibe on-device and cloud modes", "https://www.getvoibe.com/security/"],
  ["Aiko App Store listing", "https://apps.apple.com/ga/app/aiko/id1672085276?l=en-GB&platform=mac"],
  ["Apple Dictation support", "https://support.apple.com/guide/mac-help/use-dictation-mh40584/mac"],
];

export const SPEECH_TO_TEXT_MAC_GUIDE_COPY = {
  navLabel: "Speech-to-text apps for Mac",
  metaTitle: "Best Speech-to-Text Apps for Mac: Dictation & Transcription",
  metaDescription:
    "Compare speech-to-text apps for Mac by workflow: live dictation, local privacy, file transcription, cloud AI voice typing, and built-in macOS dictation.",
  eyebrow: "Mac speech-to-text guide",
  title: "Best speech-to-text apps for Mac by workflow",
  lede:
    "The best Mac speech-to-text app depends on what you are trying to replace: live typing, recorded-file transcription, cloud AI rewriting, or the built-in macOS dictation path.",
  answerTitle: "Short answer",
  answer:
    "For private live dictation on Mac, start with Dictivo Local, Superwhisper local models, VoiceInk, Voice Type, or Voibe in On-Device Mode. MacWhisper offers live dictation as well as file transcription; Aiko is another option for recordings. For cloud AI voice typing across devices, compare Wispr Flow. For a free baseline, test Apple Dictation before paying for a dedicated app.",
  intentTitle: "Which type of speech-to-text app do you need?",
  intentCaption: "Mac speech-to-text workflows and the page or product category they usually map to",
  intentHeaders: ["Your task", "Best-fit workflow", "What to evaluate"],
  intentRows: [
    [
      "Turn speech into editable text",
      "A Mac app that turns speech into editable text, either live or from files.",
      "Whether you need live dictation into the active app, file transcription, or both.",
    ],
    [
      "Write in your current app",
      "Live voice typing into Mail, notes, browsers, IDEs, support tools, and writing apps.",
      "Hotkey behavior, local/offline processing, dictionary terms, snippets, and insertion reliability.",
    ],
    [
      "Use dictation across devices",
      "A broader category that can include mobile, desktop, cloud, and recorder workflows.",
      "Platform fit first. Many strong voice-to-text pages are not Mac-specific.",
    ],
    [
      "Dictate without internet",
      "On-device speech recognition after the local model is installed.",
      "Audio location, model size, speed, and whether cloud features are clearly optional.",
    ],
    [
      "Handle both recordings and live input",
      "File transcription plus system-wide dictation.",
      "MacWhisper offers both. Compare its live workflow with focused hotkey tools using the same task.",
    ],
  ],
  appTitle: "Mac speech-to-text apps compared",
  appCaption: "Use-case comparison for Mac dictation, transcription, and voice typing tools",
  appHeaders: ["Option", "Best fit", "Privacy or platform caveat", "When to choose it"],
  appRows: [
    [
      "Dictivo Local",
      "Private live dictation into the active Mac app.",
      "Local mode keeps dictation audio on the device; optional Cloud Fast is a separate remote speed path.",
      "Choose it when everyday voice typing, local-first privacy, and buy-once desktop ownership matter.",
    ],
    [
      "Superwhisper",
      "Power-user dictation with local and cloud model choices.",
      "Local models can keep audio on-device; cloud models and AI post-processing need separate review.",
      "Choose it when modes, automations, and a mature multi-platform workflow matter more than price simplicity.",
    ],
    [
      "Wispr Flow",
      "Cloud AI voice typing with cleanup, commands, and cross-device polish.",
      "Best treated as a cloud workflow, not an offline Mac dictation pick.",
      "Choose it when speed, rewriting, mobile support, and team controls matter more than local audio.",
    ],
    [
      "MacWhisper",
      "Audio/video transcription and system-wide real-time dictation on Mac.",
      "Local models are available; review optional cloud and AI settings separately.",
      "Choose it for interviews, meetings, podcasts, subtitles, and batch transcription.",
    ],
    [
      "VoiceInk, Voice Type, and Voibe",
      "Local-first Mac dictation alternatives.",
      "Check each app’s mode and optional cloud features; Voibe uses cloud transcription on Intel Macs.",
      "Choose them when you want a narrower local dictation app and are comparing UX, price, and support style.",
    ],
    [
      "Apple Dictation",
      "Built-in baseline with no extra purchase.",
      "Processing location depends on macOS settings and Apple support boundaries.",
      "Choose it first if your needs are occasional and you do not need local model choice or app-level history.",
    ],
  ],
  sections: [
    {
      kicker: "How to use this guide",
      title: "What this comparison does and does not measure",
      paragraphs: [
        "This guide is written by Dictivo. It groups products by task, processing location, platform fit, and purchase model using the public product documentation linked below. It is a shortlist, not a scored ranking or an independent accuracy benchmark.",
        "For a useful trial, dictate the same short email and a paragraph from your own work in each app. Include names or specialist terms you use, and compare corrections, time from stopping to usable text, and whether insertion works in your usual app. Repeat with the local or cloud settings you would actually use.",
        "The linked Dictivo benchmark documents one hardware and audio setup. It does not establish that Dictivo is faster or more accurate than every app listed here.",
      ],
    },
    {
      kicker: "Decision rule",
      title: "Start with workflow, not brand names",
      paragraphs: [
        "Speech-to-text is too broad as a buying category. A product that is excellent for transcribing a podcast can be awkward for replacing typing in Slack. A product that is excellent for fast cloud dictation can be the wrong fit when the key requirement is keeping speech audio local.",
        "Before choosing a Mac speech-to-text app, decide whether the input is live speech or an existing recording, whether the destination is the active app or an exported file, and whether local audio processing is required or just preferred.",
      ],
      bullets: [
        "Live dictation: prioritize hotkey behavior, active-app insertion, local history, and repeated vocabulary.",
        "File transcription: prioritize import formats, exports, speaker labels, subtitles, and batch jobs.",
        "Cloud AI dictation: prioritize speed, rewriting quality, mobile support, team controls, and retention policy.",
        "Offline dictation: prioritize model fit, local benchmark behavior, download size, and no-upload defaults.",
      ],
    },
    {
      kicker: "Mac-specific fit",
      title: "Check how the app works on your Mac",
      paragraphs: [
        "Before buying, test the app on the Mac and in the language you actually use. A demo on a different machine will not tell you whether a large local model feels responsive on yours.",
        "A Mac-specific dictation app has to fit macOS permissions, global shortcuts, active-app text insertion, Apple Silicon performance, local model download size, and the user's tolerance for cloud processing. Those are practical product details, not generic AI-writing features.",
      ],
      bullets: [
        "A good Mac dictation workflow should insert text where the cursor already is.",
        "A good local workflow should explain which model can run comfortably on the user's Mac.",
        "A good privacy story should separate on-device transcription from optional cloud speed or rewriting.",
      ],
    },
    {
      kicker: "Dictivo fit",
      title: "Where Dictivo fits in the Mac speech-to-text category",
      paragraphs: [
        "Dictivo is best framed as a local-first Mac dictation app, not as a meeting recorder or a broad cloud AI writing suite. It is designed for the moment when typing is the bottleneck and the user wants spoken words to appear in the active desktop app.",
        "Try it with a task you repeat: draft a reply, capture a note after a meeting, or explain a change to an AI assistant. Check how much editing remains and whether the result pastes correctly into your usual app.",
      ],
      bullets: [
        "Use Dictivo Local for sensitive everyday dictation into the current app.",
        "Use Cloud Fast only for selected low-sensitivity recordings where speed matters more than keeping audio local.",
        "Use the benchmark method page when explaining how Dictivo chooses local model tiers.",
      ],
    },
    {
      kicker: "Regulated workflows",
      title: "Before using sensitive work material",
      paragraphs: [
        "Use invented names and non-sensitive sample text during your first trial. Check where audio and text are processed, how history is stored, and how to delete it before dictating confidential material.",
        "The practical angle for Dictivo is narrower: local-first dictation can be useful for sensitive drafts, notes, and private writing, but regulated production workflows need their own policy, contractual, and security review before use.",
      ],
      bullets: [
        "Check local processing and any optional cloud features separately.",
        "Follow your organization's rules for confidential information.",
        "Local processing alone does not establish suitability for a regulated workflow.",
      ],
    },
  ],
  faqTitle: "Mac speech-to-text questions",
  faqs: [
    [
      "What is the best speech-to-text app for Mac?",
      "For live private dictation, shortlist Dictivo Local, Superwhisper local models, VoiceInk, Voice Type, and Voibe in On-Device Mode. MacWhisper supports both live dictation and audio/video files; Aiko is another option for recordings. For cloud AI voice typing across devices, compare Wispr Flow.",
    ],
    [
      "What is the best dictation app for Mac?",
      "The best Mac dictation app is usually a hotkey-first tool that can insert text into the active app. Dictivo is built for that live workflow, while file transcription apps are better when the audio already exists as a recording.",
    ],
    [
      "Can speech-to-text on Mac work offline?",
      "Yes, if the app uses a local speech model after installation. Offline capability should be checked separately from zero-retention cloud processing because those are different privacy models.",
    ],
    [
      "Is voice-to-text the same as dictation?",
      "Voice-to-text is the broad category. Dictation usually means live speech becomes text where you are typing. Transcription usually means converting an existing recording into text.",
    ],
    [
      "Should I choose Dictivo or MacWhisper?",
      "Both offer live dictation. Compare setup, model speed, correction effort, and insertion in your usual app. MacWhisper additionally handles existing recordings, subtitles, and batch transcription; Dictivo focuses on the hotkey dictation workflow.",
    ],
    [
      "Should I choose Dictivo or Wispr Flow?",
      "Choose Dictivo when local Mac dictation and a one-time Local license matter. Choose Wispr Flow when cloud AI rewriting, mobile support, and cross-device voice typing matter more.",
    ],
  ],
  relatedTitle: "Related Dictivo pages",
  relatedRows: [
    ["Offline dictation guide", "Compare which Mac dictation apps can keep audio local.", "https://dictivo.app/guides/offline-dictation-on-mac/"],
    ["Wispr Flow alternative", "Compare local-first Mac dictation with a cloud AI voice workflow.", "https://dictivo.app/compare/wispr-flow-alternative/"],
    ["Superwhisper alternative", "Compare two local-capable dictation workflows by focus and price.", "https://dictivo.app/compare/superwhisper-alternative/"],
    ["MacWhisper alternative", "Compare dictation workflows and support for recorded files.", "https://dictivo.app/compare/macwhisper-alternative/"],
    ["Benchmark method", "See how Dictivo maps local model fit and real-time factor.", "https://dictivo.app/guides/mac-dictation-benchmark-method/"],
  ],
  referencesTitle: "Evidence links",
};
