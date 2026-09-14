# IP-Based Language Routing + Traditional Chinese Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Visitors who arrive on an English address of dictivo.app are sent to the site language of their IP country (English when the country is outside the target languages), and Taiwan / Hong Kong / Macau get a new Traditional Chinese locale.

**Architecture:** A Cloudflare Pages Functions middleware (`functions/_middleware.js`) calls a pure, unit-tested decision module (`lib/locale-routing/`). The redirect map is generated after every site build from the hreflang annotations already in `dist/`, so routing can never disagree with the pages. `dist/_routes.json` limits Function invocations to localized page paths; checkout, download and asset paths stay static. Traditional Chinese (`/zh-hant/`, `zh-Hant`) is derived at build time from the Simplified copy with OpenCC `cn → twp`.

**Tech Stack:** Node 24 ESM, `node:test`, Cloudflare Pages Functions (Workers runtime), `opencc-js@1.4.2`, Wrangler 4.90.1 (existing CI pin).

**Spec:** The "Decisions" section below is the spec (agreed in the 2026-09-14 session).

## Decisions (spec)

- **D1 Redirect scope (industry practice: Next.js / Nuxt `redirectOn: 'root'|'no prefix'`, Google hreflang guidance).** Only *entry* navigations to an *unprefixed English URL that has translations* are redirected. Any `/de/`, `/zh-hant/` … URL is an explicit choice and is never redirected. One constant (`REDIRECT_SCOPE`) documents this.
- **D2 Precedence:** `?lang=<code>` (language menu) → `dictivo_lang` cookie → IP country → English. If the page has no translation for the chosen locale, do nothing (stay English).
- **D3 Country → locale map** (default first; later candidates only win when the browser's Accept-Language prefers them):
  - `de`: DE AT LI · `fr`: FR MC GF GP MQ RE YT PM BL MF WF PF NC TF SN CI ML BF NE TG BJ GN GA CG CD CF TD MG DJ KM BI HT · `es`: ES MX GT HN SV NI CR PA CU DO CO VE EC PE BO CL AR PY UY GQ · `it`: IT SM VA · `nl`: NL SR AW CW SX BQ · `pt`: PT BR AO MZ CV GW ST TL · `zh`: CN · `zh-hant`: TW HK MO · `ja`: JP · `ko`: KR
  - Multilingual: CH [de, fr, it] · BE [nl, fr, de] · LU [fr, de] · CA [en, fr] (region QC → [fr, en]) · CM [fr, en] · PR [es, en] · SG [en, zh]
  - Everything else, unknown (`XX`), Tor (`T1`) or missing → `en`.
- **D4 Traditional Chinese:** new locale `{ code: "zh-hant", htmlLang: "zh-Hant", name: "Traditional Chinese", nativeName: "繁體中文", path: "/zh-hant/" }`; zh `name` becomes "Simplified Chinese". Copy derived from `zh` with OpenCC `{ from: "cn", to: "twp" }`; film gets a converted `captions.zh-Hant.vtt`; OG locale `zh_TW`.
- **D5 Never redirect:** non-GET/HEAD; non-document requests (`Sec-Fetch-Dest` ≠ `document`, or no `Sec-Fetch-Dest` and no `text/html` in Accept); prefetch/prerender; automated clients (no `Mozilla/5.0`, or crawler / link-preview / HTTP-library UA); internal navigation (`Sec-Fetch-Site: same-origin`, or header absent and same-origin Referer).
- **D6 Remembering a choice:** language-menu and homepage language-pill links carry `?lang=<code>`. The middleware answers `302` to the same URL without `lang` (other query parameters kept) and sets `dictivo_lang=<code>; Path=/; Max-Age=31536000; SameSite=Lax; Secure; HttpOnly`. Invalid codes are stripped without a cookie.
- **D7 Responses:** redirects are `302` with `Cache-Control: private, no-store` and `Vary: Cookie`; query string preserved. Every Function response carries `X-Dictivo-Locale-Route: <reason>` for verification. The middleware fails open (`context.next()`) on any exception.
- **D8 Test override:** `x-dictivo-test-country` / `x-dictivo-test-region` request headers are honored only on `*.dictivo-app.pages.dev`, `localhost`, `127.0.0.1`.
- **D9 `_routes.json`:** generated; `include` = `/` plus `/<first-segment>/*` of every mapped page; `exclude` = `/assets/*`, `/checkout/*`, `/download/*`, `/downloads/*`, `/<locale>/llms.txt`; ≤ 100 rules, each ≤ 100 chars; never a bare `/*`.
- **D10 Privacy disclosure:** new "Website language" section in the English Privacy Policy. Public copy must not contain "Cloudflare", "request metadata" or "Lemon Squeezy" (`check-public-output.mjs`).
- **D11 Release:** branch `feat/ip-locale-routing` from `origin/main` (local `main` holds `ce4c818`/`f25246a`, which must wait for API `3e5e45f`). Preview deploy → full live matrix → push feature commits to `origin/main` (fast-forward) → CI deploy → production smoke test. Local `main` is not rewritten without the user's go-ahead.

## Global Constraints

- Node 24; no new runtime dependency except `opencc-js@1.4.2` (exact pin, `package-lock.json` committed, CI runs `npm ci`).
- Spike-verified (preview `geo-spike`, 2026-09-14): middleware `context.next()` keeps every `_headers` header and the asset server's `308` slash canonicalization; routes outside `_routes.json` keep `_redirects`; `request.cf.country` / `regionCode` are populated.
- Free plan: Functions requests count toward 100k/day (site: 230–1,500 page views/day, 2026-09-07…14).
- `check-public-output.mjs` forbidden patterns apply to every `dist` text file, including `_routes.json`.
- Existing CI checks must keep passing: checkout routes, release payload sync, asset versioning, public output, web attribution, product film.
- Ja copy (Kanji) must never pass through the converter; only objects taken from `zh` keys are converted.

## File Structure

| Path | Responsibility |
|---|---|
| `package.json`, `package-lock.json` | Pin `opencc-js`; `npm test` = `node --test "tests/**/*.test.mjs"` |
| `scripts/lib/hant.mjs` | `toHant(value)` deep converter, `addHant(map)`, `HANT` code constant |
| `data/site-content.mjs` | `LOCALES` entry for zh-hant, zh name |
| `scripts/generate-site.mjs` | derive zh-hant copy, OG map, film tracks + VTT, compare call sites, `?lang=` links, write routing artifacts |
| `data/product-film.mjs` | `chineseTraditional` caption path |
| `data/trust-pages.mjs` | "Website language" privacy section + lastModified |
| `scripts/check-public-output.mjs`, `scripts/check-product-film.mjs` | 11 locales, Traditional twins of Chinese guard patterns, new caption file |
| `lib/locale-routing/countries.mjs` | D3 table, `parseAcceptLanguage`, `localeForCountry` |
| `lib/locale-routing/request.mjs` | `isAutomatedClient`, `navigationKind`, `readCookie` |
| `lib/locale-routing/decide.mjs` | `decideLocaleRoute(...)` pure decision (D1, D2, D5, D6) |
| `lib/locale-routing/build-routes.mjs` | `buildLocaleRoutes({ distDir, locales })`, `buildRoutesConfig(routes)` |
| `lib/locale-routing/generated/routes.json` | generated map (gitignored), bundled into the Function |
| `functions/_middleware.js` | Pages entry point: cf/test override → decision → Response (D7, D8) |
| `tests/hant.test.mjs`, `tests/locale-routing/*.test.mjs` | unit, exhaustive idempotence, built-output and middleware tests |
| `scripts/check-locale-routing-live.mjs` | live checks against a preview or production base URL |
| `.github/workflows/deploy-cloudflare-pages.yml` | `npm ci`, `npm test`, post-deploy live check |
| `.gitignore`, `README.md` | generated map ignore; routing + zh-Hant runbook |

---

## Part A — Traditional Chinese locale

### Task A1: OpenCC dependency and `toHant` helper

**Files:**
- Create: `package.json`, `package-lock.json`, `scripts/lib/hant.mjs`, `tests/hant.test.mjs`

**Interfaces:**
- Produces: `HANT = "zh-hant"`; `toHant(value)` → same shape with every string converted cn→twp, functions wrapped so their return value is converted, RegExp / numbers / null passed through; `addHant(map)` sets `map[HANT] = toHant(map.zh)` and throws when `map.zh` is missing.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "dictivo-site",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test \"tests/**/*.test.mjs\""
  },
  "dependencies": {
    "opencc-js": "1.4.2"
  }
}
```

Run: `npm install` → creates `package-lock.json`; `node_modules/` is already gitignored.

- [ ] **Step 2: Write the failing test `tests/hant.test.mjs`**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { HANT, addHant, toHant } from "../scripts/lib/hant.mjs";

test("converts Simplified strings with Taiwan phrasing", () => {
  assert.equal(toHant("隐私优先的本地听写软件，下载视频"), "隱私優先的本地聽寫軟體，下載影片");
});

test("keeps ASCII placeholders, URLs and markup untouched", () => {
  assert.equal(toHant('<a href="/compare/">{competitor} 价格 $29</a>'), '<a href="/compare/">{competitor} 價格 $29</a>');
});

test("deep-converts arrays and objects, wraps functions, passes other values through", () => {
  const pattern = /简体/g;
  const out = toHant({ list: ["软件"], nested: { text: "网络" }, note: (v) => `版本 ${v} 下载`, pattern, count: 3, empty: null });
  assert.deepEqual(out.list, ["軟體"]);
  assert.equal(out.nested.text, "網路");
  assert.equal(out.note("1.0"), "版本 1.0 下載");
  assert.equal(out.pattern, pattern);
  assert.equal(out.count, 3);
  assert.equal(out.empty, null);
});

test("addHant derives zh-hant from zh only", () => {
  const map = { en: "Software", ja: "ソフトウェア", zh: "软件" };
  addHant(map);
  assert.equal(HANT, "zh-hant");
  assert.equal(map[HANT], "軟體");
  assert.equal(map.ja, "ソフトウェア");
  assert.throws(() => addHant({ en: "x" }), /no zh entry/);
});
```

- [ ] **Step 3: Run it and confirm it fails**

Run: `npm test` — Expected: FAIL, `Cannot find module .../scripts/lib/hant.mjs`.

- [ ] **Step 4: Implement `scripts/lib/hant.mjs`**

