import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Nine guide pages open with a disclosed "What is Dictivo?" block right after the short answer:
// what the product is, a pricing link and the Mac (and Windows) download. Every other guide, and
// every language without intro copy, renders no block.
const dist = new URL("../../dist/", import.meta.url).pathname;
const read = (path) => readFileSync(`${dist}${path.slice(1)}index.html`, "utf8");
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const hasWindowsRelease = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);

const PAGES = [
  ["/guides/mac-dictation-not-working/", "en", "troubleshooting", "troubleshooting_intro"],
  ["/guides/mac-dictation-shortcut/", "en", "shortcut", "shortcut_intro"],
  ["/guides/wispr-flow-pricing/", "en", "wispr-pricing", "wispr_pricing_intro"],
  ["/guides/best-dictation-software/", "en", "best-software", "best_software_intro"],
  ["/guides/best-speech-to-text-apps-for-mac/", "en", "speech-to-text-mac", "speech_guide_intro"],
  ["/guides/mac-dictation-app-no-subscription/", "en", "no-subscription", "no_subscription_guide_intro"],
  ["/ja/guides/mac-dictation-not-working/", "ja", "ja-troubleshooting", "ja_troubleshooting_intro"],
  ["/ja/guides/mac-dictation-shortcut/", "ja", "ja-shortcut", "ja_shortcut_intro"],
  ["/guides/offline-dictation-on-mac/", "en", "offline-guide", "offline_guide_intro"],
  ["/ja/guides/offline-dictation-on-mac/", "ja", "offline-guide", "offline_guide_intro"],
];
const WITHOUT_BLOCK = [
  ...["de", "fr", "es", "it", "nl", "pt", "zh", "zh-hant", "ko"].map((code) => `/${code}/guides/offline-dictation-on-mac/`),
  "/guides/dragon-pricing/",
  "/guides/windows-voice-typing-not-working/",
  "/guides/offline-dictation-on-windows/",
];
const DISCLOSURE = { en: /Dictivo is this site(&#39;|')s product/, ja: /当サイトの製品/ };
const PRICING = { en: 'href="/pricing/"', ja: 'href="/ja/#pricing"' };
const UNWANTED = /US\$|\$\d|Wispr|Superwhisper|MacWhisper|VoiceInk|Spokenly|Voibe|Dragon|Handy/;

const main = (html) => html.slice(html.indexOf("<main"), html.indexOf("</main>") + "</main>".length);
const blocks = (html) => [...html.matchAll(/<section[^>]*data-guide-intro[^>]*>[\s\S]*?<\/section>/g)].map(([block]) => block);
const downloadLinks = (body) => [...body.matchAll(/<a class="([^"]*\bdownload-link\b[^"]*)" href="([^"]+)" data-platform="([^"]+)"[^>]*data-download-content="([^"]+)">([^<]+)<\/a>/g)]
  .map(([, className, href, platform, content, text]) => ({ className, href: new URL(href.replaceAll("&amp;", "&")), platform, content, text }));
// Visible text: script, style, template, noscript and svg elements dropped, then every tag.
const stripped = (markup) => markup.replace(/<(script|style|template|noscript|svg)\b[\s\S]*?<\/\1>/gi, "").replace(/<[^>]+>/g, "");

// Share of the <main> text that comes before the first Mac download link.
function firstMacLinkPosition(html) {
  const body = main(html);
  const href = body.indexOf('href="https://api.dictivo.app/download/mac');
  assert.ok(href > 0, "no Mac download link in <main>");
  const tag = body.lastIndexOf("<", href);
  return stripped(body.slice(0, tag)).length / stripped(body).length;
}

for (const [path, code, idPrefix, source] of PAGES) {
  test(`${path} opens with a disclosed Dictivo block and its downloads`, () => {
    const html = read(path);
    const found = blocks(html);
    assert.equal((html.match(/<section[^>]*data-guide-intro/g) || []).length, 1, "one intro block");
    assert.equal(found.length, 1);
    const [block] = found;
    assert.ok(block.includes(`aria-labelledby="${idPrefix}-about"`) && block.includes(`<h2 id="${idPrefix}-about">`), "heading");
    assert.match(block, DISCLOSURE[code], "the block says Dictivo is this site's product");
    assert.ok(block.includes(PRICING[code]), "pricing link");
    assert.doesNotMatch(block, UNWANTED, "no price and no competitor name");
    assert.ok(!block.includes("data-guide-trial") && !block.includes("<nav"), "not a trial panel and no navigation");
    assert.ok(!block.includes("undefined"), "no missing copy");

    const groups = [...block.matchAll(/<div class="[^"]*"[^>]*\sdata-platform-downloads>([\s\S]*?)<\/div>/g)].map(([, body]) => body);
    assert.equal(groups.length, 1, "one download group");
    assert.equal((block.match(/<div[\s>]/g) || []).length, 1, "no nested div");
    const links = downloadLinks(groups[0]);
    const expected = hasWindowsRelease ? [`${source}_mac`, `${source}_windows`] : [`${source}_mac`];
    assert.deepEqual(links.map((link) => link.content), expected);
    assert.equal((groups[0].match(/<a\s/g) || []).length, expected.length, "only download links in the group");
    const [mac, windows] = links;
    assert.equal(mac.platform, "macos");
    assert.match(mac.className, /\bbutton-light\b/);
    assert.equal(mac.href.pathname, "/download/mac");
    if (hasWindowsRelease) {
      assert.equal(windows.platform, "windows");
      assert.match(windows.className, /\bbutton-outline\b/);
      assert.equal(windows.href.pathname, "/download/windows");
    }
    for (const link of links) {
      assert.equal(link.href.origin, "https://api.dictivo.app");
      assert.equal(link.href.searchParams.get("utm_content"), link.content, "utm_content and data-download-content");
    }

    // The block sits after the short answer and before the table, contents, sections and practice link.
    const body = main(html);
    const at = body.indexOf("data-guide-intro");
    const answer = body.indexOf(`id="${idPrefix}-answer"`);
    assert.ok(answer > 0 && answer < at, "the answer comes first");
    for (const later of [`id="${idPrefix}-quick-reference"`, "<nav", `id="${idPrefix}-section-1"`, "<table", 'class="first-dictation-link"']) {
      const index = body.indexOf(later);
      if (index >= 0) assert.ok(at < index, `the block comes before ${later}`);
    }

    const position = firstMacLinkPosition(html);
    assert.ok(position <= 0.25, `first Mac download at ${(position * 100).toFixed(1)}% of <main>`);
  });
}

test("guides and languages without intro copy render no Dictivo block", () => {
  for (const path of WITHOUT_BLOCK) assert.ok(!read(path).includes("data-guide-intro"), path);
});
