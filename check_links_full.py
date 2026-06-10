#!/usr/bin/env python3
"""
Comprehensive internal link checker for dist/ directory.
Checks:
1. Broken internal hrefs (no matching file)
2. Empty href=""
3. href="#" only
4. Dead anchors (e.g. /shop#specialty where #specialty doesn't exist in target)
5. Broken src attributes (images, scripts, etc.)
"""

import os
import re
import sys
from collections import defaultdict
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote

DIST_DIR = Path("/Users/kaito/projects/clients/shiretoko-tourist-final-live/dist")

# Build set of all files in dist
all_files = set()
for root, dirs, files in os.walk(DIST_DIR):
    for f in files:
        full = Path(root) / f
        rel = full.relative_to(DIST_DIR)
        all_files.add("/" + str(rel))

# Also build set of directories (for index.html resolution)
all_dirs = set()
for root, dirs, files in os.walk(DIST_DIR):
    if "index.html" in files:
        rel = Path(root).relative_to(DIST_DIR)
        all_dirs.add("/" + str(rel))

def resolve_href(page_path, href):
    """
    Given a page path (e.g. /shop/index.html) and an href,
    return the canonical path that should exist in dist.
    Returns None if it's external, mailto, tel, javascript, data.
    """
    if not href:
        return None

    # Skip external
    if href.startswith(("http://", "https://", "mailto:", "tel:", "javascript:", "data:")):
        return None

    # Parse to separate anchor
    parsed = urlparse(href)
    path = parsed.path
    fragment = parsed.fragment

    if not path:
        # Pure anchor like "#section"
        return None, fragment, "pure_anchor"

    # Resolve relative path
    if path.startswith("/"):
        abs_path = path
    else:
        # Relative to current page's directory
        page_dir = str(Path(page_path).parent)
        abs_path = str(Path(page_dir) / path)
        # Normalize
        abs_path = str(Path(abs_path).resolve().relative_to(Path("/")))
        abs_path = "/" + abs_path

    # Decode URL encoding
    abs_path = unquote(abs_path)

    return abs_path, fragment, "normal"


class LinkExtractor(HTMLParser):
    def __init__(self, page_path):
        super().__init__()
        self.page_path = page_path
        self.links = []  # (tag, attr, value, type)

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)

        # href links
        if tag in ("a", "link", "area"):
            href = attrs_dict.get("href", "")
            self.links.append((tag, "href", href))

        # src attributes
        if tag in ("img", "script", "iframe", "source", "video", "audio"):
            src = attrs_dict.get("src", "")
            if src:
                self.links.append((tag, "src", src))

        # form action
        if tag == "form":
            action = attrs_dict.get("action", "")
            if action:
                self.links.append((tag, "action", action))


def check_anchor_exists(target_file, fragment):
    """Check if a fragment/anchor exists in the target HTML file."""
    if not fragment:
        return True

    target_path = DIST_DIR / target_file.lstrip("/")
    if not target_path.exists():
        return False

    try:
        content = target_path.read_text(encoding="utf-8", errors="ignore")
        # Check for id="fragment" or name="fragment"
        pattern1 = f'id="{fragment}"'
        pattern2 = f"id='{fragment}'"
        pattern3 = f'name="{fragment}"'
        pattern4 = f"name='{fragment}'"
        return any(p in content for p in [pattern1, pattern2, pattern3, pattern4])
    except Exception:
        return False


# Results
results = {
    "empty_href": [],
    "hash_only": [],
    "broken_internal": [],
    "dead_anchor": [],
    "broken_src": [],
    "broken_src_asset": [],
}

html_files = [f for f in all_files if f.endswith(".html")]
print(f"Scanning {len(html_files)} HTML files...", file=sys.stderr)

