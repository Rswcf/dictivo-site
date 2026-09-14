import { localeForCountry, requiresConsent } from "./countries.mjs";
import { isAutomatedClient, navigationKind, readCookie } from "./request.mjs";

export const COOKIE_NAME = "dictivo_lang";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
// Only unprefixed (English) URLs are redirected. /de/, /zh-hant/ … are explicit choices,
// which keeps every translated URL crawlable and shareable as-is.
export const REDIRECT_SCOPE = "unprefixed";

const pass = (reason) => ({ action: "pass", reason });

export function decideLocaleRoute({ method, url, headers, country, region, routes }) {
  if (method !== "GET" && method !== "HEAD") return pass("method");

  // Language menus on every page, including English-only ones, link with ?lang=.
  if (url.searchParams.has("lang")) {
    const requested = url.searchParams.get("lang");
    const clean = new URL(url);
    clean.searchParams.delete("lang");
    const location = `${clean.pathname}${clean.search}`;
    return routes.locales.includes(requested)
      ? { action: "redirect", location, setCookie: requested, reason: `lang:${requested}` }
      : { action: "redirect", location, reason: "lang:invalid" };
  }

  const page = routes.pages[url.pathname];
  if (!page) return pass("unmapped");

  if (isAutomatedClient(headers.get("user-agent"))) return pass("automated");
  const kind = navigationKind(headers, url.origin);
  if (kind === "subresource" || kind === "prefetch") return pass(kind);
  if (page.locale !== "en") return pass("explicit-locale");

  const saved = readCookie(headers.get("cookie"), COOKIE_NAME);
  if (routes.locales.includes(saved)) {
    const target = page.alternates[saved];
    if (kind !== "entry") return pass("internal");
    if (saved === "en" || !target) return pass(`cookie:${saved}`);
    return { action: "redirect", location: `${target}${url.search}`, reason: `cookie:${saved}` };
  }

  const preferred = localeForCountry(country, { region, acceptLanguage: headers.get("accept-language") });
  const target = page.alternates[preferred];
  if (preferred === "en" || !target) return pass(`country:${preferred}`);
  // EU/EEA visitors (except Germany) are asked first; see countries.mjs.
  if (requiresConsent(country)) {
    return {
      action: "suggest",
      locale: preferred,
      acceptHref: withLang(url, target, preferred),
      stayHref: withLang(url, url.pathname, "en"),
      reason: `suggest:${preferred}`,
    };
  }
  if (kind !== "entry") return pass("internal");
  return { action: "redirect", location: `${target}${url.search}`, reason: `country:${preferred}` };
}

function withLang(url, pathname, code) {
  const next = new URL(url);
  next.pathname = pathname;
  next.searchParams.set("lang", code);
  return `${next.pathname}${next.search}`;
}
