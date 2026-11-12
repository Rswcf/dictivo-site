import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { introOfferActive } from "../../data/local-offer.mjs";
import { OFFLINE_GUIDE_PRICES_CHECKED } from "../../data/offline-dictation-guide.mjs";
import {
  JA_NO_SUBSCRIPTION_GUIDE_CHECKED,
  JA_NO_SUBSCRIPTION_GUIDE_READY,
  jaNoSubscriptionGuideCopy,
} from "../../data/ja-no-subscription-guide.mjs";

// The Japanese 買い切り guide (Batch B3, page J2), the counterpart of the English no-subscription
// guide. The shared contract (order, pairing, schema, sitemap, reach) is in
// tests/structure/ja-guides.test.mjs; this file pins the page's own wording: the query as H1, the
// six ways people ask, the twelve rows and their 支払い方法 cells, the vendor figures, the per-row
// check dates, the sections, the FAQ and the links. It targets 買い切り only: オフライン belongs to
// the Japanese offline guide and おすすめ to the Japanese ranking page.
const read = (path) => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const path = "/ja/guides/mac-dictation-app-no-subscription/";
const page = () => read(`${path.slice(1)}index.html`);
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const hasWindowsRelease = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const copy = jaNoSubscriptionGuideCopy({ windows: hasWindowsRelease });
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, body]) => [JSON.parse(body)].flat());
const between = (html, from, to) => html.slice(html.indexOf(from), html.indexOf(to, html.indexOf(from)));
const main = (html) => html.split("<main")[1].split("</main>")[0];
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\s+/g, " ");
const tableAfter = (html, id) => html.slice(html.indexOf(`id="${id}"`)).match(/<table class="compare-table">[\s\S]*?<\/table>/)[0];
const rows = (table) => [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(([, row]) => [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(([, cell]) => cell.trim()));
const jaDate = (iso) => new Intl.DateTimeFormat("ja-JP", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
const section = (body, n) => between(body, `id="ja-no-subscription-section-${n}"`, "</section>");
const DICTIVO_PRICES = introOfferActive() ? 3 : 2;
const DICTIVO = "Dictivo（当サイトの製品）";
const TITLE = "Mac音声入力アプリの買い切り版：サブスクなしで選ぶ";
const H1 = "買い切りで使えるMacの音声入力アプリは？";
const SECTIONS = 6;
const FIRST_SECTION = "買い切りと「アップデート無期限」は別のこと";
const LAST_SECTION = "買い切りが得になるのはどんなとき";
const INTENTS = [
  "mac 音声入力 買い切り",
  "mac 音声入力 サブスクなし",
  "mac 音声入力 オフライン 買い切り",
  "mac 音声入力 ライフタイム ライセンス",
  "mac 音声入力 無料 サブスクなし",
  "Dictivo はサブスクですか",
];
const HEADERS = ["アプリ", "対応するMac", "支払い方法", "買い切り価格", "含まれるアップデート", "Mac内で処理（オフライン可）？", "確認日"];
const APPS = ["Apple Dictation", "Handy", "JesType", "MacWhisper", "Spokenly", "Superwhisper", "Voibe", "Voice Type", "VoiceInk", "Voicetypr", "Wispr Flow", DICTIVO];
// The 支払い方法 cells, which are also the ItemList descriptions.
const HOW_YOU_PAY = [
  "macOSに付属",
  "無料（オープンソース）",
  "買い切り",
  "無料プラン＋買い切りのPro",
  "無料プラン＋買い切りのLocal+（Proはサブスク）",
  "サブスクまたは買い切りのLifetime",
  "サブスクまたは買い切り（ライフタイム）",
  "買い切り（App Storeのアプリ内課金）",
  "買い切り",
  "買い切り",
  "サブスクのみ",
  "買い切り（Dictivo Local）",
];
// Voice Type keeps the site's own check (the Japanese offline guide's facts); every other row was
// read in the competitor facts file and the price spot-check of JA_NO_SUBSCRIPTION_GUIDE_CHECKED.
const SITE_CHECKED = ["Voice Type"];
const FAQS = [
  "買い切りで使えるMacの音声入力アプリは？",
  "Dictivoはサブスクですか？",
  "Dictivoの12か月のアップデートが終わるとどうなりますか？",
  "Superwhisperに買い切りはありますか？",
  "MacWhisperは買い切りですか？",
  "サブスクなしで無料のMac音声入力アプリは？",
  "買い切りの音声入力アプリはオフラインで使えますか？",
  "Dictivoの1つのライセンスを複数のMacで使えますか？",
];
// Wording that must never describe Dictivo's updates.
const FOREVER_UPDATES = /永久|無期限|生涯|ライフタイム|lifetime/i;

test("the 買い切り guide is ready, with the query as its heading and 買い切り as its only lead term", () => {
  const html = page();
  const title = text(html.match(/<title>([^<]*)<\/title>/)[1]).trim();
  const h1 = text(main(html).match(/<h1>([\s\S]*?)<\/h1>/)[1]).trim();
  assert.equal(title, TITLE);
  assert.equal(h1, H1);
  for (const value of [title, h1]) {
    assert.match(value, /買い切り/, value);
    assert.doesNotMatch(value, /オフライン|おすすめ|Windows/, value);
  }
  const [, ...intentRows] = rows(tableAfter(html, "ja-no-subscription-intents"));
  assert.equal(intentRows.filter((row) => text(row[0]).includes("オフライン")).length, 1, "オフライン once, as a qualifier");
});

test("JA_NO_SUBSCRIPTION_GUIDE_READY is true: the page is built", () => {
  assert.equal(JA_NO_SUBSCRIPTION_GUIDE_READY, true);
  assert.ok(page().includes(`<h1>${H1}</h1>`));
});

test("the lede discloses that Dictivo writes the page before it names another product", () => {
  const lede = text(page().match(/<p class="doc-lede">([\s\S]*?)<\/p>/)[1]);
  assert.equal(lede.indexOf("Dictivo"), lede.search(/[A-Za-z]/), "Dictivo is the first product named");
  assert.ok(lede.includes("当サイトの製品"));
  assert.ok(lede.includes(String(APPS.length)), "the number of options");
  for (const column of ["支払い方法", "買い切り価格", "含まれるアップデート"]) assert.ok(lede.includes(column), column);
});

test("the short answer carries the count, the lowest one-time prices and both check dates", () => {
  const answer = text(between(main(page()), 'id="ja-no-subscription-answer"', "</section>").match(/<p>([\s\S]*?)<\/p>/)[1]).trim();
  for (const fact of [`${APPS.length}本`, `${APPS.length - 1}本`, "Wispr Flow", "JesType", "€14.95", "Voice Type", "$19.99", "Dictivo Local", "買い切り", "12か月", jaDate(JA_NO_SUBSCRIPTION_GUIDE_CHECKED), jaDate(OFFLINE_GUIDE_PRICES_CHECKED)]) {
    assert.ok(answer.includes(fact), fact);
  }
  assert.ok(!between(main(page()), 'id="ja-no-subscription-answer"', "</section>").includes('class="price"'), "no Dictivo price in the answer");
});

test("the intent table lists the six ways people ask, in order", () => {
  const [header, ...body] = rows(tableAfter(page(), "ja-no-subscription-intents"));
  assert.deepEqual(header.map((cell) => text(cell).trim()), ["よくある検索", "短い答え", "確認すること"]);
  assert.deepEqual(body.map((row) => text(row[0]).trim()), INTENTS);
  for (const row of body) assert.equal(row.length, 3, row[0]);
});

test("the fact table lists twelve apps alphabetically with Dictivo last, dated per row", () => {
  const [header, ...body] = rows(tableAfter(page(), "ja-no-subscription-table"));
  assert.deepEqual(header.map((cell) => text(cell).trim()), HEADERS);
  assert.deepEqual(body.map((row) => text(row[0]).trim()), APPS);
  assert.equal(text(body.at(-1)[0]).trim(), DICTIVO, "Dictivo is the last row");
  assert.deepEqual(body.map((row) => text(row[2]).trim()), HOW_YOU_PAY);
  for (const row of body) {
    const name = text(row[0]).trim();
    assert.equal(row.length, HEADERS.length, name);
    const date = SITE_CHECKED.includes(name) ? OFFLINE_GUIDE_PRICES_CHECKED : JA_NO_SUBSCRIPTION_GUIDE_CHECKED;
    assert.ok(row.at(-1).includes(`<time datetime="${date}">`), `${name}: checked ${date}`);
    const spans = row.map((cell) => (cell.match(/<span class="price">/g) || []).length);
    if (name === DICTIVO) {
      assert.equal(spans[3], DICTIVO_PRICES, "Dictivo prices come from price placeholders");
      assert.equal(spans.reduce((sum, count) => sum + count, 0), DICTIVO_PRICES, "prices only in the price cell");
    } else {
      assert.equal(spans.reduce((sum, count) => sum + count, 0), 0, `${name}: no Dictivo price span`);
      assert.doesNotMatch(row.join(" "), /US\$|米ドル/, name);
    }
  }
  const cell = (name, index) => text(body.find((row) => text(row[0]).trim() === name)[index]).trim();
  assert.match(cell("JesType", 3), /€14\.95.*€34\.95.*€49\.95/);
  assert.match(cell("Voibe", 3), /\$199.*\$9\.90.*\$99/);
  assert.match(cell("Superwhisper", 3), /\$249\.99/);
  assert.match(cell("Wispr Flow", 3), /\$15.*\$12/);
  assert.match(cell("Voice Type", 3), /\$19\.99/);
  assert.match(cell("MacWhisper", 3), /€64/);
  assert.match(cell("Spokenly", 3), /^Spokenly：.*\$29.*\$15.*\$144.*\$12/);
  assert.match(cell("VoiceInk", 3), /^VoiceInk：.*\$25.*\$39.*\$49/);
  assert.match(cell("Voicetypr", 3), /\$39.*\$69.*\$99.*\$199/);
  assert.equal(cell("VoiceInk", 1), "Apple Silicon、macOS 14.4以降（料金ページ）");
  assert.equal(cell("JesType", 1), "Apple Siliconのみ、macOS 13.4以降");
  assert.match(cell("Voicetypr", 1), /macOS 14以降.*Apple Silicon推奨/);
  assert.match(cell("Apple Dictation", 1), /Apple Silicon.*対応言語/);
  for (const name of ["MacWhisper", "Spokenly", "Voibe", "Voice Type", "Wispr Flow"]) assert.equal(cell(name, 1), "記載なし", name);
  for (const name of ["JesType", "MacWhisper", "VoiceInk", "Voicetypr"]) assert.equal(cell(name, 4), "すべてのアップデート込み（ベンダー表記は「lifetime」）", name);
  for (const name of ["Spokenly", "Voice Type"]) assert.equal(cell(name, 4), "記載なし", name);
  assert.equal(
    cell(DICTIVO, 1),
    hasWindowsRelease
      ? "Apple SiliconとIntel。ローカル音声入力は macOS 15.4 以降（Dictivo 0.3.57）。同じライセンスでWindows x64も使えます。"
      : "Apple SiliconとIntel。ローカル音声入力は macOS 15.4 以降（Dictivo 0.3.57）。Windows x64 のダウンロードは一時的に利用できません。",
  );
  assert.ok(cell(DICTIVO, 4).includes("12か月") && cell(DICTIVO, 4).includes("任意"), "Dictivo updates");
  assert.doesNotMatch(cell(DICTIVO, 4), FOREVER_UPDATES);
  assert.equal(cell(DICTIVO, 5), "Localモードでは端末上で処理。任意の月額アドオン Cloud Fast は、送った録音だけをアップロードします。");
});

test("the method note says the facts come from vendor pages, marks gaps as 記載なし and measures nothing", () => {
  const method = text(between(main(page()), 'id="ja-no-subscription-method"', "</section>"));
  for (const phrase of ["ベンダー", "確認日", "記載なし", "測定していません", `Dictivo チーム、${jaDate(JA_NO_SUBSCRIPTION_GUIDE_CHECKED)}。`]) assert.ok(method.includes(phrase), phrase);
});

test("six sections, Dictivo's update terms never read as forever, and Dictivo pastes", () => {
  const html = page();
  const body = main(html);
  const headings = [...body.matchAll(/<h2 id="ja-no-subscription-section-\d+-title">([\s\S]*?)<\/h2>/g)].map(([, heading]) => text(heading).trim());
  assert.equal(headings.length, SECTIONS);
  assert.equal(headings[0], FIRST_SECTION);
  assert.equal(headings.at(-1), LAST_SECTION);
  assert.ok(!body.includes(`id="ja-no-subscription-section-${SECTIONS + 1}"`), "no extra section");
  // The first section's heading names the misconception it corrects; nothing else may say 永久 or 無期限.
  const rest = text(body.replace(tableAfter(html, "ja-no-subscription-table"), "").replace(`>${FIRST_SECTION}</h2>`, "></h2>"));
  assert.doesNotMatch(rest, /永久|無期限/);
  for (const phrase of ["更新は任意", "12か月", "貼り付け"]) assert.ok(rest.includes(phrase), phrase);
  assert.doesNotMatch(text(section(body, 4)), FOREVER_UPDATES, "the Dictivo section");
  assert.match(text(section(body, 1)), /Dictivo Local.*12か月.*更新は任意/, "section 1 states Dictivo's terms");
  assert.equal((body.match(/<code>brew install --cask deepviewsdev\/tap\/dictivo<\/code>/g) || []).length, 1, "the Homebrew command once");
  for (const label of ["マイク", "アクセシビリティ", "Set up Local", "Cmd+Shift+Space"]) assert.ok(text(section(body, 5)).includes(label), label);
});

test("the sections link where the plan says, and Japanese copy never links /pricing/", () => {
  const html = page();
  const body = main(html);
  assert.ok(section(body, 2).includes('href="/guides/dictation-app-mac-windows-one-time-license/"'));
  assert.ok(text(section(body, 2)).includes("MacとWindowsで1つのライセンスの音声入力アプリ（英語）"));
  assert.ok(section(body, 3).includes('href="/ja/guides/offline-dictation-on-mac/"'));
  assert.ok(text(section(body, 3)).includes("オフラインで使うための設定とアプリ比較"));
  assert.ok(section(body, 4).includes('href="/ja/#pricing"'));
  assert.ok(section(body, 5).includes('href="/ja/guides/first-local-dictation/"'));
  assert.ok(section(body, 6).includes('href="/ja/#pricing"'));
  assert.ok((html.match(/href="\/ja\/#pricing"/g) || []).length >= 3, "intro, trial panel and sections");
  assert.ok(!html.includes('href="/pricing/'), "no English pricing link");
});

test("the eight FAQ questions, in order, match the FAQ schema", () => {
  const html = page();
  const questions = [...main(html).matchAll(/<span class="faq-question">([^<]+)<\/span>/g)].map(([, question]) => text(question).trim());
  assert.deepEqual(questions, FAQS);
  assert.deepEqual(jsonLd(html).find((node) => node["@type"] === "FAQPage").mainEntity.map((item) => item.name), FAQS);
  const answers = Object.fromEntries(copy.faqs);
  for (const question of ["Dictivoはサブスクですか？", "Dictivoの12か月のアップデートが終わるとどうなりますか？"]) {
    assert.doesNotMatch(answers[question], FOREVER_UPDATES, question);
  }
  assert.match(answers["Dictivoはサブスクですか？"], /いいえ.*買い切り.*12か月.*更新は任意/);
});

test("the ItemList names the twelve rows and describes each by how you pay", () => {
  const list = jsonLd(page()).find((node) => node["@type"] === "ItemList");
  assert.equal(list.name, "買い切りで使えるMacの音声入力アプリ");
  assert.deepEqual(list.itemListElement.map((item) => item.name), APPS);
  assert.deepEqual(list.itemListElement.map((item) => item.description), HOW_YOU_PAY);
});

test("related pages and references", () => {
  const related = between(main(page()), 'id="ja-no-subscription-related"', "</section>");
  for (const href of [
    "https://dictivo.app/ja/guides/best-speech-to-text-apps-for-mac/",
    "https://dictivo.app/ja/guides/offline-dictation-on-mac/",
    "https://dictivo.app/ja/guides/first-local-dictation/",
    "https://dictivo.app/ja/compare/superwhisper-alternative/",
    "https://dictivo.app/ja/compare/macwhisper-alternative/",
    "https://dictivo.app/ja/compare/voiceink-alternative/",
    "https://dictivo.app/ja/#pricing",
    "https://dictivo.app/refund/",
    "https://dictivo.app/guides/dictation-app-mac-windows-one-time-license/",
    "https://dictivo.app/guides/mac-dictation-app-no-subscription/",
  ]) {
    assert.ok(related.includes(`<a href="${href}">`), href);
  }
  assert.ok(text(related).includes("英語版"), "the English version row");
  const references = between(main(page()), 'id="ja-no-subscription-references"', "</section>");
  const links = [...references.matchAll(/<li><a href="([^"]+)">([^<]+)<\/a><\/li>/g)].map(([, href, label]) => [href, text(label)]);
  for (const href of ["https://dictivo.app/ja/#pricing", "https://dictivo.app/ja/privacy/where-dictation-audio-goes/", "https://github.com/deepviewsdev/homebrew-tap"]) {
    assert.ok(links.some(([url]) => url === href), href);
  }
  for (const host of ["support.apple.com", "github.com/cjpais/Handy", "handy.computer", "jestype.com", "macwhisper.com", "spokenly.app/pricing", "https://spokenly.app/", "superwhisper.com", "tryvoiceink.com", "voicetypr.com", "wisprflow.ai", "getvoibe.com/pricing"]) {
    const found = links.filter(([href]) => href === host || href.includes(host));
    assert.ok(found.length > 0, host);
    for (const [, label] of found) assert.ok(label.endsWith(`（${JA_NO_SUBSCRIPTION_GUIDE_CHECKED}確認）`), `${host}: ${label}`);
  }
  const voiceType = links.find(([href]) => href.includes("apps.apple.com/us/app/voice-type"));
  assert.ok(voiceType && voiceType[1].endsWith(`（${OFFLINE_GUIDE_PRICES_CHECKED}確認）`), "Voice Type keeps the site's check date");
  assert.ok(!links.some(([href]) => href === "https://dictivo.app/pricing/"), "Japanese pricing only");
});
