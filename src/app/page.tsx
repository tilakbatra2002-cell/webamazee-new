import type { Metadata } from "next";
import { site } from "@/lib/site";
import { NewHomeHero } from "@/components/newhome/newhome-hero";
import { NewHomeClientTrust } from "@/components/newhome/newhome-client-trust";
import { NewHomeServices } from "@/components/newhome/newhome-services";
import { NewHomeCaseStudies } from "@/components/newhome/newhome-case-studies";
import { NewHomeWhy } from "@/components/newhome/newhome-why";
import { NewHomeProcess } from "@/components/newhome/newhome-process";
import { NewHomeTestimonials } from "@/components/newhome/newhome-testimonials";
import { NewHomePricing } from "@/components/newhome/newhome-pricing";
import { NewHomeFinalCta } from "@/components/newhome/newhome-final-cta";

export const metadata: Metadata = {
  title: {
    absolute: "Websites & Digital Marketing Agency | Webamazee",
  },
  description:
    "From professional websites to SEO and digital marketing, Webamazee helps businesses in Chandigarh Tricity and worldwide build a stronger online presence.",
  keywords: [
    "web development agency",
    "website development agency",
    "SEO agency",
    "digital marketing agency",
    "web design services",
    "SEO services",
    "AI SEO agency",
    "eCommerce website development",
    "website development services",
    "digital growth agency",
  ],
  alternates: {
    canonical: `${site.url}/`,
  },
  openGraph: {
    title: "Websites & Digital Marketing That Grow Your Business | Webamazee",
    description:
      "From professional websites to SEO and digital marketing, we help businesses build a stronger online presence.",
    url: `${site.url}/`,
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

export default function Home() {
  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div id="main-content" className="overflow-x-clip">
        <NewHomeHero />
        <NewHomeClientTrust />
        <NewHomeServices />
        <NewHomeCaseStudies />
        <NewHomeWhy />
        <NewHomeProcess />
        <NewHomeTestimonials />
        <NewHomePricing />
        <NewHomeFinalCta />
      </div>
    </div>
  );
}
