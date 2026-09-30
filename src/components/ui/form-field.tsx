import { useId, type ReactNode } from "react";
import { Label } from "@/components/ui/label";

export function FormField({
  label,
  children,
  className = "",
  labelClassName = "text-xs font-medium text-navy/70",
}: {
  label: string;
  children: (id: string) => ReactNode;
  className?: string;
  labelClassName?: string;
}) {
  const id = useId();
  return (
    <div className={`grid gap-1.5 ${className}`}>
      <Label htmlFor={id} className={labelClassName}>{label}</Label>
      {children(id)}
    </div>
  );
}
