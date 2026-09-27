import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag, Truck, Shield, MapPin } from "lucide-react";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/ecommerce-apob-vpob")({
  head: () => ({ meta: [{ title: "Ecommerce APoB / VPoB — OfficeMate" }, { name: "description", content: "Additional / Virtual Place of Business for Amazon, Flipkart, Meesho sellers — with GST-ready addresses." }] }),
  component: () => (
    <ServicePage
      slug="ecommerce-apob-vpob"
      title="APoB & VPoB for Online Sellers"
      tagline="Ecommerce compliance, simplified"
      hero="Additional and Virtual Place of Business addresses for Amazon, Flipkart, Meesho and Shopify sellers scaling across Indian states."
      image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000&auto=format&fit=crop&q=60"
      whoNeeds={["Amazon FBA sellers", "Flipkart, Meesho, Myntra sellers", "D2C brands with regional warehouses", "Aggregators expanding across states"]}
      documents={["Business PAN", "Director PAN + Aadhaar", "GST certificate", "Warehouse agreement (if separate)"]}
      benefits={[
        { title: "Amazon-ready", body: "APOB templates accepted by all major marketplaces.", icon: ShoppingBag },
        { title: "Multi-state GST", body: "Compliant addresses in 20+ states.", icon: MapPin },
        { title: "Signage", body: "Physical signage where required.", icon: Shield },
        { title: "Warehouse coordination", body: "Sync your warehouse APOB filings.", icon: Truck },
      ]}
      process={[
        { step: "State selection", body: "List the states you sell into." },
        { step: "Documentation", body: "APOB kit prepared per state." },
        { step: "Filing", body: "We assist with GST portal filing." },
        { step: "Go live", body: "Start selling compliantly." },
      ]}
      faqs={[
        { q: "Is APOB different from VPOB?", a: "APOB is an Additional PoB (extra location). VPOB is Virtual PoB — a service address for GST." },
        { q: "Which marketplaces are supported?", a: "Amazon, Flipkart, Meesho, Myntra, Ajio, and D2C stores." },
        { q: "Do I need a real warehouse?", a: "Only if you're storing goods. Our APOB serves compliance, not storage." },
      ]}
    />
  ),
});
