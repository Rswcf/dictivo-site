# Flat Tax-Inclusive Pricing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every buyer pays the same tax-inclusive total; the site, the API and the desktop app show one figure per product (Local US$29 until 2026-10-31, then US$49; Cloud Fast US$8.99 a month) with a per-language "tax included" note, and the per-country price machinery from 2026-09-15 is removed.

**Architecture:** The `{{price.<amount>.<form>}}` placeholder pipeline stays as the single source of prices. `data/price-display.mjs` becomes a language-only formatter (no tax table, no country). `site.js` no longer looks up the visitor's country. The API serves the new Cloud Fast price; the desktop app stops compiling a price into its subscription message. Store changes happen in the order that never lets a shown price fall below the charged price.

**Tech Stack:** Node ESM static generator + node:test (site); Cloudflare Worker + Vitest (API); React/Tauri + Vitest (desktop); Lemon Squeezy dashboard.

**Spec:** `docs/superpowers/specs/2026-09-16-flat-tax-inclusive-pricing-design.md`

## Global Constraints

- Prices: local 2900, regular 4900, renewal 2400, threeYear 7700, cloudFast **899** cents, all derived from `data/local-offer.mjs`.
- Display per language (main / note / inline), NBSP where a space separates number and currency:
  - en `US$29` / `tax included` / `US$29`
  - de `29 US$` / `inkl. MwSt.` / `29 US$ inkl. MwSt.`
  - fr `29 $ US` / `TTC` / `29 $ US TTC`
  - es `29 US$` / `IVA incluido` / `29 US$ IVA incluido`
  - it `29 US$` / `IVA inclusa` / `29 US$ IVA inclusa`
  - nl `US$ 29` / `incl. btw` / `US$ 29 incl. btw`
  - pt `US$ 29` / `impostos incluídos` / `US$ 29 com impostos`
  - zh `US$29` / `含税` / `US$29`
  - zh-hant `US$29` / `含稅` / `US$29（含稅）`
  - ja `US$29` / `税込` / `US$29（税込）`
  - ko `US$29` / `부가세 포함` / `US$29(부가세 포함)`
  - Cents: `US$8.99`, `8,99 US$`, `8,99 $ US`, `US$ 8,99`.
- Titles, meta descriptions, `llms.txt` and HTML attributes carry no price (build throws). JSON-LD gets plain text; every paid offer has `priceSpecification.valueAddedTaxIncluded: true`.
- Public output must not contain "Lemon Squeezy", "Cloudflare" or the other `check-public-output.mjs` forbidden terms.
- Competitor prices are never converted (Whisperstream $29, VoiceInk $25/$39/$49, Wispr, Superwhisper, MacWhisper, Dragon).
- Site work happens in `/Users/mayijie/Projects/Code/034_Dictivo_Site/.worktrees/ip-locale-routing` on branch `feat/flat-tax-inclusive-pricing`; 033 work in `/Users/mayijie/Projects/Code/033_Dictivo/.worktrees/flat-tax-inclusive-pricing` on branch `feat/cloud-fast-8-99`.
- **Safety invariant for rollout:** never let a page or the app show a price lower than the checkout charges. Store "Tax-inclusive pricing" is already ON (verified 2026-09-16 02:42 UTC: Local DE/JP total 29.00, Cloud Fast DE total 6.99, tax "included in total"). The Cloud Fast store price rises to US$8.99 only after Tasks 4, 5 and 8 are live.
- Commit messages end with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.

---

### Task 1: Language-only formatter

**Files:**
- Rewrite: `data/price-display.mjs`
- Rewrite: `tests/price-display.test.mjs`

**Interfaces:**
- Produces:
  - `PRICE_LANGUAGES: string[]` — `["en","de","fr","es","it","nl","pt","zh","zh-hant","ja","ko"]`
  - `priceLanguage(htmlLang) → language` (`zh-Hans`→`zh`, `zh-Hant`/`zh-TW`/`zh-HK`→`zh-hant`, `en-GB`→`en`; throws on unknown)
  - `formatPrice({cents, form: "main"|"note"|"inline", lang}) → string` (throws on non-integer cents or unknown form/language)
- Consumed by Task 2.

- [ ] **Step 1: Write the failing tests** (replace the file):

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCALES } from "../data/site-content.mjs";
import { PRICE_LANGUAGES, formatPrice, priceLanguage } from "../data/price-display.mjs";

const nbsp = (text) => text.replaceAll("_", " ");
const price = (lang, form, cents = 2900) => formatPrice({ cents, form, lang });

