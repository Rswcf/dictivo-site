export const RELEASE_NOTES = Object.freeze({
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