for html_rel in sorted(html_files):
    html_path = DIST_DIR / html_rel.lstrip("/")

    try:
        content = html_path.read_text(encoding="utf-8", errors="ignore")
    except Exception as e:
        print(f"Error reading {html_rel}: {e}", file=sys.stderr)
        continue

    extractor = LinkExtractor(html_rel)
    extractor.feed(content)

    for tag, attr, value in extractor.links:
        if attr == "href":
            # Empty href
            if value == "":
                results["empty_href"].append((html_rel, tag, value))
                continue

            # Hash-only href
            if value == "#":
                results["hash_only"].append((html_rel, tag, value))
                continue

            # Skip external
            if value.startswith(("http://", "https://", "mailto:", "tel:", "javascript:", "data:", "//")):
                continue

            # Skip pure anchors on same page
            if value.startswith("#"):
                continue

            # Resolve
            result = resolve_href(html_rel, value)
            if result is None:
                continue

            abs_path, fragment, link_type = result

            # Check if file exists (try direct, try as index.html, try with .html)
            candidates = [
                abs_path,
                abs_path.rstrip("/") + "/index.html",
                abs_path + ".html",
                abs_path + "/index.html",
            ]

            found = False
            found_path = None
            for c in candidates:
                if c in all_files:
                    found = True
                    found_path = c
                    break

            if not found:
                results["broken_internal"].append((html_rel, tag, attr, value, abs_path))
            elif fragment and found_path:
                # Check anchor exists
                if not check_anchor_exists(found_path, fragment):
                    results["dead_anchor"].append((html_rel, tag, attr, value, found_path, fragment))

        elif attr == "src":
            if not value:
                continue
            if value.startswith(("http://", "https://", "data:", "//")):
                continue
            if value.startswith("#"):
                continue

            # Resolve
            result = resolve_href(html_rel, value)
            if result is None:
                continue

            abs_path, fragment, link_type = result

            # Check if file exists
            if abs_path not in all_files:
                results["broken_src"].append((html_rel, tag, attr, value, abs_path))


# Print results
print("\n" + "="*80)
print("LINK CHECKER RESULTS")
print("="*80)

print(f"\n[1] EMPTY href (href=\"\") — {len(results['empty_href'])} instances")
seen = defaultdict(int)
for item in results["empty_href"]:
    page, tag, val = item
    seen[page] += 1
for page, count in sorted(seen.items())[:20]:
    print(f"  {page} ({count} instances)")
if len(seen) > 20:
    print(f"  ... and {len(seen)-20} more pages")

print(f"\n[2] HASH-ONLY href (href=\"#\") — {len(results['hash_only'])} instances")
seen2 = defaultdict(int)
for item in results["hash_only"]:
    page, tag, val = item
    seen2[page] += 1
for page, count in sorted(seen2.items())[:20]:
    print(f"  {page} ({count} instances)")
if len(seen2) > 20:
    print(f"  ... and {len(seen2)-20} more pages")

print(f"\n[3] BROKEN INTERNAL LINKS — {len(results['broken_internal'])} instances")
# Deduplicate by (page, resolved_path)
broken_unique = {}
for item in results["broken_internal"]:
    page, tag, attr, value, abs_path = item
    key = (page, abs_path)
    if key not in broken_unique:
        broken_unique[key] = item
for key, item in sorted(broken_unique.items())[:50]:
    page, tag, attr, value, abs_path = item
    print(f"  PAGE: {page}")
    print(f"    href='{value}' -> resolved: {abs_path}")

if len(broken_unique) > 50:
    print(f"  ... and {len(broken_unique)-50} more")

print(f"\n[4] DEAD ANCHORS (anchor doesn't exist in target) — {len(results['dead_anchor'])} instances")
anchor_pages = defaultdict(list)
for item in results["dead_anchor"]:
    page, tag, attr, value, found_path, fragment = item
    anchor_pages[value].append(page)

for href, pages in sorted(anchor_pages.items())[:30]:
    print(f"  href='{href}' — found on {len(pages)} page(s): {pages[:3]}")
if len(anchor_pages) > 30:
    print(f"  ... and {len(anchor_pages)-30} more unique dead anchors")

print(f"\n[5] BROKEN src ATTRIBUTES — {len(results['broken_src'])} instances")
src_unique = {}
for item in results["broken_src"]:
    page, tag, attr, value, abs_path = item
    key = abs_path
    if key not in src_unique:
        src_unique[key] = []
    src_unique[key].append(page)

for abs_path, pages in sorted(src_unique.items())[:30]:
    print(f"  Missing asset: {abs_path}")
    print(f"    Referenced from: {pages[:3]}")
if len(src_unique) > 30:
    print(f"  ... and {len(src_unique)-30} more missing assets")

print("\n" + "="*80)
print("SUMMARY")
print(f"  Empty href:        {len(results['empty_href'])}")
print(f"  Hash-only href:    {len(results['hash_only'])}")
print(f"  Broken links:      {len(broken_unique)}")
print(f"  Dead anchors:      {len(results['dead_anchor'])}")
print(f"  Broken src:        {len(results['broken_src'])}")
print("="*80)
