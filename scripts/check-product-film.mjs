import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { PRODUCT_FILM as film, FILM_COPY } from '../data/product-film.mjs';
const root = new URL('../dist/', import.meta.url);
const get = path => readFileSync(new URL(path.replace(/^\//, ''), root), 'utf8');
for (const code of Object.keys(FILM_COPY)) {
  const page = get(code === 'en' ? 'index.html' : `${code}/index.html`);
  const video = page.match(/<video\b[^>]*>/)?.[0];
  assert(video?.includes(`src="${film.video}"`), `${code}: video must have a static src`);
  assert(video.includes('preload="none"') && !video.includes('autoplay') && !video.includes('hidden'), `${code}: native player fallback / load policy`);
  const all = [...page.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m => JSON.parse(m[1]));
  const schema = all.find(s => s['@type'] === 'VideoObject');
  assert.equal(schema.duration, 'PT35S');
  assert.equal(schema.uploadDate, film.uploadedAt);
  assert(/T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/.test(schema.uploadDate), 'Video uploadDate needs a time and timezone');
  assert.equal(schema.contentUrl, `https://dictivo.app${film.video}`);
  assert.equal(schema.thumbnailUrl, `https://dictivo.app${film.poster}`);
  assert(!schema.embedUrl, 'The watch page is not a separate embeddable player');
  assert(page.includes(`href="${film.path}"`));
  assert(page.includes(film.captions) && page.includes(film.chinese) && page.includes(film.credits));
}
const page = get('demo/index.html');
assert.equal((page.match(/<h1\b/g) || []).length, 1);
assert(page.includes('rel="canonical" href="https://dictivo.app/demo/"'));
assert(page.includes('id="product-film"') && page.includes('Spoken transcript'));
assert(page.includes('Cloud Fast uploads the recording you choose'));
assert(page.includes('not a continuous screen recording'));
assert(page.includes('CC BY 4.0') && page.includes('No endorsement'));
assert(get('sitemap.xml').includes('<loc>https://dictivo.app/demo/</loc>'));
assert(get('media-kit/index.html').includes('id="native-example-title"'));
assert(get('media-kit/index.html').includes('href="/demo/"'));
for (const path of [film.video, film.master, film.poster, film.captions, film.chinese, film.credits]) {
  const size = statSync(new URL(path.slice(1), root)).size;
  assert(size > 0 && size < 25 * 1024 * 1024, `${path}: file missing or above Pages limit`);
}
assert(get(film.captions).includes('Your voice. On your device.'));
console.log('Product film: 10 homepages, native fallback, captions, privacy scope, credits, watch-page metadata, sitemap and asset limits passed.');
