import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { COMPARE_HUB, COMPARE_LAST_UPDATED, COMPARE_NAV_LINKS, COMPARE_PAGES, COMPARE_SOURCE_CHECK_DATE } from "../data/compare-pages.mjs";
import { BASE_URL, HOME_COPY, LOCALES } from "../data/site-content.mjs";

const root = resolve(new URL("..", import.meta.url).pathname);
const release = JSON.parse(readFileSync(resolve(root, "data/release.json"), "utf8"));

function html(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function attr(value) {
  return html(value).replaceAll("'", "&#39;");
}

function localeByCode(code) {
  const locale = LOCALES.find((item) => item.code === code);
  if (!locale) throw new Error(`Unknown locale: ${code}`);
  return locale;
}

function absoluteUrl(path) {
  return new URL(path, BASE_URL).toString();
}

function comparePath(slug = "") {
  return slug ? `/compare/${slug}` : "/compare";
}

function localePath(code, fragment = "") {
  const locale = localeByCode(code);
  return `${locale.path}${fragment}`;
}

function localeUrl(code) {
  return absoluteUrl(localeByCode(code).path);
}

function assetTags() {
  return `
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
    <link rel="preload" as="image" href="/assets/dictivo-demo-poster.jpg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
    />
    <link rel="stylesheet" href="/assets/site.css?v=local" />
    <script src="/assets/site.js?v=local" defer></script>`;
}

function hreflangTags(currentCode) {
  const alternates = LOCALES.map(
    (locale) => `<link rel="alternate" hreflang="${attr(locale.htmlLang)}" href="${attr(localeUrl(locale.code))}" />`,
  );
  alternates.push(`<link rel="alternate" hreflang="x-default" href="${attr(localeUrl("en"))}" />`);
  alternates.push(`<link rel="canonical" href="${attr(localeUrl(currentCode))}" />`);
  return alternates.join("\n    ");
}

function renderLanguageMenu(currentCode, t) {
  const current = localeByCode(currentCode);
  const links = LOCALES.map((locale) => {
    const active = locale.code === currentCode ? ' aria-current="page"' : "";
    return `<a href="${attr(locale.path)}" lang="${attr(locale.htmlLang)}" hreflang="${attr(locale.htmlLang)}"${active}>
              <span>${html(locale.nativeName)}</span>
              <small>${html(locale.name)}</small>
            </a>`;
  }).join("\n");

  return `<details class="language-menu">
            <summary aria-label="${attr(t.language.aria)}">
              <span class="language-label">${html(t.language.label)}</span>
              <strong>${html(current.nativeName)}</strong>
            </summary>
            <div class="language-menu-panel">
              ${links}
            </div>
          </details>`;
}

function renderHeader(currentCode, t) {
  const hash = (id) => localePath(currentCode, `#${id}`);
  return `<header class="site-header" aria-label="Primary navigation">
      <a class="brand" href="${attr(localePath(currentCode))}" aria-label="Dictivo home">
        <span class="brand-mark" aria-hidden="true">D</span>
        <span class="brand-name">Dictivo</span>
      </a>
      <nav class="nav-links" aria-label="Site navigation">
        <a href="${attr(hash("privacy"))}">${html(t.nav.privacy)}</a>
        <a href="${attr(hash("cloud-fast"))}">${html(t.nav.cloudFast)}</a>
        <a href="${attr(hash("pricing"))}">${html(t.nav.pricing)}</a>
        <a href="${attr(hash("faq"))}">${html(t.nav.faq)}</a>
        <a href="${attr(hash("downloads"))}">${html(t.nav.downloads)}</a>
      </nav>
      <div class="header-actions">
        ${renderLanguageMenu(currentCode, t)}
        <a class="header-download" href="${attr(hash("downloads"))}">${html(t.nav.download)}</a>
      </div>
    </header>`;
}

function renderList(items, className = "tier-features") {
  return `<ul class="${attr(className)}">
${items.map((item) => `                <li>${html(item)}</li>`).join("\n")}
              </ul>`;
}

function renderTier(tier, index) {
  const classes = index === 1 ? "tier tier--highlight" : "tier";
  const buttonClass = index === 1 ? "button button-dark" : "button button-secondary";
  const href = index === 0 ? "/download/mac" : index === 1 ? "/checkout/local" : "/checkout/cloud-fast";
  const data = index === 0 ? ' data-platform="macos"' : index === 1 ? " data-local-checkout" : " data-cloud-fast-checkout";
  return `<article class="${classes}" role="listitem" data-od-id="${index === 0 ? "tier-free" : index === 1 ? "tier-local" : "tier-cloud-fast"}">
              <h3 class="tier-name">${html(tier.name)}</h3>
              <p class="tier-sub">${html(tier.sub)}</p>
              <p class="tier-price">${html(tier.price)}<small>${html(tier.small)}</small></p>
              ${renderList(tier.features)}
              <a class="${buttonClass}" href="${href}"${data}>${html(tier.button)}</a>
            </article>`;
}

function renderSchema(currentCode, t) {
  const pageUrl = localeUrl(currentCode);
  const faqEntities = t.faq.items.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  }));

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Dictivo",
      url: BASE_URL,
      email: "support@dictivo.app",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Dictivo",
      applicationCategory: "BusinessApplication",
      operatingSystem: "macOS",
      url: pageUrl,
      downloadUrl: `${BASE_URL}/download/mac`,
      softwareVersion: release.version,
      description: t.metaDescription,
      offers: [
        { "@type": "Offer", name: "Free Local", price: "0", priceCurrency: "USD" },
        { "@type": "Offer", name: "Dictivo Local", price: "49", priceCurrency: "USD" },
        {
          "@type": "Offer",
          name: "Cloud Fast",
          price: "6.99",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "6.99",
            priceCurrency: "USD",
            billingDuration: "P1M",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqEntities,
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Dictivo product demo",
      description: t.metaDescription,
      thumbnailUrl: `${BASE_URL}/assets/dictivo-demo-poster.jpg`,
      uploadDate: "2026-05-21",
      duration: "PT1M16S",
      contentUrl: `${BASE_URL}/assets/dictivo-cinematic-demo.mp4`,
      embedUrl: `${pageUrl}#demo-video`,
    },
  ];

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function renderCompareSchema(page) {
  const pageUrl = absoluteUrl(comparePath(page.slug));
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Dictivo",
      applicationCategory: "BusinessApplication",
      operatingSystem: "macOS",
      url: BASE_URL,
      downloadUrl: `${BASE_URL}/download/mac`,
      softwareVersion: release.version,
      description:
        "Private-first Mac dictation with on-device Local mode, optional Cloud Fast, local history, dictionary, and snippets.",
      offers: {
        "@type": "Offer",
        name: "Dictivo Local",
        price: "49",
        priceCurrency: "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Compare", item: absoluteUrl(comparePath()) },
        { "@type": "ListItem", position: 3, name: `${page.competitor} alternative`, item: pageUrl },
      ],
    },
  ];

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function renderCompareSourceComment(page) {
  const sourceLines = page.sources.map((source) => `  - ${source}`).join("\n");
  return `<!--
Comparison facts re-verified on ${COMPARE_SOURCE_CHECK_DATE}.
Price/trial/privacy sources:
${sourceLines}
-->`;
}

