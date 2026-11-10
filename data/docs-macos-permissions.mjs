import { DOCS_CHECKED_VERSION, docsCheckedLabel } from "./docs-shared.mjs";

// Docs page P (Batch B2): the macOS permissions Dictivo asks for, what each one does and what
// happens without it. Every fact comes from the desktop app at tag v0.3.57 (DOCS_CHECKED_VERSION)
// or from a page the site already publishes:
// - the three rows, their requirement words and descriptions: displayLanguage.ts
//   settingsText.permissions; they render in Settings › Privacy (SettingsView.tsx permission-list),
//   with "Open settings" and "Refresh local status";
// - the status checks: lib.rs request_permissions (AXIsProcessTrusted; Auto paste is always
//   "not-verified"), permissions_macos.rs (the microphone status never shows the prompt);
// - the System Settings panes: lib.rs permission_settings_command (Privacy_Microphone,
//   Privacy_Accessibility, Privacy_Automation; Windows ms-settings:privacy-microphone);
// - the paste: clipboard.rs send_paste_keystroke (System Events keystroke "v" using command down;
//   no keystroke leaves the transcript on the clipboard), App.tsx pasteLastTranscript;
//   the put-back of the previous clipboard: displayLanguage.ts privacy.clipboard;
// - the declarations: Info.plist (two usage descriptions), Entitlements.plist (two entitlements);
//   no Input Monitoring or Screen Recording request: `git grep -i 'ListenEventAccess\|ScreenCaptureAccess\|NSInputMonitoring' v0.3.57 -- apps/desktop`
//   printed nothing on DOCS_CHECKED;
// - the default shortcuts: settingsStore.ts DEFAULT_HOTKEYS; Test microphone: displayLanguage.ts;
// - Windows: lib.rs ("not-required"; no microphone status before the first recording),
//   windows_paste.rs (native key input);
// - the install report: installCensus.ts, displayLanguage.ts Connections row 2;
// - the recording indicator and the System Settings steps: Apple's help pages in references.
export const DOCS_PERMISSIONS_LASTMOD = "2026-11-10";

const MIC_USAGE = "Dictivo records microphone audio only when you start dictation.";
const AUTOMATION_USAGE = "Dictivo may need automation permission to paste dictated text into the active application.";

