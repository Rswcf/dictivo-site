# Tax-Exclusive Price Display Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The checkout will add tax on top of net USD prices. Every Dictivo price on the site shows what a buyer in their billing country pays. Where consumer law requires a tax-inclusive price, that total is the highlighted figure, with the net price and rate beside it. Everywhere else the site shows the net price plus the tax rate, or "plus applicable tax". Only after this is live is the store's tax-inclusive setting turned off.

**Architecture:**
- **Formatter:** one browser-safe module (`data/price-display.mjs`) holds the verified tax table and formats a price for a (language, billing country, form).
- **Build:** page copy refers to prices with `{{price.<amount>.<form>}}` placeholders. `write()` turns them into `<span class="price" data-price-cents data-price-form data-price-country>` elements rendered for the page language's home country. The build also prepends the same module to `site.js`.
- **Browser:** `site.js` reads the visitor's country from `/cdn-cgi/trace` (same origin, allowed by CSP) and re-renders the spans when the visitor's country differs from the page's home country.

**Tech Stack:** Node ESM static generator (`scripts/generate-site.mjs`), node:test, plain browser JS (`assets/site.js`, CSP `script-src 'self'`), Cloudflare Pages.

**Spec:** founder decision 2026-09-15 (option 1, "split by market"). Research: scratchpad `pricing-research.md` §14.1 (verified tax lines), §14.3 (legal requirements), §14.6 (display patterns).

## Global Constraints

**Rates**
- Tax rates are those the checkout added on 2026-09-15:
  - EU27 standard rates, including FI 25.5, HU 27, LU 17, RO 21, SK 23, EE 24.
  - Rest of Europe: CH 8.1, LI 8.1, GB 20, NO 25, IS 24, TR 20.
  - Elsewhere: JP 10, KR 10, TW 5, AU 10, NZ 15, SG 9, IN 18, ZA 15, AE 5.
  - No tax line: MX, BR, CN, HK, IL.
  - Canada varies by province (ON 13, QC 14.98). The US showed no tax line in NY or CA.

**Display treatments**
- **Tax-inclusive total highlighted** for every country in the tax table except SG.
- **Net + rate:** SG.
- **Net + "applicable tax":** US, CA, and any country not in the table.
- **Net only:** MX, BR, CN, HK, IL.

**Home country for no-JS visitors**

| Page | Country |
|---|---|
| en | US |
| de | DE |
| fr | FR |
| es | ES |
| it | IT |
| nl | NL |
| pt | BR |
| zh | CN |
| zh-hant | TW |
| ja | JP |
| ko | KR |

**Arithmetic and currency**
- Work in integer cents: `tax = Math.round(cents * basisPoints / 10000)` and `total = cents + tax`.
- Currency is always USD. "$" appears only for English pages seen from the US; everything else shows "US$" in the language's position and decimal style.

**What must not contain a price**
- `<title>`, meta and OG descriptions, `llms.txt`, and anything inside an HTML attribute. The build throws if a placeholder lands there.
- JSON-LD gets plain text for the page's home country.

**Copy rules**
- Public output must not contain "Lemon Squeezy", "Cloudflare" or the other `check-public-output.mjs` forbidden terms. That includes comments in `data/price-display.mjs`, because it ships inside `site.js`.
- Competitor prices are never converted: Whisperstream $29, VoiceInk $25/$39/$49, Wispr, Superwhisper, MacWhisper, Dragon.

**Implementation**
- `data/price-display.mjs` has no imports.
- `site.js` creates no cookies or storage, and the country lookup must not run inside the analytics section tested by `check-web-attribution.mjs` (between `normalizeDownloadPlatform` and `fillTemplate`).

**Rollout order:** site live → founder signs in to the store dashboard → store "Tax-inclusive pricing" OFF (explicit founder confirmation at that moment) → prefilled checkout verification. Never the reverse.

**Accepted residual:** crawlers that render JavaScript from US addresses see US-treatment prices in the visible text while the page's FAQ JSON-LD carries the home country's figures. Do not "fix" this by suppressing the visitor override; the static HTML and JSON-LD stay consistent for non-rendering crawlers.

---

### Task 1: Price display module

**Files:**
- Create: `data/price-display.mjs`
- Modify: `data/local-offer.mjs` (add `CLOUD_FAST_MONTHLY_PRICE = 6.99`)
- Test: `tests/price-display.test.mjs`

