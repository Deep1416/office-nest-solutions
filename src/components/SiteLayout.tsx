import { Toaster } from "@/components/ui/sonner";
import { Header, MobileStickyBar } from "./Header";
import { Footer, FooterBottomBar } from "./Footer";
import { SeoLinks } from "./SeoLinks";
import { WhatsAppFloating } from "./WhatsAppFloating";
import type { ReactNode } from "react";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer />
      <SeoLinks />
      <FooterBottomBar />
      <WhatsAppFloating />
      <MobileStickyBar />
      <Toaster position="top-center" richColors />
    </div>
  );
}
