import { createFileRoute } from "@tanstack/react-router";
import { Receipt, Shield, MapPin, Zap } from "lucide-react";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/gst-registration")({
  head: () => ({ meta: [{ title: "GST Registration Address — OfficeMate" }, { name: "description", content: "GST-ready virtual office addresses across all Indian states. Expand pan-India without physical offices." }] }),
  component: () => (
    <ServicePage
      slug="gst-registration"
      title="GST Registration Across India"
      tagline="Multi-state GST addresses"
      hero="Register for GST in any state with an OfficeMate address. Perfect for sellers, SaaS companies, and consultants expanding pan-India."
      image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1000&auto=format&fit=crop&q=60"
      whoNeeds={["Ecommerce sellers on Amazon / Flipkart", "SaaS and service businesses billing across states", "Manufacturers with warehouses in new states", "Startups scaling nationally"]}
      documents={["PAN card of business", "PAN + Aadhaar of authorised signatory", "Constitution documents", "Bank statement / cancelled cheque", "Photograph"]}
      benefits={[
        { title: "GST officer approved", body: "Full documentation kit accepted across states.", icon: Shield },
        { title: "Multi-state ready", body: "Register in 10 states from one dashboard.", icon: MapPin },
        { title: "Fast setup", body: "Address activation in 24–48 hours.", icon: Zap },
        { title: "Ongoing support", body: "GSTIN help, address transfer, renewals.", icon: Receipt },
      ]}
      process={[
        { step: "Pick state", body: "Choose the state where you need GST." },
        { step: "Submit details", body: "Basic business + KYC info." },
        { step: "Get docs", body: "Rent agreement, NOC, utility bill." },
        { step: "File GST", body: "Use the docs to file GST — we help." },
      ]}
      faqs={[
        { q: "Is the address usable for GST?", a: "Yes, every OfficeMate address is verified and GST-officer accepted." },
        { q: "Can I get APOB for Amazon?", a: "Yes, we specialize in APOB/VPOB for online sellers." },
        { q: "What if my GST gets rejected?", a: "We assist with re-submission and offer refund per our terms." },
      ]}
    />
  ),
});
