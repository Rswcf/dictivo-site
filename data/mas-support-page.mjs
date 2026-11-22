/**
 * Support page for the Mac App Store edition of Dictivo, at /support/mac-app-store/.
 *
 * App Store Connect carries this exact URL as the app's Support URL, so it never moves. App Review
 * opens it, and Guideline 3.1.1(a) forbids links that lead to other ways to buy. The page is
 * therefore bare, like /privacy/mac-app-store/: renderMasSupportPage() in scripts/generate-site.mjs
 * writes its own <head>, no shared header or footer, no script, and no link to any other
 * dictivo.app page except that plain privacy page. It is noindex, outside the sitemap and
 * llms.txt, and unlinked until the App Store edition is released (docs/site-history.md,
 * 2026-11-22). tests/facts/mas-support-page.test.mjs pins every sentence.
 *
 * Inline markup in the text: `path` becomes <code>, [label](url) becomes a link, and
 * support@dictivo.app becomes a mailto link. A `qa` block is a list of questions, each in <strong>,
 * followed by its answer. The renderer accepts only the link targets in MAS_SUPPORT_LINKS.
 */

/** Drives the visible "Last updated" stamp. Bump it when the support text changes. */
export const MAS_SUPPORT_LASTMOD = "2026-11-22";

export const MAS_SUPPORT_PATH = "/support/mac-app-store/";

/** The only link targets the page body may carry. */
export const MAS_SUPPORT_LINKS = Object.freeze(["mailto:support@dictivo.app", "https://reportaproblem.apple.com/", "/privacy/mac-app-store/"]);

export const MAS_SUPPORT_PAGE = Object.freeze({
  title: "Support for Dictivo from the Mac App Store",
  metaDescription: "Help for the Mac App Store edition of Dictivo: contact, purchases, refunds and common questions.",
  intro: "This page is for the edition of Dictivo that you install from the Mac App Store.",
  sections: [
    {
      title: "Contact",
      blocks: [
        { p: "Write to support@dictivo.app. Tell us your macOS version and what you did before the problem appeared." },
      ],
    },
    {
      title: "Purchases",
      blocks: [
        { p: "The 7-day Trial and Dictivo Local are App Store purchases. Apple processes them." },
        { p: "To get a purchase back on a new Mac or after you reinstall Dictivo, open Settings › Purchases in Dictivo and click Restore Purchases. Sign in to the App Store with the Apple Account that made the purchase." },
        { p: "Purchases need an internet connection. If Dictivo cannot reach the App Store, try again later. The Tiny model works without a purchase." },
      ],
    },
    {
      title: "Refunds",
      blocks: [
        { p: "Apple handles refunds for App Store purchases. Ask for one at [reportaproblem.apple.com](https://reportaproblem.apple.com/). We cannot refund an App Store purchase ourselves." },
      ],
    },
    {
      title: "Common questions",
      blocks: [
        {
          qa: [
            { q: "Dictivo does not hear me.", a: "Open System Settings › Privacy & Security › Microphone and turn on Dictivo." },
            { q: "The text does not appear in my other app.", a: "This edition puts each transcript on the clipboard. Press ⌘V to paste it." },
            { q: "A speech model does not download.", a: "Models are between about 75 MB and about 3.1 GB. Check your internet connection and your free disk space, then start the download again in Settings › Engine." },
            { q: "How do I remove Dictivo and its data?", a: "Delete Dictivo from the Applications folder. To remove its data as well, delete the folder `~/Library/Containers/com.dictivo.mac`." },
          ],
        },
      ],
    },
    {
      title: "Requirements",
      blocks: [{ p: "macOS 13.3 or later. Apple silicon or Intel." }],
    },
    {
      title: "Privacy",
      blocks: [{ p: "Read the [privacy policy for this edition](/privacy/mac-app-store/)." }],
    },
    {
      title: "This page",
      blocks: [{ p: "This page runs no scripts." }],
    },
  ],
});