test("every language shows one tax-inclusive figure", () => {
  const expected = {
    en: ["US$29", "tax included", "US$29"],
    de: ["29_US$", "inkl. MwSt.", "29_US$ inkl. MwSt."],
    fr: ["29_$_US", "TTC", "29_$_US TTC"],
    es: ["29_US$", "IVA incluido", "29_US$ IVA incluido"],
    it: ["29_US$", "IVA inclusa", "29_US$ IVA inclusa"],
    nl: ["US$_29", "incl. btw", "US$_29 incl. btw"],
    pt: ["US$_29", "impostos incluídos", "US$_29 com impostos"],
    zh: ["US$29", "含税", "US$29"],
    "zh-hant": ["US$29", "含稅", "US$29（含稅）"],
    ja: ["US$29", "税込", "US$29（税込）"],
    ko: ["US$29", "부가세 포함", "US$29(부가세 포함)"],
  };
  for (const [lang, [main, note, inline]] of Object.entries(expected)) {
    assert.equal(price(lang, "main"), nbsp(main), `${lang} main`);
    assert.equal(price(lang, "note"), nbsp(note), `${lang} note`);
    assert.equal(price(lang, "inline"), nbsp(inline), `${lang} inline`);
  }
});

test("cents use the language's decimal separator", () => {
  assert.equal(price("en", "main", 899), "US$8.99");
  assert.equal(price("de", "main", 899), nbsp("8,99_US$"));
  assert.equal(price("fr", "inline", 899), nbsp("8,99_$_US TTC"));
  assert.equal(price("nl", "main", 899), nbsp("US$_8,99"));
  assert.equal(price("ja", "inline", 899), "US$8.99（税込）");
  assert.equal(price("en", "main", 4900), "US$49");
  assert.equal(price("de", "inline", 7700), nbsp("77_US$ inkl. MwSt."));
});

test("html lang values map to price languages", () => {
  for (const locale of LOCALES) assert.ok(PRICE_LANGUAGES.includes(priceLanguage(locale.code)), locale.code);
  assert.equal(priceLanguage("zh-Hans"), "zh");
  assert.equal(priceLanguage("zh-Hant"), "zh-hant");
  assert.equal(priceLanguage("en-GB"), "en");
  assert.throws(() => priceLanguage("sv"));
  assert.throws(() => priceLanguage("constructor"));
});

test("bad input is refused", () => {
  assert.throws(() => formatPrice({ cents: 2900, form: "headline", lang: "en" }));
  assert.throws(() => formatPrice({ cents: 29.5, form: "main", lang: "en" }));
  assert.throws(() => formatPrice({ cents: -1, form: "main", lang: "en" }));
});

