import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { getIntlCommercialLocationPage } from "@/lib/locations-commercial-intl";
import { commercialLocationSchema } from "@/lib/commercial-location-seo";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { UsaDigitalMarketingRedesign } from "./usa-digital-marketing-redesign";

const slug = "digital-marketing-company-usa";
const page = getIntlCommercialLocationPage(slug);

export const metadata: Metadata = page
  ? buildMetadata({
      title: page.metaTitle,
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      canonical: `/${slug}`,
      path: `/${slug}`,
      keywords: page.keywords,
      schemaType: "website",
      category: "Digital Marketing",
      noindex: true,
      nofollow: true,
    })
  : {
      robots: { index: false, follow: false },
    };

export default function NewDigitalMarketingUsaPage() {
  if (!page) notFound();

  return (
    <>
      <JsonLd data={commercialLocationSchema(page)} />
      <UsaDigitalMarketingRedesign page={page} />
    </>
  );
}
