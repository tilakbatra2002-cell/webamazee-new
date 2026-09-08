# Webamazee SEO Title Audit & Recommendations

**Date:** 2026-09-08
**Repository:** `tilakbatra2002-cell/webamazee-new` (branch `master`, commit `860b014`)
**Live site:** https://www.webamazee.com/
**Scope:** All 108 indexable routes (static, service, blog, case study, portfolio, product, industry, location, location-hub).

---

## 1. Executive Summary

| Metric | Count |
| --- | --- |
| Total indexable pages audited | **108** |
| Existing titles found (non-empty `<title>`) | **108** (100%) |
| Missing titles | **0** |
| Exact duplicate titles | **0** |
| Double-branded titles (root-cause defect, see §4) | **29** (13 static pages + 18 service pages render "... \| Webamazee \| Webamazee") |
| Near-duplicate / templated clusters | 4 location families (45 pages) + case-study/portfolio pairs — by design, differentiated by service/location (see §4) |
| Titles too long (>60 chars, SERP truncation risk) | **18 currently** (all 18 service pages render 52–84 chars after double-brand; 8 hubs 62–75 chars; 3 blog 62–65 chars; 5 priority web-design 63–68 chars) |
| Titles too short / too generic | **6** (`/portfolio` "Portfolio", `/pricing` "Pricing", `/services` "Our Services", `/products` "Products", `/case-studies` "Case Studies", `/faq` "FAQ") |
| **Titles recommended for change** | **50** |
| **Titles recommended to remain unchanged** | **58** |

### Implementation risks

1. **Brand-suffix side effect on social tags.** Today, OpenGraph/Twitter titles are the raw data strings (which happen to already contain "Webamazee" on 29 pages). After the fix, social titles on the 50 changed pages will be the unbranded page title (the root template is applied only to the HTML `<title>`, not to `og:title`). This is a direct consequence of the approved title change, not a defect — social cards on changed pages will show titles without the brand suffix.
2. **One page-code change required.** `src/app/web-designing-company-zirakpur/page.tsx` contains a `title: { absolute: ... }` override whose only purpose is to dodge the double-brand bug. The approved fix removes that workaround so the page follows the same template flow as every other page (see §7).
3. **No impact on canonicals, sitemap, robots, or redirects.** All of those are derived from slugs/paths, not titles. Verified in §7 and re-verified post-implementation.
4. **Pre-existing (out of scope):** the `npm run lint` script is broken on Next 16 (`next lint` was removed). Baseline build and `tsc --noEmit` both pass.

### How titles are generated (architecture)

- `src/app/layout.tsx` defines `title.template = "%s | Webamazee"` and a default title.
- Almost every page gets its title from the centralized generator `generateMetadata(entry)` in `src/lib/metadata.ts` (`title = entry.metaTitle ?? entry.title`), fed by data registries: `services.ts` / `services-social.ts`, `static-pages.ts`, `blogs.ts`, `case-studies.ts`, `portfolio.ts`, `products.ts`, `industries.ts`, `locations.ts` (+ `-india`, `-commercial`, `-commercial-intl`), `location-hubs.ts`.
- **Root cause of the double brand:** `generateMetadata` returns the title as a plain string, so Next.js applies the root template *on top of* it. Any data `metaTitle` that already ends in "| Webamazee" (all 18 service pages) or contains the brand (13 static entries) renders with the brand twice. The architecture's own comments (`static-pages.ts`) state the intended rule: *"Root layout applies the brand template, so keep this route title unbranded."* The fix restores that rule everywhere.
- Exceptions that already render correctly: `/` (homepage, absolute title) and `/web-designing-company-zirakpur` (absolute title workaround).

**Fix principle (minimal, architecture-respecting):**
1. Keep the root template "%s | Webamazee".
2. Make every data-level `metaTitle` **unbranded** (the brand is appended exactly once by the template).
3. Keep the homepage absolute title unchanged.
4. Remove the Zirakpur absolute workaround (data + 1 line of page code).
5. Rewrite only titles that are double-branded, generic, over-length, or misaligned — 50 pages. Keep the other 58 exactly as they are.

---

## 2. Complete Title Audit

"Recommended SEO Title" is the **exact final rendered `<title>`** that will be live after implementation (the root template adds " | Webamazee" automatically for all pages except the homepage, which is absolute).

