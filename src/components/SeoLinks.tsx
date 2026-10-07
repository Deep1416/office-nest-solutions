import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { CITIES, STATES } from "@/lib/mock-data";
import { CITY_ALIASES, SEO_LINK_GROUPS } from "@/lib/seo-links";

const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

function ItemLink({ kind, name }: { kind: "state" | "city"; name: string }) {
  const label = `Virtual office in ${name}`;
  if (kind === "state") {
    const state = STATES.find(s => s.slug === slugify(name));
    return state ? <Link to="/locations/$state" params={{ state: state.slug }} className="hover:text-primary">{label}</Link> : <>{label}</>;
  }
  const slug = CITY_ALIASES[name.toLowerCase()] ?? slugify(name);
  const city = CITIES.find(c => c.slug === slug);
  return city ? <Link to="/locations/$state/$city" params={{ state: city.stateSlug, city: city.slug }} className="hover:text-primary">{label}</Link> : <>{label}</>;
}

export function SeoLinks() {
  return (
    <section aria-label="Virtual office locations" className="border-t bg-surface py-10">
      <div className="container-x space-y-8">
        {SEO_LINK_GROUPS.map(g => (
          <div key={g.title}>
            <h2 className="text-sm font-bold text-navy">{g.title}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {g.items.map((name, i) => (
                <Fragment key={name}>
                  {i > 0 && <span className="px-1.5">|</span>}
                  <ItemLink kind={g.kind} name={name} />
                </Fragment>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
