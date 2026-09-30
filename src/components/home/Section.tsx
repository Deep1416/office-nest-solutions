import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export function Section({
  id,
  eyebrow,
  title,
  sub,
  muted,
  headerExtra,
  alignTop,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
  muted?: boolean;
  headerExtra?: ReactNode;
  alignTop?: boolean;
  children: ReactNode;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`section-y ${muted ? "bg-surface" : ""}`}
    >
      <div className="container-x relative">
        <div
          className={`mb-10 flex flex-wrap justify-between gap-6 ${alignTop ? "items-start" : "items-end"}`}
        >
          <div className="max-w-2xl">
            {eyebrow && (
              <Badge
                variant="secondary"
                className="mb-3.5 rounded-full bg-primary-50 text-[12px] font-semibold uppercase tracking-[0.12em] text-primary hover:bg-primary-50"
              >
                <span
                  className="mr-1.5 inline-block h-2 w-2 rounded-full bg-orange"
                  aria-hidden="true"
                />
                {eyebrow}
              </Badge>
            )}
            <h2 id={headingId} className="text-[30px] font-extrabold leading-[1.1] lg:text-[44px]">
              {title}
            </h2>
            {sub && (
              <p className="mt-4 max-w-xl text-[15px] text-foreground sm:text-[17px]">{sub}</p>
            )}
          </div>
          {headerExtra}
        </div>
        {children}
      </div>
    </section>
  );
}
