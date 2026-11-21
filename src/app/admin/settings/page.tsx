import { AdminShell } from "@/components/admin/admin-shell";
import { SettingsClient } from "@/components/admin/settings-client";
import { requirePageAdmin } from "@/lib/cms/auth";
import { getCmsSettings } from "@/lib/cms/blogs-repo";
import { getEnvDiagnostics } from "@/lib/cms/config";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const { admin } = await requirePageAdmin("settings:read");
  const [initialSettings, diagnostics] = await Promise.all([
    getCmsSettings(),
    Promise.resolve(getEnvDiagnostics()),
  ]);

  return (
    <AdminShell admin={admin}>
      <SettingsClient
        admin={admin}
        initialSettings={initialSettings}
        diagnostics={diagnostics}
      />
    </AdminShell>
  );
}
