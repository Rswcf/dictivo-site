import { guideLocalPrice } from "./local-offer-copy.mjs";

// Dictate into Claude Code and Cursor on a Mac (Batch B1 answer page, English only).
// The Claude Code and Cursor cells come only from their own documentation pages, read on
// CLAUDE_CODE_GUIDE_CHECKED and listed under Evidence links; where a page says nothing, the cell
// says "Not stated". macOS Dictation and Superwhisper come from the competitor facts file of the
// same date in the desktop repository (Apple's and Superwhisper's own pages). Dictivo's paste,
// shortcuts and permissions come from the app source (settingsStore.ts, clipboard.rs,
// displayLanguage.ts, SettingsView.tsx). No hands-on test was run; the method note says so.
export const CLAUDE_CODE_GUIDE_LASTMOD = "2026-11-10";
export const CLAUDE_CODE_GUIDE_CHECKED = "2026-11-10";

const checkedLabel = `(checked ${CLAUDE_CODE_GUIDE_CHECKED})`;

export const CLAUDE_CODE_GUIDE_REFERENCES = [
  [`Claude Code documentation: Voice dictation ${checkedLabel}`, "https://code.claude.com/docs/en/voice-dictation"],
  [`Cursor documentation: Voice chat and dictation ${checkedLabel}`, "https://cursor.com/docs/agent/voice-chat"],
  [`Apple: Use Dictation on Mac ${checkedLabel}`, "https://support.apple.com/en-us/guide/mac-help/mh40584/26/mac"],
  [`Apple: Use Dictation on Mac, macOS 14 guide ${checkedLabel}`, "https://support.apple.com/en-us/guide/mac-help/mh40584/14.0/mac/14.0"],
  [`Superwhisper plans ${checkedLabel}`, "https://superwhisper.com/docs/billing/plans"],
  [`Superwhisper homepage ${checkedLabel}`, "https://superwhisper.com/"],
  ["Dictivo Homebrew tap", "https://github.com/deepviewsdev/homebrew-tap"],
  ["Dictivo audio path", "https://dictivo.app/privacy/where-dictation-audio-goes/"],
];

