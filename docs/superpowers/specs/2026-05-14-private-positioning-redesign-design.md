# Private-positioning redesign — 2026-05-14

## Why

The site currently leads with "Dictate as fast as you *think*." This contradicts the product: Dictivo runs the speech model on-device, which is inherently not faster than cloud transcription. Speed is also the dimension on which cloud competitors (Otter, Whisper API, Granola) will always win.

The defensible position is private / on-device / auditable. The redesign makes that the primary value proposition end-to-end: copy, page order, visual hierarchy, and product framing.

Alongside the repositioning, the screenshots show structural asymmetry on most sections (hero right-half empty under a scrim, embedded product preview left column under-filled, FAQ stuck to the left edge, privacy section uneven columns). Those are fixed as part of the same pass.

## Out of scope

- New product features (Dictivo app itself)
- Framework / build-tool changes (stay on plain HTML + one CSS + one JS)
- New page types (kept: index, security, changelog; no blog, no docs site)
- Mobile-first redesign (existing responsive rules preserved; only fix what breaks)

## Positioning shift

| Dimension | Before | After |
|---|---|---|
| Hero promise | "Dictate as fast as you think" | "Dictation that never leaves your device" |
| Italic emphasis | *think* | *never* |
| First fact strip | Price · Platforms · Trial | On-device 100% · Audio uploads None · Trial 14d |
| Trust position | Section #5 (buried) | Section #2 (right after hero) |
| Speed framing inside product | "Fast / Medium" toggle visible | Renamed "Standard / Accurate"; both labelled on-device |
| FAQ ownership of speed tradeoff | Absent | New Q07 "Why isn't it faster than cloud transcription?" owns the answer |

## Page order (final)

```
1. Hero                       (dark)
2. What runs locally          (dark)  ← was #5
3. Embedded product           (dark)
4. Pricing                    (light)
5. Downloads                  (light)
6. Signed & verified strip    (light) ← NEW
7. Distribution               (light)
8. FAQ                        (light)
```

Top half (dark) is "the product itself"; bottom half (light) is "commerce and process." The light/dark switch happens exactly once.

## Section-by-section spec

### 1. Hero (rewritten)

- Two-column grid: `7fr · 5fr` on desktop, stacked on tablet
- **Left column**
  - Eyebrow: `PUBLIC BETA · v0.2.0` (unchanged)
  - H1: `Dictation that <em>never</em> leaves your device.`
  - Lede: "Dictivo runs the speech engine on your Mac or Windows PC. No cloud transcription, no audio uploads, no account required. Start the 14-day free trial."
  - CTA pair: `Start trial — Mac` (lime button) + `Start trial — Windows` (outline button); keystroke `⌘ Shift D` stays.
  - Fineprint: unchanged
  - Release strip (new content, same DOM):
    - `On-device` → `100%`
    - `Audio uploads` → `None`
    - `Trial` → `14 days, no card`
- **Right column**
  - Framed card: dark surface, 1px low-alpha border, large rounded corners
  - Top-left of card: small badge `● on-device` (lime dot, mono caption)
  - Image: existing `04-dictation-transcript.png`, no scrim
  - Bottom caption inside card: `UI v1.0 · captured locally`
- Remove the full-bleed `hero-media` + `hero-scrim` pair (they exist only to dim a now-visible asset)

### 2. What runs locally (NEW position, expanded content)

- Section background: dark, same band style as hero
- Kicker: `TRUST POSITION`
- H2: `What runs locally — and what doesn't.`
- Lede: "A paid product should make trust obvious before the first install. Here is the entire network surface."
- Two columns of equal height:
  - **Stays on device** (lime dot list)
    - The speech engine
    - Raw microphone audio
    - Transcripts
    - History and dictionary
    - Settings and license cache
  - **Leaves the device** (neutral dot list)
    - License activation check
    - Update manifest fetch
    - That's the entire list.
- Closing line below the columns: "Full detail on the [security page](/security)."

### 3. Embedded product (restructured)

- Section heading unchanged in copy except: change "before you install" emphasis to keep the `<em>before</em>` pattern.
- Demo controls left column (new content order):
  1. Tab list (4 tabs)
  2. `demo-label` (kicker)
  3. `demoTitle` (H3)
  4. `demoDescription` (paragraph)
  5. **NEW**: `demo-points` — `<ul>` of 3 bullets, content swapped per tab
  6. **NEW**: caption below: `Standard & Accurate · both run on-device`
- Demo screen right column unchanged structurally; remove the green left-bleed border from `.product-shell`
- Tab content map (drives `site.js`):
  | Tab | Title | Bullets |
  |---|---|---|
  | dictation | Capture speech into clean text. | Live transcript pinned to your work surface · Visible recording state with audio meter · Switch Standard ↔ Accurate without losing audio |
  | tiers (Setup) | Onboard without a sign-up. | Pick your engine size during onboarding · Test the microphone before the first dictation · No account creation, no email collection |
  | history | Every transcript stays searchable. | Searchable archive of every transcript · Tagged with date, duration, engine used · Delete one entry or wipe everything in one click |
  | privacy | See exactly what's on disk. | Inspect every file Dictivo writes to disk · One-click reveal of every outbound request · Export or destroy local data anytime |

