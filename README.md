# Dictivo site

The static site for dictivo.app. `scripts/generate-site.mjs` builds `dist/`, and Cloudflare Pages
serves it. Rules for agents and contributors are in [AGENTS.md](AGENTS.md). Dated change notes are
in [docs/site-history.md](docs/site-history.md).

## Local preview

Node 24 or later. From the repository root:

```sh
npm ci
npm run build
npx --yes wrangler@4.90.1 pages dev dist --compatibility-date=2026-05-15
```

Then open `http://127.0.0.1:8788/`. Wrangler applies `_redirects`, `_headers` and
`functions/_middleware.js` as production does. `python3 -m http.server -d dist` serves files
only: redirects, headers and language routing do not work there. Neither server answers video
Range requests with 206, so test film chapter links on a deployment (see "Product film").

Before you open a pull request, run:

```sh
npm run verify
```

It builds `dist/`, runs every test and runs the seven offline output checks. The Verify workflow
runs the same command on every pull request. A push to `main` deploys to production.


## How the site copy is assembled

`dist/` is the only source of truth for what a reader sees. Every string in `data/` is a starting
point that a later stage may replace. Audit the generated HTML, never the data files.

Release-specific changelog copy lives in `data/release-notes.mjs`, keyed by the
exact desktop version. Unknown future versions render a deliberately generic
entry instead of inheriting details from the previous release. Add the new
version's notes in the desktop release preparation PR, then verify the generated
`dist/changelog/index.html` after release metadata sync.

This is not a style preference. Until 2026-11-03 homepage copy passed through six override stages,
and an audit that read the first one reported about 178 Mac-only strings as live defects. None of
them appeared in `dist/`. Price tokens, the zh-hant conversion and `assets/site.js` still change
text after `data/`.

To check what actually ships:

```sh
node scripts/generate-site.mjs
grep -r "the string you are checking" dist/
node scripts/check-public-output.mjs
```

### Homepage copy

`HOME_COPY` in `data/home-copy.mjs` holds the homepage, header and footer copy, one complete object
per language. No later stage replaces a field. Edit the language you mean; the other languages do
not follow. Three things still change the text on the way to `dist/`:

1. `{{price.*}}` tokens become prices (`scripts/lib/price-tokens.mjs`). `pricing.body` calls
   `pricingAnchor(code)`, so it follows the offer in `data/local-offer.mjs`.
2. `zh` becomes `zh-hant` (`scripts/lib/hant.mjs`).
3. `assets/site.js` changes text in the browser, for example the Windows download promotion.

`HOME_CONVERSION_COPY` in `data/home-conversion.mjs` holds the fields only the homepage uses: the
H1, lede, trial terms, purchase note and changelog label. It shares no field with
`HOME_COPY`. `HOME_CONVERSION_LASTMOD` advances homepage sitemap dates when this copy changes; a
newer release date still takes precedence.

### First-use guide and practice field

`data/first-dictation-guide.mjs` supplies the English and Japanese guides at
`/guides/first-local-dictation/` and `/ja/guides/first-local-dictation/`. Other
language-menu choices return to their own homepage; hreflang only lists the two
actual guide translations. Relevant homepages, comparisons, offline guides and
footers link to the guide.

The practice field is a plain textarea for desktop dictation/paste. The page does
not capture microphone audio, transcribe, send, or store its text. Switching
examples preserves user input; clearing empties and focuses the field; pagehide
clears it before leaving. Page-view/download analytics contain metadata only.
Keep examples labeled as practice text, never as measured recognition results.

### Mac dictation troubleshooting guide (English and Japanese)

`data/mac-dictation-not-working-guide.mjs` supplies `/guides/mac-dictation-not-working/` and
`data/ja-mac-dictation-troubleshooting.mjs` supplies `/ja/guides/mac-dictation-not-working/`,
both for built-in macOS Dictation that does not work. They are translations of one topic, not of
each other's text: each follows Apple's help in its own language. Both heads list `en`, `ja` and
`x-default` (English), the sitemap entries carry the same three alternates, and each language menu
offers the other guide; other languages go to their homepages. Japanese visitors who enter on the
English URL are sent to the Japanese guide, as on every other translated page.

Every statement must come from the Apple or Google help pages in the page's reference list, or
from `fieldTest`, which holds results measured on an actual Mac and renders nothing while it is
`null`. Dictivo appears only in the closing section, labelled as this site's product. Both pages
render through `renderDictationGuidePage()`. The Japanese page keeps the `FAQPage` node it shipped
with (`legacyFaqSchema`); newer guides carry a visible FAQ but no FAQ schema. Its title and body
are unchanged since 2026-09-26. The Japanese offline guide's troubleshooting section is
Dictivo-specific and links here, so the two pages do not target the same heading.

### Answer guides

Five English guides share one shape and one renderer, `renderAnswerGuidePage()` in the generator:
`/guides/offline-dictation-on-mac/` (English only), `/guides/best-speech-to-text-apps-for-mac/`,
`/guides/dictation-app-mac-windows-one-time-license/`, `/guides/mac-dictation-app-no-subscription/`
and `/guides/dictate-into-claude-code-and-cursor-on-mac/`. The shape copies the Windows offline guide:
the query as the H1, a short dated answer, the "What is Dictivo?" block with the downloads, a table
of the ways people ask, a fact table, a method note signed "Dictivo team", the trial panel,
sections, a FAQ, related pages and references.

Each page has one data file (`data/offline-dictation-guide.mjs` for the English object only,
`data/speech-to-text-mac-guide.mjs`, `data/one-time-license-guide.mjs`,
`data/no-subscription-guide.mjs`, `data/claude-code-guide.mjs`). A data file exports the copy
function, its `*_LASTMOD` and `*_CHECKED` dates and its references. The `FAQPage` node is built from
the visible FAQ. The `ItemList` node is built from the fact table: each row header and its "When to
choose it" cell.

