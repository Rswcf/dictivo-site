import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { TRIAL_MILESTONE_COPY } from "../data/trial-milestone-copy.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
// Visible text only: scripts and tags out, whitespace collapsed.
const visibleText = (path) =>
  readFileSync(path, "utf8")
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ");

test("trial milestones name app.dictivo.app first in every language, api.dictivo.app only for versions before 0.3.51", () => {
  for (const [locale, copy] of Object.entries(TRIAL_MILESTONE_COPY)) {
    const current = copy.trial.indexOf("app.dictivo.app");
    const legacy = copy.trial.indexOf("api.dictivo.app");
    assert.ok(current >= 0, `${locale}: trial copy does not name app.dictivo.app`);
    assert.ok(legacy > current, `${locale}: api.dictivo.app is named before app.dictivo.app`);
    assert.ok(copy.trial.includes("0.3.51"), `${locale}: api.dictivo.app is not tied to versions before 0.3.51`);
  }
});

test("the Privacy Policy and /security/ call the statistics setting what the app calls it", () => {
  for (const path of ["privacy/index.html", "security/index.html"]) {
    const text = visibleText(`${dist}${path}`);
    assert.ok(text.includes("Share usage statistics"), `${path}: the 0.3.51 setting name is missing`);
    assert.ok(!text.includes("Anonymous usage statistics"), `${path}: still titled Anonymous usage statistics`);
    assert.ok(!/anonymous statistics/i.test(text), `${path}: still calls the statistics anonymous`);
    assert.ok(text.includes("hashed device identifier that does not name you"), `${path}: the device identifier is not disclosed`);
  }
});

test("German pages address the reader as Sie", () => {
  const pages = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (name === "index.html") pages.push(path);
    }
  };
  walk(`${dist}de`);
  assert.ok(pages.length >= 10, `only ${pages.length} German pages found`);
  for (const path of pages) {
    const informal = visibleText(path).match(/\b(du|dein|deine|deinem|deinen|deiner|deines|dich|dir)\b/g);
    assert.equal(informal, null, `${path.slice(dist.length)} uses du-forms: ${informal?.join(", ")}`);
  }
});
