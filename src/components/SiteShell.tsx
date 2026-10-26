"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import { CatalogProvider } from "./CatalogProvider";

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <CatalogProvider>
      <div className="flex min-h-screen flex-col bg-white dark:bg-[#0f1115] text-stone-900 dark:text-stone-100">
        <TopBar />
        <Navbar />
        <main className="flex min-w-0 flex-1 flex-col">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </CatalogProvider>
  );
}
