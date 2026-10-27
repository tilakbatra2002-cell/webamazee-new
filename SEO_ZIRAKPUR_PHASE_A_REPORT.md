# SEO Company in Zirakpur — Phase A Implementation Report

**Date:** 2026-10-27
**Page:** https://www.webamazee.com/seo-services-zirakpur (existing URL improved — no new/duplicate page created)
**Primary keyword:** SEO Company in Zirakpur
**Repository:** `tilakbatra2002-cell/webamazee-new` · branch `master`
**Base commit:** `22e4ef9`
**Stack verified in repo:** Next.js 16.3 (App Router, Turbopack), React 19, TypeScript, Tailwind. Deployed on Vercel; the route is **statically prerendered**.
**Status:** Implemented and verified locally against a production build. **Nothing committed, pushed or deployed.** Working tree was clean at start; pre-existing work is untouched.

> Honesty note: no ranking, traffic, backlink or indexing outcome is claimed or guaranteed. Everything below marked **verified** was checked against the live site, the repo, or a local production build. Items needing your accounts or approval are listed in §8.

---

## 1. How the page actually works (inspection result)

- Route file `src/app/seo-services-zirakpur/page.tsx` is a thin wrapper. Content/data live in `src/lib/locations.ts` (`prioritySeoDetails["seo-services-zirakpur"]`), rendered by the shared `LocationPageView` in `src/components/locations/location-page.tsx`. Metadata is generated via `src/lib/location-seo.ts` → `src/lib/metadata.ts`; approved meta overrides are applied last from `src/lib/location-meta.ts`.
- A previous rebuild (commit `e21d177`, documented in `SEO_ZIRAKPUR_CHANGES.md`) had already produced a long, well-structured page. This session therefore **targets the remaining, evidence-backed gaps** rather than rewriting working content or changing the design.

---

## 2. Competitor gap analysis — robtechworld.com/seo-company-in-zirakpur/

**Verified facts (from live HTML/HTTP and public search results), not assumptions.**

| Dimension | Competitor (Rob Tech World) | Webamazee before | Assessment / action |
|---|---|---|---|
| Platform | WordPress + Yoast, Hostinger (`hcdn`) | Next.js static prerender | Ours is faster/modern by architecture; no action needed. |
| Title / H1 | 48-char title with AEO/GEO angle; exact-match H1 | Exact-match H1, tighter 35-char title | Both match intent. Ours retained (already optimal). |
| Content depth | ~2,350 rendered words, 11 H2 / 37 H3 | ~3,566 words, 19 H2 / 55 H3 | We already cover more topics. Extended to ~4,221 with new unique sections. |
| **Structured data** | `Product` + **`AggregateRating` 5.0 / 1,200 ratings**, but **no reviews are visible on the page** and their homepage text says **132 reviews** | Valid Organization/Service/WebPage/Breadcrumb/FAQ, **no fabricated rating** | Their rating is a self-serving snippet that conflicts with their own on-page evidence — a Google review-snippet guideline risk. **Do not copy.** We keep honest schema. |
| **Local presence** | Real Zirakpur street address in schema; **two different addresses appear across their pages** (Global Business Park vs Sushma Infinium) — possible NAP inconsistency | Mohali HQ; honestly does **not** claim a Zirakpur office | Physical address is a genuine local-pack advantage we cannot invent on-page. Off-page GBP/citation work needed (§8). We can win on NAP *consistency*. |
| Trust proof | GSC/GA screenshots, "Google Partner", 7+ yrs / 20+ staff / 400+ projects (their claims), published pricing | Unsubstantiated "40+ clients / 50+ websites" band; no on-page reviews; no content imagery | **Fixed:** removed the unsupported band on this page, added a real portfolio project and the 4 genuine Google reviews with source links. |
| Imagery | 13 images incl. a page-specific OG graphic and proof screenshots | Only 2 logo images; generic site OG image | **Fixed:** added a real project image + a dedicated 1200×630 branded OG image. |
| Pricing | Public 3-tier table (₹15k/₹25k/₹40k) | Honest "cost depends on scope" section | We deliberately don't invent prices. Optional: supply real pricing if approved (§8). |
| Internal linking | 136 internal / 12 external | 116 internal / 4 external | Already strong; added 1 more relevant sibling link and review/testimonial links. |

**Bottom line:** the competitor's edge is mostly *off-page/local* (physical office, larger agency footprint, more reviews) and *visual proof*, not keyword count. They also carry a real structured-data risk and a possible NAP conflict. Our on-page response is to be more useful, more honest and better evidenced — done below — while treating local authority as the remaining off-page workstream.

---

## 3. What was implemented (all original content; nothing copied)

