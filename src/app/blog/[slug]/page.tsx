import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Clock,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { BlogCover } from "@/components/blog/blog-cover";
import { RichContent } from "@/components/blog/rich-content";
import { ArticleSidebar, ArticleMobileToc, type TocItem } from "@/components/blog/article-sidebar";
import { buildToc, shouldShowToc } from "@/lib/blog-headings";
import { SocialShare } from "@/components/blog/social-share";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getPublishedAdjacentPosts,
  getPublishedPostBySlug,
  getPublishedPosts,
  getPublishedPostSlugs,
} from "@/lib/cms/public-blogs";
import { getBlogSeo } from "@/lib/content-seo";

interface Params {
  params: Promise<{ slug: string }>;
}

const CONTAINER = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPublishedPostSlugs();
  return slugs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return (await getBlogSeo(slug))?.metadata ?? {};
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const [{ prev, next }, allPosts, blogSeo] = await Promise.all([
    getPublishedAdjacentPosts(slug),
    getPublishedPosts(),
    getBlogSeo(slug),
  ]);
  const initials = post.author
    .split(" ")
    .map((n) => n[0])
    .join("");

  // The table of contents is always generated from the article's H2/H3 headings.
  // Stored `toc` data and manual TOC entry no longer drive it; legacy articles
  // that already contain an inline TOC block keep that block where it is.
  const generatedToc = buildToc(post.content);
  const tocItems: TocItem[] = generatedToc;
  const showToc = shouldShowToc(generatedToc);

  const sameCategory = allPosts.filter(
    (p) => p.slug !== slug && p.category === post.category
  );
  const others = allPosts.filter(
    (p) => p.slug !== slug && p.category !== post.category
  );
  const relatedPosts = [...sameCategory, ...others].slice(0, 3);

  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <JsonLd data={blogSeo?.schema ?? []} />

      <div id="main-content" className="overflow-x-clip">
        {/* 1. EDITORIAL ARTICLE HERO */}
        <header className="border-b border-slate-200/80 bg-[#f4f8ff] py-10">
          <div className={CONTAINER}>
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-slate-500">
                <li>
                  <Link href="/blog" className="transition-colors hover:text-[#0f6dff]">
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-[#0b1528]">
                  {post.category}
                </li>
              </ol>
            </nav>

            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
              {post.category}
            </p>

            <h1 className="mt-3 max-w-4xl font-display text-[2rem] font-bold leading-[1.12] tracking-[-0.028em] text-[#0b1528] sm:text-[2.65rem] lg:text-[3.05rem] text-balance">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-col gap-4 border-t border-slate-200/80 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0b1528] font-display text-xs font-bold text-white">
                    {initials}
                  </span>
                  <div>
                    <p className="text-[14px] font-bold leading-tight text-[#0b1528]">
                      {post.author}
                    </p>
                    <p className="text-[12px] text-slate-500">{post.authorRole}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-medium text-slate-600 sm:border-l sm:border-slate-300 sm:pl-5">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 text-[#0f6dff]" aria-hidden="true" />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-[#0f6dff]" aria-hidden="true" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <SocialShare title={post.title} />
            </div>
          </div>
        </header>

        {/* 2. ARTICLE CONTENT + STICKY SIDEBAR */}
        <section className="bg-white py-10">
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-12">
              <article className="min-w-0">
                <div className="mx-auto max-w-[780px] lg:mx-0">
                  {!post.inlineCover && (
                    <BlogCover
                      title={post.title}
                      category={post.category}
                      image={post.image}
                      alt={post.alt}
                    />
                  )}

                  {showToc && <ArticleMobileToc items={tocItems} />}

                  <RichContent blocks={post.content} />

                  {/* Author Bio */}
                  <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-[#f7f9fc] p-6 sm:flex-row sm:items-center sm:p-7">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[#0b1528] font-display text-base font-bold text-white">
                      {initials}
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#0f6dff]">
                        Written by
                      </p>
                      <p className="mt-1 font-display text-lg font-bold text-[#0b1528]">
                        {post.author}
                      </p>
                      <p className="mt-1 text-[14px] leading-relaxed text-slate-600">
                        {post.authorRole} at Webamazee. {post.author} helps businesses grow with a
                        blend of data, AI and proven strategy.
                      </p>
                    </div>
                  </div>

                  {/* Prev / Next Article Navigation */}
                  {(prev || next) && (
                    <nav
                      aria-label="Article navigation"
                      className="mt-8 grid gap-4 sm:grid-cols-2"
                    >
                      {prev ? (
                        <Link
                          href={`/blog/${prev.slug}`}
                          className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-[#0f6dff]"
                        >
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Older
                          </span>
                          <span className="mt-2 line-clamp-2 font-display text-[15px] font-bold leading-snug text-[#0b1528] transition-colors group-hover:text-[#0f6dff]">
                            {prev.title}
                          </span>
                        </Link>
                      ) : (
                        <div className="hidden sm:block" />
                      )}

                      {next && (
                        <Link
                          href={`/blog/${next.slug}`}
                          className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 text-right transition-colors hover:border-[#0f6dff]"
                        >
                          <span className="inline-flex items-center justify-end gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                            Newer <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                          <span className="mt-2 line-clamp-2 font-display text-[15px] font-bold leading-snug text-[#0b1528] transition-colors group-hover:text-[#0f6dff]">
                            {next.title}
                          </span>
                        </Link>
                      )}
                    </nav>
                  )}
                </div>
              </article>

              <aside className="lg:sticky lg:top-24 lg:self-start">
                <ArticleSidebar tocItems={tocItems} showToc={showToc} />
              </aside>
            </div>
          </div>
        </section>

        {/* 3. RELATED ARTICLES */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-slate-200/80 bg-[#f7f9fc] py-10">
            <div className={CONTAINER}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
                    Continue Reading
                  </p>
                  <h2 className="mt-2 font-display text-[1.75rem] font-bold leading-[1.15] tracking-[-0.025em] text-[#0b1528] sm:text-[2.15rem]">
                    Related Articles
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#0f6dff] hover:underline"
                >
                  View all articles
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-3">
                {relatedPosts.map((r) => (
                  <article
                    key={r.slug}
                    className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors hover:border-[#0f6dff]/50"
                  >
                    <Link
                      href={`/blog/${r.slug}`}
                      aria-label={`Read ${r.title}`}
                      className="block border-b border-slate-200/80 bg-white"
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-white">
                        <Image
                          src={r.image}
                          alt={r.alt ?? `${r.title} — featured image`}
                          fill
                          sizes="(max-width: 767px) 100vw, 33vw"
                          className="object-contain"
                        />
                      </div>
                    </Link>

                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                        {r.category}
                      </p>
                      <h3 className="mt-2 font-display text-[17px] font-bold leading-snug text-[#0b1528]">
                        <Link
                          href={`/blog/${r.slug}`}
                          className="transition-colors hover:text-[#0f6dff]"
                        >
                          {r.title}
                        </Link>
                      </h3>
                      <p className="mt-2 line-clamp-2 flex-1 text-[13.5px] leading-relaxed text-slate-600">
                        {r.excerpt}
                      </p>
                      <p className="mt-4 flex items-center gap-2 border-t border-slate-200/80 pt-3.5 text-[12px] font-medium text-slate-500">
                        <span>{r.date}</span>
                        <span aria-hidden="true">·</span>
                        <span>{r.readTime}</span>
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
