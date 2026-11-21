import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import { PricingRedesign } from "./pricing-redesign";

const pagePath = "/newpricing";
const pageUrl = `${site.url}${pagePath}`;
const pageTitle = "Web Development & Digital Marketing Pricing";
const pageDescription =
  "Transparent Webamazee pricing for website development, SEO, AI SEO and social media marketing — flexible monthly and one-time packages for businesses worldwide.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "web design pricing",
    "SEO packages",
    "digital marketing pricing",
    "AI SEO pricing",
    "social media marketing packages",
  ],
  alternates: { canonical: pageUrl },
  robots: { index: false, follow: false },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: site.name,
    locale: site.defaultLocale,
    type: "website",
    images: [
      {
        url: absoluteUrl(site.ogImage),
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    site: site.twitterHandle,
    images: [absoluteUrl(site.ogImage)],
  },
};

export default function NewPricingPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ label: "Pricing", href: pagePath }]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: pageTitle,
            description: pageDescription,
            url: pageUrl,
            isPartOf: { "@id": `${site.url}/#website` },
          },
        ]}
      />
      <PricingRedesign />
    </>
  );
}