**Interfaces:**
- Produces:
  - `TAX_VERIFIED_ON: string`
  - `TAX_RATES: {[iso2]: basisPoints}`
  - `NO_TAX_COUNTRIES: string[]`
  - `PRICE_HOME_COUNTRY: {[language]: iso2}`
  - `priceLanguage(htmlLang) → "en"|"de"|…|"zh"|"zh-hant"` (throws on unknown)
  - `priceTreatment(country) → {kind: "inclusive"|"rate"|"open"|"none", basisPoints?}`
  - `formatPrice({cents, form: "main"|"note"|"inline", lang, country}) → string`

- [ ] **Step 1: Write the failing tests.** Exact expectations:
  - DE/de: main `34,51 US$`; note `inkl. 19 % MwSt. · netto 29 US$`; inline `34,51 US$ inkl. MwSt.`
  - Cloud Fast 699 DE/de main: `8,32 US$`
  - JP/ja: main `US$31.90`; note `税込（消費税10%）· 税抜 US$29`; inline `US$31.90（税込）`
  - GB/en: main `US$34.80`; note `incl. 20% VAT · US$29 before tax`
  - AU/en: note `incl. 10% GST · US$29 before tax`
  - TW/zh-hant: main `US$30.45`; note `含 5% 營業稅 · 未稅 US$29`
  - KR/ko: note `부가세 10% 포함 · 부가세 별도 US$29`
  - FR/fr: main `34,80 $ US`, inline `34,80 $ US TTC`
  - FI/en (25.5%): main `US$36.40` (2900×2550/10000 = 739.5 → 740)
  - CH/de: main `31,35 US$`, note `inkl. 8,1 % MWST · netto 29 US$`
  - SG/en: main `US$29`, note `plus 9% GST`, inline `US$29 + 9% GST`
  - US/en: main `$29`, note `plus applicable sales tax`, inline `$29`
  - CA/en: main `US$29`, note `plus applicable taxes`, inline `US$29 + tax`
  - BR/pt: main `US$ 29`, note ``, inline `US$ 29`
  - CN/zh: inline `US$29`
  - XX/en and undefined country: open treatment
  - Invariants:
    - every EU27 code is in `TAX_RATES`
    - `NO_TAX_COUNTRIES` is disjoint from `TAX_RATES`
    - `PRICE_HOME_COUNTRY` covers all 11 `LOCALES`
    - `formatPrice` throws on an unknown form or language
    - the module source has no `import` and no forbidden public terms

  In the strings above, NBSP (U+00A0) sits between number and currency or percent where the style has a space; tests compare with ` `.
- [ ] **Step 2:** `node --test tests/price-display.test.mjs` should fail (module missing).
- [ ] **Step 3:** Implement the module as a table-driven copy per language:
  - `format`, `decimal`, `percent`, `taxNames` (default, gst, per-country)
  - `inclusiveNote`, `inclusiveInline`, `rateNote`, `rateInline`, `openNote`, `openInline`
  - English US overrides
- [ ] **Step 4:** The tests pass, and the full `npm test` still passes.
- [ ] **Step 5:** Commit `feat: format prices with each billing country's checkout tax`.

### Task 2: Placeholders resolved at write time, formatter shipped in site.js

**Files:**
- Create: `scripts/lib/price-tokens.mjs`
- Modify: `scripts/generate-site.mjs` (`write()` at ~6074, and after `copyStatic("assets")` at ~6165)
- Test: `tests/price-tokens.test.mjs`

**Interfaces:**
- Consumes: Task 1 exports and `LOCAL_OFFER`, `CLOUD_FAST_MONTHLY_PRICE`.
- Produces:
  - `PRICE_AMOUNTS = {local: 2900, regular: 4900, renewal: 2400, threeYear: 7700, cloudFast: 699}` (derived from `LOCAL_OFFER`)
  - `priceToken(amount, form) → "{{price.amount.form}}"` (throws on unknown)
  - `resolvePriceTokens(path, body) → string`
  - `browserPriceScript() → string` (defines `const DictivoPrice = (() => {…; return {…exports}})();`)

