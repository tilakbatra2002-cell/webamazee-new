import { AdminShell } from "@/components/admin/admin-shell";
import { BlogsTable } from "@/components/admin/blogs-table";
import { requirePageAdmin } from "@/lib/cms/auth";
import {
  getCmsSettings,
  listAdminBlogs,
  listCategories,
} from "@/lib/cms/blogs-repo";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const { admin } = await requirePageAdmin("blogs:read");
  const settings = await getCmsSettings();
  const [initialData, categories] = await Promise.all([
    listAdminBlogs({ page: 1, pageSize: settings.postsPerPage }),
    listCategories(),
  ]);

  return (
    <AdminShell admin={admin}>
      <BlogsTable
        admin={admin}
        categories={categories}
        initialData={initialData}
      />
    </AdminShell>
  );
}
