import test from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";

// The 0.3.54 deploy (run 38067395149) failed because check-public-output.mjs escaped the
// apostrophe in "Microsoft's" as &#039; while the generator leaves it as is in body text.
// Build and check a copy of the site whose current release note has both quote characters.
const root = new URL("../", import.meta.url).pathname;
const skipped = new Set([".git", ".claude", ".wrangler", "dist", "node_modules"]);
const anchor = "export const RELEASE_NOTES = Object.freeze({";
const title = "Microsoft's runtime now ships with Dictivo.";
const bullet = `On Windows, Dictivo ships Microsoft's "Visual C++" files & needs no separate install.`;

const run = (work, script) => spawnSync(process.execPath, [join(work, "scripts", script)], { encoding: "utf8" });

test("a current release note with ' and \" passes the public output check", () => {
  const work = mkdtempSync(join(tmpdir(), "dictivo-release-note-"));
  try {
    cpSync(root, work, { recursive: true, filter: (src) => !skipped.has(relative(root, src).split("/")[0]) });
    symlinkSync(join(root, "node_modules"), join(work, "node_modules"));

    const release = JSON.parse(readFileSync(join(root, "data/release.json"), "utf8"));
    writeFileSync(join(work, "data/release.json"), JSON.stringify({ ...release, version: "0.3.99", tag: "v0.3.99" }, null, 2));
    const notesPath = join(work, "data/release-notes.mjs");
    const notes = readFileSync(notesPath, "utf8");
    assert.ok(notes.includes(anchor), "release-notes.mjs no longer opens with the RELEASE_NOTES object");
    const entry = `\n  "0.3.99": Object.freeze({ date: "2026-10-10", title: ${JSON.stringify(title)}, bullets: Object.freeze([${JSON.stringify(bullet)}]) }),`;
    writeFileSync(notesPath, notes.replace(anchor, anchor + entry));

    const generate = run(work, "generate-site.mjs");
    assert.equal(generate.status, 0, generate.stderr);
    const changelog = readFileSync(join(work, "dist/changelog.html"), "utf8");
    assert.ok(changelog.includes("Microsoft's &quot;Visual C++&quot; files &amp; needs"), "the generator did not render the test bullet");

    const check = run(work, "check-public-output.mjs");
    assert.equal(check.status, 0, check.stderr);
    assert.match(check.stdout, /Public output check passed\./);
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
});
