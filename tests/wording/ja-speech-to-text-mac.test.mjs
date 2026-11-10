import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { OFFLINE_GUIDE_PRICES_CHECKED } from "../../data/offline-dictation-guide.mjs";
import {
  JA_SPEECH_TO_TEXT_MAC_GUIDE_CHECKED,
  jaSpeechToTextMacGuideCopy,
} from "../../data/ja-speech-to-text-mac-guide.mjs";

// Batch B3, page J1: the Japanese Mac speech-to-text guide. The shared contract (pairing, order,
// schema, token prices, banned words) is tests/structure/ja-guides.test.mjs; this file pins the
// page's own wording: head and heading, the six ways people ask, the ten rows and their prices and
// dates, the sections, the FAQ, the related pages and the references.
const read = (path) => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const path = "/ja/guides/best-speech-to-text-apps-for-mac/";
const page = () => read(`${path.slice(1)}index.html`);
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const windows = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const copy = jaSpeechToTextMacGuideCopy({ windows });
const main = (html) => html.split("<main")[1].split("</main>")[0];
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\s+/g, " ");
const tableAfter = (html, id) => html.slice(html.indexOf(`id="${id}"`)).match(/<table class="compare-table">[\s\S]*?<\/table>/)[0];
const rows = (table) => [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(([, row]) => [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(([, cell]) => cell.trim()));
const year = JA_SPEECH_TO_TEXT_MAC_GUIDE_CHECKED.slice(0, 4);

const INTENTS = [
  "mac 音声入力 アプリ",
  "mac 音声入力 おすすめ",
  "mac 音声入力 ソフト",
  "mac 文字起こし アプリ 無料",
  "mac 音声入力 無料 アプリ",
  "mac 音声入力 日本語",
];
const HEADERS = ["アプリ", "向いている用途", "プライバシー・対応環境の注意点", "選ぶ場面", "価格（買い切り／サブスク）", "確認日"];
const OPTIONS = ["Dictivo Local", "Apple Dictation", "Handy", "MacWhisper", "Spokenly", "Superwhisper", "VoiceInk", "Voice Type", "Voibe", "Wispr Flow"];
// Voice Type keeps the site's own 2026-09-29 facts; every other row was read on the page's check date.
const SITE_CHECKED = ["Voice Type"];
const FAQS = [
  "Macで使える音声入力アプリのおすすめは？",
  "Macで無料で使える音声入力アプリは？",
  "Mac標準の音声入力と専用アプリの違いは？",
  "Macの音声入力はオフラインで使えますか？",
  "音声入力と文字起こしの違いは？",
  "DictivoとMacWhisperはどちらを選ぶべき？",
  "Dictivoは日本語に対応していますか？",
  "録音ファイルを無料で文字起こしできるMacアプリは？",
];
const CANNIBAL = /買い切り|サブスク|オフライン|ショートカット|できない/;

const factTable = () => tableAfter(page(), "ja-speech-to-text-mac-table");
const factRow = (name) => rows(factTable()).slice(1).find((row) => text(row[0]).trim() === name);
const priceCell = (name) => factRow(name)[HEADERS.indexOf("価格（買い切り／サブスク）")];

test("J1: the heading and title are the comparison query, with the year and the row count", () => {
  const html = page();
  const h1 = `Macの音声入力アプリおすすめ比較（${year}年）：用途別に選ぶ`;
  const title = `Mac音声入力アプリ比較（${year}）：用途別おすすめ${OPTIONS.length}本`;
  assert.equal(text(html.match(/<h1>([\s\S]*?)<\/h1>/)[1]).trim(), h1);
  assert.equal(text(html.match(/<title>([^<]*)<\/title>/)[1]).trim(), title);
  assert.equal(copy.title, h1);
  assert.equal(copy.metaTitle, title);
  for (const head of [copy.title, copy.metaTitle]) {
    assert.match(head, /おすすめ|比較/, head);
    assert.doesNotMatch(head, /買い切り|オフライン|ショートカット/, head);
    assert.doesNotMatch(head, CANNIBAL, head);
  }
});

test("J1: the intent table lists the six Japanese ways people ask, in order", () => {
  const [header, ...body] = rows(tableAfter(page(), "ja-speech-to-text-mac-intents"));
  assert.deepEqual(header.map((cell) => text(cell).trim()), ["よくある検索", "合う使い方", "確認すること"]);
  assert.deepEqual(body.map((row) => text(row[0]).trim()), INTENTS);
  for (const row of body) {
    assert.equal(row.length, 3, row[0]);
    assert.doesNotMatch(text(row[0]), CANNIBAL, row[0]);
  }
  // The Japanese row states Dictivo's support from the app's language list and nothing about other apps.
  const japanese = text(body.at(-1).join(" "));
  for (const fact of ["日本語", "11", "自動検出", "Dictivo"]) assert.ok(japanese.includes(fact), fact);
});

test("J1: the fact table has the ten rows in order, with sourced prices and per-row dates", () => {
  const [header, ...body] = rows(factTable());
  assert.deepEqual(header.map((cell) => text(cell).trim()), HEADERS);
  assert.deepEqual(body.map((row) => text(row[0]).trim()), OPTIONS);
  for (const row of body) {
    const name = text(row[0]).trim();
    const date = SITE_CHECKED.includes(name) ? OFFLINE_GUIDE_PRICES_CHECKED : JA_SPEECH_TO_TEXT_MAC_GUIDE_CHECKED;
    assert.ok(row.at(-1).includes(`<time datetime="${date}">`), `${name}: checked ${date}`);
  }
  assert.equal(text(priceCell("Handy")).trim(), "無料・オープンソース（MITライセンス）");
  const spokenly = text(priceCell("Spokenly"));
  assert.match(spokenly, /Spokenly.*\$29/);
  assert.match(spokenly, /\$15.*\$144.*\$12/);
  assert.match(text(priceCell("VoiceInk")), /\$25.*\$39.*\$49/);
  assert.match(text(priceCell("Voibe")), /\$9\.90.*\$99.*\$199/);
});

test("J1: six sections, from what the comparison measures to the steps on your own Mac", () => {
  const body = main(page());
  const titles = [...body.matchAll(/<h2 id="ja-speech-to-text-mac-section-\d+-title">([^<]+)<\/h2>/g)].map(([, title]) => text(title).trim());
  assert.equal(titles.length, 6);
  assert.equal(titles[0], "この比較で分かること・分からないこと");
  assert.equal(titles.at(-1), "自分のMacで試す手順");
  assert.ok(!body.includes('id="ja-speech-to-text-mac-section-7"'), "no extra section");
});

test("J1: the FAQ asks the eight questions, in order", () => {
  const questions = [...main(page()).matchAll(/<span class="faq-question">([^<]+)<\/span>/g)].map(([, question]) => text(question).trim());
  assert.deepEqual(questions, FAQS);
});

test("J1: related pages and references", () => {
  const body = main(page());
  const related = body.slice(body.indexOf('id="ja-speech-to-text-mac-related"'), body.indexOf('id="ja-speech-to-text-mac-references"'));
  for (const url of [
    "https://dictivo.app/ja/guides/mac-dictation-app-no-subscription/",
    "https://dictivo.app/ja/guides/offline-dictation-on-mac/",
    "https://dictivo.app/guides/best-speech-to-text-apps-for-mac/",
  ]) assert.ok(related.includes(`href="${url}"`), url);
  const references = body.slice(body.indexOf('id="ja-speech-to-text-mac-references"'));
  assert.ok(references.includes('href="https://github.com/deepviewsdev/homebrew-tap"'), "Homebrew tap");
  const voibe = references.match(/<a href="https:\/\/www\.getvoibe\.com\/pricing\/">([^<]+)<\/a>/);
  assert.ok(voibe, "Voibe pricing reference");
  assert.ok(voibe[1].endsWith(`（${JA_SPEECH_TO_TEXT_MAC_GUIDE_CHECKED}確認）`), voibe[1]);
});

test("J1: the copy states Dictivo's Japanese support and paste, and does not lead with another page's query", () => {
  const html = page();
  const body = main(html);
  const visible = text(body);
  for (const fact of ["日本語", "11", "自動検出", "貼り付け"]) assert.ok(visible.includes(fact), fact);
  const section4 = text(body.slice(body.indexOf('id="ja-speech-to-text-mac-section-4"'), body.indexOf('id="ja-speech-to-text-mac-section-5"')));
  for (const fact of ["日本語", "11", "自動検出"]) assert.ok(section4.includes(fact), `section 4: ${fact}`);
  const withoutTable = text(body.replace(tableAfter(html, "ja-speech-to-text-mac-table"), ""));
  assert.doesNotMatch(withoutTable, /直接入力|オフライン音声入力ガイド|買い切り版/);
  assert.doesNotMatch(copy.metaDescription, /買い切り|サブスク|ショートカット|できない/);
});
