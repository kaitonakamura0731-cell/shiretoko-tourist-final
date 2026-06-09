# Catalog PDP 内化 + UX修正 + レビュー投稿フォーム 実装プラン

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** catalog.ts の全商品(apparel 254件 + specialty 6件)に自社詳細ページを生成し、一覧カードの外部リンクを内部URLに切り替える。あわせてタイトル折返し・説明文レイアウト・価格未設定時のカート制御・レビュー投稿フォームを実装する。

**Architecture:** `[slug].astro` の `getStaticPaths` を `products.ts`(6件 rich) と `catalog.ts`(全件 lite) の Union に拡張し、kind フラグで分岐描画する。lite ブランチはカタログの既存フィールド(brand/size/condition/color/weight 等)を `<dl>` で表示し、price 未設定時はカートを非表示にして LINE 誘導に差し替える。レビュー投稿は localStorage キー `hkitchen_reviews_<slug>` に保存し、is:inline スクリプトで即時 DOM 反映する。

**Tech Stack:** Astro 静的生成 / TypeScript / localStorage(デモ) / Noto Serif JP + Inter(既存フォント)

---

## ファイルマップ

| 操作 | ファイル | 変更内容 |
|------|----------|----------|
| Modify | `src/pages/products/[slug].astro` | getStaticPaths 拡張 + lite ブランチ追加 + レビューフォーム追加 |
| Modify | `src/pages/products/specialty.astro` | カードの href を内部URLに変更 |
| Modify | `src/pages/products/apparel.astro` | カードの href を内部URLに変更 |
| Modify | `src/styles/global.css` | pdp-info__title サイズ修正 + pdp-spec__desc 追加 + レビューフォームCSS追加 |

---

## Task 1: 一覧カードのリンクを内部URLへ切り替え

**Files:**
- Modify: `src/pages/products/specialty.astro:171`
- Modify: `src/pages/products/apparel.astro:191`

- [ ] **Step 1: specialty.astro のカードリンクを変更**

`src/pages/products/specialty.astro` の 171 行目を開き、以下の行を:

```astro
<a href={p.url} target="_blank" rel="noopener noreferrer" class="card-product__link">
```

次のように変更する:

```astro
<a href={`/products/${p.slug}/`} class="card-product__link">
```

- [ ] **Step 2: apparel.astro のカードリンクを変更**

`src/pages/products/apparel.astro` の 191 行目を同じく変更する:

```astro
<a href={p.url} target="_blank" rel="noopener noreferrer" class="card-product__link">
```

↓

```astro
<a href={`/products/${p.slug}/`} class="card-product__link">
```

- [ ] **Step 3: ビルドが通ることを確認**

```bash
cd /Users/kaito/projects/clients/shiretoko-tourist-final-live
npm run build 2>&1 | tail -20
```

期待: `Build complete` が出てエラーなし。この時点では `/products/<catalog-slug>/` ページが存在しないため、一覧から遷移すると 404 になる(Task 2 で解消)。

- [ ] **Step 4: コミット**

```bash
git add src/pages/products/specialty.astro src/pages/products/apparel.astro
git commit -m "fix: 一覧カードのリンクを外部URLから内部/products/<slug>/に変更"
```

---

## Task 2: `[slug].astro` の getStaticPaths を catalog 全件に拡張

**Files:**
- Modify: `src/pages/products/[slug].astro:1-21`

このタスク完了後、全 catalog 商品の詳細ページが静的生成されるが、lite ブランチの実描画は Task 3 で追加する。

- [ ] **Step 1: インポートに CatalogItem と catalog を追加**

`src/pages/products/[slug].astro` の frontmatter 冒頭(3行目付近)に以下を追加する。既存の import は維持したまま追記する:

```astro
---
import Base from "../../layouts/Base.astro";
import { products, findProduct, formatYen, type Product } from "../../data/products";
import { catalog, type CatalogItem } from "../../data/catalog";
import { productImageForKey } from "../../data/sourceImages";
import { reviewsByProduct, averageRating } from "../../data/reviews";
import {
  subscriptions,
  volumeLadder,
  crossSell,
  thresholdGift,
  pointsInfo,
  deliveryEstimate,
  restockInfo,
} from "../../data/promotions";
```

- [ ] **Step 2: Props 型を Union に変更し getStaticPaths を拡張**

既存の `export function getStaticPaths()` と `interface Props` を以下に丸ごと置き換える:

