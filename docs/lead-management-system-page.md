# Webamazee Lead Management System Product Page

This document only covers the **Lead Management System** product landing page and its integration. It does not document the rest of the Webamazee website.

---

## 1. Purpose of this page

`/products/lead-management-system` is a **product landing / showcase page** for the *Webamazee Lead Management System* — a CRM-style workspace for digital marketing agencies. It explains and markets the product. It is **not** the actual CRM/dashboard application.

---

## 2. Product page route

```
/products/lead-management-system
```

There is also a lightweight **Our Products index** at:

```
/products
```

---

## 3. Main files created

| File | Purpose |
|------|---------|
| `src/lib/products.ts` | Central product registry (data + SEO fields + helpers) |
| `src/app/products/page.tsx` | "Our Products" index page |
| `src/app/products/lead-management-system/page.tsx` | Product landing page (composes the section components) |
| `src/components/product/lead-management-system/*.tsx` | All product page section components |

---

## 4. Component structure

```
src/app/products/lead-management-system/page.tsx
└── renders, in order:
    ├── <ProductHero/>            → hero + dashboard mockup
    ├── <ProductProblem/>         → pain-point cards
    ├── <ProductSolution/>        → "One Workspace" pillars
    ├── <ProductFeatures/>        → 12-feature grid
    ├── <ProductAgencyFeatures/>  → agency workflows + qualification fields
    ├── <ProductPipeline/>        → sales pipeline visual
    ├── <ProductLeadIntelligence/>→ lead scoring tiers
    ├── <ProductAnalytics/>       → analytics dashboard preview
    ├── <ProductWorkflow/>        → Capture → Qualify → Assign → Follow Up → Convert
    ├── <ProductAudience/>        → who it's for
    └── <ProductCTA/>             → final CTA
```

All components live in `src/components/product/lead-management-system/`.

---

## 5. Where the product content is stored

The **central product content + SEO** lives in `src/lib/products.ts`:

```ts
export const products: Product[] = [
  {
    slug: "lead-management-system",
    name: "Lead Management System",
    metaTitle: "Lead Management System for Digital Marketing Agencies",
    metaDescription: "Webamazee Lead Management System helps ...",
    path: "/products/lead-management-system",
    ...
  },
];
```

Section copy lives directly in each component under `src/components/product/lead-management-system/` (e.g. feature names in `product-features.tsx`, pipeline stages in `product-pipeline.tsx`).

---

## 6. How the navbar "Our Products" item is connected

The navbar renders **Products** from data, not hardcoded links:

- `src/lib/nav.ts` exports `productLinks` (built from `src/lib/products.ts`) and adds `Products` to `mainNav`.
- `src/components/layout/navbar.tsx`:
  - **Desktop:** renders a **Products dropdown** that lists every entry in `productLinks` (icon + "Our Products" heading). Hover or click to open.
  - **Mobile:** renders a **Products accordion** (expandable) listing the same product links.

Because the dropdown is driven by `productLinks`, adding a future product to `src/lib/products.ts` automatically adds it to the desktop dropdown and the mobile accordion.

---

## 7. How to change the product page content

Edit the section components directly:

- Hero copy → `product-hero.tsx`
- Problems → `product-problem.tsx`
- Solution pillars → `product-solution.tsx`
- Features → `product-features.tsx` (the `features` array)
- Agency workflows → `product-agency-features.tsx`
- Pipeline stages/cards → `product-pipeline.tsx`
- Scoring tiers → `product-lead-intelligence.tsx`
- Analytics stats → `product-analytics.tsx`
- Workflow steps → `product-workflow.tsx`
- Audience → `product-audience.tsx`
- Final CTA → `product-cta.tsx`

---

## 8. How to change the product page hero

Edit `src/components/product/lead-management-system/product-hero.tsx`:

- **Eyebrow / heading / copy / CTAs:** the left-side copy block.
- **Product mockup:** the right-side dashboard built from HTML/CSS/SVG. Add/remove stat tiles, lead rows, and floating cards there.

---

## 9. How to add/remove features

Edit the `features` array at the top of `product-features.tsx`:

```ts
const features = [
  { icon: Users, title: "Lead Management", desc: "..." },
  ...
];
```

Each item needs a Lucide `icon`, a `title`, and a `desc`. Add/remove entries to change the grid.

---

## 10. How to change CTA buttons

- **Hero:** in `product-hero.tsx` — `primaryCta` ("Get Early Access") and `secondaryCta` ("Explore Features") link to `/contact` and `#features`.
- **Final CTA:** in `product-cta.tsx` — "Get Early Access" and "Talk to Our Team" buttons.

