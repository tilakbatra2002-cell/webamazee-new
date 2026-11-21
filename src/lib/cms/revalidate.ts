import "server-only";

import { revalidatePath, revalidateTag } from "next/cache";

export function revalidateBlogPaths(slugs: (string | undefined)[] = []): void {
  try {
    revalidateTag("blogs", { expire: 0 });
  } catch {
    // Allow graceful execution in non-Next CLI contexts if ever invoked outside HTTP
  }

  const staticPaths = [
    "/blog",
    "/newblogs",
    "/blog/[slug]",
    "/sitemap.xml",
    "/sitemap",
    "/new-sitemap",
    "/faq",
  ];

  for (const path of staticPaths) {
    try {
      revalidatePath(path, path === "/blog/[slug]" ? "page" : undefined);
    } catch {
      // Ignore outside request context
    }
  }

  const uniqueSlugs = new Set(slugs.map((s) => s?.trim()).filter(Boolean) as string[]);
  for (const slug of uniqueSlugs) {
    try {
      revalidatePath(`/blog/${slug}`);
    } catch {
      // Ignore outside request context
    }
  }
}

export function revalidateCmsSettingsCache(): void {
  try {
    revalidateTag("cms-settings", { expire: 0 });
    revalidatePath("/blog");
  } catch {
    // Ignore outside request context
  }
}