function renderCompareBullets(items, className = "compare-bullets") {
  if (!items?.length) return "";
  return `<ul class="${attr(className)}">
${items.map((item) => `              <li>${html(item)}</li>`).join("\n")}
            </ul>`;
}

function renderCompareSection(section, index) {
  const id = `compare-section-${index + 1}`;
  const paragraphs = (section.paragraphs || []).map((paragraph) => `<p>${html(paragraph)}</p>`).join("\n            ");
  const bullets = renderCompareBullets(section.bullets || []);
  const cards = section.cards?.length
    ? `<div class="compare-choice-grid">
${section.cards
  .map(
    (card) => `              <article class="compare-choice-card">
                <h3>${html(card.title)}</h3>
                ${renderCompareBullets(card.items, "compare-bullets compare-bullets--compact")}
              </article>`,
  )
  .join("\n")}
            </div>`
    : "";

  return `<section class="compare-section" id="${attr(id)}" aria-labelledby="${attr(`${id}-title`)}">
            <p class="doc-meta">${html(section.kicker)}</p>
            <h2 id="${attr(`${id}-title`)}">${html(section.title)}</h2>
            ${paragraphs}
            ${bullets}
            ${cards}
          </section>`;
}

function renderCompareQuickTake(page) {
  return `<div class="compare-quick-take" aria-label="Quick comparison">
${page.quickTake
  .map(
    ([label, dictivo, competitor]) => `          <article>
            <span>${html(label)}</span>
            <strong>${html(dictivo)}</strong>
            <p>${html(page.competitor)}: ${html(competitor)}</p>
          </article>`,
  )
  .join("\n")}
        </div>`;
}

function renderCompareTable(page) {
  return `<div class="compare-table-wrap">
            <table class="compare-table">
              <caption>${html(page.competitor)} vs Dictivo at a glance</caption>
              <thead>
                <tr>
                  <th scope="col">Question</th>
                  <th scope="col">Dictivo</th>
                  <th scope="col">${html(page.competitor)}</th>
                </tr>
              </thead>
              <tbody>
${page.rows
  .map(
    (row) => `                <tr>
                  <th scope="row">${html(row.label)}</th>
                  <td>${html(row.dictivo)}</td>
                  <td>${html(row.competitor)}</td>
                </tr>`,
  )
  .join("\n")}
              </tbody>
            </table>
          </div>`;
}

function relatedComparePages(page) {
  return page.related.map((slug) => {
    const related = COMPARE_PAGES.find((item) => item.slug === slug);
    if (!related) throw new Error(`Unknown related comparison page: ${slug}`);
    return related;
  });
}

function renderCompareLinks(page) {
  const relatedLinks = relatedComparePages(page)
    .map(
      (related) =>
        `<a href="${attr(comparePath(related.slug))}">See how Dictivo compares to ${html(related.competitor)}</a>`,
    )
    .join("\n              ");

  return `<nav class="compare-resource-links" aria-label="Comparison next steps">
              <a href="/#pricing">Compare Dictivo pricing and plans</a>
              <a href="/security">Read where Dictivo data lives</a>
              ${relatedLinks}
            </nav>`;
}

function renderCompareFaq(page) {
  return `<section class="compare-section compare-faq-section" id="faq" aria-labelledby="compare-faq-title">
            <p class="doc-meta">FAQ</p>
            <h2 id="compare-faq-title">Frequently asked questions</h2>
            <div class="compare-faq-list">
${page.faqs
  .map(
    ([question, answer], index) => `              <details class="faq-item">
                <summary>
                  <span class="faq-index">${String(index + 1).padStart(2, "0")}</span>
                  <span class="faq-question">${html(question)}</span>
                  <span class="faq-toggle" aria-hidden="true">+</span>
                </summary>
                <div class="faq-answer">
                  <p class="faq-answer-body">${html(answer)}</p>
                </div>
              </details>`,
  )
  .join("\n")}
            </div>
          </section>`;
}

