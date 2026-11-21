import type { MetadataRoute } from "next";
import { sitemapContent } from "@/data";
import { getPublishedPostSlugs } from "@/lib/cms/public-blogs";
import { site } from "@/lib/site";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;
  const {
    staticPaths,
    serviceSlugs,
    caseStudySlugs,
    portfolioSlugs,
    productSlugs,
    locationSlugs,
    locationHubSlugs,
    industrySlugs,
  } = sitemapContent();

  const publishedBlogs = await getPublishedPostSlugs({ excludeNoindex: true });

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

  const blogPages: MetadataRoute.Sitemap = publishedBlogs.map(({ slug, lastModified }) => ({
    url: `${base}/blog/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified,
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
