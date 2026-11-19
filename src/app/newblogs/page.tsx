import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getAllPosts } from "@/lib/blogs";
import { site } from "@/lib/site";
import { CALENDLY_URL } from "@/components/newhome/newhome-data";
import { BlogDiscovery } from "./blog-discovery";
import { NewsletterForm } from "./newsletter-form";

const title = "Digital Growth Insights | Webamazee Blog";
const description =
  "Explore practical Webamazee insights on SEO, AI search, website development and digital marketing.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${site.url}/newblogs` },
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description,
    url: `${site.url}/newblogs`,
    siteName: site.name,
    type: "website",
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: "Webamazee — digital growth insights" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [site.ogImage] },
};

export default function NewBlogsPage() {
  // The existing registry is the source of published article dates and metadata.
  const articles = getAllPosts()
    .slice()
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .map(({ slug, image, alt, title: articleTitle, excerpt, category, date, readTime }) => ({
      slug,
      image,
      alt,
      title: articleTitle,
      excerpt,
      category,
      date,
      readTime,
    }));
  const featured = articles[0];

  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div id="main-content" className="overflow-x-clip">
        <section className="border-b border-slate-200/80 bg-[#f4f8ff] py-10">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="grid items-end gap-7 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-8">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">The Webamazee Journal</p>
                <h1 className="mt-4 max-w-3xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.55rem]">
                  Ideas, Insights &amp; Strategies for <span className="text-[#0f6dff]">Digital Growth.</span>
                </h1>
                <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-slate-600 sm:text-[18.5px]">
                  Practical insights on SEO, AI, website development and digital marketing to help your business grow online.
                </p>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end lg:pb-1">
                <a href="#latest-insights" className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl bg-[#0f6dff] px-7 text-[15px] font-semibold text-white shadow-[0_10px_26px_-6px_rgba(15,109,255,0.4)] transition-colors hover:bg-[#0b57d0]">
                  Explore Insights <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {featured && (
          <section className="border-b border-slate-200/80 bg-white py-10" aria-labelledby="featured-heading">
            <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[#0f6dff]" />
                <h2 id="featured-heading" className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">Featured Article</h2>
              </div>
              <article className="grid overflow-hidden rounded-2xl border border-slate-200/90 bg-[#f7f9fc] lg:grid-cols-12">
                <Link href={`/blog/${featured.slug}`} aria-label={`Read ${featured.title}`} className="group block min-w-0 bg-[#eef3f9] p-3 sm:p-4 lg:col-span-7">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-white">
                    <Image src={featured.image} alt={featured.alt} fill priority sizes="(max-width: 1023px) 100vw, 58vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none" />
                  </div>
                </Link>
                <div className="flex flex-col items-start justify-center p-6 sm:p-8 lg:col-span-5 lg:px-10">
                  <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">{featured.category}</p>
                  <h3 className="mt-3 font-display text-2xl font-bold leading-[1.15] tracking-[-0.025em] text-[#0b1528] sm:text-3xl">{featured.title}</h3>
                  <p className="mt-4 line-clamp-2 text-[15px] leading-relaxed text-slate-600">{featured.excerpt}</p>
                  <p className="mt-5 text-[13px] font-medium text-slate-500">{featured.date} <span aria-hidden="true" className="px-1.5">·</span> {featured.readTime}</p>
                  <Link href={`/blog/${featured.slug}`} className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-5 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#0b57d0]">
                    Read Article <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </div>
          </section>
        )}

        <section id="latest-insights" className="scroll-mt-24 bg-white py-10">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">Explore the Journal</p>
                <h2 className="mt-2.5 font-display text-3xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">Ideas for your next move.</h2>
              </div>
              <p className="max-w-sm text-[15px] leading-relaxed text-slate-600">Browse practical perspectives for building a stronger digital presence.</p>
            </div>
            <BlogDiscovery articles={articles} />
          </div>
        </section>

        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-10" aria-labelledby="newsletter-heading">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-10">
              <div className="lg:col-span-6">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">Stay in the Loop</p>
                <h2 id="newsletter-heading" className="mt-2 font-display text-2xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-3xl">Useful insights, straight to your inbox.</h2>
                <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">Request updates on search, websites and digital marketing.</p>
              </div>
              <div className="lg:col-span-6"><NewsletterForm /></div>
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-8 rounded-3xl border border-[#1a2c4e] bg-[#0b1528] px-6 py-10 text-white sm:px-12 lg:grid-cols-12 lg:px-16">
              <div className="lg:col-span-8">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8ec5ff]">Start a Conversation</p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.025em] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">Need a Strategy for Your Business?</h2>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-slate-300">Let&apos;s turn the right insights into a practical growth plan.</p>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-xl bg-[#0f6dff] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[#257bff]">
                  Book a Free Strategy Call <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