- [ ] **Step 1: Write the failing tests.**
  - Body tokens in a `lang="de"` page become `<span class="price" data-price-cents="2900" data-price-form="main" data-price-country="DE">34,51 US$</span>`.
  - Tokens inside `<script type="application/ld+json">` become plain JSON-safe text.
  - It throws for a token in `<head>` outside JSON-LD, inside a tag attribute, or in a non-HTML path.
  - A body without tokens is returned unchanged.
  - `browserPriceScript()` evaluated with `vm` gives the same `formatPrice` output as the ESM import for the Task 1 matrix.
- [ ] **Step 2:** Tests fail.
- [ ] **Step 3: Implement.**
  - `write(path, body)` calls `resolvePriceTokens(path, body)` before trimming.
  - After `copyStatic("assets")`, write `assets/site.js` as `browserPriceScript() + source site.js`. `inject-asset-version.mjs` then fingerprints the bundled file unchanged.
- [ ] **Step 4:** Tests pass; `node scripts/generate-site.mjs && npm test` passes (no tokens exist yet).
- [ ] **Step 5:** Commit `feat: resolve price placeholders for each page's home country`.

### Task 3: Pricing cards and structured data

**Files:**
- Modify: `scripts/generate-site.mjs`
  - `renderTier` ~2448
  - `renderSchema` offers ~2494
  - `renderCompareSchema` ~2605
  - `renderMediaKitSchema` ~4089
- Modify: `data/site-content.mjs` (delete the 20 `price: "$29"` / `price: "$6.99"` tier fields; the Free tier keeps its word)
- Modify: `assets/site.css` (`.tier-price` wraps; new `.tier-tax`)
- Test: `tests/price-output.test.mjs`

**What to build**
- The tier price comes from the index, like `href`: 1 → `local`, 2 → `cloudFast`.
- Template:
  ```
  <p class="tier-price">{{price.X.main}}<small>…</small></p>
  <p class="tier-tax">{{price.X.note}}</p>
  ```
  The Free tier gets an empty `<p class="tier-tax"></p>` so the cards line up.
- Every Dictivo Local and Cloud Fast JSON-LD offer gets `priceSpecification` with `valueAddedTaxIncluded: false`.
  - Price strings come from `PRICE_AMOUNTS`: "29", "6.99".
  - Cloud Fast keeps `UnitPriceSpecification` P1M and adds `valueAddedTaxIncluded: false`.

- [ ] **Step 1: Failing output tests.**
  - Every homepage has local and cloudFast main and note spans, with this static main text:

    | Page | Local | Cloud Fast |
    |---|---|---|
    | en | `$29` | `$6.99` |
    | de | `34,51 US$` | `8,32 US$` |
    | fr | `34,80 $ US` | |
    | es | `35,09 US$` | |
    | it | `35,38 US$` | |
    | nl | `US$ 35,09` | |
    | pt | `US$ 29` | |
    | zh | `US$29` | |
    | zh-hant | `US$30.45` | |
    | ja | `US$31.90` | |
    | ko | `US$31.90` | |

  - Every offer named Dictivo Local or Cloud Fast has `"valueAddedTaxIncluded": false`.
  - No `{{price.` anywhere in `dist`.
- [ ] **Step 2:** Build and test; it fails.
- [ ] **Step 3:** Implement the template, schema and CSS:
  - `.tier-tax { min-height: 1.45em; margin: -10px 0 18px; color: var(--muted); font-size: 13px; line-height: 1.45 }`
  - `.tier-price { flex-wrap: wrap }`
- [ ] **Step 4:** Build and test; it passes.
- [ ] **Step 5:** Commit `feat: show tax treatment on the pricing cards and in offers`.

### Task 4: Every other Dictivo price becomes a placeholder; no prices in titles or descriptions

**Files:**
- `data/home-conversion.mjs`: 10 hero offer lines
- `data/site-content.mjs`: en body :99, dead footnote :145, en FAQ :220, 9 localized FAQ answers ~1407–1519, 10 `$24` tier features
- `scripts/generate-site.mjs`:
  - `WINDOWS_HOME_COPY` meta titles and descriptions (171–408)
  - `SEO_HOME_COPY` titles, descriptions and heroEmphasis (427–512)
  - `COMPARE_I18N` quickTake / dictivoRows / sections / ctaBody (847–2133)
