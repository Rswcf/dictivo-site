import { DOCS_LICENSE_LASTMOD, docsLicenseCopy } from "./docs-license-and-devices.mjs";
import { DOCS_OFFLINE_LASTMOD, docsOfflineCopy } from "./docs-offline.mjs";
import { DOCS_MODELS_LASTMOD, docsModelsCopy } from "./docs-models-and-languages.mjs";
import { DOCS_SYSTEM_REQUIREMENTS_LASTMOD, docsSystemRequirementsCopy } from "./docs-system-requirements.mjs";
import { DOCS_PERMISSIONS_LASTMOD, docsPermissionsCopy } from "./docs-macos-permissions.mjs";
import { DOCS_CONNECTIONS_LASTMOD, docsConnectionsCopy } from "./docs-connections.mjs";
import { DOCS_INSTALL_LASTMOD, docsInstallCopy } from "./docs-install-and-uninstall.mjs";
import { DOCS_UPDATES_LASTMOD, docsUpdatesCopy } from "./docs-updates-and-renewal.mjs";

// The docs section registry (Batch B2, English only). Every shared surface iterates DOCS_PAGES:
// the write loop, the sitemap, llms.txt, the docs nav on each page, the index list,
// scripts/check-public-output.mjs and the tests. A page reaches dist/ only when its copy says
// ready: true. To add a page: write data/docs-<slug>.mjs (see data/docs-updates-and-renewal.mjs),
// add it here and add its route to data/first-published.mjs.
export const DOCS_INDEX_LASTMOD = "2026-11-10";

export const DOCS_INDEX_COPY = Object.freeze({
  navLabel: "Docs",
  metaTitle: "Dictivo Documentation: Setup, License and Privacy Facts",
  metaDescription:
    "Reference pages for the Dictivo desktop app: license and devices, offline use, models, system requirements, macOS permissions, connections, install and updates.",
  title: "Dictivo documentation",
  lede: "Reference facts about the Dictivo desktop app, written by the Dictivo team. They describe how the app works, not how it compares with other apps; the guides and comparison pages do that.",
  answerTitle: "Short answer",
  answer:
    "These pages answer practical questions about Dictivo: system requirements, install and uninstall, macOS permissions, local models and languages, offline behavior, network connections, license and devices, and updates and renewal. Each fact comes from the app's source at the stated version or from a page this site already publishes. Each page says which version it applies to and when the facts were read.",
  pagesTitle: "Pages",
  relatedTitle: "Related pages",
  itemListName: "Dictivo documentation pages",
  relatedLinks: Object.freeze([
    ["Security", "/security/"],
    ["Privacy Policy", "/privacy/"],
    ["Where dictation audio goes", "/privacy/where-dictation-audio-goes/"],
    ["Check the network yourself", "/privacy/local-dictation-network-test/"],
    ["Pricing", "/pricing/"],
    ["Terms of service", "/terms/"],
    ["Refund policy", "/refund/"],
    ["Changelog", "/changelog/"],
    ["Your first local dictation", "/guides/first-local-dictation/"],
  ]),
});

// Order on the index, in the docs nav and in llms.txt: the order a new user needs them.
export const DOCS_PAGES = Object.freeze([
  { copy: docsSystemRequirementsCopy, lastmod: DOCS_SYSTEM_REQUIREMENTS_LASTMOD },
  { copy: docsInstallCopy, lastmod: DOCS_INSTALL_LASTMOD },
  { copy: docsPermissionsCopy, lastmod: DOCS_PERMISSIONS_LASTMOD },
  { copy: docsModelsCopy, lastmod: DOCS_MODELS_LASTMOD },
  { copy: docsOfflineCopy, lastmod: DOCS_OFFLINE_LASTMOD },
  { copy: docsConnectionsCopy, lastmod: DOCS_CONNECTIONS_LASTMOD },
  { copy: docsLicenseCopy, lastmod: DOCS_LICENSE_LASTMOD },
  { copy: docsUpdatesCopy, lastmod: DOCS_UPDATES_LASTMOD },
]);

export const docsEntries = ({ windows }) => DOCS_PAGES.map((page) => page.copy({ windows }));
export const readyDocsEntries = ({ windows }) => docsEntries({ windows }).filter((entry) => entry.ready);
