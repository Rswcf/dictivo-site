/**
 * Privacy policy for the Mac App Store edition of Dictivo, at /privacy/mac-app-store/.
 *
 * The App Store app links to this exact URL, so it never moves. App Review opens it, and
 * Guideline 3.1.1(a) forbids links that lead to other ways to buy. The page is therefore bare:
 * renderMasPrivacyPage() in scripts/generate-site.mjs writes its own <head>, no shared header or
 * footer, no script, and no link to any other dictivo.app page. It is noindex, outside the sitemap
 * and llms.txt, and linked only from /support/mac-app-store/ until the App Store edition is released (docs/site-history.md,
 * 2026-11-22). tests/facts/mas-privacy-page.test.mjs pins every sentence.
 *
 * Inline markup in the text: `host` becomes <code>, [label](url) becomes a link, and
 * support@dictivo.app becomes a mailto link. The renderer accepts only the link targets in
 * MAS_PRIVACY_LINKS.
 */

/** Drives the visible "Last updated" stamp. Bump it when the policy text changes. */
export const MAS_PRIVACY_LASTMOD = "2026-11-22";

export const MAS_PRIVACY_PATH = "/privacy/mac-app-store/";

/** The only link targets the page body may carry. */
export const MAS_PRIVACY_LINKS = Object.freeze(["mailto:support@dictivo.app", "https://www.apple.com/legal/privacy/"]);

export const MAS_PRIVACY_PAGE = Object.freeze({
  title: "Privacy Policy for Dictivo from the Mac App Store",
  metaDescription: "How the Mac App Store edition of Dictivo handles your audio, transcripts and purchases.",
  intro: "This policy covers the edition of Dictivo that you install from the Mac App Store. It covers no other edition of Dictivo.",
  sections: [
    {
      title: "What stays on your Mac",
      blocks: [
        { p: "Dictivo transcribes on your Mac. Your audio and your transcripts never leave it." },
        { p: "Your history, dictionary terms, snippets, settings and speech models are stored on your Mac. You can delete your history in the app." },
        { p: "Dictivo needs no account." },
      ],
    },
    {
      title: "What Dictivo sends over the network",
      blocks: [
        { p: "Dictivo goes online for two things only:" },
        {
          ul: [
            "To download the speech models you choose, from `downloads.dictivo.app` or `huggingface.co`. As with every download, the server sees your IP address and the file you ask for. The request carries no audio, no transcript, and no identifier of you or of your Mac.",
            "For App Store purchases, which macOS and Apple handle.",
          ],
        },
        { p: "Dictivo sends no usage statistics. It contains no advertising." },
      ],
    },
    {
      title: "Purchases",
      blocks: [
        {
          p: "Apple processes the 7-day trial, the purchase of Dictivo Local, and restores. We do not receive your name, your email address or your payment details. Apple reports sales to us as totals. If you chose in macOS to share analytics with app developers, Apple may also give us usage and crash reports that do not identify you. [Apple's privacy policy](https://www.apple.com/legal/privacy/) applies to the data that Apple holds.",
        },
      ],
    },
    {
      title: "Microphone and clipboard",
      blocks: [
        { p: "Dictivo asks for the microphone and for no other permission. It uses the microphone only when you start a recording." },
        { p: "Each transcript is placed on the clipboard, so you can paste it. It stays there until you copy something else. While it is there, other apps on your Mac can read it." },
      ],
    },
    {
      title: "Support",
      blocks: [
        { p: "If you write to support@dictivo.app, we use your message and your email address only to answer you." },
      ],
    },
    {
      title: "Contact and changes",
      blocks: [
        { p: "Send questions or requests about your data to support@dictivo.app. When this policy changes, we change the date at the top of this page." },
      ],
    },
    {
      title: "This page",
      blocks: [{ p: "This page runs no scripts." }],
    },
  ],
});
