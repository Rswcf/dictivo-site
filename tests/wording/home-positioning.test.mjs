import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LOCALES } from "../../data/site-content.mjs";

// Batch A (2026-11-10): the English and Japanese homepages say "one-time purchase" in the title,
// description and hero lede. The headline stays. It reads only dist/.
const dist = new URL("../../dist/", import.meta.url).pathname;
const read = (path) => readFileSync(join(dist, path), "utf8");
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
const text = (markup) => decode(markup.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const title = (html) => decode(/<title>([^<]*)<\/title>/.exec(html)?.[1] ?? "");
const description = (html) => decode(/<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? "");
const lede = (html) => text(/<p class="hero-lede">([\s\S]*?)<\/p>/.exec(html)?.[1] ?? "");
const h1 = (html) => text(/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html)?.[1] ?? "");

test("the English homepage calls Dictivo Local a one-time purchase", () => {
  const html = read("index.html");
  assert.equal(title(html), "Offline Dictation App for Mac & Windows - One-Time Purchase | Dictivo");
  assert.equal(
    description(html),
    "Offline dictation app for Mac and Windows. Dictivo Local is a one-time purchase, no subscription. Local mode keeps audio on your device - verify it yourself.",
  );
  assert.doesNotMatch(description(html), /types what you say/);
  assert.ok(lede(html).includes("Dictivo Local is a one-time purchase for Mac and Windows, with no subscription."), lede(html));
  assert.equal(h1(html), "Speak your next draft. Keep your audio local.");
});

test("the Japanese homepage calls the app 買い切り in its title and lede", () => {
  const html = read("ja/index.html");
  assert.ok(lede(html).includes("買い切りの音声入力アプリ"), lede(html));
  assert.ok(title(html).includes("買い切り"), title(html));
  assert.equal(h1(html), "次の下書きは、声で。 音声はデバイス内に。");
});

test("every homepage title stays under 70 and description under 160 characters", () => {
  for (const locale of LOCALES) {
    const path = locale.code === "en" ? "index.html" : `${locale.code}/index.html`;
    const html = read(path);
    const [titleLength, descriptionLength] = [title(html), description(html)].map((value) => [...value].length);
    assert.ok(titleLength > 0 && titleLength < 70, `${path}: title is ${titleLength} characters`);
    assert.ok(descriptionLength > 0 && descriptionLength < 160, `${path}: description is ${descriptionLength} characters`);
  }
});
