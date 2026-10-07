import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight, BadgeIndianRupee, Briefcase, Building2, Check, FileText, Globe2, Handshake, Mail, MapPin,
  Rocket, ShoppingBag, ShoppingCart, TrendingUp, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteForm } from "@/components/QuoteForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CallbackTrigger } from "@/components/CallbackModal";
import { CITIES } from "@/lib/mock-data";
import { BRAND } from "@/lib/config";

const HERO_IMAGE = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=60";

const SERVICES = [
  [Building2, "Professional Business Address", "Get a premium commercial address in major Indian business hubs to build trust with customers and business partners."],
  [FileText, "Documentation for Business Setup", "Use a professional business address along with supporting address documentation for business setup, correspondence, and record management."],
  [ShoppingCart, "Ecommerce Seller Address", "Perfect solution for ecommerce sellers requiring APoB / VPoB addresses to expand operations across states."],
  [Mail, "Mail & Courier Handling", "Secure mail handling and forwarding services ensure that important business correspondence never gets missed."],
  [Handshake, "Meeting Room Access", "Access fully equipped professional meeting rooms whenever required to meet clients or partners."],
  [Globe2, "Multi-City Business Presence", "Establish a presence in multiple cities across India without renting physical offices."],
] as const;

const AUDIENCE = [
  [Rocket, "Startups", "Reduce operational costs while maintaining a credible business address."],
  [ShoppingBag, "Ecommerce Sellers", "Expand to multiple states with professional address documentation."],
  [Briefcase, "Freelancers & Consultants", "Operate professionally without renting expensive office space."],
  [TrendingUp, "Growing Businesses", "Establish presence in new markets without infrastructure costs."],
] as const;

const WHY = [
  [MapPin, "Pan India Locations", "Premium virtual office addresses across Delhi NCR, Hyderabad, Mumbai, Bengaluru, Chennai, Pune and other major business cities."],
  [BadgeIndianRupee, "Affordable Pricing", "Flexible and budget-friendly plans designed for startups and growing businesses."],
  [FileText, "Quick Documentation Support", "Fast documentation assistance to help businesses complete their setup smoothly."],
  [Users, "Trusted by Startups & Sellers", "Used by ecommerce sellers, entrepreneurs, agencies, and service businesses across India."],
  [Building2, "Professional Business Identity", "Build trust with customers, vendors, and financial institutions with a credible business address."],
] as const;

const BENEFITS = [
  "Significantly lower operational cost", "Professional commercial address",
  "Faster business expansion across states", "Improved credibility with clients and vendors",
  "Business-ready address documentation", "No long-term office lease commitments",
];

const STEPS = [
  ["Choose City & Plan", "Select your preferred city and virtual office plan."],
  ["Submit Documents", "Provide your business details and documentation."],
  ["Receive Address", "Get your virtual business address and documentation support."],
];