- `data/compare-pages.mjs`: every Dictivo price in the inventory; titles :168/:667, descriptions :28/:170/:669 and h1 :171 lose the Dictivo price; `LOCAL_THREE_YEAR_PRICE` becomes `{{price.threeYear.inline}}`
- `data/offline-dictation-windows-guide.mjs` :65 :137 :142 :177 :179 (Dictivo only, never Whisperstream)
- `data/first-dictation-guide.mjs` :41 :81
- `data/media-kit.mjs` :26 :27 :56
- `data/trust-pages.mjs` :1242 :1243, plus one sentence: "Prices exclude sales tax and VAT. Where tax applies, it is calculated from your billing country and shown at checkout before you pay."
- `data/local-offer.mjs`: remove `LOCAL_THREE_YEAR_PRICE` once unused

**Wording rules**
- Amount tokens: `$29` → `local`, `$49` → `regular`, `$24` → `renewal`, `$6.99` → `cloudFast`, `$77` → `threeYear`. Prose always uses `.inline`.
- A period suffix after a token becomes words, because inline text can end in a tax phrase:

  | Language | "/year" | "/month" |
  |---|---|---|
  | en | "a year" | "a month" |
  | de | "pro Jahr" | "pro Monat" |
  | fr | "par an" | "par mois" |
  | es | "al año" | "al mes" |
  | it | "all'anno" | "al mese" |
  | nl | "per jaar" | "per maand" |
  | pt | "por ano" | "por mês" |
  | zh | "每年 X" | "每月 X" |
  | ja | "年 X" | "月額 X" |
  | ko | "연 X" | "월 X" |

- Meta titles and descriptions replace the price with the buy-once wording already in the sentence. For example:
  - en "Offline Dictation App for Mac & Windows - Buy Once | Dictivo"
  - de "… - einmal kaufen | Dictivo"
  - ja "… - 買い切り | Dictivo"
  - Descriptions: "$29 once, yours to keep." → "Buy once, yours to keep."

**Mechanics:** a scratchpad script lists every `(file, exact old string, new string, expected count)`. It asserts all counts before writing anything, so a stale line fails loudly and nothing is half-edited.

- [ ] **Step 1: Failing output tests** (`tests/price-output.test.mjs`).
  - After removing `<span class="price" …>…</span>` and JSON-LD, no page text has `\$(29|24|49|77)(?![\d.,])` or `\$6\.99`, except these counts:
    - `/guides/offline-dictation-on-windows/`: Whisperstream `$29`
    - every `*/compare/voiceink-alternative/`: VoiceInk `$49` (en 6, other locales 2)

    Take the exact counts from a build before the edits.
  - No `<head>` contains `$29`, `$24`, `$49`, `$6.99`, `US$` or `29米ドル`.
  - `tests/launch-price.test.mjs`: the `/\$49/` homepage assertion becomes `data-price-cents="4900"`.
- [ ] **Step 2:** Tests fail on the current copy.
- [ ] **Step 3:** Run the edit script; review `git diff` by file; build.
- [ ] **Step 4:** `npm test` passes. Read the rendered FAQ, hero and compare rows for de, ja, en, zh-hant in `dist` to check that sentences read naturally.
- [ ] **Step 5:** Commit `feat: price every Dictivo mention for the reader's tax treatment`.

### Task 5: Visitor's billing country in the browser

**Files:**
- Modify: `assets/site.js`, appended at the end, outside the analytics test slice.

**Code:**
- `visitorBillingCountry()`:
  - Takes `?price_country=XX` only when `!isPublicSite`.
  - Otherwise `fetch("/cdn-cgi/trace", {cache: "no-store"})` and parses `^loc=([A-Z]{2})$`.
  - Ignores `XX` and `T1`.
  - Swallows errors.
- `showVisitorPrices()`: for each `[data-price-cents]` whose `data-price-country` differs, sets `textContent = DictivoPrice.formatPrice({cents, form, lang: document.documentElement.lang, country})` and updates `data-price-country`.

- [ ] **Step 1:** Build and serve `dist` locally (`npx --yes http-server dist -p 4173 -s` or `python3 -m http.server`). In the Browser pane, open these and read the pricing card, hero and FAQ text:
  - `/de/?price_country=AT` → total `34,80 US$`, `inkl. 20 % MwSt.`
  - `/?price_country=GB`
  - `/ja/?price_country=US` → `US$29` + `税別`
  - `/pt/?price_country=PT`
  - `/zh-hant/?price_country=HK`
  - `/?price_country=SG`
