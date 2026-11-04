# Site history

Dated change notes, newest first. README.md held them until 2026-11-03.
A note records what changed on its date. README.md describes current behavior.




## Orphan assets removed — 2026-11-04

Fifteen files that no page referenced are deleted: `dictivo-cinematic-demo.mp4` (13.4 MB) and
its `.vtt`, `dictivo-demo-local-poster.jpg`, and the 11 screenshots in `assets/ui/` (1.8 MB). The
Cloudflare GraphQL Analytics API showed 0 requests to any of them from 2026-10-28 to 2026-11-04
(the free plan keeps about 7 days and hides referers). In case an old embed still points at the
film, `/assets/dictivo-cinematic-demo.mp4` now 301s to the current film. The `/assets/ui/*`
cache rule is gone with the folder. `dictivo-demo-poster.jpg` stays: `security.html` uses it as
its social image.
## Kickers and eyebrows removed — 2026-11-04

Every page lost the small label above its h1 (`doc-eyebrow`, 176 pages) and the labels above
section headings (`doc-meta` kickers, 852 lines; homepage `section-kicker`, 7 templates). They
repeated the heading below them. Kept: "Last updated" dates, the benchmark's measured date, and
two labels that name a control (practice samples, table of contents). "Last updated" stays above
each guide: it is a freshness signal that AI answer engines read. The 256 copy fields that only
fed these labels are deleted; `hubEyebrow` stays because the compare hub breadcrumb uses it.
The Mac advisor's embedded JSON lost two unread keys (`sectionKicker`, `pageEyebrow`). Skip
links already land on each page's `<main>` id and were not changed.
## Dead CSS removed — 2026-11-04

`site.css` went from 4,108 to 3,274 lines. 61 classes that no built page and no script used
(the old cinematic hero, the Cloud Fast landing section, product tabs, release strip and others)
lost their 102 rules; 15 selector lists lost their dead members. Proof: every removed selector
contains one of those classes, none was added, and computed styles of every element matched
before and after on 12 pages at 1280 px and 375 px. `tests/structure/css-classes.test.mjs` now
fails when site.css styles a class nothing uses. `tier-price-was` (introductory offer) and the
`locale-suggestion` classes (injected by the Function) are allowed by name.
## Source handoff panel kept and themed — 2026-11-04

The 2026-11-03 review suggested deleting the panel that appears after a download click (G11).
It stays: the desktop app reads its `dictivo://source?channel=` link for consent-based channel
attribution (033 commit `4362b20`). The panel now takes its colors from `site.css`
(`.source-handoff`) instead of an inline white box, and it is a `role="status"` region that is
filled on the next frame, so screen readers announce it. It still has English, Chinese and
Japanese text only; other languages see English. The dormant introductory-offer code (G10) also
stays: it is tested price-rollover logic, it changes nothing a visitor sees, and a holiday
promotion may need it.

## Header, hero and FAQ chrome — 2026-11-04

Second chrome batch from the 2026-11-03 review. **Hero:** the second action group under the film
(offer line, "See pricing" button, "Mac and Windows x64 are available now") is gone; the price is
in the pricing section and both download buttons sit above the film. The three hero steps keep
their text and lose their numbers. **Header:** the nav keeps Pricing and the Mac guide. The
homepage anchors Privacy and Downloads are gone; the header download button already goes to
`#downloads`. No "Compare" item was added, because that needs new strings in 10 languages. The
language menu drops the visible "Language" label (the summary keeps its aria-label) and the
English name under each language. **FAQ:** the 01–09 numbers are gone on every page; questions
and answers use the full width.

## Homepage chrome trim — 2026-11-03

