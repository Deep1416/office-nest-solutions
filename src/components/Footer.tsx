import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, type LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { BRAND } from "@/lib/config";
import { toast } from "sonner";
import { CITIES } from "@/lib/mock-data";

const SOCIAL_LINKS: { icon: LucideIcon; platform: string }[] = [
  { icon: Linkedin, platform: "LinkedIn" },
  { icon: Twitter, platform: "Twitter" },
  { icon: Facebook, platform: "Facebook" },
  { icon: Instagram, platform: "Instagram" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-navy text-navy-foreground">
      <div className="container-x grid gap-10 py-14 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          <div className="[&_span]:!text-white"><Logo /></div>
          <p className="max-w-sm text-sm text-white/70">
            {BRAND.tagline}. OfficeMate helps founders, sellers and consultants set up compliant business addresses across India — faster, cheaper and simpler.
          </p>
          <div className="space-y-2 text-sm text-white/70">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> {BRAND.phone}</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> {BRAND.email}</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {BRAND.address}</div>
          </div>
          <div className="flex gap-3 pt-2">
            {SOCIAL_LINKS.map(({ icon: Icon, platform }) => (
              <a key={platform} href="#" aria-label={`OfficeMate on ${platform}`} className="grid h-9 w-9 place-items-center rounded-md bg-white/10 hover:bg-white/20">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Quick Links" links={[
          ["/", "Home"], ["/virtual-offices", "Virtual Offices"], ["/about", "About Us"],
          ["/blogs", "Blogs"], ["/admin", "Admin"],
        ]} />

        <FooterCol title="Services" links={[
          ["/services/business-registration", "Business Registration"],
          ["/services/gst-registration", "GST Registration"],
          ["/services/mailing-address", "Mailing Address"],
          ["/services/ecommerce-apob-vpob", "Ecommerce APoB/VPoB"],
        ]} />

        <FooterCol title="Popular Cities" links={CITIES.slice(0, 8).map(c => [`/locations/${c.stateSlug}/${c.slug}`, c.name]) as [string, string][]} />
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Subscribed to the OfficeMate newsletter"); (e.target as HTMLFormElement).reset(); }}
            className="flex w-full max-w-md items-center gap-2"
          >
            <Input required type="email" aria-label="Email address" placeholder="Your email" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
            <Button type="submit" className="bg-orange text-orange-foreground hover:bg-orange/90">Subscribe</Button>
          </form>
        </div>
      </div>
    </footer>
  );
}

export function FooterBottomBar() {
  return (
    <div className="border-t border-white/10 bg-navy text-navy-foreground">
      <div className="container-x flex flex-col items-center gap-2 py-4 text-xs text-white/60 md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms & Conditions</a>
          <a href="#" className="hover:text-white">Refund Policy</a>
        </div>
      </div>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="mb-3 text-sm font-semibold text-white">{title}</div>
      <ul className="space-y-2 text-sm text-white/70">
        {links.map(([to, label]) => (
          <li key={to + label}><Link to={to} className="hover:text-white">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
