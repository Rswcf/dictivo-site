# Site history

Dated change notes, newest first. README.md held them until 2026-11-03.
A note records what changed on its date. README.md describes current behavior.



## Homepage notes trim — 2026-11-12

The homepage should sell, not explain. These notes left all eleven homepages (`zh-hant` follows
`zh`):

- The film caption under the hero film: the "Film, transcript & credits" link to `/demo/` and the
  "Real screen recordings · AI-generated voice and music" link to `CREDITS.txt`. No homepage links
  `/demo/` now; `/media-kit/`, the sitemap and each `llms.txt` still do. `FILM_COPY[*].credit` is
  gone except in English, which the `/demo/` caption uses. `FILM_COPY[*].link` stays: it names
  `/demo/` in each `llms.txt`.
- The hero link "Try your first sentence →". The guides and the footer keep their links to the
  first-dictation guide.
- The privacy introduction (`privacy.body`) and both column ledes (`privacy.localLead`,
  `privacy.cloudLead`; the `.trust-column-lede` rule went with them).
- Local column bullets "Tiny stays free forever" and "14-day full Local trial unlocks every local
  model"; Cloud Fast column bullets "Designed for low-sensitivity recordings" and "Local remains
  available whenever privacy matters more". Each column keeps three bullets.
- The Cloud Fast tier bullet "One simple Cloud Fast switch in the app". `/pricing/` reuses
  `HOME_COPY.en.pricing.tiers`, so its Cloud Fast card lost the same bullet. `PRICING_PAGE_LASTMOD`
  2026-11-12.
- The pricing footnote "Mac and Windows x64 are available now." (`pricing.footnote`). The compare
  hub footnote is now the only one.
