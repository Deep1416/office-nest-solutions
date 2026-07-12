import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { LogOut, LayoutDashboard, Users, Building2, ClipboardList, Phone, MapPin, Wrench, MessageSquare, FileText, Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { leadsStore, bookingsStore, callbacksStore, type Booking } from "@/lib/storage";
import { OFFICES, inr } from "@/lib/mock-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — OfficeNest" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

type Tab = "dashboard" | "leads" | "offices" | "bookings" | "callbacks" | "cities" | "services" | "testimonials" | "blogs" | "settings";

function Admin() {
  const [auth, setAuth] = useState(false);
  const [tab, setTab] = useState<Tab>("dashboard");

  if (!auth) return <Login onLogin={() => setAuth(true)} />;

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 flex-col border-r bg-navy p-4 text-white lg:flex">
        <div className="[&_span]:!text-white mb-6"><Logo /></div>
        <nav className="flex-1 space-y-1">
          {([
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
          ] as [Tab, string, any][]).map(([k, l, I]) => (
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
              {["dashboard","leads","offices","bookings","callbacks","cities","services","testimonials","blogs","settings"].map(t => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <h1 className="hidden text-2xl font-extrabold capitalize lg:block">{tab}</h1>
        </header>
        <div className="p-6">
          {tab === "dashboard" && <Dashboard />}
          {tab === "leads" && <Leads />}
          {tab === "bookings" && <Bookings />}
          {tab === "callbacks" && <Callbacks />}
          {tab === "offices" && <OfficesTab />}
          {(["cities","services","testimonials","blogs","settings"] as Tab[]).includes(tab) && (
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

function Login({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="grid min-h-screen place-items-center bg-surface p-4">
      <form onSubmit={(e) => { e.preventDefault(); onLogin(); toast.success("Welcome back, admin"); }} className="card-soft w-full max-w-sm p-6">
        <Logo />
        <h1 className="mt-4 text-xl font-bold">Admin Login</h1>
        <p className="text-xs text-muted-foreground">Demo — any credentials will work.</p>
        <div className="mt-4 grid gap-3">
          <div className="grid gap-1.5"><Label>Email</Label><Input type="email" defaultValue="admin@officenest.in" /></div>
          <div className="grid gap-1.5"><Label>Password</Label><Input type="password" defaultValue="demo1234" /></div>
          <Button type="submit" className="bg-primary">Sign in</Button>
        </div>
      </form>
    </div>
  );
}

function Dashboard() {
  const leads = leadsStore.list();
  const bookings = bookingsStore.list();
  const callbacks = callbacksStore.list();
  const revenue = bookings.reduce((a, b) => a + b.total, 0);
  const pendingKyc = bookings.filter(b => b.status === "kyc-review" || b.status === "documents-submitted").length;
  const stats = [
    ["Total leads", String(leads.length)],
    ["New bookings", String(bookings.length)],
    ["Pending KYC", String(pendingKyc)],
    ["Active offices", String(OFFICES.length)],
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

function Leads() {
  const [rows, setRows] = useState(leadsStore.list());
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
              <td className="p-3"><Button size="icon" variant="ghost" onClick={() => { leadsStore.remove(l.id); setRows(leadsStore.list()); }}><Trash2 className="h-4 w-4" /></Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Bookings() {
  const [rows, setRows] = useState(bookingsStore.list());
  const statuses: Booking["status"][] = ["received", "payment-confirmed", "documents-submitted", "kyc-review", "prepared", "completed"];
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
                <Select value={b.status} onValueChange={(v) => { bookingsStore.update(b.id, { status: v as Booking["status"] }); setRows(bookingsStore.list()); toast.success("Status updated"); }}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </td>
              <td className="p-3"><Button size="icon" variant="ghost" onClick={() => { bookingsStore.remove(b.id); setRows(bookingsStore.list()); }}><Trash2 className="h-4 w-4" /></Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Callbacks() {
  const [rows, setRows] = useState(callbacksStore.list());
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
              <td className="p-3"><Button size="icon" variant="ghost" onClick={() => { callbacksStore.remove(c.id); setRows(callbacksStore.list()); }}><Trash2 className="h-4 w-4" /></Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OfficesTab() {
  return (
    <div className="card-soft overflow-x-auto">
      <table className="w-full min-w-[720px] text-sm">
        <thead className="bg-surface text-left"><tr><th className="p-3">ID</th><th className="p-3">Name</th><th className="p-3">City</th><th className="p-3">Rating</th><th className="p-3">Services</th></tr></thead>
        <tbody>
          {OFFICES.map(o => (
            <tr key={o.id} className="border-t">
              <td className="p-3 font-mono text-xs">{o.id}</td>
              <td className="p-3 font-medium">{o.name}</td>
              <td className="p-3">{o.city}, {o.state}</td>
              <td className="p-3">{o.rating.toFixed(1)}</td>
              <td className="p-3">{o.services.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
