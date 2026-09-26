# Japanese Mac Dictation Troubleshooting Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish `/ja/guides/mac-dictation-not-working/`, a Japanese-only troubleshooting page for built-in macOS dictation, and stop the Japanese offline guide from competing for the same query.

**Architecture:** One new data module holds the copy, references, date and an optional `fieldTest` block. `scripts/generate-site.mjs` gains a page renderer that follows the English-only Windows guide pattern, plus a sitemap entry, a Japanese footer link, a `ja/llms.txt` entry and a public-output existence check. The Japanese offline guide's troubleshooting section is renamed and links to the new page.

**Tech Stack:** Node ESM static generator, `node --test`, no new dependencies.

**Spec:** `docs/superpowers/specs/2026-09-26-ja-mac-dictation-troubleshooting-design.md`

## Global Constraints

- URL `/ja/guides/mac-dictation-not-working/`; `<html lang="ja">`; canonical to itself; the only alternate is `hreflang="ja"` to itself; no `x-default`.
- `<title>` `Macで音声入力できないときの直し方｜症状別の確認手順`; H1 `Macで音声入力できないときの直し方`.
- Only facts listed in the spec's "Facts discipline" section; nothing about 「まる」「てん」「かいぎょう」 or per-app behaviour until `fieldTest` is filled.
- Dictivo appears only in the section `標準の音声入力で解決しないとき`, which contains `当サイトの製品`.
- Download panel `utm_content=ja_troubleshooting_mac`.
- Dates come from `JA_MAC_DICTATION_TROUBLESHOOTING_LASTMOD`; visible stamp, `dateModified` and sitemap `lastmod` agree.
- No price figures or `{{price.` tokens in this page.

---

### Task 1: The new page

**Files:**
- Create: `data/ja-mac-dictation-troubleshooting.mjs`
- Create: `tests/ja-mac-dictation-troubleshooting.test.mjs`
- Modify: `scripts/generate-site.mjs` (imports; path helpers after `offlineDictationWindowsGuideUrl`; head tags after `offlineDictationWindowsGuideHreflangTags`; `renderDocSteps` after `renderDocBullets`; schema/section/field-test/page renderers after `renderOfflineDictationWindowsGuidePage`; footer link in `renderHomeFooterLinks`; `ja` entry in `renderLlmsTxt` pages; sitemap entry; `write(...)`)
- Modify: `scripts/check-public-output.mjs` (`requiredGeoFiles`)

**Interfaces:**
- Produces: `JA_MAC_DICTATION_TROUBLESHOOTING_COPY`, `JA_MAC_DICTATION_TROUBLESHOOTING_LASTMOD`, `JA_MAC_DICTATION_TROUBLESHOOTING_REFERENCES`; `jaMacDictationTroubleshootingPath(): "/ja/guides/mac-dictation-not-working/"`, `jaMacDictationTroubleshootingUrl(): string`.
- Copy shape: `{ navLabel, metaTitle, metaDescription, eyebrow, title, lede, environmentLabel, environment, answerTitle, answer, tocLabel, sections: [{ kicker, title, paragraphs?, steps?, notes? }], fieldTest: null | { kicker, title, environment, caption, headers, rows, notes? }, dictivo: { kicker, title, paragraphs }, faqTitle, faqs: [[q, a]], referencesTitle }`.

- [ ] **Step 1: Write the failing test** — `tests/ja-mac-dictation-troubleshooting.test.mjs` with three tests: (a) self-canonical Japanese-only page with one H1, only the `ja` alternate, and sitemap/visible/structured dates that agree; (b) answer section before the first symptom section, `音声コントロール` and `当サイトの製品` present, TechArticle and FAQPage in Japanese with at least four questions, and none of `FILL_IN`, `TODO`, `undefined`, plus (when no field-test section exists) none of `「まる」`, `「てん」`, `「かいぎょう」`; (c) `utm_content=ja_troubleshooting_mac`, links from `ja/index.html`, `ja/compare/index.html` and `ja/guides/offline-dictation-on-mac/index.html`, the URL in `ja/llms.txt`, no link from `de/index.html`, and the offline guide no longer contains `Macで音声入力できないときの切り分け`.
- [ ] **Step 2: Run to verify it fails** — `node scripts/generate-site.mjs >/dev/null && node --test tests/ja-mac-dictation-troubleshooting.test.mjs` → FAIL (ENOENT on the new page).
- [ ] **Step 3: Implement** the data module and the generator changes listed above. Section ids `ja-troubleshooting-section-N`, answer id `ja-troubleshooting-answer`, field-test id `ja-troubleshooting-field-test`. The field-test section renders only when `copy.fieldTest` is not null.
- [ ] **Step 4: Run** — tests (a) and (b) pass; (c) still fails only on the offline-guide assertion (done in Task 2).
- [ ] **Step 5: Commit** — `feat: publish a Japanese guide for Mac dictation that does not start`.

### Task 2: Stop the offline guide from competing

**Files:**
- Modify: `data/offline-dictation-guide.mjs` (ja `sections[4]`: title `Dictivoで入力できないとき`, first bullet Dictivo-only, add `link`, ja `lastUpdated` → `2026-09-26`)
- Modify: `scripts/generate-site.mjs` (`renderOfflineGuideSection` renders an optional `section.link`; ja table of contents label `Dictivoで入力できないとき`)
- Modify: `tests/guide-trial.test.mjs` (expected date per page from `offlineDictationGuideLastmod(code)` instead of a literal)

- [ ] **Step 1:** Update `tests/guide-trial.test.mjs` so the date test reads each offline guide's expected date from `offlineDictationGuideLastmod`; run it → FAIL for `ja` until the data changes (it still expects the old literal elsewhere only for the two English-only guides).
- [ ] **Step 2:** Make the data and renderer changes.
- [ ] **Step 3:** `node scripts/generate-site.mjs >/dev/null && npm test` → all pass, including Task 1 (c).
- [ ] **Step 4: Commit** — `fix: point the Japanese offline guide's Mac dictation problems to the new guide`.

### Task 3: Docs and full verification

**Files:**
- Modify: `README.md` (Last-updated constants table row; one paragraph under "How the site copy is assembled" about the Japanese-only guide and the `fieldTest` gate)

- [ ] **Step 1:** Edit README.
- [ ] **Step 2:** Run the deploy checks that do not need network writes: `node scripts/generate-site.mjs`, `node scripts/check-public-output.mjs`, `node scripts/check-web-attribution.mjs`, `node scripts/check-product-film.mjs`, `node scripts/check-asset-version.mjs`, `node scripts/check-cloud-fast-checkout.mjs`, `node scripts/check-local-checkout.mjs`, `node scripts/check-release-payload-sync.mjs`, `npm test`.
- [ ] **Step 3:** Render the page with headless Chrome at 390×844 and 1440×900 from a local static server and look at both screenshots (no horizontal overflow, headings readable, trial panel intact).
- [ ] **Step 4: Commit** — `docs: record the Japanese troubleshooting guide and its date constant`.

### Task 4 (after the founder's field test): add first-hand results

- [ ] Fill `fieldTest` (environment line: macOS version, Mac model, date; one row per checklist item), replace `environment` with the tested environment, bump `JA_MAC_DICTATION_TROUBLESHOOTING_LASTMOD`, add verified command/app facts to the relevant symptom sections, and extend test (b) so the field-test section must exist.
- [ ] Re-run Task 3 Step 2 and Step 3, then deploy (push to `main`), verify the live page, and request indexing in Search Console only with the founder's go-ahead.
