import "server-only";

import { ObjectId } from "mongodb";
import { getCollections } from "@/lib/db/mongodb";
import {
  createPasswordToken,
  revokeAllAdminSessions,
  serializeAdmin,
} from "./auth";
import { RepoError } from "./blogs-repo";
import { getTrustedAppBaseUrl } from "./config";
import { sendAdminPasswordEmail } from "./email";
import { generateSecureToken, hashPassword } from "./password";
import type { AdminDocument, AdminRole, SerializedAdmin } from "./types";

export async function listAdmins(q?: string): Promise<SerializedAdmin[]> {
  const { admins } = await getCollections();
  const filter = q?.trim()
    ? {
        $or: [
          { name: new RegExp(q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") },
          { email: new RegExp(q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") },
        ],
      }
    : {};

  const docs = await admins.find(filter).sort({ createdAt: 1 }).toArray();
  return docs.map(serializeAdmin);
}

export async function createAdminUser(
  input: {
    name: string;
    email: string;
    role: AdminRole;
    canPublish?: boolean;
    isActive?: boolean;
    sendInviteEmail?: boolean;
  },
  actor: SerializedAdmin
): Promise<{
  admin: SerializedAdmin;
  emailSent: boolean;
  emailNote?: string;
  setupPath?: string;
}> {
  const { admins } = await getCollections();
  const email = input.email.trim().toLowerCase();
  const existing = await admins.findOne({ email });
  if (existing) {
    throw new RepoError(`An admin account for "${email}" already exists.`, 409);
  }

  // Assign an unguessable temporary hash until the user completes their single-use invite token setup
  const placeholderHash = await hashPassword(generateSecureToken(36));
  const now = new Date();
  const canPublish =
    input.role === "super_admin" || input.role === "admin"
      ? true
      : Boolean(input.canPublish);

  const doc: AdminDocument = {
    _id: new ObjectId(),
    name: input.name.trim(),
    email,
    passwordHash: placeholderHash,
    role: input.role,
    canPublish,
    isActive: input.isActive ?? true,
    tokenVersion: 1,
    lastLoginAt: null,
    createdAt: now,
    updatedAt: now,
    createdBy: actor.email,
  };

  await admins.insertOne(doc);

  const rawToken = await createPasswordToken(doc._id, "invite", 24);
  const setupPath = `/admin/reset-password?token=${encodeURIComponent(rawToken)}`;
  const trustedBaseUrl = getTrustedAppBaseUrl();

  let emailSent = false;
  let emailNote: string | undefined;
  if (input.sendInviteEmail !== false) {
    const emailResult = await sendAdminPasswordEmail({
      to: doc.email,
      recipientName: doc.name,
      token: rawToken,
      type: "invite",
      baseUrl: trustedBaseUrl,
    });
    emailSent = emailResult.sent;
    emailNote = emailResult.reason;
  }

  return {
    admin: serializeAdmin(doc),
    emailSent,
    emailNote,
    // Never return the plaintext secret-bearing path when email delivery succeeded
    ...(emailSent ? {} : { setupPath }),
  };
}

export async function updateAdminUser(
  targetId: string,
  input: {
    name?: string;
    role?: AdminRole;
    canPublish?: boolean;
    isActive?: boolean;
    action?: "revoke_sessions" | "create_reset_link";
  },
  actor: SerializedAdmin
): Promise<{
  admin: SerializedAdmin;
  resetPath?: string;
  emailSent?: boolean;
  emailNote?: string;
}> {
  if (!ObjectId.isValid(targetId)) {
    throw new RepoError("Invalid admin ID.", 400);
  }

  const { admins } = await getCollections();
  const objectId = new ObjectId(targetId);
  const existing = await admins.findOne({ _id: objectId });
  if (!existing) {
    throw new RepoError("Admin account not found.", 404);
  }

  const isSelf = existing._id.toHexString() === actor.id;

  if (isSelf && input.isActive === false) {
    throw new RepoError("You cannot deactivate your own active Super Admin account.", 400);
  }
  if (isSelf && input.role && input.role !== "super_admin") {
    throw new RepoError("You cannot demote your own Super Admin role.", 400);
  }

  // Prevent removing or deactivating the last active Super Admin
  const willLoseSuperAdmin =
    existing.role === "super_admin" &&
    existing.isActive &&
    ((input.role && input.role !== "super_admin") || input.isActive === false);

  if (willLoseSuperAdmin) {
    const otherActiveSuperAdmins = await admins.countDocuments({
      _id: { $ne: objectId },
      role: "super_admin",
      isActive: true,
    });
    if (otherActiveSuperAdmins === 0) {
      throw new RepoError(
        "At least one active Super Admin must remain in the system.",
        409
      );
    }
  }

  if (input.action === "revoke_sessions") {
    await revokeAllAdminSessions(objectId);
    const refreshed = await admins.findOne({ _id: objectId });
    return { admin: serializeAdmin(refreshed!) };
  }

  if (input.action === "create_reset_link") {
    const rawToken = await createPasswordToken(objectId, "reset", 1);
    const resetPath = `/admin/reset-password?token=${encodeURIComponent(rawToken)}`;
    const trustedBaseUrl = getTrustedAppBaseUrl();
    const emailResult = await sendAdminPasswordEmail({
      to: existing.email,
      recipientName: existing.name,
      token: rawToken,
      type: "reset",
      baseUrl: trustedBaseUrl,
    });
    return {
      admin: serializeAdmin(existing),
      emailSent: emailResult.sent,
      emailNote: emailResult.reason,
      // Only return manual fallback link when Resend did not deliver the email
      ...(emailResult.sent ? {} : { resetPath }),
    };
  }

  const nextRole = input.role ?? existing.role;
  const nextCanPublish =
    nextRole === "super_admin" || nextRole === "admin"
      ? true
      : input.canPublish !== undefined
        ? Boolean(input.canPublish)
        : existing.canPublish;

  const shouldInvalidateSessions =
    input.isActive === false ||
    (input.role !== undefined && input.role !== existing.role) ||
    (input.canPublish !== undefined && input.canPublish !== existing.canPublish);

  const now = new Date();
  const updated = await admins.findOneAndUpdate(
    { _id: objectId },
    {
      $set: {
        ...(input.name !== undefined ? { name: input.name.trim() } : {}),
        role: nextRole,
        canPublish: nextCanPublish,
        ...(input.isActive !== undefined ? { isActive: input.isActive } : {}),
        updatedAt: now,
      },
      ...(shouldInvalidateSessions ? { $inc: { tokenVersion: 1 } } : {}),
    },
    { returnDocument: "after" }
  );

  if (shouldInvalidateSessions) {
    await revokeAllAdminSessions(objectId);
  }

  return { admin: serializeAdmin(updated!) };
}
