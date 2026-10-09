import { CheckCircle2, ClipboardList, MessageCircle, Rocket, ShieldCheck, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CallbackTrigger } from "@/components/CallbackModal";
import { whatsappUrl } from "@/lib/config";
import { Section } from "./Section";

const STEPS = [
  { icon: ClipboardList, title: "Submit Details", desc: "Fill in your business requirements." },
  { icon: Upload, title: "Share Documents", desc: "Upload required KYC documents." },
  { icon: ShieldCheck, title: "Verification", desc: "Our team verifies your documents." },
  { icon: CheckCircle2, title: "Get Approval", desc: "Receive confirmation within 0-48 hours." },
  { icon: Rocket, title: "Go Live", desc: "Start using your virtual office address." },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" eyebrow="How It Works" title={<>Get Started in 5 Simple <span className="text-primary">Steps</span></>} sub="Setting up your virtual office with OfficeMate is quick, easy and hassle-free.">
      <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <div className="absolute left-0 right-0 top-4 hidden border-t-2 border-dashed border-primary-100 lg:block" aria-hidden="true" />
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative card-soft p-5">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-4 grid h-16 w-16 place-items-center rounded-full bg-primary-50 text-primary">
              <s.icon className="h-[30px] w-[30px]" />
            </div>
            <div className="mt-4 font-bold text-navy">{s.title}</div>
            <p className="mt-1 text-[13px] text-muted-foreground">{s.desc}</p>
          </li>
        ))}
      </ol>

      <div className="relative mt-10 flex min-h-[150px] flex-col items-center gap-6 overflow-hidden rounded-[20px] bg-primary-50 p-6 sm:flex-row sm:justify-between">
        <img
          src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=300&auto=format&fit=crop&q=60"
          alt="Smiling business consultant ready to help"
          className="h-28 w-28 flex-shrink-0 rounded-full object-cover sm:h-32 sm:w-32"
        />
        <div className="flex-1 text-center sm:text-left">
          <div className="text-[22px] font-extrabold text-navy">Need help getting started?</div>
          <p className="mt-1 text-sm text-muted-foreground">Our experts are here to guide you through the process.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <CallbackTrigger>
            <Button className="bg-orange text-orange-foreground shadow-cta hover:bg-orange-600">Talk to an Expert</Button>
          </CallbackTrigger>
          <Button asChild variant="outline" className="border-success text-navy hover:bg-success-50">
            <a href={whatsappUrl("Hello OfficeMate, I'd like help getting started.")} target="_blank" rel="noreferrer">
              <MessageCircle className="mr-1.5 h-4 w-4 text-success" /> Chat on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </Section>
  );
}
