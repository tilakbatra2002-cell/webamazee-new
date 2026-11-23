import { z } from "zod";
import { slugify } from "./slugify";
import {
  hasOnlySafeMarkdownLinks,
  isApprovedMediaPathOrUrl,
  isSafeLinkOrPath,
} from "./url-safety";

export { isSafeLinkOrPath, isApprovedMediaPathOrUrl as isSafeMediaPathOrUrl };

const safeMediaSchema = z
  .string()
  .trim()
  .min(1, "Image URL or path is required.")
  .max(2048)
  .refine(
    isApprovedMediaPathOrUrl,
    "Image must be a site path (/images/...) or an approved Vercel Blob URL (*.blob.vercel-storage.com)."
  );

const optionalSafeMediaSchema = z
  .string()
  .trim()
  .max(2048)
  .optional()
  .refine(
    (v) => v === undefined || v === "" || isApprovedMediaPathOrUrl(v),
    "Image must be a site path (/images/...) or an approved Vercel Blob URL (*.blob.vercel-storage.com)."
  );

const optionalSafeHrefSchema = z
  .string()
  .trim()
  .max(2048)
  .optional()
  .refine(
    (v) => v === undefined || v === "" || isSafeLinkOrPath(v),
    "Link must be a valid relative path (/...), #anchor, or https:// URL."
  );

const safeMarkdownText = (minLen: number, maxLen: number, emptyMessage: string) =>
  z
    .string()
    .trim()
    .min(minLen, emptyMessage)
    .max(maxLen)
    .refine(
      hasOnlySafeMarkdownLinks,
      "Markdown links must use safe relative paths (/...) or https:// URLs."
    );

export const slugSchema = z
  .string()
  .trim()
  .min(2, "Slug must be at least 2 characters.")
  .max(160, "Slug cannot exceed 160 characters.")
  .transform((val) => slugify(val))
  .refine(
    (val) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val),
    "Slug can only contain lowercase letters, numbers, and hyphens."
  );

export const tocItemSchema = z.object({
  text: z.string().trim().min(1, "TOC item text is required.").max(200),
  id: z
    .string()
    .trim()
    .min(1, "TOC anchor ID is required.")
    .max(160)
    .transform((v) => slugify(v) || v.replace(/^#/, "")),
  level: z.union([z.literal(2), z.literal(3)]).optional(),
});

export const contentBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("paragraph"),
    text: safeMarkdownText(1, 20000, "Paragraph text cannot be empty."),
  }),
  z.object({
    type: z.literal("image"),
    src: safeMediaSchema,
    alt: z.string().trim().min(1, "Image alt text is required.").max(300),
    width: z.number().int().positive().max(8000).optional(),
    height: z.number().int().positive().max(8000).optional(),
    caption: z.string().trim().max(400).optional(),
  }),
  z.object({
    type: z.literal("heading"),
    text: safeMarkdownText(1, 300, "Heading text is required."),
    level: z.union([z.literal(2), z.literal(3)]).optional(),
    id: z.string().trim().max(160).optional(),
  }),
  z.object({
    type: z.literal("list"),
    ordered: z.boolean().optional(),
    items: z
      .array(safeMarkdownText(1, 4000, "List item cannot be empty."))
      .min(1, "List must contain at least one item.")
      .max(100),
  }),
  z.object({
    type: z.literal("checklist"),
    title: z.string().trim().max(300).optional(),
    items: z
      .array(safeMarkdownText(1, 2000, "Checklist item cannot be empty."))
      .min(1, "Checklist must contain at least one item.")
      .max(100),
  }),
  z.object({
    type: z.literal("quote"),
    text: safeMarkdownText(1, 4000, "Quote text cannot be empty."),
    cite: z.string().trim().max(240).optional(),
  }),
  z.object({
    type: z.literal("code"),
    language: z.string().trim().max(50).optional(),
    code: z.string().min(1, "Code block cannot be empty.").max(50000),
  }),
  z.object({
    type: z.literal("callout"),
    variant: z.enum(["info", "tip", "warning", "highlight"]).optional(),
    title: z.string().trim().min(1, "Callout title is required.").max(300),
    text: safeMarkdownText(1, 8000, "Callout text is required."),
  }),
  z.object({
    type: z.literal("table"),
    head: z.array(z.string().trim().max(500)).min(1, "Table must have at least one column.").max(12),
    rows: z
      .array(
        z.array(
          z
            .string()
            .trim()
            .max(2000)
            .refine(
              hasOnlySafeMarkdownLinks,
              "Table cell links must use safe relative paths (/...) or https:// URLs."
            )
        )
      )
      .min(1, "Table must have at least one row.")
      .max(100),
  }),
  z.object({
    type: z.literal("cta"),
    title: z.string().trim().min(1, "CTA title is required.").max(300),
    text: z.string().trim().min(1, "CTA description is required.").max(2000),
    button: z.string().trim().min(1, "CTA button text is required.").max(120),
    href: optionalSafeHrefSchema,
  }),
  z.object({
    type: z.literal("toc"),
    title: z.string().trim().max(200).optional(),
    items: z.array(tocItemSchema).min(1, "Inline TOC needs at least one heading.").max(100),
  }),
]);

