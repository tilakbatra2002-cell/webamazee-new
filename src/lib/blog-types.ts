export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "code"; language?: string; code: string }
  | { type: "callout"; variant?: "info" | "tip" | "warning" | "highlight"; title: string; text: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "cta"; title: string; text: string; button: string; href?: string };

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
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  content: ContentBlock[];
};
