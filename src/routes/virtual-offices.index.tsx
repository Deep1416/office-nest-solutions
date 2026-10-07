import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { VirtualOfficeHero, VirtualOfficeContent } from "@/components/virtual-office/Landing";
import { seoHead } from "@/lib/seo";

// Search params are kept so existing links like /virtual-offices?city=... still type-check.
const virtualOfficesSearchSchema = z.object({
  q: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  service: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  priceMax: z.number().optional(),
  sort: z.enum(["price-asc", "price-desc", "rating"]).optional(),
  page: z.number().optional(),
});

export const Route = createFileRoute("/virtual-offices/")({
  validateSearch: virtualOfficesSearchSchema,
  head: () => seoHead({ title: "Virtual Offices in 50+ Indian Cities — OfficeMate", description: "Compare verified virtual offices for GST, business registration and mailing across Indian cities. Transparent pricing, quick KYC and dedicated support.", path: "/virtual-offices" }),
  component: VirtualOffices,
});

function VirtualOffices() {
  return (
    <div>
      <VirtualOfficeHero />
      <VirtualOfficeContent />
    </div>
  );
}
