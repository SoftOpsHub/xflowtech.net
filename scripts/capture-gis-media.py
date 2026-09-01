#!/usr/bin/env python3
"""Dev-only capture of the GIS pages' gallery + map imagery.

Companion to scripts/capture-assets.mjs. Like that script it runs only at
authoring time and is never imported by app/ or src/. It downloads each image
listed below from the live site, downscales large ones with Pillow, writes them
to public/assets/, and MERGES entries into the runtime asset map, the seed list,
and the audit manifest.

Requires Pillow (`pip install pillow`).

    python3 scripts/capture-gis-media.py
"""

from __future__ import annotations

import hashlib
import io
import json
import pathlib
import sys
import urllib.request
from datetime import date

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "assets"
RUNTIME_MAP = ROOT / "src" / "lib" / "content" / "asset-map.generated.json"
SOURCES = ROOT / "scripts" / "asset-sources.json"
MANIFEST = ROOT / "specs" / "001-marketing-site-clone" / "contracts" / "asset-manifest.json"
ORIGIN = "https://xflowresearch.com"
MAX_WIDTH = 1200  # gallery images never render wider than this
# The live originals are up to 10 MB PNGs; these are opaque map screenshots, so
# re-encode everything as JPEG to keep the page (and repo) light.

# key -> (source path under xflowresearch.com, alt text)
ASSETS: dict[str, tuple[str, str]] = {
    "gis-elevation": ("/wp-content/uploads/2025/03/Elevation.png", "Elevation mapping"),
    "gis-rainfall": ("/wp-content/uploads/2025/03/Rainfall.png", "Rainfall data analysis"),
    "gis-soil-pakistan": ("/wp-content/uploads/2025/03/Soil-of-Pakistan.png", "Soil mapping of Pakistan"),
    "gis-temperature": ("/wp-content/uploads/2025/03/Temperature.png", "Temperature data visualization"),
    "gis-uae-administration": ("/wp-content/uploads/2025/03/UAE-Administration.png", "UAE administrative boundaries"),
    "gis-uae-industrial-transport": ("/wp-content/uploads/2025/03/UAE-Industrial-areas-and-Transportation.png", "UAE industrial areas and transportation"),
    "gis-uae-population": ("/wp-content/uploads/2025/03/UAE-population.png", "UAE population density"),
    "gis-world-flow-map": ("/wp-content/uploads/2025/03/world-flow-map.png", "World flight-flow map"),
    "gis-islamabad": ("/wp-content/uploads/2025/04/ISlamabad.jpg", "Islamabad land cover"),
    "gis-dubai-rainfall": ("/wp-content/uploads/2025/04/Dubai-rainfall.jpg", "Dubai rainfall"),
    "gis-dubai-land": ("/wp-content/uploads/2025/04/Dubai-land.jpg", "Dubai land cover"),
    "gis-uae-temperature": ("/wp-content/uploads/2025/04/UAE-temp.jpg", "UAE temperature"),
    "gis-iran-geology": ("/wp-content/uploads/2025/07/Iran-Geology.png", "Geology of Iran"),
    "gis-pakistan-rivers-map": ("/wp-content/themes/altitude-pro/images/pak_rivers.png", "Pakistan rivers interactive map"),
    "gis-pakistan-universities-map": ("/wp-content/themes/altitude-pro/images/pak_unis.png", "Pakistan universities interactive map"),
    "gis-telco-cell-ids": ("/wp-content/uploads/2025/12/Cell-ids-and-calls.jpg", "4G/5G cell IDs and call load"),
    "gis-telco-uae-sectors": ("/wp-content/uploads/2025/12/UAE-sectors.jpg", "UAE network sectors"),
}


def main() -> int:
    try:
        from PIL import Image
    except ImportError:
        print("Pillow is required: pip install pillow", file=sys.stderr)
        return 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    runtime = json.loads(RUNTIME_MAP.read_text()) if RUNTIME_MAP.exists() else {}
    sources = json.loads(SOURCES.read_text())
    seen_sources = {a["key"] for a in sources["assets"]}
    manifest = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {"assets": []}
    man_by_key = {a["key"]: a for a in manifest["assets"]}
    captured_at = date.today().isoformat()

    for key, (src_path, alt) in ASSETS.items():
        url = ORIGIN + src_path
        local_path = f"/assets/{key}.jpg"
        dest = ROOT / "public" / local_path.lstrip("/")

        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (asset-capture)"})
        raw = urllib.request.urlopen(req, timeout=60).read()

        img = Image.open(io.BytesIO(raw))
        if img.width > MAX_WIDTH:
            h = round(img.height * MAX_WIDTH / img.width)
            img = img.resize((MAX_WIDTH, h), Image.LANCZOS)
        bg = Image.new("RGB", img.size, "white")
        img = img.convert("RGBA")
        bg.paste(img, mask=img.split()[3])
        buf = io.BytesIO()
        bg.save(buf, "JPEG", quality=80, optimize=True)
        data = buf.getvalue()
        dest.write_bytes(data)

        runtime[key] = {"localPath": local_path, "alt": alt}
        if key not in seen_sources:
            sources["assets"].append({"key": key, "sourceUrl": url, "alt": alt, "type": "photo"})
            seen_sources.add(key)
        man_by_key[key] = {
            "key": key,
            "localPath": local_path,
            "sourceUrl": url,
            "type": "photo",
            "alt": alt,
            "bytes": len(data),
            "sha256": hashlib.sha256(data).hexdigest(),
            "capturedAt": captured_at,
            "substitution": None,
        }
        print(f"  ↓ {key}  {len(raw)//1024}kb → {len(data)//1024}kb")

    RUNTIME_MAP.write_text(json.dumps(dict(sorted(runtime.items())), indent=2) + "\n")
    SOURCES.write_text(json.dumps(sources, indent=2) + "\n")
    manifest["assets"] = sorted(man_by_key.values(), key=lambda a: a["key"])
    manifest.setdefault("sourceOrigin", ORIGIN)
    manifest["capturedAt"] = captured_at
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"\n{len(ASSETS)} GIS assets merged into asset map, seed list, and manifest.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
