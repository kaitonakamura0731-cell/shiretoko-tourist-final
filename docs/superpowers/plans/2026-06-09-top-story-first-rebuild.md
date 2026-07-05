# TOP story-first リビルド Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `index.astro` のTOPを story-first 構成(ヒーロー→NEWS→OUR STORY→SHOP ENTRANCE→LINE帯)に再構築し、現在のEC系セクション(7入口タイル/2大入口/季節カレンダー/産直おすすめ/アパレルおすすめ/PICK UP/BUY TOGETHER/ツアー連動)をすべて削除する。

**Architecture:** `index.astro` の `<main>` を全面書き換え。既存の CSS 変数・クラス(`.story`, `.retention`, `.news-list`, `.btn` 等)は最大限再利用し、新規 CSS は `global.css` の末尾に追記する。`sourceImages.ts` のスロット定義は変更なし。セクション順: ①HERO(フルブリード画像+コピー下置き) ②NEWS(ヒーロー直下) ③OUR STORY(2カラム) ④SHOP ENTRANCE(2カード+全幅帯) ⑤LINE帯(細帯)。

**Tech Stack:** Astro 静的生成、既存 CSS カスタムプロパティ、既存 TypeScript データ層

---

## 変更ファイル一覧

| ファイル | 操作 | 内容 |
|---|---|---|
| `src/pages/index.astro` | **全面書き換え** | `<main>` を5セクション構成に置換。フロントマターは最小化(EC系データ取得を削除) |
| `src/styles/global.css` | **末尾追記** | `.hero-fb`, `.news-section`, `.shop-entrance`, `.line-band` の新クラス群 |
| `src/data/sourceImages.ts` | **変更なし** | 既存スロット(`hero`, `story`, `lineQr`)をそのまま利用 |

---

## Task 1: フロントマター整理 — EC系データ取得を削除しシンプル化

**Files:**
- Modify: `src/pages/index.astro` (lines 1-95 のフロントマター部分)

現在のフロントマターは `products`, `apparelItems`, `specialtyFeatured`, `apparelFeatured`, `specialtyPreviews`, `apparelPreviews`, `ranking`, `bundles`, `tours` を取得している。新TOPではこれらは不要になる。`siteMedia`(hero/story/lineQr)のみ使う。

- [ ] **Step 1: フロントマターを以下に丸ごと置換する**

`src/pages/index.astro` の `---` … `---` ブロック(1行目〜95行目)を以下に置換:

```astro
---
// 北の逸品堂 / 知床ツーリスト — TOPページ (story-first構成)
// 構成: ヒーロー → NEWS → OUR STORY → SHOP ENTRANCE → LINE帯
import "../styles/global.css";
import { siteMedia as media } from "../data/sourceImages";

const meta = {
  title: "知床から、食べるものと着るものを選ぶ｜北の逸品堂(1992清里町)",
  description: "北海道・知床のセレクトショップ「北の逸品堂」。1992年清里町から、店主が選ぶ産直食材と現場で使うアウトドアウェア(Patagonia等)。LINE登録で再入荷・収穫速報。",
};

const currentYear = new Date().getFullYear();
const safeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

// NEWSデータ (静的。将来CMSに切り替え可)
const newsItems = [
  { date: "2026.06.09", category: "産直",   categorySlug: "specialty", title: "朝採りアスパラ 1kg・3kg・8kg 出荷開始。6月末まで出荷予定。" },
  { date: "2026.05.21", category: "アパレル", categorySlug: "apparel",   title: "Patagonia R1 Air Hoodie 2026SS 全色入荷しました。" },
  { date: "2026.04.15", category: "メディア", categorySlug: "media",     title: "北海道新聞「知床の味覚」特集に掲載されました。" },
  { date: "2026.03.01", category: "ツアー",   categorySlug: "tour",      title: "2026年春夏ツアー(知床五湖ガイド)の受付を開始しました。" },
  { date: "2025.12.10", category: "産直",   categorySlug: "specialty",   title: "冬の定番・オホーツク鮭フレーク(170g)の予約受付を開始。" },
];
---
```

- [ ] **Step 2: ビルドが通ることを確認**

