import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import { TermsPreview } from "./terms-preview";

const pagePath = "/new-terms-and-conditions";
const pageUrl = `${site.url}${pagePath}`;
const pageTitle = "Terms & Conditions";
const pageDescription =
  "These terms explain the conditions that apply when you access Webamazee's website and use our digital services.";

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

export default function NewTermsAndConditionsPage() {
  return <TermsPreview />;
}
