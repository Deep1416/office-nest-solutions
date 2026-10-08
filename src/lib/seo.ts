import { BRAND, SITE_URL } from "@/lib/config";

export const DEFAULT_TITLE = "OfficeMate — Virtual Office & GST Registration Address in India";
export const DEFAULT_DESCRIPTION =
  "Book virtual offices, GST registration and business addresses across 14+ Indian cities. Transparent pricing, verified documentation, dedicated support.";
export const DEFAULT_OG_IMAGE = "/og-image.png";

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: object[];
};

// Builds the head() payload for a route: title, description, canonical, Open Graph, Twitter card and JSON-LD.
export function seoHead({ title, description, path, image, type = "website", noindex, jsonLd = [] }: SeoInput) {
  const url = absoluteUrl(path);
  const img = image?.startsWith("http") ? image : absoluteUrl(image ?? DEFAULT_OG_IMAGE);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:image", content: img },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
      ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd.map((d) => ({ type: "application/ld+json", children: JSON.stringify(d) })),
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#organization`,
  name: BRAND.name,
  url: SITE_URL,
  logo: absoluteUrl("/logo.png"),
  image: absoluteUrl(DEFAULT_OG_IMAGE),
  description: DEFAULT_DESCRIPTION,
  telephone: BRAND.phone,
  email: BRAND.email,
  areaServed: { "@type": "Country", name: "India" },
  address: {
    "@type": "PostalAddress",
    streetAddress: BRAND.addressParts.street,
    addressLocality: BRAND.addressParts.city,
    addressRegion: BRAND.addressParts.region,
    postalCode: BRAND.addressParts.postalCode,
    addressCountry: "IN",
  },
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: BRAND.name,
  url: SITE_URL,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});