```bash
cd /Users/kaito/projects/shiretoko-tourist-final-live && npm run build 2>&1 | tail -20
```

期待: `build complete` が出てエラーなし。(この時点では `<main>` はまだ古いままなので表示は崩れているが、ビルドエラーがなければOK)

---

## Task 2: `<head>` + ヘッダ + topbar を保持したまま `<main>` を空にする

**Files:**
- Modify: `src/pages/index.astro` (`<main>` 内部 = 現在の `<!-- ヒーロー -->` から `</main>` の直前まで)

- [ ] **Step 1: `<main>` の内容を一時的に空にする**

`<main>` タグの中身(`<!-- ============ ヒーロー ============ -->` から `</main>` の1行前 `</section>` まで)を以下の1行に置換:

```html
<main>
  <!-- sections will be added in subsequent tasks -->
</main>
```

- [ ] **Step 2: ビルド確認**

```bash
cd /Users/kaito/projects/shiretoko-tourist-final-live && npm run build 2>&1 | tail -5
```

期待: エラーなし。

---

## Task 3: SECTIONを追加の前に新CSS クラスを global.css に追記する

**Files:**
- Modify: `src/styles/global.css` (末尾に追記)

- [ ] **Step 1: global.css の末尾(現在 3043行付近)に以下を追加する**

