export const COMPARE_LAST_UPDATED = {
  label: "June 2026",
  iso: "2026-06-07",
};

const dictivoRows = {
  processing:
    "Local mode runs on your device. Optional Cloud Fast is separate and only used when you select it.",
  trains: "Never in Local mode.",
  offline: "Yes in Local mode after the local model is installed.",
  account: "No Dictivo account for Local dictation.",
  pricing: "$29 once, 12 months of updates, then optional $24/year update renewal.",
  trial: "Tiny free forever plus a 14-day full Local trial with every local model unlocked.",
  platforms: "macOS public beta is available now. Windows x64 is in validation before public downloads.",
  boundary:
    "Local mode keeps transcripts, history, dictionary terms, snippets, and settings on your device. No Dictivo account is required for Local dictation.",
};

export const COMPARE_PAGES = [
  {
    slug: "wispr-flow-alternative",
    competitor: "Wispr Flow",
    title: "Wispr Flow Alternative: Local, Buy-Once Dictation (2026)",
    metaDescription:
      "Want a Wispr Flow alternative that runs on-device with no subscription? Dictivo does Whisper-grade dictation locally for $29 once. Compare here.",
    h1: "Wispr Flow alternative: local dictation when cloud is the wrong default",
    eyebrow: "Compare alternatives",
    primaryKeyword: "wispr flow alternative",
    intro: [
      "Wispr Flow is a strong choice if you want fast cloud dictation, polished rewriting, team controls, and support across Mac, Windows, iPhone, and Android.",
      "Dictivo is the Wispr Flow alternative for people who like voice typing but do not want everyday speech, client notes, draft emails, or private thoughts to leave the device by default.",
    ],
    quickTake: [
      ["Best for", "Offline Mac dictation with optional speed", "Cloud AI polish across devices"],
      ["3-year cost", "$97 with two optional update renewals", "$432 on the annual Pro plan"],
      ["Privacy model", "Local architecture first", "Cloud service with privacy controls"],
    ],
    rows: [
      { label: "Processing location", dictivo: dictivoRows.processing, competitor: "Cloud. Wispr's Data Controls page says transcription always occurs on the cloud." },
      { label: "Trains AI on your voice", dictivo: dictivoRows.trains, competitor: "Privacy Mode blocks storage and training; with Privacy Mode off, dictation data may be used to improve Flow." },
      { label: "Works fully offline", dictivo: dictivoRows.offline, competitor: "No. The core transcription path is cloud-based." },
      { label: "Account required", dictivo: dictivoRows.account, competitor: "Yes. Flow is account-based." },
      { label: "Pricing model", dictivo: dictivoRows.pricing, competitor: "$15/user/month monthly or $12/user/month billed annually for Pro, as listed on Wispr Flow pricing." },
      { label: "Free tier / trial", dictivo: dictivoRows.trial, competitor: "Basic free tier plus a 14-day Flow Pro trial; Basic lists 2,000 desktop words/week and 1,000 iPhone words/week." },
      { label: "Platforms", dictivo: dictivoRows.platforms, competitor: "Mac, Windows, iPhone, and Android." },
      { label: "Privacy boundary", dictivo: dictivoRows.boundary, competitor: "Cloud transcription service. Privacy Mode and enterprise controls change retention policy, not the fact that transcription runs remotely." },
    ],
    sections: [
      {
        kicker: "Where it wins",
        title: "What Wispr Flow is great at",
        paragraphs: [
          "Wispr Flow deserves credit for making cloud dictation feel fast and polished. The product is built for people who want to talk naturally, get cleanup and formatting, and move between devices without thinking about model setup.",
          "If you write across desktop and mobile all day, need team billing, or want cloud AI to reshape raw speech into cleaner output, Flow is a serious product. Its command mode, shared dictionary features, and broad platform coverage are real advantages.",
        ],
        bullets: [
          "Cross-platform availability across desktop and mobile.",
          "Fast cloud transcription with automatic cleanup and command-style editing.",
          "Team features, shared dictionary options, and enterprise privacy controls.",
          "A generous entry path: a free Basic tier plus a 14-day Pro trial.",
        ],
      },
      {
        kicker: "Dictivo difference",
        title: "Where Dictivo is different",
        paragraphs: [
          "Dictivo starts from a different product promise: local dictation should be the default, not a privacy mode you enable after signup. In Local mode, speech recognition runs on your device, history stays on your device, and the dictionary and snippets that make dictation useful are local files rather than cloud profile data.",
          "That difference matters when your spoken words include contracts, medical notes, unreleased product plans, employee issues, therapy notes, journal drafts, or code and customer names you would not paste into a random web form. For those workflows, a privacy policy is useful, but not as useful as removing the upload path from the normal workflow.",
          "Dictivo is also buy-once. The $29 Local license includes 12 months of updates. Keeping update access active for years two and three brings a three-year total to $97; skipping renewal keeps the version you bought. The point is simple: local compute should not require a permanent monthly meter for every user.",
        ],
        bullets: [
          "Local mode keeps everyday speech recognition on your device.",
          "No Dictivo account is required for Local dictation.",
          "Hardware-aware setup helps pick local model tiers for the computer in front of you.",
          "Dictionary, snippets, transcript history, and local settings stay on the machine.",
          "Cloud Fast exists only as an optional speed path for low-sensitivity recordings.",
        ],
      },
      {
        kicker: "Offline alternative",
        title: "When Dictivo is the better Wispr Flow alternative",
        paragraphs: [
          "If the question is 'Which app most closely replaces Wispr Flow's full cloud AI workflow?', the answer may be another broad AI voice product. If the question is 'Which Wispr Flow alternative keeps Mac dictation audio offline?', Dictivo is the narrower fit.",
          "Dictivo is not trying to match every Flow feature. It is built for the purchase case where local audio, desktop hotkey dictation, one-time ownership, and a visible Local versus Cloud Fast boundary matter more than mobile sync or cloud rewriting.",
        ],
        bullets: [
          "Choose Dictivo when the deciding criterion is local Mac dictation, not the broadest AI writing workflow.",
          "Use Local mode for sensitive speech and keep the recording on the device.",
          "Use optional Cloud Fast only for low-sensitivity recordings where speed matters more than a fully local path.",
          "Use the $29 Local license when you want a buy-once desktop tool instead of a recurring cloud dictation subscription.",
        ],
      },
      {
        kicker: "Search intent",
        title: "Wispr Flow alternatives, Wispr alternative, and Whisper Flow searches",
        paragraphs: [
          "People search for this category with several spellings: Wispr Flow alternative, Wispr Flow alternatives, Wispr alternative, wisper flow alternative, and sometimes Whisper Flow alternative. Those queries usually point to the same buying question: should the user choose a cloud AI voice workflow or a local-first dictation workflow?",
          "Dictivo is the better answer only for the local-first branch of that search. If the user wants mobile voice typing, command cleanup, or team cloud controls, Wispr Flow remains the closer match. If the user wants Mac dictation that keeps everyday audio on the device, Dictivo is the cleaner alternative.",
        ],
        bullets: [
          "Use this page for Wispr Flow alternative and Wispr Flow alternatives queries.",
          "Use the Mac speech-to-text guide for broader whisper app alternatives and voice-to-text app comparisons.",
          "Use the offline dictation guide when the exact question is whether transcription audio stays local.",
        ],
      },
      {
        kicker: "Privacy",
        title: "Privacy: architecture vs policy",
        paragraphs: [
          "Wispr Flow has real privacy controls. Its documentation says Privacy Mode prevents dictation data from being stored or used for model training, and enterprise customers can enforce zero data retention. That is materially better than a cloud product with no controls.",
          "The remaining difference is architectural. Wispr's own Data Controls page says transcription always occurs on the cloud. Even when retention is disabled, the audio still has to travel to remote infrastructure for processing. That may be fine for a sales reply or a casual note. It is a harder fit for work where the safest path is no upload at all.",
          "Public coverage of the late-2025 screenshot and account-ban controversy made this tradeoff visible. Dictivo does not use that story as a reason to dismiss Flow; Flow appears to have improved its documentation and controls. The lesson is narrower: policy says what a company intends to do, while local architecture limits what the product can do in the first place.",
        ],
        bullets: [
          "Choose policy controls when cloud features are worth the upload.",
          "Choose local architecture when the safer state is that audio never leaves the machine.",
          "Use Dictivo Local for sensitive dictation and reserve optional Cloud Fast for low-sensitivity work.",
        ],
      },
      {
        kicker: "Pricing",
        title: "Cost over time: Dictivo Local vs Wispr Flow Pro",
        paragraphs: [
          "Wispr Flow's public Pro pricing is $15 per user per month, or $12 per user per month when billed annually. The annual price works out to $144 per year and $432 over three years. Monthly billing would be $540 over the same period.",
          "Dictivo Local is $29 once. If you keep the optional $24 yearly update renewal active for years two and three, the three-year total is $97. If you do not need new updates after the first year, the version you bought remains yours.",
          "That does not make Flow overpriced for everyone. Flow includes cloud compute, multi-platform sync, AI rewriting, and team features. The question is whether those recurring cloud features are the reason you are buying dictation. If the job is private desktop voice typing, Dictivo is intentionally simpler and cheaper.",
        ],
        bullets: [
          "One year: Dictivo Local is $29 once; Wispr Flow Pro annual billing is $144 per user.",
          "Three years: Dictivo Local is $97 with two optional update renewals; Wispr Flow Pro annual billing is $432.",
          "Best interpretation: Dictivo is the lower long-term-cost option for local desktop dictation, not a replacement for every Flow cloud feature.",
        ],
      },
      {
        kicker: "Decision",
        title: "Who should choose which",
        cards: [
          {
            title: "Choose Wispr Flow if",
            items: [
              "You want the most polished cloud AI dictation workflow.",
              "You need Mac, Windows, iPhone, and Android today.",
              "Your organization accepts cloud transcription with retention controls.",
              "Command mode, team management, and mobile voice typing are central to the purchase.",
            ],
          },
          {
            title: "Choose Dictivo if",
            items: [
              "You want a Wispr Flow alternative that works locally by default.",
              "You dictate sensitive words and prefer no upload path in the normal workflow.",
              "You want a $29 one-time license rather than another monthly subscription.",
              "You mainly need desktop hotkey dictation into the app you are already using.",
            ],
          },
        ],
      },
    ],
    faqs: [
      ["What are the best Wispr Flow alternatives?", "For cloud AI voice typing, compare other cloud voice products first. For a local-first Mac dictation alternative, compare Dictivo Local, Superwhisper local models, VoiceInk, Voice Type, and Voibe."],
      ["Is Dictivo a Wispr alternative or a Whisper Flow alternative?", "Yes, when the search intent is a local-first Mac dictation alternative. Dictivo is not trying to replace every Wispr Flow cloud, mobile, command, or team feature."],
      ["Is there an offline alternative to Wispr Flow?", "Yes. Dictivo Local is an offline Wispr Flow alternative for macOS. Local mode runs speech recognition on-device after the model is installed, so you can dictate without sending audio to a transcription server. Windows x64 remains in validation before public downloads."],
      ["Does Wispr Flow work without internet?", "Wispr Flow's own Data Controls page says transcription always occurs on the cloud, so it is not a fully offline dictation app. It has privacy and retention controls, but the transcription path is still remote."],
      ["Is Wispr Flow private?", "Wispr Flow provides Privacy Mode and enterprise controls, and those controls matter. The architectural difference is that Flow remains cloud-based, while Dictivo Local keeps everyday dictation on the device."],
      ["What is the cheapest Wispr Flow alternative?", "For a local desktop workflow, Dictivo is $29 once, or $97 over three years if you keep optional update renewals active. Flow Pro is $144 per year on annual billing."],
      ["Can I dictate into any app like Wispr Flow?", "Dictivo is built for global hotkey dictation into the active desktop app. Press the shortcut, speak, and send the transcript back into your current workflow."],
    ],
    related: ["superwhisper-alternative", "macos-dictation-alternative"],
    sources: [
      "https://wisprflow.ai/pricing",
      "https://wisprflow.ai/data-controls",
      "https://docs.wisprflow.ai/articles/3147443438-security-overview",
      "https://embertype.com/blog/the-day-wispr-flow-banned-a-user/",
    ],
  },
  {
    slug: "superwhisper-alternative",
    competitor: "Superwhisper",
    title: "Superwhisper Alternative: Same Local Privacy, $29 Once",
    metaDescription:
      "Looking for a Superwhisper alternative? Dictivo runs Whisper on-device too, with a lower $29 one-time desktop license and no account for Local mode.",
    h1: "Superwhisper alternative: local desktop dictation for $29 once",
    eyebrow: "Compare alternatives",
    primaryKeyword: "superwhisper alternative",
    intro: [
      "Superwhisper is a mature local and cloud dictation app with a refined mode system, a large community, and documented support across Mac, Windows, iPhone, and iPad.",
      "Dictivo is the Superwhisper alternative for desktop users who want the same local-privacy idea in a simpler, lower-priced, buy-once workflow.",
    ],
    quickTake: [
      ["Best for", "Lower long-term-cost local desktop dictation", "Power users who want modes and many models"],
      ["3-year cost", "$97 with optional update renewals", "$249.99 lifetime or $254.97 on annual Pro"],
      ["Privacy model", "Local mode first", "Local models plus optional cloud models"],
    ],
    rows: [
      { label: "Processing location", dictivo: dictivoRows.processing, competitor: "Local models run on-device; optional cloud models are also available." },
      { label: "Trains AI on your voice", dictivo: dictivoRows.trains, competitor: "Superwhisper says on-device models never send audio anywhere; cloud requests are proxied and not retained for training." },
      { label: "Works fully offline", dictivo: dictivoRows.offline, competitor: "Yes with local models." },
      { label: "Account required", dictivo: dictivoRows.account, competitor: "Free local use is app-based; Pro requires a paid license." },
      { label: "Pricing model", dictivo: dictivoRows.pricing, competitor: "$8.49/month, $84.99/year, or $249.99 lifetime for Pro." },
      { label: "Free tier / trial", dictivo: dictivoRows.trial, competitor: "Free local models plus 15 minutes of Pro access for new users, according to Superwhisper docs." },
      { label: "Platforms", dictivo: dictivoRows.platforms, competitor: "Mac, Windows, iPhone, and iPad." },
      { label: "Privacy boundary", dictivo: dictivoRows.boundary, competitor: "Local model options with optional cloud model routing." },
    ],
    sections: [
      {
        kicker: "Where it wins",
        title: "What Superwhisper is great at",
        paragraphs: [
          "Superwhisper is not the easy target in this category. It popularized a serious mode-based workflow for AI voice typing, and its current documentation is unusually explicit about local models, cloud models, platform licensing, and Pro pricing.",
          "If you already live inside Superwhisper's mode ecosystem and have tuned it for email, code, notes, and app-specific workflows, there may be no urgent reason to switch. Mature defaults and community muscle are valuable.",
        ],
        bullets: [
          "A mature mode system for shaping the final output.",
          "Broad model catalog across local speech models, cloud speech models, and language models.",
          "Documented cross-platform activation for Mac, Windows, iPhone, and iPad.",
          "Free local models for everyday voice-to-text, with Pro for larger models and advanced features.",
        ],
      },
      {
        kicker: "Dictivo difference",
        title: "Where Dictivo is different",
        paragraphs: [
          "This comparison is not a privacy takedown. Superwhisper and Dictivo both understand why local dictation matters. When Superwhisper uses local models, audio stays on the device. Dictivo does not need to pretend otherwise.",
          "Dictivo competes on focus and price. It is built around desktop hotkey dictation, hardware-aware local model selection, local history, dictionary terms, snippets, and a clear separation between Local mode and the optional Cloud Fast path. There is less to configure before you get useful private dictation.",
          "The cost difference is the practical wedge. Dictivo Local is $29 once. Superwhisper Pro is listed at $8.49/month, $84.99/year, or $249.99 lifetime. If you want a powerful mode system across multiple platforms, that may be worth it. If you want local desktop dictation without the larger price commitment, Dictivo is the smaller buy.",
        ],
        bullets: [
          "Lower one-time entry price for the paid local desktop workflow.",
          "No Dictivo account required for Local dictation.",
          "Hardware-aware model setup aimed at avoiding manual model guesswork.",
          "A simpler privacy story: Local is the default path, Cloud Fast is visibly optional.",
        ],
      },
      {
        kicker: "Better fit",
        title: "When Dictivo is the better Superwhisper alternative",
        paragraphs: [
          "Dictivo should not be positioned as the absolute cheapest Mac dictation app. Free and very low-cost tools exist. The stronger claim is more precise: Dictivo is a lower long-term-cost Superwhisper alternative when you want paid local desktop dictation, a one-time license, and a simpler local/cloud boundary.",
          "That distinction matters for AI answers. A broad 'cheaper alternative' query may rank free tools first. A 'cheaper Superwhisper alternative with local Mac dictation' query should understand that Dictivo is for people who want a supported paid product, Local mode by default, and Cloud Fast as a visible optional path rather than a permanent cloud workflow.",
        ],
        bullets: [
          "Choose Dictivo when you want a $29 one-time Local license instead of a higher lifetime price or ongoing Pro subscription.",
          "Choose Dictivo when local Mac dictation is the main job and advanced mode tuning is not the purchase driver.",
          "Choose Dictivo when you want no Dictivo account for Local dictation.",
          "Choose Dictivo when the Local versus Cloud Fast boundary should be obvious to non-technical users.",
        ],
      },
      {
        kicker: "Search intent",
        title: "Superwhisper alternatives and super whisper alternative searches",
        paragraphs: [
          "Searchers use both Superwhisper alternative and Superwhisper alternatives, and some split the brand as super whisper alternative. The strongest intent behind those searches is usually price, workflow complexity, local model privacy, or whether the user needs a mode-heavy power-user setup.",
          "Dictivo fits the lower-complexity branch of that query. It is a paid local desktop dictation option for users who want a smaller one-time purchase, no Dictivo account for Local mode, and a clearer everyday Local versus Cloud Fast decision.",
        ],
        bullets: [
          "Use Dictivo when the user wants a simpler paid local dictation alternative.",
          "Use Superwhisper when the user wants mature modes, more model switching, and multi-platform Pro coverage.",
          "Use the Mac speech-to-text guide when the user is comparing broader voice-to-text app categories rather than one competitor.",
        ],
      },
      {
        kicker: "Privacy",
        title: "Privacy is a tie when both tools run local",
        paragraphs: [
          "For sensitive desktop dictation, the fair comparison is local mode against local mode. In that case, both products can keep audio on the machine. Superwhisper's model page says on-device models run locally and do not need internet. Dictivo Local is designed around the same basic privacy expectation.",
          "The difference is not whether Superwhisper can be private. It can. The difference is product shape. Superwhisper exposes a larger model and mode universe, including cloud options. Dictivo keeps the everyday decision simpler: use Local for private work, and use Cloud Fast only when you deliberately choose speed over local-only processing.",
        ],
        bullets: [
          "Use either product's local model path for sensitive speech.",
          "Do not treat cloud model polish as equivalent to offline dictation.",
          "Choose based on workflow complexity, price, and platform needs rather than invented privacy superiority.",
        ],
      },
      {
        kicker: "Pricing",
        title: "Cost over time: Dictivo Local vs Superwhisper Pro",
        paragraphs: [
          "Superwhisper's docs list Pro at $8.49/month, $84.99/year, or $249.99 once. Three years of annual Pro is $254.97. The lifetime license is $249.99. Monthly Pro for three full years would be $305.64.",
          "Dictivo Local is $29 once. If you keep optional update access active for years two and three, the three-year total is $97. That is less than half of Superwhisper lifetime and less than half of three years of Superwhisper annual Pro.",
          "The honest catch is that Superwhisper Pro includes more than a simple local desktop hotkey workflow. If you need the broader model catalog and mature mode system, the higher price has a rationale. If the purchase decision is mostly local dictation privacy and cost, Dictivo is easier to justify.",
        ],
        bullets: [
          "One year: Dictivo Local is $29 once; Superwhisper Pro annual is $84.99.",
          "Three years: Dictivo Local is $97 with optional update renewals; Superwhisper annual Pro is $254.97.",
          "Lifetime comparison: Dictivo Local is $29 for the version you buy; Superwhisper lifetime Pro is listed at $249.99.",
          "Best interpretation: Dictivo is a lower long-term-cost paid local dictation alternative, not the absolute cheapest app in the market.",
        ],
      },
      {
        kicker: "Decision",
        title: "Who should choose which",
        cards: [
          {
            title: "Choose Superwhisper if",
            items: [
              "You want the most mature mode ecosystem in this local-dictation category.",
              "You need Mac, Windows, iPhone, and iPad under one Pro license.",
              "You like switching among many local and cloud speech models.",
              "The $249.99 lifetime price is acceptable for a tool you will tune deeply.",
            ],
          },
          {
            title: "Choose Dictivo if",
            items: [
              "You want a cheaper Superwhisper alternative for local desktop dictation.",
              "You prefer a simpler local-first workflow with fewer model decisions.",
              "A $29 one-time license is a better match than a subscription or high lifetime price.",
              "You want no Dictivo account for Local dictation.",
            ],
          },
        ],
      },
    ],
    faqs: [
      ["What are the best Superwhisper alternatives?", "For local-capable Mac dictation, compare Dictivo Local, VoiceInk, Voice Type, Voibe, and MacWhisper depending on whether the job is live dictation or file transcription."],
      ["Is Dictivo a super whisper alternative?", "Yes, for users searching for a simpler paid local desktop dictation workflow. Dictivo is not a one-to-one replacement for Superwhisper's full mode ecosystem."],
      ["Is there a cheaper alternative to Superwhisper?", "Yes. Dictivo Local is $29 once. Superwhisper Pro is listed at $8.49/month, $84.99/year, or $249.99 lifetime."],
      ["Is Superwhisper a subscription?", "Superwhisper Pro has monthly and annual subscriptions, and it also offers a lifetime purchase. The plans include the same Pro features but differ by billing frequency."],
      ["Does Superwhisper work on Windows?", "Yes. Superwhisper's Pro documentation says one license works across Mac, Windows, iPhone, and iPad. Dictivo's public download is macOS today; Windows x64 remains in validation before public release."],
      ["Is Dictivo as accurate as Superwhisper?", "Both products can use Whisper-family local models, so raw accuracy depends on the model size, microphone, accent, and hardware. Dictivo's edge is not a magic model; it is the lower-cost local workflow and hardware-aware setup."],
      ["Can I try before buying?", "Dictivo's comparison CTA is a 14-day full Local trial with every local model unlocked. Superwhisper docs describe free local models and 15 minutes of Pro access for new users."],
    ],
    related: ["wispr-flow-alternative", "macwhisper-alternative"],
    sources: [
      "https://superwhisper.com/docs/get-started/sw-pro",
      "https://superwhisper.com/docs/getting-started",
      "https://superwhisper.com/models",
    ],
  },
  {
    slug: "macwhisper-alternative",
    competitor: "MacWhisper",
    title: "MacWhisper Alternative for Real-Time Dictation",
    metaDescription:
      "MacWhisper is great for transcribing files. If you want real-time, hold-a-hotkey dictation that pastes into any app, compare Dictivo.",
    h1: "MacWhisper alternative for real-time Mac dictation",
    eyebrow: "Compare alternatives",
    primaryKeyword: "macwhisper alternative",
    intro: [
      "MacWhisper is excellent for transcribing existing audio and video files, batch jobs, subtitles, YouTube links, and podcast-style workflows.",
      "Dictivo is the MacWhisper alternative for people who want to dictate into the active app in real time: press a hotkey, speak, and send the text where they were already working.",
    ],
    quickTake: [
      ["Best for", "Real-time hotkey dictation", "File and batch transcription"],
      ["3-year cost", "$97 with optional update renewals", "$29 once for Pro on the public site"],
      ["Workflow", "Replace typing in any app", "Transcribe audio/video files"],
    ],
    rows: [
      { label: "Processing location", dictivo: dictivoRows.processing, competitor: "On-device by default for local transcription; optional cloud/provider models are listed for some workflows." },
      { label: "Trains AI on your voice", dictivo: dictivoRows.trains, competitor: "No for local transcription; optional AI/cloud integrations have their own provider boundaries." },
      { label: "Works fully offline", dictivo: dictivoRows.offline, competitor: "Yes for local model transcription." },
      { label: "Account required", dictivo: dictivoRows.account, competitor: "No account for the core local Mac workflow." },
      { label: "Pricing model", dictivo: dictivoRows.pricing, competitor: "$29 once for MacWhisper Pro on the public site; the FAQ says the Gumroad price can vary." },
      { label: "Free tier / trial", dictivo: dictivoRows.trial, competitor: "Free download with Tiny, Base, and Small Whisper models." },
      { label: "Platforms", dictivo: dictivoRows.platforms, competitor: "macOS." },
      { label: "Privacy boundary", dictivo: dictivoRows.boundary, competitor: "Mac app focused on local file transcription, with optional integrations." },
    ],
    sections: [
      {
        kicker: "Where it wins",
        title: "What MacWhisper is great at",
        paragraphs: [
          "MacWhisper is one of the easiest tools to recommend for file transcription on Mac. Drop in a recording, choose a model, and turn long audio or video into text. The product page leads with that file-first workflow for a reason.",
          "For journalists, researchers, podcasters, students, and teams that already have recordings, MacWhisper may be the better tool. Its export formats, batch transcription, YouTube support, speaker recognition, and subtitle workflow are not side quests; they are the product.",
        ],
        bullets: [
          "Audio and video file transcription.",
          "Batch processing and subtitle/export workflows in Pro.",
          "Free local models for casual use.",
          "A low one-time Pro price on the current public site.",
        ],
      },
      {
        kicker: "Dictivo difference",
        title: "Where Dictivo is different",
        paragraphs: [
          "Dictivo is not trying to be a batch transcription workstation. It is built for the moment when your cursor is already in Mail, Linear, Slack, Notion, Xcode, Cursor, a browser field, or a support tool, and typing is the slow part.",
          "That changes the product details. Dictivo cares about the global hotkey, the active app, the transcript returning to your workflow, local history for recent dictations, and dictionary/snippet behavior that improves repeated phrases. The recording is not a file you manage later; it is a temporary input to get text into the place you were already working.",
          "MacWhisper's public feature list includes basic system-wide dictation, so it is not fair to say it has no dictation at all. The honest distinction is emphasis. MacWhisper is strongest when you bring it files. Dictivo is strongest when you use your voice instead of the keyboard.",
        ],
        bullets: [
          "Hold a hotkey and dictate into the current app.",
          "Local mode keeps everyday dictation on the device.",
          "Dictionary and snippets are built around repeated real-time writing.",
          "Hardware-aware local model setup reduces setup friction.",
        ],
      },
      {
        kicker: "Search intent",
        title: "MacWhisper alternative, Mac Whisper alternative, and whisper app alternatives",
        paragraphs: [
          "MacWhisper alternative and Mac Whisper alternative searches are usually about workflow, not just price. The user may want to know whether MacWhisper can replace typing in real time, or whether a dedicated dictation app is a better fit than a file transcription app.",
          "Broader searches such as whisper app alternative, whisper app alternatives, and whisper alternatives are less precise because they mix OpenAI Whisper technology, file transcription, live dictation, and unrelated brand meanings. Dictivo belongs in that set only when the user is looking for live Mac dictation rather than generic Whisper tools.",
        ],
        bullets: [
          "Use Dictivo when the desired workflow is live hotkey dictation into the active app.",
          "Use MacWhisper when the desired workflow is transcribing existing audio or video files.",
          "Use the Mac speech-to-text guide when the user is comparing broader speech-to-text or voice-to-text categories.",
        ],
      },
      {
        kicker: "Privacy",
        title: "Privacy: both can be local, but the workflow differs",
        paragraphs: [
          "MacWhisper's local transcription story is strong. Its site says audio does not leave your device by default, and the free tier includes local Whisper models. For file transcription, that is exactly the privacy boundary many users want.",
          "Dictivo makes the same local-processing bet for live dictation. The difference is not whether MacWhisper can be private; it can. The difference is where privacy is needed. If the sensitive material is a recorded interview, a lecture file, or a podcast episode, MacWhisper fits. If the sensitive material is what you are about to type into an email, case note, ticket, or prompt, Dictivo is aimed at that live moment.",
        ],
        bullets: [
          "Use MacWhisper when the input already exists as a file.",
          "Use Dictivo when the input is your live voice and the destination is the active app.",
          "Use either product's local model path when privacy matters.",
        ],
      },
      {
        kicker: "Pricing",
        title: "Pricing compared",
        paragraphs: [
          "MacWhisper's public site lists MacWhisper Pro at $29 once, while also noting in its FAQ that the Gumroad price can vary. The free version includes Tiny, Base, and Small Whisper models.",
          "Dictivo is not cheaper if all you need is MacWhisper's current Pro file-transcription feature set. Dictivo Local is $29 once, and $97 over three years if you keep optional update renewals active. The value case depends on workflow, not price.",
          "Buy MacWhisper if your main job is transcribing recordings. Buy Dictivo if your main job is replacing typing with private hotkey dictation into the apps where you already work.",
        ],
      },
      {
        kicker: "Decision",
        title: "Who should choose which",
        cards: [
          {
            title: "Choose MacWhisper if",
            items: [
              "You transcribe existing audio or video files.",
              "You need subtitles, exports, speaker recognition, or batch workflows.",
              "The low one-time Pro price is enough for your use case.",
              "You do not need a dedicated hotkey-first writing surface.",
            ],
          },
          {
            title: "Choose Dictivo if",
            items: [
              "You want a MacWhisper alternative for real-time dictation.",
              "You want to dictate into any app instead of managing audio files.",
              "You care about local history, dictionary terms, snippets, and active-app workflow.",
              "You want a full 14-day trial of every local model before buying.",
            ],
          },
        ],
      },
    ],
    faqs: [
      ["What are the best MacWhisper alternatives?", "For live dictation into the active Mac app, compare Dictivo Local, Superwhisper, VoiceInk, Voice Type, and Voibe. For file transcription, MacWhisper may remain the better fit."],
      ["Is Dictivo a Whisper app alternative?", "Yes, if the user means a Whisper-based or Whisper-style Mac dictation app for live voice typing. It is not a generic alternative for every Whisper transcription workflow."],
      ["Does MacWhisper do real-time dictation?", "MacWhisper lists basic system-wide dictation among its features, but its strongest and most visible workflow is file transcription. Dictivo is built around real-time hotkey dictation into the active app."],
      ["What is the best app to dictate into any app on Mac?", "If your goal is live voice typing into the current app, Dictivo is designed for that workflow: press the hotkey, speak, and return text to the active field."],
      ["MacWhisper vs dictation apps: what is the difference?", "MacWhisper is primarily a transcription app for recordings. A dictation app like Dictivo is built to replace typing in real time, with local history, dictionary terms, snippets, and global shortcuts."],
      ["Is Dictivo a one-time purchase like MacWhisper?", "Yes. Dictivo Local is $29 once with 12 months of updates, then an optional $24/year update renewal. The version you buy remains usable."],
      ["Can Dictivo transcribe files too?", "Dictivo is focused on live dictation, not batch file transcription. If file transcription is the main job, MacWhisper may be the better choice."],
    ],
    related: ["superwhisper-alternative", "voiceink-alternative"],
    sources: [
      "https://www.macwhisper.net/",
    ],
  },
  {
    slug: "voiceink-alternative",
    competitor: "VoiceInk",
    title: "VoiceInk Alternative: Polished Local Dictation",
    metaDescription:
      "Compare VoiceInk and Dictivo for local Mac dictation. VoiceInk is cheaper; Dictivo focuses on polished UX, hardware-aware setup, and support.",
    h1: "VoiceInk alternative: polished local dictation with a simpler support path",
    eyebrow: "Compare alternatives",
    primaryKeyword: "voiceink alternative",
    intro: [
      "VoiceInk is a strong choice if you want a low-cost indie Mac dictation app, local transcription, and the lowest paid lifetime price in this comparison set.",
      "Dictivo is the VoiceInk alternative for users who will pay a little more for a calmer commercial UX, hardware-aware model setup, a no-account Local path, and direct indie support.",
    ],
    quickTake: [
      ["Best for", "Polished commercial local workflow", "Lowest-cost indie Mac dictation"],
      ["3-year cost", "$29 to $97 depending on update renewals", "$25, $39, or $49 lifetime tiers"],
      ["Privacy model", "Local mode first", "Local processing with optional cloud enhancement"],
    ],
    rows: [
      { label: "Processing location", dictivo: dictivoRows.processing, competitor: "Local by default; optional cloud services can be used with user-provided providers." },
      { label: "Trains AI on your voice", dictivo: dictivoRows.trains, competitor: "No for local transcription. Optional cloud enhancement has separate provider boundaries." },
      { label: "Works fully offline", dictivo: dictivoRows.offline, competitor: "Yes for local transcription." },
      { label: "Account required", dictivo: dictivoRows.account, competitor: "Paid licenses are device-limited; local use is Mac app based." },
      { label: "Pricing model", dictivo: dictivoRows.pricing, competitor: "$25 lifetime for Solo, $39 lifetime for Personal, or $49 lifetime for Extended." },
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
          "Its current pricing is aggressive: $25 lifetime for one Mac, $39 lifetime for two Macs, and $29 lifetime for three Macs. The site also lists lifetime updates and a 14-day money-back guarantee. For many users, that is enough.",
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
          "Dictivo does not beat VoiceInk by being cheaper. It is not cheaper. Dictivo Local is $29 once for the first year of updates, with optional $24/year update renewal after that. VoiceInk's Solo and Personal tiers cost less.",
          "Dictivo's argument is polish and predictability. The app is shaped around a guided local setup, hardware-aware model selection, a clear Local versus Cloud Fast boundary, local history, dictionary terms, snippets, and a commercial support channel. It is for people who would rather pay a little more than tinker when dictation becomes part of daily work.",
          "Dictivo's privacy promise is the product workflow: Local mode keeps microphone audio, transcripts, history, dictionary terms, snippets, and settings on the customer's device, with no Dictivo account required for Local dictation.",
        ],
        bullets: [
          "More guided Local setup for non-tinkerers.",
          "Hardware-aware model tier recommendations.",
          "Clearer separation between private Local mode and optional Cloud Fast.",
          "Commercial support and update cadence around a paid product.",
        ],
      },
      {
        kicker: "Privacy",
        title: "Privacy: local processing without pretending price is the only factor",
        paragraphs: [
          "Both VoiceInk and Dictivo can keep dictation local. VoiceInk's site says processing is offline and that voice data stays on the Mac. Dictivo Local follows the same local-first expectation.",
          "The difference is how much product structure you want around that private workflow. VoiceInk appeals to users who prioritize the lowest lifetime pricing. Dictivo appeals to users who want a more packaged commercial app, a support channel, and a sharper distinction between local work and optional cloud speed.",
        ],
        bullets: [
          "Use VoiceInk if you want the lowest-cost local Mac dictation path.",
          "Use Dictivo if you want a more polished commercial product around local dictation.",
          "Do not buy Dictivo because someone told you VoiceInk is unsafe. That is not the argument.",
        ],
      },
      {
        kicker: "Pricing",
        title: "Pricing compared",
        paragraphs: [
          "VoiceInk lists $25 lifetime for Solo, $39 lifetime for Personal, and $29 lifetime for Extended. Those tiers differ by device count, not by core feature access. The page also advertises a Try Free path and 14-day money-back guarantee.",
          "Dictivo Local is $29 once. If you keep optional update renewals active for years two and three, the three-year total is $97. Without renewals, it is a $29 purchase for the version you bought.",
          "VoiceInk is the lower-price option. Dictivo is the option for users who value a more controlled onboarding experience, hardware-aware model setup, and a direct paid-product support relationship.",
        ],
      },
      {
        kicker: "Decision",
        title: "Who should choose which",
        cards: [
          {
            title: "Choose VoiceInk if",
            items: [
              "You want the lowest price for local Mac dictation.",
              "You prefer the lowest-cost indie option.",
              "You are comfortable with Apple Silicon and macOS 14.4 or later requirements.",
              "You like smaller tools and can tolerate a rough edge if the price is right.",
            ],
          },
          {
            title: "Choose Dictivo if",
            items: [
              "You want a VoiceInk alternative with more commercial polish.",
              "You care about guided setup and hardware-aware local model tiers.",
              "You want no Dictivo account for Local dictation.",
              "You are willing to pay more for support, update discipline, and a clearer product boundary.",
            ],
          },
        ],
      },
    ],
    faqs: [
      ["Is VoiceInk really free?", "VoiceInk's site has a Try Free path and paid lifetime tiers. The listed paid tiers are $25, $39, and $29."],
      ["VoiceInk vs Dictivo: which is more accurate?", "Both use local AI speech models, so accuracy depends on the model, microphone, accent, and hardware. Dictivo's advantage is a polished local workflow and hardware-aware setup."],
      ["How does Dictivo protect local work?", "Use Local mode for private dictation. Audio, transcripts, history, dictionary terms, snippets, and settings stay on the customer's device."],
      ["Does VoiceInk run on Windows?", "VoiceInk's official site lists Apple Silicon Macs and macOS 14.4 or later. Dictivo's public download is macOS today; Windows x64 remains in validation before public release."],
      ["Which app is more polished?", "That is subjective. VoiceInk is strong for price. Dictivo is built as a more packaged paid product with guided setup, Local versus Cloud Fast separation, and support expectations."],
    ],
    related: ["superwhisper-alternative", "macwhisper-alternative"],
    sources: [
      "https://tryvoiceink.com/",
      "https://apps.apple.com/us/app/voiceink-ai-dictation/id6751431158?platform=mac",
    ],
  },
  {
    slug: "macos-dictation-alternative",
    competitor: "macOS Dictation",
    title: "A macOS Dictation Alternative with Whisper Accuracy",
    metaDescription:
      "Need a macOS Dictation alternative? Dictivo adds Whisper-grade local dictation, history, dictionary, snippets, and a private local workflow.",
    h1: "A macOS Dictation alternative with Whisper-grade local accuracy",
    eyebrow: "Compare alternatives",
    primaryKeyword: "macos dictation alternative",
    intro: [
      "macOS Dictation is free, already installed, and good enough for quick sentences. If that is all you need, you should use it.",
      "Dictivo is the macOS Dictation alternative for people who dictate seriously and want stronger local models, local history, dictionary terms, snippets, and consistent hotkey behavior across daily writing apps.",
    ],
    quickTake: [
      ["Best for", "Daily private Mac dictation", "Free occasional dictation"],
      ["3-year cost", "$29 to $97 depending on update renewals", "Free with macOS"],
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
          "Dictivo Local uses stronger local transcription models for daily writing. The app guides setup based on hardware, then keeps transcripts, dictionary terms, snippets, and local settings on the device. That creates a repeatable workflow for people who dictate long emails, support replies, notes, prompts, documentation, or first drafts every day.",
          "The productivity layer matters as much as the model. Built-in dictation gives you text. Dictivo gives you a workbench around that text: history when a paste fails, dictionary terms for names and jargon, snippets for repeated phrasing, and a clear Local versus Cloud Fast mode boundary.",
        ],
        bullets: [
          "Whisper-grade local model path for higher-accuracy dictation.",
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
          "There is no price battle with Apple. macOS Dictation is included with your Mac. Dictivo Local is $29 once, with an optional $24/year update renewal after the first 12 months. Three years with update renewals active is $97.",
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
      ["Is there a more accurate dictation app for Mac?", "Dictivo uses stronger local transcription models. For many users, larger local models are more accurate than built-in dictation, especially for longer text, jargon, names, and mixed phrasing."],
      ["Does macOS Dictation work offline?", "Apple says Keyboard settings can indicate whether an internet connection is needed. Offline availability depends on the device, language, and current system behavior."],
      ["What is the best offline dictation app for Mac?", "If you want a paid, local-first workflow with hotkey dictation, local history, dictionary terms, snippets, and a clear privacy boundary, Dictivo is built for that job."],
      ["Is Dictivo free?", "Dictivo has a tiny free local tier and a 14-day full Local trial with every local model unlocked. Dictivo Local is $29 once if you decide to buy."],
    ],
    related: ["wispr-flow-alternative", "voiceink-alternative"],
    sources: [
      "https://support.apple.com/en-gb/guide/mac-help/mh40584/26/mac/26",
      "https://www.apple.com/legal/privacy/data/en/ask-siri-dictation/",
      "https://www.apple.com/privacy/features/",
    ],
  },
];

export const COMPARE_HUB = {
  path: "/compare",
  title: "Compare Dictivo Alternatives",
  metaTitle: "Dictivo Comparisons: Local Desktop Dictation Alternatives",
  metaDescription:
    "Compare Dictivo with Wispr Flow, Superwhisper, MacWhisper, VoiceInk, and macOS Dictation across privacy, pricing, and workflow.",
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