The site review (2026-11-03) found the homepage said the same things many times. This batch cut
chrome only; indexed sections (FAQ, compare cards, language list) wait for a Bing baseline.
**Cloud Fast:** the separate Cloud Fast section and its header nav item are gone. The Cloud Fast
column of the privacy section now carries `id="cloud-fast"`, so old links still land.
**Hero:** the eyebrow and the film slogan are gone. The caption keeps the `/demo/` link and the
CC BY 4.0 credit. The Windows install help link in the hero starts `hidden`; `site.js` shows it
only to Windows visitors. The footer keeps a short link for everyone else.
**Footer:** the tagline and beta line are gone. Links sit in three columns (product, privacy and
company, guides); on phones the guides column spans the full width below the other two.
`tests/structure/home-layout.test.mjs` checks these.

## Cache headers, homepage film and phone menu — 2026-10-10

A cold email from a site scanner (Can We Launch, 2026-10-10) named three problems; all three were
real. **Cache:** Cloudflare Pages applies every matching `_headers` rule in file order and joins a
header set twice with a comma, so fonts, `/assets/ui/` and the favicon were sent
`max-age=31536000, immutable, public, max-age=300, must-revalidate`, and the fingerprinted
`site.<hash>.css` / `.js` only got the 300 s of `/assets/*`. The long-lived rules now come after
`/assets/*` and detach its value with `! Cache-Control`; two placeholder rules
(`/assets/site.:hash.css`, `.js`) cover the fingerprinted files. `tests/structure/cache-headers.test.mjs`
checks the order and runs `inject-asset-version.mjs` on a copy for the real file names. The zone's
Browser Cache TTL (it raised every lower `max-age` to 4 hours) is set to respect existing headers.

**Homepage film:** the hidden `<video>` downloaded its `poster.jpg` (74 KB) and captions on every
visit. The player now waits in a `<template>`; the poster button clones it into place and calls
`play()` in the same click, and `<noscript>` keeps the native player, which `check-product-film.mjs`
now checks. Lighthouse 13.5.0 mobile on a local `wrangler pages dev` build: LCP 2.26 s before,
1.66–1.81 s after (live before: 2.5–2.7 s).

**Phone menu:** at 880 px and below `.nav-links` were hidden with nothing to open them. Every header
(`renderHeader()` and `security.html`) now has a menu button, hidden until `site.js` wires it up:
`aria-controls`, `aria-expanded`, a label in all 11 languages (`nav.menu`), a panel with 44 px rows,
and closing on Escape, outside click, a chosen link or the language menu. With four controls in the
header, French overflows first, so the wordmark yields at 440 px and below and the language name
becomes a globe below 375 px (measured for every locale from 320 to 880 px).

Validation: 281 tests and seven deploy check scripts, with `release.json` as committed and set to
0.3.54; `check-checkout-live` was not run. A `dist/` diff against main changes only the 185 page
headers, the 11 homepage films, `site.css`, `site.js` and `_headers`.

## Best dictation software guide (Mac, Windows, free) — 2026-10-10

`/guides/best-dictation-software/` (English only) groups dictation software for Mac and Windows by
need: free, fully local, Windows, Mac, several languages, buy once, phone and computer, recordings
and meetings, then a short note per product. It covers thirteen products: the macOS, Windows 11,
Google Docs and Word built-ins, Dragon Professional, Handy, MacWhisper, Spokenly, Superwhisper,
Voibe, VoiceInk, Wispr Flow and Dictivo. Every statement about another product was read on its
vendor's own page on 2026-10-10 and is linked with that date; built-in tools are described as built
in, not free, because their vendors state no price. It is the cross-platform counterpart of
`/guides/best-speech-to-text-apps-for-mac/`, which stays the Mac-only comparison; the two link to
each other.

The lede says the guide is written by Dictivo before any product is named. Dictivo is listed last,
appears only in the groups it fits and states its limits in the others (no mobile app, no
recorded-file import). Its price is `guideLocalPrice("en", offer)` in three places, so the dated
clause drops at the 1 November rollover, and the sitemap date follows `PRICING_LASTMOD`. The title
carries the year of `BEST_DICTATION_SOFTWARE_CHECKED`, so it changes only when every price is
re-read (first 2027 re-check: 4 January). Prices it shares with the comparison pages and the Mac
offline guide are tested to match them. Structured data is TechArticle and BreadcrumbList only.

