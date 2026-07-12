import { Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { inr } from "@/lib/mock-data";

type Plan = {
  key: string; title: string; price: number; recommended?: boolean;
  features: Record<string, boolean>;
};
const PLANS: Plan[] = [
  { key: "business-registration", title: "Business Registration", price: 2499,
    features: { biz: true, gst: true, bank: true, mail: true, courier: true, signage: true, meeting: true, docs: true } },
  { key: "gst-registration", title: "GST Registration", price: 1799, recommended: true,
    features: { biz: false, gst: true, bank: true, mail: true, courier: true, signage: true, meeting: true, docs: true } },
  { key: "mailing-address", title: "Mailing Address", price: 999,
    features: { biz: false, gst: false, bank: false, mail: true, courier: true, signage: false, meeting: false, docs: true } },
];

const FEATS = [
  ["biz", "Business registration support"],
  ["gst", "GST registration address"],
  ["bank", "Bank account address use"],
  ["mail", "Professional mailing address"],
  ["courier", "Courier handling"],
  ["signage", "Signage"],
  ["meeting", "Meeting-room access"],
  ["docs", "Documentation support"],
] as const;

export function PricingTable() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {PLANS.map(p => (
        <div key={p.key} className={`relative card-soft card-soft-hover flex flex-col p-6 ${p.recommended ? "ring-2 ring-primary" : ""}`}>
          {p.recommended && (
            <Badge className="absolute -top-3 left-6 bg-orange text-orange-foreground">Recommended</Badge>
          )}
          <h3 className="text-lg font-bold">{p.title}</h3>
          <div className="mt-2">
            <span className="text-xs text-muted-foreground">Starting at</span>
            <div className="text-3xl font-extrabold text-navy">{inr(p.price)}<span className="text-sm font-medium text-muted-foreground">/yr</span></div>
          </div>
          <ul className="mt-4 space-y-2.5 text-sm">
            {FEATS.map(([k, l]) => (
              <li key={k} className="flex items-center gap-2">
                {p.features[k as keyof typeof p.features] ? <Check className="h-4 w-4 text-success" /> : <X className="h-4 w-4 text-muted-foreground/40" />}
                <span className={p.features[k as keyof typeof p.features] ? "text-navy" : "text-muted-foreground/60 line-through"}>{l}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex-1" />
          <Button asChild className={p.recommended ? "bg-orange text-orange-foreground hover:bg-orange/90" : "bg-primary"}>
            <Link to="/virtual-offices">Choose {p.title}</Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
