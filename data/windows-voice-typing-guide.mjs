// English guide for Windows 11 voice typing (Windows logo key + H) that does not work. Every
// statement in the symptom sections and the offline section must be backed by one of the
// Microsoft pages below, read on WINDOWS_VOICE_TYPING_CHECKED; nothing Microsoft does not
// document (registry edits, system file repair, third-party tools) is suggested. Dictivo appears
// only in the closing section, disclosed as this site's product, and only while Windows
// downloads are public: without them the section is null and the trial panel is not rendered.
export const WINDOWS_VOICE_TYPING_LASTMOD = "2026-10-09";
export const WINDOWS_VOICE_TYPING_CHECKED = "2026-10-09";

const checked = `(checked ${WINDOWS_VOICE_TYPING_CHECKED})`;
const checkedOn = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${WINDOWS_VOICE_TYPING_CHECKED}T00:00:00Z`));

export const MICROSOFT_VOICE_TYPING_HELP = {
  voiceTyping: "https://support.microsoft.com/en-us/accessibility/windows/use-voice-typing-to-talk-instead-of-type-on-your-pc",
  notWorking: "https://support.microsoft.com/en-us/accessibility/windows/voice-typing-isn-t-working-in-windows",
  speechPrivacy: "https://support.microsoft.com/en-us/windows/privacy/speech-voice-activation-inking-typing-and-privacy",
  microphonePrivacy: "https://support.microsoft.com/en-us/windows/privacy/windows-camera-microphone-and-privacy",
  fixMicrophone: "https://support.microsoft.com/en-us/windows/hardware/drivers/fix-microphone-problems",
  testMicrophone: "https://support.microsoft.com/en-us/windows/hardware/drivers/how-to-set-up-and-test-microphones-in-windows",
  shortcuts: "https://support.microsoft.com/en-us/accessibility/windows/keyboard-shortcuts-in-windows",
  setUpVoiceAccess: "https://support.microsoft.com/en-us/accessibility/windows/voice-access/set-up-voice-access",
  voiceAccess: "https://support.microsoft.com/en-us/accessibility/windows/voice-access/get-started-with-voice-access",
  deprecated: "https://learn.microsoft.com/en-us/windows/whats-new/deprecated-features",
  windowsKeyPolicy: "https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-admx-windowsexplorer",
  speechPolicy: "https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-privacy",
};

export const WINDOWS_VOICE_TYPING_REFERENCES = [
  [`Microsoft Support: Use voice typing to talk instead of type on your PC ${checked}`, MICROSOFT_VOICE_TYPING_HELP.voiceTyping],
  [`Microsoft Support: Voice typing isn't working in Windows ${checked}`, MICROSOFT_VOICE_TYPING_HELP.notWorking],
  [`Microsoft Support: Speech, voice activation, inking, typing, and privacy ${checked}`, MICROSOFT_VOICE_TYPING_HELP.speechPrivacy],
  [`Microsoft Support: Windows camera, microphone, and privacy ${checked}`, MICROSOFT_VOICE_TYPING_HELP.microphonePrivacy],
  [`Microsoft Support: Fix microphone problems ${checked}`, MICROSOFT_VOICE_TYPING_HELP.fixMicrophone],
  [`Microsoft Support: How to set up and test microphones in Windows ${checked}`, MICROSOFT_VOICE_TYPING_HELP.testMicrophone],
  [`Microsoft Support: Keyboard shortcuts in Windows ${checked}`, MICROSOFT_VOICE_TYPING_HELP.shortcuts],
  [`Microsoft Support: Set up voice access ${checked}`, MICROSOFT_VOICE_TYPING_HELP.setUpVoiceAccess],
  [`Microsoft Support: Get started with voice access ${checked}`, MICROSOFT_VOICE_TYPING_HELP.voiceAccess],
  [`Microsoft Learn: Deprecated features in the Windows client ${checked}`, MICROSOFT_VOICE_TYPING_HELP.deprecated],
  [`Microsoft Learn: ADMX_WindowsExplorer Policy CSP, Turn off Windows Key hotkeys ${checked}`, MICROSOFT_VOICE_TYPING_HELP.windowsKeyPolicy],
  [`Microsoft Learn: Privacy Policy CSP, Allow users to enable online speech recognition services ${checked}`, MICROSOFT_VOICE_TYPING_HELP.speechPolicy],
];

