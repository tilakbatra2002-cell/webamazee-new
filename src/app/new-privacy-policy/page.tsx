import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import { PrivacyPolicyPreview } from "./privacy-policy-preview";

const pagePath = "/new-privacy-policy";
const pageUrl = `${site.url}${pagePath}`;
const pageTitle = "Privacy Policy";
const pageDescription =
  "Learn how Webamazee collects, uses, protects and manages your personal information when you visit our website or interact with our services.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
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
        alt: `${pageTitle} | ${site.name}`,
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

export default function NewPrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Privacy Policy", href: pagePath },
        ])}
      />
      <PrivacyPolicyPreview />
    </>
  );
}
