import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const code = '//'+fs.readFileSync(new URL('../assets/site.js', import.meta.url), 'utf8').split('// An optional, coarse handoff after a download click.')[1];
function harness(enabled, source, version = "0.3.56") {
  const listeners = {}, elements = [];
  const document = {
    documentElement: { lang: 'ja' },
    addEventListener: (name, fn) => { listeners[name] = fn; },
    getElementById: () => null,
    createElement(tag) { const e = { tag, style: {}, setAttribute() {}, append(...children) { this.children = children; }, addEventListener() {} }; elements.push(e); return e; },
    body: { append() {} },
  };
  vm.runInNewContext(code, { document, analyticsEnabled: enabled, checkoutChannel: value => value === 'google' ? value : null, pageAttribution: { source }, encodeURIComponent });
  return { elements, click: trusted => listeners.click({ isTrusted: trusted, target: { closest: () => ({ dataset: { releaseVersion: version } }) } }) };
}
test('handoff contains only the public channel and requires a trusted click', () => {
  const h = harness(true, 'google'); h.click(false); assert.equal(h.elements.length, 0); h.click(true);
  assert.equal(h.elements.find(e => e.tag === 'a').href, 'dictivo://source?channel=google');
  assert.match(h.elements.find(e => e.tag === 'p').textContent, /同意/);
});
test('opt-out, previews and unrecognized sources expose no source handoff', () => {
  for (const [enabled, source] of [[false, 'google'], [true, 'person@example.com'], [true, 'direct']]) {
    const h = harness(enabled, source); h.click(true); assert.equal(h.elements.length, 0);
  }
});

test('older or unknown installers never expose an unsupported handoff', () => {
  for (const version of ['0.3.54', '0.3.55', '', 'garbage']) {
    const h = harness(true, 'google', version); h.click(true); assert.equal(h.elements.length, 0);
  }
});
