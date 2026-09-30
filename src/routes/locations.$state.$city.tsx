import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CITIES, inr } from "@/lib/mock-data";
import { officesQueryOptions } from "@/lib/queries/offices";
import { OfficeCard } from "@/components/OfficeCard";
import { QuoteForm } from "@/components/QuoteForm";
import { FaqAccordion } from "@/components/FaqAccordion";

export const Route = createFileRoute("/locations/$state/$city")({
  loader: async ({ params, context }) => {
    const city = CITIES.find(c => c.slug === params.city && c.stateSlug === params.state);
    if (!city) throw notFound();
    const offices = await context.queryClient.ensureQueryData(officesQueryOptions());
    return { city, offices };
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: `Virtual Office in ${loaderData?.city.name ?? params.city} — OfficeMate` },
      { name: "description", content: `Book a verified virtual office in ${loaderData?.city.name ?? params.city}. GST, business registration & mailing addresses starting at ${inr(loaderData?.city.startingPrice ?? 999)}.` },
      { property: "og:title", content: `Virtual Office in ${loaderData?.city.name ?? ""} — OfficeMate` },
    ],
    links: [{ rel: "canonical", href: `/locations/${params.state}/${params.city}` }],
    scripts: loaderData ? [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `OfficeMate ${loaderData.city.name}`,
        address: { "@type": "PostalAddress", addressLocality: loaderData.city.name, addressRegion: loaderData.city.state, addressCountry: "IN" },
      }),
    }] : [],
  }),
  component: CityPage,
});

function CityPage() {
  const { city, offices: allOffices } = Route.useLoaderData();
  const offices = allOffices.filter(o => o.citySlug === city.slug);

  return (
    <div>
      <section className="bg-gradient-to-b from-surface to-background">
        <div className="container-x py-12">
          <div className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/locations/$state" params={{ state: city.stateSlug }} className="hover:text-primary">{city.state}</Link> / <span className="text-navy">{city.name}</span>
          </div>
          <div className="mt-4 grid gap-8 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-extrabold sm:text-5xl">Virtual Office in {city.name}</h1>
              <p className="mt-3 text-muted-foreground">
                Establish your business address in one of {city.name}'s most sought-after business districts. GST-ready, MCA-compliant, and fully supported by our team.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">Starting {inr(city.startingPrice)}</span>
                <span className="rounded-full bg-orange/10 px-3 py-1 text-orange">{city.officeCount} offices</span>
              </div>
            </div>
            <img src={city.image} alt={city.name} className="rounded-2xl object-cover shadow-elevated" />
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <h2 className="text-2xl font-bold">Why use a virtual office in {city.name}?</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              `Prestigious ${city.name} business address`,
              "GST registration for the state",
              "MCA-compliant for Pvt Ltd registration",
              "Bank account opening support",
              "Courier & reception handling",
              "Meeting rooms on demand",
            ].map(b => (
              <div key={b} className="card-soft flex items-start gap-3 p-4"><Check className="mt-0.5 h-4 w-4 text-success" /><span className="text-sm text-navy">{b}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x">
          <h2 className="text-2xl font-bold">Available offices in {city.name}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map(o => <OfficeCard key={o.id} office={o} />)}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <h2 className="text-2xl font-bold">Popular business areas in {city.name}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {city.areas.map(a => <span key={a} className="rounded-full border bg-surface px-3 py-1 text-sm text-navy">{a}</span>)}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-x max-w-3xl">
          <h2 className="text-2xl font-bold">FAQs about {city.name} virtual offices</h2>
          <div className="mt-6"><FaqAccordion /></div>
        </div>
      </section>

      <section className="section-y bg-gradient-to-br from-primary to-navy text-white">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="!text-white text-3xl font-extrabold">Request a {city.name} quote</h2>
            <p className="mt-3 text-white/80">Tell us your requirement — we'll respond with availability and pricing.</p>
          </div>
          <div className="card-soft bg-white p-6 text-foreground"><QuoteForm defaultCity={city.slug} /></div>
        </div>
      </section>
    </div>
  );
}
