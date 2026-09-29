import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LOCAL_SPEECH_EVIDENCE } from "../data/local-speech-evidence.mjs";

const page = () => readFileSync(new URL("../dist/guides/mac-dictation-benchmark-method/index.html", import.meta.url), "utf8");
const results = JSON.parse(readFileSync(new URL(`..${LOCAL_SPEECH_EVIDENCE.root}/results.json`, import.meta.url), "utf8"));

test("the benchmark short answer states one measured result that the page and its data support", () => {
  const answer = page().match(/id="benchmark-method-answer">[\s\S]*?<p>([\s\S]*?)<\/p>/)[1];
  const turbo = results.models.find((model) => model.model === "large-v3-turbo-q5_0");
  const median = turbo.median_seconds.toFixed(3);
  const seconds = results.duration_seconds.toFixed(1);
  const errors = `${turbo.word_error_analysis.errors} of ${results.reference_words}`;
  const sentence = `On an Apple M4 Pro, Large v3 Turbo Q5 transcribed a ${seconds}-second human-read English sample in a median ${median} s, including process startup and model loading, with ${errors} normalized word errors on this sample.`;
  assert.ok(answer.includes(sentence), answer);
  // The same figures appear in the rendered evidence table.
  const row = LOCAL_SPEECH_EVIDENCE.rows.find(([model]) => model === "Large v3 Turbo Q5");
  assert.equal(row[2], `${median} s`);
  assert.equal(row[3], `${turbo.word_error_analysis.errors} / ${results.reference_words} on this sample`);
  assert.match(LOCAL_SPEECH_EVIDENCE.environment, /Apple M4 Pro/);
  assert.match(LOCAL_SPEECH_EVIDENCE.scope, /process startup, model loading/);
});