`renderDictationGuidePage()` sections now take `bullets` and per-product `entries`, and
`renderGuideTrial()` takes `platform: "both"` (Mac and, while public, Windows downloads); existing
pages render byte for byte as before. Inbound links: the Mac speech-to-text list and the Windows
offline guide (related pages), the English Mac offline guide's Dictivo section, a line under the
English comparison hub's introduction (English only), and `llms.txt`; those four pages are re-dated
2026-10-10. Validation: 263 tests and seven deploy check scripts, today and in a copy with the
rollover applied; `check-checkout-live` was not run because it requests the production checkout.
Spec: `docs/research/2026-10-08-ahrefs-audit/09-pages-batch4-best-of-spec.zh-CN.md` in the desktop
repository; monthly price re-check in `price-watch.md` there. Not deployed or measured.

## Dragon and Wispr Flow pricing facts and a Windows voice typing guide — 2026-10-09

Three English pages render through `renderDictationGuidePage()`, which now takes a trial-panel
`platform`, a table inside a section and a guide without a Dictivo section; the existing guides render
byte for byte as before.

`/guides/dragon-pricing/` and `/guides/wispr-flow-pricing/` state another vendor's prices only as
that vendor publishes them, read on 2026-10-09 and linked under References with the check date:
Nuance's product pages and support articles, the Dragon Medical One listing on Microsoft Marketplace
and Microsoft Learn for Dragon; wisprflow.ai, its help center and its terms for Wispr Flow. Nuance's
Dragon Professional page no longer shows a price, so the Dragon page says so and quotes none. Where
Wispr's own pages disagree (student pricing, tax) both statements appear. Competitor figures are
plain text, never `US$`, and carry no Offer schema. Dictivo appears only in a closing section labelled
as this site's product (the Dragon page adds that Dictivo is not a clinical documentation product);
its one price sentence is `guideLocalPrice("en", offer)`, so it drops the dated clause when the
2026-11-01 runbook clears the offer, which each page's test checks against the post-rollover offer.
Their sitemap dates follow `PRICING_LASTMOD` as well. Prices change: the monthly re-check list is
`docs/research/2026-10-08-ahrefs-audit/price-watch.md` in the desktop repository.

`/guides/windows-voice-typing-not-working/` lists what to check for each Win+H symptom from
Microsoft's support and Learn documents, plus whether Windows 11 dictation works offline (voice
typing no; voice access yes, after a one-time language download). It quotes no Dictivo price; its
Dictivo section and Windows trial panel render only while Windows downloads are public.

Inbound links: the English Wispr Flow comparison (its English figures re-checked the same day, so its
English date moved to 2026-10-09), the English Dragon comparison, the Windows offline guide's Voice
Access section and related pages, the English footer (Windows guide only) and `llms.txt`.

**Dragon Professional's price, one wording.** Nuance's Dragon Professional pages (eight country
editions) show no price on 2026-10-09, only a sales contact, and the old store addresses redirect to
them. The last archived store page with a price is the Wayback Machine capture of 11 February 2025
($699, one-time payment); on 24 February 2025 the store said purchases were on hold. The site had said
"$699.99" as a current price on the Dragon comparison (English title and all eleven languages), the
Windows offline guide, the English homepage teaser, the comparison hub and `llms.txt`.
`data/dragon-price-status.mjs` now holds one statement (no public price, sales contact only, checked
on 9 October 2026; last public list price $699, a one-time payment, archived 11 February 2025), used
verbatim in English and translated in the ten other languages' pricing fact; the archived page is a
cited source. The English title is now "Dragon Alternative: Local, Train-Free Dictation Bought Once",
the "about 1/24 of the Dragon Professional license" line is gone, the comparison is re-dated
2026-10-09 in every language and the English hub's sitemap date follows. `tests/facts/dragon-price-status.test.mjs`
fails on any "699.99" in the built site and on any "$699" without its archive date.

