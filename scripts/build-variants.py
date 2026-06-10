#!/usr/bin/env python3
"""catalog.ts を解析し src/data/variantGroups.ts を決定論的に生成する。

グループ化ルール(保守的・確信がある時だけ):
- specialty: タイトルから商品名コアと重量(N.Nkg)を抽出。同コア=同グループ。重量昇順。
- apparel : 状態+サイズトークン【...】, ■〓全角空白を正規化した「モデル名+色」が完全一致し
            size だけ違うもの。色違い(=正規化後文字列が違う)は別グループ。S<M<L<XL順。
- 1件しかないものはグループにしない(スタンドアロン)。
- apparel で同一グループ内に同じサイズが複数ある場合は最初の1件(id昇順)だけ採用し、
  距離が取れる(distinct size が2以上の)グループだけを残す。

catalog.ts は READ ONLY。出力のみ書き換える。再実行で同じ結果になる。
"""
import json
import re
import unicodedata
from collections import defaultdict

CATALOG = "/Users/kaito/projects/clients/shiretoko-tourist-final-live/src/data/catalog.ts"
OUT = "/Users/kaito/projects/clients/shiretoko-tourist-final-live/src/data/variantGroups.ts"

SIZE_ORDER = {"XXS": 0, "XS": 1, "S": 2, "M": 3, "L": 4, "XL": 5, "XXL": 6}


def load_catalog():
    src = open(CATALOG, encoding="utf-8").read()
    marker = "export const catalog: CatalogItem[] = "
    i = src.index(marker) + len(marker)
    start = src.index("[", i)
    end = src.rindex("];") + 1
    return json.loads(src[start:end])


# ---------- specialty ----------
WEIGHT_RE = re.compile(r"(\d+(?:\.\d+)?)\s*kg")


def specialty_core_and_weight(item):
    """商品名コアと重量(kg float)を返す。重量が取れなければ (core, None)。"""
    t = unicodedata.normalize("NFKC", item["title"])
    weights = WEIGHT_RE.findall(t)
    weight = float(weights[-1]) if weights else None
    # コア: 重量トークン・【...】・■・送料/送料込み等のノイズを除去した残り
    core = WEIGHT_RE.sub(" ", t)
    core = re.sub(r"【[^】]*】", " ", core)
    core = core.replace("■", " ").replace("　", " ")
    core = re.sub(r"送料込み?！?", " ", core)
    core = re.sub(r"\s+", " ", core).strip().lower()
    return core, weight


def fmt_weight(w):
    # 1.0 -> "1.0kg", 30.0 -> "30kg"
    if w == int(w):
        return f"{int(w)}kg" if w >= 10 else f"{w:.1f}kg"
    return f"{w:g}kg"


def build_specialty(items):
    groups = defaultdict(list)
    for it in items:
        core, w = specialty_core_and_weight(it)
        if w is None:
            continue
        groups[core].append((w, it))
    out = []
    for core, lst in groups.items():
        # 同コア内で重量が distinct なものだけ(同重量重複は最初を採用)
        seen = {}
        for w, it in sorted(lst, key=lambda x: (x[0], x[1]["id"])):
            if w not in seen:
                seen[w] = it
        if len(seen) < 2:
            continue
        variants = []
        for w in sorted(seen):
            it = seen[w]
            variants.append({
                "slug": it["slug"], "id": it["id"], "label": fmt_weight(w),
                "price": it["price"], "weight": fmt_weight(w), "image": it["image"],
            })
        out.append({
            "key": "spec-" + core.replace(" ", "-"),
            "baseTitle": items_base_title(seen[min(seen)]),
            "category": "specialty", "variants": variants,
        })
    out.sort(key=lambda g: g["key"])
    return out


def items_base_title(it):
    """重量・【】・■を落とした表示用ベースタイトル。"""
    t = unicodedata.normalize("NFKC", it["title"])
    t = WEIGHT_RE.sub(" ", t)
    t = re.sub(r"【[^】]*】", " ", t)
    t = t.replace("■", " ").replace("　", " ")
    t = re.sub(r"送料込み?！?", " ", t)
    return re.sub(r"\s+", " ", t).strip()


# ---------- apparel ----------
def resolve_size(item):
    s = item.get("size")
    if s == "XX":
        return "XXS"
    if s in SIZE_ORDER:
        return s
    # field が無い/不正: タイトル全体から状態ブラケット内のサイズを拾う
    t = unicodedata.normalize("NFKC", item["title"])
    m = re.search(r"(?:新品|未使用)\s*(XXS|XXL|XS|XL|[SML])", t)
    if m:
        return m.group(1)
    return None


def norm_apparel(item):
    """状態+サイズ【...】, ■〓全角空白, 括弧種, 大小文字を正規化したモデル名+色。"""
    s = unicodedata.normalize("NFKC", item["title"])
    s = re.sub(r"【[^】]*】", " ", s)        # 【新品S】等を除去
    s = re.sub(r"新品\s*(XXS|XXL|XS|XL|[SML])", " ", s)  # 壊れたブラケット救済
    s = s.replace("■", " ").replace("〓", " ").replace("　", " ")
    s = s.replace("（", "(").replace("）", ")")
    s = re.sub(r"送料込み?", " ", s)
    s = re.sub(r"\s+", " ", s).strip().lower()
    return s


