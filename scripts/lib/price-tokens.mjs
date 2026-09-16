import { CLOUD_FAST_MONTHLY_PRICE, LOCAL_OFFER } from "../../data/local-offer.mjs";
import { formatPrice, priceLanguage } from "../../data/price-display.mjs";

// Prices in US cents. Copy writes {{price.<amount>.<form>}}; write() renders each one for
// the page language. Every buyer pays the same tax-inclusive total.
export const PRICE_AMOUNTS = Object.freeze({
  local: LOCAL_OFFER.price * 100,
  regular: LOCAL_OFFER.regularPrice * 100,
  renewal: LOCAL_OFFER.updateRenewal * 100,
  threeYear: (LOCAL_OFFER.price + 2 * LOCAL_OFFER.updateRenewal) * 100,
  cloudFast: Math.round(CLOUD_FAST_MONTHLY_PRICE * 100),
});

const PRICE_FORMS = ["main", "note", "inline"];
const TOKEN = /\{\{price\.(\w+)\.(\w+)\}\}/g;
const SCHEMA_BLOCK = /(<script type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/g;

export function priceToken(amount, form) {
  if (!Object.hasOwn(PRICE_AMOUNTS, amount)) throw new Error(`Unknown price amount "${amount}"`);
  if (!PRICE_FORMS.includes(form)) throw new Error(`Unknown price form "${form}"`);
  return `{{price.${amount}.${form}}}`;
}

// Structured-data price strings ("29", "8.99"): the tax-inclusive totals buyers pay.
export function schemaPrice(amount) {
  if (!Object.hasOwn(PRICE_AMOUNTS, amount)) throw new Error(`Unknown price amount "${amount}"`);
  const cents = PRICE_AMOUNTS[amount];
  return cents % 100 === 0 ? String(cents / 100) : (cents / 100).toFixed(2);
}

export function resolvePriceTokens(path, body) {
  if (!body.includes("{{price.")) return body;
  if (!path.endsWith(".html")) throw new Error(`${path}: prices can only be placed in HTML pages`);
  const lang = /<html lang="([^"]+)"/.exec(body)?.[1];
  if (!lang) throw new Error(`${path}: a page with prices needs <html lang>`);
  const language = priceLanguage(lang);
  const text = (amount, form) => {
    if (!Object.hasOwn(PRICE_AMOUNTS, amount)) throw new Error(`${path}: unknown price amount "${amount}"`);
    return formatPrice({ cents: PRICE_AMOUNTS[amount], form, lang: language });
  };

  // Replacer functions throughout: prices contain "$", which replacement strings would interpret.
  const html = body.replace(SCHEMA_BLOCK, (_block, open, json, close) =>
    `${open}${json.replace(TOKEN, (_token, amount, form) => JSON.stringify(text(amount, form)).slice(1, -1))}${close}`);
  const bodyStart = html.search(/<body[\s>]/);
  if (bodyStart < 0 || html.slice(0, bodyStart).includes("{{price.")) {
    throw new Error(`${path}: titles and meta tags must not contain prices`);
  }
  if (/<[^<>]*\{\{price\./.test(html)) throw new Error(`${path}: a price placeholder is inside an HTML tag`);
  return html.replace(TOKEN, (_token, amount, form) => `<span class="price">${escapeHtml(text(amount, form))}</span>`);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}
