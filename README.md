# Webamazee — AI-Powered Digital Marketing Company

A premium, **multi-page** digital marketing agency website built from scratch with Next.js App Router, static-site generation, and full routing.

## Stack

- **Next.js 15** (App Router, Static Site Generation)
- **React 19** + **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations, scroll reveals, magnetic buttons, counters)
- **Lucide Icons**
- **react-hook-form + Zod** (validated contact form)
- **next/font** (Inter, Manrope, Space Grotesk)

## Run locally

```bash
npm install
npm run dev       # development
npm run build     # production build
npm run start     # serve production build
```

Open http://localhost:3000

## Pages / Routes

```
/                                       Home (hero + section previews)
/about                                  About the company
/services                               Services index (grouped)
/services/website-development           Service detail pages (12 total)
/services/website-redesign
/services/landing-page-development
/services/ecommerce-development
/services/seo-services
/services/ai-seo
/services/technical-seo
/services/local-seo
/services/ai-content-optimization
/services/google-ranking-growth
/services/competitor-analysis
/services/link-building
/portfolio                              Portfolio gallery
/case-studies                           Case studies index
/case-studies/[slug]                    Case study detail (SSG)
/blog                                   Blog index
/blog/[slug]                            Blog post detail (SSG, dynamic routing)
/testimonials                           Testimonials
/faq                                    FAQ (grouped by category)
/contact                                Contact + validated form
/privacy-policy                         Legal
/terms-and-conditions                   Legal
```

## Structure

```
src/
  app/
    layout.tsx            # global layout: fonts, metadata, navbar, footer, JSON-LD
    page.tsx              # home
    about/ services/ portfolio/ case-studies/ blog/ testimonials/
    faq/ contact/ privacy-policy/ terms-and-conditions/
    blog/[slug]/          # dynamic blog route (generateStaticParams)
    case-studies/[slug]/  # dynamic case study route
    robots.ts  sitemap.ts  icon.svg
  components/
    layout/               # navbar (with services dropdown), footer, page-hero,
                          # breadcrumb, cta-banner, legal-page
    services/             # service-page template (composes all required sections)
    sections/             # home page sections
    ui/                   # button, magnetic, reveal, accordion, counter,
                          # sections-blocks, eyebrow, text-reveal, cursor-glow
    contact/              # reusable validated contact form
  lib/                    # data: services, case-studies, portfolio,
                          # testimonials, faqs, blogs, nav
```

## Service page template

Every service page renders via `ServicePage` and includes:
**Hero → Overview → Benefits → Process → Features → Why Choose Webamazee → FAQ → Related Services → CTA**

## Design system

- **Colors:** Primary `#1E88FF`, Secondary `#0F6DFF`, Accent `#42A5FF`, Ink `#111827`, Surface `#F8FAFC`, Line `#E5E7EB`, Success `#16A34A`
- **Typography:** Space Grotesk (headings), Inter (body), Manrope (support)
- Light theme, rounded cards, soft shadows, thin borders, generous whitespace
- SEO: per-page metadata, sitemap, robots, OpenGraph, JSON-LD structured data

## Service pages

Each `/services/{slug}` page is a premium, SEO-focused, conversion-optimised template composed of 15 sections:

1. Premium breadcrumb (Home / Services / Service)
2. Hero with keyword-focused H1, dual CTA, trust badges, stats and animated illustration
3. Client pain points
4. Service overview (what / who / benefits / examples)
5. Why this service matters (ROI + stats)
6. Six-step process timeline
7. What's included (deliverables, tools, reporting)
8. Why choose Webamazee
9. Industries we serve
10. Technology stack
11. Results & before/after case table
12. Testimonials
13. FAQ (8-12, schema-ready)
14. Related services (internal linking)
15. Final CTA + mobile sticky CTA

Each page emits Service, BreadcrumbList and FAQPage JSON-LD schema, has a single H1, and ~2,000+ words of unique content from `src/lib/services.ts`.

## Portfolio detail pages

Each project card on the Work page (`/portfolio`) links to a dedicated case study at `/work/{slug}`.

Routes: `/work/kabir-oil-mill`, `/work/wellington-tours`, `/work/shine-gold-tours-india`.

Each page is a premium, SEO-friendly case study (SSG via `generateStaticParams`) with:
1. Breadcrumb (Home / Portfolio / Project)
2. Hero with project meta (category, industry, country, year, URL, tech stack) + CTA
3. Device showcase (desktop / tablet / mobile mockups)
4. Project overview (client, goals, requirements)
5. The Challenge (icon cards)
6. Our Solution (strategy, UI/UX, SEO, performance, conversion)
7. Design showcase gallery with lightbox + hover zoom
8. Features delivered
9. Technology stack
10. Development process timeline
11. Performance & SEO (optimizations performed, no invented scores)
12. Image gallery (lazy, hover, lightbox)
13. Client testimonial (rendered only when authentic — omitted otherwise)
14. Related projects
15. Final CTA

Emits CreativeWork + BreadcrumbList JSON-LD, single H1, per-page metadata + Open Graph. Content is process-focused and factual; no fabricated metrics.

## Case study detail pages

`/case-studies/{slug}` pages are premium, SEO-friendly case studies (SSG). Three routes:
`kabiroilmill`, `wellingtontours`, `shinegoldtours`.