```js
import * as OpenCC from "opencc-js";

// Traditional Chinese pages are derived from the Simplified copy at build time.
export const HANT = "zh-hant";

const convert = OpenCC.Converter({ from: "cn", to: "twp" });

// Context fixes for phrase conversions reviewed in Task A3. Keep each one covered by a test.
const HANT_FIXES = [];

function convertString(value) {
  return HANT_FIXES.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), convert(value));
}

export function toHant(value) {
  if (typeof value === "string") return convertString(value);
  if (typeof value === "function") return (...args) => toHant(value(...args));
  if (Array.isArray(value)) return value.map(toHant);
  if (value && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, toHant(entry)]));
  }
  return value;
}

export function addHant(map) {
  if (!map?.zh) throw new Error("addHant: map has no zh entry");
  map[HANT] = toHant(map.zh);
  return map;
}
```

If `import * as OpenCC from "opencc-js"` does not expose `Converter` under Node ESM, use `import OpenCC from "opencc-js"` (CommonJS default export) and keep the rest unchanged.

- [ ] **Step 5: Run tests** — `npm test` → Expected: 4 passing.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json scripts/lib/hant.mjs tests/hant.test.mjs
git commit -m "build: add OpenCC helper for Traditional Chinese copy"
```

### Task A2: Generate `/zh-hant/` pages

**Files:**
- Modify: `data/site-content.mjs:3-14` (LOCALES), `data/product-film.mjs:12` (caption path)
- Modify: `scripts/generate-site.mjs` — imports (~`:44`), `compareCopy` (`:2244`), `OG_LOCALE_BY_HTML_LANG` (`:2259`), `localizedCompareRows` (`:2536`), `platformUnavailableCopy` (`:2553`), `localizedCompareSections/Faqs` (`:2557-2565`), `macMemoryLabel` (`:2932-2947`), `productFilmTracks` (`:4179`), build section before `rmSync(outDir…)` (`:6125`)
- Test: `tests/zh-hant-output.test.mjs`

**Interfaces:**
- Consumes: `HANT`, `toHant`, `addHant` from Task A1.
- Produces: `dist/zh-hant/**` with the same 14 files as `dist/zh/**`; `dist/assets/film-v08/captions.zh-Hant.vtt`; `PRODUCT_FILM.chineseTraditional`.

- [ ] **Step 1: Write the failing built-output test `tests/zh-hant-output.test.mjs`**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { toHant } from "../scripts/lib/hant.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
const list = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? list(path) : [path];
});
const zhFiles = list(join(dist, "zh")).map((path) => relative(join(dist, "zh"), path));
const zhHtml = zhFiles.filter((file) => file.endsWith(".html"));
const visibleText = (html) => html
  .replace(/<script[\s\S]*?<\/script>/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replaceAll("简体中文", " ");

test("every zh file has a zh-hant twin", () => {
  for (const file of zhFiles) assert.ok(existsSync(join(dist, "zh-hant", file)), `missing zh-hant/${file}`);
});

test("zh-hant pages are Traditional Chinese, not English fallbacks", () => {
  for (const file of zhHtml) {
    const page = readFileSync(join(dist, "zh-hant", file), "utf8");
    const text = visibleText(page);
    assert.match(page, /<html lang="zh-Hant">/, file);
    assert.ok((text.match(/[一-鿿]/g) || []).length > 200, `${file}: too little Chinese text`);
    assert.equal(toHant(text), text, `${file}: unconverted Simplified text`);
  }
});

test("zh-hant pages do not link to Simplified pages except language choices", () => {
  for (const file of zhHtml) {
    const page = readFileSync(join(dist, "zh-hant", file), "utf8")
      .replace(/<link rel="alternate"[^>]*>/g, "")
      .replace(/<a href="\/zh\/[^"]*lang=zh"[^>]*>/g, "");
    assert.doesNotMatch(page, /href="\/zh\//, file);
  }
});

test("hreflang, OG locale, sitemap and film captions include zh-Hant", () => {
  assert.match(readFileSync(join(dist, "index.html"), "utf8"), /hreflang="zh-Hant" href="https:\/\/dictivo\.app\/zh-hant\/"/);
  assert.match(readFileSync(join(dist, "zh-hant/index.html"), "utf8"), /og:locale" content="zh_TW"/);
  assert.match(readFileSync(join(dist, "zh-hant/index.html"), "utf8"), /srclang="zh-Hant" label="繁體中文" src="[^"]+" default/);
  assert.match(readFileSync(join(dist, "sitemap.xml"), "utf8"), /<loc>https:\/\/dictivo\.app\/zh-hant\/<\/loc>/);
  assert.ok(existsSync(join(dist, "assets/film-v08/captions.zh-Hant.vtt")));
});
```

(The `lang=zh` exception is satisfied once Task B5 adds `?lang=` to language links; until then the `<a href="/zh/…">` menu link has no `lang=zh`, so run this test after `node scripts/generate-site.mjs` and expect only that test to fail until B5 — or temporarily relax it and restore it in B5.)

- [ ] **Step 2: Run** `node scripts/generate-site.mjs; npm test` — Expected: FAIL (`dist/zh-hant` missing).

- [ ] **Step 3: LOCALES** (`data/site-content.mjs`)

```js
  { code: "zh", htmlLang: "zh-Hans", name: "Simplified Chinese", nativeName: "简体中文", path: "/zh/" },
  { code: "zh-hant", htmlLang: "zh-Hant", name: "Traditional Chinese", nativeName: "繁體中文", path: "/zh-hant/" },
```

- [ ] **Step 4: Film caption path** (`data/product-film.mjs`, after `chinese:`)

```js
  chineseTraditional: "/assets/film-v08/captions.zh-Hant.vtt",
```

- [ ] **Step 5: Generator edits** (`scripts/generate-site.mjs`)

Import after the `data/impressum.mjs` import:

```js
import { HANT, addHant, toHant } from "./lib/hant.mjs";
```

`compareCopy` — Simplified desktop replacements run before conversion:

```js
let hantCompareCopy = null;

function compareCopy(code) {
  if (code === "en") return COMPARE_I18N.en;
  if (code === HANT) return (hantCompareCopy ??= { ...toHant(compareCopy("zh")), locale: HANT });
  return applyCompareDesktopCopy({ ...compactCompareLocale(COMPARE_I18N[code] || {}), locale: code }, code);
}
```

`OG_LOCALE_BY_HTML_LANG`: add `"zh-Hant": "zh_TW",` after `"zh-Hans"`.

`localizedCompareRows` competitor line:

```js
    competitor: copy === COMPARE_I18N.en
      ? row.competitor
      : copy.locale === HANT
        ? toHant(localizedCompetitorFact(page, row, "zh"))
        : localizedCompetitorFact(page, row, copy.locale),
```

`platformUnavailableCopy` return: `return copy[code] || (code === HANT ? toHant(copy.zh) : copy.en);`

```js
function localizedCompareSections(page, copy) {
  if (copy === COMPARE_I18N.en) return page.sections;
  if (copy.locale === HANT) return toHant(localizedComparisonSections(page, "zh"));
  return localizedComparisonSections(page, copy.locale);
}

function localizedCompareFaqs(page, copy) {
  if (copy === COMPARE_I18N.en) return page.faqs;
  if (copy.locale === HANT) return toHant(localizedComparisonFaqs(page, "zh"));
  return localizedComparisonFaqs(page, copy.locale);
}
```

`macMemoryLabel` unknown branch: assign the inline object to `const labels = { … }` and return
`labels[currentCode] || (currentCode === HANT ? toHant(labels.zh) : undefined) || MAC_ADVISOR_MEMORY.find((item) => item.id === id)?.label || id`.

```js
function productFilmTracks(code = "en") {
  const selected = code === "zh" ? "zh-CN" : code === HANT ? "zh-Hant" : "en";
  const isDefault = (lang) => (selected === lang ? " default" : "");
  return `<track kind="captions" srclang="en" label="English" src="${PRODUCT_FILM.captions}"${isDefault("en")} />
    <track kind="subtitles" srclang="zh-CN" label="简体中文" src="${PRODUCT_FILM.chinese}"${isDefault("zh-CN")} />
    <track kind="subtitles" srclang="zh-Hant" label="繁體中文" src="${PRODUCT_FILM.chineseTraditional}"${isDefault("zh-Hant")} />`;
}
```

Immediately before `rmSync(outDir, { recursive: true, force: true });`:

```js
// Traditional Chinese (zh-hant) is derived from the Simplified copy at build time.
// Only zh entries pass through OpenCC, so Japanese Kanji copy is never converted.
for (const map of [
  HOME_COPY, HOME_CONVERSION_COPY, FILM_COPY, COMPARISON_EVIDENCE_COPY, MAC_ADVISOR_COPY,
  OFFLINE_DICTATION_GUIDE_COPY, PRIVACY_PROOF_COPY, NATIVE_DEMO.summary, WINDOWS_DOWNLOAD_COPY,
  WINDOWS_HOME_COPY, WINDOWS_UNAVAILABLE_HOME_COPY, SEO_HOME_COPY, TRUST_UI, LLMS_LABELS,
]) addHant(map);
for (const page of TRUST_PAGES) if (page.locales?.zh) page.locales[HANT] = toHant(page.locales.zh);
```

Immediately after `copyStatic("assets");`:

```js
write(PRODUCT_FILM.chineseTraditional.slice(1), toHant(readFileSync(resolve(root, PRODUCT_FILM.chinese.slice(1)), "utf8")));
```

- [ ] **Step 6: Generate and iterate** — `node scripts/generate-site.mjs`. Any `Missing …` / `undefined` crash names a remaining `[code]` lookup: give it the same `HANT → toHant(<map>.zh)` treatment and re-run until generation succeeds.

- [ ] **Step 7: Run** `npm test` — Expected: all zh-hant tests pass (except the `lang=zh` exception noted in Step 1 until B5).

- [ ] **Step 8: Commit**

```bash
git add data/site-content.mjs data/product-film.mjs scripts/generate-site.mjs tests/zh-hant-output.test.mjs
git commit -m "feat: publish Traditional Chinese pages derived from Simplified copy"
```

### Task A3: Checks for 11 locales and conversion review

**Files:**
- Modify: `scripts/check-public-output.mjs:1-6, 104, 121-155`, `scripts/check-product-film.mjs`
- Modify (only if review finds errors): `scripts/lib/hant.mjs` (`HANT_FIXES`), `tests/hant.test.mjs`

- [ ] **Step 1: `check-public-output.mjs`** — import `{ toHant } from "./lib/hant.mjs"`; add `"zh-hant/index.html"` to `homeFiles`; add `"zh-hant/llms.txt"`, `"zh-hant/privacy-proof/index.html"`, `"zh-hant/guides/offline-dictation-on-mac/index.html"` to `requiredGeoFiles`; wrap the four pattern lists:

```js
// Traditional Chinese pages are converted from Simplified copy, so guard both scripts.
function withHantTwins(patterns) {
  const twins = patterns
    .filter((pattern) => /[一-鿿]/.test(pattern.source))
    .map((pattern) => new RegExp(toHant(pattern.source), pattern.flags))
    .filter((twin) => !patterns.some((pattern) => pattern.source === twin.source));
  return [...patterns, ...twins];
}
```

Apply as `const forbiddenContent = withHantTwins([ … ]);` and likewise for `forbiddenCompareContent`, `staleWindowsHomeContent`, `publicWindowsLaunchContent`.

- [ ] **Step 2: `check-product-film.mjs`** — iterate homepages with `LOCALES` (import from `../data/site-content.mjs`) instead of `Object.keys(FILM_COPY)`; add `film.chineseTraditional` to the `page.includes(…)` assertion and to the size-check path list; print `${LOCALES.length} homepages`.

- [ ] **Step 3: Run every check**

```bash
node scripts/generate-site.mjs && npm test && for s in check-cloud-fast-checkout check-local-checkout check-release-payload-sync check-asset-version check-public-output check-web-attribution check-product-film; do node scripts/$s.mjs || echo "FAIL $s"; done
```

Expected: no `FAIL` lines.

- [ ] **Step 4: Review phrase conversions** — list every phrase where `twp` differs from character-only `tw` across the zh copy (script in scratchpad: convert each zh page's visible text with both converters, diff word by word, print unique pairs with counts). Read every pair in context. For a pair that is wrong in context (e.g. 程序 meaning *procedure* turned into 程式), add `[/wrong/g, "right"]` to `HANT_FIXES` plus a test case in `tests/hant.test.mjs`, regenerate, re-run Step 3.

- [ ] **Step 5: Visual check** — open `dist/zh-hant/index.html` and one compare page in the browser pane; confirm fonts render and the language menu lists 繁體中文.

- [ ] **Step 6: Commit**

```bash
git add scripts/check-public-output.mjs scripts/check-product-film.mjs scripts/lib/hant.mjs tests/hant.test.mjs
git commit -m "test: cover Traditional Chinese output in site checks"
```

---

## Part B — IP-based language routing

### Task B1: Country → locale table

**Files:**
- Create: `lib/locale-routing/countries.mjs`, `tests/locale-routing/countries.test.mjs`

**Interfaces:**
- Produces: `COUNTRIES_BY_LOCALE`, `MULTILINGUAL_COUNTRIES`, `candidatesFor(country, region) → string[]`, `parseAcceptLanguage(header) → string[]` (lower-case tags by preference), `siteLocaleForLanguageTag(tag) → string`, `localeForCountry(country, { region, acceptLanguage }) → locale code`.

- [ ] **Step 1: Write the failing test `tests/locale-routing/countries.test.mjs`**

```js
import test from "node:test";
import assert from "node:assert/strict";
import {
  COUNTRIES_BY_LOCALE, MULTILINGUAL_COUNTRIES, localeForCountry, parseAcceptLanguage, siteLocaleForLanguageTag,
} from "../../lib/locale-routing/countries.mjs";

test("single-language countries map to their site locale", () => {
  for (const [country, locale] of [
    ["DE", "de"], ["AT", "de"], ["FR", "fr"], ["SN", "fr"], ["RE", "fr"], ["MX", "es"], ["AR", "es"], ["BR", "pt"],
    ["AO", "pt"], ["IT", "it"], ["SM", "it"], ["SR", "nl"], ["CN", "zh"], ["TW", "zh-hant"], ["HK", "zh-hant"],
    ["MO", "zh-hant"], ["JP", "ja"], ["KR", "ko"], ["de", "de"],
  ]) assert.equal(localeForCountry(country), locale, country);
});

test("countries outside the target languages, unknown and Tor get English", () => {
  for (const country of ["US", "GB", "IN", "RU", "MA", "AD", "XX", "T1", "", undefined]) {
    assert.equal(localeForCountry(country), "en", String(country));
  }
});

test("multilingual countries use the browser's preference among their languages", () => {
  assert.equal(localeForCountry("CH"), "de");
  assert.equal(localeForCountry("CH", { acceptLanguage: "fr-CH,fr;q=0.9,en;q=0.8" }), "fr");
  assert.equal(localeForCountry("CH", { acceptLanguage: "en-US,it;q=0.5" }), "it");
  assert.equal(localeForCountry("CH", { acceptLanguage: "en-US" }), "de");
  assert.equal(localeForCountry("BE"), "nl");
  assert.equal(localeForCountry("BE", { acceptLanguage: "fr-BE" }), "fr");
  assert.equal(localeForCountry("LU"), "fr");
  assert.equal(localeForCountry("CA"), "en");
  assert.equal(localeForCountry("CA", { acceptLanguage: "fr-CA" }), "fr");
  assert.equal(localeForCountry("CA", { region: "QC" }), "fr");
  assert.equal(localeForCountry("CA", { region: "QC", acceptLanguage: "en-CA" }), "en");
  assert.equal(localeForCountry("CM", { acceptLanguage: "en-GB" }), "en");
  assert.equal(localeForCountry("PR"), "es");
  assert.equal(localeForCountry("SG"), "en");
  assert.equal(localeForCountry("SG", { acceptLanguage: "zh-CN,zh;q=0.9" }), "zh");
  assert.equal(localeForCountry("SG", { acceptLanguage: "zh-TW" }), "en");
});

test("Accept-Language parsing honors q-values, order, wildcards and q=0", () => {
  assert.deepEqual(parseAcceptLanguage("fr;q=0.5, de-CH, *;q=0.1, en;q=0"), ["de-ch", "fr"]);
  assert.deepEqual(parseAcceptLanguage(undefined), []);
  assert.equal(siteLocaleForLanguageTag("zh-Hant-TW"), "zh-hant");
  assert.equal(siteLocaleForLanguageTag("zh-HK"), "zh-hant");
  assert.equal(siteLocaleForLanguageTag("zh-Hans-CN"), "zh");
  assert.equal(siteLocaleForLanguageTag("pt-BR"), "pt");
});

test("every country appears once", () => {
  const listed = [...Object.values(COUNTRIES_BY_LOCALE).flat(), ...Object.keys(MULTILINGUAL_COUNTRIES)];
  assert.equal(new Set(listed).size, listed.length);
});
```

- [ ] **Step 2: Run** `npm test` — Expected: FAIL (module not found).

- [ ] **Step 3: Implement `lib/locale-routing/countries.mjs`**

```js
// Visitor country → site locale. Countries outside these languages get English.
export const COUNTRIES_BY_LOCALE = Object.freeze({
  de: ["DE", "AT", "LI"],
  fr: ["FR", "MC", "GF", "GP", "MQ", "RE", "YT", "PM", "BL", "MF", "WF", "PF", "NC", "TF", "SN", "CI", "ML", "BF",
    "NE", "TG", "BJ", "GN", "GA", "CG", "CD", "CF", "TD", "MG", "DJ", "KM", "BI", "HT"],
  es: ["ES", "MX", "GT", "HN", "SV", "NI", "CR", "PA", "CU", "DO", "CO", "VE", "EC", "PE", "BO", "CL", "AR", "PY",
    "UY", "GQ"],
  it: ["IT", "SM", "VA"],
  nl: ["NL", "SR", "AW", "CW", "SX", "BQ"],
  pt: ["PT", "BR", "AO", "MZ", "CV", "GW", "ST", "TL"],
  zh: ["CN"],
  "zh-hant": ["TW", "HK", "MO"],
  ja: ["JP"],
  ko: ["KR"],
});

// The first language is the default; the others win only when the browser prefers them.
export const MULTILINGUAL_COUNTRIES = Object.freeze({
  CH: ["de", "fr", "it"],
  BE: ["nl", "fr", "de"],
  LU: ["fr", "de"],
  CA: ["en", "fr"],
  CM: ["fr", "en"],
  PR: ["es", "en"],
  SG: ["en", "zh"],
});

const REGION_CANDIDATES = { "CA-QC": ["fr", "en"] };

const COUNTRY_CANDIDATES = {
  ...Object.fromEntries(
    Object.entries(COUNTRIES_BY_LOCALE).flatMap(([locale, countries]) => countries.map((country) => [country, [locale]])),
  ),
  ...MULTILINGUAL_COUNTRIES,
};

export function candidatesFor(country, region = "") {
  const countryCode = String(country || "").toUpperCase();
  const regionCode = String(region || "").toUpperCase();
  return REGION_CANDIDATES[`${countryCode}-${regionCode}`] || COUNTRY_CANDIDATES[countryCode] || ["en"];
}

export function parseAcceptLanguage(header) {
  return String(header || "")
    .split(",")
    .map((part, index) => {
      const [tag = "", ...params] = part.trim().split(";");
      const q = params.map((param) => param.trim()).find((param) => param.startsWith("q="));
      const quality = q === undefined ? 1 : Number(q.slice(2));
      return { tag: tag.trim().toLowerCase(), quality: Number.isFinite(quality) ? quality : 0, index };
    })
    .filter((item) => item.tag && item.tag !== "*" && item.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index)
    .map((item) => item.tag);
}

export function siteLocaleForLanguageTag(tag) {
  const [primary, ...rest] = String(tag).toLowerCase().split("-");
  if (primary !== "zh") return primary;
  return rest.some((part) => ["hant", "tw", "hk", "mo"].includes(part)) ? "zh-hant" : "zh";
}

export function localeForCountry(country, { region = "", acceptLanguage = "" } = {}) {
  const candidates = candidatesFor(country, region);
  if (candidates.length === 1) return candidates[0];
  for (const tag of parseAcceptLanguage(acceptLanguage)) {
    const locale = siteLocaleForLanguageTag(tag);
    if (candidates.includes(locale)) return locale;
  }
  return candidates[0];
}
```

- [ ] **Step 4: Run** `npm test` — Expected: countries tests pass.
- [ ] **Step 5: Commit** — `git add lib/locale-routing/countries.mjs tests/locale-routing/countries.test.mjs && git commit -m "feat: map visitor countries to site languages"`

### Task B2: Request classification

**Files:**
- Create: `lib/locale-routing/request.mjs`, `tests/locale-routing/request.test.mjs`

**Interfaces:**
- Produces: `isAutomatedClient(userAgent) → boolean`; `navigationKind(headers: Headers, origin: string) → "entry" | "internal" | "prefetch" | "subresource"`; `readCookie(header, name) → string | null`.

- [ ] **Step 1: Write the failing test `tests/locale-routing/request.test.mjs`**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { isAutomatedClient, navigationKind, readCookie } from "../../lib/locale-routing/request.mjs";

const BROWSERS = [
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0",
  "Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/25.0 Chrome/121.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.47(0x18002f2f) NetType/WIFI Language/zh_CN",
  "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36 NAVER(inapp; search; 2000; 12.3.1)",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Twitter for iPhone/10.50",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 DuckDuckGo/7 Safari/605.1.15",
];

const AUTOMATED = [
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/140.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Linux; Android 6.0.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Mobile Safari/537.36 (compatible; Google-InspectionTool/1.0)",
  "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
  "Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)",
  "Mozilla/5.0 (compatible; Yeti/1.1; +https://naver.me/spd)",
  "Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.1; +https://openai.com/gptbot)",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
  "Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)",
  "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
  "Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)",
  "Twitterbot/1.0",
  "WhatsApp/2.23.20.0",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/140.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36 Chrome-Lighthouse",
  "curl/8.7.1",
  "node",
  "",
];

test("browsers and in-app browsers are not automated", () => {
  for (const ua of BROWSERS) assert.equal(isAutomatedClient(ua), false, ua);
});

test("crawlers, link previews, headless and HTTP clients are automated", () => {
  for (const ua of AUTOMATED) assert.equal(isAutomatedClient(ua), true, ua);
  assert.equal(isAutomatedClient(undefined), true);
});

test("classifies navigations", () => {
  const origin = "https://dictivo.app";
  const kind = (headers) => navigationKind(new Headers(headers), origin);
  assert.equal(kind({ "sec-fetch-dest": "document", "sec-fetch-site": "none" }), "entry");
  assert.equal(kind({ "sec-fetch-dest": "document", "sec-fetch-site": "cross-site" }), "entry");
  assert.equal(kind({ "sec-fetch-dest": "document", "sec-fetch-site": "same-site" }), "entry");
  assert.equal(kind({ "sec-fetch-dest": "document", "sec-fetch-site": "same-origin" }), "internal");
  assert.equal(kind({ "sec-fetch-dest": "image", "sec-fetch-site": "cross-site" }), "subresource");
  assert.equal(kind({ "sec-fetch-dest": "document", "sec-purpose": "prefetch;prerender" }), "prefetch");
  assert.equal(kind({ purpose: "prefetch", accept: "text/html" }), "prefetch");
  assert.equal(kind({ accept: "text/html", referer: "https://dictivo.app/de/" }), "internal");
  assert.equal(kind({ accept: "text/html", referer: "https://www.google.com/" }), "entry");
  assert.equal(kind({ accept: "text/html,application/xhtml+xml" }), "entry");
  assert.equal(kind({ accept: "*/*" }), "subresource");
});

