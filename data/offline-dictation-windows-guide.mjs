export const OFFLINE_DICTATION_WINDOWS_GUIDE_LASTMOD = "2026-07-12";

export const OFFLINE_DICTATION_WINDOWS_GUIDE_REFERENCES = [
  ["Microsoft: speech and typing privacy (Win+H)", "https://support.microsoft.com/en-us/windows/speech-voice-activation-inking-typing-and-privacy-149e0e60-7c93-dedd-a0d8-5731b71a4fef"],
  ["Microsoft: set up Voice Access", "https://support.microsoft.com/en-us/topic/set-up-voice-access-9fc44e29-12bf-4d86-bc4e-e9bb69df9a0e"],
  ["Whisperstream", "https://whisperstream.io/"],
  ["JesType", "https://jestype.com/"],
  ["Talon Voice documentation", "https://talonvoice.com/docs/"],
  ["Wispr Flow privacy page", "https://wisprflow.ai/privacy"],
  ["Weesper Neon Flow", "https://weesperneonflow.ai/"],
  ["Dragon Professional", "https://dragon.nuance.com/en-us/dragon-professional"],
  ["Dictivo audio path", "https://dictivo.app/privacy/where-dictation-audio-goes/"],
  ["Dictivo network test", "https://dictivo.app/privacy/local-dictation-network-test/"],
];

