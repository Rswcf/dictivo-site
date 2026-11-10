// Shared constants of the docs section (/docs/ and /docs/<slug>/, English only, Batch B2).
// DOCS_CHECKED is the day the facts were read; DOCS_CHECKED_VERSION is the desktop release tag they
// were read from (`git show v0.3.57:<path>` in the desktop repository). Pages print these, never
// data/release.json: a deploy rewrites that file, and a page would then name a build nobody read.
// A task that re-reads the facts against a newer tag bumps both constants.
export const DOCS_CHECKED = "2026-11-10";
export const DOCS_CHECKED_VERSION = "0.3.57";

// The labels renderDictationGuidePage() reads from a page's copy.
export const DOCS_SHARED = Object.freeze({
  environmentLabel: "Applies to",
  answerTitle: "Short answer",
  tocLabel: "On this page",
  faqTitle: "Questions",
  referencesTitle: "Sources",
  navTitle: "All Dictivo docs",
  indexLabel: "Docs",
});

export const docsPath = (slug = "") => (slug ? `/docs/${slug}/` : "/docs/");

// "10 November 2026"
export const formatDocsDate = (iso) =>
  new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

// Third-party sources carry the day they were read.
export const docsCheckedLabel = (label) => `${label} (checked ${DOCS_CHECKED})`;

// The method line every docs page and the index print. The one place it is written.
export function docsEnvironment({ windows }) {
  const platforms = windows
    ? "macOS (Apple Silicon and Intel) and Windows x64"
    : "macOS (Apple Silicon and Intel); Windows downloads are temporarily unavailable";
  return `Dictivo ${DOCS_CHECKED_VERSION} on ${platforms}. Read from the app's source and the published app by the Dictivo team on ${formatDocsDate(DOCS_CHECKED)}.`;
}