```astro
export function getStaticPaths() {
  const productSlugs = new Set(products.map((p) => p.slug));
  const richPaths = products.map((p) => ({
    params: { slug: p.slug },
    props: { kind: 'rich' as const, product: p },
  }));
  const litePaths = catalog
    .filter((c) => !productSlugs.has(c.slug))
    .map((c) => ({
      params: { slug: c.slug },
      props: { kind: 'catalog' as const, item: c },
    }));
  return [...richPaths, ...litePaths];
}

type Props =
  | { kind: 'rich'; product: Product }
  | { kind: 'catalog'; item: CatalogItem };

const rawProps = Astro.props;
const isRich = rawProps.kind === 'rich';
const product = isRich ? rawProps.product : null;
const catalogItem = !isRich ? rawProps.item : null;
```

- [ ] **Step 3: rich ブランチの既存変数をガードする**

Props 分岐の直後(上記の `const catalogItem = ...` の直後)に以下を追加する。既存コードで `product` を参照している部分がそのまま動くようにするため:

```astro
// ── rich ブランチ専用の変数 (kind==='catalog' のとき null) ──
const relatedProducts = product
  ? product.related.map((slug) => findProduct(slug)).filter((p): p is Product => !!p)
  : [];
const productImage = product
  ? productImageForKey(product.imageKey, product.title)
  : { src: null, alt: '', stem: '', label: '' };
const relatedProductCards = relatedProducts.slice(0, 3).map((item) => ({
  item,
  image: productImageForKey(item.imageKey, item.title),
}));

const categoryLabel = (product?.category ?? catalogItem?.category) === 'specialty' ? '産直' : 'アパレル';
const categoryHref = '/products/' + ((product?.category ?? catalogItem?.category) === 'specialty' ? 'specialty' : 'apparel') + '/';

const thumbs = product ? [productImage, productImage, productImage, productImage] : [];

// レビュー集計 (共通)
const slugForReview = product?.slug ?? catalogItem?.slug ?? '';
const productReviews = reviewsByProduct(slugForReview);
const reviewCount = productReviews.length;
const avgRaw = averageRating(slugForReview);
const avgRating = Math.round(avgRaw * 10) / 10;
const ratingBuckets = [5, 4, 3, 2, 1].map((star) => {
  const count = productReviews.filter((r) => r.rating === star).length;
  const pct = reviewCount > 0 ? Math.round((count / reviewCount) * 100) : 0;
  return { star, count, pct };
});
const sortedReviews = [...productReviews].sort((a, b) => b.postedAt.localeCompare(a.postedAt));
function starString(n: number): string {
  return '★★★★★☆☆☆☆☆'.slice(5 - n, 10 - n);
}
function formatJaDate(d: string): string {
  const [y, m, day] = d.split('-');
  return `${y}.${m}.${day}`;
}

// ── rich ブランチ専用の施策変数 ──
const isApparel = (product?.category ?? catalogItem?.category) === 'apparel';
const leadDays = isApparel ? 4 : 3;
const eta = new Date();
eta.setDate(eta.getDate() + leadDays);
const etaLabel = `${eta.getMonth() + 1}月${eta.getDate()}日頃`;
const subPlan = product ? subscriptions.find((s) => s.slug === product.slug) : null;
const ladderSteps = product ? volumeLadder.filter((v) => v.slug === product.slug) : [];
const hasLadder = ladderSteps.length > 1;
const ladderBest = hasLadder ? ladderSteps.reduce((a, b) => (b.perKg < a.perKg ? b : a)) : null;
const crossEntry = product ? crossSell.find((c) => c.slug === product.slug) : null;
const crossItems = (crossEntry?.recommends ?? [])
  .map((slug) => findProduct(slug))
  .filter((p): p is Product => !!p)
  .slice(0, 3)
  .map((item) => ({ item, image: productImageForKey(item.imageKey, item.title) }));
const giftThresholdMet = (product?.price ?? 0) >= thresholdGift.threshold;
const restockTarget = product ? restockInfo.targets.find((t) => t.slug === product.slug) : null;
const earnedPoints = Math.floor((product?.price ?? 0) * pointsInfo.rateValue);
```

- [ ] **Step 4: ビルドが通ることを確認**

```bash
cd /Users/kaito/projects/clients/shiretoko-tourist-final-live
npm run build 2>&1 | grep -E "error|Error|Build complete|pages generated"
```

期待: エラーなし。`pages generated` の件数が増えていること(260件以上のproductページが生成される)。

- [ ] **Step 5: コミット**

```bash
git add src/pages/products/\[slug\].astro
git commit -m "feat: getStaticPaths を catalog 全件に拡張(lite ブランチ描画は次タスク)"
```

---

