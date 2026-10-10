// schema.org datePublished for guides, comparison pages and the two /privacy/ sub-pages.
// Each date is the first commit that published the route in this repository
// (`git log --reverse -S'<slug>'`, cross-checked with `git log --diff-filter=A -- <data file>`).
// A deploy can follow its commit by a day or more, so treat these as a proxy for the
// publication date. They never move: the "Last updated" constants drive dateModified.
export const FIRST_PUBLISHED = Object.freeze({
  "guides/offline-dictation-on-mac": "2026-06-07", // b431ef4, all ten languages
  "guides/best-speech-to-text-apps-for-mac": "2026-06-07", // 330ab94
  "guides/mac-dictation-benchmark-method": "2026-06-07", // 75c3ee6
  "guides/offline-dictation-on-windows": "2026-07-12", // 79e0da2
  "guides/first-local-dictation": "2026-09-10", // 8d9f594, English and Japanese
  // Per language for routes whose translations ship separately; a language missing here is an
  // error, never a fallback to another language's date.
  "guides/mac-dictation-not-working": Object.freeze({ ja: "2026-09-26", en: "2026-10-09" }),
  // English 2026-10-09 (1f17428), Japanese 2026-10-09.
  "guides/mac-dictation-shortcut": Object.freeze({ en: "2026-10-09", ja: "2026-10-09" }),
  "guides/dragon-pricing": "2026-10-09", // English only
  "guides/wispr-flow-pricing": "2026-10-09", // English only
  "guides/windows-voice-typing-not-working": "2026-10-09", // English only
  "guides/best-dictation-software": "2026-10-10", // English only
  "privacy/where-dictation-audio-goes": "2026-06-07", // b431ef4, all ten languages
  "privacy/local-dictation-network-test": "2026-06-07", // b431ef4, all ten languages
  compare: "2026-05-25", // e3b0593 (English) and 61a8a25 (localized), the first five comparisons
  "compare/dragon-alternative": "2026-07-12", // 79e0da2
});

// Traditional Chinese pages first shipped with 8f6b5ba.
export const HANT_FIRST_PUBLISHED = "2026-09-14";

export function firstPublished(route, code = "en") {
  const value = FIRST_PUBLISHED[route] ?? (route.startsWith("compare/") ? FIRST_PUBLISHED.compare : undefined);
  // A per-language value never falls back to another language's date.
  const date = typeof value === "object" && value !== null ? value[code] : value;
  if (!date) throw new Error(`No first-published date for ${route}${typeof value === "object" ? ` (${code})` : ""}`);
  return code === "zh-hant" && HANT_FIRST_PUBLISHED > date ? HANT_FIRST_PUBLISHED : date;
}
