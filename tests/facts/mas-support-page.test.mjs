import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// The support page of the Mac App Store edition (/support/mac-app-store/). App Store Connect
// carries it as the Support URL, and App Review reads it. Each sentence is a statement to customers
// and to App Review about purchases, refunds and the app. Change this test only when the statement
// changes, and bump MAS_SUPPORT_LASTMOD with it.
const page = readFileSync(new URL("../../dist/support/mac-app-store/index.html", import.meta.url), "utf8");
const main = page.slice(page.indexOf("<main"), page.indexOf("</main>") + "</main>".length);
const decode = (value) => value.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&amp;", "&");
// Visible text only: tags and the email_off comments out, whitespace collapsed, entities decoded.
const visible = (html) => decode(html.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
  .replace(/ ([.,:])/g, "$1"));
const text = visible(main);

const TITLE = "Support for Dictivo from the Mac App Store";
const DESCRIPTION = "Help for the Mac App Store edition of Dictivo: contact, purchases, refunds and common questions.";
// The whole page, in page order. The stamp's date comes from MAS_SUPPORT_LASTMOD.
const SUPPORT = [
  TITLE,
  /^Last updated [A-Z][a-z]+ \d{1,2}, \d{4}$/,
  "This page is for the edition of Dictivo that you install from the Mac App Store.",
  "Contact",
  "Write to support@dictivo.app. Tell us your macOS version and what you did before the problem appeared.",
  "Purchases",
  "The 14-day Trial and Dictivo Local are App Store purchases. Apple processes them.",
  "To get a purchase back on a new Mac or after you reinstall Dictivo, open Settings › Purchases in Dictivo and click Restore Purchases. Sign in to the App Store with the Apple Account that made the purchase.",
  "Purchases need an internet connection. If Dictivo cannot reach the App Store, try again later. The Tiny model works without a purchase.",
  "Refunds",
  "Apple handles refunds for App Store purchases. Ask for one at reportaproblem.apple.com. We cannot refund an App Store purchase ourselves.",
  "Common questions",
  "Dictivo does not hear me. Open System Settings › Privacy & Security › Microphone and turn on Dictivo.",
  "The text does not appear in my other app. This edition puts each transcript on the clipboard. Press ⌘V to paste it.",
  "A speech model does not download. Models are between about 75 MB and about 3.1 GB. Check your internet connection and your free disk space, then start the download again in Settings › Engine.",
  "How do I remove Dictivo and its data? Delete Dictivo from the Applications folder. To remove its data as well, delete the folder ~/Library/Containers/com.dictivo.mac.",
  "Requirements",
  "macOS 13.3 or later. Apple silicon or Intel.",
  "Privacy",
  "Read the privacy policy for this edition.",
  "This page",
  "This page runs no scripts.",
];

test("the page states the whole support text and nothing else", () => {
  const blocks = [...main.matchAll(/<(h1|h2|p|li)\b[^>]*>([\s\S]*?)<\/\1>/g)].map(([, , inner]) => visible(inner));
  assert.equal(blocks.length, SUPPORT.length, blocks.join("\n"));
  SUPPORT.forEach((expected, index) => {
    if (expected instanceof RegExp) assert.match(blocks[index], expected, `block ${index + 1}`);
    else assert.equal(blocks[index], expected, `block ${index + 1}`);
  });
  // No text outside those blocks.
  assert.equal(text, blocks.join(" "));
});

test("the title and description are the page's own", () => {
  assert.equal(decode(page.match(/<title>([^<]*)<\/title>/)?.[1] ?? ""), TITLE);
  assert.equal(decode(page.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? ""), DESCRIPTION);
  assert.equal(visible(main.match(/<h1>([\s\S]*?)<\/h1>/)[1]), TITLE);
});

test("each common question leads its answer in bold", () => {
  const questions = [...main.matchAll(/<li><strong>([^<]*)<\/strong> /g)].map(([, question]) => question);
  assert.deepEqual(questions, [
    "Dictivo does not hear me.",
    "The text does not appear in my other app.",
    "A speech model does not download.",
    "How do I remove Dictivo and its data?",
  ]);
});

test("the key statements are on the page", () => {
  for (const [statement, sentence] of [
    ["one support address", "Write to support@dictivo.app."],
    ["Apple processes the purchases", "The 14-day Trial and Dictivo Local are App Store purchases. Apple processes them."],
    ["restore through the App Store", "open Settings › Purchases in Dictivo and click Restore Purchases."],
    ["the Tiny model is free", "The Tiny model works without a purchase."],
    ["Apple handles refunds", "Apple handles refunds for App Store purchases."],
    ["no refunds from us", "We cannot refund an App Store purchase ourselves."],
    ["the transcript goes to the clipboard", "This edition puts each transcript on the clipboard."],
    ["the sandbox data folder", "delete the folder ~/Library/Containers/com.dictivo.mac."],
    ["the macOS minimum", "macOS 13.3 or later."],
    ["no scripts", "This page runs no scripts."],
  ]) {
    assert.ok(text.includes(sentence), `${statement}: ${sentence}`);
  }
  assert.ok(main.includes('Ask for one at <a href="https://reportaproblem.apple.com/">reportaproblem.apple.com</a>.'));
  assert.ok(main.includes('Read the <a href="/privacy/mac-app-store/">privacy policy for this edition</a>.'));
});

test("the page names no other edition's terms, no checkout and no price", () => {
  for (const word of ["Cloud Fast", "license", "licence", "Lemon", "checkout", "pricing", "download Dictivo"]) {
    assert.ok(!page.toLowerCase().includes(word.toLowerCase()), `the page contains "${word}"`);
  }
  assert.doesNotMatch(page, /[$€£¥]|\b(?:USD|EUR|GBP|JPY)\b|\{\{price\.|class="price"/, "a price");
  assert.doesNotMatch(text, /\d+[.,]\d{2}\b/, "an amount");
});