test("no template leftovers in any language or form", () => {
  for (const lang of PRICE_LANGUAGES) for (const form of ["main", "note", "inline"]) for (const cents of [2900, 899, 7700]) {
    assert.doesNotMatch(formatPrice({ cents, form, lang }), /[{}#]|undefined|NaN/, `${lang} ${form} ${cents}`);
  }
});

test("the module carries no tax table and no forbidden public terms", () => {
  const source = readFileSync(new URL("../data/price-display.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(source, /TAX_RATES|NO_TAX_COUNTRIES|TAX_VERIFIED_ON|cdn-cgi/);
  assert.doesNotMatch(source, /Lemon Squeezy|Cloudflare|request metadata/i);
});
```

- [ ] **Step 2:** `node --test tests/price-display.test.mjs` — expected: FAIL (`PRICE_LANGUAGES` not exported, treatments differ).

- [ ] **Step 3: Rewrite `data/price-display.mjs`:**

```js
// How a Dictivo price reads in each site language. Every buyer pays the same
// tax-inclusive total in US dollars; only the typography and the "tax included"
// wording change with the language.

// money: "#" is the number. note: the line under a card figure. inline: the
// price inside a sentence ({price} is the money string).
const COPY = {
  en: { money: "US$#", decimal: ".", note: "tax included", inline: "{price}" },
  de: { money: "# US$", decimal: ",", note: "inkl. MwSt.", inline: "{price} inkl. MwSt." },
  fr: { money: "# $ US", decimal: ",", note: "TTC", inline: "{price} TTC" },
  es: { money: "# US$", decimal: ",", note: "IVA incluido", inline: "{price} IVA incluido" },
  it: { money: "# US$", decimal: ",", note: "IVA inclusa", inline: "{price} IVA inclusa" },
  nl: { money: "US$ #", decimal: ",", note: "incl. btw", inline: "{price} incl. btw" },
  pt: { money: "US$ #", decimal: ",", note: "impostos incluídos", inline: "{price} com impostos" },
  zh: { money: "US$#", decimal: ".", note: "含税", inline: "{price}" },
  "zh-hant": { money: "US$#", decimal: ".", note: "含稅", inline: "{price}（含稅）" },
  ja: { money: "US$#", decimal: ".", note: "税込", inline: "{price}（税込）" },
  ko: { money: "US$#", decimal: ".", note: "부가세 포함", inline: "{price}(부가세 포함)" },
};

export const PRICE_LANGUAGES = Object.freeze(Object.keys(COPY));
const PRICE_FORMS = ["main", "note", "inline"];

// Accepts page codes ("zh-hant") and <html lang> values ("zh-Hans", "zh-Hant", "en-GB").
export function priceLanguage(lang) {
  const code = String(lang ?? "").toLowerCase();
  const language = code.startsWith("zh") ? (/^zh-(hant|tw|hk|mo)\b/.test(code) ? "zh-hant" : "zh") : code.split("-")[0];
  if (!Object.hasOwn(COPY, language)) throw new Error(`No price copy for language "${lang}"`);
  return language;
}

export function formatPrice({ cents, form, lang }) {
  if (!Number.isInteger(cents) || cents < 0) throw new Error(`Price must be whole cents, got ${cents}`);
  if (!PRICE_FORMS.includes(form)) throw new Error(`Unknown price form "${form}"`);
  const copy = COPY[priceLanguage(lang)];
  if (form === "note") return copy.note;
  const number = cents % 100 === 0 ? String(cents / 100) : (cents / 100).toFixed(2).replace(".", copy.decimal);
  const money = copy.money.replace("#", number);
  return form === "main" ? money : copy.inline.replace("{price}", money);
}
```

- [ ] **Step 4:** `node --test tests/price-display.test.mjs` — expected: PASS. (`npm test` still fails in `price-tokens`/`price-output` until Tasks 2–3; that is expected.)

- [ ] **Step 5: Commit**

```bash
git add data/price-display.mjs tests/price-display.test.mjs
git commit -m "feat: format every price as one tax-inclusive figure per language

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 2: Placeholders without a country; no browser formatter; Cloud Fast US$8.99

**Files:**
- Modify: `data/local-offer.mjs` (`CLOUD_FAST_MONTHLY_PRICE = 8.99`)
- Modify: `scripts/lib/price-tokens.mjs`
- Rewrite: `tests/price-tokens.test.mjs`
- Modify: `scripts/generate-site.mjs` (import line ~46, `netPriceSpecification` ~2466, `valueAddedTaxIncluded` ~2522 and ~4126, `site.js` prepend ~6203)
- Modify: `assets/site.js` (delete the block from the comment "Prices arrive rendered…" at ~443 to the end of `showVisitorPrices`)
- Modify: `scripts/check-public-output.mjs` (remove the `TAX_VERIFIED_ON` import ~9 and the age guard ~276–278; keep the `{{price.` guard)

**Interfaces:**
- Consumes: Task 1 `formatPrice`, `priceLanguage`.
- Produces (unchanged names): `PRICE_AMOUNTS` (cloudFast now 899), `priceToken(amount, form)`, `schemaPrice(amount)` (`"8.99"`), `resolvePriceTokens(path, body)`; **removed:** `browserPriceScript`.
- Placeholder output: `<span class="price">29 US$</span>` (no data attributes); JSON-LD gets plain JSON-escaped text.

- [ ] **Step 1: Write the failing tests** (replace `tests/price-tokens.test.mjs`):

```js
import test from "node:test";
import assert from "node:assert/strict";
import { PRICE_AMOUNTS, priceToken, resolvePriceTokens, schemaPrice } from "../scripts/lib/price-tokens.mjs";

const page = (lang, head, body) => `<!doctype html>\n<html lang="${lang}">\n<head>${head}</head>\n<body>${body}</body>\n</html>`;
const schema = (text) => `<script type="application/ld+json">{"text":"${text}"}</script>`;

test("amounts follow the commercial terms", () => {
  assert.deepEqual({ ...PRICE_AMOUNTS }, { local: 2900, regular: 4900, renewal: 2400, threeYear: 7700, cloudFast: 899 });
  assert.equal(schemaPrice("local"), "29");
  assert.equal(schemaPrice("cloudFast"), "8.99");
  assert.equal(priceToken("local", "main"), "{{price.local.main}}");
  assert.throws(() => priceToken("lifetime", "main"));
  assert.throws(() => priceToken("local", "headline"));
  assert.throws(() => schemaPrice("lifetime"));
});

test("placeholders in page text become plain price spans", () => {
  const html = resolvePriceTokens("de/index.html", page("de", "<title>Dictivo</title>",
    `<p class="tier-price">${priceToken("local", "main")}<small>einmalig</small></p><p>Verlängerung ${priceToken("renewal", "inline")} pro Jahr</p>`));
  assert.ok(html.includes('<span class="price">29 US$</span><small>'), html);
  assert.ok(html.includes('<span class="price">24 US$ inkl. MwSt.</span> pro Jahr'), html);
  assert.doesNotMatch(html, /data-price-/);
  assert.equal(html.includes("{{price."), false);
  const hant = resolvePriceTokens("zh-hant/index.html", page("zh-Hant", "", priceToken("cloudFast", "note")));
  assert.ok(hant.includes('<span class="price">含稅</span>'), hant);
});

test("dollar signs in prices are never read as replacement patterns", () => {
  const html = resolvePriceTokens("index.html", page("en", schema(`${priceToken("local", "inline")}'s`),
    `<p>${priceToken("local", "inline")}'s price, ${priceToken("cloudFast", "main")}&amp; ${priceToken("local", "main")}\`</p>`));
  assert.ok(html.includes('<span class="price">US$29</span>\'s price'), html);
  assert.ok(html.includes('<span class="price">US$8.99</span>&amp;'), html);
  assert.ok(html.includes('<span class="price">US$29</span>`'), html);
  assert.ok(html.includes('{"text":"US$29\'s"}'), html);
});

