export const BRAND = {
  name: "OfficeMate",
  tagline: "Your Business Address, Anywhere in India",
  phone: "+91 98100 00000",
  phoneRaw: "919810000000",
  whatsapp: "919810000000",
  email: "hello@officemate.in",
  address: "OfficeMate HQ, Cyber City, Gurugram, India",
};

export const whatsappUrl = (message: string) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;

// Google Apps Script web-app URL that appends each enquiry to a Google Sheet.
// See docs/leads-google-sheet.md. Leave unset to keep leads local-only.
export const LEADS_SHEET_URL = import.meta.env.VITE_LEADS_SHEET_URL as string | undefined;
