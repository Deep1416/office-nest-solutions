import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MapPin, Building2, ArrowRight, Shield, Sparkles, Wallet, Users, FileText, Receipt, Mail, ShoppingBag, ClipboardList, Award, RefreshCcw, HeadphonesIcon, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CITIES, STATES, SERVICES, PURPOSES, inr } from "@/lib/mock-data";
import { PricingTable } from "@/components/PricingTable";
import { KycTabs } from "@/components/KycTabs";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { FaqAccordion } from "@/components/FaqAccordion";
import { QuoteForm } from "@/components/QuoteForm";
import { CallbackTrigger } from "@/components/CallbackModal";

export const Route = createFileRoute("/")({
  component: Home,
});

const ICONS = { Building2, FileText, Receipt, Mail, ShoppingBag, Users };

function Home() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [purpose, setPurpose] = useState("");
  const cityOptions = state ? CITIES.filter(c => c.stateSlug === state) : CITIES;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-background">
        <div className="container-x grid gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary hover:bg-primary/10"><Sparkles className="mr-1.5 h-3 w-3" /> PAN-India Virtual Office Solutions</Badge>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Build Your Business Presence <span className="text-primary">Across India</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              Professional business addresses in 50+ cities. Get GST-ready, register your company, and manage mail — all without leasing physical space.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-primary"><Link to="/virtual-offices">Find Virtual Office <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
              <CallbackTrigger>
                <Button size="lg" variant="outline">Request Free Consultation</Button>
              </CallbackTrigger>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["50+", "Cities"], ["24-72h", "Setup"], ["Dedicated", "Support"], ["Transparent", "Pricing"],
              ].map(([a, b]) => (
                <div key={a}><div className="text-lg font-extrabold text-navy">{a}</div><div className="text-xs text-muted-foreground">{b}</div></div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-primary/10 to-orange/10 blur-2xl" />
            <img src="https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&auto=format&fit=crop&q=60" alt="Modern office" className="w-full rounded-2xl object-cover shadow-elevated" />
          </div>
        </div>

        {/* Search panel */}
        <div className="container-x -mt-6 pb-10">
          <div className="card-soft grid gap-3 p-4 sm:p-6 lg:grid-cols-[1fr_1fr_1fr_auto]">
            <Field label="State">
              <Select value={state} onValueChange={(v) => { setState(v); setCity(""); }}>
                <SelectTrigger><SelectValue placeholder="Choose state" /></SelectTrigger>
                <SelectContent>{STATES.map(s => <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="City">
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger><SelectValue placeholder="Choose city" /></SelectTrigger>
                <SelectContent>{cityOptions.map(c => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Purpose">
              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger><SelectValue placeholder="What do you need?" /></SelectTrigger>
                <SelectContent>{PURPOSES.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Button asChild size="lg" className="bg-orange text-orange-foreground hover:bg-orange/90">
              <Link to="/virtual-offices" search={{}}><Search className="mr-1 h-4 w-4" /> Search</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* POPULAR LOCATIONS */}
      <Section title="Popular Locations" sub="Explore our virtual offices in India's busiest business hubs.">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CITIES.slice(0, 8).map(c => (
            <Link key={c.slug} to="/locations/$state/$city" params={{ state: c.stateSlug, city: c.slug }} className="card-soft card-soft-hover group overflow-hidden">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <img src={c.image} alt={c.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="text-lg font-bold">{c.name}</div>
                  <div className="text-xs opacity-90">{c.officeCount} offices · from {inr(c.startingPrice)}</div>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3 text-sm font-medium text-primary">Explore <ArrowRight className="h-4 w-4" /></div>
            </Link>
          ))}
          <Link to="/virtual-offices" className="card-soft card-soft-hover flex items-center justify-center bg-primary text-primary-foreground">
            <div className="p-6 text-center">
              <MapPin className="mx-auto h-6 w-6" />
              <div className="mt-2 font-bold">View All Locations</div>
              <div className="text-xs opacity-80">50+ cities</div>
            </div>
          </Link>
        </div>
      </Section>

      {/* SERVICES */}
      <Section title="Everything you need to run your business" sub="One address. Complete compliance." muted>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(s => {
            const Icon = ICONS[s.icon as keyof typeof ICONS] ?? Building2;
            return (
              <div key={s.slug} className="card-soft card-soft-hover flex flex-col p-6">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-4 text-lg font-semibold text-navy">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.short}</p>
                <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                  {s.benefits.map(b => <li key={b}>· {b}</li>)}
                </ul>
                <div className="mt-4 flex-1" />
                <Link to={`/services/${s.slug === "virtual-office" || s.slug === "meeting-room-access" ? "business-registration" : s.slug}` as any} className="text-sm font-medium text-primary hover:underline">Learn more →</Link>
              </div>
            );
          })}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section title="How OfficeMate works" sub="Get your business address live in five simple steps.">
        <ol className="grid gap-6 lg:grid-cols-5">
          {[
            ["Select location", "Pick from 50+ cities"],
            ["Choose a plan", "Pricing that fits your stage"],
            ["Submit details", "Business & KYC information"],
            ["Payment & KYC", "Secure, transparent, quick"],
            ["Get documents", "Rent agreement, NOC, utility bill"],
          ].map(([t, s], i, arr) => (
            <li key={t} className="relative">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-primary text-primary-foreground font-bold">{i + 1}</span>
                <div>
                  <div className="font-semibold text-navy">{t}</div>
                  <div className="text-sm text-muted-foreground">{s}</div>
                </div>
              </div>
              {i < arr.length - 1 && <div className="absolute left-10 top-10 hidden h-px w-full bg-border lg:block" />}
            </li>
          ))}
        </ol>
      </Section>

      {/* WHY US */}
      <Section title="Why choose OfficeMate" muted>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            [Sparkles, "Quick address setup", "Live in 24–72 hours across most cities."],
            [Users, "Dedicated account manager", "One person, end-to-end, always reachable."],
            [ClipboardList, "Expert registration support", "GST, MCA, and pan-India expertise."],
            [Wallet, "Transparent pricing", "No hidden fees. Ever."],
            [BadgeCheck, "Verified documentation", "All addresses backed by valid paperwork."],
            [Shield, "Refund assurance", "Where applicable, we stand by our service."],
          ].map(([Icon, t, d]) => (
            <div key={t as string} className="card-soft p-5">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-orange/10 text-orange">
                {(() => { const I = Icon as any; return <I className="h-5 w-5" />; })()}
              </span>
              <div className="mt-3 font-semibold text-navy">{t as string}</div>
              <p className="mt-1 text-sm text-muted-foreground">{d as string}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PRICING */}
      <Section title="Simple, transparent pricing" sub="Choose the plan that matches your compliance needs.">
        <PricingTable />
      </Section>

      {/* KYC */}
      <Section title="KYC documents required" sub="Get your paperwork ready — we help with the rest." muted>
        <KycTabs />
      </Section>

      {/* TESTIMONIALS */}
      <Section title="Loved by founders across India" sub="Demo testimonials for illustration.">
        <TestimonialsCarousel />
      </Section>

      {/* FAQ */}
      <Section title="Frequently asked questions" muted>
        <div className="mx-auto max-w-3xl"><FaqAccordion /></div>
      </Section>

      {/* QUOTE */}
      <section className="section-y bg-gradient-to-br from-primary to-navy text-white">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="!text-white text-3xl font-extrabold sm:text-4xl">Get a free custom quote</h2>
            <p className="mt-3 text-white/80">Tell us what you need. We'll get back to you with pricing, availability and next steps within a few hours.</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {([[Award, "Verified addresses"], [HeadphonesIcon, "Human support"], [Wallet, "No hidden fees"], [RefreshCcw, "Address transfer"]] as const).map(([I, l]) => (
                <div key={l} className="flex items-center gap-2 text-sm text-white/90">
                  <I className="h-4 w-4" /> {l}
                </div>
              ))}
            </div>
          </div>
          <div className="card-soft bg-white p-6 text-foreground">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ title, sub, muted, children }: { title: string; sub?: string; muted?: boolean; children: React.ReactNode }) {
  return (
    <section className={`section-y ${muted ? "bg-surface" : ""}`}>
      <div className="container-x">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
          {sub && <p className="mt-2 text-muted-foreground">{sub}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <label className="text-xs font-medium text-navy/70">{label}</label>
      {children}
    </div>
  );
}
