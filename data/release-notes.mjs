export const RELEASE_NOTES = Object.freeze({
  "0.3.51": Object.freeze({
    date: "2026-09-26",
    title: "Lock Cloud Fast, so a stray click never sends a recording to the cloud.",
    bullets: Object.freeze([
      "New in Settings, Privacy: Lock Cloud Fast. While it is locked, Cloud Fast cannot be selected and no recording you start is uploaded. A Cloud Fast recording already in progress finishes as it began. Unlock it any time in the same place.",
      "The first time you choose Cloud Fast, Dictivo asks first and says where the audio goes. Nothing switches to Cloud Fast by itself any more: an activation link only fills in the key.",
      "The companion, the menu bar or tray and the main window show which engine the current recording uses, and which one the next recording will use.",
      "Settings, Privacy now says in plain words what leaves this computer, lists every connection Dictivo makes, and shows where your data is stored on this device.",
      "Trial reports, purchase confirmation and optional usage statistics now go to app.dictivo.app. Cloud Fast stays on api.dictivo.app.",
      "On Windows, Buy and Subscribe open the checkout in your browser again. Before, they could open the Documents folder instead.",
      "On Windows 11 24H2 and later, Dictivo reads the memory size of your computer again, so its model recommendation fits your hardware. If the speed choice under the microphone is missing after the update, choose Re-run setup once in Settings, Engine.",
      "Shorter lock messages, a tidier Privacy page, and German that addresses you formally throughout.",
    ]),
  }),
  "0.3.50": Object.freeze({
    date: "2026-09-23",
    title: "Your companion now follows you to every desktop and full-screen app.",
    bullets: Object.freeze([
      "On Mac, swipe between desktops or into a full-screen app and the floating companion comes along, including full-screen apps you open later. Clicking it leaves the keyboard with the app you are typing in.",
      "The companion reopens where you last dragged it. Before, it went back to where the drag started.",
      "On Mac, clicks on the transparent space around the animated companion reach the window underneath, and its long-press menu closes when you move the pointer away or start recording.",
      "Your own image now stays inside the round avatar frame. Photos fill it; cut-outs with a transparent background fit inside whole.",
    ]),
  }),
  "0.3.49": Object.freeze({
    date: "2026-09-20",
    title: "Meet 13 animated companions, each with a personality of their own.",
    bullets: Object.freeze([
      "Choose from six visual styles, including soft cartoons, pixel characters, minimal design, storybook illustration, handmade textures and people. Your companion reacts as you listen, process and finish a dictation.",
      "Set built-in motion to Quiet, Natural, Lively or Still. System reduced-motion preferences are respected, and offscreen companions pause their animation.",
      "Your custom image stays available under My image. Existing uploads and choices are preserved, images keep their full proportions, and animated GIFs retain their own animation. Switching to a built-in companion does not delete your upload.",
    ]),
  }),
  "0.3.48": Object.freeze({
    date: "2026-09-16",
    title: "Cloud Fast now quotes its current price.",
    bullets: Object.freeze([
      "When Cloud Fast needs a subscription, the message now shows the current monthly price from the Dictivo service instead of a price built into the app, so a price change never needs an app update.",
      "Prices on dictivo.app and in the app include tax, whichever country you buy from.",
    ]),
  }),
  "0.3.47": Object.freeze({
    date: "2026-09-11",
    title: "A clearer first dictation test, with time to finish speaking.",
    bullets: Object.freeze([
      "The first-run test now follows your chosen toggle or hold-to-talk shortcut instead of stopping after 2.5 seconds. A Stop test button and a 30-second limit keep you in control.",
      "An empty transcript no longer counts as a successful test. Microphone, model and shortcut problems have separate recovery instructions.",
      "Retrying, skipping or leaving the test now closes its microphone session, including when a permission request finishes late.",
    ]),
  }),
  "0.3.46": Object.freeze({
    date: "2026-09-10",
    title: "A heads-up before your update window closes, in your language.",
    bullets: Object.freeze([
      "Thirty days before the 12-month update window ends, Account & Billing says so and offers the renewal; after it ends, it says that too. Your version keeps working either way.",
      "The Local side of Account & Billing is now in all ten display languages, not English behind a translated menu.",
      "A renewed licence is shown as Dictivo Local (renewed). One price surface on the Cloud Fast screen instead of three.",
    ]),
  }),
  "0.3.45": Object.freeze({
    date: "2026-09-09",
    title: "Renewals can be bought, and they activate themselves.",
    bullets: Object.freeze([
      "The yearly update renewal can be bought now. When your update window has ended, Renew opens the checkout and the new key extends the window on this device automatically.",
      "A renewal or replacement key that arrives by email can be entered under Account & Billing without removing the saved licence first.",
    ]),
  }),
  "0.3.44": Object.freeze({
    date: "2026-09-09",
    title: "Buying Dictivo Local now finishes inside the app.",
    bullets: Object.freeze([
      "A Dictivo Local purchase activates on this device by itself once the checkout completes, the way a Cloud Fast subscription already did. The emailed key still works as a fallback.",
      "The trial banner and Account & Billing show the Local price, and the purchase comes first on that screen, with key entry kept underneath for people who already have one.",
      "First run offers \"Enter your license key\" for anyone who bought on the website before installing.",
      "The renewal buttons that led nowhere are gone until renewals can actually be bought; the update notice no longer quotes a price it cannot sell.",
    ]),
  }),
  "0.3.43": Object.freeze({
    date: "2026-09-08",
    title: "A lapsed subscription can be bought again from inside the app.",
    bullets: Object.freeze([
      "When a Cloud Fast subscription lapses, Dictivo now says so plainly and offers \"Subscribe again\"; the new checkout activates on this device automatically.",
      "A device-limit or network problem is no longer mistaken for a lapsed subscription, so paying customers are not asked to pay twice.",
      "The server stopped quoting a price at people who have already paid.",
    ]),
  }),
  "0.3.40": Object.freeze({
    date: "2026-08-21",
    title: "Hotkeys recover on their own, and the free tiers stop running out in silence.",
    bullets: Object.freeze([
      "A dictation shortcut that failed to register used to stay broken until you restarted Dictivo. It now retries by itself, tries again whenever you come back to the window, and offers a Try again button.",
      "When a shortcut cannot be reserved, Dictivo now tells you what actually went wrong instead of assuming another app is holding it.",
      "The 14-day trial of the larger local models no longer ends without saying so, and the free Cloud Fast minutes are visible while they last.",
      "Cloud Fast requests now go through the app itself rather than the embedded browser, which makes them survive network changes more reliably.",
    ]),
  }),
  "0.3.39": Object.freeze({
    date: "2026-08-18",
    title: "Reliable Windows hotkeys and more resilient Cloud Fast transcription.",
    bullets: Object.freeze([
      "Fixed a Windows issue that could report every global shortcut as unavailable and prevent dictation from starting, especially when another Dictivo process or overlapping shortcut registration was involved.",
      "Dictivo now keeps a single desktop instance and applies shortcut changes in order, so one optional shortcut failure no longer disables the main dictation shortcut.",
      "Cloud Fast now has a more resilient fallback path for long recordings, including longer asynchronous processing on the final fallback instead of failing at the old short timeout.",
      "Automatic language detection remains enabled. The Cloud Fast reliability changes apply to both Mac and Windows without a desktop update; the Windows hotkey fix requires version 0.3.39.",
    ]),
  }),
});

