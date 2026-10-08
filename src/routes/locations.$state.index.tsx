import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CITIES, STATES, OFFICE_FALLBACK_IMAGE } from "@/lib/mock-data";
import { officesQueryOptions } from "@/lib/queries/offices";
import { LocationHero } from "@/components/LocationHero";
import { OfficeCard } from "@/components/OfficeCard";
import { breadcrumbLd, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/locations/$state/")({
  loader: async ({ params, context }) => {
    const state = STATES.find(s => s.slug === params.state);
    if (!state) throw notFound();
    const offices = await context.queryClient.ensureQueryData(officesQueryOptions());
    return { state, offices };
  },
  head: ({ loaderData, params }) => {
    const name = loaderData?.state.name ?? params.state.replace(/-/g, " ");
    const path = `/locations/${params.state}`;
    return seoHead({
      title: `Virtual Office in ${name} — GST & Business Address | OfficeMate`,
      description: `Explore verified virtual office locations across ${name}. GST registration, company registration and mailing addresses with transparent pricing.`,
      path,
      jsonLd: [breadcrumbLd([{ name: "Home", path: "/" }, { name, path }])],
    });
  },
  component: StatePage,
});

function StatePage() {
  const { state, offices: allOffices } = Route.useLoaderData();
  const cities = CITIES.filter(c => c.stateSlug === state.slug);
  const offices = allOffices.filter(o => o.stateSlug === state.slug);

  return (
    <div>
      <LocationHero
        title={state.name}
        image={cities[0]?.image ?? OFFICE_FALLBACK_IMAGE}
        defaultCity={cities[0]?.slug}
        breadcrumb={<><Link to="/" className="hover:text-white">Home</Link> / Locations / <span className="text-white">{state.name}</span></>}
      />

      <section className="section-y bg-surface">
        <div className="container-x">
          <h2 className="text-2xl font-bold">Offices in {state.name}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map(o => <OfficeCard key={o.id} office={o} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