function sourceLabel(source) {
  try {
    const url = new URL(source);
    const path = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "");
    return `${url.hostname.replace(/^www\./, "")}${path}`;
  } catch {
    return source;
  }
}

function renderCompareSources(page) {
  return `<section class="compare-section compare-source-section" aria-labelledby="compare-sources-title">
            <p class="doc-meta">Sources checked</p>
            <h2 id="compare-sources-title">Facts re-checked on ${html(COMPARE_SOURCE_CHECK_DATE)}</h2>
            <p>Pricing, trial, platform, and privacy claims change. These comparison notes were checked against the official product pages and support documents below.</p>
            <ul class="compare-source-list">
${page.sources.map((source) => `              <li><a href="${attr(source)}" rel="nofollow noopener">${html(sourceLabel(source))}</a></li>`).join("\n")}
            </ul>
          </section>`;
}

function renderCompareCta(page) {
  return `<section class="compare-cta" aria-labelledby="compare-cta-title">
            <div>
              <p class="doc-meta">Try Dictivo</p>
              <h2 id="compare-cta-title">Try Dictivo free for 14 days.</h2>
              <p>Every local model unlocked, no Dictivo account for Local mode. Buy Local for $49 once if it fits your workflow.</p>
            </div>
            <div class="compare-cta-actions">
              <a class="button button-light download-link" href="/download/mac" data-platform="macos">Try Dictivo free for 14 days</a>
              <a class="button button-outline" href="/#pricing">See pricing</a>
            </div>
            ${renderCompareLinks(page)}
          </section>`;
}

function renderComparePage(page) {
  const canonical = absoluteUrl(comparePath(page.slug));
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${html(page.title)}</title>
    <meta name="description" content="${attr(page.metaDescription)}" />
    <meta name="theme-color" content="#0a1110" />
    <meta property="og:title" content="${attr(page.title)}" />
    <meta property="og:description" content="${attr(page.metaDescription)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${attr(canonical)}" />
    <meta property="og:image" content="${BASE_URL}/assets/dictivo-demo-poster.jpg" />
    <link rel="canonical" href="${attr(canonical)}" />
    ${assetTags()}
    ${renderCompareSchema(page)}
  </head>
  <body>
    ${renderCompareSourceComment(page)}
    <a class="skip-link" href="#comparison">Skip to comparison</a>
    ${renderHeader("en", HOME_COPY.en)}
    <main class="compare-page" id="comparison">
      <section class="compare-hero" aria-labelledby="compare-title">
        <span class="doc-eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>${html(page.eyebrow)}</span>
        <p class="compare-updated">Last updated: <time datetime="${COMPARE_LAST_UPDATED.iso}">${html(COMPARE_LAST_UPDATED.label)}</time></p>
        <h1 id="compare-title">${html(page.h1)}</h1>
        <p class="doc-lede">${html(page.intro.join(" "))}</p>
        ${renderCompareQuickTake(page)}
      </section>

      <section class="compare-section compare-table-section" aria-labelledby="at-a-glance">
        <p class="doc-meta">At a glance</p>
        <h2 id="at-a-glance">${html(page.competitor)} vs Dictivo at a glance</h2>
        ${renderCompareTable(page)}
      </section>

      ${page.sections.map(renderCompareSection).join("\n\n      ")}

      ${renderCompareFaq(page)}

      ${renderCompareSources(page)}

      ${renderCompareCta(page)}
    </main>
    ${renderFooterOnly()}
  </body>
</html>
`;
}

function renderCompareHubSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: COMPARE_HUB.title,
    url: absoluteUrl(comparePath()),
    hasPart: COMPARE_PAGES.map((page) => ({
      "@type": "WebPage",
      name: page.title,
      url: absoluteUrl(comparePath(page.slug)),
    })),
  };

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function renderCompareHub() {
  const canonical = absoluteUrl(comparePath());
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${html(COMPARE_HUB.metaTitle)}</title>
    <meta name="description" content="${attr(COMPARE_HUB.metaDescription)}" />
    <meta name="theme-color" content="#0a1110" />
    <meta property="og:title" content="${attr(COMPARE_HUB.metaTitle)}" />
    <meta property="og:description" content="${attr(COMPARE_HUB.metaDescription)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${attr(canonical)}" />
    <meta property="og:image" content="${BASE_URL}/assets/dictivo-demo-poster.jpg" />
    <link rel="canonical" href="${attr(canonical)}" />
    ${assetTags()}
    ${renderCompareHubSchema()}
  </head>
  <body>
    <a class="skip-link" href="#compare-hub">Skip to comparisons</a>
    ${renderHeader("en", HOME_COPY.en)}
    <main class="compare-page compare-hub" id="compare-hub">
      <section class="compare-hero" aria-labelledby="compare-hub-title">
        <span class="doc-eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>Comparison hub</span>
        <p class="compare-updated">Last updated: <time datetime="${COMPARE_LAST_UPDATED.iso}">${html(COMPARE_LAST_UPDATED.label)}</time></p>
        <h1 id="compare-hub-title">${html(COMPARE_HUB.h1)}</h1>
        <p class="doc-lede">${html(COMPARE_HUB.lede)}</p>
      </section>

      <section class="compare-hub-grid" aria-label="Dictivo comparison pages">
${COMPARE_PAGES.map(
  (page) => `        <article class="compare-hub-card">
          <span>${html(page.primaryKeyword)}</span>
          <h2>${html(page.competitor)} alternative</h2>
          <p>${html(page.intro[1])}</p>
          <a class="button-link" href="${attr(comparePath(page.slug))}">Compare Dictivo with ${html(page.competitor)}</a>
        </article>`,
).join("\n")}
      </section>
    </main>
    ${renderFooterOnly()}
  </body>
</html>
`;
}