Each page includes:
1. Breadcrumb (Home / Case Studies / Project)
2. Cinematic hero (title, industry, country, type, completion, tech stack, CTAs) + device mockups
3. Project Overview (client, business, objectives, scope, timeline, team)
4. Executive Summary (challenge / solution / outcome)
5. Client Challenges (icon cards)
6. Discovery & Strategy
7. Design Process
8. Development Process
9. Feature Showcase
10. Visual Gallery (lightbox + hover zoom)
11. Performance & SEO (work performed; no invented scores)
12. Business Outcomes (qualitative; no fabricated metrics)
13. Technology Stack
14. Client Testimonial (omitted unless authentic — none currently)
15. Related Services
16. Related Case Studies
17. FAQ
18. Final CTA

Emits CreativeWork + BreadcrumbList + FAQPage JSON-LD, single H1, canonical + Open Graph, and a sticky desktop sidebar (project info, tech stack, quick-nav TOC, CTA).

All content is process-focused and truthful — no fake client names, metrics, or testimonials.

## Before & After showcase (case study pages)

Every case study detail page now includes a "Before & After Transformation" section with 3 comparison sliders.

Built with a reusable `<ImageComparisonSlider />` (from-scratch, no third-party library):
- Draggable handle (pointer + mouse + touch + keyboard arrows)
- Smooth 60fps updates via requestAnimationFrame + direct style writes (no re-render lag)
- Native DOM listeners for reliable mouse/touch support
- PREVENTED text selection / scroll-while-dragging
- Accepts React nodes, so real `next/image` components can be swapped in
- Stylised before/after previews (honest placeholders, no fake screenshots)
- Backed by per-case-study `beforeAfter` data in `src/lib/case-studies.ts`

## Services mega menu

The navbar "Services" dropdown is now a premium 3-panel mega menu (`ServicesMegaMenu`):
- LEFT: Featured service cards (Website Development, SEO, AI SEO, Website Redesign) with lift/spotlight hover + "Most popular" badge
- CENTER: All 12 services grouped (Web Development / SEO / Content) with icons, one-line descriptions, left-border hover animation
- RIGHT: Promotional panel ("Not Sure Which Service You Need?") with animated chart, Free SEO Audit badge, Book Free Consultation + View Portfolio CTAs
- BOTTOM: full-width footer with trust points (Custom Solutions, SEO Optimized, Fast Performance, Mobile Responsive, AI-Powered Strategy) + "View All Services"

Animations: fade/scale/blur open, staggered card entrances, icon rotate/gradient transitions, button shine sweep. Desktop ~1280px, rounded-3xl, glass. On mobile/tablet it becomes an elegant accordion with the same hierarchy. Accessibility: hover + click toggle, Escape to close, outside-click close, ARIA menu/expanded attributes, keyboard-navigable links.

## Branded image assets

Context-specific, optimized WebP assets are stored in `public/images/custom/` and loaded through `next/image`. The custom editorial visuals are generated for Webamazee and carry the official Webamazee lockup as an integrated brand mark.

- `custom/hero-growth-studio.webp` — home hero and growth visual
- `custom/service-*.webp` — service-specific website, SEO, AI, landing-page and commerce visuals
- `custom/faq-strategy-studio.webp` — FAQ strategy visual
- `custom/product-*.webp` — lead-management product visuals
- `portfolio/*.webp` and `case-studies/*.png` — published client project imagery

Functional score rings, icons, gradients and decorative SVG backgrounds remain unchanged where they are part of the interface rather than the main visual asset.

## Enterprise SEO architecture

Centralized, data-driven SEO system (Next.js 15 App Router best practices).

### Structure
```
src/
├── data/index.ts          # content registry — all content types + SEO entry builders
├── lib/
│   ├── site.ts            # single source of truth (brand, contact, social, area served)
│   ├── seo.ts             # SeoEntry type + url/date helpers
│   ├── metadata.ts        # generateMetadata() -> full Next Metadata (canonical, OG, Twitter, robots)
│   ├── schema.ts          # JSON-LD generators (Org, WebSite, Service, Article, FAQ, CreativeWork, Breadcrumb)
│   ├── content-seo.ts     # per-content-type metadata+schema bundles (getServiceSeo, getBlogSeo, ...)
│   ├── breadcrumbs.ts / openGraph.ts / twitter.ts
│   └── static-pages.ts    # metadata for all static pages
└── components/seo/json-ld.ts  # <JsonLd /> + <GlobalSchema /> renderer
```

### How it works
- **Add a service/blog/case-study/portfolio** to the data files → `sitemap.ts`, `generateMetadata()`, and JSON-LD all update automatically. No per-page edits.
- **Global schema** (Organization + ProfessionalService + LocalBusiness + WebSite + SearchAction) renders on every page via `<GlobalSchema />`.
- **BreadcrumbList** auto-generated for every inner page.
- **Service / BlogPosting / FAQPage / CreativeWork** schema generated from data.
- **Canonical, OpenGraph, Twitter, robots** all centralized.

### CMS-ready
Swap the `getAll*` imports in `src/data/index.ts` for a Sanity/Payload/Strapi/Contentful client and the whole SEO layer keeps working.

### Validation
Verified across 30+ routes: single H1, no duplicate titles/descriptions, canonical on every page, valid JSON-LD (28 blocks), OpenGraph + Twitter present, sitemap (38 URLs) and robots auto-generated.
