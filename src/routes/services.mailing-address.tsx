import { createFileRoute } from "@tanstack/react-router";
import { Mail, Package, Building2, Shield } from "lucide-react";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/mailing-address")({
  head: () => ({ meta: [{ title: "Professional Mailing Address — OfficeNest" }, { name: "description", content: "A trustworthy business mailing address with courier handling and reception support." }] }),
  component: () => (
    <ServicePage
      slug="mailing-address"
      title="A Professional Mailing Address"
      tagline="Ditch the home address"
      hero="Get a credible business address for banking, client mail and correspondence — with courier and reception support included."
      image="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=1000&auto=format&fit=crop&q=60"
      whoNeeds={["Freelancers and consultants", "Remote-first startups", "Overseas founders operating in India", "Anyone protecting their home address"]}
      documents={["PAN card", "Aadhaar / passport", "Business proof (if company)"]}
      benefits={[
        { title: "Prestigious address", body: "Look established from day one.", icon: Building2 },
        { title: "Courier handling", body: "We receive, log and forward.", icon: Package },
        { title: "Reception support", body: "Real humans greet your mail.", icon: Mail },
        { title: "Privacy", body: "Keep your home address private.", icon: Shield },
      ]}
      process={[
        { step: "Choose location", body: "Pick your preferred city." },
        { step: "Submit KYC", body: "Simple identity verification." },
        { step: "Go live", body: "Address active in 24 hours." },
        { step: "Get mail", body: "Notifications for every courier." },
      ]}
      faqs={[
        { q: "Can I use this for banking?", a: "Yes, ideal for opening a current account." },
        { q: "How do I get my mail?", a: "Scan & forward, or physical dispatch." },
        { q: "Any signage on the address?", a: "Signage available on select plans." },
      ]}
    />
  ),
});
