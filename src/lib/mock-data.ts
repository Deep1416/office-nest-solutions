// DEMO DATA — realistic-looking sample content for the OfficeNest demo. Not real listings.

export type ServiceType = "business-registration" | "gst-registration" | "mailing-address";

export const SERVICE_LABEL: Record<ServiceType, string> = {
  "business-registration": "Business Registration",
  "gst-registration": "GST Registration",
  "mailing-address": "Mailing Address",
};

export interface City {
  slug: string;
  name: string;
  state: string;
  stateSlug: string;
  startingPrice: number;
  officeCount: number;
  image: string;
  areas: string[];
}

export const CITIES: City[] = [
  { slug: "delhi", name: "Delhi", state: "Delhi", stateSlug: "delhi", startingPrice: 999, officeCount: 24, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop&q=60", areas: ["Connaught Place", "Nehru Place", "Saket", "Karol Bagh"] },
  { slug: "bengaluru", name: "Bengaluru", state: "Karnataka", stateSlug: "karnataka", startingPrice: 1099, officeCount: 32, image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&auto=format&fit=crop&q=60", areas: ["Koramangala", "Indiranagar", "Whitefield", "HSR Layout"] },
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra", stateSlug: "maharashtra", startingPrice: 1299, officeCount: 28, image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&auto=format&fit=crop&q=60", areas: ["Andheri", "Bandra", "Powai", "Lower Parel"] },
  { slug: "noida", name: "Noida", state: "Uttar Pradesh", stateSlug: "uttar-pradesh", startingPrice: 899, officeCount: 18, image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&auto=format&fit=crop&q=60", areas: ["Sector 62", "Sector 18", "Sector 132"] },
  { slug: "gurugram", name: "Gurugram", state: "Haryana", stateSlug: "haryana", startingPrice: 999, officeCount: 22, image: "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=800&auto=format&fit=crop&q=60", areas: ["Cyber City", "Golf Course Road", "Sohna Road"] },
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana", stateSlug: "telangana", startingPrice: 899, officeCount: 20, image: "https://images.unsplash.com/photo-1626196340104-fe487d383e1a?w=800&auto=format&fit=crop&q=60", areas: ["HITEC City", "Gachibowli", "Banjara Hills"] },
  { slug: "pune", name: "Pune", state: "Maharashtra", stateSlug: "maharashtra", startingPrice: 899, officeCount: 16, image: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&auto=format&fit=crop&q=60", areas: ["Baner", "Hinjewadi", "Kharadi"] },
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu", stateSlug: "tamil-nadu", startingPrice: 899, officeCount: 14, image: "https://images.unsplash.com/photo-1621996659490-3275b4d0d951?w=800&auto=format&fit=crop&q=60", areas: ["OMR", "T. Nagar", "Guindy"] },
  { slug: "kolkata", name: "Kolkata", state: "West Bengal", stateSlug: "west-bengal", startingPrice: 799, officeCount: 10, image: "https://images.unsplash.com/photo-1558431382-27e303142255?w=800&auto=format&fit=crop&q=60", areas: ["Salt Lake", "Park Street", "New Town"] },
  { slug: "ahmedabad", name: "Ahmedabad", state: "Gujarat", stateSlug: "gujarat", startingPrice: 799, officeCount: 12, image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&auto=format&fit=crop&q=60", areas: ["SG Highway", "Prahlad Nagar", "Bodakdev"] },
];

export const STATES = Array.from(new Map(CITIES.map(c => [c.stateSlug, { slug: c.stateSlug, name: c.state }])).values());

export const AMENITIES = ["Meeting Room", "Courier Handling", "Reception Support", "Signage", "Parking", "High-Speed Internet"];

export interface OfficeListing {
  id: string;
  name: string;
  area: string;
  citySlug: string;
  city: string;
  state: string;
  stateSlug: string;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  services: ServiceType[];
  pricing: Partial<Record<ServiceType, number>>;
  amenities: string[];
  description: string;
  landmarks: string[];
}

const IMAGES = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1000&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1000&auto=format&fit=crop&q=60",
];

function makeOffice(i: number, city: City, name: string, area: string): OfficeListing {
  const services: ServiceType[] = ["business-registration", "gst-registration", "mailing-address"];
  const base = city.startingPrice;
  return {
    id: `ON-${city.slug.toUpperCase()}-${String(i).padStart(3, "0")}`,
    name,
    area,
    citySlug: city.slug,
    city: city.name,
    state: city.state,
    stateSlug: city.stateSlug,
    rating: 4.3 + ((i * 7) % 6) / 10,
    reviews: 40 + ((i * 13) % 200),
    image: IMAGES[i % IMAGES.length],
    gallery: [IMAGES[i % IMAGES.length], IMAGES[(i + 1) % IMAGES.length], IMAGES[(i + 2) % IMAGES.length]],
    services,
    pricing: {
      "mailing-address": base,
      "gst-registration": base + 800,
      "business-registration": base + 1500,
    },
    amenities: AMENITIES.slice(0, 3 + (i % 4)),
    description: `A premium ${city.name} workspace located in ${area}. Fully compliant address for GST, business registration and professional mailing needs. Backed by dedicated reception and courier management for a seamless experience.`,
    landmarks: ["Metro station 5 min", "Major banks nearby", "Restaurants & cafes"],
  };
}

export const OFFICES: OfficeListing[] = (() => {
  const list: OfficeListing[] = [];
  const names = ["NestHub", "PrimeSuite", "MetroWorks", "OrbitOffice", "Signature Space", "PinnacleHub"];
  let counter = 1;
  CITIES.forEach(city => {
    city.areas.slice(0, 2).forEach((area, idx) => {
      list.push(makeOffice(counter++, city, `${names[counter % names.length]} ${city.name}`, area));
      if (idx === 0 && list.length < 22) {
        list.push(makeOffice(counter++, city, `${names[(counter + 2) % names.length]} ${area}`, area));
      }
    });
  });
  return list;
})();

export const SERVICES = [
  { slug: "virtual-office", title: "Virtual Office", icon: "Building2", short: "A complete business address with mail handling & compliance.", benefits: ["Prestigious address", "Mail & courier", "Meeting room access"] },
  { slug: "business-registration", title: "Business Registration", icon: "FileText", short: "Register your company at a verified professional address.", benefits: ["MCA-compliant", "Fast turnaround", "End-to-end support"] },
  { slug: "gst-registration", title: "GST Registration", icon: "Receipt", short: "GST-ready address in any state — expand pan-India easily.", benefits: ["Multi-state expansion", "APOB/VPOB ready", "Full documentation"] },
  { slug: "mailing-address", title: "Mailing Address", icon: "Mail", short: "Professional address for correspondence, banking & clients.", benefits: ["Courier handling", "Scan & forward", "Reception support"] },
  { slug: "ecommerce-apob-vpob", title: "Ecommerce APoB/VPoB", icon: "ShoppingBag", short: "Additional/Virtual Place of Business for online sellers.", benefits: ["Amazon/Flipkart ready", "Multi-state GST", "Signage support"] },
  { slug: "meeting-room-access", title: "Meeting Room Access", icon: "Users", short: "On-demand meeting rooms across our network.", benefits: ["Pay-per-use", "Video-conferencing", "Pan-India access"] },
];

export const TESTIMONIALS = [
  { name: "Ananya Rao", company: "Kite Analytics", initials: "AR", rating: 5, feedback: "OfficeNest set up our GST address in three cities in under a week. Documentation was flawless." },
  { name: "Rohit Menon", company: "Foldcart Retail", initials: "RM", rating: 5, feedback: "Perfect for our ecommerce APOB needs. Their team walked us through every step of Amazon onboarding." },
  { name: "Priya Shankar", company: "LumenLabs", initials: "PS", rating: 5, feedback: "Registered our private limited company at their Bengaluru address — smooth and professional." },
  { name: "Vikram Singh", company: "Bluewave Consulting", initials: "VS", rating: 5, feedback: "The dedicated account manager made everything easy. Courier handling has been reliable for months." },
  { name: "Neha Kulkarni", company: "Craftly", initials: "NK", rating: 5, feedback: "Transparent pricing, no hidden fees. Highly recommended for early-stage founders." },
  { name: "Arjun Iyer", company: "Northlane Tech", initials: "AI", rating: 5, feedback: "We expanded into 5 states without opening a single physical office. Game-changing for our SaaS." },
];

export const FAQS = [
  { q: "What is a virtual office?", a: "A virtual office gives you a legitimate business address without leasing physical space — usable for GST, company registration, banking and client correspondence." },
  { q: "Can the address be used for GST registration?", a: "Yes. Our addresses come with the full documentation kit — NOC, rent agreement, utility bill — accepted by GST officers across states." },
  { q: "Can it be used for company registration?", a: "Absolutely. Our addresses are MCA-compliant for Private Limited, LLP, OPC and Partnership registrations." },
  { q: "What documents are provided?", a: "You receive a signed rent/lease agreement, No Objection Certificate (NOC), and a recent utility bill of the premises." },
  { q: "How long does activation take?", a: "Typical activation is 2–4 working days after KYC verification and payment." },
  { q: "How are couriers handled?", a: "Our reception receives and logs your couriers. You get notified and can choose scan-and-forward or physical dispatch." },
  { q: "Are meeting rooms available?", a: "Yes — book meeting rooms across our network on a pay-per-use basis, with video conferencing available." },
  { q: "Can I expand into multiple states?", a: "Yes, that's one of our most popular use cases. Register for GST in each state using our verified addresses." },
];

export const BLOGS = [
  { slug: "why-virtual-office-matters", title: "Why a Virtual Office Matters for Modern Indian Startups", excerpt: "How virtual offices are reshaping the way startups establish presence across India.", category: "Virtual Office", date: "2026-05-12", read: "6 min", image: IMAGES[0] },
  { slug: "gst-registration-guide-2026", title: "The 2026 Guide to Multi-State GST Registration", excerpt: "Everything you need to register for GST in every state you sell in.", category: "GST", date: "2026-04-28", read: "8 min", image: IMAGES[1] },
  { slug: "register-pvt-ltd-fast", title: "How to Register a Pvt Ltd Company in Under 10 Days", excerpt: "Documents, steps and pitfalls when registering your company.", category: "Registration", date: "2026-04-10", read: "7 min", image: IMAGES[2] },
  { slug: "apob-for-ecommerce-sellers", title: "APOB & VPOB Explained for Amazon and Flipkart Sellers", excerpt: "The compliance framework every ecommerce seller must understand.", category: "Ecommerce", date: "2026-03-22", read: "9 min", image: IMAGES[3] },
  { slug: "professional-mailing-address", title: "Choosing a Professional Mailing Address in 2026", excerpt: "Why home addresses hurt credibility and how to fix it.", category: "Mailing", date: "2026-03-01", read: "5 min", image: IMAGES[4] },
  { slug: "expand-business-other-states", title: "Expanding Your Business into New Indian States", excerpt: "A practical playbook for pan-India expansion without physical offices.", category: "Expansion", date: "2026-02-14", read: "10 min", image: IMAGES[5] },
];

export const PURPOSES = [
  { value: "gst-registration", label: "GST Registration" },
  { value: "business-registration", label: "Business Registration" },
  { value: "mailing-address", label: "Mailing Address" },
  { value: "bank-account", label: "Bank Account Opening" },
  { value: "ecommerce", label: "Ecommerce Registration" },
  { value: "address-transfer", label: "Address Transfer" },
  { value: "guidance", label: "Need Guidance" },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
