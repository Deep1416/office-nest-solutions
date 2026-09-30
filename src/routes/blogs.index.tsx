import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BLOGS } from "@/lib/mock-data";

export const Route = createFileRoute("/blogs/")({
  head: () => ({ meta: [{ title: "OfficeMate Blog — Guides on Virtual Offices, GST & Registration" }, { name: "description", content: "Practical guides for Indian founders on virtual offices, GST, company registration and ecommerce expansion." }] }),
  component: Blogs,
});

function Blogs() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const categories = Array.from(new Set(BLOGS.map(b => b.category)));
  const filtered = BLOGS.filter(b =>
    (!cat || b.category === cat) &&
    (!q || b.title.toLowerCase().includes(q.toLowerCase()))
  );
  const featured = BLOGS[0];

  return (
    <div className="bg-background">
      <div className="container-x py-12">
        <h1 className="text-4xl font-extrabold">Insights & Guides</h1>
        <p className="mt-2 text-muted-foreground">Practical advice for building your business in India.</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles..." className="pl-9" />
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setCat(null)} className={`rounded-full px-3 py-1 text-xs ${!cat ? "bg-primary text-primary-foreground" : "bg-surface text-navy"}`}>All</button>
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full px-3 py-1 text-xs ${cat === c ? "bg-primary text-primary-foreground" : "bg-surface text-navy"}`}>{c}</button>
            ))}
          </div>
        </div>

        <Link to="/blogs/$slug" params={{ slug: featured.slug }} className="card-soft card-soft-hover mt-8 grid gap-6 overflow-hidden lg:grid-cols-2">
          <img src={featured.image} alt={featured.title} className="aspect-[16/10] w-full object-cover" />
          <div className="p-6 lg:p-10">
            <Badge className="bg-orange text-orange-foreground">Featured</Badge>
            <h2 className="mt-3 text-2xl font-extrabold">{featured.title}</h2>
            <p className="mt-2 text-muted-foreground">{featured.excerpt}</p>
            <div className="mt-4 text-xs text-muted-foreground">{featured.category} · {featured.read}</div>
          </div>
        </Link>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(1).map(b => (
            <Link key={b.slug} to="/blogs/$slug" params={{ slug: b.slug }} className="card-soft card-soft-hover overflow-hidden">
              <img src={b.image} alt={b.title} className="aspect-[16/10] w-full object-cover" />
              <div className="p-5">
                <Badge variant="secondary" className="text-[10px]">{b.category}</Badge>
                <div className="mt-2 font-bold text-navy">{b.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{b.excerpt}</p>
                <div className="mt-3 text-xs text-muted-foreground">{b.date} · {b.read}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
