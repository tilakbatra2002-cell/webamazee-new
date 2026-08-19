/**
 * Centralized product registry.
 *
 * Each product is a fully data-driven entry used to derive:
 * - navigation ("Our Products" dropdown)
 * - the product landing page content
 * - SEO metadata / OpenGraph / canonical
 * - sitemap entries
 *
 * To add a future product: add a new object here, create its route folder
 * under `src/app/products/{slug}/`, and it appears in the navbar + sitemap
 * automatically (see src/components/layout/navbar.tsx and src/app/sitemap.ts).
 */

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  /** Icon key resolved via the project's ServiceIcon-style registry. */
  icon: string;
  eyebrow: string;
  heading: string;
  supportingCopy: string;
  primaryCta: string;
  secondaryCta: string;
  status: string;
  path: string;
};

export const products: Product[] = [
  {
    slug: "lead-management-system",
    name: "Lead Management System",
    shortName: "Lead Management System",
    tagline: "Built for Digital Marketing Agencies",
    metaTitle: "Lead Management System for Digital Marketing Agencies",
    metaDescription:
      "Webamazee Lead Management System helps digital marketing agencies capture, qualify, organize, and convert leads with a powerful agency-focused CRM workspace.",
    icon: "Layers",
    eyebrow: "WEBAMAZEE PRODUCT",
    heading: "Lead Management System",
    supportingCopy:
      "Capture, organize, qualify, follow up, and convert your leads from one powerful workspace built specifically for modern digital marketing agencies.",
    primaryCta: "Get Early Access",
    secondaryCta: "Explore Features",
    status: "Early Access",
    path: "/products/lead-management-system",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}
