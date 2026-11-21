import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { getLocationPage } from "@/lib/locations";
import { locationSchema } from "@/lib/location-seo";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { UkSeoRedesign } from "./uk-seo-redesign";

const slug = "seo-services-united-kingdom";
const page = getLocationPage(slug);

export const metadata: Metadata = page
  ? buildMetadata({
      title: page.metaTitle,
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      canonical: `/${slug}`,
      path: `/${slug}`,
      keywords: page.keywords,
      schemaType: "website",
      category: "SEO",
      noindex: true,
      nofollow: true,
    })
  : {
      robots: { index: false, follow: false },
    };

export default function NewSeoServicesUkPage() {
  if (!page) notFound();

  return (
    <>
      <JsonLd data={locationSchema(page)} />
      <UkSeoRedesign page={page} />
    </>
  );
}
