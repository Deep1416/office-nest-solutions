// DEMO DATA — realistic-looking sample content for the OfficeMate demo. Not real listings.

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
  { slug: "bengaluru", name: "Bengaluru", state: "Karnataka", stateSlug: "karnataka", startingPrice: 7500, officeCount: 4, image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&auto=format&fit=crop&q=60", areas: ["Ganganagar", "Indiranagar", "Koramangala", "HMT Layout"] },
  { slug: "noida", name: "Noida", state: "Uttar Pradesh", stateSlug: "uttar-pradesh", startingPrice: 7000, officeCount: 1, image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&auto=format&fit=crop&q=60", areas: ["Sector 1, Greater Noida"] },
];

export const STATES = Array.from(new Map(CITIES.map(c => [c.stateSlug, { slug: c.stateSlug, name: c.state }])).values());

export const OFFICE_ADDONS = ["GST registration application", "GST registration with complete support", "Standard Permanent Signage", "Premium Permanent Signage"];

export interface OfficeListing {
  id: string;
  name: string;
  area: string;
  citySlug: string;
  city: string;
  state: string;
  stateSlug: string;
  rating?: number;
  reviews?: number;
  image: string;
  gallery: string[];
  services: ServiceType[];
  pricing: Partial<Record<ServiceType, number>>;
  amenities: string[];
  description: string;
  landmarks: string[];
}

// Generic stock photos for blog/service cards (not property images).
export const IMAGES = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1000&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1000&auto=format&fit=crop&q=60",
];

// Real listings only. Add new properties here (photos go in public/offices/<city>/<property>/).
const SAFALTA_SQUARE: OfficeListing = {
  id: "ON-NOIDA-001",
  name: "Safalta Square",
  area: "Sector 1, Greater Noida",
  citySlug: "noida",
  city: "Noida",
  state: "Uttar Pradesh",
  stateSlug: "uttar-pradesh",
  image: "/offices/noida/safalta/1.jpg",
  gallery: ["/offices/noida/safalta/1.jpg", "/offices/noida/safalta/2.jpg", "/offices/noida/safalta/3.jpg"],
  services: ["business-registration", "gst-registration", "mailing-address"],
  pricing: { "business-registration": 8500, "gst-registration": 8000, "mailing-address": 7000 },
  amenities: ["Reception Support", "Courier Handling", "Signage"],
  description: "Safalta Square is a ready-to-use business address in Sector 1, Greater Noida, behind Ace City. Fully compliant for GST, business registration and professional mailing needs.",
  landmarks: ["Behind Ace City", "Sector 1, Greater Noida (G.B. Nagar)"],
};

const GANGANAGAR_WORKSPACE: OfficeListing = {
  id: "ON-BENGALURU-001",
  name: "Virtual Office",
  area: "Ganganagar",
  citySlug: "bengaluru",
  city: "Bengaluru",
  state: "Karnataka",
  stateSlug: "karnataka",
  image: "/offices/bengaluru/ganganagar/1.jpg",
  gallery: [1, 2, 3, 4].map(n => `/offices/bengaluru/ganganagar/${n}.jpg`),
  services: ["business-registration", "gst-registration", "mailing-address"],
  pricing: { "business-registration": 9000, "gst-registration": 8500, "mailing-address": 8000 },
  amenities: ["Reception Support", "Courier Handling", "Meeting Room"],
  description: "A ready-to-use business address in Ganganagar, Bengaluru. Fully compliant for GST, business registration and professional mailing needs.",
  landmarks: [],
};

const INDIRANAGAR_WORKSPACE: OfficeListing = {
  id: "ON-BENGALURU-002",
  name: "Virtual Office",
  area: "Indiranagar",
  citySlug: "bengaluru",
  city: "Bengaluru",
  state: "Karnataka",
  stateSlug: "karnataka",
  image: "/offices/bengaluru/indiranagar/1.jpg",
  gallery: [1, 2, 3, 4].map(n => `/offices/bengaluru/indiranagar/${n}.jpg`),
  services: ["business-registration", "gst-registration", "mailing-address"],
  pricing: { "business-registration": 9500, "gst-registration": 9500, "mailing-address": 9000 },
  amenities: ["Reception Support", "Courier Handling", "Meeting Room"],
  description: "A ready-to-use business address in Indiranagar, Bengaluru. Fully compliant for GST, business registration and professional mailing needs.",
  landmarks: [],
};

const KORAMANGALA_WORKSPACE: OfficeListing = {
  id: "ON-BENGALURU-003",
  name: "Virtual Office",
  area: "Koramangala",
  citySlug: "bengaluru",
  city: "Bengaluru",
  state: "Karnataka",
  stateSlug: "karnataka",
  image: "/offices/bengaluru/koramangala/1.webp",
  gallery: [1, 2, 3].map(n => `/offices/bengaluru/koramangala/${n}.webp`),
  services: ["business-registration", "gst-registration", "mailing-address"],
  pricing: { "business-registration": 9500, "gst-registration": 9500, "mailing-address": 9000 },
  amenities: ["Reception Support", "Courier Handling", "Meeting Room"],
  description: "A ready-to-use business address in Koramangala, Bengaluru. Fully compliant for GST, business registration and professional mailing needs.",
  landmarks: [],
};

