import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Check, Landmark, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CallbackTrigger } from "@/components/CallbackModal";
import { inr } from "@/lib/mock-data";
import { Section } from "./Section";

type Plan = {
  key: string; title: string; blurb: string; monthly: number; recommended?: boolean; custom?: boolean;
  icon: typeof Send;
  features: string[];
};
const PLANS: Plan[] = [
  {
    key: "starter", title: "Starter", blurb: "For freelancers & early stage businesses", monthly: 699, icon: Send,
    features: ["Business address", "Mail handling", "Digital document access", "Basic support"],
  },
  {
    key: "professional", title: "Professional", blurb: "For growing businesses", monthly: 999, recommended: true, icon: Building2,
    features: ["Everything in Starter", "Meeting room access", "GST support", "Dedicated account manager"],
  },
  {
    key: "business", title: "Business", blurb: "For established & multi-state businesses", monthly: 1499, icon: Building2,
    features: ["Everything in Professional", "Multi-location support", "APOB/VPOB services", "Priority support"],
  },
  {
    key: "custom", title: "Custom Plan", blurb: "For large teams & special requirements", monthly: 0, custom: true, icon: Landmark,
    features: ["Multiple city setup", "Custom compliance support", "Dedicated relationship manager", "Flexible plans"],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <Section
      id="pricing"
      eyebrow="Pricing Plans"
      title="Transparent & Flexible Plans"
      sub="Choose a plan that fits your business needs. No hidden charges, ever."
      muted
      headerExtra={
        <div className="flex items-center gap-1 rounded-full border border-primary-100 p-1">
          <button
            onClick={() => setYearly(false)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${!yearly ? "bg-primary-50 text-primary" : "text-muted-foreground"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${yearly ? "bg-primary-50 text-primary" : "text-muted-foreground"}`}
          >
            Yearly <Badge className="bg-primary text-primary-foreground">Save 20%</Badge>
          </button>
        </div>
      }
    >
      <div className="grid gap-5 lg:grid-cols-4">
        {PLANS.map((p) => (
          <div
            key={p.key}
            className={`relative flex flex-col rounded-2xl border p-6 transition-transform ${
              p.recommended
                ? "-mt-2 border-2 border-orange bg-gradient-to-b from-orange-50 to-white shadow-cta lg:-translate-y-2"
                : "card-soft card-soft-hover"
            }`}
          >
            {p.recommended && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-orange-foreground">★ Most Popular</Badge>
            )}
            <span className={`grid h-11 w-11 place-items-center rounded-lg ${p.recommended ? "bg-orange-50 text-orange" : "bg-primary-50 text-primary"}`}>
              <p.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-bold text-navy">{p.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{p.blurb}</p>
            <div className="mt-4">
              {p.custom ? (
                <div className="text-xl font-extrabold text-navy">Talk to us</div>
              ) : (
                <div className={`text-[34px] font-extrabold leading-none ${p.recommended ? "text-orange" : "text-navy"}`}>
                  {inr(yearly ? Math.round(p.monthly * 0.8) : p.monthly)}
                  <span className="text-sm font-medium text-muted-foreground"> / month</span>
                </div>
              )}
            </div>
            <ul className="mt-5 space-y-2.5 text-[13px]">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${p.recommended ? "text-orange" : "text-success"}`} />
                  <span className="text-navy">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex-1" />
            {p.custom ? (
              <CallbackTrigger>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary-50">Contact Us <ArrowRight className="ml-1 h-4 w-4" /></Button>
              </CallbackTrigger>
            ) : (
              <Button asChild className={p.recommended ? "w-full bg-orange text-orange-foreground shadow-cta hover:bg-orange-600" : "w-full bg-primary hover:bg-primary-600"}>
                <Link to="/virtual-offices">Get Started <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
