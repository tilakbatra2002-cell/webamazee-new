import "server-only";

import { unstable_cache } from "next/cache";
import type { Post } from "@/lib/blog-types";
import { getAllPosts as getStaticPosts } from "@/lib/blogs";
import { getCollections } from "@/lib/db/mongodb";
import { isMongoConfigured } from "./config";
import { parseDisplayDate } from "./slugify";
import type { BlogDocument, PostSummary, SerializedCmsSettings } from "./types";

function mapBlogDocToPost(doc: BlogDocument): Post {
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    image: doc.image,
    ...(doc.imageWidth != null ? { imageWidth: doc.imageWidth } : {}),
    ...(doc.imageHeight != null ? { imageHeight: doc.imageHeight } : {}),
    ...(doc.inlineCover ? { inlineCover: doc.inlineCover } : {}),
    alt: doc.alt,
    ...(doc.seoTitle ? { seoTitle: doc.seoTitle } : {}),
    ...(doc.metaDescription ? { metaDescription: doc.metaDescription } : {}),
    ...(doc.primaryKeyword ? { primaryKeyword: doc.primaryKeyword } : {}),
    ...(doc.secondaryKeywords?.length ? { secondaryKeywords: doc.secondaryKeywords } : {}),
    ...(doc.metaKeywords?.length ? { metaKeywords: doc.metaKeywords } : {}),
    ...(doc.absoluteTitle ? { absoluteTitle: doc.absoluteTitle } : {}),
    ...(doc.canonicalUrl ? { canonicalUrl: doc.canonicalUrl } : {}),
    ...(doc.ogTitle ? { ogTitle: doc.ogTitle } : {}),
    ...(doc.ogDescription ? { ogDescription: doc.ogDescription } : {}),
    ...(doc.ogImage ? { ogImage: doc.ogImage } : {}),
    ...(doc.noindex ? { noindex: doc.noindex } : {}),
    ...(doc.nofollow ? { nofollow: doc.nofollow } : {}),
    category: doc.category,
    date: doc.date,
    ...(doc.updatedDate ? { updatedDate: doc.updatedDate } : {}),
    readTime: doc.readTime,
    author: doc.author,
    authorRole: doc.authorRole,
    ...(doc.faqs?.length ? { faqs: doc.faqs } : {}),
    ...(doc.toc?.length ? { toc: doc.toc } : {}),
    content: doc.content ?? [],
    status: doc.status,
    ...(doc.publishedAt ? { publishedAt: doc.publishedAt.toISOString() } : {}),
    ...(doc.scheduledFor ? { scheduledFor: doc.scheduledFor.toISOString() } : {}),
  };
}

function sortPostsDescending(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    const aTime =
      (a.publishedAt ? Date.parse(a.publishedAt) : NaN) ||
      (parseDisplayDate(a.date)?.getTime() ?? 0);
    const bTime =
      (b.publishedAt ? Date.parse(b.publishedAt) : NaN) ||
      (parseDisplayDate(b.date)?.getTime() ?? 0);
    return bTime - aTime;
  });
}

const fetchCachedPublishedPosts = unstable_cache(
  async (): Promise<Post[]> => {
    if (!isMongoConfigured()) {
      return sortPostsDescending(getStaticPosts());
    }

    const { blogs } = await getCollections();
    const now = new Date();
    const docs = await blogs
      .find({
        status: "published",
        $or: [
          { publishedAt: { $exists: false } },
          { publishedAt: null },
          { publishedAt: { $lte: now } },
        ],
      })
      .sort({ publishedAt: -1, createdAt: -1 })
      .toArray();

    return sortPostsDescending(docs.map(mapBlogDocToPost));
  },
  ["published-blogs-list"],
  { tags: ["blogs"], revalidate: 60 }
);

const fetchCachedPublicBlogSettings = unstable_cache(
  async (): Promise<Pick<
    SerializedCmsSettings,
    "siteName" | "defaultOgImage" | "blogIndexTitle" | "blogIndexDescription" | "postsPerPage" | "timezone"
  > | null> => {
    if (!isMongoConfigured()) return null;
    try {
      const { settings } = await getCollections();
      const doc = await settings.findOne({ key: "default" });
      if (!doc) return null;
      return {
        siteName: doc.siteName,
        defaultOgImage: doc.defaultOgImage,
        blogIndexTitle: doc.blogIndexTitle,
        blogIndexDescription: doc.blogIndexDescription,
        postsPerPage: doc.postsPerPage,
        timezone: doc.timezone,
      };
    } catch {
      return null;
    }
  },
  ["public-blog-settings"],
  { tags: ["blogs", "cms-settings"], revalidate: 60 }
);

export async function getPublicBlogSettings() {
  return fetchCachedPublicBlogSettings();
}

export async function getPublishedPosts(): Promise<Post[]> {
  return fetchCachedPublishedPosts();
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | undefined> {
  if (!isMongoConfigured()) {
    return getStaticPosts().find((p) => p.slug === slug);
  }
  const all = await getPublishedPosts();
  return all.find((p) => p.slug === slug);
}

export async function getPublishedAdjacentPosts(
  slug: string
): Promise<{ prev?: Post; next?: Post }> {
  const all = await getPublishedPosts();
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return {
    prev: i < all.length - 1 ? all[i + 1] : undefined,
    next: i > 0 ? all[i - 1] : undefined,
  };
}

export async function getPublishedPostSlugs(options?: {
  excludeNoindex?: boolean;
}): Promise<{ slug: string; lastModified: Date }[]> {
  const all = await getPublishedPosts();
  const filtered = options?.excludeNoindex ? all.filter((p) => !p.noindex) : all;
  return filtered.map((p) => {
    const parsed =
      (p.updatedDate ? Date.parse(p.updatedDate) : NaN) ||
      (p.publishedAt ? Date.parse(p.publishedAt) : NaN) ||
      (parseDisplayDate(p.date)?.getTime() ?? Date.now());
    return {
      slug: p.slug,
      lastModified: new Date(parsed),
    };
  });
}

export async function getPublishedPostSummaries(limit?: number): Promise<PostSummary[]> {
  const all = await getPublishedPosts();
  const sliced = typeof limit === "number" ? all.slice(0, limit) : all;
  return sliced.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    image: p.image,
    alt: p.alt,
    category: p.category,
    date: p.date,
    readTime: p.readTime,
    author: p.author,
    authorRole: p.authorRole,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedDate,
  }));
}