## Task 3: `[slug].astro` に catalog 商品用 lite ブランチ描画を追加

**Files:**
- Modify: `src/pages/products/[slug].astro:95付近〜(Base タグの中身)`

現行の `<Base>` タグ内は `product` が必ず存在する前提で書かれている。catalog 商品用の描画を `{isRich ? (...) : (...)}` で分岐させる。

- [ ] **Step 1: `<Base>` タグのタイトルと description を動的化**

現行の:

```astro
<Base title={`${product.title}｜北の逸品堂`} description={product.summary} bodyClass="product-page product-page--rich">
```

を以下に変更する:

```astro
<Base
  title={`${isRich ? product!.title : catalogItem!.title}｜北の逸品堂`}
  description={isRich ? product!.summary : `${catalogItem!.brand ?? ''}${catalogItem!.apparelCategory ?? catalogItem!.specialtyCategory ?? ''} ${catalogItem!.title}`}
  bodyClass={`product-page${isRich ? ' product-page--rich' : ' product-page--lite'}`}
>
```

- [ ] **Step 2: `<main>` の直下に kind 分岐を挿入**

既存の `<main>` タグ内の内容全体を `{isRich ? (` ... `) : (` ... `)}` で囲む。rich 側は既存コードそのまま。lite 側を以下のように書く。

既存コードの `<main>` 開始直後にある `<!-- パンくず -->` から始まるブロック全体を以下の構造に置き換える:

```astro
<main>
  {isRich ? (
    <>
      <!-- パンくず -->
      ... (既存のパンくず〜ツアー連動まで全コードをここに移動) ...
    </>
  ) : (
    <>
      {/* ── catalog lite ブランチ ── */}
      <nav class="breadcrumbs" aria-label="パンくず">
        <div class="breadcrumbs__inner">
          <a href="/">TOP</a>
          <span class="sep">/</span>
          <a href={categoryHref}>{categoryLabel}</a>
          <span class="sep">/</span>
          <span class="current" aria-current="page">{catalogItem!.title}</span>
        </div>
      </nav>

      <section class="pdp">
        <div class="pdp__inner">
          {/* 左: 画像 */}
          <div class="pdp__gallery">
            <div class="pdp-main">
              {catalogItem!.image ? (
                <img src={catalogItem!.image} alt={catalogItem!.title} decoding="async" />
              ) : (
                <div class="source-placeholder source-placeholder--product" role="img" aria-label={`${catalogItem!.title}の画像枠`}>
                  <span>{catalogItem!.brand ?? categoryLabel}</span>
                  <small>画像を追加</small>
                </div>
              )}
            </div>
          </div>

          {/* 右: 情報 */}
          <div class="pdp__info">
            <div class="pdp-tags">
              <span class="pdp-tag pdp-tag--now">{categoryLabel}</span>
              {catalogItem!.brand && <span class="pdp-tag pdp-tag--origin">{catalogItem!.brand}</span>}
            </div>

            <h1 class="pdp-title">{catalogItem!.title}</h1>

            {/* スペック定義リスト */}
            <dl class="pdp-spec-dl">
              {catalogItem!.brand && <div class="pdp-spec-dl__row"><dt>ブランド</dt><dd>{catalogItem!.brand}</dd></div>}
              {catalogItem!.apparelCategory && <div class="pdp-spec-dl__row"><dt>カテゴリ</dt><dd>{catalogItem!.apparelCategory}</dd></div>}
              {catalogItem!.specialtyCategory && <div class="pdp-spec-dl__row"><dt>種別</dt><dd>{catalogItem!.specialtyCategory}</dd></div>}
              {catalogItem!.size && <div class="pdp-spec-dl__row"><dt>サイズ</dt><dd>{catalogItem!.size}</dd></div>}
              {catalogItem!.condition && <div class="pdp-spec-dl__row"><dt>状態</dt><dd>{catalogItem!.condition}</dd></div>}
              {catalogItem!.color && <div class="pdp-spec-dl__row"><dt>カラー</dt><dd>{catalogItem!.color}</dd></div>}
              {catalogItem!.weight && <div class="pdp-spec-dl__row"><dt>内容量</dt><dd>{catalogItem!.weight}</dd></div>}
            </dl>

            {/* 価格 / カート */}
            {catalogItem!.price !== undefined ? (
              <div class="pdp-purchase">
                <div class="pdp-price">
                  <span class="pdp-price__num">{formatYen(catalogItem!.price)}</span>
                  <span class="pdp-price__unit">税込</span>
                </div>
                <div class="pdp-qty">
                  <label for={`qty-${catalogItem!.slug}`}>数量</label>
                  <select id={`qty-${catalogItem!.slug}`} class="qty-select" aria-label="購入数量">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <button
                  type="button"
                  class="btn btn--primary btn--block btn--add-cart"
                  data-add-slug={catalogItem!.slug}
                  data-add-name={catalogItem!.title}
                  data-add-price={String(catalogItem!.price)}
                >
                  カゴに追加
                </button>
              </div>
            ) : (
              <div class="pdp-price-on-line">
                <p class="pdp-price-on-line__msg">価格はLINEで相談</p>
                <p class="pdp-price-on-line__sub">サイズ・在庫・送料をまとめてご案内します。</p>
                <a href="https://line.me/" class="btn btn--primary btn--block" target="_blank" rel="noopener noreferrer">
                  LINEで価格を確認する
                </a>
              </div>
            )}

            <a href={catalogItem!.url} class="pdp-ext-link" target="_blank" rel="noopener noreferrer">
              元ストアで詳細を見る →
            </a>
          </div>
        </div>
      </section>
    </>
  )}

  {/* ── レビューセクション (rich / lite 共通) ── */}
  ... (Task 4 で追加)
</main>
```

