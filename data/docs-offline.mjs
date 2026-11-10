import { LOCAL_OFFER } from "./local-offer.mjs";
import { DOCS_CHECKED_VERSION } from "./docs-shared.mjs";

// Docs page O (Batch B2): what the Dictivo desktop app does with no network, and which actions need
// one. Every fact comes from the desktop app at tag v0.3.57 (DOCS_CHECKED_VERSION) or from a page the
// site already publishes:
// - Local dictation on the device, the temporary recording file: displayLanguage.ts (privacy
//   storage rows); the site's /privacy/where-dictation-audio-goes/;
// - the trial starts with a local file write: license.rs ensure_local_trial_started;
// - a cached license works offline, refresh keeps it, removal deletes it locally even when the
//   license service cannot be reached: license.rs license_refresh, deactivate_license_in_slot;
// - model sources, fallback, resume: private_fast.rs (download sources), model_download.rs
//   (download_with_ladder, the resume message);
// - model import: private_fast.rs import_private_fast_model (entitlement, checksum), the
//   "Advanced — full model catalog" row in ModelManager.tsx under Settings › Engine
//   (SettingsView.tsx section labels); models folder: private_fast.rs private_fast_models_dir;
// - the update check fails quietly: updater.rs CheckResultKind::Failed;
// - the Local price: localOffer.ts (null on failure, retried on the next screen);
// - reports retry: trialCensus.ts, installCensus.ts; statistics: analyticsEmitter.ts (lifecycle
//   events queued, the rest fire-and-forget);
// - hosts and when: displayLanguage.ts Connections rows; Lock Cloud Fast: displayLanguage.ts
//   privacy.networkAudio and the site's /security/#lock-cloud-fast.
// No price on this page.
export const DOCS_OFFLINE_LASTMOD = "2026-11-10";

const trialDays = LOCAL_OFFER.trialDays;