function Heading({ children, sub, left }: { children: ReactNode; sub?: string; left?: boolean }) {
  return (
    <div className={left ? "" : "mx-auto max-w-2xl text-center"}>
      <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">{children}</h2>
      <div className={`mt-3 h-1 w-16 rounded-full bg-primary ${left ? "" : "mx-auto"}`} />
      {sub && <p className="mt-5 text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function VirtualOfficeHero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <img src={HERO_IMAGE} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-navy/80" aria-hidden="true" />
      <div className="container-x relative py-14 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="!text-white text-4xl font-extrabold sm:text-5xl">
            Choose your <span className="text-orange">Virtual Office</span> PAN India with {BRAND.name}
          </h1>
          <p className="mt-4 text-white/85">
            Make the smart move to a virtual office in India and save big on overhead costs. Enjoy a professional business address and essential services without paying high rent.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-2xl rounded-2xl bg-white p-5 text-foreground shadow-elevated">
          <h2 className="text-center text-xl font-bold">Request a Free Quote</h2>
          <div className="mt-4"><QuoteForm compact /></div>
          <p className="mt-3 text-center text-xs text-muted-foreground">Our virtual office expert will assist you at the earliest — maximum response time 10 minutes</p>
        </div>
      </div>
    </section>
  );
}

export function VirtualOfficeContent() {
  return (
    <>
      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">Virtual Office for Business Address in India</h2>
            <div className="mt-5 space-y-4 text-muted-foreground">
              <p>Running a modern business no longer requires renting an expensive office space. With <strong className="text-navy">{BRAND.name} Virtual Office Solutions</strong>, you can operate your business from anywhere while maintaining a <strong className="text-navy">professional commercial address in major Indian cities.</strong></p>
              <p>Our virtual office services provide businesses with a <strong className="text-navy">business address, documentation support, mail handling, and meeting space access</strong>, helping startups, ecommerce sellers, and growing companies establish their presence without high operational costs.</p>
              <p>Whether you are launching a startup, expanding to new states, or building a multi-city business presence, <strong className="text-navy">{BRAND.name} helps you establish your business presence across India.</strong></p>
            </div>
          </div>
          <div>
            <Heading left>What is Virtual Office</Heading>
            <p className="mt-5 text-muted-foreground">
              A <strong className="text-navy">virtual office</strong> is a modern business solution that gives you a <strong className="text-navy">professional commercial address without the expense of leasing a full-time physical workspace.</strong> It helps startups, entrepreneurs, freelancers, consultants, remote teams, and growing businesses establish a credible business presence while working from anywhere. Many virtual office plans also include mail and courier handling, meeting room access on demand, reception support, and other business services. It's a flexible, cost-effective way to enhance your brand image, improve operational efficiency, and maintain a professional presence as your business grows — without the overhead of a traditional office.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x">
          <Heading sub="Our virtual office solutions are designed to support businesses at every stage — from startups and ecommerce sellers to expanding companies looking for a professional presence across India.">
            Virtual Office Services by {BRAND.name}
          </Heading>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(([Icon, title, text]) => (
              <div key={title} className="card-soft p-6 text-center transition hover:-translate-y-1 hover:border-primary/40">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary-50 text-primary"><Icon className="h-6 w-6" /></span>
                <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <Heading sub="Virtual office services are ideal for:">Who Should Use a Virtual Office?</Heading>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCE.map(([Icon, title, text]) => (
              <div key={title} className="card-soft p-6 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary-50 text-primary"><Icon className="h-6 w-6" /></span>
                <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x">
          <Heading>Why Choose {BRAND.name}?</Heading>
          <ol className="relative mt-10 space-y-8 before:absolute before:bottom-4 before:left-6 before:top-4 before:w-0.5 before:bg-primary/20">
            {WHY.map(([Icon, title, text]) => (
              <li key={title} className="relative flex gap-5">
                <span className="relative z-10 grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-card"><Icon className="h-5 w-5" /></span>
                <div>
                  <h3 className="text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x text-center">
          <Heading sub={`${BRAND.name} provides virtual office solutions in major business cities across India.`}>Cities Where Virtual Office is Available</Heading>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {CITIES.map(c => (
              <Link key={c.slug} to="/locations/$state/$city" params={{ state: c.stateSlug, city: c.slug }} className="rounded-full border border-primary px-5 py-2 text-sm font-medium text-navy transition-colors hover:bg-primary hover:text-primary-foreground">{c.name}</Link>
            ))}
            <span className="rounded-full border border-primary px-5 py-2 text-sm font-medium text-navy">And More</span>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x">
          <Heading>Benefits of a Virtual Business Address</Heading>
          <ul className="mt-10 grid gap-x-12 gap-y-5 sm:grid-cols-2">
            {BENEFITS.map(b => (
              <li key={b} className="flex items-start gap-3 text-navy">
                <span className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-3.5 w-3.5" /></span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <Heading sub={`Setting up a virtual office with ${BRAND.name} is simple and fast.`}>Get Your Virtual Office in 24–48 Hours</Heading>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {STEPS.map(([title, text], i) => (
              <div key={title} className="text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-lg font-bold text-primary-foreground">{i + 1}</span>
                <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Heading left>Start Your Business with a Professional Address</Heading>
            <p className="mt-5 text-muted-foreground">Whether you are a startup founder, ecommerce seller, consultant, or growing business, {BRAND.name} provides affordable virtual office solutions across India.</p>
            <p className="mt-3 text-muted-foreground">Get started today and establish your professional business presence without renting a physical office.</p>
            <ul className="mt-5 space-y-2">
              {["Multiple cities available", "Affordable plans", "Quick setup support", "Business-ready documentation"].map(i => (
                <li key={i} className="flex items-center gap-2 text-navy"><Check className="h-4 w-4 text-primary" />{i}</li>
              ))}
            </ul>
          </div>
          <div className="card-soft p-8 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-primary-50 text-primary"><Building2 className="h-7 w-7" /></span>
            <h3 className="mt-4 text-2xl font-bold text-navy">Build Your Business Presence</h3>
            <p className="mt-2 text-muted-foreground">Operate professionally with a premium business address in India's major commercial cities.</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary to-navy py-14 text-white">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="!text-white text-3xl font-extrabold">Get Your Virtual Office Today</h2>
            <p className="mt-2 text-white/85">Fill out the enquiry form and our team will help you find the best virtual office location for your business needs.</p>
          </div>
          <CallbackTrigger>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">Enquire Now <ArrowRight className="ml-1 h-4 w-4" /></Button>
          </CallbackTrigger>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <Heading>FAQs</Heading>
          <div className="mt-8"><FaqAccordion /></div>
        </div>
      </section>
    </>
  );
}
