import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { TRUST_PAGES } from "../data/trust-pages.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
const SENTENCE = "The Local license may be used for personal, professional and commercial work.";
// Generated pages are matched on whitespace-collapsed text, like every other site test.
const flat = (text) => text.replace(/\s+/g, " ");

test("the terms state that the Local licence covers personal, professional and commercial work (M9)", () => {
  const terms = TRUST_PAGES.find((page) => page.slug === "terms");
  const licenseSection = terms.sections.find((section) => section.title === "License to use Dictivo");
  assert.ok(licenseSection.paragraphs.includes(SENTENCE), "sentence missing from data/trust-pages.mjs");
  assert.ok(terms.lastModified >= "2026-09-24", `terms lastModified ${terms.lastModified} predates the change`);
  const html = flat(readFileSync(`${dist}terms/index.html`, "utf8"));
  assert.ok(html.includes(SENTENCE), "sentence missing from dist/terms/index.html");
  assert.ok(html.includes('datetime="' + terms.lastModified + '"'), "visible terms date not updated");
});
