// One wording, everywhere the site states what Dragon Professional v16 costs.
//
// On 2026-10-09 Nuance's Dragon Professional pages (en-us, en-gb, en-au, de-de, fr-fr, es-es,
// it-it, nl-nl) showed no price, only a sales contact, and both old Nuance store addresses
// redirected to the product page. The last archived store page that shows a price is the Wayback
// Machine capture of 11 February 2025: Dragon Professional, Standard, $699, "One-time payment".
// The next capture (24 February 2025) says store purchases are on hold. Earlier copy on this site
// said "$699.99"; no Nuance page we could find showed that figure, so it is no longer used.
// Monthly re-check: docs/research/2026-10-08-ahrefs-audit/price-watch.md in the desktop repository.
export const DRAGON_PRICE_STATUS = Object.freeze({
  checked: "2026-10-09",
  lastListPrice: "$699",
  lastListArchived: "2025-02-11",
  productPage: "https://dragon.nuance.com/en-us/dragon-professional",
  lastListArchive: "https://web.archive.org/web/20250211121042/https://shop.nuance.com/store/nuanceus/en_US/Content/pbPage.dragon-professional",
  onHoldArchive: "https://web.archive.org/web/20250224214938/https://shop.nuance.com/dragon-professional",
});

// The full statement, for tables, pricing sections and answers.
export const DRAGON_PROFESSIONAL_PRICE_SENTENCE =
  "Nuance no longer lists a public price for Dragon Professional v16 (sales contact only, checked on 9 October 2026); its last public list price was $699, a one-time payment, in the Nuance US store (archived 11 February 2025).";
