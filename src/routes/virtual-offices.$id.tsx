import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, MapPin, Check, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SERVICE_LABEL, inr, type ServiceType } from "@/lib/mock-data";
import { officeQueryOptions, officesQueryOptions } from "@/lib/queries/offices";
import { OfficeCard } from "@/components/OfficeCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CallbackTrigger } from "@/components/CallbackModal";
import { absoluteUrl, breadcrumbLd, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/virtual-offices/$id")({
  loader: async ({ params, context }) => {
    const [office, offices] = await Promise.all([
      context.queryClient.ensureQueryData(officeQueryOptions(params.id)),
      context.queryClient.ensureQueryData(officesQueryOptions()),
    ]);
    if (!office) throw notFound();
    return { office, offices };
  },
  head: ({ loaderData, params }) => {
    const o = loaderData?.office;
    const path = `/virtual-offices/${params.id}`;
    return seoHead({
      title: o ? `${o.name}, ${o.city} — Virtual Office | OfficeMate` : "Virtual Office — OfficeMate",
      description: o?.description.slice(0, 160) ?? "",
      path,
      image: o?.image,
      jsonLd: o
        ? [
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: o.name,
              url: absoluteUrl(path),
              image: o.image,
              address: { "@type": "PostalAddress", addressLocality: o.city, addressRegion: o.state, addressCountry: "IN" },
            },
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Virtual Offices", path: "/virtual-offices" },
              { name: o.name, path },
            ]),
          ]
        : [],
    });
  },
  component: Details,
});

function Details() {
  const { office, offices } = Route.useLoaderData();
  const [service, setService] = useState<ServiceType>(office.services[0]);
  const [duration, setDuration] = useState<"1y" | "2y">("1y");
  const basePrice = office.pricing[service] ?? 999;
  const price = duration === "1y" ? basePrice : Math.round(basePrice * 1.8);

  const similar = offices.filter(o => o.id !== office.id && o.citySlug === office.citySlug).slice(0, 3);

  return (
    <div className="bg-background">
      <div className="container-x py-8">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link> /{" "}
          <Link to="/virtual-offices" className="hover:text-primary">Virtual Offices</Link> /{" "}
          <span className="text-navy">{office.name}</span>
        </nav>

        <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            {/* Gallery */}
            <div className="grid grid-cols-4 gap-2">
              <img src={office.gallery[0]} alt={office.name} className="col-span-4 aspect-[16/9] w-full rounded-2xl object-cover sm:col-span-3" />
              <div className="hidden sm:grid gap-2">
                {office.gallery.slice(1, 3).map((g, i) => (
                  <img key={i} src={g} alt="" className="aspect-square w-full rounded-xl object-cover" />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h1 className="text-3xl font-extrabold">{office.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {office.area}, {office.city}, {office.state}</span>
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-orange text-orange" /> {office.rating.toFixed(1)} ({office.reviews} reviews)</span>
              </div>
              <p className="mt-4 text-muted-foreground">{office.description}</p>
            </div>

            <Section title="Available services">
              <div className="grid gap-3 sm:grid-cols-3">
                {office.services.map(s => (
                  <div key={s} className="card-soft p-4">
                    <div className="text-sm font-semibold text-navy">{SERVICE_LABEL[s]}</div>
                    <div className="mt-1 text-xl font-extrabold text-primary">{inr(office.pricing[s] ?? 0)}<span className="text-xs font-medium text-muted-foreground">/yr</span></div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Amenities">
              <ul className="grid gap-2 sm:grid-cols-2">
                {office.amenities.map(a => (
                  <li key={a} className="flex items-center gap-2 text-sm text-navy"><Check className="h-4 w-4 text-success" /> {a}</li>
                ))}
              </ul>
            </Section>

            <Section title="Included documents">
              <ul className="grid gap-2 sm:grid-cols-2">
                {["Rent / lease agreement", "No Objection Certificate (NOC)", "Utility bill copy", "Signage / board placement"].map(d => (
                  <li key={d} className="flex items-center gap-2 text-sm text-navy"><Check className="h-4 w-4 text-success" /> {d}</li>
                ))}
              </ul>
            </Section>

            <Section title="Location & nearby">
              <div className="grid aspect-[16/8] w-full place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-orange/10 text-sm text-muted-foreground">
                Map placeholder — {office.area}, {office.city}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {office.landmarks.map(l => <Badge key={l} variant="secondary">{l}</Badge>)}
              </div>
            </Section>

            <Section title="Terms & refunds">
              <p className="text-sm text-muted-foreground">
                Refund available within 7 days if the address is unusable for the intended purpose. Contract minimum is one year. Signage subject to landlord approval.
              </p>
            </Section>

            <Section title="Frequently asked questions">
              <FaqAccordion />
            </Section>
          </div>

          {/* Sticky booking card */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="card-soft p-6">
              <div className="text-xs text-muted-foreground">Selected service</div>
              <div className="mt-2 grid gap-2">
                {office.services.map(s => (
                  <button key={s} onClick={() => setService(s)} className={`flex items-center justify-between rounded-md border p-3 text-left text-sm ${service === s ? "border-primary bg-primary/5" : ""}`}>
                    <span className="font-medium">{SERVICE_LABEL[s]}</span>
                    <span className="font-semibold">{inr(office.pricing[s] ?? 0)}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <div className="text-xs text-muted-foreground">Duration</div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(["1y", "2y"] as const).map(d => (
                    <button key={d} onClick={() => setDuration(d)} className={`rounded-md border py-2 text-sm ${duration === d ? "border-primary bg-primary/5" : ""}`}>
                      {d === "1y" ? "1 year" : "2 years"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-5 border-t pt-4">
                <div className="flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span>{inr(price)}</span></div>
                <div className="flex justify-between text-sm text-muted-foreground"><span>Taxes (18%)</span><span>{inr(Math.round(price * 0.18))}</span></div>
                <div className="mt-2 flex justify-between text-lg font-extrabold text-navy"><span>Total</span><span>{inr(Math.round(price * 1.18))}</span></div>
              </div>
              <div className="mt-4 grid gap-2">
                <Button asChild className="bg-primary">
                  <Link to="/booking/$officeId" params={{ officeId: office.id }} search={{ plan: service, duration }}>
                    Proceed to Book <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <CallbackTrigger>
                  <Button variant="outline">Request Callback</Button>
                </CallbackTrigger>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5 text-success" /> Refund-friendly · Verified address
              </div>
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <Section title="Similar offices nearby">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map(o => <OfficeCard key={o.id} office={o} />)}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