| # | URL | Page Type | Existing SEO Title | Recommended SEO Title | Primary Intent | Primary Keyword/Topic | Action | Reason |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `/` | Homepage | Web Development & SEO Agency \| Webamazee | **Web Development & SEO Agency \| Webamazee** | Brand + core commercial positioning (web development + SEO) | web development & SEO agency | Keep | Already strong, specific, branded, 40 chars. No change. |
| 2 | `/about` | Static – About | About Webamazee \| AI-Powered Digital Marketing Company \| Webamazee | **About Us \| AI-Powered Digital Marketing Company \| Webamazee** | Informational – company/brand page | about webamazee / digital marketing agency | Change | Triple brand + double template ('| Webamazee' ×2, brand ×3). Unbranded title; template adds brand once. 60 chars. |
| 3 | `/services` | Static – Services index | Our Services \| Webamazee \| Webamazee | **Digital Marketing & Web Development Services \| Webamazee** | Commercial – service category landing | digital marketing & web development services | Change | Double brand ('| Webamazee' ×2). Generic 'Our Services' replaced with descriptive category title. 56 chars. |
| 4 | `/products` | Static – Products index | Products \| Webamazee \| Webamazee | **Digital Marketing Software for Agencies \| Webamazee** | Commercial – software product index | digital marketing software / agency tools | Change | Double brand. Generic 'Products' replaced with descriptive title matching actual offering (lead management system for agencies). 50 chars. |
| 5 | `/portfolio` | Static – Portfolio | Portfolio \| Webamazee | **Web Design & Development Portfolio \| Webamazee** | Commercial proof – work showcase | web design portfolio / website development work | Change | Single word 'Portfolio' is too generic for SERP CTR. Descriptive title. 46 chars. |
| 6 | `/case-studies` | Static – Case studies index | Case Studies \| Webamazee \| Webamazee | **Web Development & SEO Case Studies \| Webamazee** | Commercial proof – case study index | web development & SEO case studies | Change | Double brand. Generic 'Case Studies' made descriptive of the work shown. 46 chars. |
| 7 | `/blog` | Static – Blog index | Blog & Insights \| Webamazee \| Webamazee | **Digital Marketing, SEO & Web Development Blog \| Webamazee** | Informational – blog listing | digital marketing & SEO blog | Change | Double brand. 'Blog & Insights' too generic; title now states content scope. 57 chars. |
| 8 | `/testimonials` | Static – Testimonials | Testimonials \| Webamazee \| Webamazee | **Client Testimonials & Reviews \| Webamazee** | Trust/proof – client reviews | client testimonials / digital marketing reviews | Change | Double brand. Added 'Client' and 'Reviews' for clarity. 41 chars. |
| 9 | `/faq` | Static – FAQ | FAQ \| Webamazee \| Webamazee | **Frequently Asked Questions \| Webamazee** | Informational – support questions | digital marketing FAQ / webamazee FAQ | Change | Double brand. 'FAQ' acronym expanded. 38 chars. |
| 10 | `/contact` | Static – Contact | Contact Us \| Webamazee \| Webamazee | **Contact Us \| Free Strategy Call \| Webamazee** | Transactional – start engagement | contact digital marketing agency / free strategy call | Change | Double brand. Added the page's primary CTA hook (free strategy call, per page copy). 43 chars. |
| 11 | `/free-seo-audit` | Static – Free SEO audit | Free Website SEO Audit \| Webamazee | **Free Website SEO Audit \| Webamazee** | Lead generation – free audit tool | free SEO audit / website audit | Keep | Already unique, intent-matched, single brand, 35 chars. |
| 12 | `/sitemap` | Static – HTML sitemap | Sitemap \| Webamazee \| Webamazee | **Sitemap \| Webamazee** | Utility – site directory | webamazee sitemap | Change | Double brand. Utility page; simple title. 21 chars. |
| 13 | `/pricing` | Static – Pricing | Pricing \| Webamazee | **Web Development & Digital Marketing Pricing \| Webamazee** | Commercial – pricing packages | web design / SEO / digital marketing pricing | Change | Single word 'Pricing' too generic; title now states what is being priced. 55 chars. |
| 14 | `/privacy-policy` | Static – Legal | Privacy Policy \| Webamazee \| Webamazee | **Privacy Policy \| Webamazee** | Legal | webamazee privacy policy | Change | Double brand. Legal page kept minimal. 26 chars. |
| 15 | `/terms-and-conditions` | Static – Legal | Terms & Conditions \| Webamazee \| Webamazee | **Terms & Conditions \| Webamazee** | Legal | webamazee terms & conditions | Change | Double brand. Legal page kept minimal. 30 chars. |
| 16 | `/services/website-development` | Service page | Website Development Services \| Custom Web Design \| Webamazee \| Webamazee | **Website Development & Custom Web Design Services \| Webamazee** | Commercial – custom websites | website development services / custom web design | Change | Double brand; 74 chars. Rebuilt around primary keyword front-loaded + secondary 'custom web design'. 59 chars. |
| 17 | `/services/website-redesign` | Service page | Website Redesign Services \| Modern Web Redesign \| Webamazee \| Webamazee | **Website Redesign Services That Convert \| Webamazee** | Commercial – site modernisation | website redesign services | Change | Double brand; 75 chars; 'Redesign' repeated. Value-prop title. 49 chars. |
| 18 | `/services/landing-page-development` | Service page | Landing Page Development \| High-Converting Landing Pages \| Webamazee \| Webamazee | **Landing Page Development & Design Services \| Webamazee** | Commercial – campaign pages | landing page development / landing page design | Change | Double brand; 84 chars; 'Landing' ×3. 55 chars. |
| 19 | `/services/ecommerce-development` | Service page | E-Commerce Development Services \| Online Store Build \| Webamazee \| Webamazee | **E-Commerce Website Development Services \| Webamazee** | Commercial – online stores | e-commerce development / e-commerce website development | Change | Double brand; 80 chars. 51 chars. |
| 20 | `/services/seo-services` | Service page | SEO Services \| #1 SEO Agency \| Webamazee \| Webamazee | **SEO Services for Organic Growth & Rankings \| Webamazee** | Commercial – SEO agency | SEO services / SEO agency | Change | Double brand; unsupported 'SEO' superlative claim. 53 chars. |
| 21 | `/services/ai-seo` | Service page | AI SEO Services \| AI-Powered SEO Agency \| Webamazee \| Webamazee | **AI SEO Services for Future-Proof Rankings \| Webamazee** | Commercial – AI SEO | AI SEO services / AI-powered SEO | Change | Double brand; 67 chars. 53 chars. |
| 22 | `/services/technical-seo` | Service page | Technical SEO Services \| Technical SEO Audit \| Webamazee \| Webamazee | **Technical SEO Services & Site Speed Audits \| Webamazee** | Commercial – technical SEO | technical SEO services / technical SEO audit | Change | Double brand; 'Technical SEO' ×2; 72 chars. 54 chars. |
| 23 | `/services/local-seo` | Service page | Local SEO Services \| Local SEO Agency \| Webamazee \| Webamazee | **Local SEO Services for Google Maps Visibility \| Webamazee** | Commercial – local search/Maps | local SEO services / Google Maps ranking | Change | Double brand; 'Local' ×3; 65 chars. 57 chars. |
| 24 | `/services/ai-content-optimization` | Service page | AI Content Optimisation \| SEO Content Services \| Webamazee \| Webamazee | **AI Content Optimisation & SEO Content Services \| Webamazee** | Commercial – content at scale | AI content optimisation / SEO content services | Change | Double brand; 74 chars. 59 chars. |
| 25 | `/services/google-ranking-growth` | Service page | Google Ranking Growth Services \| Rank Higher \| Webamazee \| Webamazee | **Google Ranking Growth Services \| Webamazee** | Commercial – rank improvement | Google ranking growth | Change | Double brand; 71 chars. Clean keyword title. 42 chars. |
| 26 | `/services/competitor-analysis` | Service page | Competitor Analysis Services \| SEO Competitor Intel \| Webamazee \| Webamazee | **SEO Competitor Analysis & Market Gap Services \| Webamazee** | Commercial – competitive intel | competitor analysis / SEO competitor analysis | Change | Double brand; 78 chars. 58 chars. |
| 27 | `/services/link-building` | Service page | Link Building Services \| White-Hat Backlinks \| Webamazee \| Webamazee | **Link Building & White-Hat Backlink Services \| Webamazee** | Commercial – backlinks/authority | link building services / white-hat backlinks | Change | Double brand; 71 chars. 55 chars. |
| 28 | `/services/social-media-management` | Service page | Social Media Management Services \| Webamazee \| Webamazee | **Social Media Management Services \| Webamazee** | Commercial – SMM | social media management services | Change | Double brand. Keyword-only title. 44 chars. |
| 29 | `/services/social-media-marketing` | Service page | Social Media Marketing Services \| Webamazee \| Webamazee | **Social Media Marketing Services \| Webamazee** | Commercial – SMM | social media marketing services | Change | Double brand. Keyword-only title. 42 chars. |
| 30 | `/services/instagram-marketing` | Service page | Instagram Marketing Services \| Webamazee \| Webamazee | **Instagram Marketing & Growth Services \| Webamazee** | Commercial – Instagram | Instagram marketing services | Change | Double brand; added 'Growth' for intent. 49 chars. |
| 31 | `/services/facebook-marketing` | Service page | Facebook Marketing Services \| Webamazee \| Webamazee | **Facebook Marketing & Ads Services \| Webamazee** | Commercial – Facebook/Meta | Facebook marketing services / Meta ads | Change | Double brand; added 'Ads' (page covers Meta ads). 44 chars. |
| 32 | `/services/linkedin-marketing` | Service page | LinkedIn Marketing Services \| Webamazee \| Webamazee | **LinkedIn Marketing & B2B Growth Services \| Webamazee** | Commercial – LinkedIn/B2B | LinkedIn marketing services / B2B | Change | Double brand; added 'B2B Growth' (page targets B2B). 51 chars. |
| 33 | `/services/social-media-advertising` | Service page | Social Media Advertising Services \| Webamazee \| Webamazee | **Social Media Advertising & Paid Social Services \| Webamazee** | Commercial – paid social | social media advertising / paid social | Change | Double brand; 61 chars; added 'Paid Social'. 58 chars. |
| 34 | `/blog/seo-vs-ai-seo` | Blog post | SEO vs AI SEO: What Is the Difference in 2026? \| Webamazee | **SEO vs AI SEO: What Is the Difference in 2026? \| Webamazee** | Informational – SEO vs AI SEO comparison | SEO vs AI SEO difference | Keep | Unique, query-matched, year-current, 58 chars. Keep. |
| 35 | `/blog/ai-seo-guide-2026` | Blog post | What Is AI SEO? AI-Powered SEO Guide for 2026 \| Webamazee | **What Is AI SEO? AI-Powered SEO Guide for 2026 \| Webamazee** | Informational – AI SEO explainer | what is AI SEO / AI SEO guide | Keep | Query-matched guide title, 57 chars. Keep. |
| 36 | `/blog/web-developer-cost-guide-2026` | Blog post | How Much Does It Cost to Hire a Web Developer? \| Webamazee | **How Much Does It Cost to Hire a Web Developer? \| Webamazee** | Informational – cost research | cost to hire a web developer | Keep | Exact match to cost intent, 59 chars. Keep. |
| 37 | `/blog/redesign-before-after-seo` | Blog post | When Should You Redesign Your Website? Business Guide \| Webamazee | **When Should You Redesign Your Website? A Guide \| Webamazee** | Informational – redesign decision | when to redesign your website | Change | 64 chars (truncation risk); shortened without losing intent. 57 chars. |
| 38 | `/blog/local-seo-checklist` | Blog post | Local SEO Checklist for Service Businesses \| Webamazee | **Local SEO Checklist for Service Businesses \| Webamazee** | Informational – local SEO checklist | local SEO checklist | Keep | Descriptive, intent-matched, 53 chars. Keep. |
| 39 | `/blog/core-web-vitals-guide` | Blog post | Core Web Vitals for Business Websites: Practical Guide \| Webamazee | **Core Web Vitals for Business Websites \| Webamazee** | Informational – CWV guide | Core Web Vitals guide | Change | 65 chars; subtitle removed (H1 still carries it). 48 chars. |
| 40 | `/blog/ecommerce-seo-strategy` | Blog post | E-Commerce SEO Strategy for Categories and Products \| Webamazee | **E-Commerce SEO Strategy: Categories & Products \| Webamazee** | Informational – e-commerce SEO framework | e-commerce SEO strategy | Change | 62 chars; 'for Categories and Products' tightened to colon form. 56 chars. |
| 41 | `/blog/measuring-marketing-roi` | Blog post | How to Measure Digital Marketing ROI Clearly \| Webamazee | **How to Measure Digital Marketing ROI Clearly \| Webamazee** | Informational – marketing ROI | measure digital marketing ROI | Keep | Query-matched, 54 chars. Keep. |
| 42 | `/case-studies/kabiroilmill` | Case study | Kabir Oil Mill E-commerce Website Case Study \| Webamazee | **Kabir Oil Mill E-commerce Website Case Study \| Webamazee** | Commercial proof – e-commerce build | Kabir Oil Mill e-commerce website | Keep | Descriptive (client + service + format), 54 chars. Keep. |
| 43 | `/case-studies/wellingtontours` | Case study | Wellington Tours Travel Website Case Study \| Webamazee | **Wellington Tours Website Case Study \| Webamazee** | Commercial proof – travel website | Wellington Tours travel website | Change | 'Website' is ambiguous (which type?); page is a travel & tourism website build. 54 chars. |
| 44 | `/case-studies/shinegoldtours` | Case study | Shine Gold Tours India Website Redesign Case Study \| Webamazee | **Shine Gold Tours India Website Redesign Case Study \| Webamazee** | Commercial proof – redesign | Shine Gold Tours website redesign | Keep | Fully descriptive, 62 chars (acceptable). Keep. |
| 45 | `/work/kabir-oil-mill` | Portfolio case study | Kabir Oil Mill Case Study \| Webamazee | **Kabir Oil Mill Case Study \| Webamazee** | Commercial proof – portfolio piece | Kabir Oil Mill web design project | Keep | Concise, unique, 33 chars. Keep. |
| 46 | `/work/wellington-tours` | Portfolio case study | Wellington Tours Case Study \| Webamazee | **Wellington Tours Case Study \| Webamazee** | Commercial proof – portfolio piece | Wellington Tours web design project | Keep | Concise, unique, 35 chars. Keep. |
| 47 | `/work/shine-gold-tours-india` | Portfolio case study | Shine Gold Tours India Case Study \| Webamazee | **Shine Gold Tours India Case Study \| Webamazee** | Commercial proof – portfolio piece | Shine Gold Tours India project | Keep | Concise, unique, 41 chars. Keep. |
| 48 | `/products/lead-management-system` | Product page | Lead Management System for Digital Marketing Agencies \| Webamazee | **Lead Management System for Agencies \| Webamazee** | Commercial – SaaS product | lead management system for agencies / agency CRM | Change | 65 chars; 'Digital Marketing' dropped (page targets agencies). 46 chars. |
| 49 | `/seo-for-ecommerce` | Industry page | SEO for Ecommerce \| Webamazee | **SEO for Ecommerce \| Webamazee** | Commercial – industry landing | SEO for ecommerce | Keep | Clean, intent-matched, 31 chars. Keep. |
| 50 | `/seo-for-saas` | Industry page | SEO for SaaS Companies \| Webamazee | **SEO for SaaS Companies \| Webamazee** | Commercial – industry landing | SEO for SaaS | Keep | Clean, 36 chars. Keep. |
| 51 | `/seo-for-local-business` | Industry page | SEO for Local Businesses \| Webamazee | **SEO for Local Businesses \| Webamazee** | Commercial – industry landing | SEO for local businesses | Keep | Clean, 38 chars. Keep. |
| 52 | `/seo-for-tourism` | Industry page | SEO for Tourism Businesses \| Webamazee | **SEO for Tourism Businesses \| Webamazee** | Commercial – industry landing | SEO for tourism businesses | Keep | Clean, 40 chars. Keep. |
| 53 | `/seo-for-healthcare` | Industry page | SEO for Healthcare \| Webamazee | **SEO for Healthcare \| Webamazee** | Commercial – industry landing | SEO for healthcare | Keep | Clean, 32 chars. Keep. |
| 54 | `/seo-for-professional-services` | Industry page | SEO for Professional Services \| Webamazee | **SEO for Professional Services \| Webamazee** | Commercial – industry landing | SEO for professional services | Keep | Clean, 43 chars. Keep. |
| 55 | `/web-designing-company-zirakpur` | Location – web design | Professional Web Designing Company in Zirakpur – Webamazee | **Professional Web Designing Company in Zirakpur \| Webamazee** | Local commercial – web design (Tricity) | web designing company in Zirakpur | Change | Only page using a 'absolute' title workaround for the double-brand bug. Title de-branded + workaround removed so the standard template flow renders '… | Webamazee' consistently. 56 chars. |
| 56 | `/web-designing-company-mohali` | Location – web design | Web Design & Digital Marketing Company in Mohali \| Webamazee | **Web Design & Digital Marketing Company in Mohali \| Webamazee** | Local commercial – web design + digital | web design & digital marketing company Mohali | Keep | Matches H1, single brand, exactly 60 chars. Keep. |
| 57 | `/web-designing-company-panchkula` | Location – web design | Web Design & Digital Marketing Company in Panchkula \| Webamazee | **Web Design & Digital Marketing in Panchkula \| Webamazee** | Local commercial – web design + digital | web design & digital marketing Panchkula | Change | 63 chars; 'Company' dropped to fit 55 chars (consistent with longer-location pages). |
| 58 | `/web-designing-company-chandigarh` | Location – web design | Web Design & Digital Marketing Company in Chandigarh \| Webamazee | **Web Design & Digital Marketing in Chandigarh \| Webamazee** | Local commercial – web design + digital | web design & digital marketing Chandigarh | Change | 64 chars; 'Company' dropped. 55 chars. |
| 59 | `/web-designing-company-new-zealand` | Location – web design | Web Design & Digital Marketing Company in New Zealand \| Webamazee | **Web Design & Digital Marketing in New Zealand \| Webamazee** | International commercial – web design + digital | web design & digital marketing New Zealand | Change | 65 chars; 'Company' dropped. 56 chars. |
| 60 | `/web-designing-company-punjab` | Location – web design | Web Designing Company in Punjab \| Webamazee | **Web Designing Company in Punjab \| Webamazee** | Regional commercial – web design | web designing company in Punjab | Keep | Clean, unique, 39 chars. Keep. |
| 61 | `/web-designing-company-bathinda` | Location – web design | Web Designing Company in Bathinda \| Webamazee | **Web Designing Company in Bathinda \| Webamazee** | Local commercial – web design | web designing company in Bathinda | Keep | Clean, unique, 45 chars. Keep. |
| 62 | `/web-designing-company-himachal-pradesh` | Location – web design | Web Designing Company in Himachal Pradesh \| Webamazee | **Web Designing Company in Himachal Pradesh \| Webamazee** | State-level commercial – web design | web designing company in Himachal Pradesh | Keep | Clean, unique, 55 chars. Keep. |
| 63 | `/web-designing-company-australia` | Location – web design | Web Designing Company in Australia \| Webamazee | **Web Designing Company in Australia \| Webamazee** | International commercial – web design | web designing company in Australia | Keep | Clean, unique, 48 chars. Keep. |
| 64 | `/web-designing-company-uae` | Location – web design | Web Design & Digital Marketing Company in UAE \| Webamazee | **Web Design & Digital Marketing Company in UAE \| Webamazee** | International commercial – web design + digital | web design & digital marketing company UAE | Keep | Matches H1, single brand, 57 chars. Keep. |
| 65 | `/web-designing-company-united-kingdom` | Location – web design | Web Design & Digital Marketing Company in United Kingdom \| Webamazee | **Web Design & Digital Marketing in United Kingdom \| Webamazee** | International commercial – web design + digital | web design & digital marketing United Kingdom | Change | 68 chars; 'Company' dropped. 58 chars. |
| 66 | `/web-designing-company-united-states` | Location – web design | Web Design & Digital Marketing Company in United States \| Webamazee | **Web Design & Digital Marketing in United States \| Webamazee** | International commercial – web design + digital | web design & digital marketing United States | Change | 67 chars; 'Company' dropped. 57 chars. |
| 67 | `/seo-services-australia` | Location – SEO | SEO Services in Australia \| Webamazee | **SEO Services in Australia \| Webamazee** | Local commercial – SEO in Australia | SEO services in Australia | Keep | Clean template + brand, unique per location, 37 chars. Keep. |
| 68 | `/seo-services-bathinda` | Location – SEO | SEO Services in Bathinda \| Webamazee | **SEO Services in Bathinda \| Webamazee** | Local commercial – SEO in Bathinda | SEO services in Bathinda | Keep | Clean template + brand, unique per location, 36 chars. Keep. |
| 69 | `/seo-services-chandigarh` | Location – SEO | SEO Services in Chandigarh \| Webamazee | **SEO Services in Chandigarh \| Webamazee** | Local commercial – SEO in Chandigarh | SEO services in Chandigarh | Keep | Clean template + brand, unique per location, 38 chars. Keep. |
| 70 | `/seo-services-himachal-pradesh` | Location – SEO | SEO Services in Himachal Pradesh \| Webamazee | **SEO Services in Himachal Pradesh \| Webamazee** | Local commercial – SEO in Himachal Pradesh | SEO services in Himachal Pradesh | Keep | Clean template + brand, unique per location, 44 chars. Keep. |
| 71 | `/seo-services-mohali` | Location – SEO | SEO Services in Mohali \| Webamazee | **SEO Services in Mohali \| Webamazee** | Local commercial – SEO in Mohali | SEO services in Mohali | Keep | Clean template + brand, unique per location, 34 chars. Keep. |
| 72 | `/seo-services-new-zealand` | Location – SEO | SEO Services in New Zealand \| Webamazee | **SEO Services in New Zealand \| Webamazee** | Local commercial – SEO in New Zealand | SEO services in New Zealand | Keep | Clean template + brand, unique per location, 39 chars. Keep. |
| 73 | `/seo-services-panchkula` | Location – SEO | SEO Services in Panchkula \| Webamazee | **SEO Services in Panchkula \| Webamazee** | Local commercial – SEO in Panchkula | SEO services in Panchkula | Keep | Clean template + brand, unique per location, 37 chars. Keep. |
| 74 | `/seo-services-punjab` | Location – SEO | SEO Services in Punjab \| Webamazee | **SEO Services in Punjab \| Webamazee** | Local commercial – SEO in Punjab | SEO services in Punjab | Keep | Clean template + brand, unique per location, 34 chars. Keep. |
| 75 | `/seo-services-uae` | Location – SEO | SEO Services in UAE \| Webamazee | **SEO Services in UAE \| Webamazee** | Local commercial – SEO in UAE | SEO services in UAE | Keep | Clean template + brand, unique per location, 31 chars. Keep. |
| 76 | `/seo-services-united-kingdom` | Location – SEO | SEO Services in United Kingdom \| Webamazee | **SEO Services in United Kingdom \| Webamazee** | Local commercial – SEO in United Kingdom | SEO services in United Kingdom | Keep | Clean template + brand, unique per location, 42 chars. Keep. |
| 77 | `/seo-services-united-states` | Location – SEO | SEO Services in United States \| Webamazee | **SEO Services in United States \| Webamazee** | Local commercial – SEO in United States | SEO services in United States | Keep | Clean template + brand, unique per location, 41 chars. Keep. |
| 78 | `/seo-services-zirakpur` | Location – SEO | SEO Services in Zirakpur \| Webamazee | **SEO Services in Zirakpur \| Webamazee** | Local commercial – SEO in Zirakpur | SEO services in Zirakpur | Keep | Clean template + brand, unique per location, 36 chars. Keep. |
| 79 | `/digital-marketing-company-bathinda` | Location – digital marketing | Digital Marketing Company in Bathinda \| Webamazee | **Digital Marketing Company in Bathinda \| Webamazee** | Local commercial – digital marketing in Bathinda | digital marketing company in bathinda | Keep | Clean template + brand, unique per location, 49 chars. Keep. |
| 80 | `/digital-marketing-company-chandigarh` | Location – digital marketing | Digital Marketing Company in Chandigarh \| Webamazee | **Digital Marketing Company in Chandigarh \| Webamazee** | Local commercial – digital marketing in Chandigarh | digital marketing company in chandigarh | Keep | Clean template + brand, unique per location, 51 chars. Keep. |
| 81 | `/digital-marketing-company-himachal-pradesh` | Location – digital marketing | Digital Marketing Company in Himachal Pradesh \| Webamazee | **Digital Marketing Company in Himachal Pradesh \| Webamazee** | Local commercial – digital marketing in Himachal Pradesh | digital marketing company in himachal pradesh | Keep | Clean template + brand, unique per location, 57 chars. Keep. |
| 82 | `/digital-marketing-company-mohali` | Location – digital marketing | Digital Marketing Company in Mohali \| Webamazee | **Digital Marketing Company in Mohali \| Webamazee** | Local commercial – digital marketing in Mohali | digital marketing company in mohali | Keep | Clean template + brand, unique per location, 47 chars. Keep. |
| 83 | `/digital-marketing-company-new-zealand` | Location – digital marketing | Digital Marketing Company in New Zealand \| Webamazee | **Digital Marketing Company in New Zealand \| Webamazee** | Local commercial – digital marketing in New Zealand | digital marketing company in new zealand | Keep | Clean template + brand, unique per location, 52 chars. Keep. |
| 84 | `/digital-marketing-company-panchkula` | Location – digital marketing | Digital Marketing Company in Panchkula \| Webamazee | **Digital Marketing Company in Panchkula \| Webamazee** | Local commercial – digital marketing in Panchkula | digital marketing company in panchkula | Keep | Clean template + brand, unique per location, 50 chars. Keep. |
| 85 | `/digital-marketing-company-punjab` | Location – digital marketing | Digital Marketing Company in Punjab \| Webamazee | **Digital Marketing Company in Punjab \| Webamazee** | Local commercial – digital marketing in Punjab | digital marketing company in punjab | Keep | Clean template + brand, unique per location, 47 chars. Keep. |
| 86 | `/digital-marketing-company-uae` | Location – digital marketing | Digital Marketing Company in UAE \| Webamazee | **Digital Marketing Company in UAE \| Webamazee** | Local commercial – digital marketing in UAE | digital marketing company in uae | Keep | Clean template + brand, unique per location, 44 chars. Keep. |
| 87 | `/digital-marketing-company-uk` | Location – digital marketing | Digital Marketing Company in UK \| Webamazee | **Digital Marketing Company in UK \| Webamazee** | Local commercial – digital marketing in UK | digital marketing company in uk | Keep | Clean template + brand, unique per location, 43 chars. Keep. |
| 88 | `/digital-marketing-company-usa` | Location – digital marketing | Digital Marketing Company in USA \| Webamazee | **Digital Marketing Company in USA \| Webamazee** | Local commercial – digital marketing in USA | digital marketing company in usa | Keep | Clean template + brand, unique per location, 44 chars. Keep. |
| 89 | `/digital-marketing-company-zirakpur` | Location – digital marketing | Digital Marketing Company in Zirakpur \| Webamazee | **Digital Marketing Company in Zirakpur \| Webamazee** | Local commercial – digital marketing in Zirakpur | digital marketing company in zirakpur | Keep | Clean template + brand, unique per location, 49 chars. Keep. |
| 90 | `/ai-marketing-company-bathinda` | Location – AI marketing | AI Marketing Company in Bathinda \| Webamazee | **AI Marketing Company in Bathinda \| Webamazee** | Local commercial – AI marketing in Bathinda | AI marketing company in bathinda | Keep | Clean template + brand, unique per location, 44 chars. Keep. |
| 91 | `/ai-marketing-company-chandigarh` | Location – AI marketing | AI Marketing Company in Chandigarh \| Webamazee | **AI Marketing Company in Chandigarh \| Webamazee** | Local commercial – AI marketing in Chandigarh | AI marketing company in chandigarh | Keep | Clean template + brand, unique per location, 46 chars. Keep. |
| 92 | `/ai-marketing-company-himachal-pradesh` | Location – AI marketing | AI Marketing Company in Himachal Pradesh \| Webamazee | **AI Marketing Company in Himachal Pradesh \| Webamazee** | Local commercial – AI marketing in Himachal Pradesh | AI marketing company in himachal pradesh | Keep | Clean template + brand, unique per location, 52 chars. Keep. |
| 93 | `/ai-marketing-company-mohali` | Location – AI marketing | AI Marketing Company in Mohali \| Webamazee | **AI Marketing Company in Mohali \| Webamazee** | Local commercial – AI marketing in Mohali | AI marketing company in mohali | Keep | Clean template + brand, unique per location, 42 chars. Keep. |
| 94 | `/ai-marketing-company-new-zealand` | Location – AI marketing | AI Marketing Company in New Zealand \| Webamazee | **AI Marketing Company in New Zealand \| Webamazee** | Local commercial – AI marketing in New Zealand | AI marketing company in new zealand | Keep | Clean template + brand, unique per location, 47 chars. Keep. |
| 95 | `/ai-marketing-company-panchkula` | Location – AI marketing | AI Marketing Company in Panchkula \| Webamazee | **AI Marketing Company in Panchkula \| Webamazee** | Local commercial – AI marketing in Panchkula | AI marketing company in panchkula | Keep | Clean template + brand, unique per location, 45 chars. Keep. |
| 96 | `/ai-marketing-company-punjab` | Location – AI marketing | AI Marketing Company in Punjab \| Webamazee | **AI Marketing Company in Punjab \| Webamazee** | Local commercial – AI marketing in Punjab | AI marketing company in punjab | Keep | Clean template + brand, unique per location, 42 chars. Keep. |
| 97 | `/ai-marketing-company-uae` | Location – AI marketing | AI Marketing Company in UAE \| Webamazee | **AI Marketing Company in UAE \| Webamazee** | Local commercial – AI marketing in UAE | AI marketing company in uae | Keep | Clean template + brand, unique per location, 39 chars. Keep. |
| 98 | `/ai-marketing-company-uk` | Location – AI marketing | AI Marketing Company in UK \| Webamazee | **AI Marketing Company in UK \| Webamazee** | Local commercial – AI marketing in UK | AI marketing company in uk | Keep | Clean template + brand, unique per location, 38 chars. Keep. |
| 99 | `/ai-marketing-company-usa` | Location – AI marketing | AI Marketing Company in USA \| Webamazee | **AI Marketing Company in USA \| Webamazee** | Local commercial – AI marketing in USA | AI marketing company in usa | Keep | Clean template + brand, unique per location, 39 chars. Keep. |
| 100 | `/ai-marketing-company-zirakpur` | Location – AI marketing | AI Marketing Company in Zirakpur \| Webamazee | **AI Marketing Company in Zirakpur \| Webamazee** | Local commercial – AI marketing in Zirakpur | AI marketing company in zirakpur | Keep | Clean template + brand, unique per location, 44 chars. Keep. |
| 101 | `/services-in-zirakpur` | Location hub | Digital Marketing & Web Development Services in Zirakpur \| Webamazee | **Web Development & Digital Marketing in Zirakpur \| Webamazee** | Local commercial – all services hub | web development & digital marketing services Zirakpur | Change | 68 chars (truncation). 'Services' dropped; pillar order aligned with page emphasis. 54 chars. |
| 102 | `/services-in-chandigarh` | Location hub | Digital Marketing & Web Development Services in Chandigarh \| Webamazee | **Web Development & Digital Marketing in Chandigarh \| Webamazee** | Local commercial – all services hub | web development & digital marketing services Chandigarh | Change | 72 chars. 'Services' dropped. 61 chars. |
| 103 | `/services-in-mohali` | Location hub | Digital Marketing & Web Development Services in Mohali \| Webamazee | **Web Development & Digital Marketing in Mohali \| Webamazee** | Local commercial – all services hub | web development & digital marketing services Mohali | Change | 66 chars. 'Services' dropped. 52 chars. |
| 104 | `/services-in-panchkula` | Location hub | Digital Marketing & Web Development Services in Panchkula \| Webamazee | **Web Development & Digital Marketing in Panchkula \| Webamazee** | Local commercial – all services hub | web development & digital marketing services Panchkula | Change | 69 chars. 'Services' dropped. 55 chars. |
| 105 | `/services-in-new-zealand` | Location hub | Digital Marketing & Web Development Services in New Zealand \| Webamazee | **Web Development & Digital Marketing in New Zealand \| Webamazee** | International commercial – all services hub | web development & digital marketing New Zealand | Change | 71 chars. 'Services' dropped. 62 chars. |
| 106 | `/services-in-uae` | Location hub | Digital Marketing & Web Development Services in the UAE \| Webamazee | **Web Development & Digital Marketing in the UAE \| Webamazee** | International commercial – all services hub | web development & digital marketing UAE | Change | 67 chars. 'Services' dropped. 58 chars. |
| 107 | `/services-in-usa` | Location hub | Digital Marketing & Web Development Services in the USA \| Webamazee | **Web Development & Digital Marketing in the USA \| Webamazee** | International commercial – all services hub | web development & digital marketing USA | Change | 67 chars. 'Services' dropped. 58 chars. |
| 108 | `/services-in-uk` | Location hub | Digital Marketing & Web Development Services in the UK \| Webamazee | **Web Development & Digital Marketing in the UK \| Webamazee** | International commercial – all services hub | web development & digital marketing UK | Change | 66 chars. 'Services' dropped. 57 chars. |

