import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { leadsStore } from "@/lib/storage";
import { CITIES, PURPOSES } from "@/lib/mock-data";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  phone: z.string().trim().regex(/^[+\d\s-]{7,15}$/, "Enter a valid phone"),
  email: z.string().trim().email("Enter a valid email").max(255),
  city: z.string().min(1, "Select a city"),
  purpose: z.string().min(1, "Select a purpose"),
  message: z.string().max(500).optional(),
});

export function QuoteForm({ compact = false, defaultCity }: { compact?: boolean; defaultCity?: string }) {
  const [city, setCity] = useState(defaultCity ?? "");
  const [purpose, setPurpose] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      className={compact ? "grid gap-3" : "grid gap-4 sm:grid-cols-2"}
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const payload = {
          name: String(fd.get("name") ?? "").trim(),
          phone: String(fd.get("phone") ?? "").trim(),
          email: String(fd.get("email") ?? "").trim(),
          city, purpose,
          message: String(fd.get("message") ?? "").trim(),
        };
        const parsed = schema.safeParse(payload);
        if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
        setBusy(true);
        setTimeout(() => {
          leadsStore.add(parsed.data);
          toast.success("Thanks! Our team will reach out within a few hours.");
          (e.target as HTMLFormElement).reset();
          setCity(""); setPurpose(""); setBusy(false);
        }, 300);
      }}
    >
      <Field label="Full name"><Input name="name" required maxLength={80} placeholder="Your full name" /></Field>
      <Field label="Phone"><Input name="phone" required maxLength={15} placeholder="+91 ..." /></Field>
      <Field label="Email"><Input type="email" name="email" required maxLength={255} placeholder="you@company.com" /></Field>
      <Field label="Preferred city">
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
          <SelectContent>{CITIES.map(c => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}</SelectContent>
        </Select>
      </Field>
      <Field label="Service purpose" className={compact ? "" : "sm:col-span-2"}>
        <Select value={purpose} onValueChange={setPurpose}>
          <SelectTrigger><SelectValue placeholder="What do you need?" /></SelectTrigger>
          <SelectContent>{PURPOSES.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
        </Select>
      </Field>
      <Field label="Message (optional)" className={compact ? "" : "sm:col-span-2"}>
        <Textarea name="message" rows={3} maxLength={500} placeholder="Tell us a bit about your requirement" />
      </Field>
      <div className={compact ? "" : "sm:col-span-2"}>
        <Button type="submit" disabled={busy} className="w-full bg-primary sm:w-auto">{busy ? "Submitting..." : "Get Free Quote"}</Button>
      </div>
    </form>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`grid gap-1.5 ${className}`}>
      <Label className="text-xs font-medium text-navy/70">{label}</Label>
      {children}
    </div>
  );
}
