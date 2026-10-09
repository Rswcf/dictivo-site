import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCALES } from "../data/site-content.mjs";
import { pricingAnchor } from "../data/local-offer-copy.mjs";
import { toHant } from "../scripts/lib/hant.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
const home = (locale) => readFileSync(`${dist}${locale.path.slice(1)}index.html`, "utf8");
const text = (markup) => markup
  .replace(/<span class="price">[^<]*<\/span>/g, "{{price.local.inline}}")
  .replace(/<!--\/?email_off-->/g, "")
  .replaceAll("&amp;", "&");
const pricingBody = (html) => text(/<h2 id="pricing-title">[^<]*<\/h2>\s*<p>([^<]*(?:<span class="price">[^<]*<\/span>[^<]*)*)<\/p>/.exec(html)?.[1] ?? "");
const checkoutBody = (html) => text(/id="checkout-local-pending"[^>]*>\s*<strong>[^<]*<\/strong>\s*<p>([\s\S]*?)<\/p>/.exec(html)?.[1] ?? "");

// Dictivo Local is bought once. These phrases told readers they would subscribe to it.
const SUBSCRIBE = {
  de: /bevor Sie abonnieren/, fr: /avant de vous abonner/, es: /antes de suscribirte/, it: /prima di abbonarti/,
  nl: /voordat je abonneert/, pt: /antes de assinar/, zh: /订阅前/, "zh-hant": /訂閱前/, ja: /購読/, ko: /구독 전/,
};
// The app activates Local with a license key (or claims it automatically after an in-app purchase).
const LICENSE_KEY = {
  en: "license key", de: "Lizenzschlüssel", fr: "clé de licence", es: "clave de licencia", it: "chiave di licenza",
  nl: "licentiesleutel", pt: "chave de licença", zh: "许可证密钥", "zh-hant": "授權金鑰", ja: "ライセンスキー", ko: "라이선스 키",
};
const LICENSE_EMAIL = /license e-?mail|Lizenz-E-Mail|e-mail de licence|correo de licencia|email della licenza|licentie-e-mail|e-mail da licença|许可证邮箱|授權信箱|許可證郵箱|ライセンス用メール|라이선스 이메일/i;
// Each homepage's FAQ already promises this refund; the checkout note now repeats it.
const REFUND = {
  en: "Every purchase has a 14-day no-questions refund.",
  de: "Für jeden Kauf gibt es 14 Tage Erstattung ohne Fragen.",
  fr: "Chaque achat bénéficie d'un remboursement 14 jours, sans question.",
  es: "Cada compra tiene un reembolso de 14 días, sin preguntas.",
  it: "Ogni acquisto prevede un rimborso entro 14 giorni, senza domande.",
  nl: "Bij elke aankoop geldt een terugbetaling binnen 14 dagen, zonder vragen.",
  pt: "Toda compra tem reembolso de 14 dias, sem perguntas.",
  zh: "每笔购买都有 14 天无理由退款。",
  "zh-hant": "每筆購買都有 14 天無理由退款。",
  ja: "購入にはすべて 14 日間の返金保証が付き、理由は問いません。",
  ko: "모든 구매에는 이유를 묻지 않는 14일 환불이 적용됩니다.",
};

test("every homepage pricing introduction ends with the one-time price beside subscription apps", () => {
  for (const locale of LOCALES) {
    const body = pricingBody(home(locale));
    const anchor = locale.code === "zh-hant" ? toHant(pricingAnchor("zh")) : pricingAnchor(locale.code);
    assert.ok(body.endsWith(anchor), `${locale.code}: pricing introduction "${body}" does not end with "${anchor}"`);
    assert.ok(body.length > anchor.length + 20, `${locale.code}: the free-trial sentence is missing: "${body}"`);
  }
});

test("no homepage describes buying Local as subscribing", () => {
  for (const locale of LOCALES) {
    const html = home(locale);
    if (SUBSCRIBE[locale.code]) assert.doesNotMatch(html, SUBSCRIBE[locale.code], locale.code);
    assert.doesNotMatch(pricingBody(html), /\bsubscribe|abonnieren|vous abonner|suscribirte|abbonarti|abonneert|assinar\b|订阅前|訂閱前|購読|구독 전/i, locale.code);
  }
});

test("every checkout note names the license key and the 14-day refund", () => {
  for (const locale of LOCALES) {
    const html = home(locale);
    const body = checkoutBody(html);
    assert.ok(body.includes(LICENSE_KEY[locale.code]), `${locale.code}: "${body}"`);
    assert.ok(body.includes(REFUND[locale.code]), `${locale.code}: "${body}"`);
    assert.ok(body.includes("support@dictivo.app"), `${locale.code}: "${body}"`);
    assert.doesNotMatch(html, LICENSE_EMAIL, locale.code);
  }
});

test("homepage sitemap dates record the 2026-10-09 pricing and checkout copy", () => {
  const sitemap = readFileSync(`${dist}sitemap.xml`, "utf8");
  const dates = new Map([...sitemap.matchAll(/<loc>https:\/\/dictivo\.app([^<]*)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map((m) => [m[1], m[2]]));
  for (const locale of LOCALES) assert.ok(dates.get(locale.path) >= "2026-10-09", `${locale.path}: ${dates.get(locale.path)}`);
});