```css
/* ============== story-first TOP — 新規追加クラス ============== */

/* ---- HERO fullbleed ---- */
.hero-fb {
  background: var(--ink);
  border-bottom: 1px solid var(--line);
  overflow: hidden;
}
.hero-fb__img {
  width: 100%;
  max-height: 90vh;
  min-height: 320px;
  object-fit: cover;
  display: block;
}
.hero-fb__placeholder {
  width: 100%;
  height: 60vw;
  max-height: 90vh;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background:
    linear-gradient(135deg, rgba(60,129,134,0.22), rgba(185,146,83,0.28)),
    #2a2f2a;
  color: rgba(240, 234, 217, 0.75);
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-align: center;
  padding: 2rem;
}
.hero-fb__placeholder strong {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  color: rgba(240,234,217,0.9);
  font-weight: 500;
}
.hero-fb__copy {
  max-width: var(--max-w-narrow);
  margin: 0 auto;
  padding: clamp(28px, 5vw, 52px) 1.25rem clamp(36px, 6vw, 64px);
  text-align: center;
}
.hero-fb__headline {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  color: var(--ink);
  letter-spacing: 0.06em;
  font-weight: 600;
  margin: 0 0 0.6em;
  line-height: 1.55;
}
.hero-fb__sub {
  font-family: var(--font-sans);
  font-size: clamp(0.88rem, 1.4vw, 0.98rem);
  color: var(--ink-soft);
  line-height: 2;
  max-width: 34em;
  margin: 0 auto 1.8em;
}
.hero-fb__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--teal-dark);
  border-bottom: 1px solid var(--teal);
  padding-bottom: 0.1em;
  letter-spacing: 0.04em;
  transition: color 150ms ease, border-color 150ms ease;
}
.hero-fb__cta:hover {
  color: var(--teal);
  border-color: var(--teal);
  text-decoration: none;
}
@media (max-width: 560px) {
  .hero-fb__img { max-height: 60vh; }
}

/* ---- NEWS section ---- */
.news-section {
  background: var(--bg-soft);
  border-bottom: 1px solid var(--line);
  padding: clamp(40px, 5vw, 64px) 0;
}
.news-section__inner {
  max-width: var(--max-w-narrow);
  margin: 0 auto;
  padding: 0 1.25rem;
}
.news-section__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.6em;
  flex-wrap: wrap;
}
.news-section__title {
  font-family: var(--font-serif);
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  color: var(--ink);
  font-weight: 600;
  margin: 0;
}
.news-section__more {
  font-size: 0.82rem;
  color: var(--teal-dark);
  white-space: nowrap;
}
.news-rows {
  list-style: none;
  margin: 0;
  padding: 0;
  background: var(--bg-card);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.news-row {
  display: grid;
  grid-template-columns: 110px auto 1fr;
  gap: 0.8rem 1rem;
  align-items: baseline;
  padding: 0.9rem 1.4rem;
  border-bottom: 1px solid var(--line);
  font-size: 0.9rem;
}
.news-row:last-child { border-bottom: none; }
.news-row__date {
  font-family: var(--font-num);
  font-size: 0.78rem;
  color: var(--ink-soft);
  letter-spacing: 0.06em;
  white-space: nowrap;
}
.news-row__tag {
  display: inline-block;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: var(--teal-dark);
  border: 1px solid var(--teal);
  border-radius: 2px;
  padding: 0.15em 0.55em;
  white-space: nowrap;
}
.news-row__tag--apparel { color: var(--ink-soft); border-color: var(--line-strong); }
.news-row__tag--media   { color: var(--camel-dark); border-color: var(--camel); }
.news-row__tag--tour    { color: var(--camel-dark); border-color: var(--camel); }
.news-row__title {
  color: var(--ink);
  font-size: 0.9rem;
  line-height: 1.65;
}
@media (max-width: 600px) {
  .news-row {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 0.3rem;
    padding: 0.85rem 1rem;
  }
  .news-row__date, .news-row__tag { font-size: 0.72rem; }
  .news-row__title { font-size: 0.88rem; }
  /* モバイルは日付+タグを横並び1行目に */
  .news-row__date { display: inline; margin-right: 0.5em; }
  .news-row__tag  { display: inline-block; }
}

/* ---- SHOP ENTRANCE ---- */
.shop-entrance {
  background: var(--bg-card);
  border-bottom: 1px solid var(--line);
  padding: clamp(48px, 6vw, 80px) 0 0;
}
.shop-entrance__inner {
  max-width: var(--max-w-narrow);
  margin: 0 auto;
  padding: 0 1.25rem;
}
.shop-entrance__header {
  text-align: center;
  margin-bottom: clamp(1.6rem, 3vw, 2.4rem);
}
.shop-entrance__eyebrow {
  display: block;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  color: var(--teal);
  letter-spacing: 0.32em;
  margin-bottom: 0.6em;
}
.shop-entrance__headline {
  font-family: var(--font-serif);
  font-size: clamp(1.1rem, 2vw, 1.45rem);
  color: var(--ink);
  font-weight: 600;
  margin: 0 0 0.3em;
  letter-spacing: 0.04em;
}
.shop-entrance__sub {
  font-size: 0.88rem;
  color: var(--ink-soft);
  margin: 0;
}
.shop-entrance__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.4rem;
  margin-bottom: 1.4rem;
}
.entrance-card {
  background: var(--bg-soft);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 150ms ease;
}
.entrance-card:hover { box-shadow: 0 6px 18px rgba(45,42,36,0.1); text-decoration: none; }
.entrance-card__img {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--bg-soft);
  position: relative;
}
.entrance-card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 600ms ease;
}
.entrance-card:hover .entrance-card__img img { transform: scale(1.04); }
.entrance-card__img-ph {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: var(--ink-soft);
  letter-spacing: 0.06em;
  padding: 1.5rem;
  text-align: center;
}
.entrance-card--specialty .entrance-card__img-ph {
  background: linear-gradient(135deg, rgba(185,146,83,0.18), rgba(185,146,83,0.08)), var(--bg-soft);
}
.entrance-card--apparel .entrance-card__img-ph {
  background: linear-gradient(135deg, rgba(58,70,81,0.18), rgba(60,129,134,0.12)), var(--bg-soft);
}
.entrance-card__body {
  padding: 1.2rem 1.3rem 1.4rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.entrance-card__tag {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  color: var(--teal);
  font-family: var(--font-sans);
}
.entrance-card--specialty .entrance-card__tag { color: var(--camel-dark); }
.entrance-card__name {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  color: var(--ink);
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.03em;
}
.entrance-card__desc {
  font-size: 0.85rem;
  color: var(--ink-soft);
  line-height: 1.8;
  margin: 0.1em 0 0.4em;
}
.entrance-card__link {
  font-size: 0.85rem;
  color: var(--teal-dark);
  font-weight: 500;
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
}
.entrance-card:hover .entrance-card__link { text-decoration: underline; text-underline-offset: 3px; }
.shop-entrance__band {
  display: block;
  background: var(--teal-soft);
  border-top: 1px solid var(--line);
  text-align: center;
  padding: 1rem 1.25rem;
  margin-top: 0;
}
.shop-entrance__band:hover { background: var(--teal-soft); text-decoration: none; }
.shop-entrance__band span {
  font-size: 0.88rem;
  color: var(--teal-dark);
  font-weight: 500;
  letter-spacing: 0.04em;
}
.shop-entrance__band span::after {
  content: " →";
  font-weight: 400;
}

/* ---- LINE 細帯 ---- */
.line-band {
  background: var(--teal);
  border-bottom: 1px solid var(--line);
  padding: 1.2rem 1.25rem;
}
.line-band__inner {
  max-width: var(--max-w-narrow);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.line-band__text {
  font-size: 0.9rem;
  color: rgba(240,234,217,0.95);
  font-weight: 500;
  letter-spacing: 0.04em;
}
.line-band__btn {
  display: inline-block;
  border: 1px solid rgba(240,234,217,0.7);
  color: rgba(240,234,217,0.95);
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.5em 1.2em;
  border-radius: var(--radius);
  white-space: nowrap;
  transition: background 150ms ease, color 150ms ease;
}
.line-band__btn:hover {
  background: rgba(240,234,217,0.15);
  color: #fff;
  text-decoration: none;
}
@media (max-width: 480px) {
  .line-band__inner { flex-direction: column; align-items: flex-start; gap: 0.6rem; }
}

/* ---- story section (既存 .story をそのまま流用、追加スタイル) ---- */
/* モバイルで縦積み: 既存 .story__inner の grid を上書き */
@media (max-width: 680px) {
  .story__inner {
    grid-template-columns: 1fr;
  }
  .story__portrait {
    aspect-ratio: 4 / 3;
    max-height: 300px;
  }
  .story__copy h2 { text-align: center; }
  .story__copy .section-eyebrow { text-align: center; }
  .story__copy .section-rule { margin-left: auto; margin-right: auto; }
}
/* ============== /story-first TOP ============== */
```

