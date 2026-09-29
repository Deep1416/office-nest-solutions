import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, MapPin, Building2, ArrowRight, Sparkles, Users, FileText, Receipt, Mail,
  ShoppingBag, ClipboardList, HeadphonesIcon, Clock, ShieldCheck, CheckCircle2,
  Upload, Rocket, Phone, Star, Check, CreditCard, Camera, Navigation, MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CITIES, SERVICES, TESTIMONIALS, inr } from "@/lib/mock-data";
import { INDIA_OUTLINE_PATH, INDIA_OUTLINE_VIEWBOX } from "@/lib/india-outline";
import { FaqAccordion } from "@/components/FaqAccordion";
import { QuoteForm } from "@/components/QuoteForm";
import { CallbackTrigger } from "@/components/CallbackModal";
import { Annotation } from "@/components/Annotation";
import { BRAND, whatsappUrl } from "@/lib/config";

export const Route = createFileRoute("/")({
  component: Home,
});

const SERVICE_ICONS = { Building2, FileText, Receipt, Mail, ShoppingBag, Users };
const SERVICE_COLORS = [
  "bg-primary/10 text-primary",
  "bg-orange/10 text-orange",
  "bg-violet-500/10 text-violet-600",
  "bg-success/10 text-success",
  "bg-pink-500/10 text-pink-600",
  "bg-sky-500/10 text-sky-600",
];

const MAP_VIEW_W = 666.66669;
const MAP_VIEW_H = 777.33331;

const MAP_CITIES = [
  { slug: "delhi", x: 235, y: 190 },
  { slug: "noida", x: 335, y: 260 },
  { slug: "kolkata", x: 455, y: 300 },
  { slug: "mumbai", x: 78, y: 430 },
  { slug: "hyderabad", x: 390, y: 480 },
  { slug: "bengaluru", x: 345, y: 585 },
];

const MAP_TICKS = [
  [200, 150], [150, 260], [350, 260], [110, 360], [420, 360],
  [150, 460], [400, 450], [200, 550], [330, 560], [230, 650],
];

const STEPS = [
  { icon: ClipboardList, title: "Submit Details", desc: "Fill in your business requirements" },
  { icon: Upload, title: "Share Documents", desc: "Upload required KYC documents" },
  { icon: ShieldCheck, title: "Verification", desc: "Our team verifies your documents" },
  { icon: CheckCircle2, title: "Get Approval", desc: "Receive confirmation within 24-72 hours" },
  { icon: Rocket, title: "Go Live", desc: "Start using your virtual office address" },
];

type Plan = {
  key: string; title: string; blurb: string; monthly: number; recommended?: boolean; custom?: boolean;
  features: string[];
};
const PLANS: Plan[] = [
  {
    key: "starter", title: "Starter", blurb: "For freelancers & early-stage businesses", monthly: 699,
    features: ["Business address", "Mail handling", "Digital document access", "Basic support"],
  },
  {
    key: "professional", title: "Professional", blurb: "For growing businesses", monthly: 999, recommended: true,
    features: ["Everything in Starter", "Meeting room access", "GST support", "Dedicated account manager"],
  },
  {
    key: "business", title: "Business", blurb: "For established & multi-state businesses", monthly: 1499,
    features: ["Everything in Professional", "Multi-location support", "APOB/VPOB services", "Priority support"],
  },
  {
    key: "custom", title: "Custom Plan", blurb: "For large teams & special requirements", monthly: 0, custom: true,
    features: ["Multiple city setup", "Custom compliance support", "Dedicated relationship manager", "Flexible plans"],
  },
];

const KYC_DOCS = [
  { icon: CreditCard, title: "PAN Card", desc: "Company or individual" },
  { icon: FileText, title: "Aadhaar Card", desc: "For all directors/partners" },
  { icon: ClipboardList, title: "Incorporation Certificate", desc: "For Pvt Ltd / LLP / OPC" },
  { icon: MapPin, title: "Address Proof", desc: "Recent utility bill or bank statement" },
  { icon: Camera, title: "Director Photo", desc: "Recent passport size photograph" },
];

const LOGOS = ["TechGrow", "Bhush & Co.", "Verma Exports", "NeoEdge", "MedLife"];

