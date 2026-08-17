import type { Metadata } from "next";
import { staticMetadata } from "@/lib/static-pages";
import Link from "next/link";
import Image from "next/image";
import { Newspaper, ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/layout/cta-banner";
import { Reveal } from "@/components/ui/reveal";
import { getAllPosts } from "@/lib/blogs";

export const metadata: Metadata = staticMetadata("blog");

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHero
        eyebrow="Blog & Insights"
        title="Strategies to help you"
        highlight="grow online"
        subtitle="Actionable guides on SEO, AI, web design and digital marketing — no fluff, just what works."
        crumbs={[{ label: "Blog" }]}
      />

      <section className="bg-white pb-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/20 hover:shadow-glow"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={`${p.title} — featured image`}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute bottom-4 left-4 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white shadow-glow">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand-700">
                      {p.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                      {p.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" /> {p.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" /> {p.readTime}
                        </span>
                      </div>
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-slate-400 transition-all duration-300 group-hover:border-brand-600 group-hover:bg-brand-gradient group-hover:text-white">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Want tailored advice for your business?"
        subtitle="Book a free strategy call and get a personalised growth roadmap."
      />
    </>
  );
}
