import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  FileCheck2,
  Mail,
  Receipt,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Annotation } from "@/components/Annotation";
import { Section } from "./Section";

type ServiceRoute =
  | "/services/business-registration"
  | "/services/gst-registration"
  | "/services/mailing-address"
  | "/services/ecommerce-apob-vpob"
  | "/virtual-offices";

type ServiceCard = {
  title: string;
  body: string;
  icon: LucideIcon;
  tile: string;
  to: ServiceRoute;
};

const SERVICE_CARDS: ServiceCard[] = [
  {
    title: "Virtual Office Address",
    body: "Get a prestigious business address in prime locations.",
    icon: Building2,
    tile: "bg-primary-50 text-primary",
    to: "/services/business-registration",
  },
  {
    title: "GST Registration",
    body: "Hassle-free GST registration with our expert support.",
    icon: Receipt,
    tile: "bg-orange-50 text-orange",
    to: "/services/gst-registration",
  },
  {
    title: "Company Registration",
    body: "End-to-end company incorporation support.",
    icon: FileCheck2,
    tile: "bg-violet-50 text-violet",
    to: "/services/business-registration",
  },
  {
    title: "Mail & Courier Handling",
    body: "Receive and forward your important documents.",
    icon: Mail,
    tile: "bg-success-50 text-success",
    to: "/services/mailing-address",
  },
  {
    title: "APOB / VPOB Services",
    body: "Additional place of business support for GST.",
    icon: ShoppingBag,
    tile: "bg-primary-50 text-primary",
    to: "/services/ecommerce-apob-vpob",
  },
  {
    title: "Meeting Room Access",
    body: "Access professional meeting rooms when you need them.",
    icon: Users,
    tile: "bg-violet-50 text-violet",
    to: "/virtual-offices",
  },
];

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="Our Services"
      title={
        <>
          Complete Business <span className="text-primary">Solutions</span>, Made Quick and Easy with
          Office Mate
        </>
      }
      sub="Everything you need to establish and grow your business in India."
      muted
      alignTop
      headerExtra={
        <div className="relative mt-10 hidden w-[24rem] lg:block">
          <Annotation
            text="All Essential Services Under One Roof"
            className="absolute -top-14 right-0"
            rotate={4}
          />
          <div className="overflow-hidden rounded-3xl shadow-elevated">
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&auto=format&fit=crop&q=60"
              alt="Open-plan office with desks, chairs and glass partitions"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </div>
      }
    >
      <div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CARDS.map(({ title, body, icon: Icon, tile, to }) => (
            <Link
              key={title}
              to={to}
              className="card-soft card-soft-hover flex min-h-[150px] flex-col p-6"
            >
              <span className={`grid h-11 w-11 place-items-center rounded-lg ${tile}`}>
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-navy">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              <span className="mt-auto flex items-center gap-1 pt-3 text-sm font-medium text-primary">
                Learn more{" "}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
