import { useMemo, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import india from "@svg-maps/india";
import { CITIES } from "@/lib/mock-data";

const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

type Tip = { id: string; x: number; y: number };

export function IndiaMap({ query = "" }: { query?: string }) {
  const navigate = useNavigate();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);

  const states = useMemo(
    () =>
      india.locations.map((l) => {
        const slug = slugify(l.name);
        const cities = CITIES.filter((c) => c.stateSlug === slug);
        return {
          ...l,
          slug,
          cities,
          offices: cities.reduce((n, c) => n + c.officeCount, 0),
        };
      }),
    [],
  );

  const q = query.trim().toLowerCase();
  const matches = (s: (typeof states)[number]) =>
    q.length > 0 &&
    (s.name.toLowerCase().includes(q) || s.cities.some((c) => c.name.toLowerCase().includes(q)));

  // Paint the hovered state last so its outline sits above its neighbours.
  const ordered = tip
    ? [...states.filter((s) => s.id !== tip.id), ...states.filter((s) => s.id === tip.id)]
    : states;
  const active = states.find((s) => s.id === tip?.id);

  const track = (id: string) => (e: PointerEvent) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (r) setTip({ id, x: e.clientX - r.left, y: e.clientY - r.top });
  };
  const go = (slug: string) => navigate({ to: "/locations/$state", params: { state: slug } });
  const onKey = (slug: string) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      go(slug);
    }
  };

  return (
    <div ref={wrapRef} className="relative w-full" onPointerLeave={() => setTip(null)}>
      <svg viewBox={india.viewBox} className="h-auto w-full" role="group" aria-label={india.label}>
        {ordered.map((s) => {
          const live = s.cities.length > 0;
          const hit = matches(s);
          return (
            <path
              key={s.id}
              d={s.path}
              role={live ? "link" : undefined}
              tabIndex={live ? 0 : undefined}
              aria-label={live ? `${s.name}: ${s.offices} offices` : s.name}
              onPointerEnter={track(s.id)}
              onPointerMove={track(s.id)}
              onFocus={(e) => {
                const b = e.currentTarget.getBoundingClientRect();
                const r = wrapRef.current?.getBoundingClientRect();
                if (r) setTip({ id: s.id, x: b.left - r.left + b.width / 2, y: b.top - r.top });
              }}
              onBlur={() => setTip(null)}
              onClick={live ? () => go(s.slug) : undefined}
              onKeyDown={live ? onKey(s.slug) : undefined}
              strokeWidth={tip?.id === s.id ? 1.6 : 1.1}
              strokeLinejoin="round"
              className={`stroke-white outline-none transition-[fill] duration-200 ${
                live
                  ? `cursor-pointer hover:fill-primary focus-visible:fill-primary ${hit ? "fill-orange" : "fill-primary/30"}`
                  : `hover:fill-primary/15 ${hit ? "fill-orange" : "fill-border"}`
              }`}
            />
          );
        })}
      </svg>

      {active && tip && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-navy px-3 py-2 text-xs text-white shadow-elevated"
          style={{ left: tip.x, top: tip.y - 12 }}
        >
          <div className="font-semibold">{active.name}</div>
          <div className="mt-0.5 text-white/70">
            {active.cities.length > 0
              ? `${active.cities.map((c) => c.name).join(", ")} · ${active.offices} offices`
              : "Coming soon"}
          </div>
        </div>
      )}
    </div>
  );
}
