// Docs page (Batch B2): install and uninstall. A stub until its page task writes the copy and sets
// ready: true; nothing renders while ready is false. The metadata is final, and the shared docs test
// (tests/structure/docs-pages.test.mjs) already checks its lengths. Copy rules and facts: the Batch B2
// plan, "Page specs". See data/docs-updates-and-renewal.mjs for a finished page.
export const DOCS_INSTALL_LASTMOD = "2026-11-10";

export function docsInstallCopy({ windows }) {
  return {
    ready: false,
    slug: "install-and-uninstall",
    route: "docs/install-and-uninstall",
    idPrefix: "docs-install",
    mainId: "docs-install",
    navLabel: "Install and uninstall",
    metaTitle: "Install and Uninstall Dictivo: DMG, Homebrew, EXE and MSI",
    metaDescription: "Install Dictivo on a Mac from the DMG or with Homebrew (brew install --cask deepviewsdev/tap/dictivo), on Windows x64 from the EXE or MSI, and remove it again.",
    llmsQuestion: "How do I install or uninstall Dictivo, including with Homebrew?",
    summary: "How to install Dictivo from the disk image, with Homebrew, or from the Windows EXE or MSI, and how to remove it.",
    lastmod: DOCS_INSTALL_LASTMOD,
    title: "",
    lede: "",
    answer: "",
    answerLinks: [],
    about: [],
    quickReference: undefined,
    wide: false,
    showTrial: true,
    trialSource: "docs_install",
    sections: [],
    faqs: [],
    references: [],
  };
}
