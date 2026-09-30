import { Building2, CreditCard, Smartphone } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const METHODS = [
  ["upi", "UPI", Smartphone],
  ["card", "Credit / Debit Card", CreditCard],
  ["netbank", "Net Banking", Building2],
] as const;

export function PaymentStep({ payMethod, onChange }: { payMethod: string; onChange: (method: string) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold">Payment</h2>
      <p className="mt-1 text-sm text-muted-foreground">Demo payment — no real transaction is processed.</p>
      <RadioGroup value={payMethod} onValueChange={onChange} className="mt-4 grid gap-2">
        {METHODS.map(([v, l, Icon]) => (
          <label key={v} className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 ${payMethod === v ? "border-primary bg-primary/5" : ""}`}>
            <RadioGroupItem value={v} />
            <Icon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{l}</span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}
