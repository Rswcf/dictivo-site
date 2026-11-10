import { LOCAL_OFFER } from "./local-offer.mjs";

// Docs page L (Batch B2): what one Dictivo Local license covers, activation without an account, how
// devices are counted and moved, reinstall and the system keychain, the trial, and refunds. Every
// fact comes from the desktop app at tag v0.3.57 (DOCS_CHECKED_VERSION) or from a page the site
// already publishes:
// - what the license includes, devices, commercial use, no account, platforms: data/local-offer.mjs,
//   data/local-offer-copy.mjs (pricingFaqs), data/pricing-page.mjs, data/trust-pages.mjs (terms);
// - Cloud Fast is a separate license that never unlocks Local: license.rs local_license_unlocks_paid_models;
// - activation, the license host and what it receives: license.rs (activate/validate/deactivate URLs),
//   displayLanguage.ts Connections row 4. The app labels the activation "Dictivo on <platform>"
//   (SettingsView.tsx handleActivate, App.tsx localInstanceName), so the page says "a short device
//   label" rather than "computer name";
// - the same key on the same device spends no activation: license.rs activate_license_in_slot;
// - the activation link: deepLink.ts; the in-app purchase claim activates on its own: App.tsx;
// - the device limit message and the remove button: license.rs friendly_activation_error,
//   displayLanguage.ts removeLicense; removal is best-effort remote, always local:
//   license.rs deactivate_license_in_slot; removing does not refund: displayLanguage.ts localNote;
// - files, data folder and keychain copies: license.rs dictivo_data_dir, credential_store.rs,
//   displayLanguage.ts storage rows; restore without a new activation: lib.rs setup;
// - the trial starts with a local file write and has a keychain copy: license.rs ensure_local_trial_started;
// - refunds: data/trust-pages.mjs (refund); a disabled key and the status check: license.rs
//   friendly_activation_error, refresh_license_in_slot, local_license_unlocks_paid_models_from_license.
// The Local price is the page's one price, a token in "What you buy".
export const DOCS_LICENSE_LASTMOD = "2026-11-10";

const devices = LOCAL_OFFER.personalDevices;
const months = LOCAL_OFFER.includedUpdateMonths;
const trialDays = LOCAL_OFFER.trialDays;

