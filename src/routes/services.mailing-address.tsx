import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { SERVICE_CONTENT } from "@/lib/mock-data";

export const Route = createFileRoute("/services/mailing-address")({
  head: () => ({ meta: [{ title: "Professional Mailing Address — OfficeMate" }, { name: "description", content: "A trustworthy business mailing address with courier handling and reception support." }] }),
  component: () => <ServicePage slug="mailing-address" {...SERVICE_CONTENT["mailing-address"]} />,
});
