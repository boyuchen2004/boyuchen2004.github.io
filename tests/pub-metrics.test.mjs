import test from 'node:test';
import assert from 'node:assert/strict';

// Load the actual module against controlled DOM/storage/network boundaries.
test('new snapshot beats stale browser cache; older snapshots cannot overwrite newer source values', async () => {
  const now = Date.now();
  const value = {textContent: '16'};
  const svg = {setAttribute() {}};
  const badge = {dataset: {paperId: 'paper', count: '16', checked: new Date(now - 86400000).toISOString()}, querySelector: selector => selector === 'svg' ? svg : value};
  const storage = new Map([['pub-metric:v2:semantic:paper', JSON.stringify({count: 15, at: now - 172800000})]]);
  globalThis.document = {querySelectorAll: () => [badge], hidden: false, addEventListener() {}};
  globalThis.localStorage = {getItem: key => storage.get(key), setItem: (key, data) => storage.set(key, data)};
  let tick;
  globalThis.setInterval = callback => { tick = callback; return 0; };
  let snapshot = {count: 17, updated_at: new Date(now).toISOString()};
  globalThis.fetch = async () => ({ok: true, json: async () => ({'semantic:paper': snapshot})});
  await import('../assets/js/pub-metrics.js');
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(value.textContent, 17);
  assert.equal(JSON.parse(storage.get('pub-metric:v2:semantic:paper')).count, 17);
  assert.equal(badge.dataset.sync, 'snapshot');
  snapshot = {count: 14, updated_at: new Date(now - 3600000).toISOString()};
  tick();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(value.textContent, 17);
  snapshot = {count: 0, updated_at: new Date(now + 1000).toISOString()};
  tick();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(value.textContent, 0);
});
