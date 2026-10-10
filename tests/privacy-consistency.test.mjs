import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { TRIAL_MILESTONE_COPY } from "../data/trial-milestone-copy.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
// Visible text only: scripts and tags out, whitespace collapsed.
const visibleText = (path) =>
  readFileSync(path, "utf8")
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ");

test("trial milestones name app.dictivo.app first in every language, api.dictivo.app only for versions before 0.3.51", () => {
  for (const [locale, copy] of Object.entries(TRIAL_MILESTONE_COPY)) {
    const current = copy.trial.indexOf("app.dictivo.app");
    const legacy = copy.trial.indexOf("api.dictivo.app");
    assert.ok(current >= 0, `${locale}: trial copy does not name app.dictivo.app`);
    assert.ok(legacy > current, `${locale}: api.dictivo.app is named before app.dictivo.app`);
    assert.ok(copy.trial.includes("0.3.51"), `${locale}: api.dictivo.app is not tied to versions before 0.3.51`);
  }
});

test("the Privacy Policy and /security/ call the statistics setting what the app calls it", () => {
  for (const path of ["privacy/index.html", "security/index.html"]) {
    const text = visibleText(`${dist}${path}`);
    assert.ok(text.includes("Share usage statistics"), `${path}: the 0.3.51 setting name is missing`);
    assert.ok(!text.includes("Anonymous usage statistics"), `${path}: still titled Anonymous usage statistics`);
    assert.ok(!/anonymous statistics/i.test(text), `${path}: still calls the statistics anonymous`);
    assert.ok(text.includes("hashed device identifier that does not name you"), `${path}: the device identifier is not disclosed`);
  }
});

test("German pages address the reader as Sie", () => {
  const pages = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (name === "index.html") pages.push(path);
    }
  };
  walk(`${dist}de`);
  assert.ok(pages.length >= 10, `only ${pages.length} German pages found`);
  for (const path of pages) {
    const informal = visibleText(path).match(/\b(du|dein|deine|deinem|deinen|deiner|deines|dich|dir)\b/g);
    assert.equal(informal, null, `${path.slice(dist.length)} uses du-forms: ${informal?.join(", ")}`);
  }
});

test("the Privacy Policy and /security/ explain the dictivo-self opt-out flag, and the served site.js reads it", () => {
  for (const path of ["privacy/index.html", "security/index.html"]) {
    const text = visibleText(`${dist}${path}`);
    assert.ok(text.includes("dictivo-self"), `${path}: the flag name is missing`);
    assert.ok(text.includes("dictivo.app/?self=1"), `${path}: the /?self=1 address is missing`);
    assert.ok(text.includes("/?self=0 removes the flag"), `${path}: the /?self=0 sentence is missing`);
    const dated = readFileSync(`${dist}${path}`, "utf8").replace(/\s+/g, " ").match(/Last (?:updated|reviewed) <time datetime="(\d{4}-\d{2}-\d{2})"/);
    assert.ok(dated, `${path}: the page date is missing`);
    assert.ok(dated[1] >= "2026-09-29", `${path}: the page date is older than the flag sentence`);
  }
  assert.ok(readFileSync(`${dist}assets/site.js`, "utf8").includes('"dictivo-self"'), "dist/assets/site.js does not name the dictivo-self flag");
});

// Desktop 0.3.54 (spec 2026-10-09 §6): the install census and the optional trial reminder email.
test("every language explains the trial reminder: purpose, deletion and how to withdraw, with support@dictivo.app", () => {
  // Where the address is kept is named by region; provider names stay out of public copy (check-public-output).
  const region = { en: "Western Europe", de: "Westeuropa", fr: "Europe de l'Ouest", es: "Europa occidental", it: "Europa occidentale", nl: "West-Europa", pt: "Europa Ocidental", zh: "西欧", ja: "西ヨーロッパ", ko: "서유럽" };
  for (const [locale, copy] of Object.entries(TRIAL_MILESTONE_COPY)) {
    assert.ok(copy.reminder, `${locale}: reminder copy missing`);
    assert.ok(copy.reminder.includes("support@dictivo.app"), `${locale}: reminder does not name support@dictivo.app`);
    assert.ok(copy.reminder.includes("14"), `${locale}: reminder does not name the 14-day trial`);
    assert.ok(copy.reminder.includes(region[locale]), `${locale}: reminder does not name where the address is kept`);
    assert.ok(!/Cloudflare/i.test(copy.reminder), `${locale}: reminder names a provider`);
  }
});

test("every language's content-free report sentence covers the first open and the permission outcome", () => {
  const firstOpen = { en: "first opened", de: "zum ersten Mal geöffnet", fr: "ouverte pour la première fois", es: "se abrió por primera vez", it: "aperta per la prima volta", nl: "voor het eerst is geopend", pt: "aberto pela primeira vez", zh: "首次打开", ja: "初めて開いた", ko: "처음 열었다" };
  for (const [locale, copy] of Object.entries(TRIAL_MILESTONE_COPY)) {
    assert.ok(copy.trial.includes(firstOpen[locale]), `${locale}: the first open is not disclosed`);
  }
});

test("the Privacy Policy carries the trial reminder section and its deletion sentence", () => {
  const text = visibleText(`${dist}privacy/index.html`);
  assert.ok(text.includes("Trial reminder email"), "the trial reminder section is missing");
  assert.ok(text.includes("Dictivo deletes the address from its database the moment that email is sent"), "the deletion sentence is missing");
  assert.ok(text.includes("withdrawing does not affect what was processed before"), "the consent sentence is missing");
  assert.ok(text.includes("that the app was first opened"), "the install census is not disclosed");
  const dated = readFileSync(`${dist}privacy/index.html`, "utf8").replace(/\s+/g, " ").match(/Last (?:updated|reviewed) <time datetime="(\d{4}-\d{2}-\d{2})"/);
  assert.ok(dated && dated[1] >= "2026-10-10", "the Privacy Policy date predates the reminder text");
});

test("each language's audio-path page discloses the reminder in that language", () => {
  const phrase = { de: "Zustellprotokolle", fr: "journaux de distribution", es: "registros de entrega", it: "log di consegna", nl: "bezorglogs", pt: "registros de entrega", zh: "投递日志", ja: "配信ログ", ko: "전송 기록" };
  for (const [locale, words] of Object.entries(phrase)) {
    const text = visibleText(`${dist}${locale}/privacy/where-dictation-audio-goes/index.html`);
    assert.ok(text.includes(words), `${locale}: the reminder sentence is missing`);
    assert.ok(text.includes("support@dictivo.app"), `${locale}: support@dictivo.app is missing`);
  }
});

test("/security/ lists the install census and the trial reminder on the app.dictivo.app row", () => {
  const text = readFileSync(`${dist}security/index.html`, "utf8").replace(/\s+/g, " ");
  assert.ok(text.includes("install census (first open, permission state)"), "census missing from the host table");
  assert.ok(text.includes("trial reminder email address (optional, deleted when sent)"), "reminder missing from the host table");
  assert.ok(text.includes("<strong>Install census</strong>"), "census bullet missing");
  assert.ok(text.includes("<strong>Trial reminder</strong>"), "reminder bullet missing");
});
