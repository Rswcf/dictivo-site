import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { TRUST_PAGES } from "../data/trust-pages.mjs";
import { NETWORK_TEST_METHOD } from "../data/network-test-method.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
const LOCALES = ["en", "de", "fr", "es", "it", "nl", "pt", "zh", "zh-hant", "ja", "ko"];
const read = (code) => readFileSync(`${dist}${code === "en" ? "" : `${code}/`}privacy/local-dictation-network-test/index.html`, "utf8");
const visible = (html) => html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ");
const audioPath = TRUST_PAGES.find((page) => page.slug === "privacy/where-dictation-audio-goes");
const plainStatement = (code) => {
  const page = code === "en" ? audioPath : audioPath.locales[code];
  return page.sections[0].paragraphs[0].split(/(?<=[.。])\s*/)[0];
};
// The hedged wording the page used before it adopted the audio-path page's plain statement.
const HEDGES = {
  en: /should not (upload|send)|is designed to keep/i,
  de: /sollte (Dictivo )?(kein|die Aufnahme)|ist so ausgelegt, dass Diktat-Audio/,
  fr: /ne devrait pas|est conçu pour garder/,
  es: /no debería|está diseñado para mantener/,
  it: /non dovrebbe|è progettato per mantenere/,
  nl: /zou Dictivo geen|zou de opname|is ontworpen om dicteeraudio/,
  pt: /não deve (enviar|subir)|foi projetado para manter/,
  zh: /不应|设计目标是把/,
  "zh-hant": /不應|設計目標是把/,
  ja: /しないはず|保持して文字起こしする設計/,
  ko: /않아야|유지해 전사하도록 설계/,
};
const TITLES = {
  en: "Dictivo Local Network Test · Privacy Proof",
  de: "Dictivo Local Netzwerktest · Datenschutznachweis",
};

test("the network test answers the general question with tools named as instructions", () => {
  for (const code of LOCALES) {
    const html = read(code);
    const text = visible(html);
    for (const tool of ["Little Snitch", "LuLu", "nettop", "Wireshark"]) assert.ok(text.includes(tool), `${code}: ${tool} missing`);
    const h1 = visible(html.match(/<h1>([\s\S]*?)<\/h1>/)[1]);
    assert.ok(h1.includes("Dictivo Local"), `${code}: H1 lost the Dictivo Local example`);
    const sections = [...html.matchAll(/<section class="doc-section"[\s\S]*?<\/section>/g)].map(([section]) => section);
    assert.ok(sections.length >= 5, `${code}: expected the tools section`);
    const tools = sections[2];
    assert.equal((tools.match(/<li>/g) || []).length, 5, `${code}: tool list`);
    assert.doesNotMatch(text, /\bwe (tested|used|ran)\b/i, `${code}: must not claim a test with these tools`);
  }
  assert.match(visible(read("en")), /Resource Monitor/);
  assert.match(visible(read("en")), /Activity Monitor/);
});

test("the Dictivo example uses the audio-path page's plain statement, not a hedge", () => {
  for (const code of LOCALES) {
    const text = visible(read(code));
    const source = code === "zh-hant" ? null : plainStatement(code);
    if (source) assert.ok(text.includes(source), `${code}: plain statement missing: ${source}`);
    assert.doesNotMatch(text, HEDGES[code], `${code}: hedged wording left`);
  }
});

test("the first FAQ answers the general question and the meta title is unchanged", () => {
  for (const code of LOCALES) {
    const html = read(code);
    const faq = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]).find((node) => node["@type"] === "FAQPage");
    assert.equal(faq.mainEntity.length, 5, `${code}: FAQ count`);
    assert.doesNotMatch(faq.mainEntity[0].name, /Dictivo/, `${code}: first FAQ should be about any dictation app`);
    if (TITLES[code]) assert.ok(html.includes(`<title>${TITLES[code]}</title>`), `${code}: meta title changed`);
  }
});

test("the observation procedure still fills the second section", () => {
  const page = TRUST_PAGES.find((item) => item.slug === "privacy/local-dictation-network-test");
  for (const code of Object.keys(NETWORK_TEST_METHOD)) {
    const localized = code === "en" ? page : page.locales[code];
    assert.deepEqual(localized.sections[1].paragraphs, NETWORK_TEST_METHOD[code], code);
  }
});
