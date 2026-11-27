import type { Metadata } from "next";
import { staticMetadata } from "@/lib/static-pages";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { buildSitemap, countSitemapLinks } from "@/lib/sitemap-pages";
import { getPublishedPosts } from "@/lib/cms/public-blogs";
import { SitemapDirectory } from "@/components/sitemap/sitemap-directory";

export const metadata: Metadata = staticMetadata("sitemap");
export const revalidate = 60;

export default async function SitemapPage() {
  const publishedPosts = await getPublishedPosts();
  const sections = buildSitemap(publishedPosts);
  const totalLinks = countSitemapLinks(sections);

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ label: "Sitemap" }], "/sitemap")]} />
      <SitemapDirectory sections={sections} totalLinks={totalLinks} />
    </>
  );
}