The new pricing tests use `INTRO_OFFER` / `REGULAR_OFFER` from `tests/helpers/offer-states.mjs`.
Validation: 235 tests and the eight deploy check scripts, today and in a copy with runbook steps A.1
and A.2 applied (offer dates cleared, `PRICING_LASTMOD` 2026-11-01). Not deployed or measured.

## Tests pass on both sides of the 1 November price change — 2026-10-09

A rehearsal of the 2026-11-01 runbook (US$29 → US$49) cleared the offer dates and failed 25
tests in 10 files: they had the introductory state written into their assertions. They now pass
unchanged in both states, so on 1 November no test needs editing (runbook steps A.4 and A.6). Tests
of the offer functions pass one of two fixtures, `INTRO_OFFER` or `REGULAR_OFFER` from
`tests/helpers/offer-states.mjs`, instead of reading `LOCAL_OFFER`; tests of the built site branch
on `introOfferActive()` and check each state for real: two dated Offers or one undated Offer, three
price spans in the guide tables or two, the dated or the undated llms.txt line. Two tests are new.
One checks that `LOCAL_OFFER` is one of the two states, not a half-applied rollover, and after the
rollover that `PRICING_LASTMOD` was moved to 2026-11-01. The other, once the dates are cleared, fails
on any page or llms.txt that still shows the introductory figure, 31 October in any homepage
language, a card's "introductory price" label or the price-change section; before then it checks
that each of those phrases is really on the site, so the list cannot go stale unnoticed.

The sitemap gap the rehearsal found is fixed now rather than on the day: the offline Mac guide in
the five languages with a price column, `/guides/best-speech-to-text-apps-for-mac/` and `/terms/`
report at least `PRICING_LASTMOD`, like the other priced pages, so the deploy's IndexNow step
resubmits them after the price change. `PRICING_LASTMOD` (2026-09-16) is older than all seven, so
today's sitemap is byte-identical. `introPriceExpired()` takes the offer as an optional second
argument; `check-public-output.mjs` still calls it bare and still fails the daily deploy after
31 October until the dates are cleared.

Validation: 207 tests and the eight deploy check scripts, in the current state and in a copy with
runbook steps A.1, A.2 and A.5 applied.

## Homepage poster preload and eager result screenshot — 2026-10-09

squirrelscan's `perf/lcp-hints` found the homepage hero poster without a preload (all eleven
homepages). Measured in headless Chrome on 2026-10-09, the poster `<img>` is the largest contentful
paint at 768, 1440 and 1440@2x, and on a 390px phone for the Chinese homepages; on English and
Japanese phones the headline is. Each homepage head now has
`<link rel="preload" as="image" imagesrcset imagesizes fetchpriority="high">` built from the same
`HERO_POSTER` strings as the `<img>`, so the browser picks one candidate and fetches it once (the
request shows the link as its initiator). There is no `media` limit: the `<img>` already loads
eagerly at high priority on phones. `inject-asset-version.mjs` rewrites only `site.css` and
`site.js`, so the preload and the `<img>` keep matching URLs after deployment;
`tests/structure/lcp-preload.test.mjs` runs that script on a copy of the homepages to prove it.
`perf/lazy-above-fold`: the Local result screenshot near the top of `/media-kit/` and the English and
Japanese first-dictation guides is no longer `loading="lazy"`; the site has no lazy images left.
Unchanged: on a 1x desktop the `<img>` picks `poster-800.webp` while the `<video>` poster
attribute still fetches `poster.jpg`.

## Article structured data names its image, author and publisher — 2026-10-09