Fact rule: every cell about another product comes from a dated source. The source is the
competitor facts file of the date in the page's `*_CHECKED` constant, or a fact the site already
publishes with its own check date. Each competitor row has its own "Checked on" cell. A fact that
no source states reads `Not stated`. Competitor prices are written by hand in the vendor's currency.
Dictivo prices come only from price tokens (`guideLocalPrice()`), never typed. When a competitor
price equals a Dictivo figure, `tests/facts/price-output.test.mjs` needs that vendor in its
allowlist.

The Windows guide keeps its own renderer, data file and date.
`tests/structure/windows-guide-frozen.test.mjs` fails if its `<main>` or date changes. The ten
translated offline guides keep their old shape: the renderer branches on a field that only the
English object has.

Two English guides have a Japanese twin (Batch B3): `/ja/guides/best-speech-to-text-apps-for-mac/`
(`data/ja-speech-to-text-mac-guide.mjs`) and `/ja/guides/mac-dictation-app-no-subscription/`
(`data/ja-no-subscription-guide.mjs`). Both render through `renderAnswerGuidePage()` with code
`ja`. A pair is registered like the troubleshooting pair above: a `*_PATHS` map in the generator
(`SPEECH_TO_TEXT_MAC_GUIDE_PATHS`, `NO_SUBSCRIPTION_GUIDE_PATHS`), `translatedGuideHeadTags()` on
both pages, `translatedGuideSitemapAlternates()` on both sitemap entries, and `hrefForLocale` for the
language menu. English is the x-default; other languages in the Japanese page's menu go to their
homepage. The `ja` path enters the map only while the data file's `*_READY` flag
(`JA_SPEECH_GUIDE_READY`, `JA_NO_SUBSCRIPTION_GUIDE_READY`) is `true`. With the flag `false`, nothing
Japanese is built and the English twin keeps its English-only head. The English twins keep their own
`*_LASTMOD`, `<main>` and `datePublished`; only their head and sitemap entry gain the `ja` alternate.
`data/first-published.mjs` holds per-language objects for both routes. Besides the language menu,
three places link the Japanese pages: the Japanese footer, `/ja/llms.txt` and the Japanese offline
guide (sections 2 and 3). In `/ja/llms.txt` the speech-to-text guide replaces the English line, and
the no-subscription guide is a new line with no English counterpart; no other `llms.txt` names them. A Japanese copy object sets `relatedHeaders` for
the related table (the renderer defaults to the English headers). Facts about other apps come from
the competitor facts file of the page's `*_CHECKED` date; the Voice Type row keeps the Japanese
offline guide's facts and `OFFLINE_GUIDE_PRICES_CHECKED` through `rowChecked`.

A translated offline guide table reads its "Checked on" date per row from `copy.rowChecked` and falls
back to `OFFLINE_GUIDE_PRICES_CHECKED`. Today only `de`, `zh` and `ja` set it, for Voibe
(`OFFLINE_GUIDE_VOIBE_CHECKED`, the 2026-11-10 price spot-check). `offlineDictationGuideReferences(code)`
then dates the Voibe pricing reference the same way; the six languages without a price column
(`fr es it nl pt ko`) keep the shared reference list. `offlineDictationGuideLastmod(code)` and
`offlineDictationGuideReferences(code)` resolve `zh-hant` to `zh`: the build copies the `zh` object
to `zh-hant`, but a test process imports the data file without that copy.

Tests: one wording test per page in `tests/wording/` (`speech-to-text-mac`,
`offline-dictation-mac`, `one-time-license`, `no-subscription`, `claude-code-cursor`,
`ja-speech-to-text-mac`, `ja-no-subscription`) pins the answer, the tables, the schema and the
banned words. `tests/structure/b1-links.test.mjs` checks the English footer and compare hub links
and that every related-table and `/guides/` link on the five English pages lands on a built page.
`tests/structure/ja-guides.test.mjs` holds the shared contract of the Japanese pairs: hreflang,
language menus, locale routing, sitemap, footer, `llms.txt`, schema, and that every in-site link of
both pages and of the Japanese offline guide resolves. It also keeps a not-ready branch for a future
pair. Tests import B1 and B3 dates from the data files; they never type one.

### Docs section

`/docs/` and eight English reference pages at `/docs/<slug>/` describe how the desktop app works:
system requirements, install and uninstall, macOS permissions, models and languages, offline
behavior, network connections, license and devices, updates and renewal. They are English only;
other languages get no docs page and no docs footer link.

One registry, `data/docs-index.mjs`, lists the pages in the order a new user needs them
(`DOCS_PAGES`). Every shared surface iterates it: the write loop, the sitemap, `llms.txt`, the
"All Dictivo docs" section at the end of each page, the index list, the English footer link (column
1, after Security), `scripts/check-public-output.mjs` and `tests/structure/docs-pages.test.mjs`. Each
page has one data file, `data/docs-<slug>.mjs`, that exports a copy function and its
`DOCS_*_LASTMOD`. A page reaches `dist/` only when its copy says `ready: true`; a page that is not
ready is not built, listed or linked. All eight are ready, and the test asserts it.

Pages render through `renderDocsPage(entry)`, a thin wrapper around `renderDictationGuidePage()`:
the method line in `doc-environment`, a short answer, an optional quick-reference table, the
sections, the generated docs nav, a visible FAQ and the sources. The index has its own
`renderDocsIndexPage()` with `CollectionPage`, `ItemList` and a two-crumb breadcrumb. Each page
carries `Organization`, `TechArticle`, `FAQPage` and a three-crumb breadcrumb (Home › Docs › page).
The `FAQPage` node is a deliberate exception to "newer guides carry a visible FAQ but no FAQ
schema": it is built from the same array as the visible FAQ, so the two cannot differ.

