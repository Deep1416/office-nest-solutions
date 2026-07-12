import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/mock-data";

export function TestimonialsCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative">
      <div className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map(o => {
          const t = TESTIMONIALS[(i + o) % TESTIMONIALS.length];
          return (
            <div key={o} className="card-soft card-soft-hover p-6">
              <div className="mb-2 flex gap-0.5 text-orange">
                {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-sm text-navy">"{t.feedback}"</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">{t.initials}</span>
                <div>
                  <div className="text-sm font-semibold text-navy">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.company}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex justify-center gap-1.5">
        {TESTIMONIALS.map((_, idx) => (
          <button key={idx} aria-label={`slide ${idx + 1}`} onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-primary" : "w-2 bg-border"}`} />
        ))}
      </div>
    </div>
  );
}