const formatDate = (isoDate) =>
  new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${isoDate}T00:00:00Z`));

export const CLAUDE_CODE_GUIDE_HEADERS = [
  "Option",
  "Works in a terminal (Claude Code)?",
  "Works in Cursor's chat and editor?",
  "Speech processed on the Mac?",
  "Account or sign-in needed?",
  "Price",
  "Checked",
];

// [Option, terminal, Cursor, speech on the Mac, account, price]. The generator adds the "Checked"
// cell. The ItemList description is the "Speech processed on the Mac?" cell.
function factRows() {
  return [
    [
      "Claude Code built-in voice",
      "Yes. Run /voice in the Claude Code CLI, then hold Space to talk, or use tap mode. Not in SSH or cloud sessions.",
      "Not stated",
      "No. Audio streams to Anthropic's servers for transcription.",
      "Yes. A Claude.ai account sign-in; not available with an API key.",
      "Not stated. Transcription uses no Claude messages or tokens.",
    ],
    [
      "Cursor built-in voice",
      "Not stated",
      "Chat: yes. The microphone button dictates into the chat input, and Cmd+Shift+Space toggles it in the IDE. Editor: not stated.",
      "Not stated for dictation.",
      "Not stated for dictation. Voice chat, a separate spoken conversation, needs a signed-in Cursor account.",
      "Not stated",
    ],
    [
      "macOS Dictation",
      "Yes. Apple says you can dictate wherever you can type text.",
      "Yes. Apple says you can dictate wherever you can type text.",
      "On Apple silicon, yes for supported languages, except in search boxes. Intel Macs and other languages send speech to Apple.",
      "Not stated",
      "Included with macOS",
    ],
    [
      "Superwhisper",
      "Yes. The vendor names Claude Code among the tools it works with.",
      "Yes. The vendor names Cursor among the tools it works with.",
      "Free plan: yes, with local models. Pro adds cloud voice models; the default mode is not stated.",
      "Not stated. The license key comes by email.",
      "Free; Pro $8.49 a month or $84.99 a year; Lifetime $249.99 once",
    ],
    [
      "Dictivo (this site's product)",
      "Yes. Pastes the transcript with Cmd+V into the frontmost app, such as Terminal, iTerm2 or Warp.",
      "Yes. Pastes the same way into the field where your cursor is.",
      "Yes, in Local mode, after the model download.",
      "No account for Dictivo Local. A license key from the purchase email activates it.",
      guideLocalPrice("en"),
    ],
  ];
}

export function claudeCodeGuideCopy({ windows, checked = CLAUDE_CODE_GUIDE_CHECKED, lastmod = CLAUDE_CODE_GUIDE_LASTMOD } = {}) {
  const checkedOn = formatDate(checked);
  return {
    navLabel: "Dictate into Claude Code and Cursor",
    metaTitle: "Dictate Into Claude Code and Cursor on a Mac (Setup Guide)",
    metaDescription: "How to speak prompts into Claude Code and Cursor on a Mac: their built-in voice features, macOS Dictation, and an offline app that pastes into the terminal.",
    title: "How to dictate prompts into Claude Code and Cursor on a Mac",
    lede: "Dictivo is this site's product, and this guide includes it. The guide shows how to speak prompts into Claude Code in a terminal and into Cursor's chat on a Mac, what each option needs, and where your speech is processed.",
    lastmod,
    checked,
    answerTitle: "Short answer",
    answer: `Three ways work on a Mac: the built-in voice features of Claude Code and Cursor, macOS Dictation, or a dictation app that pastes into any app. Dictivo, this site's product, pastes with Cmd+V into the frontmost app and processes speech on the Mac in Local mode. Its default shortcut, Cmd+Shift+Space, matches the Cursor IDE's dictation shortcut, so change one. Checked on ${checkedOn}.`,
    intentTitle: "Which voice question are you asking?",
    intentCaption: "Common ways people ask about voice input for Claude Code and Cursor, and what to check for each",
    intentHeaders: ["How people ask", "What they need", "What to check"],
    intentRows: [
      [
        "dictate into Claude Code",
        "Speak a prompt into the Claude Code CLI in a terminal.",
        "Whether the option works in a terminal and where your speech is processed.",
      ],
      [
        "voice to text for Cursor on Mac",
        "Speak into Cursor's agent chat instead of typing.",
        "Cursor's own dictation shortcut, and whether another app uses the same keys.",
      ],
      [
        "Claude Code voice dictation offline",
        "Dictate prompts without sending audio to a server.",
        "Claude Code's /voice sends audio to Anthropic. A local dictation app keeps speech on the Mac.",
      ],
      [
        "talk to the Cursor agent instead of typing",
        "Give the agent instructions by voice.",
        "Dictation puts text in the chat input. You still review the prompt and send it.",
      ],
      [
        "dictation app for coding on a Mac",
        "One shortcut that works in the terminal, the editor and every other app.",
        "How the app gets text into the prompt, which macOS permissions it needs, and its shortcut.",
      ],
    ],
    factTable: {
      title: "Ways to dictate into Claude Code and Cursor compared",
      caption: "Voice options for Claude Code and Cursor on a Mac, with check dates",
      headers: CLAUDE_CODE_GUIDE_HEADERS,
      rows: factRows(),
    },
    itemListName: "Ways to dictate into Claude Code and Cursor on a Mac",
    methodTitle: "How this page was checked",
    method: [
      `We read the Claude Code and Cursor documentation pages on ${checkedOn}. Their cells say only what those pages state. Where a page says nothing, the cell says Not stated.`,
      "The macOS Dictation and Superwhisper cells come from Apple's and Superwhisper's own pages, read on the same date. Prices are shown as the vendor shows them.",
      "Dictivo's paste behavior, shortcuts and permissions come from the Dictivo app's source code and settings.",
      "These facts come from documentation and source code, not from a hands-on test. This page measures no timing and no recognition quality.",
    ],
    methodSignature: `Dictivo team, ${checkedOn}.`,
    sections: [
      {
        title: "The built-in options: Claude Code voice and Cursor voice",
        paragraphs: [
          "Claude Code has voice dictation in its command-line tool. Run /voice to turn it on. By default, you hold Space while you speak and release it to stop. Run /voice tap to tap once to start and tap again to send. You can change the key in Claude Code's keybindings.",
          "Claude Code's documentation says that it streams the recorded audio to Anthropic's servers for transcription. The audio is not processed locally. Dictation needs a sign-in with a Claude.ai account, and it is not available with an API key. It needs a local microphone, so it does not work in SSH or cloud sessions. On a Mac, your terminal app needs microphone permission.",
          "In Cursor, the microphone button next to the voice chat button turns speech into text in the chat input. You review the prompt and send it yourself. In the Cursor IDE, Cmd+Shift+Space toggles dictation. In the Agents Window, you hold Ctrl+M to talk. Cursor's documentation does not say where dictation audio is processed.",
          "Cursor also has voice chat, a separate spoken conversation with the agent. Voice chat needs a signed-in Cursor account.",
        ],
      },
      {
        title: "macOS Dictation in a terminal or editor",
        paragraphs: [
          "macOS Dictation is built into the Mac. Apple says you can dictate wherever you can type text. That includes a terminal prompt and Cursor's chat input.",
          "On a Mac with Apple silicon, Dictation is processed on the Mac for supported languages, but not when you dictate into a search box. On an Intel-based Mac, or for an unsupported language, your speech is sent to Apple.",
          "To start Dictation, press the Microphone key. You can also set a Dictation shortcut in Keyboard settings, for example pressing Fn twice.",
        ],
        link: { href: "/guides/mac-dictation-shortcut/", label: "Find or change the macOS Dictation shortcut" },
      },
      {
        title: "A dictation app that pastes into any app",
        paragraphs: [
          "A system-wide dictation app works the same way in Terminal, iTerm2, Warp, Cursor and every other app. It does not depend on the tool you dictate into. Dictivo is one of these apps.",
          "Press Cmd+Shift+Space to start recording, and press it again to stop. This is the Toggle setting. In Settings › Hotkeys, you can switch Dictation activation to Press and hold. Dictivo then copies the transcript to the clipboard and sends Cmd+V to the frontmost app, so the text lands where your cursor is. Cmd+Shift+V (Paste Last) pastes the last transcript again.",
          "macOS asks for three permissions. Each one has one job:",
        ],
        bullets: [
          "Microphone (required): records dictation audio.",
          "Accessibility (recommended): lets Dictivo control paste behavior and keeps global dictation shortcuts reliable.",
          "Automation, shown in Dictivo as Auto paste (optional): lets Dictivo send the Cmd+V keystroke. Without it, the transcript stays available in Dictivo and on the clipboard, and you paste it yourself.",
        ],
      },
      {
        title: "Set up Dictivo for Claude Code and Cursor",
        paragraphs: ["These steps take you from the install to a first spoken prompt."],
        steps: [
          "Download Dictivo with the download button on this page, then open the app.",
          { html: "Or install it with Homebrew in Terminal: <code>brew install --cask deepviewsdev/tap/dictivo</code>. Homebrew installs the same signed and notarized app as the download button. Dictivo then updates itself." },
          "Set up Local and download a model.",
          "Grant Microphone, Accessibility and Automation when macOS asks.",
          "Open Terminal or Cursor, and click where the prompt goes.",
          "Press Cmd+Shift+Space, speak your prompt, then press Cmd+Shift+Space again.",
          "Check the pasted text, then press Return yourself. Dictivo does not send the prompt.",
          "In the Cursor IDE, Cmd+Shift+Space also toggles Cursor's own dictation. Choose a different key combination for Dictivo in Settings › Hotkeys › Dictation.",
        ],
      },
      {
        title: "Keep prompts on your Mac — up to the point you send them",
        paragraphs: [
          "In Local mode, Dictivo transcribes on the Mac after the model download. Dictivo does not send Local dictation audio to a transcription server.",
          "The pasted prompt is ordinary text. When you send it, Claude Code or Cursor sends it to its AI service, as it does with a typed prompt.",
          "Cloud Fast is a separate, optional online mode. It uploads the selected recording for remote transcription. Updates, license checks and optional Cloud Fast use the network.",
        ],
        link: { href: "/privacy/where-dictation-audio-goes/", label: "Where Dictivo dictation audio goes" },
      },
      {
        title: "When Dictivo is not the right tool",
        paragraphs: [
          "Dictivo has no mobile app. Dictivo is for live dictation and does not import recorded files.",
          "If you dictate only now and then, and only in one tool, its built-in voice feature may be enough. Claude Code's /voice and Cursor's microphone button need no extra app.",
          "If you also need to transcribe recordings, compare file transcription apps first.",
        ],
        link: { href: "/guides/best-speech-to-text-apps-for-mac/", label: "Compare speech-to-text apps for Mac" },
      },
    ],
    faqTitle: "Questions about dictating into Claude Code and Cursor",
    faqs: [
      [
        "Does Claude Code have built-in voice dictation?",
        "Yes. Run /voice in the Claude Code CLI, then hold Space to talk, or use tap mode. Its documentation says audio streams to Anthropic's servers for transcription, and you must sign in with a Claude.ai account. It does not work in SSH or cloud sessions.",
      ],
      [
        "Does Cursor have voice input?",
        "Yes. The microphone button next to the voice chat button turns speech into text in the chat input. In the Cursor IDE, Cmd+Shift+Space toggles dictation. In the Agents Window, you hold Ctrl+M. Cursor's documentation does not say where dictation audio is processed.",
      ],
      [
        "Can I dictate into the terminal with Dictivo?",
        "Yes. Dictivo pastes the transcript with Cmd+V into the frontmost app, including Terminal, iTerm2 and Warp. Click in the terminal window, press Cmd+Shift+Space, speak, and press it again. Check the text, then press Return yourself.",
      ],
      [
        "Does Dictivo's shortcut clash with Cursor's?",
        "In the Cursor IDE, yes. Cursor's documentation lists Cmd+Shift+Space for its dictation, and Cmd+Shift+Space is also Dictivo's default. Choose a different key combination for Dictivo in Settings › Hotkeys › Dictation. Claude Code's default voice key is Space, so it does not clash.",
      ],
      [
        "Does my speech leave the Mac?",
        "With Dictivo Local, no. Dictivo transcribes on the Mac after the model download. The prompt text you send still goes to the AI service behind Claude Code or Cursor. Claude Code's /voice sends audio to Anthropic for transcription, and Dictivo's optional Cloud Fast mode uploads the selected recording.",
      ],
      [
        "Do I need an account to dictate into Claude Code with Dictivo?",
        "No. Dictivo Local needs no Dictivo account. A license key from the purchase email activates it, and the 14-day trial needs no card. You still sign in to Claude Code as usual. Only Claude Code's own /voice feature needs a Claude.ai account.",
      ],
      [
        "Can I install Dictivo with Homebrew?",
        "Yes. Run brew install --cask deepviewsdev/tap/dictivo in Terminal. It installs the same signed and notarized app as the download button. Dictivo updates itself, and brew upgrade --cask dictivo also works.",
      ],
    ],
    relatedTitle: "Related Dictivo pages",
    relatedRows: [
      [
        "Offline dictation on Mac",
        "Compare Mac dictation apps that keep audio on the device.",
        "https://dictivo.app/guides/offline-dictation-on-mac/",
      ],
      [
        "Best speech-to-text apps for Mac",
        "Compare Mac dictation and transcription apps by workflow.",
        "https://dictivo.app/guides/best-speech-to-text-apps-for-mac/",
      ],
      [
        "Mac dictation apps with no subscription",
        "Compare Mac dictation apps you can buy once.",
        "https://dictivo.app/guides/mac-dictation-app-no-subscription/",
      ],
      [
        "Dictation apps for Mac and Windows with a one-time license",
        "Compare apps where one purchase covers both desktop platforms.",
        "https://dictivo.app/guides/dictation-app-mac-windows-one-time-license/",
      ],
      [
        "First local dictation",
        "Install a model, practice a first dictation, and fix common setup problems.",
        "https://dictivo.app/guides/first-local-dictation/",
      ],
      [
        "Mac dictation shortcut",
        "Find, change or fix the built-in macOS Dictation shortcut.",
        "https://dictivo.app/guides/mac-dictation-shortcut/",
      ],
      [
        "Where dictation audio goes",
        "See what Local and Cloud Fast send, and when.",
        "https://dictivo.app/privacy/where-dictation-audio-goes/",
      ],
    ],
    referencesTitle: "Evidence links",
  };
}
