import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateLead } from "@/lib/queries/leads";
import { CITIES, PURPOSES } from "@/lib/mock-data";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  phone: z.string().trim().regex(/^[+\d\s-]{7,15}$/, "Enter a valid phone"),
  email: z.string().trim().email("Enter a valid email").max(255),
  city: z.string().min(1, "Select a city"),
  purpose: z.string().min(1, "Select a purpose"),
  message: z.string().max(500).optional(),
});

export function QuoteForm({ compact = false, stacked = false, defaultCity }: { compact?: boolean; stacked?: boolean; defaultCity?: string }) {
  const [city, setCity] = useState(defaultCity ?? "");
  const [purpose, setPurpose] = useState("");
  const createLead = useCreateLead();
  const span2 = stacked ? "col-span-2" : "sm:col-span-2";

  return (
    <form
      className={`grid ${compact ? "gap-x-3 gap-y-2.5" : "gap-4"} ${stacked ? "grid-cols-2" : "sm:grid-cols-2"}`}
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const payload = {
          name: String(fd.get("name") ?? "").trim(),
          phone: String(fd.get("phone") ?? "").trim(),
          email: String(fd.get("email") ?? "").trim(),
          city, purpose,
          message: String(fd.get("message") ?? "").trim(),
        };
        const parsed = schema.safeParse(payload);
        if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
        createLead.mutate(parsed.data, {
          onSuccess: () => {
            toast.success("Thanks! Our team will reach out within a few hours.");
            form.reset();
            setCity(""); setPurpose("");
          },
          onError: () => toast.error("Something went wrong submitting your request."),
        });
      }}
    >
      <FormField label="Full name">{(id) => <Input id={id} name="name" required maxLength={80} placeholder="Your full name" />}</FormField>
      <FormField label="Phone">{(id) => <Input id={id} name="phone" required maxLength={15} placeholder="+91 ..." />}</FormField>
      <FormField label="Email" className={stacked ? "col-span-2" : undefined}>{(id) => <Input id={id} type="email" name="email" required maxLength={255} placeholder="you@company.com" />}</FormField>
      <FormField label="Preferred city">
        {(id) => (
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger id={id}><SelectValue placeholder="Select city" /></SelectTrigger>
            <SelectContent>{CITIES.map(c => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}</SelectContent>
          </Select>
        )}
      </FormField>
      <FormField label="Service purpose" className={stacked ? undefined : span2}>
        {(id) => (
          <Select value={purpose} onValueChange={setPurpose}>
            <SelectTrigger id={id}><SelectValue placeholder="What do you need?" /></SelectTrigger>
            <SelectContent>{PURPOSES.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
          </Select>
        )}
      </FormField>
      <FormField label="Message (optional)" className={span2}>
        {(id) => <Textarea id={id} name="message" rows={compact ? 3 : 3} maxLength={500} placeholder="Tell us a bit about your requirement" />}
      </FormField>
      <div className={span2}>
        <Button type="submit" disabled={createLead.isPending} size="lg" className={compact ? "h-12 w-full rounded-xl bg-primary text-base font-semibold shadow-lg shadow-primary/25" : "h-12 w-full rounded-xl bg-primary text-base font-semibold shadow-lg shadow-primary/25 sm:w-auto sm:px-8"}>{createLead.isPending ? "Submitting..." : "Get Free Quote"}</Button>
      </div>
    </form>
  );
}