- [ ] **Step 2: ビルド確認**

```bash
cd /Users/kaito/projects/shiretoko-tourist-final-live && npm run build 2>&1 | tail -5
```

期待: エラーなし。

---

## Task 4: SECTIONを `<main>` に組み込む — ①HERO

**Files:**
- Modify: `src/pages/index.astro` (`<main>` の中身)

- [ ] **Step 1: `<main>` 内の `<!-- sections will be added... -->` を以下に置換する**

```html
<main>
  <!-- ============ HERO (fullbleed) ============ -->
  <section class="hero-fb" aria-label="ヒーロー">
    {media.hero.src ? (
      <img
        class="hero-fb__img"
        src={media.hero.src}
        alt={media.hero.alt}
        fetchpriority="high"
        decoding="async"
      />
    ) : (
      <div class="hero-fb__placeholder">
        <strong>北海道・知床 / オホーツク海岸の朝景色</strong>
        <span>public/source-images/hero-shiretoko.jpg を追加</span>
      </div>
    )}
    <div class="hero-fb__copy">
      <h1 class="hero-fb__headline">1992年から、ここで選んでいる。</h1>
      <p class="hero-fb__sub">
        北海道・清里町。知床のガイドが畑と岩場で見つけた食べるものと着るものを、この店から届けています。
      </p>
      <a href="/products/specialty/" class="hero-fb__cta">ショップを見る</a>
    </div>
  </section>
</main>
```

(後続タスクでセクションを追加していく。この時点では HERO のみ)

- [ ] **Step 2: ビルド確認**

```bash
cd /Users/kaito/projects/shiretoko-tourist-final-live && npm run build 2>&1 | tail -5
```

期待: エラーなし。

---

## Task 5: `<main>` に ②NEWS セクションを追加

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: `</section>` (HEROの閉じタグ) の直後に NEWSセクションを追加する**

`<!-- ============ HERO (fullbleed) ============ -->` ブロックの直後、`</main>` の前に以下を追加:

```html
  <!-- ============ NEWS (ヒーロー直下) ============ -->
  <section class="news-section" aria-label="お知らせ">
    <div class="news-section__inner">
      <div class="news-section__header">
        <h2 class="news-section__title">お知らせ</h2>
        <a href="/stories/" class="news-section__more">過去のお知らせ →</a>
      </div>
      <ul class="news-rows" role="list">
        {newsItems.map((item) => (
          <li class="news-row">
            <span class="news-row__date">{item.date}</span>
            <span class={`news-row__tag news-row__tag--${item.categorySlug}`}>{item.category}</span>
            <span class="news-row__title">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
```

- [ ] **Step 2: ビルド確認**

```bash
cd /Users/kaito/projects/shiretoko-tourist-final-live && npm run build 2>&1 | tail -5
```

期待: エラーなし。

---

## Task 6: `<main>` に ③OUR STORY セクションを追加

既存の `.story` CSS クラスをそのまま流用する。変更は属人性を高めるコピーのみ。

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: NEWS セクションの直後に OUR STORY セクションを追加する**

```html
  <!-- ============ OUR STORY ============ -->
  <section class="story" id="story" aria-label="店主の物語">
    <div class="story__inner">
      <div class="story__portrait">
        {media.story.src ? (
          <img src={media.story.src} alt={media.story.alt} loading="lazy" decoding="async" />
        ) : (
          <div class="source-placeholder source-placeholder--portrait" role="img" aria-label="代表 石田富雄のポートレート画像枠">
            <span>story-ishida</span>
            <small>public/source-images/story-ishida.jpg を追加</small>
          </div>
        )}
      </div>
      <div class="story__copy">
        <span class="section-eyebrow">OUR STORY</span>
        <h2>1992年、清里町から。</h2>
        <hr class="section-rule" />
        <p>
          代表の石田富雄は、東京から清里町に移り、1992年に小さなユースホステルを始めました。
          熱気球、自然ガイド、旅行業と、知床とオホーツクの自然のなかで生きる仕事を、ひとつずつ増やしてきました。
          「北の逸品堂」は、その33年で出会った農家、漁師、メーカーと、
          店主自身が現場で使う道具を並べる店です。
        </p>
        <ul class="story__chronology">
          <li><span class="year">1992</span><span>清里町でユースホステル開業</span></li>
          <li><span class="year">1996</span><span>熱気球事業開始</span></li>
          <li><span class="year">2000</span><span>自然ガイド事業開始</span></li>
          <li><span class="year">2002</span><span>株式会社 知床ツーリスト 法人化</span></li>
          <li><span class="year">2003</span><span>北海道知事登録旅行業 第2-453号</span></li>
        </ul>
        <p class="story__credit">
          「特産品もアパレルも、知床のガイドも、ぜんぶ同じ人間がやっています。」<br />
          — 代表 石田 富雄
        </p>
        <p style="margin-top: 1.2em;">
          <a href="/stories/" class="hero-fb__cta">店主の手記を読む</a>
        </p>
      </div>
    </div>
  </section>
```

**ポイント:** `media.story.src` がある場合は写真を表示。プレースホルダーには `source-placeholder--portrait` を使う(既存CSS)。下部に `/stories/` へのリンクを追加し「店主の他の話を読む」導線を作る。

- [ ] **Step 2: ビルド確認**

```bash
cd /Users/kaito/projects/shiretoko-tourist-final-live && npm run build 2>&1 | tail -5
```

期待: エラーなし。

---

## Task 7: `<main>` に ④SHOP ENTRANCE セクションを追加

EC入口。産直 → `/products/specialty/` / アパレル → `/products/apparel/` に直接リンク。`/shop` は作らないのでリンク先は既存URLのまま。

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: OUR STORY の直後に SHOP ENTRANCE セクションを追加する**

