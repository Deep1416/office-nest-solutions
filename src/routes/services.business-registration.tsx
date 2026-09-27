import { createFileRoute } from "@tanstack/react-router";
import { FileText, Shield, Zap, Users } from "lucide-react";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/business-registration")({
  head: () => ({ meta: [{ title: "Business Registration Services — OfficeMate" }, { name: "description", content: "Register your Pvt Ltd, LLP or OPC at a verified OfficeMate address across India." }] }),
  component: () => (
    <ServicePage
      slug="business-registration"
      title="Business Registration Made Simple"
      tagline="MCA-compliant address for company registration"
      hero="Register your Private Limited, LLP, or OPC at a verified professional address — with all documentation handled by our experts."
      image="https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=1000&auto=format&fit=crop&q=60"
      whoNeeds={[
        "Founders launching a new company",
        "Bootstrapped teams without a physical office",
        "Consultants operating from home",
        "Businesses expanding to new states",
      ]}
      documents={["PAN card of directors", "Aadhaar / passport", "Passport-size photograph", "Utility bill (recent)", "Board resolution (if applicable)", "Cancelled cheque"]}
      benefits={[
        { title: "MCA-compliant", body: "Every address passes MCA scrutiny. No rejections.", icon: Shield },
        { title: "Fast turnaround", body: "Documents delivered in 24–72 hours.", icon: Zap },
        { title: "Dedicated support", body: "One account manager, end-to-end.", icon: Users },
        { title: "Complete kit", body: "Rent agreement, NOC and utility bill included.", icon: FileText },
      ]}
      process={[
        { step: "Choose city", body: "Pick your business city from our network." },
        { step: "Submit KYC", body: "Simple document checklist online." },
        { step: "Verification", body: "Our compliance team validates everything." },
        { step: "Get documents", body: "Receive signed docs and start filing." },
      ]}
      faqs={[
        { q: "Can I register a Pvt Ltd here?", a: "Yes, all our addresses are MCA-compliant for Pvt Ltd, LLP, OPC and Partnerships." },
        { q: "Do I need to visit the office?", a: "No visit needed. Everything is handled online with couriered originals." },
        { q: "How long does the process take?", a: "Documents are typically delivered in 2–4 working days." },
      ]}
    />
  ),
});
