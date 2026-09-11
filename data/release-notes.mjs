export const RELEASE_NOTES = Object.freeze({
  "0.3.47": Object.freeze({
    title: "A clearer first dictation test, with time to finish speaking.",
    bullets: Object.freeze([
      "The first-run test now follows your chosen toggle or hold-to-talk shortcut instead of stopping after 2.5 seconds. A Stop test button and a 30-second limit keep you in control.",
      "An empty transcript no longer counts as a successful test. Microphone, model and shortcut problems have separate recovery instructions.",
      "Retrying, skipping or leaving the test now closes its microphone session, including when a permission request finishes late.",
    ]),
  }),
  "0.3.46": Object.freeze({
    title: "A heads-up before your update window closes, in your language.",
    bullets: Object.freeze([
      "Thirty days before the 12-month update window ends, Account & Billing says so and offers the renewal; after it ends, it says that too. Your version keeps working either way.",
      "The Local side of Account & Billing is now in all ten display languages, not English behind a translated menu.",
      "A renewed licence is shown as Dictivo Local (renewed). One price surface on the Cloud Fast screen instead of three.",
    ]),
  }),
  "0.3.45": Object.freeze({
    title: "Renewals can be bought, and they activate themselves.",
    bullets: Object.freeze([
      "The $24/year renewal exists now. When your update window has ended, Renew opens the checkout and the new key extends the window on this device automatically.",
      "A renewal or replacement key that arrives by email can be entered under Account & Billing without removing the saved licence first.",
    ]),
  }),
  "0.3.44": Object.freeze({
    title: "Buying Dictivo Local now finishes inside the app.",
    bullets: Object.freeze([
      "A Dictivo Local purchase activates on this device by itself once the checkout completes, the way a Cloud Fast subscription already did. The emailed key still works as a fallback.",
      "The trial banner and Account & Billing show the Local price, and the purchase comes first on that screen, with key entry kept underneath for people who already have one.",
      "First run offers \"Enter your license key\" for anyone who bought on the website before installing.",
      "The renewal buttons that led nowhere are gone until renewals can actually be bought; the update notice no longer quotes a price it cannot sell.",
    ]),
  }),
  "0.3.43": Object.freeze({
    title: "A lapsed subscription can be bought again from inside the app.",
    bullets: Object.freeze([
      "When a Cloud Fast subscription lapses, Dictivo now says so plainly and offers \"Subscribe again\"; the new checkout activates on this device automatically.",
      "A device-limit or network problem is no longer mistaken for a lapsed subscription, so paying customers are not asked to pay twice.",
      "The server stopped quoting a price at people who have already paid.",
    ]),
  }),
  "0.3.40": Object.freeze({
    title: "Hotkeys recover on their own, and the free tiers stop running out in silence.",
    bullets: Object.freeze([
      "A dictation shortcut that failed to register used to stay broken until you restarted Dictivo. It now retries by itself, tries again whenever you come back to the window, and offers a Try again button.",
      "When a shortcut cannot be reserved, Dictivo now tells you what actually went wrong instead of assuming another app is holding it.",
      "The 14-day trial of the larger local models no longer ends without saying so, and the free Cloud Fast minutes are visible while they last.",
      "Cloud Fast requests now go through the app itself rather than the embedded browser, which makes them survive network changes more reliably.",
    ]),
  }),
  "0.3.39": Object.freeze({
    title: "Reliable Windows hotkeys and more resilient Cloud Fast transcription.",
    bullets: Object.freeze([
      "Fixed a Windows issue that could report every global shortcut as unavailable and prevent dictation from starting, especially when another Dictivo process or overlapping shortcut registration was involved.",
      "Dictivo now keeps a single desktop instance and applies shortcut changes in order, so one optional shortcut failure no longer disables the main dictation shortcut.",
      "Cloud Fast now has a more resilient fallback path for long recordings, including longer asynchronous processing on the final fallback instead of failing at the old short timeout.",
      "Automatic language detection remains enabled. The Cloud Fast reliability changes apply to both Mac and Windows without a desktop update; the Windows hotkey fix requires version 0.3.39.",
    ]),
  }),
});

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