def apparel_base_title(item):
    s = unicodedata.normalize("NFKC", item["title"])
    s = re.sub(r"【[^】]*】", " ", s)
    s = re.sub(r"新品\s*(XXS|XXL|XS|XL|[SML])", " ", s)
    s = s.replace("〓", " ").replace("　", " ")
    s = re.sub(r"送料込み?", " ", s)
    # 先頭の宣伝マーカー(■50周年記念モデル■, ■日本未発売■ 等)を除去してから分割
    s = re.sub(r"^[\s■]*(?:\d+周年記念モデル|日本未発売|限定)[\s■]*", " ", s)
    # ■区切りで モデル名部 / カラー部 を取り出し「モデル名 / カラー」表記に整える
    parts = [p.strip() for p in s.split("■") if p.strip()]
    if len(parts) >= 2:
        model = parts[0]
        # カラー部は patagonia / Patagonia / brand名 を落として色名のみ残す
        color = parts[-1]
        color = re.sub(r"(?i)\bpatagonia\b", "", color).strip()
        if color:
            return f"{model} / {color}"
        return model
    return re.sub(r"\s+", " ", s).strip()


def build_apparel(items):
    groups = defaultdict(list)
    for it in items:
        groups[norm_apparel(it)].append(it)
    out = []
    for key, lst in groups.items():
        if len(lst) < 2:
            continue
        # サイズで dedupe(同サイズは id 昇順で最初を採用)
        by_size = {}
        for it in sorted(lst, key=lambda x: x["id"]):
            sz = resolve_size(it)
            if sz is None:
                continue
            if sz not in by_size:
                by_size[sz] = it
        if len(by_size) < 2:
            continue
        ordered = sorted(by_size, key=lambda s: SIZE_ORDER[s])
        variants = []
        for sz in ordered:
            it = by_size[sz]
            variants.append({
                "slug": it["slug"], "id": it["id"], "label": sz,
                "price": it["price"], "size": sz, "image": it["image"],
            })
        rep = by_size[ordered[0]]
        out.append({
            "key": "app-" + rep["id"],
            "baseTitle": apparel_base_title(rep),
            "category": "apparel", "variants": variants,
        })
    out.sort(key=lambda g: g["key"])
    return out


def js(v):
    return json.dumps(v, ensure_ascii=False)


def emit(groups):
    lines = []
    lines.append("// Auto-generated from catalog.ts — 編集禁止: 再生成は scripts/build-variants.py")
    lines.append("// 同一商品のサイズ/重量バリエーションをまとめたグループ定義。")
    lines.append("")
    lines.append("export type Variant = {")
    lines.append("  slug: string;")
    lines.append("  id: string;")
    lines.append("  label: string;")
    lines.append("  price: number;")
    lines.append("  size?: string;")
    lines.append("  weight?: string;")
    lines.append("  image: string | null;")
    lines.append("};")
    lines.append("")
    lines.append("export type VariantGroup = {")
    lines.append("  key: string;")
    lines.append("  baseTitle: string;")
    lines.append('  category: "specialty" | "apparel";')
    lines.append("  variants: Variant[];")
    lines.append("};")
    lines.append("")
    lines.append("export const variantGroups: VariantGroup[] = [")
    for g in groups:
        lines.append("  {")
        lines.append(f"    key: {js(g['key'])},")
        lines.append(f"    baseTitle: {js(g['baseTitle'])},")
        lines.append(f"    category: {js(g['category'])},")
        lines.append("    variants: [")
        for v in g["variants"]:
            parts = [f"slug: {js(v['slug'])}", f"id: {js(v['id'])}",
                     f"label: {js(v['label'])}", f"price: {v['price']}"]
            if "size" in v:
                parts.append(f"size: {js(v['size'])}")
            if "weight" in v:
                parts.append(f"weight: {js(v['weight'])}")
            parts.append(f"image: {js(v['image'])}")
            lines.append("      { " + ", ".join(parts) + " },")
        lines.append("    ],")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append("export const slugToGroup: Record<string, string> = {")
    for g in groups:
        for v in g["variants"]:
            lines.append(f"  {js(v['slug'])}: {js(g['key'])},")
    lines.append("};")
    lines.append("")
    return "\n".join(lines)


def main():
    catalog = load_catalog()
    spec = build_specialty([x for x in catalog if x["category"] == "specialty"])
    app = build_apparel([x for x in catalog if x["category"] == "apparel"])
    groups = spec + app

    # 検証
    all_slugs = []
    catalog_slugs = {x["slug"] for x in catalog}
    for g in groups:
        for v in g["variants"]:
            all_slugs.append(v["slug"])
    dup = [s for s in set(all_slugs) if all_slugs.count(s) > 1]
    missing = [s for s in all_slugs if s not in catalog_slugs]
    assert not dup, f"duplicate slugs: {dup}"
    assert not missing, f"slugs not in catalog: {missing}"

    open(OUT, "w", encoding="utf-8").write(emit(groups))

    covered = len(all_slugs)
    biggest = max(groups, key=lambda g: len(g["variants"]))
    print(f"groups: {len(groups)} (specialty={len(spec)}, apparel={len(app)})")
    print(f"covered items: {covered}")
    print(f"duplicate slugs: {len(dup)} | missing slugs: {len(missing)}")
    print(f"biggest group: {len(biggest['variants'])} variants -> {biggest['baseTitle'][:50]}")
    print("--- sample (up to 3) ---")
    for g in groups[:3]:
        labels = [v["label"] for v in g["variants"]]
        print(f"  [{g['category']}] {g['baseTitle'][:48]} :: {labels}")


if __name__ == "__main__":
    main()