Every fact comes from the desktop app's source at a release tag, or from a page this site already
publishes. `DOCS_CHECKED` and `DOCS_CHECKED_VERSION` in `data/docs-shared.mjs` are the day and the
tag the facts were read from, and the method line prints them. Pages never print
`release.version`: a deploy rewrites `data/release.json`, and a page would then name a build nobody
read. If you re-read the facts against a newer tag, bump both constants. Each data file lists its
source lines in its header comment.

The banned strings of `scripts/check-public-output.mjs` shape the copy. Name the license host only
as the hostname `api.lemonsqueezy.com`, never the merchant's brand. Name the model fallback only as
the host `huggingface.co`, never its URL path, because the path names the speech engine. Write "the
local speech engine". Only the license page and the updates page show a price, each once, as a price
token; their sitemap `lastmod` is at least `PRICING_LASTMOD`. Only the install page carries the trial
panel (`docs_install`).

To add a page:

1. Write `data/docs-<slug>.mjs` on the model of `data/docs-updates-and-renewal.mjs`.
2. Add it to `DOCS_PAGES` in `data/docs-index.mjs`.
3. Add its route to `data/first-published.mjs`.
4. Add `tests/wording/docs-<slug>.test.mjs`.
5. Add its constant to the table under "Last-updated constants".

If the page starts with `ready: false`, the all-ready assertion and the in-site link check in
`tests/structure/docs-pages.test.mjs` need a skip for it until it ships.

### Homepage copy assumes Windows is public

`data/home-copy.mjs` states that Mac and Windows x64 are available. Until 2026-11-03 a
`WINDOWS_HOME_COPY` layer and a `WINDOWS_UNAVAILABLE_HOME_COPY` fallback switched that wording
with `hasWindowsRelease`; both were removed (decision G9). If Windows downloads are withdrawn,
`scripts/check-public-output.mjs` fails the build on the Windows launch strings in every homepage,
so rewrite those strings in `data/home-copy.mjs` first.

`WINDOWS_DOWNLOAD_COPY` in `scripts/generate-site.mjs` supplies the download card badge and body,
the EXE and MSI button labels, the version note, and the SmartScreen warning shown because the
Windows installers are not Authenticode-signed.

### `hasWindowsRelease`

```js
const hasWindowsArtifacts = Boolean(windowsRelease?.exe?.url && windowsRelease?.msi?.url);
const hasWindowsRelease = release.publicWindowsDownloads === true && hasWindowsArtifacts;
```

Both halves must hold. `publicWindowsDownloads` in `data/release.json` is the deliberate switch;
the artifact check is the safety catch. `scripts/sync-latest-release.mjs` rewrites
`data/release.json` on every deploy, so a desktop release that ships a DMG but no EXE and MSI turns
`hasWindowsRelease` off without anyone touching the flag.

That one boolean is read throughout `scripts/generate-site.mjs` and
`scripts/check-public-output.mjs`. When it goes false the site switches to a guarded
Mac-download-only state:

- homepage copy does not change (see above), so the build stops at `check-public-output`;
- the hero Windows button and the Windows download card disappear, and the download grid switches
  from `multi` to `single`; with no Windows link in a `[data-platform-downloads]` pair, `site.js`
  has nothing to promote for Windows visitors;
- `/download/windows`, `/download/windows-msi` and the two `/downloads/Dictivo-Windows-x64.*`
  routes point at `/#downloads` instead of the tracking API;
- `downloads.json` drops the Windows artifacts;
- schema.org `operatingSystem` goes back to `macOS` alone and `downloadUrl` back to the Mac URL;
- the comparison pages' `Platforms` rows switch to "temporarily unavailable" wording and
  `applyCompareDesktopCopy()` stops rewriting "Mac" to "desktop";
- `llms.txt` falls back from its Windows summary and facts to the Mac ones;
- the changelog's Windows section is omitted.

`scripts/check-public-output.mjs` fails the build when `publicWindowsDownloads` is true but the
artifacts are missing, rather than letting a bad sync un-launch Windows silently. It also fails on
stale Mac-only strings while Windows is live, and on Windows launch strings while it is not.

### Comparison pages

English comparison content lives in `data/compare-pages.mjs`: one entry per competitor, each with a
`rows` array of `{ label, dictivo, competitor }`.

Localized comparison tables use `data/compare-fact-locales.mjs`. Each competitor maps to
specific factual statements for processing location, offline support, account or license,
pricing, trial, platforms, and the privacy boundary. English rows in `data/compare-pages.mjs`
remain the canonical input for prices and trial quantities; numeric placeholders in the
localized templates read those values instead of maintaining nine copies of a price.

When a competitor changes price, update its English row and its English article. When its
billing structure, feature allowance, processing model, or platforms change, also review the
corresponding fact template and profile in every locale. Missing templates or quantities
fail the build. The quick summary above localized tables now uses these same facts.
Competitor platform availability must never change when Dictivo's Windows downloads are
unavailable. The Dictivo three-year cost is calculated from `data/local-offer.mjs`.

`COMPARE_LAST_UPDATED` in `data/compare-pages.mjs` stamps every comparison page.
`scripts/check-public-output.mjs` fails if a comparison spoke page is missing the visible stamp or
carries any other date, so the constant cannot drift away from what is rendered.

### `security.html` is hand-maintained, not generated

