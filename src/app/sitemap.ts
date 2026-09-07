import type { MetadataRoute } from "next";
import { sitemapContent } from "@/data";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const { staticPaths, serviceSlugs, blogSlugs, caseStudySlugs, portfolioSlugs, productSlugs, locationSlugs, locationHubSlugs, industrySlugs } =
    sitemapContent();

  const staticPages: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
    lastModified: new Date(),
  }));

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${base}/services/${slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: new Date(),
  }));

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: new Date(),
  }));

  const caseStudyPages: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${base}/case-studies/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: new Date(),
  }));

  const portfolioPages: MetadataRoute.Sitemap = portfolioSlugs.map((slug) => ({
    url: `${base}/work/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: new Date(),
  }));

  const productPages: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${base}/products/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: new Date(),
  }));

  // Location-based SEO landing pages — flat URLs, no /locations/ prefix
  const locationPages: MetadataRoute.Sitemap = locationSlugs.map((slug) => ({
    url: `${base}/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: new Date(),
  }));

  const locationHubPages: MetadataRoute.Sitemap = locationHubSlugs.map((slug) => ({
    url: `${base}/${slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: new Date(),
  }));

  // Industry SEO landing pages — flat URLs, no /industries/ prefix
  const industryPages: MetadataRoute.Sitemap = industrySlugs.map((slug) => ({
    url: `${base}/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: new Date(),
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...caseStudyPages,
    ...portfolioPages,
    ...productPages,
    ...locationPages,
    ...locationHubPages,
    ...industryPages,
  ];
}
