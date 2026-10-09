// English guide for built-in macOS Dictation that does not work. Every statement in the symptom
// sections must be backed by one of the references below (read on MAC_DICTATION_GUIDES_CHECKED)
// or by `fieldTest`, which holds results from an actual Mac and stays null until those results
// exist. Dictivo appears only in the closing section, disclosed as this site's product.
export const MAC_DICTATION_NOT_WORKING_LASTMOD = "2026-10-09";

// The day the Apple and Google help pages below were read for both Mac dictation guides.
export const MAC_DICTATION_GUIDES_CHECKED = "2026-10-09";

const checked = `(checked ${MAC_DICTATION_GUIDES_CHECKED})`;
const checkedOn = new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${MAC_DICTATION_GUIDES_CHECKED}T00:00:00Z`));

export const APPLE_DICTATION_HELP = {
  dictate: "https://support.apple.com/guide/mac-help/mh40584/mac",
  troubleshoot: "https://support.apple.com/guide/mac-help/mchlc480652b/mac",
  commands: "https://support.apple.com/guide/mac-help/mh40695/mac",
  voiceControl: "https://support.apple.com/guide/mac-help/mh40719/mac",
  soundInput: "https://support.apple.com/guide/mac-help/mchlp2567/mac",
  microphoneAccess: "https://support.apple.com/guide/mac-help/mchla1b1e1fe/mac",
  featureAvailability: "https://www.apple.com/macos/feature-availability/#dictation",
};

export const MAC_DICTATION_NOT_WORKING_REFERENCES = [
  [`Apple Support: Dictate messages and documents on Mac ${checked}`, APPLE_DICTATION_HELP.dictate],
  [`Apple Support: If Dictation on Mac doesn't work as expected ${checked}`, APPLE_DICTATION_HELP.troubleshoot],
  [`Apple Support: Commands for dictating text on Mac ${checked}`, APPLE_DICTATION_HELP.commands],
  [`Apple Support: Use Voice Control commands to interact with your Mac ${checked}`, APPLE_DICTATION_HELP.voiceControl],
  [`Apple Support: Change the sound input settings on Mac ${checked}`, APPLE_DICTATION_HELP.soundInput],
  [`Apple Support: Control access to the microphone on Mac ${checked}`, APPLE_DICTATION_HELP.microphoneAccess],
  [`Apple: macOS Feature Availability, Dictation ${checked}`, APPLE_DICTATION_HELP.featureAvailability],
  [`Google Docs Editors Help: Type & edit with your voice ${checked}`, "https://support.google.com/docs/answer/4492226?hl=en"],
];

// Dictivo's default shortcut, naming Windows only while Windows downloads are public.
export function dictivoShortcutDefault(windows) {
  return windows ? "Cmd+Shift+Space on Mac and Ctrl+Shift+Space on Windows" : "Cmd+Shift+Space on Mac";
}

