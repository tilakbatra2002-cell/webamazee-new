import { AdminShell } from "@/components/admin/admin-shell";
import { AdminsClient } from "@/components/admin/admins-client";
import { listAdmins } from "@/lib/cms/admins-repo";
import { requirePageAdmin } from "@/lib/cms/auth";
import { isEmailConfigured } from "@/lib/cms/config";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const { admin } = await requirePageAdmin("admins:manage");
  const initialAdmins = await listAdmins();

  return (
    <AdminShell admin={admin}>
      <AdminsClient
        currentAdminId={admin.id}
        initialAdmins={initialAdmins}
        emailConfigured={isEmailConfigured()}
      />
    </AdminShell>
  );
}