squirrelscan's `schema/json-ld-valid` (2026-10-08 audit, about 30 URLs) reported the guides'
TechArticle nodes without `image`, `author.name`, `publisher.name` and `publisher.logo`. Fourteen of
the seventeen had no image; the rest were `{ "@id": ".../#org" }` references the validator does not
follow. `articleSchemaFields()` now gives every TechArticle the page's og:image (the same
`DEFAULT_SOCIAL_IMAGE` that `socialMeta()` uses) and repeats the Organization in place: same `@id`,
`name`, and for the publisher the logo. The author stays the Organization; no person is named. The
Organization's own `logo` is now the same ImageObject (`/assets/favicon.svg`, still the only brand
image). WebPage and SoftwareApplication nodes keep the bare `@id` reference.
`tests/structure/article-schema.test.mjs` parses every JSON-LD block on every page and checks each Article.

## Windows visitors see the Windows download first — 2026-10-09

The homepage hero rendered "Download for Mac" as the solid button for every visitor; a Windows
visitor got Windows only as the outline button beside it (Windows VM test, 2026-10-09). `assets/site.js`
now reads the platform once with `preferredDownloadPlatform(navigator)`: Windows when client hints,
`navigator.platform` or the user agent names Windows, never for phones or consoles. On a Windows
browser `promoteWindowsDownloads()` swaps each `[data-platform-downloads]` pair: the Windows link
the page already renders moves first and takes the solid style, so its href, label,
`data-platform="windows"` and `data-download-content` travel with it. The same function drives the
download card's `data-recommended`. Pairs are marked on the eleven homepage heroes, both comparison
download groups, the first-dictation guide and `/demo/`. Mac, Linux, unknown browsers and pages
without JavaScript keep the Mac link first; while Windows downloads are off the pages render no
Windows link, so nothing moves. After this ships, `hero_top_windows` counts clicks on a solid
button for Windows browsers, so compare it with earlier weeks only with that change in mind.
`tests/structure/windows-download-promotion.test.mjs` covers detection, the swap, click attribution and the
static order.

## Pricing page and two Mac dictation guides — 2026-10-09

`/pricing/` is now an English page instead of a 302 to `/#pricing`: a short answer, the homepage
plan cards, a side-by-side table, license, free-tier, Cloud Fast, price-change and refund sections,
and a visible FAQ. Every sentence that names the Local price or an offer date comes from
`pricingPageAnswer()`, `pricingPlanPrice()`, `pricingPriceChangeSection()` and `pricingFaqs()` in
`data/local-offer-copy.mjs`; `data/pricing-page.mjs` holds only undated copy. When the 2026-11-01
runbook clears the offer dates, the page states the regular price once, and the price-change section
and question disappear (`tests/facts/offer-rollover.test.mjs`). The page repeats the homepage's
SoftwareApplication node (`softwareApplicationSchema()`); homepage and comparison JSON-LD did not change.
English navigation, footers, guide trial panels, comparison CTAs, the comparison hub,
first-dictation next steps, the film page and `llms.txt` link `/pricing/` through `pricingHref()`;
other languages keep `/<locale>/#pricing` until `PRICING_PAGE_COPY` has their copy, and the homepage
hero button stays an in-page anchor. Without a `_redirects` rule, Pages answers `/pricing` with its own
308 to `/pricing/`; `/download` still redirects to `/#downloads`.

Two English guides follow Apple's English Mac help (read 2026-10-09, dated in each reference):
`/guides/mac-dictation-not-working/`, paired with the Japanese guide through hreflang, language
menus and the routing map, and `/guides/mac-dictation-shortcut/`. Neither claims an on-device test;
Dictivo appears only in a closing section labelled as this site's product, with its Windows
shortcut named only while Windows downloads are public. Their TechArticles carry the brand image and
no FAQPage. The speech-to-text guide's related pages and the English macOS Dictation comparison now
link the troubleshooting guide, so both are redated.

New pages are held to title and description limits by `tests/structure/page-metadata.test.mjs`. They render
with `doc-page` only, so their tables fit the desktop column. The hand-maintained `security.html`
links `/pricing/` too. Validation: 189 tests and the eight
deploy check scripts. These pages have not been deployed or measured; they do not establish a
ranking, traffic or conversion change.

## Pricing and checkout copy — 2026-10-09

