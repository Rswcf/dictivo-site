import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCALES } from "../data/site-content.mjs";
import { PRICING_LASTMOD } from "../data/local-offer.mjs";
import { offlineDictationGuideLastmod } from "../data/offline-dictation-guide.mjs";
import { OFFLINE_DICTATION_WINDOWS_GUIDE_LASTMOD } from "../data/offline-dictation-windows-guide.mjs";
import { SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD } from "../data/speech-to-text-mac-guide.mjs";

const read = path => readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
const cases = [
  ...LOCALES.map(l => [l.path.slice(1) + "guides/offline-dictation-on-mac/", l.path, "macos", "offline_guide_mac", offlineDictationGuideLastmod(l.code)]),
  ["guides/best-speech-to-text-apps-for-mac/", "/", "macos", "speech_guide_mac", SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD],
  ["guides/offline-dictation-on-windows/", "/", "windows", "offline_guide_windows", OFFLINE_DICTATION_WINDOWS_GUIDE_LASTMOD],
];

test("comparison guide readers can download the right platform and reach localized setup and terms", () => {
  for (const [path, localePath, platform, source] of cases) {
    const page = read(`${path}index.html`);
    const panels = [...page.matchAll(/<section[^>]*data-guide-trial[^>]*>([\s\S]*?)<\/section>/g)];
    assert.equal(panels.length, 1, path);
    const panel = panels[0][1];
    assert.ok(panel.includes(`data-platform="${platform}"`), path);
    assert.equal((panel.match(/class="[^"]*download-link/g) || []).length, 1, path);
    const link = panel.match(/href="([^"]+)"[^>]*data-download-content="[^"]+"/)[1].replaceAll("&amp;", "&");
    const url = new URL(link);
    assert.equal(url.origin, "https://api.dictivo.app", path);
    assert.equal(url.pathname, platform === "macos" ? "/download/mac" : "/download/windows", path);
    assert.equal(url.searchParams.get("utm_content"), source, path);
    assert.ok(url.searchParams.get("version"), path);
    // English pricing has its own page; other languages keep the homepage section.
    assert.ok(panel.includes(`href="${localePath === "/" ? "/pricing/" : `${localePath}#pricing`}"`), path);
    assert.ok(panel.includes(`href="${localePath}guides/first-local-dictation/"`), path);
    assert.ok(page.indexOf("</table>") < page.indexOf("data-guide-trial"), path);
    assert.ok(!panel.includes("undefined"), path);
    if (platform === "windows") assert.ok(panel.includes("not yet code-signed"), path);
  }
});

// A guide that shows a Dictivo price may report a later sitemap date: PRICING_LASTMOD, the day the
// displayed price last changed (see tests/sitemap-lastmod.test.mjs).
test("all changed guides agree on visible, structured and sitemap modification dates", () => {
  const sitemap = read("sitemap.xml");
  for (const [path, , , , date] of cases) {
    const page = read(`${path}index.html`);
    assert.ok(page.includes(`datetime="${date}"`), path);
    assert.ok(page.includes(`"dateModified":"${date}"`), path);
    const lastmod = page.includes('<span class="price">') && PRICING_LASTMOD > date ? PRICING_LASTMOD : date;
    assert.match(sitemap, new RegExp(`<loc>https://dictivo\\.app/${path}</loc>\\s*<lastmod>${lastmod}</lastmod>`), path);
  }
});
