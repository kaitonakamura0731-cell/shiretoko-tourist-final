# 北の逸品堂 / 知床ツーリスト — 公式EC ＆ ツアー予約 (デモモック)

世界自然遺産・知床のガイドが選ぶ北の食材と、店主と歩く知床ツアーを 1サイトで完結する EC × 予約 ハイブリッド構成のデモモック。

- ライブ: https://shiretoko-tourist-final.vercel.app/
- 構成: Astro 静的サイト（SSG）
- 主要セクション: ヒーロー / 信頼バッジ / 季節カレンダー / 今週のおすすめ / ツアー予約 / ストーリー / リテンション
- 商品詳細 + カート（localStorage モック・クーポン `TOUR1000` 対応）

## ローカル起動

```bash
npm install
npm run dev     # 開発: http://localhost:4321
npm run build   # 静的ビルド: dist/
npm run preview # ビルド成果物のプレビュー
```

## ディレクトリ

```
src/
├ pages/
│  ├ index.astro              TOP
│  ├ cart.astro               カート
│  └ products/[slug].astro    商品詳細（動的）
├ layouts/Base.astro          共通レイアウト
├ data/products.ts            商品データ
└ styles/global.css           デザイントークン+全スタイル
public/
├ cart.js                     カート (localStorage)
└ source-images/              画像アセット
```

## デザイン方針

- 既存ブランドカラー `#3C8186` (ティール) を主軸、日本語タイポ主役
- AIスロップ禁止（紫⇄ピンクグラデ・glassmorphism・巨大英語タイポ・Lucide単色アイコン羅列 等は採用しない）
- 固有名詞重視（知床・清里町・オホーツク・パタゴニア）

## 本番昇格

このデモはそのまま本番に昇格可能。決済は RATIO 経由（カード手数料 2.5%）に置換。
