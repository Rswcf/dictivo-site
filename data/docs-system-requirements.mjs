// Docs page (Batch B2): system requirements. A stub until its page task writes the copy and sets
// ready: true; nothing renders while ready is false. The metadata is final, and the shared docs test
// (tests/structure/docs-pages.test.mjs) already checks its lengths. Copy rules and facts: the Batch B2
// plan, "Page specs". See data/docs-updates-and-renewal.mjs for a finished page.
export const DOCS_SYSTEM_REQUIREMENTS_LASTMOD = "2026-11-10";

export function docsSystemRequirementsCopy({ windows }) {
  return {
    ready: false,
    slug: "system-requirements",
    route: "docs/system-requirements",
    idPrefix: "docs-system-requirements",
    mainId: "docs-system-requirements",
    navLabel: "System requirements",
    metaTitle: "Dictivo System Requirements: Mac and Windows x64",
    metaDescription: "What Dictivo needs on a Mac (Apple Silicon or Intel) and on Windows x64: processor, memory and disk for each local model, microphone and network.",
    llmsQuestion: "What are Dictivo's system requirements on Mac and Windows?",
    summary: "What Dictivo needs on a Mac and on Windows x64, and how it picks a model for your hardware.",
    lastmod: DOCS_SYSTEM_REQUIREMENTS_LASTMOD,
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
