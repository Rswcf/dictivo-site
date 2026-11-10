import { DOCS_CHECKED_VERSION } from "./docs-shared.mjs";

// Docs page C (Batch B2): every host the Dictivo desktop app can contact, with its paths, when it
// connects, what it sends and what happens if a network blocks it. Every fact comes from the desktop
// app at tag v0.3.57 (DOCS_CHECKED_VERSION) or from security.html #network-traffic:
// - the two Dictivo service hosts and their jobs: serviceHosts.ts; the window's allowed hosts:
//   tauri.conf.json app.security.csp (connect-src);
// - downloads.dictivo.app: tauri.conf.json plugins.updater.endpoints, lib.rs
//   schedule_initial_update_check (5 s, then every 24 h) and defer_on_login (60 s after a launch at
//   login), private_fast.rs (model download sources);
// - app.dictivo.app: installCensus.ts, trialCensus.ts (the fields, and acquisitionChannel only after
//   the "Share how you found Dictivo" consent in AcquisitionSource.tsx), trialReminder.ts,
//   analyticsEmitter.ts (opt-in, off by default: displayLanguage.ts shareUsageStatsBody),
//   cloudFastEngine.ts claimParkedLicense, localOffer.ts (fetchLocalOffer, localOfferWanted);
// - api.dictivo.app: cloudFastEngine.ts (entitlement, transcribe), license.rs
//   license_cloud_fast_session and cloud_fast_deactivate_device, App.tsx and SettingsView.tsx (when
//   the entitlement is refreshed), serviceHosts.ts (pre-0.3.51 use);
// - api.lemonsqueezy.com: license.rs (activate, validate, deactivate; instance_name on activation,
//   instance_id afterwards), lib.rs restore_from_credential_store. The instance_name is a label the
//   app builds, "Dictivo on <navigator.platform>" (SettingsView.tsx handleActivate, App.tsx
//   localInstanceName), not the computer's name; the in-app Connections row says otherwise;
// - the Cloud Fast device label: license.rs cloud_fast_device_label ("Dictivo on <os> <arch>");
// - huggingface.co: private_fast.rs (second download source), model_download.rs (tried after the first);
// - Run check: network_diagnostics.rs (four probes, the placeholder key);
// - the in-app wording of When / What it sends / If your network blocks it: displayLanguage.ts
//   privacy.connections; links open in the browser: privacy.connectionsIntro.
// The host of the license service is written as its hostname only, never the merchant's name.
// No price on this page.
export const DOCS_CONNECTIONS_LASTMOD = "2026-11-10";

const code = (path) => `<code>${path}</code>`;

