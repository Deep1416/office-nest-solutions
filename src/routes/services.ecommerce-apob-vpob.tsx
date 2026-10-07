import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { SERVICE_CONTENT } from "@/lib/mock-data";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/services/ecommerce-apob-vpob")({
  head: () => seoHead({ title: "APoB & VPoB for Amazon, Flipkart & Meesho Sellers — OfficeMate", description: "Additional / Virtual Place of Business for Amazon, Flipkart and Meesho sellers, with GST-ready addresses in every state.", path: "/services/ecommerce-apob-vpob" }),
  component: () => <ServicePage slug="ecommerce-apob-vpob" {...SERVICE_CONTENT["ecommerce-apob-vpob"]} />,
});