実際の作業では、`{isRich ? (` の rich 側ブロックには既存の `<!-- パンくず -->` から `<!-- ツアー連動 -->` セクション末尾(`</section>` まで含む)を丸ごとカット&ペーストする。

- [ ] **Step 3: ビルドが通ることを確認**

```bash
cd /Users/kaito/projects/clients/shiretoko-tourist-final-live
npm run build 2>&1 | grep -E "error|Error|Build complete"
```

期待: エラーなし。

- [ ] **Step 4: コミット**

```bash
git add src/pages/products/\[slug\].astro
git commit -m "feat: catalog 商品用 lite ブランチ描画を追加"
```

---

## Task 4: レビューセクションを rich/lite 共通に移動 + 投稿フォームを追加

**Files:**
- Modify: `src/pages/products/[slug].astro` (レビューセクション + script ブロック)

現行レビューセクション(`<!-- レビュー -->` から `</section>` まで)は rich ブランチ内に埋め込まれている。これを isRich 分岐の外(main の末尾)に移動し、lite でも共通表示にする。さらに投稿フォームを追加する。

- [ ] **Step 1: レビューセクションを分岐の外に移動**

rich 側の `{isRich ? (...) : (...)}` ブロックの**後**に、以下を追加する(既存のレビューセクション HTML は rich ブランチ内から削除し、ここに移す):