test("structured data gets plain text", () => {
  const ja = resolvePriceTokens("ja/index.html", page("ja", schema(`Local ${priceToken("local", "inline")}`), "<p>ok</p>"));
  assert.ok(ja.includes('{"text":"Local US$29（税込）"}'), ja);
  const de = resolvePriceTokens("de/index.html", page("de", schema(`Kostet ${priceToken("local", "inline")} einmalig`), ""));
  const parsed = JSON.parse(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(de)[1]);
  assert.equal(parsed.text, "Kostet 29 US$ inkl. MwSt. einmalig");
});

test("prices are refused where they must not appear", () => {
  assert.throws(() => resolvePriceTokens("index.html", page("en", `<title>Dictivo ${priceToken("local", "inline")}</title>`, "")), /titles and meta tags/);
  assert.throws(() => resolvePriceTokens("index.html", page("en", `<meta name="description" content="${priceToken("local", "inline")}">`, "")), /titles and meta tags/);
  assert.throws(() => resolvePriceTokens("index.html", page("en", "", `<a title="${priceToken("local", "inline")}">x</a>`)), /inside an HTML tag/);
  assert.throws(() => resolvePriceTokens("llms.txt", `Dictivo ${priceToken("local", "inline")}`), /HTML pages/);
  assert.throws(() => resolvePriceTokens("index.html", page("en", "", "{{price.lifetime.inline}}")), /lifetime/);
  assert.throws(() => resolvePriceTokens("index.html", page("en", "", "{{price.local.headline}}")), /headline/);
  assert.throws(() => resolvePriceTokens("index.html", "<body>{{price.local.inline}}</body>"), /html lang/);
  const plain = page("en", "<title>Dictivo</title>", "<p>$85-$180 a year</p>");
  assert.equal(resolvePriceTokens("index.html", plain), plain);
});
```

- [ ] **Step 2:** `node --test tests/price-tokens.test.mjs` — expected: FAIL (cloudFast 699, spans carry data attributes).

- [ ] **Step 3: Implement.**
  - `data/local-offer.mjs`: `export const CLOUD_FAST_MONTHLY_PRICE = 8.99;`
  - `scripts/lib/price-tokens.mjs`: import only `{ formatPrice, priceLanguage }`; in `resolvePriceTokens` compute `const language = priceLanguage(lang)` and `text = (amount, form) => formatPrice({ cents: PRICE_AMOUNTS[amount], form, lang: language })`; the final replacer returns `` `<span class="price">${escapeHtml(formatted)}</span>` ``; delete `browserPriceScript` and the `readFileSync` import; update the header comment (no "home country", no "site.js re-renders").
  - `scripts/generate-site.mjs`: import `{ priceToken, resolvePriceTokens, schemaPrice }`; delete the `writeFileSync(resolve(outDir, "assets/site.js"), …browserPriceScript()…)` line and its comment; rename `netPriceSpecification` → `inclusivePriceSpecification` with `valueAddedTaxIncluded: true` and update its comment ("Structured-data prices are the tax-inclusive totals buyers pay"); set the two Cloud Fast `UnitPriceSpecification` blocks to `valueAddedTaxIncluded: true`.
  - `assets/site.js`: delete from `// Prices arrive rendered for the page language's home country.` through the closing brace of `showVisitorPrices`.
  - `scripts/check-public-output.mjs`: delete the `TAX_VERIFIED_ON` import and the age guard block.

- [ ] **Step 4:** `node --test tests/price-tokens.test.mjs` — PASS. Then `node scripts/generate-site.mjs > /tmp/claude-501/gen.log 2>&1 && grep -c "Wrote" /tmp/claude-501/gen.log` — build succeeds; `head -c 40 dist/assets/site.js` shows the original first line (`document.querySelectorAll(".hero-film")…`), not `const DictivoPrice`.

- [ ] **Step 5: Commit**

