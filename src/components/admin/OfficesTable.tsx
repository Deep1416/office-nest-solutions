import { useQuery } from "@tanstack/react-query";
import { officesQueryOptions } from "@/lib/queries/offices";

export function OfficesTable() {
  const { data: offices = [] } = useQuery(officesQueryOptions());

  return (
    <div className="card-soft overflow-x-auto">
      <table className="w-full min-w-[720px] text-sm">
        <thead className="bg-surface text-left"><tr><th className="p-3">ID</th><th className="p-3">Name</th><th className="p-3">City</th><th className="p-3">Rating</th><th className="p-3">Services</th></tr></thead>
        <tbody>
          {offices.map(o => (
            <tr key={o.id} className="border-t">
              <td className="p-3 font-mono text-xs">{o.id}</td>
              <td className="p-3 font-medium">{o.name}</td>
              <td className="p-3">{o.city}, {o.state}</td>
              <td className="p-3">{o.rating?.toFixed(1) ?? "—"}</td>
              <td className="p-3">{o.services.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