test("reads a cookie by exact name and tolerates bad values", () => {
  assert.equal(readCookie("a=1; dictivo_lang=fr; x_dictivo_lang=de", "dictivo_lang"), "fr");
  assert.equal(readCookie("x_dictivo_lang=de", "dictivo_lang"), null);
  assert.equal(readCookie("dictivo_lang=%E0%A4%A", "dictivo_lang"), null);
  assert.equal(readCookie(null, "dictivo_lang"), null);
});
```

- [ ] **Step 2: Run** `npm test` — Expected: FAIL (module not found).

- [ ] **Step 3: Implement `lib/locale-routing/request.mjs`**

```js
// Search crawlers, AI fetchers, link previews and scripted clients always see the URL they asked for.
// Patterns avoid in-app browser names (Twitter, NAVER, DuckDuckGo…) so real visitors are not skipped.
const AUTOMATED_USER_AGENT = new RegExp(
  [
    "bot\\b", "bot[/_;-]", "crawler", "spider", "crawl", "slurp",
    "google-", "-google", "googleother", "google favicon", "google web preview",
    "yeti/", "daumoa", "seznam", "qwantify", "facebookexternalhit", "facebookcatalog", "meta-externalagent",
    "embedly", "skypeuripreview", "vkshare", "slack-imgproxy", "chatgpt-user", "oai-searchbot", "claude-user",
    "claude-searchbot", "perplexity-user", "ccbot", "diffbot", "cohere-ai", "ia_archiver",
    "lighthouse", "pagespeed", "headlesschrome", "phantomjs", "preview",
  ].join("|"),
  "i",
);

