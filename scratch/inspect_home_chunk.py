import urllib.request
import re

url = "https://aartechsolonics.com/assets/Home-abb29e44.js"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})

try:
    with urllib.request.urlopen(req, timeout=20) as resp:
        content = resp.read().decode("utf-8", errors="ignore")
    
    # find where _e and ls are defined
    # look backwards from Our Global Presence
    pos = content.find("Our Global Presence")
    print("Found 'Our Global Presence' at pos:", pos)
    print("Surrounding 1000 chars:")
    print(content[pos-500:pos+500])

    # find map image assets
    map_assets = re.findall(r'(/assets/[^"\']*(?:map|Map)[^"\']*)', content)
    print("Map assets:", map_assets)

    # find imports or declarations of _e and ls
    defs = re.findall(r'([a-zA-Z0-9_$]+)\s*=\s*["\']([^"\']+\.(?:png|jpg|svg|webp))["\']', content)
    print("Image definitions:", [(k, v) for k, v in defs if 'map' in v.lower()])

except Exception as e:
    print("Error:", e)
