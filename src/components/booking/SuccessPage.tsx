import { Link } from "@tanstack/react-router";
import { Check, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inr } from "@/lib/mock-data";
import type { Booking } from "@/lib/storage";
import { Row } from "./shared";

export function SuccessPage({ booking, onNew }: { booking: Booking; onNew: () => void }) {
  return (
    <div className="bg-surface">
      <div className="container-x max-w-2xl py-16">
        <div className="card-soft p-8 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/10 text-success"><Check className="h-8 w-8" /></div>
          <h1 className="mt-4 text-2xl font-extrabold">Booking Confirmed</h1>
          <p className="mt-1 text-muted-foreground">Your booking reference</p>
          <div className="mt-2 text-3xl font-extrabold text-primary">{booking.reference}</div>
          <div className="mt-6 rounded-lg bg-surface p-4 text-left text-sm">
            <Row label="Office" value={booking.officeName} />
            <Row label="Plan" value={booking.plan} />
            <Row label="Duration" value={booking.duration} />
            <Row label="Total" value={inr(booking.total)} />
            <Row label="Status" value="Payment confirmed" />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="outline" onClick={() => window.print()}><Printer className="mr-1 h-4 w-4" /> Print summary</Button>
            <Button asChild className="bg-primary"><Link to="/booking-status">Track booking</Link></Button>
            <Button variant="ghost" onClick={onNew}>Back to home</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
