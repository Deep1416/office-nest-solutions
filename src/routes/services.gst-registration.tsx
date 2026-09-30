import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { PopularLocations } from "@/components/PopularLocations";
import { CITIES, STATES, SERVICE_CONTENT } from "@/lib/mock-data";

const GST_LOCATIONS = STATES.map((s) => ({
  name: s.name,
  image: CITIES.find((c) => c.stateSlug === s.slug)!.image,
}));

export const Route = createFileRoute("/services/gst-registration")({
  head: () => ({ meta: [{ title: "GST Registration Address — OfficeMate" }, { name: "description", content: "GST-ready virtual office addresses across all Indian states. Expand pan-India without physical offices." }] }),
  component: () => (
    <>
      <ServicePage slug="gst-registration" {...SERVICE_CONTENT["gst-registration"]} />
      <PopularLocations
        title={<>Most Preferred <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">GST Registration</span> Locations</>}
        subtitle="Expand your business across India's leading commercial hubs with our GST registration services."
        items={GST_LOCATIONS}
      />
    </>
  ),
});