function renderCompareTeaser() {
  return `<section class="compare-teaser reveal" id="compare" aria-labelledby="compare-teaser-title">
        <div class="section-shell">
          <div class="section-heading section-heading-left">
            <span class="section-kicker"><span class="eyebrow-dot eyebrow-dot--info" aria-hidden="true"></span>Compare</span>
            <h2 id="compare-teaser-title">Choosing against another dictation app?</h2>
            <p>Compare Dictivo with the tools people usually evaluate first: cloud dictation, local mode systems, file transcription apps, low-cost public-code tools, and Apple's built-in Dictation.</p>
          </div>
          <div class="compare-teaser-grid">
${COMPARE_NAV_LINKS.map(
  (link) => `            <a href="${attr(link.href)}">
              <span>${html(link.competitor)}</span>
              <strong>${html(link.title)}</strong>
            </a>`,
).join("\n")}
          </div>
        </div>
      </section>`;
}

function renderCompareFooterLinks() {
  return `<a href="/compare">Compare alternatives</a>
        ${COMPARE_NAV_LINKS.map((link) => `<a href="${attr(link.href)}">${html(link.competitor)} alternative</a>`).join("\n        ")}`;
}

function renderHomeFooterLinks(currentCode, t) {
  const links = [
    `<a href="${attr(localePath(currentCode, "#privacy"))}">${html(t.nav.privacy)}</a>`,
    `<a href="${attr(localePath(currentCode, "#pricing"))}">${html(t.nav.pricing)}</a>`,
    `<a href="${attr(localePath(currentCode, "#cloud-fast"))}">${html(t.nav.cloudFast)}</a>`,
    `<a href="${attr(localePath(currentCode, "#downloads"))}">${html(t.nav.downloads)}</a>`,
    currentCode === "en" ? renderCompareFooterLinks() : "",
    `<a href="/changelog">Changelog</a>`,
    `<a href="/security">Security</a>`,
    `<a href="mailto:support@dictivo.app">support@dictivo.app</a>`,
  ].filter(Boolean);
  return links.map((link) => `        ${link}`).join("\n");
}

