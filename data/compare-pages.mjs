export const COMPARE_LAST_UPDATED = {
  // `label` is no longer rendered; the stamp is formatted per locale from `iso`.
  label: "September 2026",
  iso: "2026-09-12",
};

export function compareLastUpdated(page, code) {
  return page?.lastUpdated?.[code] || page?.lastUpdated?.all || COMPARE_LAST_UPDATED.iso;
}

const dictivoRows = {
  processing:
    "Local mode runs on your device. Optional Cloud Fast is separate and only used when you select it.",
  trains: "Never in Local mode.",
  offline: "Yes in Local mode after the local model is installed.",
  account: "No Dictivo account for Local dictation.",
  pricing: "{{price.local.inline}} once, 12 months of updates, then optional update renewal at {{price.renewal.inline}} a year.",
  trial: "Tiny free forever plus a 14-day full Local trial with every local model unlocked.",
  platforms: "Public downloads are available for macOS and Windows x64.",
  boundary:
    "Local mode keeps transcripts, history, dictionary terms, snippets, and settings on your device. No Dictivo account is required for Local dictation.",
};

export const COMPARE_PAGES = [
  {
    "slug": "wispr-flow-alternative",
    "competitor": "Wispr Flow",
    "title": "Wispr Flow Alternative: Offline Dictation & Pricing | Dictivo",
    "metaDescription": "Compare Dictivo and Wispr Flow for offline dictation, free access, privacy and paid plans. Try your everyday Mac or Windows workflow before switching.",
    "h1": "Wispr Flow alternative for offline dictation on Mac and Windows",
    "eyebrow": "Compare alternatives",
    "primaryKeyword": "wispr flow alternative",
    "intro": [
      "Dictivo Local is an alternative to Wispr Flow when you want desktop dictation to work without uploading audio. After installing a model, Local recognition runs on your computer. Cloud Fast is a separate, optional remote service.",
      "Keep Wispr Flow on your shortlist if mobile dictation, cloud editing or team features matter most. Start with the free options in both products; compare paid plans only when you need what they add."
    ],
    "quickTake": [
      [
        "Best for",
        "Offline desktop hotkey dictation",
        "Cloud voice typing across desktop and mobile"
      ],
      [
        "Paid plan, 3 years",
        "{{price.threeYear.inline}} with two optional update renewals",
        "Pro: $432 with annual billing; Free also available"
      ],
      [
        "Privacy model",
        "Local architecture first",
        "Cloud service with privacy controls"
      ]
    ],
    "rows": [
      {
        "label": "Processing location",
        "dictivo": "Local mode runs on your device. Optional Cloud Fast is separate and only used when you select it.",
        "competitor": "Cloud. Wispr's Data Controls page says transcription always occurs on the cloud."
      },
      {
        "label": "Trains AI on your voice",
        "dictivo": "Never in Local mode.",
        "competitor": "Model-improvement sharing is optional. Cloud Storage is a separate setting; transcription still runs remotely."
      },
      {
        "label": "Works fully offline",
        "dictivo": "Yes in Local mode after the local model is installed.",
        "competitor": "No. The core transcription path is cloud-based."
      },
      {
        "label": "Account required",
        "dictivo": "No Dictivo account for Local dictation.",
        "competitor": "Yes. Flow is account-based."
      },
      {
        "label": "Pricing model",
        "dictivo": "{{price.local.inline}} once, 12 months of updates, then optional update renewal at {{price.renewal.inline}} a year.",
        "competitor": "$15/user/month monthly or $12/user/month billed annually for Pro, as listed on Wispr Flow pricing."
      },
      {
        "label": "Free tier / trial",
        "dictivo": "Tiny free forever plus a 14-day full Local trial with every local model unlocked.",
        "competitor": "Free tier: 2,000 words/week on desktop and 1,000/week on mobile, according to the current pricing page."
      },
      {
        "label": "Platforms",
        "dictivo": "Public downloads are available for macOS and Windows x64.",
        "competitor": "Mac, Windows, iPhone, and Android."
      },
      {
        "label": "Privacy boundary",
        "dictivo": "Local mode keeps transcripts, history, dictionary terms, snippets, and settings on your device. No Dictivo account is required for Local dictation.",
        "competitor": "Cloud transcription service. Data-sharing and storage controls affect data handling; transcription still runs remotely."
      }
    ],
    "sections": [
      {
        "kicker": "Choose by task",
        "title": "Keep your cloud workflow, or move everyday dictation on-device",
        "paragraphs": [
          "Flow supports desktop and mobile input, with cloud editing and team features. Those are reasons to keep it if your current setup works. Dictivo focuses on a desktop shortcut, a local transcript and insertion into the app where you write.",
          "Try Dictivo with an email, note or AI prompt you write repeatedly. The 14-day full Local trial includes every local model and needs no card or Dictivo account. Check recognition, correction effort and insertion on your own computer."
        ]
      },
      {
        "kicker": "Privacy",
        "title": "Processing, sharing and storage are separate choices",
        "paragraphs": [
          "Wispr says transcription is processed in the cloud. Its controls for model-improvement sharing and cloud history storage are separate. Turning off sharing does not make recognition local.",
          "In Dictivo Local, speech recognition takes place on your device after model installation. Cloud Fast uploads the selected recording for remote transcription. Choose that mode only when cloud processing is acceptable for the task.",
          "Also check where the finished text goes. Pasting a locally transcribed draft into an online writing service gives that service the text. Local recognition does not change the destination app’s data handling."
        ]
      },
      {
        "kicker": "Free and paid",
        "title": "Compare the plan you would actually use",
        "paragraphs": [
          "Flow has a free plan with weekly word allowances. Dictivo includes Tiny free forever and a 14-day trial of all Local models. If a free option meets your needs, a paid comparison alone is not a reason to switch.",
          "Flow Pro lists $15 per user per month, or $12 per month billed annually. Three years at the annual rate is $432, assuming unchanged pricing.",
          "Dictivo Local is {{price.local.inline}} once, including 12 months of updates and up to 3 personal devices. Two optional {{price.renewal.inline}} update renewals bring the three-year total to {{price.threeYear.inline}}. Without renewal, you keep using your purchased version. Optional Cloud Fast is separate.",
          "These paid plans do different jobs. Compare their features and billing terms, then test your workflow before paying."
        ]
      },
      {
        "kicker": "Switching checklist",
        "title": "Test a small part of your day before replacing Flow",
        "bullets": [
          "Install a Local model while online, then use Local for a short recording without an internet connection.",
          "Test the shortcut in the apps you actually use. Confirm whether you prefer toggle recording or hold-to-talk, and check microphone and Accessibility permissions on Mac.",
          "Use the same passage in both products, including your usual names and specialist terms. Count the corrections and time needed to get usable text.",
          "Check what you would lose: mobile use, cloud editing or team features may matter more than a one-time desktop purchase.",
          "Keep your existing setup until Dictivo works for your repeated task. Review relevant billing terms before changing a subscription."
        ]
      }
    ],
    "faqs": [
      [
        "Which Wispr Flow alternative should I try?",
        "Choose by task: Dictivo Local for offline desktop hotkey dictation; local models in Superwhisper for configurable workflows; MacWhisper if you also transcribe recorded files. Compare each app on your hardware rather than treating this as an accuracy ranking."
      ],
      [
        "Is there a free Wispr Flow alternative?",
        "Start with built-in Apple Dictation on Mac or Windows voice typing for a no-extra-purchase baseline. Their processing requirements differ. Dictivo offers Tiny free forever and a 14-day full Local trial. Flow itself has a free tier; check its current weekly allowance before buying a paid plan."
      ],
      [
        "Does Wispr Flow work offline?",
        "Wispr’s Data Controls page describes cloud transcription. Its sharing and storage controls do not turn that into on-device processing. Dictivo Local works offline after installing a model."
      ],
      [
        "Can I use Dictivo on Mac and Windows?",
        "Public Dictivo downloads are available for macOS and Windows x64. Try the hotkey and text insertion in your actual apps during the trial. Dictivo does not provide a mobile replacement for Flow."
      ],
      [
        "Does Dictivo keep all processing local?",
        "Local speech recognition runs on your device. Cloud Fast is optional and sends selected audio for remote transcription. Text inserted into another app follows that app’s own data handling."
      ],
      [
        "Do I need a subscription for Dictivo Local?",
        "No. Local is {{price.local.inline}} once with 12 months of updates. Future update renewal is optional at {{price.renewal.inline}} a year; the purchased version remains usable without renewal. Cloud Fast is a separate subscription."
      ]
    ],
    "related": [
      "superwhisper-alternative",
      "macos-dictation-alternative"
    ],
    "sources": [
      "https://wisprflow.ai/pricing",
      "https://wisprflow.ai/data-controls",
      "https://wisprflow.ai/privacy"
    ],
    "lastUpdated": {
      "all": "2026-09-18"
    }
  },
  {
    slug: "superwhisper-alternative",
    lastUpdated: { all: "2026-09-18" },
    competitor: "Superwhisper",
    title: "Superwhisper Alternative: Local Dictation & Pricing | Dictivo",
    metaDescription:
      "Compare Dictivo with Superwhisper for local dictation, free access, Pro pricing, privacy settings and switching. Test your everyday workflow before buying.",
    h1: "Superwhisper alternative: local desktop dictation, bought once",
    eyebrow: "Compare alternatives",
    primaryKeyword: "superwhisper alternative",
    intro: [
      "Dictivo is an alternative to Superwhisper for hotkey dictation on Mac and Windows. Both offer local speech processing. Choose based on the writing workflow, platforms and license you actually need.",
      "Start with Superwhisper's free local dictation if it meets your needs. Compare its paid Pro plans with Dictivo Local when you need paid features; a lower purchase price alone is not a reason to leave a setup that already works."
],
    quickTake: [
      ["Best for", "Paid local desktop workflow", "Modes, model choice and mobile access"],
      [`3-year cost`, `{{price.threeYear.inline}} with optional update renewals`, `Pro: $249.99 lifetime or $254.97 over three annual payments`],
      ["Privacy model", "Local mode first", "Local models plus optional cloud models"],
    ],
    rows: [
      { label: "Processing location", dictivo: dictivoRows.processing, competitor: "Local models run on-device; optional cloud models are also available." },
      { label: "Trains AI on your voice", dictivo: dictivoRows.trains, competitor: "Superwhisper says on-device models never send audio anywhere; cloud requests are proxied and not retained for training." },
      { label: "Works fully offline", dictivo: dictivoRows.offline, competitor: "Yes with local models." },
      { label: "Account required", dictivo: dictivoRows.account, competitor: "Pro features require a license; activate it in the app." },
      { label: "Pricing model", dictivo: dictivoRows.pricing, competitor: "$8.49/month, $84.99/year, or $249.99 lifetime for Pro." },
      { label: "Free tier / trial", dictivo: dictivoRows.trial, competitor: "Free local dictation plus a 3,000-word Pro trial. Confirm the model allowance in your app version." },
      { label: "Platforms", dictivo: dictivoRows.platforms, competitor: "Mac, Windows, iPhone, and Android." },
      { label: "Privacy boundary", dictivo: dictivoRows.boundary, competitor: "Local model options with optional cloud model routing." },
    ],
    sections: [
      {
            "kicker": "Choose by task",
            "title": "Keep your modes, or try a focused desktop workflow",
            "paragraphs": [
                  "Superwhisper combines dictation with configurable modes and local or cloud models. Keep it on your shortlist if you rely on those modes or need mobile access alongside desktop use.",
                  "Dictivo focuses on recording with a hotkey, reviewing the transcript and returning it to the active app. Local history, dictionary terms and snippets support repeated writing. The 14-day full Local trial lets you check whether those tools fit your actual work."
            ]
      },
      {
            "kicker": "Privacy",
            "title": "Local audio is only one part of the privacy decision",
            "paragraphs": [
                  "Both products can recognize speech locally after downloading a model. In Superwhisper, check the speech model and any language-model processing used by your selected mode: local recognition does not establish that every later step is local.",
                  "In Dictivo, use Local when audio must remain on your device. Cloud Fast sends the selected recording to servers for transcription; choose it deliberately when cloud processing is acceptable. Text pasted into a cloud-based writing app follows that app's own data handling."
            ],
            "bullets": [
                  "Check where speech recognition runs.",
                  "Check whether any rewriting step sends text elsewhere.",
                  "Check the destination app before pasting sensitive text."
            ]
      },
      {
            "kicker": "Pricing",
            "title": "Compare the free tier before comparing paid licenses",
            "paragraphs": [
                  "Superwhisper offers free local dictation and a 3,000-word Pro trial. Its billing and model pages describe the free model allowance differently, so confirm access to your chosen model in the installed app.",
                  "Pro is listed at $8.49/month, $84.99/year or $249.99 lifetime. Three annual payments total $254.97. These are paid-tier comparisons, not the cost of using its free tier.",
                  "Dictivo Local is {{price.local.inline}} once, including 12 months of updates. Keeping optional update access for years two and three totals {{price.threeYear.inline}}. Declining renewal does not disable the version you already own. Tiny remains free after the full Local trial.",
                  "The plans cover different features and update terms. Check current checkout totals, supported devices and the models you need before deciding."
            ]
      },
      {
            "kicker": "Switching checklist",
            "title": "Try the same task before moving your workflow",
            "paragraphs": [
                  "This is a suggested evaluation, not a completed accuracy benchmark. Use non-sensitive sample text and keep your existing setup until the replacement works."
            ],
            "bullets": [
                  "List the modes, shortcuts and custom terms you use; do not assume they import into Dictivo.",
                  "Choose different hotkeys so the apps do not record at the same time.",
                  "Use the same computer, microphone and short email. Record the model names and whether cloud rewriting is enabled.",
                  "Compare time until usable text, corrections and successful pasting in your usual app.",
                  "Repeat a task with names or specialist terms. Buy only if the change saves work for you."
            ]
      }
],
    faqs: [
      ["What are the best Superwhisper alternatives?", "For local-capable Mac dictation, compare Dictivo Local, VoiceInk, Voice Type, Voibe, and MacWhisper depending on whether the job is live dictation or file transcription."],
      ["Is Dictivo a super whisper alternative?", "Yes, for users searching for a simpler paid local desktop dictation workflow. Dictivo is not a one-to-one replacement for Superwhisper's full mode ecosystem."],
      ["Is there a cheaper alternative to Superwhisper?", "For paid tiers, Dictivo Local has a lower initial purchase price. Superwhisper also has free local dictation, so first check whether that already meets your needs. Compare update terms and required features, not just sticker prices."],
      ["Is Superwhisper a subscription?", "Superwhisper Pro has monthly and annual subscriptions, and it also offers a lifetime purchase. The plans include the same Pro features but differ by billing frequency."],
      ["Does Superwhisper work on Windows?", "Yes. Superwhisper's Pro documentation says one license works across Mac, Windows, iPhone, and Android. Dictivo is also publicly available for both macOS and Windows x64."],
      ["Is Dictivo as accurate as Superwhisper?", "This page does not establish an accuracy winner. Model, language, microphone, accent and optional rewriting all affect results. Try the same everyday task in both apps and compare corrections and time until the text is usable."],
      ["Can I try before buying?", "Dictivo offers a 14-day full Local trial with every local model unlocked. Superwhisper advertises a 3,000-word Pro trial. Its billing and model pages differ on free local-model access, so check the installed version before relying on that allowance."],
    ],
    related: ["wispr-flow-alternative", "macwhisper-alternative"],
    sources: [
      "https://superwhisper.com/",
      "https://superwhisper.com/docs/billing/plans",
      "https://superwhisper.com/docs/get-started/introduction",
      "https://superwhisper.com/models",
    ],
  },
  {
    slug: "macwhisper-alternative",
    lastUpdated: { en: "2026-09-18" },
    competitor: "MacWhisper",
    title: "MacWhisper Alternative: Dictation, Files & Privacy | Dictivo",
    metaDescription:
      "Compare Dictivo and MacWhisper for local dictation, file transcription, setup, and update costs. Both offer dictation; MacWhisper also handles recordings.",
    h1: "MacWhisper alternative for everyday voice typing",
    eyebrow: "Compare alternatives",
    primaryKeyword: "macwhisper alternative",
    intro: [
      "MacWhisper and Dictivo both support dictation into other apps. MacWhisper also handles existing recordings, batch transcription and subtitles; those file workflows are not replaced by Dictivo's hotkey dictation.",
      "Try Dictivo if your main task is writing emails, notes or prompts by voice: press a hotkey, record, then review and paste the transcript. Compare that complete task in both apps before switching."
],
    quickTake: [
      ["Best for", "Focused hotkey dictation", "Dictation plus file and batch transcription"],
      [`3-year cost`, `{{price.threeYear.inline}} with optional update renewals`, `€64 once for Pro, lifetime updates included`],
      ["Workflow", "Speak, review, and paste", "Dictate live or transcribe audio/video files"],
    ],
    rows: [
      { label: "Processing location", dictivo: dictivoRows.processing, competitor: "On-device by default for local transcription; optional cloud/provider models are listed for some workflows." },
      { label: "Trains AI on your voice", dictivo: dictivoRows.trains, competitor: "No for local transcription; optional AI/cloud integrations have their own provider boundaries." },
      { label: "Works fully offline", dictivo: dictivoRows.offline, competitor: "Yes for local model transcription." },
      { label: "Account required", dictivo: dictivoRows.account, competitor: "No account for the core local Mac workflow." },
      { label: "Pricing model", dictivo: dictivoRows.pricing, competitor: "€64 once for MacWhisper Pro, with lifetime updates. A free tier covers the smaller Whisper models." },
      { label: "Free tier / trial", dictivo: dictivoRows.trial, competitor: "Free download with Tiny, Base, and Small Whisper models." },
      { label: "Platforms", dictivo: dictivoRows.platforms, competitor: "macOS." },
      { label: "Privacy boundary", dictivo: dictivoRows.boundary, competitor: "Local transcription and system-wide dictation; optional cloud and AI integrations have separate data handling." },
    ],
    sections: [
      {
            "kicker": "Choose by task",
            "title": "Dictation and file transcription are different jobs",
            "paragraphs": [
                  "MacWhisper offers system-wide dictation as well as audio and video transcription. If you need batch jobs, speaker labels or subtitles, evaluate those features directly; a short voice-typing demo does not test them.",
                  "Dictivo concentrates on hotkey recording and returning text to your writing app, with local history, dictionary terms and snippets. It is worth trying when these everyday writing tools matter more to you than managing recordings."
            ],
            "bullets": [
                  "Both are candidates for dictating into apps.",
                  "Keep MacWhisper in the comparison when existing files are part of your work.",
                  "Check Dictivo on each destination app during the trial; compatibility matters more than a feature label."
            ]
      },
      {
            "kicker": "Privacy",
            "title": "Check both audio processing and optional text processing",
            "paragraphs": [
                  "MacWhisper documents local transcription by default. Its optional cloud transcription sends audio to a provider; translation and AI prompts may send text elsewhere. Local AI through Ollama or LM Studio is a separate option.",
                  "Dictivo Local processes speech on your computer after the model is installed. Optional Cloud Fast sends the selected recording to servers. Either way, the app you paste into may sync text to its own cloud."
            ],
            "bullets": [
                  "For sensitive speech, select local recognition and check any additional AI steps.",
                  "Do not infer that text stays local just because the speech model does.",
                  "Test with non-sensitive material while setting up a new workflow."
            ]
      },
      {
            "kicker": "Pricing",
            "title": "Compare update terms as well as the purchase price",
            "paragraphs": [
                  "MacWhisper lists Pro at €64 once with lifetime updates and also offers a free version.",
                  "Dictivo Local is {{price.local.inline}} once with 12 months of updates. Two optional annual renewals bring a three-year total to {{price.threeYear.inline}}; the version you own remains usable if you stop renewing. Tiny is free after the 14-day full Local trial.",
                  "Different currencies and update terms make a blanket cheaper claim misleading. Compare the final checkout amounts in your currency and decide which features and updates you expect to use."
            ]
      },
      {
            "kicker": "Switching checklist",
            "title": "Run a writing trial without losing your file workflow",
            "paragraphs": [
                  "This is a suggested trial, not evidence that one app is faster or more accurate. Keep your current recordings and exports while testing."
            ],
            "bullets": [
                  "Use different hotkeys and the same microphone. Install the local models before comparing.",
                  "Dictate one email and one prompt into your normal apps. Include a name or term you often correct.",
                  "Record the model, waiting time, corrections and whether the text lands in the right field.",
                  "If you also transcribe files, test a representative file separately in MacWhisper. Do not assume Dictivo replaces batch imports or subtitles.",
                  "Choose after repeating your everyday work, not after a single clean sentence."
            ]
      }
],
    faqs: [
      ["What are the best MacWhisper alternatives?", "For hotkey dictation into the active Mac app, compare Dictivo Local, Superwhisper, VoiceInk, Voice Type, and Voibe. For file transcription, MacWhisper may remain the better fit."],
      ["Is Dictivo a Whisper app alternative?", "Yes, if the user means a Whisper-based or Whisper-style Mac dictation app for voice typing. It is not a generic alternative for every Whisper transcription workflow."],
      ["Does MacWhisper do real-time dictation?", "Yes. MacWhisper advertises real-time system-wide dictation with Whisper. Its most visible workflow is still file and meeting transcription, while Dictivo is built solely around hotkey dictation into the active app."],
      ["What is the best app to dictate into any app on Mac?", "If your goal is voice typing into the current app, Dictivo is designed for that workflow: press the hotkey, speak, and return text to the active field."],
      ["MacWhisper vs dictation apps: what is the difference?", "Both MacWhisper and Dictivo provide dictation into apps. MacWhisper also handles file imports, speaker labels, and exports. Test the writing workflow in your usual app, including corrections and pasting, before deciding."],
      ["Is Dictivo a one-time purchase like MacWhisper?", "Yes. Dictivo Local is {{price.local.inline}} once with 12 months of updates, then an optional update renewal at {{price.renewal.inline}} a year. The version you buy remains usable."],
      ["Can Dictivo transcribe files too?", "Dictivo is focused on live dictation, not batch file transcription. If file transcription is the main job, MacWhisper may be the better choice."],
    ],
    related: ["superwhisper-alternative", "voiceink-alternative"],
    sources: [
      "https://www.macwhisper.com/",
      "https://docs.macwhisper.com/article/52-keeping-transcriptions-private",
    ],
  },
  {
    slug: "voiceink-alternative",
    competitor: "VoiceInk",
    title: "VoiceInk Alternative: Local Setup, Features and Cost",
    metaDescription:
      "Compare VoiceInk and Dictivo for local Mac dictation: model setup, device support, optional cloud processing, license costs and update terms.",
    h1: "VoiceInk alternative: compare local setup, features and cost",
    eyebrow: "Compare alternatives",
    primaryKeyword: "voiceink alternative",
    intro: [
      "VoiceInk is a strong choice if you want a low-cost indie Mac dictation app, local transcription, and a low one-time price with lifetime updates.",
      "Dictivo offers hardware-aware model setup, a Local path without a Dictivo account, and optional Cloud Fast. Compare those features and the update terms with VoiceInk before deciding.",
    ],
    quickTake: [
      ["Best for", "Guided local model setup", "Mac dictation with lifetime updates"],
      [`3-year cost`, `{{price.local.inline}} to {{price.threeYear.inline}} depending on update renewals`, `$25, $39, or $49 current lifetime offers`],
      ["Privacy model", "Local mode first", "Local processing with optional cloud enhancement"],
    ],
    rows: [
      { label: "Processing location", dictivo: dictivoRows.processing, competitor: "Local speech recognition; optional cloud enhancement can send text to a provider." },
      { label: "Trains AI on your voice", dictivo: dictivoRows.trains, competitor: "No for local transcription. Optional cloud enhancement has separate provider boundaries." },
      { label: "Works fully offline", dictivo: dictivoRows.offline, competitor: "Yes for local transcription." },
      { label: "Account required", dictivo: dictivoRows.account, competitor: "Paid licenses are device-limited; local use is Mac app based." },
      { label: "Pricing model", dictivo: dictivoRows.pricing, competitor: "Current offer: $25 for Solo (1 Mac), $39 for Personal (2 Macs), or $49 for Extended (3 Macs), with lifetime updates." },
      { label: "Free tier / trial", dictivo: dictivoRows.trial, competitor: "Try Free button on the site plus a 14-day money-back guarantee on paid tiers." },
      { label: "Platforms", dictivo: dictivoRows.platforms, competitor: "Apple Silicon Mac, macOS 14.4 or later." },
      { label: "Privacy boundary", dictivo: dictivoRows.boundary, competitor: "Local processing with optional cloud enhancement." },
    ],
    sections: [
      {
        kicker: "Where it wins",
        title: "What VoiceInk is great at",
        paragraphs: [
          "VoiceInk is the hardest honesty test because it is genuinely good. It is local-first, inexpensive, and comfortable as a smaller indie tool. If your top priority is the lowest price, VoiceInk deserves a serious look.",
          "Its current offers are $25 for one Mac, $39 for two Macs, and $49 for three Macs. The site also lists lifetime updates and a 14-day money-back guarantee. For many users, that is enough.",
        ],
        bullets: [
          "Low lifetime pricing.",
          "Local transcription and privacy-first positioning.",
          "Power Mode and enhancement prompts for app-specific writing.",
          "A focused solo-developer product.",
        ],
      },
      {
        kicker: "Dictivo difference",
        title: "Where Dictivo is different",
        paragraphs: [
          "Dictivo does not win this on price. Dictivo Local is {{price.local.inline}} once and includes the first year of updates, with an optional renewal at {{price.renewal.inline}} a year after that. VoiceInk's current Solo offer is $25 once and advertises lifetime updates, so over enough years VoiceInk is the cheaper way to stay current. Choose on the Local versus Cloud Fast boundary, guided setup, and support - not on a few dollars.",
          "Dictivo's argument is polish and predictability. The app is shaped around a guided local setup, hardware-aware model selection, a clear Local versus Cloud Fast boundary, local history, dictionary terms, snippets, and a commercial support channel. It is for people who would rather use guided model setup when dictation becomes part of daily work.",
          "Dictivo's privacy promise is the product workflow: Local mode keeps microphone audio, transcripts, history, dictionary terms, snippets, and settings on the customer's device, with no Dictivo account required for Local dictation.",
        ],
        bullets: [
          "Guided Local setup with hardware-aware model tiers.",
          "Hardware-aware model tier recommendations.",
          "A visible choice between Local mode and optional Cloud Fast.",
          "Commercial support and update cadence around a paid product.",
        ],
      },
      {
        kicker: "Privacy",
        title: "Privacy: local processing without pretending price is the only factor",
        paragraphs: [
          "Both VoiceInk and Dictivo offer local dictation. VoiceInk also documents optional cloud transcription and AI processing, so check both recognition and text-processing settings. Dictivo Local keeps dictation audio and text on-device; choosing Cloud Fast sends the selected recording for remote transcription.",
          "Compare the settings you will actually use: local model, optional cloud services, text cleanup and device support. Dictivo provides hardware-aware local model setup and an explicit Local / Cloud Fast choice.",
        ],
        bullets: [
          "Consider VoiceInk if its device tier and included lifetime updates fit your needs.",
          "Use Dictivo if you want guided local model setup and a separate optional Cloud Fast mode.",
          "Do not buy Dictivo because someone told you VoiceInk is unsafe. That is not the argument.",
        ],
      },
      {
        kicker: "Pricing",
        title: "Pricing compared",
        paragraphs: [
          "VoiceInk currently lists $25 for Solo, $39 for Personal, and $49 for Extended, with lifetime updates. Those tiers differ by device count, not by core feature access. The page also advertises a Try Free path and 14-day money-back guarantee.",
          `Dictivo Local is {{price.local.inline}} once. If you keep optional update renewals active for years two and three, the three-year total is {{price.threeYear.inline}}. Without renewals, it is a one-time {{price.local.inline}} purchase for the version you bought.`,
          "Compare the tier for your device count and whether future updates are included. In Dictivo, guided setup recommends local models based on your hardware; use the trial to check that workflow before buying.",
        ],
      },
      {
        kicker: "Decision",
        title: "Who should choose which",
        cards: [
          {
            title: "Choose VoiceInk if",
            items: [
              "Its license tier fits the number of Macs you use.",
              "You prefer its purchase terms and included future updates.",
              "You are comfortable with Apple Silicon and macOS 14.4 or later requirements.",
              "You want lifetime updates included in the purchase.",
            ],
          },
          {
            title: "Choose Dictivo if",
            items: [
              "You want guided setup and a choice of local model tiers.",
              "You care about guided setup and hardware-aware local model tiers.",
              "You want no Dictivo account for Local dictation.",
              "You prefer a license for the purchased version, with optional renewals for future updates.",
            ],
          },
        ],
      },
    ],
    faqs: [
      ["Is VoiceInk really free?", "VoiceInk's site has a Try Free path and paid lifetime tiers. The current paid offers are $25, $39, and $49, depending on device count."],
      ["VoiceInk vs Dictivo: which is more accurate?", "Both offer local speech models. Accuracy depends on the model, microphone, accent and language. We have not published a controlled head-to-head accuracy test; compare the same recording and count corrections."],
      ["How does Dictivo protect local work?", "Use Local mode for private dictation. Audio, transcripts, history, dictionary terms, snippets, and settings stay on the customer's device."],
      ["Does VoiceInk run on Windows?", "VoiceInk's official site lists Apple Silicon Macs and macOS 14.4 or later. Dictivo is publicly available for both macOS and Windows x64."],
      ["How should I compare the everyday workflow?", "Try setup, a short message, a longer paragraph and a correction in the app where you usually write. Compare hotkey reliability, insertion, model selection and recovery from errors. These tasks are more useful than a general claim about polish."],
    ],
    related: ["superwhisper-alternative", "macwhisper-alternative"],
    sources: [
      "https://tryvoiceink.com/",
      "https://tryvoiceink.com/privacy",
      "https://apps.apple.com/us/app/voiceink-ai-dictation/id6751431158?platform=mac",
    ],
  },
  {
    slug: "macos-dictation-alternative",
    competitor: "macOS Dictation",
    title: "A macOS Dictation Alternative with Local Model Choice",
    metaDescription:
      "Need a macOS Dictation alternative? Dictivo adds Whisper-grade local dictation, history, dictionary, snippets, and a private local workflow.",
    h1: "A macOS Dictation alternative with local model choice",
    eyebrow: "Compare alternatives",
    primaryKeyword: "macos dictation alternative",
    intro: [
      "macOS Dictation is free, already installed, and good enough for quick sentences. If that is all you need, you should use it.",
      "Dictivo adds a choice of local Whisper models, local history, dictionary terms, snippets, and configurable hotkeys to daily writing apps.",
    ],
    quickTake: [
      ["Best for", "Daily private Mac dictation", "Free occasional dictation"],
      [`3-year cost`, `{{price.local.inline}} to {{price.threeYear.inline}} depending on update renewals`, `Free with macOS`],
      ["Workflow", "Dedicated dictation product layer", "Built-in system feature"],
    ],
    rows: [
      { label: "Processing location", dictivo: dictivoRows.processing, competitor: "Varies by Mac, language, and settings. Apple says Keyboard settings indicate whether audio/transcripts are processed on-device or sent to Siri servers." },
      { label: "Trains AI on your voice", dictivo: dictivoRows.trains, competitor: "Apple may use transcripts and request data to improve products; audio storage/review depends on Improve Siri & Dictation settings." },
      { label: "Works fully offline", dictivo: dictivoRows.offline, competitor: "Depends on device, language, and settings." },
      { label: "Account required", dictivo: dictivoRows.account, competitor: "No additional dictation account." },
      { label: "Pricing model", dictivo: dictivoRows.pricing, competitor: "Included with macOS." },
      { label: "Free tier / trial", dictivo: dictivoRows.trial, competitor: "Free built-in feature." },
      { label: "Platforms", dictivo: dictivoRows.platforms, competitor: "macOS and other Apple platforms." },
      { label: "Privacy boundary", dictivo: dictivoRows.boundary, competitor: "Apple system feature with settings-dependent processing and Apple privacy controls." },
    ],
    sections: [
      {
        kicker: "Where it wins",
        title: "What macOS Dictation is great at",
        paragraphs: [
          "Apple Dictation wins the first comparison before the page even starts: it is free and already on your Mac. There is no installer, no checkout, no third-party app permission prompt beyond the system feature itself, and no need to learn a new product.",
          "For short messages, quick search fields, casual notes, and people who dictate only occasionally, that may be enough. Dictivo should not ask those users to pay for a workflow they do not need.",
        ],
        bullets: [
          "Free and built into macOS.",
          "Works anywhere you can type.",
          "Simple keyboard shortcut and microphone key behavior.",
          "No separate vendor relationship for basic dictation.",
        ],
      },
      {
        kicker: "Dictivo difference",
        title: "Where Dictivo is different",
        paragraphs: [
          "Dictivo is for the point where built-in dictation stops feeling like enough. Serious dictation is not just speech recognition. It is model choice, local history, correction loops, a personal dictionary, snippets, visible privacy mode, and a product surface designed for repeated daily use.",
          "Dictivo Local lets you choose among local Whisper models for daily writing. The app guides setup based on hardware, then keeps transcripts, dictionary terms, snippets, and local settings on the device. That creates a repeatable workflow for people who dictate long emails, support replies, notes, prompts, documentation, or first drafts every day.",
          "The productivity layer matters as much as the model. Built-in dictation gives you text. Dictivo gives you a workbench around that text: history when a paste fails, dictionary terms for names and jargon, snippets for repeated phrasing, and a clear Local versus Cloud Fast mode boundary.",
        ],
        bullets: [
          "Selectable local Whisper models; compare correction needs using your own speech.",
          "Local history, dictionary, and snippets.",
          "Hardware-aware model setup instead of hidden system behavior.",
          "Visible privacy boundary for Local mode and optional Cloud Fast.",
        ],
      },
      {
        kicker: "Privacy",
        title: "Privacy: be precise about Apple's current behavior",
        paragraphs: [
          "Apple's privacy story has improved over the years, and it would be unfair to describe every Mac dictation as cloud-only. Apple Support says Keyboard settings can show whether general text Dictation is processed on-device and not sent to Siri servers, or whether an internet connection is needed. Apple's legal page says that otherwise, dictated content is sent to and processed on servers, and it describes separate settings for Improve Siri & Dictation.",
          "Dictivo's Local mode is simpler to reason about. Dictivo Local does not ask you to infer the processing path from a system settings line. The normal path is local speech recognition on your device, with transcripts and local product data kept on the machine. If you switch to optional Cloud Fast, the app is explicit that the selected recording is uploaded for speed.",
        ],
        bullets: [
          "Apple Dictation privacy depends on device, language, and settings.",
          "Dictivo Local is a product-level local-only workflow.",
          "Use Apple's built-in feature for casual text; use Dictivo when the processing boundary needs to be obvious.",
        ],
      },
      {
        kicker: "Pricing",
        title: "Pricing compared",
        paragraphs: [
          `There is no price battle with Apple. macOS Dictation is included with your Mac. Dictivo Local is {{price.local.inline}} once, with an optional update renewal at {{price.renewal.inline}} a year after the first 12 months. Three years with update renewals active is {{price.threeYear.inline}}.`,
          "That means Dictivo has to earn the purchase on workflow, accuracy, and trust, not on being cheaper. If you dictate one sentence a week, use Apple. If dictation is becoming a daily input method, a dedicated local app can pay for itself quickly in saved correction time and reduced friction.",
        ],
      },
      {
        kicker: "Decision",
        title: "Who should choose which",
        cards: [
          {
            title: "Stick with macOS Dictation if",
            items: [
              "You dictate only occasional short messages.",
              "Free and built-in matters more than model control.",
              "You are satisfied with Apple's current accuracy for your accent and vocabulary.",
              "You do not need local history, dictionary terms, snippets, or support.",
            ],
          },
          {
            title: "Choose Dictivo if",
            items: [
              "You want a macOS Dictation alternative for daily writing.",
              "You want Whisper-grade local transcription and visible privacy boundaries.",
              "You need a dictionary and snippets for names, terms, and repeated phrases.",
              "You want a 14-day trial before deciding whether dedicated dictation is worth paying for.",
            ],
          },
        ],
      },
    ],
    faqs: [
      ["Is Apple Dictation private?", "It depends on your Mac, language, and settings. Apple says Keyboard settings indicate whether audio and transcripts are processed on-device and not sent to Siri servers; otherwise dictated content is sent to servers for processing."],
      ["Is there a more accurate dictation app for Mac?", "Accuracy depends on the speaker, language, microphone, model and text. We have not published a controlled accuracy comparison with Apple Dictation. Try the same paragraph in both, including names or specialist terms, and count the corrections before choosing."],
      ["Does macOS Dictation work offline?", "Apple says Keyboard settings can indicate whether an internet connection is needed. Offline availability depends on the device, language, and current system behavior."],
      ["What is the best offline dictation app for Mac?", "If you want a paid, local-first workflow with hotkey dictation, local history, dictionary terms, snippets, and a clear privacy boundary, Dictivo is built for that job."],
      ["Is Dictivo free?", "Dictivo has a tiny free local tier and a 14-day full Local trial with every local model unlocked. Dictivo Local is {{price.local.inline}} once if you decide to buy."],
    ],
    related: ["wispr-flow-alternative", "voiceink-alternative"],
    sources: [
      "https://support.apple.com/en-gb/guide/mac-help/mh40584/26/mac/26",
      "https://www.apple.com/legal/privacy/data/en/ask-siri-dictation/",
      "https://www.apple.com/privacy/features/",
    ],
  },
  {
    slug: "dragon-alternative",
    competitor: "Dragon Professional",
    title: "Dragon Alternative: Local Dictation Without the $699 License (2026)",
    metaDescription:
      "Dragon Home is discontinued and Dragon Professional costs $699.99. Dictivo is the Dragon alternative for everyday dictation: local, train-free, bought once.",
    h1: "Dragon alternative: everyday local dictation without the enterprise price",
    eyebrow: "Compare alternatives",
    primaryKeyword: "dragon naturallyspeaking alternative",
    intro: [
      "Dragon Professional v16 combines local Windows speech recognition, custom vocabulary and commands for controlling a PC. If you rely on those commands or have a vocabulary built over time, include them in your comparison.",
      "Dictivo is the Dragon alternative for everyone that price no longer serves: everyday writers, ex-Dragon Home users, and Mac users Dragon left behind in 2018. Local dictation on macOS and Windows, no voice training, {{price.local.inline}} once.",
    ],
    quickTake: [
      ["Best for", "Everyday local dictation on Mac and Windows", "Specialized vocabularies and hands-free PC control"],
      ["Up-front cost", "{{price.local.inline}} once, optional update renewal at {{price.renewal.inline}} a year", "$699.99 one-time for Dragon Professional v16"],
      ["Setup", "No voice training; dictate in minutes", "Voice profile and vocabulary training pay off over time"],
    ],
    rows: [
      { label: "Processing location", dictivo: dictivoRows.processing, competitor: "Local. Dragon Professional v16 processes speech on-device; internet is needed only for installation and one-time license activation." },
      { label: "Trains AI on your voice", dictivo: dictivoRows.trains, competitor: "Dragon Professional uses a local voice profile that you train and maintain. This row describes the desktop edition." },
      { label: "Works fully offline", dictivo: dictivoRows.offline, competitor: "Yes. Dragon Professional v16 runs offline after activation, including Auto-Transcribe of audio files." },
      { label: "Account required", dictivo: dictivoRows.account, competitor: "No account for daily use; a one-time online activation is required." },
      { label: "Pricing model", dictivo: dictivoRows.pricing, competitor: "$699.99 one-time for Dragon Professional v16. The consumer Dragon Home edition was discontinued in 2023 with no replacement." },
      { label: "Free tier / trial", dictivo: dictivoRows.trial, competitor: "No free tier. Trial availability varies by reseller." },
      { label: "Platforms", dictivo: dictivoRows.platforms, competitor: "Windows 10/11 desktop only. Dragon for Mac was discontinued in 2018, and Dragon Anywhere Mobile stopped being sold on 1 July 2026." },
      { label: "Privacy boundary", dictivo: dictivoRows.boundary, competitor: "Local desktop processing. The Anywhere and Medical One editions are separate cloud subscription products with cloud processing." },
    ],
    sections: [
      {
        kicker: "Where it wins",
        title: "What Dragon Professional is great at",
        paragraphs: [
          "Dragon Professional v16 combines local speech recognition with custom vocabulary and voice commands for controlling a Windows PC. These features matter when your workflow depends on established commands or a vocabulary you have built over time.",
          "Check the exact Dragon edition your organization uses. Professional desktop, Medical One and other cloud offerings have different workflows and processing locations; features of one edition should not be assumed to exist in another.",
        ],
        bullets: [
          "Custom vocabulary for the terminology used in your work.",
          "Deep hands-free command-and-control and custom voice macros.",
          "Local on-device processing in the desktop edition, including file transcription.",
          "Check required commands, custom vocabulary and edition-specific deployment options.",
        ],
      },
      {
        kicker: "Dictivo difference",
        title: "Where Dictivo is different",
        paragraphs: [
          "Dictivo focuses on typing into emails, documents, notes and chat using a hotkey. It does not provide a feature-for-feature replacement for specialized Dragon workflows or full hands-free PC control.",
          "Dictivo does not require a trained voice profile: install, pick a model matched to your hardware, hold a hotkey, and dictate into your writing app. Test your own names, accent, and terminology during the trial; this page does not establish comparative accuracy against Dragon.",
          "There is also the platform question. Dragon has not shipped a native Mac desktop product since 2018. Dictivo provides public installers for macOS and Windows x64. Test input and insertion in the apps you use on each platform.",
        ],
        bullets: [
          "{{price.local.inline}} once instead of $699.99 - about 1/24 of the Dragon Professional license.",
          "No voice training or profile maintenance.",
          "Runs on macOS and Windows; Dragon desktop is Windows-only.",
          "Hotkey-driven dictation into supported text fields, with local history, dictionary, and snippets.",
        ],
      },
      {
        kicker: "Migration",
        title: "Dragon Home is gone - what former users actually need",
        paragraphs: [
          "Nuance discontinued Dragon Home, the roughly $150 consumer edition, in 2023, and discontinued Dragon for Mac back in 2018. Dragon Professional v16 is a currently sold Windows desktop option at $699.99. Check your own license terms and any available upgrade offers separately.",
          "Before switching, list the tasks you used in Dragon Home: text entry, corrections, commands and any saved vocabulary. A lower price does not establish that another app supports the whole workflow.",
          "If what you used Dragon Home for was everyday dictation - not custom legal vocabularies or full hands-free control - a train-free local tool like Dictivo covers that job at the price class Dragon Home used to occupy.",
        ],
        bullets: [
          "Dragon Home: discontinued 2023, no consumer replacement.",
          "Dragon for Mac: discontinued 2018, no native Mac product since.",
          "Dragon Professional v16 is a currently sold Windows desktop option.",
          "Dictivo covers the everyday-dictation job at {{price.local.inline}} once.",
        ],
      },
      {
        kicker: "Pricing",
        title: "Pricing compared",
        paragraphs: [
          "Dragon Professional v16 is $699.99 as a one-time perpetual license. Dragon Anywhere Mobile is no longer on sale: as of 1 July 2026 new subscriptions cannot be bought and existing ones cannot be renewed. Dragon Medical One remains, enterprise-priced per user per month.",
          `Dictivo Local is {{price.local.inline}} once with 12 months of updates. Keeping optional update renewals active for two more years brings the three-year total to {{price.threeYear.inline}}. Without renewals, the version you bought keeps working.`,
          "The honest framing: if specialized vocabulary accuracy or hands-free control earns you money or independence every day, Dragon's price can be rational. If you want private, local, everyday dictation, you are paying for capabilities you will not use.",
        ],
      },
      {
        kicker: "Decision",
        title: "Who should choose which",
        cards: [
          {
            title: "Choose Dragon Professional if",
            items: [
              "You depend on custom vocabulary already configured in Dragon Professional.",
              "You need full hands-free command-and-control of your PC, or rely on it for accessibility.",
              "Your organization requires specific Dragon commands or deployment features.",
              "You have years of custom Dragon macros and vocabulary investment.",
            ],
          },
          {
            title: "Choose Dictivo if",
            items: [
              "You want everyday dictation - email, documents, notes - without a $699.99 license.",
              "You used Dragon Home and the Professional upgrade path is not worth it for you.",
              "You work on a Mac, where Dragon has had no native product since 2018.",
              "You want train-free local dictation running in minutes, at {{price.local.inline}} once.",
            ],
          },
        ],
      },
    ],
    faqs: [
      ["Is Dragon NaturallySpeaking still available?", "Partly, and the consumer side keeps shrinking. Dragon Home was discontinued in 2023, Dragon for Mac in 2018, and Dragon Anywhere Mobile stopped being sold on 1 July 2026. What remains is Dragon Professional v16 for Windows at $699.99, plus enterprise offerings like Dragon Medical One."],
      ["What is the best cheap Dragon alternative?", "For everyday dictation, compare modern local tools: Dictivo is {{price.local.inline}} once and does not require voice-profile training on Mac or Windows. Windows 11 users can also try built-in Voice Access. If you depend on Dragon commands or custom vocabulary, test those requirements before switching."],
      ["Does Dragon work on Mac?", "No. Nuance discontinued Dragon Professional Individual for Mac in October 2018 and has not shipped a native Mac desktop product since. Dictivo provides public installers for macOS and Windows x64; test your required text fields and hotkeys on your platform."],
      ["Do I need to train Dictivo like Dragon?", "No. Dictivo uses modern Whisper-grade local models that work without a voice profile. Dragon builds accuracy through profile and vocabulary training, which pays off for specialized terminology but adds setup and maintenance."],
      ["Is Dictivo as accurate as Dragon?", "We have not published a controlled accuracy comparison between Dictivo and Dragon. Try the same recordings and work tasks in both, using the vocabulary and settings you would normally use, and compare the corrections required."],
      ["Does Dragon run offline like Dictivo?", "Yes - this is a real similarity. Dragon Professional v16 processes speech locally and works offline after activation. The differences are price, platforms, and training, not the local processing itself."],
      ["What happened to Dragon Home?", "Nuance discontinued the roughly $150 Dragon Home edition in 2023 without a consumer replacement. Dragon Professional v16 is currently sold at $699.99. Compare the tasks and license terms you need before choosing a replacement."],
    ],
    related: ["wispr-flow-alternative", "macos-dictation-alternative"],
    sources: [
      "https://dragon.nuance.com/en-us/dragon-professional",
      "https://dragon.nuance.com/shared/data-sheets/ds-dragon-professional-v16-en-us.pdf",
      "https://apps.apple.com/us/app/dragon-anywhere/id1024652126",
    ],
  },
];

export const COMPARE_HUB = {
  path: "/compare",
  title: "Compare Dictivo Alternatives",
  metaTitle: "Dictivo Comparisons: Local Desktop Dictation Alternatives",
  metaDescription:
    "Compare Dictivo with Wispr Flow, Superwhisper, MacWhisper, VoiceInk, Dragon, and macOS Dictation across privacy, pricing, and workflow.",
  h1: "Compare Dictivo with other dictation tools",
  lede:
    "A practical hub for choosing a private desktop dictation workflow. Each comparison starts with what the other product is genuinely good at, then explains where Dictivo's local-first architecture and buy-once pricing fit.",
};

export const COMPARE_NAV_LINKS = COMPARE_PAGES.map((page) => ({
  slug: page.slug,
  competitor: page.competitor,
  title: page.title.replace(" (2026)", ""),
  href: `/compare/${page.slug}`,
}));