`security.html` at the repository root is copied verbatim by `scripts/generate-site.mjs` to
`dist/security/index.html` (served at `/security/`; `/security.html` redirects there). Edit the root
file. Nothing in `data/` produces it, and it does not inherit the shared header, footer, locale
switcher or asset fingerprinting that generated pages get — so a change to those has to be made
here by hand as well.

### The Impressum is fail-closed

`data/impressum.json` holds the § 5 DDG operator details. `data/impressum.mjs` walks the file and,
while **any** value still starts with `FILL_IN`, exports `IMPRESSUM_READY = false`,
`IMPRESSUM_PAGE = null` and `IMPRESSUM_CONTACT = null`.

While the gate is closed: `/impressum/` is never written and returns 404, the footer link is
omitted, the sitemap entry is skipped, and `/refund/` states the statutory right of withdrawal in
plain prose instead of rendering the formal Widerrufsbelehrung. `scripts/generate-site.mjs` prints
a warning on every run.

Filling `data/impressum.json` turns all four on at once — the page, the footer link, the sitemap
entry, and the formal withdrawal notice that names and addresses the trader. Nothing else needs
editing. Empty `phone`, `vatId` or `contentResponsible` values omit their sections rather than
rendering blank ones; only a `FILL_IN` prefix holds the gate closed.

As of 2026-09-17 the file is still unfilled (deliberately deferred) and `/impressum/` returns 404.

### `scripts/check-public-output.mjs`

The deploy workflow runs this over every text file in `dist/` and fails the build on a match.

The exact patterns and file exceptions in `scripts/check-public-output.mjs` are authoritative.
General marketing copy excludes internal infrastructure, repository paths and process terminology.
Ordinary localized words for sources and visible primary references are allowed. The reproducible
benchmark HTML at `guides/mac-dictation-benchmark-method/index.html` specifically permits
`whisper.cpp` and `machine-readable`; this exception does not apply to general marketing pages.
`downloads.json` may be named on `llms.txt` and the security page, not general marketing surfaces.
A validation failure should be assessed against the actual pattern and the page's purpose.

The same script also asserts that the required trust, GEO and localized pages exist, that no
`data/`, `scripts/`, `tmp/` or `.github/` path is published, that `assets/site.js` still carries
the `web-linked-v1` analytics contract, that `changelog/index.html`, `security/index.html` and
`404.html` reference `assets/site.js` outside any HTML comment, that `site.js` reads the
`dictivo-self` flag and the `?self=` parameter and still declares `analyticsEnabled` as
`isPublicSite && !selfExcluded`, that `sendDownloadClick` and `sendPageView` both open with
`if (!analyticsEnabled) return;`, so nothing is sent and no download link is decorated first,
and the Windows launch consistency rules above.

### Last-updated constants

Visible "Last updated" stamps, schema.org `dateModified` and `sitemap.xml` `lastmod` all read from
constants. Nothing derives them from file mtimes or the build date. Bump the constant when the
content it stamps actually changes — that is the only thing that moves a date.