```bash
git add data/local-offer.mjs scripts/lib/price-tokens.mjs tests/price-tokens.test.mjs scripts/generate-site.mjs assets/site.js scripts/check-public-output.mjs
git commit -m "feat: resolve prices per language only and raise Cloud Fast to US\$8.99

The visitor-country lookup, the browser formatter and the tax-table age guard go;
structured data states that prices include tax.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 3: Build-output tests, terms, README

**Files:**
- Rewrite: `tests/price-output.test.mjs`
- Modify: `data/trust-pages.mjs` (`LEGAL_LASTMOD` :11 → `"2026-09-16"`; terms sentence :1244)
- Modify: `README.md` lines 6–15
- Keep: `tests/launch-price.test.mjs` (unchanged; it asserts `data-price-cents="4900"` — change that one assertion to `/US\$49|49 US\$|49 \$ US/`)

- [ ] **Step 1: Write the failing tests** (replace `tests/price-output.test.mjs`):

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { LOCALES } from "../data/site-content.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
const files = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? files(path) : [path];
});
const htmlFiles = () => files(dist).filter((path) => path.endsWith(".html"));
const walk = (value, visit) => {
  if (Array.isArray(value)) value.forEach((item) => walk(item, visit));
  else if (value && typeof value === "object") { visit(value); Object.values(value).forEach((item) => walk(item, visit)); }
};
const nbsp = (text) => text.replaceAll("_", " ");

// Local figure, Cloud Fast figure, note — as rendered in the static HTML.
const HOME_PRICES = {
  en: ["US$29", "US$8.99", "tax included"],
  de: ["29_US$", "8,99_US$", "inkl. MwSt."],
  fr: ["29_$_US", "8,99_$_US", "TTC"],
  es: ["29_US$", "8,99_US$", "IVA incluido"],
  it: ["29_US$", "8,99_US$", "IVA inclusa"],
  nl: ["US$_29", "US$_8,99", "incl. btw"],
  pt: ["US$_29", "US$_8,99", "impostos incluídos"],
  zh: ["US$29", "US$8.99", "含税"],
  "zh-hant": ["US$29", "US$8.99", "含稅"],
  ja: ["US$29", "US$8.99", "税込"],
  ko: ["US$29", "US$8.99", "부가세 포함"],
};

test("pricing cards show one figure and a tax-included note in every language", () => {
  for (const locale of LOCALES) {
    const [local, cloudFast, note] = HOME_PRICES[locale.code].map(nbsp);
    const html = readFileSync(`${dist}${locale.path.slice(1)}index.html`, "utf8");
    assert.ok(html.includes(`<p class="tier-price"><span class="price">${local}</span><small>`), `${locale.code}: Local card`);
    assert.ok(html.includes(`<p class="tier-price"><span class="price">${cloudFast}</span><small>`), `${locale.code}: Cloud Fast card`);
    assert.equal((html.match(new RegExp(`<p class="tier-tax"><span class="price">${note}</span>`, "g")) || []).length, 2, `${locale.code}: tax notes`);
    assert.doesNotMatch(html, /data-price-|\{\{price\./, locale.code);
  }
});

test("paid offers in structured data are marked as including tax", () => {
  let offers = 0;
  for (const file of htmlFiles()) {
    for (const [, json] of readFileSync(file, "utf8").matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      walk(JSON.parse(json), (node) => {
        if (node["@type"] !== "Offer" || !["Dictivo Local", "Cloud Fast"].includes(node.name)) return;
        offers += 1;
        assert.equal(node.priceCurrency, "USD", file);
        assert.equal(node.priceSpecification?.valueAddedTaxIncluded, true, `${file}: ${node.name}`);
        assert.equal(node.priceSpecification?.price, node.price, `${file}: ${node.name}`);
        if (node.name === "Cloud Fast") assert.equal(node.price, "8.99", file);
      });
    }
  }
  assert.ok(offers >= LOCALES.length * 2 + 66, `found only ${offers} paid offers`);
});

const withoutPrices = (html) => html
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "")
  .replace(/<span class="price">[^<]*<\/span>/g, "");
const DICTIVO_FIGURE = /\$(?:29|24|49|77)(?!\d)(?![.,]\d)|\$(?:6|8)\.99|US\$|29米ドル/g;

test("every Dictivo price on the site comes from a placeholder", () => {
  for (const file of htmlFiles()) {
    const text = withoutPrices(readFileSync(file, "utf8"));
    for (const match of text.matchAll(DICTIVO_FIGURE)) {
      // Whisperstream ($29) and VoiceInk ($25 / $39 / $49) share figures with Dictivo.
      const before = text.slice(Math.max(0, match.index - 300), match.index);
      assert.match(before, /Whisperstream|VoiceInk|\$25|\$39/, `${file}: unconverted "${match[0]}" after "…${before.slice(-50)}"`);
    }
  }
});

test("titles, meta descriptions and llms.txt carry no Dictivo price", () => {
  for (const file of htmlFiles()) {
    const html = readFileSync(file, "utf8");
    const head = html.slice(0, html.search(/<body[\s>]/)).replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "");
    assert.doesNotMatch(head, /\$(?:29|24|77)(?!\d)(?![.,]\d)|\$(?:6|8)\.99|US\$|29米ドル/, file);
  }
  for (const file of files(dist).filter((path) => path.endsWith("llms.txt"))) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /\$(?:29|24)(?!\d)|\$(?:6|8)\.99|US\$/, file);
  }
});

test("German prices never end a sentence", () => {
  // "inkl. MwSt." already ends in a full stop.
  for (const file of htmlFiles().filter((path) => path.startsWith(`${dist}de/`))) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /inkl\. MwSt\.<\/span>\./, file);
  }
});

test("the terms say prices include tax and are in US dollars", () => {
  const terms = readFileSync(`${dist}terms/index.html`, "utf8");
  assert.match(terms, /Prices include applicable sales tax and VAT/);
  assert.match(terms, /refunds are issued in US dollars/);
  assert.match(terms, /datetime="2026-09-16"/);
});

test("the old country machinery is gone from the public site", () => {
  const js = readFileSync(`${dist}assets/site.js`, "utf8");
  assert.doesNotMatch(js, /cdn-cgi\/trace|DictivoPrice|price_country|showVisitorPrices/);
});

test("no price placeholder reaches the public site", () => {
  for (const file of files(dist)) {
    if (/\.(html|txt|js|json|xml|css)$/.test(file)) assert.equal(readFileSync(file, "utf8").includes("{{price."), false, file);
  }
});
```

