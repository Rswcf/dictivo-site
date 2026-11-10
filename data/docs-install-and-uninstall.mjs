import { LOCAL_OFFER } from "./local-offer.mjs";
import { docsCheckedLabel } from "./docs-shared.mjs";

// Docs page I (Batch B2): install Dictivo from the disk image, with Homebrew or from the Windows EXE
// or MSI, and remove it again, including what stays behind. Every fact comes from the desktop app
// at tag v0.3.57 (DOCS_CHECKED_VERSION), the Homebrew tap, or a page the site already publishes:
// - Mac build: release-desktop.yml (universal, Developer ID signed, notarized); site README
//   "Download hosting"; install steps: data/first-dictation-guide.mjs;
// - Start at login needs the app in Applications: autostart.rs NeedsApplicationsFolder and
//   displayLanguage.ts launchAtLogin.needsApplicationsFolder;
// - Homebrew: the tap's Casks/dictivo.rb (url on downloads.dictivo.app, sha256, auto_updates,
//   uninstall quit, the five zap folders) and README (install, upgrade, uninstall, --zap);
//   tap trust: docs.brew.sh/Tap-Trust; the zap stanza: docs.brew.sh/Cask-Cookbook;
// - Windows build: release-desktop.yml (x86_64-pc-windows-msvc, --bundles nsis,msi, no
//   Authenticode step; latest.json windows-x86_64 points at the NSIS EXE), tauri.conf.json
//   nsis.installMode currentUser; no ARM build: README "Download hosting";
//   MSI is not a bypass: data/windows-installer-help.mjs;
// - Windows uninstaller: windows/hooks.nsh (Start at login entry and its Startup apps switch);
//   Windows Settings path: Microsoft's help page in references;
// - what stays: displayLanguage.ts privacy.storage rows and credentialStore labels,
//   credential_store.rs (service com.dictivo.desktop), license.rs dictivo_data_dir
//   (data_local_dir/Dictivo), private_fast.rs (the older ~/.dictivo/private-fast root);
// - the seat: license.rs device-limit message, displayLanguage.ts removeLicense;
// - after installing: data/first-dictation-guide.mjs, LOCAL_OFFER.trialDays.
// Decision 4 (founder) is open: the page names no uninstaller data option and no Windows
// settings-storage path beyond the identifier.
export const DOCS_INSTALL_LASTMOD = "2026-11-10";

const ZAP_FOLDERS = [
  "~/Library/Application Support/com.dictivo.desktop",
  "~/Library/Application Support/Dictivo",
  "~/Library/Caches/com.dictivo.desktop",
  "~/Library/Preferences/com.dictivo.desktop.plist",
  "~/Library/WebKit/com.dictivo.desktop",
];

