import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { randomUUID, webcrypto } from "node:crypto";
import vm from "node:vm";
import { LOCALES } from "../data/site-content.mjs";

// A Windows browser sees the Windows download first and solid; every other browser, and
// any page without JavaScript, keeps the Mac download first. assets/site.js swaps the two
// links the page already renders, so the Windows link keeps its own href, label and data.
const script = readFileSync(new URL("../assets/site.js", import.meta.url), "utf8");
const dist = new URL("../dist/", import.meta.url).pathname;
const release = JSON.parse(readFileSync(new URL("../data/release.json", import.meta.url), "utf8"));
const hasWindowsRelease = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);

const start = script.indexOf("function preferredDownloadPlatform(");
const end = script.indexOf("const visitorPlatform", start);
assert.ok(start >= 0 && end > start, "the platform section of site.js must keep its boundaries");
const platformSection = vm.createContext({});
vm.runInContext(script.slice(start, end), platformSection);
const { preferredDownloadPlatform, promoteWindowsDownloads } = platformSection;

const UA = {
  windowsChrome: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
  windowsFirefox: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:143.0) Gecko/20100101 Firefox/143.0",
  windowsEdge: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0",
  windowsArmFirefox: "Mozilla/5.0 (Windows NT 10.0; ARM64; rv:143.0) Gecko/20100101 Firefox/143.0",
  windowsPhone: "Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Mobile Safari/537.36 Edge/15.15063",
  xbox: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19041",
  macChrome: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
  macSafari: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15",
  linuxFirefox: "Mozilla/5.0 (X11; Linux x86_64; rv:143.0) Gecko/20100101 Firefox/143.0",
  android: "Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36",
  iphone: "Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1",
  chromeOs: "Mozilla/5.0 (X11; CrOS x86_64 16328.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
};

test("Windows desktops, whichever signal names Windows, are offered Windows", () => {
  const cases = [
    ["Chrome with client hints", { userAgentData: { platform: "Windows", mobile: false }, platform: "Win32", userAgent: UA.windowsChrome }],
    ["Edge with client hints", { userAgentData: { platform: "Windows", mobile: false }, platform: "Win32", userAgent: UA.windowsEdge }],
    ["Firefox without client hints", { platform: "Win32", userAgent: UA.windowsFirefox }],
    ["Windows on ARM (x64 installer runs under emulation)", { platform: "Win32", userAgent: UA.windowsArmFirefox }],
    ["only the user agent string names Windows", { userAgent: UA.windowsChrome }],
    ["only navigator.platform names Windows", { platform: "Win32", userAgent: "" }],
    ["only the client hints name Windows", { userAgentData: { platform: "Windows", mobile: false } }],
    // A user agent override (DevTools, headless Chrome --user-agent) leaves the other two at macOS.
    ["a Windows user agent on a browser whose hints still say macOS", { userAgentData: { platform: "macOS", mobile: false }, platform: "MacIntel", userAgent: UA.windowsChrome }],
  ];
  for (const [name, nav] of cases) assert.equal(preferredDownloadPlatform(nav), "windows", name);
});

test("Macs are offered the Mac; phones, consoles, Linux, ChromeOS and unknown browsers get no preference", () => {
  const cases = [
    ["Mac Chrome", { userAgentData: { platform: "macOS", mobile: false }, platform: "MacIntel", userAgent: UA.macChrome }, "macos"],
    ["Mac Safari", { platform: "MacIntel", userAgent: UA.macSafari }, "macos"],
    ["Linux", { platform: "Linux x86_64", userAgent: UA.linuxFirefox }, ""],
    ["ChromeOS", { userAgentData: { platform: "Chrome OS", mobile: false }, platform: "Linux x86_64", userAgent: UA.chromeOs }, ""],
    ["Android", { userAgentData: { platform: "Android", mobile: true }, platform: "Linux armv81", userAgent: UA.android }, ""],
    ["iPhone", { platform: "iPhone", userAgent: UA.iphone }, ""],
    ["Windows Phone", { platform: "Win32", userAgent: UA.windowsPhone }, ""],
    ["a mobile browser whose hints say Windows", { userAgentData: { platform: "Windows", mobile: true }, platform: "Win32", userAgent: UA.windowsChrome }, ""],
    ["Xbox", { platform: "Win32", userAgent: UA.xbox }, ""],
    ["an empty navigator", {}, ""],
    ["no navigator", undefined, ""],
  ];
  for (const [name, nav, expected] of cases) assert.equal(preferredDownloadPlatform(nav), expected, name);
});