- [ ] **Step 2:** `node scripts/generate-site.mjs > /tmp/claude-501/gen.log 2>&1; node --test tests/price-output.test.mjs` — expected: FAIL on the terms test (old sentence, old date) and possibly on notes if Task 2 left anything.

- [ ] **Step 3: Copy edits.**
  - `data/trust-pages.mjs:11` → `const LEGAL_LASTMOD = "2026-09-16";`
  - `data/trust-pages.mjs:1244` → `"Prices include applicable sales tax and VAT; the amount shown is what you pay. Prices are in US dollars and refunds are issued in US dollars.",`
  - `tests/launch-price.test.mjs:46` → `assert.match(html, /US\$49|49 US\$|49 \$ US/, \`${locale.code}: missing regular price\`);`
  - `README.md` lines 6–15 become:

```
Current public pricing copy (all prices are tax-inclusive totals in US dollars; the checkout deducts the buyer's tax from the total):

- Dictivo Local: `US$29` introductory price until 2026-10-31, `US$49` from 2026-11-01 (`data/local-offer.mjs`; raise the Lemon Squeezy price first, the deploy check fails after the end date), one-time, perpetual for the version bought, 12 months of updates, use on up to 3 personal devices, optional `US$24/year` renewal for future updates.
- Dictivo Cloud Fast: `US$8.99/month` (`CLOUD_FAST_MONTHLY_PRICE` in `data/local-offer.mjs`), 1,500 minutes/month, standalone or alongside Local.
- Copy writes prices as `{{price.<amount>.<form>}}` placeholders, never as figures; `data/price-display.mjs` renders them per page language with a "tax included" note. Titles, meta descriptions and `llms.txt` carry no price.
```

- [ ] **Step 4:** `node scripts/generate-site.mjs > /tmp/claude-501/gen.log 2>&1 && npm test` — expected: all tests PASS (74 ± a few). Then read four rendered sentences and confirm they read naturally:

```bash
node -e 'const fs=require("fs");const text=(h)=>h.replace(/<script[\s\S]*?<\/script>/g,"").replace(/<[^>]+>/g,"").replace(/\s+/g," ");for(const [f,k] of [["dist/de/index.html","Ist das ein Abo?"],["dist/ja/index.html","これはサブスクリプションですか？"],["dist/index.html","Is this a subscription?"],["dist/fr/compare/wispr-flow-alternative/index.html","Modèle de prix"]]){const t=text(fs.readFileSync(f,"utf8"));const i=t.indexOf(k);console.log(f,"|",t.slice(i,i+300))}'
```

- [ ] **Step 5: Commit**