function renderHome(currentCode) {
  const locale = localeByCode(currentCode);
  const t = HOME_COPY[currentCode];
  if (!t) throw new Error(`Missing home copy for locale ${currentCode}`);
  const compareTeaser = currentCode === "en" ? `${renderCompareTeaser()}\n\n` : "";

  const languagePills = LOCALES.map(
    (item) => `<a href="${attr(item.path)}" lang="${attr(item.htmlLang)}" hreflang="${attr(item.htmlLang)}">${html(item.nativeName)}</a>`,
  ).join("\n                ");

  return `<!doctype html>
<html lang="${attr(locale.htmlLang)}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${html(t.metaTitle)}</title>
    <meta name="description" content="${attr(t.metaDescription)}" />
    <meta name="theme-color" content="#0a1110" />
    <meta property="og:title" content="${attr(t.hero.title)}" />
    <meta property="og:description" content="${attr(t.metaDescription)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${attr(localeUrl(currentCode))}" />
    <meta property="og:image" content="${BASE_URL}/assets/dictivo-demo-poster.jpg" />
    ${hreflangTags(currentCode)}
    ${assetTags()}
    ${renderSchema(currentCode, t)}
  </head>
  <body>
    <a class="skip-link" href="#downloads">${html(t.skip)}</a>

    ${renderHeader(currentCode, t)}

    <main>
      <section class="hero hero--film" id="demo" aria-labelledby="hero-title">
        <div class="hero-inner">
          <div class="hero-copy">
            <div class="hero-statement">
              <span class="eyebrow">
                <span class="eyebrow-dot" aria-hidden="true"></span>
                ${html(t.hero.eyebrow)}
              </span>
              <h1 id="hero-title">${html(t.hero.title)} <em>${html(t.hero.emphasis)}</em></h1>
            </div>
          </div>

          <figure class="hero-film" id="demo-video">
            <button class="hero-video-poster" type="button" aria-label="${attr(t.hero.play)}">
              <img src="/assets/dictivo-demo-poster.jpg" alt="${attr(t.hero.posterAlt)}" width="1920" height="1080" />
              <span class="hero-video-play">${html(t.hero.play)}</span>
            </button>
            <video controls preload="none" poster="/assets/dictivo-demo-poster.jpg" playsinline hidden data-src="/assets/dictivo-cinematic-demo.mp4">
              <track kind="captions" srclang="en" label="English" src="/assets/dictivo-cinematic-demo.en.vtt" default />
            </video>
          </figure>

          <div class="hero-support">
            <div class="hero-actions" aria-label="Download Dictivo">
              <a class="button button-light download-link" href="/download/mac" data-platform="macos">${html(t.hero.download)}</a>
              <a class="button button-outline" href="#pricing">${html(t.hero.pricing)}</a>
              <p class="hero-note">${html(t.hero.windows)}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="trust-section reveal" id="privacy" aria-labelledby="privacy-title">
        <div class="section-shell">
          <div class="section-heading section-heading-left trust-heading">
            <span class="section-kicker"><span class="eyebrow-dot" aria-hidden="true"></span>${html(t.privacy.kicker)}</span>
            <h2 id="privacy-title">${html(t.privacy.title)}</h2>
            <p>${html(t.privacy.body)}</p>
          </div>

          <div class="trust-grid">
            <article class="trust-column trust-column--local">
              <header class="trust-column-head">
                <span class="trust-tag trust-tag--local"><span class="trust-dot trust-dot--local" aria-hidden="true"></span>${html(t.privacy.localTitle)}</span>
                <p class="trust-column-lede">${html(t.privacy.localLead)}</p>
              </header>
              ${renderList(t.privacy.localItems, "trust-list")}
            </article>

            <article class="trust-column trust-column--network">
              <header class="trust-column-head">
                <span class="trust-tag trust-tag--network"><span class="trust-dot trust-dot--network" aria-hidden="true"></span>${html(t.privacy.cloudTitle)}</span>
                <p class="trust-column-lede">${html(t.privacy.cloudLead)}</p>
              </header>
              ${renderList(t.privacy.cloudItems, "trust-list trust-list--network")}
            </article>
          </div>

          <p class="trust-footnote"><a href="/security">${html(t.privacy.footnote)}</a></p>
        </div>
      </section>

      <section class="cloud-comparison reveal" id="cloud-fast" aria-labelledby="cloud-fast-title">
        <div class="section-shell">
          <div class="section-heading section-heading-left">
            <span class="section-kicker"><span class="eyebrow-dot" aria-hidden="true"></span>${html(t.cloud.kicker)}</span>
            <h2 id="cloud-fast-title">${html(t.cloud.title)}</h2>
            <p>${html(t.cloud.body)}</p>
          </div>

          <div class="cloud-mode-grid">
            <article class="cloud-mode-card">
              <div class="card-topline"><span>${html(t.cloud.localTop[0])}</span><span>${html(t.cloud.localTop[1])}</span></div>
              <h3>${html(t.cloud.localTitle)}</h3>
              ${renderList(t.cloud.localItems)}
              <a class="button button-secondary download-link" href="/download/mac" data-platform="macos">${html(t.hero.download)}</a>
            </article>

            <article class="cloud-mode-card cloud-mode-card--highlight">
              <div class="card-topline"><span>${html(t.cloud.cloudTop[0])}</span><span>${html(t.cloud.cloudTop[1])}</span></div>
              <h3>${html(t.cloud.cloudTitle)}</h3>
              ${renderList(t.cloud.cloudItems)}
              <a class="button button-light" href="/checkout/cloud-fast" data-cloud-fast-checkout>${html(t.cloud.cloudButton)}</a>
            </article>
          </div>
        </div>
      </section>

      <section class="pricing-section reveal" id="pricing" aria-labelledby="pricing-title">
        <div class="section-shell">
          <div class="pricing-head">
            <h2 id="pricing-title">${html(t.pricing.title)}</h2>
            <p>${html(t.pricing.body)}</p>
          </div>

          <div class="pricing-band" role="list">
            ${t.pricing.tiers.map(renderTier).join("\n")}
          </div>

          <p class="pricing-footnote">${html(t.pricing.footnote)}</p>
          <div class="checkout-pending" id="checkout-local-pending" tabindex="-1" role="status">
            <strong>${html(t.pricing.checkoutTitle)}</strong>
            <p>${html(t.pricing.checkoutBody)}</p>
          </div>
        </div>
      </section>

${compareTeaser}
      <section class="download-band reveal" id="downloads" aria-labelledby="downloads-title">
        <div class="section-shell">
          <div class="section-heading">
            <span class="section-kicker"><span class="eyebrow-dot" aria-hidden="true"></span>${html(t.downloads.kicker)}</span>
            <h2 id="downloads-title">${html(t.downloads.title)}</h2>
            <p>${html(t.downloads.body)}</p>
          </div>

          <div class="download-grid" aria-label="${attr(t.downloads.available)}">
            <article class="download-card" data-platform-card="macos">
              <div class="card-topline"><span>${html(t.downloads.macTop[0])}</span><span class="recommendation" data-recommendation="macos">${html(t.downloads.macTop[1])}</span></div>
              <h3>${html(t.downloads.macTitle)}</h3>
              <p>${html(t.downloads.macBody)}</p>
              <a class="button button-dark download-link" href="/download/mac" data-platform="macos">${html(t.downloads.macButton)}</a>
              <p class="download-note">${html(t.downloads.versionNote(release.version))}</p>
            </article>

            <article class="download-card" data-platform-card="windows">
              <div class="card-topline"><span>${html(t.downloads.windowsTop[0])}</span><span>${html(t.downloads.windowsTop[1])}</span></div>
              <h3>${html(t.downloads.windowsTitle)}</h3>
              <p>${html(t.downloads.windowsBody)}</p>
              <span class="download-status">${html(t.downloads.windowsStatus)}</span>
              <p class="download-note">${html(t.downloads.windowsNote)}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="signed-strip reveal" aria-labelledby="signed-title">
        <div class="section-shell">
          <div class="signed-head">
            <h2 id="signed-title">${html(t.signed.title)}</h2>
          </div>
          <div class="signed-grid">
            ${t.signed.cells
              .map(
                ([label, value]) => `<article class="signed-cell">
              <p class="signed-cell-label">${html(label)}</p>
              <p class="signed-cell-value">${html(value.replace("{version}", release.version))}</p>
            </article>`,
              )
              .join("\n")}
          </div>
          <p class="signed-footnote">${html(t.signed.footnote)}</p>
        </div>
      </section>

      <section class="channel-section language-section reveal" id="languages" aria-labelledby="languages-title">
        <div class="section-shell">
          <div class="section-heading section-heading-left">
            <span class="section-kicker"><span class="eyebrow-dot eyebrow-dot--info" aria-hidden="true"></span>${html(t.languages.kicker)}</span>
            <h2 id="languages-title">${html(t.languages.title)}</h2>
            <p>${html(t.languages.body)}</p>
          </div>
          <div class="locale-list" aria-label="${attr(t.language.label)}">
            ${languagePills}
          </div>
          <p class="language-note">${html(t.languages.note)}</p>
        </div>
      </section>

      <section class="cloud-flow reveal" id="workflow" aria-labelledby="workflow-title">
        <div class="section-shell">
          <div class="section-heading">
            <span class="section-kicker"><span class="eyebrow-dot eyebrow-dot--info" aria-hidden="true"></span>${html(t.workflow.kicker)}</span>
            <h2 id="workflow-title">${html(t.workflow.title)}</h2>
            <p>${html(t.workflow.body)}</p>
          </div>

          <ol class="cloud-steps">
            ${t.workflow.steps
              .map(
                ([number, title, body]) => `<li>
              <span>${html(number)}</span>
              <strong>${html(title)}</strong>
              <p>${html(body)}</p>
            </li>`,
              )
              .join("\n")}
          </ol>
        </div>
      </section>

      <section class="faq-section reveal" id="faq" aria-labelledby="faq-title">
        <div class="section-shell faq-shell">
          <div class="section-heading section-heading-left">
            <span class="section-kicker"><span class="eyebrow-dot" aria-hidden="true"></span>${html(t.faq.kicker)}</span>
            <h2 id="faq-title">${html(t.faq.title)}</h2>
            <p>${html(t.faq.body)}</p>
          </div>

          <div class="faq-grid">
            ${t.faq.items
              .map(
                ([question, answer], index) => `<details class="faq-item">
              <summary>
                <span class="faq-index">${String(index + 1).padStart(2, "0")}</span>
                <span class="faq-question">${html(question)}</span>
                <span class="faq-toggle" aria-hidden="true">+</span>
              </summary>
              <div class="faq-answer">
                <p class="faq-answer-body">${html(answer)}</p>
              </div>
            </details>`,
              )
              .join("\n")}
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-meta">
        <a class="brand footer-brand" href="${attr(localePath(currentCode))}" aria-label="Dictivo home">
          <span class="brand-mark" aria-hidden="true">D</span>
          <span class="brand-name">Dictivo</span>
        </a>
        <p class="footer-tagline">${html(t.footer.tagline)}</p>
        <p>${html(t.footer.beta)}</p>
      </div>
      <div class="footer-links">
${renderHomeFooterLinks(currentCode, t)}
      </div>
    </footer>
  </body>
</html>
`;
}

