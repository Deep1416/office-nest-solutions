import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { CITIES, STATES, AMENITIES, SERVICE_LABEL, type ServiceType } from "@/lib/mock-data";
import { officesQueryOptions } from "@/lib/queries/offices";
import { OfficeCard } from "@/components/OfficeCard";

const virtualOfficesSearchSchema = z.object({
  q: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  service: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  priceMax: z.number().optional(),
  sort: z.enum(["price-asc", "price-desc", "rating"]).optional(),
  page: z.number().optional(),
});

type VirtualOfficesSearch = z.infer<typeof virtualOfficesSearchSchema>;

export const Route = createFileRoute("/virtual-offices/")({
  validateSearch: virtualOfficesSearchSchema,
  loader: ({ context }) => context.queryClient.ensureQueryData(officesQueryOptions()),
  head: () => ({
    meta: [
      { title: "Virtual Offices Across India — OfficeMate" },
      { name: "description", content: "Search, compare and book verified virtual offices for GST, business registration and mailing across Indian cities." },
    ],
  }),
  component: List,
});

const SERVICES: ServiceType[] = ["business-registration", "gst-registration", "mailing-address"];

function List() {
  const OFFICES = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate();

  const q = search.q ?? "";
  const state = search.state ?? "all";
  const city = search.city ?? "all";
  const service = search.service ?? "all";
  const amenities = search.amenities ?? [];
  const priceMax = search.priceMax ?? 5000;
  const sort = search.sort ?? "price-asc";
  const page = search.page ?? 1;

  const updateFilters = (patch: VirtualOfficesSearch) =>
    navigate({ search: (prev) => ({ ...prev, ...patch, page: undefined }), replace: true });
  const goToPage = (p: number) =>
    navigate({ search: (prev) => ({ ...prev, page: p }), replace: true });
  const clearFilters = () => navigate({ search: {}, replace: true });

  const cityOptions = state === "all" ? CITIES : CITIES.filter(c => c.stateSlug === state);
  const filtered = useMemo(() => {
    let list = OFFICES.slice();
    if (state !== "all") list = list.filter(o => o.stateSlug === state);
    if (city !== "all") list = list.filter(o => o.citySlug === city);
    if (service !== "all") list = list.filter(o => o.services.includes(service as ServiceType));
    if (amenities.length) list = list.filter(o => amenities.every(a => o.amenities.includes(a)));
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(o => o.name.toLowerCase().includes(s) || o.area.toLowerCase().includes(s) || o.city.toLowerCase().includes(s));
    }
    list = list.filter(o => Math.min(...Object.values(o.pricing).filter(Boolean) as number[]) <= priceMax);
    switch (sort) {
      case "price-asc": list.sort((a, b) => Math.min(...Object.values(a.pricing).filter(Boolean) as number[]) - Math.min(...Object.values(b.pricing).filter(Boolean) as number[])); break;
      case "price-desc": list.sort((a, b) => Math.min(...Object.values(b.pricing).filter(Boolean) as number[]) - Math.min(...Object.values(a.pricing).filter(Boolean) as number[])); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }, [OFFICES, q, state, city, service, amenities, priceMax, sort]);

  const perPage = 9;
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const Filters = (
    <div className="space-y-6">
      <div className="grid gap-2">
        <label className="text-xs font-medium text-navy/70">State</label>
        <Select value={state} onValueChange={(v) => updateFilters({ state: v, city: "all" })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All states</SelectItem>{STATES.map(s => <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <label className="text-xs font-medium text-navy/70">City</label>
        <Select value={city} onValueChange={(v) => updateFilters({ city: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All cities</SelectItem>{cityOptions.map(c => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <label className="text-xs font-medium text-navy/70">Service type</label>
        <Select value={service} onValueChange={(v) => updateFilters({ service: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All services</SelectItem>
            {SERVICES.map(s => <SelectItem key={s} value={s}>{SERVICE_LABEL[s]}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <label className="text-xs font-medium text-navy/70">Max price: ₹{priceMax.toLocaleString("en-IN")}</label>
        <Slider value={[priceMax]} min={500} max={5000} step={100} onValueChange={([v]) => updateFilters({ priceMax: v })} />
      </div>
      <div className="grid gap-2">
        <div className="text-xs font-medium text-navy/70">Amenities</div>
        <div className="grid gap-2">
          {AMENITIES.map(a => (
            <label key={a} className="flex items-center gap-2 text-sm">
              <Checkbox checked={amenities.includes(a)} onCheckedChange={(v) => updateFilters({ amenities: v ? [...amenities, a] : amenities.filter(x => x !== a) })} />
              {a}
            </label>
          ))}
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={clearFilters}>Clear filters</Button>
    </div>
  );

  return (
    <div className="bg-surface">
      <div className="container-x py-10">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Virtual Offices Across India</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">Compare verified workspaces in {CITIES.length}+ cities. Filter by state, service and amenities.</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => updateFilters({ q: e.target.value })} placeholder="Search by name, area or city" className="pl-9" />
          </div>
          <Select value={sort} onValueChange={(v) => updateFilters({ sort: v as VirtualOfficesSearch["sort"] })}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden"><SlidersHorizontal className="mr-1 h-4 w-4" /> Filters</Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85%] max-w-sm overflow-y-auto">
              <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
              <div className="mt-4">{Filters}</div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block card-soft h-fit p-5">{Filters}</aside>

          <div>
            <div className="mb-4 text-sm text-muted-foreground">{filtered.length} offices found</div>
            {paged.length === 0 ? (
              <div className="card-soft p-12 text-center">
                <div className="text-lg font-semibold">No offices match your filters</div>
                <p className="mt-1 text-sm text-muted-foreground">Try widening your search or clearing filters.</p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {paged.map(o => <OfficeCard key={o.id} office={o} />)}
              </div>
            )}
            {pages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: pages }).map((_, i) => (
                  <Button key={i} variant={page === i + 1 ? "default" : "outline"} size="sm" onClick={() => goToPage(i + 1)}>{i + 1}</Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
