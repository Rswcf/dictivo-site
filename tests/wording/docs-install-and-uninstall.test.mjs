import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DOCS_INSTALL_LASTMOD, docsInstallCopy } from "../../data/docs-install-and-uninstall.mjs";

// Docs page I (Batch B2): install Dictivo from the disk image, with Homebrew or from the Windows EXE
// or MSI, and remove it again, including what stays behind. Facts: the desktop app at the tag in
// DOCS_CHECKED_VERSION (tauri.conf.json, windows/hooks.nsh, credential_store.rs, autostart.rs,
// displayLanguage.ts storage rows, release-desktop.yml), the Homebrew tap's cask and README, and the
// site's first-dictation and Windows installer guides. The shared shape is in
// tests/structure/docs-pages.test.mjs; the trial panel is also checked by tests/structure/guide-trial.test.mjs.
const read = (path) => readFileSync(new URL(`../../dist/${path}`, import.meta.url), "utf8");
const release = JSON.parse(readFileSync(new URL("../../data/release.json", import.meta.url), "utf8"));
const windows = release.publicWindowsDownloads === true && Boolean(release.windows?.exe?.url && release.windows?.msi?.url);
const copy = docsInstallCopy({ windows });
const page = () => read("docs/install-and-uninstall/index.html");
const main = (html) => html.split("<main")[1].split("</main>")[0];
const text = (html) => html.replace(/<[^>]+>/g, " ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/\s+/g, " ");
const section = (html, n) => html.slice(html.indexOf(`id="docs-install-section-${n}"`)).split("</section>")[0];
const count = (haystack, needle) => haystack.split(needle).length - 1;
const quickReference = (html) => html.slice(html.indexOf('id="docs-install-quick-reference"')).split("</table>")[0];

const SECTIONS = [
  "Mac: disk image",
  "Mac: Homebrew",
  "Windows: EXE or MSI",
  "After installing",
  "Uninstall on a Mac",
  "Uninstall on Windows",
  "Check a download",
  "All Dictivo docs",
];

const ZAP_FOLDERS = [
  "~/Library/Application Support/com.dictivo.desktop",
  "~/Library/Application Support/Dictivo",
  "~/Library/Caches/com.dictivo.desktop",
  "~/Library/Preferences/com.dictivo.desktop.plist",
  "~/Library/WebKit/com.dictivo.desktop",
];

test("the install page is ready, dated by its constant, and keeps its section order", () => {
  assert.equal(copy.ready, true);
  assert.equal(copy.lastmod, DOCS_INSTALL_LASTMOD);
  assert.equal(copy.showTrial, true);
  assert.equal(copy.trialSource, "docs_install");
  const html = page();
  assert.ok(html.includes("<h1>Install and uninstall Dictivo on Mac and Windows</h1>"));
  assert.ok(html.includes(`<time datetime="${DOCS_INSTALL_LASTMOD}">`));
  assert.deepEqual(
    [...main(html).matchAll(/<h2 id="docs-install-section-\d+-title">([^<]*)<\/h2>/g)].map(([, title]) => title),
    SECTIONS,
  );
});

test("the quick reference lists the four install paths in order", () => {
  const table = quickReference(main(page()));
  assert.deepEqual(
    [...table.matchAll(/<th scope="col">([^<]*)<\/th>/g)].map(([, header]) => header),
    ["Path", "Command or file", "Updates"],
  );
  assert.deepEqual(
    [...table.matchAll(/<th scope="row">([^<]*)<\/th>/g)].map(([, header]) => header),
    ["Mac disk image", "Homebrew cask", "Windows EXE (per-user)", "Windows MSI"],
  );
});

test("each Homebrew command appears once, as the tap and the cask define it", () => {
  const body = main(page());
  const visible = text(body);
  assert.equal(count(body, "<code>brew install --cask deepviewsdev/tap/dictivo</code>"), 1);
  for (const command of ["brew upgrade --cask dictivo", "brew uninstall --cask dictivo", "brew uninstall --zap --cask dictivo"]) {
    assert.equal(count(visible, command), 1, command);
  }
  for (const folder of ZAP_FOLDERS) assert.equal(count(section(body, 5), `<code>${folder}</code>`), 1, folder);
  assert.ok(copy.references.some(([, href]) => href === "https://github.com/deepviewsdev/homebrew-tap"));
});

test("the uninstall sections say what stays behind and how to remove it", () => {
  const body = main(page());
  const mac = text(section(body, 5));
  const win = text(section(body, 6));
  assert.match(mac, /Keychain/);
  assert.match(mac, /com\.dictivo\.desktop/);
  assert.match(mac, /Remove license from this device/);
  assert.match(mac, /~\/\.dictivo\/private-fast/);
  assert.ok(win.includes("%LOCALAPPDATA%\\Dictivo"), "missing %LOCALAPPDATA%\\Dictivo");
  assert.match(win, /Credential Manager/);
  assert.match(win, /com\.dictivo\.desktop/);
  assert.match(win, /Remove license from this device/);
  assert.match(win, /Start at login/);
});

test("the Windows section states the signing limit and leaves the warnings to the installer guide", () => {
  const body = main(page());
  const visible = text(body);
  assert.match(text(section(body, 3)), /not Authenticode-signed/);
  assert.match(text(section(body, 3)), /no ARM build/);
  assert.ok(section(body, 3).includes('href="/guides/windows-installer-blocked/"'));
  assert.doesNotMatch(visible, /Run anyway|Keep anyway|downloads\.json|GitHub Release/);
});

test("the install page carries one trial panel after the quick-reference table", () => {
  const html = page();
  assert.equal(count(html, "data-guide-trial"), 1);
  const panel = html.slice(html.indexOf("data-guide-trial")).split("</section>")[0];
  assert.ok(panel.includes("utm_content=docs_install_mac"));
  assert.equal(panel.includes("utm_content=docs_install_windows"), windows);
  assert.ok(html.indexOf("</table>") < html.indexOf("data-guide-trial"));
});

test("the install page links the guides, the security section and the permissions page", () => {
  const body = main(page());
  for (const href of ["/guides/windows-installer-blocked/", "/security/#installer-integrity", "/guides/first-local-dictation/", "/docs/macos-permissions/"]) {
    assert.ok(body.includes(`href="${href}"`), `missing link ${href}`);
  }
});

test("the install FAQ asks six questions in the planned order", () => {
  assert.equal(copy.faqs.length, 6);
  assert.equal(copy.faqs[0][0], "Is the Homebrew version the same app as the download?");
  assert.equal(copy.faqs.at(-1)[0], "Does uninstalling free my license seat?");
  assert.ok(copy.faqs.some(([question]) => question === "What does brew uninstall --zap remove, and what stays?"));
});

// 2026-11-11: the public releases repository. It mirrors the installers from downloads.dictivo.app
// with their SHA-256 checksums and holds no source code; the page must say so and not imply the
// Windows installer becomes signed.
test("the install page names the releases repository and how to check a checksum", () => {
  const body = main(page());
  const check = text(section(body, 7));
  assert.ok(body.includes('<a href="https://github.com/deepviewsdev/dictivo-releases/releases">Dictivo releases on GitHub</a>'));
  assert.ok(section(body, 7).includes('href="/security/#installer-integrity"'));
  assert.match(check, /source code is not public/);
  assert.match(check, /shasum -a 256/);
  assert.match(check, /Get-FileHash/);
  assert.match(check, /does not make the Windows installer signed/);
  assert.match(check, /SHA256SUMS file of the same version on GitHub/);
  assert.ok(copy.references.some(([, href]) => href === "https://github.com/deepviewsdev/dictivo-releases"));
});