Nine homepage languages ended the pricing introduction with "before you subscribe"
(`bevor Sie abonnieren`, `購読できます` …), though Local is bought once; they now say
"before you buy". Every language now closes that introduction with the comparison English
already had: subscription dictation apps cost $85-$180 a year, Dictivo Local is paid once.
`pricingAnchor()` in `data/local-offer-copy.mjs` writes it from `LOCAL_OFFER`, so when the
2026-11-01 runbook clears the offer dates it names the regular price alone; the English
pricing body needs no manual edit then. The checkout note names the license key from the
purchase email, as the app does, instead of a "license email", and repeats the 14-day refund
in every language. Only the eleven homepages are redated (`HOME_SHARED_CONTENT_LASTMOD`).

`/pricing`, `/pricing/`, `/download` and `/download/` returned 404; they now redirect (302)
to `/#pricing` and `/#downloads`, like `/cloud-fast`. (Later the same day `/pricing/` became a page;
see above.) Prefixed paths such as `/de/pricing`
are not redirected: the site has no localized redirects, and those paths run through the
locale Function. A visitor sent on from `/#pricing` to a translated homepage keeps the fragment.

Validation: 154 tests and the eight deploy check scripts. These are copy and routing fixes;
they do not establish a conversion change.

## Directory checkout attribution — 2026-10-05

SaaSHub and TrustMRR referrer hosts now map to the existing `directory` billing channel.
Website events retain the exact referrer host; checkout receives only the registered channel
label, with existing checkout parameters preserved. This closes a channel handoff gap without
adding browser identifiers, changing page content dates, or reconstructing historical orders.
The attribution check covers internal navigation, all three checkout routes and lookalike domains.

## SEO/AEO content maintenance — 2026-10-04

The German MacWhisper comparison now leads with the live-dictation versus file-transcription
decision and names both desktop platforms in its title and opening. The Windows offline guide
describes Voice Access dictation mode and its hardware-specific Fluid dictation support with a
Microsoft source. Other comparison locales and the September 29 English Mac guide are unchanged.

Homepage sitemap dates now include `HOME_SHARED_CONTENT_LASTMOD`, recording the September 29
contextual guide links independently of release and hero-copy dates. Global and locale copy dates
both participate in the maximum. Comparison hubs also include dates of page-specific localized
title/description overrides that they embed. Keep these dates tied to actual content edits.

The release manifest is synchronized to v0.3.52, already in production. Validation: 148 tests,
public-output, attribution, checkout, release-payload, asset and product-film checks. Publication
and search-engine processing must be verified separately; these edits do not establish a traffic
or conversion increase.

## Deployment status — 2026-09-17

Production runs `main`. The eleven-locale site (Traditional Chinese added 2026-09-14) serves 157
sitemap pages. The explicit `google_ads` checkout attribution and its paired API change were
deployed on 2026-09-16; that does not imply an ad campaign is running. Flat tax-inclusive pricing
went live the same day (see below).

This repository is the static website for `dictivo.app`. It is intentionally separate from the Dictivo desktop app
repository. The current positioning is **private dictation first**: Local mode is the default product, while Cloud
Fast is an optional speed mode for users who accept cloud transcription upload.

