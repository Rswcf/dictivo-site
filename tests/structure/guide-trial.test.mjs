import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCALES } from "../../data/site-content.mjs";
import { PRICING_LASTMOD } from "../../data/local-offer.mjs";
import { offlineDictationGuideLastmod } from "../../data/offline-dictation-guide.mjs";
import { OFFLINE_DICTATION_WINDOWS_GUIDE_LASTMOD } from "../../data/offline-dictation-windows-guide.mjs";
import { SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD } from "../../data/speech-to-text-mac-guide.mjs";
import { ONE_TIME_LICENSE_GUIDE_LASTMOD } from "../../data/one-time-license-guide.mjs";
import { NO_SUBSCRIPTION_GUIDE_LASTMOD } from "../../data/no-subscription-guide.mjs";
import { CLAUDE_CODE_GUIDE_LASTMOD } from "../../data/claude-code-guide.mjs";
import { readyDocsEntries } from "../../data/docs-index.mjs";

const read = path => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const hasWindowsRelease = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const cases = [
  ...LOCALES.map(l => [l.path.slice(1) + "guides/offline-dictation-on-mac/", l.path, "macos", "offline_guide_mac", offlineDictationGuideLastmod(l.code)]),
  ["guides/best-speech-to-text-apps-for-mac/", "/", "macos", "speech_guide_mac", SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD],
  ["guides/mac-dictation-app-no-subscription/", "/", "macos", "no_subscription_guide_mac", NO_SUBSCRIPTION_GUIDE_LASTMOD],
  ["guides/offline-dictation-on-windows/", "/", "windows", "offline_guide_windows", OFFLINE_DICTATION_WINDOWS_GUIDE_LASTMOD],
  ["guides/dictation-app-mac-windows-one-time-license/", "/", "both", "one_time_guide_mac", ONE_TIME_LICENSE_GUIDE_LASTMOD],
  ["guides/dictate-into-claude-code-and-cursor-on-mac/", "/", "macos", "claude_code_guide_mac", CLAUDE_CODE_GUIDE_LASTMOD],
  // Docs pages with a trial panel (the install page), once built (data/docs-index.mjs).
  ...readyDocsEntries({ windows: hasWindowsRelease })
    .filter((entry) => entry.trialSource)
    .map((entry) => [`docs/${entry.slug}/`, "/", "both", `${entry.trialSource}_mac`, entry.lastmod]),
];

test("comparison guide readers can download the right platform and reach localized setup and terms", () => {
  for (const [path, localePath, platform, source] of cases) {
    const page = read(`${path}index.html`);
    const panels = [...page.matchAll(/<section[^>]*data-guide-trial[^>]*>([\s\S]*?)<\/section>/g)];
    assert.equal(panels.length, 1, path);
    const panel = panels[0][1];
    // A Mac and Windows page ("both") offers the Mac download first, then Windows while it is public.
    assert.ok(panel.includes(`data-platform="${platform === "both" ? "macos" : platform}"`), path);
    assert.equal((panel.match(/class="[^"]*download-link/g) || []).length, platform === "both" && hasWindowsRelease ? 2 : 1, path);
    if (platform === "both" && hasWindowsRelease) {
      assert.ok(panel.includes('data-platform="windows"'), path);
      assert.ok(panel.includes(`utm_content=${source.replace(/_mac$/, "_windows")}`), path);
    }
    const link = panel.match(/href="([^"]+)"[^>]*data-download-content="[^"]+"/)[1].replaceAll("&amp;", "&");
    const url = new URL(link);
    assert.equal(url.origin, "https://api.dictivo.app", path);
    assert.equal(url.pathname, platform === "windows" ? "/download/windows" : "/download/mac", path);
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
// displayed price last changed (see tests/structure/sitemap-lastmod.test.mjs).
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
