import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ShieldCheck, Star, Users } from "lucide-react";
import { Annotation } from "@/components/Annotation";
import { TESTIMONIALS } from "@/lib/mock-data";
import { Section } from "./Section";

const STATS = [
  { icon: Users, value: "10,000+", label: "Businesses", color: "text-orange", filled: false },
  { icon: Star, value: "50+", label: "Cities", color: "text-orange", filled: true },
  { icon: Star, value: "4.8/5", label: "Rating", color: "text-orange", filled: true },
  { icon: ShieldCheck, value: "99%", label: "Client Satisfaction", color: "text-primary", filled: false },
];

const LOGOS = ["TechGrow", "Blush & Co.", "Verma Exports", "NeoKart", "FinEdge", "MedLife"];

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = TESTIMONIALS.length;

  const next = () => setIndex((v) => (v + 1) % count);
  const prev = () => setIndex((v) => (v - 1 + count) % count);

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, count]);

  const visible = [0, 1, 2].map((o) => TESTIMONIALS[(index + o) % count]);

  return (
    <Section id="testimonials" eyebrow="Testimonials" title={<>Trusted by <span className="text-primary">10,000+</span> Businesses Across India</>} sub="From startups to established enterprises, businesses across India trust OfficeMate for their virtual office needs." muted>
      <div className="relative">
        <Annotation text="Real Businesses Real Growth" className="absolute -top-16 right-0" rotate={5} />

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            if (delta > 40) prev();
            else if (delta < -40) next();
            touchStartX.current = null;
          }}
        >
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-primary-600 md:grid"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-primary-600 md:grid"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((t, i) => (
              <div key={`${t.name}-${index}-${i}`} className={`card-soft flex gap-4 p-4 ${i === 2 ? "hidden lg:flex" : i === 1 ? "hidden md:flex" : ""}`}>
                <img src={t.image} alt={t.name} className="h-[140px] w-[110px] flex-shrink-0 rounded-xl object-cover" />
                <div className="flex flex-col justify-center">
                  <div className="flex gap-0.5 text-orange">
                    {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-current" />)}
                  </div>
                  <p className="mt-2 text-[13px] text-navy">&ldquo;{t.feedback}&rdquo;</p>
                  <div className="mt-3 text-[13px] font-bold text-primary">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-1.5" role="tablist" aria-label="Testimonial slides">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial from ${t.name}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-2 bg-border"}`}
            />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-6 sm:grid-cols-4 sm:divide-x sm:divide-border">
          {STATS.map(({ icon: Icon, value, label, color, filled }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 text-center">
              <Icon className={`h-5 w-5 ${filled ? "fill-current" : ""} ${color}`} />
              <div className="text-[22px] font-extrabold text-navy">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-navy/50">
          {LOGOS.map((l) => <span key={l}>{l}</span>)}
          <span className="text-primary">and 10,000+ more...</span>
        </div>
      </div>
    </Section>
  );
}
