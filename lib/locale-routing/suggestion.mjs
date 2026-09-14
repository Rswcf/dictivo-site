// Prompt shown instead of a redirect where explicit consent is required.
export const SUGGESTION_COPY = Object.freeze({
  de: { text: "Diese Seite gibt es auch auf Deutsch.", accept: "Auf Deutsch ansehen", stay: "Auf Englisch bleiben" },
  fr: { text: "Cette page existe aussi en français.", accept: "Voir en français", stay: "Rester en anglais" },
  es: { text: "Esta página también está disponible en español.", accept: "Ver en español", stay: "Seguir en inglés" },
  it: { text: "Questa pagina è disponibile anche in italiano.", accept: "Vedi in italiano", stay: "Resta in inglese" },
  nl: { text: "Deze pagina is ook beschikbaar in het Nederlands.", accept: "Bekijk in het Nederlands", stay: "In het Engels blijven" },
  pt: { text: "Esta página também está disponível em português.", accept: "Ver em português", stay: "Continuar em inglês" },
});

const escapeHtml = (value) =>
  String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export function renderSuggestion({ locale, acceptHref, stayHref }) {
  const copy = SUGGESTION_COPY[locale];
  if (!copy) return "";
  return `<aside class="locale-suggestion" lang="${escapeHtml(locale)}" aria-label="${escapeHtml(copy.text)}">`
    + `<p>${escapeHtml(copy.text)}</p>`
    + `<a class="locale-suggestion-accept" href="${escapeHtml(acceptHref)}">${escapeHtml(copy.accept)}</a>`
    + `<a class="locale-suggestion-stay" href="${escapeHtml(stayHref)}">${escapeHtml(copy.stay)}</a>`
    + `</aside>`;
}

export function injectIntoBody(html, markup) {
  return html.replace(/<body\b[^>]*>/i, (tag) => `${tag}${markup}`);
}