export function isAutomatedClient(userAgent) {
  const ua = String(userAgent || "");
  return !/^mozilla\/5\.0/i.test(ua) || AUTOMATED_USER_AGENT.test(ua);
}

export function navigationKind(headers, origin) {
  const dest = headers.get("sec-fetch-dest");
  if (dest && dest !== "document") return "subresource";
  const purpose = headers.get("sec-purpose") || headers.get("purpose") || headers.get("x-purpose") || "";
  if (/prefetch|prerender|preview/i.test(purpose)) return "prefetch";
  if (!dest && !/text\/html/i.test(headers.get("accept") || "")) return "subresource";
  const site = headers.get("sec-fetch-site");
  if (site) return site === "same-origin" ? "internal" : "entry";
  // Browsers without Fetch Metadata: a same-origin Referer means an in-site click.
  const referer = headers.get("referer");
  if (referer) {
    try {
      if (new URL(referer).origin === origin) return "internal";
    } catch {
      return "entry";
    }
  }
  return "entry";
}

export function readCookie(header, name) {
  for (const part of String(header || "").split(";")) {
    const index = part.indexOf("=");
    if (index === -1 || part.slice(0, index).trim() !== name) continue;
    try {
      return decodeURIComponent(part.slice(index + 1).trim());
    } catch {
      return null;
    }
  }
  return null;
}
```

- [ ] **Step 4: Run** `npm test` — Expected: request tests pass. If a listed browser UA is flagged, narrow the matching pattern (never delete a crawler case).
- [ ] **Step 5: Commit** — `git add lib/locale-routing/request.mjs tests/locale-routing/request.test.mjs && git commit -m "feat: classify entry navigations and automated clients"`

### Task B3: Routing decision

**Files:**
- Create: `lib/locale-routing/decide.mjs`, `tests/locale-routing/decide.test.mjs`

**Interfaces:**
- Consumes: B1 `localeForCountry`; B2 `isAutomatedClient`, `navigationKind`, `readCookie`.
- Produces: `COOKIE_NAME = "dictivo_lang"`, `COOKIE_MAX_AGE = 31536000`, `REDIRECT_SCOPE = "unprefixed"`, `decideLocaleRoute({ method, url: URL, headers: Headers, country, region, routes }) → { action: "pass", reason } | { action: "redirect", location, reason, setCookie? }`. `routes` shape: `{ locales: string[], pages: { [path]: { locale: string, alternates: { [code]: path } } } }`.

- [ ] **Step 1: Write the failing test `tests/locale-routing/decide.test.mjs`**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { COOKIE_NAME, decideLocaleRoute } from "../../lib/locale-routing/decide.mjs";

const CHROME = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
const home = { en: "/", de: "/de/", fr: "/fr/", zh: "/zh/", "zh-hant": "/zh-hant/", ja: "/ja/" };
const guide = { en: "/guide/", ja: "/ja/guide/" };
const routes = {
  locales: ["en", "de", "fr", "zh", "zh-hant", "ja", "ko"],
  pages: {
    ...Object.fromEntries(Object.entries(home).map(([locale, path]) => [path, { locale, alternates: home }])),
    ...Object.fromEntries(Object.entries(guide).map(([locale, path]) => [path, { locale, alternates: guide }])),
  },
};

function decide(path, { country = "US", region = "", method = "GET", headers = {} } = {}) {
  return decideLocaleRoute({
    method,
    url: new URL(path, "https://dictivo.app"),
    headers: new Headers({ "user-agent": CHROME, "sec-fetch-dest": "document", "sec-fetch-site": "none", ...headers }),
    country,
    region,
    routes,
  });
}

test("entry on an English page goes to the visitor country's translation", () => {
  assert.deepEqual(decide("/", { country: "DE" }), { action: "redirect", location: "/de/", reason: "country:de" });
  assert.equal(decide("/?utm_source=google&x=1", { country: "DE" }).location, "/de/?utm_source=google&x=1");
  assert.equal(decide("/", { country: "TW" }).location, "/zh-hant/");
  assert.equal(decide("/", { country: "CN" }).location, "/zh/");
  assert.equal(decide("/guide/", { country: "JP" }).location, "/ja/guide/");
  assert.equal(decide("/", { method: "HEAD", country: "FR" }).location, "/fr/");
});

test("English countries, missing translations and unknown countries stay put", () => {
  assert.deepEqual(decide("/", { country: "US" }), { action: "pass", reason: "country:en" });
  assert.equal(decide("/", { country: "KR" }).action, "pass");
  assert.equal(decide("/guide/", { country: "DE" }).action, "pass");
  assert.equal(decide("/", { country: "" }).action, "pass");
});

test("language URLs are explicit choices and are never redirected", () => {
  assert.deepEqual(decide("/de/", { country: "FR" }), { action: "pass", reason: "explicit-locale" });
  assert.equal(decide("/ja/guide/", { country: "US" }).action, "pass");
});

test("a saved language choice beats the country", () => {
  assert.deepEqual(decide("/", { country: "DE", headers: { cookie: `${COOKIE_NAME}=en` } }), { action: "pass", reason: "cookie:en" });
  assert.equal(decide("/", { country: "US", headers: { cookie: `${COOKIE_NAME}=fr` } }).location, "/fr/");
  assert.equal(decide("/", { country: "DE", headers: { cookie: `${COOKIE_NAME}=xx` } }).location, "/de/");
});

test("internal clicks, crawlers, subresources and other methods are never redirected", () => {
  assert.equal(decide("/", { country: "DE", headers: { "sec-fetch-site": "same-origin" } }).reason, "internal");
  assert.equal(decide("/", { country: "DE", headers: { "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" } }).reason, "automated");
  assert.equal(decide("/", { country: "DE", headers: { "sec-fetch-dest": "iframe" } }).reason, "subresource");
  assert.equal(decide("/", { country: "DE", method: "POST" }).reason, "method");
  assert.equal(decide("/about/", { country: "DE" }).reason, "unmapped");
});

test("?lang= saves the choice and returns to the clean URL for everyone", () => {
  assert.deepEqual(decide("/de/?lang=de&utm_source=reddit", { country: "US", headers: { "sec-fetch-site": "same-origin" } }), {
    action: "redirect", location: "/de/?utm_source=reddit", setCookie: "de", reason: "lang:de",
  });
  assert.deepEqual(decide("/?lang=xx", { country: "DE" }), { action: "redirect", location: "/", reason: "lang:invalid" });
  assert.equal(decide("/zh-hant/?lang=zh-hant", { headers: { "user-agent": "Twitterbot/1.0" } }).setCookie, "zh-hant");
});
```

