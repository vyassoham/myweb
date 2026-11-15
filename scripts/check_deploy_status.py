import urllib.request
import json
import time

url = 'https://api.github.com/repos/vyassoham/myweb/actions/runs?per_page=3'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as r:
        data = json.loads(r.read())
        for run in data.get('workflow_runs', []):
            print(f"{run['name']}: {run['status']} - {run['conclusion']} (commit {run['head_sha'][:7]}) - {run['html_url']}")
except Exception as e:
    print('Error:', e)
