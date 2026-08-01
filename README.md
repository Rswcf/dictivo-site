# Dictivo site

This repository is the static website for `dictivo.app`. It is intentionally separate from the Dictivo desktop app
repository. The current positioning is **private dictation first**: Local mode is the default product, while Cloud
Fast is an optional speed mode for users who accept cloud transcription upload.

Current public pricing copy:

- Dictivo Local: `$29` launch price (regular `$49`) one-time, perpetual for the version bought, 12 months of updates, use on up to 3 personal devices, optional `$24/year` renewal for future updates.
- Dictivo Cloud Fast: `$6.99/month`, 1,500 minutes/month, standalone or alongside Local.

## Local preview

From the repository root:

```sh
node scripts/generate-site.mjs
python3 -m http.server 4173 -d dist
```

Then open `http://127.0.0.1:4173/`.


## How the site copy is assembled

`dist/` is the only source of truth for what a reader sees. Every string in `data/` is a starting
point that a later stage may replace. Audit the generated HTML, never the data files.

This is not a style preference. An audit that read `data/site-content.mjs` once reported about 178
Mac-only strings as live defects on the public site. Every one of them had already been rewritten
at render time and none of them appeared in `dist/`.

To check what actually ships:

```sh
node scripts/generate-site.mjs
grep -r "the string you are checking" dist/
node scripts/check-public-output.mjs
```

### The homepage override chain

Homepage copy passes through five stages. A later stage always wins.

1. **`HOME_COPY`** in `data/site-content.mjs`. English, German, French and Spanish are written out
   in full. Italian, Dutch, Portuguese, Chinese, Japanese and Korean are produced by
   `deriveFromEnglish()` and then merged with per-locale `details`.
2. **`LAUNCH_OFFER_COPY`**, a loop at the end of `data/site-content.mjs`. For the nine non-English
   locales it replaces the tail of the privacy list, the pricing body, the free-tier and Cloud Fast
   feature lists, the downloads body, and one FAQ answer.
3. **`L10N_PARITY`**, a second loop directly after it. It appends the three FAQ entries the
   localized pages were missing, replaces the whole `signed.cells` trust block with four cards,
   sets `signed.footnoteHref`, and rewrites the Local tier subtitle.
4. **`applySeoHomeCopy()`** in `scripts/generate-site.mjs`. It overwrites `metaTitle`,
   `metaDescription`, the hero eyebrow, title and emphasis, and the footer privacy-proof label from
   `SEO_HOME_COPY`.
5. **`homeCopyForRender()`** in the same file. When `hasWindowsRelease` is true it applies
   `WINDOWS_HOME_COPY` on top of everything above.

Every page renderer calls `homeCopyForRender(code)`. Nothing in the generator reads `HOME_COPY`
directly except that one function.

### `WINDOWS_HOME_COPY` is the stage that surprises people

It lives in `scripts/generate-site.mjs`, has an entry for all ten locales, and while Windows is
public it rewrites: `metaTitle`, `metaDescription`, the nav download label, the hero eyebrow, hero
title and hero Windows note, the privacy section title, the free tier's subtitle, button, `href`
and data attribute, the pricing footnote, the downloads kicker, title and body, the signed-section
title and footnote, the languages title, the first workflow step title, the first FAQ question,
every FAQ answer whose question mentions Windows, and the footer beta line.

The Mac-only originals for all of those are still sitting in `data/site-content.mjs`. While Windows
is public they are dead source, not live copy. Do not delete them either: they are the fallback the
site reverts to when `hasWindowsRelease` goes false.

`WINDOWS_DOWNLOAD_COPY` is a separate per-locale map in the same file. It supplies the download
card badge and body, the EXE and MSI button labels, the version note, and the SmartScreen warning
shown because the Windows installers are not Authenticode-signed.

### `hasWindowsRelease`

```js
const hasWindowsArtifacts = Boolean(windowsRelease?.exe?.url && windowsRelease?.msi?.url);
const hasWindowsRelease = release.publicWindowsDownloads === true && hasWindowsArtifacts;
```

