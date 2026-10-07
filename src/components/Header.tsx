import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { BRAND, whatsappUrl } from "@/lib/config";
import { CallbackTrigger } from "./CallbackModal";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-accent">
      <div className="container-x flex h-16 items-center justify-between gap-4 ">
        <Logo />

        <nav className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavItem to="/" label="Home" />
              <NavItem to="/virtual-offices" label="Virtual Office" />

              <NavItem to="/services" label="Services" />

              <NavItem to="/about" label="About Us" />
              <NavItem to="/blogs" label="Blogs" />
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${BRAND.phone}`}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy"
          >
            <Phone className="h-4 w-4" /> {BRAND.phone}
          </a>
          <CallbackTrigger>
            <Button size="sm" className="bg-orange text-orange-foreground hover:bg-orange/90">
              Get a Quote
            </Button>
          </CallbackTrigger>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85%] max-w-sm p-0">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <Logo />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col p-2">
              {[
                ["/", "Home"],
                ["/virtual-offices", "Virtual Office"],
                ["/services", "Services"],
                ["/about", "About Us"],
                ["/blogs", "Blogs"],
              ].map(([to, label]) => (
                <Link
                  key={to + label}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-navy"
                >
                  {label}
                </Link>
              ))}
              <div className="mt-3 border-t pt-3 px-3 space-y-2 text-sm">
                <a
                  href={`tel:${BRAND.phone}`}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Phone className="h-4 w-4" /> {BRAND.phone}
                </a>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Mail className="h-4 w-4" /> {BRAND.email}
                </a>
              </div>
              <CallbackTrigger>
                <Button className="mx-3 mt-4 bg-orange text-orange-foreground hover:bg-orange/90">
                  Get a Quote
                </Button>
              </CallbackTrigger>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavigationMenuItem>
      <Link
        to={to}
        className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-navy/80"
        activeProps={{ className: "text-primary" }}
      >
        {label}
      </Link>
    </NavigationMenuItem>
  );
}

export function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-2 border-t bg-background/95 backdrop-blur lg:hidden">
      <a
        href={`tel:${BRAND.phone}`}
        className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-navy"
      >
        <Phone className="h-4 w-4" /> Call
      </a>
      <a
        href={whatsappUrl(
          "Hello OfficeMate, I'd like to know more about your virtual office services.",
        )}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 bg-success py-3 text-sm font-semibold text-success-foreground"
      >
        WhatsApp
      </a>
    </div>
  );
}
