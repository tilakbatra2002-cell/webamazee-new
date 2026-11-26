import type { Metadata } from "next";
import { staticMetadata } from "@/lib/static-pages";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { PricingRedesign } from "@/components/pricing/pricing-redesign";

export const metadata: Metadata = staticMetadata("pricing");

const pagePath = "/pricing";
const pageTitle = "Web Development & Digital Marketing Pricing";
const pageDescription =
  "Transparent Webamazee pricing for website development, SEO, AI SEO and social media marketing — flexible monthly and one-time packages for businesses worldwide.";

export default function PricingPage() {
  return (
    <>
      {/* Additive to the production baseline: breadcrumb + WebPage describing the
          pricing page. The global Organization/WebSite graph is emitted by the
          root layout, so no duplicate Organization node is created here. */}
      <JsonLd
        data={[
          breadcrumbSchema([{ label: "Pricing", href: pagePath }]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: pageTitle,
            description: pageDescription,
            url: `${site.url}${pagePath}`,
            isPartOf: { "@id": `${site.url}/#website` },
          },
        ]}
      />
      <PricingRedesign />
    </>
  );
}
