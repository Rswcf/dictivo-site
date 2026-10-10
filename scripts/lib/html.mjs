// HTML escaping for generate-site.mjs. check-public-output.mjs uses the same html() to find
// rendered text, so the check matches what the generator writes (body text keeps ' as is).

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function html(value) {
  return escapeHtml(value)
    .replaceAll("support@dictivo.app", "<!--email_off-->support@dictivo.app<!--/email_off-->")
    .replaceAll("security@dictivo.app", "<!--email_off-->security@dictivo.app<!--/email_off-->");
}

export function attr(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}
