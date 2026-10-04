import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Locations } from "@/components/home/Locations";
import { Services } from "@/components/home/Services";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Kyc } from "@/components/home/Kyc";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { GetQuote } from "@/components/home/GetQuote";
import { BRAND } from "@/lib/config";

const HOME_FAQS = [
  { q: "What is a virtual office address?", a: "A real commercial address in a prime location that you can use for registration, GST, billing and mail, without renting physical space." },
  { q: "Is the virtual office address valid for GST registration?", a: "Yes. We provide the rent agreement, NOC and utility bill needed for GST and APOB registration." },
  { q: "Which documents are required for KYC?", a: "PAN, Aadhaar of directors/partners, incorporation certificate, address proof and a passport-size photo." },
  { q: "How long does the setup process take?", a: "Most addresses go live within 24–72 hours after KYC verification." },
  { q: "Can I upgrade or change my plan later?", a: "Yes, you can upgrade, add cities or switch plans anytime from your account." },
  { q: "Do you provide meeting room access?", a: "Yes. Professional and higher plans include meeting room access at our centers." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: BRAND.name,
          telephone: BRAND.phone,
          email: BRAND.email,
          address: { "@type": "PostalAddress", streetAddress: BRAND.address, addressCountry: "IN" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: HOME_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Locations />
      <Services />
      <HowItWorks />
      <Kyc />
      <Testimonials />
      <Faq />
      <GetQuote />
    </>
  );
}
