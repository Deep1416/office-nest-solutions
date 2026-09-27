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
