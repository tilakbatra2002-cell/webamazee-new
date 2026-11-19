import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { ProjectGrid } from "./project-grid";

const title = "Our Work | Webamazee Portfolio";
const description =
  "Explore websites, online stores and digital experiences created by Webamazee for businesses and organisations.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${site.url}/newportfolio` },
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    url: `${site.url}/newportfolio`,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "Webamazee — websites and digital experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [site.ogImage],
  },
};

export default function NewPortfolioPage() {
  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div id="main-content" className="overflow-x-clip">
        <section className="border-b border-slate-200/80 bg-[#f4f8ff] py-10">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="grid items-end gap-7 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-8">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">Our Work</p>
                <h1 className="mt-4 max-w-3xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.55rem]">
                  Digital Experiences Built to <span className="text-[#0f6dff]">Make an Impact.</span>
                </h1>
                <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-slate-600 sm:text-[18.5px]">
                  Explore websites, online stores and digital experiences created for real businesses and organisations.
                </p>
                <a href="#projects" className="mt-7 inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl bg-[#0f6dff] px-7 text-[15px] font-semibold text-white shadow-[0_10px_26px_-6px_rgba(15,109,255,0.4)] transition-colors hover:bg-[#0b57d0]">
                  Explore Projects <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="max-w-sm border-l-2 border-[#0f6dff]/25 pl-5 lg:col-span-4 lg:mb-1">
                <p className="font-display text-lg font-bold leading-snug text-[#0b1528]">Built around real business needs.</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">From online stores to service websites, every project starts with a clear purpose.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 bg-white py-10">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">Selected Projects</p>
                <h2 className="mt-2.5 font-display text-3xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">Work made with purpose.</h2>
              </div>
              <p className="max-w-sm text-[15px] leading-relaxed text-slate-600">A selection of digital experiences built for different businesses and their audiences.</p>
            </div>
            <ProjectGrid />
          </div>
        </section>

        <section className="bg-white py-10">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-8 rounded-3xl border border-[#1a2c4e] bg-[#0b1528] px-6 py-10 text-white sm:px-12 lg:grid-cols-12 lg:px-16">
              <div className="lg:col-span-8">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8ec5ff]">Start a Conversation</p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.025em] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">Have a Project in Mind?</h2>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-slate-300">Tell us what you&apos;re building and let&apos;s find the right way to bring it online.</p>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <Link href="/contact" className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl bg-[#0f6dff] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[#257bff]">
                  Let&apos;s Talk <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
