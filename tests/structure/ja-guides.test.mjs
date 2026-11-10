import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { firstPublished } from "../../data/first-published.mjs";
import { PRICING_LASTMOD, introOfferActive } from "../../data/local-offer.mjs";
import { LOCALES } from "../../data/site-content.mjs";
import { buildLocaleRoutes } from "../../lib/locale-routing/build-routes.mjs";
import { SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD, speechToTextMacGuideCopy } from "../../data/speech-to-text-mac-guide.mjs";
import { NO_SUBSCRIPTION_GUIDE_LASTMOD, noSubscriptionGuideCopy } from "../../data/no-subscription-guide.mjs";
import {
  JA_SPEECH_GUIDE_READY,
  JA_SPEECH_TO_TEXT_MAC_GUIDE_CHECKED,
  JA_SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD,
  jaSpeechToTextMacGuideCopy,
} from "../../data/ja-speech-to-text-mac-guide.mjs";
import {
  JA_NO_SUBSCRIPTION_GUIDE_CHECKED,
  JA_NO_SUBSCRIPTION_GUIDE_LASTMOD,
  JA_NO_SUBSCRIPTION_GUIDE_READY,
  jaNoSubscriptionGuideCopy,
} from "../../data/ja-no-subscription-guide.mjs";

// Batch B3: two Japanese answer guides, each paired by hreflang with its English twin. A pair is
// registered behind its data file's *_READY flag: while it is false nothing Japanese is built and
// the English twin keeps its English-only head; once it is true the Japanese page must meet the
// shared contract below. Both B3 pairs are released; the not-ready branch stays for future pairs.
// Wording tests per page live in tests/wording/ja-*.test.mjs.
const dist = new URL("../../dist/", import.meta.url).pathname;
const read = (path) => readFileSync(`${dist}${path}`, "utf8");
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const windows = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(([, body]) => [JSON.parse(body)].flat());
const alternates = (html) => [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]);
const between = (html, from, to) => html.slice(html.indexOf(from), html.indexOf(to, html.indexOf(from)));
const main = (html) => html.split("<main")[1].split("</main>")[0];
const footer = (html) => html.split("<footer")[1].split("</footer>")[0];
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\s+/g, " ");
const tableAfter = (html, id) => html.slice(html.indexOf(`id="${id}"`)).match(/<table class="compare-table">[\s\S]*?<\/table>/)[0];
const rows = (table) => [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(([, row]) => [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(([, cell]) => cell.trim()));
const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const latestDate = (...dates) => dates.filter(Boolean).sort().at(-1);
const jaDate = (iso) => new Intl.DateTimeFormat("ja-JP", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
const sitemapEntry = (sitemap, url) => sitemap.match(new RegExp(`<url>\\s*<loc>${escape(url)}</loc>[\\s\\S]*?</url>`))?.[0];
const PRICE_SPAN = /<span class="price"[^>]*>[\s\S]*?<\/span>/g;
const DICTIVO_PRICES = introOfferActive() ? 3 : 2;
const BANNED = /永久アップデート|生涯アップデート|ライフタイムアップデート|無期限のアップデート|直接入力|公開コード|米ドル|US\$|最高の|最も正確|高精度|最速|No\.\s?1|ナンバーワン|lifetime updates|types directly/i;

const PAIRS = [
  {
    route: "guides/best-speech-to-text-apps-for-mac",
    enPath: "/guides/best-speech-to-text-apps-for-mac/",
    jaPath: "/ja/guides/best-speech-to-text-apps-for-mac/",
    ready: JA_SPEECH_GUIDE_READY,
    lastmod: JA_SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD,
    checked: JA_SPEECH_TO_TEXT_MAC_GUIDE_CHECKED,
    copy: jaSpeechToTextMacGuideCopy({ windows }),
    idPrefix: "ja-speech-to-text-mac",
    introSource: "ja_speech_guide_intro",
    trialSource: "ja_speech_guide_mac",
    enNavLabel: speechToTextMacGuideCopy({ windows }).navLabel,
    enLastmod: SPEECH_TO_TEXT_MAC_GUIDE_LASTMOD,
    // /ja/llms.txt lists the English speech-to-text guide until the Japanese one is ready.
    jaLlmsEnglishLine: true,
  },
  {
    route: "guides/mac-dictation-app-no-subscription",
    enPath: "/guides/mac-dictation-app-no-subscription/",
    jaPath: "/ja/guides/mac-dictation-app-no-subscription/",
    ready: JA_NO_SUBSCRIPTION_GUIDE_READY,
    lastmod: JA_NO_SUBSCRIPTION_GUIDE_LASTMOD,
    checked: JA_NO_SUBSCRIPTION_GUIDE_CHECKED,
    copy: jaNoSubscriptionGuideCopy({ windows }),
    idPrefix: "ja-no-subscription",
    introSource: "ja_no_subscription_guide_intro",
    trialSource: "ja_no_subscription_guide_mac",
    enNavLabel: noSubscriptionGuideCopy({ windows }).navLabel,
    enLastmod: NO_SUBSCRIPTION_GUIDE_LASTMOD,
    jaLlmsEnglishLine: false,
  },
];

// Every in-site href (`/…` or `https://dictivo.app/…`, query and fragment stripped) lands on a file in dist/.
const assertInSiteLinksResolve = (body) => {
  for (const [, href] of body.matchAll(/href="([^"]+)"/g)) {
    if (!href.startsWith("/") && !href.startsWith("https://dictivo.app/")) continue;
    if (href.startsWith("//")) continue;
    const path = href.replace(/^https:\/\/dictivo\.app/, "").replaceAll("&amp;", "&").split("#")[0].split("?")[0];
    const file = `${dist}${path.slice(1)}${path.endsWith("/") ? "index.html" : ""}`;
    assert.ok(existsSync(file), `${href} does not resolve`);
  }
};

test("both Batch B3 Japanese answer guides are released", () => {
  assert.equal(JA_SPEECH_GUIDE_READY, true, "JA_SPEECH_GUIDE_READY");
  assert.equal(JA_NO_SUBSCRIPTION_GUIDE_READY, true, "JA_NO_SUBSCRIPTION_GUIDE_READY");
});

for (const pair of PAIRS) {
  const { route, enPath, jaPath, ready, lastmod, checked, copy, idPrefix, introSource, trialSource, enNavLabel, enLastmod, jaLlmsEnglishLine } = pair;
  const enUrl = `https://dictivo.app${enPath}`;
  const jaUrl = `https://dictivo.app${jaPath}`;
  const jaFile = `${jaPath.slice(1)}index.html`;
  const enFile = `${enPath.slice(1)}index.html`;
  const page = () => read(jaFile);
  const factHeaders = copy.appHeaders ?? copy.factHeaders;
  const factRows = copy.appRows ?? copy.factRows;

  test(`${jaPath}: the copy's head strings fit the Japanese limits`, () => {
    assert.ok(copy.metaTitle.length >= 1 && copy.metaTitle.length <= 32, `title ${copy.metaTitle.length}`);
    assert.ok(copy.metaDescription.length >= 70 && copy.metaDescription.length <= 120, `description ${copy.metaDescription.length}`);
    assert.ok(!copy.metaTitle.includes("$") && !copy.metaDescription.includes("$"), "no $ in the head");
    assert.ok(copy.navLabel.length >= 1 && copy.navLabel.length <= 16, `navLabel ${copy.navLabel.length}`);
    assert.ok(copy.title.length > 0, "title");
    assert.ok(Array.isArray(copy.about) && copy.about.length > 0, "about");
    assert.match(firstPublished(route, "ja"), /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(firstPublished(route, "en") <= firstPublished(route, "ja"), "English first");
    assert.throws(() => firstPublished(route, "de"), new RegExp(`${escape(route)} \\(de\\)`));
  });

  test(`${jaPath}: not built while its data file is not ready`, { skip: ready }, () => {
    assert.ok(!existsSync(`${dist}${jaFile}`), "no Japanese page");
    const en = read(enFile);
    assert.deepEqual(alternates(en), [["en", enUrl], ["x-default", enUrl]]);
    assert.ok(!en.includes(`href="${jaPath}?lang=ja"`), "the language menu does not offer it");
    const entry = sitemapEntry(read("sitemap.xml"), enUrl);
    assert.ok(entry, "English sitemap entry");
    assert.ok(!entry.includes('hreflang="ja"'), "no Japanese alternate in the sitemap");
    assert.ok(!read("sitemap.xml").includes(`<loc>${jaUrl}</loc>`), "no Japanese sitemap entry");
    assert.ok(!footer(read("ja/index.html")).includes(jaPath), "Japanese footer");
    assert.ok(!read("ja/llms.txt").includes(jaPath), "Japanese llms.txt");
    if (jaLlmsEnglishLine) assert.ok(read("ja/llms.txt").includes(`[${enNavLabel}](${enUrl})`), "the English line stays");
  });

  test(`${jaPath}: a self-canonical Japanese page with its title and heading`, { skip: !ready }, () => {
    const html = page();
    assert.ok(html.includes('<html lang="ja">'));
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
    assert.equal(text(html.match(/<h1>([\s\S]*?)<\/h1>/)[1]).trim(), copy.title);
    assert.equal(text(html.match(/<title>([^<]*)<\/title>/)[1]).trim(), copy.metaTitle);
    assert.ok(html.includes(`<link rel="canonical" href="${jaUrl}" />`));
  });

  test(`${jaPath}: paired with ${enPath} by hreflang, language menu and locale routing`, { skip: !ready }, () => {
    const html = page();
    const en = read(enFile);
    const pairAlternates = [["en", enUrl], ["ja", jaUrl], ["x-default", enUrl]];
    assert.deepEqual(alternates(html), pairAlternates);
    assert.deepEqual(alternates(en), pairAlternates);
    assert.ok(en.includes(`<link rel="canonical" href="${enUrl}" />`), "the English page stays self-canonical");
    assert.ok(en.includes(`href="${jaPath}?lang=ja"`), "English menu offers the Japanese page");
    assert.ok(html.includes(`href="${enPath}?lang=en"`), "Japanese menu offers the English page");
    assert.ok(html.includes('href="/de/?lang=de"'), "other languages go to their homepage");
    const routes = buildLocaleRoutes({ distDir: dist, locales: LOCALES });
    assert.equal(routes.pages[enPath]?.alternates?.ja, jaPath);
  });

  test(`${jaPath}: keeps the answer-page order`, { skip: !ready }, () => {
    const body = main(page());
    const order = [
      `id="${idPrefix}-answer"`,
      "data-guide-intro",
      `id="${idPrefix}-intents"`,
      `id="${idPrefix}-table"`,
      `id="${idPrefix}-method"`,
      "data-guide-trial",
      `id="${idPrefix}-section-1"`,
      `id="${idPrefix}-faq"`,
      `id="${idPrefix}-related"`,
      `id="${idPrefix}-references"`,
    ];
    const positions = order.map((marker) => body.indexOf(marker));
    assert.ok(positions.every((at) => at >= 0), `missing: ${order.filter((_, i) => positions[i] < 0)}`);
    assert.deepEqual([...positions].sort((a, b) => a - b), positions);
    assert.equal((body.match(/data-guide-intro/g) || []).length, 1, "one intro block");
    const intro = body.match(/<section[^>]*data-guide-intro[^>]*>[\s\S]*?<\/section>/)[0];
    assert.ok(intro.includes("当サイトの製品"), "disclosure");
    assert.ok(intro.includes('href="/ja/#pricing"'), "pricing link");
  });

  test(`${jaPath}: the short answer is dated, concrete and makes no ranking claim`, { skip: !ready }, () => {
    const answer = text(between(main(page()), `id="${idPrefix}-answer"`, "</section>").match(/<p>([\s\S]*?)<\/p>/)[1]).trim();
    const length = [...answer].length;
    assert.ok(length >= 110 && length <= 200, `answer has ${length} characters`);
    assert.ok(answer.includes("Dictivo"));
    assert.match(answer, /\d/);
    assert.ok(answer.includes(jaDate(checked)), "the check date");
    assert.doesNotMatch(answer, /精度|最高|最速/);
  });

  test(`${jaPath}: the fact table is complete, dated per row, and prices Dictivo with tokens only`, { skip: !ready }, () => {
    const table = tableAfter(page(), `${idPrefix}-table`);
    const [header, ...body] = rows(table);
    assert.deepEqual(header.map((cell) => text(cell).trim()), factHeaders);
    assert.equal(body.length, factRows.length);
    const priceColumn = factHeaders.findIndex((cell) => cell.includes("価格"));
    assert.ok(priceColumn > 0, "a price column");
    let dictivoRows = 0;
    for (const row of body) {
      const name = text(row[0]).trim();
      assert.equal(row.length, factHeaders.length, `${name}: cell count`);
      if (name.startsWith("Dictivo")) {
        dictivoRows += 1;
        assert.equal((row[priceColumn].match(PRICE_SPAN) || []).length, DICTIVO_PRICES, `${name}: price spans`);
      } else {
        assert.match(row.at(-1), /<time datetime="\d{4}-\d{2}-\d{2}">/, `${name}: check date`);
      }
    }
    assert.equal(dictivoRows, 1, "one Dictivo row");
    assert.equal((table.match(PRICE_SPAN) || []).length, DICTIVO_PRICES, "no other cell has a price span");
    const unpriced = table.replace(PRICE_SPAN, "");
    assert.ok(!unpriced.includes("US$") && !unpriced.includes("米ドル"), "no typed Dictivo price");
    assert.doesNotMatch(table, /undefined|null|NaN|\{\{price\.|FILL_IN|記載なし記載なし/);
    assert.doesNotMatch(text(table), /直接入力|高精度|最も正確/);
  });

  test(`${jaPath}: the method note is signed by the team, and the copy follows the Japanese rules`, { skip: !ready }, () => {
    const html = page();
    const body = main(html);
    const method = between(body, `id="${idPrefix}-method"`, "</section>");
    assert.ok(method.includes("Dictivo チーム"), "signature");
    assert.ok(method.includes(jaDate(checked)), "signature date");
    const visible = text(body);
    assert.ok(!visible.replaceAll("support@dictivo.app", "").includes("@"), "no @ other than support@dictivo.app");
    const withoutTable = text(body.replace(tableAfter(html, `${idPrefix}-table`), ""));
    assert.doesNotMatch(withoutTable, BANNED);
    assert.doesNotMatch(html, /FILL_IN|TODO|undefined|\{\{price\./);
  });

  test(`${jaPath}: the structured data repeats the visible title, FAQ and fact table`, { skip: !ready }, () => {
    const html = page();
    const nodes = jsonLd(html);
    assert.deepEqual(nodes.map((node) => node["@type"]), ["Organization", "TechArticle", "FAQPage", "ItemList", "BreadcrumbList"]);
    const article = nodes.find((node) => node["@type"] === "TechArticle");
    assert.equal(article.inLanguage, "ja");
    assert.equal(article.headline, copy.metaTitle);
    assert.equal(article.datePublished, firstPublished(route, "ja"));
    assert.equal(article.dateModified, lastmod);
    assert.equal(article.image, html.match(/<meta property="og:image" content="([^"]+)"/)[1]);
    const questions = [...main(html).matchAll(/<span class="faq-question">([^<]+)<\/span>/g)].map(([, question]) => text(question).trim());
    assert.ok(questions.length > 0, "FAQ");
    assert.deepEqual(nodes.find((node) => node["@type"] === "FAQPage").mainEntity.map((item) => item.name), questions);
    const table = tableAfter(html, `${idPrefix}-table`);
    const list = nodes.find((node) => node["@type"] === "ItemList");
    assert.deepEqual(list.itemListElement.map((item) => item.name), rows(table).slice(1).map((row) => text(row[0]).trim()));
    for (const item of list.itemListElement) assert.ok(text(table).includes(item.description), `${item.name}: description is not in the table`);
    const crumbs = nodes.find((node) => node["@type"] === "BreadcrumbList").itemListElement.map((item) => [item.name, item.item]);
    assert.deepEqual(crumbs, [["ホーム", "https://dictivo.app/ja/"], [copy.navLabel, jaUrl]]);
  });

  test(`${jaPath}: page date and sitemap agree; the English entry gains only the alternate`, { skip: !ready }, () => {
    assert.ok(between(page(), '<p class="doc-meta">', "</p>").includes(`<time datetime="${lastmod}">`));
    const sitemap = read("sitemap.xml");
    const entry = sitemapEntry(sitemap, jaUrl);
    assert.ok(entry, "Japanese sitemap entry");
    assert.match(entry, new RegExp(`<loc>${escape(jaUrl)}</loc>\\s*<lastmod>${latestDate(lastmod, PRICING_LASTMOD)}</lastmod>`));
    const order = [`hreflang="en" href="${enUrl}"`, `hreflang="ja" href="${jaUrl}"`, `hreflang="x-default" href="${enUrl}"`].map((item) => entry.indexOf(item));
    assert.ok(order.every((at) => at >= 0), `alternates ${order}`);
    assert.deepEqual([...order].sort((a, b) => a - b), order);
    const enEntry = sitemapEntry(sitemap, enUrl);
    assert.ok(enEntry.includes(`hreflang="ja" href="${jaUrl}"`), "English entry lists the Japanese page");
    assert.ok(between(read(enFile), '<p class="doc-meta">', "</p>").includes(`<time datetime="${enLastmod}">`), "English visible date unchanged");
    assert.match(enEntry, new RegExp(`<lastmod>${latestDate(enLastmod, PRICING_LASTMOD)}</lastmod>`), "English lastmod unchanged");
  });

  test(`${jaPath}: reached from the Japanese footer, llms.txt and offline guide only`, { skip: !ready }, () => {
    const jaFooter = footer(read("ja/index.html"));
    const shortcut = jaFooter.indexOf('href="/ja/guides/mac-dictation-shortcut/"');
    assert.ok(shortcut >= 0 && jaFooter.indexOf(`href="${jaPath}"`) > shortcut, "Japanese footer, after the shortcut guide");
    for (const path of ["index.html", "de/index.html"]) assert.ok(!footer(read(path)).includes(`href="${jaPath}"`), path);
    const jaLlms = read("ja/llms.txt");
    assert.ok(jaLlms.includes(`[${copy.navLabel}](${jaUrl})`), "Japanese llms.txt");
    if (jaLlmsEnglishLine) assert.ok(!jaLlms.includes(`(${enUrl})`), "the Japanese page replaces the English line");
    for (const path of ["llms.txt", "de/llms.txt"]) assert.ok(!read(path).includes("/ja/guides/"), path);
    assert.ok(main(read("ja/guides/offline-dictation-on-mac/index.html")).includes(`href="${jaPath}"`), "the Japanese offline guide's body links it");
  });

  test(`${jaPath}: the Homebrew command appears once, as a step`, { skip: !ready }, () => {
    const body = main(page());
    const command = "<code>brew install --cask deepviewsdev/tap/dictivo</code>";
    assert.equal(body.split(command).length - 1, 1);
    const at = body.indexOf(command);
    assert.ok(body.lastIndexOf("<li", at) > body.lastIndexOf("</li>", at), "inside a <li>");
  });

  test(`${jaPath}: every in-site link lands on a built page`, { skip: !ready }, () => {
    assertInSiteLinksResolve(main(page()));
  });

  test(`${jaPath}: downloads carry the page's attribution`, { skip: !ready }, () => {
    const html = page();
    const intro = html.match(/<section[^>]*data-guide-intro[^>]*>[\s\S]*?<\/section>/)[0];
    const mac = intro.match(/href="([^"]+)" data-platform="macos"/)[1].replaceAll("&amp;", "&");
    assert.equal(new URL(mac).searchParams.get("utm_content"), `${introSource}_mac`);
    const trial = html.match(/<section[^>]*data-guide-trial[^>]*>[\s\S]*?<\/section>/)[0];
    const link = trial.match(/href="([^"]+)"[^>]*data-download-content="[^"]+"/)[1].replaceAll("&amp;", "&");
    assert.equal(new URL(link).searchParams.get("utm_content"), trialSource);
  });
}

test("the Japanese offline guide's in-site links, including both Japanese answer guides, land on built pages", () => {
  const body = main(read("ja/guides/offline-dictation-on-mac/index.html"));
  for (const { jaPath } of PAIRS) assert.ok(body.includes(`href="${jaPath}"`), jaPath);
  assertInSiteLinksResolve(body);
});