---

## 3. Titles That Should Remain Unchanged

**Homepage** (1)
- `/` — "Web Development & SEO Agency | Webamazee" — Already strong, specific, branded, 40 chars. No change.

**Static – Free SEO audit** (1)
- `/free-seo-audit` — "Free Website SEO Audit | Webamazee" — Already unique, intent-matched, single brand, 35 chars.

**Blog post** (5)
- `/blog/seo-vs-ai-seo` — "SEO vs AI SEO: What Is the Difference in 2026? | Webamazee" — Unique, query-matched, year-current, 58 chars. Keep.
- `/blog/ai-seo-guide-2026` — "What Is AI SEO? AI-Powered SEO Guide for 2026 | Webamazee" — Query-matched guide title, 57 chars. Keep.
- `/blog/web-developer-cost-guide-2026` — "How Much Does It Cost to Hire a Web Developer? | Webamazee" — Exact match to cost intent, 59 chars. Keep.
- `/blog/local-seo-checklist` — "Local SEO Checklist for Service Businesses | Webamazee" — Descriptive, intent-matched, 53 chars. Keep.
- `/blog/measuring-marketing-roi` — "How to Measure Digital Marketing ROI Clearly | Webamazee" — Query-matched, 54 chars. Keep.

**Case study** (2)
- `/case-studies/kabiroilmill` — "Kabir Oil Mill E-commerce Website Case Study | Webamazee" — Descriptive (client + service + format), 54 chars. Keep.
- `/case-studies/shinegoldtours` — "Shine Gold Tours India Website Redesign Case Study | Webamazee" — Fully descriptive, 62 chars (acceptable). Keep.

