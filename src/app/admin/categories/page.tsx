import { AdminShell } from "@/components/admin/admin-shell";
import { CategoriesClient } from "@/components/admin/categories-client";
import { requirePageAdmin } from "@/lib/cms/auth";
import { listCategories } from "@/lib/cms/blogs-repo";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const { admin } = await requirePageAdmin("categories:read");
  const initialCategories = await listCategories();

  return (
    <AdminShell admin={admin}>
      <CategoriesClient admin={admin} initialCategories={initialCategories} />
    </AdminShell>
  );
}
