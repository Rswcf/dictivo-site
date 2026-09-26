# Japanese "Mac dictation not working" guide — design

Date: 2026-09-26. Status: design approved by the founder in chat; the founder is running the
field test in parallel. The founder also confirmed it as the only new page allowed during the
six-week acquisition plan that started the same day; every other change goes to existing pages. Evidence (search data, SERP sample, Bing results) lives in the desktop
repository's `docs/research/2026-09-26-seo-traffic/`, not here, because this repository is public.

## Goal

A single Japanese troubleshooting page for people whose built-in macOS dictation is not working.
It is a traffic pilot: it answers an informational need honestly and mentions Dictivo only at the
end, with disclosure. It is not a product landing page.

## Page

- URL: `/ja/guides/mac-dictation-not-working/`. Japanese only.
- `<title>`: `Macで音声入力できないときの直し方｜症状別の確認手順`. H1: `Macで音声入力できないときの直し方`.
- Head: canonical to itself, `hreflang="ja"` to itself, **no** `x-default` and no other alternates
  (the route builder skips pages with fewer than two alternates, so locale routing is unaffected).
- Language menu: Japanese → this page; every other language → that language's homepage.
- Visible "確認した環境" line under the date. Until the field test is merged it says the page is
  based on Apple's Japanese documentation for macOS Tahoe 26 and macOS 27.
- Schema: `TechArticle` (`inLanguage: "ja"`, `dateModified`, Organization author/publisher),
  `FAQPage`, `BreadcrumbList`. No `HowTo`.
- Sitemap entry with `lastmod` from a new `JA_MAC_DICTATION_TROUBLESHOOTING_LASTMOD` constant.

## Content order

1. **First 60 characters answer the question**: check that 音声入力 is on, that the right
   マイクの入力元 is selected, and that 音声コントロール is off.
2. Symptom sections, in the order the Japanese results show them:
   マイクのアイコンは出るのに文字が入らない → ショートカットを押しても何も起きない →
   話している途中で止まる → 句読点や改行が入らない → 別の言語で入力される →
   特定のアプリだけで使えない → 勝手に起動する・オフにしたい → それでも直らないとき.
3. `標準の音声入力で解決しないとき`: states that Dictivo is 当サイトの製品, that it works
   independently of the macOS dictation settings, and that it cannot help when the Mac does not
   detect the microphone at all. Followed by the existing `renderGuideTrial("ja", "macos", …)`
   panel with its own `utm_content`.
4. FAQ, then official references.

## Facts discipline

Only these may appear before the field test, each backed by Apple's (or Google's) Japanese
documentation listed in the references:

- Settings path and labels: アップルメニュー > システム設定 > キーボード > 音声入力 (on/off,
  ショートカット, カスタマイズ, 言語 > 編集, マイクの入力元, 自動句読点); 編集 > 音声入力を開始.
- Pressing the mic key starts dictation; holding it starts Siri.
- When 音声コントロール is on (システム設定 > アクセシビリティ > 音声コントロール), standard
  macOS dictation cannot be used.
- No length limit or timeout; dictation stops after 30 seconds without speech.
- 次の行 / 次の段落 for line breaks, shown when dictation finishes; punctuation by name.
- Japanese (Japan) is listed for on-device modeless dictation and for automatic punctuation.
- Whether audio is processed on the device is stated under 音声入力 in キーボード settings; an
  internet connection may be required otherwise.
- Apple's troubleshooting list: correct language, shortcut, microphone, input volume in
  サウンド > 入力, microphone not covered, quiet room.
- Google Docs voice typing is at ツール > 音声入力 and works in current Chrome, Edge and Safari.

Must **not** appear until the founder's field test supplies it: what 「まる」「てん」「かいぎょう」
produce, how macOS dictation behaves inside Word, Google Docs, ChatGPT or Notes, and any
microphone-location claim. The page carries an optional `fieldTest` block; when it is empty the
section is not rendered. Placeholders never reach `dist/`.

## Cannibalization

The existing `/ja/guides/offline-dictation-on-mac/` keeps its comparison intent. Its
troubleshooting section is renamed to `Dictivoで入力できないとき`, keeps the Dictivo-specific
bullets, and gains a link to the new page for built-in dictation problems. Its table of contents
label follows the rename. Nothing else on that page changes.

## Internal links

- Japanese footer on every page (`renderHomeFooterLinks` for `ja`).
- The renamed section of the Japanese offline guide.
- `ja/llms.txt` pages list.

## Measurement and exit rule

T0 is the production deploy. Request indexing for the URL in Google Search Console only with the
founder's go-ahead. At T+28 read page-level impressions and the position of the できない query
family. At least 100 impressions with the main query in the top 20: repeat the pattern in German.
Fewer than 30 impressions: revise or remove. In between: keep observing for another 28 days.

## Tests

A new `tests/ja-mac-dictation-troubleshooting.test.mjs` checks the built page: one H1, `lang="ja"`,
canonical, only a `ja` alternate, sitemap entry and date agreement, FAQ schema parses, the answer
appears before the first symptom section, the disclosure is present, no `FILL_IN`, no unverified
command words, footer and offline-guide links reach the page, and the download panel carries the
new `utm_content`. The existing test suite and deploy checks must keep passing.
