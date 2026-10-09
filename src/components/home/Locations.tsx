import { useState, type FormEvent } from "react";
import { StatesDialog } from "@/components/StatesDialog";
import { ArrowRight, Building2, Clock, HeadphonesIcon, MapPin, Search, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { CITIES, STATES } from "@/lib/mock-data";
import { IndiaMap } from "./IndiaMap";
import { Section } from "./Section";

export const HIGHLIGHTS = [
  [Building2, "Prime", "Locations"],
  [ShieldCheck, "GST", "Compliant"],
  [Clock, "Easy", "Setup"],
  [HeadphonesIcon, "Pan India", "Support"],
] as const;

const HIGHLIGHT_NOTES = [
  "Addresses in top business hubs",
  "Rent agreement, NOC & utility bill",
  "Live in 0–48 hours after KYC",
  "Dedicated help in every city",
];

const STATS = [
  ["15+", "Cities"],
  ["1,000+", "Businesses"],
  [String(STATES.length), "States live"],
] as const;

export function Locations() {
  const navigate = useNavigate();
  const [locationQuery, setLocationQuery] = useState("");
  const q = locationQuery.trim().toLowerCase();
  const matches = q ? CITIES.filter((c) => c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q)) : [];
  const stateChips = STATES.map((st) => ({
    ...st,
    offices: CITIES.filter((c) => c.stateSlug === st.slug).reduce((n, c) => n + c.officeCount, 0),
  })).filter((st) => !q || st.name.toLowerCase().includes(q) || matches.some((c) => c.stateSlug === st.slug));

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const first = matches[0];
    if (first) navigate({ to: "/locations/$state/$city", params: { state: first.stateSlug, city: first.slug } });
  };

  return (
    <Section
      id="locations"
      eyebrow="Our Locations"
      title={
        <>
          15+ Cities
          <br />
          Across India
        </>
      }
      sub="Choose from our wide network of prime business locations in major cities and growing markets."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_26rem]">
        <div>
          <form onSubmit={onSearch} className="flex w-full max-w-md items-center gap-2 rounded-full border border-border bg-white p-2 shadow-card transition-shadow focus-within:border-primary focus-within:shadow-elevated">
            <Search className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <input
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="Search city (e.g. Delhi, Mumbai, Pune)"
              aria-label="Search city"
              className="h-11 flex-1 rounded-full bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="submit" aria-label="Go to city" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90">
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {STATS.map(([n, l]) => (
              <div key={l}>
                <div className="text-2xl font-extrabold text-navy">{n}</div>
                <div className="text-xs font-medium text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {q && stateChips.length === 0 && <span className="text-sm text-muted-foreground">No city found for “{locationQuery.trim()}” yet — we are expanding fast.</span>}
            {stateChips.map((st) => (
              <Link
                key={st.slug}
                to="/locations/$state"
                params={{ state: st.slug }}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-navy transition-colors hover:border-primary hover:bg-primary-50 hover:text-primary"
              >
                <MapPin className="h-3 w-3 text-primary" aria-hidden="true" /> {st.name}
                <span className="text-[10px] font-normal text-muted-foreground">{st.offices}</span>
              </Link>
            ))}
            <StatesDialog>
<button type="button" className="rounded-full border border-primary bg-primary px-3 py-1 text-xs font-medium inline-flex items-center gap-1 text-primary-foreground transition-colors hover:bg-primary/90">
                View all <ArrowRight className="h-3 w-3" />
              </button>
</StatesDialog>
          </div>

          <div className="mt-6 flex items-center gap-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-primary/30" />
              We are here
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-border" />
              Coming soon
            </span>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {HIGHLIGHTS.map(([Icon, l1, l2], i) => (
              <div key={`${l1}-${l2}`} className="card-soft card-soft-hover flex items-start gap-3 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-navy">
                    {l1} {l2}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{HIGHLIGHT_NOTES[i]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-md justify-self-center lg:absolute lg:right-8 lg:top-10 lg:w-104 lg:max-w-none">
          <IndiaMap query={locationQuery} />
          <p className="mt-3 text-center text-xs text-muted-foreground">Hover a state to see our offices · click to explore</p>
        </div>
      </div>
    </Section>
  );
}
