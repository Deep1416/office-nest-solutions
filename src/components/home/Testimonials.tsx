import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, ShieldCheck, Star, Users } from "lucide-react";
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
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((t, i) => (
              <figure
                key={`${t.name}-${index}-${i}`}
                className={`card-soft relative flex animate-in fade-in-0 slide-in-from-right-4 flex-col rounded-2xl p-6 duration-500 ${i === 2 ? "hidden lg:flex" : i === 1 ? "hidden md:flex" : ""}`}
              >
                <Quote className="absolute right-5 top-5 h-8 w-8 fill-primary/10 text-primary/10" aria-hidden="true" />
                <div className="flex gap-0.5 text-orange" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-navy">&ldquo;{t.feedback}&rdquo;</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <img src={t.image} alt={t.name} className="h-12 w-12 flex-shrink-0 rounded-full object-cover ring-2 ring-primary/20" />
                  <div>
                    <div className="text-sm font-bold text-navy">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.company}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white text-navy shadow-card transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex justify-center gap-1.5" role="tablist" aria-label="Testimonial slides">
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
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white text-navy shadow-card transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
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
