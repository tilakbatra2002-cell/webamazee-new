import { MongoClient, type Collection, type Db } from "mongodb";
import { getMongoDatabaseName, isMongoConfigured } from "@/lib/cms/config";
import type {
  AdminDocument,
  AdminSessionDocument,
  AdminTokenDocument,
  BlogDocument,
  CategoryDocument,
  CmsSettingsDocument,
  MediaAssetDocument,
} from "@/lib/cms/types";

interface LoginAttemptDoc {
  key: string;
  count: number;
  lockedUntil?: Date | null;
  expiresAt: Date;
}

declare global {
  var __webamazeeMongoClientPromise: Promise<MongoClient> | undefined;
  var __webamazeeIndexesPromise: Promise<void> | undefined;
}

function assertServerRuntime(): void {
  if (typeof window !== "undefined") {
    throw new Error("Database connection cannot be initialized in a browser environment.");
  }
}

export async function getMongoClient(): Promise<MongoClient> {
  assertServerRuntime();

  if (!isMongoConfigured()) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!globalThis.__webamazeeMongoClientPromise) {
    const uri = process.env.MONGODB_URI!.trim();
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
    });
    globalThis.__webamazeeMongoClientPromise = client.connect().catch((err) => {
      globalThis.__webamazeeMongoClientPromise = undefined;
      throw err;
    });
  }

  return globalThis.__webamazeeMongoClientPromise;
}

async function createIndexes(db: Db): Promise<void> {
  await Promise.all([
    // blogs
    db.collection("blogs").createIndex({ slug: 1 }, { unique: true, name: "blogs_slug_unique" }),
    db
      .collection("blogs")
      .createIndex(
        { status: 1, publishedAt: -1, createdAt: -1 },
        { name: "blogs_status_published_created" }
      ),
    db
      .collection("blogs")
      .createIndex({ status: 1, scheduledFor: 1 }, { name: "blogs_status_scheduled" }),
    db.collection("blogs").createIndex({ category: 1, status: 1 }, { name: "blogs_category_status" }),
    db.collection("blogs").createIndex({ updatedAt: -1 }, { name: "blogs_updated" }),

    // categories
    db
      .collection("categories")
      .createIndex({ slug: 1 }, { unique: true, name: "categories_slug_unique" }),
    db
      .collection("categories")
      .createIndex({ name: 1 }, { unique: true, name: "categories_name_unique" }),
    db.collection("categories").createIndex({ sortOrder: 1, name: 1 }, { name: "categories_order" }),

    // admins
    db
      .collection("admins")
      .createIndex({ email: 1 }, { unique: true, name: "admins_email_unique" }),
    db.collection("admins").createIndex({ role: 1, isActive: 1 }, { name: "admins_role_active" }),

    // admin_sessions (TTL cleanup)
    db
      .collection("admin_sessions")
      .createIndex({ sessionId: 1 }, { unique: true, name: "sessions_id_unique" }),
    db.collection("admin_sessions").createIndex({ adminId: 1 }, { name: "sessions_admin_id" }),
    db
      .collection("admin_sessions")
      .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0, name: "sessions_ttl" }),

    // admin_tokens (TTL cleanup)
    db
      .collection("admin_tokens")
      .createIndex({ tokenHash: 1 }, { unique: true, name: "tokens_hash_unique" }),
    db.collection("admin_tokens").createIndex({ adminId: 1 }, { name: "tokens_admin_id" }),
    db
      .collection("admin_tokens")
      .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0, name: "tokens_ttl" }),

    // media_assets
    db
      .collection("media_assets")
      .createIndex({ url: 1 }, { unique: true, name: "media_url_unique" }),
    db
      .collection("media_assets")
      .createIndex({ pathname: 1 }, { unique: true, name: "media_pathname_unique" }),
    db.collection("media_assets").createIndex({ createdAt: -1 }, { name: "media_created" }),

    // cms_settings
    db
      .collection("cms_settings")
      .createIndex({ key: 1 }, { unique: true, name: "settings_key_unique" }),

    // login_attempts (TTL cleanup)
    db
      .collection("login_attempts")
      .createIndex({ key: 1 }, { unique: true, name: "login_attempts_key_unique" }),
    db
      .collection("login_attempts")
      .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0, name: "login_attempts_ttl" }),
  ]);
}

export async function getDatabase(): Promise<Db> {
  const client = await getMongoClient();
  const db = client.db(getMongoDatabaseName());

  if (!globalThis.__webamazeeIndexesPromise) {
    globalThis.__webamazeeIndexesPromise = createIndexes(db).catch((err) => {
      globalThis.__webamazeeIndexesPromise = undefined;
      throw err;
    });
  }
  await globalThis.__webamazeeIndexesPromise;

  return db;
}

export async function getCollections(): Promise<{
  db: Db;
  blogs: Collection<BlogDocument>;
  categories: Collection<CategoryDocument>;
  admins: Collection<AdminDocument>;
  sessions: Collection<AdminSessionDocument>;
  tokens: Collection<AdminTokenDocument>;
  media: Collection<MediaAssetDocument>;
  settings: Collection<CmsSettingsDocument>;
  loginAttempts: Collection<LoginAttemptDoc>;
}> {
  const db = await getDatabase();
  return {
    db,
    blogs: db.collection<BlogDocument>("blogs"),
    categories: db.collection<CategoryDocument>("categories"),
    admins: db.collection<AdminDocument>("admins"),
    sessions: db.collection<AdminSessionDocument>("admin_sessions"),
    tokens: db.collection<AdminTokenDocument>("admin_tokens"),
    media: db.collection<MediaAssetDocument>("media_assets"),
    settings: db.collection<CmsSettingsDocument>("cms_settings"),
    loginAttempts: db.collection<LoginAttemptDoc>("login_attempts"),
  };
}
