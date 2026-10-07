import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICE_LABEL, inr, type ServiceType } from "@/lib/mock-data";
import { officeQueryOptions } from "@/lib/queries/offices";
import { useCreateBooking } from "@/lib/queries/bookings";
import type { Booking } from "@/lib/storage";
import { customerSchema, type CustomerInfo } from "@/components/booking/schema";
import { Row } from "@/components/booking/shared";
import { PlanStep } from "@/components/booking/PlanStep";
import { DetailsStep } from "@/components/booking/DetailsStep";
import { KycStep } from "@/components/booking/KycStep";
import { ReviewStep } from "@/components/booking/ReviewStep";
import { PaymentStep } from "@/components/booking/PaymentStep";
import { SuccessPage } from "@/components/booking/SuccessPage";
import { seoHead } from "@/lib/seo";

const bookingSearchSchema = z.object({
  plan: z.string().optional(),
  duration: z.enum(["1y", "2y"]).optional(),
});

export const Route = createFileRoute("/booking/$officeId")({
  validateSearch: bookingSearchSchema,
  loader: async ({ params, context }) => {
    const office = await context.queryClient.ensureQueryData(officeQueryOptions(params.officeId));
    if (!office) throw notFound();
    return { office };
  },
  head: ({ params }) =>
    seoHead({ title: "Book Your Virtual Office — OfficeMate", description: "Complete your OfficeMate virtual office booking.", path: `/booking/${params.officeId}`, noindex: true }),
  component: BookingFlow,
});

const STEPS = ["Plan", "Details", "KYC", "Review", "Payment"];

const EMPTY_CUSTOMER: CustomerInfo = { name: "", email: "", phone: "", businessName: "", businessType: "", gstStatus: "", address: "" };

function BookingFlow() {
  const { office } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const createBooking = useCreateBooking();

  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<ServiceType>(
    () => (search.plan && office.services.includes(search.plan as ServiceType) ? (search.plan as ServiceType) : office.services[0]),
  );
  const [duration, setDuration] = useState<"1y" | "2y">(search.duration ?? "1y");
  const [customer, setCustomer] = useState<CustomerInfo>(EMPTY_CUSTOMER);
  const [kycFiles, setKycFiles] = useState<Record<string, string>>({});
  const [payMethod, setPayMethod] = useState("upi");
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  const basePrice = office.pricing[plan] ?? 999;
  const subtotal = duration === "1y" ? basePrice : Math.round(basePrice * 1.8);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  if (confirmed) return <SuccessPage booking={confirmed} onNew={() => navigate({ to: "/" })} />;

  return (
    <div className="bg-surface">
      <div className="container-x py-8">
        <Link to="/virtual-offices/$id" params={{ id: office.id }} className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to office
        </Link>

        <div className="mb-8 flex flex-wrap items-center gap-3">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${i + 1 <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {i + 1 <= step - 1 ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={`text-xs ${i + 1 === step ? "font-semibold text-navy" : "text-muted-foreground"}`}>{s}</span>
              {i < STEPS.length - 1 && <div className="hidden h-px w-8 bg-border sm:block" />}
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="card-soft p-6">
            {step === 1 && <PlanStep office={office} plan={plan} onPlanChange={setPlan} duration={duration} onDurationChange={setDuration} />}
            {step === 2 && <DetailsStep customer={customer} onChange={(patch) => setCustomer(prev => ({ ...prev, ...patch }))} />}
            {step === 3 && (
              <KycStep
                businessType={customer.businessType}
                kycFiles={kycFiles}
                onFileChosen={(item, fileName) => setKycFiles(prev => ({ ...prev, [item]: fileName }))}
              />
            )}
            {step === 4 && <ReviewStep office={office} plan={plan} duration={duration} customer={customer} />}
            {step === 5 && <PaymentStep payMethod={payMethod} onChange={setPayMethod} />}

            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <Button variant="outline" onClick={() => setStep(step - 1)}><ArrowLeft className="mr-1 h-4 w-4" /> Back</Button>
              ) : <span />}

              {step < 5 ? (
                <Button className="bg-primary" onClick={() => {
                  if (step === 2) {
                    const parsed = customerSchema.safeParse(customer);
                    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
                  }
                  setStep(step + 1);
                }}>
                  Continue <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  className="bg-orange text-orange-foreground hover:bg-orange/90"
                  disabled={createBooking.isPending}
                  onClick={() => {
                    createBooking.mutate(
                      {
                        officeId: office.id,
                        officeName: `${office.name}, ${office.city}`,
                        plan: SERVICE_LABEL[plan],
                        duration: duration === "1y" ? "1 year" : "2 years",
                        customer,
                        total,
                      },
                      {
                        onSuccess: (booking) => {
                          toast.success("Payment simulated — booking confirmed!");
                          setConfirmed(booking);
                        },
                        onError: () => toast.error("Something went wrong confirming your booking."),
                      },
                    );
                  }}
                >
                  {createBooking.isPending ? "Processing…" : `Pay ${inr(total)}`}
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
