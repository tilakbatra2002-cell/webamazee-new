import type { Metadata } from "next";
import { site } from "@/lib/site";
import { NewHomeHeader } from "@/components/newhome/newhome-header";
import { NewHomeHero } from "@/components/newhome/newhome-hero";
import { NewHomeClientTrust } from "@/components/newhome/newhome-client-trust";
import { NewHomeServices } from "@/components/newhome/newhome-services";
import { NewHomeCaseStudies } from "@/components/newhome/newhome-case-studies";
import { NewHomeWhy } from "@/components/newhome/newhome-why";
import { NewHomeProcess } from "@/components/newhome/newhome-process";
import { NewHomeTestimonials } from "@/components/newhome/newhome-testimonials";
import { NewHomePricing } from "@/components/newhome/newhome-pricing";
import { NewHomeFinalCta } from "@/components/newhome/newhome-final-cta";
import { NewHomeFooter } from "@/components/newhome/newhome-footer";

export const metadata: Metadata = {
  title: {
    absolute:
      "Websites & Digital Marketing Agency | Webamazee",
  },
  description:
    "From professional websites to SEO and digital marketing, Webamazee helps businesses in Chandigarh Tricity and worldwide build a stronger online presence.",
  alternates: {
    canonical: `${site.url}/newhome`,
  },
  openGraph: {
    title: "Websites & Digital Marketing That Grow Your Business | Webamazee",
    description:
      "From professional websites to SEO and digital marketing, we help businesses build a stronger online presence.",
    url: `${site.url}/newhome`,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "Webamazee — Websites & Digital Marketing Agency",
      },
    ],
  },
};

export default function NewHomePage() {
  return (
    <div className="min-h-screen bg-white text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0]">
      <NewHomeHeader />
      <main id="main-content" className="overflow-x-clip">
        <NewHomeHero />
        <NewHomeClientTrust />
        <NewHomeServices />
        <NewHomeCaseStudies />
        <NewHomeWhy />
        <NewHomeProcess />
        <NewHomeTestimonials />
        <NewHomePricing />
        <NewHomeFinalCta />
      </main>
      <NewHomeFooter />
    </div>
  );
}
