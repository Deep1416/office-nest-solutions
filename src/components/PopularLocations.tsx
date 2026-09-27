import type { ReactNode } from "react";

export interface PopularLocationsProps {
  title: ReactNode;
  subtitle?: string;
  items: { name: string; image: string }[];
}

export function PopularLocations({ title, subtitle, items }: PopularLocationsProps) {
  return (
    <section className="section-y border-t">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((it) => (
            <div key={it.name} className="overflow-hidden rounded-2xl bg-white shadow-md">
              <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                <img src={it.image} alt={it.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-3 text-center text-sm font-semibold text-navy">{it.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
