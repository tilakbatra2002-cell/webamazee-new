export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3; id?: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "checklist"; title?: string; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "code"; language?: string; code: string }
  | { type: "callout"; variant?: "info" | "tip" | "warning" | "highlight"; title: string; text: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "cta"; title: string; text: string; button: string; href?: string }
  | { type: "toc"; title?: string; items: { text: string; id: string; level?: 2 | 3 }[] };

export type Post = {
  slug: string;
  image: string;
  alt: string;
  title: string;
  excerpt: string;
  /** Optional search-specific fields; older articles fall back to title/excerpt. */
  seoTitle?: string;
  metaDescription?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  /** Optional curated meta-keyword set (mapping layer); falls back to generated keywords. */
  metaKeywords?: string[];
  /** Optional: bypass the global title template when an exact supplied meta title is required. */
  absoluteTitle?: boolean;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  faqs?: { q: string; a: string }[];
  toc?: { text: string; id: string; level?: 2 | 3 }[];
  content: ContentBlock[];
};
