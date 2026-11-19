import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CALENDLY_URL } from "@/components/newhome/newhome-data";
import { site } from "@/lib/site";
import { FaqExplorer } from "./faq-explorer";

const title = "Frequently Asked Questions | Webamazee";
const description =
  "Find answers about Webamazee's website development, SEO, services, project process and how to get in touch.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${site.url}/newfaq` },
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    url: `${site.url}/newfaq`,
    siteName: site.name,
    type: "website",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: "Frequently asked questions about Webamazee" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [site.ogImage] },
};

export default function NewFaqPage() {
  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div id="main-content" className="overflow-x-clip">
        <FaqExplorer />
        <section className="border-t border-slate-200/80 bg-[#f7f9fc] py-10">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-7 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">Let&apos;s Talk</p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-4xl">Still Have Questions?</h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-[16px]">Our team is happy to help you find the right solution for your business.</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                <Link href="/contact" className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-[15px] font-semibold text-white shadow-[0_10px_26px_-6px_rgba(15,109,255,0.4)] transition-colors hover:bg-[#0b57d0]">
                  Contact Us <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-[15px] font-semibold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]">
                  Book a Free Consultation <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