- [ ] **Step 2: Run** `npm test` — Expected: FAIL (module not found).

- [ ] **Step 3: Implement `lib/locale-routing/decide.mjs`**

```js
import { localeForCountry } from "./countries.mjs";
import { isAutomatedClient, navigationKind, readCookie } from "./request.mjs";

export const COOKIE_NAME = "dictivo_lang";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
// Only unprefixed (English) URLs are redirected. /de/, /zh-hant/ … are explicit choices,
// which keeps every translated URL crawlable and shareable as-is.
export const REDIRECT_SCOPE = "unprefixed";

const pass = (reason) => ({ action: "pass", reason });

export function decideLocaleRoute({ method, url, headers, country, region, routes }) {
  if (method !== "GET" && method !== "HEAD") return pass("method");
  const page = routes.pages[url.pathname];
  if (!page) return pass("unmapped");

  if (url.searchParams.has("lang")) {
    const requested = url.searchParams.get("lang");
    const clean = new URL(url);
    clean.searchParams.delete("lang");
    const location = `${clean.pathname}${clean.search}`;
    return routes.locales.includes(requested)
      ? { action: "redirect", location, setCookie: requested, reason: `lang:${requested}` }
      : { action: "redirect", location, reason: "lang:invalid" };
  }

  if (isAutomatedClient(headers.get("user-agent"))) return pass("automated");
  const kind = navigationKind(headers, url.origin);
  if (kind !== "entry") return pass(kind);
  if (page.locale !== "en") return pass("explicit-locale");

  const saved = readCookie(headers.get("cookie"), COOKIE_NAME);
  const source = routes.locales.includes(saved) ? "cookie" : "country";
  const preferred = source === "cookie"
    ? saved
    : localeForCountry(country, { region, acceptLanguage: headers.get("accept-language") });
  const target = page.alternates[preferred];
  if (preferred === "en" || !target || target === url.pathname) return pass(`${source}:${preferred}`);
  return { action: "redirect", location: `${target}${url.search}`, reason: `${source}:${preferred}` };
}
```

- [ ] **Step 4: Run** `npm test` — Expected: decide tests pass.
- [ ] **Step 5: Commit** — `git add lib/locale-routing/decide.mjs tests/locale-routing/decide.test.mjs && git commit -m "feat: decide locale redirects for entry navigations"`

### Task B4: Route map and `_routes.json` from the built site

**Files:**
- Create: `lib/locale-routing/build-routes.mjs`, `tests/locale-routing/built-routes.test.mjs`
- Modify: `scripts/generate-site.mjs` (import + end of file), `.gitignore`

**Interfaces:**
- Consumes: `LOCALES`; B1 `localeForCountry`; B3 `decideLocaleRoute`, `COOKIE_NAME`.
- Produces: `buildLocaleRoutes({ distDir, locales }) → routes` (throws on unknown hreflang, foreign origin, a page that is not its own alternate, or asymmetric groups); `STATIC_EXCLUDES`; `buildRoutesConfig(routes) → { version: 1, include, exclude }` (throws when > 100 rules, a rule > 100 chars, or `/*`); files `lib/locale-routing/generated/routes.json` and `dist/_routes.json`.

- [ ] **Step 1: Write the failing test `tests/locale-routing/built-routes.test.mjs`**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCALES } from "../../data/site-content.mjs";
import { STATIC_EXCLUDES, buildLocaleRoutes, buildRoutesConfig } from "../../lib/locale-routing/build-routes.mjs";
import { localeForCountry } from "../../lib/locale-routing/countries.mjs";
import { COOKIE_NAME, decideLocaleRoute } from "../../lib/locale-routing/decide.mjs";

const root = new URL("../../", import.meta.url).pathname;
const routes = buildLocaleRoutes({ distDir: `${root}dist`, locales: LOCALES });
const config = JSON.parse(readFileSync(`${root}dist/_routes.json`, "utf8"));
const CHROME = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
const COUNTRIES = (() => {
  const names = new Intl.DisplayNames(["en"], { type: "region" });
  const codes = [];
  for (let a = 65; a <= 90; a++) for (let b = 65; b <= 90; b++) {
    const code = String.fromCharCode(a, b);
    if (names.of(code) !== code) codes.push(code);
  }
  return [...codes, "XX", "T1"];
})();

const matches = (rule, path) =>
  new RegExp(`^${rule.split("*").map((part) => part.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".*")}$`).test(path);
const routedToFunction = (path) =>
  config.include.some((rule) => matches(rule, path)) && !config.exclude.some((rule) => matches(rule, path));

function decide(path, { country, region = "", acceptLanguage = "", cookie = "" }) {
  return decideLocaleRoute({
    method: "GET",
    url: new URL(path, "https://dictivo.app"),
    headers: new Headers({ "user-agent": CHROME, "sec-fetch-dest": "document", "sec-fetch-site": "cross-site", "accept-language": acceptLanguage, cookie }),
    country,
    region,
    routes,
  });
}

test("the map covers every translated page in all 11 locales", () => {
  assert.deepEqual(routes.locales, LOCALES.map((locale) => locale.code));
  // 13 page groups × 11 locales + the en/ja first-dictation guide (2026-09-14).
  assert.ok(Object.keys(routes.pages).length >= 13 * LOCALES.length + 2);
  assert.equal(routes.pages["/"].alternates["zh-hant"], "/zh-hant/");
  assert.equal(routes.pages["/zh-hant/compare/"].locale, "zh-hant");
  assert.deepEqual(JSON.parse(readFileSync(`${root}lib/locale-routing/generated/routes.json`, "utf8")), routes);
});

test("_routes.json sends every mapped page, and nothing static, to the Function", () => {
  assert.deepEqual(config, buildRoutesConfig(routes));
  assert.ok(!config.include.includes("/*"));
  for (const rule of STATIC_EXCLUDES) assert.ok(config.exclude.includes(rule), rule);
  assert.ok(config.include.length + config.exclude.length <= 100);
  for (const path of Object.keys(routes.pages)) assert.ok(routedToFunction(path), path);
  for (const path of ["/checkout/local", "/checkout/cloud-fast", "/checkout/local-renewal", "/download/mac",
    "/downloads/Dictivo-macOS-universal.dmg", "/assets/site.css", "/cloud-fast", "/downloads.json", "/sitemap.xml",
    "/de/llms.txt"]) assert.ok(!routedToFunction(path), path);
  assert.match(readFileSync(`${root}dist/_redirects`, "utf8"), /^\/checkout\/local https:\/\/\S+ 302$/m);
});

test("every entry redirect lands on a translation of the same page and is idempotent", () => {
  const englishPages = Object.entries(routes.pages).filter(([, page]) => page.locale === "en");
  const cases = [];
  for (const country of COUNTRIES) for (const acceptLanguage of ["", "fr-CH,fr;q=0.9", "zh-TW", "zh-CN", "it", "en-CA"]) {
    for (const region of ["", "QC"]) cases.push({ country, region, acceptLanguage, cookie: "" });
  }
  for (const country of ["US", "DE", "TW", "CH"]) for (const locale of routes.locales) {
    cases.push({ country, region: "", acceptLanguage: "", cookie: `${COOKIE_NAME}=${locale}` });
  }
  let redirects = 0;
  for (const [path, page] of englishPages) for (const input of cases) {
    const first = decide(path, input);
    const expected = input.cookie ? input.cookie.split("=")[1] : localeForCountry(input.country, input);
    if (first.action === "pass") {
      assert.ok(expected === "en" || !page.alternates[expected], `${path} ${JSON.stringify(input)} should redirect`);
      continue;
    }
    redirects++;
    const target = new URL(first.location, "https://dictivo.app").pathname;
    assert.equal(target, page.alternates[expected], `${path} ${JSON.stringify(input)}`);
    assert.equal(decide(first.location, input).action, "pass", `loop at ${first.location}`);
  }
  assert.ok(redirects > 10_000, `only ${redirects} redirects exercised`);
});

test("translated pages never redirect on entry", () => {
  for (const [path, page] of Object.entries(routes.pages)) {
    if (page.locale === "en") continue;
    for (const country of ["US", "DE", "JP", "TW"]) assert.equal(decide(path, { country }).action, "pass", path);
  }
});
```

- [ ] **Step 2: Run** `node scripts/generate-site.mjs && npm test` — Expected: FAIL (module not found).

- [ ] **Step 3: Implement `lib/locale-routing/build-routes.mjs`**

```js
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const SITE_ORIGIN = "https://dictivo.app";
export const STATIC_EXCLUDES = Object.freeze(["/assets/*", "/checkout/*", "/download/*", "/downloads/*"]);

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith(".html") ? [path] : [];
  });
}

// Only directory index pages are canonical; legacy *.html aliases redirect elsewhere.
function urlPathForFile(file) {
  const path = file.split(sep).join("/");
  if (path === "index.html") return "/";
  return path.endsWith("/index.html") ? `/${path.slice(0, -"index.html".length)}` : null;
}

const groupKey = (alternates) => JSON.stringify(Object.entries(alternates).sort(([a], [b]) => a.localeCompare(b)));

