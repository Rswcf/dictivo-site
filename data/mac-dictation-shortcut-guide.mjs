import { APPLE_DICTATION_HELP, MAC_DICTATION_GUIDES_CHECKED, dictivoShortcutDefault } from "./mac-dictation-not-working-guide.mjs";

// English guide to the built-in macOS Dictation shortcut. The macOS statements come from the
// Apple help pages below (read on MAC_DICTATION_GUIDES_CHECKED). Apple does not list every
// choice in the Shortcut pop-up menu, so this page names only Press Fn (Function) Key Twice and
// Customize; an actual Mac's menu may be added only with a screenshot. Dictivo's shortcuts are
// its v0.3.52 defaults (DEFAULT_HOTKEYS in the desktop app) and appear only where labelled as
// this site's product.
export const MAC_DICTATION_SHORTCUT_LASTMOD = "2026-10-09";

const checked = `(checked ${MAC_DICTATION_GUIDES_CHECKED})`;
const checkedOn = new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${MAC_DICTATION_GUIDES_CHECKED}T00:00:00Z`));

export const MAC_DICTATION_SHORTCUT_REFERENCES = [
  [`Apple Support: Dictate messages and documents on Mac ${checked}`, APPLE_DICTATION_HELP.dictate],
  [`Apple Support: Commands for dictating text on Mac ${checked}`, APPLE_DICTATION_HELP.commands],
  [`Apple Support: Use Voice Control commands to interact with your Mac ${checked}`, APPLE_DICTATION_HELP.voiceControl],
  [`Apple Support: If Dictation on Mac doesn't work as expected ${checked}`, APPLE_DICTATION_HELP.troubleshoot],
];

function dictivoPasteLastDefault(windows) {
  return windows ? "Cmd+Shift+V on Mac and Ctrl+Shift+V on Windows" : "Cmd+Shift+V on Mac";
}