Both halves must hold. `publicWindowsDownloads` in `data/release.json` is the deliberate switch;
the artifact check is the safety catch. `scripts/sync-latest-release.mjs` rewrites
`data/release.json` on every deploy, so a desktop release that ships a DMG but no EXE and MSI turns
`hasWindowsRelease` off without anyone touching the flag.

That one boolean is read in 22 places in `scripts/generate-site.mjs` and 2 more in
`scripts/check-public-output.mjs`. When it goes false the site quietly becomes Mac-only:

- the whole `WINDOWS_HOME_COPY` layer stops applying, on all ten homepages at once;
- the hero Windows button and the Windows download card disappear, and the download grid switches
  from `multi` to `single`;
- `/download/windows`, `/download/windows-msi` and the two `/downloads/Dictivo-Windows-x64.*`
  routes point at `/#downloads` instead of the tracking API;
- `downloads.json` drops the Windows artifacts;
- schema.org `operatingSystem` goes back to `macOS` alone and `downloadUrl` back to the Mac URL;
- the comparison pages' `Platforms` rows switch to "in validation" wording and
  `applyCompareDesktopCopy()` stops rewriting "Mac" to "desktop";
- `llms.txt` falls back from its Windows summary and facts to the Mac ones;
- the changelog's Windows section is omitted.

`scripts/check-public-output.mjs` fails the build when `publicWindowsDownloads` is true but the
artifacts are missing, rather than letting a bad sync un-launch Windows silently. It also fails on
stale Mac-only strings while Windows is live, and on Windows launch strings while it is not.

### Comparison pages

English comparison content lives in `data/compare-pages.mjs`: one entry per competitor, each with a
`rows` array of `{ label, dictivo, competitor }`.

Localized pages do not restate competitor facts. `LOCALIZED_COMPETITOR_ROWS` in
`scripts/generate-site.mjs` holds a per-locale competitor string for each row label, and the three
fact-bearing rows — `Pricing model`, `Free tier / trial` and `Platforms` — begin with a
`{competitorFact}` token. `fillCompareTemplate()` substitutes the English row's `competitor` value
into that token, so a competitor's price, trial terms and platform list exist in exactly one place.

This is deliberate. Translating competitor numbers into nine languages would multiply by nine the
staleness to chase every time a competitor reprices. **When a competitor changes its pricing, edit
the English row in `data/compare-pages.mjs` and all ten locales follow.** A localized row that
spells out a competitor's price instead of using the token is a bug.

`{competitor}` is a second, separate token and expands to the competitor's display name.

`COMPARE_LAST_UPDATED` in `data/compare-pages.mjs` stamps every comparison page.
`scripts/check-public-output.mjs` fails if a comparison spoke page is missing the visible stamp or
carries any other date, so the constant cannot drift away from what is rendered.

### `security.html` is hand-maintained, not generated

`security.html` at the repository root is copied verbatim by `scripts/generate-site.mjs` to
`dist/security.html`, and the same bytes are written to `dist/security/index.html`. Edit the root
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

As of 2026-08-01 the file is still unfilled and `/impressum/` returns 404.

### `scripts/check-public-output.mjs`

The deploy workflow runs this over every text file in `dist/` and fails the build on a match.

It enforces a forbidden-content list of vendor and implementation names that must never appear in
public output — the payment provider's name, `whisper.cpp`, `Cloudflare`, `R2`, `GitHub Release`,
`client-side analytics`, `machine-readable`, `api token`, repository paths such as
`scripts/generate-site` and `data/compare-pages`, and the localized words for "sources" and
"fact-checked" in every shipped language.

This list is deliberate. The public site describes what the product does, not what it is built on,
and not how this repository is wired. If a new page trips the check, rewrite the page. Do not widen
the list without a decision that the name genuinely belongs in public copy. (`downloads.json` is
the one narrow exemption: it may be named on `llms.txt` and the security page, nowhere else.)

The same script also asserts that the required trust, GEO and localized pages exist, that no
`data/`, `scripts/`, `tmp/` or `.github/` path is published, that `assets/site.js` still carries
the `web-linked-v1` analytics contract, and the Windows launch consistency rules above.

### Last-updated constants

Visible "Last updated" stamps, schema.org `dateModified` and `sitemap.xml` `lastmod` all read from
constants. Nothing derives them from file mtimes or the build date. Bump the constant when the
content it stamps actually changes — that is the only thing that moves a date.

