import { Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteForm } from "@/components/QuoteForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import type { LucideIcon } from "lucide-react";

export interface ServicePageProps {
  slug: string;
  title: string;
  tagline: string;
  hero: string;
  whoNeeds: string[];
  benefits: { title: string; body: string; icon: LucideIcon }[];
  documents: string[];
  process: { step: string; body: string }[];
  faqs: { q: string; a: string }[];
  image: string;
}

export function ServicePage(p: ServicePageProps) {
  return (
    <div>
      <section className="bg-gradient-to-b from-surface to-background">
        <div className="container-x grid gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">{p.tagline}</div>
            <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">{p.title}</h1>
            <p className="mt-4 text-muted-foreground">{p.hero}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="bg-primary" size="lg"><Link to="/virtual-offices">Find Office <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
              <Button asChild variant="outline" size="lg"><a href="#quote">Get Free Quote</a></Button>
            </div>
          </div>
          <img src={p.image} alt={p.title} className="rounded-2xl object-cover shadow-elevated" />
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Who needs this service?</h2>
            <ul className="mt-4 space-y-2">
              {p.whoNeeds.map(w => <li key={w} className="flex items-start gap-2 text-navy"><Check className="mt-0.5 h-4 w-4 text-success" /> {w}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Documents required</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {p.documents.map(d => <li key={d} className="rounded-lg border bg-surface p-3 text-sm text-navy">{d}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x">
          <h2 className="text-2xl font-bold">Key benefits</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.benefits.map(b => (
              <div key={b.title} className="card-soft p-5">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><b.icon className="h-5 w-5" /></span>
                <div className="mt-3 font-semibold text-navy">{b.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <h2 className="text-2xl font-bold">How the process works</h2>
          <ol className="mt-6 grid gap-4 lg:grid-cols-4">
            {p.process.map((s, i) => (
              <li key={s.step} className="card-soft p-5">
                <div className="text-3xl font-extrabold text-primary/30">{String(i + 1).padStart(2, "0")}</div>
                <div className="mt-2 font-semibold text-navy">{s.step}</div>
                <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x max-w-3xl">
          <h2 className="text-2xl font-bold">FAQs</h2>
          <div className="mt-6"><FaqAccordion items={p.faqs} /></div>
        </div>
      </section>

      <section id="quote" className="section-y bg-gradient-to-br from-primary to-navy text-white">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="!text-white text-3xl font-extrabold">Ready to get started?</h2>
            <p className="mt-3 text-white/80">Fill this quick form and our team will call you back with pricing and next steps.</p>
          </div>
          <div className="card-soft bg-white p-6 text-foreground"><QuoteForm /></div>
        </div>
      </section>
    </div>
  );
}