export function docsInstallCopy({ windows }) {
  const devices = LOCAL_OFFER.personalDevices;
  const trialDays = LOCAL_OFFER.trialDays;
  const windowsAnswer = windows
    ? "On Windows x64, run the EXE or the MSI; the installer is not Authenticode-signed."
    : "Windows downloads are temporarily unavailable.";
  const windowsIntro = windows
    ? "The Windows download is an x64 installer, as an EXE or an MSI. There is no ARM build."
    : "Windows downloads are temporarily unavailable. When they are available, the Windows download is an x64 installer, as an EXE or an MSI. There is no ARM build.";
  return {
    ready: true,
    slug: "install-and-uninstall",
    route: "docs/install-and-uninstall",
    idPrefix: "docs-install",
    mainId: "docs-install",
    navLabel: "Install and uninstall",
    metaTitle: "Install and Uninstall Dictivo: DMG, Homebrew, EXE and MSI",
    metaDescription: "Install Dictivo on a Mac from the DMG or with Homebrew (brew install --cask deepviewsdev/tap/dictivo), on Windows x64 from the EXE or MSI, and remove it again.",
    llmsQuestion: "How do I install or uninstall Dictivo, including with Homebrew?",
    summary: "How to install Dictivo from the disk image, with Homebrew, or from the Windows EXE or MSI, and how to remove it.",
    lastmod: DOCS_INSTALL_LASTMOD,
    title: "Install and uninstall Dictivo on Mac and Windows",
    lede: "Reference facts about the ways to install the Dictivo desktop app, how each one gets updates, and how to remove the app and the data it leaves behind.",
    answer: `On a Mac, install Dictivo from the disk image or with brew install --cask deepviewsdev/tap/dictivo. Both give the same signed and notarized app. ${windowsAnswer} To uninstall, move the app to the Trash or use Homebrew; on Windows, use Settings › Apps. Your settings, license files and models stay until you delete them.`,
    answerLinks: [
      ["Windows installer warnings", "/guides/windows-installer-blocked/"],
      ["Set up your first local dictation", "/guides/first-local-dictation/"],
    ],
    about: ["install Dictivo", "Dictivo Homebrew cask", "uninstall Dictivo", "Dictivo Windows installer"],
    quickReference: {
      title: "Install paths at a glance",
      caption: "The four ways to install Dictivo and how each one gets updates",
      headers: ["Path", "Command or file", "Updates"],
      rows: [
        ["Mac disk image", { html: "<code>Dictivo_&lt;version&gt;_universal.dmg</code> from dictivo.app" }, "The app updates itself."],
        ["Homebrew cask", { html: "The cask <code>deepviewsdev/tap/dictivo</code>" }, "The app updates itself. A Homebrew upgrade also works."],
        ["Windows EXE (per-user)", { html: "The <code>.exe</code> installer from dictivo.app" }, "The app updates itself with the EXE installer."],
        ["Windows MSI", { html: "The <code>.msi</code> installer from dictivo.app" }, "In-app updates use the EXE installer."],
      ],
    },
    wide: false,
    showTrial: true,
    trialSource: "docs_install",
    sections: [
      {
        title: "Mac: disk image",
        paragraphs: [
          "The Mac download is one universal app for Apple Silicon and Intel Macs. It is signed with an Apple Developer ID and notarized by Apple.",
          "To install it:",
        ],
        steps: [
          "Download Dictivo for Mac from dictivo.app.",
          "Open the downloaded disk image (DMG).",
          "Drag Dictivo into Applications.",
          "Open Dictivo from Applications, not from the disk image.",
        ],
        notes: [
          "Start at login needs Dictivo in Applications. If you turn it on while Dictivo runs from the disk image, the app asks you to move it to Applications first.",
        ],
        links: [
          ["How the installers are signed", "/security/#installer-integrity"],
          ["System requirements", "/docs/system-requirements/"],
        ],
      },
      {
        title: "Mac: Homebrew",
        paragraphs: [
          "Dictivo has its own Homebrew tap. The cask installs the same signed and notarized universal disk image as the download button on dictivo.app. It downloads the file from downloads.dictivo.app and checks its SHA-256 checksum.",
          "To install it:",
        ],
        steps: [
          "Open Terminal.",
          { html: "Run <code>brew install --cask deepviewsdev/tap/dictivo</code>." },
          "Open Dictivo from Applications.",
        ],
        notes: [
          "Homebrew 6 and later trust a third-party tap only when you ask. Installing by the full name above trusts only this cask, not the whole tap.",
          "Dictivo updates itself, also after a Homebrew install. Running brew upgrade --cask dictivo also works.",
        ],
        links: [["The Dictivo Homebrew tap", "https://github.com/deepviewsdev/homebrew-tap"]],
      },
      {
        title: "Windows: EXE or MSI",
        paragraphs: [
          windowsIntro,
          "The installer is not Authenticode-signed. SmartScreen or Microsoft Edge may warn before you run it.",
          "To install it:",
        ],
        steps: [
          "Download the Windows EXE from dictivo.app.",
          "Run it. The EXE installs Dictivo for your user account only.",
          "Open Dictivo.",
        ],
        notes: [
          "The MSI is an alternative installation format. It is not a way around a Windows warning or block. In-app updates install the EXE version.",
          "If Windows warns about the installer or blocks it, use the Windows installation guide. It explains each warning and what to check before you decide.",
        ],
        links: [["Windows installer warnings and blocks", "/guides/windows-installer-blocked/"]],
      },
      {
        title: "After installing",
        paragraphs: [
          `Open Dictivo and choose Set up Local. This starts the ${trialDays}-day Local trial, with no account and no card.`,
          "Dictivo recommends a speech model for your hardware. Choose Download & set up. The first model download needs an internet connection.",
          "On a Mac, allow the microphone when macOS asks. Accessibility and Auto paste let Dictivo paste the transcript into other apps.",
        ],
        links: [
          ["The macOS permissions Dictivo asks for", "/docs/macos-permissions/"],
          ["Set up your first local dictation", "/guides/first-local-dictation/"],
        ],
      },
      {
        title: "Uninstall on a Mac",
        paragraphs: [
          "Removing the app leaves your settings, license files, history and downloaded models on the Mac. They are in these folders:",
        ],
        bullets: [
          ...ZAP_FOLDERS.map((folder) => ({ html: `<code>${folder}</code>` })),
          { html: "An older install may also have <code>~/.dictivo/private-fast</code>." },
        ],
        steps: [
          `Optional: in Settings › Account & Billing, click Remove license from this device. This frees one of your ${devices} device activations.`,
          "Quit Dictivo.",
          { html: "Drag Dictivo from Applications to the Trash. If you installed it with Homebrew, run <code>brew uninstall --cask dictivo</code> instead." },
          { html: "To remove the folders above too: with Homebrew, run <code>brew uninstall --zap --cask dictivo</code>. It removes the app and moves the five folders to the Trash. Without Homebrew, delete the folders in Finder." },
          "Open Keychain Access, search for com.dictivo.desktop and delete the items it finds.",
        ],
        notes: [
          "The Keychain items named com.dictivo.desktop hold backup copies of your licenses, the trial record and this device's id, so a reinstall can restore them. Homebrew's zap does not remove them. Delete the folders first: while the files exist, Dictivo writes the copies again at the next launch.",
          "Settings › Privacy › Where your data lives on this device lists the folders Dictivo uses on your Mac.",
        ],
      },
      {
        title: "Uninstall on Windows",
        paragraphs: [
          "Uninstalling removes the app. Your data stays in these places until you delete it:",
        ],
        bullets: [
          { html: "<code>%LOCALAPPDATA%\\Dictivo</code>: license files, the trial record, this device's id, history and downloaded models." },
          { html: "The interface settings, stored under the app's identifier <code>com.dictivo.desktop</code> in your user's app-data folder." },
          { html: "Credential Manager › Windows Credentials: entries containing <code>com.dictivo.desktop</code>, backup copies of your licenses, the trial record and this device's id." },
        ],
        steps: [
          `Optional: in Settings › Account & Billing, click Remove license from this device. This frees one of your ${devices} device activations.`,
          "Quit Dictivo.",
          "Open Start › Settings › Apps › Installed apps.",
          "Find Dictivo, click More (…), then Uninstall.",
          "To leave nothing behind, delete the Dictivo folder and the com.dictivo.desktop settings folder, then remove the Credential Manager entries.",
        ],
        notes: [
          "If you installed with the EXE, its uninstaller also removes Dictivo's Start at login entry and its switch in Startup apps.",
          "Settings › Privacy › Where your data lives on this device lists the folders Dictivo uses on your computer.",
        ],
      },
    ],
    faqs: [
      [
        "Is the Homebrew version the same app as the download?",
        "Yes. The cask downloads the same universal disk image from downloads.dictivo.app and checks its SHA-256 checksum. It is the same signed and notarized app.",
      ],
      [
        "Does Homebrew update Dictivo?",
        "Dictivo updates itself, also after a Homebrew install, and the cask says so. A Homebrew upgrade also works.",
      ],
      [
        "Why does Windows warn about the installer?",
        "The Dictivo installer for Windows is not Authenticode-signed. SmartScreen or Microsoft Edge may warn about a file without that signature. The Windows installation guide explains each warning.",
      ],
      [
        "Should I use the MSI or the EXE?",
        "Use the EXE unless you need an MSI. The EXE installs for your user account, and in-app updates use it. The MSI is an alternative format, not a way around a Windows warning or block.",
      ],
      [
        "What does brew uninstall --zap remove, and what stays?",
        "It removes the app and moves five Dictivo folders in ~/Library to the Trash: settings, caches, license files, history and downloaded models. The Keychain items named com.dictivo.desktop stay. Delete them in Keychain Access after the folders.",
      ],
      [
        "Does uninstalling free my license seat?",
        "No. Before you uninstall, click Remove license from this device in Settings › Account & Billing. If you no longer have the device, email support@dictivo.app to release the seat.",
      ],
    ],
    references: [
      [docsCheckedLabel("Dictivo Homebrew tap"), "https://github.com/deepviewsdev/homebrew-tap"],
      [docsCheckedLabel("Homebrew Cask Cookbook: the zap stanza"), "https://docs.brew.sh/Cask-Cookbook#stanza-zap"],
      [docsCheckedLabel("Homebrew: Tap Trust"), "https://docs.brew.sh/Tap-Trust"],
      [docsCheckedLabel("Microsoft: Uninstall or remove apps and programs in Windows"), "https://support.microsoft.com/en-us/windows/uninstall-or-remove-apps-and-programs-in-windows-4b55f974-2cc6-2d2b-d092-5905080eaf98"],
      ["Dictivo: Windows installer warnings and blocks", "https://dictivo.app/guides/windows-installer-blocked/"],
      ["Dictivo security: installer integrity", "https://dictivo.app/security/#installer-integrity"],
      ["Dictivo: your first local dictation", "https://dictivo.app/guides/first-local-dictation/"],
    ],
  };
}
