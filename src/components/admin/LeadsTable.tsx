import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadsQuery, useDeleteLead } from "@/lib/queries/leads";

export function LeadsTable() {
  const { data: rows = [] } = useLeadsQuery();
  const deleteLead = useDeleteLead();

  return (
    <div className="card-soft overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-surface text-left"><tr><th className="p-3">Name</th><th className="p-3">Phone</th><th className="p-3">Email</th><th className="p-3">City</th><th className="p-3">Purpose</th><th /></tr></thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">No leads yet.</td></tr>}
          {rows.map(l => (
            <tr key={l.id} className="border-t">
              <td className="p-3 font-medium">{l.name}</td>
              <td className="p-3">{l.phone}</td>
              <td className="p-3">{l.email}</td>
              <td className="p-3">{l.city}</td>
              <td className="p-3">{l.purpose}</td>
              <td className="p-3"><Button size="icon" variant="ghost" onClick={() => deleteLead.mutate(l.id)}><Trash2 className="h-4 w-4" /></Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
