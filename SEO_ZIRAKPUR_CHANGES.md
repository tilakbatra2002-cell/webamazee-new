# SEO Zirakpur Page — Changes Report

**Date:** 2026-10-04
**Repository:** `tilakbatra2002-cell/webamazee-new`
**Branch:** `master` (base commit `59a205a`)
**Git state:** NOT committed, NOT pushed

---

## 1. Page

| | |
|---|---|
| **Original requested URL** | `https://www.webamazee.com/services/seo-services-in-zirakpur` |
| **Actual canonical URL** | `https://www.webamazee.com/seo-services-zirakpur` |
| **What happened with the requested URL** | It did not exist. It returned **404** on the live site and appeared nowhere in the repository. The real indexed Zirakpur SEO page was `/seo-services-zirakpur`. That existing URL was rebuilt and a **301 redirect** was added from the requested alias, so it now resolves instead of 404ing. No URL was changed and no duplicate Zirakpur page was created. |

---

## 2. Before

| Item | Value |
|---|---|
| **Old title** | `SEO Services in Zirakpur \| Webamazee` |
| **Old meta description** | `Grow your online visibility with strategic SEO services in Zirakpur - technical SEO, local SEO and content optimization to win nearby searches.` |
| **Old H1** | `SEO Services in Zirakpur` |
| **Old content / word count** | ~**751** words of main content |
| **Important existing SEO elements** | Self-referencing canonical; `robots: index, follow`; present in `sitemap.xml` (110 URLs); breadcrumbs (Zirakpur hub → SEO); JSON-LD: Organization + Service + BreadcrumbList + FAQPage; inbound links from `/services-in-zirakpur`, `/digital-marketing-company-zirakpur`, `/ai-marketing-company-zirakpur`; 10 auto-generated FAQs |

---

## 3. After

| Item | Value |
|---|---|
| **New title** | `SEO Company in Zirakpur \| Webamazee` (34 characters) |
| **New meta description** | `Looking for an SEO company in Zirakpur? Webamazee helps local businesses earn qualified traffic with local SEO, technical SEO and content. Free SEO audit.` (149 characters) |
| **New H1** | `SEO Company in Zirakpur` |
| **New word count** | ~**3,413** words of main content |

### Main H2 sections (in rendered order)

1. SEO services in Zirakpur, explained
2. What SEO in Zirakpur actually involves
3. Why SEO matters for businesses in Zirakpur
4. What's included with SEO in Zirakpur
5. What makes Webamazee different
6. Our SEO process
7. Local SEO for Zirakpur
8. Technical SEO for Zirakpur businesses
9. SEO and AI search
10. Why choose Webamazee for SEO in Zirakpur?
11. Explore related services
12. Planning for your local audience
13. What results can SEO help with?
14. SEO strategies for different Zirakpur businesses
15. What SEO costs in Zirakpur
16. Relevant Webamazee case studies
17. Helpful resources from our blog
18. Questions about SEO in Zirakpur
19. Ready to Grow Your Business Online? (closing CTA)

### Main content improvements

- H1, title and primary keyword changed from "SEO Services in Zirakpur" to **"SEO Company in Zirakpur"**.
- Hero rewritten with two explicit CTAs: **Get a Free SEO Audit** and **Talk to an SEO Specialist**.
- New long-form sections the old page did not have: dedicated **Local SEO for Zirakpur**, **Technical SEO for Zirakpur businesses**, **SEO and AI search**, **Why choose Webamazee for SEO in Zirakpur?**, and **What SEO costs in Zirakpur**.
- SEO process expanded from 5 generic steps to a **6-step process** specific to SEO work.
- **12 industries** with Zirakpur-specific search-intent explanations.
- **13 hand-written FAQs** replacing 10 auto-generated ones (covers what an SEO company does, cost, timeline, guarantees, GBP, technical SEO, industries, monthly retainers, audits, and how to choose an agency).
- Local context added for **VIP Road, Dhakoli, Baltana, Patiala Road, Airport Road, Chandigarh–Ambala Highway** and the **Chandigarh / Mohali / Panchkula** Tricity market.
- Explicit no-guarantee statements added (no promised rankings, no promised Google Maps positions, no promised AI Overview inclusion).
- No invented statistics, client counts, awards, rankings or percentages.

---

## 4. Technical SEO

| Item | Status |
|---|---|
| **Canonical** | `https://www.webamazee.com/seo-services-zirakpur` — self-referencing, verified in rendered HTML |
| **Robots / indexability** | `<meta name="robots" content="index, follow">`. No `noindex` anywhere on the page. `robots.txt` allows `/` and only disallows `/api/` |
| **Sitemap** | Present in `sitemap.xml` (110 URLs total), `changefreq: monthly`, `priority: 0.8` |
| **Redirect** | `/services/seo-services-in-zirakpur` → **308 permanent** → `/seo-services-zirakpur` |
| **Schema types** | 5 JSON-LD blocks: **Organization** (+ ProfessionalService / LocalBusiness / WebSite, site-wide), **WebPage** (new), **Service**, **BreadcrumbList**, **FAQPage**. Invalid `keywords` and `hasRelatedService` properties removed from `Service`; related services now use the valid `isRelatedTo`. No AggregateRating, no reviews, no fabricated address or pricing |
| **Open Graph / Twitter** | `og:title`, `og:description`, `og:url`, `og:type=website`, `og:site_name`, `og:image` (1200×630) with alt, `twitter:card=summary_large_image` with title, description and image — all present and correct |

---

## 5. Internal Linking

**Important links added on the page**