// The redirect map is read from the hreflang annotations of the built pages,
// so routing always matches what search engines are told.
export function buildLocaleRoutes({ distDir, locales }) {
  const codeByHtmlLang = new Map(locales.map((locale) => [locale.htmlLang, locale.code]));
  const pages = {};
  for (const file of htmlFiles(distDir)) {
    const path = urlPathForFile(relative(distDir, file));
    if (!path) continue;
    const html = readFileSync(file, "utf8");
    const alternates = {};
    for (const [, hreflang, href] of html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)) {
      if (hreflang === "x-default") continue;
      const code = codeByHtmlLang.get(hreflang);
      if (!code) throw new Error(`${path}: unknown hreflang ${hreflang}`);
      const url = new URL(href);
      if (url.origin !== SITE_ORIGIN) throw new Error(`${path}: alternate on another origin: ${href}`);
      alternates[code] = url.pathname;
    }
    if (Object.keys(alternates).length < 2) continue;
    const htmlLang = html.match(/<html lang="([^"]+)"/)?.[1];
    const locale = codeByHtmlLang.get(htmlLang);
    if (!locale || alternates[locale] !== path) throw new Error(`${path}: lang ${htmlLang} is not the page's own alternate`);
    pages[path] = { locale, alternates };
  }
  for (const [path, page] of Object.entries(pages)) {
    for (const target of Object.values(page.alternates)) {
      if (!pages[target]) throw new Error(`${path}: alternate ${target} is not a translated page`);
      if (groupKey(pages[target].alternates) !== groupKey(page.alternates)) throw new Error(`${path}: alternates differ from ${target}`);
    }
  }
  return { locales: locales.map((locale) => locale.code), pages };
}

export function buildRoutesConfig(routes) {
  const include = [...new Set(Object.keys(routes.pages).map((path) => (path === "/" ? "/" : `/${path.split("/")[1]}/*`)))].sort();
  const exclude = [...STATIC_EXCLUDES, ...routes.locales.filter((code) => code !== "en").map((code) => `/${code}/llms.txt`)];
  const rules = [...include, ...exclude];
  if (include.includes("/*") || rules.length > 100 || rules.some((rule) => rule.length > 100)) {
    throw new Error(`Invalid _routes.json rules: ${rules.join(", ")}`);
  }
  return { version: 1, include, exclude };
}
```

- [ ] **Step 4: Write the artifacts from the generator** — import in `scripts/generate-site.mjs`:

```js
import { buildLocaleRoutes, buildRoutesConfig } from "../lib/locale-routing/build-routes.mjs";
```

Append at the very end of the file (after `write("404.html", renderNotFound());`):

```js
// Locale routing reads the finished pages, so it runs after every HTML file is written.
const localeRoutes = buildLocaleRoutes({ distDir: outDir, locales: LOCALES });
mkdirSync(resolve(root, "lib/locale-routing/generated"), { recursive: true });
writeFileSync(resolve(root, "lib/locale-routing/generated/routes.json"), `${JSON.stringify(localeRoutes)}\n`);
write("_routes.json", `${JSON.stringify(buildRoutesConfig(localeRoutes), null, 2)}\n`);
```

`.gitignore`: add `lib/locale-routing/generated/`.

- [ ] **Step 5: Run** `node scripts/generate-site.mjs && npm test` — Expected: all tests pass (the exhaustive test runs ~120,000 decisions — every English page × ~250 countries × 6 Accept-Language × 2 regions, plus cookie cases; it must finish in under 60 s, otherwise trim the Accept-Language list, not the countries).
- [ ] **Step 6: Commit** — `git add lib/locale-routing/build-routes.mjs tests/locale-routing/built-routes.test.mjs scripts/generate-site.mjs .gitignore && git commit -m "feat: build locale route map and Functions routes from hreflang"`

### Task B5: Language-choice links and the Pages middleware

**Files:**
- Create: `functions/_middleware.js`, `tests/locale-routing/middleware.test.mjs`, `tests/locale-routing/language-links.test.mjs`
- Modify: `scripts/generate-site.mjs` — `renderLanguageMenu` (`:2385-2404`), homepage `languagePills` (`:4373-4375`)
- Modify: `tests/zh-hant-output.test.mjs` (restore the `lang=zh` exception if it was relaxed in A2)

**Interfaces:**
- Consumes: B3 `decideLocaleRoute`, `COOKIE_NAME`, `COOKIE_MAX_AGE`; B4 `lib/locale-routing/generated/routes.json`.
- Produces: Pages `onRequest(context)`; response header `X-Dictivo-Locale-Route`; cookie `dictivo_lang`.

- [ ] **Step 1: Write the failing tests**

`tests/locale-routing/middleware.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { onRequest } from "../../functions/_middleware.js";

const CHROME = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

function context(path, { headers = {}, cf = { country: "DE" }, origin = "https://dictivo.app" } = {}) {
  const request = new Request(new URL(path, origin), {
    headers: { "user-agent": CHROME, "sec-fetch-dest": "document", "sec-fetch-site": "none", ...headers },
  });
  Object.defineProperty(request, "cf", { value: cf });
  const calls = { next: 0 };
  return {
    request,
    calls,
    next: async () => {
      calls.next++;
      return new Response("<!doctype html>", { status: 200, headers: { "content-security-policy": "default-src 'self'" } });
    },
  };
}

test("redirects an entry visit with no-store and keeps the query string", async () => {
  const response = await onRequest(context("/?utm_source=google"));
  assert.equal(response.status, 302);
  assert.equal(response.headers.get("location"), "/de/?utm_source=google");
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.equal(response.headers.get("x-dictivo-locale-route"), "country:de");
});

test("passes through with static headers intact", async () => {
  const ctx = context("/", { cf: { country: "US" } });
  const response = await onRequest(ctx);
  assert.equal(response.status, 200);
  assert.equal(ctx.calls.next, 1);
  assert.equal(response.headers.get("content-security-policy"), "default-src 'self'");
  assert.equal(response.headers.get("x-dictivo-locale-route"), "country:en");
});

test("?lang= stores the choice in a first-party cookie", async () => {
  const response = await onRequest(context("/fr/?lang=fr", { headers: { "sec-fetch-site": "same-origin" } }));
  assert.equal(response.headers.get("location"), "/fr/");
  assert.equal(response.headers.get("set-cookie"), "dictivo_lang=fr; Path=/; Max-Age=31536000; SameSite=Lax; Secure; HttpOnly");
});

test("the test country header only works on preview hosts", async () => {
  const headers = { "x-dictivo-test-country": "JP" };
  assert.equal((await onRequest(context("/", { headers, cf: { country: "US" } }))).status, 200);
  const preview = await onRequest(context("/", { headers, cf: { country: "US" }, origin: "https://feat-ip-locale-routing.dictivo-app.pages.dev" }));
  assert.equal(preview.headers.get("location"), "/ja/");
});

test("fails open when routing throws", async () => {
  const ctx = context("/");
  Object.defineProperty(ctx.request, "cf", { get() { throw new Error("boom"); } });
  assert.equal((await onRequest(ctx)).status, 200);
});
```

`tests/locale-routing/language-links.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCALES } from "../../data/site-content.mjs";

const dist = new URL("../../dist/", import.meta.url).pathname;

test("language menu and homepage pills link with ?lang= of the target language", () => {
  for (const file of ["index.html", "zh-hant/index.html", "de/compare/index.html", "guides/mac-dictation-benchmark-method/index.html"]) {
    const html = readFileSync(`${dist}${file}`, "utf8");
    const links = [...html.matchAll(/<a href="([^"]+)" lang="([^"]+)" hreflang="\2"/g)];
    assert.ok(links.length >= LOCALES.length, `${file}: ${links.length} language links`);
    for (const [, href, htmlLang] of links) {
      const code = LOCALES.find((locale) => locale.htmlLang === htmlLang).code;
      assert.equal(new URL(href.replaceAll("&amp;", "&"), "https://dictivo.app").searchParams.get("lang"), code, `${file} ${href}`);
    }
  }
});
```

- [ ] **Step 2: Run** `node scripts/generate-site.mjs && npm test` — Expected: FAIL (middleware module missing; links have no `lang`).

- [ ] **Step 3: Language links** (`scripts/generate-site.mjs`), next to `renderLanguageMenu`:

```js
// Language choices carry ?lang= so the site can remember them; the Pages middleware
// stores the choice and redirects to the clean URL.
function languageChoiceHref(href, code) {
  const [path, hash] = href.split("#");
  return `${path}${path.includes("?") ? "&" : "?"}lang=${encodeURIComponent(code)}${hash ? `#${hash}` : ""}`;
}
```

In `renderLanguageMenu` use `href="${attr(languageChoiceHref(hrefForLocale(locale), locale.code))}"`; in `languagePills` use `href="${attr(languageChoiceHref(item.path, item.code))}"`.

- [ ] **Step 4: Implement `functions/_middleware.js`**

```js
import routes from "../lib/locale-routing/generated/routes.json" with { type: "json" };
import { COOKIE_MAX_AGE, COOKIE_NAME, decideLocaleRoute } from "../lib/locale-routing/decide.mjs";

// Country overrides exist for end-to-end tests on preview deployments only.
const TEST_HOSTS = /(^|\.)dictivo-app\.pages\.dev$|^localhost$|^127\.0\.0\.1$/;

function routeFor(request) {
  const url = new URL(request.url);
  const testable = TEST_HOSTS.test(url.hostname);
  const override = (name) => (testable ? request.headers.get(name) : null);
  return decideLocaleRoute({
    method: request.method,
    url,
    headers: request.headers,
    country: override("x-dictivo-test-country") ?? request.cf?.country ?? "",
    region: override("x-dictivo-test-region") ?? request.cf?.regionCode ?? "",
    routes,
  });
}

export async function onRequest(context) {
  let decision;
  try {
    decision = routeFor(context.request);
  } catch {
    return context.next();
  }

  if (decision.action === "redirect") {
    const headers = new Headers({
      Location: decision.location,
      "Cache-Control": "private, no-store",
      Vary: "Cookie",
      "X-Dictivo-Locale-Route": decision.reason,
    });
    if (decision.setCookie) {
      headers.set("Set-Cookie", `${COOKIE_NAME}=${decision.setCookie}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax; Secure; HttpOnly`);
    }
    return new Response(null, { status: 302, headers });
  }

  const response = await context.next();
  try {
    const tagged = new Response(response.body, response);
    tagged.headers.set("X-Dictivo-Locale-Route", decision.reason);
    return tagged;
  } catch {
    return response;
  }
}
```

- [ ] **Step 5: Run** `node scripts/generate-site.mjs && npm test` — Expected: all tests pass.
- [ ] **Step 6: Bundle check** — `npx --yes wrangler@4.90.1 pages functions build --outdir <scratchpad>/fn-build` → Expected: "Compiled Worker successfully" (proves the JSON import attribute bundles).
- [ ] **Step 7: Commit** — `git add functions/_middleware.js scripts/generate-site.mjs tests/locale-routing/middleware.test.mjs tests/locale-routing/language-links.test.mjs tests/zh-hant-output.test.mjs && git commit -m "feat: route entry visits by country and remember language choices"`

### Task B6: Privacy disclosure, live check, CI and runbook

**Files:**
- Modify: `data/trust-pages.mjs` (privacy sections, after the lastModified loop), `.github/workflows/deploy-cloudflare-pages.yml`, `README.md`
- Create: `scripts/check-locale-routing-live.mjs`

- [ ] **Step 1: Privacy Policy section** — insert after "Anonymous usage statistics" in the `privacy` page:

```js
      {
        title: "Website language",
        paragraphs: [
          "When you open an English address on dictivo.app, the website may send you to the same page in your local language. It decides this from the country your connection appears to come from. That country is used only for this redirect and is not stored.",
          "If you choose a language in the language menu, the website sets a cookie named dictivo_lang that contains only that language code, so later visits keep your choice. It lasts up to one year, contains no identifier, and is not used for analytics or advertising. Clearing your browser's cookies removes it.",
        ],
        bullets: [
          "Addresses that already name a language, such as /de/ or /zh-hant/, are never redirected.",
          "Search engines and link previews always see the page they requested.",
        ],
      },
