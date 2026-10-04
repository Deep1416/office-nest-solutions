import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Check,
  FileText,
  Mail,
  Receipt,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuoteForm } from "@/components/QuoteForm";
import { IMAGES, SERVICES, SERVICE_CONTENT } from "@/lib/mock-data";

const ICONS: Record<string, LucideIcon> = {
  Building2,
  FileText,
  Mail,
  Receipt,
  ShoppingBag,
  Users,
};

type ServiceRoute =
  | "/services/business-registration"
  | "/services/gst-registration"
  | "/services/mailing-address"
  | "/services/ecommerce-apob-vpob"
  | "/virtual-offices";

const SERVICE_ROUTES: Record<string, ServiceRoute> = {
  "virtual-office": "/virtual-offices",
  "business-registration": "/services/business-registration",
  "gst-registration": "/services/gst-registration",
  "mailing-address": "/services/mailing-address",
  "ecommerce-apob-vpob": "/services/ecommerce-apob-vpob",
  "meeting-room-access": "/virtual-offices",
};

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Our Services — OfficeMate" },
      {
        name: "description",
        content:
          "Virtual office, business registration, GST registration, mailing address, ecommerce APoB/VPoB and meeting rooms — all in one place.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-surface to-background">
        <div className="container-x py-14 lg:py-20">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Our Services
          </div>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            Everything your business needs, in one place
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            From a prime business address to GST and company registration — explore every OfficeMate
            service below.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium text-navy transition-colors hover:border-primary hover:text-primary"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {SERVICES.map((s, i) => {
        const Icon = ICONS[s.icon] ?? Building2;
        const image = SERVICE_CONTENT[s.slug]?.image ?? IMAGES[i % IMAGES.length];
        return (
          <section
            key={s.slug}
            id={s.slug}
            className={`section-y scroll-mt-20 ${i % 2 === 1 ? "bg-surface" : ""}`}
          >
            <div className="container-x grid items-center gap-10 lg:grid-cols-2">
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-50 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-3xl font-extrabold">{s.title}</h2>
                <p className="mt-3 text-muted-foreground">
                  {SERVICE_CONTENT[s.slug]?.hero ?? s.short}
                </p>
                <ul className="mt-5 space-y-2">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-navy">
                      <Check className="h-4 w-4 text-success" /> {b}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 bg-primary">
                  <Link to={SERVICE_ROUTES[s.slug]}>
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <img
                src={image}
                alt={s.title}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-elevated"
              />
            </div>
          </section>
        );
      })}

      <section id="quote" className="section-y bg-gradient-to-br from-primary to-navy text-white">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="!text-white text-3xl font-extrabold">
              Not sure which service you need?
            </h2>
            <p className="mt-3 text-white/80">
              Tell us about your business and our team will recommend the right plan.
            </p>
          </div>
          <div className="card-soft bg-white p-6 text-foreground">
            <QuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}
