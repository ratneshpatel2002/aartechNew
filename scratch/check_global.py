import urllib.request
import re
from html.parser import HTMLParser

url = "https://aartechsolonics.com/"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})

try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        html = resp.read().decode("utf-8", errors="ignore")
    print("Fetched HTML, size:", len(html))

    # Look for Global Presence section
    pos = html.lower().find("global presence")
    if pos != -1:
        print("Found 'Global Presence' at pos:", pos)
        snippet = html[max(0, pos - 200):min(len(html), pos + 1500)]
        # clean tags
        cleaned = re.sub(r'<[^>]+>', ' ', snippet)
        cleaned = re.sub(r'\s+', ' ', cleaned)
        print("SNIPPET:", cleaned)
    else:
        print("'Global Presence' not found directly. Searching for 'presence'...")
        for m in re.finditer(r'presence', html, re.I):
            start = max(0, m.start() - 100)
            end = min(len(html), m.end() + 200)
            print("--- MATCH ---")
            print(re.sub(r'<[^>]+>', ' ', html[start:end]))

    # Also search for 'Our Global Presence' or 'countries' or 'export'
    for kw in ['countries', 'continents', 'international', 'worldwide']:
        for m in re.finditer(kw, html, re.I):
            start = max(0, m.start() - 50)
            end = min(len(html), m.end() + 150)
            print(f"--- KW {kw} ---")
            print(re.sub(r'<[^>]+>', ' ', html[start:end]))
            break
except Exception as e:
    print("Error:", e)