| Constant | File | Drives |
| --- | --- | --- |
| `MAC_ADVISOR_LASTMOD` | `data/mac-model-advisor.mjs` | sitemap for `/mac-model-guide/` (all locales) |
| `PRIVACY_PROOF_LASTMOD` | `data/privacy-proof-pages.mjs` | sitemap + `dateModified` for `/privacy-proof/` |
| `OFFLINE_DICTATION_GUIDE_LASTMOD` | `data/offline-dictation-guide.mjs` | visible stamp + sitemap + `dateModified` for `/guides/offline-dictation-on-mac/` in a language whose copy object has no `lastUpdated`; the `en`, `de`, `zh` (and so `zh-hant`) and `ja` objects carry their own `lastUpdated`. `OFFLINE_DICTATION_GUIDE_EN_CHECKED` dates the English rows read from the competitor facts; `OFFLINE_GUIDE_PRICES_CHECKED` dates the English Voice Type, Voibe and Aiko rows and every translated row except Voibe in `de`, `zh` and `ja`; `OFFLINE_GUIDE_VOIBE_CHECKED` dates those three Voibe rows and their Voibe pricing reference |
| `OFFLINE_DICTATION_WINDOWS_GUIDE_LASTMOD` | `data/offline-dictation-windows-guide.mjs` | visible stamp + sitemap for `/guides/offline-dictation-on-windows/` |
| `BENCHMARK_METHOD_GUIDE_LASTMOD` | `data/benchmark-method-guide.mjs` | visible stamp + sitemap for `/guides/mac-dictation-benchmark-method/` |
| `SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD` | `data/speech-to-text-mac-guide.mjs` | visible stamp + sitemap + `dateModified` for `/guides/best-speech-to-text-apps-for-mac/`, never older than `PRICING_LASTMOD`; `SPEECH_TO_TEXT_MAC_GUIDE_CHECKED` dates the rows read from the competitor facts and sets the title's year |
| `PRICING_PAGE_LASTMOD` | `data/pricing-page.mjs` | visible stamp + sitemap for `/pricing/`, never older than `PRICING_LASTMOD` |
| `MAC_DICTATION_SHORTCUT_LASTMOD` | `data/mac-dictation-shortcut-guide.mjs` | visible stamp + sitemap + `dateModified` for `/guides/mac-dictation-shortcut/` |
| `MAC_DICTATION_NOT_WORKING_LASTMOD` | `data/mac-dictation-not-working-guide.mjs` | visible stamp + sitemap + `dateModified` for `/guides/mac-dictation-not-working/` |
| `DRAGON_PRICING_LASTMOD` | `data/dragon-pricing-guide.mjs` | visible stamp + sitemap + `dateModified` for `/guides/dragon-pricing/`, never older than `PRICING_LASTMOD`; `DRAGON_PRICING_CHECKED` dates the references |
| `WISPR_FLOW_PRICING_LASTMOD` | `data/wispr-flow-pricing-guide.mjs` | the same for `/guides/wispr-flow-pricing/`; `WISPR_FLOW_PRICING_CHECKED` dates the references |
| `WINDOWS_VOICE_TYPING_LASTMOD` | `data/windows-voice-typing-guide.mjs` | visible stamp + sitemap + `dateModified` for `/guides/windows-voice-typing-not-working/` |
| `BEST_DICTATION_SOFTWARE_LASTMOD` | `data/best-dictation-software-guide.mjs` | visible stamp + sitemap + `dateModified` for `/guides/best-dictation-software/`, never older than `PRICING_LASTMOD`; `BEST_DICTATION_SOFTWARE_CHECKED` dates the references and sets the title's year; `BEST_DICTATION_SOFTWARE_PRICES_RECHECKED` dates only the Spokenly and Voibe prices and their pricing references |
| `ONE_TIME_LICENSE_GUIDE_LASTMOD` | `data/one-time-license-guide.mjs` | visible stamp + sitemap + `dateModified` for `/guides/dictation-app-mac-windows-one-time-license/`, never older than `PRICING_LASTMOD`; `ONE_TIME_LICENSE_GUIDE_CHECKED` dates the competitor rows |
| `NO_SUBSCRIPTION_GUIDE_LASTMOD` | `data/no-subscription-guide.mjs` | the same for `/guides/mac-dictation-app-no-subscription/`; `NO_SUBSCRIPTION_GUIDE_CHECKED` dates the competitor rows |
| `CLAUDE_CODE_GUIDE_LASTMOD` | `data/claude-code-guide.mjs` | the same for `/guides/dictate-into-claude-code-and-cursor-on-mac/`; `CLAUDE_CODE_GUIDE_CHECKED` dates the rows read from the Claude Code and Cursor documentation |
| `JA_SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD` | `data/ja-speech-to-text-mac-guide.mjs` | visible stamp + sitemap + `dateModified` for `/ja/guides/best-speech-to-text-apps-for-mac/` while `JA_SPEECH_GUIDE_READY` is true, never older than `PRICING_LASTMOD`; `JA_SPEECH_TO_TEXT_MAC_GUIDE_CHECKED` dates the competitor rows, the answer and the method note |
| `JA_NO_SUBSCRIPTION_GUIDE_LASTMOD` | `data/ja-no-subscription-guide.mjs` | the same for `/ja/guides/mac-dictation-app-no-subscription/` while `JA_NO_SUBSCRIPTION_GUIDE_READY` is true; `JA_NO_SUBSCRIPTION_GUIDE_CHECKED` dates the competitor rows, the answer and the method note |
| `DOCS_INDEX_LASTMOD` | `data/docs-index.mjs` | visible stamp + sitemap + `dateModified` for `/docs/` |
| `DOCS_SYSTEM_REQUIREMENTS_LASTMOD` | `data/docs-system-requirements.mjs` | visible stamp + sitemap + `dateModified` for `/docs/system-requirements/` |
| `DOCS_INSTALL_LASTMOD` | `data/docs-install-and-uninstall.mjs` | the same for `/docs/install-and-uninstall/` |
| `DOCS_PERMISSIONS_LASTMOD` | `data/docs-macos-permissions.mjs` | the same for `/docs/macos-permissions/` |
| `DOCS_MODELS_LASTMOD` | `data/docs-models-and-languages.mjs` | the same for `/docs/models-and-languages/` |
| `DOCS_OFFLINE_LASTMOD` | `data/docs-offline.mjs` | the same for `/docs/offline/` |
| `DOCS_CONNECTIONS_LASTMOD` | `data/docs-connections.mjs` | the same for `/docs/connections/` |
| `DOCS_LICENSE_LASTMOD` | `data/docs-license-and-devices.mjs` | the same for `/docs/license-and-devices/`; the sitemap reports at least `PRICING_LASTMOD` |
| `DOCS_UPDATES_LASTMOD` | `data/docs-updates-and-renewal.mjs` | the same for `/docs/updates-and-renewal/`; the sitemap reports at least `PRICING_LASTMOD`. `DOCS_CHECKED` and `DOCS_CHECKED_VERSION` (`data/docs-shared.mjs`) date the facts of all nine docs pages and name the app tag they were read from |
| `COMPARE_HUB_LOCALE_LASTMOD` | `data/compare-hub-guidance.mjs` | sitemap for `/compare/` per language, with `COMPARE_HUB_GUIDANCE_LASTMOD` and the comparison pages it lists |
| `JA_MAC_DICTATION_TROUBLESHOOTING_LASTMOD` | `data/ja-mac-dictation-troubleshooting.mjs` | visible stamp + sitemap + `dateModified` for `/ja/guides/mac-dictation-not-working/` |
| `MEDIA_KIT_LASTMOD` | `data/media-kit.mjs` | sitemap + `dateModified` for `/media-kit/` |
| `LEGAL_LASTMOD` | `data/trust-pages.mjs` | visible stamp + sitemap + `dateModified` for `/privacy/`, `/terms/`, `/refund/` |
| `COMPARE_LAST_UPDATED` | `data/compare-pages.mjs` | visible stamp + sitemap for every `/compare/` page, and a build gate |

Every page that shows a Dictivo price (homepages, `/pricing/`, comparison pages and hubs, the
priced guides, the media kit, the first-dictation guides, `/terms/`) reports at least
`PRICING_LASTMOD` from `data/local-offer.mjs` in the sitemap; its visible stamp and `dateModified`
keep the page's own date. `tests/structure/sitemap-lastmod.test.mjs` finds any priced page that does not.

The two `/privacy/` sub-pages carry their own inline `lastModified` values in
`data/trust-pages.mjs`. Pages with no date of their own fall back to `release.updatedAt` from
`data/release.json`, which moves on every desktop release.