// `windows` mirrors hasWindowsRelease; `offlineGuidePath` is the Windows offline dictation guide.
export function windowsVoiceTypingCopy({ windows, offlineGuidePath }) {
  return {
    navLabel: "Windows voice typing not working",
    metaTitle: "Windows Voice Typing Not Working? Fixes by Symptom (Win+H)",
    metaDescription:
      "Win+H voice typing not starting, not typing or missing your language? Check the settings Microsoft documents, symptom by symptom, and whether it works offline.",
    eyebrow: "Windows dictation guide",
    title: "Windows voice typing not working: what to check, by symptom",
    lede:
      "Windows voice typing (Windows logo key + H) can fail in a few distinct ways: the shortcut does nothing, it asks for microphone access or says your language is not available, or it listens and types nothing. This page lists what to check for each symptom, following Microsoft's own support articles, with the exact setting names.",
    environmentLabel: "Based on",
    environment: `Microsoft's English support documents for Windows 11, read on ${checkedOn}. No on-device test is claimed on this page.`,
    answerTitle: "Check these four things first",
    answer:
      "Put the cursor in a text box and press Windows logo key + H. If voice typing does not work, check four things. Voice typing uses Microsoft's online speech recognition, so the PC must be online and Settings > Privacy & security > Speech > Online speech recognition must be on. Settings > Privacy & security > Microphone must allow microphone access. Settings > System > Sound > Input must show the microphone you speak into. And your input language must be one voice typing supports; Windows logo key + Spacebar switches it.",
    quickReference: {
      title: "Quick reference",
      caption: `Windows voice typing symptoms and the first setting to check, from Microsoft's support documents (checked on ${checkedOn}).`,
      headers: ["Symptom", "First thing to check", "Where"],
      rows: [
        ["Windows logo key + H does nothing", "That the cursor is in a text box, then start it from the touch keyboard", "Touch keyboard > Microphone button"],
        ["It says it needs access to your microphone", "Microphone access, including desktop apps", "Settings > Privacy & security > Microphone"],
        ["It listens, but no text appears", "Which microphone Windows uses, and its input volume", "Settings > System > Sound > Input"],
        ["It says your language isn't available", "Whether voice typing supports the language", "Settings > Time & language > Language & region"],
        ["Wrong words or the wrong language", "The input language, then background noise", "Windows logo key + Spacebar"],
        ["It stopped working offline or on a work PC", "Internet access and online speech recognition", "Settings > Privacy & security > Speech"],
        ["An app is missing from the microphone list", "The setting for desktop apps", "Let desktop apps access your microphone"],
        ["Voice access opened instead", "Which feature you started", "Windows logo key + H, not Settings > Accessibility > Speech"],
        ["None of the above", "The audio driver", "Device Manager"],
      ],
    },
    tocLabel: "On this page",
    sections: [
      {
        kicker: "Symptom 1",
        title: "Windows logo key + H does nothing",
        steps: [
          "Click in a text box first, so the cursor is blinking where the text should go. Voice typing needs a text box to type into.",
          "Start it the other way Microsoft documents: press the Microphone button on the touch keyboard. On a hardware keyboard the shortcut is Windows logo key + H.",
          "In voice typing settings (the gear icon in the voice typing flyout), turn on the voice typing launcher, which lets you start voice typing quickly when you are in a text box.",
          "On a work or school PC, an administrator can turn on the \"Turn off Windows Key hotkeys\" policy, which makes Windows logo key shortcuts unavailable. Use the touch keyboard's Microphone button or ask your administrator.",
        ],
        notes: [
          "If the touch keyboard's Microphone button starts voice typing but Windows logo key + H does not, voice typing itself works and only the shortcut is not reaching it.",
        ],
      },
      {
        kicker: "Symptom 2",
        title: "It says voice typing needs access to your microphone",
        paragraphs: [
          "Microsoft's message reads: \"Voice typing needs access to your microphone. You'll need to turn this on in settings to use speech to text.\"",
        ],
        steps: [
          "Open Settings > Privacy & security > Microphone and turn on Microphone access.",
          "On the same page, turn on Let apps access your microphone.",
          "Turn on Let desktop apps access your microphone as well. Microsoft notes that turning it off can keep some Windows features, such as Windows dictation, from using the microphone.",
        ],
      },
      {
        kicker: "Symptom 3",
        title: "It listens, but no text appears",
        steps: [
          "Open Settings > System > Sound and, under Input, choose the device you speak into. If you use an external microphone, check that it is properly connected.",
          "Select that microphone, choose Start test under Input settings, speak normally, and adjust the Input volume slider if needed.",
          "If you use a built-in microphone, try again with a headset or an external microphone.",
          "Run the Recording Audio troubleshooter: Settings > System > Sound, then under Troubleshoot common sound problems choose Input devices.",
        ],
      },
      {
        kicker: "Symptom 4",
        title: "It says voice typing isn't available in the current language",
        paragraphs: [
          "Voice typing works only in the languages Microsoft lists for it: 46 languages and regional varieties in Windows 11, including six varieties of English and Chinese, French, German, Japanese, Korean, Portuguese and Spanish. The language does not have to be your Windows display language.",
        ],
        steps: [
          "Open Settings > Time & language > Language & region and select Add a language next to Preferred languages.",
          "Search for the language, select Next, and install it. Optional language features, including speech recognition, are not required for voice typing.",
          "Switch to that input language with Windows logo key + Spacebar or the language switcher on the taskbar.",
        ],
      },
      {
        kicker: "Symptom 5",
        title: "It types the wrong words or the wrong language",
        steps: [
          "Press Windows logo key + Spacebar and choose the language you are speaking; voice typing follows the input language.",
          "Move somewhere quieter, and if you use a built-in microphone, try a headset or an external microphone.",
          "In voice typing settings, check Automatic punctuation, Filter profanity and Default microphone.",
        ],
        notes: ["Say \"delete that\" to remove the last word or phrase, and \"stop listening\" to stop."],
      },
      {
        kicker: "Symptom 6",
        title: "It stopped working offline, or on a work or school PC",
        paragraphs: [
          "Voice typing converts speech to text with Microsoft's online speech recognition, so it needs an internet connection. When Online speech recognition is turned off, Microsoft says only device-based features, such as Narrator, are available.",
        ],
        steps: [
          "Check that the PC is connected to the internet.",
          "Open Settings > Privacy & security > Speech and turn on Online speech recognition.",
          "On a managed PC, an administrator can disable the policy \"Allow users to enable online speech recognition services\"; speech services are then off and cannot be turned on in Settings. Ask your administrator.",
        ],
        notes: ["With a work or school account you cannot contribute voice clips, but Microsoft says you can still use voice typing."],
      },
      {
        kicker: "Symptom 7",
        title: "An app is missing from the microphone list",
        paragraphs: [
          "Settings > Privacy & security > Microphone lists Microsoft Store apps one by one. Desktop apps are not listed individually: they are allowed or blocked together by Let desktop apps access your microphone, and Microsoft notes that they may not always appear in the list. If the app you dictate into is a desktop app, that setting is the one to check.",
        ],
      },
      {
        kicker: "Symptom 8",
        title: "You opened voice access instead",
        paragraphs: [
          "Voice typing and voice access are separate features. Voice typing starts with Windows logo key + H and types what you say. Voice access, in Windows 11 version 22H2 and later, controls the whole PC by voice and is turned on from Settings > Accessibility > Speech. Windows Speech Recognition, the older command feature, has been deprecated since December 2023 and is being replaced by voice access.",
        ],
      },
      {
        kicker: "Symptom 9",
        title: "If it still does not work",
        steps: [
          "Microsoft's microphone troubleshooting ends with the audio driver: right-click Start, open Device Manager, uninstall the audio device (check Attempt to remove the driver for this device), and restart the PC so Windows reinstalls it.",
          "If it is not reinstalled, open Device Manager, right-click Sound, video and game controllers and choose Scan for hardware changes; then right-click the audio driver and choose Update driver.",
        ],
        notes: [
          "On Windows 10 the same shortcut opens dictation, which also needs an internet connection. Microsoft ended support for Windows 10 on 14 October 2025.",
        ],
      },
      {
        kicker: "Offline",
        title: "Can Windows 11 dictation work offline?",
        paragraphs: [
          "Voice typing cannot. Microsoft's voice typing article says it uses online speech recognition powered by Azure Speech services, and that you need to be connected to the internet.",
          "Voice access can. Microsoft describes it as working without an internet connection: setup downloads language files once for on-device speech recognition, and after that you can say \"Dictation mode\" to dictate text without issuing commands. It is in Windows 11 version 22H2 and later, and Microsoft lists English (United States, United Kingdom, India, New Zealand, Canada and Australia), Spanish, German, French, Simplified and Traditional Chinese, Japanese and Italian.",
          "Fluid dictation, on Copilot+ PCs and in English, corrects grammar, punctuation and filler words with small language models on the device. The same Microsoft article still says voice typing needs an internet connection, so Fluid dictation does not make voice typing an offline feature.",
        ],
        links: [["Which Windows dictation tools keep audio on your PC", offlineGuidePath]],
      },
    ],
    fieldTest: null,
    dictivo: windows
      ? {
          kicker: "Another option",
          title: "If you need dictation that works offline",
          paragraphs: [
            "Dictivo is this site's product. It is a separate dictation app with its own shortcut (Ctrl+Shift+Space on Windows by default), so it does not depend on voice typing or the online speech recognition setting. In Local mode it transcribes on your PC with a downloaded model, so it works without an internet connection once the model is installed, and then pastes the text into the app you are using.",
            "It is a desktop app, so Windows' Let desktop apps access your microphone setting applies to it too, and it cannot help if Windows does not detect your microphone at all. If voice typing already does what you need, you do not need another app.",
          ],
          links: [
            ["Try your first sentence with Dictivo", "/guides/first-local-dictation/"],
            ["Dictivo pricing", "/pricing/"],
          ],
        }
      : null,
    faqTitle: "Windows voice typing questions",
    faqs: [
      [
        "Why is Windows logo key + H not working?",
        "Check that the cursor is in a text box, that the PC is online, that Online speech recognition and Microphone access are on in Settings > Privacy & security, and that your input language supports voice typing. If the touch keyboard's Microphone button works but the shortcut does not, the shortcut is not reaching voice typing; on a work PC, a policy can turn off Windows logo key shortcuts.",
      ],
      ["Does Windows voice typing need the internet?", "Yes. Microsoft says voice typing uses online speech recognition powered by Azure Speech services and that you need to be connected to the internet."],
      [
        "Can Windows 11 dictation work offline?",
        "Voice typing (Windows logo key + H) cannot. Voice access, in Windows 11 version 22H2 and later, works without an internet connection after a one-time language download, and its Dictation mode types what you say.",
      ],
      ["How do I change the voice typing language?", "Install the language in Settings > Time & language > Language & region, then switch your input language with Windows logo key + Spacebar. Voice typing follows the input language."],
      ["What is the difference between voice typing and voice access?", "Voice typing types what you say into the current text box and needs the internet. Voice access controls the whole PC by voice, can dictate in Dictation mode, and works offline after setup."],
      ["How do I stop voice typing?", "Say \"stop listening\" or another stop command, or press the Microphone button in the voice typing menu."],
      ["Does voice typing work on Windows 10?", "Windows 10 has the same shortcut for dictation, which also needs an internet connection. Microsoft ended Windows 10 support on 14 October 2025."],
    ],
    referencesTitle: "References",
  };
}
