import { LOCAL_OFFER } from "./local-offer.mjs";

// Docs page (Batch B2): license and devices. A stub until its page task writes the copy and sets
// ready: true; nothing renders while ready is false. The metadata is final, and the shared docs test
// (tests/structure/docs-pages.test.mjs) already checks its lengths. Copy rules and facts: the Batch B2
// plan, "Page specs". See data/docs-updates-and-renewal.mjs for a finished page.
export const DOCS_LICENSE_LASTMOD = "2026-11-10";

export function docsLicenseCopy({ windows }) {
  return {
    ready: false,
    slug: "license-and-devices",
    route: "docs/license-and-devices",
    idPrefix: "docs-license",
    mainId: "docs-license",
    navLabel: "License and devices",
    metaTitle: `Dictivo License and Devices: One Purchase, Up to ${LOCAL_OFFER.personalDevices} Devices`,
    metaDescription: `How a Dictivo Local license works: one purchase for Mac and Windows x64, up to ${LOCAL_OFFER.personalDevices} personal devices, key activation with no account, device removal and refunds.`,
    llmsQuestion: "How many devices can one Dictivo Local license run on, and how do I move it?",
    summary: "What one Local license covers, how activation works without an account, and how to move the license to another device.",
    lastmod: DOCS_LICENSE_LASTMOD,
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
