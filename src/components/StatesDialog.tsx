import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { STATES } from "@/lib/mock-data";

// "Location" popup listing every state we have offices in; each pill opens that state's page.
export function StatesDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Location</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          {STATES.map((st) => (
            <Link
              key={st.slug}
              to="/locations/$state"
              params={{ state: st.slug }}
              onClick={() => setOpen(false)}
              className="rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {st.name}
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
