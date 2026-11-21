import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { getLocationPage } from "@/lib/locations";
import { locationSchema } from "@/lib/location-seo";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { UkWebDesignRedesign } from "./uk-web-design-redesign";

const slug = "web-designing-company-united-kingdom";
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
      category: "Web Design",
      noindex: true,
      nofollow: true,
    })
  : {
      robots: { index: false, follow: false },
    };

export default function NewWebDesigningUkPage() {
  if (!page) notFound();

  return (
    <>
      <JsonLd data={locationSchema(page)} />
      <UkWebDesignRedesign page={page} />
    </>
  );
}
