import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const SITE_ORIGIN = "https://dictivo.app";
export const STATIC_EXCLUDES = Object.freeze(["/assets/*", "/checkout/*", "/download/*", "/downloads/*"]);

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith(".html") ? [path] : [];
  });
}

// Only directory index pages are canonical; legacy *.html aliases redirect elsewhere.
function urlPathForFile(file) {
  const path = file.split(sep).join("/");
  if (path === "index.html") return "/";
  return path.endsWith("/index.html") ? `/${path.slice(0, -"index.html".length)}` : null;
}

const groupKey = (alternates) => JSON.stringify(Object.entries(alternates).sort(([a], [b]) => a.localeCompare(b)));

// The redirect map is read from the hreflang annotations of the built pages,
// so routing always matches what search engines are told.
export function buildLocaleRoutes({ distDir, locales }) {
  const codeByHtmlLang = new Map(locales.map((locale) => [locale.htmlLang, locale.code]));
  const pages = {};
  for (const file of htmlFiles(distDir)) {
    const path = urlPathForFile(relative(distDir, file));
    if (!path) continue;
    const html = readFileSync(file, "utf8");
    const alternates = {};
    for (const [, hreflang, href] of html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)) {
      if (hreflang === "x-default") continue;
      const code = codeByHtmlLang.get(hreflang);
      if (!code) throw new Error(`${path}: unknown hreflang ${hreflang}`);
      const url = new URL(href);
      if (url.origin !== SITE_ORIGIN) throw new Error(`${path}: alternate on another origin: ${href}`);
      alternates[code] = url.pathname;
    }
    if (Object.keys(alternates).length < 2) continue;
    const htmlLang = html.match(/<html lang="([^"]+)"/)?.[1];
    const locale = codeByHtmlLang.get(htmlLang);
    if (!locale || alternates[locale] !== path) throw new Error(`${path}: lang ${htmlLang} is not the page's own alternate`);
    pages[path] = { locale, alternates };
  }
  for (const [path, page] of Object.entries(pages)) {
    for (const target of Object.values(page.alternates)) {
      if (!pages[target]) throw new Error(`${path}: alternate ${target} is not a translated page`);
      if (groupKey(pages[target].alternates) !== groupKey(page.alternates)) throw new Error(`${path}: alternates differ from ${target}`);
    }
  }
  return { locales: locales.map((locale) => locale.code), pages };
}

export function buildRoutesConfig(routes) {
  const include = [...new Set(Object.keys(routes.pages).map((path) => (path === "/" ? "/" : `/${path.split("/")[1]}/*`)))].sort();
  const exclude = [...STATIC_EXCLUDES, ...routes.locales.filter((code) => code !== "en").map((code) => `/${code}/llms.txt`)];
  const rules = [...include, ...exclude];
  if (include.includes("/*") || rules.length > 100 || rules.some((rule) => rule.length > 100)) {
    throw new Error(`Invalid _routes.json rules: ${rules.join(", ")}`);
  }
  return { version: 1, include, exclude };
}
