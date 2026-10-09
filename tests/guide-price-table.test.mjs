import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCAL_OFFER, introOfferActive, offerDate } from "../data/local-offer.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
const CHECKED = "2026-09-29";
const PRICED = { en: "", de: "de/", ja: "ja/", zh: "zh/", "zh-hant": "zh-hant/" };
const UNPRICED = ["fr", "es", "it", "nl", "pt", "ko"];
const guide = (prefix) => readFileSync(`${dist}${prefix}guides/offline-dictation-on-mac/index.html`, "utf8");
const bestSpeech = () => readFileSync(`${dist}guides/best-speech-to-text-apps-for-mac/index.html`, "utf8");
const tableAfter = (html, id) => html.slice(html.indexOf(`id="${id}"`)).match(/<table class="compare-table">[\s\S]*?<\/table>/)[0];
const rows = (table) => [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(([, row]) => [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(([, cell]) => cell.trim()));
const text = (cell) => cell.replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
// The Dictivo cell prices Local and the renewal, plus the regular price while the introductory offer runs.
const DICTIVO_PRICES = introOfferActive() ? 3 : 2;
const DICTIVO_SPAN = (dollars) => new RegExp(`<span class="price">[^<]*(?<![\\d.,])${dollars}(?![\\d.,])[^<]*</span>`);

test("the short answer comes straight after the heading, lede and date", () => {
  for (const prefix of [...Object.values(PRICED), ...UNPRICED.map((code) => `${code}/`)]) {
    const html = guide(prefix);
    const main = html.slice(html.indexOf('<main class="doc-page offline-guide-page"'));
    const answer = main.indexOf('<section class="doc-section" aria-labelledby="offline-guide-answer">');
    const date = main.indexOf('<p class="doc-meta">');
    assert.ok(answer > date, `${prefix}: answer before the date`);
    for (const later of ['class="first-dictation-link"', "<nav ", 'aria-labelledby="offline-guide-table"']) {
      const index = main.indexOf(later);
      if (index >= 0) assert.ok(answer < index, `${prefix}: ${later} comes before the answer`);
    }
    const section = main.slice(answer, main.indexOf("</section>", answer));
    assert.doesNotMatch(section, /doc-meta/, `${prefix}: the answer repeats the eyebrow`);
  }
});

test("the English answer is a verdict that names each app and who it suits", () => {
  const html = guide("");
  const answer = text(html.match(/id="offline-guide-answer">[\s\S]*?<p>([\s\S]*?)<\/p>/)[1]);
  for (const app of ["Dictivo Local", "VoiceInk", "Voice Type", "Voibe", "Superwhisper", "MacWhisper", "Aiko", "Apple Dictation", "Wispr Flow"]) {
    assert.ok(answer.includes(app), `answer does not name ${app}`);
  }
  assert.match(answer, /Intel Macs use cloud transcription/);
  assert.match(answer, /transcription (runs|occurs) in the cloud/);
  assert.doesNotMatch(answer, /accura/i);
});

test("offline guides with a price column show a price, a purchase model and a check date for every app", () => {
  for (const [code, prefix] of Object.entries(PRICED)) {
    const table = tableAfter(guide(prefix), "offline-guide-table");
    const [header, ...body] = rows(table);
    assert.equal(header.length, 6, `${code}: header`);
    assert.equal(body.length, 9, `${code}: rows`);
    for (const row of body) {
      assert.equal(row.length, 6, `${code}: ${row[0]}`);
      assert.ok(text(row[4]).length > 6, `${code}: ${row[0]} has no price`);
      assert.ok(row[5].includes(`<time datetime="${CHECKED}">`), `${code}: ${row[0]} has no check date`);
    }
    const dictivo = body.find((row) => row[0] === "Dictivo Local")[4];
    assert.equal((dictivo.match(/<span class="price">/g) || []).length, DICTIVO_PRICES, `${code}: Dictivo prices must come from price placeholders`);
    assert.match(dictivo, DICTIVO_SPAN(LOCAL_OFFER.price), `${code}: no Local price`);
    const dateCode = code === "zh-hant" ? "zh" : code;
    if (introOfferActive()) {
      assert.ok(dictivo.includes(offerDate(LOCAL_OFFER.introPriceUntil, dateCode)), `${code}: no introductory end date`);
      assert.ok(dictivo.includes(offerDate(LOCAL_OFFER.regularPriceFrom, dateCode)), `${code}: no regular price date`);
    } else {
      assert.doesNotMatch(text(dictivo), /2026/, `${code}: dated Dictivo price after the rollover`);
    }
    const cell = (app) => text(body.find((row) => row[0] === app)[4]);
    assert.match(cell("VoiceInk"), /\$25.*\$39.*\$49/, code);
    assert.match(cell("Voice Type"), /\$19\.99/, code);
    // Voibe showed $7.50 beside a struck-through $9.90: state the list price, then the discount.
    assert.match(cell("Voibe"), /\$9\.90.*\$7\.50.*\$75.*\$149/, code);
    assert.match(cell("Voibe"), /discount|reduziert|折扣|割引/, code);
    assert.match(cell("Aiko"), /\$24/, code);
    assert.match(cell("Superwhisper"), /\$8\.49.*\$84\.99.*\$249\.99/, code);
    assert.match(cell("MacWhisper"), /€64/, code);
    assert.match(cell("Wispr Flow"), /\$15.*\$12/, code);
    const competitors = table.replace(/<span class="price">[^<]*<\/span>/g, "");
    assert.doesNotMatch(competitors, /US\$/, `${code}: competitor prices are written in plain dollars`);
  }
  const ja = rows(tableAfter(guide("ja/"), "offline-guide-table"));
  assert.ok(ja[0][4].includes("買い切り／サブスク"), "ja: header lacks 買い切り／サブスク");
  assert.match(text(ja.find((row) => row[0] === "Wispr Flow")[4]), /サブスク/);
  assert.match(text(ja.find((row) => row[0] === "Aiko")[4]), /買い切り/);
});

test("languages without a price column keep the four-column table", () => {
  for (const code of UNPRICED) {
    const [header, ...body] = rows(tableAfter(guide(`${code}/`), "offline-guide-table"));
    assert.equal(header.length, 4, code);
    for (const row of body) assert.equal(row.length, 4, `${code}: ${row[0]}`);
  }
});

test("references list each vendor price page with the date it was read", () => {
  for (const html of [guide(""), bestSpeech()]) {
    for (const url of [
      "https://tryvoiceink.com/pricing",
      "https://www.getvoibe.com/pricing/",
      "https://apps.apple.com/us/app/voice-type-offline-dictation/id6736525125?mt=12",
      "https://apps.apple.com/us/app/aiko/id1672085276?platform=mac",
    ]) {
      const link = html.match(new RegExp(`<li><a href="${url.replace(/[?.]/g, "\\$&")}">([^<]+)</a></li>`));
      assert.ok(link, `missing reference ${url}`);
      assert.ok(link[1].includes(CHECKED), `${url}: reference is not dated`);
    }
    assert.doesNotMatch(html, /apps\.apple\.com\/ga\//, "Irish App Store link left in place");
  }
});

test("the Mac speech-to-text guide leads with a verdict and prices every option", () => {
  const html = bestSpeech();
  const answer = text(html.match(/id="speech-to-text-mac-answer">[\s\S]*?<p>([\s\S]*?)<\/p>/)[1]);
  for (const app of ["Dictivo Local", "Superwhisper", "VoiceInk", "Voice Type", "Voibe", "MacWhisper", "Aiko", "Wispr Flow", "Apple Dictation"]) {
    assert.ok(answer.includes(app), `answer does not name ${app}`);
  }
  const [header, ...body] = rows(tableAfter(html, "speech-to-text-mac-apps"));
  assert.deepEqual(header.slice(4), ["Price / purchase model", "Checked on"]);
  for (const row of body) {
    assert.equal(row.length, 6, row[0]);
    assert.ok(row[5].includes(`<time datetime="${CHECKED}">`), row[0]);
  }
  const merged = text(body.find((row) => row[0].startsWith("VoiceInk"))[4]);
  assert.match(merged, /VoiceInk.*\$25.*Voice Type.*\$19\.99.*Voibe.*\$149/);
  assert.equal((body[0][4].match(/<span class="price">/g) || []).length, DICTIVO_PRICES, "Dictivo prices must come from price placeholders");
  assert.match(body[0][4], DICTIVO_SPAN(LOCAL_OFFER.price), "no Local price");
});
