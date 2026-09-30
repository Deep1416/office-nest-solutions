import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallbacksQuery, useDeleteCallback } from "@/lib/queries/callbacks";

export function CallbacksTable() {
  const { data: rows = [] } = useCallbacksQuery();
  const deleteCallback = useDeleteCallback();

  return (
    <div className="card-soft overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-surface text-left"><tr><th className="p-3">Name</th><th className="p-3">Phone</th><th className="p-3">When</th><th className="p-3">Message</th><th /></tr></thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">No callback requests yet.</td></tr>}
          {rows.map(c => (
            <tr key={c.id} className="border-t">
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.phone}</td>
              <td className="p-3">{c.when}</td>
              <td className="p-3 text-muted-foreground">{c.message || "—"}</td>
              <td className="p-3"><Button size="icon" variant="ghost" onClick={() => deleteCallback.mutate(c.id)}><Trash2 className="h-4 w-4" /></Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
