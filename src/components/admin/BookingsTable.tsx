import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBookingsQuery, useDeleteBooking, useUpdateBookingStatus } from "@/lib/queries/bookings";
import { inr } from "@/lib/mock-data";
import type { Booking } from "@/lib/storage";

const STATUSES: Booking["status"][] = ["received", "payment-confirmed", "documents-submitted", "kyc-review", "prepared", "completed"];

export function BookingsTable() {
  const { data: rows = [] } = useBookingsQuery();
  const updateStatus = useUpdateBookingStatus();
  const deleteBooking = useDeleteBooking();

  return (
    <div className="card-soft overflow-x-auto">
      <table className="w-full min-w-[720px] text-sm">
        <thead className="bg-surface text-left"><tr><th className="p-3">Ref</th><th className="p-3">Customer</th><th className="p-3">Office</th><th className="p-3">Plan</th><th className="p-3">Total</th><th className="p-3">Status</th><th /></tr></thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">No bookings yet.</td></tr>}
          {rows.map(b => (
            <tr key={b.id} className="border-t">
              <td className="p-3 font-mono text-xs">{b.reference}</td>
              <td className="p-3">{b.customer.name}</td>
              <td className="p-3">{b.officeName}</td>
              <td className="p-3">{b.plan}</td>
              <td className="p-3">{inr(b.total)}</td>
              <td className="p-3">
                <Select
                  value={b.status}
                  onValueChange={(v) => updateStatus.mutate({ id: b.id, status: v as Booking["status"] }, { onSuccess: () => toast.success("Status updated") })}
                >
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>{STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </td>
              <td className="p-3"><Button size="icon" variant="ghost" onClick={() => deleteBooking.mutate(b.id)}><Trash2 className="h-4 w-4" /></Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