```

After the loop that sets `TRIAL_MILESTONE_LASTMOD`, add:

```js
// The Privacy Policy gained the website-language section on 2026-09-14.
TRUST_PAGES.find((page) => page.slug === "privacy").lastModified = "2026-09-14";
```

- [ ] **Step 2: `scripts/check-locale-routing-live.mjs`**

```js
// Live language-routing checks. Usage:
//   node scripts/check-locale-routing-live.mjs https://dictivo.app
//   node scripts/check-locale-routing-live.mjs https://<branch>.dictivo-app.pages.dev --country-override
const base = process.argv[2] || "https://dictivo.app";
const override = process.argv.includes("--country-override");
const CHROME = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
const GOOGLEBOT = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const failures = [];

async function visit(path, { headers = {}, country, region, method = "GET" } = {}) {
  const request = { "user-agent": CHROME, accept: "text/html", "sec-fetch-dest": "document", "sec-fetch-site": "none", ...headers };
  if (country) request["x-dictivo-test-country"] = country;
  if (region) request["x-dictivo-test-region"] = region;
  return fetch(new URL(path, base), { method, headers: request, redirect: "manual" });
}

async function expect(name, responsePromise, assertions) {
  try {
    const response = await responsePromise;
    const problems = assertions(response).filter(Boolean);
    if (problems.length) failures.push(`${name}: ${problems.join("; ")}`);
    else console.log(`OK ${name}`);
  } catch (error) {
    failures.push(`${name}: ${error.message}`);
  }
}

const status = (response, code) => response.status !== code && `status ${response.status} != ${code}`;
const header = (response, name, pattern) =>
  !pattern.test(response.headers.get(name) || "") && `${name}=${response.headers.get(name)} !~ ${pattern}`;
