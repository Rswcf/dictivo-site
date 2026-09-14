import test from "node:test";
import assert from "node:assert/strict";
import { CONSENT_REQUIRED_COUNTRIES, candidatesFor } from "../../lib/locale-routing/countries.mjs";
import { SUGGESTION_COPY, injectIntoBody, renderSuggestion } from "../../lib/locale-routing/suggestion.mjs";

test("renders the prompt in the suggested language with both choices", () => {
  const html = renderSuggestion({ locale: "fr", acceptHref: "/fr/?lang=fr", stayHref: "/?lang=en" });
  assert.match(html, /^<aside class="locale-suggestion" lang="fr"/);
  assert.match(html, /href="\/fr\/\?lang=fr">Voir en français<\/a>/);
  assert.match(html, /href="\/\?lang=en">Rester en anglais<\/a>/);
});

test("escapes attribute values", () => {
  const html = renderSuggestion({ locale: "de", acceptHref: '/de/?q="><script>&lang=de', stayHref: "/?lang=en" });
  assert.ok(!html.includes("<script>"));
  assert.match(html, /href="\/de\/\?q=&quot;&gt;&lt;script&gt;&amp;lang=de"/);
});

test("returns nothing for locales without prompt copy", () => {
  assert.equal(renderSuggestion({ locale: "ja", acceptHref: "/ja/", stayHref: "/" }), "");
});

test("has prompt copy for every language a consent country can be offered", () => {
  for (const country of CONSENT_REQUIRED_COUNTRIES) {
    for (const locale of candidatesFor(country).filter((code) => code !== "en")) {
      const copy = SUGGESTION_COPY[locale];
      assert.ok(copy?.text && copy.accept && copy.stay, `${country} → ${locale}`);
    }
  }
});

test("injects right after the opening body tag", () => {
  assert.equal(
    injectIntoBody('<html><body class="page"><main></main></body></html>', "<aside></aside>"),
    '<html><body class="page"><aside></aside><main></main></body></html>',
  );
});