const HMT_LAYOUT_WORKSPACE: OfficeListing = {
  id: "ON-BENGALURU-004",
  name: "Virtual Office",
  area: "HMT Layout",
  citySlug: "bengaluru",
  city: "Bengaluru",
  state: "Karnataka",
  stateSlug: "karnataka",
  image: "/offices/bengaluru/hmt-layout/1.webp",
  gallery: [1, 2, 3].map(n => `/offices/bengaluru/hmt-layout/${n}.webp`),
  services: ["business-registration", "gst-registration", "mailing-address"],
  pricing: { "business-registration": 8500, "gst-registration": 8500, "mailing-address": 7500 },
  amenities: ["Reception Support", "Courier Handling", "Meeting Room"],
  description: "A ready-to-use business address in HMT Layout, Bengaluru. Fully compliant for GST, business registration and professional mailing needs.",
  landmarks: [],
};

const REAL_OFFICES: OfficeListing[] = [
  SAFALTA_SQUARE,
  GANGANAGAR_WORKSPACE,
  INDIRANAGAR_WORKSPACE,
  KORAMANGALA_WORKSPACE,
  HMT_LAYOUT_WORKSPACE,
];

export const OFFICES: OfficeListing[] = REAL_OFFICES;

export const SERVICES = [
  { slug: "virtual-office", title: "Virtual Office", icon: "Building2", short: "A complete business address with mail handling & compliance.", benefits: ["Prestigious address", "Mail & courier", "Meeting room access"] },
  { slug: "business-registration", title: "Business Registration", icon: "FileText", short: "Register your company at a verified professional address.", benefits: ["MCA-compliant", "Fast turnaround", "End-to-end support"] },
  { slug: "gst-registration", title: "GST Registration", icon: "Receipt", short: "GST-ready address in any state — expand pan-India easily.", benefits: ["Multi-state expansion", "APOB/VPOB ready", "Full documentation"] },
  { slug: "mailing-address", title: "Mailing Address", icon: "Mail", short: "Professional address for correspondence, banking & clients.", benefits: ["Courier handling", "Scan & forward", "Reception support"] },
  { slug: "ecommerce-apob-vpob", title: "Ecommerce APoB/VPoB", icon: "ShoppingBag", short: "Additional/Virtual Place of Business for online sellers.", benefits: ["Amazon/Flipkart ready", "Multi-state GST", "Signage support"] },
  { slug: "meeting-room-access", title: "Meeting Room Access", icon: "Users", short: "On-demand meeting rooms across our network.", benefits: ["Pay-per-use", "Video-conferencing", "Pan-India access"] },
];