export function docsConnectionsCopy({ windows }) {
  const monitors = windows
    ? "nettop or Activity Monitor on a Mac, a per-app firewall such as Little Snitch, or Resource Monitor on Windows"
    : "nettop or Activity Monitor on a Mac, or a per-app firewall such as Little Snitch";
  return {
    ready: true,
    slug: "connections",
    route: "docs/connections",
    idPrefix: "docs-connections",
    mainId: "docs-connections",
    navLabel: "Network connections",
    metaTitle: "Dictivo Network Connections: Every Host the App Contacts",
    metaDescription: "Every server the Dictivo desktop app can contact, when it connects, what it sends, what happens if you block it, and how to check it with a network monitor.",
    llmsQuestion: "Which servers does the Dictivo desktop app contact?",
    summary: "Every server the app can contact, when it connects, what it sends, and what happens if you block it.",
    lastmod: DOCS_CONNECTIONS_LASTMOD,
    title: "Every server the Dictivo desktop app contacts, and why",
    lede: "Reference facts about every host the Dictivo desktop app can contact: the paths it calls, when it calls them, what each request carries, and what happens if your network blocks it.",
    answer: "The Dictivo desktop app can contact five hosts: downloads.dictivo.app, app.dictivo.app, api.dictivo.app, api.lemonsqueezy.com and huggingface.co. Of these, api.dictivo.app serves only Cloud Fast, and huggingface.co is only a fallback for model downloads. The only request that carries audio is a Cloud Fast transcription. The list below is the one the app shows under Settings › Privacy › Connections, with the paths added.",
    answerLinks: [
      ["The security page's host table", "/security/#network-traffic"],
      ["Check it with a network monitor", "/privacy/local-dictation-network-test/"],
    ],
    about: ["Dictivo network connections", "dictation app network traffic", "firewall allowlist", "privacy verification"],
    quickReference: undefined,
    wide: true,
    showTrial: false,
    trialSource: undefined,
    sections: [
      {
        title: "The list",
        paragraphs: [
          "These are all the hosts the app itself connects to. Every request uses HTTPS. The When, What it sends and If your network blocks it columns follow the app's own Connections list.",
        ],
        table: {
          caption: `Hosts the Dictivo ${DOCS_CHECKED_VERSION} desktop app can contact`,
          headers: ["Host", "Paths", "When", "What it sends", "If your network blocks it"],
          rows: [
            [
              "downloads.dictivo.app",
              { html: `${code("/latest.json")} (update check); ${code("/models/ggml-&lt;model&gt;.bin")} (model downloads); for an update, the installer for your platform, at the address the update check returns` },
              "An update check about five seconds after launch and every 24 hours. Update downloads you install. The model downloads you start. Run check.",
              "The update check sends the name and version of the app's update component. An update download asks for the installer for your platform. A model download asks only for the model file. No license key, no device id.",
              "Dictivo keeps working. You get no update checks. Models download from huggingface.co instead, or you import them from a file.",
            ],
            [
              "app.dictivo.app",
              { html: [
                `${code("/v1/installs/census")} (install report)`,
                `${code("/v1/trials/activations")} (trial report)`,
                `${code("/v1/trials/reminders")} and ${code("/v1/trials/reminders/cancel")} (trial reminder)`,
                `${code("/v1/analytics/events")} (usage statistics)`,
                `${code("/v1/cloud-fast/claim")} (purchase claim, for Local and Cloud Fast purchases)`,
                `${code("/v1/local-offer")} (Local price)`,
                `${code("/health")} (Run check)`,
              ].join("; ") },
              "Once when the app is first opened. When microphone access, and on a Mac accessibility access, is decided. When your trial starts, and when your first trial transcript is copied or pasted. The trial reminder only if you ask for it: once to save it, once to cancel it. Usage statistics only if you turn them on. After you start a purchase in the app, until your license arrives. The Local price and renewal address when a screen that shows the Local offer opens. Run check.",
              "A device id that does not name you (a hash), your platform and your app version. The install report adds the first-open time and the permission result as one word: granted, denied or no audio. The trial report adds the trial's start and activation times and a yes/no flag, and the channel you found Dictivo through only if you agreed to share it. The reminder sends the email address you typed, your interface language and the trial's start date. A purchase claim sends a one-time code; the reply carries your license key and the product it is for. The Local price request sends nothing about you. Statistics events describe how the app was used, never your audio, your text, or file and app names.",
              "Dictivo keeps working, including the trial. After a purchase, paste the license key from your email yourself. The app shows no Local price.",
            ],
            [
              "api.dictivo.app",
              { html: [
                code("/v1/cloud-fast/entitlement"),
                code("/v1/cloud-fast/session"),
                code("/v1/cloud-fast/transcribe"),
                code("/v1/cloud-fast/device/deactivate"),
                `${code("/health")} (Run check)`,
              ].join("; ") },
              "Only for Cloud Fast: checking your subscription or free minutes while Cloud Fast is selected or after you change a Cloud Fast license, starting a Cloud Fast session, transcribing a Cloud Fast recording, and signing a device out of Cloud Fast. Also when you open Account & Billing with a Cloud Fast license stored, and Run check. Versions before 0.3.51 also used it for trial reports, statistics and purchase claims.",
              "For a transcription: the recording itself, how long it is, its language, its audio format and the output style, for example email. Alongside: a session id, your Cloud Fast license key and its activation id if you have one, this device's id, a short device label that Dictivo creates, and your platform and app version.",
              "Local dictation keeps working. Cloud Fast does not.",
            ],
            [
              "api.lemonsqueezy.com",
              { html: [code("/v1/licenses/activate"), code("/v1/licenses/validate"), code("/v1/licenses/deactivate")].join("; ") },
              "When you activate, refresh or remove a license, Local or Cloud Fast, and once after a reinstall restores one. Run check. Not at every launch.",
              "Your license key and a short device label that Dictivo creates. A refresh or a removal sends the license key and its activation id.",
              "Dictivo keeps working with a license that is already active. Activating, refreshing or removing one, or restoring one after a reinstall, needs this connection.",
            ],
            [
              "huggingface.co",
              { html: "The model file only" },
              "Only if a model download from downloads.dictivo.app fails.",
              "A plain download request. No license key, no device id.",
              "Dictivo keeps working. If the download from downloads.dictivo.app fails as well, import the model from a file.",
            ],
          ],
        },
        notes: [
          "When Dictivo starts at login, it waits about one minute before the update check and before the license check that follows a reinstall.",
          "Lock Cloud Fast changes only the api.dictivo.app row. While it is on, no recording you start is uploaded. A Cloud Fast recording already in progress when you lock finishes as Cloud Fast, and Cloud Fast license or status checks may still contact api.dictivo.app.",
        ],
        links: [
          ["How Lock Cloud Fast works", "/security/#lock-cloud-fast"],
          ["The same hosts on the security page", "/security/#network-traffic"],
        ],
      },
      {
        title: "What never leaves the device",
        paragraphs: [
          "Local recordings and Local transcripts stay on the device. In Local mode, Dictivo does not send your audio to a transcription server.",
          "The only request that carries audio is a Cloud Fast transcription to api.dictivo.app. It carries one recording that you started while Cloud Fast was selected.",
          "No request carries your transcript text. Your history, dictionary, snippets and settings stay on the device. With Cloud Fast too, Dictivo applies your dictionary and snippets on the device after the transcript comes back.",
        ],
        links: [["Where dictation audio goes", "/privacy/where-dictation-audio-goes/"]],
      },
      {
        title: "Reports that are sent whatever you choose, and the one setting",
        paragraphs: [
          "Two reports go to app.dictivo.app whatever the statistics setting says:",
        ],
        bullets: [
          "The install report: once per new install when the app is first opened, and when microphone access, and on a Mac accessibility access, is decided. It gives the result as one word: granted, denied or no audio.",
          "The trial report: when your trial starts, and when your first trial transcript is copied or pasted. It gives the start and activation times and a yes/no flag.",
        ],
        notes: [
          "Both reports carry a hashed device id that does not name you, your platform and your app version. They carry no audio, no text, and no file or app names. A report that fails is sent again at a later moment.",
          "If you agree to share how you found Dictivo, the trial report also carries that channel name, for example google or reddit. Dictivo asks first in a dialog. The choice stays on the device for up to 90 days, and you can stop it in Settings › Privacy.",
          "Usage statistics are the one setting. Share usage statistics, in Settings › Privacy, is off by default. Only when you turn it on does Dictivo send events about how the app is used, such as which setup step you reached or a dictation's length and word count.",
          "The trial reminder is sent only if you type an email address and ask for it.",
        ],
        links: [["The privacy policy", "/privacy/"]],
      },
      {
        title: "Run check",
        paragraphs: [
          "Run check is a button in Settings › Account & Billing. It runs only when you click it. It tells you whether this network lets Dictivo reach each service.",
          "It sends one test request to each of these addresses:",
        ],
        bullets: [
          { html: `${code("https://downloads.dictivo.app/latest.json")}, the update check` },
          { html: `${code("https://app.dictivo.app/health")}, trial reports and purchases` },
          { html: `${code("https://api.dictivo.app/health")}, Cloud Fast` },
          { html: `${code("https://api.lemonsqueezy.com/v1/licenses/validate")}, the license service` },
        ],
        notes: [
          "The license test sends a placeholder key, not yours. No test sends anything about you or your work.",
        ],
      },
      {
        title: "Two things that look like app connections but are not",
        paragraphs: [
          "Links you click in the app, such as checkout, billing and the website, open in your browser. Your browser makes those connections, not Dictivo.",
          "Inside the app, the window that shows the interface may connect only to api.dictivo.app and app.dictivo.app. Every other connection in the list comes from the app's native layer, the part that also records and transcribes.",
        ],
      },
      {
        title: "Allow-list for a managed network and how to verify",
        paragraphs: [
          "On a company network, allow these hosts over HTTPS:",
        ],
        bullets: [
          { html: `${code("downloads.dictivo.app")}, for updates and models` },
          { html: `${code("app.dictivo.app")}, for reports, the Local price and purchase claims` },
          { html: `${code("api.dictivo.app")}, for Cloud Fast only` },
          { html: `${code("api.lemonsqueezy.com")}, for license activation` },
          { html: `${code("huggingface.co")}, the model fallback` },
          { html: `${code("dictivo.app")}, for links that open in the browser` },
        ],
        notes: [
          "If you never use Cloud Fast, Dictivo works without api.dictivo.app. Checkout and billing pages open in the browser and can need more hosts there.",
          `To verify, watch Dictivo and its helper processes with a per-app network monitor: ${monitors}. Dictate in Local mode, then block the network and dictate again.`,
          "If you see Dictivo contact a host that is not on this page, email support@dictivo.app with the host, the time and your Dictivo version.",
        ],
        links: [["The full network test", "/privacy/local-dictation-network-test/"]],
      },
    ],
    faqs: [
      [
        "Does Dictivo send my audio anywhere?",
        "Only for Cloud Fast. The only request that carries audio is a Cloud Fast transcription to api.dictivo.app. In Local mode, Dictivo does not send your audio to a transcription server.",
      ],
      [
        "Which hosts do I allow on a company network?",
        "downloads.dictivo.app, app.dictivo.app, api.dictivo.app, api.lemonsqueezy.com and huggingface.co, over HTTPS, plus dictivo.app for links that open in the browser. Without api.dictivo.app, everything except Cloud Fast works.",
      ],
      [
        "Why does Dictivo contact app.dictivo.app if I turned statistics off?",
        "The trial and install reports go there whatever the statistics setting says. They carry a hashed device id that does not name you and no audio or text. The list on this page names every field. The Local price and purchase claims use this host too.",
      ],
      [
        "Does the license check run every time I start Dictivo?",
        "No. Dictivo contacts api.lemonsqueezy.com when you activate, refresh or remove a license, and once after a reinstall restores one. A license that is already active works offline.",
      ],
      [
        "What is huggingface.co doing in the list?",
        "It is the backup source for speech models. Dictivo asks it for a model file only if the download from downloads.dictivo.app fails. The request carries no license key and no device id.",
      ],
      [
        "Can I block everything and still dictate?",
        "Yes, in Local mode with a model already on the device. Update checks, license changes, Cloud Fast and the reports stop. Dictation, paste and history keep working.",
      ],
    ],
    references: [
      ["Dictivo security: what crosses the network", "https://dictivo.app/security/#network-traffic"],
      ["Dictivo privacy policy", "https://dictivo.app/privacy/"],
      ["How to check a dictation app with a network monitor", "https://dictivo.app/privacy/local-dictation-network-test/"],
      ["Where Dictivo sends dictation audio", "https://dictivo.app/privacy/where-dictation-audio-goes/"],
    ],
  };
}
