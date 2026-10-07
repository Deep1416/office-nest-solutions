import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { BRAND } from "@/lib/config";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () =>
    seoHead({
      title: "Terms & Conditions — OfficeMate",
      description: "The terms that apply when you use the OfficeMate website and buy virtual office, GST registration or mailing address services.",
      path: "/terms-and-conditions",
    }),
  component: Terms,
});

const mail = <a href={`mailto:${BRAND.email}`} className="font-medium text-primary hover:underline">{BRAND.email}</a>;

const SECTIONS: LegalSection[] = [
  {
    heading: "Our services",
    paragraphs: [
      "OfficeMate provides virtual office addresses, business and GST registration support, business mailing addresses and Additional/Virtual Place of Business (APoB/VPoB) addresses for ecommerce sellers, through partner centres across India. The features, city and price of each plan are shown on the website and at the time of booking.",
    ],
  },
  {
    heading: "Eligibility and your account",
    bullets: [
      "You must be at least 18 years old and legally able to enter into a contract, or act for a company or firm that is.",
      "The details you give us must be true, complete and kept up to date.",
      "You are responsible for the activity on your booking and for keeping your reference number and contact details safe.",
    ],
  },
  {
    heading: "KYC and verification",
    paragraphs: [
      "We must verify the identity of the business and its owners before activating an address. You agree to provide valid KYC documents, such as PAN, Aadhaar, incorporation or partnership documents and address proof. We may delay, refuse or cancel a service if documents are missing, unclear, false or do not meet legal requirements.",
    ],
  },
  {
    heading: "Fees and payment",
    bullets: [
      "Prices are in Indian Rupees. GST and other applicable taxes are added at the rate shown at checkout (currently 18% GST).",
      "A service starts once payment is received and KYC is approved.",
      "Plans run for the term you choose (for example one or two years) and are not renewed unless you renew them.",
      "We may change prices for future bookings and renewals. A confirmed booking keeps the price you paid.",
    ],
  },
  {
    heading: "Refunds and cancellation",
    paragraphs: [
      "Refund and cancellation terms depend on the plan and how far the booking has progressed, and are shown at the time of booking. Costs already spent on third parties, such as agreement stamping or government fees, may not be refundable. To request a cancellation, contact us at the details below with your booking reference.",
    ],
  },
  {
    heading: "Acceptable use",
    paragraphs: ["You agree not to use our addresses or services:"],
    bullets: [
      "for any unlawful, fraudulent or misleading activity;",
      "to receive prohibited, hazardous or illegal goods, or to run a business that is illegal in India;",
      "to misrepresent your identity, business or location;",
      "in a way that harms the centre, other customers or OfficeMate.",
    ],
  },
  {
    heading: "Mail and courier handling",
    paragraphs: [
      "We handle mail and courier on a reasonable-efforts basis, as described in your plan. We are not responsible for loss or delay caused by senders or courier companies, or for items that are not covered by your plan.",
    ],
  },
  {
    heading: "Registrations and legal outcomes",
    paragraphs: [
      "We provide addresses and support. Approval of a GST, company or marketplace registration is decided by the relevant authority or platform, and we cannot guarantee any outcome or timeline. Nothing on this website is legal, tax or financial advice.",
    ],
  },
  {
    heading: "Suspension and termination",
    paragraphs: [
      "We may suspend or end a service without refund if you break these terms, provide false information, or if we are required to by law or by a government authority. You may stop using the service at any time, subject to the refund terms above.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "The OfficeMate name, logo, website design and content belong to us or our licensors. You may not copy, modify or reuse them without our written permission.",
    ],
  },
  {
    heading: "Disclaimer and limitation of liability",
    paragraphs: [
      "The website and services are provided “as is” and “as available”. To the fullest extent the law allows, OfficeMate is not liable for indirect, incidental or consequential losses, or for loss of profit or business, and our total liability for any claim is limited to the amount you paid us for the affected service.",
    ],
  },
  {
    heading: "Privacy",
    paragraphs: [
      <>How we handle your personal information is described in our <Link to="/privacy-policy" className="font-medium text-primary hover:underline">Privacy Policy</Link>.</>,
    ],
  },
  {
    heading: "Changes to these terms",
    paragraphs: ["We may update these terms from time to time. The current version is always on this page, and continued use of our services means you accept the changes."],
  },
  {
    heading: "Governing law and contact",
    paragraphs: [
      "These terms are governed by the laws of India. Courts at Gurugram, Haryana have exclusive jurisdiction over any dispute.",
      <>Questions about these terms? Email {mail}, call {BRAND.phone}, or write to {BRAND.address}.</>,
    ],
  },
];

function Terms() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="7 October 2026"
      intro={<>These terms apply to your use of officemate.co.in and to the services you buy from {BRAND.name}. Please read them carefully. By using our website or booking a service, you agree to them.</>}
      sections={SECTIONS}
    />
  );
}