### 3.1 Evidence & trust (highest-impact, closes the real gap)
1. **Removed the unsupported statistics band on this page only** (`hideStats: true`). The "40+ Clients served / 50+ Websites delivered" strings are not evidenced in the repo (it contains 3 case studies, 15 portfolio items, 5 text Google reviews). They remain on other pages — see §8.
2. **Added a genuine featured-project block** for **Shine Gold Tours India**, fully sourced from the existing portfolio record: real screenshot (`/images/portfolio/shine-gold-tours-india-live-homepage.webp`), descriptive alt, real tech stack, working case-study link and **live-site link**. No invented metrics.
3. **Added the real Google review section** (4 verbatim Google Business Profile reviews, 5-star, reviewer names preserved) with two honest outbound/contextual links: the Google review source and `/testimonials`. Uses the existing `testimonials` data — nothing fabricated, and no `AggregateRating` schema.

### 3.2 Original value-add content (things the competitor does not have)
4. **"Your SEO deliverables, made explicit"** — a concrete 4-group / 16-item deliverables checklist (research & foundation; on-page/technical; content & local; authority & reporting), so buyers can compare agencies on actual scope.
5. **"How local SEO is measured"** group inside the Local SEO section — GBP insights, local-pack positions, Search Console impressions/clicks, and enquiry attribution. Directly answers how success is tracked without promising positions.
6. Wove the target secondary terms into **existing, natural sentences** (no new keyword-heavy sections, no stuffing):
   - "SEO agency in Zirakpur", "best SEO company in Zirakpur" (in the honest FAQ answer), "local SEO services in Zirakpur", "technical SEO services in Zirakpur", "affordable SEO services in Zirakpur" (pricing note), "digital marketing company in Zirakpur" (cluster link).

### 3.3 Technical / on-page
7. **Page-specific Open Graph/Twitter image** (`public/images/og/seo-company-zirakpur-og.jpg`, exact **1200×630**, 63 KB, on-brand blue gradient, exact keyword headline). Added an optional `ogImage` field to the model with a safe fallback — **all other location pages keep the existing default**. The Service and WebPage schema `image`/`primaryImageOfPage` now use the page image.
8. Added the relevant sibling **`/digital-marketing-company-zirakpur`** cluster link (distinct intent; reciprocal relevance).
9. Title, meta description, single H1, canonical, robots, breadcrumbs, the 308 alias redirect, sitemap entry and analytics/contact integrations were verified and **left intact**.

---

## 4. Before / after (measured on the rendered page)

| Element | Before (live, captured 2026-10-27) | After (local production build) |
|---|---|---|
| Title | `SEO Company in Zirakpur \| Webamazee` (35) | **Unchanged** (already optimal) |
| Meta description | 154 chars, keyword + CTA | **Unchanged** |
| H1 | Exactly 1 — `SEO Company in Zirakpur` | Exactly 1 — same |
| H2 / H3 | 19 / 55 | **22 / 60** |
| Content images (non-logo) | 0 | **1 real project image** (with alt) |
| OG / Twitter image | generic `og-image.png` | **dedicated 1200×630 page image** |
| On-page reviews | none | **4 genuine Google reviews + source link** |
| Unsupported stats band | present ("40+/50+") | **removed on this page**, replaced by real proof |
| Internal links (unique) | 116 (60 unique) | **121 (61 unique)** |
| JSON-LD blocks | 5, all valid | 5, all valid (no fake ratings) |
| Rendered text (incl. chrome) | ~3,566 words | ~4,221 words |
| Exact secondary terms in body text | mostly absent | each target term present naturally (§3.2) |
| Canonical / robots | self-canonical · `index, follow` | unchanged · re-verified |

---

## 5. Technical issues found and how they were handled

**Fixed as part of this work**
- Unsupported trust claims on the target page → replaced with verifiable proof (§3.1).
- No page-specific social image and no content imagery → added (§3.3, §3.1).
- Under-covered secondary keywords and missing "how it's measured / what you get" buyer content → added.

**Verified healthy (no change needed):** HTTP 200 (Vercel `PRERENDER`), self-referencing canonical, `index,follow`, no noindex, present in `sitemap.xml` (113 URLs), `/services/seo-services-in-zirakpur` → **308** → target, robots.txt allows crawling and only blocks `/api/`, full content is server-rendered in static HTML.

**Pre-existing, site-wide, NOT changed (flagged for your decision — §8):**
- `npm run lint` is broken under Next 16 (`next lint` removed; no ESLint config/dependency). TypeScript + production build are the effective gates and both pass.
- `sitemap.ts` stamps `lastModified: new Date()` on every URL each deploy.
- The default `public/og-image.png` is actually **1424×752** while metadata declares 1200×630 site-wide (the new page image is correctly 1200×630).
- The site-wide Accordion renders FAQ answers on click; the same Q&A is fully present in FAQPage JSON-LD, so search engines receive it, but answers are not in the initial visible DOM.
- The "40+/50+" proof strings still appear on other pages via the shared `AgencyEvidence` band.

---

## 6. Files changed (focused scope — 3 source files + 1 new asset)

