#!/usr/bin/env python3
"""
Internal link checker for dist/ directory.
Checks all href and src attributes in HTML files for:
1. Broken internal links (file not found)
2. Empty href=""
3. href="#" only
4. Dead anchors (e.g. /shop#specialty where anchor doesn't exist)
External links (http://, https://, mailto:, tel:, line.me, etc.) are excluded.
"""

import os
import re
import sys
from collections import defaultdict
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote

DIST_DIR = "/Users/kaito/projects/clients/shiretoko-tourist-final-live/dist"

class LinkExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []  # (attr_type, value, tag)

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        # href links
        if tag in ('a', 'link', 'area'):
            href = attr_dict.get('href', '')
            if href is not None:
                self.links.append(('href', href, tag))
        # src links
        if tag in ('img', 'script', 'iframe', 'source', 'video', 'audio'):
            src = attr_dict.get('src', '')
            if src is not None:
                self.links.append(('src', src, tag))
        # srcset
        if 'srcset' in attr_dict:
            for part in attr_dict['srcset'].split(','):
                url = part.strip().split()[0] if part.strip() else ''
                if url:
                    self.links.append(('srcset', url, tag))
        # action on forms
        if tag == 'form':
            action = attr_dict.get('action', '')
            if action:
                self.links.append(('action', action, tag))

def get_all_html_files():
    """Get all HTML files in dist/"""
    html_files = []
    for root, dirs, files in os.walk(DIST_DIR):
        # Skip _astro directory (hashed assets)
        dirs[:] = [d for d in dirs if d != '_astro']
        for f in files:
            if f.endswith('.html'):
                html_files.append(os.path.join(root, f))
    return html_files

def html_file_to_url_path(html_file):
    """Convert a dist HTML file path to its URL path."""
    rel = os.path.relpath(html_file, DIST_DIR)
    # dist/index.html -> /
    # dist/shop/index.html -> /shop/
    # dist/shop/index.html -> /shop
    if rel == 'index.html':
        return '/'
    if rel.endswith('/index.html'):
        return '/' + rel[:-len('/index.html')] + '/'
    return '/' + rel

def resolve_link(href, page_url_path):
    """
    Resolve a relative href against the page's URL path.
    Returns (resolved_path, anchor) where resolved_path is absolute from dist root.
    Returns None if the link is external or should be skipped.
    """
    if not href:
        return None, None

    # Skip external links
    if href.startswith(('http://', 'https://', 'mailto:', 'tel:', 'javascript:', '//')):
        return None, None

    # Parse the href
    parsed = urlparse(href)

    # Extract anchor
    anchor = parsed.fragment if parsed.fragment else None

    # Get path part
    path = parsed.path

    if not path and anchor:
        # Pure anchor like #section - relative to current page
        # Resolve to current page path
        path = page_url_path
    elif not path:
        return None, None

    # Resolve relative paths
    if path.startswith('/'):
        # Absolute path from root
        resolved = path
    else:
        # Relative path - resolve against current page directory
        page_dir = os.path.dirname(page_url_path)
        if not page_dir.endswith('/'):
            page_dir += '/'
        resolved = os.path.normpath(page_dir + path)
        if href.endswith('/') and not resolved.endswith('/'):
            resolved += '/'

    return resolved, anchor

def path_exists_in_dist(url_path):
    """Check if a URL path maps to a file in dist/."""
    # Remove leading slash
    rel = url_path.lstrip('/')

    # Direct file
    full = os.path.join(DIST_DIR, rel)
    if os.path.isfile(full):
        return True

    # Try as directory with index.html
    idx = os.path.join(DIST_DIR, rel, 'index.html')
    if os.path.isfile(idx):
        return True

    # Try with trailing slash removed
    rel2 = rel.rstrip('/')
    full2 = os.path.join(DIST_DIR, rel2)
    if os.path.isfile(full2):
        return True
    idx2 = os.path.join(DIST_DIR, rel2, 'index.html')
    if os.path.isfile(idx2):
        return True

    return False

