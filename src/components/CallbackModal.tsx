import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { z } from "zod";
import { callbacksStore } from "@/lib/storage";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  phone: z.string().trim().regex(/^[+\d\s-]{7,15}$/, "Enter a valid phone number"),
  when: z.string(),
  message: z.string().max(500).optional(),
});

export function CallbackTrigger({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [when, setWhen] = useState("now");
  const [customTime, setCustomTime] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request a Callback</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const payload = {
              name: String(fd.get("name") ?? ""),
              phone: String(fd.get("phone") ?? ""),
              when: when === "custom" ? customTime : when,
              message: String(fd.get("message") ?? ""),
            };
            const parsed = schema.safeParse(payload);
            if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
            callbacksStore.add(parsed.data);
            toast.success("Callback scheduled — our team will call you soon");
            setOpen(false);
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="cb-name">Full name</Label>
            <Input id="cb-name" name="name" required maxLength={80} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cb-phone">Phone</Label>
            <Input id="cb-phone" name="phone" required maxLength={15} placeholder="+91 ..." />
          </div>
          <div className="grid gap-2">
            <Label>Preferred time</Label>
            <RadioGroup value={when} onValueChange={setWhen} className="grid grid-cols-2 gap-2">
              {[
                ["now", "Call now"],
                ["15min", "In 15 minutes"],
                ["1hr", "In one hour"],
                ["custom", "Custom time"],
              ].map(([v, l]) => (
                <label key={v} className="flex cursor-pointer items-center gap-2 rounded-md border p-2 text-sm hover:bg-accent">
                  <RadioGroupItem value={v} /> {l}
                </label>
              ))}
            </RadioGroup>
            {when === "custom" && (
              <Input type="datetime-local" value={customTime} onChange={(e) => setCustomTime(e.target.value)} />
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cb-msg">Message (optional)</Label>
            <Textarea id="cb-msg" name="message" rows={3} maxLength={500} />
          </div>
          <Button type="submit" className="w-full bg-primary">Schedule Callback</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