| File | Change |
|---|---|
| `src/lib/locations.ts` | New optional `showReviews` / `ogImage` model fields; Zirakpur entry: `hideStats`, `showReviews`, `ogImage`, fully-sourced `featuredProject`, natural secondary-keyword copy, deliverables checklist, local-SEO measurement group, FAQ/pricing wording, extra cluster link. |
| `src/lib/location-seo.ts` | Honor per-page `ogImage` (with fallback) in metadata and in Service/WebPage schema image fields. |
| `src/components/locations/location-page.tsx` | Opt-in genuine Google-reviews section (renders only when `showReviews`); imports the existing review data. No other location page changes behaviour. |
| `public/images/og/seo-company-zirakpur-og.jpg` | **New** branded 1200×630 OG/Twitter image (63 KB). |

`package-lock.json` was briefly normalized by `npm install` and **reverted**, so it is not part of the diff. No route, config, analytics, form, WhatsApp/phone or schema contract was removed.

---

## 7. Tests and verification (all run against a production build)

- `npx tsc --noEmit` → **clean (0 errors)**.
- `npm run build` → **success**, TypeScript passed, **118/118 pages generated**, target route statically prerendered, no warnings.
- `next start` → target page **HTTP 200**.
- **All 61 unique internal links on the page return HTTP 200**; alias returns **308** to the target.
- JSON-LD: 5 blocks parse; 10 Service nodes, BreadcrumbList, WebPage, and FAQPage with **exactly 13 questions**; **no AggregateRating**.
- Exactly one H1; every image has alt; custom OG served as `image/jpeg` (200), project image as `image/webp` (200).
- Regression-checked `/seo-services-mohali`, `/seo-services-chandigarh`, `/web-designing-company-zirakpur`, `/services-in-zirakpur`: all 200, reviews section correctly absent, default OG retained, shared stats band retained elsewhere.
- Playwright (Chromium) at 1440px and **390×844 mobile**: no horizontal overflow on either; hero, featured project, deliverables and review sections render and stack correctly; CTAs present.
- Preserved integrations re-confirmed in output: `tel:+918360532487`, Calendly booking, `/contact`, `/free-seo-audit`, SEO-audit widget. (WhatsApp was never on this template page — it exists on the bespoke web-design page — so nothing was lost.)

---

## 8. Remaining risks & actions needing your access/approval

**A. Google Search Console (no authorised access was available — nothing was submitted).** Please run:
1. URL Inspection → `https://www.webamazee.com/seo-services-zirakpur` → confirm "URL is on Google" / Request Indexing after deploy.
2. Performance report: filter to this page; record clicks, impressions, average position and the actual queries (this validates the keyword set with real data).
3. Pages section: check it is indexed under the canonical URL; review any "Crawled – not indexed"/duplicate flags.
4. Sitemaps: confirm `sitemap.xml` reads successfully with no errors.
5. Manual actions/security flags: confirm none.

**B. Local SEO / authority (the real remaining gap vs the competitor — off-page, cannot be done in code honestly):**
- Verify/optimise the **Google Business Profile** (correct category, service area across Zirakpur/Tricity, hours, attributes, photos) and build a steady flow of **real** Zirakpur customer reviews — never bought or fabricated.
- Build/clean **citations** on relevant India directories (Google, Justdial, IndiaMART, Facebook, LinkedIn, local business listings) with perfectly consistent NAP. Note the competitor appears inconsistent here — consistency is a winnable point.
- Earn editorial links via the existing blog/case studies (local business press, Tricity directories, partner mentions). No automated directory spam, doorway pages or hidden text.
- Decide the future of the site-wide **"40+/50+" proof band**: substantiate the numbers, replace them with repo-evidenced figures, or hide them as done on this page.

**C. Optional content decisions (need business input, not invented):**
- If you want to match pricing-intent searches, provide **real** package/price ranges to add honestly.
- If you have them, supply **GSC/GA annotated screenshots or named client outcomes** (with permission) — the competitor uses this kind of proof; only publish what is true and permitted.
- Consider site-wide fixes separately: correct the default OG image dimensions, give sitemap entries real `lastModified` values, and optionally render FAQ answers in the initial DOM.

**D. Deployment:** awaiting your approval to commit, push to `master` (or a branch/PR if you prefer), and let the existing Vercel workflow deploy. After deploy I would re-run the live checks (HTTP, canonical, robots, OG image, schema and the 308) and report the results. No push/deploy/indexing request has been performed.

---

## 9. Verified vs assumed

- **Verified:** all code/build/link/schema/metadata/visual results above; live HTTP headers, robots, sitemap and redirect; competitor on-page elements and their conflicting rating/address evidence; the genuine origin of every review and project used.
- **Assumed / not measurable here:** actual ranking impact, traffic, and backlink counts (require GSC and a backlink index such as Ahrefs/Semrush/Ubersuggest). No such numbers are claimed. Competitor agency-size figures (7+ years, 20+ staff, 400+ projects) are **their published claims**, not independently confirmed.
