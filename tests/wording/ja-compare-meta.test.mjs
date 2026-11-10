import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// 2026-11-11: the MacWhisper and VoiceInk pages moved again (vendor update wording).
// 2026-11-10: each Japanese comparison page has its own title and description instead of the
// shared template. The Dragon page keeps its 2026-10-09 date: that date records the Dragon price
// check (tests/facts/dragon-price-status.test.mjs).
const read = (path) => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const length = (s) => [...s].length;
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, body]) => JSON.parse(body));
const meta = (html, attribute, name) => html.match(new RegExp(`<meta ${attribute}="${name}" content="([^"]*)"`))?.[1];
const visibleDate = (html) => html.match(/<time datetime="([^"]+)"/)?.[1];

const JA_COMPARE_META = [
  ["wispr-flow-alternative", "Wispr Flowの代替：買い切り・オフラインのDictivo", "Wispr Flowは文字起こしをクラウドで行い、有料プランは月額・年額制です。Dictivo Localは端末内で処理する買い切りアプリ。プライバシー、料金、対応OSの違いを比較します。", "2026-11-10"],
  ["superwhisper-alternative", "Superwhisperの代替：Dictivoと料金・機能を比較", "Superwhisperはローカルモデルとクラウドモデルを選べ、月額・年額・買い切りのプランがあります。Dictivo Localとの料金、無料で使える範囲、対応OSの違いを比較します。", "2026-11-10"],
  ["macwhisper-alternative", "MacWhisperの代替：Dictivoと機能・料金を比較", "MacWhisperはmacOS専用で、音声入力に加えてファイルの文字起こしもできます。DictivoはMacとWindows x64に対応する音声入力アプリ。機能、料金、更新の扱いを比較します。", "2026-11-11"],
  ["voiceink-alternative", "VoiceInkの代替：Dictivoと料金・対応OSを比較", "VoiceInkはApple Silicon搭載Mac向けの買い切りアプリです。DictivoはMacとWindows x64に対応し、1つのライセンスで両方に使えます。料金、試用、対応環境の違いを比較します。", "2026-11-11"],
  ["macos-dictation-alternative", "Mac標準の音声入力の代替：Dictivoとの違いを比較", "Macに標準搭載の音声入力は無料で使えます。Dictivoは履歴、辞書、スニペットを備えたローカル音声入力アプリで、Windows x64にも対応。処理の場所と機能の違いを比較します。", "2026-11-10"],
  ["dragon-alternative", "Dragonの代替：Mac対応・買い切りのDictivo", "Dragon ProfessionalはWindows専用で、Mac版は2018年に終了しました。Dictivo LocalはMacとWindows x64で使える買い切りの音声入力アプリ。処理方法、料金、対応OSを比較します。", "2026-10-09"],
];

const REFUND_DESCRIPTION =
  "How to request a Dictivo refund. Dictivo Local purchases can be refunded within 14 days by email. Also covers Cloud Fast cancellation and EU withdrawal rights.";

test("each Japanese comparison page has its own title and description in every head field", () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const [slug, title, description] of JA_COMPARE_META) {
    const html = read(`ja/compare/${slug}/index.html`);
    assert.equal(html.match(/<title>([^<]*)<\/title>/)?.[1], title, `${slug}: <title>`);
    assert.equal(meta(html, "name", "description"), description, `${slug}: description`);
    assert.equal(meta(html, "property", "og:title"), title, `${slug}: og:title`);
    assert.equal(meta(html, "property", "og:description"), description, `${slug}: og:description`);
    assert.equal(meta(html, "name", "twitter:title"), title, `${slug}: twitter:title`);
    assert.equal(meta(html, "name", "twitter:description"), description, `${slug}: twitter:description`);
    const webPage = jsonLd(html).find((node) => node["@type"] === "WebPage");
    assert.equal(webPage.name, title, `${slug}: WebPage name`);
    assert.equal(webPage.description, description, `${slug}: WebPage description`);
    assert.ok(length(title) <= 32, `${slug}: title has ${length(title)} code points`);
    assert.ok(length(description) >= 70 && length(description) <= 120, `${slug}: description has ${length(description)} code points`);
    titles.add(title);
    descriptions.add(description);
  }
  assert.equal(titles.size, JA_COMPARE_META.length, "six distinct titles");
  assert.equal(descriptions.size, JA_COMPARE_META.length, "six distinct descriptions");
});

test("the Japanese comparison hub lists each page under its own title", () => {
  const hub = jsonLd(read("ja/compare/index.html")).find((node) => node["@type"] === "CollectionPage");
  for (const [slug, title] of JA_COMPARE_META) {
    const part = hub.hasPart.find((item) => item.url === `https://dictivo.app/ja/compare/${slug}/`);
    assert.equal(part?.name, title, `${slug}: hub hasPart name`);
  }
});

test("only the Japanese comparison dates move", () => {
  for (const [slug, , , date] of JA_COMPARE_META) {
    const html = read(`ja/compare/${slug}/index.html`);
    assert.equal(visibleDate(html), date, `ja ${slug}: visible date`);
    assert.ok(html.includes(`<time datetime="${date}">`), `ja ${slug}: <time datetime="${date}">`);
    const webPage = jsonLd(html).find((node) => node["@type"] === "WebPage");
    assert.equal(webPage.dateModified, date, `ja ${slug}: dateModified`);
    for (const prefix of ["", "de/"]) {
      const other = visibleDate(read(`${prefix}compare/${slug}/index.html`));
      assert.ok(other, `${prefix || "en/"}${slug}: visible date`);
      assert.ok(!["2026-11-10", "2026-11-11"].includes(other), `${prefix || "en/"}${slug}: date must not move`);
    }
  }
});

test("the refund page description names the 14-day window, Cloud Fast and EU withdrawal", () => {
  const html = read("refund/index.html");
  assert.equal(meta(html, "name", "description"), REFUND_DESCRIPTION);
  assert.equal(meta(html, "property", "og:description"), REFUND_DESCRIPTION);
  assert.ok(length(REFUND_DESCRIPTION) >= 150 && length(REFUND_DESCRIPTION) <= 159, `${length(REFUND_DESCRIPTION)} code points`);
});