```bash
git add tests/price-output.test.mjs tests/launch-price.test.mjs data/trust-pages.mjs README.md
git commit -m "feat: state tax-inclusive US dollar prices in the terms and check the built output

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 4: Full checks, preview, production

**Files:** none new.

- [ ] **Step 1: Run the CI sequence locally** (all must pass):

```bash
node scripts/generate-site.mjs > /tmp/claude-501/gen.log 2>&1 && npm test \
&& node scripts/check-local-checkout.mjs && node scripts/check-cloud-fast-checkout.mjs \
&& node scripts/check-release-payload-sync.mjs && node scripts/check-asset-version.mjs \
&& node scripts/check-public-output.mjs && node scripts/check-web-attribution.mjs \
&& node scripts/check-product-film.mjs && echo ALL CHECKS PASSED
```

- [ ] **Step 2: Visual check.** Headless screenshots of `/de/`, `/ja/`, `/` pricing sections (1280×9000, crop rows 3650–5150) plus a 390-wide mobile crop of `/de/`; confirm the card figure, the "inkl. MwSt." / "税込" / "tax included" line, and no overflow.

- [ ] **Step 3: Preview deploy and read it.**

```bash
node scripts/inject-asset-version.mjs && npx --yes wrangler@4.90.1 pages deploy dist --project-name=dictivo-app --branch=feat-flat-tax-inclusive-pricing --commit-dirty=true
```

Fetch `<alias>/de/`, `/ja/`, `/`, `/pt/`, `/zh-hant/` and assert the card spans equal `HOME_PRICES`; `node scripts/check-locale-routing-live.mjs <alias> --country-override` passes.

- [ ] **Step 4: Ship.** `git push origin HEAD:main` (fast-forward; confirm `git log origin/main..HEAD` shows only this branch's commits and `git log HEAD..origin/main` is empty). Watch the Deploy workflow to success. Then verify production: `/de/` HTML contains `<span class="price">29 US$</span>` and `inkl. MwSt.`; `/ja/` contains `US$29` and `税込`; `/` contains `US$8.99`; `dist/assets/site.<hash>.js` on production does not contain `cdn-cgi/trace`; `/terms/` contains the new sentence.

From this moment the site says Cloud Fast US$8.99 while the checkout still charges US$6.99 — allowed by the invariant.

### Task 5: API serves US$8.99

**Files** (033 worktree, branch `feat/cloud-fast-8-99`):
- Modify: `apps/api/src/worker.ts:335`, `apps/api/src/routes/cloudFast.ts:12`
- Modify: `apps/api/src/worker.test.ts:597`, `:712`; `apps/api/src/routes/cloudFast.test.ts:500`

- [ ] **Step 1:** Change the three test expectations `priceUsdMonthly: "6.99"` → `"8.99"`. Run `npm test -w apps/api` — expected: those tests FAIL with `"6.99"` received.
- [ ] **Step 2:** Set `const CLOUD_FAST_PRICE_USD_MONTHLY = "8.99";` in both source files.
- [ ] **Step 3:** `npm test -w apps/api && npm run typecheck -w apps/api` — PASS.
- [ ] **Step 4: Commit**

```bash
git add apps/api/src/worker.ts apps/api/src/routes/cloudFast.ts apps/api/src/worker.test.ts apps/api/src/routes/cloudFast.test.ts
git commit -m "feat: serve Cloud Fast at US\$8.99 a month

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 6: Desktop app follows the served price

**Files** (033 worktree):
- Modify: `apps/desktop/src/App.tsx:203` (fallback), `:232-233` (message), `:866` (use)
- Modify: `apps/desktop/tests/appStartup.test.tsx:243` (fixture `priceUsdMonthly: "8.99"`), `:1054`, `:1069`, `:1075` (message text `$8.99/month`)
- Modify: fixture `priceUsdMonthly: "6.99"` → `"8.99"` in `cloudFastUpgradeBanner.test.tsx:16`, `componentsStatic.test.tsx:65`, `settingsInteraction.test.tsx:80`, `componentsInteraction.test.tsx:86`, `cloudFastEngine.test.ts:17,764`, `desktopBridge.test.ts:429` (served-value fixtures; the `cloudFastEntitlementError` strings that mention $6.99 are opaque error text and stay)

- [ ] **Step 1:** Update the fixtures and the three assertions; add one assertion in `appStartup.test.tsx` next to :1054 proving the message follows the served value: seed the entitlement fixture with `priceUsdMonthly: "12.34"` for one render and expect `…then it is $12.34/month…`. Run `npm test -w apps/desktop -- appStartup` — expected: FAIL (message still says $6.99).
- [ ] **Step 2: Implement.**

```ts
// App.tsx ~200
const DEFAULT_CLOUD_FAST_ENTITLEMENT: CloudFastEntitlement = {
  available: false,
  plan: "unknown",
  priceUsdMonthly: "8.99",
  …
};

// App.tsx ~232 — the figure is served; no build carries a price literal.
function cloudFastSubscriptionRequiredMessage(priceUsdMonthly: string) {
  return `Cloud Fast includes 10 free minutes on this device, then it is $${priceUsdMonthly}/month. Open Account & Billing to subscribe. Local mode keeps working on this device.`;
}

// App.tsx ~866
setStatusMessage(activeCloudFastEntitlementError || (trialUsed ? CLOUD_FAST_TRIAL_USED_MESSAGE : cloudFastSubscriptionRequiredMessage(activeCloudFastEntitlement.priceUsdMonthly)));
```

Keep the existing comment block above it; adjust its reference from the constant name to the function name.

- [ ] **Step 3:** `npm test -w apps/desktop && npm run typecheck -w apps/desktop && npm run lint -w apps/desktop` — PASS. `grep -rn '6\.99' apps/desktop/src` returns nothing.
- [ ] **Step 4: Commit**