| Constant | File | Drives |
| --- | --- | --- |
| `MAC_ADVISOR_LASTMOD` | `data/mac-model-advisor.mjs` | sitemap for `/mac-model-guide/` (all locales) |
| `PRIVACY_PROOF_LASTMOD` | `data/privacy-proof-pages.mjs` | sitemap + `dateModified` for `/privacy-proof/` |
| `OFFLINE_DICTATION_GUIDE_LASTMOD` | `data/offline-dictation-guide.mjs` | visible stamp + sitemap + `dateModified` for `/guides/offline-dictation-on-mac/` |
| `OFFLINE_DICTATION_WINDOWS_GUIDE_LASTMOD` | `data/offline-dictation-windows-guide.mjs` | visible stamp + sitemap for `/guides/offline-dictation-on-windows/` |
| `BENCHMARK_METHOD_GUIDE_LASTMOD` | `data/benchmark-method-guide.mjs` | visible stamp + sitemap for `/guides/mac-dictation-benchmark-method/` |
| `SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD` | `data/speech-to-text-mac-guide.mjs` | visible stamp + sitemap for `/guides/best-speech-to-text-apps-for-mac/` |
| `MEDIA_KIT_LASTMOD` | `data/media-kit.mjs` | sitemap + `dateModified` for `/media-kit/` |
| `LEGAL_LASTMOD` | `data/trust-pages.mjs` | visible stamp + sitemap + `dateModified` for `/privacy/`, `/terms/`, `/refund/` |
| `COMPARE_LAST_UPDATED` | `data/compare-pages.mjs` | visible stamp + sitemap for every `/compare/` page, and a build gate |

The two `/privacy/` sub-pages carry their own inline `lastModified` values in
`data/trust-pages.mjs`. Pages with no date of their own fall back to `release.updatedAt` from
`data/release.json`, which moves on every desktop release.

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
node scripts/check-cloud-fast-checkout.mjs
node scripts/check-local-checkout.mjs
node scripts/check-checkout-live.mjs
node scripts/check-release-payload-sync.mjs
node scripts/check-asset-version.mjs
node scripts/check-public-output.mjs
node scripts/inject-asset-version.mjs
```

The six check steps are blocking: any one of them fails the deploy before `dist/` reaches
Cloudflare. `scripts/check-public-output.mjs` is the broadest of them - it scans every generated
text file in `dist/` against a forbidden-content list, so vendor and implementation names must
never reach public output.

That keeps the homepage, localized pages, comparison pages, `downloads.json`, `_redirects`, `sitemap.xml`, and changelog aligned with
the latest stable desktop release. The final step copies `site.css` and
`site.js` to content-fingerprinted paths and rewrites generated HTML to those
paths. Asset correctness therefore does not depend on a successful cache purge.

Required GitHub Actions secret:

- `CLOUDFLARE_API_TOKEN` with Cloudflare Pages edit permission.
- `CLOUDFLARE_ACCOUNT_ID` for the Cloudflare account that owns the Pages project.
- `CLOUDFLARE_ZONE_ID` for the best-effort cache purge. If omitted, the purge
  script falls back to resolving `dictivo.app` by name. Purge failure should be
  repaired as operational hygiene, but fingerprinted CSS/JS paths prevent it
  from serving stale application code after a deploy.
- `DICTIVO_DESKTOP_TOKEN` is optional and only needed for manual/scheduled fallback syncs that must read the private
  desktop repo's GitHub Release API.

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

Manual R2 uploads, when needed outside the desktop release workflow, can be run with:

```sh
SOURCE_DIR=/tmp/dictivo-r2-upload scripts/upload-downloads.sh
```

The script creates the `dictivo-downloads` bucket if needed, connects `downloads.dictivo.app`, and uploads installer
objects with long-lived cache headers. It uploads macOS by default; set `INCLUDE_WINDOWS=1` only when the release
directory contains the matching Windows EXE and MSI from the same desktop release. The macOS DMG is Developer ID
signed and notarized; the Windows EXE and MSI are not Authenticode-signed, and the site's Windows download card
carries a SmartScreen note saying so.

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
