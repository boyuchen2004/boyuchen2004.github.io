import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import urllib.error

spec = importlib.util.spec_from_file_location('metrics', Path(__file__).resolve().parents[1] / 'scripts/update-publication-metrics.py')
metrics = importlib.util.module_from_spec(spec)
spec.loader.exec_module(metrics)


class RefreshTests(unittest.TestCase):
    def run_refresh(self, old, fetch):
        with tempfile.TemporaryDirectory() as folder:
            output = Path(folder) / 'metrics.json'
            output.write_text(json.dumps(old))
            with patch.object(metrics, 'OUTPUT', output), patch.object(metrics, 'sources', return_value={'semantic:paper': 'https://example.org/paper', 'github:repo': 'https://example.org/repo'}), patch.object(metrics, 'request_json', side_effect=fetch):
                metrics.main()
            return json.loads(output.read_text())

    def test_failure_retains_count_and_success_date(self):
        previous = {'count': 17, 'updated_at': '2026-10-21T00:00:00Z'}
        def fetch(url, **kwargs):
            if url.endswith('paper'):
                raise urllib.error.HTTPError(url, 429, 'limited', {}, None)
            return {'stargazers_count': 154}
        result = self.run_refresh({'semantic:paper': previous}, fetch)
        self.assertEqual(result['semantic:paper']['count'], 17)
        self.assertEqual(result['semantic:paper']['updated_at'], previous['updated_at'])
        self.assertEqual(result['semantic:paper']['status'], 'unavailable')
        self.assertEqual(result['github:repo']['count'], 154)

    def test_zero_and_legitimate_decrease_are_saved(self):
        result = self.run_refresh({'github:repo': {'count': 155}}, lambda url, **kwargs: {'citationCount': 0} if url.endswith('paper') else {'stargazers_count': 154})
        self.assertEqual(result['semantic:paper']['count'], 0)
        self.assertEqual(result['github:repo']['count'], 154)

    def test_invalid_counts_do_not_replace_verified_values(self):
        result = self.run_refresh({'semantic:paper': {'count': 17, 'updated_at': '2026-10-12'}}, lambda url, **kwargs: {'citationCount': True} if url.endswith('paper') else {'stargazers_count': 29})
        self.assertEqual(result['semantic:paper']['count'], 17)
        self.assertEqual(result['semantic:paper']['status'], 'unavailable')


if __name__ == '__main__':
    unittest.main()
