import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Check, Mail, MapPin, MessageCircle, Navigation, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/ui/form-field";
import { useCreateLead } from "@/lib/queries/leads";
import { BRAND, whatsappUrl } from "@/lib/config";
import { CITIES } from "@/lib/mock-data";
import { Section } from "./Section";

const BUSINESS_TYPES = ["Proprietorship", "Partnership", "LLP", "Pvt Ltd", "OPC", "Other"];

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Full name is required"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Enter a valid email address"),
  businessType: z.string().min(1, "Select a business type"),
  city: z.string().min(1, "Select your preferred city"),
  message: z.string().max(500).optional(),
});

const CONTACT_CARDS = [
  {
    icon: Phone,
    title: "Call Us",
    value: BRAND.phone,
    detail: "Mon - Sat, 9 AM - 7 PM",
    tile: "bg-primary",
    href: `tel:${BRAND.phoneRaw}`,
  },
  {
    icon: MessageCircle,
    title: "Chat on WhatsApp",
    value: "Get instant support",
    detail: "",
    tile: "bg-success",
    href: whatsappUrl(
      "Hello OfficeMate, I'd like to know more about your virtual office services.",
    ),
  },
  {
    icon: Mail,
    title: "Email Us",
    value: BRAND.email,
    detail: "We'll respond within 24 hours",
    tile: "bg-orange",
    href: `mailto:${BRAND.email}`,
  },
  {
    icon: MapPin,
    title: "Our Office",
    value: BRAND.address.split(",").slice(0, 2).join(","),
    detail: BRAND.address.split(",").slice(2).join(",").trim(),
    tile: "bg-primary",
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAND.address)}`,
  },
];

export function GetQuote() {
  const [businessType, setBusinessType] = useState("");
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const createLead = useCreateLead();

  return (
    <Section
      id="contact"
      eyebrow="Get a Quote"
      title={
        <>
          Let&apos;s Get Your
          <br />
          Business Started
        </>
      }
      sub="Tell us your requirements and our experts will get back to you with the best solution and pricing."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col">
          <div className="grid gap-3.5 sm:grid-cols-2">
            {CONTACT_CARDS.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                className="card-soft card-soft-hover flex items-start gap-3 p-3.5"
              >
                <span
                  className={`grid h-11 w-11 flex-shrink-0 place-items-center rounded-lg text-white ${c.tile}`}
                >
                  <c.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-[13px] font-bold text-navy">{c.title}</div>
                  <div
                    className={`truncate text-xs ${c.title === "Chat on WhatsApp" ? "text-success" : "text-muted-foreground"}`}
                  >
                    {c.value}
                  </div>
                  {c.detail && (
                    <div className="truncate text-[11px] text-muted-foreground">{c.detail}</div>
                  )}
                </div>
              </a>
            ))}
          </div>

          <div className="relative mt-4 flex min-h-[240px] flex-1 flex-col overflow-hidden rounded-2xl border border-border">
            <iframe
              title="OfficeMate office location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(BRAND.address)}&output=embed`}
              className="w-full flex-1 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAND.address)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-navy py-3 text-white transition-colors hover:bg-navy/90"
            >
              <Navigation className="h-4 w-4" />
              <span className="text-xs font-semibold">Get Directions</span>
            </a>
          </div>
        </div>

        <div className="card-soft bg-white p-7">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-success-50 text-success">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-navy">
                Thanks! Our team will contact you within 24 hours.
              </h3>
              <Button
                variant="outline"
                className="mt-6 border-primary text-primary hover:bg-primary-50"
                onClick={() => setSubmitted(false)}
              >
                Send another enquiry
              </Button>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-extrabold text-navy">Send an Enquiry</h3>
              <form
                className="mt-5 grid gap-4 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const payload = {
                    name: String(fd.get("name") ?? "").trim(),
                    phone: String(fd.get("phone") ?? "").trim(),
                    email: String(fd.get("email") ?? "").trim(),
                    businessType,
                    city,
                    message: String(fd.get("message") ?? "").trim(),
                  };
                  const parsed = enquirySchema.safeParse(payload);
                  if (!parsed.success) {
                    toast.error(parsed.error.issues[0].message);
                    return;
                  }
                  createLead.mutate(
                    {
                      name: parsed.data.name,
                      phone: parsed.data.phone,
                      email: parsed.data.email,
                      city: parsed.data.city,
                      purpose: parsed.data.businessType,
                      message: parsed.data.message,
                    },
                    {
                      onSuccess: () => setSubmitted(true),
                      onError: () => toast.error("Something went wrong submitting your enquiry."),
                    },
                  );
                }}
              >
                <FormField label="Full Name *">
                  {(id) => (
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={id}
                        name="name"
                        required
                        className="h-[46px] border-border bg-soft pl-9 focus-visible:ring-[3px] focus-visible:ring-primary-50"
                        placeholder="Enter full name"
                      />
                    </div>
                  )}
                </FormField>
                <FormField label="Phone Number *">
                  {(id) => (
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={id}
                        name="phone"
                        required
                        inputMode="numeric"
                        maxLength={10}
                        className="h-[46px] border-border bg-soft pl-9 focus-visible:ring-[3px] focus-visible:ring-primary-50"
                        placeholder="Enter your number"
                      />
                    </div>
                  )}
                </FormField>
                <FormField label="Email Address *">
                  {(id) => (
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id={id}
                        type="email"
                        name="email"
                        required
                        className="h-[46px] border-border bg-soft pl-9 focus-visible:ring-[3px] focus-visible:ring-primary-50"
                        placeholder="Enter your email"
                      />
                    </div>
                  )}
                </FormField>
                <FormField label="Business Type *">
                  {(id) => (
                    <Select value={businessType} onValueChange={setBusinessType}>
                      <SelectTrigger id={id} className="h-[46px] border-border bg-soft">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        {BUSINESS_TYPES.map((b) => (
                          <SelectItem key={b} value={b}>
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </FormField>
                <FormField label="Select Location *" className="sm:col-span-2">
                  {(id) => (
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Select value={city} onValueChange={setCity}>
                        <SelectTrigger id={id} className="h-[46px] border-border bg-soft pl-9">
                          <SelectValue placeholder="Choose your preferred city" />
                        </SelectTrigger>
                        <SelectContent>
                          {CITIES.map((c) => (
                            <SelectItem key={c.slug} value={c.slug}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </FormField>
                <FormField label="Additional Requirements (Optional)" className="sm:col-span-2">
                  {(id) => (
                    <Textarea
                      id={id}
                      name="message"
                      rows={4}
                      maxLength={500}
                      className="border-border bg-soft focus-visible:ring-[3px] focus-visible:ring-primary-50"
                      placeholder="Tell us more about your requirements..."
                    />
                  )}
                </FormField>
                <div className="sm:col-span-2">
                  <Button
                    type="submit"
                    disabled={createLead.isPending}
                    className="h-[50px] w-full bg-orange text-orange-foreground shadow-cta hover:bg-orange-600"
                  >
                    {createLead.isPending ? "Submitting..." : "Submit Enquiry →"}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
