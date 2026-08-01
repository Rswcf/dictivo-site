import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Impressum page, built from data/impressum.json.
 *
 * § 5 DDG requires a commercial site operated from Germany to carry an
 * Impressum that is easily recognisable, directly reachable and permanently
 * available. dictivo.app had none.
 *
 * The page is gated on the data actually being filled in. While any value is
 * still a FILL_IN placeholder, `IMPRESSUM_PAGE` is null and the generator
 * skips the page, the footer link and the sitemap entry entirely — publishing
 * "FILL_IN_LEGAL_NAME" to the web would be worse than publishing nothing, and
 * a silently half-correct Impressum is worse still.
 */

const PLACEHOLDER_PREFIX = "FILL_IN";

const data = JSON.parse(
  readFileSync(resolve(new URL(".", import.meta.url).pathname, "impressum.json"), "utf8"),
);

function containsPlaceholder(value) {
  if (typeof value === "string") return value.startsWith(PLACEHOLDER_PREFIX);
  if (Array.isArray(value)) return value.some(containsPlaceholder);
  if (value && typeof value === "object") {
    return Object.entries(value)
      .filter(([key]) => key !== "_README")
      .some(([, entry]) => containsPlaceholder(entry));
  }
  return false;
}

/** True once every required field has been replaced with a real value. */
export const IMPRESSUM_READY = !containsPlaceholder(data);

/**
 * Seller identity for legal notices that must name and address the trader —
 * chiefly the formal Widerrufsbelehrung on /refund/, which is only a valid
 * notice if the consumer can actually address a withdrawal to someone.
 *
 * Null until the Impressum data is filled in, for the same reason the Impressum
 * page itself is: a withdrawal notice addressed to "FILL_IN_LEGAL_NAME" is not
 * a notice, and a formal-looking one that cannot be acted on is worse than
 * plainly saying the statutory right exists.
 */
export const IMPRESSUM_CONTACT = IMPRESSUM_READY
  ? { legalName: data.legalName, addressLines: [...data.addressLines], email: data.email }
  : null;

/** Label stays "Impressum" in every language: it is the term German law and
 *  German readers recognise, and a translated label is exactly the kind of
 *  thing that gets argued about in an Abmahnung. */
export const IMPRESSUM_LABEL = "Impressum";

function buildSections() {
  const sections = [
    {
      title: "Angaben gemäß § 5 DDG",
      paragraphs: [data.legalName, ...data.addressLines],
    },
    {
      title: "Kontakt",
      bullets: [
        `E-Mail: ${data.email}`,
        ...(data.phone ? [`Telefon: ${data.phone}`] : []),
      ],
    },
  ];

  if (data.vatId) {
    sections.push({
      title: "Umsatzsteuer-Identifikationsnummer",
      paragraphs: [
        `Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: ${data.vatId}`,
      ],
    });
  }

  if (data.contentResponsible?.name) {
    sections.push({
      title: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
      paragraphs: [data.contentResponsible.name, ...(data.contentResponsible.addressLines || [])],
    });
  }

  if (data.disputeResolution) {
    sections.push({
      title: "Verbraucherstreitbeilegung",
      paragraphs: [data.disputeResolution],
    });
  }

  return sections;
}

export const IMPRESSUM_PAGE = IMPRESSUM_READY
  ? {
      slug: "impressum",
      navLabel: IMPRESSUM_LABEL,
      title: "Impressum",
      eyebrow: "Impressum",
      metaTitle: "Impressum · Dictivo",
      metaDescription: "Anbieterkennzeichnung für dictivo.app gemäß § 5 DDG.",
      lede: "Anbieterkennzeichnung für dictivo.app.",
      sections: buildSections(),
    }
  : null;
