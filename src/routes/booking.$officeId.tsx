import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Check, ArrowLeft, ArrowRight, Upload, FileCheck2, CreditCard, Smartphone, Building2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OFFICES, SERVICE_LABEL, inr, type ServiceType } from "@/lib/mock-data";
import { bookingsStore, makeBookingRef, type Booking } from "@/lib/storage";
import { KYC } from "@/components/KycTabs";

export const Route = createFileRoute("/booking/$officeId")({
  loader: ({ params }) => {
    const office = OFFICES.find(o => o.id === params.officeId);
    if (!office) throw notFound();
    return { office };
  },
  component: BookingFlow,
});

const custSchema = z.object({
  name: z.string().trim().min(2, "Name required"),
  email: z.string().trim().email("Valid email required"),
  phone: z.string().trim().regex(/^[+\d\s-]{7,15}$/, "Valid phone required"),
  businessName: z.string().trim().min(1, "Business name required"),
  businessType: z.string().min(1, "Select business type"),
  gstStatus: z.string().min(1, "Select GST status"),
  address: z.string().trim().min(5, "Address required"),
});

function BookingFlow() {
  const { office } = Route.useLoaderData() as { office: import("@/lib/mock-data").OfficeListing };
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<ServiceType>(office.services[0]);
  const [duration, setDuration] = useState<"1y" | "2y">("1y");
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", businessName: "", businessType: "", gstStatus: "", address: "" });
  const [kycFiles, setKycFiles] = useState<Record<string, string>>({});
  const [payMethod, setPayMethod] = useState("upi");
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  const basePrice = office.pricing[plan] ?? 999;
  const subtotal = duration === "1y" ? basePrice : Math.round(basePrice * 1.8);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const steps = ["Plan", "Details", "KYC", "Review", "Payment"];
  const kycList = customer.businessType === "company" ? KYC.company : customer.businessType === "llp" || customer.businessType === "partnership" ? KYC.partnership : KYC.individual;

  if (confirmed) return <SuccessPage booking={confirmed} onNew={() => navigate({ to: "/" })} />;

  return (
    <div className="bg-surface">
      <div className="container-x py-8">
        <Link to="/virtual-offices/$id" params={{ id: office.id }} className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to office
        </Link>

        {/* Progress */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${i + 1 <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {i + 1 <= step - 1 ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={`text-xs ${i + 1 === step ? "font-semibold text-navy" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <div className="hidden h-px w-8 bg-border sm:block" />}
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="card-soft p-6">
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold">Select your plan</h2>
                <div className="mt-4 grid gap-3">
                  {office.services.map(s => (
                    <button key={s} onClick={() => setPlan(s)} className={`flex items-center justify-between rounded-lg border p-4 text-left ${plan === s ? "border-primary bg-primary/5" : ""}`}>
                      <div>
                        <div className="font-semibold text-navy">{SERVICE_LABEL[s]}</div>
                        <div className="text-xs text-muted-foreground">Includes rent agreement, NOC, utility bill</div>
                      </div>
                      <div className="text-lg font-extrabold text-primary">{inr(office.pricing[s] ?? 0)}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  <Label>Duration</Label>
                  <RadioGroup value={duration} onValueChange={(v) => setDuration(v as any)} className="mt-2 grid grid-cols-2 gap-2">
                    {[["1y", "1 year"], ["2y", "2 years (10% off)"]].map(([v, l]) => (
                      <label key={v} className="flex cursor-pointer items-center gap-2 rounded-md border p-3 text-sm hover:bg-accent"><RadioGroupItem value={v} /> {l}</label>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold">Customer information</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Fld label="Full name"><Input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} /></Fld>
                  <Fld label="Email"><Input type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} /></Fld>
                  <Fld label="Phone"><Input value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} /></Fld>
                  <Fld label="Business name"><Input value={customer.businessName} onChange={(e) => setCustomer({ ...customer, businessName: e.target.value })} /></Fld>
                  <Fld label="Business type">
                    <Select value={customer.businessType} onValueChange={(v) => setCustomer({ ...customer, businessType: v })}>
                      <SelectTrigger><SelectValue placeholder="Choose" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Sole Proprietor</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="llp">LLP</SelectItem>
                        <SelectItem value="company">Private / Public Company</SelectItem>
                      </SelectContent>
                    </Select>
                  </Fld>
                  <Fld label="GST status">
                    <Select value={customer.gstStatus} onValueChange={(v) => setCustomer({ ...customer, gstStatus: v })}>
                      <SelectTrigger><SelectValue placeholder="Choose" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="registered">Registered</SelectItem>
                        <SelectItem value="pending">Applying now</SelectItem>
                        <SelectItem value="none">Not required</SelectItem>
                      </SelectContent>
                    </Select>
                  </Fld>
                  <Fld label="Current address" className="sm:col-span-2"><Textarea rows={2} value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} /></Fld>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold">KYC documents</h2>
                <p className="mt-1 text-sm text-muted-foreground">Please upload the following. Accepted formats: PDF, JPG, PNG. Max 5 MB each. Files are not uploaded — demo only.</p>
                <div className="mt-4 grid gap-3">
                  {kycList.map(item => (
                    <div key={item} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        {kycFiles[item] ? <FileCheck2 className="h-5 w-5 text-success" /> : <Upload className="h-5 w-5 text-muted-foreground" />}
                        <div>
                          <div className="text-sm font-medium text-navy">{item}</div>
                          {kycFiles[item] && <div className="text-xs text-success">{kycFiles[item]}</div>}
                        </div>
                      </div>
                      <label className="cursor-pointer text-sm font-medium text-primary hover:underline">
                        {kycFiles[item] ? "Replace" : "Choose file"}
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => {
                          const f = e.target.files?.[0]; if (f) setKycFiles(prev => ({ ...prev, [item]: f.name }));
                        }} />
                      </label>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">🔒 Your documents are handled confidentially and used only for compliance.</p>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold">Review your order</h2>
                <div className="mt-4 grid gap-4">
                  <Row label="Office" value={`${office.name}, ${office.city}`} />
                  <Row label="Plan" value={SERVICE_LABEL[plan]} />
                  <Row label="Duration" value={duration === "1y" ? "1 year" : "2 years"} />
                  <Row label="Customer" value={`${customer.name} · ${customer.email}`} />
                  <Row label="Business" value={`${customer.businessName} (${customer.businessType})`} />
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="text-xl font-bold">Payment</h2>
                <p className="mt-1 text-sm text-muted-foreground">Demo payment — no real transaction is processed.</p>
                <RadioGroup value={payMethod} onValueChange={setPayMethod} className="mt-4 grid gap-2">
                  {[
                    ["upi", "UPI", Smartphone],
                    ["card", "Credit / Debit Card", CreditCard],
                    ["netbank", "Net Banking", Building2],
                  ].map(([v, l, I]: any) => (
                    <label key={v} className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 ${payMethod === v ? "border-primary bg-primary/5" : ""}`}>
                      <RadioGroupItem value={v} />
                      <I className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{l}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)}><ArrowLeft className="mr-1 h-4 w-4" /> Back</Button>
              ) : <span />}

              {step < 5 ? (
                <Button className="bg-primary" onClick={() => {
                  if (step === 2) {
                    const parsed = custSchema.safeParse(customer);
                    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
                  }
                  setStep(step + 1);
                }}>
                  Continue <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button className="bg-orange text-orange-foreground hover:bg-orange/90" onClick={() => {
                  const booking: Booking = {
                    id: crypto.randomUUID(),
                    reference: makeBookingRef(),
                    officeId: office.id,
                    officeName: `${office.name}, ${office.city}`,
                    plan: SERVICE_LABEL[plan],
                    duration: duration === "1y" ? "1 year" : "2 years",
                    customer,
                    total,
                    status: "payment-confirmed",
                    createdAt: new Date().toISOString(),
                  };
                  bookingsStore.add(booking);
                  toast.success("Payment simulated — booking confirmed!");
                  setConfirmed(booking);
                }}>
                  Pay {inr(total)}
                </Button>
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="card-soft p-6">
              <div className="text-sm font-semibold text-navy">{office.name}</div>
              <div className="text-xs text-muted-foreground">{office.area}, {office.city}</div>
              <div className="mt-4 space-y-2 text-sm">
                <Row label="Plan" value={SERVICE_LABEL[plan]} />
                <Row label="Duration" value={duration === "1y" ? "1 year" : "2 years"} />
              </div>
              <div className="mt-4 border-t pt-4 space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Taxes (18%)</span><span>{inr(tax)}</span></div>
                <div className="flex justify-between text-lg font-extrabold text-navy pt-1"><span>Total</span><span>{inr(total)}</span></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Fld({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return <div className={`grid gap-1.5 ${className}`}><Label className="text-xs font-medium text-navy/70">{label}</Label>{children}</div>;
}
function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-2 text-sm"><span className="text-muted-foreground">{label}</span><span className="font-medium text-navy text-right">{value}</span></div>;
}

function SuccessPage({ booking, onNew }: { booking: Booking; onNew: () => void }) {
  return (
    <div className="bg-surface">
      <div className="container-x max-w-2xl py-16">
        <div className="card-soft p-8 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/10 text-success"><Check className="h-8 w-8" /></div>
          <h1 className="mt-4 text-2xl font-extrabold">Booking Confirmed</h1>
          <p className="mt-1 text-muted-foreground">Your booking reference</p>
          <div className="mt-2 text-3xl font-extrabold text-primary">{booking.reference}</div>
          <div className="mt-6 rounded-lg bg-surface p-4 text-left text-sm">
            <Row label="Office" value={booking.officeName} />
            <Row label="Plan" value={booking.plan} />
            <Row label="Duration" value={booking.duration} />
            <Row label="Total" value={inr(booking.total)} />
            <Row label="Status" value="Payment confirmed" />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="outline" onClick={() => window.print()}><Printer className="mr-1 h-4 w-4" /> Print summary</Button>
            <Button asChild className="bg-primary"><Link to="/booking-status">Track booking</Link></Button>
            <Button variant="ghost" onClick={onNew}>Back to home</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