schema.org `datePublished` on guides, comparison pages and the two `/privacy/` sub-pages comes
from `data/first-published.mjs`: the first commit that published each route (Traditional Chinese
pages from 2026-09-14). A route whose languages shipped on different days holds one date per
language (`guides/mac-dictation-not-working`: Japanese 2026-09-26, English 2026-10-09), and a
language missing from it is an error rather than a fallback. Those dates never move.

## Cloudflare Pages

- Project name: `dictivo-app`
- Production domain: `dictivo.app`
- Optional redirect domain: `www.dictivo.app`
- Build command: leave empty
- Output directory: `dist`

The site can also be deployed from the generated output with:

```sh
node scripts/generate-site.mjs
npx wrangler pages deploy dist --project-name dictivo-app
```

Do not upload installer binaries into the Pages project. Cloudflare Pages direct uploads have a 25 MiB per-file limit,
and desktop installers should be treated as release artifacts rather than website assets.

## GitHub deployment

The `.github/workflows/deploy-cloudflare-pages.yml` workflow deploys `dist/` to Cloudflare Pages whenever
`main` is pushed. It also accepts a `desktop-release-published` `repository_dispatch` event from the desktop app repo
and runs daily as a fallback. Normal desktop releases send a complete `client_payload.release` object containing the
R2-backed DMG/EXE/MSI URLs, sizes, and SHA-256 digests. That lets this public site repo update without read access to
the private desktop app repo. Manual and scheduled runs without a payload can still use GitHub Release metadata as a
fallback when `DICTIVO_DESKTOP_TOKEN` is configured.

Every deploy runs, in this order:

```sh
node scripts/sync-latest-release.mjs
node scripts/generate-site.mjs
npm test
node scripts/check-cloud-fast-checkout.mjs
node scripts/check-local-checkout.mjs
node scripts/check-checkout-live.mjs
node scripts/check-release-payload-sync.mjs
node scripts/check-asset-version.mjs
node scripts/check-public-output.mjs
node scripts/check-web-attribution.mjs
node scripts/check-product-film.mjs
node scripts/inject-asset-version.mjs
```

`npm test` rebuilds `dist/` before it runs the tests. `npm run verify` runs the same steps without
the release sync, the live checkout check and the asset injection.

The nine check steps are blocking: any one of them fails the deploy before `dist/` reaches
Cloudflare. `scripts/check-public-output.mjs` is the broadest of them - it scans every generated
text file in `dist/` against the defined patterns and explicit evidence-page exceptions.
Visible sources are supported; internal process details remain excluded from marketing copy.

That keeps the homepage, localized pages, comparison pages, `downloads.json`, `_redirects`, `sitemap.xml`, and changelog aligned with
the latest stable desktop release. The final step copies `site.css` and
`site.js` to content-fingerprinted paths and rewrites generated HTML to those
paths. Asset correctness therefore does not depend on a successful cache purge.

Required GitHub Actions secret:

- `CLOUDFLARE_API_TOKEN` with Cloudflare Pages edit permission.
- `CLOUDFLARE_ACCOUNT_ID` for the Cloudflare account that owns the Pages project.
- `DICTIVO_DESKTOP_TOKEN` is optional and only needed for manual/scheduled fallback syncs that must read the private
  desktop repo's GitHub Release API.

