import { useState, type ReactNode } from "react";
import { StatesDialog } from "@/components/StatesDialog";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { HIGHLIGHTS } from "@/components/home/Locations";
import { CITIES, OFFICE_FALLBACK_IMAGE } from "@/lib/mock-data";
import { QuoteForm } from "@/components/QuoteForm";

// Hero shared by the city page and the state page: search + city chips, highlights and the quote form.
export function LocationHero({ title, image, breadcrumb, defaultCity }: { title: string; image: string; breadcrumb: ReactNode; defaultCity?: string }) {
  const [cityQuery, setCityQuery] = useState("");

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {image !== OFFICE_FALLBACK_IMAGE && <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />}
      <div className="absolute inset-0 bg-navy/75" aria-hidden="true" />
      <div className="container-x relative py-12 lg:py-16">
        <div className="text-xs text-white/70">
          {breadcrumb}
        </div>
        <div className="mx-auto mt-6 max-w-3xl text-center">
          <h1 className="text-white! text-4xl font-extrabold sm:text-5xl">Find Virtual Office in {title}</h1>
          <p className="mt-3 text-white/85">
            Establish your business address in one of {title}'s most sought-after business districts. GST-ready, MCA-compliant, and fully supported by our team.
          </p>
        </div>

        <div className="mt-10 grid items-center gap-6 lg:grid-cols-5">
          <div className="rounded-2xl bg-white p-6 text-foreground shadow-elevated lg:col-span-3">
            <div className="flex w-full items-center gap-2 rounded-full border border-border bg-white p-2 shadow-card">
              <Search className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                value={cityQuery}
                onChange={(e) => setCityQuery(e.target.value)}
                placeholder="Search city (e.g. Delhi, Mumbai, Pune)"
                aria-label="Search city"
                className="h-11 flex-1 rounded-full bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
              />
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                <Search className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {CITIES.filter(c => c.name.toLowerCase().includes(cityQuery.trim().toLowerCase())).slice(0, 8).map(c => (
                <Link
                  key={c.slug}
                  to="/locations/$state/$city"
                  params={{ state: c.stateSlug, city: c.slug }}
                  className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-navy transition-colors hover:border-primary hover:text-primary"
                >
                  {c.name}
                </Link>
              ))}
              <StatesDialog>
<button type="button" className="rounded-full border border-primary bg-primary px-3 py-1 text-xs font-medium inline-flex items-center gap-1 text-primary-foreground transition-colors hover:bg-primary/90">
                View all <ArrowRight className="h-3 w-3" />
              </button>
</StatesDialog>
            </div>

            <div className="mt-6 flex items-center gap-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-primary/30" />We are here</span>
              <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-border" />Coming soon</span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {HIGHLIGHTS.map(([Icon, l1, l2]) => (
                <div key={`${l1}-${l2}`} className="flex flex-col items-start gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-50 text-primary"><Icon className="h-4 w-4" /></span>
                  <span className="text-xs font-medium text-navy">{l1}<br />{l2}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <StatesDialog>
<button type="button" className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-2.5 text-sm font-semibold text-orange-foreground shadow-cta transition-colors hover:bg-orange-600">
                View all <ArrowRight className="h-4 w-4" />
              </button>
</StatesDialog>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 text-foreground shadow-elevated lg:col-span-2">
            <h2 className="text-center text-xl font-bold">Request a Free Quote</h2>
            <div className="mt-4"><QuoteForm compact defaultCity={defaultCity} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
