"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { PageTransition } from "@/components/ui/page-transition";
import { WelcomePopup } from "@/components/layout/welcome-popup";
import { SeoAuditProvider } from "@/components/seo-audit/seo-audit-provider";

export function RouteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isNewHome = pathname === "/newhome" || pathname?.startsWith("/newhome/");

  if (isNewHome) {
    return <>{children}</>;
  }

  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      <SeoAuditProvider>
        <Navbar />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </SeoAuditProvider>
      <WelcomePopup />
    </>
  );
}