export function docsOfflineCopy({ windows }) {
  const modelFolders = windows
    ? "Copy the file <code>ggml-&lt;model&gt;.bin</code> from the models folder: <code>~/Library/Application Support/Dictivo/private-fast/models</code> on a Mac, <code>%LOCALAPPDATA%\\Dictivo\\private-fast\\models</code> on Windows."
    : "Copy the file <code>ggml-&lt;model&gt;.bin</code> from the models folder: <code>~/Library/Application Support/Dictivo/private-fast/models</code>.";
  return {
    ready: true,
    slug: "offline",
    route: "docs/offline",
    idPrefix: "docs-offline",
    mainId: "docs-offline",
    navLabel: "Offline behavior",
    metaTitle: "Dictivo Offline Behavior: What Works Without a Network",
    metaDescription: "Which parts of Dictivo work with no network after the model download, which actions need one, how to install a model from a file, and how to verify it yourself.",
    llmsQuestion: "What does Dictivo do without a network connection?",
    summary: "What works with no network after the first model download, and which actions need one.",
    lastmod: DOCS_OFFLINE_LASTMOD,
    title: "What Dictivo does offline, and what needs the network",
    lede: "Reference facts about which parts of the Dictivo desktop app work with no network, which actions need one, and how to check it yourself.",
    answer: `After one model download, Dictivo dictates with no network. Local dictation, paste, history, the dictionary, snippets, settings and the ${trialDays}-day trial work offline. The network is used for the first model download, update checks, license activation, optional Cloud Fast and short reports that carry no audio or text. In Local mode, Dictivo does not send your audio to a transcription server. With Lock Cloud Fast on, no recording you start is uploaded.`,
    answerLinks: [
      ["Where dictation audio goes", "/privacy/where-dictation-audio-goes/"],
      ["How Lock Cloud Fast works", "/security/#lock-cloud-fast"],
    ],
    about: ["offline dictation", "Dictivo offline", "local dictation", "network use"],
    quickReference: {
      title: "Offline at a glance",
      caption: `What needs a network in Dictivo ${DOCS_CHECKED_VERSION}`,
      headers: ["Action", "Needs a network?", "What happens offline"],
      rows: [
        ["Local dictation with a downloaded model", "No", "Recording and transcription run on this device."],
        ["Paste into the active app", "No", "Dictivo puts the transcript on the clipboard and pastes it."],
        [`Starting the ${trialDays}-day trial`, "No", "Dictivo writes the trial record on this device. The trial report is sent later."],
        ["First download of a model", "Yes", "The download stops. It resumes where it stopped when you try again online."],
        ["Importing a model from a file", "No", "Dictivo checks the file against the official checksum and installs it."],
        ["Activating, refreshing or removing a license", "Yes", "Activation fails. A refresh keeps the license as it is. Removal deletes the license from this device, but the license service still counts the device."],
        ["Using an already active license", "No", "Dictivo reads the license from this device. It does not check it at launch."],
        ["Update check", "Yes", "The check fails without an error message. The app keeps working."],
        ["Cloud Fast", "Yes", "Cloud Fast does not work. Switch to Local to dictate."],
        ["Showing the Local price in the app", "Yes", "The price is not shown. Dictivo asks again the next time a screen shows the offer."],
        ["Trial, install and statistics reports", "Yes", "Nothing is sent. Trial and install reports retry later; some statistics events, if you turned them on, are dropped."],
        ["Buying or renewing (opens the browser)", "Yes", "Checkout needs a connection in your browser. Activating the key afterwards needs one too."],
      ],
    },
    wide: false,
    showTrial: false,
    trialSource: undefined,
    sections: [
      {
        title: "Local dictation needs no network",
        paragraphs: [
          "In Local mode, Dictivo records and transcribes your dictation on this device. It does not send your audio to a transcription server.",
          "While Local transcribes, Dictivo writes the recording to a temporary file in its data folder. It deletes the file when the transcript is ready.",
          "Your transcripts and history, your dictionary and snippets, your settings and the models you downloaded stay on the device.",
          "To paste, Dictivo puts the transcript on the clipboard and sends the paste shortcut to the active app. This needs no network either.",
        ],
        links: [["Where dictation audio goes", "/privacy/where-dictation-audio-goes/"]],
      },
      {
        title: "The one thing that needs a download first",
        paragraphs: [
          "Local dictation needs a speech model on the device. Dictivo downloads models from downloads.dictivo.app. If that download fails, it tries huggingface.co instead. An interrupted download resumes where it stopped.",
          `The Tiny model is free. Every other model needs the ${trialDays}-day trial or a Dictivo Local license. The models range from about 75 MB to about 3.1 GB.`,
          "For a computer that never goes online, import the model from a file:",
        ],
        steps: [
          "On a computer that is online, download the model in Dictivo.",
          { html: modelFolders },
          "On the offline computer, open Settings › Engine and expand Advanced — full model catalog.",
          "Choose the model, type the path to the file, and click Import.",
        ],
        notes: [
          "Dictivo installs an imported file only if it matches the official checksum for that model. To import a model other than Tiny, the trial or a license must be active on that computer.",
        ],
        links: [["Models, sizes and languages", "/docs/models-and-languages/"]],
      },
      {
        title: "What uses the network, and when",
        paragraphs: [
          "Dictivo can contact five hosts. Each one has a fixed job.",
          "downloads.dictivo.app: an update check about five seconds after launch and every 24 hours, update downloads, and the model downloads you start.",
          "app.dictivo.app: short reports when the app is first opened, when microphone access is decided and when your trial starts; the Local price when a screen shows it; and a purchase claim after you start a checkout in the app. Dictivo sends the trial and install reports whatever the statistics setting says. They carry no audio or text. Usage statistics go here only if you turn them on, and the trial reminder only if you ask for one.",
          "api.dictivo.app: Cloud Fast only.",
          "api.lemonsqueezy.com: when you activate, refresh or remove a license, and once after a reinstall restores one.",
          "huggingface.co: only if a model download from downloads.dictivo.app fails.",
        ],
        links: [["Every host, path and payload", "/docs/connections/"]],
      },
      {
        title: "Lock Cloud Fast",
        paragraphs: [
          "Lock Cloud Fast is a switch in Settings › Privacy. While it is on, no recording you start is uploaded, and you cannot select Cloud Fast.",
          "One exception: a Cloud Fast recording that is already in progress when you lock finishes the way it started.",
          "While the lock is on, Cloud Fast license or status checks may still contact api.dictivo.app. They carry no audio.",
          "The lock does not change Local dictation. Local mode does not send audio to a transcription server with or without it.",
        ],
        links: [["How the lock works", "/security/#lock-cloud-fast"]],
      },
      {
        title: "How to verify it yourself",
        paragraphs: [
          "You can check all of this with a network monitor. Download the model first. Then watch Dictivo while you dictate a short phrase in Local mode, and dictate again with the network blocked. The dictation should still finish.",
          "Tools that show network use per app:",
        ],
        bullets: [
          { html: "macOS: <code>nettop</code> in Terminal, or the Network tab of Activity Monitor." },
          "macOS: a per-app firewall such as Little Snitch, which can also block Dictivo.",
          "Windows: the Network tab of Resource Monitor.",
        ],
        notes: [
          "Even in Local mode, expect connections to downloads.dictivo.app and app.dictivo.app. If Local dictation opens a connection that this page does not explain, email support@dictivo.app with the host, the time and your Dictivo version.",
        ],
        links: [["The full network test", "/privacy/local-dictation-network-test/"]],
      },
    ],
    faqs: [
      [
        "Does Dictivo work offline?",
        "Yes, after one model download. Local dictation, paste, history, the dictionary and your settings work with no network. Update checks, license activation and Cloud Fast need one.",
      ],
      [
        "Can I set up Dictivo on a computer that is never online?",
        `Yes, with limits. The ${trialDays}-day trial starts without a network, and you can import a model file copied from another computer. The Tiny model is free. The other models need the trial or a license, and activating a license needs one connection to api.lemonsqueezy.com.`,
      ],
      [
        "Does the trial need an internet connection?",
        `No. Dictivo starts the ${trialDays}-day trial by writing a file on your device. It reports the trial start to app.dictivo.app when it can, but the trial works without that report.`,
      ],
      [
        "Why does Dictivo contact a server if Local is offline?",
        "For update checks, model downloads, licenses, optional Cloud Fast and short reports. The trial and install reports are sent whatever the statistics setting says. They carry no audio and no text. The connections page lists every field they carry.",
      ],
      [
        "Does Cloud Fast work offline?",
        "No. Cloud Fast sends the recording to api.dictivo.app for transcription, so it needs a connection. Switch to Local to dictate offline.",
      ],
    ],
    references: [
      ["Dictivo privacy policy", "https://dictivo.app/privacy/"],
      ["Where Dictivo sends dictation audio", "https://dictivo.app/privacy/where-dictation-audio-goes/"],
      ["How to check a dictation app with a network monitor", "https://dictivo.app/privacy/local-dictation-network-test/"],
      ["Dictivo security", "https://dictivo.app/security/"],
    ],
  };
}
