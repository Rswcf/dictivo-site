import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { pricingPageAnswer } from "../../data/local-offer-copy.mjs";
import { HOME_CONVERSION_COPY } from "../../data/home-conversion.mjs";
import { priceText } from "../../scripts/lib/price-tokens.mjs";

// /pricing/ offers the downloads inside its short answer, before the plan cards: Mac first and
// solid, Windows beside it while Windows downloads are public.
const dist = new URL("../../dist/", import.meta.url).pathname;
const page = () => readFileSync(`${dist}pricing/index.html`, "utf8");
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const hasWindowsRelease = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);

const answerSection = (html) => html.match(/<section[^>]*aria-labelledby="pricing-answer"[^>]*>([\s\S]*?)<\/section>/)[1];
const downloadLinks = (body) => [...body.matchAll(/<a class="([^"]*\bdownload-link\b[^"]*)" href="([^"]+)" data-platform="([^"]+)"[^>]*data-download-content="([^"]+)">([^<]+)<\/a>/g)]
  .map(([, className, href, platform, content, text]) => ({ className, href: new URL(href.replaceAll("&amp;", "&")), platform, content, text }));
const visible = (markup) => markup.replace(/<span class="price">([^<]*)<\/span>/g, "$1").replaceAll("&amp;", "&").replaceAll("&#39;", "'").replaceAll("&quot;", '"');
const resolved = (text) => text.replace(/\{\{price\.(\w+)\.(\w+)\}\}/g, (_token, amount, form) => priceText(amount, "en", form));
const stripped = (markup) => markup.replace(/<(script|style|template|noscript|svg)\b[\s\S]*?<\/\1>/gi, "").replace(/<[^>]+>/g, "");

test("the pricing answer holds one download group, Mac first, attributed to the pricing page", () => {
  const html = page();
  const section = answerSection(html);
  const groups = [...section.matchAll(/<div class="[^"]*"[^>]*\sdata-platform-downloads>([\s\S]*?)<\/div>/g)].map(([, body]) => body);
  assert.equal(groups.length, 1, "one download group in the answer");
  assert.equal((html.match(/data-platform-downloads/g) || []).length, 1, "the only download group on the page");
  const links = downloadLinks(groups[0]);
  const expected = hasWindowsRelease ? ["pricing_page_mac", "pricing_page_windows"] : ["pricing_page_mac"];
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
  assert.ok(section.includes(`<p class="compare-trial">${HOME_CONVERSION_COPY.en.trial}</p>`), "trial line under the buttons");
  assert.ok(html.indexOf("data-platform-downloads") < html.indexOf('class="pricing-band"'), "downloads before the plan cards");
});

test("the answer stays the section's first paragraph and the page is redated", () => {
  const html = page();
  const section = answerSection(html);
  const first = section.match(/<p>([\s\S]*?)<\/p>/);
  assert.equal(visible(first[1]), resolved(pricingPageAnswer("en")));
  assert.ok(first.index < section.indexOf("data-platform-downloads"), "answer before the buttons");
  assert.equal(html.match(/<time datetime="([^"]+)">/)[1], "2026-11-12");
});

test("the first Mac download link sits in the first quarter of the pricing page", () => {
  const html = page();
  const body = html.slice(html.indexOf("<main"), html.indexOf("</main>") + "</main>".length);
  const href = body.indexOf('href="https://api.dictivo.app/download/mac');
  assert.ok(href > 0, "no Mac download link in <main>");
  const position = stripped(body.slice(0, body.lastIndexOf("<", href))).length / stripped(body).length;
  assert.ok(position <= 0.25, `first Mac download at ${(position * 100).toFixed(1)}% of <main>`);
});
