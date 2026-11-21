import "server-only";

import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import type { NextRequest } from "next/server";
import { getCollections } from "@/lib/db/mongodb";
import { isMongoConfigured, isSessionSecretConfigured } from "./config";
import { generateSecureToken, hashPassword, hashToken } from "./password";
import { assertCan, ForbiddenError } from "./rbac";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TTL_SECONDS,
  signAdminSessionJwt,
  verifyAdminSessionJwt,
} from "./session-jwt";
import type { AdminDocument, AdminPermission, SerializedAdmin } from "./types";

export class AuthError extends Error {
  readonly status: number;
  constructor(message: string, status = 401) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

export function serializeAdmin(doc: AdminDocument): SerializedAdmin {
  return {
    id: doc._id.toHexString(),
    name: doc.name,
    email: doc.email,
    role: doc.role,
    canPublish: Boolean(doc.canPublish),
    isActive: Boolean(doc.isActive),
    lastLoginAt: doc.lastLoginAt ? doc.lastLoginAt.toISOString() : null,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export function isCmsAuthReady(): boolean {
  return isMongoConfigured() && isSessionSecretConfigured();
}

function shouldUseSecureCookies(): boolean {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "";
  if (process.env.VERCEL === "1" || process.env.VERCEL_ENV) return true;
  if (siteUrl.startsWith("https://") && process.env.NODE_ENV === "production") return true;
  return false;
}

export async function createAdminSession(
  admin: AdminDocument,
  meta?: { userAgent?: string; ip?: string }
): Promise<string> {
  const { sessions, admins } = await getCollections();
  const sessionId = crypto.randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + ADMIN_SESSION_TTL_SECONDS * 1000);

  await sessions.insertOne({
    _id: new ObjectId(),
    sessionId,
    adminId: admin._id,
    tokenVersion: admin.tokenVersion,
    userAgent: meta?.userAgent?.slice(0, 300),
    ip: meta?.ip?.slice(0, 100),
    expiresAt,
    createdAt: now,
  });

  await admins.updateOne({ _id: admin._id }, { $set: { lastLoginAt: now } });

  const jwt = await signAdminSessionJwt({
    sid: sessionId,
    sub: admin._id.toHexString(),
    tv: admin.tokenVersion,
  });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, jwt, {
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureCookies(),
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  });

  return sessionId;
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: shouldUseSecureCookies(),
    path: "/",
    maxAge: 0,
  });
}

export async function getCurrentAdminSession(): Promise<{
  admin: SerializedAdmin;
  sessionId: string;
} | null> {
  if (!isCmsAuthReady()) return null;

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;

  const claims = await verifyAdminSessionJwt(token);
  if (!claims || !ObjectId.isValid(claims.sub)) return null;

  const { sessions, admins } = await getCollections();
  const now = new Date();
  const adminObjectId = new ObjectId(claims.sub);

  const session = await sessions.findOne({
    sessionId: claims.sid,
    adminId: adminObjectId,
    expiresAt: { $gt: now },
  });
  if (!session) return null;

  const admin = await admins.findOne({ _id: adminObjectId });
  if (!admin || !admin.isActive) {
    await sessions.deleteOne({ _id: session._id }).catch(() => undefined);
    return null;
  }

  if (admin.tokenVersion !== claims.tv || admin.tokenVersion !== session.tokenVersion) {
    await sessions.deleteOne({ _id: session._id }).catch(() => undefined);
    return null;
  }

  return { admin: serializeAdmin(admin), sessionId: session.sessionId };
}

export async function requireApiAdmin(
  request?: NextRequest,
  permission?: AdminPermission
): Promise<{ admin: SerializedAdmin; sessionId: string }> {
  if (!isCmsAuthReady()) {
    throw new AuthError(
      "CMS authentication is not configured yet (MONGODB_URI and SESSION_SECRET are required).",
      503
    );
  }

  // Optional header check handled in callers via verifyCsrfOrigin; request param kept for consistency
  void request;

  const current = await getCurrentAdminSession();
  if (!current) {
    throw new AuthError("Authentication required. Please sign in again.", 401);
  }

  if (permission) {
    assertCan(current.admin, permission);
  }

  return current;
}

export async function requirePageAdmin(
  permission?: AdminPermission
): Promise<{ admin: SerializedAdmin; sessionId: string }> {
  if (!isCmsAuthReady()) {
    redirect("/admin/login?reason=config");
  }
  const current = await getCurrentAdminSession();
  if (!current) {
    redirect("/admin/login");
  }
  if (permission) {
    try {
      assertCan(current.admin, permission);
    } catch (err) {
      if (err instanceof ForbiddenError) {
        redirect("/admin?error=forbidden");
      }
      throw err;
    }
  }
  return current;
}

export async function revokeSession(sessionId: string): Promise<void> {
  if (!isMongoConfigured()) return;
  const { sessions } = await getCollections();
  await sessions.deleteOne({ sessionId });
}

export async function revokeAllAdminSessions(adminId: ObjectId | string): Promise<void> {
  if (!isMongoConfigured()) return;
  const id = typeof adminId === "string" ? new ObjectId(adminId) : adminId;
  const { sessions, admins } = await getCollections();
  await Promise.all([
    sessions.deleteMany({ adminId: id }),
    admins.updateOne({ _id: id }, { $inc: { tokenVersion: 1 }, $set: { updatedAt: new Date() } }),
  ]);
}

export async function createPasswordToken(
  adminId: ObjectId,
  type: "invite" | "reset",
  ttlHours = 24
): Promise<string> {
  const { tokens } = await getCollections();
  const rawToken = generateSecureToken(32);
  const tokenHash = hashToken(rawToken);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + ttlHours * 60 * 60 * 1000);

  // Invalidate prior unused tokens of the same type for cleanliness
  await tokens.deleteMany({ adminId, type, usedAt: null });

  await tokens.insertOne({
    _id: new ObjectId(),
    tokenHash,
    adminId,
    type,
    expiresAt,
    usedAt: null,
    createdAt: now,
  });

  return rawToken;
}

export async function consumePasswordToken(
  rawToken: string,
  newPassword: string
): Promise<{ email: string }> {
  const { tokens, admins, sessions } = await getCollections();
  const tokenHash = hashToken(rawToken);
  const now = new Date();

  const candidateToken = await tokens.findOne({
    tokenHash,
    usedAt: null,
    expiresAt: { $gt: now },
  });

  if (!candidateToken) {
    throw new AuthError("This password setup link is invalid or has expired.", 400);
  }

  const admin = await admins.findOne({ _id: candidateToken.adminId });
  if (!admin) {
    throw new AuthError("Associated admin account was not found.", 404);
  }
  if (!admin.isActive) {
    throw new AuthError("This admin account is currently deactivated.", 403);
  }

  // Atomically consume only after verifying account exists and is active
  const claimed = await tokens.findOneAndUpdate(
    {
      _id: candidateToken._id,
      usedAt: null,
      expiresAt: { $gt: now },
    },
    { $set: { usedAt: now } },
    { returnDocument: "after" }
  );

  if (!claimed) {
    throw new AuthError("This password setup link has already been used.", 400);
  }

  const passwordHash = await hashPassword(newPassword);
  await admins.updateOne(
    { _id: admin._id },
    {
      $set: { passwordHash, updatedAt: now },
      $inc: { tokenVersion: 1 },
    }
  );
  await sessions.deleteMany({ adminId: admin._id });

  return { email: admin.email };
}