const location = (response, path) => header(response, "location", new RegExp(`^(${base.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})?${path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));

await expect("explicit language URL is served", visit("/de/"), (r) => [status(r, 200), header(r, "x-dictivo-locale-route", /^explicit-locale$/), header(r, "content-security-policy", /default-src 'self'/)]);
await expect("saved choice redirects English entry", visit("/", { headers: { cookie: "dictivo_lang=fr" } }), (r) => [status(r, 302), location(r, "/fr/"), header(r, "cache-control", /no-store/)]);
await expect("saved English choice stays", visit("/", { headers: { cookie: "dictivo_lang=en" } }), (r) => [status(r, 200), header(r, "x-dictivo-locale-route", /^cookie:en$/)]);
await expect("deep page follows saved choice", visit("/compare/wispr-flow-alternative/?utm_source=x", { method: "HEAD", headers: { cookie: "dictivo_lang=ja" } }), (r) => [status(r, 302), location(r, "/ja/compare/wispr-flow-alternative/?utm_source=x")]);
await expect("?lang= stores choice", visit("/zh-hant/?lang=zh-hant&utm_source=x"), (r) => [status(r, 302), location(r, "/zh-hant/?utm_source=x"), header(r, "set-cookie", /^dictivo_lang=zh-hant;.*HttpOnly/)]);
await expect("crawler is never redirected", visit("/", { headers: { cookie: "dictivo_lang=fr", "user-agent": GOOGLEBOT } }), (r) => [status(r, 200), header(r, "x-dictivo-locale-route", /^automated$/)]);
await expect("internal click is never redirected", visit("/", { headers: { cookie: "dictivo_lang=fr", "sec-fetch-site": "same-origin" } }), (r) => [status(r, 200), header(r, "x-dictivo-locale-route", /^internal$/)]);
await expect("checkout stays a static redirect", visit("/checkout/local"), (r) => [status(r, 302), header(r, "location", /^https:\/\/dictivo\.lemonsqueezy\.com\//), r.headers.has("x-dictivo-locale-route") && "Function ran on checkout"]);
await expect("download stays a static redirect", visit("/download/mac"), (r) => [status(r, 302), header(r, "location", /^https:\/\/api\.dictivo\.app\//)]);
await expect("assets do not invoke the Function", visit("/assets/site.css", { headers: { accept: "text/css", "sec-fetch-dest": "style" } }), (r) => [status(r, 200), r.headers.has("x-dictivo-locale-route") && "Function ran on asset"]);
await expect("slash canonicalization still works", visit("/de"), (r) => [status(r, 308), location(r, "/de/")]);

if (override) {
  const matrix = [
    ["DE", "", "", "/", "/de/"], ["AT", "", "", "/", "/de/"], ["CH", "", "", "/", "/de/"], ["CH", "", "fr-CH", "/", "/fr/"],
    ["FR", "", "", "/", "/fr/"], ["BE", "", "", "/", "/nl/"], ["LU", "", "", "/", "/fr/"], ["CA", "", "", "/", null],
    ["CA", "QC", "", "/", "/fr/"], ["SN", "", "", "/", "/fr/"], ["MX", "", "", "/", "/es/"], ["ES", "", "", "/", "/es/"],
    ["BR", "", "", "/", "/pt/"], ["AO", "", "", "/", "/pt/"], ["IT", "", "", "/", "/it/"], ["NL", "", "", "/", "/nl/"],
    ["CN", "", "", "/", "/zh/"], ["TW", "", "", "/", "/zh-hant/"], ["HK", "", "", "/", "/zh-hant/"], ["MO", "", "", "/", "/zh-hant/"],
    ["SG", "", "", "/", null], ["SG", "", "zh-CN", "/", "/zh/"], ["JP", "", "", "/", "/ja/"], ["KR", "", "", "/", "/ko/"],
    ["US", "", "", "/", null], ["GB", "", "", "/", null], ["IN", "", "", "/", null], ["XX", "", "", "/", null],
    ["JP", "", "", "/guides/first-local-dictation/", "/ja/guides/first-local-dictation/"], ["DE", "", "", "/guides/first-local-dictation/", null],
    ["TW", "", "", "/privacy/where-dictation-audio-goes/", "/zh-hant/privacy/where-dictation-audio-goes/"],
    ["FR", "", "", "/de/", null], ["DE", "", "", "/about/", null],
  ];
  for (const [country, region, acceptLanguage, path, target] of matrix) {
    await expect(`${country}${region ? `-${region}` : ""}${acceptLanguage ? ` (${acceptLanguage})` : ""} ${path}`,
      visit(path, { country, region, headers: acceptLanguage ? { "accept-language": acceptLanguage } : {} }),
      (r) => (target ? [status(r, 302), location(r, target)] : [status(r, 200)]));
  }
} else {
  const plain = await visit("/");
  await expect("test country header is ignored in production", visit("/", { country: "JP" }), (r) => [
    r.status !== plain.status && `status ${r.status} != ${plain.status}`,
    r.headers.get("x-dictivo-locale-route") !== plain.headers.get("x-dictivo-locale-route") && "route header differs",
  ]);
}

if (failures.length) {
  console.error(`Language routing check failed:\n${failures.map((line) => `  - ${line}`).join("\n")}`);
  process.exit(1);
}
console.log(`Language routing check passed against ${base}.`);
```

- [ ] **Step 3: CI** (`.github/workflows/deploy-cloudflare-pages.yml`) — after "Setup Node.js": step `Install build dependencies` → `run: npm ci`. After "Sync desktop release metadata and generate site": step `Run unit and build-output tests` → `run: npm test`. After "Deploy to Cloudflare Pages": step `Check live language routing` → `run: node scripts/check-locale-routing-live.mjs https://dictivo.app`.

- [ ] **Step 4: README** — add a "Language routing" section (what D1–D9 do, where the table lives, how to change a country, how to run the live check with `--country-override` on a preview, the `dictivo_lang` cookie and privacy text, free-plan request quota) and a "Traditional Chinese" section (derived from zh via OpenCC `twp`, `HANT_FIXES`, never edit zh-hant copy directly); update "ten locales" wording to eleven where it describes site locales.

- [ ] **Step 5: Run everything** — `node scripts/generate-site.mjs && npm test && for s in check-cloud-fast-checkout check-local-checkout check-release-payload-sync check-asset-version check-public-output check-web-attribution check-product-film; do node scripts/$s.mjs || echo "FAIL $s"; done` → Expected: tests pass, no `FAIL`.
- [ ] **Step 6: Commit** — `git add data/trust-pages.mjs scripts/check-locale-routing-live.mjs .github/workflows/deploy-cloudflare-pages.yml README.md && git commit -m "docs: disclose language routing and add live routing checks"`

### Task B7: Preview deployment verification

- [ ] **Step 1: Build like CI** — `node scripts/generate-site.mjs && npm test && node scripts/check-public-output.mjs && node scripts/inject-asset-version.mjs`
- [ ] **Step 2: Deploy preview** — `npx --yes wrangler@4.90.1 pages deploy dist --project-name=dictivo-app --branch=feat-ip-locale-routing --commit-dirty=true` → Expected: "Uploading Functions bundle", "Uploading _routes.json", alias `https://feat-ip-locale-routing.dictivo-app.pages.dev`.
- [ ] **Step 3: Live matrix** — `node scripts/check-locale-routing-live.mjs https://feat-ip-locale-routing.dictivo-app.pages.dev --country-override` → Expected: "Language routing check passed".
- [ ] **Step 4: Crawl** — fetch every `<loc>` of the preview's `sitemap.xml` (host rewritten to the preview) with the Googlebot UA and `redirect: "manual"` → Expected: every URL `200`, none `3xx`; the count equals the sitemap count (previous 144 + 14 zh-hant pages).
- [ ] **Step 5: Browser pane** — (a) open the preview root: English (runner country US); (b) language menu → Deutsch → URL becomes `/de/` without `?lang`; (c) type the preview root URL again → lands on `/de/` (saved choice); (d) menu → English → type root → stays English; (e) open `/zh-hant/` and a zh-hant compare page, take screenshots, read the Traditional copy for obvious mistakes.
- [ ] **Step 6: Fix and repeat** — any failure: add a failing unit test reproducing it, fix, re-run B7 from Step 1.

### Task B8: Production release and verification

- [ ] **Step 1: Safety** — `git fetch origin && git merge-base --is-ancestor origin/main HEAD && git log --oneline origin/main..HEAD` → Expected: only this plan's commits; `ce4c818` / `f25246a` absent.
- [ ] **Step 2: Push** — `git push origin feat/ip-locale-routing:main` (fast-forward). Watch the deploy: `gh run watch $(gh run list --workflow deploy-cloudflare-pages.yml --limit 1 --json databaseId -q '.[0].databaseId') --exit-status`.
- [ ] **Step 3: Production checks** — `node scripts/check-locale-routing-live.mjs https://dictivo.app`, `node scripts/check-checkout-live.mjs`, sitemap crawl (Step B7.4) against `https://dictivo.app` → all pass.
- [ ] **Step 4: Report** — local `main` still carries `ce4c818`/`f25246a` on the old base: it must be rebased onto the new `origin/main` before those commits ship (after API `3e5e45f` is deployed). Do not rebase without the user's go-ahead. Mention: a visitor in Germany now lands on `/de/` from `dictivo.app` until they pick English once; watch Search Console coverage for localized URLs over the next weeks.

## Amendment A — EU/EEA consent prompt (user decision, 2026-09-14)

**D12.** EU Geo-blocking Regulation (EU) 2018/302 Art. 3(2) forbids location-based redirects without the customer's explicit consent; the Commission Q&A names the IP address as an indirect criterion (§2.1.18), requires consent for re-routing (§2.2.6), allows remembering consent (§2.2.3) and excludes purely internal situations (§2.1.3). Therefore:

- Visitors from `CONSENT_REQUIRED_COUNTRIES` — EU27 **except DE**, EU outermost regions with own codes (GF GP MQ RE YT MF), EEA (IS LI NO) — who have no saved choice are **never redirected**. English pages that have a translation in their language are served with a prompt in that language: accept → translation with `?lang=<code>`; stay → current URL with `?lang=en`. Either click saves `dictivo_lang` (explicit, remembered consent); after accepting, entry visits redirect automatically; the language menu keeps the English version one click away.
- Germany (purely internal for a German trader) and every non-EU/EEA country keep automatic entry redirects (D1).
- The prompt shows on every English page view (entry or internal) until a choice is saved; never for automated clients, prefetches or subresources.

**B1 additions** (`lib/locale-routing/countries.mjs` + tests):

```js
// EU Geo-blocking Regulation (EU) 2018/302 Art. 3(2): no location-based redirect without explicit consent.
// Germany is excluded: a German trader serving German visitors is a purely internal situation (Q&A §2.1.3).
export const CONSENT_REQUIRED_COUNTRIES = Object.freeze(new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
  "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GF", "GP", "MQ", "RE", "YT", "MF", "IS", "LI", "NO",
]));

export function requiresConsent(country) {
  return CONSENT_REQUIRED_COUNTRIES.has(String(country || "").toUpperCase());
}
```

Tests: `requiresConsent` is true for FR, AT, RE, LI; false for DE, CH, PF, US, JP, ""; set size 35.

**B3 replacement of the tail of `decideLocaleRoute`** (after the `?lang=` block):

```js
  if (isAutomatedClient(headers.get("user-agent"))) return pass("automated");
  const kind = navigationKind(headers, url.origin);
  if (kind === "subresource" || kind === "prefetch") return pass(kind);
  if (page.locale !== "en") return pass("explicit-locale");

  const saved = readCookie(headers.get("cookie"), COOKIE_NAME);
  if (routes.locales.includes(saved)) {
    const target = page.alternates[saved];
    if (kind !== "entry") return pass("internal");
    if (saved === "en" || !target) return pass(`cookie:${saved}`);
    return { action: "redirect", location: `${target}${url.search}`, reason: `cookie:${saved}` };
  }

  const preferred = localeForCountry(country, { region, acceptLanguage: headers.get("accept-language") });
  const target = page.alternates[preferred];
  if (preferred === "en" || !target) return pass(`country:${preferred}`);
  if (requiresConsent(country)) {
    return {
      action: "suggest",
      locale: preferred,
      acceptHref: withLang(url, target, preferred),
      stayHref: withLang(url, url.pathname, "en"),
      reason: `suggest:${preferred}`,
    };
  }
  if (kind !== "entry") return pass("internal");
  return { action: "redirect", location: `${target}${url.search}`, reason: `country:${preferred}` };
}

function withLang(url, pathname, code) {
  const next = new URL(url);
  next.pathname = pathname;
  next.searchParams.set("lang", code);
  return `${next.pathname}${next.search}`;
}
```

New decide tests: FR entry on `/` → `{ action: "suggest", locale: "fr", acceptHref: "/fr/?lang=fr", stayHref: "/?lang=en", reason: "suggest:fr" }`; query kept (`/?utm_source=x` → `/fr/?utm_source=x&lang=fr`); AT → suggest de; BE → suggest nl; LU → suggest fr; FR internal click → still suggest; FR + cookie fr → redirect `/fr/`; FR + cookie en → pass; DE → redirect; CH → redirect `/de/`; Googlebot from FR → pass automated.

**New module `lib/locale-routing/suggestion.mjs`** (+ `tests/locale-routing/suggestion.test.mjs`: escapes `"<>&` in hrefs, returns `""` for locales without copy, contains `lang="fr"` and both hrefs):

```js
// Prompt shown instead of a redirect where explicit consent is required (D12).
export const SUGGESTION_COPY = Object.freeze({
  de: { text: "Diese Seite gibt es auch auf Deutsch.", accept: "Auf Deutsch ansehen", stay: "Auf Englisch bleiben" },
  fr: { text: "Cette page existe aussi en français.", accept: "Voir en français", stay: "Rester en anglais" },
  es: { text: "Esta página también está disponible en español.", accept: "Ver en español", stay: "Seguir en inglés" },
  it: { text: "Questa pagina è disponibile anche in italiano.", accept: "Vedi in italiano", stay: "Resta in inglese" },
  nl: { text: "Deze pagina is ook beschikbaar in het Nederlands.", accept: "Bekijk in het Nederlands", stay: "In het Engels blijven" },
  pt: { text: "Esta página também está disponível em português.", accept: "Ver em português", stay: "Continuar em inglês" },
});

const escapeHtml = (value) =>
  String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export function renderSuggestion({ locale, acceptHref, stayHref }) {
  const copy = SUGGESTION_COPY[locale];
  if (!copy) return "";
  return `<aside class="locale-suggestion" lang="${escapeHtml(locale)}" aria-label="${escapeHtml(copy.text)}">`
    + `<p>${escapeHtml(copy.text)}</p>`
    + `<a class="locale-suggestion-accept" href="${escapeHtml(acceptHref)}">${escapeHtml(copy.accept)}</a>`
    + `<a class="locale-suggestion-stay" href="${escapeHtml(stayHref)}">${escapeHtml(copy.stay)}</a>`
    + `</aside>`;
}

export function injectIntoBody(html, markup) {
  return html.replace(/<body\b[^>]*>/i, (tag) => `${tag}${markup}`);
}
```

**B5 middleware addition** — handle `suggest` before the pass-through branch: request the asset without conditional headers (`If-None-Match`, `If-Modified-Since`) so a `304` cannot hide the prompt; only rewrite `200 text/html`; delete `Content-Length`, `ETag`, `Last-Modified`; set `Cache-Control: private, no-store`; inject with `HTMLRewriter` (`.on("body", { element: (el) => el.prepend(markup, { html: true }) })`) when `typeof HTMLRewriter === "function"`, otherwise `injectIntoBody(await response.text(), markup)` (Node tests). Middleware test: FR visitor on `/` → 200, body contains `class="locale-suggestion"` and `href="/fr/?lang=fr"`, `cache-control: private, no-store`, `x-dictivo-locale-route: suggest:fr`.

**CSS** (`assets/site.css`): `.locale-suggestion` — full-width bar above the header using existing color tokens, flex row that wraps on mobile, accept link styled as the primary button, stay link as a text link; visible focus styles; no JavaScript.

**B4 exhaustive test change:** for countries where `requiresConsent(country)` and no cookie, the first decision must never be `redirect`; it is `suggest` exactly when a translation exists for `localeForCountry(...)`, and `acceptHref`'s pathname equals that translation.

**B6 changes:** privacy paragraph 1 becomes: "When you open an English address on dictivo.app, the website may show you the same page in your local language, based on the country your connection appears to come from. That country is used only for this request and is not stored. Visitors from Germany and from outside the European Economic Area are taken to their language directly; visitors from other EEA countries stay on the English page and are asked first." The live matrix expects `suggest:<locale>` (200 + prompt in body) for FR, AT, BE, LU, ES, IT, NL, PT, LI, RE; redirects for DE, CH, PF, MX, BR, CN, TW, HK, MO, JP, KR; and FR + `dictivo_lang=fr` → 302 `/fr/`.

## Self-Review

- **Spec coverage:** D1 → B3 (`explicit-locale`), B4 idempotence test; D2 → B3 cookie/lang tests; D3 → B1; D4 → A1–A3; D5 → B2, B3; D6 → B3, B5; D7 → B5 middleware tests, B6 live check; D8 → B5 test, B6 matrix; D9 → B4; D10 → B6 Step 1 + `check-public-output`; D11 → worktree base, B7, B8.
- **Placeholders:** none; the only conditional work is `HANT_FIXES` entries, which depend on the review in A3 Step 4 and must each come with a test.
- **Type consistency:** `routes` shape `{ locales, pages: { [path]: { locale, alternates } } }` is produced by `buildLocaleRoutes` (B4) and consumed by `decideLocaleRoute` (B3) and the middleware (B5); `HANT = "zh-hant"` matches `COUNTRIES_BY_LOCALE["zh-hant"]` and `LOCALES` code; cookie name/format identical in B3, B5, B6.

