// Docs page (Batch B2): macos permissions. A stub until its page task writes the copy and sets
// ready: true; nothing renders while ready is false. The metadata is final, and the shared docs test
// (tests/structure/docs-pages.test.mjs) already checks its lengths. Copy rules and facts: the Batch B2
// plan, "Page specs". See data/docs-updates-and-renewal.mjs for a finished page.
export const DOCS_PERMISSIONS_LASTMOD = "2026-11-10";

export function docsPermissionsCopy({ windows }) {
  return {
    ready: false,
    slug: "macos-permissions",
    route: "docs/macos-permissions",
    idPrefix: "docs-permissions",
    mainId: "docs-permissions",
    navLabel: "macOS permissions",
    metaTitle: "macOS Permissions Dictivo Asks For and What Each One Does",
    metaDescription: "Dictivo asks macOS for three permissions: Microphone (required), Accessibility (recommended) and Automation for Auto paste (optional). What each one does.",
    llmsQuestion: "Which macOS permissions does Dictivo ask for?",
    summary: "The three macOS permissions Dictivo asks for, what each one does, and what happens without it.",
    lastmod: DOCS_PERMISSIONS_LASTMOD,
    title: "",
    lede: "",
    answer: "",
    answerLinks: [],
    about: [],
    quickReference: undefined,
    wide: false,
    showTrial: false,
    trialSource: undefined,
    sections: [],
    faqs: [],
    references: [],
  };
}
