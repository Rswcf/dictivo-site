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
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Cloudflare Pages

- Project name: `dictivo-app`
- Production domain: `dictivo.app`
- Optional redirect domain: `www.dictivo.app`
- Build command: leave empty
- Output directory: repository root

The site can also be deployed from the repository root with:

```sh
npx wrangler pages deploy . --project-name dictivo-app
```

Do not upload installer binaries into the Pages project. Cloudflare Pages direct uploads have a 25 MiB per-file limit,
and desktop installers should be treated as release artifacts rather than website assets.

## GitHub deployment

The `.github/workflows/deploy-cloudflare-pages.yml` workflow deploys the repository root to Cloudflare Pages whenever
`main` is pushed.

Required GitHub Actions secret:

- `CLOUDFLARE_API_TOKEN` with Cloudflare Pages edit permission for account `0a78c0c34d3e08a9297247ce98d44ad1`.

## Download hosting

The current public macOS download points at the signed and notarized GitHub Release DMG. R2 mirroring under
`downloads.dictivo.app` is planned, but should not be treated as the canonical download host until it is enabled and
verified.

Expected objects:

- `Dictivo-macOS-universal.dmg`
- Windows installer objects are held back until the Windows public release is signed and real-machine QA is complete.

The public download buttons use `/download/*` routes in `_redirects`. The macOS route may point directly at the latest
GitHub Release DMG while R2 mirroring is being prepared; Windows routes should stay validation-only until signing and
real-machine QA are complete. The machine-readable release manifest lives at `/downloads.json`.

After R2 is enabled in the Cloudflare dashboard, uploads can be run with:

```sh
SOURCE_DIR=/tmp/dictivo-r2-upload scripts/upload-downloads.sh
```

The script creates the `dictivo-downloads` bucket if needed, connects `downloads.dictivo.app`, and uploads the three
installer objects with long-lived cache headers.

## Local checkout

The Dictivo Local pricing CTA points to `/checkout/local`, so the Lemon Squeezy one-time checkout URL can be swapped
without changing page markup.

`_redirects` currently sends `/checkout/local` to a local pending anchor until the Lemon Squeezy Local checkout URL is
ready.

Check the current route before deploy:

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

To return to the KYC-pending placeholder if needed:

```sh
node scripts/set-cloud-fast-checkout.mjs --pending
```

## Manual release checklist

1. Build the release artifacts from the desktop workflow.
2. Sign and notarize the macOS DMG.
3. Update `changelog.html` with the tag that the app's `latest.json` links to.
4. Point `/download/mac` at the signed/notarized DMG or upload the DMG to R2.
5. Sign the Windows EXE and MSI installers before making Windows public.
6. Verify the public URLs under `https://dictivo.app/download/*`.
7. Deploy the repository root to Cloudflare Pages and attach `dictivo.app`.

## References

- Cloudflare Pages direct upload limits: https://developers.cloudflare.com/pages/get-started/direct-upload/
- Cloudflare Pages redirects: https://developers.cloudflare.com/pages/configuration/redirects/
- Cloudflare R2 public buckets and custom domains: https://developers.cloudflare.com/r2/buckets/public-buckets/
