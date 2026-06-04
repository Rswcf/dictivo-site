# Dictivo site

This repository is the static website for `dictivo.app`. It is intentionally separate from the Dictivo desktop app
repository. The current positioning is **private dictation first**: Local mode is the default product, while Cloud
Fast is an optional speed mode for users who accept cloud transcription upload.

Current public pricing copy:

- Dictivo Local: `$49` one-time, 12 months of updates, optional `$24/year` renewal for future updates.
- Dictivo Cloud Fast: `$6.99/month`, 1,500 minutes/month, standalone or alongside Local.

## Local preview

From the repository root:

```sh
node scripts/generate-site.mjs
python3 -m http.server 4173 -d dist
```

Then open `http://127.0.0.1:4173/`.

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

Every deploy runs:

```sh
node scripts/sync-latest-release.mjs
node scripts/generate-site.mjs
```

That keeps the homepage, localized pages, comparison pages, `downloads.json`, `_redirects`, `sitemap.xml`, and changelog aligned with
the latest stable desktop release.

Required GitHub Actions secret:

- `CLOUDFLARE_API_TOKEN` with Cloudflare Pages edit permission.
- `CLOUDFLARE_ACCOUNT_ID` for the Cloudflare account that owns the Pages project.
- `CLOUDFLARE_ZONE_ID` for cache purge. If omitted, the purge script falls back to resolving `dictivo.app` by name.
- `DICTIVO_DESKTOP_TOKEN` is optional and only needed for manual/scheduled fallback syncs that must read the private
  desktop repo's GitHub Release API.

## Download hosting

The current public website download is macOS. Windows artifacts can still be mirrored under
`downloads.dictivo.app` for existing testers and in-app updates, but they are not exposed on the public site until
Windows QA is ready. GitHub Releases remain the archive; the website and updater use the R2-backed download host.

Expected objects:

- `Dictivo-macOS-universal.dmg`
- `Dictivo_*_x64-setup.exe`
- `Dictivo_*_x64_en-US.msi`

The public download buttons point at `api.dictivo.app/download/*` with release and UTM parameters. The API records the
download funnel event, then redirects to the R2 object under `downloads.dictivo.app`. The legacy `/download/*` routes
in `_redirects` also point at the API tracking redirect. Windows routes redirect back to the downloads section unless
`publicWindowsDownloads` is explicitly enabled in `data/release.json`.

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
directory contains the matching Windows EXE and MSI from the same signed desktop release.

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
