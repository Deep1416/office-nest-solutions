import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CITIES, STATES, inr } from "@/lib/mock-data";
import { officesQueryOptions } from "@/lib/queries/offices";
import { OfficeCard } from "@/components/OfficeCard";
import { Badge } from "@/components/ui/badge";
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
    <div className="bg-surface">
      <div className="container-x py-12">
        <div className="text-xs text-muted-foreground"><Link to="/" className="hover:text-primary">Home</Link> / Locations / <span className="text-navy">{state.name}</span></div>
        <h1 className="mt-3 text-4xl font-extrabold">Virtual Offices in {state.name}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">Explore verified addresses across major {state.name} business hubs.</p>

        <h2 className="mt-10 text-xl font-bold">Cities in {state.name}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map(c => (
            <Link key={c.slug} to="/locations/$state/$city" params={{ state: state.slug, city: c.slug }} className="card-soft card-soft-hover overflow-hidden">
              <img src={c.image} alt={c.name} className="aspect-4/3 w-full object-cover" />
              <div className="p-4">
                <div className="font-semibold text-navy">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.officeCount} offices · from {inr(c.startingPrice)}</div>
                <Badge variant="secondary" className="mt-2">Explore →</Badge>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-bold">Offices in {state.name}</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offices.map(o => <OfficeCard key={o.id} office={o} />)}
        </div>
      </div>
    </div>
  );
}