export interface ServiceContent {
  title: string;
  tagline: string;
  hero: string;
  image: string;
  whoNeeds: string[];
  documents: string[];
  benefits: { title: string; body: string; icon: string }[];
  process: { step: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  "business-registration": {
    title: "Business Registration Made Simple",
    tagline: "MCA-compliant address for company registration",
    hero: "Register your Private Limited, LLP, or OPC at a verified professional address — with all documentation handled by our experts.",
    image: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=1000&auto=format&fit=crop&q=60",
    whoNeeds: [
      "Founders launching a new company",
      "Bootstrapped teams without a physical office",
      "Consultants operating from home",
      "Businesses expanding to new states",
    ],
    documents: ["PAN card of directors", "Aadhaar / passport", "Passport-size photograph", "Utility bill (recent)", "Board resolution (if applicable)", "Cancelled cheque"],
    benefits: [
      { title: "MCA-compliant", body: "Every address passes MCA scrutiny. No rejections.", icon: "Shield" },
      { title: "Fast turnaround", body: "Documents delivered in 24–72 hours.", icon: "Zap" },
      { title: "Dedicated support", body: "One account manager, end-to-end.", icon: "Users" },
      { title: "Complete kit", body: "Rent agreement, NOC and utility bill included.", icon: "FileText" },
    ],
    process: [
      { step: "Choose city", body: "Pick your business city from our network." },
      { step: "Submit KYC", body: "Simple document checklist online." },
      { step: "Verification", body: "Our compliance team validates everything." },
      { step: "Get documents", body: "Receive signed docs and start filing." },
    ],
    faqs: [
      { q: "Can I register a Pvt Ltd here?", a: "Yes, all our addresses are MCA-compliant for Pvt Ltd, LLP, OPC and Partnerships." },
      { q: "Do I need to visit the office?", a: "No visit needed. Everything is handled online with couriered originals." },
      { q: "How long does the process take?", a: "Documents are typically delivered in 2–4 working days." },
    ],
  },
  "gst-registration": {
    title: "GST Registration Across India",
    tagline: "Multi-state GST addresses",
    hero: "Register for GST in any state with an OfficeMate address. Perfect for sellers, SaaS companies, and consultants expanding pan-India.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1000&auto=format&fit=crop&q=60",
    whoNeeds: ["Ecommerce sellers on Amazon / Flipkart", "SaaS and service businesses billing across states", "Manufacturers with warehouses in new states", "Startups scaling nationally"],
    documents: ["PAN card of business", "PAN + Aadhaar of authorised signatory", "Constitution documents", "Bank statement / cancelled cheque", "Photograph"],
    benefits: [
      { title: "GST officer approved", body: "Full documentation kit accepted across states.", icon: "Shield" },
      { title: "Multi-state ready", body: "Register in 10 states from one dashboard.", icon: "MapPin" },
      { title: "Fast setup", body: "Address activation in 24–48 hours.", icon: "Zap" },
      { title: "Ongoing support", body: "GSTIN help, address transfer, renewals.", icon: "Receipt" },
    ],
    process: [
      { step: "Pick state", body: "Choose the state where you need GST." },
      { step: "Submit details", body: "Basic business + KYC info." },
      { step: "Get docs", body: "Rent agreement, NOC, utility bill." },
      { step: "File GST", body: "Use the docs to file GST — we help." },
    ],
    faqs: [
      { q: "Is the address usable for GST?", a: "Yes, every OfficeMate address is verified and GST-officer accepted." },
      { q: "Can I get APOB for Amazon?", a: "Yes, we specialize in APOB/VPOB for online sellers." },
      { q: "What if my GST gets rejected?", a: "We assist with re-submission and offer refund per our terms." },
    ],
  },
  "mailing-address": {
    title: "A Professional Mailing Address",
    tagline: "Ditch the home address",
    hero: "Get a credible business address for banking, client mail and correspondence — with courier and reception support included.",
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=1000&auto=format&fit=crop&q=60",
    whoNeeds: ["Freelancers and consultants", "Remote-first startups", "Overseas founders operating in India", "Anyone protecting their home address"],
    documents: ["PAN card", "Aadhaar / passport", "Business proof (if company)"],
    benefits: [
      { title: "Prestigious address", body: "Look established from day one.", icon: "Building2" },
      { title: "Courier handling", body: "We receive, log and forward.", icon: "Package" },
      { title: "Reception support", body: "Real humans greet your mail.", icon: "Mail" },
      { title: "Privacy", body: "Keep your home address private.", icon: "Shield" },
    ],
    process: [
      { step: "Choose location", body: "Pick your preferred city." },
      { step: "Submit KYC", body: "Simple identity verification." },
      { step: "Go live", body: "Address active in 24 hours." },
      { step: "Get mail", body: "Notifications for every courier." },
    ],
    faqs: [
      { q: "Can I use this for banking?", a: "Yes, ideal for opening a current account." },
      { q: "How do I get my mail?", a: "Scan & forward, or physical dispatch." },
      { q: "Any signage on the address?", a: "Signage available on select plans." },
    ],
  },
  "ecommerce-apob-vpob": {
    title: "APoB & VPoB for Online Sellers",
    tagline: "Ecommerce compliance, simplified",
    hero: "Additional and Virtual Place of Business addresses for Amazon, Flipkart, Meesho and Shopify sellers scaling across Indian states.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000&auto=format&fit=crop&q=60",
    whoNeeds: ["Amazon FBA sellers", "Flipkart, Meesho, Myntra sellers", "D2C brands with regional warehouses", "Aggregators expanding across states"],
    documents: ["Business PAN", "Director PAN + Aadhaar", "GST certificate", "Warehouse agreement (if separate)"],
    benefits: [
      { title: "Amazon-ready", body: "APOB templates accepted by all major marketplaces.", icon: "ShoppingBag" },
      { title: "Multi-state GST", body: "Compliant addresses in 20+ states.", icon: "MapPin" },
      { title: "Signage", body: "Physical signage where required.", icon: "Shield" },
      { title: "Warehouse coordination", body: "Sync your warehouse APOB filings.", icon: "Truck" },
    ],
    process: [
      { step: "State selection", body: "List the states you sell into." },
      { step: "Documentation", body: "APOB kit prepared per state." },
      { step: "Filing", body: "We assist with GST portal filing." },
      { step: "Go live", body: "Start selling compliantly." },
    ],
    faqs: [
      { q: "Is APOB different from VPOB?", a: "APOB is an Additional PoB (extra location). VPOB is Virtual PoB — a service address for GST." },
      { q: "Which marketplaces are supported?", a: "Amazon, Flipkart, Meesho, Myntra, Ajio, and D2C stores." },
      { q: "Do I need a real warehouse?", a: "Only if you're storing goods. Our APOB serves compliance, not storage." },
    ],
  },
};

export const TESTIMONIALS = [
  { name: "Rahul Sharma", company: "Founder, TechGrow", initials: "RS", rating: 5, feedback: "Setting up our business address with OfficeMate was seamless. Great support!", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=60" },
  { name: "Priya Mehta", company: "Co-Founder, Blush & Co.", initials: "PM", rating: 5, feedback: "Quick GST registration and professional service across multiple locations.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=60" },
  { name: "Amit Verma", company: "Director, Verma Exports", initials: "AV", rating: 5, feedback: "Reliable, transparent and excellent support throughout our journey.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=60" },
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
