import { AdminShell } from "@/components/admin/admin-shell";
import { BlogEditor } from "@/components/admin/blog-editor";
import { requirePageAdmin } from "@/lib/cms/auth";
import { getCmsSettings, listCategories } from "@/lib/cms/blogs-repo";

export const dynamic = "force-dynamic";

export default async function NewBlogPage() {
  const { admin } = await requirePageAdmin("blogs:create");
  const [categories, settings] = await Promise.all([
    listCategories(),
    getCmsSettings(),
  ]);

  return (
    <AdminShell admin={admin}>
      <BlogEditor admin={admin} categories={categories} settings={settings} />
    </AdminShell>
  );
}
