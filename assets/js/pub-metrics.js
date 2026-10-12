// Semantic Scholar's public API is optional: retain the last verified count
// when it is unavailable, and explain freshness in the badge tooltip.
const badges = [...document.querySelectorAll('[data-paper-id]')];
const refreshMs = 60 * 60 * 1000;

async function refreshPaper(paperId, links) {
  const key = `s2-citations:${paperId}`;
  let cached;
  try { cached = JSON.parse(localStorage.getItem(key)); } catch { /* Storage is optional. */ }
  const valid = data => data && Number.isSafeInteger(data.count) && data.count >= 0 && Number.isFinite(data.at);
  function show(data, live) {
    for (const link of links) {
      link.querySelector('[data-citation-value]').textContent = data.count;
      link.querySelector('svg').setAttribute('aria-label', `Semantic Scholar: ${data.count} citations`);
      link.dataset.sync = live ? 'current' : 'cached';
      link.title = `Semantic Scholar: ${data.count} citations. Updated ${new Date(data.at).toLocaleString()}. Refreshes hourly while this page is open.`;
    }
  }
  if (valid(cached)) {
    show(cached, false);
    if (Date.now() - cached.at < refreshMs) return;
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const url = `https://api.semanticscholar.org/graph/v1/paper/${paperId}?fields=citationCount`;
    const response = await fetch(url, {signal: controller.signal, credentials: 'omit'});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const paper = await response.json();
    const data = {count: paper.citationCount, at: Date.now()};
    if (!valid(data)) throw new Error('Invalid citation count');
    show(data, true);
    try { localStorage.setItem(key, JSON.stringify(data)); } catch { /* Badge still updates without storage. */ }
  } catch (error) {
    for (const link of links) {
      link.dataset.sync = 'unavailable';
      const known = valid(cached) ? `${cached.count} citations, updated ${new Date(cached.at).toLocaleString()}`
        : link.dataset.count !== '' ? `${link.dataset.count} citations, last verified ${link.dataset.checked}` : 'count not yet available';
      link.title = `Semantic Scholar: ${known}. Live refresh unavailable (service or browser access); retrying hourly. Click to view current source.`;
    }
  } finally { clearTimeout(timeout); }
}
function refreshAll() {
  const papers = new Map();
  for (const badge of badges) {
    const id = badge.dataset.paperId;
    if (!papers.has(id)) papers.set(id, []);
    papers.get(id).push(badge);
  }
  for (const [id, links] of papers) refreshPaper(id, links);
}
if (badges.length) {
  refreshAll();
  setInterval(() => { if (!document.hidden) refreshAll(); }, refreshMs);
}
