# Referral Coupon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** フロントエンドデモとして紹介クーポン機能を実装する。独立ページ `/referral` を新設し、localStorage でクライアント生成した `SHRT-XXXXXX` 形式の紹介コードを永続化する。

**Architecture:** `src/pages/referral.astro` を新規作成し、紹介コード発行・コピー・LINEシェア・仕組み説明を1ページに集約。`account.astro` の既存静的ハードコードの referral-section を `/referral` への軽量CTA カードに置き換える。`Base.astro` のフッタとモバイルナビに `/referral/` への導線リンクを追加する。バックエンドなし、決済・手数料への言及なし。

**Tech Stack:** Astro (静的生成), vanilla JavaScript (is:inline), localStorage API, Clipboard API, design-direction カラーパレット (#F6F3EC / #B99253 / #3C8186 / #C9BFA8)

---

## File Map

| Action | Path | 責務 |
|--------|------|------|
| Create | `src/pages/referral.astro` | 紹介プログラム専用ページ。コード発行・コピー・シェア・仕組み説明 |
| Modify | `src/pages/account.astro` lines 232–246, 993–1076 | referral-section を CTA カード化。静的ハードコードURL/コードを削除 |
| Modify | `src/layouts/Base.astro` lines 88–89, 135–141 | モバイルナビとフッタに /referral/ リンクを追加 |

---

## Task 1: Base.astro に /referral/ 導線を追加

**Files:**
- Modify: `src/layouts/Base.astro`

- [ ] **Step 1: モバイルナビに友達紹介リンクを追加する**

`src/layouts/Base.astro` の line 88 (`<li><a href="/account/"...マイページ</a></li>`) の直後に追加:

```astro
              <li><a href="/referral/" aria-current={isActive("/referral/") ? "page" : undefined}>友達紹介</a></li>
```

変更後の該当箇所 (lines 88–90):
```astro
              <li><a href="/account/" aria-current={isActive("/account/") ? "page" : undefined}>マイページ</a></li>
              <li><a href="/referral/" aria-current={isActive("/referral/") ? "page" : undefined}>友達紹介</a></li>
              <li><a href="/cart">カート</a></li>
```

- [ ] **Step 2: フッタ「サポート / 会社」列に友達紹介リンクを追加する**

`src/layouts/Base.astro` の line 137 (`<li><a href="/account/">送料・配送について</a></li>`) の直前に追加:

```astro
              <li><a href="/referral/">友達紹介 ¥500 OFF</a></li>
```

変更後の該当箇所:
```astro
            <h4>サポート / 会社</h4>
            <ul>
              <li><a href="/referral/">友達紹介 ¥500 OFF</a></li>
              <li><a href="/account/">送料・配送について</a></li>
```

- [ ] **Step 3: ビルドして確認する**

```bash
cd /Users/kaito/projects/clients/shiretoko-tourist-final-live && npx astro build 2>&1 | tail -10
```

期待値: エラーなし、`dist/` に出力される

- [ ] **Step 4: コミットする**

```bash
cd /Users/kaito/projects/clients/shiretoko-tourist-final-live && git add src/layouts/Base.astro && git commit -m "feat: add /referral nav links to footer and mobile-nav"
```

---

## Task 2: /referral ページを新規作成する

**Files:**
- Create: `src/pages/referral.astro`

- [ ] **Step 1: referral.astro を新規作成する**

`src/pages/referral.astro` を以下の内容で作成する:

```astro
---
import Base from "../layouts/Base.astro";
import { referral } from "../data/promotions";
---

<Base
  title="友達紹介プログラム｜北の逸品堂"
  description="お友だちを紹介すると、紹介した方・された方の双方に500円OFFクーポンを進呈します。北の逸品堂の友達紹介プログラム。"
  bodyClass="referral"
>
  <main>
    <nav class="breadcrumbs" aria-label="パンくず">
      <div class="breadcrumbs__inner">
        <a href="/">トップ</a> <span class="sep">/</span>
        <a href="/account/">マイページ</a> <span class="sep">/</span>
        <span class="current" aria-current="page">友達紹介</span>
      </div>
    </nav>

    <section class="ref-hero">
      <div class="ref-hero__inner">
        <span class="section-eyebrow">REFERRAL ・ 友達紹介</span>
        <h1 class="ref-hero__title">紹介した方も、された方も<br />¥500 OFF</h1>
        <p class="ref-hero__lead">
          北の逸品堂を気に入っていただけたら、ぜひお友だちにも。<br />
          紹介リンク経由で初回購入があると、紹介した方・された方の双方に<br />
          <strong>{referral.rewardLabel}</strong>をお届けします。
        </p>
      </div>
    </section>

    <section class="ref-steps-section">
      <div class="section-inner">
        <header class="section-head">
          <span class="section-eyebrow">HOW IT WORKS</span>
          <h2 class="section-title">仕組み</h2>
        </header>
        <ol class="ref-steps">
          {referral.steps.map((step) => <li>{step}</li>)}
        </ol>
      </div>
    </section>

    <section class="ref-code-section">
      <div class="ref-code-inner">
        <span class="section-eyebrow">YOUR CODE ・ あなたの紹介コード</span>
        <h2 class="ref-code-title">紹介コードを発行する</h2>
        <p class="ref-code-lead">
          下のボタンを押すと、あなた専用の紹介コードが発行されます。<br />
          このコードは次回以降も同じものが表示されます。
        </p>

        <div class="ref-code-box" id="ref-code-box" aria-live="polite">
          <span class="ref-code-placeholder">コードを発行するには下のボタンを押してください</span>
        </div>

        <div class="ref-actions">
          <button type="button" class="btn btn--primary" id="ref-generate-btn">
            コードを発行する
          </button>
          <button type="button" class="btn btn--outline" id="ref-copy-btn" hidden>
            リンクをコピー
          </button>
        </div>

        <div class="ref-share" id="ref-share" hidden>
          <p class="ref-share__label">シェアする</p>
          <div class="ref-share__btns">
            <a class="ref-share__line" id="ref-line-btn" href="#" target="_blank" rel="noopener noreferrer">
              LINE で送る
            </a>
            <a class="ref-share__twitter" id="ref-twitter-btn" href="#" target="_blank" rel="noopener noreferrer">
              X (Twitter) で投稿
            </a>
          </div>
        </div>

        <p class="ref-code-note">{referral.note}</p>
        <p class="ref-code-demo">商談用モックです。コードはお使いのブラウザにのみ保存され、実際の決済とは連携していません。</p>
      </div>
    </section>

    <section class="ref-reward-section">
      <div class="section-inner">
        <header class="section-head">
          <span class="section-eyebrow">REWARDS</span>
          <h2 class="section-title">特典の内容</h2>
        </header>
        <div class="ref-reward-grid">
          <article class="ref-reward-card ref-reward-card--referrer">
            <span class="ref-reward-card__role">紹介した方</span>
            <p class="ref-reward-card__amount">¥{referral.referrerReward.toLocaleString("ja-JP")}<small>OFF</small></p>
            <p class="ref-reward-card__desc">お友だちが初回購入を完了した後、次回注文で使えるクーポンをお届けします。</p>
          </article>
          <div class="ref-reward-divider" aria-hidden="true">＋</div>
          <article class="ref-reward-card ref-reward-card--referee">
            <span class="ref-reward-card__role">紹介された方</span>
            <p class="ref-reward-card__amount">¥{referral.refereeReward.toLocaleString("ja-JP")}<small>OFF</small></p>
            <p class="ref-reward-card__desc">初回注文時にクーポンが自動で適用されます。¥3,000以上のご注文でご利用いただけます。</p>
          </article>
        </div>
      </div>
    </section>

    <section class="ref-cta-section">
      <div class="ref-cta-inner">
        <p class="ref-cta__text">まずはコードを発行して、大切な方にシェアしてみてください。</p>
        <a href="#ref-code-box" class="btn btn--primary">コードを発行する</a>
      </div>
    </section>
  </main>

  <script is:inline>
    (function () {
      const STORAGE_KEY = 'kitano_referral_code';
      const BASE_URL = 'https://shiretoko-tourist-final.vercel.app/referral/';

      function generateCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = 'SHRT-';
        for (let i = 0; i < 6; i++) {
          code += chars[Math.floor(Math.random() * chars.length)];
        }
        return code;
      }

      function getOrCreateCode() {
        let code = localStorage.getItem(STORAGE_KEY);
        if (!code) {
          code = generateCode();
          localStorage.setItem(STORAGE_KEY, code);
        }
        return code;
      }

      function buildShareUrl(code) {
        return BASE_URL + '?ref=' + code;
      }

      function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          return navigator.clipboard.writeText(text);
        }
        // fallback for older Safari
        const el = document.createElement('textarea');
        el.value = text;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.focus();
        el.select();
        try {
          document.execCommand('copy');
        } finally {
          document.body.removeChild(el);
        }
        return Promise.resolve();
      }

      function activateUI(code) {
        const shareUrl = buildShareUrl(code);

        // コードボックスを更新
        const box = document.getElementById('ref-code-box');
        if (box) {
          box.innerHTML =
            '<span class="ref-code-value">' + code + '</span>' +
            '<span class="ref-code-url">' + shareUrl + '</span>';
        }

        // 発行ボタンを非表示、コピーボタンを表示
        const genBtn = document.getElementById('ref-generate-btn');
        const copyBtn = document.getElementById('ref-copy-btn');
        if (genBtn) genBtn.hidden = true;
        if (copyBtn) copyBtn.hidden = false;

        // シェアエリアを表示
        const shareArea = document.getElementById('ref-share');
        if (shareArea) shareArea.hidden = false;

        // LINEシェアURL
        const lineBtn = document.getElementById('ref-line-btn');
        if (lineBtn) {
          const lineMsg = encodeURIComponent(
            '北の逸品堂で¥500OFFになる紹介リンクです。知床直送の食材やアパレルがそろっています。\n' + shareUrl
          );
          lineBtn.href = 'https://line.me/R/msg/text/?' + lineMsg;
        }

        // Twitter/Xシェアurl
        const twitterBtn = document.getElementById('ref-twitter-btn');
        if (twitterBtn) {
          const twitterText = encodeURIComponent(
            '北の逸品堂の紹介リンクです。このリンクから初回購入すると¥500OFF。知床直送の食材です。 ' + shareUrl
          );
          twitterBtn.href = 'https://twitter.com/intent/tweet?text=' + twitterText;
        }
      }

      document.addEventListener('DOMContentLoaded', function () {
        // 既存コードがあれば即座にUIを有効化
        const existingCode = localStorage.getItem(STORAGE_KEY);
        if (existingCode) {
          activateUI(existingCode);
        }

        // 発行ボタン
        const genBtn = document.getElementById('ref-generate-btn');
        if (genBtn) {
          genBtn.addEventListener('click', function () {
            const code = getOrCreateCode();
            activateUI(code);
          });
        }

        // コピーボタン
        const copyBtn = document.getElementById('ref-copy-btn');
        if (copyBtn) {
          copyBtn.addEventListener('click', function () {
            const code = localStorage.getItem(STORAGE_KEY);
            if (!code) return;
            const shareUrl = buildShareUrl(code);
            copyToClipboard(shareUrl).then(function () {
              const orig = copyBtn.textContent;
              copyBtn.textContent = 'コピーしました';
              setTimeout(function () {
                copyBtn.textContent = orig;
              }, 2000);
            });
          });
        }
      });
    })();
  </script>

  <style>
    /* パンくず */
    .breadcrumbs {
      background: #F6F3EC;
      padding: 16px 24px 0;
    }
    .breadcrumbs__inner {
      max-width: 1100px;
      margin: 0 auto;
      font-family: "Noto Sans JP", sans-serif;
      font-size: 0.82rem;
      letter-spacing: 0.06em;
      color: #1A1A1A;
      opacity: 0.7;
    }
    .breadcrumbs a { color: inherit; text-decoration: none; }
    .breadcrumbs a:hover { color: #3C8186; }
    .breadcrumbs .sep { margin: 0 8px; opacity: 0.4; }

    /* ヒーロー */
    .ref-hero {
      background: #F6F3EC;
      padding: clamp(48px, 7vw, 88px) 24px clamp(40px, 6vw, 72px);
    }
    .ref-hero__inner {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    .section-eyebrow {
      font-family: "Inter", "Noto Sans JP", sans-serif;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.18em;
      color: #B99253;
      text-transform: uppercase;
    }
    .ref-hero__title {
      font-family: "Noto Serif JP", serif;
      font-weight: 600;
      font-size: clamp(28px, 4.4vw, 48px);
      line-height: 1.45;
      letter-spacing: 0.02em;
      color: #1A1A1A;
      margin: 16px 0 24px;
    }
    .ref-hero__lead {
      font-family: "Noto Sans JP", sans-serif;
      font-size: 15px;
      line-height: 1.95;
      color: #1A1A1A;
      opacity: 0.85;
      max-width: 640px;
      margin: 0 auto;
    }
    .ref-hero__lead strong { color: #3C8186; font-weight: 600; }

    /* 仕組みステップ */
    .ref-steps-section {
      padding: clamp(56px, 8vw, 96px) 0;
      background: #fff;
    }
    .section-inner {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 24px;
    }
    .section-head {
      text-align: center;
      margin-bottom: clamp(32px, 5vw, 48px);
    }
    .section-title {
      font-family: "Noto Serif JP", serif;
      font-weight: 600;
      font-size: clamp(24px, 3.4vw, 36px);
      line-height: 1.5;
      color: #1A1A1A;
      margin: 12px 0 0;
    }
    .ref-steps {
      list-style: none;
      counter-reset: ref;
      padding: 0;
      margin: 0 auto;
      max-width: 520px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .ref-steps li {
      counter-increment: ref;
      position: relative;
      padding-left: 48px;
      font-family: "Noto Sans JP", sans-serif;
      font-size: 15px;
      line-height: 1.75;
      color: #1A1A1A;
    }
    .ref-steps li::before {
      content: counter(ref);
      position: absolute;
      left: 0;
      top: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #B99253;
      color: #fff;
      border-radius: 50%;
      font-family: "Inter", sans-serif;
      font-size: 0.84rem;
      font-weight: 700;
    }

    /* コード発行エリア */
    .ref-code-section {
      background: #F6F3EC;
      padding: clamp(56px, 8vw, 96px) 24px;
    }
    .ref-code-inner {
      max-width: 640px;
      margin: 0 auto;
      text-align: center;
    }
    .ref-code-title {
      font-family: "Noto Serif JP", serif;
      font-weight: 600;
      font-size: clamp(22px, 3vw, 32px);
      line-height: 1.5;
      color: #1A1A1A;
      margin: 12px 0 14px;
    }
    .ref-code-lead {
      font-family: "Noto Sans JP", sans-serif;
      font-size: 14px;
      line-height: 1.9;
      color: #1A1A1A;
      opacity: 0.8;
      margin: 0 0 28px;
    }
    .ref-code-box {
      background: #fff;
      border: 1px solid #C9BFA8;
      border-radius: 3px;
      padding: 24px 28px;
      margin: 0 auto 24px;
      min-height: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .ref-code-placeholder {
      font-family: "Noto Sans JP", sans-serif;
      font-size: 13.5px;
      color: #1A1A1A;
      opacity: 0.45;
    }
    .ref-code-value {
      font-family: "Inter", monospace;
      font-feature-settings: "tnum";
      font-size: clamp(28px, 4.5vw, 40px);
      font-weight: 700;
      letter-spacing: 0.12em;
      color: #B99253;
    }
    .ref-code-url {
      font-family: "Inter", "Noto Sans JP", sans-serif;
      font-size: 0.78rem;
      letter-spacing: 0.04em;
      color: #1A1A1A;
      opacity: 0.5;
      word-break: break-all;
    }
    .ref-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }
    .ref-share {
      margin-bottom: 20px;
    }
    .ref-share__label {
      font-family: "Noto Sans JP", sans-serif;
      font-size: 0.78rem;
      letter-spacing: 0.12em;
      color: #1A1A1A;
      opacity: 0.55;
      margin: 0 0 10px;
    }
    .ref-share__btns {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .ref-share__line,
    .ref-share__twitter {
      display: inline-block;
      font-family: "Noto Sans JP", sans-serif;
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: #3C8186;
      border: 1px solid rgba(60, 129, 134, 0.45);
      border-radius: 3px;
      padding: 8px 18px;
      text-decoration: none;
      transition: background 200ms, color 200ms;
    }
    .ref-share__line:hover,
    .ref-share__twitter:hover {
      background: #3C8186;
      color: #fff;
    }
    .ref-code-note {
      font-family: "Noto Sans JP", sans-serif;
      font-size: 0.82rem;
      line-height: 1.8;
      color: #6B5F4F;
      margin: 0 0 8px;
    }
    .ref-code-demo {
      font-family: "Noto Sans JP", sans-serif;
      font-size: 0.78rem;
      line-height: 1.7;
      color: #6B5F4F;
      opacity: 0.7;
      margin: 0;
      padding: 8px 12px;
      border: 1px solid rgba(185, 146, 83, 0.3);
      border-radius: 3px;
      background: #fff;
      display: inline-block;
    }

    /* 特典カード */
    .ref-reward-section {
      padding: clamp(56px, 8vw, 96px) 0;
      background: #fff;
    }
    .ref-reward-grid {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: clamp(16px, 3vw, 32px);
      flex-wrap: wrap;
    }
    .ref-reward-card {
      background: #F6F3EC;
      border: 1px solid #C9BFA8;
      border-radius: 4px;
      padding: clamp(28px, 4vw, 40px);
      text-align: center;
      width: 260px;
      flex-shrink: 0;
    }
    .ref-reward-card--referrer { border-top: 3px solid #B99253; }
    .ref-reward-card--referee { border-top: 3px solid #3C8186; }
    .ref-reward-card__role {
      font-family: "Inter", "Noto Sans JP", sans-serif;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      color: #6B5F4F;
      text-transform: uppercase;
    }
    .ref-reward-card--referee .ref-reward-card__role { color: #3C8186; }
    .ref-reward-card__amount {
      font-family: "Inter", "Noto Sans JP", sans-serif;
      font-feature-settings: "tnum";
      font-size: clamp(36px, 5.5vw, 52px);
      font-weight: 700;
      color: #1A1A1A;
      line-height: 1.1;
      margin: 12px 0 8px;
    }
    .ref-reward-card--referee .ref-reward-card__amount { color: #3C8186; }
    .ref-reward-card__amount small {
      font-size: 0.38em;
      font-weight: 600;
      margin-left: 2px;
      opacity: 0.75;
    }
    .ref-reward-card__desc {
      font-family: "Noto Sans JP", sans-serif;
      font-size: 13px;
      line-height: 1.85;
      color: #1A1A1A;
      opacity: 0.78;
      margin: 0;
    }
    .ref-reward-divider {
      font-family: "Inter", sans-serif;
      font-size: 28px;
      font-weight: 700;
      color: #C9BFA8;
      flex-shrink: 0;
    }

    /* 下部CTA */
    .ref-cta-section {
      background: #F6F3EC;
      padding: clamp(56px, 8vw, 80px) 24px;
    }
    .ref-cta-inner {
      max-width: 640px;
      margin: 0 auto;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    .ref-cta__text {
      font-family: "Noto Serif JP", serif;
      font-size: clamp(15px, 2vw, 18px);
      line-height: 1.85;
      color: #1A1A1A;
      margin: 0;
    }

    @media (max-width: 640px) {
      .ref-reward-grid { flex-direction: column; }
      .ref-reward-divider { transform: rotate(90deg); }
      .ref-reward-card { width: 100%; }
    }
  </style>
</Base>
```

- [ ] **Step 2: ビルドして /referral が生成されることを確認する**

```bash
cd /Users/kaito/projects/clients/shiretoko-tourist-final-live && npx astro build 2>&1 | tail -15
```

期待値: `dist/referral/index.html` が生成される。エラーなし。

```bash
ls /Users/kaito/projects/clients/shiretoko-tourist-final-live/dist/referral/
```

期待値: `index.html` が存在する

- [ ] **Step 3: コミットする**

```bash
cd /Users/kaito/projects/clients/shiretoko-tourist-final-live && git add src/pages/referral.astro && git commit -m "feat: add /referral page with localStorage code generation"
```

---

## Task 3: account.astro の referral-section を CTA カードに置き換える

**Files:**
- Modify: `src/pages/account.astro` lines 232–246 (HTML), lines 993–1076 (CSS)

- [ ] **Step 1: referral-section の HTML を CTA カードに置き換える**

`src/pages/account.astro` の lines 232–246 を以下に置き換える:

```astro
    <section class="referral-section">
      <div class="referral-inner">
        <span class="section-eyebrow">REFERRAL ・ 友達紹介</span>
        <h2 class="section-title">友達を紹介すると、双方に {referral.rewardLabel}</h2>
        <p class="referral-lead">紹介リンクを発行してお友だちに送るだけ。紹介した方・された方の双方に <b>{referral.rewardLabel}</b> を進呈します。</p>
        <a href="/referral/" class="btn btn--primary">紹介ページへ &rarr;</a>
        <p class="referral-note">{referral.note}</p>
      </div>
    </section>
```

- [ ] **Step 2: account.astro の referral 用 CSS を最小化する**

`src/pages/account.astro` の lines 993–1076 (`.referral-section` から `@media (max-width: 560px) { .referral-link ... }` まで) を以下に置き換える:

```css
    /* 紹介割 (CTA カード) */
    .referral-section {
      background: #F6F3EC;
      padding: clamp(56px, 8vw, 96px) 24px;
    }
    .referral-inner {
      max-width: 640px;
      margin: 0 auto;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    .referral-lead {
      font-family: "Noto Sans JP", sans-serif;
      font-size: 15px;
      line-height: 1.95;
      color: #1A1A1A;
      opacity: 0.85;
      max-width: 520px;
      margin: 0;
    }
    .referral-lead b { color: #3C8186; }
    .referral-note {
      font-family: "Noto Sans JP", sans-serif;
      font-size: 0.82rem;
      line-height: 1.8;
      color: #6B5F4F;
      margin: 0;
    }
```

- [ ] **Step 3: ビルドして確認する**

```bash
cd /Users/kaito/projects/clients/shiretoko-tourist-final-live && npx astro build 2>&1 | tail -10
```

期待値: エラーなし

- [ ] **Step 4: コミットする**

```bash
cd /Users/kaito/projects/clients/shiretoko-tourist-final-live && git add src/pages/account.astro && git commit -m "feat: simplify account referral-section to CTA card pointing to /referral"
```

---

## Self-Review チェックリスト

### Spec coverage

| 要件 | Task |
|------|------|
| /referral 独立ページ新設 | Task 2 |
| localStorage で SHRT-XXXXXX コード生成・永続化 | Task 2 Step 1 (JS内 generateCode / getOrCreateCode) |
| コピーボタン (Clipboard API + fallback) | Task 2 Step 1 (JS内 copyToClipboard) |
| SNS シェアボタン (LINE / Twitter) | Task 2 Step 1 (JS内 lineBtn / twitterBtn) |
| 紹介した人・された人双方への割引説明 | Task 2 (ref-reward-section) |
| account.astro から /referral への導線 | Task 3 |
| フッタ導線 | Task 1 Step 2 |
| モバイルナビ導線 | Task 1 Step 1 |
| design-direction 配色準拠 | Task 2 Step 1 (CSS 全体) |
| 決済・手数料への言及なし | 確認済み (rewardLabel のみ使用) |
| AI スロップ語彙なし | 確認済み |

### Placeholder scan

プレースホルダーなし。全ステップに実コードあり。

### Type consistency

- `referral.rewardLabel` — promotions.ts で `string` として定義済み、Task 2・3 両方で同一プロパティ名使用
- `referral.referrerReward` / `referral.refereeReward` — promotions.ts で `number` として定義済み、Task 2 の reward-card で `.toLocaleString()` 使用
- `referral.steps` — promotions.ts で `string[]` として定義済み、Task 2 で `.map()` 使用
- `referral.note` — promotions.ts で `string` として定義済み、Task 2・3 両方で使用

全て一致。