```astro
{/* ── レビューセクション (共通) ── */}
<section class="pdp-reviews" id="reviews">
  <div class="pdp-reviews__inner">
    <span class="section-eyebrow">REVIEWS</span>
    <h2>お客様の声</h2>
    <hr class="section-rule" />

    <div class="pdp-reviews__summary" id="reviews-summary">
      <div class="pdp-reviews__avg">
        <span class="pdp-reviews__avg-num" id="reviews-avg-num">{reviewCount > 0 ? avgRating.toFixed(1) : '—'}</span>
        <span class="pdp-reviews__avg-stars" id="reviews-avg-stars" aria-label={`平均 ${avgRating} / 5`}>
          {reviewCount > 0 ? starString(Math.round(avgRaw)) : '☆☆☆☆☆'}
        </span>
        <span class="pdp-reviews__avg-count" id="reviews-count">{reviewCount}件のレビュー</span>
      </div>
      <ul class="pdp-reviews__dist" id="reviews-dist">
        {ratingBuckets.map((b) => (
          <li class="pdp-reviews__dist-row">
            <span class="pdp-reviews__dist-label">★{b.star}</span>
            <span class="pdp-reviews__dist-bar">
              <span class="pdp-reviews__dist-fill" style={`width: ${b.pct}%`} data-star={b.star}></span>
            </span>
            <span class="pdp-reviews__dist-count" data-star-count={b.star}>{b.count}</span>
          </li>
        ))}
      </ul>
    </div>

    <ul class="pdp-reviews__list" id="reviews-list" data-shown={Math.min(3, sortedReviews.length)}>
      {sortedReviews.map((r, i) => (
        <li class={`pdp-reviews__card${i >= 3 ? ' is-hidden' : ''}`} data-review-index={i}>
          <div class="pdp-reviews__head">
            <span class="pdp-reviews__avatar" aria-hidden="true">{r.reviewerInitial}</span>
            <div class="pdp-reviews__id">
              <span class="pdp-reviews__name">{r.reviewerName} 様</span>
              <span class="pdp-reviews__meta">
                <span class="pdp-reviews__stars" aria-label={`評価 ${r.rating} / 5`}>{starString(r.rating)}</span>
                <span class="pdp-reviews__date">{formatJaDate(r.postedAt)}</span>
                {r.verified && <span class="pdp-reviews__verified">購入確認済み</span>}
              </span>
            </div>
          </div>
          <div class="pdp-reviews__body">
            <p class="pdp-reviews__title">{r.title}</p>
            <p class="pdp-reviews__text">{r.body}</p>
          </div>
          <div class="pdp-reviews__foot">
            <span class="pdp-reviews__useful">役に立った {r.useful}</span>
          </div>
          {r.reply && (
            <blockquote class="pdp-reviews__reply">
              <span class="pdp-reviews__reply-head">
                <b>{r.reply.from}</b>
                <span class="pdp-reviews__reply-date">{formatJaDate(r.reply.date)}</span>
              </span>
              <p>{r.reply.body}</p>
            </blockquote>
          )}
        </li>
      ))}
    </ul>

    {sortedReviews.length > 3 && (
      <div class="pdp-reviews__more-wrap">
        <button type="button" class="btn btn--outline pdp-reviews__more" data-review-more>
          もっと見る（残り {sortedReviews.length - 3} 件）
        </button>
      </div>
    )}

    {/* ── 投稿フォーム ── */}
    <div class="review-form-wrap" id="review-form-wrap">
      <h3 class="review-form__heading">レビューを投稿する</h3>
      <form class="review-form" id="review-form" novalidate>
        <div class="review-form__field">
          <label for="rf-name">お名前 <span aria-hidden="true">*</span></label>
          <input type="text" id="rf-name" name="name" maxlength="20" placeholder="例：田中" required />
        </div>
        <fieldset class="review-form__field review-form__stars-field">
          <legend>評価 <span aria-hidden="true">*</span></legend>
          <div class="review-form__star-row">
            {[5,4,3,2,1].map((n) => (
              <>
                <input type="radio" id={`rf-star-${n}`} name="rating" value={String(n)} required />
                <label for={`rf-star-${n}`} aria-label={`★${n}`}>★</label>
              </>
            ))}
          </div>
        </fieldset>
        <div class="review-form__field">
          <label for="rf-title">タイトル</label>
          <input type="text" id="rf-title" name="title" maxlength="40" placeholder="例：甘くて驚きました" />
        </div>
        <div class="review-form__field">
          <label for="rf-body">本文 <span aria-hidden="true">*</span></label>
          <textarea id="rf-body" name="body" rows="4" minlength="10" placeholder="20文字以上でご記入ください" required></textarea>
        </div>
        <p class="review-form__notice" role="status" id="review-form-notice" aria-live="polite"></p>
        <button type="submit" class="btn btn--primary review-form__submit" id="review-form-submit">レビューを送信する</button>
      </form>
    </div>
  </div>
</section>
```

- [ ] **Step 2: is:inline スクリプトにレビュー localStorage 読込・投稿処理を追加**

既存の `<script is:inline>` ブロック末尾(または既存ブロック内)に以下を追加する。`REVIEW_SLUG` はビルド時に Astro の式で埋め込む:

```astro
<script is:inline define:vars={{ reviewSlug: slugForReview }}>
  // ── localStorage レビューの読込・DOM追記 ──
  (function () {
    var STORAGE_KEY = 'hkitchen_reviews_' + reviewSlug;
    var list = document.getElementById('reviews-list');
    var countEl = document.getElementById('reviews-count');
    var avgNumEl = document.getElementById('reviews-avg-num');
    var avgStarsEl = document.getElementById('reviews-avg-stars');
    var formWrap = document.getElementById('review-form-wrap');
    var form = document.getElementById('review-form');
    var notice = document.getElementById('review-form-notice');
    var submitBtn = document.getElementById('review-form-submit');

    function starStr(n) {
      return '★★★★★☆☆☆☆☆'.slice(5 - n, 10 - n);
    }
    function pad2(n) { return String(n).padStart(2, '0'); }
    function todayStr() {
      var d = new Date();
      return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
    }
    function formatDate(s) {
      var parts = s.split('-');
      return parts[0] + '.' + parts[1] + '.' + parts[2];
    }

    function loadStored() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      } catch (e) {
        return [];
      }
    }

    function recalcAvg() {
      if (!countEl || !avgNumEl || !avgStarsEl) return;
      var staticCount = parseInt(list ? list.querySelectorAll('.pdp-reviews__card:not(.ls-review)').length : 0, 10);
      var lsItems = loadStored();
      var allCards = list ? list.querySelectorAll('.pdp-reviews__card') : [];
      var total = allCards.length;
      var sum = 0;
      allCards.forEach(function (c) {
        sum += parseInt(c.dataset.rating || '0', 10);
      });
      var avg = total > 0 ? (sum / total) : 0;
      countEl.textContent = total + '件のレビュー';
      avgNumEl.textContent = total > 0 ? avg.toFixed(1) : '—';
      avgStarsEl.textContent = total > 0 ? starStr(Math.round(avg)) : '☆☆☆☆☆';
      avgStarsEl.setAttribute('aria-label', '平均 ' + avg.toFixed(1) + ' / 5');
    }

    function createCard(rv) {
      var li = document.createElement('li');
      li.className = 'pdp-reviews__card ls-review';
      li.dataset.rating = String(rv.rating);
      li.innerHTML = [
        '<div class="pdp-reviews__head">',
        '<span class="pdp-reviews__avatar" aria-hidden="true">' + rv.name.charAt(0) + '</span>',
        '<div class="pdp-reviews__id">',
        '<span class="pdp-reviews__name"></span>',
        '<span class="pdp-reviews__meta">',
        '<span class="pdp-reviews__stars">' + starStr(rv.rating) + '</span>',
        '<span class="pdp-reviews__date">' + formatDate(rv.postedAt) + '</span>',
        '</span></div></div>',
        '<div class="pdp-reviews__body">',
        '<p class="pdp-reviews__title"></p>',
        '<p class="pdp-reviews__text"></p>',
        '</div>',
      ].join('');
      // XSS対策: テキストはtextContentで設定
      li.querySelector('.pdp-reviews__name').textContent = rv.name + ' 様';
      li.querySelector('.pdp-reviews__title').textContent = rv.title || '';
      li.querySelector('.pdp-reviews__text').textContent = rv.body;
      return li;
    }

    // 保存済みレビューをDOMに追加
    var stored = loadStored();
    if (list && stored.length > 0) {
      stored.slice().reverse().forEach(function (rv) {
        list.insertBefore(createCard(rv), list.firstChild);
      });
      recalcAvg();
    }

    // フォームが使えない環境では非表示
    if (formWrap) {
      try { localStorage.setItem('_ls_test', '1'); localStorage.removeItem('_ls_test'); }
      catch (e) { formWrap.hidden = true; return; }
    }

    // 投稿処理
    if (form && submitBtn) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var nameVal = form.querySelector('#rf-name').value.trim();
        var ratingVal = parseInt(form.querySelector('input[name="rating"]:checked')?.value || '0', 10);
        var titleVal = form.querySelector('#rf-title').value.trim();
        var bodyVal = form.querySelector('#rf-body').value.trim();

        if (!nameVal || !ratingVal || bodyVal.length < 10) {
          notice.textContent = '名前・評価・本文(10文字以上)を入力してください。';
          return;
        }

        var rv = {
          id: 'ls-' + Date.now(),
          name: nameVal,
          rating: ratingVal,
          title: titleVal,
          body: bodyVal,
          postedAt: todayStr(),
        };

        // 保存
        var arr = loadStored();
        arr.push(rv);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
        } catch (e) {
          notice.textContent = '保存に失敗しました。';
          return;
        }

        // DOM追加
        if (list) {
          list.insertBefore(createCard(rv), list.firstChild);
        }
        recalcAvg();

        // フォームリセット
        form.reset();
        notice.textContent = 'レビューを投稿しました。ありがとうございます！';
        setTimeout(function () { notice.textContent = ''; }, 3000);
      });
    }
  })();
</script>
```

- [ ] **Step 3: ビルドが通ることを確認**

```bash
cd /Users/kaito/projects/clients/shiretoko-tourist-final-live
npm run build 2>&1 | grep -E "error|Error|Build complete"
```

期待: エラーなし。

- [ ] **Step 4: コミット**

```bash
git add src/pages/products/\[slug\].astro
git commit -m "feat: レビューセクションを共通化 + localStorage 投稿フォームを追加"
```

---

## Task 5: CSS — タイトル修正・説明文スタイル・lite ブランチ用スタイル・フォームCSS

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: pdp-info__title のモバイルサイズを修正**

`global.css` の 2312 行目(`.pdp-info__title` のルール)を以下に変更する:

```css
.pdp-info__title { font-family: 'Noto Serif JP', serif; font-weight: 600; font-size: clamp(1.05rem, 3.5vw, 2.1rem); line-height: 1.35; letter-spacing: 0.02em; margin: 0 0 0.6rem; overflow-wrap: break-word; }
```

