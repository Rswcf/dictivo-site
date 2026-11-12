import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { PRODUCT_FILM as film, FILM_COPY, RETIRED_FILM_URLS } from '../data/product-film.mjs';
import { LOCALES } from '../data/site-content.mjs';
const root = new URL('../dist/', import.meta.url);
const get = path => readFileSync(new URL(path.replace(/^\//, ''), root), 'utf8');
const seconds = film.duration.match(/^PT(\d+)S$/)?.[1];
assert(seconds, `${film.duration}: expected PT<seconds>S`);
// The 35-second film (film-v08) used human VCTK recordings under CC BY 4.0. The 68-second film has
// none, so no film surface may still name them. The benchmark method guide cites VCTK for its own
// audio and is not a film surface.
const retired = /film-v08|VCTK|CC BY|35[ -]sec|PT35S/i;
for (const { code } of LOCALES) {
  const page = get(code === 'en' ? 'index.html' : `${code}/index.html`);
  // The player itself waits in a <template>; browsers without JavaScript get the <noscript> copy.
  const video = page.match(/<noscript>\s*(<video\b[^>]*>)/)?.[1];
  assert(video?.includes(`src="${film.video}"`), `${code}: the <noscript> native player must have a static src`);
  assert(video.includes('preload="none"') && !video.includes('autoplay') && !video.includes('hidden'), `${code}: native player fallback / load policy`);
  const all = [...page.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m => JSON.parse(m[1]));
  const schema = all.find(s => s['@type'] === 'VideoObject');
  assert.equal(schema.duration, film.duration);
  assert.equal(schema.uploadDate, film.uploadedAt);
  assert(/T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/.test(schema.uploadDate), 'Video uploadDate needs a time and timezone');
  assert.equal(schema.contentUrl, `https://dictivo.app${film.video}`);
  assert.equal(schema.thumbnailUrl, `https://dictivo.app${film.poster}`);
  assert(!schema.embedUrl, 'The watch page is not a separate embeddable player');
  assert(page.includes(film.captions) && page.includes(film.chinese) && page.includes(film.chineseTraditional));
  const figure = page.match(/<figure class="hero-film" id="demo-video">[\s\S]*?<\/figure>/)?.[0] ?? '';
  assert(figure.includes(`${film.posterSmall} 800w`) && figure.includes(`${film.posterLarge} 2160w`), `${code}: the hero poster srcset must use the current film`);
  assert(figure.includes(`${seconds}`), `${code}: the play label must say ${seconds}`);
  // Since 2026-11-12 the homepage film has no caption; /demo/ carries the disclosure and the credits link.
  assert(!figure.includes('<figcaption'), `${code}: the homepage film must have no caption`);
  assert.doesNotMatch(page, retired, `${code}: the homepage still names the previous film or its recordings`);
}
for (const code of Object.keys(FILM_COPY)) {
  assert(FILM_COPY[code].play.includes(seconds), `${code}: the play label must state ${seconds} seconds`);
}
const page = get('demo/index.html');
assert.equal((page.match(/<h1\b/g) || []).length, 1);
assert(page.includes('rel="canonical" href="https://dictivo.app/demo/"'));
assert(page.includes('id="product-film"') && page.includes('Spoken transcript'));
assert(page.includes('Cloud Fast uploads the recording you choose'));
assert(page.includes('not a continuous screen recording'));
assert(page.includes(`${seconds}-second product film`) && page.includes(`${seconds}-Second Demo`), '/demo/: the duration in the title and player label');
// Disclosures of the 68-second film: generated voice, the default shortcut and the ⌘P recordings.
assert(page.includes('The dictated voice is generated') && page.includes('no recording of a human voice'), '/demo/: the voice is generated');
assert(page.includes('Cmd+Shift+Space') && page.includes('Ctrl+Shift+Space') && page.includes('⌘P'), '/demo/: the shortcut note');
const caption = page.match(/<figure class="hero-film film-watch">[\s\S]*?<figcaption>([\s\S]*?)<\/figcaption>/)?.[1] ?? '';
assert(caption.includes(`<a href="${film.credits}">${FILM_COPY.en.credit}</a>`), '/demo/: the film caption must link the film credits with the credit line');
assert.doesNotMatch(page, retired, '/demo/ still names the previous film or its recordings');
for (const path of [film.video, film.master]) {
  const mb = `${(statSync(new URL(path.slice(1), root)).size / 1e6).toFixed(1)} MB`;
  assert(page.includes(`download>${path === film.video ? '1080p' : '4K'} film · ${mb}</a>`), `/demo/: ${path} download size ${mb}`);
}
assert(get('sitemap.xml').includes('<loc>https://dictivo.app/demo/</loc>'));
const mediaKit = get('media-kit/index.html');
assert(mediaKit.includes('id="native-example-title"'));
assert(mediaKit.includes('href="/demo/"'));
const filmSection = mediaKit.match(/<section[^>]*aria-labelledby="product-film-title"[\s\S]*?<\/section>/)?.[0] ?? '';
assert(filmSection.includes(`${seconds} seconds`), '/media-kit/: the film section must state the duration');
assert.doesNotMatch(filmSection, retired, '/media-kit/: the film section still names the previous film or its recordings');
for (const path of [film.video, film.master, film.poster, film.posterSmall, film.posterLarge, film.captions, film.chinese, film.chineseTraditional, film.credits]) {
  const size = statSync(new URL(path.slice(1), root)).size;
  assert(size > 0 && size < 25 * 1024 * 1024, `${path}: file missing or above Pages limit`);
}
const redirects = get('_redirects').split('\n');
assert.equal(RETIRED_FILM_URLS.length, 8);
for (const [from, to] of RETIRED_FILM_URLS) {
  assert(redirects.includes(`${from} ${to} 301`), `_redirects: ${from} must 301 to ${to}`);
  statSync(new URL(to.slice(1), root));
}
assert(get(film.captions).includes('Quick update: the launch moved to Tuesday.'));
assert(get(film.chineseTraditional).includes('Local 模式') && !get(film.chineseTraditional).includes('开会'), 'zh-Hant captions are converted from the Simplified file');
assert(get(film.credits).includes('no recording of a human voice') && !retired.test(get(film.credits)));
console.log(`Product film: ${LOCALES.length} homepages (native fallback, caption tracks, no figcaption), privacy scope, generated-voice and shortcut disclosures, /demo/ credits caption, watch-page metadata, sitemap, ${RETIRED_FILM_URLS.length} film-v08 redirects and asset limits passed.`);