```html
  <!-- ============ SHOP ENTRANCE ============ -->
  <section class="shop-entrance" aria-label="ショップへの入口">
    <div class="shop-entrance__inner">
      <div class="shop-entrance__header">
        <span class="shop-entrance__eyebrow">SHOP</span>
        <h2 class="shop-entrance__headline">同じ人間が、畑で選んで岩場で着る。</h2>
        <p class="shop-entrance__sub">産直と現場ウェア、それぞれの入口から。</p>
      </div>
      <div class="shop-entrance__grid">
        <!-- 産直カード -->
        <a href="/products/specialty/" class="entrance-card entrance-card--specialty">
          <div class="entrance-card__img">
            <img
              src="/source-images/files/product-3012-shipping-included-8-0kg-hokkaido-okhotsk-koshimizu-asparagus-8-0kg-3005-image.jpeg"
              alt="朝採りアスパラ・清里町の畑"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="entrance-card__body">
            <span class="entrance-card__tag">SPECIALTY ・ 産直</span>
            <h3 class="entrance-card__name">食べるもの</h3>
            <p class="entrance-card__desc">
              朝採りのアスパラ、土つきのじゃがいも。畑から届く季節の便りを、その時いちばん良いものだけ並べます。
            </p>
            <span class="entrance-card__link">産直を見る (84商品)</span>
          </div>
        </a>

        <!-- アパレルカード -->
        <a href="/products/apparel/" class="entrance-card entrance-card--apparel">
          <div class="entrance-card__img">
            <img
              src="/source-images/files/product-2989-new-m-patagonia-ms-r1-air-full-zip-hoodie-patagonia-clement-blue-clmb-2984-p1010080-1.jpg"
              alt="知床の岩場で着るPatagoniaフリース"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="entrance-card__body">
            <span class="entrance-card__tag">APPAREL ・ アパレル</span>
            <h3 class="entrance-card__name">着るもの</h3>
            <p class="entrance-card__desc">
              店主が知床の現場で実際に着るもの。Patagonia を中心に、寒さと天候にきちんと向き合える一着を選んでいます。
            </p>
            <span class="entrance-card__link">アパレルを見る (533商品)</span>
          </div>
        </a>
      </div>
    </div>
    <!-- 全幅帯リンク -->
    <a href="/products/specialty/" class="shop-entrance__band">
      <span>すべての商品(産直・アパレル)を見る</span>
    </a>
  </section>
```

**注意:** 産直カードの画像には既存の `/source-images/files/product-3012-...jpeg` を流用する(sourceImages.tsの`asparagus`フォールバックと同じパス)。アパレルカードはPatagoniaフーディの既存画像を流用。

- [ ] **Step 2: ビルド確認**

```bash
cd /Users/kaito/projects/shiretoko-tourist-final-live && npm run build 2>&1 | tail -5
```

期待: エラーなし。

---

## Task 8: `<main>` に ⑤LINE帯を追加して `</main>` を閉じる

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: SHOP ENTRANCE の直後に LINE帯を追加する**

```html
  <!-- ============ LINE 細帯 ============ -->
  <div class="line-band" role="complementary" aria-label="LINE登録">
    <div class="line-band__inner">
      <span class="line-band__text">収穫便りをLINEで受け取る — 再入荷通知・収穫速報</span>
      <a href="#retention" class="line-band__btn">LINE登録 ¥500 OFF →</a>
    </div>
  </div>
</main>
```

- [ ] **Step 2: フッタの後ろの `<script is:inline>` ブロックを確認する**

フロントマター変更により `data-add-slug` を使う商品ボタンがなくなったため、`document.querySelectorAll('[data-add-slug]')` のコードは無害だが不要。削除してもよい。送料無料カウンターのスクリプトは topbar が残っているので維持すること。

- [ ] **Step 3: フルビルド確認**

```bash
cd /Users/kaito/projects/shiretoko-tourist-final-live && npm run build 2>&1 | tail -10
```

期待: `build complete`、エラーなし。

---

## Task 9: モバイル崩れチェックと `<meta viewport>` の確認

**Files:**
- Read only (確認)

- [ ] **Step 1: ビルド後の dist/index.html を確認し、viewport メタタグが存在することを確認する**

```bash
grep -n "viewport" /Users/kaito/projects/shiretoko-tourist-final-live/dist/index.html | head -5
```

期待: `<meta name="viewport" content="width=device-width, initial-scale=1" />` が存在すること。

- [ ] **Step 2: 横スクロール抑制を確認する**

```bash
grep -n "overflow-x" /Users/kaito/projects/shiretoko-tourist-final-live/src/styles/global.css | head -5
```

期待: `body { overflow-x: hidden; }` が存在すること(既存コード)。

