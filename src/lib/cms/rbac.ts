import type { AdminPermission, AdminRole, SerializedAdmin } from "./types";

export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  editor: "Editor",
};

const BASE_PERMISSIONS: Record<AdminRole, Set<AdminPermission>> = {
  super_admin: new Set<AdminPermission>([
    "blogs:read",
    "blogs:create",
    "blogs:edit",
    "blogs:publish",
    "blogs:archive",
    "blogs:delete",
    "media:read",
    "media:upload",
    "media:edit",
    "media:replace",
    "media:delete",
    "categories:read",
    "categories:manage",
    "admins:manage",
    "settings:read",
    "settings:manage",
  ]),
  admin: new Set<AdminPermission>([
    "blogs:read",
    "blogs:create",
    "blogs:edit",
    "blogs:publish",
    "blogs:archive",
    "blogs:delete",
    "media:read",
    "media:upload",
    "media:edit",
    "media:replace",
    "media:delete",
    "categories:read",
    "categories:manage",
    "settings:read",
  ]),
  editor: new Set<AdminPermission>([
    "blogs:read",
    "blogs:create",
    "blogs:edit",
    "blogs:archive",
    "media:read",
    "media:upload",
    "media:edit",
    "categories:read",
  ]),
};

export function can(
  admin: Pick<SerializedAdmin, "role" | "canPublish" | "isActive"> | null | undefined,
  permission: AdminPermission
): boolean {
  if (!admin || !admin.isActive) return false;
  if (permission === "blogs:publish" && admin.role === "editor") {
    return Boolean(admin.canPublish);
  }
  return BASE_PERMISSIONS[admin.role]?.has(permission) ?? false;
}

export class ForbiddenError extends Error {
  readonly status = 403;
  constructor(message = "You do not have permission to perform this action.") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export function assertCan(
  admin: Pick<SerializedAdmin, "role" | "canPublish" | "isActive">,
  permission: AdminPermission,
  message?: string
): void {
  if (!can(admin, permission)) {
    throw new ForbiddenError(message);
  }
}