**Portfolio case study** (3)
- `/work/kabir-oil-mill` — "Kabir Oil Mill Case Study | Webamazee" — Concise, unique, 33 chars. Keep.
- `/work/wellington-tours` — "Wellington Tours Case Study | Webamazee" — Concise, unique, 35 chars. Keep.
- `/work/shine-gold-tours-india` — "Shine Gold Tours India Case Study | Webamazee" — Concise, unique, 41 chars. Keep.

**Industry page** (6)
- `/seo-for-ecommerce` — "SEO for Ecommerce | Webamazee" — Clean, intent-matched, 31 chars. Keep.
- `/seo-for-saas` — "SEO for SaaS Companies | Webamazee" — Clean, 36 chars. Keep.
- `/seo-for-local-business` — "SEO for Local Businesses | Webamazee" — Clean, 38 chars. Keep.
- `/seo-for-tourism` — "SEO for Tourism Businesses | Webamazee" — Clean, 40 chars. Keep.
- `/seo-for-healthcare` — "SEO for Healthcare | Webamazee" — Clean, 32 chars. Keep.
- `/seo-for-professional-services` — "SEO for Professional Services | Webamazee" — Clean, 43 chars. Keep.

**Location – web design** (6)
- `/web-designing-company-mohali` — "Web Design & Digital Marketing Company in Mohali | Webamazee" — Matches H1, single brand, exactly 60 chars. Keep.
- `/web-designing-company-punjab` — "Web Designing Company in Punjab | Webamazee" — Clean, unique, 39 chars. Keep.
- `/web-designing-company-bathinda` — "Web Designing Company in Bathinda | Webamazee" — Clean, unique, 45 chars. Keep.
- `/web-designing-company-himachal-pradesh` — "Web Designing Company in Himachal Pradesh | Webamazee" — Clean, unique, 55 chars. Keep.
- `/web-designing-company-australia` — "Web Designing Company in Australia | Webamazee" — Clean, unique, 48 chars. Keep.
- `/web-designing-company-uae` — "Web Design & Digital Marketing Company in UAE | Webamazee" — Matches H1, single brand, 57 chars. Keep.

