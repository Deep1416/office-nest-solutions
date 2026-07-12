import { Link } from "@tanstack/react-router";
import { Building2 } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
        <Building2 className="h-5 w-5" />
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight text-navy">
        Office<span className="text-primary">Nest</span>
      </span>
    </Link>
  );
}
