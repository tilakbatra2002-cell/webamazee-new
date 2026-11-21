import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { BlogEditor } from "@/components/admin/blog-editor";
import { requirePageAdmin } from "@/lib/cms/auth";
import {
  getAdminBlogById,
  getCmsSettings,
  listCategories,
} from "@/lib/cms/blogs-repo";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { admin } = await requirePageAdmin("blogs:edit");
  const { id } = await params;

  const [blog, categories, settings] = await Promise.all([
    getAdminBlogById(id),
    listCategories(),
    getCmsSettings(),
  ]);

  if (!blog) notFound();

  return (
    <AdminShell admin={admin}>
      <BlogEditor
        admin={admin}
        categories={categories}
        settings={settings}
        initialBlog={blog}
      />
    </AdminShell>
  );
}
