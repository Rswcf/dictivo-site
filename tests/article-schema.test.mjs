import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

// squirrelscan's schema/json-ld-valid (2026-10-08 audit) flagged Article nodes for a missing
// image, author.name, publisher.name and publisher.logo: it does not follow @id references.
// Each Article now carries all four in place, and its image is the page's og:image.
const dist = new URL("../dist/", import.meta.url).pathname;
const BASE = "https://dictivo.app";
const ORG_ID = `${BASE}/#org`;
const ARTICLE_TYPES = new Set(["Article", "TechArticle", "BlogPosting", "NewsArticle"]);

const files = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? files(path) : [path];
});
const htmlFiles = files(dist).filter((path) => path.endsWith(".html"));
const blocks = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(([, json]) => json);
const walk = (value, visit) => {
  if (Array.isArray(value)) value.forEach((item) => walk(item, visit));
  else if (value && typeof value === "object") {
    visit(value);
    Object.values(value).forEach((item) => walk(item, visit));
  }
};
const types = (node) => [node["@type"]].flat();
const localFile = (url) => join(dist, new URL(url).pathname);

test("every JSON-LD block on every page is valid JSON, and none is written in another form", () => {
  let total = 0;
  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    const found = blocks(html);
    assert.equal(found.length, (html.match(/application\/ld\+json/g) || []).length, `${relative(dist, file)}: a JSON-LD script this test cannot read`);
    for (const json of found) {
      assert.doesNotThrow(() => JSON.parse(json), `${relative(dist, file)}: invalid JSON-LD`);
      total += 1;
    }
  }
  assert.ok(total > 150, `only ${total} JSON-LD blocks`);
});

test("every Article carries its image, author and publisher in place, and the image is the og:image", () => {
  const pages = new Set();
  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    const name = relative(dist, file);
    const ogImage = /<meta property="og:image" content="([^"]+)"/.exec(html)?.[1];
    for (const json of blocks(html)) {
      walk(JSON.parse(json), (node) => {
        if (!types(node).some((type) => ARTICLE_TYPES.has(type))) return;
        pages.add(name);
        assert.ok(node.headline, `${name}: headline`);
        assert.ok(node.datePublished && node.dateModified, `${name}: dates`);
        assert.equal(typeof node.image, "string", `${name}: image`);
        assert.equal(node.image, ogImage, `${name}: the Article image is not the og:image`);
        assert.ok(node.image.startsWith(`${BASE}/`) && existsSync(localFile(node.image)), `${name}: image ${node.image} is not a published file`);

        assert.equal(node.author?.["@type"], "Organization", `${name}: author must be the Organization`);
        assert.equal(node.author["@id"], ORG_ID, `${name}: author @id`);
        assert.equal(node.author.name, "Dictivo", `${name}: author.name`);

        assert.equal(node.publisher?.["@type"], "Organization", `${name}: publisher type`);
        assert.equal(node.publisher["@id"], ORG_ID, `${name}: publisher @id`);
        assert.equal(node.publisher.name, "Dictivo", `${name}: publisher.name`);
        assert.equal(node.publisher.logo?.["@type"], "ImageObject", `${name}: publisher.logo`);
        assert.ok(existsSync(localFile(node.publisher.logo.url)), `${name}: logo ${node.publisher.logo.url} is not a published file`);
      });
    }
  }
  // Offline dictation on Mac in eleven languages, four English guides, the Japanese troubleshooting guide.
  assert.ok(pages.size >= 17, `only ${pages.size} pages carry an Article`);
});

test("no structured data names a person", () => {
  for (const file of htmlFiles) {
    for (const json of blocks(readFileSync(file, "utf8"))) {
      walk(JSON.parse(json), (node) => assert.ok(!types(node).includes("Person"), `${relative(dist, file)}: a Person node`));
    }
  }
});
