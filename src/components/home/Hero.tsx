import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Annotation } from "@/components/Annotation";
import { CallbackTrigger } from "@/components/CallbackModal";

const STATS = [
  [MapPin, "15+", "Cities"],
  [Users, "1,000+", "Businesses"],
  [Clock, "0-48 Hours", "Setup Time"],
  [ShieldCheck, "Dedicated", "Support"],
] as const;

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=60"
          alt="Bright modern high-rise office interior with floor-to-ceiling glass windows and a blue city skyline"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 fade-left-wash" aria-hidden="true" />
      </div>

      <div className="container-x relative py-16 lg:py-24">
        <Annotation
          text="Work Without Boundaries"
          className="absolute bottom-8 right-4 w-64 lg:bottom-12 lg:right-8"
          rotate={-8}
          arrowUp
          flip
          textClassName="text-navy"
          arrowClassName="text-orange"
        />

        <div className="max-w-xl">
          <Badge variant="secondary" className="rounded-full bg-orange-50 text-orange hover:bg-orange-50">
            <Sparkles className="mr-1.5 h-3 w-3" /> Virtual Office Solutions Across India
          </Badge>
          <div className="relative">
            <h1 id="hero-heading" className="mt-4 max-w-md text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Your Business<br />Everywhere<br /><span className="text-primary">in India.</span>
            </h1>
          </div>
          <p className="mt-4 max-w-md text-base text-foreground sm:text-[17px]">
            Get a prestigious business address, GST registration support, and complete virtual office solutions in 15+ cities.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-orange text-orange-foreground shadow-cta hover:bg-orange-600">
              <a href="#locations">Find Your Location <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
            <CallbackTrigger>
              <Button size="lg" variant="outline" className="border-primary text-primary bg-white/70 backdrop-blur hover:bg-primary-50">Get a Free Quote</Button>
            </CallbackTrigger>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map(([Icon, value, label]) => (
              <div key={label} className="flex items-center gap-2">
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-primary-50 text-primary"><Icon className="h-4 w-4" /></span>
                <div>
                  <div className="text-sm font-extrabold text-navy leading-tight">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
