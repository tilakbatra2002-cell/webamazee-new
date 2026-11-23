import type { ContentBlock } from "@/lib/blog-types";
import { slugify } from "@/lib/cms/slugify";

export type TocEntry = { text: string; id: string; level: 2 | 3 };

export type HeadingEntry = TocEntry & { index: number };

/**
 * Single source of truth for heading anchor IDs.
 *
 * Used by the public article page, the CMS editor, the migration/seed path and
 * the admin API so the IDs stored in `content[]` always equal the IDs rendered
 * and the IDs linked from the table of contents.
 *
 * Rules:
 *  - level 3 → H3, anything else (level 2 / undefined) → H2
 *  - id preference: explicit block.id → slugified heading text → `section-<index>`
 *  - duplicates are suffixed `-2`, `-3`, … in document order
 */
export function deriveHeadings(blocks: ContentBlock[]): HeadingEntry[] {
  const used = new Set<string>();
  const headings: HeadingEntry[] = [];

  blocks.forEach((block, index) => {
    if (block.type !== "heading") return;
    const level: 2 | 3 = block.level === 3 ? 3 : 2;
    const explicit = typeof block.id === "string" ? block.id.trim() : "";
    const baseId =
      (explicit && slugify(explicit)) || slugify(block.text) || `section-${index}`;

    let uniqueId = baseId;
    let suffix = 2;
    while (used.has(uniqueId)) {
      uniqueId = `${baseId}-${suffix}`;
      suffix += 1;
    }
    used.add(uniqueId);

    headings.push({ text: block.text.trim(), id: uniqueId, level, index });
  });

  return headings;
}

/** Heading anchors keyed by block index — consumed by the renderer. */
export function headingIdsByIndex(blocks: ContentBlock[]): Map<number, string> {
  return new Map(deriveHeadings(blocks).map((h) => [h.index, h.id]));
}

/** Returns a copy of the blocks with every heading id set to its canonical value. */
export function withCanonicalHeadingIds(blocks: ContentBlock[]): ContentBlock[] {
  const ids = headingIdsByIndex(blocks);
  return blocks.map((block, index) => {
    if (block.type !== "heading") return block;
    const id = ids.get(index);
    if (!id || block.id === id) return block;
    return { ...block, id };
  });
}

/** TOC entries for an article. Returns [] when there is nothing linkable. */
export function buildToc(blocks: ContentBlock[]): TocEntry[] {
  return deriveHeadings(blocks)
    .filter((h) => h.text.length > 0)
    .map(({ text, id, level }) => ({ text, id, level }));
}

export const MIN_TOC_HEADINGS = 2;

export function shouldShowToc(toc: TocEntry[]): boolean {
  return toc.length >= MIN_TOC_HEADINGS;
}

/**
 * Normalises nested heading depth for the TOC: an H3 that appears before any
 * H2 is promoted visually by the caller (level stays 3 so the renderer decides).
 */
export function hasInlineTocBlock(blocks: ContentBlock[]): boolean {
  return blocks.some((b) => b.type === "toc");
}
