import { LOCAL_OFFER } from "./local-offer.mjs";
import { DOCS_CHECKED_VERSION, docsCheckedLabel } from "./docs-shared.mjs";

// Docs page U (Batch B2): how Dictivo finds, verifies and installs updates, what the included
// update months cover, what changes when they end, and optional renewal. Every fact comes from the
// desktop app at tag v0.3.57 (DOCS_CHECKED_VERSION) or from a page the site already publishes:
// - check timing: lib.rs schedule_initial_update_check (5 s, then every 24 h) and defer_on_login
//   (at least 60 s after a launch at login); host: tauri.conf.json plugins.updater.endpoints;
// - what the check sends and the blocked-host behavior: displayLanguage.ts Connections row 1;
// - signature check, quiet failure, manual check, the window gate: updater.rs; the button labels
//   "Check for updates" and "Install and restart": SettingsView.tsx (Account & Billing);
// - Windows passive install: tauri.conf.json plugins.updater.windows.installMode;
// - Start at login after a hand-run Windows installer: data/release-notes.mjs (0.3.52);
// - the included months and new local models: displayLanguage.ts localSub, LOCAL_OFFER;
// - the 30-day reminder and the Renew button: SettingsView.tsx; the button exists only while the
//   renewal address is known: App.tsx localRenewalUrl, localOffer.ts (GET app.dictivo.app/v1/local-offer);
// - the renewal key field and the window counted from the renewal purchase: SettingsView.tsx;
// - Homebrew: the tap README.
// The renewal price is the page's one price, a token in the Renewal section.
export const DOCS_UPDATES_LASTMOD = "2026-11-10";

const months = LOCAL_OFFER.includedUpdateMonths;
const trialDays = LOCAL_OFFER.trialDays;