function renderDownloadsJson() {
  return `${JSON.stringify(
    {
      product: "Dictivo",
      domain: BASE_URL,
      downloadHost: "https://downloads.dictivo.app",
      version: release.version,
      channel: release.channel || "stable",
      updatedAt: release.updatedAt,
      artifacts: [
        {
          platform: "macos",
          label: "macOS Universal DMG",
          fileName: release.dmg.fileName,
          architecture: "Apple Silicon + Intel",
          url: release.dmg.url,
          redirect: `${BASE_URL}/download/mac`,
          sha256: release.dmg.sha256,
        },
        {
          platform: "windows",
          label: "Windows x64 EXE",
          fileName: "Dictivo-Windows-x64.exe",
          architecture: "x64",
          status: "coming-later",
          url: `${BASE_URL}/#downloads`,
          redirect: `${BASE_URL}/download/windows`,
        },
        {
          platform: "windows",
          label: "Windows x64 MSI",
          fileName: "Dictivo-Windows-x64.msi",
          architecture: "x64",
          status: "coming-later",
          url: `${BASE_URL}/#downloads`,
          redirect: `${BASE_URL}/download/windows-msi`,
        },
      ],
    },
    null,
    2,
  )}\n`;
}

function renderRedirects() {
  return `/cloud-fast /#cloud-fast 302
