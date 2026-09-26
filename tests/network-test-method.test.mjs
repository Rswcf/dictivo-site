import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { NETWORK_TEST_LASTMOD, NETWORK_TEST_METHOD } from "../data/network-test-method.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
const LOCALES = ["en", "de", "fr", "es", "it", "nl", "pt", "zh", "ja", "ko"];
// Exactly generate-site.mjs escapeHtml(): & < > " only, apostrophes untouched.
const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const flat = (text) => text.replace(/\s+/g, " ");

test("every locale explains which hosts to expect before and after locking Cloud Fast (S7)", () => {
  for (const locale of LOCALES) {
    const paragraphs = NETWORK_TEST_METHOD[locale];
    assert.equal(paragraphs.length, 4, `${locale}: expected four paragraphs`);
    const fourth = paragraphs[3];
    for (const host of ["downloads.dictivo.app", "app.dictivo.app", "api.dictivo.app", "huggingface.co"]) {
      assert.ok(fourth.includes(host), `${locale}: ${host} missing`);
    }
    assert.ok(fourth.includes("0.3.51"), `${locale}: version missing`);
    assert.doesNotMatch(fourth, /never contacts|does not contact|zero connections|never for a recording|connections only to|nie kontaktiert|keine Verbindungen|nie für eine Aufnahme|nur Verbindungen/i);
  }
  const en = NETWORK_TEST_METHOD.en[3];
  assert.ok(en.includes("No recording started while Cloud Fast is locked is uploaded."), "en: narrow promise missing");
  assert.ok(en.includes("begin idle: no recording in progress and every earlier recording finished"), "en: idle start missing");
  assert.ok(en.includes("a recording started while Cloud Fast is selected is sent to api.dictivo.app"), "en: unlocked case not start-anchored");
  const de = NETWORK_TEST_METHOD.de[3];
  assert.ok(de.includes("Keine Aufnahme, die bei gesperrtem Cloud Fast gestartet wurde, wird hochgeladen."), "de: narrow promise missing");
  assert.match(de, /\bSie\b/);
  assert.doesNotMatch(de, /\b(du|dein|deine|dich|dir)\b/i);
});

test("the rendered network test pages carry the fourth paragraph and the new date", () => {
  for (const [locale, path] of [["en", ""], ["de", "de/"], ["zh", "zh/"]]) {
    const page = flat(readFileSync(`${dist}${path}privacy/local-dictation-network-test/index.html`, "utf8"));
    // Both sides collapsed: \s also matches the no-break and narrow no-break spaces French and
    // Chinese typography use, so a correctly typeset translation cannot trip the comparison.
    assert.ok(page.includes(flat(`<p>${escape(NETWORK_TEST_METHOD[locale][3])}</p>`)), `${locale}: fourth paragraph not rendered`);
    assert.ok(page.includes(`datetime="${NETWORK_TEST_LASTMOD}"`), `${locale}: page date is not NETWORK_TEST_LASTMOD`);
  }
  const hant = readFileSync(`${dist}zh-hant/privacy/local-dictation-network-test/index.html`, "utf8");
  for (const host of ["app.dictivo.app", "huggingface.co"]) assert.ok(hant.includes(host), `zh-hant page missing ${host}`);
});
