import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const dist = new URL("../dist/", import.meta.url).pathname;
// security.html is hand-wrapped and generate-site.mjs keeps the newlines (write() strips trailing
// blanks only), so prose and markup are matched on whitespace-collapsed text. Only the byte-identity
// test reads the raw file.
const flat = (text) => text.replace(/\s+/g, " ");
const raw = () => readFileSync(`${dist}security/index.html`, "utf8");
const page = () => flat(raw());

test("security page is the same bytes at both paths", () => {
  assert.equal(readFileSync(`${dist}security.html`, "utf8"), raw());
});

test("the false 'do not silently switch' sentence is gone (M10, Push A)", () => {
  assert.doesNotMatch(page(), /silently switch/i);
});

test("the host table lists every desktop host with when and what it carries (M10)", () => {
  const html = page();
  const heading = html.indexOf('<h2 id="network-traffic">');
  const table = html.indexOf('<table class="compare-table">');
  assert.ok(heading > 0 && table > heading, "the host table must sit inside the Network traffic section");
  for (const host of ["downloads.dictivo.app", "api.dictivo.app", "huggingface.co", "Licence service", "Run check"]) {
    assert.ok(html.includes(`<th scope="row">${host}`), `${host} row missing`);
  }
  for (const header of ["Host", "When", "Carries", "Safe to block?"]) {
    assert.ok(html.includes(`<th scope="col">${header}</th>`), `${header} column missing`);
  }
});

test("Cloud Fast data-processing facts are stated without vendor names, regions or compliance claims (M10)", () => {
  const html = page();
  assert.ok(html.includes('id="cloud-fast-data"'), "cloud-fast-data section missing");
  assert.ok(html.includes("Dictivo's relay does not store recordings or transcripts"), "relay retention sentence missing");
  assert.ok(html.includes("under its own terms and retention"), "provider retention sentence missing");
  assert.ok(html.includes("does not offer a data processing agreement"), "no-DPA sentence missing");
  assert.doesNotMatch(html, /ElevenLabs|Groq|wizper|\bfal\b|Lemon Squeezy|Cloudflare/i);
  assert.doesNotMatch(html, /GDPR|HIPAA|EU-only|European Union|data cent(er|re)s? in|processed in (the )?(EU|US)/i);
  assert.doesNotMatch(html, /never contacts|does not contact/i);
});

test("upload claims name the engine that transcribes the recording, never the mode of the moment (M10)", () => {
  const html = page();
  assert.ok(html.includes("Audio that Local transcribes never leaves the device."), "Local-mode bullet not re-anchored");
  assert.ok(html.includes("a recording it transcribes never leaves it"), "Local engine sentence missing");
  assert.ok(html.includes("The only request that carries your audio is a Cloud Fast transcription, and no request carries your transcript text."), "closing sentence missing");
  assert.doesNotMatch(html, /while you use Local mode|in Local mode carries|while Local is selected, it is not|never sends a recording anywhere/i);
});

test("the security page carries the review date of this change", () => {
  const reviewed = page().match(/Last reviewed <time datetime="(\d{4}-\d{2}-\d{2})"/);
  assert.ok(reviewed, "review date missing");
  assert.ok(reviewed[1] >= "2026-09-24", `review date ${reviewed[1]} predates the change`);
});
