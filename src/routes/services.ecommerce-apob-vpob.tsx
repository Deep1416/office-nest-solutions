import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { SERVICE_CONTENT } from "@/lib/mock-data";

export const Route = createFileRoute("/services/ecommerce-apob-vpob")({
  head: () => ({ meta: [{ title: "Ecommerce APoB / VPoB — OfficeMate" }, { name: "description", content: "Additional / Virtual Place of Business for Amazon, Flipkart, Meesho sellers — with GST-ready addresses." }] }),
  component: () => <ServicePage slug="ecommerce-apob-vpob" {...SERVICE_CONTENT["ecommerce-apob-vpob"]} />,
});