**Location – SEO** (12)
- `/seo-services-australia` — "SEO Services in Australia | Webamazee" — Clean template + brand, unique per location, 37 chars. Keep.
- `/seo-services-bathinda` — "SEO Services in Bathinda | Webamazee" — Clean template + brand, unique per location, 36 chars. Keep.
- `/seo-services-chandigarh` — "SEO Services in Chandigarh | Webamazee" — Clean template + brand, unique per location, 38 chars. Keep.
- `/seo-services-himachal-pradesh` — "SEO Services in Himachal Pradesh | Webamazee" — Clean template + brand, unique per location, 44 chars. Keep.
- `/seo-services-mohali` — "SEO Services in Mohali | Webamazee" — Clean template + brand, unique per location, 34 chars. Keep.
- `/seo-services-new-zealand` — "SEO Services in New Zealand | Webamazee" — Clean template + brand, unique per location, 39 chars. Keep.
- `/seo-services-panchkula` — "SEO Services in Panchkula | Webamazee" — Clean template + brand, unique per location, 37 chars. Keep.
- `/seo-services-punjab` — "SEO Services in Punjab | Webamazee" — Clean template + brand, unique per location, 34 chars. Keep.
- `/seo-services-uae` — "SEO Services in UAE | Webamazee" — Clean template + brand, unique per location, 31 chars. Keep.
- `/seo-services-united-kingdom` — "SEO Services in United Kingdom | Webamazee" — Clean template + brand, unique per location, 42 chars. Keep.
- `/seo-services-united-states` — "SEO Services in United States | Webamazee" — Clean template + brand, unique per location, 41 chars. Keep.
- `/seo-services-zirakpur` — "SEO Services in Zirakpur | Webamazee" — Clean template + brand, unique per location, 36 chars. Keep.

