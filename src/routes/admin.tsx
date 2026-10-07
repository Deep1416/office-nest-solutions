import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LogOut, LayoutDashboard, Users, Building2, ClipboardList, Phone, MapPin, Wrench, MessageSquare, FileText, Settings } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Login } from "@/components/admin/Login";
import { Dashboard } from "@/components/admin/Dashboard";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { BookingsTable } from "@/components/admin/BookingsTable";
import { CallbacksTable } from "@/components/admin/CallbacksTable";
import { OfficesTable } from "@/components/admin/OfficesTable";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — OfficeMate" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

type Tab = "dashboard" | "leads" | "offices" | "bookings" | "callbacks" | "cities" | "services" | "testimonials" | "blogs" | "settings";

const NAV: [Tab, string, React.ComponentType<{ className?: string }>][] = [
  ["dashboard", "Dashboard", LayoutDashboard],
  ["leads", "Leads", Users],
  ["offices", "Offices", Building2],
  ["bookings", "Bookings", ClipboardList],
  ["callbacks", "Callback Requests", Phone],
  ["cities", "Cities", MapPin],
  ["services", "Services", Wrench],
  ["testimonials", "Testimonials", MessageSquare],
  ["blogs", "Blogs", FileText],
  ["settings", "Settings", Settings],
];

const STUB_TABS: Tab[] = ["cities", "services", "testimonials", "blogs", "settings"];

function Admin() {
  const [auth, setAuth] = useState(false);
  const [tab, setTab] = useState<Tab>("dashboard");

  if (!auth) return <Login onLogin={() => setAuth(true)} />;

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 flex-col border-r bg-navy p-4 text-white lg:flex">
        <div className="mb-6"><Logo light /></div>
        <nav className="flex-1 space-y-1">
          {NAV.map(([k, l, I]) => (
            <button key={k} onClick={() => setTab(k)} className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm ${tab === k ? "bg-white/15 font-semibold" : "hover:bg-white/10"}`}>
              <I className="h-4 w-4" /> {l}
            </button>
          ))}
        </nav>
        <button onClick={() => setAuth(false)} className="mt-4 flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-white/10"><LogOut className="h-4 w-4" /> Logout</button>
      </aside>

      <main className="flex-1 bg-surface">
        <header className="border-b bg-background px-6 py-4">
          <div className="lg:hidden mb-3"><Logo /></div>
          <Select value={tab} onValueChange={(v) => setTab(v as Tab)}>
            <SelectTrigger className="lg:hidden w-full max-w-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              {NAV.map(([k]) => <SelectItem key={k} value={k}>{k}</SelectItem>)}
            </SelectContent>
          </Select>
          <h1 className="hidden text-2xl font-extrabold capitalize lg:block">{tab}</h1>
        </header>
        <div className="p-6">
          {tab === "dashboard" && <Dashboard />}
          {tab === "leads" && <LeadsTable />}
          {tab === "bookings" && <BookingsTable />}
          {tab === "callbacks" && <CallbacksTable />}
          {tab === "offices" && <OfficesTable />}
          {STUB_TABS.includes(tab) && (
            <div className="card-soft p-10 text-center text-sm text-muted-foreground">
              <div className="text-lg font-semibold text-navy capitalize">{tab}</div>
              <p className="mt-2">Demo section — connect a backend to manage {tab}.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
