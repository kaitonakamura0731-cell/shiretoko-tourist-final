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

## Current Verification State

- `npm run build` passed after the first responsive patch set on 2026-06-11.
- Build must be run again after the latest public-guard/sitemap/comparison edits.
- Browser layout verification is still needed across:
  - `/`
  - `/products/specialty/`
  - `/products/apparel/`
  - `/ranking/`
  - `/bundles/`
  - `/gift/`
  - `/stories/`
  - `/account/`
  - `/dashboard/`

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
