import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { PopularLocations } from "@/components/PopularLocations";
import { CITIES, STATES, SERVICE_CONTENT } from "@/lib/mock-data";
import { seoHead } from "@/lib/seo";

const GST_LOCATIONS = STATES.map((s) => ({
  name: s.name,
  image: CITIES.find((c) => c.stateSlug === s.slug)!.image,
}));

export const Route = createFileRoute("/services/gst-registration")({
  head: () => seoHead({ title: "GST Registration Virtual Office Address in India — OfficeMate", description: "GST-ready virtual office addresses across all Indian states with rent agreement, NOC and utility bill. Expand pan-India without physical offices.", path: "/services/gst-registration" }),
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
