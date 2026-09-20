import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCALES } from "../data/site-content.mjs";

const read = path => readFileSync(new URL(`../dist/${path}`, import.meta.url), "utf8");
const cases = [
  ...LOCALES.map(l => [l.path.slice(1) + "guides/offline-dictation-on-mac/", l.path, "macos", "offline_guide_mac"]),
  ["guides/best-speech-to-text-apps-for-mac/", "/", "macos", "speech_guide_mac"],
  ["guides/offline-dictation-on-windows/", "/", "windows", "offline_guide_windows"],
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
    assert.ok(panel.includes(`href="${localePath}#pricing"`), path);
    assert.ok(panel.includes(`href="${localePath}guides/first-local-dictation/"`), path);
    assert.ok(page.indexOf("</table>") < page.indexOf("data-guide-trial"), path);
    assert.ok(!panel.includes("undefined"), path);
    if (platform === "windows") assert.ok(panel.includes("not yet code-signed"), path);
  }
});

test("all changed guides agree on visible, structured and sitemap modification dates", () => {
  const sitemap = read("sitemap.xml");
  for (const [path] of cases) {
    const page = read(`${path}index.html`);
    assert.ok(page.includes('datetime="2026-09-20"'), path);
    assert.ok(page.includes('"dateModified":"2026-09-20"'), path);
    assert.match(sitemap, new RegExp(`<loc>https://dictivo\\.app/${path}</loc>\\s*<lastmod>2026-09-20</lastmod>`), path);
  }
});