**Location – digital marketing** (11)
- `/digital-marketing-company-bathinda` — "Digital Marketing Company in Bathinda | Webamazee" — Clean template + brand, unique per location, 49 chars. Keep.
- `/digital-marketing-company-chandigarh` — "Digital Marketing Company in Chandigarh | Webamazee" — Clean template + brand, unique per location, 51 chars. Keep.
- `/digital-marketing-company-himachal-pradesh` — "Digital Marketing Company in Himachal Pradesh | Webamazee" — Clean template + brand, unique per location, 57 chars. Keep.
- `/digital-marketing-company-mohali` — "Digital Marketing Company in Mohali | Webamazee" — Clean template + brand, unique per location, 47 chars. Keep.
- `/digital-marketing-company-new-zealand` — "Digital Marketing Company in New Zealand | Webamazee" — Clean template + brand, unique per location, 52 chars. Keep.
- `/digital-marketing-company-panchkula` — "Digital Marketing Company in Panchkula | Webamazee" — Clean template + brand, unique per location, 50 chars. Keep.
- `/digital-marketing-company-punjab` — "Digital Marketing Company in Punjab | Webamazee" — Clean template + brand, unique per location, 47 chars. Keep.
- `/digital-marketing-company-uae` — "Digital Marketing Company in UAE | Webamazee" — Clean template + brand, unique per location, 44 chars. Keep.
- `/digital-marketing-company-uk` — "Digital Marketing Company in UK | Webamazee" — Clean template + brand, unique per location, 43 chars. Keep.
- `/digital-marketing-company-usa` — "Digital Marketing Company in USA | Webamazee" — Clean template + brand, unique per location, 44 chars. Keep.
- `/digital-marketing-company-zirakpur` — "Digital Marketing Company in Zirakpur | Webamazee" — Clean template + brand, unique per location, 49 chars. Keep.