2540 行目のメディアクエリ内の上書きも合わせて変更する:

```css
.pdp-info__title { font-size: clamp(1.05rem, 4.5vw, 1.5rem); }
```

さらに `.pdp-title` クラス(catalog lite ブランチで `<h1 class="pdp-title">` に使用)も同じスタイルで追加する。`.pdp-info__title` の直後に以下を追加する:

```css
.pdp-title { font-family: 'Noto Serif JP', serif; font-weight: 600; font-size: clamp(1.05rem, 3.5vw, 2.1rem); line-height: 1.35; letter-spacing: 0.02em; margin: 0 0 0.6rem; overflow-wrap: break-word; }
```

- [ ] **Step 2: pdp-spec__desc のスタイルを追加**

`.pdp-spec td { color: #1A1A1A; }` の直後(2364行目付近)に以下を追加する:

```css
.pdp-spec__desc { font-size: 0.92rem; line-height: 1.85; max-width: 60ch; color: #3a3a30; margin-top: 1.2rem; text-align: left; }
```

- [ ] **Step 3: pdp-spec-dl (catalog lite ブランチ用定義リスト) のスタイルを追加**

上記の続きに追加する:

```css
.pdp-spec-dl { width: 100%; font-size: 0.85rem; border-top: 1px solid #d9d3c4; margin: 1.2rem 0 1.6rem; }
.pdp-spec-dl__row { display: grid; grid-template-columns: 28% 1fr; border-bottom: 1px solid #d9d3c4; }
.pdp-spec-dl__row dt { padding: 0.9rem 1rem; color: #6f6a60; font-weight: 500; letter-spacing: 0.06em; background: #ECE7DA; }
.pdp-spec-dl__row dd { padding: 0.9rem 1rem; color: #1A1A1A; margin: 0; }
@media (max-width: 600px) {
  .pdp-spec-dl__row { grid-template-columns: 38% 1fr; }
  .pdp-spec-dl__row dt { font-size: 0.78rem; }
}
```

- [ ] **Step 4: pdp-price-on-line (価格未設定時) のスタイルを追加**

```css
.pdp-price-on-line { background: #ECE7DA; border: 1px solid #C9BFA8; border-radius: 2px; padding: 1.2rem 1.4rem; margin: 1.2rem 0; }
.pdp-price-on-line__msg { font-family: 'Noto Serif JP', serif; font-size: 1.1rem; font-weight: 600; color: #B99253; margin: 0 0 0.3rem; }
.pdp-price-on-line__sub { font-size: 0.82rem; color: #4a463e; margin: 0 0 1rem; }
```

- [ ] **Step 5: pdp-ext-link (元ストアリンク) のスタイルを追加**

```css
.pdp-ext-link { display: inline-block; margin-top: 0.8rem; font-size: 0.78rem; color: #6f6a60; text-decoration: underline; }
.pdp-ext-link:hover { color: #3C8186; }
```

- [ ] **Step 6: review-form のスタイルを追加**

```css
/* ── Review Form ── */
.review-form-wrap { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #C9BFA8; }
.review-form__heading { font-family: 'Noto Serif JP', serif; font-size: 1.15rem; font-weight: 600; margin: 0 0 1.4rem; }
.review-form { display: flex; flex-direction: column; gap: 1.2rem; }
.review-form__field { display: flex; flex-direction: column; gap: 0.35rem; }
.review-form__field label, .review-form__stars-field legend { font-size: 0.78rem; letter-spacing: 0.1em; color: #6f6a60; }
.review-form__field input[type="text"],
.review-form__field textarea { padding: 0.7rem 0.9rem; border: 1px solid #C9BFA8; background: #fff; border-radius: 2px; font-size: 0.92rem; font-family: 'Noto Sans JP', sans-serif; color: #1A1A1A; width: 100%; box-sizing: border-box; transition: border-color 160ms; }
.review-form__field input[type="text"]:focus,
.review-form__field textarea:focus { outline: none; border-color: #B99253; }
.review-form__star-row { display: flex; flex-direction: row-reverse; gap: 0.3rem; }
.review-form__star-row input[type="radio"] { position: absolute; opacity: 0; width: 0; height: 0; }
.review-form__star-row label { font-size: 1.6rem; color: #d9d3c4; cursor: pointer; transition: color 120ms; line-height: 1; }
.review-form__star-row input[type="radio"]:checked ~ label,
.review-form__star-row label:hover,
.review-form__star-row label:hover ~ label { color: #B99253; }
.review-form__notice { font-size: 0.82rem; color: #3C8186; min-height: 1.2em; margin: 0; }
.review-form__submit { align-self: flex-start; }
@media (max-width: 600px) {
  .review-form__submit { width: 100%; }
}
```