def get_anchors_in_file(url_path):
    """Get all id= and name= values in the HTML file for a given URL path."""
    rel = url_path.lstrip('/')
    # Try to find the file
    candidates = [
        os.path.join(DIST_DIR, rel),
        os.path.join(DIST_DIR, rel.rstrip('/'), 'index.html'),
        os.path.join(DIST_DIR, rel, 'index.html'),
    ]
    for c in candidates:
        if os.path.isfile(c):
            try:
                with open(c, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                # Find all id="..." and name="..."
                ids = set(re.findall(r'\bid=["\']([^"\']+)["\']', content))
                names = set(re.findall(r'\bname=["\']([^"\']+)["\']', content))
                return ids | names
            except:
                return set()
    return set()

def main():
    html_files = get_all_html_files()
    print(f"Found {len(html_files)} HTML files in dist/\n")

    # Build set of all existing files for quick lookup
    all_dist_files = set()
    for root, dirs, files in os.walk(DIST_DIR):
        dirs[:] = [d for d in dirs if d != '_astro']
        for f in files:
            fp = os.path.join(root, f)
            rel = '/' + os.path.relpath(fp, DIST_DIR)
            all_dist_files.add(rel)

    # Results
    empty_hrefs = []       # href="" or href with just whitespace
    hash_only_hrefs = []   # href="#"
    broken_links = []      # href/src pointing to non-existent file
    dead_anchors = []      # href="/path#anchor" where anchor doesn't exist in target

    # Cache anchor lookups
    anchor_cache = {}

    total_checked = 0

    for html_file in sorted(html_files):
        page_url_path = html_file_to_url_path(html_file)

        try:
            with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
        except Exception as e:
            print(f"ERROR reading {html_file}: {e}")
            continue

        extractor = LinkExtractor()
        extractor.feed(content)

        for attr_type, href, tag in extractor.links:
            total_checked += 1
            href_stripped = href.strip()

            # 1. Empty href
            if not href_stripped:
                empty_hrefs.append({
                    'page': page_url_path,
                    'tag': tag,
                    'attr': attr_type,
                    'value': repr(href),
                    'file': html_file
                })
                continue

            # 2. Hash-only href
            if href_stripped == '#':
                hash_only_hrefs.append({
                    'page': page_url_path,
                    'tag': tag,
                    'attr': attr_type,
                    'value': href,
                    'file': html_file
                })
                continue

            # Skip external links
            if href_stripped.startswith(('http://', 'https://', 'mailto:', 'tel:', 'javascript:', '//', 'data:')):
                continue

            # Skip pure anchors (same-page)
            if href_stripped.startswith('#') and href_stripped != '#':
                # Same-page anchor - check if anchor exists in current page
                anchor = href_stripped[1:]
                if page_url_path not in anchor_cache:
                    anchor_cache[page_url_path] = get_anchors_in_file(page_url_path)
                page_anchors = anchor_cache[page_url_path]
                if anchor and page_anchors and anchor not in page_anchors:
                    dead_anchors.append({
                        'page': page_url_path,
                        'tag': tag,
                        'attr': attr_type,
                        'value': href,
                        'type': 'same-page anchor missing',
                        'file': html_file
                    })
                continue

            # Resolve the link
            resolved_path, anchor = resolve_link(href_stripped, page_url_path)
            if resolved_path is None:
                continue

            # 3. Check if the file exists
            if not path_exists_in_dist(resolved_path):
                broken_links.append({
                    'page': page_url_path,
                    'tag': tag,
                    'attr': attr_type,
                    'value': href_stripped,
                    'resolved': resolved_path,
                    'file': html_file
                })
                continue

            # 4. Check anchor if present
            if anchor:
                # Look up anchors in the target file
                if resolved_path not in anchor_cache:
                    anchor_cache[resolved_path] = get_anchors_in_file(resolved_path)
                target_anchors = anchor_cache[resolved_path]

                if target_anchors is not None and anchor not in target_anchors:
                    dead_anchors.append({
                        'page': page_url_path,
                        'tag': tag,
                        'attr': attr_type,
                        'value': href_stripped,
                        'resolved': resolved_path,
                        'anchor': anchor,
                        'type': 'anchor missing in target',
                        'file': html_file
                    })

    print(f"Total links checked: {total_checked}\n")
    print("=" * 70)

    # ---- Report empty hrefs ----
    print(f"\n[1] EMPTY HREF (href=\"\" or whitespace): {len(empty_hrefs)} occurrences")
    # Deduplicate by page+tag+value
    seen = set()
    for item in empty_hrefs:
        key = (item['page'], item['tag'], item['value'])
        if key not in seen:
            seen.add(key)
            print(f"    page={item['page']}  tag=<{item['tag']}>  attr={item['attr']}  value={item['value']}")

    # ---- Report hash-only hrefs ----
    print(f"\n[2] HASH-ONLY HREF (href=\"#\"): {len(hash_only_hrefs)} occurrences")
    # Group by page
    pages_with_hash = defaultdict(int)
    for item in hash_only_hrefs:
        pages_with_hash[item['page']] += 1
    # Show first 20 pages
    count = 0
    for page, cnt in sorted(pages_with_hash.items()):
        print(f"    page={page}  count={cnt}")
        count += 1
        if count >= 20 and len(pages_with_hash) > 20:
            print(f"    ... and {len(pages_with_hash) - 20} more pages")
            break

    # ---- Report broken links ----
    print(f"\n[3] BROKEN INTERNAL LINKS (file not found): {len(broken_links)} occurrences")
    # Deduplicate by resolved path
    by_resolved = defaultdict(list)
    for item in broken_links:
        by_resolved[item['resolved']].append(item['page'])
    for resolved, pages in sorted(by_resolved.items()):
        unique_pages = list(set(pages))
        print(f"    target={resolved}  referenced_from={len(unique_pages)} page(s): {unique_pages[:3]}{'...' if len(unique_pages) > 3 else ''}")

    # ---- Report dead anchors ----
    print(f"\n[4] DEAD ANCHORS (anchor not found in target): {len(dead_anchors)} occurrences")
    # Deduplicate by value+target
    seen_anchors = set()
    for item in dead_anchors:
        key = (item.get('resolved', item['page']), item.get('anchor', item['value']))
        if key not in seen_anchors:
            seen_anchors.add(key)
            print(f"    href={item['value']}  from={item['page']}  type={item['type']}")

    print("\n" + "=" * 70)
    print("SUMMARY:")
    print(f"  Empty hrefs:     {len(empty_hrefs)}")
    print(f"  Hash-only hrefs: {len(hash_only_hrefs)}")
    print(f"  Broken links:    {len(broken_links)}")
    print(f"  Dead anchors:    {len(dead_anchors)}")

if __name__ == '__main__':
    main()
