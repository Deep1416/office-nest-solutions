import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Annotation } from "@/components/Annotation";
import { Section } from "./Section";

const FAQS = [
  {
    q: "What is a virtual office address?",
    a: "A real commercial address in a prime location that you can use for registration, GST, billing and mail, without renting physical space.",
  },
  {
    q: "Is the virtual office address valid for GST registration?",
    a: "Yes. We provide the rent agreement, NOC and utility bill needed for GST and APOB registration.",
  },
  {
    q: "Which documents are required for KYC?",
    a: "PAN, Aadhaar of directors/partners, incorporation certificate, address proof and a passport-size photo.",
  },
  {
    q: "How long does the setup process take?",
    a: "Most addresses go live within 24–72 hours after KYC verification.",
  },
  {
    q: "Can I upgrade or change my plan later?",
    a: "Yes, you can upgrade, add cities or switch plans anytime from your account.",
  },
  {
    q: "Do you provide meeting room access?",
    a: "Yes. Professional and higher plans include meeting room access at our centers.",
  },
];

export function Faq() {
  return (
    <Section
      id="faq"
      alignTop
      eyebrow="FAQ"
      title={
        <>
          Frequently Asked <span className="text-primary">Questions</span>
        </>
      }
      sub="Find answers to the most common questions about OfficeMate and our virtual office services."
      headerExtra={
        <div className="relative mt-10 hidden w-[22rem] lg:block">
          <Annotation
            text="Still have questions? We're here to help!"
            className="absolute -top-16 right-0 w-56"
            rotate={4}
          />
          <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-elevated">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60"
              alt="Modern office building with large glass windows"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      }
    >
      <div>
        <Accordion type="single" collapsible className="w-full space-y-2.5">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={String(i)}
              className="rounded-xl border border-border bg-white px-5"
            >
              <AccordionTrigger className="gap-3 py-0 hover:no-underline [&>svg]:text-navy">
                <span className="flex min-h-[52px] flex-1 items-center gap-3">
                  <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-semibold text-navy">{f.q}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-10 text-[14px] text-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