export const OFFLINE_DICTATION_WINDOWS_GUIDE_COPY = {
  navLabel: "Offline Windows dictation",
  metaTitle: "Offline Dictation on Windows: Local Speech-to-Text Compared",
  metaDescription:
    "Which Windows dictation tools keep audio on your PC? Compare Voice Access, Win+H voice typing, Dictivo, Whisperstream, Talon, and Dragon by where audio goes.",
  eyebrow: "Windows dictation guide",
  title: "Which Windows dictation tools keep audio local?",
  lede:
    "Use this guide when the deciding factor is where dictation audio is processed on Windows. The two built-in options differ on exactly that point, and so do the paid tools.",
  answerTitle: "Short answer",
  answer:
    "Windows 11's built-in Voice Access works on-device and is free - start there. Win+H Voice Typing is also free but sends audio to the cloud by default. For paid local dictation built around writing, shortlist Dictivo, Whisperstream, and Weesper Neon Flow. Talon is free and local but built for voice coding. Wispr Flow is cloud-only, and Dragon Professional is local but costs $699.99.",
  intentTitle: "Which Windows dictation question are you really asking?",
  intentCaption: "Windows dictation search intents and the workflow they usually map to",
  intentHeaders: ["Search intent", "Best-fit answer", "What to evaluate"],
  intentRows: [
    [
      "offline dictation Windows",
      "A tool that processes speech on the PC, with no audio upload.",
      "Whether 'offline' means on-device processing or just cached cloud access.",
    ],
    [
      "dictation software for Windows",
      "Live voice typing into email, documents, chat, and browsers.",
      "Hotkey workflow, insertion reliability, local processing, and pricing model.",
    ],
    [
      "is Windows voice typing private",
      "Win+H sends audio to Microsoft's cloud speech service by default.",
      "Use Voice Access for the on-device built-in path, or a local third-party app.",
    ],
    [
      "Dragon alternative for Windows",
      "Modern train-free local tools cover everyday dictation at a fraction of Dragon's price.",
      "Whether you need Dragon's specialized vocabularies or just want to write by voice.",
    ],
    [
      "free speech to text Windows",
      "Voice Access (on-device) and Win+H (cloud) are both free and built in.",
      "Where the audio goes, and whether you need dictation in every app or just some.",
    ],
  ],
  appTitle: "Windows dictation tools compared by where audio is processed",
  appCaption: "Windows dictation tools compared by local processing, pricing, and best fit",
  appHeaders: ["Option", "Does audio stay local?", "Pricing model", "When to choose it"],
  appRows: [
    [
      "Dictivo Local",
      "Yes in Local mode. Audio is processed on the device; optional Cloud Fast uploads only recordings you select.",
      "$29 once with 12 months of updates, then optional $24/year renewal. Tiny free tier and a 14-day full Local trial.",
      "Everyday private dictation into any app, with the same local workflow on Windows and macOS.",
    ],
    [
      "Windows Voice Access",
      "Yes. Voice Access works on-device and offline after a one-time speech model download.",
      "Free, built into Windows 11 22H2 and later.",
      "The free baseline for on-device dictation plus hands-free PC control.",
    ],
    [
      "Windows Voice Typing (Win+H)",
      "No by default. Voice typing uses Microsoft's cloud-based speech services and needs an internet connection.",
      "Free, built into Windows 10 and 11.",
      "Quick casual dictation when cloud processing is acceptable.",
    ],
    [
      "Whisperstream",
      "Yes. Local speech models run on the CPU; internet is used for the model download and one-time activation.",
      "$29 one-time with lifetime updates and a 7-day trial.",
      "Privacy-first local dictation on Windows only.",
    ],
    [
      "JesType",
      "Yes. Runs local Whisper, Parakeet, and Moonshine models fully offline.",
      "One-time purchase (listed at 14.95 euros).",
      "The lowest-priced local dictation option across Mac and Windows.",
    ],
    [
      "Talon Voice",
      "Yes. Ships its own local Conformer speech engine; audio is not transmitted.",
      "Free, with optional paid early-access builds.",
      "Voice coding and full hands-free control, especially for RSI and accessibility. Steeper learning curve for prose.",
    ],
    [
      "Weesper Neon Flow",
      "Yes. Advertises fully offline operation in 50+ languages.",
      "5 euros/month, 45 euros/year, or a 99-euro lifetime license, with a 15-day trial.",
      "Offline dictation with a subscription-or-lifetime pricing choice.",
    ],
    [
      "Wispr Flow",
      "No. Its privacy page states transcription always happens in the cloud; Privacy Mode changes retention, not location.",
      "Free Basic tier with weekly word caps; Pro at $15/month or $12/month billed annually.",
      "Cloud AI voice typing with cleanup and cross-device polish - not an offline pick.",
    ],
    [
      "Dragon Professional v16",
      "Yes. Processes speech locally after installation and one-time license activation.",
      "$699.99 one-time. The consumer Dragon Home edition was discontinued in 2023.",
      "Specialized legal or medical vocabularies, deep hands-free control, and enterprise deployment.",
    ],
  ],
  sections: [
    {
      kicker: "Built-in options",
      title: "Voice Access vs Win+H: the two built-ins are not the same",
      paragraphs: [
        "Windows ships two free dictation paths, and they differ on exactly the question this guide is about. Voice Typing (Win+H) uses Microsoft's cloud-based speech services: audio goes to the cloud, and it needs an internet connection. Voice Access, added in Windows 11 22H2, downloads a speech model once and then works on-device, including offline.",
        "If you want free and local, the answer is Voice Access, not Win+H. The trade-off is that Voice Access is designed first as an accessibility and PC-control tool; dictation is one part of it, and the writing workflow is more basic than dedicated dictation apps.",
      ],
      bullets: [
        "Win+H Voice Typing: free, cloud-based by default, needs internet.",
        "Voice Access: free, on-device after a one-time model download, Windows 11 22H2 or later.",
        "Both are worth testing before paying for anything.",
      ],
    },
    {
      kicker: "Where Dictivo fits",
      title: "Where Dictivo fits on Windows",
      paragraphs: [
        "Dictivo brings the same local-first workflow to Windows that it runs on macOS: hold a hotkey, speak, and the text lands in the active app. Local mode processes audio on the device, and the app keeps history, dictionary terms, and snippets locally. Optional Cloud Fast is a separate mode that uploads only recordings you choose.",
        "One honest caveat: the Windows installer is not yet Authenticode-signed, so SmartScreen may show an unknown-publisher notice during setup. SHA-256 checksums are published for verification, and signing is on the roadmap.",
        "The free Tiny tier and the 14-day full Local trial work the same on Windows as on Mac, so you can test the whole local workflow before paying $29.",
      ],
      bullets: [
        "Same hotkey-driven local dictation on Windows and macOS.",
        "Local mode keeps audio, transcripts, history, and dictionary on the PC.",
        "Free Tiny tier plus a 14-day full Local trial before the $29 purchase.",
        "SmartScreen may warn during install until code signing lands; checksums are published.",
      ],
    },
    {
      kicker: "The Dragon question",
      title: "What about Dragon?",
      paragraphs: [
        "Dragon Professional v16 deserves a clear answer because it is genuinely local: speech is processed on the PC after activation. The differences are price ($699.99), Windows-only desktop support, and a voice-profile training model that pays off mainly for specialized legal and medical vocabulary.",
        "If you are a former Dragon Home user - that edition was discontinued in 2023 - the full comparison covers when the Professional upgrade is worth it and when a modern train-free tool covers the same job.",
      ],
      bullets: [
        "Dragon Professional is local, but priced and built for specialized professional vocabularies.",
        "Dragon Home was discontinued in 2023 with no consumer replacement.",
        "See the full Dictivo vs Dragon comparison for the migration decision.",
      ],
    },
    {
      kicker: "Verification",
      title: "How to verify a 'local' claim instead of trusting it",
      paragraphs: [
        "Any app can say 'private' on a landing page. The verifiable question is whether dictation audio leaves the machine. On Windows, you can watch an app's network activity with Resource Monitor or a firewall log while dictating: a local tool should show no upload spike during speech.",
        "Dictivo publishes an open network test so you can run exactly this check against its Local mode, plus a page documenting where dictation audio goes in each mode. We think every local-dictation vendor should make that offer.",
      ],
      bullets: [
        "Watch network activity while dictating: local processing means no audio upload.",
        "Dictivo documents its audio path and publishes a repeatable network test.",
        "Apply the same test to any app in this guide, including ours.",
      ],
    },
  ],
  faqTitle: "Windows offline dictation questions",
  faqs: [
    ["Does Windows have built-in offline dictation?", "Yes. Voice Access, built into Windows 11 22H2 and later, downloads a speech model once and then works on-device, including offline. The older Win+H Voice Typing path is cloud-based by default and needs an internet connection."],
    ["Is Windows Voice Typing (Win+H) private?", "Win+H uses Microsoft's cloud-based speech services by default, so dictation audio is sent to the cloud for processing. If on-device processing matters, use Voice Access or a local third-party dictation app."],
    ["What is the best offline dictation software for Windows?", "Start free with Voice Access. For a dedicated local writing workflow, compare Dictivo ($29 once), Whisperstream ($29 once), JesType, and Weesper Neon Flow. For voice coding and hands-free control, Talon is free and local."],
    ["Does Dictivo work offline on Windows?", "Yes. In Local mode, Dictivo processes dictation on the PC after the local model is installed, and transcripts, history, and dictionary terms stay on the device. The installer is not yet Authenticode-signed, so SmartScreen may show a notice during setup."],
    ["Is there a local Dragon alternative for Windows?", "Yes. Dragon Professional itself processes locally but costs $699.99 and relies on voice-profile training. Modern train-free local tools like Dictivo ($29 once) cover everyday dictation; Dragon keeps the edge for specialized legal and medical vocabulary."],
    ["How can I check that a dictation app is really local?", "Dictate while watching the app's network activity in Resource Monitor or a firewall log: local processing should produce no upload during speech. Dictivo publishes an open network test and an audio-path page so you can run this check yourself."],
  ],
  relatedTitle: "Related Dictivo pages",
  relatedRows: [
    ["Offline dictation on Mac", "The macOS version of this comparison.", "https://dictivo.app/guides/offline-dictation-on-mac/"],
    ["Dragon alternative", "Full Dictivo vs Dragon Professional comparison and the Dragon Home migration story.", "https://dictivo.app/compare/dragon-alternative/"],
    ["Where dictation audio goes", "Dictivo's documented audio path for Local mode and Cloud Fast.", "https://dictivo.app/privacy/where-dictation-audio-goes/"],
    ["Local dictation network test", "The repeatable test for verifying that Local mode does not upload audio.", "https://dictivo.app/privacy/local-dictation-network-test/"],
  ],
  referencesTitle: "Evidence links",
};
