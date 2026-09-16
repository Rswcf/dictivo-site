import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { RELEASE_NOTES, earlierReleaseNotes } from "../data/release-notes.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
const release = JSON.parse(readFileSync(new URL("../data/release.json", import.meta.url), "utf8"));
const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

test("earlier releases are listed newest first and never include the current one", () => {
  const versions = earlierReleaseNotes("0.3.48").map((notes) => notes.version);
  assert.deepEqual(versions, ["0.3.47", "0.3.46", "0.3.45", "0.3.44", "0.3.43", "0.3.40", "0.3.39"]);
  assert.deepEqual(earlierReleaseNotes("0.3.40").map((notes) => notes.version), ["0.3.39"]);
  assert.deepEqual(earlierReleaseNotes("0.3.10"), []);
  for (const [version, notes] of Object.entries(RELEASE_NOTES)) assert.match(notes.date, /^\d{4}-\d{2}-\d{2}$/, version);
});

test("the changelog shows every written release note in order", () => {
  const changelog = readFileSync(`${dist}changelog/index.html`, "utf8");
  const earlier = earlierReleaseNotes(release.version);
  let previous = changelog.indexOf(`id="${release.version}"`);
  assert.ok(previous > 0, "current release section missing");
  for (const notes of earlier) {
    const at = changelog.indexOf(`id="${notes.version}"`);
    assert.ok(at > previous, `${notes.version}: missing or out of order`);
    assert.ok(changelog.includes(`datetime="${notes.date}"`), `${notes.version}: date missing`);
    for (const text of [notes.title, ...notes.bullets]) assert.ok(changelog.includes(escape(text)), `${notes.version}: ${text}`);
    previous = at;
  }
  assert.ok(changelog.indexOf('id="0.3.37"') > previous, "hand-written history must follow the release notes");
  assert.equal((changelog.match(/id="0\.3\.\d+"/g) || []).length, new Set(changelog.match(/id="0\.3\.\d+"/g)).size, "duplicate release sections");
});