Pages refreshes its deployment cache, and CSS/JS filenames include content hashes.
The automatic zone-wide purge was removed on 2026-09-11 after repeated 401 responses;
no extra zone permission is required for normal deployment. If stale content is actually
observed, `scripts/purge-cloudflare-cache.mjs` remains a manual diagnostic action with
a suitable zone token. See [Cloudflare's caching guidance](https://developers.cloudflare.com/pages/configuration/serving-pages/#caching-and-performance).

IndexNow verifies that its ownership text file is publicly readable before submission,
and sends only URLs changed since the live sitemap saved before deployment (see
"IndexNow changed URLs only" in [docs/site-history.md](docs/site-history.md)). HTTP 200 means accepted and 202 means key validation pending; neither proves indexing.
Other responses are reported as failures even though an indexing service outage does
not roll back a successful website deployment.

## Download hosting

The public website exposes macOS universal and Windows x64 downloads. GitHub
Releases remain the archive; the website and updater use the R2-backed download
host synchronized from the latest stable desktop release.

Expected objects:

- `Dictivo-macOS-universal.dmg`
- `Dictivo_*_x64-setup.exe`
- `Dictivo_*_x64_en-US.msi`

The public download buttons point at `api.dictivo.app/download/*` with release and UTM parameters. The API records the
download funnel event, then redirects to the R2 object under `downloads.dictivo.app`. The legacy `/download/*` routes
in `_redirects` also point at the API tracking redirect. Windows routes redirect back to the downloads section unless
`hasWindowsRelease` is true, which requires both `publicWindowsDownloads: true` in `data/release.json` and a
synced release that actually carries the Windows EXE and MSI URLs.

For local preview against a non-production API, set `DICTIVO_DOWNLOAD_API_BASE_URL` before generating the site:

```sh
DICTIVO_DOWNLOAD_API_BASE_URL=http://localhost:8787 node scripts/generate-site.mjs
```

The machine-readable website release manifest lives at `/downloads.json` and lists only public artifacts.

Installers are uploaded to R2 (`downloads.dictivo.app/v<version>/`) by the desktop repository's
`release-desktop.yml`, which then dispatches the release payload to this site. There is no manual upload script
here any more. The macOS DMG is Developer ID signed and notarized; the Windows EXE and MSI are not
Authenticode-signed, and the site's Windows download card carries a SmartScreen note saying so.

## Website analytics

`assets/site.js` emits metadata-only `page_view` events to
`https://api.dictivo.app/v1/analytics/page-view` with the current path, locale,
UTM fields, and normalized referrer. The API derives country from Cloudflare
request metadata and browser family from the user agent; raw IP addresses are
not stored.

Each page load creates an in-memory random `visitId`. It is sent with the page
view, CTA click, and API redirect, then discarded when the page unloads. It is
not stored in cookies or browser storage. This makes the linked website funnel
page view -> download click -> download redirect measurable without creating a
persistent visitor profile. A redirect is download intent, not proof that the
installer finished downloading or that the app opened.

The same three events carry `instrumentationVersion=web-linked-v1`. Analytics
decision readiness uses only this current version; older or unversioned page and
CTA events remain legacy volume and must not be mixed into conversion. Any
future semantic change to the join contract requires a new instrumentation
version instead of silently redefining `web-linked-v1`.

### Channel continuity (2026-09-10)

A user-initiated internal navigation carries the current UTM campaign fields in its target
URL. Without UTMs, the external referrer host becomes the source. Static HTML links remain
canonical and clean; file downloads, external links and existing destination campaigns
are left alone. Checkout uses the separate registered-channel handling below. No visitor id
is carried between pages, and the only browser storage the script touches is the
`dictivo-self` opt-out flag described below. Direct visits remain direct. Opening a fresh
URL independently or using an unhandled navigation path may lose attribution; this is not
cross-session tracking.

Download clicks and redirects now inherit this page's source, medium, campaign, and term.
`content` still identifies the download button; `releaseVersion` still identifies the
installer. This corrects the former generic `site` attribution, so channel totals before
and after the change need that context. The `web-linked-v1` per-page join contract is
unchanged. No install-to-payment join is introduced by this change.

Checkout links carry only an allowed `checkout[custom][channel]` label, alongside any
pre-existing functional checkout parameters. Raw UTM values, search text and page ids
are not copied to checkout. The signed billing webhook records coarse channel attribution;
App/cross-device orders can remain unknown. Explicit `google_ads` separation from `google`
is implemented in the local pending commits noted above, not yet verified in production.

### Host gate and self-exclusion (2026-09-29)

`analyticsEnabled = isPublicSite && !selfExcluded` gates everything the script sends.
`sendPageView` and `sendDownloadClick` return before doing anything when it is false, so local
and Pages-preview hosts neither send page or click beacons nor rewrite download links: their
static `/download/*` links stay exactly as generated. Neither `carryCampaign` nor the checkout
channel label reads `analyticsEnabled`: campaign carry-over runs on every host, and the checkout
label is still added on the public site only (its own `isPublicSite` check), whether or not the
browser is excluded.

Opening `/?self=1` on the public site stores one flag, `localStorage["dictivo-self"] = "1"`, and
`/?self=0` removes it; any other value leaves it alone. While the flag is set that browser sends
no page views or download clicks and keeps download links static. Every storage access is wrapped
in try/catch, so a browser with storage blocked or throwing counts as not excluded. The address is
not rewritten, the flag never travels with a link, and nothing else is stored. Storage is per
origin; `www.dictivo.app` redirects to `dictivo.app` with the query intact, so the flag always
lands on `dictivo.app`. `/privacy/` and `/security/` describe the flag.

`/changelog/`, `/security/` and the 404 page load `assets/site.js` like every generated page, so
they send the same page-load event and nothing more.

The built-in Node check `node scripts/check-web-attribution.mjs` exercises campaign handoff,
independent page ids, click/redirect parity, referrer query removal, navigation exclusions,
preview isolation (static preview download links included) and that the `dictivo-self` flag is
the script's only browser storage. `npm test` also runs `tests/facts/site-analytics-gate.test.mjs`
(the gate, the fetch fallback, the flag and storage failures) and `tests/structure/site-script.test.mjs`
(the three pages carry the shared script line). The check and `npm test` both run in
deployment CI.

## Language routing (2026-09-14)

`functions/_middleware.js` is the site's only Pages Function. It decides, per request, whether a
visitor who arrives on an English page should see a translation. The decision lives in
`lib/locale-routing/` and is covered by `npm test`.

- **Only English addresses are routed.** URLs that already name a language (`/de/`, `/zh-hant/` …)
  are explicit choices and are never redirected. In-site clicks, prefetches, crawlers, link previews
  and scripted clients are never redirected either.
- **Order of preference:** a saved choice (`dictivo_lang` cookie) → the visitor's country → English.
  Countries map to languages in `lib/locale-routing/countries.mjs`; countries outside the site
  languages, and pages without that translation, stay English. Multilingual countries (CH, BE, LU,
  CA with Quebec, CM, PR, SG) use the browser's language among their own languages.
- **EU/EEA visitors outside Germany are asked, not redirected.** The Geo-blocking Regulation
  (EU) 2018/302 Art. 3 forbids location-based redirects without explicit consent; Germany is a purely
  internal situation for this German business. Those visitors get a prompt in their language
  (`lib/locale-routing/suggestion.mjs`); accepting or staying in English saves the choice.
- **Remembering a choice:** language-menu links, homepage language pills and the prompt carry
  `?lang=<code>`. The middleware sets `dictivo_lang` (HttpOnly, SameSite=Lax, one year, language code
  only) and redirects to the clean URL. The Privacy Policy's "Website language" section discloses this.
- **Route map:** `generate-site.mjs` reads the hreflang tags of the finished pages and writes
  `lib/locale-routing/generated/routes.json` (bundled into the Function, gitignored) and
  `dist/_routes.json`. `_routes.json` only sends localized page paths to the Function, so
  `/checkout/*`, `/download/*`, `/downloads/*` and `/assets/*` keep their `_redirects` and headers and
  cost no Function requests (the free plan allows 100,000 per day).
- **Live checks:** `node scripts/check-locale-routing-live.mjs https://dictivo.app` runs after every
  deploy. On a preview deployment add `--country-override`: the middleware honors
  `x-dictivo-test-country` / `x-dictivo-test-region` only on `*.dictivo-app.pages.dev` and localhost,
  which lets the full country matrix run from one place.

To change a country's language, edit `COUNTRIES_BY_LOCALE` or `MULTILINGUAL_COUNTRIES` and run
`npm test`; the exhaustive test walks every English page against every country.

## Traditional Chinese (`/zh-hant/`)

Taiwan, Hong Kong and Macau get Traditional Chinese pages. They are not translated separately:
`generate-site.mjs` converts every `zh` copy entry with OpenCC (`cn → twp`, Taiwan standard with
software terms) through `scripts/lib/hant.mjs`. Edit the Simplified `zh` copy and both pages update.
When a conversion reads wrong in context, add a `[pattern, replacement]` pair to `HANT_FIXES` with a
test in `tests/structure/hant.test.mjs`; `tests/structure/zh-hant-output.test.mjs` fails if any Simplified character is
left on a zh-hant page. The film uses a converted `captions.zh-Hant.vtt` generated at build time.

## Local checkout

The Dictivo Local pricing CTA points to `/checkout/local`, so the Lemon Squeezy one-time checkout URL can be swapped
without changing page markup.

`_redirects` sends `/checkout/local` to the configured Lemon Squeezy Local checkout URL.

Check the current route before deploy. The script accepts either the local pending placeholder or a valid Lemon
Squeezy checkout URL:

```sh
node scripts/check-local-checkout.mjs
```

After replacing the redirect with a Lemon Squeezy URL, verify the exact target:

```sh
EXPECT_LOCAL_CHECKOUT_URL=https://dictivo.lemonsqueezy.com/checkout/buy/... node scripts/check-local-checkout.mjs
```

To replace the route safely:

```sh
node scripts/set-local-checkout.mjs https://dictivo.lemonsqueezy.com/checkout/buy/...
```

To return to the pending placeholder if needed:

```sh
node scripts/set-local-checkout.mjs --pending
```

## Cloud Fast checkout

Cloud Fast now lives inside the main homepage at `/#cloud-fast` and in the pricing section. Its CTAs point to
`/checkout/cloud-fast`, so the Lemon Squeezy checkout URL can be swapped without changing page markup.

`_redirects` sends `/checkout/cloud-fast` to the configured Lemon Squeezy checkout URL.

Check the current route before deploy. The script accepts either the local pending placeholder or a valid Lemon
Squeezy checkout URL:

```sh
node scripts/check-cloud-fast-checkout.mjs
```

After replacing the redirect with a Lemon Squeezy URL, verify the exact target:

```sh
EXPECT_CLOUD_FAST_CHECKOUT_URL=https://dictivo.lemonsqueezy.com/checkout/buy/... node scripts/check-cloud-fast-checkout.mjs
```

To replace the route safely:

```sh
node scripts/set-cloud-fast-checkout.mjs https://dictivo.lemonsqueezy.com/checkout/buy/...
```

To return to the pending placeholder if needed:

```sh
node scripts/set-cloud-fast-checkout.mjs --pending
```

## Manual release checklist

1. Build the release artifacts from the desktop workflow.
2. Sign and notarize the macOS DMG.
3. Push the desktop tag. The desktop workflow uploads release artifacts and `latest.json` to R2.
4. Confirm the desktop workflow's final `repository_dispatch` sent the complete release payload to this site repo.
5. If the dispatch token is missing, run the site deploy workflow manually after updating `data/release.json`.
6. Verify the public URLs under `https://dictivo.app/download/*`.
7. Verify `https://downloads.dictivo.app/latest.json` includes macOS and `windows-x86_64` so existing Windows testers can update.

## References

- Cloudflare Pages direct upload limits: https://developers.cloudflare.com/pages/get-started/direct-upload/
- Cloudflare Pages redirects: https://developers.cloudflare.com/pages/configuration/redirects/
- Cloudflare R2 public buckets and custom domains: https://developers.cloudflare.com/r2/buckets/public-buckets/

## Product film

`data/product-film.mjs` is the metadata and localization source for the 68-second
film on all eleven homepages and `/demo/`. The files live in `assets/film-v09/`. The watch page
includes native playback, English captions, Chinese subtitles, chapter URLs (`/demo/?t=10`), the
two spoken lines, clear Local/Cloud audio boundaries, and the edit and shortcut disclosures. Its
download sizes are read from the files at build time.
Homepage playback uses a static video `src` with `preload="none"`; JavaScript
enhances the poster button, while a native player remains usable without it.
The 4K file is a download option, not the default player source.

The app scenes are real screen recordings of Dictivo 0.3.57; the dictated voice, the music and the
sound effects are AI-generated. The film is edited (shortened pauses and waits), so it does not
replace the continuous native-app evidence at `/media-kit/#native-example-title`; keep that link.
Every homepage caption and `/demo/` say that the voice and music are generated and link
`CREDITS.txt`.

A new film goes into a new folder (`film-v10/`, …). Add the old public paths to
`RETIRED_FILM_URLS` in `data/product-film.mjs`; the build writes a 301 for each to `_redirects`
(`/assets/film-v08/*` now 301s to `film-v09`).

Run `node scripts/check-product-film.mjs` after generation. Test chapter links
with a preview server that supports HTTP byte ranges. Plain Python http.server and
`wrangler pages dev` do not: both answer a Range request with 200. Production must return 206
to valid video Range requests.
