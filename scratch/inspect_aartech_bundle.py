import urllib.request
import re

js_url = "https://aartechsolonics.com/assets/index-d7aceceb.js"
req = urllib.request.Request(js_url, headers={"User-Agent": "Mozilla/5.0"})

try:
    with urllib.request.urlopen(req, timeout=20) as resp:
        content = resp.read().decode("utf-8", errors="ignore")
    
    # Look for chunks
    chunks = re.findall(r'["\'](/assets/[^"\']+\.js)["\']', content)
    if not chunks:
        chunks = re.findall(r'["\']([^"\']+\.js)["\']', content)
    print("Chunks found:", len(chunks))
    for c in set(chunks):
        if "chunk" in c or "page" in c or "index" in c or "Home" in c or "Global" in c:
            print("Relevant chunk:", c)

    # Also look for path / route names
    routes = re.findall(r'path:\s*["\']([^"\']+)["\']', content)
    print("Routes:", routes)

except Exception as e:
    print("Error:", e)
