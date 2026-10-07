import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { BRAND } from "@/lib/config";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    seoHead({
      title: "Privacy Policy — OfficeMate",
      description: "How OfficeMate collects, uses, stores and protects your personal information when you use our virtual office services.",
      path: "/privacy-policy",
    }),
  component: PrivacyPolicy,
});

const mail = <a href={`mailto:${BRAND.email}`} className="font-medium text-primary hover:underline">{BRAND.email}</a>;

const SECTIONS: LegalSection[] = [
  {
    heading: "Information we collect",
    paragraphs: ["We collect only the information needed to respond to you and deliver our services:"],
    bullets: [
      "Contact details you submit in enquiry, quote, callback and booking forms: name, phone number, email address and city.",
      "Business details: business name, business type, GST status, address and the service you are interested in.",
      "KYC documents required to activate a virtual office address, such as PAN, Aadhaar, incorporation certificate, address proof and a photograph of the proprietor, partners or directors.",
      "Messages and requirements you write to us, and the details of any calls or WhatsApp chats with our team.",
      "Basic technical data sent by your browser, such as IP address, device and browser type, and the pages you visit.",
    ],
  },
  {
    heading: "How we use your information",
    bullets: [
      "To reply to your enquiry, schedule callbacks and send quotes.",
      "To process bookings, verify KYC and activate your virtual office, GST registration or mailing address service.",
      "To handle mail, courier and customer support for the services you purchase.",
      "To meet legal, tax and regulatory requirements, and to prevent fraud and misuse.",
      "To improve our website and services.",
      "We do not sell your personal information.",
    ],
  },
  {
    heading: "Where your information is stored",
    paragraphs: [
      "When you submit a form, the details are saved in your browser and sent to our support inbox by email. Our website is hosted on Vercel, and enquiry emails are routed through Google Apps Script and Gmail. These providers process data on our behalf under their own security and privacy terms.",
      "Your data may be stored or processed on servers outside India. We take reasonable steps to ensure it is handled securely.",
    ],
  },
  {
    heading: "Sharing your information",
    paragraphs: ["We share information only when needed:"],
    bullets: [
      "With the centre or partner that hosts your virtual office address, to the extent required to provide the service.",
      "With government authorities, tax officers or regulators when the law requires it, or when you ask us to submit your registration.",
      "With service providers who help us run our website, email and payments, under confidentiality obligations.",
      "In a business transfer, such as a merger or sale, where the receiving party agrees to honour this policy.",
    ],
  },
  {
    heading: "Cookies and third-party services",
    paragraphs: [
      "We do not currently use advertising cookies. Our pages load fonts from Google Fonts, and links such as WhatsApp or phone open third-party apps that follow their own privacy policies. If we add analytics or advertising tools in future, we will update this policy.",
    ],
  },
  {
    heading: "How long we keep your information",
    paragraphs: [
      "We keep enquiry data for as long as needed to respond to you and for a reasonable follow-up period. Booking and KYC records are kept for as long as your service is active and for the period required by applicable law, after which we delete or anonymise them.",
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "We use reasonable technical and organisational safeguards to protect your information, including encrypted connections (HTTPS) and restricted access to our inbox and systems. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "Under the Digital Personal Data Protection Act, 2023 and other applicable law, you may ask us to:",
    ],
    bullets: [
      "tell you what personal data we hold about you and how we use it;",
      "correct inaccurate or incomplete data;",
      "delete your data, subject to our legal retention duties;",
      "withdraw your consent to our use of your data.",
    ],
  },
  {
    heading: "Children",
    paragraphs: ["Our services are meant for businesses and adults. We do not knowingly collect personal data from anyone under 18."],
  },
  {
    heading: "Changes to this policy",
    paragraphs: ["We may update this policy from time to time. The latest version is always on this page, with its revised date at the top."],
  },
  {
    heading: "Contact and grievances",
    paragraphs: [
      <>To exercise your rights or raise a privacy concern, email us at {mail}, call {BRAND.phone}, or write to {BRAND.address}. We aim to respond within 30 days.</>,
      <>See also our <Link to="/terms-and-conditions" className="font-medium text-primary hover:underline">Terms &amp; Conditions</Link>.</>,
    ],
  },
];

function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="7 October 2026"
      intro={<>{BRAND.name} (“we”, “us”) respects your privacy. This policy explains what personal information we collect through officemate.co.in, how we use it, and the choices you have. By using our website or services you agree to this policy.</>}
      sections={SECTIONS}
    />
  );
}
