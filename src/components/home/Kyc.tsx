import {
  Camera,
  Check,
  ClipboardList,
  CreditCard,
  FileText,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Annotation } from "@/components/Annotation";
import { Section } from "./Section";

const KYC_DOCS = [
  {
    icon: CreditCard,
    title: "PAN Card",
    desc: "Company or individual",
    tile: "bg-primary-50 text-primary",
  },
  {
    icon: FileText,
    title: "Aadhaar Card",
    desc: "For all directors/partners",
    tile: "bg-violet-50 text-violet",
  },
  {
    icon: ClipboardList,
    title: "Incorporation Certificate",
    desc: "For Pvt Ltd / LLP / OPC",
    tile: "bg-orange-50 text-orange",
  },
  {
    icon: MapPin,
    title: "Address Proof",
    desc: "Recent utility bill or bank statement",
    tile: "bg-primary-50 text-primary",
  },
  {
    icon: Camera,
    title: "Director Photo",
    desc: "Recent passport size photograph",
    tile: "bg-violet-50 text-violet",
  },
];

const SECURITY_POINTS = [
  "Encrypted & secure storage",
  "Used only for verification",
  "Completely confidential",
  "Quick processing (0-48 hrs)",
];

export function Kyc() {
  return (
    <Section
      id="kyc"
      alignTop
      eyebrow="KYC & Documents"
      title={
        <>
          Quick & Secure <span className="text-primary">KYC</span>
        </>
      }
      sub="Complete your verification with a few simple documents and get your business address live quickly."
      headerExtra={
        <div className="relative mt-10 hidden w-[22rem] lg:block">
          <Annotation
            text="Simple Documentation, Faster Activation"
            className="absolute -top-24 right-0 w-56"
            rotate={-4}
          />
          <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-elevated">
            <img
              src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&auto=format&fit=crop&q=60"
              alt="Neatly stacked business documents beside a potted plant"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      }
    >
      <div>
        <div className="relative grid gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="text-lg font-bold text-primary">Required Documents</div>
            <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
              {KYC_DOCS.map((d, i) => (
                <div
                  key={d.title}
                  className={`grid min-h-[120px] gap-1 rounded-xl border border-border bg-white p-3.5 ${i === KYC_DOCS.length - 1 && i % 2 === 0 ? "sm:col-span-2" : ""}`}
                >
                  <span className={`grid h-10 w-10 place-items-center rounded-lg ${d.tile}`}>
                    <d.icon className="h-5 w-5" />
                  </span>
                  <div className="mt-1 text-[13px] font-bold text-navy">{d.title}</div>
                  <div className="text-[11px] text-muted-foreground">{d.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-primary p-7 text-primary-foreground">
            <div className="flex items-start justify-between gap-3">
              <div className="text-xl font-extrabold leading-tight">
                Documents are Safe &amp; Secure
              </div>
              <ShieldCheck className="h-9 w-9 flex-shrink-0 opacity-80" aria-hidden="true" />
            </div>
            <ul className="mt-4 space-y-4 text-sm">
              {SECURITY_POINTS.map((l) => (
                <li key={l} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0" /> {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
