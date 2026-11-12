# AGENTS.md

This repository builds dictivo.app, the marketing site for the Dictivo desktop app.
`scripts/generate-site.mjs` turns `data/`, `assets/` and a few root files into a static site in
`dist/`. Cloudflare Pages serves `dist/`. `functions/_middleware.js` is the only Pages Function.
It chooses a page language per request (`lib/locale-routing/`). The site has 11 languages:
en de fr es it nl pt zh zh-hant ja ko.

## Commands

Node 24 or later.

```sh
npm ci           # install (one dependency: opencc-js)
npm run build    # write dist/
npm test         # build, then run every tests/**/*.test.mjs
npm run verify   # npm test plus the seven offline output checks; CI runs this on every PR
npx --yes wrangler@4.90.1 pages dev dist --compatibility-date=2026-05-15   # preview on :8788
```

The preview applies `_redirects`, `_headers` and the Function. `python3 -m http.server` does not.
Without the flag, wrangler uses today's date, and its bundled runtime (up to 2026-05-15) fails to start.

## Deploys

A push to `main` deploys to production. There is no staging step. Open a pull request instead and
wait for the Verify check. `.github/workflows/deploy-cloudflare-pages.yml` runs the deploy. It also
runs on a desktop release dispatch and once a day.

Do not run these scripts locally unless the task is about them:

- `scripts/sync-latest-release.mjs` rewrites the tracked `data/release.json`.
- `scripts/inject-asset-version.mjs` copies `site.css` and `site.js` to hashed names and rewrites
  the HTML in `dist/`. A second run fails.
- `scripts/check-checkout-live.mjs`, `scripts/check-locale-routing-live.mjs`,
  `scripts/submit-indexnow.mjs` and `scripts/purge-cloudflare-cache.mjs` call production services.
- `scripts/set-local-checkout.mjs` and `scripts/set-cloud-fast-checkout.mjs` change where paying
  customers go.

## Rules

- `dist/` is the only truth about what a visitor sees. A string in `data/` can be replaced by a later
  stage. Search `dist/` before you call copy live or dead.
- Homepage, header and footer copy is `HOME_COPY` in `data/home-copy.mjs`, one full object per
  language. Only `{{price.*}}` tokens, the zh to zh-hant conversion and `assets/site.js` change it
  later. README ("Homepage copy") has the details.
- Every price comes from `data/local-offer.mjs` through price tokens. Do not type a price into copy.
- Every page except the homepage and `/demo/` is wrapped by `renderLayout()` in the generator. Change
  the shared head, header or footer there, not in one renderer.
- `site.css` styles only classes that a built page or `assets/site.js` uses.
  `tests/structure/css-classes.test.mjs` fails otherwise; delete the rule with the markup.
- Edit Simplified Chinese (`zh`) copy only. The build converts it to `zh-hant`.
- `security.html` at the root is hand-maintained and copied as is to `/security/`. It gets no shared
  header or footer.
- Pages live at `slug/index.html` only. Old `slug.html` addresses get a 301 from the build
  (`tests/structure/html-twins.test.mjs`).
- The root `_redirects` holds only the three checkout lines. The build writes every other rule.
- "Last updated" stamps, `dateModified` and sitemap `lastmod` come from `*_LASTMOD` constants. Bump
  the constant when the content it stamps changes. README lists them.
- The `/demo/` film caption links the film credits (`CREDITS.txt`) and says that the film is real
  screen recordings with an AI-generated voice and music. Keep it on `/demo/`. Since 2026-11-12 the
  homepage film has no caption.
- The build prints an Impressum warning on every run. It is expected until `data/impressum.json` is filled.

## Do not break

- Checkout routes `/checkout/local`, `/checkout/cloud-fast`, `/checkout/local-renewal`.
- Download buttons, `/download/*` routes and `/downloads.json`.
- Language routing, hreflang, canonical URLs and `sitemap.xml`.
- The analytics contract in `assets/site.js` (`web-linked-v1`, the `dictivo-self` opt-out).
- Legal pages: `/privacy/`, `/terms/`, `/refund/`.
- Fragment links: `tests/structure/anchors.test.mjs` fails when a link, redirect or llms.txt names a
  missing id.

## Tests

- `tests/facts/`: commitments to customers. Prices, terms, privacy statements, security claims.
  Change the test only when the commitment changes.
- `tests/structure/`: build mechanics. Routes, schema, sitemap, links, caching, locale routing.
- `tests/wording/`: section order and claims of one guide page each. Expect to update these when
  you edit that page.
- `tests/helpers/`: shared fixtures.

## Docs

- `README.md`: how the build works and its traps. Read the relevant section before you edit.
- `docs/site-history.md`: dated change notes. Add new notes there, not to README.
- `docs/superpowers/`: old plans and specs. They record decisions, not current behavior.
