import type { ReactNode } from "react";

const BRAND = "OfficeMate";

const List = ({ items }: { items: string[] }) => (
  <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">
    {items.map(i => <li key={i}>{i}</li>)}
  </ul>
);

const H3 = ({ children }: { children: ReactNode }) => <h3 className="mt-8 text-xl font-bold text-navy">{children}</h3>;
const P = ({ children }: { children: ReactNode }) => <p className="mt-3 leading-relaxed text-muted-foreground">{children}</p>;

export function CityContent({ city, state }: { city: string; state: string }) {
  const faqs = [
    [`Is a virtual office in ${city} valid for GST registration?`, `Yes. ${BRAND} provides all the documents required for GST registration in ${state}.`],
    ["Can I use this address for Private Limited company registration?", "Yes. You can use our address for company registration once the required documents are submitted."],
    ["Do I get access to a physical workspace?", "Yes, meeting rooms and workspace are available depending on the plan you choose."],
    ["Is this valid for branch office registration?", `Yes. Many companies register their ${city} branch using a virtual office.`],
  ];

  return (
    <section className="py-8 lg:py-12">
      <div className="container-x">
        <h2 className="text-3xl font-extrabold">Virtual Office in {city} – GST Registration & Business Address | {BRAND}</h2>
        <H3>Affordable & GST-Approved Virtual Office in {city}</H3>
        <P>Searching for a virtual office in {city} to register your business or GST in {state}? {BRAND} offers a GST-approved commercial business address in {city} to help you establish your presence in the region without leasing a physical office space.</P>
        <P>{city} is one of the fast-growing commercial destinations in {state}. As a startup, MSME, consultant, or growing business, a virtual office helps you enter this market quickly and affordably.</P>

        <hr className="my-10 border-border" />

        <h2 className="text-2xl font-bold">Why Choose {BRAND} for a Virtual Office in {city}?</h2>
        <P>We offer a comprehensive, compliance-ready solution — not just an address.</P>

        <H3>1. Valid GST & Company Registration Address</H3>
        <P>Our {city} business address can be used for:</P>
        <List items={[`GST Registration in ${state}`, "Private Limited Company Registration", "LLP & OPC Registration", "ROC Filings & Compliance", "Branch Office Registration"]} />
        <P>We provide all the documents required for government approval.</P>

        <H3>2. Complete Documentation Support</H3>
        <P>For hassle-free GST or company registration, we offer:</P>
        <List items={["Rent Agreement", "No Objection Certificate (NOC)", "Utility Bill", "Address Proof Documents"]} />
        <P>Our documentation is prepared to help avoid rejections.</P>

        <H3>3. Professional Mail Handling Services</H3>
        <P>Handle official communication securely with mail receiving and forwarding, so you never miss a critical notice.</P>

        <H3>4. Meeting Rooms & On-Demand Workspace Access</H3>
        <P>Need a physical space for client meetings or compliance verification? Get access to meeting rooms and coworking spaces in {city} whenever needed.</P>

        <H3>5. Cost-Effective Alternative to Traditional Office Space</H3>
        <P>Avoid:</P>
        <List items={["Lease agreement terms", "Rental deposits", "Maintenance costs", "Utility charges"]} />
        <P>A virtual office minimises operating expenses while keeping a professional business setup.</P>

        <h2 className="mt-12 text-2xl font-bold">Who Should Opt for a Virtual Office in {city}?</h2>
        <List items={[`Startups incorporating in ${state}`, "E-commerce businesses requiring GST registration", `IT and consulting companies expanding in ${city}`, "Businesses opening a new branch", "Freelancers and remote-work companies", "MSMEs requiring a professional registered office"]} />

        <h2 className="mt-12 text-2xl font-bold">Advantages of Establishing in {city}</h2>
        <List items={["Growing startup and business ecosystem", "Well-developed commercial infrastructure", "Strong connectivity and talent pool", "Business-friendly environment", `Strategic location in ${state}`]} />
        <P>Opening an office here enhances your credibility with clients, banks, and government departments.</P>

        <h2 className="mt-12 text-2xl font-bold">Easy Process to Get Your Virtual Office in {city}</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-6 text-muted-foreground">
          <li>Choose the right virtual office package.</li>
          <li>Provide the necessary KYC documents.</li>
          <li>Receive your valid address documents.</li>
          <li>Use your {city} address for GST or company registration.</li>
        </ol>
        <P>Our experts assist you throughout the process.</P>

        <h2 className="mt-12 text-2xl font-bold">Why Businesses Trust {BRAND}</h2>
        <List items={["Transparent pricing", "Quick documentation turnaround", "GST-ready address solutions", "Professional support team", "Compliance-focused service model"]} />

        <h2 className="mt-12 text-2xl font-bold">Frequently Asked Questions</h2>
        {faqs.map(([q, a]) => (
          <div key={q}>
            <H3>{q}</H3>
            <P>{a}</P>
          </div>
        ))}

        <h2 className="mt-12 text-2xl font-bold">Get Started with {BRAND} – Virtual Office in {city}</h2>
        <P>Create your business presence in {city} without heavy infrastructure expenses. Whether you need it for GST registration, company formation, or entering the {state} market, {BRAND} offers a safe and legal virtual office solution. Get in touch today and start your professional business address in {city}.</P>
      </div>
    </section>
  );
}
