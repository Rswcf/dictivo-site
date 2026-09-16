# Flat Tax-Inclusive Pricing — Design

**Date:** 2026-09-16
**Decision:** founder, 2026-09-16. The store charges tax-inclusive prices again ("Tax-inclusive pricing" was switched on in the store dashboard on 2026-09-16). Every buyer pays the same total wherever they are. Local stays US$29 until 2026-10-31 and becomes US$49 from 2026-11-01. Cloud Fast rises from US$6.99 to US$8.99 a month.
**Supersedes:** `docs/superpowers/plans/2026-09-15-tax-exclusive-price-display.md` (per-country totals, shipped 2026-09-15 as commits bc0d206…7c4c536).

## Why

With tax deducted from a fixed total, Cloud Fast at US$6.99 lost money in most taxed countries once transcription cost is counted at full use (US$5.50 a month for 1,500 minutes). At US$8.99 the monthly payout after tax and platform fees is positive everywhere: US 8.00, Germany 6.43, UK 6.36, Japan 7.04, Hungary 5.95 (worst case), untaxed countries 7.86. One price also removes the per-country display machinery and its six-month verification duty.

Platform fees assumed: 5% + US$0.50 on the total including tax, +1.5% for non-US cards, +0.5% for subscriptions.

## Display rules

One figure for every visitor. No country detection. The build resolves price placeholders per page language only.

| Language | main (card figure) | note (line under the card) | inline (inside a sentence) |
|---|---|---|---|
| en | `US$29` / `US$8.99` | `tax included` | `US$29` |
| de | `29 US$` | `inkl. MwSt.` | `29 US$ inkl. MwSt.` |
| fr | `29 $ US` | `TTC` | `29 $ US TTC` |
| es | `29 US$` | `IVA incluido` | `29 US$ IVA incluido` |
| it | `29 US$` | `IVA inclusa` | `29 US$ IVA inclusa` |
| nl | `US$ 29` | `incl. btw` | `US$ 29 incl. btw` |
| pt | `US$ 29` | `impostos incluídos` | `US$ 29 com impostos` |
| zh | `US$29` | `含税` | `US$29` |
| zh-hant | `US$29` | `含稅` | `US$29（含稅）` |
| ja | `US$29` | `税込` | `US$29（税込）` |
| ko | `US$29` | `부가세 포함` | `US$29(부가세 포함)` |

- Whole dollars print without decimals (`29`, `49`, `24`, `77`); cents print with the language's decimal separator (`8.99` / `8,99`). Non-breaking spaces where the style has a space between number and currency.
- The English page also says `US$`: it serves readers in the UK, Australia, Canada and Singapore.
- Titles, meta descriptions and `llms.txt` stay price-free (unchanged from 2026-09-15). Revisit after 2026-11-01.
- Structured data: every paid offer keeps `priceSpecification` and states `valueAddedTaxIncluded: true`.

## Amounts

All amounts derive from `data/local-offer.mjs`:

| Key | Cents | Source |
|---|---|---|
| local | 2900 | `LOCAL_OFFER.price` |
| regular | 4900 | `LOCAL_OFFER.regularPrice` |
| renewal | 2400 | `LOCAL_OFFER.updateRenewal` |
| threeYear | 7700 | price + 2 × renewal |
| cloudFast | 899 | `CLOUD_FAST_MONTHLY_PRICE` (6.99 → 8.99) |

The 2026-11-01 change stays a one-constant change plus the copy that names the introductory period; the existing `introPriceExpired()` deploy guard is unchanged.

## What is removed

- `assets/site.js`: the visitor-country lookup (`/cdn-cgi/trace`), the `?price_country=` preview override and the price re-render.
- `scripts/generate-site.mjs`: prepending the formatter to `site.js`.
- `data/price-display.mjs`: `TAX_RATES`, `NO_TAX_COUNTRIES`, `TAX_VERIFIED_ON`, `PRICE_HOME_COUNTRY`, `priceTreatment`; `formatPrice` loses its `country` argument.
- `scripts/lib/price-tokens.mjs`: the `data-price-*` attributes. Placeholders resolve to `<span class="price">…</span>` so the figure stays addressable in CSS, and to plain text inside JSON-LD. The guards stay: no placeholder in `<head>`, in an attribute, or in a non-HTML file.
- `scripts/check-public-output.mjs`: the `TAX_VERIFIED_ON` age guard. The `{{price.` leak guard stays.
- `README.md` and the privacy policy: the country-lookup description.

## Copy changes

- Terms: "Prices include applicable sales tax and VAT. Prices are in US dollars and refunds are issued in US dollars." replaces the tax-exclusive sentence. `LEGAL_LASTMOD` moves to 2026-09-16.
- Media kit fact rows, README pricing lines: Cloud Fast US$8.99.
- No other wording changes: every Dictivo price is already a placeholder.

## Desktop app and API (`033_Dictivo`)

- `apps/api/src/worker.ts:335` and `apps/api/src/routes/cloudFast.ts:12`: `CLOUD_FAST_PRICE_USD_MONTHLY = "8.99"`. `estimatedMrr` / `cloudFastMrrCents` follow.
- `apps/desktop/src/App.tsx:203`: fallback `priceUsdMonthly: "8.99"`.
- `apps/desktop/src/App.tsx:232`: `CLOUD_FAST_SUBSCRIPTION_REQUIRED_MESSAGE` stops embedding a figure; it is built from the served `priceUsdMonthly` (fallback above). Tests that assert `$6.99` verbatim change accordingly.
- Desktop release 0.3.48 carries the app change.
- Docs that say the store is tax-inclusive (`docs/handoff/HANDOFF.md`, `docs/README.md`, `docs/release/todo.md`) get the 2026-09-16 date and the US$8.99 figure.

## Rollout order

Invariant: at no moment may a page or the app show a price lower than the checkout charges. Overstating for a short window is acceptable; understating is not.

1. Store: "Tax-inclusive pricing" ON — **done 2026-09-16**. Checkout charges US$29 / US$6.99 totals again; the live site overstates in taxed countries until step 2.
2. Site: this design deployed (flat figures, Cloud Fast US$8.99). Site now overstates Cloud Fast until step 4.
3. API constant deployed; desktop 0.3.48 released.
4. Store: Cloud Fast variant price → US$8.99. Verify on prefilled checkouts with a postcode (DE, JP, US, BR): Local total US$29.00, Cloud Fast total US$8.99, tax shown as "included in total".
5. 2026-11-01: raise the Local variant to US$49 in the store first, then merge the prepared site change and the API constant.

## Testing

- Unit: `formatPrice` for all 11 languages × 3 forms × whole and fractional amounts; placeholder resolution and its guards; amounts derived from `LOCAL_OFFER`.
- Build output: every homepage's Local and Cloud Fast card figure and note; `valueAddedTaxIncluded: true` on every paid offer; no bare Dictivo price literal outside `<span class="price">` and JSON-LD; no price in `<head>` or `llms.txt`; no `{{price.` leak; terms sentence present.
- Existing: `tests/launch-price.test.mjs` (introductory dates), locale routing, zh-hant output, `check-web-attribution.mjs`.
- Live: preview deployment read for de/ja/en/pt/zh-hant; after each store change, prefilled checkouts with postcode for DE/JP/US/BR on both products.

## Out of scope

- The API's revenue basis (`total_usd` includes tax under this regime, as it did before 2026-09-15).
- In-app "incl. tax" wording for German buyers; the app shows the served total.
- Price in page titles; local-currency estimates; the Impressum and German legal pages (tracked in `docs/superpowers/plans/2026-09-16-roadmap.md`).