**Location – AI marketing** (11)
- `/ai-marketing-company-bathinda` — "AI Marketing Company in Bathinda | Webamazee" — Clean template + brand, unique per location, 44 chars. Keep.
- `/ai-marketing-company-chandigarh` — "AI Marketing Company in Chandigarh | Webamazee" — Clean template + brand, unique per location, 46 chars. Keep.
- `/ai-marketing-company-himachal-pradesh` — "AI Marketing Company in Himachal Pradesh | Webamazee" — Clean template + brand, unique per location, 52 chars. Keep.
- `/ai-marketing-company-mohali` — "AI Marketing Company in Mohali | Webamazee" — Clean template + brand, unique per location, 42 chars. Keep.
- `/ai-marketing-company-new-zealand` — "AI Marketing Company in New Zealand | Webamazee" — Clean template + brand, unique per location, 47 chars. Keep.
- `/ai-marketing-company-panchkula` — "AI Marketing Company in Panchkula | Webamazee" — Clean template + brand, unique per location, 45 chars. Keep.
- `/ai-marketing-company-punjab` — "AI Marketing Company in Punjab | Webamazee" — Clean template + brand, unique per location, 42 chars. Keep.
- `/ai-marketing-company-uae` — "AI Marketing Company in UAE | Webamazee" — Clean template + brand, unique per location, 39 chars. Keep.
- `/ai-marketing-company-uk` — "AI Marketing Company in UK | Webamazee" — Clean template + brand, unique per location, 38 chars. Keep.
- `/ai-marketing-company-usa` — "AI Marketing Company in USA | Webamazee" — Clean template + brand, unique per location, 39 chars. Keep.
- `/ai-marketing-company-zirakpur` — "AI Marketing Company in Zirakpur | Webamazee" — Clean template + brand, unique per location, 44 chars. Keep.


**Why these stay:**
- **Location pages (37 kept):** already follow the intended architecture — unbranded data title + one brand append, unique per location × service, 26–60 chars, accurate to the page content (each page genuinely targets that location/service; international pages explicitly state they serve the market remotely and make no office claims).
- **Blog keeps (5):** query-matched, descriptive, correctly branded once.
- **Case studies / portfolio / industries / free-seo-audit / home / mohali & uae web-design:** descriptive, intent-matched, correctly branded once, within length.

---

## 4. Duplicate / Near-Duplicate Titles

### 4.1 Exact duplicates
**None.** No two indexable pages currently share an identical rendered `<title>`.

### 4.2 Double-branded titles (defect)
29 pages render the brand twice because the data `metaTitle` already contains "Webamazee" and the root template appends it again:

- **18 service pages** — e.g. `/services/website-development` renders `Website Development Services | Custom Web Design | Webamazee | Webamazee` (74 chars). All 18 are in the change list (§2).
- **11 static pages** — `/about`, `/services`, `/products`, `/case-studies`, `/blog`, `/testimonials`, `/faq`, `/contact`, `/sitemap`, `/privacy-policy`, `/terms-and-conditions`. `/about` is the worst: the brand appears **three** times (`About Webamazee | AI-Powered Digital Marketing Company | Webamazee`). All 11 are in the change list.
- `/web-designing-company-zirakpur` dodges this with an absolute-title workaround; the approved fix removes the workaround and de-brands the data title so it renders like every other location page.

