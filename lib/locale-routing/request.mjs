// Search crawlers, AI fetchers, link previews and scripted clients always see the URL they asked for.
// Patterns avoid in-app browser names (Twitter, NAVER, DuckDuckGo…) so real visitors are not skipped.
const AUTOMATED_USER_AGENT = new RegExp(
  [
    "bot\\b", "bot[/_;-]", "crawler", "spider", "crawl", "slurp",
    "google-", "-google", "googleother", "google favicon", "google web preview",
    "yeti/", "daumoa", "seznam", "qwantify", "facebookexternalhit", "facebookcatalog", "meta-externalagent",
    "embedly", "skypeuripreview", "vkshare", "slack-imgproxy", "chatgpt-user", "oai-searchbot", "claude-user",
    "claude-searchbot", "perplexity-user", "ccbot", "diffbot", "cohere-ai", "ia_archiver",
    "lighthouse", "pagespeed", "headlesschrome", "phantomjs", "preview",
  ].join("|"),
  "i",
);

export function isAutomatedClient(userAgent) {
  const ua = String(userAgent || "");
  return !/^mozilla\/5\.0/i.test(ua) || AUTOMATED_USER_AGENT.test(ua);
}

export function navigationKind(headers, origin) {
  const dest = headers.get("sec-fetch-dest");
  if (dest && dest !== "document") return "subresource";
  const purpose = headers.get("sec-purpose") || headers.get("purpose") || headers.get("x-purpose") || "";
  if (/prefetch|prerender|preview/i.test(purpose)) return "prefetch";
  if (!dest && !/text\/html/i.test(headers.get("accept") || "")) return "subresource";
  const site = headers.get("sec-fetch-site");
  if (site) return site === "same-origin" ? "internal" : "entry";
  // Browsers without Fetch Metadata: a same-origin Referer means an in-site click.
  const referer = headers.get("referer");
  if (referer) {
    try {
      if (new URL(referer).origin === origin) return "internal";
    } catch {
      return "entry";
    }
  }
  return "entry";
}

export function readCookie(header, name) {
  for (const part of String(header || "").split(";")) {
    const index = part.indexOf("=");
    if (index === -1 || part.slice(0, index).trim() !== name) continue;
    try {
      return decodeURIComponent(part.slice(index + 1).trim());
    } catch {
      return null;
    }
  }
  return null;
}
