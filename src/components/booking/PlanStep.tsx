import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SERVICE_LABEL, inr, type OfficeListing, type ServiceType } from "@/lib/mock-data";

export function PlanStep({
  office, plan, onPlanChange, duration, onDurationChange,
}: {
  office: OfficeListing;
  plan: ServiceType;
  onPlanChange: (plan: ServiceType) => void;
  duration: "1y" | "2y";
  onDurationChange: (duration: "1y" | "2y") => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold">Select your plan</h2>
      <div className="mt-4 grid gap-3">
        {office.services.map(s => (
          <button key={s} onClick={() => onPlanChange(s)} className={`flex items-center justify-between rounded-lg border p-4 text-left ${plan === s ? "border-primary bg-primary/5" : ""}`}>
            <div>
              <div className="font-semibold text-navy">{SERVICE_LABEL[s]}</div>
              <div className="text-xs text-muted-foreground">Includes rent agreement, NOC, utility bill</div>
            </div>
            <div className="text-lg font-extrabold text-primary">{inr(office.pricing[s] ?? 0)}</div>
          </button>
        ))}
      </div>
      <div className="mt-6">
        <Label>Duration</Label>
        <RadioGroup value={duration} onValueChange={(v) => onDurationChange(v as "1y" | "2y")} className="mt-2 grid grid-cols-2 gap-2">
          {([["1y", "1 year"], ["2y", "2 years (10% off)"]] as const).map(([v, l]) => (
            <label key={v} className="flex cursor-pointer items-center gap-2 rounded-md border p-3 text-sm"><RadioGroupItem value={v} /> {l}</label>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
