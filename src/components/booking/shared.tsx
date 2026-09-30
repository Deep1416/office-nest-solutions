export function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-2 text-sm"><span className="text-muted-foreground">{label}</span><span className="font-medium text-navy text-right">{value}</span></div>;
}
