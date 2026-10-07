import { useState } from "react";
import { ArrowRight, Building2, Clock, HeadphonesIcon, MapPin, Search, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CITIES } from "@/lib/mock-data";
import { IndiaMap } from "./IndiaMap";
import { Section } from "./Section";

export const HIGHLIGHTS = [
  [Building2, "Prime", "Locations"],
  [ShieldCheck, "GST", "Compliant"],
  [Clock, "Easy", "Setup"],
  [HeadphonesIcon, "Pan India", "Support"],
] as const;

export function Locations() {
  const [locationQuery, setLocationQuery] = useState("");

  return (
    <Section
      id="locations"
      eyebrow="Our Locations"
      title={
        <>
          50+ Cities
          <br />
          Across India
        </>
      }
      sub="Choose from our wide network of prime business locations in major cities and growing markets."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_26rem]">
        <div>
          <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-border bg-white p-2 shadow-card">
            <Search className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <input
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="Search city (e.g. Delhi, Mumbai, Pune)"
              aria-label="Search city"
              className="h-11 flex-1 rounded-full bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
            />
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
              <Search className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {CITIES.slice(0, 8).map((c) => (
              <Link
                key={c.slug}
                to="/locations/$state/$city"
                params={{ state: c.stateSlug, city: c.slug }}
                className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-navy transition-colors hover:border-primary hover:text-primary"
              >
                {c.name}
              </Link>
            ))}
            <Link to="/virtual-offices" className="rounded-full border border-primary bg-primary px-3 py-1 text-xs font-medium inline-flex items-center gap-1 text-primary-foreground transition-colors hover:bg-primary/90">
                View all <ArrowRight className="h-3 w-3" />
              </Link>
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

          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {HIGHLIGHTS.map(([Icon, l1, l2]) => (
              <div key={`${l1}-${l2}`} className="flex flex-col items-start gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-50 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-xs font-medium text-navy">
                  {l1}
                  <br />
                  {l2}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-md justify-self-center lg:absolute lg:right-8 lg:top-10 lg:w-104 lg:max-w-none">
          <IndiaMap query={locationQuery} />
        </div>
      </div>
    </Section>
  );
}
