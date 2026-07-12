import { Link } from "@tanstack/react-router";
import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { inr, SERVICE_LABEL, type OfficeListing } from "@/lib/mock-data";

export function OfficeCard({ office }: { office: OfficeListing }) {
  const startingPrice = Math.min(...Object.values(office.pricing).filter(Boolean) as number[]);
  return (
    <div className="card-soft card-soft-hover flex flex-col overflow-hidden">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <img src={office.image} alt={office.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
        <Badge className="absolute right-3 top-3 bg-white text-navy shadow">
          <Star className="mr-1 h-3 w-3 fill-orange text-orange" /> {office.rating.toFixed(1)}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-navy">{office.name}</h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" /> {office.area}, {office.city}, {office.state}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {office.services.slice(0, 3).map(s => (
            <Badge key={s} variant="secondary" className="text-[10px]">{SERVICE_LABEL[s]}</Badge>
          ))}
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          {office.amenities.slice(0, 3).join(" · ")}
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="text-[11px] text-muted-foreground">Starting at</div>
            <div className="text-xl font-extrabold text-navy">{inr(startingPrice)}<span className="text-xs font-medium text-muted-foreground">/yr</span></div>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm"><Link to="/virtual-offices/$id" params={{ id: office.id }}>Details</Link></Button>
            <Button asChild size="sm" className="bg-primary"><Link to="/booking/$officeId" params={{ officeId: office.id }}>Book Now</Link></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