Current public pricing copy (all prices are tax-inclusive totals in US dollars; the checkout deducts the buyer's tax from the total):

- Dictivo Local: `US$49` one-time from 2026-11-01 (`data/local-offer.mjs`), perpetual for the version bought, 12 months of updates, use on up to 3 personal devices, optional `US$24/year` renewal for future updates. Introductory dates are cleared; the website, API offer and Lemon Squeezy product must stay aligned.
- Dictivo Cloud Fast: `US$8.99/month` (`CLOUD_FAST_MONTHLY_PRICE` in `data/local-offer.mjs`), 1,500 minutes/month, standalone or alongside Local.
- Copy writes prices as `{{price.<amount>.<form>}}` placeholders, never as figures; `data/price-display.mjs` renders them
  per page language with a "tax included" note (`inkl. MwSt.`, `税込`, …). Titles, meta descriptions and `llms.txt` carry
  no price; the build refuses a placeholder there.

## SEO iteration — 2026-09-18

Chinese (including Traditional), Korean and Portuguese homepage metadata and introductory
copy now describe voice input / voice-to-text in local terminology. This is an intent-alignment
experiment, not evidence of higher keyword volume. The existing Mac shortlist guide now links
readers directly to first-use practice and explains a repeatable trial, including the boundary
between local audio processing and pasting text into an online service. Its existing section
anchors remain stable. Homepage sitemap dates advance only for the four changed locales via
`HOME_CONVERSION_LOCALE_LASTMOD`; pricing and release dates remain independent.

Validation: 70 existing tests; public-output, attribution, film, checkout-route/live-checkout,
release-payload and asset checks. Computer Use verified the new practice link, all four changed
homepages at 390px, and the guide at 390px and 1440px. No ranking or revenue lift is claimed.

## SEO comparison follow-up — 2026-09-18

The English Superwhisper and MacWhisper comparisons now distinguish free access from paid
plans, local speech recognition from later text processing, and hotkey dictation from file
transcription. Each includes a practical switching checklist without claiming an accuracy win.
Superwhisper platform facts include Android in all eleven locales. Other localized decision
copy is unchanged. Comparison dates are scoped by page and locale; unrelated pages are not
marked freshly reviewed. The checked-in release manifest is synchronized to public v0.3.48.

Validation: 71 tests, the normal public-output and release checks, live checkout rendering,
22 localized comparison HTML checks, and Computer Use at 390px and 1440px. The English FAQ
and first-dictation navigation were exercised. This is website QA, not a native-app accuracy
benchmark or evidence of a traffic increase. The desktop repo's September 18 batch-2 audit
records deployment verification, keyword data limits and external directory follow-up.

## IndexNow ownership recovery — 2026-09-20

`scripts/submit-indexnow.mjs` uses the official Yandex participant endpoint. The existing
public key verified there with HTTP 200 on September 20; Bing's direct endpoint still
returned ownership-validation 403 at the time (fixed on October 3, below). No key rotation
or Cloudflare security change was needed.
[IndexNow participants share submissions](https://www.indexnow.org/faq), so the script sends
one request to one endpoint. This is not confirmation of Bing processing or search indexing.

The script checks the public key file before submitting and records the provider, URL count
and HTTP status in the Actions summary. HTTP 202 means verification is pending; rejection
fails the workflow. Submission runs after deployment, so a failed notification does not mean
the production site was rolled back. Every deploy submitted the full sitemap until October 3.

## IndexNow changed URLs only — 2026-10-03

Bing's direct endpoint accepts the current key again: Microsoft support closed ticket
UCM000007493994 as fixed, and one direct POST on October 3 returned HTTP 200. Production
stays on the Yandex participant endpoint, which has worked since September 20 and shares
submissions with Bing. The first key file (`c5df5e…`, July 8) is no longer published.

Each deploy now sends only the sitemap URLs it adds, re-dates or removes, as the
[IndexNow protocol](https://www.indexnow.org/documentation) asks. The workflow saves the live
`sitemap.xml` just before deploying; afterwards `scripts/submit-indexnow.mjs` compares each
URL's `<lastmod>` with that copy (`INDEXNOW_PREVIOUS_SITEMAP`). A run with no change, such as
the daily 03:17 UTC run, sends nothing and says "IndexNow submitted no URLs" in the Actions
summary. Limits of this rule:

- A page whose content changes without a new sitemap date is not sent. Search engines read
  the same date, so it has to move with the content anyway.
- Two changes to one page on the same day share a date, so only the first is sent.
- If the live sitemap cannot be read, every URL is sent.
- If submission fails after a successful deploy, the next run does not retry those URLs.
  To resend, run `node scripts/generate-site.mjs && node scripts/submit-indexnow.mjs`
  locally; without `INDEXNOW_PREVIOUS_SITEMAP` it sends every URL.
