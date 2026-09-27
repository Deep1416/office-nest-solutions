import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Search, CheckCircle2, Circle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { bookingsStore, type Booking } from "@/lib/storage";
import { inr } from "@/lib/mock-data";

export const Route = createFileRoute("/booking-status")({
  head: () => ({ meta: [{ title: "Check Booking Status — OfficeMate" }, { name: "description", content: "Track your OfficeMate virtual office booking with your reference number." }] }),
  component: Page,
});

const TIMELINE: Array<[Booking["status"], string]> = [
  ["received", "Booking received"],
  ["payment-confirmed", "Payment confirmed"],
  ["documents-submitted", "Documents submitted"],
  ["kyc-review", "KYC under review"],
  ["prepared", "Address documentation prepared"],
  ["completed", "Completed"],
];

function Page() {
  const [ref, setRef] = useState("");
  const [phone, setPhone] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [searched, setSearched] = useState(false);

  const idx = booking ? TIMELINE.findIndex(([s]) => s === booking.status) : -1;

  return (
    <div className="bg-surface">
      <div className="container-x max-w-3xl py-12">
        <h1 className="text-3xl font-extrabold">Check Booking Status</h1>
        <p className="mt-2 text-muted-foreground">Enter your booking reference and phone number to view live status.</p>

        <form className="card-soft mt-6 grid gap-4 p-6 sm:grid-cols-[1fr_1fr_auto]" onSubmit={(e) => {
          e.preventDefault();
          setSearched(true);
          const b = bookingsStore.find(ref.trim(), phone.trim());
          setBooking(b ?? null);
          if (!b) toast.error("No booking found. Check your reference and phone.");
        }}>
          <div className="grid gap-1.5">
            <Label>Booking reference</Label>
            <Input placeholder="ON-2026-0001" value={ref} onChange={(e) => setRef(e.target.value)} required />
          </div>
          <div className="grid gap-1.5">
            <Label>Phone (last digits)</Label>
            <Input placeholder="98100..." value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="flex items-end">
            <Button type="submit" className="bg-primary w-full sm:w-auto"><Search className="mr-1 h-4 w-4" /> Track</Button>
          </div>
        </form>

        {searched && !booking && (
          <div className="card-soft mt-6 p-6 text-center text-sm text-muted-foreground">
            No booking matched. Try again or contact support.
          </div>
        )}

        {booking && (
          <div className="card-soft mt-6 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs text-muted-foreground">Reference</div>
                <div className="text-xl font-extrabold text-primary">{booking.reference}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Total</div>
                <div className="text-lg font-bold text-navy">{inr(booking.total)}</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-navy">{booking.officeName} · {booking.plan} · {booking.duration}</div>

            <div className="mt-6 space-y-4">
              {TIMELINE.map(([status, label], i) => {
                const done = i <= idx;
                const current = i === idx;
                return (
                  <div key={status} className="flex items-start gap-3">
                    {done ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Circle className={`h-5 w-5 ${current ? "text-primary" : "text-muted-foreground/40"}`} />}
                    <div>
                      <div className={`text-sm font-medium ${done ? "text-navy" : "text-muted-foreground"}`}>{label}</div>
                      {current && <div className="text-xs text-primary">In progress</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Don't have a booking yet? <a href="/virtual-offices" className="text-primary hover:underline">Browse virtual offices</a>
        </div>
      </div>
    </div>
  );
}