- [ ] **Step 7: ビルドが通ることを確認**

```bash
cd /Users/kaito/projects/clients/shiretoko-tourist-final-live
npm run build 2>&1 | grep -E "error|Error|Build complete"
```

期待: エラーなし。

- [ ] **Step 8: コミット**

```bash
git add src/styles/global.css
git commit -m "style: pdp-title clamp修正 / pdp-spec__desc / lite ブランチ用CSS / レビューフォームCSS"
```

---

## Task 6: 動作確認 (ローカルプレビュー)

**Files:** なし(確認のみ)

- [ ] **Step 1: dev サーバーを起動**

```bash
cd /Users/kaito/projects/clients/shiretoko-tourist-final-live
npm run dev
```

- [ ] **Step 2: 一覧 → 詳細ページの遷移を確認**

ブラウザで `http://localhost:4321/products/apparel/` を開く。
- カードをクリックすると `http://localhost:4321/products/<slug>/` に遷移する(外部サイトに飛ばない)
- 「戻る」で一覧に戻れる

- [ ] **Step 3: catalog lite ブランチの表示を確認**

`http://localhost:4321/products/specialty/` から産直商品をクリック。
または直接 `http://localhost:4321/products/【新品s】-パタゴニア-ｍs-ナノ・パフ・ベスト-■-pata/` を開く(スラグはcatalog.tsの2番目の商品)。
- h1 タイトルが2〜3行に収まっている
- スペック定義リストが表示されている
- price がない商品では「価格はLINEで相談」が表示され、カートボタンがない
- price がある商品ではカートボタンが表示される

- [ ] **Step 4: products.ts の rich ブランチが壊れていないことを確認**

`http://localhost:4321/products/asparagus-1kg/` を開く。
- 従来通りの全UI(定期便・クロスセル・ツアー連動)が表示されている
- レビューが表示されている

- [ ] **Step 5: レビュー投稿フォームの動作確認**

`http://localhost:4321/products/asparagus-1kg/` のレビューセクションへスクロール。
- フォームが表示されている
- 名前・評価・本文を入力して「レビューを送信する」をクリック
- リスト先頭に新しいレビューカードが追加される
- 平均評価・件数が更新される
- ページリロード後もレビューが残っている(localStorage 確認)

- [ ] **Step 6: モバイル幅での確認**

ブラウザ DevTools で 375px 幅に設定。
- タイトルが5行を超えていない
- 定義リストが横スクロールしていない
- レビューフォームの送信ボタンが画面幅いっぱいに広がっている
- 星評価 radio が操作できる

---

## 自己レビュー

### spec カバレッジ確認

| 要件 | 対応タスク |
|------|-----------|
| catalog全商品に自社詳細ページ生成 | Task 2 |
| 一覧カードのhrefを外部→内部に | Task 1 |
| slug衝突対策(products.ts優先) | Task 2 Step 2 |
| pdp-titleのclamp修正 | Task 5 Step 1 |
| pdp-spec__descの構造化 | Task 5 Step 2 |
| catalogスペックをdlで表示 | Task 3 Step 2 |
| 価格未設定→カート非表示+LINE誘導 | Task 3 Step 2 |
| 価格あり→通常カート | Task 3 Step 2 |
| レビューサマリ+一覧(共通化) | Task 4 Step 1 |
| レビュー投稿フォームlocalStorage | Task 4 Step 2 |
| 投稿後即時DOM反映 | Task 4 Step 2 |
| 投稿後平均評価更新 | Task 4 Step 2 |
| XSS対策(textContent) | Task 4 Step 2 |
| localStorage不可時graceful | Task 4 Step 2 |
| モバイル無崩れ | Task 5 (CSS) + Task 6 Step 6 |
| 元ストアURLを詳細ページに残す | Task 3 Step 2 |

### 型一貫性チェック

- `slugForReview` は Task 2 Step 3 で定義、Task 4 の `define:vars={{ reviewSlug: slugForReview }}` で参照 — 一致
- `catalogItem!.slug` は `CatalogItem.slug: string` — 存在確認済み
- `formatYen` は `products.ts` からインポート済み — catalog の price に対しても使用可
- `reviewsByProduct` / `averageRating` は Task 2 Step 3 で `slugForReview` を引数に変更 — 一致