export function docsLicenseCopy({ windows }) {
  const platforms = windows
    ? "One license key activates Dictivo on macOS and Windows x64"
    : "One license key activates Dictivo on macOS; Windows downloads are temporarily unavailable";
  return {
    ready: true,
    slug: "license-and-devices",
    route: "docs/license-and-devices",
    idPrefix: "docs-license",
    mainId: "docs-license",
    navLabel: "License and devices",
    metaTitle: `Dictivo License and Devices: One Purchase, Up to ${devices} Devices`,
    metaDescription: `How a Dictivo Local license works: one purchase for Mac and Windows x64, up to ${devices} personal devices, key activation with no account, device removal and refunds.`,
    llmsQuestion: "How many devices can one Dictivo Local license run on, and how do I move it?",
    summary: "What one Local license covers, how activation works without an account, and how to move the license to another device.",
    lastmod: DOCS_LICENSE_LASTMOD,
    title: "Dictivo license and devices: what one purchase covers",
    lede: "Reference facts about the Dictivo Local license: what one purchase covers, how activation works without an account, how devices are counted, and what happens after a reinstall or a refund.",
    answer: `Dictivo Local is a one-time purchase, and the version you buy keeps working. ${platforms}, on up to ${devices} personal devices. You activate it with the key from your purchase email; there is no Dictivo account. The license includes ${months} months of updates, then renewal is optional. Every purchase has a 14-day refund.`,
    answerLinks: [
      ["Prices and what the license includes", "/pricing/"],
      ["Terms of service", "/terms/"],
    ],
    about: ["Dictivo Local license", "license devices", "license activation", "one-time purchase"],
    quickReference: undefined,
    wide: false,
    showTrial: false,
    trialSource: undefined,
    sections: [
      {
        title: "What you buy",
        paragraphs: [
          `A Dictivo Local license costs {{price.local.inline}} once. It unlocks every local model and includes ${months} months of app updates and new local models.`,
          `The version you buy keeps working after the ${months} months. Renewing updates is optional.`,
          "You may use the license for personal, professional and commercial work.",
          windows
            ? "One license covers both desktop platforms, macOS and Windows x64. There is no Windows build for ARM processors."
            : "The license covers the Mac app. Windows downloads are temporarily unavailable.",
          "Cloud Fast is a separate, optional monthly add-on with its own license key. A Local license does not include Cloud Fast, and a Cloud Fast license does not unlock the local models.",
        ],
        links: [["Prices and license terms", "/pricing/"]],
      },
      {
        title: "Activation",
        paragraphs: ["You activate Dictivo Local with the license key from your purchase email. You do not create a Dictivo account."],
        steps: [
          "Buy Dictivo Local. Checkout opens in your browser.",
          "Open the purchase email and copy the license key.",
          "In Dictivo, open Settings › Account & Billing.",
          "Paste the key into the License key field and click Activate.",
        ],
        notes: [
          "A link that starts with dictivo://activate?key= opens Dictivo with your key filled in. Check the key and click Activate.",
          "If you start the purchase from inside Dictivo, the app receives the key after checkout and activates it on its own.",
          "Activation sends your license key and a short device label that Dictivo creates to the license service at api.lemonsqueezy.com. It sends no audio and no transcripts.",
        ],
        links: [["Every connection Dictivo makes", "/docs/connections/"]],
      },
      {
        title: "Devices",
        paragraphs: [
          `One Local license runs on up to ${devices} personal devices. Each activation on a new device uses one of the ${devices}.${windows ? " A Mac and a Windows PC count the same way." : ""}`,
          "If you activate the key again on a device where it is already active, Dictivo does not use another device.",
          "To move the license to a new computer:",
        ],
        steps: [
          "On the old computer, open Settings › Account & Billing.",
          "Click Remove license from this device. Do this while the computer is online, so the license service can free the device.",
          "On the new computer, activate the key with the steps above.",
        ],
        notes: [
          `When the key is already active on ${devices} devices, activation fails. Dictivo then tells you to click Remove license from this device on one of your other devices, or to email support for a device you no longer have.`,
          "If the old computer is lost or broken, email support@dictivo.app with your purchase email. Support can free that device for you.",
          "Removing the license from a device does not refund the purchase.",
        ],
      },
      {
        title: "Reinstall and the system keychain",
        paragraphs: [
          "Dictivo stores your license on your device, in the Dictivo data folder. The folder holds license.json for Dictivo Local, cloud-fast-license.json for Cloud Fast, trial.json for the trial and device-id.json for the device id.",
        ],
        bullets: [
          { html: "On a Mac: <code>~/Library/Application Support/Dictivo</code>" },
          ...(windows ? [{ html: "On Windows: <code>%LOCALAPPDATA%\\Dictivo</code>" }] : []),
          windows
            ? "Backup copies: in Keychain on a Mac, as items named com.dictivo.desktop; in Credential Manager on Windows, as entries that contain com.dictivo.desktop."
            : "Backup copies: in Keychain, as items named com.dictivo.desktop.",
        ],
        notes: [
          `When you reinstall Dictivo, or the data folder is gone, Dictivo restores the license from the keychain copy at launch. It then checks the license once with the license service. This check does not use one of your ${devices} devices.`,
          "Dictivo does not check the license on every launch. It checks when you activate, refresh or remove the license, and once after a restore.",
          "The keychain copies stay when you delete the folders. To remove every copy, quit Dictivo, delete the folders, then delete the keychain items. While the files exist, Dictivo writes the copies again at the next launch.",
        ],
        links: [["Install and uninstall Dictivo", "/docs/install-and-uninstall/"]],
      },
      {
        title: "Trial and the free model",
        paragraphs: [
          `Every new install gets a ${trialDays}-day trial of Dictivo Local with every local model. The trial needs no card and no Dictivo account.`,
          "The trial starts the first time you set up or use Local dictation. Dictivo starts it by writing a file on your device, so starting it needs no network connection.",
          "The trial record also has a keychain copy, so a reinstall does not start a new trial.",
          "When the trial ends, Dictivo keeps working with the Tiny model. Tiny is free forever. New installs also get 10 free Cloud Fast minutes on that device.",
        ],
        links: [["Try your first dictation with the trial", "/guides/first-local-dictation/"]],
      },
      {
        title: "Refunds and disabled licenses",
        paragraphs: [
          "Every Dictivo Local purchase has a 14-day refund. Email support@dictivo.app with your purchase email and order reference.",
          "A refunded license may be disabled and should no longer be used. A disabled key cannot be activated again; Dictivo says that the license has been disabled.",
          "On a device where the license is already active, Dictivo stops unlocking the paid local models after the next license check that reaches the license service, for example when you click Refresh license. The Tiny model stays free.",
        ],
        links: [["Refund policy", "/refund/"]],
      },
    ],
    faqs: [
      [
        "Do I need a Dictivo account?",
        "No. You activate Dictivo Local with the license key from your purchase email. Local mode never asks you to log in.",
      ],
      [
        "Does one license cover Mac and Windows?",
        windows
          ? `Yes. One Dictivo Local license key works on macOS and on Windows x64. Each computer uses one of your ${devices} devices.`
          : "One license covers the Mac app. Windows downloads are temporarily unavailable.",
      ],
      [
        "How do I move the license to a new computer?",
        "On the old computer, open Settings › Account & Billing and click Remove license from this device. Then activate the key on the new computer. If the old computer is gone, email support@dictivo.app.",
      ],
      [
        'What does "maximum number of devices" mean?',
        `Your key is already active on ${devices} devices. Remove the license from one of them, or ask support to free a device you no longer have. Then activate again.`,
      ],
      [
        "Is the license a subscription?",
        `No. Dictivo Local is a one-time purchase. The version you buy keeps working, and after the ${months} included months, renewing updates is optional. Cloud Fast is the only monthly option, a separate add-on.`,
      ],
      [
        "Does a refund disable the license?",
        "It may. A refunded license may be disabled and should no longer be used. A disabled key cannot be activated, and Dictivo stops unlocking the paid local models after the next license check. The Tiny model stays free.",
      ],
    ],
    references: [
      ["Dictivo pricing and license terms", "https://dictivo.app/pricing/"],
      ["Dictivo terms of service", "https://dictivo.app/terms/"],
      ["Dictivo refund policy", "https://dictivo.app/refund/"],
      ["Dictivo privacy policy: purchases, licenses and support", "https://dictivo.app/privacy/"],
    ],
  };
}
