import type { ReactNode } from "react";

export type LegalSection = { heading: string; paragraphs?: ReactNode[]; bullets?: ReactNode[] };

// Shared layout for long-form policy pages (privacy policy, terms & conditions).
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <div className="bg-background">
      <div className="container-x py-12">
        <h1 className="text-4xl font-extrabold">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {updated}</p>
        <p className="mt-6 text-navy/90">{intro}</p>
        <div className="mt-8 space-y-8">
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="text-xl font-bold text-navy">
                {i + 1}. {s.heading}
              </h2>
              {s.paragraphs?.map((p, j) => (
                <p key={j} className="mt-3 text-navy/90">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-3 list-disc space-y-1.5 pl-6 text-navy/90">
                  {s.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