export function macDictationShortcutCopy({ windows, troubleshootingPath }) {
  return {
    navLabel: "Mac dictation shortcut",
    metaTitle: "Mac Dictation Shortcut: Default, Change It, Fix Conflicts",
    metaDescription:
      "The default Mac dictation shortcut, how to change it in Keyboard settings, what to do when it opens Siri or nothing happens, plus Dictivo's own shortcut.",
    eyebrow: "Mac dictation guide",
    title: "The Mac dictation shortcut: where it is, how to change it, and why it stops working",
    lede:
      "macOS lets you start Dictation from a key or key combination, and the setting that controls it lives in Keyboard settings. This page covers the options Apple documents, how to set a custom combination, and what to check when the shortcut does nothing or opens Siri.",
    environmentLabel: "Based on",
    environment: `Apple's English support documents for macOS Tahoe 26 and macOS 27, read on ${checkedOn}. No on-device test is claimed on this page.`,
    answerTitle: "Short answer",
    answer:
      "The Mac dictation shortcut is set in System Settings > Keyboard, under Dictation, in the Shortcut pop-up menu. On keyboards with a Microphone key, pressing and releasing that key starts Dictation (holding it opens Siri). Apple's help names Press Fn (Function) Key Twice as one of the menu's choices, and Customize records a combination you press, for example Option-Z. The shortcut only works while Dictation is turned on, and not at all while Voice Control is on.",
    quickReference: {
      title: "Shortcuts at a glance",
      caption: `Starting, stopping and changing dictation on a Mac. macOS from Apple's support documents, checked on ${checkedOn}; Dictivo from its default settings.`,
      headers: ["Action", "Built-in macOS Dictation", "Dictivo (this site's product)"],
      rows: [
        ["Start", "The Microphone key (press and release), the shortcut set in Keyboard > Dictation, or Edit > Start Dictation", `${dictivoShortcutDefault(windows)}, or the shortcut you set`],
        ["Stop", "Escape, the Microphone key or the Dictation shortcut; it also stops after 30 seconds without speech", "Press the shortcut again, or release it with hold-to-talk"],
        ["Change the shortcut", "System Settings > Keyboard > Dictation > Shortcut", "Settings > Hotkeys in Dictivo"],
        ["Insert a line break", "Say \"new line\" or \"new paragraph\"", "-"],
        ["Paste the last transcript", "-", dictivoPasteLastDefault(windows)],
      ],
    },
    tocLabel: "On this page",
    sections: [
      {
        kicker: "Setting",
        title: "Where the setting is and what the menu offers",
        paragraphs: [
          "Choose Apple menu > System Settings, click Keyboard in the sidebar (you may need to scroll down), go to Dictation, and open the Shortcut pop-up menu.",
          "Apple's help names two of the menu's choices: Press Fn (Function) Key Twice, and Customize, for a combination that is not in the list. On keyboards with a Microphone key in the row of function keys, that key starts Dictation as well.",
          "The pop-up also lists double-press options for modifier keys; which ones appear depends on your Mac and macOS version, so open the menu to see yours.",
        ],
      },
      {
        kicker: "Change",
        title: "How to change it, including a custom combination",
        steps: [
          "Open System Settings > Keyboard and go to Dictation. If Dictation is off, turn it on; the first time, click Enable.",
          "Click the Shortcut pop-up menu and choose a shortcut.",
          "For a combination that is not in the list, choose Customize, then press the keys you want to use, for example Option-Z.",
        ],
        notes: [
          "Depending on your Mac model, choosing a shortcut can change the \"Press fn key to\" option in Keyboard settings automatically. For example, if you choose Press Fn (Function) Key Twice, that option changes to Start Dictation (Press Fn Twice).",
        ],
      },
      {
        kicker: "Keys",
        title: "Microphone key, Fn key and Globe key",
        paragraphs: [
          "On keyboards with a Microphone key in the row of function keys, press and release it to start Dictation. Pressing and holding it activates Siri instead, when Siri is enabled.",
          "The Fn key comes in when you choose a double-press shortcut such as Press Fn (Function) Key Twice, which can also change what the \"Press fn key to\" option does. If the Fn key behaves differently after you change the Dictation shortcut, check that option in Keyboard settings.",
          "If you dictate in more than one language, the Globe key (if your keyboard has one) lets you choose the language while you dictate.",
        ],
      },
      {
        kicker: "Fixes",
        title: "When the shortcut does nothing or opens something else",
        steps: [
          "Check that Dictation is on in System Settings > Keyboard. The first time you turn it on, click Enable.",
          "Turn off Voice Control in System Settings > Accessibility > Voice Control. While it is on, standard macOS Dictation is not available.",
          "If the Microphone key opens Siri, you are holding it: press and release it instead.",
          "If another app uses the same key combination, check that app's shortcut settings, or choose a different Dictation shortcut.",
          "Click in a text field before you press the shortcut, so the text has somewhere to go.",
        ],
        links: [["Mac dictation not working: what to check for each symptom", troubleshootingPath]],
      },
      {
        kicker: "Menu",
        title: "Starting and stopping without the shortcut",
        paragraphs: [
          "Click where you want the text and choose Edit > Start Dictation. Some apps do not show this menu item.",
          "To stop, press Escape, the Microphone key (if your keyboard has one) or the Dictation shortcut. Dictation also stops by itself when no speech is detected for 30 seconds; otherwise there is no time limit.",
        ],
      },
      {
        kicker: "Commands",
        title: "Commands while you dictate",
        paragraphs: [
          "These spoken commands are always available while you dictate. Say \"new line\" (like pressing Return once) or \"new paragraph\" (like pressing Return twice); both appear when you finish dictating.",
          "Say punctuation by name, such as \"comma\", \"period\" or \"question mark\". Say \"caps on\" to put the next phrase in Title Case and \"caps off\" to return to normal; say \"numeral\" to format the next phrase as a number.",
        ],
        links: [["Apple: Commands for dictating text on Mac", APPLE_DICTATION_HELP.commands]],
      },
    ],
    fieldTest: null,
    dictivo: {
      kicker: "Another option",
      title: "Dictivo's shortcut",
      paragraphs: [
        `Dictivo is this site's product. It is a separate dictation app with its own shortcut, which you set in Dictivo rather than in Keyboard settings. The default is ${dictivoShortcutDefault(windows)}: press it once to start recording and again to stop. To hold the keys while you speak instead, choose Press and hold under Dictation activation in Dictivo's Settings > Hotkeys.`,
        `Paste Last, ${dictivoPasteLastDefault(windows)} by default, pastes the last transcript again. Both shortcuts can be changed in Settings > Hotkeys.`,
        "Dictivo's shortcut and the macOS Dictation shortcut are separate settings and do not change each other; if you use both, give them different keys. When a transcription finishes, Dictivo pastes the text into the app you are using. If you copy something else while it is still transcribing, it leaves your clipboard alone and keeps the transcript for Paste Last.",
      ],
      links: [
        ["Try your first sentence with Dictivo", "/guides/first-local-dictation/"],
        ["Dictivo pricing", "/pricing/"],
      ],
    },
    faqTitle: "Mac dictation shortcut questions",
    faqs: [
      [
        "What is the default dictation shortcut on a Mac?",
        "It depends on your keyboard and macOS version, and Apple's help does not name a single default. Open System Settings > Keyboard > Dictation to see the current Shortcut. On keyboards with a Microphone key in the row of function keys, pressing and releasing that key starts Dictation.",
      ],
      ["How do I change the dictation shortcut?", "Open System Settings > Keyboard, go to Dictation, click the Shortcut pop-up menu and choose another option."],
      ["Can I use any key combination?", "You can set one that is not in the list: choose Customize in the Shortcut pop-up menu, then press the keys you want to use, for example Option-Z."],
      ["Why does the dictation key open Siri?", "Pressing and holding the Microphone key activates Siri when Siri is enabled. Press and release it to start Dictation."],
      [
        "Why is the shortcut greyed out or missing?",
        "Apple's help does not describe a greyed-out shortcut. It does describe two settings that stop the shortcut from working: Dictation must be turned on in Keyboard settings, and standard Dictation is not available while Voice Control is on.",
      ],
      [
        "Does Dictivo use the same shortcut as macOS Dictation?",
        `No. Dictivo, this site's product, has its own shortcut (by default ${dictivoShortcutDefault(windows)}), set in Dictivo's Settings > Hotkeys. Changing one does not change the other.`,
      ],
    ],
    referencesTitle: "References",
  };
}