- [ ] **Step 3: news-row のモバイルレスポンシブ CSS が存在することを確認する**

```bash
grep -n "news-row" /Users/kaito/projects/shiretoko-tourist-final-live/src/styles/global.css | head -10
```

期待: `.news-row` と `@media (max-width: 600px)` のブロックが両方ヒットすること。

- [ ] **Step 4: shop-entrance__grid の auto-fit 指定を確認する**

```bash
grep -n "auto-fit" /Users/kaito/projects/shiretoko-tourist-final-live/src/styles/global.css | head -5
```

期待: `.shop-entrance__grid` に `repeat(auto-fit, minmax(280px, 1fr))` が存在すること。

---

## Task 10: 最終確認 — 削除されたセクションの残骸がないこと

**Files:**
- Read only (確認)

- [ ] **Step 1: 削除対象セクションのクラスが `index.astro` に残っていないことを確認する**

```bash
grep -n "quick-tiles\|entrances\|season-band\|featured-block\|ranking\|bundle-section\|tour-link\|tour-feature" \
  /Users/kaito/projects/shiretoko-tourist-final-live/src/pages/index.astro
```

期待: **ヒットなし**。もしヒットがあれば該当行を削除する。

- [ ] **Step 2: `products`, `apparelItems`, `specialtyFeatured` 等のEC変数がフロントマターに残っていないことを確認する**

```bash
grep -n "specialtyFeatured\|apparelFeatured\|bundles\|tours\|ranking" \
  /Users/kaito/projects/shiretoko-tourist-final-live/src/pages/index.astro
```

期待: ヒットなし。

- [ ] **Step 3: 最終フルビルド**

```bash
cd /Users/kaito/projects/shiretoko-tourist-final-live && npm run build 2>&1 | tail -10
```

期待: `build complete`、エラー・警告なし。

- [ ] **Step 4: dist/index.html の構造を目視確認する**

```bash
grep -n 'class="hero-fb\|class="news-section\|class="story\|class="shop-entrance\|class="line-band' \
  /Users/kaito/projects/shiretoko-tourist-final-live/dist/index.html
```

期待: 5つのセクションクラスがすべてヒットすること。

---

## Spec カバレッジ自己チェック

| 要件 | 対応タスク |
|---|---|
| ヒーロー: フルブリード写真 + コピー下置き | Task 4 |
| ヒーローコピー「1992年から、ここで選んでいる。」 | Task 4 |
| ヒーローCTAは1本のみ | Task 4 (ショップを見る→/products/specialty/) |
| NEWS: ヒーロー直下に配置(gateway-conversionの best_idea採用) | Task 5 |
| NEWS: 日付+タグ+タイトルの3要素、5件 | Task 5 |
| NEWS: モバイルで日付+タグが1行目に横並び | Task 3 (CSS) + Task 5 |
| OUR STORY: 写真左・テキスト右2カラム | Task 6 (既存.story CSS流用) |
| OUR STORY: 年表5点 + 店主クレジット引用 | Task 6 |
| OUR STORY: /stories/へのリンク | Task 6 |
| SHOP ENTRANCE: 産直カード→/products/specialty/ | Task 7 |
| SHOP ENTRANCE: アパレルカード→/products/apparel/ | Task 7 |
| SHOP ENTRANCE: 全幅帯 | Task 7 |
| SHOP ENTRANCEコピーが属人性を体現(「同じ人間が…」) | Task 7 |
| LINE帯: 細帯・目立たせすぎない | Task 8 |
| EC系セクション削除(7タイル/2大入口/季節/おすすめ/PICK UP/バンドル/ツアー) | Task 10確認 |
| must_fix: ヒーロー写真に人物の気配(プレースホルダーのalt/labelに明記) | Task 4 (alt記述) |
| must_fix: SHOP ENTRANCEコピーが差別化されている | Task 7 |
| must_fix: NEWS直下配置(best_idea採用) | Task 5 |
| must_fix: ダーク帯(#1A1A1A)を使わない | Task 3 CSS確認 |
| モバイル崩れ禁止 / 横スクロール禁止 | Task 3 + Task 9 |
| AIスロップ禁止語彙なし | 全タスクでコピー確認済 |
