import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { LocationHero } from "@/components/LocationHero";
import { CITIES, inr } from "@/lib/mock-data";
import { officesQueryOptions } from "@/lib/queries/offices";
import { OfficeCard } from "@/components/OfficeCard";
import { CityContent } from "@/components/CityContent";
import { FaqAccordion } from "@/components/FaqAccordion";
import { absoluteUrl, breadcrumbLd, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/locations/$state/$city")({
  loader: async ({ params, context }) => {
    const city = CITIES.find(c => c.slug === params.city && c.stateSlug === params.state);
    if (!city) throw notFound();
    const offices = await context.queryClient.ensureQueryData(officesQueryOptions());
    return { city, offices };
  },
  head: ({ loaderData, params }) => {
    const name = loaderData?.city.name ?? params.city;
    const path = `/locations/${params.state}/${params.city}`;
    return seoHead({
      title: `Virtual Office in ${name} for GST & Registration — OfficeMate`,
      description: `Book a verified virtual office in ${name}. GST, business registration & mailing addresses starting at ${inr(loaderData?.city.startingPrice ?? 999)}.`,
      path,
      image: loaderData?.city.image,
      jsonLd: loaderData
        ? [
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: `OfficeMate ${name}`,
              url: absoluteUrl(path),
              image: loaderData.city.image,
              address: { "@type": "PostalAddress", addressLocality: name, addressRegion: loaderData.city.state, addressCountry: "IN" },
            },
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: loaderData.city.state, path: `/locations/${params.state}` },
              { name, path },
            ]),
          ]
        : [],
    });
  },
  component: CityPage,
});

function CityPage() {
  const { city, offices: allOffices } = Route.useLoaderData();
  const offices = allOffices.filter(o => o.citySlug === city.slug);

  return (
    <div>
      <LocationHero
        title={city.name}
        image={city.image}
        defaultCity={city.slug}
        breadcrumb={<><Link to="/" className="hover:text-white">Home</Link> / <Link to="/locations/$state" params={{ state: city.stateSlug }} className="hover:text-white">{city.state}</Link> / <span className="text-white">{city.name}</span></>}
      />

      <section className="section-y bg-surface">
        <div className="container-x">
          <h2 className="text-2xl font-bold">Available offices in {city.name}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map(o => <OfficeCard key={o.id} office={o} />)}
          </div>
        </div>
      </section>

      <section className="py-8 lg:py-10">
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

      <CityContent city={city.name} state={city.state} />

      <section className="section-y bg-surface">
        <div className="container-x">
          <h2 className="text-2xl font-bold">FAQs about {city.name} virtual offices</h2>
          <div className="mt-6"><FaqAccordion /></div>
        </div>
      </section>
    </div>
  );
}
