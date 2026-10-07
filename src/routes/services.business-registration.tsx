import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { SERVICE_CONTENT } from "@/lib/mock-data";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/services/business-registration")({
  head: () => seoHead({ title: "Company Registration Address (Pvt Ltd, LLP, OPC) — OfficeMate", description: "Register your Pvt Ltd, LLP or OPC at a verified OfficeMate address across India, with complete documentation and quick KYC.", path: "/services/business-registration" }),
  component: () => <ServicePage slug="business-registration" {...SERVICE_CONTENT["business-registration"]} />,
});
