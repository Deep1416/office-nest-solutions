import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Eye, Heart, MapPin, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About OfficeNest — Virtual Offices Across India" }, { name: "description", content: "OfficeNest helps founders, freelancers and sellers set up compliant business addresses in 50+ Indian cities." }] }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="bg-gradient-to-b from-surface to-background">
        <div className="container-x py-16 max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Making pan-India business simple.</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            OfficeNest is a demo virtual-office marketplace connecting founders, freelancers, ecommerce sellers and consultants with verified business addresses across India. Register companies, get GST-ready and manage mail without leasing physical space.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          {[
            [Target, "Mission", "Democratize business infrastructure so any founder can operate in any Indian state, from anywhere."],
            [Eye, "Vision", "A world where physical geography never limits how a business grows."],
            [Heart, "Values", "Transparency, empathy, obsessive support and doing what we said we would."],
          ].map(([I, t, d]: any) => (
            <div key={t} className="card-soft p-6">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><I className="h-5 w-5" /></span>
              <div className="mt-3 text-lg font-bold">{t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x grid gap-8 lg:grid-cols-4">
          {[["50+", "Cities served"], ["10k+", "Businesses supported"], ["24-72h", "Avg setup time"], ["4.8★", "Customer rating"]].map(([a, b]) => (
            <div key={a} className="text-center">
              <div className="text-4xl font-extrabold text-primary">{a}</div>
              <div className="text-sm text-muted-foreground">{b}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <h2 className="text-2xl font-bold">Our approach</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[[MapPin, "Pan-India coverage", "50+ cities. Every metro plus emerging Tier-2 hubs."],
              [Users, "Customer-first", "Real humans, real answers, real accountability."],
              [TrendingUp, "Built to scale", "From your first company to your tenth GST filing."]].map(([I, t, d]: any) => (
              <div key={t} className="card-soft p-5">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-orange/10 text-orange"><I className="h-5 w-5" /></span>
                <div className="mt-3 font-semibold text-navy">{t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x">
          <h2 className="text-2xl font-bold">The team</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["AR", "PS", "VS", "NK"].map((i, idx) => (
              <div key={i} className="card-soft p-5 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-lg font-bold text-primary">{i}</div>
                <div className="mt-3 font-semibold text-navy">Team member {idx + 1}</div>
                <div className="text-xs text-muted-foreground">Operations & Compliance</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-gradient-to-br from-primary to-navy text-white">
        <div className="container-x text-center">
          <h2 className="!text-white text-3xl font-extrabold">Find your business address today</h2>
          <p className="mt-3 text-white/80">Browse 100+ offices across India.</p>
          <Button asChild size="lg" className="mt-6 bg-orange text-orange-foreground hover:bg-orange/90"><Link to="/virtual-offices">Find Virtual Office</Link></Button>
        </div>
      </section>
    </div>
  );
}