export const blogFaqSchema = z.object({
  q: z.string().trim().min(1, "FAQ question is required.").max(400),
  a: safeMarkdownText(1, 4000, "FAQ answer is required."),
});

export const blogStatusSchema = z.enum(["draft", "published", "scheduled", "archived"]);

export const blogPayloadSchema = z
  .object({
    title: z.string().trim().min(3, "Title must be at least 3 characters.").max(220),
    slug: slugSchema,
    excerpt: z.string().trim().min(10, "Excerpt must be at least 10 characters.").max(800),
    category: z.string().trim().min(1, "Category is required.").max(120),
    author: z.string().trim().min(1, "Author name is required.").max(120),
    authorRole: z.string().trim().min(1, "Author role is required.").max(140),
    date: z.string().trim().min(1, "Display date is required.").max(60),
    readTime: z.string().trim().min(1, "Read time is required.").max(40),
    image: safeMediaSchema,
    imageWidth: z.number().int().positive().max(8000).nullable().optional(),
    imageHeight: z.number().int().positive().max(8000).nullable().optional(),
    inlineCover: z.boolean().optional(),
    alt: z.string().trim().min(1, "Featured image alt text is required.").max(300),
    seoTitle: z.string().trim().max(220).optional(),
    absoluteTitle: z.boolean().optional(),
    metaDescription: z.string().trim().max(400).optional(),
    canonicalUrl: optionalSafeHrefSchema,
    primaryKeyword: z.string().trim().max(160).optional(),
    secondaryKeywords: z.array(z.string().trim().min(1).max(120)).max(30).optional(),
    metaKeywords: z.array(z.string().trim().min(1).max(120)).max(40).optional(),
    ogTitle: z.string().trim().max(220).optional(),
    ogDescription: z.string().trim().max(400).optional(),
    ogImage: optionalSafeMediaSchema,
    noindex: z.boolean().optional(),
    nofollow: z.boolean().optional(),
    // FAQ editing was removed from the CMS; stored values are preserved server-side.
    faqs: z.array(blogFaqSchema).max(40).nullish(),
    // TOC is generated from H2/H3 headings; the server recomputes and stores it.
    toc: z.array(tocItemSchema).max(400).nullish(),
    content: z
      .array(contentBlockSchema)
      .min(1, "Add at least one content block to the article.")
      .max(400),
    status: blogStatusSchema.default("draft"),
    publishedAt: z.string().datetime().nullable().optional(),
    scheduledFor: z.string().datetime().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.status === "scheduled" && !data.scheduledFor) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["scheduledFor"],
        message: "Select a scheduled publish date and time.",
      });
    }
    if (data.status === "scheduled" && data.scheduledFor) {
      const target = Date.parse(data.scheduledFor);
      if (Number.isNaN(target)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["scheduledFor"],
          message: "Invalid scheduled publish timestamp.",
        });
      }
    }
    for (let i = 0; i < data.content.length; i += 1) {
      const block = data.content[i];
      if (block.type === "table") {
        for (const row of block.rows) {
          if (row.length !== block.head.length) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["content", i],
              message: "Every table row must match the column header count.",
            });
            break;
          }
        }
      }
    }
  });

export const strongPasswordSchema = z
  .string()
  .min(10, "Password must be at least 10 characters long.")
  .max(128, "Password cannot exceed 128 characters.")
  .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter.")
  .refine((val) => /[a-z]/.test(val), "Password must contain at least one lowercase letter.")
  .refine(
    (val) => /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val),
    "Password must contain at least one number or symbol."
  );

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(254).transform((e) => e.toLowerCase()),
  password: z.string().min(1, "Password is required.").max(128),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").max(254).transform((e) => e.toLowerCase()),
});

export const resetPasswordSchema = z.object({
  token: z.string().trim().min(16, "Invalid or incomplete reset token.").max(256),
  password: strongPasswordSchema,
});

export const adminRoleSchema = z.enum(["super_admin", "admin", "editor"]);

export const createAdminSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(254).transform((e) => e.toLowerCase()),
  role: adminRoleSchema,
  canPublish: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
  sendInviteEmail: z.boolean().optional().default(true),
});

export const updateAdminSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  role: adminRoleSchema.optional(),
  canPublish: z.boolean().optional(),
  isActive: z.boolean().optional(),
  action: z.enum(["revoke_sessions", "create_reset_link"]).optional(),
});

export const categorySchema = z.object({
  name: z.string().trim().min(2, "Category name is required.").max(100),
  slug: slugSchema.optional(),
  description: z.string().trim().max(300).optional().default(""),
  sortOrder: z.number().int().min(0).max(999).optional().default(0),
});

export const mediaPatchSchema = z.object({
  alt: z.string().trim().min(1, "Alt text is required.").max(300),
});

export const cmsSettingsSchema = z.object({
  siteName: z.string().trim().min(1).max(120),
  defaultAuthor: z.string().trim().min(1).max(120),
  defaultAuthorRole: z.string().trim().min(1).max(140),
  defaultOgImage: safeMediaSchema,
  postsPerPage: z.number().int().min(3).max(50),
  blogIndexTitle: z.string().trim().min(3).max(200),
  blogIndexDescription: z.string().trim().min(10).max(400),
  timezone: z.string().trim().min(2).max(80),
});
