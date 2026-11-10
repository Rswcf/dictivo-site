// Docs page (Batch B2): network connections. A stub until its page task writes the copy and sets
// ready: true; nothing renders while ready is false. The metadata is final, and the shared docs test
// (tests/structure/docs-pages.test.mjs) already checks its lengths. Copy rules and facts: the Batch B2
// plan, "Page specs". See data/docs-updates-and-renewal.mjs for a finished page.
export const DOCS_CONNECTIONS_LASTMOD = "2026-11-10";

export function docsConnectionsCopy({ windows }) {
  return {
    ready: false,
    slug: "connections",
    route: "docs/connections",
    idPrefix: "docs-connections",
    mainId: "docs-connections",
    navLabel: "Network connections",
    metaTitle: "Dictivo Network Connections: Every Host the App Contacts",
    metaDescription: "Every server the Dictivo desktop app can contact, when it connects, what it sends, what happens if you block it, and how to check it with a network monitor.",
    llmsQuestion: "Which servers does the Dictivo desktop app contact?",
    summary: "Every server the app can contact, when it connects, what it sends, and what happens if you block it.",
    lastmod: DOCS_CONNECTIONS_LASTMOD,
    title: "",
    lede: "",
    answer: "",
    answerLinks: [],
    about: [],
    quickReference: undefined,
    wide: true,
    showTrial: false,
    trialSource: undefined,
    sections: [],
    faqs: [],
    references: [],
  };
}
