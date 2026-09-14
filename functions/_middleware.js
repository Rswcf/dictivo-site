import routes from "../lib/locale-routing/generated/routes.json" with { type: "json" };
import { COOKIE_MAX_AGE, COOKIE_NAME, decideLocaleRoute } from "../lib/locale-routing/decide.mjs";
import { injectIntoBody, renderSuggestion } from "../lib/locale-routing/suggestion.mjs";

// Country overrides exist for end-to-end tests on preview deployments only.
const TEST_HOSTS = /(^|\.)dictivo-app\.pages\.dev$|^localhost$|^127\.0\.0\.1$/;

function routeFor(request) {
  const url = new URL(request.url);
  const testable = TEST_HOSTS.test(url.hostname);
  const override = (name) => (testable ? request.headers.get(name) : null);
  return decideLocaleRoute({
    method: request.method,
    url,
    headers: request.headers,
    country: override("x-dictivo-test-country") ?? request.cf?.country ?? "",
    region: override("x-dictivo-test-region") ?? request.cf?.regionCode ?? "",
    routes,
  });
}

function tagged(response, reason) {
  try {
    const out = new Response(response.body, response);
    out.headers.set("X-Dictivo-Locale-Route", reason);
    return out;
  } catch {
    return response;
  }
}

// The prompt is personalized, so it must never come from a cache: conditional request
// headers are dropped (a 304 would hide it) and the response is private and uncached.
async function withSuggestion(context, decision, markup) {
  const requestHeaders = new Headers(context.request.headers);
  requestHeaders.delete("if-none-match");
  requestHeaders.delete("if-modified-since");
  const response = await context.next(new Request(context.request, { headers: requestHeaders }));
  if (response.status !== 200 || !/text\/html/i.test(response.headers.get("content-type") || "")) {
    return tagged(response, `${decision.reason}:skipped`);
  }

  const headers = new Headers(response.headers);
  for (const name of ["content-length", "etag", "last-modified"]) headers.delete(name);
  headers.set("Cache-Control", "private, no-store");
  headers.set("X-Dictivo-Locale-Route", decision.reason);
  const init = { status: response.status, statusText: response.statusText, headers };

  if (typeof HTMLRewriter === "function") {
    return new HTMLRewriter()
      .on("body", { element: (element) => element.prepend(markup, { html: true }) })
      .transform(new Response(response.body, init));
  }
  return new Response(injectIntoBody(await response.text(), markup), init);
}

export async function onRequest(context) {
  let decision;
  let markup = "";
  try {
    decision = routeFor(context.request);
    if (decision.action === "suggest") markup = renderSuggestion(decision);
  } catch {
    return context.next();
  }

  if (decision.action === "redirect") {
    const headers = new Headers({
      Location: decision.location,
      "Cache-Control": "private, no-store",
      Vary: "Cookie",
      "X-Dictivo-Locale-Route": decision.reason,
    });
    if (decision.setCookie) {
      headers.set("Set-Cookie", `${COOKIE_NAME}=${decision.setCookie}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax; Secure; HttpOnly`);
    }
    return new Response(null, { status: 302, headers });
  }

  if (decision.action === "suggest" && markup) return withSuggestion(context, decision, markup);
  return tagged(await context.next(), decision.reason);
}
