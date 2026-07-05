#!/usr/bin/env python3
"""実店舗(WooCommerce)の商品詳細ページから実価格を取得し catalog.ts に注入する。
価格ソース: 各PDPのJSON-LD/embedded data の "price":"14000" パターン。
取れなかった商品は price 無しのまま(=PDPはLINE相談にフォールバック)。
"""
import json, re, sys, time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

RAW = "/Users/kaito/projects/shiretoko-tourist/assets/ec-crawl/products-raw.json"
CATALOG = "/Users/kaito/projects/shiretoko-tourist-final-live/src/data/catalog.ts"
OUT = "/Users/kaito/projects/shiretoko-tourist-final-live/scripts/prices.json"

items = json.load(open(RAW))
print(f"raw items: {len(items)}", flush=True)

PRICE_RE = re.compile(r'"price"\s*:\s*"?([0-9]+(?:\.[0-9]+)?)"?')

def fetch(it):
    pid, url = it["post_id"], it["url"]
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        html = urllib.request.urlopen(req, timeout=15).read().decode("utf-8", "ignore")
        m = PRICE_RE.search(html)
        if m:
            return pid, int(float(m.group(1)))
    except Exception as e:
        return pid, None
    return pid, None

prices = {}
with ThreadPoolExecutor(max_workers=10) as ex:
    futs = {ex.submit(fetch, it): it for it in items}
    done = 0
    for f in as_completed(futs):
        pid, price = f.result()
        done += 1
        if price:
            prices[pid] = price
        if done % 50 == 0:
            print(f"  {done}/{len(items)} fetched, {len(prices)} priced", flush=True)

print(f"priced: {len(prices)}/{len(items)}", flush=True)
json.dump(prices, open(OUT, "w"), ensure_ascii=False, indent=1)

# catalog.ts に price を注入 (idベース。既に price がある行は触らない)
src = open(CATALOG).read()
count = 0
def inject(m):
    global count
    block = m.group(0)
    pid_m = re.search(r'"id":\s*"(\d+)"', block)
    if not pid_m:
        return block
    pid = pid_m.group(1)
    if pid in prices and '"price"' not in block:
        count += 1
        # ブロック末尾(閉じ括弧の前)に price を追加
        return block.rstrip()[:-1].rstrip().rstrip(",") + f',\n    "price": {prices[pid]}\n  }}'
    return block

new_src = re.sub(r'\{\s*\n\s*"id":.*?\n  \}', inject, src, flags=re.S)
open(CATALOG, "w").write(new_src)
print(f"catalog.ts injected: {count} items", flush=True)