export function docsUpdatesCopy({ windows }) {
  const installNote = windows
    ? "On a Mac, the update installs inside the app. On Windows, Dictivo runs the new installer in passive mode."
    : "On a Mac, the update installs inside the app.";
  return {
    ready: true,
    slug: "updates-and-renewal",
    route: "docs/updates-and-renewal",
    idPrefix: "docs-updates",
    mainId: "docs-updates",
    navLabel: "Updates and renewal",
    metaTitle: `Dictivo Updates and Renewal: What Happens After ${months} Months`,
    metaDescription: `How Dictivo checks for updates, verifies and installs them, what the ${months} included months cover, what changes when they end, and how optional renewal works.`,
    llmsQuestion: `How do Dictivo updates work after the included ${months} months?`,
    summary: `How Dictivo checks for and installs updates, and what changes when the ${months} included months end.`,
    lastmod: DOCS_UPDATES_LASTMOD,
    title: "How Dictivo updates work, and what renewal changes",
    lede: "Reference facts about how the Dictivo desktop app finds, verifies and installs updates, what the included update months cover, and what optional renewal adds.",
    answer: `Dictivo checks downloads.dictivo.app for a new version about five seconds after launch and every 24 hours. It verifies each update before it installs it. A Dictivo Local license includes ${months} months of updates. After that, the version you have keeps working, and newer versions install only after an optional renewal. Installs without a Local license, on the free Tiny model or the ${trialDays}-day trial, keep receiving updates.`,
    answerLinks: [
      ["What happens after the included updates", "/pricing/#pricing-faq"],
      ["How updates are verified", "/security/#updates"],
    ],
    about: ["Dictivo updates", "update renewal", `${months} months of updates`, "update window"],
    quickReference: undefined,
    wide: false,
    showTrial: false,
    trialSource: undefined,
    sections: [
      {
        title: "When Dictivo checks for updates",
        paragraphs: ["Dictivo looks for a new version on its own. It checks at these times:"],
        bullets: [
          "About five seconds after you open the app. When Dictivo starts at login, the first check waits about one minute.",
          "Every 24 hours while the app runs.",
          "When you click Check for updates in Settings › Account & Billing.",
          { html: "If you installed Dictivo with Homebrew, also when you run <code>brew upgrade --cask dictivo</code>. The app still updates itself." },
        ],
        notes: [
          "The check asks downloads.dictivo.app for the latest version. It sends the name and version of the app's update component, and no license key or device id. Dictivo compares the new version with your update window on your device.",
          "If a check fails, for example because you are offline, Dictivo logs it and shows no error. The app keeps working.",
        ],
      },
      {
        title: "How an update installs",
        paragraphs: [
          "Dictivo verifies the signature of each update before it replaces the running app. It does not install an update that fails this check.",
          "When a new version is available to you, Dictivo shows it in the app. Click Install and restart: Dictivo downloads the update, installs it and starts again.",
          installNote,
          "To update by hand:",
        ],
        steps: [
          "Open Settings › Account & Billing.",
          "Click Check for updates.",
          "If a new version appears, click Install and restart.",
        ],
        notes: windows
          ? ["On Windows, if you install an update by running its installer yourself, turn Start at login on again in Settings › General. Updates from inside the app keep this setting."]
          : [],
      },
      {
        title: `What the ${months} months include`,
        paragraphs: [
          `A Dictivo Local license includes ${months} months of app updates and new local models.`,
          "The end date is stored with your license on your device. Settings › Account & Billing shows it as Updates included until.",
          `The update window applies only to a Local license. An install without a Local license, on the free Tiny model or during the ${trialDays}-day trial, is offered every new version.`,
        ],
      },
      {
        title: `What happens when the ${months} months end`,
        paragraphs: [
          "The version you have keeps working. Your license, the local models you downloaded, your settings and your history stay as they are.",
          "Versions published after your end date are not offered for install. When such a version exists, Dictivo tells you that your update window has ended and offers a renewal.",
          "From 30 days before the end date, Settings › Account & Billing shows a reminder with the date.",
        ],
      },
      {
        title: "Renewal",
        paragraphs: [
          `Renewal is optional. It costs {{price.renewal.inline}} a year and gives your Local license a new ${months}-month update window, counted from the day you renew.`,
          "You buy it in the app: click Renew updates in Settings › Account & Billing. Checkout opens in your browser. When the purchase completes, Dictivo extends your update window on its own.",
          "The Renew updates button appears only when Dictivo could load the renewal address from app.dictivo.app. If you received a renewal key by email, paste it under Renewal or replacement key and click Activate renewal.",
        ],
        links: [["Prices and license terms", "/pricing/"]],
      },
      {
        title: "Updates and your network",
        paragraphs: [
          "Update checks and update downloads use downloads.dictivo.app. The renewal address comes from app.dictivo.app.",
          "If your network blocks downloads.dictivo.app, Dictivo keeps working, but it gets no update checks. To update, download the new installer from dictivo.app on a network that allows it, and run it. Speech models then download from huggingface.co instead, or you can import a model file.",
        ],
        links: [["Every connection Dictivo makes", "/docs/connections/"]],
      },
    ],
    faqs: [
      [
        "Does Dictivo update itself?",
        "Yes. Dictivo checks for a new version about five seconds after launch and every 24 hours. It verifies each update before it installs it. Click Install and restart to update.",
      ],
      [
        `What happens after the ${months} months of updates?`,
        "The version you have keeps working. Newer versions are not offered until you renew, and Dictivo tells you when one exists. Renewal is optional.",
      ],
      [
        "Do I lose anything if I do not renew?",
        "No. Your license, the local models you downloaded, your settings and your history stay. You only stop receiving versions published after your update window ends.",
      ],
      [
        "Does the free Tiny model get updates?",
        `Yes. An install without a Local license, on the free Tiny model or during the ${trialDays}-day trial, is offered every new version. The ${months}-month update window applies only to a Local license.`,
      ],
      [
        "Can I turn off update checks?",
        `Dictivo ${DOCS_CHECKED_VERSION} has no setting for this. If your network blocks downloads.dictivo.app, the checks fail without an error and Dictivo keeps working. You then install new versions by hand.`,
      ],
    ],
    references: [
      ["Dictivo pricing and license terms", "https://dictivo.app/pricing/"],
      ["Dictivo terms of service", "https://dictivo.app/terms/"],
      ["Dictivo security: update verification", "https://dictivo.app/security/#updates"],
      ["Dictivo changelog", "https://dictivo.app/changelog/"],
      [docsCheckedLabel("Dictivo Homebrew tap"), "https://github.com/deepviewsdev/homebrew-tap"],
    ],
  };
}