- The downloads introduction (`downloads.body`), the second sentence of the Mac card ("Start with
  Tiny free forever and a 14-day full Local trial.") and the Windows card text
  (`WINDOWS_DOWNLOAD_COPY[*].body`, used nowhere else).

Without its text, the Windows card title touched the first button (0px, Chromium 1440px), so
`.download-actions` gained `padding-top: 16px`, the margin the text had. Checked in the built-in
browser at 1440px and 375px only: privacy columns and download cards.

`/demo/` keeps the film disclosure unchanged: its caption, the credit line and the `CREDITS.txt`
link. AGENTS.md now asks for the disclosure on `/demo/` only. The `.hero-film` height cap keeps
`100svh - 140px`, although the 1080px note below gives the caption as the reason for the 140px.
`.hero-film figcaption` stays: it styles the `/demo/` caption. `check-public-output.mjs` keeps its
Windows launch patterns; the footnote patterns in it now match no homepage.
`HOME_SHARED_CONTENT_LASTMOD` 2026-11-12; the homepage sitemap dates do not move, because
`PRODUCT_FILM.lastmod` is already 2026-11-12.

## Homepage film 1080px wide — 2026-11-12

The homepage film was at most 720px wide, so the dictated text in it was about 9-10px on a wide
window. `.hero-film` is now as wide as the headline column, at most 1080px, and never taller than
the window: the width is capped at `(100svh - 140px) * 16 / 9`, at least 480px. The 140px leave
room for the caption; the header is `position: absolute`, so it takes none. The film may now run
below the first screen. The play label sticks 20px above the window's bottom edge while the poster
runs below it, and returns to 20px above the poster's bottom once the poster is in view. CSS only:
the poster button is a one-cell grid, the label is `position: sticky`, and `.hero` and the poster
use `overflow: clip` (browsers without it keep `hidden` and the label stays at the poster's bottom).
New poster candidate `assets/film-v09/poster-2160.webp` (2160 x 1215, 44,302 bytes,
`PRODUCT_FILM.posterLarge`): film frame 523 rendered at 3840 x 2160 and scaled the same way as
`poster.jpg`, which the same render reproduces byte for byte; the From-row mask check passed.
`HERO_POSTER.sizes` follows the new width. A 2x desktop now loads `poster-2160.webp`, a 1x desktop
and a 2x 768px tablet `poster.jpg` (they loaded `poster-800.webp` before). Phones keep the same
film size. Measured in Chromium only (built-in browser and Playwright Chromium); not checked in
Safari or Firefox. LCP was not measured again. No `*_LASTMOD` change: the copy did not change.
While the language prompt (`.locale-suggestion`) is open, the label stops 134px above the window's
bottom edge (181px below 768px), at least 12px above the tallest prompt measured in Chromium; on
short phone screens it can still sit under the prompt, at the poster's top.
When the window cuts the player, pressing play now also centres it in the window (`initHeroFilm`,
after `play()`; smooth through html's `scroll-behavior`, instant for reduced motion).

## 68-second film replaces the 35-second film — 2026-11-12

All eleven homepages and `/demo/` play the new 68-second film (cut v2.4) from `assets/film-v09/`:
1080p 6.9 MB, 4K 19.5 MB, posters, English and Chinese captions and `CREDITS.txt`, copied from the
033 film package with matching md5 sums. The app scenes are real screen recordings of Dictivo
0.3.57 on macOS (Mail, Notes, the main window, the Companion); the dictated voice, the music and the
sound effects are ElevenLabs-generated. The film has no human recording, so the CSTR VCTK /
CC BY 4.0 credit left the homepage caption (`FILM_COPY.credit`, all languages), `/demo/`, the media
kit film section and AGENTS.md. `assets/film-v08/` is deleted, `VCTK-license.txt` with it: no built
page linked its public URL (the benchmark evidence ZIP carries its own copy, and the benchmark
method guide keeps its own VCTK credit). The build writes a 301 from each of the eight old film
URLs to its film-v09 file (`RETIRED_FILM_URLS`). `/demo/` has the new chapters, the two spoken
lines, the edit facts (no speed change, pauses shortened, waits shown at most 0.5 s with the real
values, sender address hidden, Companion placed onto Mail, Notes scenes without the voice) and the
shortcut note (titles name no key; the keycap shows Cmd+Shift+Space; the recordings show ⌘P). Its
download sizes come from the files. `check-product-film.mjs` reads the duration from the data and
fails when a homepage, `/demo/` or the media kit film section names film-v08, VCTK or CC BY.
`PRODUCT_FILM.lastmod` and `MEDIA_KIT_LASTMOD` 2026-11-12; `tests/facts/media-kit-price.test.mjs`
pins the new media kit date. `uploadedAt` is the PR date; set it to the first production deploy
time if that falls on a later day. Not checked: playback of the new files in a browser.

## Local dictation needs macOS 15.4 in 0.3.57 — 2026-11-12

`/docs/system-requirements/` said only "the app declares macOS 10.13 or later". That is the
`LSMinimumSystemVersion` of the app, not of its local engine. The engine of 0.3.35 to 0.3.57 was
built without a deployment target, so it declares macOS 26.0 and imports libc++
`std::bad_function_call` (both slices), which macOS has from 15.4, and on arm64
`MTLResidencySetDescriptor` (from 15.0). The page and the Japanese no-subscription guide
(`/ja/guides/mac-dictation-app-no-subscription/`) now say that Local dictation in 0.3.57 needs
macOS 15.4 or later; the declared 10.13 stays as a second fact. Tested: the 0.3.57 engine starts and
transcribes on macOS 15.8.2 (GitHub macos-15 runner, CPU only). Not tested: any macOS below 15.4;
"does not start" there is inferred from the imports. The desktop fix builds the engine for macOS
13.3; when a release carries it, change `MAC_LOCAL_MINIMUM` and the ja strings again.
`DOCS_SYSTEM_REQUIREMENTS_LASTMOD` and `JA_NO_SUBSCRIPTION_GUIDE_LASTMOD` 2026-11-12.

## Our own network capture on the network test page — 2026-11-11

`/privacy/local-dictation-network-test/` used to say it was "a test procedure, not a published
measurement". It now carries two sections after the tool list, in every language: "Our measurement
on 11 November 2026" (`id="our-measurement"`) and "What the measurement shows and what it does not".
Copy lives in `data/network-test-measurement.mjs`; the data is
`assets/evidence/local-network-2026-11-11/results.json`, linked from each locale's related links.
Setup: Dictivo 0.3.57, Mac16,7, macOS 27.0.1, Private Local with Quality / Large v3, Cloud Fast not
locked, nettop every second plus lsof every two seconds, three fixed English sentences played by
`say` through the built-in speakers. Result: idle 120 s, dictation 90 s and the 180 s after showed
no Dictivo connection; the Cloud Fast comparison showed one connection sending 910,683 bytes. Not
tested: the offline and reconnect phases. A first run the same day was discarded because Dictivo's
history had no session from it. A competitor study was planned and dropped by the founder the same
day. Trust-page sections now accept an optional `id`. `NETWORK_TEST_LASTMOD` 2026-11-11.

## Releases repository on the install page — 2026-11-11

The public repository https://github.com/deepviewsdev/dictivo-releases went live the same day. A
daily GitHub Action copies each installer from downloads.dictivo.app into a GitHub release, checks
its SHA-256 against downloads.json, attaches a SHA256SUMS file and the release notes from
`data/release-notes.mjs`. It holds no source code. `/docs/install-and-uninstall/` gained the section
"Check a download" (the repository, `shasum -a 256` and `Get-FileHash`, compare with SHA256SUMS,
a matching checksum does not make the Windows installer signed) and a reference entry
(`DOCS_INSTALL_LASTMOD` 2026-11-11). The page still names no `downloads.json` (public output check),
keeps six FAQs (docs shape test) and adds no `sameAs`. When the Windows installer gets signed, update
the repository's README and `scripts/sync-release.mjs` too: both say it is not Authenticode-signed.

## VoiceInk "current offer" wording, all languages — 2026-11-11

VoiceInk's pricing page shows Solo $25, Personal $39 and Extended $49 with no sale wording
(spot-check 2026-11-10). The English comparison row, body and FAQ, and the shared translated price
cell (`data/compare-fact-locales.mjs`: de fr es it nl pt zh ko, zh-hant by conversion) no longer call
these prices a "current offer" ("Aktuelles Angebot", "Offre actuelle", "当前优惠", "현재 할인", ...).
They now say the tiers are paid once. Prices and the "lifetime updates" statement are unchanged.
Affected pages: `/compare/voiceink-alternative/` in the ten non-Japanese languages (dates 2026-11-11;
the hubs keep their dates), `/guides/best-speech-to-text-apps-for-mac/`
(`SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD` 2026-11-11), and the VoiceInk cells of the en, de, zh and zh-hant
`/guides/offline-dictation-on-mac/` pages (already dated 2026-11-11; the de and zh row check date
stays 2026-09-29). `tests/wording/voiceink-pricing-wording.test.mjs` pins it.

## Japanese vendor update wording — 2026-11-11

The shared Japanese templates said MacWhisper Pro and VoiceInk come with 「無期限のアップデート」 and
called VoiceInk's tiers a 「現在の価格」. The vendors' pages say "lifetime updates" and show no offer
wording (spot-check 2026-11-10). The Japanese cells now read 「すべてのアップデート込み（ベンダー表記は
「lifetime」）」, the VoiceInk price cell starts with 「買い切り：」, and the VoiceInk decision text and
FAQ attribute the promise to the vendor the same way. This matches the B3 rule for vendor update
promises. Affected pages: `/ja/compare/macwhisper-alternative/` and `/ja/compare/voiceink-alternative/`
(Japanese dates 2026-11-11; `/ja/compare/` follows its newest child), plus the price cells of
`/ja/guides/best-speech-to-text-apps-for-mac/` and `/ja/guides/offline-dictation-on-mac/` (already dated
2026-11-11). The other languages still said "Current offer" or its translation for VoiceInk; fixed
the same day (note above).

## Batch B3 Japanese buyer pages — 2026-11-11

Two new Japanese answer pages, each paired by hreflang with its English twin:
`/ja/guides/best-speech-to-text-apps-for-mac/` (twin `/guides/best-speech-to-text-apps-for-mac/`, a
ten-row fact table) and `/ja/guides/mac-dictation-app-no-subscription/` (twin
`/guides/mac-dictation-app-no-subscription/`, the 買い切り page, twelve rows). Both render through
`renderAnswerGuidePage()` with code `ja` and have the B1 shape: a dated answer, the "What is
Dictivo?" block, intent rows, a fact table with a check date per row, a method note signed
「Dictivo チーム」, the trial panel, sections, a FAQ, related pages and references. Each page shows
the Homebrew command once. The copy was written in Japanese, not translated sentence by sentence.

Each pair is registered the way the troubleshooting guides were on 2026-10-09: a `*_PATHS` map,
`translatedGuideHeadTags()` on both pages, `translatedGuideSitemapAlternates()` on both sitemap
entries and the language menu through `hrefForLocale`. The `ja` path is registered only while the
data file's `JA_SPEECH_GUIDE_READY` or `JA_NO_SUBSCRIPTION_GUIDE_READY` is true; both are true now.
The English twins kept their `<main>`, their `*_LASTMOD` and their `datePublished`; only their head
and sitemap entry gained the `ja` alternate. The Japanese pages are linked from the Japanese footer,
`/ja/llms.txt` (the speech-to-text page replaces the English line there) and the Japanese offline
guide, which gained one link to each page in sections 2 and 3. Both pages were first published and
last updated on 2026-11-11.

Competitor facts come from the competitor facts file and the price spot-check of 2026-11-10
(`JA_*_CHECKED`); the Voice Type row keeps the site's 2026-09-29 facts. No source covers other apps'
Japanese support, so only Dictivo's is stated. Gaps read 記載なし. Dictivo prices come from price
tokens. The UI labels were read from the desktop app at `v0.3.57`: マイク（必須）, アクセシビリティ
（推奨） and 「言語を自動検出」. 「Set up Local」 stays in English because the app shows it in English.

Voibe fix: the `de`, `zh` (and so `zh-hant`) and `ja` offline Mac guides showed Voibe prices of
2026-09-29. They now show the 2026-11-10 spot-check ($9.90 a month, $99 a year or $199 once per
seat) with a per-row check date (`OFFLINE_GUIDE_VOIBE_CHECKED`) and a matching Voibe pricing
reference. These four pages and the English one were re-dated to 2026-11-11. The six offline guides
without a price column (`fr es it nl pt ko`) show no Voibe price, keep the shared reference list and
were not re-dated.

`--zap` fix: the English offline Mac guide's Homebrew FAQ said `brew uninstall --zap --cask dictivo`
removes the app with its settings, license file and models. It now says the zap moves five folders
to the Trash and the Keychain items named `com.dictivo.desktop`, which hold backup copies of the
licenses, stay. A related row links `/docs/install-and-uninstall/`. This closes the B2 follow-up.

Not changed: the Windows offline guide's `<main>` and date, the homepages, `/pricing/`, the
comparison pages, the English B1 and B2 copy, `OFFLINE_DICTATION_GUIDE_LASTMOD` and
`OFFLINE_GUIDE_PRICES_CHECKED` (both 2026-09-29).

Evidence weakness: Google Search Console shows only troubleshooting queries for Japan. The buyer
demand evidence is one AI-answer probe (P8), asked in Japanese, which three engines answered without
Dictivo. Nobody sampled Japanese search results; the intent rows are unverified phrasings.

## Batch B2 docs section — 2026-11-10

The site has a docs section with nine new English URLs: `/docs/`, `/docs/system-requirements/`,
`/docs/install-and-uninstall/`, `/docs/macos-permissions/`, `/docs/models-and-languages/`,
`/docs/offline/`, `/docs/connections/`, `/docs/license-and-devices/` and
`/docs/updates-and-renewal/`. They are reference pages about the desktop app, not comparisons.

The pages render through `renderDictationGuidePage()` behind a thin `renderDocsPage()` wrapper,
not through `renderAnswerGuidePage()`: a reference page needs no intent table, fact table or
"What is Dictivo?" block. The index has its own `renderDocsIndexPage()`. One registry,
`data/docs-index.mjs`, feeds the write loop, the sitemap, `llms.txt`, the docs nav, the index, the
footer link and the output check. A page is built only when its data file says `ready: true`; all
eight do. Each page has a three-crumb breadcrumb and a `FAQPage` node built from its visible FAQ.

Every fact was read from the desktop app's source at tag `v0.3.57` or from a page the site already
publishes. `DOCS_CHECKED` (2026-11-10) and `DOCS_CHECKED_VERSION` (0.3.57) record the day and the
tag; the method line on every page prints them. Nobody tested the app by hand for these pages. The
minimum macOS version is stated as "the app declares macOS 10.13 or later": the source pins none,
so it was read from `LSMinimumSystemVersion` in the installed 0.3.57 `Info.plist`. Start at login
needs macOS 13 or later. One fact stays open: what the Windows uninstaller leaves behind has no
check in the Windows test VM. The install page names only `%LOCALAPPDATA%\Dictivo` and the Credential
Manager entries.

The English footer links `/docs/` in column 1, after Security. `/security/` gets three edits in
its network section: one sentence links `/docs/connections/` for paths, triggers and blocked
behavior per host; the licence-service row says the app sends a short device label it creates,
not the machine name; and the trial-milestones item says that from 0.3.56 the trial reports also
carry the acquisition channel if you agree to share it. Its "Last reviewed" date moved to
2026-11-10. Its sitemap `lastmod` still follows `release.updatedAt`. The stale "first signed build
is 0.3.55" comment in `data/release-notes.mjs` is gone.

Not changed: every B1 and earlier page, its data file and its date (only the footer under the
generated pages changed), the Windows offline guide's `<main>`, the homepages, `/pricing/` and
`assets/`.

Follow-ups for the desktop app (not changed here):

- Settings › Privacy › Connections says licence activation sends "this computer's name". The code
  sends a label it builds, "Dictivo on" plus the platform name (`SettingsView.tsx` handleActivate,
  `App.tsx` localInstanceName). The Cloud Fast row says "this device's id and name"; the code sends
  a label of the form "Dictivo on macos aarch64" (`license.rs` cloud_fast_device_label).
- The app.dictivo.app row in the same table does not mention the acquisition channel that the
  trial reports carry after you agree to "Share how you found Dictivo (optional)"
  (`trialCensus.ts:71`).

Follow-up for the site (not changed in this batch): the Homebrew FAQ of the English offline Mac
guide (`data/offline-dictation-guide.mjs`, around line 314) says
`brew uninstall --zap --cask dictivo` removes the app with its settings, license file and models.
The zap leaves the Keychain items named `com.dictivo.desktop`, which hold backup copies of the
licenses. `/docs/install-and-uninstall/` says so.

## Batch B1 answer pages — 2026-11-10

Five English guides now share one answer-page shape and one renderer, `renderAnswerGuidePage()`.
Two are rebuilt: `/guides/best-speech-to-text-apps-for-mac/` and the English
`/guides/offline-dictation-on-mac/`. Three are new: `/guides/dictation-app-mac-windows-one-time-license/`,
`/guides/mac-dictation-app-no-subscription/` and `/guides/dictate-into-claude-code-and-cursor-on-mac/`.
Each page has the query as its H1, a short dated answer, a table of the ways people ask, a fact
table with a "Checked on" date per row, a method note signed "Dictivo team", and `FAQPage` and
`ItemList` nodes that repeat visible text. The offline Mac guide and the Claude Code page show the
Homebrew command `brew install --cask deepviewsdev/tap/dictivo`.

The English footer links the three new pages. The English compare hub links the one-time license
page under its introduction, so `COMPARE_HUB_LOCALE_LASTMOD.en` moved to 2026-11-10. `llms.txt`
lists all three.

Not changed: the Windows offline guide (its `<main>` and its 2026-10-17 date; only the footer under
it changed), the ten translated offline guides, the homepages, `/pricing/` and the comparison pages.

Competitor facts were checked on 2026-11-10 against vendor pages and documentation, using the
competitor facts file of that date. A live price spot-check the same day corrected two English
facts: Spokenly Pro is $15 a month or $144 a year, and Voibe is $9.90 a month, $99 a year or $199
once. The fix also covers `/guides/best-dictation-software/`; there only the Spokenly and Voibe
prices carry the new date. The translated offline guides keep their 2026-09-29 Voibe prices. The
Voice Type and Aiko rows keep the site's 2026-09-29 facts. The Claude Code and Cursor rows come from their official documentation, read on 2026-11-10.
Dictivo facts come from the site data and the app source. Nobody tested the apps by hand for these
pages. Spokenly and Voxtira were added to the allowlist in `tests/facts/price-output.test.mjs`,
because some of their prices equal Dictivo figures.

## Batch A entry-page fixes — 2026-11-10

Six changes from the Mac search plan, one commit each. Eight guides (the six dictation guides and
the English and Japanese offline guide) get a "What is Dictivo?" block right after the answer, with
the pricing link and the downloads; the first Mac download link moved from 52–81% of the body to
under 15%. `/pricing/` gets the same download pair. The header gains a third link to the compare
hub, and the homepage pricing section links the hub (in English also the buyer guide). The English
title, description and hero lede and the Japanese lede now say "one-time purchase" / 「買い切り」;
the H1 is unchanged. Five Japanese comparison pages get their own title and description (they
shared one template before); the Japanese Dragon page gets them too but keeps its 2026-10-09 date,
which `tests/facts/dragon-price-status.test.mjs` pins, so its sitemap lastmod did not move.
`/refund/` has a longer description. The hero has a `mailto:` link, shown on touch devices only,
that lets a phone visitor mail the homepage to themselves; it has no recipient and no script.

## IndexNow retries a dropped connection — 2026-11-04

The deploy of eef30be failed in its IndexNow step: yandex.com closed the socket before any
response. The site deployed, but the 11 re-dated homepages were not sent, and the next deploy
would not resend them because it diffs against the new live sitemap. They were resubmitted by
hand (HTTP 202), with the 21 fr/es/pt comparison, compare hub and `/demo/` pages whose titles or
descriptions changed without a new lastmod (HTTP 200). `submit-indexnow.mjs` now retries a network
error twice (2 s, then 4 s). An HTTP response is still final.

## Hero steps and pricing intro removed — 2026-11-04

The hero's three-step list repeated its lede in every language ("Press your shortcut, speak, and
paste…"), so the list and its copy are gone. `/pricing/` lost "The same three plans as on the
homepage. The table below sets them side by side.", which described the layout. The other
`/pricing/` sections stay: each states a fact the table does not (the 1,500 Cloud Fast minutes,
what happens when the trial ends, the licence terms). `HOME_CONVERSION_LASTMOD` moved to
2026-11-04 for this change and the four-section homepage.

## Titles and descriptions trimmed — 2026-11-04

G12, after the Bing baseline. Four titles were over 70 characters and six descriptions over 160.
The French, Spanish and Portuguese comparison title templates lost the platform word ("Mac",
rewritten to "ordinateur", "escritorio", "desktop" at build time), so every comparison page in
those three languages has a new title. The German, French and Portuguese homepage descriptions,
the German and French comparison hub descriptions and the `/demo/` description lost a clause.
No page is now over either limit.

## Homepage cut to four sections — 2026-11-04

The homepage kept the hero, privacy, pricing and downloads sections. Removed: the workflow steps,
the Mac advisor (it stays on `/mac-model-guide/`), the trust strip, the comparison cards, the
language list and the FAQ with its FAQPage node. The footer gained a link to the comparison hub;
the header language menu already lists every language. 1440 px height went from about 10,390 px
to 4,268 px. Bing baseline taken first (3 months to 11-01: 115 impressions, 197 Copilot citations,
185 of them on `/guides/offline-dictation-on-windows/`, which this change does not touch). Every
other FAQPage node matches a visible FAQ, so G5 needed no further change.

## `.html` twin pages removed — 2026-11-04

The build wrote nine pages twice: `slug/index.html` and `slug.html` (privacy, terms, refund,
contact, about, security, changelog and the two privacy articles). Only the slug form is written
now. The existing `_redirects` lines already send each `slug.html` to `/slug/` with a 301, so old
links keep working. `tests/structure/html-twins.test.mjs` checks all three facts per page.

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