- [ ] **Step 2:** `node scripts/check-web-attribution.mjs` passes; there are no console errors on a page without prices (`/about/`).
- [ ] **Step 3:** Visual check with desktop and mobile screenshots of the de and ja pricing cards. Long totals must wrap inside the card.
- [ ] **Step 4:** Commit `feat: show prices for the visitor's billing country`.

### Task 6: Guards and docs

**Files:**
- Modify: `scripts/check-public-output.mjs`, `README.md`

**Guards**
- The deploy fails when `TAX_VERIFIED_ON` is more than 183 days old. Message: re-check the tax lines on prefilled checkouts and update `data/price-display.mjs`.
- Any `{{price.` left in a public text file fails.

**README:** pricing lines say the prices exclude tax, and name the tax table file and how to re-verify it.

- [ ] **Step 1:** Simulate an old verification date with a temporary edit of `TAX_VERIFIED_ON` (e.g. `2026-01-01`). `node scripts/check-public-output.mjs` fails with the message. Revert, and it passes.
- [ ] **Step 2:** Run the whole CI sequence locally:
  - `node scripts/generate-site.mjs && npm test`
  - `node scripts/check-local-checkout.mjs`
  - `node scripts/check-cloud-fast-checkout.mjs`
  - `node scripts/check-asset-version.mjs`
  - `node scripts/check-public-output.mjs`
  - `node scripts/check-web-attribution.mjs`
  - `node scripts/check-product-film.mjs`
- [ ] **Step 3:** Commit `chore: fail deploys when the tax table goes unverified`.

### Task 7: Preview, production

- [ ] **Step 1:** Preview deploy of the branch (`wrangler pages deploy dist --branch=<branch>`, after `inject-asset-version.mjs`).
  - On the preview host `/cdn-cgi/trace` returns `loc=`.
  - With `?price_country=` for DE, JP, GB, AU, SG, US, BR, TW, KR, CH, read the spans in the Browser pane.
  - `node scripts/check-locale-routing-live.mjs <preview>` passes.
- [ ] **Step 2:** Merge to `main` (fast-forward), push, watch the Deploy workflow.
- [ ] **Step 3:** Production:
  - The `/de/` HTML contains `34,51 US$`.
  - The Browser pane (US exit) on `/de/` shows `29 US$` with `zzgl. anfallender Steuern` after JS.
  - The `/ja/` HTML contains `US$31.90`.

### Task 8: Store setting and checkout verification (founder present)

- [ ] **Step 1: Sign-in.** The founder signs in to the store dashboard in their Chrome, or explicitly names the Google account to choose. Confirm the store is Dictivo (id 375562).
- [ ] **Step 2: Toggle.** Open Settings » General and show the founder the "Tax-inclusive pricing" control. Turn it OFF only after the founder confirms in chat.
- [ ] **Step 3: Checkout totals.** Open prefilled Local checkouts (`checkout[billing_address][country]=` DE, FI, CH, GB, JP, AU, SG, US, CA + QC) and record subtotal, tax and total. They must equal `formatPrice` totals: DE 34.51, FI 36.40, CH 31.35, GB 34.80, JP 31.90, AU 31.90, SG 31.61. Cloud Fast DE must be 8.32.
- [ ] **Step 4: If a cent differs,** change the rounding in `formatPrice` to match the checkout, add that country to the tests, and redeploy.
- [ ] **Step 5: Record the outcome** in memory and the pricing brief.

**Rollback:** turn the store setting back on, then revert the site merge commit. Setting back on first keeps charges at or below what the site shows.

## Outcome (2026-09-15)

- Tasks 1–6 landed as commits bc0d206 … 7c4c536; Task 7 preview `feat-tax-exclusive-price-display` verified, then pushed to `main` at 02:44 UTC and deployed.
- Task 8: the founder switched the store setting off themselves (~02:30 UTC); the checkout began adding tax about ten minutes later. Prefilled checkouts with a postcode matched the formatter to the cent: DE 34.51, FI 36.40 (half-up confirmed), CH 31.35, GB 34.80, JP 31.90, AU 31.90, SG 31.61, KR 31.90, TW 30.45, CA-QC 33.34, CA-ON 32.77, BR 29.00 (no tax), Cloud Fast DE 8.32. No rounding change was needed.
- Note for the verification script: the checkout only shows a tax line after a postcode is entered; the country prefill alone renders the subtotal.
