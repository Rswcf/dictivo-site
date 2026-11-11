import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// 2026-11-11: VoiceInk's pricing page (re-read 2026-11-10, raw/price-spotcheck-2026-11-10.md in
// the desktop repository) shows Solo $25, Personal $39 and Extended $49 with no sale wording. No
// page may call these prices a current offer or a discount, in any language. The Japanese copy was
// fixed the same day (「現在の価格」).
const read = (path) => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const text = (html) => html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

const OFFER =
  /current offers?|current paid offers|aktuelles angebot|offre actuelle|oferta actual|offerta attuale|huidige aanbieding|oferta atual|当前优惠|當前優惠|目前優惠|현재 할인|現在の価格/i;

const LOCALES = ["en", "de", "fr", "es", "it", "nl", "pt", "zh", "zh-hant", "ja", "ko"];
const prefix = (code) => (code === "en" ? "" : `${code}/`);

const PAGES = [
  ...LOCALES.map((code) => `${prefix(code)}compare/voiceink-alternative/index.html`),
  "guides/best-speech-to-text-apps-for-mac/index.html",
  ...["en", "de", "zh", "zh-hant", "ja"].map((code) => `${prefix(code)}guides/offline-dictation-on-mac/index.html`),
];

test("VoiceInk prices are never called a current offer", () => {
  for (const page of PAGES) {
    const body = text(read(page));
    assert.match(body, /\$25.*\$39.*\$49/, `${page}: VoiceInk prices missing`);
    assert.doesNotMatch(body, OFFER, `${page}: offer wording`);
  }
});
