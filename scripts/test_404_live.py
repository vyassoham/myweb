import urllib.request
import urllib.error

url = 'https://www.soham.lol/non-existent-route-for-testing-404-status'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        print('Returned direct status:', resp.status)
except urllib.error.HTTPError as e:
    print('Returned HTTP status code:', e.code)
    body = e.read().decode('utf-8', errors='ignore')
    print('Body length:', len(body))
    print('Contains 404:', '404' in body)
