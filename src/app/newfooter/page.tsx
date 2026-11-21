import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import { NewFooterPreview } from "./new-footer-preview";

const pagePath = "/newfooter";
const pageUrl = `${site.url}${pagePath}`;
const title = "Light-Theme Footer Design Preview";
const description =
  "Isolated review route previewing the proposed Webamazee light-theme global footer design.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: site.name,
    locale: site.defaultLocale,
    type: "website",
    images: [
      {
        url: absoluteUrl(site.ogImage),
        width: 1200,
        height: 630,
        alt: `${site.name} — ${title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    site: site.twitterHandle,
    images: [absoluteUrl(site.ogImage)],
  },
};

export default function NewFooterPage() {
  return <NewFooterPreview />;
}
