import { Link } from "@tanstack/react-router";
import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { inr, SERVICE_LABEL, onOfficeImageError, type OfficeListing } from "@/lib/mock-data";

export function OfficeCard({ office }: { office: OfficeListing }) {
  const plans = office.services.filter((s) => office.pricing[s] != null);
  return (
    <div className="card-soft card-soft-hover flex flex-col overflow-hidden">
      <Link to="/virtual-offices/$id" params={{ id: office.id }} className="relative block aspect-8/7 w-full overflow-hidden bg-muted">
        <img src={office.image} alt={office.name} loading="lazy" onError={onOfficeImageError} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
        {office.rating != null && (
          <Badge className="absolute right-3 top-3 bg-white text-navy shadow">
            <Star className="mr-1 h-3 w-3 fill-orange text-orange" /> {office.rating.toFixed(1)}
          </Badge>
        )}
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-navy shadow">
          <MapPin className="h-4 w-4 text-primary" /> {office.city}, {office.state}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base text-navy">
          Workspace at <span className="font-bold">{office.area}</span>
        </h3>
        <div className="mt-4 text-sm text-muted-foreground">Plan &amp; Price:</div>
        <ul className="mt-2 space-y-2">
          {plans.map((s) => (
            <li key={s} className="flex items-center justify-between rounded-lg bg-muted/60 px-4 py-3 text-sm shadow-sm">
              <span className="text-foreground/80">{SERVICE_LABEL[s]}</span>
              <span className="font-bold text-navy">
                {inr(office.pricing[s] as number)}
                <span className="text-xs font-medium text-muted-foreground">/yr</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex gap-2">
          <Button asChild className="flex-1 bg-primary">
            <Link to="/booking/$officeId" params={{ officeId: office.id }}>Book Now</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/virtual-offices/$id" params={{ id: office.id }}>Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
