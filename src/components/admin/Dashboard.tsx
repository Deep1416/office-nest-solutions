import { useLeadsQuery } from "@/lib/queries/leads";
import { useBookingsQuery } from "@/lib/queries/bookings";
import { useCallbacksQuery } from "@/lib/queries/callbacks";
import { useQuery } from "@tanstack/react-query";
import { officesQueryOptions } from "@/lib/queries/offices";
import { inr } from "@/lib/mock-data";

export function Dashboard() {
  const { data: leads = [] } = useLeadsQuery();
  const { data: bookings = [] } = useBookingsQuery();
  const { data: callbacks = [] } = useCallbacksQuery();
  const { data: offices = [] } = useQuery(officesQueryOptions());

  const revenue = bookings.reduce((a, b) => a + b.total, 0);
  const pendingKyc = bookings.filter(b => b.status === "kyc-review" || b.status === "documents-submitted").length;
  const stats = [
    ["Total leads", String(leads.length)],
    ["New bookings", String(bookings.length)],
    ["Pending KYC", String(pendingKyc)],
    ["Active offices", String(offices.length)],
    ["Revenue", inr(revenue)],
    ["Conversion", leads.length ? `${Math.round((bookings.length / leads.length) * 100)}%` : "0%"],
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map(([l, v]) => (
        <div key={l} className="card-soft p-5">
          <div className="text-xs text-muted-foreground">{l}</div>
          <div className="mt-1 text-3xl font-extrabold text-navy">{v}</div>
        </div>
      ))}
      <div className="card-soft p-5 sm:col-span-2 lg:col-span-3">
        <div className="text-sm font-semibold">Latest callback requests</div>
        <div className="mt-3 text-sm">
          {callbacks.slice(0, 5).map(c => (
            <div key={c.id} className="flex justify-between border-t py-2"><span>{c.name} — {c.phone}</span><span className="text-muted-foreground">{c.when}</span></div>
          ))}
          {callbacks.length === 0 && <div className="text-muted-foreground">No callback requests yet.</div>}
        </div>
      </div>
    </div>
  );
}
