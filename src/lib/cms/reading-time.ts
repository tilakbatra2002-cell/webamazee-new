import type { ContentBlock } from "@/lib/blog-types";
import { slugify } from "./slugify";

function stripMarkdownSyntax(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/[*`#>_]/g, " ");
}

function countWords(text: string): number {
  const cleaned = stripMarkdownSyntax(text).trim();
  if (!cleaned) return 0;
  return cleaned.split(/\s+/).filter(Boolean).length;
}

export function estimateReadTime(blocks: ContentBlock[], faqs: { q: string; a: string }[] = []): string {
  let words = 0;

  for (const block of blocks) {
    switch (block.type) {
      case "paragraph":
        words += countWords(block.text);
        break;
      case "heading":
        words += countWords(block.text);
        break;
      case "list":
      case "checklist":
        if (block.type === "checklist" && block.title) words += countWords(block.title);
        for (const item of block.items) words += countWords(item);
        break;
      case "quote":
        words += countWords(block.text) + (block.cite ? countWords(block.cite) : 0);
        break;
      case "callout":
        words += countWords(block.title) + countWords(block.text);
        break;
      case "table":
        for (const h of block.head) words += countWords(h);
        for (const row of block.rows) {
          for (const cell of row) words += countWords(cell);
        }
        break;
      case "cta":
        words += countWords(block.title) + countWords(block.text) + countWords(block.button);
        break;
      case "code":
        words += Math.min(40, countWords(block.code));
        break;
      case "image":
        if (block.caption) words += countWords(block.caption);
        break;
      case "toc":
        break;
    }
  }

  for (const faq of faqs) {
    words += countWords(faq.q) + countWords(faq.a);
  }

  const minutes = Math.max(1, Math.round(words / 215));
  return `${minutes} min read`;
}

export function extractTocFromBlocks(
  blocks: ContentBlock[]
): { text: string; id: string; level: 2 | 3 }[] {
  const seenIds = new Set<string>();
  const items: { text: string; id: string; level: 2 | 3 }[] = [];

  blocks.forEach((block, index) => {
    if (block.type !== "heading") return;
    const level: 2 | 3 = block.level === 3 ? 3 : 2;
    const baseId = block.id?.trim() || slugify(block.text) || `section-${index}`;
    let uniqueId = baseId;
    let suffix = 2;
    while (seenIds.has(uniqueId)) {
      uniqueId = `${baseId}-${suffix}`;
      suffix += 1;
    }
    seenIds.add(uniqueId);
    items.push({ text: block.text, id: uniqueId, level });
  });

  return items;
}