// Just enough DOM for the swap: a group whose children are links, with querySelector by
// data-platform, insertBefore and setAttribute.
class Link {
  constructor(platform, className, content, text) {
    this.className = className;
    this.dataset = { platform, artifact: platform === "windows" ? "nsis" : "dmg", releaseVersion: "0.3.52", downloadContent: content };
    this.href = `https://api.dictivo.app/download/${platform === "windows" ? "windows" : "mac"}?version=0.3.52&utm_source=site&utm_medium=download_cta&utm_content=${content}`;
    this.textContent = text;
    this.parentNode = null;
    this.listeners = {};
  }
  get classList() {
    return { contains: (name) => this.className.split(/\s+/).includes(name) };
  }
  hasAttribute() { return false; }
  addEventListener(name, listener) { this.listeners[name] = listener; }
}

class Group {
  constructor(children) {
    this.children = [];
    this.attributes = {};
    for (const child of children) { child.parentNode = this; this.children.push(child); }
  }
  querySelector(selector) {
    const platform = /data-platform="([a-z]+)"/.exec(selector)?.[1];
    return this.children.find((child) => child.dataset?.platform === platform && child.classList.contains("download-link")) ?? null;
  }
  insertBefore(node, reference) {
    this.children.splice(this.children.indexOf(node), 1);
    this.children.splice(this.children.indexOf(reference), 0, node);
  }
  setAttribute(name, value) { this.attributes[name] = value; }
}

function heroGroup() {
  const mac = new Link("macos", "button button-light download-link", "hero_top_mac", "Für Mac herunterladen");
  const windows = new Link("windows", "button button-outline download-link", "hero_top_windows", "Für Windows herunterladen");
  return { group: new Group([mac, windows]), mac, windows };
}

const page = (groups) => ({ querySelectorAll: (selector) => (selector === "[data-platform-downloads]" ? groups : []) });

test("on Windows the Windows link moves first and takes the solid style, with its own label and data", () => {
  const { group, mac, windows } = heroGroup();
  assert.equal(promoteWindowsDownloads(page([group]), "windows"), 1);
  assert.deepEqual(group.children, [windows, mac]);
  assert.equal(windows.className, "button button-light download-link");
  assert.equal(mac.className, "button button-outline download-link");
  assert.equal(windows.textContent, "Für Windows herunterladen");
  assert.deepEqual(windows.dataset, { platform: "windows", artifact: "nsis", releaseVersion: "0.3.52", downloadContent: "hero_top_windows" });
  assert.ok(new URL(windows.href).pathname.endsWith("/download/windows"));
  assert.equal(group.attributes["data-platform-promoted"], "windows");
});

test("a third button in the group, like the comparison pricing link, stays where it is", () => {
  const mac = new Link("macos", "button button-light download-link", "compare_x", "Start free · macOS");
  const windows = new Link("windows", "button button-outline download-link", "compare_x_windows", "Start free · Windows");
  const pricing = { className: "button button-outline", dataset: {}, classList: { contains: () => false } };
  const group = new Group([mac, windows, pricing]);
  promoteWindowsDownloads(page([group]), "windows");
  assert.deepEqual(group.children, [windows, mac, pricing]);
});

test("Mac, unknown platforms and pages without a Windows link keep the Mac first", () => {
  for (const platform of ["macos", "", undefined]) {
    const { group, mac, windows } = heroGroup();
    assert.equal(promoteWindowsDownloads(page([group]), platform), 0, String(platform));
    assert.deepEqual(group.children, [mac, windows]);
    assert.equal(mac.className, "button button-light download-link");
    assert.deepEqual(group.attributes, {});
  }
  // Windows downloads switched off: the page renders the Mac link alone.
  const mac = new Link("macos", "button button-light download-link", "hero_top_mac", "Download for Mac");
  const macOnly = new Group([mac]);
  assert.equal(promoteWindowsDownloads(page([macOnly]), "windows"), 0);
  assert.deepEqual(macOnly.children, [mac]);
  assert.equal(mac.className, "button button-light download-link");
});