/cloud-fast.html /#cloud-fast 302
/download/mac ${release.dmg.url} 302
/download/windows /#downloads 302
/download/windows-msi /#downloads 302
/downloads/Dictivo-macOS-universal.dmg ${release.dmg.url} 302
/downloads/Dictivo-Windows-x64.exe /#downloads 302
/downloads/Dictivo-Windows-x64.msi /#downloads 302
/checkout/local https://dictivo.lemonsqueezy.com/checkout/buy/d4cb72ba-68a7-494f-a711-29993b2ea7a1 302
/checkout/cloud-fast https://dictivo.lemonsqueezy.com/checkout/buy/2a12baa1-2368-47ac-884b-0721f8b5484d 302
`;
}

function renderSitemap() {
  const alternates = LOCALES.map(
    (locale) => `    <xhtml:link rel="alternate" hreflang="${locale.htmlLang}" href="${localeUrl(locale.code)}" />`,
  ).join("\n");
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${localeUrl("en")}" />`;
  const homepageEntries = LOCALES.map(
    (locale) => `  <url>
    <loc>${localeUrl(locale.code)}</loc>
    <lastmod>${release.updatedAt}</lastmod>
${alternates}
${xDefault}
    <priority>${locale.code === "en" ? "1.0" : "0.9"}</priority>
  </url>`,
  ).join("\n");
  const compareEntries = [
    `  <url>
    <loc>${absoluteUrl(comparePath())}</loc>
    <lastmod>${COMPARE_LAST_UPDATED.iso}</lastmod>
    <priority>0.8</priority>
  </url>`,
    ...COMPARE_PAGES.map(
      (page) => `  <url>
    <loc>${absoluteUrl(comparePath(page.slug))}</loc>
    <lastmod>${COMPARE_LAST_UPDATED.iso}</lastmod>
    <priority>${page.slug === "wispr-flow-alternative" ? "0.8" : "0.7"}</priority>
  </url>`,
    ),
  ].join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${homepageEntries}
${compareEntries}
  <url>
    <loc>${BASE_URL}/changelog</loc>
    <lastmod>${release.updatedAt}</lastmod>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${BASE_URL}/security</loc>
    <lastmod>${release.updatedAt}</lastmod>
    <priority>0.6</priority>
  </url>
</urlset>
`;
}

function renderChangelog() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Changelog · Dictivo</title>
    <meta name="description" content="Release notes for Dictivo, the local-first dictation app with optional Cloud Fast." />
    <meta name="theme-color" content="#0a1110" />
    <meta property="og:title" content="Dictivo · Changelog" />
    <meta property="og:description" content="Release notes for Dictivo, the local-first dictation app with optional Cloud Fast." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${BASE_URL}/changelog" />
    <meta property="og:image" content="${BASE_URL}/assets/dictivo-demo-poster.jpg" />
    <link rel="canonical" href="${BASE_URL}/changelog" />
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" />
    <link rel="stylesheet" href="/assets/site.css?v=local" />
  </head>
  <body>
    <a class="skip-link" href="#changelog">Skip to changelog</a>
    ${renderHeader("en", HOME_COPY.en)}
    <main class="doc-page" id="changelog">
      <span class="doc-eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>Release notes</span>
      <h1>Changelog</h1>
      <p class="doc-lede">What shipped, when, and what changed for the people using Dictivo every day.</p>

      <section class="doc-section" id="${release.version}" aria-labelledby="release-${release.version.replaceAll(".", "-")}">
        <p class="release-line">
          <span class="release-tag">${html(release.tag)}</span>
          <span class="release-status">Public beta</span>
          <time class="release-date" datetime="${html(release.updatedAt)}">${html(formatEnglishDate(release.updatedAt))}</time>
        </p>
        <h2 id="release-${release.version.replaceAll(".", "-")}">Language display, sound themes, and release sync.</h2>
        <ul>
          <li>Added display language options for German, French, Spanish, Italian, Dutch, Portuguese, Chinese, Japanese, and Korean while dictation language detection stays automatic.</li>
          <li>Refined dictation sound themes so start, stop, success, and error cues stay short and less fatiguing.</li>
          <li>Published the signed and notarized macOS universal DMG as the canonical public download.</li>
          <li>Connected dictivo.app release metadata to the latest desktop GitHub Release.</li>
        </ul>
      </section>

      <section class="doc-section" id="0.3.13" aria-labelledby="release-0-3-13">
        <p class="release-line"><span class="release-tag">v0.3.13</span><span class="release-status">Public beta</span><time class="release-date" datetime="2026-05-24">May 24, 2026</time></p>
        <h2 id="release-0-3-13">Reliable dictation sounds and mute control.</h2>
        <ul>
          <li>Start and stop cues now use native macOS playback first, keeping dictation sounds reliable over long sessions.</li>
          <li>The Settings preview buttons now play the selected cue, and the new Off option mutes dictation start and stop sounds.</li>
          <li>The macOS universal DMG is signed, notarized, stapled, and available through the latest release.</li>
        </ul>
      </section>

      <section class="doc-section" id="0.3.12" aria-labelledby="release-0-3-12">
        <p class="release-line"><span class="release-tag">v0.3.12</span><span class="release-status">Public beta</span><time class="release-date" datetime="2026-05-20">May 20, 2026</time></p>
        <h2 id="release-0-3-12">One-click install and restart for updates.</h2>
        <ul>
          <li>Check for updates now installs the downloaded update immediately and restarts Dictivo into the new version.</li>
          <li>The Settings and update banner copy now says install and restart, matching the actual update flow.</li>
          <li>The updater keeps existing settings, licenses, and local data in place during the app replacement.</li>
          <li>The macOS universal DMG is signed, notarized, stapled, and available through the latest release.</li>
        </ul>
      </section>

      <section class="doc-section" id="0.3.11" aria-labelledby="release-0-3-11">
        <p class="release-line"><span class="release-tag">v0.3.11</span><span class="release-status">Public beta</span><time class="release-date" datetime="2026-05-20">May 20, 2026</time></p>
        <h2 id="release-0-3-11">Cloud Fast recovery for upgraded installs.</h2>
        <ul>
          <li>Fixed upgraded Windows installs that could stay stuck on Local setup after Cloud Fast was activated.</li>
          <li>Manual Cloud Fast activation and cached Cloud Fast licenses now switch the desktop app into Cloud Fast when Local is not ready.</li>
          <li>The floating companion now distinguishes Local setup blocks from Cloud Fast subscription blocks.</li>
          <li>The macOS universal DMG is signed, notarized, and available through the latest release.</li>
        </ul>
      </section>

      <section class="doc-section" id="windows-validation-pending" aria-labelledby="windows-validation-title">
        <p class="release-line"><span class="release-tag">Windows</span><span class="release-status" data-status="alpha">Validation pending</span></p>
        <h2 id="windows-validation-title">Windows public downloads wait for signing and real-machine QA.</h2>
        <ul>
          <li>Windows x64 builds pass CI, installer smoke, and feature-parity contract tests.</li>
          <li>Public EXE/MSI downloads are held until Authenticode signing and the deferred dirty-install pass are complete.</li>
          <li>The current public download is the signed and notarized macOS universal DMG.</li>
        </ul>
      </section>

      <section class="doc-section" aria-labelledby="release-0-2-8">
        <p class="release-line"><span class="release-tag">v0.2.8</span><span class="release-status">Public beta</span><time class="release-date" datetime="2026-05-17">May 17, 2026</time></p>
        <h2 id="release-0-2-8">Local first, <em>Cloud Fast</em> optional.</h2>
        <ul>
          <li>Added the Local / Cloud Fast mode switch to the desktop dictation surface.</li>
          <li>Cloud Fast runs as a separate optional subscription and keeps provider routing hidden from users.</li>
          <li>Settings now shows Local model controls only when Local mode is selected.</li>
          <li>Text cleanup is shared across Local and Cloud Fast.</li>
          <li>Floating companion behavior was updated for hotkey-driven recording and completion states.</li>
          <li>Native desktop recording keeps hotkey dictation working when the main window is minimized.</li>
        </ul>
      </section>

      <section class="doc-section" aria-labelledby="release-0-2-0">
        <p class="release-line"><span class="release-tag">v0.2.0</span><span class="release-status">Public beta</span><time class="release-date" datetime="2026-05-13">May 13, 2026</time></p>
        <h2 id="release-0-2-0">Onboarding tiers &amp; <em>history</em>.</h2>
        <ul>
          <li>Onboarding matches the local engine tier to detected hardware on first launch.</li>
          <li>History view keeps recent dictations reachable for review and reuse.</li>
          <li>Dedicated panes for privacy controls and local engine settings.</li>
          <li>Companion overlay during dictation keeps the transcript visible while you work.</li>
          <li>Signed and notarized macOS DMG path established.</li>
          <li>Windows packaging groundwork added; the public Windows version is coming later.</li>
        </ul>
      </section>

      <section class="doc-section" aria-labelledby="release-0-1-0">
        <p class="release-line"><span class="release-tag">v0.1.0</span><span class="release-status" data-status="alpha">Private alpha</span></p>
        <h2 id="release-0-1-0">Initial dictation surface.</h2>
        <ul>
          <li>Local-first dictation engine running the on-device speech pipeline.</li>
          <li>Active transcript surface with a visible recording state.</li>
          <li>Hotkey scaffolding and a local user dictionary.</li>
          <li>macOS and Windows builds from the same workspace.</li>
        </ul>
      </section>
    </main>
    ${renderFooterOnly()}
  </body>
</html>
`;
}

