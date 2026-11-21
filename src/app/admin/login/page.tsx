import { redirect } from "next/navigation";
import { getCurrentAdminSession, isCmsAuthReady } from "@/lib/cms/auth";
import { LoginForm } from "@/components/admin/login-form";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; reason?: string }>;
}) {
  const sp = await searchParams;
  const authReady = isCmsAuthReady();

  if (authReady) {
    const session = await getCurrentAdminSession();
    if (session) {
      redirect("/admin");
    }
  }

  return <LoginForm authReady={authReady} nextPath={sp.next} />;
}
