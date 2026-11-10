// Docs page (Batch B2): offline behavior. A stub until its page task writes the copy and sets
// ready: true; nothing renders while ready is false. The metadata is final, and the shared docs test
// (tests/structure/docs-pages.test.mjs) already checks its lengths. Copy rules and facts: the Batch B2
// plan, "Page specs". See data/docs-updates-and-renewal.mjs for a finished page.
export const DOCS_OFFLINE_LASTMOD = "2026-11-10";

export function docsOfflineCopy({ windows }) {
  return {
    ready: false,
    slug: "offline",
    route: "docs/offline",
    idPrefix: "docs-offline",
    mainId: "docs-offline",
    navLabel: "Offline behavior",
    metaTitle: "Dictivo Offline Behavior: What Works Without a Network",
    metaDescription: "Which parts of Dictivo work with no network after the model download, which actions need one, how to install a model from a file, and how to verify it yourself.",
    llmsQuestion: "What does Dictivo do without a network connection?",
    summary: "What works with no network after the first model download, and which actions need one.",
    lastmod: DOCS_OFFLINE_LASTMOD,
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
