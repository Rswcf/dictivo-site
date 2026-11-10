// Docs page (Batch B2): models and languages. A stub until its page task writes the copy and sets
// ready: true; nothing renders while ready is false. The metadata is final, and the shared docs test
// (tests/structure/docs-pages.test.mjs) already checks its lengths. Copy rules and facts: the Batch B2
// plan, "Page specs". See data/docs-updates-and-renewal.mjs for a finished page.
export const DOCS_MODELS_LASTMOD = "2026-11-10";

export function docsModelsCopy({ windows }) {
  return {
    ready: false,
    slug: "models-and-languages",
    route: "docs/models-and-languages",
    idPrefix: "docs-models",
    mainId: "docs-models",
    navLabel: "Models and languages",
    metaTitle: "Dictivo Local Models and Languages: Sizes and Defaults",
    metaDescription: "The seven local speech models in Dictivo, their sizes, which one is free, how Dictivo picks a default for your hardware, and the 11 dictation languages.",
    llmsQuestion: "Which local speech models and languages does Dictivo offer?",
    summary: "The seven local speech models, their download sizes, which one is free, and the 11 dictation languages.",
    lastmod: DOCS_MODELS_LASTMOD,
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