export function macDictationNotWorkingCopy({ windows }) {
  return {
    navLabel: "Mac dictation not working",
    metaTitle: "Mac Dictation Not Working? What to Check, by Symptom",
    metaDescription:
      "Built-in Mac dictation not starting, stopping early or typing the wrong language? Check these settings in the order Apple documents them, symptom by symptom.",
    eyebrow: "Mac dictation guide",
    title: "Mac dictation not working: what to check, by symptom",
    lede:
      "Built-in macOS Dictation can fail quietly: the microphone icon appears and nothing is typed, the shortcut does nothing, or it stops mid-sentence. This page lists what to check for each symptom, in the order Apple's own support documents give, with the exact setting names.",
    environmentLabel: "Based on",
    environment: `Apple's English support documents for macOS Tahoe 26 and macOS 27, read on ${checkedOn}. No on-device test is claimed on this page.`,
    answerTitle: "Check these three things first",
    answer:
      "Open System Settings, click Keyboard, and check three things under Dictation: that Dictation is on, that Microphone source is the microphone you are actually speaking into, and that the Shortcut is one you are pressing. Then open System Settings > Accessibility > Voice Control: while Voice Control is on, standard macOS Dictation is not available, so turn it off to use Dictation.",
    quickReference: {
      title: "Quick reference",
      caption: `Mac dictation symptoms and the first setting to check, from Apple's support documents (checked on ${checkedOn}).`,
      headers: ["Symptom", "First thing to check", "Where"],
      rows: [
        ["The microphone icon appears but nothing is typed", "Which microphone Dictation listens to", "Keyboard > Dictation > Microphone source"],
        ["Pressing the shortcut does nothing", "That Dictation is on, then which shortcut is set", "Keyboard > Dictation > Shortcut"],
        ["The microphone key opens Siri", "Press and release the key instead of holding it", "Microphone key, in the row of function keys"],
        ["Dictation stops while you are still speaking", "Whether it stopped after 30 seconds without speech", "The text below Dictation in Keyboard settings"],
        ["Punctuation or line breaks do not appear", "Auto-punctuation, and the spoken commands", "Keyboard > Dictation > Auto-punctuation"],
        ["It types the wrong language", "The languages Dictation listens for", "Keyboard > Dictation > Languages > Edit"],
        ["It works in some apps but not in others", "Whether it works in Notes or TextEdit", "The app you are dictating into"],
        ["It starts by itself, or you want it off", "A shortcut you will not press by accident", "Keyboard > Dictation > Shortcut"],
        ["It still does not work", "Turn Dictation off and on, then restart", "Keyboard > Dictation"],
      ],
    },
    tocLabel: "Find your symptom",
    sections: [
      {
        kicker: "Symptom 1",
        title: "The microphone icon appears but nothing is typed",
        paragraphs: [
          "When the cursor is highlighted and pulsing, or you hear the tone that signals your Mac is ready, Dictation has started. Check whether your voice reaches the microphone it listens to, and whether it expects the language you speak.",
        ],
        steps: [
          "Open System Settings > Keyboard, go to Dictation, and choose a microphone next to Microphone source. With Automatic, your Mac listens to the device you are most likely to use; if that does not respond, choose the built-in microphone or your headset directly.",
          "Open System Settings > Sound, click Input, and select the same microphone. If your Mac is not responding to your voice, drag the input volume slider up.",
          "In Keyboard > Dictation, click Edit next to Languages and check that the language and region you speak are selected.",
          "If your Mac has no built-in microphone, check that an external microphone is connected and selected in Sound or Keyboard settings.",
          "Keep the microphone uncovered by clothing or your hand, speak at a normal distance and volume, and reduce background noise; in a noisy or echoing room, a headset microphone may help.",
        ],
      },
      {
        kicker: "Symptom 2",
        title: "Pressing the shortcut does nothing",
        steps: [
          "Open System Settings > Keyboard and check that Dictation is turned on. The first time you turn it on, click Enable.",
          "Click in a text field and choose Edit > Start Dictation. If that works, the shortcut is the problem, not Dictation. Some apps do not show this menu item.",
          "In Keyboard > Dictation, open the Shortcut pop-up menu and choose the shortcut again, or choose Customize and press the keys you want to use.",
          "If you use the Microphone key, press and release it. Holding it down activates Siri instead.",
          "Open System Settings > Accessibility > Voice Control and turn it off. While Voice Control is on, standard macOS Dictation is not available.",
          "If another app uses the same key combination, change the shortcut in one of the two.",
        ],
      },
      {
        kicker: "Symptom 3",
        title: "The microphone key opens Siri instead of Dictation",
        paragraphs: [
          "On Macs with a Microphone key in the row of function keys, pressing and releasing the key starts Dictation, and pressing and holding it activates Siri (when Siri is enabled). Press it briefly and let go.",
          "To start Dictation another way, choose a different shortcut in Keyboard > Dictation > Shortcut.",
        ],
      },
      {
        kicker: "Symptom 4",
        title: "Dictation stops while you are still speaking",
        paragraphs: [
          "Dictation has no length limit and no timeout, but it stops automatically when no speech is detected for 30 seconds. If you paused to think, start it again the same way. Pressing Escape, the Microphone key or the Dictation shortcut also ends it.",
          "Dictation may need an internet connection. The text below Dictation in System Settings > Keyboard (shown while Dictation is on) says whether your voice input is processed on your Mac or needs an internet connection; if it needs one, check System Settings > Network.",
        ],
      },
      {
        kicker: "Symptom 5",
        title: "Punctuation or line breaks do not appear",
        paragraphs: [
          "In supported languages, including English (United States) and English (United Kingdom), Dictation inserts commas, periods and question marks as you speak. If it does not, check that Auto-punctuation is on in System Settings > Keyboard > Dictation. Apple's macOS Feature Availability page lists the supported languages and regions; not every English region is on it.",
          "For a line break, say \"new line\" (like pressing Return once) or \"new paragraph\" (like pressing Return twice). Both appear when you finish dictating.",
          "For other punctuation, say its name, such as \"comma\", \"period\" or \"question mark\". These commands always work while you dictate; Apple's list also has formatting commands such as \"caps on\" and \"numeral\".",
        ],
        links: [
          ["Apple: Commands for dictating text on Mac", APPLE_DICTATION_HELP.commands],
          ["Apple: macOS Feature Availability", APPLE_DICTATION_HELP.featureAvailability],
        ],
      },
      {
        kicker: "Symptom 6",
        title: "It types the wrong language",
        steps: [
          "Open System Settings > Keyboard, go to Dictation, click Edit next to Languages, and select the language and region you speak. To remove a language, deselect it.",
          "If you set up more than one language, switch while you dictate by clicking the language shown next to the cursor, or press the Globe key (if your keyboard has one) and choose the language.",
        ],
      },
      {
        kicker: "Symptom 7",
        title: "It works in some apps but not in others",
        paragraphs: [
          "Try Dictation in Notes or TextEdit first. If it works there, the problem lies with the other app, not with Dictation. Before you start, click where you want the text to go.",
          "Google Docs has its own voice typing: open a document and choose Tools > Voice typing. Google says it works with the latest versions of Chrome, Edge and Safari, and that your computer's microphone needs to be on and working.",
          "Apps and websites that record audio themselves need permission to use the microphone. Open System Settings > Privacy & Security > Microphone and check that access is turned on for the app you are using.",
          "If an app such as Word or ChatGPT has its own dictation button, check that app's help.",
        ],
      },
      {
        kicker: "Symptom 8",
        title: "It starts by itself, or you want it off",
        paragraphs: [
          "If Dictation starts when you did not mean it to, pick a shortcut you will not press by accident in System Settings > Keyboard > Dictation > Shortcut, or choose Customize and press a combination such as Option-Z.",
          "If you do not use Dictation at all, turn it off in Keyboard settings.",
        ],
      },
      {
        kicker: "Last step",
        title: "If it still does not work",
        steps: [
          "Turn Dictation off in Keyboard settings, then turn it on again.",
          "Restart your Mac.",
          "Update macOS.",
          "Work through Apple's own checklist, then contact Apple Support if Dictation still does not respond.",
        ],
        links: [["Apple: If Dictation on Mac doesn't work as expected", APPLE_DICTATION_HELP.troubleshoot]],
      },
    ],
    fieldTest: null,
    dictivo: {
      kicker: "Another option",
      title: "If built-in Dictation does not fit",
      paragraphs: [
        `Dictivo is this site's product. It is a separate dictation app with its own shortcut, so it does not depend on the macOS Dictation settings above. Its default shortcut is ${dictivoShortcutDefault(windows)}: press it once to start recording and again to stop, or switch to hold-to-talk. In Local mode it transcribes the recording on your computer with a downloaded model, then pastes the text into the app you are using.`,
        "It cannot help if your Mac does not detect a microphone at all. And if built-in Dictation already does what you need, you do not need another app.",
      ],
      links: [
        ["Dictivo pricing", "/pricing/"],
        ["Try your first sentence with Dictivo", "/guides/first-local-dictation/"],
        ["Compare offline Mac dictation apps", "/guides/offline-dictation-on-mac/"],
      ],
    },
    faqTitle: "Mac dictation questions",
    faqs: [
      ["Where do I turn Dictation on?", "Choose Apple menu > System Settings, click Keyboard, go to Dictation and turn it on. The first time, click Enable."],
      ["Why does Dictation stop after a while?", "It stops when no speech is detected for 30 seconds. There is no limit on how long you can dictate."],
      [
        "Can I use Dictation and Voice Control at the same time?",
        "No. While Voice Control is on, you dictate with Voice Control and standard macOS Dictation is not available. To use Dictation, turn off Voice Control in System Settings > Accessibility > Voice Control.",
      ],
      [
        "Does Mac Dictation need an internet connection?",
        "It can. On-device dictation works only in the languages on Apple's macOS Feature Availability page, including English (United States) and English (United Kingdom), and needs a speech model download. The text below Dictation in Keyboard settings says which applies to your Mac.",
      ],
      [
        "How do I insert a line break or punctuation?",
        "Say \"new line\" or \"new paragraph\"; they appear when you finish dictating. Say punctuation by name, such as \"comma\" or \"question mark\". In supported languages, Auto-punctuation adds commas, periods and question marks for you.",
      ],
      ["Why does the microphone key open Siri?", "Holding the Microphone key activates Siri, when Siri is enabled. Press and release the key to start Dictation."],
      [
        "Does Dictation work in Google Docs?",
        "Yes: macOS Dictation works anywhere you can type. Google Docs also has its own voice typing under Tools > Voice typing.",
      ],
    ],
    referencesTitle: "References",
  };
}