// The whole script on a public page in a Windows browser: the swap happens, the
// download-card recommendation agrees, and a click on the promoted link is still
// reported as a Windows click from the hero_top_windows button.
test("the whole script promotes Windows and a click on it is attributed to Windows", () => {
  const { group, mac, windows } = heroGroup();
  const events = [];
  const recommended = [];
  const location = new URL("https://dictivo.app/de/");
  class IntersectionObserver { observe() {} unobserve() {} }
  const context = vm.createContext({
    URL, URLSearchParams, IntersectionObserver, location,
    crypto: { randomUUID, getRandomValues: webcrypto.getRandomValues.bind(webcrypto) },
    window: { location, IntersectionObserver },
    document: {
      referrer: "", documentElement: { lang: "de" },
      addEventListener: () => {},
      getElementById: () => null,
      querySelector: (selector) => (selector.startsWith("[data-platform-card=") ? { setAttribute: (name, value) => recommended.push([selector, name, value]) } : null),
      querySelectorAll: (selector) => ({ "[data-platform-downloads]": [group], "a.download-link": [mac, windows] })[selector] ?? [],
    },
    navigator: {
      userAgent: UA.windowsEdge, platform: "Win32", userAgentData: { platform: "Windows", mobile: false },
      sendBeacon: (endpoint, body) => { events.push({ endpoint, ...JSON.parse(body) }); return true; },
    },
    fetch: () => Promise.resolve({ ok: true }),
  });
  vm.runInContext(script, context);
  assert.deepEqual(group.children, [windows, mac]);
  assert.deepEqual(recommended, [['[data-platform-card="windows"]', "data-recommended", "true"]]);
  windows.listeners.click();
  const click = events.at(-1);
  assert.equal(click.event, "download_cta_clicked");
  assert.equal(click.platform, "windows");
  assert.equal(click.artifact, "nsis");
  assert.equal(click.content, "hero_top_windows");
  assert.ok(new URL(windows.href).pathname.endsWith("/download/windows"));
  mac.listeners.click();
  assert.equal(events.at(-1).platform, "macos");
  assert.equal(events.at(-1).content, "hero_top_mac");
});

// The static HTML is the no-JavaScript state: Mac first and solid, Windows beside it.
const files = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? files(path) : [path];
});
const groups = (html) => [...html.matchAll(/<div class="[^"]*"[^>]*\sdata-platform-downloads>([\s\S]*?)<\/div>/g)].map(([, body]) => body);
const downloadLinks = (body) => [...body.matchAll(/<a class="([^"]*\bdownload-link\b[^"]*)" href="([^"]+)" data-platform="([^"]+)"[^>]*data-download-content="([^"]+)">([^<]+)<\/a>/g)]
  .map(([, className, href, platform, content, text]) => ({ className, href: href.replace(/&amp;/g, "&"), platform, content, text }));

test("every Mac and Windows download pair is rendered Mac first, with matching link data", () => {
  let pairs = 0;
  for (const file of files(dist).filter((path) => path.endsWith(".html"))) {
    for (const body of groups(readFileSync(file, "utf8"))) {
      const links = downloadLinks(body);
      assert.equal(links.length, hasWindowsRelease ? 2 : 1, `${file}: download links in a platform group`);
      const [mac, windows] = links;
      assert.equal(mac.platform, "macos", file);
      assert.match(mac.className, /\bbutton-light\b/, file);
      if (!hasWindowsRelease) continue;
      pairs += 1;
      assert.equal(windows.platform, "windows", file);
      assert.match(windows.className, /\bbutton-outline\b/, file);
      for (const link of [mac, windows]) {
        const href = new URL(link.href);
        assert.equal(href.pathname, link.platform === "windows" ? "/download/windows" : "/download/mac", `${file}: ${link.content}`);
        assert.equal(href.searchParams.get("utm_content"), link.content, `${file}: utm_content and data-download-content`);
      }
    }
  }
  if (hasWindowsRelease) assert.ok(pairs >= 11 + 11 * 2, `only ${pairs} Mac and Windows pairs`);
});

test("each homepage hero carries the pair, and its Windows label is the download card's own Windows button", () => {
  for (const locale of LOCALES) {
    const html = readFileSync(`${dist}${locale.code === "en" ? "" : `${locale.code}/`}index.html`, "utf8");
    const hero = /<div class="hero-actions hero-actions--top"[^>]*data-platform-downloads>([\s\S]*?)<\/div>/.exec(html)?.[1];
    assert.ok(hero, `${locale.code}: the hero download group is missing`);
    const links = downloadLinks(hero);
    assert.deepEqual(links.map((link) => link.content), hasWindowsRelease ? ["hero_top_mac", "hero_top_windows"] : ["hero_top_mac"], locale.code);
    if (!hasWindowsRelease) continue;
    const card = /data-download-content="downloads_windows_exe">([^<]+)<\/a>/.exec(html)?.[1];
    assert.ok(card, `${locale.code}: the Windows download card is missing`);
    assert.equal(links[1].text, card, `${locale.code}: the hero Windows label is not the card's label`);
    if (locale.code !== "en") assert.notEqual(links[1].text, "Download for Windows", `${locale.code}: English fallback`);
  }
});
