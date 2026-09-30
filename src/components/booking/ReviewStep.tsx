import { SERVICE_LABEL, type OfficeListing, type ServiceType } from "@/lib/mock-data";
import type { CustomerInfo } from "./schema";
import { Row } from "./shared";

export function ReviewStep({
  office, plan, duration, customer,
}: {
  office: OfficeListing;
  plan: ServiceType;
  duration: "1y" | "2y";
  customer: CustomerInfo;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold">Review your order</h2>
      <div className="mt-4 grid gap-4">
        <Row label="Office" value={`${office.name}, ${office.city}`} />
        <Row label="Plan" value={SERVICE_LABEL[plan]} />
        <Row label="Duration" value={duration === "1y" ? "1 year" : "2 years"} />
        <Row label="Customer" value={`${customer.name} · ${customer.email}`} />
        <Row label="Business" value={`${customer.businessName} (${customer.businessType})`} />
      </div>
    </div>
  );
}
