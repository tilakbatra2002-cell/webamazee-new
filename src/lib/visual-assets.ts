/**
 * Context-specific editorial assets used in place of the former generic
 * dashboard illustrations. Each file is a custom Webamazee-branded visual.
 */
export const serviceHeroVisuals: Record<string, string> = {
  "website-development": "/images/custom/service-website-development.webp",
  "website-redesign": "/images/custom/service-website-redesign.webp",
  "landing-page-development": "/images/custom/service-landing-pages.webp",
  "ecommerce-development": "/images/custom/service-ecommerce.webp",
  "seo-services": "/images/custom/service-seo.webp",
  "ai-seo": "/images/custom/service-ai-seo.webp",
  "technical-seo": "/images/custom/service-website-development.webp",
  "local-seo": "/images/custom/faq-strategy-studio.webp",
  "ai-content-optimization": "/images/custom/service-ai-seo.webp",
  "google-ranking-growth": "/images/custom/service-seo.webp",
  "competitor-analysis": "/images/custom/product-analytics-studio.webp",
  "link-building": "/images/custom/hero-growth-studio.webp",
  "social-media-management": "/images/custom/service-landing-pages.webp",
  "social-media-marketing": "/images/custom/service-landing-pages.webp",
  "instagram-marketing": "/images/custom/service-landing-pages.webp",
  "facebook-marketing": "/images/custom/service-landing-pages.webp",
  "linkedin-marketing": "/images/custom/service-landing-pages.webp",
  "social-media-advertising": "/images/custom/product-analytics-studio.webp",
};

export function getServiceHeroVisual(slug: string): string {
  return serviceHeroVisuals[slug] ?? "/images/custom/service-seo.webp";
}