function renderFooterOnly() {
  const t = HOME_COPY.en;
  return `<footer class="site-footer">
      <div class="footer-meta">
        <a class="brand footer-brand" href="/" aria-label="Dictivo home"><span class="brand-mark" aria-hidden="true">D</span><span class="brand-name">Dictivo</span></a>
        <p class="footer-tagline">${html(t.footer.tagline)}</p>
        <p>${html(t.footer.beta)}</p>
      </div>
      <div class="footer-links">
        <a href="/#privacy">Privacy</a>
        <a href="/#pricing">Pricing</a>
        <a href="/#cloud-fast">Cloud Fast</a>
        <a href="/#downloads">Downloads</a>
        ${renderCompareFooterLinks()}
        <a href="/changelog">Changelog</a>
        <a href="/security">Security</a>
        <a href="mailto:support@dictivo.app">support@dictivo.app</a>
      </div>
    </footer>`;
}

function formatEnglishDate(isoDate) {
  return new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${isoDate}T00:00:00Z`));
}

function write(path, body) {
  const abs = resolve(root, path);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, body.replace(/[ \t]+$/gm, ""));
  console.log(`Wrote ${path}`);
}

for (const locale of LOCALES) {
  if (locale.code !== "en") {
    rmSync(resolve(root, locale.code), { recursive: true, force: true });
  }
}
rmSync(resolve(root, "compare"), { recursive: true, force: true });

for (const locale of LOCALES) {
  write(locale.code === "en" ? "index.html" : `${locale.code}/index.html`, renderHome(locale.code));
}

write("compare/index.html", renderCompareHub());
for (const page of COMPARE_PAGES) {
  write(`compare/${page.slug}/index.html`, renderComparePage(page));
}

write("downloads.json", renderDownloadsJson());
write("_redirects", renderRedirects());
write("sitemap.xml", renderSitemap());
write("changelog.html", renderChangelog());
