export const RELEASE_NOTES = Object.freeze({
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
