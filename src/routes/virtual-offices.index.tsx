import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { VirtualOfficeHero, VirtualOfficeContent } from "@/components/virtual-office/Landing";

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
  head: () => ({
    meta: [
      { title: "Virtual Offices Across India — OfficeMate" },
      { name: "description", content: "Get a verified virtual office for GST, business registration and mailing across Indian cities." },
    ],
  }),
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