// Public release dates are the GitHub release publication days.
const versionParts = (version) => version.split(".").map(Number);
const olderThan = (a, b) => {
  const [left, right] = [versionParts(a), versionParts(b)];
  const index = left.findIndex((part, i) => part !== right[i]);
  return index >= 0 && left[index] < right[index];
};

// Notes for releases before the current one, newest first. The current release is
// rendered separately by releaseNotesFor so it carries the download line.
export function earlierReleaseNotes(currentVersion) {
  return Object.entries(RELEASE_NOTES)
    .filter(([version]) => olderThan(version, currentVersion))
    .sort(([a], [b]) => (olderThan(a, b) ? 1 : -1))
    .map(([version, notes]) => ({ version, date: notes.date, title: notes.title, bullets: [...notes.bullets] }));
}

export function releaseNotesFor(version, hasWindowsRelease) {
  const known = RELEASE_NOTES[version];
  if (known) {
    return {
      title: known.title,
      bullets: [
        ...known.bullets,
        `Updated the public Mac${hasWindowsRelease ? " and Windows" : ""} download to the latest Dictivo build.`,
      ],
    };
  }

  return {
    title: "New Dictivo release.",
    bullets: [
      `Updated the public Mac${hasWindowsRelease ? " and Windows" : ""} download to version ${version}.`,
      "Detailed release notes are pending. This generic entry is shown so a new release never inherits change details from an older version.",
    ],
  };
}
