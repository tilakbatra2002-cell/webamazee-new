import type { ObjectId } from "mongodb";
import type { BlogStatus, ContentBlock, Post } from "@/lib/blog-types";

export type { BlogStatus, ContentBlock, Post };

export type AdminRole = "super_admin" | "admin" | "editor";

export type AdminPermission =
  | "blogs:read"
  | "blogs:create"
  | "blogs:edit"
  | "blogs:publish"
  | "blogs:archive"
  | "blogs:delete"
  | "media:read"
  | "media:upload"
  | "media:edit"
  | "media:replace"
  | "media:delete"
  | "categories:read"
  | "categories:manage"
  | "admins:manage"
  | "settings:read"
  | "settings:manage";

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  publishedAt?: string;
  updatedAt?: string;
};

export interface BlogDocument {
  _id: ObjectId;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  inlineCover?: boolean;
  alt: string;
  seoTitle?: string;
  absoluteTitle?: boolean;
  metaDescription?: string;
  canonicalUrl?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  metaKeywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
  nofollow?: boolean;
  category: string;
  date: string;
  updatedDate?: string;
  readTime: string;
  author: string;
  authorRole: string;
  faqs?: { q: string; a: string }[];
  toc?: { text: string; id: string; level?: 2 | 3 }[];
  content: ContentBlock[];
  status: BlogStatus;
  publishedAt?: Date | null;
  scheduledFor?: Date | null;
  publishedByCronAt?: Date | null;
  source?: "seed" | "cms";
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface SerializedBlog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  inlineCover?: boolean;
  alt: string;
  seoTitle?: string;
  absoluteTitle?: boolean;
  metaDescription?: string;
  canonicalUrl?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  metaKeywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
  nofollow?: boolean;
  category: string;
  date: string;
  updatedDate?: string;
  readTime: string;
  author: string;
  authorRole: string;
  faqs: { q: string; a: string }[];
  toc: { text: string; id: string; level?: 2 | 3 }[];
  content: ContentBlock[];
  status: BlogStatus;
  publishedAt: string | null;
  scheduledFor: string | null;
  source: "seed" | "cms";
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface AdminDocument {
  _id: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: AdminRole;
  canPublish: boolean;
  isActive: boolean;
  tokenVersion: number;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
}

export interface SerializedAdmin {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  canPublish: boolean;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminSessionDocument {
  _id: ObjectId;
  sessionId: string;
  adminId: ObjectId;
  tokenVersion: number;
  userAgent?: string;
  ip?: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface AdminTokenDocument {
  _id: ObjectId;
  tokenHash: string;
  adminId: ObjectId;
  type: "invite" | "reset";
  expiresAt: Date;
  usedAt?: Date | null;
  createdAt: Date;
}

export interface CategoryDocument {
  _id: ObjectId;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SerializedCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  sortOrder: number;
  postCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface MediaAssetDocument {
  _id: ObjectId;
  url: string;
  pathname: string;
  filename: string;
  contentType: string;
  size: number;
  width?: number;
  height?: number;
  alt: string;
  uploadedBy: string;
  uploadedByEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SerializedMediaAsset {
  id: string;
  url: string;
  pathname: string;
  filename: string;
  contentType: string;
  size: number;
  width?: number;
  height?: number;
  alt: string;
  uploadedBy: string;
  uploadedByEmail: string;
  usageCount: number;
  usedInSlugs: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CmsSettingsDocument {
  _id?: ObjectId;
  key: "default";
  siteName: string;
  defaultAuthor: string;
  defaultAuthorRole: string;
  defaultOgImage: string;
  postsPerPage: number;
  blogIndexTitle: string;
  blogIndexDescription: string;
  timezone: string;
  updatedAt: Date;
  updatedBy?: string;
}

export interface SerializedCmsSettings {
  siteName: string;
  defaultAuthor: string;
  defaultAuthorRole: string;
  defaultOgImage: string;
  postsPerPage: number;
  blogIndexTitle: string;
  blogIndexDescription: string;
  timezone: string;
  updatedAt: string;
  updatedBy?: string;
}

export interface EnvDiagnostics {
  mongodbConfigured: boolean;
  mongodbDb: string;
  sessionSecretConfigured: boolean;
  blobConfigured: boolean;
  cronSecretConfigured: boolean;
  emailConfigured: boolean;
  siteUrl: string;
}