Update the labels/hrefs in those two files.

---

## 11. How to change the product mockup

The product mockup is the right-side dashboard in `product-hero.tsx`. It is pure JSX/Tailwind (no images). To change it:

- Edit the stat tiles, lead rows, and floating cards inside `ProductHero`.
- All styling uses the existing Webamazee design system (brand blues, glassmorphism, soft shadows).

---

## 12. How to add the product to the sitemap

The sitemap is **data-driven**. Adding a product to `src/lib/products.ts` automatically adds its route to the sitemap:

- `src/app/sitemap.ts` reads `productSlugs` from `sitemapContent()` (in `src/data/index.ts`).
- `src/data/index.ts` derives `productSlugs` from `products` in `src/lib/products.ts`.

No manual sitemap edits are needed when adding a product.

---

## 13. How to modify SEO metadata

The product SEO is centralized in `src/lib/products.ts` (fields `metaTitle`, `metaDescription`, `path`, etc.).

`src/app/products/lead-management-system/page.tsx` builds metadata via:

```ts
import { productEntry } from "@/data";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
// ...
export async function generateMetadata() {
  const entry = productEntry("lead-management-system");
  return entry ? buildMetadata(entry) : {};
}
```

Canonical, OpenGraph, and Twitter tags are generated automatically from the entry. Do **not** edit other pages' metadata.

---

## 14. How to add another product later

1. Add a new entry to the `products` array in `src/lib/products.ts`.
2. Create its route folder: `src/app/products/{slug}/page.tsx` (copy the structure of `lead-management-system/page.tsx`).
3. Create its section components under `src/components/product/{slug}/`.
4. Rebuild.

The navbar dropdown + mobile accordion (driven by `productLinks`) and the sitemap (driven by `productSlugs`) will include the new product automatically.

---

## 15. Important integration notes

- The product page reuses the existing design system (buttons, reveals, spotlight cards, section headers, `max-w-[1350px]` container). No new global styles were added.
- The page does **not** touch global layout metadata, footer, or other pages.
- Metadata uses the centralized `generateMetadata` helper — do not add hardcoded `<head>` tags.

---

## 16. Which existing files were minimally modified

Only these existing files were touched, and each was changed as small as possible:

| File | Change |
|------|--------|
| `src/lib/nav.ts` | Added `Products` to `mainNav`; added `productLinks` + `footerProductLinks` |
| `src/components/layout/navbar.tsx` | Added a Products dropdown (desktop) + Products accordion (mobile); added `productsOpen`/`mobileProducts` state |
| `src/data/index.ts` | Re-exported products; added `productEntry`; added `productSlugs` to `sitemapContent` |
| `src/app/sitemap.ts` | Added `productPages` to the sitemap output |

No other existing pages, components, content, contact details, images, or styles were modified.

---

## 17. How to safely copy/integrate this product page into another local copy of the Webamazee website

If you downloaded this workspace and want to add the product page to your own locally customized Webamazee project, copy these files and apply these small edits:

**Files to copy:**

```
src/lib/products.ts
src/app/products/page.tsx
src/app/products/lead-management-system/page.tsx
src/components/product/lead-management-system/   (entire folder)
docs/lead-management-system-page.md               (optional)
```

**Edits to existing files in your local project:**

1. `src/lib/nav.ts` — add:
   ```ts
   import { products } from "./products";
   // add "Products" to mainNav (after Services)
   // add:
   export const productLinks = products.map((p) => ({
     label: p.name, href: p.path, short: p.shortName,
   }));
   ```

2. `src/components/layout/navbar.tsx` — add the **Products dropdown** (desktop) and **Products accordion** (mobile) exactly as in this workspace's navbar, using `productLinks`. Import `productLinks` and add `productsOpen` / `mobileProducts` state.

3. `src/data/index.ts` — import/re-export products and add `productSlugs` to `sitemapContent`.

4. `src/app/sitemap.ts` — add a `productPages` block.

**Important:** your local project must have the same data/SEO helpers this page relies on:
- `src/data/index.ts` (with `productEntry`) and `src/lib/metadata.ts` (with `generateMetadata`) — if your project uses a different metadata pattern, adapt `generateMetadata` in the product page accordingly.
- The design-system components used by the sections: `Button`, `Reveal`, `SectionHeader`, `SpotlightCard`, `staggerContainer`/`staggerItem`, `Words`.

If your project differs in structure, the quickest path is to keep this page self-contained: you can inline the metadata (instead of `productEntry`/`buildMetadata`) and replace the shared UI imports with your own equivalents.