- `/services/seo-services`, `/services/local-seo`, `/services/technical-seo`, `/services/ai-seo`, `/services/ai-content-optimization`, `/services/google-ranking-growth`, `/services/competitor-analysis`, `/services/link-building`, `/services/website-development`
- `/free-seo-audit`
- `/seo-for-local-business`, `/seo-for-healthcare`, `/seo-for-tourism`, `/seo-for-professional-services`, `/seo-for-ecommerce`, `/seo-for-saas`
- `/work/shine-gold-tours-india`, `/work/wellington-tours`, `/work/kabir-oil-mill`
- 5 blog posts (local SEO checklist, Core Web Vitals, AI SEO, e-commerce SEO, redesign guide)
- `/seo-services-chandigarh`, `/seo-services-mohali`, `/seo-services-panchkula`, `/web-designing-company-zirakpur`, `/services-in-zirakpur`

**Important pages now linking back to this page (new)**

- `/services/seo-services`, `/services/local-seo`, `/services/technical-seo`, `/services/ai-seo`, `/services/google-ranking-growth`, `/services/competitor-analysis`, `/services/ai-content-optimization`, `/services/link-building`
- `/web-designing-company-zirakpur`

**Already linking (unchanged)**

- `/services-in-zirakpur`, `/digital-marketing-company-zirakpur`, `/ai-marketing-company-zirakpur`

---

## 6. Files Changed

| File | What changed |
|---|---|
| `src/lib/locations.ts` | Added the full hand-written Zirakpur SEO page content; added new optional `deepDives`, `sectionTitles` and `outcomesNote` fields to the location page data model; added a curated-SEO-page branch to the location pipeline |
| `src/components/locations/location-page.tsx` | Section H2s now support per-page overrides; new renderer for the long-form deep-dive blocks; support for a custom outcomes disclaimer |
| `src/lib/location-seo.ts` | Rewrote the JSON-LD generator: added a `WebPage` node, added `@id` cross-links, made `FAQPage` conditional, removed non-standard `keywords` / `hasRelatedService` from `Service` |
| `src/lib/location-meta.ts` | Updated the approved meta description and keyword set for `seo-services-zirakpur` (this map is applied last, so it had to be updated too) |
| `src/components/services/service-page.tsx` | Added a contextual "location-specific SEO support" link block so 8 SEO service pages link back to the Zirakpur page |
| `next.config.ts` | Added the 301 redirect from `/services/seo-services-in-zirakpur` to `/seo-services-zirakpur` |
| `src/app/web-designing-company-zirakpur/page.tsx` | Added one contextual link to `/seo-services-zirakpur` |
| `public/llms.txt` | Added one entry for the Zirakpur SEO page |

**Total: 8 files modified, +704 / −43 lines. No new components or route files were created.**

---

## 7. Validation

Run against a **production build** (`next build` + `next start`), not the dev server.

| Check | Result |
|---|---|
| **TypeScript** | `npx tsc --noEmit` — clean, no errors |
| **Production build** | Compiled successfully; 115/115 static pages generated; no build or lint errors |
| **Broken links** | All 64 internal links on the page fetched against the production build — **0 broken** |
| **Schema** | 5 JSON-LD blocks — **all parse as valid JSON**; all types logically appropriate; other location pages spot-checked and unaffected |
| **H1** | **Exactly one** `<h1>` on the page |
| **Mobile / layout** | Headless Chrome at 1440×1000 and 390×844: no horizontal overflow, no layout-breaking CSS, no scroll-reveal elements stuck hidden |

---

## 8. Risks / Things to Review

1. **Unsupported proof claims — needs your approval.** The shared proof band renders on this page and shows **"40+ Clients served"** and **"50+ Websites delivered"** (plus "Global Clients worldwide" and "100% Client-focused delivery"). These are static strings in `src/lib/proof-points.ts` and are **not supported by repository or site evidence** — the repo contains **3 case studies**, **3 portfolio projects** and **5 Google reviews**. I did not add them and did not change them. Options: (a) replace with evidence-based wording derived from real repository data, (b) hide the band on this page, or (c) leave as-is if you can substantiate the numbers.
2. **Deeper QA pass not finished.** The strict content-quality, search-intent and trust audit that followed this implementation was started but was cut short. The items below are carried over from the first pass and have **not** yet been fully reviewed line by line.
3. **Possible content overlap / length.** At ~3,413 words the page is long. Sections 2, 4, 7, 8 and 12 may overlap each other and could be tightened without losing coverage.
4. **No content images.** The shared location-page template has no image slots, so the page has no content images and therefore no alt text to optimise. Adding one would require a template/design change.
5. **H1 uses non-breaking spaces** (`SEO\u00A0Company\u00A0in\u00A0Zirakpur`) because of the site-wide word-animation component. Cosmetic; Google treats it as whitespace.
6. **Keyword cannibalisation watch-list:** `/seo-services-zirakpur`, `/services-in-zirakpur`, `/digital-marketing-company-zirakpur`. Intents are currently distinct but worth monitoring in Search Console.
7. **Site-wide, pre-existing:** `sitemap.xml` sets `lastModified: new Date()` for every URL, so each deploy marks the whole site as updated. Not changed here.
8. **`serviceType` in the Service schema equals the H1 text** ("SEO Company in Zirakpur"). Valid but slightly awkward; left as-is for consistency with the other 100+ location pages.

---

## 9. Git Status

- **Changes are NOT committed.**
- **Changes are NOT pushed.**
- **Current branch:** `master`
- **Modified files:** 8 (listed in section 6)
- **Untracked files:** 1 — this report file, `SEO_ZIRAKPUR_CHANGES.md`
- **Base commit:** `59a205a` ("Optimize New Zealand web design landing page")
- No Git history has been modified. No commits, merges, branches or pushes were made.