function Home() {
  const [locationQuery, setLocationQuery] = useState("");
  const [yearly, setYearly] = useState(false);

  return (
    <>
      {/* 1. HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1741682740026-4147b4197806?w=1600&auto=format&fit=crop&q=60"
            alt="Modern office overlooking a city skyline"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background from-5% via-background/75 via-32% to-transparent to-58%" />
        </div>

        <div className="container-x relative py-16 lg:py-24">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="rounded-full bg-orange/10 text-orange hover:bg-orange/10">
              <Sparkles className="mr-1.5 h-3 w-3" /> Virtual Office Solutions Across India
            </Badge>
            <div className="relative">
              <h1 className="mt-4 max-w-md text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
                Your Business Everywhere <span className="text-primary">in India.</span>
              </h1>
              <Annotation
                text="Work Without Boundaries"
                className="absolute -top-4 left-full ml-2 w-32"
                rotate={-6}
                textClassName="text-navy/90"
                arrowClassName="text-orange"
              />
            </div>
            <p className="mt-4 max-w-md text-base text-muted-foreground">
              Get a prestigious business address, GST registration support, and complete virtual office solutions in 50+ cities.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-orange text-orange-foreground hover:bg-orange/90">
                <Link to="/virtual-offices">Find Your Location <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <CallbackTrigger>
                <Button size="lg" variant="outline" className="bg-white/70 backdrop-blur">Get a Free Quote</Button>
              </CallbackTrigger>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                [MapPin, "50+", "Cities"],
                [Users, "10,000+", "Businesses"],
                [Clock, "24-72 Hours", "Setup Time"],
                [HeadphonesIcon, "Dedicated", "Support"],
              ].map(([Icon, a, b]) => {
                const I = Icon as any;
                return (
                  <div key={b as string} className="flex items-center gap-2">
                    <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><I className="h-4 w-4" /></span>
                    <div>
                      <div className="text-sm font-extrabold text-navy leading-tight">{a as string}</div>
                      <div className="text-xs text-muted-foreground">{b as string}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOCATIONS */}
      <Section eyebrow="Our Locations" title="50+ Cities Across India" sub="Choose from our wide network of prime business locations in major cities and growing markets.">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex w-full max-w-md items-center gap-2 rounded-full border bg-white p-2 shadow-card">
              <input
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Search city (eg. Delhi, Mumbai, Pune)"
                className="h-11 flex-1 rounded-full bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button asChild size="icon" className="h-11 w-11 shrink-0 rounded-full bg-primary">
                <Link to="/virtual-offices" search={{}}><Search className="h-5 w-5" /></Link>
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {[
                [Building2, "Prime Locations"],
                [ShieldCheck, "GST Compliant"],
                [Clock, "Easy Setup"],
                [MapPin, "Pan India Support"],
              ].map(([Icon, l]) => {
                const I = Icon as any;
                return (
                  <div key={l as string} className="flex flex-col items-start gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary"><I className="h-4 w-4" /></span>
                    <span className="text-xs font-medium text-navy">{l as string}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative aspect-[667/777] w-full max-w-lg justify-self-center">
            <svg viewBox={INDIA_OUTLINE_VIEWBOX} className="absolute inset-0 h-full w-full overflow-visible">
              <path d={INDIA_OUTLINE_PATH} className="fill-primary/[0.06]" />
              <path d={INDIA_OUTLINE_PATH} fill="none" strokeDasharray="7 8" strokeWidth="3" className="stroke-primary/35" />
              {MAP_TICKS.map(([x, y], i) => (
                <rect key={i} x={x - 6} y={y - 6} width="12" height="12" rx="2" transform={`rotate(45 ${x} ${y})`} className="fill-primary/20" />
              ))}
            </svg>

            {MAP_CITIES.map((m, i) => {
              const city = CITIES.find((c) => c.slug === m.slug)!;
              return (
                <Link
                  key={m.slug}
                  to="/locations/$state/$city"
                  params={{ state: city.stateSlug, city: city.slug }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${(m.y / MAP_VIEW_H) * 100}%`, left: `${(m.x / MAP_VIEW_W) * 100}%` }}
                >
                  <div className="relative transition-transform group-hover:-translate-y-1">
                    <div className="overflow-hidden rounded-xl border-2 border-white shadow-elevated">
                      <img src={city.image} alt={city.name} className="h-11 w-16 object-cover" loading="lazy" />
                    </div>
                    <span className="absolute -left-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground ring-2 ring-white">
                      {i + 1}
                    </span>
                  </div>
                  <div className="mt-1 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-center text-[11px] font-semibold text-navy shadow-card">{city.name}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </Section>

      {/* 3. SERVICES */}
      <Section eyebrow="Our Services" title="Complete Business Solutions" sub="Everything you need to establish and grow your business in India." muted>
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="grid gap-4 sm:grid-cols-2">
            {SERVICES.map((s, i) => {
              const Icon = SERVICE_ICONS[s.icon as keyof typeof SERVICE_ICONS] ?? Building2;
              return (
                <div key={s.slug} className="card-soft card-soft-hover flex flex-col p-6">
                  <span className={`grid h-11 w-11 place-items-center rounded-lg ${SERVICE_COLORS[i % SERVICE_COLORS.length]}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-navy">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.short}</p>
                  <Link
                    to={`/services/${s.slug === "virtual-office" || s.slug === "meeting-room-access" ? "business-registration" : s.slug}` as any}
                    className="mt-3 text-sm font-medium text-primary hover:underline"
                  >
                    Learn more →
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="relative hidden lg:block">
            <Annotation text="All Essential Services Under One Roof" className="absolute -top-10 right-4" rotate={4} />
            <div className="mt-8 overflow-hidden rounded-3xl shadow-elevated">
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=60"
                alt="Business services"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* 4. HOW IT WORKS */}
      <Section eyebrow="How It Works" title="Get Started in 5 Simple Steps" sub="Setting up your virtual office is quick, easy and hassle-free.">
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <li key={s.title} className="card-soft p-5">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><s.icon className="h-5 w-5" /></span>
              </div>
              <div className="mt-4 font-semibold text-navy">{s.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-center gap-6 rounded-3xl bg-surface p-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&auto=format&fit=crop&q=60"
              alt="Support expert"
              className="h-14 w-14 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-navy">Need help getting started?</div>
              <p className="text-sm text-muted-foreground">Our experts are here to guide you through the process.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <CallbackTrigger>
              <Button className="bg-orange text-orange-foreground hover:bg-orange/90">Talk to an Expert</Button>
            </CallbackTrigger>
            <Button asChild variant="outline" className="border-success text-success hover:bg-success/10">
              <a href={whatsappUrl("Hello OfficeMate, I'd like help getting started.")} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-1.5 h-4 w-4" /> Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {/* 5. PRICING */}
      <Section eyebrow="Pricing Plans" title="Transparent & Flexible Plans" sub="Choose a plan that fits your business needs. No hidden charges, Ever." muted>
        <div className="mb-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setYearly(false)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${!yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          >
            Yearly <Badge className="bg-orange text-orange-foreground">Save 30%</Badge>
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {PLANS.map((p) => (
            <div key={p.key} className={`relative card-soft card-soft-hover flex flex-col p-6 ${p.recommended ? "ring-2 ring-primary" : ""}`}>
              {p.recommended && <Badge className="absolute -top-3 left-6 bg-orange text-orange-foreground">Most Popular</Badge>}
              <h3 className="text-lg font-bold text-navy">{p.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{p.blurb}</p>
              <div className="mt-4">
                {p.custom ? (
                  <div className="text-2xl font-extrabold text-navy">Talk to us</div>
                ) : (
                  <div className="text-3xl font-extrabold text-navy">
                    {inr(yearly ? Math.round(p.monthly * 0.7) : p.monthly)}
                    <span className="text-sm font-medium text-muted-foreground">/month</span>
                  </div>
                )}
              </div>
              <ul className="mt-5 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                    <span className="text-navy">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex-1" />
              {p.custom ? (
                <CallbackTrigger>
                  <Button variant="outline" className="w-full">Contact Us <ArrowRight className="ml-1 h-4 w-4" /></Button>
                </CallbackTrigger>
              ) : (
                <Button asChild className={p.recommended ? "w-full bg-orange text-orange-foreground hover:bg-orange/90" : "w-full bg-primary"}>
                  <Link to="/virtual-offices">Get Started <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* 6. KYC */}
      <Section eyebrow="KYC & Documents" title="Quick & Secure KYC" sub="Complete your verification with a few simple documents and get your business address live quickly.">
        <div className="relative grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          <Annotation text="Simple Documentation, Faster Activation" className="absolute -top-10 left-4" rotate={-4} />
          <div>
            <div className="mt-6 mb-3 text-sm font-semibold text-navy">Required Documents</div>
            <div className="grid gap-4 sm:grid-cols-2">
              {KYC_DOCS.map((d) => (
                <div key={d.title} className="card-soft flex items-center gap-3 p-4">
                  <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><d.icon className="h-5 w-5" /></span>
                  <div>
                    <div className="text-sm font-semibold text-navy">{d.title}</div>
                    <div className="text-xs text-muted-foreground">{d.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-primary p-6 text-primary-foreground">
            <div className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-5 w-5" /> Documents are Safe & Secure</div>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                "Encrypted & secure storage",
                "Used only for verification",
                "Completely confidential",
                "Quick processing (24-72 hrs)",
              ].map((l) => (
                <li key={l} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0" /> {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 7. TESTIMONIALS */}
      <Section eyebrow="Testimonials" title="Trusted by 10,000+ Businesses Across India" sub="From startups to established enterprises, businesses across India trust OfficeMate for their virtual office needs." muted>
        <div className="relative">
          <Annotation text="Real Businesses, Real Growth" className="absolute -top-12 right-4" rotate={5} />
          <div className="mb-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              ["10,000+", "Businesses"],
              ["50+", "Cities"],
              ["4.8/5", "Rating"],
              ["99%", "Client Satisfaction"],
            ].map(([a, b]) => (
              <div key={b} className="text-center">
                <div className="text-2xl font-extrabold text-navy">{a}</div>
                <div className="text-xs text-muted-foreground">{b}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <div key={t.name} className="card-soft card-soft-hover p-6">
                <div className="mb-2 flex gap-0.5 text-orange">
                  {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-sm text-navy">"{t.feedback}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">{t.initials}</span>
                  <div>
                    <div className="text-sm font-semibold text-navy">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-muted-foreground/70">
            {LOGOS.map((l) => <span key={l}>{l}</span>)}
            <span>and 10,000+ more.</span>
          </div>
        </div>
      </Section>

      {/* 8. FAQ */}
      <Section eyebrow="FAQs" title="Frequently Asked Questions" sub="Find answers to the most common questions about OfficeMate and our virtual office services.">
        <div className="relative grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <Annotation text="Still have questions? We're here to help" className="absolute -top-10 right-4" rotate={4} />
          <FaqAccordion />
          <div className="hidden overflow-hidden rounded-3xl shadow-elevated lg:block">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60"
              alt="OfficeMate support"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </div>
      </Section>

      {/* 9. GET A QUOTE */}
      <section className="section-y bg-surface">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary hover:bg-primary/10">Get a Quote</Badge>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Let's Get Your Business <span className="text-primary">Started</span></h2>
            <p className="mt-3 max-w-md text-muted-foreground">Tell us your requirements and our experts will get back to you with the best solution and pricing.</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <ContactCard icon={Phone} title="Call Us" line1={BRAND.phone} line2="Mon - Sat, 9AM - 7PM" />
              <ContactCard icon={Mail} title="Email Us" line1={BRAND.email} line2="We'll respond within 24 hours" />
              <ContactCard icon={MapPin} title="Our Office" line1={BRAND.address.split(",").slice(0, 2).join(",")} line2={BRAND.address.split(",").slice(2).join(",").trim()} />
              <ContactCard icon={MessageCircle} title="WhatsApp" line1="Get instant support" line2="Chat with our team" href={whatsappUrl("Hello OfficeMate, I'd like to know more about your virtual office services.")} />
            </div>

            <div className="relative mt-6 overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&auto=format&fit=crop&q=60"
                alt="Office location map"
                className="aspect-[16/7] w-full object-cover"
              />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAND.address)}`}
                target="_blank" rel="noreferrer"
                className="absolute bottom-3 right-3"
              >
                <Button size="sm" className="bg-white text-navy hover:bg-white/90">
                  <Navigation className="mr-1.5 h-4 w-4" /> Get Directions
                </Button>
              </a>
            </div>
          </div>

          <div className="card-soft bg-white p-6">
            <h3 className="text-lg font-bold text-navy">Send an Enquiry</h3>
            <div className="mt-4"><QuoteForm /></div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({ icon: Icon, title, line1, line2, href }: { icon: any; title: string; line1: string; line2: string; href?: string }) {
  const content = (
    <div className="card-soft flex items-start gap-3 p-4">
      <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="h-4 w-4" /></span>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-navy">{title}</div>
        <div className="truncate text-xs text-muted-foreground">{line1}</div>
        <div className="truncate text-xs text-muted-foreground">{line2}</div>
      </div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noreferrer">{content}</a> : content;
}

function Section({ eyebrow, title, sub, muted, children }: { eyebrow?: string; title: string; sub?: string; muted?: boolean; children: React.ReactNode }) {
  return (
    <section className={`section-y ${muted ? "bg-surface" : ""}`}>
      <div className="container-x">
        <div className="mb-10 max-w-2xl">
          {eyebrow && (
            <Badge variant="secondary" className="mb-3 rounded-full bg-primary/10 text-primary hover:bg-primary/10">{eyebrow}</Badge>
          )}
          <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
          {sub && <p className="mt-2 text-muted-foreground">{sub}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
