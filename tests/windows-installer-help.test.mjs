import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { LOCALES } from "../data/site-content.mjs";
import { WINDOWS_INSTALL_HELP_PATHS, WINDOWS_INSTALL_HELP_LASTMOD, windowsInstallHelpPath } from "../data/windows-installer-help.mjs";

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
const page = (code) => read(`${WINDOWS_INSTALL_HELP_PATHS[code].slice(1)}index.html`);
const main = (html) => html.split('<main ')[1].split('</main>')[0];
const ld = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, json]) => JSON.parse(json));
const release = JSON.parse(readFileSync(new URL('../data/release.json', import.meta.url), 'utf8'));
const publicWindows = release.publicWindowsDownloads && release.windows?.exe?.url && release.windows?.msi?.url;

test('Windows install help has four real translations, matching canonicals and language alternates', () => {
  for (const [code, path] of Object.entries(WINDOWS_INSTALL_HELP_PATHS)) {
    const html = page(code);
    const url = `https://dictivo.app${path}`;
    assert.equal((html.match(/<h1>/g) || []).length, 1, code);
    assert.ok(html.includes(`<link rel="canonical" href="${url}"`), code);
    for (const [alt, target] of Object.entries(WINDOWS_INSTALL_HELP_PATHS)) {
      const lang = LOCALES.find((l) => l.code === alt).htmlLang;
      assert.ok(html.includes(`hreflang="${lang}" href="https://dictivo.app${target}"`), `${code} -> ${alt}`);
    }
    const article = ld(html).find((x) => x['@type'] === 'TechArticle');
    assert.equal(article.url, url);
    assert.equal(article.datePublished, '2026-10-31');
    assert.equal(article.dateModified, WINDOWS_INSTALL_HELP_LASTMOD);
    assert.ok(!html.includes('data-guide-trial'), 'support article does not upsell an install-blocked reader');
    assert.equal((main(html).match(/id="windows-install-section-\d+"/g) || []).length, 6);
  }
});

test('every Windows download card and every homepage footer links to the appropriate help', () => {
  for (const locale of LOCALES) {
    const html = read(`${locale.path.slice(1)}index.html`);
    const target = windowsInstallHelpPath(locale.code);
    const footer = html.slice(html.lastIndexOf('<footer class="site-footer"'));
    assert.ok(footer.includes(`href="${target}"`), `${locale.code} footer`);
    if (publicWindows) {
      const card = html.split('data-platform-card="windows"')[1].split('</article>')[0];
      assert.ok(card.includes(`href="${target}" data-windows-install-help`), `${locale.code} download card`);
      assert.ok(!/Run anyway|Keep anyway|仍要运行|Trotzdem ausführen/.test(card), 'download card routes to triage instead of a blanket bypass');
    }
  }
});

test('SAC, SmartScreen and malware are separate; no protection-disabling commands or safety guarantee', () => {
  const html = page('en');
  const sections = (i) => html.split(`id="windows-install-section-${i}"`)[1].split('</section>')[0];
  assert.match(sections(2), /uncommon-download warning only/);
  assert.match(sections(3), /Run anyway if Windows offers it/);
  assert.match(sections(4), /no individual-app exception/);
  assert.match(sections(4), /Leave the setting unchanged/);
  assert.match(sections(4), /trusted distribution and signing path from us/);
  assert.match(sections(5), /leave the file blocked/);
  assert.ok(sections(4).includes('smart-app-control-frequently-asked-questions'));
  for (const code of Object.keys(WINDOWS_INSTALL_HELP_PATHS)) {
    const text = main(page(code));
    assert.ok(!/Set-MpPreference|Unblock-File|Set-ExecutionPolicy|reg add|100% safe|guaranteed safe/i.test(text), code);
    assert.ok(text.includes('support@dictivo.app'), code);
    assert.ok(text.includes('mailto:support@dictivo.app?subject=Windows%20installer%20blocked'), code);
  }
});

test('Traditional Chinese article localizes downloads and uses the existing shared contact page', () => {
  const html = main(page('zh-hant'));
  assert.ok(html.includes('href="/zh-hant/#downloads"'));
  assert.ok(html.includes('href="/contact/"'));
  assert.ok(!html.includes('href="/zh/'));
  assert.ok(html.includes('智慧型應用程式控制'));
  assert.ok(!html.includes('智慧應用控制'));
});

test('all help translations are discoverable in the sitemap', () => {
  const sitemap = read('sitemap.xml');
  for (const path of Object.values(WINDOWS_INSTALL_HELP_PATHS)) {
    const entry = sitemap.split(`<loc>https://dictivo.app${path}</loc>`)[1].split('</url>')[0];
    assert.ok(entry.includes(`<lastmod>${WINDOWS_INSTALL_HELP_LASTMOD}</lastmod>`));
    assert.equal((entry.match(/<xhtml:link /g) || []).length, 5);
  }
});

// Resolve actual output files: a plausible localized URL may still be a 404.
test('article navigation and support links resolve to generated pages and anchors', () => {
  for (const code of Object.keys(WINDOWS_INSTALL_HELP_PATHS)) {
    for (const [, href] of page(code).matchAll(/<a\b[^>]*href="([^"\s]+)"/g)) {
      const url = new URL(href, `https://dictivo.app${WINDOWS_INSTALL_HELP_PATHS[code]}`);
      if (url.origin !== 'https://dictivo.app') continue;
      const file = `${url.pathname.slice(1)}${url.pathname.endsWith('/') ? 'index.html' : ''}`;
      assert.ok(existsSync(new URL(`../dist/${file}`, import.meta.url)), `${code}: ${href}`);
      if (url.hash) assert.ok(read(file).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${code}: ${href}`);
    }
  }
});