### 4. Pricing (light copy edit only)

- No structural changes
- Personal tier subhead changed to: "For one writer who wants Dictivo on every machine they own."
- Trial bullet list: replace "All on-device engines" with "Standard and Accurate engines"
- No "Recommended" pill — the dark CTA on Personal is sufficient hierarchy

### 5. Downloads (light copy edit only)

- "Recommended" pill on macOS card: re-color to use the new neutral-dark accent instead of lime (lime is now reserved for trust signals)
- Otherwise unchanged

### 6. Signed & verified strip (NEW)

- Light background, narrow band (single row, ~120px tall)
- Three columns, equal width:
  - `macOS` — "Notarized DMG. Apple Developer ID signed."
  - `Windows` — "Authenticode-signed EXE and MSI."
  - `Channel` — "Served from `downloads.dictivo.app` (Cloudflare R2)."
- Trailing link: `Read the security page →`

### 7. Distribution (unchanged)

No content or structural changes.

### 8. FAQ

- Container fix: add `.section-shell` (max-width + horizontal padding) so it stops bleeding to the left edge.
- Add Q07:
  - Q: "Why isn't it faster than a cloud transcription service?"
  - A: "Because the speech model runs on your device. That trade is the whole point of Dictivo — you give up a small amount of latency in exchange for never sending your voice off the machine. Standard mode runs near-realtime for drafting; Accurate mode takes a little longer for clean exports."

## Visual system updates

### Accent color semantic split

| Color | Was used for | Now used for |
|---|---|---|
| Lime `#c4f24f` (existing) | brand mark, active tabs, CTA, "Recommended" pill | **Trust signals only** — on-device badge, "Stays on device" dot, security page link, brand mark |
| White → black solid | not used as CTA | New CTA color for `Start trial — Mac` and tier buttons |
| Orange kicker | section eyebrows | unchanged |
| Neutral mid-grey (new token) | n/a | "Leaves the device" dot, signed strip iconography |

This restores lime as a high-signal color rather than a generic brand color. Hero CTA may keep lime as it directly drives trial start — the call here is to keep lime on hero CTA but remove it from the active-tab background (use white outline instead).

### Container shell

Introduce `.section-shell`:

```css
.section-shell {
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: clamp(1.5rem, 5vw, 4rem);
}
```

Apply to: `.faq-section`, the new `.trust-section`, `.signed-strip`. Existing sections already have equivalent rules; this is for the new ones and for FAQ where it's missing.

### Italics pattern

Keep "Instrument Serif italic on the rhetorical word" rule:
- Hero H1: italic on **never**
- Trust H2: italic on **doesn't** (paired with "runs locally")
- Privacy entry (old privacy section, now reframed as security teaser): italic on **before**
- FAQ H2: italic on **before** (kept)

### Section background rhythm

Existing dark→light interleave becomes: `dark dark dark | light light light light light`. The single transition happens between section 3 (product) and section 4 (pricing). One transition is calmer than the current four.

## Files affected

| File | Change |
|---|---|
| `index.html` | Major rewrite — hero, trust section moved, signed strip added, FAQ container, copy throughout |
| `assets/site.css` | Hero grid, trust columns, product-shell left-border fix, signed-strip styles, FAQ container, accent color reassignment |
| `assets/site.js` | Tab content map expanded with bullets; copy strings updated to Standard/Accurate |
| `security.html` | Title and meta description aligned to "private on-device dictation" wording; no structural change |
| `changelog.html` | Header tagline aligned; no structural change |
| `downloads.json` | No change unless wording references "fast" |
| `_redirects`, `_headers`, `robots.txt`, `sitemap.xml`, `wrangler.toml`, `scripts/` | No change |

## Acceptance criteria

1. No occurrence of "as fast as you think" remains in any HTML file.
2. Hero right column shows a framed product screenshot with a visible on-device badge on desktop widths ≥ 960px.
3. Privacy / trust appears as section #2; old `.privacy-section` no longer exists OR has been replaced with a shorter "security page teaser" later in the page.
4. Section 1, 2, 3 share the dark background; sections 4–8 share the light background.
5. FAQ section content does not touch the left viewport edge at any width.
6. Tab buttons in embedded product use white-outline active state, not lime fill. Lime appears only on: brand mark, on-device badges, trust dots, hero CTA.
7. The string "Fast" appears nowhere as a mode label; "Standard / Accurate" appears in product preview copy and pricing trial bullets.
8. FAQ has at least 7 entries with the new Q07 about cloud latency tradeoff.
9. Signed & verified strip exists between Downloads and Distribution sections.
10. Page validates (no broken anchors; all `href="#..."` targets exist).
