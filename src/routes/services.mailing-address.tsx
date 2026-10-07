import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { SERVICE_CONTENT } from "@/lib/mock-data";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/services/mailing-address")({
  head: () => seoHead({ title: "Business Mailing Address in India — OfficeMate", description: "A trustworthy business mailing address with courier handling and reception support, so your company never needs a home address.", path: "/services/mailing-address" }),
  component: () => <ServicePage slug="mailing-address" {...SERVICE_CONTENT["mailing-address"]} />,
});
