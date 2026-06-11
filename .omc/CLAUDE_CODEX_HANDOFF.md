# Claude / Codex Handoff - Shiretoko Tourist Final Site

Last updated: 2026-06-11

## Project

- Repo: `/Users/kaito/projects/clients/shiretoko-tourist/site/final`
- Live URL: `https://shiretoko-tourist-final.vercel.app/`
- Public GitHub: `https://github.com/kaitonakamura0731-cell/shiretoko-tourist-final.git`
- Case repo: `/Users/kaito/projects/clients/shiretoko-tourist`

## Current Direction

- TOP is intentionally simple.
- TOP should contain brand-wide content only: hero, trust, one combined two-shelf entrance, news, owner/story, light retention.
- Product-heavy content, service details, bundles, ranking, gift, promotions, and admin views belong below TOP.
- Entrance direction is fixed:
  - one combined entrance
  - split into specialty products and apparel
  - specialty = warm and local
  - apparel = cool, refined, Snow Peak-like
- Apparel side should feel more premium and restrained than the specialty side.

## Public Guard

- Do not expose internal cost, profit, or margin language in public code or copy.
- Card fee can only appear as `2.5%` if needed.
- Avoid proposal-style wording on customer-facing pages.
- `/dashboard/` is a demo/admin route. Keep it unlinked from public sitemap and public TOP footer.
- `/comparison/` should read as a customer-facing purchase guide, not a proposal/commercial analysis page.

## Work Completed In This Pass

- Simplified `src/pages/index.astro` to remove product-heavy TOP sections.
- Removed TOP quick tiles, TOP rankings, TOP bundle section, product cards, tour promo block, and old free-shipping counter script.
- Rebuilt TOP around:
  - hero
  - trust band
  - two-shelf entrance
  - news
  - owner story
  - email/LINE retention
- Fixed severe mobile collapse risk:
  - responsive one-column guards
  - grid auto-fit rules
  - targeted local page CSS fixes for promotions, comparison, account, dashboard, bundles, gift, and ranking
- Made specialty entrance warmer by using the camel top border.
- Rewrote vague apparel news copy to concrete Patagonia/R1 wording.
- Removed `/comparison/` from TOP footer.
- Removed proposal/admin section from sitemap.
- Rewrote comparison data/page language toward customer purchase guidance.
- Rephrased furusato copy from procurement-like wording to customer-safe wording.
- Added real support/legal/contact pages:
  - `src/pages/shipping.astro`
  - `src/pages/legal.astro`
  - `src/pages/privacy.astro`
  - `src/pages/contact.astro`
- Fixed TOP/SHOP custom footer links so shipping/legal/privacy/contact no longer point to `/account/`.
- Unified site metadata away from `example.com`.
- Reworked cart checkout copy to "注文内容を相談する" and LINE consultation.
- Removed live referral coupon application from `public/cart.js`; referral remains an optional/noindex proposal page.
- Reworked subscription, points, referral, LINE notification, and dashboard automation copy so unproposed automations are clearly optional or consultation-based.
- Added daily operations coverage to `/dashboard/`: order checks, shipping, inquiries, inventory, and settings.
- Added `SHOP` to main navigation on affected pages.

## Reviewer Findings Already Integrated

- Design reviewer:
  - TOP was too commerce-heavy.
  - TOP should be simpler and Snow Peak-like.
  - Apparel needed cooler/refined tone.
  - Old TOP footer/proposal links were noisy.
- Responsive reviewer:
  - Original TOP collapse did not reproduce after TOP simplification.
  - `/ranking/` had real mobile overflow at 360-430px.
  - Ranking row layout needed structural mobile constraints.
- Commerce/public-guard reviewer:
  - `/dashboard/` should not be public-linked.
  - `/comparison/` needed customer-safe language.
  - Specialty shelf needed warmer treatment.
- Second-pass customer/admin reviewers:
  - TOP/SHOP footer support links were wrong.
  - `example.com` metadata was not production-ready.
  - Referral looked like an active reward program.
  - Points/subscription/LINE copy overpromised non-implemented flows.
  - Admin screen needed daily operation areas, not only analytics.
  - All above P1/P2 findings were integrated or reframed as optional/consultation flows.

## Current Verification State

- `npm run build` passed on 2026-06-11 after the latest review-loop edits.
- Source image sync ran during build: 405 images synced.
- Static build output: 290 pages.
- Public guard grep passed with no matches for the configured banned terms.
- Browser/CDP responsive verification passed:
  - 20 pages
  - widths: 360, 390, 430, 768, 1024, 1280, 1920
  - total cases: 140
  - failures: 0
- Checked pages:
  - `/`
  - `/shop/`
  - `/products/specialty/`
  - `/products/apparel/`
  - `/ranking/`
  - `/bundles/`
  - `/gift/`
  - `/stories/`
  - `/account/`
  - `/cart/`
  - `/promotions/`
  - `/comparison/`
  - `/furusato/`
  - `/referral/`
  - `/dashboard/`
  - `/shipping/`
  - `/legal/`
  - `/privacy/`
  - `/contact/`
  - `/sitemap/`
- Representative screenshots are in `.omc/screenshots/`.
- Temporary local preview used: `http://127.0.0.1:4327/`.

## Scheduled Review

- A launchd job is registered for 2026-06-12 10:07 JST.
- Prompt: `.omc/scheduled/2026-06-12-full-review-prompt.md`
- Script: `.omc/scheduled/run-full-review-20260612.sh`
- Plist: `~/Library/LaunchAgents/com.kaito.codex.shiretoko-review.20260612.plist`
- The script unloads itself after execution via `launchctl bootout`.
- `.omc/scheduled/` is local/ignored and is not pushed to GitHub.

## Next Review Scope

Run a full customer/admin review around 2026-06-12 10:00 JST.

Review questions:

- Is the customer-facing site easy to understand?
- Is it easy to move from TOP into specialty or apparel?
- Is it easy to buy?
- Does it make the user want to buy?
- Is the admin dashboard intuitive?
- Are there any basic admin features missing?
- Are all already-proposed core features represented?
- Are unproposed ideas clearly marked as optional instead of implemented as if promised?
- Is the site consistent with the live production context and public guard?

Important:

- Do not add unproposed automations such as a button that actually sends email.
- If an idea is useful but not promised, present it as an option: "これはオプションです".
- Loop with multiple reviewers until findings are resolved or explicitly backlogged.

## Suggested Commands

```bash
cd /Users/kaito/projects/clients/shiretoko-tourist/site/final
git status --short
npm run build
```

If using a browser automation pass, check root horizontal overflow:

```js
document.documentElement.scrollWidth <= window.innerWidth + 1
```

Key viewport widths:

- 360
- 390
- 430
- 768
- 1024
- 1280
- 1920
