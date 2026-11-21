import { AdminShell } from "@/components/admin/admin-shell";
import { MediaLibraryClient } from "@/components/admin/media-library-client";
import { requirePageAdmin } from "@/lib/cms/auth";
import { isBlobConfigured } from "@/lib/cms/config";
import { listMediaAssets } from "@/lib/cms/media-repo";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const { admin } = await requirePageAdmin("media:read");
  const initialAssets = await listMediaAssets();

  return (
    <AdminShell admin={admin}>
      <MediaLibraryClient
        admin={admin}
        initialAssets={initialAssets}
        blobConfigured={isBlobConfigured()}
      />
    </AdminShell>
  );
}
