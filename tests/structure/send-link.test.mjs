import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { LOCALES } from "../../data/site-content.mjs";

// Batch A (2026-11-10): a phone visitor cannot install a desktop app, so the homepage hero offers a
// plain mailto: link (no recipient, no script) that mails the homepage address to themselves.
// site.css shows it only on touch-first devices. It reads only dist/ and the two assets.
const dist = new URL("../../dist/", import.meta.url).pathname;
const read = (path) => readFileSync(join(dist, path), "utf8");
const files = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? files(path) : [path];
});
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
const homePath = (locale) => (locale.code === "en" ? "index.html" : `${locale.code}/index.html`);

const COPY = {
  en: ["On your phone? Email this link to yourself", "Dictivo for Mac and Windows", "Open this link on your Mac or Windows PC:"],
  de: ["Am Handy? Senden Sie sich den Link per E-Mail", "Dictivo für Mac und Windows", "Öffnen Sie diesen Link auf Ihrem Mac oder Windows-PC:"],
  fr: ["Sur votre téléphone ? Envoyez-vous le lien par e-mail", "Dictivo pour Mac et Windows", "Ouvrez ce lien sur votre Mac ou PC Windows :"],
  es: ["¿Estás en el móvil? Envíate el enlace por correo", "Dictivo para Mac y Windows", "Abre este enlace en tu Mac o PC con Windows:"],
  it: ["Sei sul telefono? Inviati il link via email", "Dictivo per Mac e Windows", "Apri questo link sul tuo Mac o PC Windows:"],
  nl: ["Op je telefoon? Mail jezelf de link", "Dictivo voor Mac en Windows", "Open deze link op je Mac of Windows-pc:"],
  pt: ["No celular? Envie o link para o seu e-mail", "Dictivo para Mac e Windows", "Abra este link no seu Mac ou PC com Windows:"],
  zh: ["在手机上？把链接发到自己的邮箱", "Dictivo：Mac 和 Windows 版", "请在 Mac 或 Windows 电脑上打开这个链接："],
  ja: ["スマートフォンでご覧の方へ：リンクを自分宛てにメールで送る", "Dictivo（Mac・Windows 対応）", "MacまたはWindowsパソコンでこのリンクを開いてください："],
  ko: ["휴대폰으로 보고 계신가요? 링크를 내 이메일로 보내기", "Dictivo (Mac 및 Windows용)", "Mac 또는 Windows PC에서 이 링크를 여세요:"],
};

test("each homepage hero has one send-link that mails its own address", () => {
  for (const locale of LOCALES) {
    const path = homePath(locale);
    const html = read(path);
    assert.equal((html.match(/class="send-link"/g) || []).length, 1, `${path}: send-link count`);
    const at = html.indexOf('class="send-link"');
    assert.ok(html.indexOf('class="hero-trial"') < at, `${path}: send-link comes after the trial line`);
    assert.ok(at < html.indexOf("<figure"), `${path}: send-link comes before the hero film`);

    const [, rawHref, rawLabel] = /<p class="send-link"><a href="([^"]*)">([^<]*)<\/a><\/p>/.exec(html) ?? [];
    assert.ok(rawHref, `${path}: send-link markup`);
    assert.ok(rawHref.startsWith("mailto:?subject="), `${path}: ${rawHref}`);
    assert.ok(rawHref.includes("&amp;body="), `${path}: the & before body= is escaped in HTML`);
    assert.doesNotMatch(rawHref, /[ \n\r\t]/, `${path}: raw whitespace in the href`);

    const href = decode(rawHref);
    const [, subject, body] = /^mailto:\?subject=([^&]*)&body=([^&]*)$/.exec(href) ?? [];
    assert.ok(subject && body, `${path}: subject and body are the only fields: ${href}`);
    const url = `https://dictivo.app${locale.path}?utm_source=send_to_self&utm_medium=email`;
    assert.ok(decodeURIComponent(body).endsWith(url), `${path}: ${decodeURIComponent(body)}`);

    const label = decode(rawLabel);
    if (locale.code === "zh-hant") {
      assert.ok(url.endsWith("/zh-hant/?utm_source=send_to_self&utm_medium=email"));
      assert.ok(label.length > 0, `${path}: empty label`);
      continue;
    }
    const [expectedLabel, expectedSubject, expectedBody] = COPY[locale.code];
    assert.equal(label, expectedLabel, `${path}: label`);
    assert.equal(decodeURIComponent(subject), expectedSubject, `${path}: subject`);
    assert.equal(decodeURIComponent(body), `${expectedBody}\n${url}`, `${path}: body`);
  }
});

test("only homepages carry the send-link", () => {
  const homes = new Set(LOCALES.map(homePath));
  for (const file of files(dist).filter((path) => path.endsWith(".html"))) {
    const path = relative(dist, file);
    if (homes.has(path)) continue;
    assert.ok(!readFileSync(file, "utf8").includes('class="send-link"'), `${path}: send-link outside a homepage`);
  }
  const script = readFileSync(new URL("../../assets/site.js", import.meta.url), "utf8");
  assert.ok(!script.includes("send-link"), "site.js must not touch the send-link");
});

function withoutBlocks(css, opener) {
  let out = css;
  for (let start = out.indexOf(opener); start >= 0; start = out.indexOf(opener)) {
    let depth = 0;
    let end = out.indexOf("{", start);
    for (; end < out.length; end += 1) {
      if (out[end] === "{") depth += 1;
      if (out[end] === "}" && --depth === 0) break;
    }
    out = out.slice(0, start) + out.slice(end + 1);
  }
  return out;
}
function block(css, opener) {
  const start = css.indexOf(opener);
  assert.ok(start >= 0, `site.css: ${opener} missing`);
  let depth = 0;
  for (let at = css.indexOf("{", start); at < css.length; at += 1) {
    if (css[at] === "{") depth += 1;
    if (css[at] === "}" && --depth === 0) return css.slice(start, at + 1);
  }
  throw new Error(`site.css: ${opener} is not closed`);
}
const rule = (css, selector) => new RegExp(`(^|[\\n}])\\s*${selector.replace(/[.[\]()]/g, "\\$&")}\\s*\\{([^}]*)\\}`).exec(css)?.[2] ?? "";

test("site.css hides the send-link except on touch-first devices", () => {
  const css = readFileSync(new URL("../../assets/site.css", import.meta.url), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  assert.match(rule(withoutBlocks(css, "@media"), ".send-link"), /display:\s*none/, "hidden outside media blocks");
  const touch = block(css, "@media (hover: none) and (pointer: coarse)");
  assert.match(rule(touch, ".send-link"), /display:\s*block/, "shown on touch-first devices");
  assert.ok(css.indexOf(".send-link") < css.indexOf("@media (hover: none) and (pointer: coarse)"), "the touch block follows the base rule");
});
