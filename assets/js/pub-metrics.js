// Official-source snapshots keep metrics available without visitor API quotas.
const badges = [...document.querySelectorAll('[data-paper-id], [data-github-repo]')];
const refreshMs = 5 * 60 * 1000;
const snapshotUrl = new URL('../data/publication-metrics.json', import.meta.url);
const valid = data => data && Number.isSafeInteger(data.count) && data.count >= 0
  && Number.isFinite(data.at) && data.at <= Date.now() + 60000;
const keyFor = link => link.dataset.githubRepo ? `github:${link.dataset.githubRepo}` : `semantic:${link.dataset.paperId}`;
const groups = new Map();
const latest = new Map();
for (const badge of badges) {
  const key = keyFor(badge);
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(badge);
}
function readCache(key) {
  try { return JSON.parse(localStorage.getItem(`pub-metric:v2:${key}`)); } catch { return null; }
}
function show(key, candidate, source) {
  if (!valid(candidate)) return;
  const previous = latest.get(key);
  if (previous && previous.at > candidate.at) return;
  latest.set(key, candidate);
  for (const link of groups.get(key)) {
    const isGithub = key.startsWith('github:');
    const label = isGithub ? 'GitHub stars' : 'Semantic Scholar citations';
    if (isGithub) {
      const image = link.querySelector('img');
      const url = new URL(image.src);
      const color = url.searchParams.get('color') || '181717';
      url.pathname = `/badge/Stars-${candidate.count}-${color}`;
      image.src = url.href;
      image.alt = `${label}: ${candidate.count}`;
    } else {
      link.querySelector('[data-citation-value]').textContent = candidate.count;
      link.querySelector('svg').setAttribute('aria-label', `${label}: ${candidate.count}`);
    }
    link.dataset.count = candidate.count;
    link.dataset.checked = new Date(candidate.at).toISOString();
    link.dataset.sync = source;
    const stale = Date.now() - candidate.at > 2 * 60 * 60 * 1000;
    link.title = `${label}: ${candidate.count}. Last verified ${new Date(candidate.at).toLocaleString()}.${stale ? ' Latest refresh unavailable; showing the last verified value.' : ''} Click to view the official source.`;
  }
  try { localStorage.setItem(`pub-metric:v2:${key}`, JSON.stringify(candidate)); } catch { /* Optional cache. */ }
}
for (const [key, links] of groups) {
  for (const link of links) {
    if (link.dataset.count !== '') show(key, {count: Number(link.dataset.count), at: Date.parse(link.dataset.checked)}, 'snapshot');
  }
  show(key, readCache(key), 'cached');
}
async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(url, {signal: controller.signal, credentials: 'omit', cache: 'no-store'});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally { clearTimeout(timeout); }
}
async function refreshAll() {
  try {
    const snapshot = await fetchJson(snapshotUrl);
    for (const key of groups.keys()) {
      const item = snapshot[key];
      if (item) show(key, {count: item.count, at: Date.parse(item.updated_at)}, 'snapshot');
    }
  } catch { /* Rendered snapshot remains usable if the site is temporarily offline. */ }
  // GitHub permits public browser reads. Semantic Scholar is refreshed centrally:
  // anonymous per-visitor requests consistently exhaust its shared quota.
  for (const key of groups.keys()) {
    if (!key.startsWith('github:')) continue;
    const cached = latest.get(key);
    if (cached && Date.now() - cached.at < refreshMs) continue;
    try {
      const repo = key.slice('github:'.length);
      const data = await fetchJson(`https://api.github.com/repos/${repo}`);
      show(key, {count: data.stargazers_count, at: Date.now()}, 'current');
    } catch { /* Preserve the last verified value and its timestamp. */ }
  }
}
if (badges.length) {
  refreshAll();
  setInterval(() => { if (!document.hidden) refreshAll(); }, refreshMs);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshAll(); });
}
