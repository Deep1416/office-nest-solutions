const ADDRESS = {
  street: "New Palam Vihar, Sector 110",
  city: "Gurugram",
  region: "Haryana",
  postalCode: "110017",
};

export const BRAND = {
  name: "OfficeMate",
  tagline: "Your Business Address, Anywhere in India",
  phone: "+91 79826 94457",
  phoneRaw: "917982694457",
  whatsapp: "917982694457",
  email: "officematesupport@gmail.com",
  addressParts: ADDRESS,
  address: `${ADDRESS.street}, ${ADDRESS.city}, ${ADDRESS.region} ${ADDRESS.postalCode}`,
};

// Canonical production origin (apex redirects to www on Vercel). Used for canonical links, og:url and the sitemap.
export const SITE_URL = "https://www.officemate.co.in";

export const whatsappUrl = (message: string) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;

// Google Apps Script web-app URL that emails each enquiry to BRAND.email.
// See docs/enquiry-emails.md. Leave unset to keep enquiries local-only.
export const ENQUIRY_EMAIL_URL = import.meta.env.VITE_ENQUIRY_EMAIL_URL as string | undefined;
