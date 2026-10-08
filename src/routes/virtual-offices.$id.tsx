import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, MapPin, Check, Users, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { OFFICE_ADDONS, SERVICE_LABEL, inr, type ServiceType } from "@/lib/mock-data";
import { googleMapsEmbedUrl } from "@/lib/config";
import { QuoteForm } from "@/components/QuoteForm";
import { officeQueryOptions, officesQueryOptions } from "@/lib/queries/offices";
import { OfficeCard } from "@/components/OfficeCard";
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
  const [activeImage, setActiveImage] = useState(0);
  const plans = office.services.filter(s => office.pricing[s] != null);
  const similar = offices.filter(o => o.id !== office.id && o.citySlug === office.citySlug).slice(0, 3);

  return (
    <div className="bg-background">
      <div className="border-b">
        <div className="container-x py-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/virtual-offices">Virtual offices</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/locations/$state" params={{ state: office.stateSlug }}>{office.state}</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>{office.area}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container-x py-8 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-12">
          {/* Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <img src={office.gallery[activeImage]} alt={office.name} className="aspect-4/5 w-full rounded-2xl object-cover shadow-md" />
            <div className="mt-3 flex gap-2">
              {office.gallery.map((g, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`Show photo ${i + 1}`}
                  aria-pressed={activeImage === i}
                  className={`min-w-0 flex-1 overflow-hidden rounded-lg border-2 transition ${activeImage === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  <img src={g} alt="" className="aspect-4/3 w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-1"><MapPin className="h-3 w-3" /> {office.city}, {office.state}</Badge>
              {office.rating != null && (
                <Badge variant="secondary" className="gap-1"><Star className="h-3 w-3 fill-orange text-orange" /> {office.rating.toFixed(1)} · {office.reviews} reviews</Badge>
              )}
              <Badge variant="secondary" className="gap-1"><Shield className="h-3 w-3 text-success" /> Verified address</Badge>
            </div>
            <h1 className="mt-4 text-3xl text-navy sm:text-4xl">
              {office.name} at <span className="font-extrabold">{office.area}</span>
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">{office.description}</p>

            <h2 className="mt-8 text-lg font-extrabold">Choose your plan</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Available plans">
              {plans.map(s => {
                const selected = service === s;
                return (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setService(s)}
                    className={`relative rounded-xl border-2 p-4 text-left transition ${selected ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card hover:border-primary/40"}`}
                  >
                    <span className={`absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full ${selected ? "bg-primary text-primary-foreground" : "border border-border"}`}>
                      {selected && <Check className="h-3 w-3" />}
                    </span>
                    <span className="block pr-6 text-sm font-semibold text-navy">{SERVICE_LABEL[s]}</span>
                    <span className="mt-3 block text-2xl font-extrabold text-primary">{inr(office.pricing[s] as number)}</span>
                    <span className="text-xs text-muted-foreground">per year + 18% GST</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-muted p-4">
              <div>
                <div className="text-xs text-muted-foreground">Selected plan</div>
                <div className="font-bold text-navy">{SERVICE_LABEL[service]} · {inr(office.pricing[service] as number)}/yr</div>
              </div>
              <div className="flex flex-wrap gap-3">
                <CallbackTrigger>
                  <Button variant="outline" className="bg-background">Request Callback</Button>
                </CallbackTrigger>
                <Button asChild className="bg-primary">
                  <Link to="/booking/$officeId" params={{ officeId: office.id }} search={{ plan: service }}>
                    Proceed to checkout <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="flex items-center gap-2 text-lg font-extrabold"><Users className="h-5 w-5 text-primary" /> Optional add-ons</h2>
              <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {OFFICE_ADDONS.map(a => (
                  <li key={a} className="flex items-center gap-2 text-sm text-navy"><Check className="h-4 w-4 shrink-0 text-success" /> {a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Location + quote */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <section>
            <h2 className="flex items-center gap-2 text-xl font-extrabold"><MapPin className="h-5 w-5 text-primary" /> Location</h2>
            <iframe
              title={`Map of ${office.area}, ${office.city}`}
              src={googleMapsEmbedUrl(`${office.area}, ${office.city}, ${office.state}`)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-4 h-[420px] w-full rounded-xl border-0 lg:h-[520px]"
            />
          </section>

          <aside className="h-fit lg:sticky lg:top-24">
            <div className="card-soft border-t-4 border-t-primary p-6">
              <h2 className="text-xl font-extrabold">Request A Free Quote</h2>
              <p className="mt-1 text-sm text-muted-foreground">Tell us what you need — we reply within a few hours.</p>
              <div className="mt-5">
                <QuoteForm compact stacked defaultCity={office.citySlug} />
              </div>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5 text-success" /> No spam. Your details stay private.
              </p>
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
    <section className="mt-12">
      <h2 className="text-xl font-extrabold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