export function docsPermissionsCopy({ windows }) {
  return {
    ready: true,
    slug: "macos-permissions",
    route: "docs/macos-permissions",
    idPrefix: "docs-permissions",
    mainId: "docs-permissions",
    navLabel: "macOS permissions",
    metaTitle: "macOS Permissions Dictivo Asks For and What Each One Does",
    metaDescription: "Dictivo asks macOS for three permissions: Microphone (required), Accessibility (recommended) and Automation for Auto paste (optional). What each one does.",
    llmsQuestion: "Which macOS permissions does Dictivo ask for?",
    summary: "The three macOS permissions Dictivo asks for, what each one does, and what happens without it.",
    lastmod: DOCS_PERMISSIONS_LASTMOD,
    title: "Which macOS permissions Dictivo asks for, and why",
    lede: "Reference facts about the three macOS permissions the Dictivo desktop app asks for, what each one is for, and what happens if you do not allow it.",
    answer: "Dictivo asks macOS for three permissions. Microphone is required: Dictivo records only when you start dictation. Accessibility is recommended: it keeps the paste and the global shortcuts reliable. Automation, shown in the app as Auto paste, is optional: without it, the transcript stays in Dictivo and on the clipboard. The app declares no other usage descriptions. The install report sends the microphone and Accessibility result as one word.",
    answerLinks: [
      ["Set up your first local dictation", "/guides/first-local-dictation/"],
      ["Every connection Dictivo makes", "/docs/connections/"],
    ],
    about: ["Dictivo macOS permissions", "Accessibility permission dictation", "Automation permission paste", "microphone permission"],
    quickReference: {
      title: "The three permissions at a glance",
      caption: `macOS permissions in Dictivo ${DOCS_CHECKED_VERSION}, with the requirement word the app gives each one`,
      headers: ["Permission", "Dictivo says", "What it is for", "Without it"],
      rows: [
        [
          "Microphone",
          "Required",
          "Records dictation audio when you start Local or Cloud Fast dictation.",
          "Dictivo cannot record. Settings › Privacy shows Needs permission.",
        ],
        [
          "Accessibility",
          "Recommended",
          "Lets Dictivo control paste behavior and keep the global dictation shortcuts reliable.",
          "Dictivo rates it Recommended, not Required. The paste and the global shortcuts may be less reliable.",
        ],
        [
          "Automation (shown as Auto paste)",
          "Optional",
          "Places the final transcript into the active app: Dictivo sends Cmd+V through System Events.",
          "The transcript stays in Dictivo and on the clipboard. Press Cmd+V yourself.",
        ],
      ],
    },
    wide: false,
    showTrial: false,
    trialSource: undefined,
    sections: [
      {
        title: "Microphone (required)",
        paragraphs: [
          "Dictivo needs the microphone to record what you say. The app rates this permission Required.",
          "Dictivo records only when you start dictation. It also records when you click Test microphone in Settings › Engine.",
          "macOS shows its own prompt the first time Dictivo records. Dictivo reads the microphone status without showing that prompt.",
          "To check the status:",
        ],
        steps: [
          "In Dictivo, open Settings › Privacy.",
          "If Microphone does not show Ready, click Open settings. macOS opens Privacy & Security › Microphone.",
          "Turn Dictivo on.",
          "Back in Dictivo, click Refresh local status.",
        ],
        notes: [
          "macOS shows the recording indicator in Control Center while the microphone is in use.",
          "The install report to app.dictivo.app carries the microphone result as one word: granted, denied or no audio. It never carries audio.",
        ],
        links: [["What each connection carries", "/docs/connections/"]],
      },
      {
        title: "Accessibility (recommended)",
        paragraphs: [
          "The app describes this permission in these words: “Allows Dictivo to control paste behavior and keep global dictation shortcuts reliable.”",
          "In plain words, it helps two things work in every app: the dictation shortcut you press (Cmd+Shift+Space by default), and the paste keystroke Dictivo sends when the transcript is ready.",
          "Dictivo rates it Recommended, not Required. Dictivo checks whether macOS trusts it for Accessibility, and the install report carries that result as one word. macOS may ask you to allow Dictivo when it first pastes.",
          "To allow it:",
        ],
        steps: [
          "In Dictivo, open Settings › Privacy.",
          "If Accessibility does not show Ready, click Open settings. macOS opens Privacy & Security › Accessibility.",
          "Turn Dictivo on. If Dictivo is not in the list, click the add button, select Dictivo in Applications and click Open.",
          "Back in Dictivo, click Refresh local status.",
        ],
      },
      {
        title: "Automation, shown as Auto paste (optional)",
        paragraphs: [
          "When a transcript is ready, Dictivo pastes it. It places the text on the clipboard and sends Cmd+V to the active app.",
          "On a Mac, Dictivo sends that keystroke through System Events. macOS therefore asks whether Dictivo may control System Events. This is the Automation permission. Dictivo shows it as Auto paste.",
          "If you allow it, the transcript appears in the app you are using. When Dictivo could paste for you, it puts back what you had copied before, a moment later.",
          "If you do not allow it, the transcript stays in Dictivo and on the clipboard. Click where you want the text and press Cmd+V yourself.",
          "Cmd+Shift+V, the default Paste Last shortcut, pastes the last transcript again. Without Auto paste, it copies the last transcript to the clipboard instead.",
        ],
        notes: [
          "Dictivo does not check the status of this permission. Settings › Privacy shows Auto paste as Not verified. Click Open settings to see Privacy & Security › Automation.",
        ],
      },
      {
        title: "What Dictivo declares",
        paragraphs: [
          "Dictivo's app bundle declares two usage descriptions and two entitlements. macOS shows the usage text when it asks you.",
        ],
        bullets: [
          { html: `<code>NSMicrophoneUsageDescription</code>: “${MIC_USAGE}”` },
          { html: `<code>NSAppleEventsUsageDescription</code>: “${AUTOMATION_USAGE}”` },
          { html: "<code>com.apple.security.device.audio-input</code>: microphone input." },
          { html: "<code>com.apple.security.automation.apple-events</code>: Apple events, which the paste through System Events uses." },
        ],
        notes: [
          "Accessibility has no usage description. You turn it on in System Settings.",
          "Microphone, Accessibility and Automation are the permissions Dictivo requests. Dictivo does not request Input Monitoring or Screen Recording: the app's source contains no call that asks for either.",
        ],
      },
      {
        title: "Windows",
        paragraphs: [
          "Accessibility access is not required on Windows. Settings › Privacy shows the Accessibility row as Not required.",
          "On Windows, Dictivo pastes with a native key input (Ctrl+V). This needs no extra permission.",
          "Microphone access is a Windows privacy setting. Open settings opens the Microphone page of the Windows privacy settings. Windows reports no microphone status to Dictivo before the first recording, so Dictivo learns the result from that recording.",
        ],
        links: [["Set up your first local dictation", "/guides/first-local-dictation/"]],
      },
    ],
    faqs: [
      [
        "Why does Dictivo ask for Accessibility?",
        "The app rates it Recommended. It lets Dictivo control paste behavior and keep the global dictation shortcuts reliable: the shortcut you press, and the paste into the active app.",
      ],
      [
        "Why does macOS ask about System Events?",
        "Dictivo pastes by sending Cmd+V to the active app through System Events. macOS asks before one app controls another. This is the Automation permission, shown in Dictivo as Auto paste.",
      ],
      [
        "Can I use Dictivo without Automation permission?",
        "Yes. Auto paste is optional. Without it, the transcript stays in Dictivo and on the clipboard, and you press Cmd+V yourself.",
      ],
      [
        "Does Dictivo record when I am not dictating?",
        "No. Dictivo records only when you start dictation, or when you click Test microphone in Settings › Engine. macOS shows the recording indicator in Control Center while the microphone is in use.",
      ],
      [
        "How do I change a permission later?",
        "Open System Settings › Privacy & Security, then Microphone, Accessibility or Automation, and turn Dictivo on or off. In Dictivo, Settings › Privacy shows each status and an Open settings button.",
      ],
    ],
    references: [
      [docsCheckedLabel("Apple: Control access to the microphone on Mac"), "https://support.apple.com/guide/mac-help/control-access-to-the-microphone-on-mac-mchla1b1e1fe/mac"],
      [docsCheckedLabel("Apple: Allow accessibility apps to access your Mac"), "https://support.apple.com/guide/mac-help/allow-accessibility-apps-to-access-your-mac-mh43185/mac"],
      [docsCheckedLabel("Apple: Allow apps to control other apps on Mac"), "https://support.apple.com/guide/mac-help/allow-apps-to-control-other-apps-mchl07817563/mac"],
      ["Dictivo: your first local dictation", "https://dictivo.app/guides/first-local-dictation/"],
      ["Dictivo privacy policy", "https://dictivo.app/privacy/"],
    ],
  };
}