```bash
git add apps/desktop/src/App.tsx apps/desktop/tests
git commit -m "fix: build the Cloud Fast subscription message from the served price

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 7: 033 docs and the Japan ad draft

**Files** (033 worktree):
- Modify: `docs/README.md:46-48`, `docs/handoff/HANDOFF.md:40-41`, `docs/release/todo.md:29`
- Modify: `docs/research/2026-09-13-budget30/search-ad-assets-ja.csv:5,10`

- [ ] **Step 1:** In each of the three docs, after the existing 2026-09-11 sentence add: "Switched off 2026-09-15 for about sixteen hours while the site showed per-country totals; back on 2026-09-16. Cloud Fast rises to US$8.99 (tax-inclusive) once the site, API and desktop 0.3.48 carry the figure." Keep the historical sentences.
- [ ] **Step 2:** Ad CSV: headline `Localは29米ドル買い切り` → `Localは税込29米ドル買い切り`; description `Localは29米ドル。12か月の更新付き。その後の更新延長は任意です。` → `Localは税込29米ドル。12か月の更新付き。その後の更新延長は任意です。`. Recount the weighted character columns in the CSV rows (full-width = 2) and update them.
- [ ] **Step 3: Commit**

```bash
git add docs/README.md docs/handoff/HANDOFF.md docs/release/todo.md docs/research/2026-09-13-budget30/search-ad-assets-ja.csv
git commit -m "docs: record the tax-inclusive store setting and the US\$8.99 Cloud Fast price

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

### Task 8: Version 0.3.48, API deploy, desktop release (founder present)

**Files** (033 worktree): every file in `docs/release/versioning.md` "Files that must be updated together": `package.json`, `apps/desktop/package.json` (version + `@dictivo/shared` range), `apps/desktop/src-tauri/Cargo.toml`, `apps/desktop/src-tauri/tauri.conf.json`, `apps/api/package.json` (version + range), `apps/analytics-admin/package.json`, `packages/shared/package.json`, then `package-lock.json` (`npm install`) and `Cargo.lock` (`cargo check` in `apps/desktop/src-tauri`); `docs/README.md` gets `Staged source version: \`v0.3.48\` (not yet public)`.

- [ ] **Step 1:** Bump 0.3.47 → 0.3.48 in the listed files; `npm install`; `cargo check`; confirm the lockfile diff removed no `@esbuild/*` platform entries; `npm test -w apps/desktop -- version` PASS; commit `chore: bump to 0.3.48`.
- [ ] **Step 2 (founder decides):** merge `feat/cloud-fast-8-99` into 033 `main` and push. **Pushing `main` also publishes the founder's three unpushed commits (`3e5e45f`, `ff73a7a`, `fb7ee5a`)** — confirm before pushing.
- [ ] **Step 3 (founder confirms):** deploy the API: `npm run deploy:api` from the 033 root (wrangler is signed in as the founder's account). Verify: `curl -s https://api.dictivo.app/v1/cloud-fast/entitlement -H '<entitled headers from docs>'` — or simply the desktop Settings » Account & Billing after deploy — shows `priceUsdMonthly: "8.99"`. From this moment the app shows US$8.99 while the checkout charges US$6.99 — allowed.
- [ ] **Step 4:** Tag `v0.3.48` on the merged commit and push the tag; `release-desktop.yml` builds, publishes and dispatches release metadata to the site (which redeploys). Verify the site deploy stays green and `data/release.json` shows 0.3.48. Update `docs/README.md` public status lines and remove the staging line; commit and push.

### Task 9: Store price and final verification (founder present)

- [ ] **Step 1 (founder):** In the store dashboard, Products » Dictivo Cloud Fast » variant price → US$8.99. Existing subscriptions are all test subscriptions, so nothing needs notice.
- [ ] **Step 2:** In the founder's Chrome, open prefilled checkouts with a postcode and read the summary:
  - Local `checkout/buy/d4cb72ba-…?checkout[billing_address][country]=DE` + 10115 → Subtotal 29.00, "VAT (19 % included in total)", Total **29.00**; JP 100-0001 → 29.00; US 10001 → 29.00; BR 01310-100 → 29.00.
  - Cloud Fast `checkout/buy/2a12baa1-…` DE 10115 → Total **8.99** with VAT included; JP → 8.99; US → 8.99.
  - Renewal `checkout/buy/c4d5fb99-…` DE → 24.00.
- [ ] **Step 3:** Record the outcome at the end of this plan and in `docs/superpowers/plans/2026-09-16-roadmap.md` (strike the items this pivot removes: app tax display, privacy country-lookup disclosure, tax-table re-verification, Googlebot residual; keep the 2026-11-01 runbook).

**Rollback:** the site can be reverted by `git revert` of Tasks 1–3 (the checkout total is unaffected). If the Cloud Fast store price must come back down, lower it in the dashboard first, then revert the API constant, then the site — the reverse of the rollout, which keeps every shown price at or above the charged price.
