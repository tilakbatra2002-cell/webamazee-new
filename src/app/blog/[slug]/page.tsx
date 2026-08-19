import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays, Clock, ArrowLeft, ArrowRight, User,
} from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { BlogCover } from "@/components/blog/blog-cover";
import { RichContent } from "@/components/blog/rich-content";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { SocialShare } from "@/components/blog/social-share";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllPosts, getPost, getAdjacentPosts } from "@/lib/blogs";
import { getBlogSeo } from "@/lib/content-seo";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return getBlogSeo(slug)?.metadata ?? {};
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { prev, next } = getAdjacentPosts(slug);
  const initials = post.author
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <>
      <JsonLd data={getBlogSeo(slug)?.schema ?? []} />

      {/* Breadcrumb + title + meta header (unchanged) */}
      <PageHero
        eyebrow={post.category}
        title={post.title}
        crumbs={[{ label: "Blog", href: "/blog" }, { label: "Article" }]}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4" /> {post.author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" /> {post.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {post.readTime}
          </span>
        </div>
      </PageHero>

      {/* Article + Sidebar */}
      <section className="bg-white pb-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-[52px]">
            {/* LEFT COLUMN */}
            <div className="min-w-0">
              <div className="mx-auto max-w-[800px]">
                <BlogCover title={post.title} category={post.category} image={post.image} />

                {/* Author card + meta + share */}
                <Reveal>
                  <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-gradient font-display text-sm font-bold text-white shadow-glow">
                        {initials}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink">{post.author}</p>
                        <p className="text-xs text-slate-500">{post.authorRole}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:justify-start">
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-4 w-4 text-brand-600" /> {post.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-brand-600" /> {post.readTime}
                        </span>
                      </div>
                      <SocialShare title={post.title} />
                    </div>
                  </div>
                </Reveal>

                {/* Body */}
                <div className="mt-8 border-t border-line pt-8">
                  <RichContent blocks={post.content} />
                </div>

                {/* Author bio */}
                <Reveal className="mt-12">
                  <div className="flex flex-col gap-5 rounded-3xl border border-line bg-surface p-7 shadow-soft sm:flex-row sm:items-center">
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-brand-gradient font-display text-lg font-bold text-white shadow-glow">
                      {initials}
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                        Written by
                      </p>
                      <p className="mt-0.5 font-display text-lg font-bold text-ink">{post.author}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">
                        {post.authorRole} at Webamazee. {post.author} helps businesses
                        grow with a blend of data, AI and proven strategy.
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Prev / Next */}
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  {prev ? (
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600/25 hover:shadow-glow"
                    >
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                        <ArrowLeft className="h-3.5 w-3.5" /> Older
                      </span>
                      <span className="mt-2 line-clamp-2 text-sm font-semibold text-slate-700 transition-colors group-hover:text-brand-700">
                        {prev.title}
                      </span>
                    </Link>
                  ) : (
                    <div className="hidden sm:block" />
                  )}
                  {next && (
                    <Link
                      href={`/blog/${next.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 text-right shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600/25 hover:shadow-glow"
                    >
                      <span className="inline-flex items-center justify-end gap-1.5 text-xs font-semibold text-slate-400">
                        Newer <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                      <span className="mt-2 line-clamp-2 text-sm font-semibold text-slate-700 transition-colors group-hover:text-brand-700">
                        {next.title}
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:sticky lg:top-[110px] lg:self-start">
              <BlogSidebar currentSlug={slug} />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
