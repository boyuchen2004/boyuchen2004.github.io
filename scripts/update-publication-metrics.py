"""Refresh official publication metrics, retaining independently dated successes."""
import datetime
import json
import os
from pathlib import Path
import re
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "_data/publication_metrics.json"


def request_json(url, payload=None, token=None):
    headers = {"User-Agent": "boyuchen2004-homepage-metrics", "Accept": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    body = None if payload is None else json.dumps(payload).encode()
    if body is not None:
        headers["Content-Type"] = "application/json"
    request = urllib.request.Request(url, data=body, headers=headers)
    with urllib.request.urlopen(request, timeout=25) as response:
        return json.load(response)


def sources():
    result = {}
    for path in sorted((ROOT / "_publications").glob("*.md")):
        front = path.read_text().split("---", 2)[1]
        if "community_metrics:" not in front:
            continue
        github = re.search(r'^codeurl: "https://github.com/([^"\s]+)"', front, re.M)
        scholar = re.search(r'scholar_url: "https://www.semanticscholar.org/paper/([a-f0-9]{40})"', front)
        if github:
            repo = github.group(1).rstrip("/")
            result[f"github:{repo}"] = f"https://api.github.com/repos/{repo}"
        if scholar:
            paper = scholar.group(1)
            result[f"semantic:{paper}"] = f"https://api.semanticscholar.org/graph/v1/paper/{paper}?fields=citationCount"
    return result


def valid_count(value):
    return type(value) is int and value >= 0


def main():
    data = json.loads(OUTPUT.read_text()) if OUTPUT.exists() else {}
    now = datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds")
    errors = []
    rows = []
    for key, url in sources().items():
        old = data.get(key, {})
        try:
            value = request_json(url, token=os.environ.get("GH_TOKEN") if key.startswith("github:") else None)
            count = value.get("stargazers_count") if key.startswith("github:") else value.get("citationCount")
            if not valid_count(count):
                raise ValueError("Source did not return a non-negative integer count")
            data[key] = {"count": count, "updated_at": now, "source": url, "attempted_at": now, "status": "ok"}
        except (urllib.error.URLError, TimeoutError, ValueError) as error:
            # Never turn a failed request into zero or advance the success date.
            data[key] = {**old, "source": url, "attempted_at": now, "status": "unavailable", "error": str(error)}
            errors.append(key)
            print(f"::warning title=Metric refresh unavailable::{key}: {error}")
        current = data[key]
        rows.append(f"| {key} | {current.get('count', '—')} | {current.get('updated_at', 'never')} | {current['status']} |")
    OUTPUT.parent.mkdir(exist_ok=True)
    OUTPUT.write_text(json.dumps(data, indent=2, sort_keys=True) + "\n")
    report = "## Publication metrics\n\n| Source | Count | Last successful update (UTC) | Status |\n|---|---:|---|---|\n" + "\n".join(rows) + "\n"
    print(report)
    if os.environ.get("GITHUB_STEP_SUMMARY"):
        with open(os.environ["GITHUB_STEP_SUMMARY"], "a") as summary:
            summary.write(report)
    if len(errors) == len(rows):
        raise SystemExit("All sources failed; previous successful counts retained")


if __name__ == "__main__":
    main()
