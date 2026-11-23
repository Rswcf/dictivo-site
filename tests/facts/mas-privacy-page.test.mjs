import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// The privacy policy of the Mac App Store edition (/privacy/mac-app-store/). Each sentence was
// checked against the app's code on 2026-11-22 and is a commitment to customers and to App Review.
// Change this test only when the commitment changes, and bump MAS_PRIVACY_LASTMOD with it.
const page = readFileSync(new URL("../../dist/privacy/mac-app-store/index.html", import.meta.url), "utf8");
const main = page.slice(page.indexOf("<main"), page.indexOf("</main>") + "</main>".length);
// Visible text only: tags and the email_off comments out, whitespace collapsed.
const visible = (html) => html.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
  .replace(/ ([.,:])/g, "$1");
const text = visible(main);

const TITLE = "Privacy Policy for Dictivo from the Mac App Store";
const DESCRIPTION = "How the Mac App Store edition of Dictivo handles your audio, transcripts and purchases.";
// The whole policy, in page order. The stamp's date comes from MAS_PRIVACY_LASTMOD.
const POLICY = [
  TITLE,
  /^Last updated [A-Z][a-z]+ \d{1,2}, \d{4}$/,
  "This policy covers the edition of Dictivo that you install from the Mac App Store. It covers no other edition of Dictivo.",
  "What stays on your Mac",
  "Dictivo transcribes on your Mac. Your audio and your transcripts never leave it.",
  "Your history, dictionary terms, snippets, settings and speech models are stored on your Mac. You can delete your history in the app.",
  "Dictivo needs no account.",
  "What Dictivo sends over the network",
  "Dictivo goes online for two things only:",
  "To download the speech models you choose, from downloads.dictivo.app or huggingface.co. As with every download, the server sees your IP address and the file you ask for. The request carries no audio, no transcript, and no identifier of you or of your Mac.",
  "For App Store purchases, which macOS and Apple handle.",
  "Dictivo sends no usage statistics. It contains no advertising.",
  "Purchases",
  "Apple processes the 7-day trial, the purchase of Dictivo Local, and restores. We do not receive your name, your email address or your payment details. Apple reports sales to us as totals. If you chose in macOS to share analytics with app developers, Apple may also give us usage and crash reports that do not identify you. Apple's privacy policy applies to the data that Apple holds.",
  "Microphone and clipboard",
  "Dictivo asks for the microphone and for no other permission. It uses the microphone only when you start a recording.",
  "Each transcript is placed on the clipboard, so you can paste it. It stays there until you copy something else. While it is there, other apps on your Mac can read it.",
  "Support",
  "If you write to support@dictivo.app, we use your message and your email address only to answer you.",
  "Contact and changes",
  "Send questions or requests about your data to support@dictivo.app. When this policy changes, we change the date at the top of this page.",
  "This page",
  "This page runs no scripts.",
];

test("the page states the whole policy and nothing else", () => {
  const blocks = [...main.matchAll(/<(h1|h2|p|li)\b[^>]*>([\s\S]*?)<\/\1>/g)].map(([, , inner]) => visible(inner));
  assert.equal(blocks.length, POLICY.length, blocks.join("\n"));
  POLICY.forEach((expected, index) => {
    if (expected instanceof RegExp) assert.match(blocks[index], expected, `block ${index + 1}`);
    else assert.equal(blocks[index], expected, `block ${index + 1}`);
  });
  // No text outside those blocks.
  const expectedText = blocks.join(" ");
  assert.equal(text, expectedText);
});

test("the title and description are the policy's own", () => {
  assert.equal(page.match(/<title>([^<]*)<\/title>/)?.[1], TITLE);
  assert.equal(page.match(/<meta name="description" content="([^"]*)"/)?.[1], DESCRIPTION);
  assert.equal(visible(main.match(/<h1>([\s\S]*?)<\/h1>/)[1]), TITLE);
});

test("the key commitments are on the page", () => {
  for (const [commitment, sentence] of [
    ["audio and transcripts never leave the Mac", "Your audio and your transcripts never leave it."],
    ["the two download hosts", "To download the speech models you choose, from downloads.dictivo.app or huggingface.co."],
    ["downloads carry nothing about the user", "The request carries no audio, no transcript, and no identifier of you or of your Mac."],
    ["the only other network use is App Store purchases", "For App Store purchases, which macOS and Apple handle."],
    ["no usage statistics", "Dictivo sends no usage statistics."],
    ["no advertising", "It contains no advertising."],
    ["no account", "Dictivo needs no account."],
    ["Apple processes purchases", "Apple processes the 7-day trial, the purchase of Dictivo Local, and restores."],
    ["no customer identity or payment data", "We do not receive your name, your email address or your payment details."],
    ["sales arrive as totals", "Apple reports sales to us as totals."],
    ["microphone is the only permission", "Dictivo asks for the microphone and for no other permission."],
    ["the clipboard is readable by other apps", "While it is there, other apps on your Mac can read it."],
    ["support mail is used only to answer", "we use your message and your email address only to answer you."],
    ["no scripts", "This page runs no scripts."],
  ]) {
    assert.ok(text.includes(sentence), `${commitment}: ${sentence}`);
  }
  assert.ok(main.includes('<a href="https://www.apple.com/legal/privacy/">Apple\'s privacy policy</a> applies to the data that Apple holds.'));
});

test("the page names no other edition's terms, no checkout and no price", () => {
  for (const word of ["Cloud Fast", "license", "licence", "Lemon", "checkout", "pricing", "download Dictivo"]) {
    assert.ok(!page.toLowerCase().includes(word.toLowerCase()), `the page contains "${word}"`);
  }
  assert.doesNotMatch(page, /[$€£¥]|\b(?:USD|EUR|GBP|JPY)\b|\{\{price\.|class="price"/, "a price");
  assert.doesNotMatch(text, /\d+[.,]\d{2}\b/, "an amount");
});
