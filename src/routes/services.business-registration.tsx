import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { SERVICE_CONTENT } from "@/lib/mock-data";

export const Route = createFileRoute("/services/business-registration")({
  head: () => ({ meta: [{ title: "Business Registration Services — OfficeMate" }, { name: "description", content: "Register your Pvt Ltd, LLP or OPC at a verified OfficeMate address across India." }] }),
  component: () => <ServicePage slug="business-registration" {...SERVICE_CONTENT["business-registration"]} />,
});