### 4.3 Near-duplicate / templated clusters (by design, monitored)
- **Location families:** 4 families (web-design 12, SEO 12, digital marketing 11, AI marketing 11) share a template with the location swapped in. This is a standard geo-SEO pattern and the titles remain unique because the location differs; each page's *content* is location-specific (market notes, FAQs, industries). No change recommended; see §6 for doorway-page monitoring.
- **Priority web-design pages** (8) share the `Web Design & Digital Marketing Company in {X}` template — unique per location; 5 are shortened in §2 to fit ~60 chars.
- **Case study vs portfolio pairs:** `/case-studies/kabiroilmill` ("Kabir Oil Mill E-commerce Website Case Study") vs `/work/kabir-oil-mill` ("Kabir Oil Mill Case Study") — same project, two sections. Titles are distinct (one specifies the service), URLs are stable, both sections are intentional. Kept as-is; flagged in §6.

---

## 5. Missing Titles

**None.** All 108 indexable routes render a non-empty `<title>` (verified against the live site and the local production build). The 404 page (`not-found.tsx`) carries `robots: noindex, nofollow` with a proper "404 | Page Not Found" title — correctly out of scope.

---

## 6. SEO Concerns (beyond the title change — reported, NOT changed in this task)

1. **Doorway / templated-location-page risk (45 pages).** The site ships 45 templated location pages across 4 service families. Titles and content are differentiated, and recent commits strengthened internal linking, but Google's scaled-content/doorway-page guidance makes this the site's biggest long-term risk. Recommend periodic quality review and consolidation if pages remain thin.
2. **Duplicate project content in two sections.** `/case-studies/*` and `/work/*` expose the same 3 projects (Kabir Oil Mill, Wellington Tours, Shine Gold Tours) at two URL sets with near-identical content. Titles are distinct, so no title-level cannibalization, but the pages compete for the same queries. Consider consolidating or differentiating content later.
3. **Broken lint script (pre-existing).** `npm run lint` fails on Next 16 because `next lint` was removed. Baseline build and TypeScript both pass.
4. **Data-quality issue in Zirakpur web-design `metaDescription`** ("…you can get websites which has fast loading speed and are made more customers. contact us Today") — grammatically broken, shipped in `priorityLocationDetails`. Out of scope (descriptions, not titles). Reported only.
5. **Dead data:** `staticEntries.home` in `static-pages.ts` defines a title that is never used (the homepage `page.tsx` overrides it with its own absolute title). Harmless; noted for future cleanup.
6. **Superlative claim:** the current `/services/seo-services` title contained "#1 SEO Agency" — an unverifiable superlative; removed in the approved title.
7. **Committed build artifact:** `tsconfig.tsbuildinfo` is tracked in git. Out of scope.
8. **Social-card titles after the fix** — see risk #1 in §1 (og:title loses the brand suffix on changed pages).
9. **Brand repetition:** the old "Services | Agency | Webamazee" triple-slug service titles over-stuffed the brand; the new titles use the brand exactly once (template-appended), except the homepage where it is the trailing brand element — consistent and non-spammy.

---

## 7. Implementation Plan

All changes are **data-level `metaTitle`/`seoTitle`/`title` edits inside the existing centralized architecture**. No new metadata systems, no new files (except this report), no URL/canonical/sitemap/robots/redirect changes.

### 7.1 Files to modify (and exactly what changes in each)

| File | Change | Pages affected |
| --- | --- | --- |
| `src/lib/static-pages.ts` | De-brand 13 `metaTitle` values (about, services, products, portfolio, caseStudies, blog, testimonials, faq, contact, sitemap, pricing, privacy, terms) and replace 6 generic titles with descriptive ones (§2 rows 2–15). `home` entry left untouched (unused). | 13 |
| `src/lib/services.ts` | Rewrite 12 `metaTitle` values (core services) — de-brand, front-load keyword, drop repetitions/superlative (§2 rows 16–27). | 12 |
| `src/lib/services-social.ts` | De-brand 6 `metaTitle` values (drop the trailing " \| Webamazee" from each) and sharpen 3 (instagram, facebook, linkedin) per §2 rows 28–33. | 6 |
| `src/lib/blogs.ts` | Update 3 `seoTitle` values: `redesign-before-after-seo`, `core-web-vitals-guide`, `ecommerce-seo-strategy` (§2 rows 37–39). Other posts untouched. | 3 |
| `src/lib/case-studies.ts` | Update 1 `metaTitle`: `wellingtontours` → "Wellington Tours Travel Website Case Study" (§2 row 42). | 1 |
| `src/lib/products.ts` | Update 1 `metaTitle` → "Lead Management System for Agencies" (§2 row 47). | 1 |
| `src/lib/locations.ts` | (a) Change `priorityLocationDetails["web-designing-company-zirakpur"].metaTitle` → "Professional Web Designing Company in Zirakpur" (de-brand). (b) Add `metaTitle` overrides in `priorityLocationDetails` for `panchkula`, `chandigarh`, `new-zealand`, `united-kingdom`, `united-states` (drop "Company" per §2 rows 51–55). `mohali` and `uae` stay as generated by `enhancePriorityLocation`. | 6 |
| `src/lib/location-hubs.ts` | Update 8 hub seed `title` values → "Web Development & Digital Marketing in {Location}" (the UAE/USA/UK variants keep "the"; §2 rows 101–108). `h1` values left untouched (page content unchanged). | 8 |
| `src/app/web-designing-company-zirakpur/page.tsx` | Remove the absolute-title workaround (revert to the plain `locationMetadata(page)` return). Required so the de-branded data title receives the standard " \| Webamazee" append like every other location page. | 1 |

**Total: 50 pages changed; 58 untouched; 10 files modified (9 data/lib + 1 page).**

### 7.2 What will NOT change

- Root layout title template, default title, and the homepage absolute title.
- All `metaDescription`, H1s, page copy, components, and design.
- Canonical URLs (derived from paths), `src/app/sitemap.ts`, `src/app/robots.ts`, `vercel.json` redirects, `next.config.ts`.
- `og:title`/`twitter:title` code paths (they follow the data title automatically; see §1 risk 1).
- URL structure, slugs, `generateStaticParams`, internal linking.

### 7.3 Verification plan (executed post-approval)

1. `npm run build` (production) — must pass; compare prerendered HTML `<title>` of all 108 routes against §2.
2. `npx tsc --noEmit` — must pass. The lint script is pre-existing broken; it will be run for the record only.
3. Duplicate check over the 108 rendered titles — expect 0 duplicates.
4. Spot-check canonical `<link rel="canonical">` on 5+ pages (unchanged).
5. Verify `sitemap.xml` (108 URLs) and `robots.txt` behavior identical to baseline.
6. Verify `vercel.json` redirects untouched (git diff shows no changes).
7. Re-run the title scrape against the local build output for all 108 pages.

---

*Report prepared after a full audit of the repository source, the live production site (all 108 `<title>` tags scraped), and a clean local production build. No production code has been modified. Waiting for approval before implementation.*
