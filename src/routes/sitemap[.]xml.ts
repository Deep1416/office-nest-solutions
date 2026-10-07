import { createFileRoute } from "@tanstack/react-router";
import { absoluteUrl } from "@/lib/seo";
import { BLOGS, CITIES, OFFICES, STATES } from "@/lib/mock-data";

const STATIC_PATHS = [
  "/",
  "/about",
  "/services",
  "/services/gst-registration",
  "/services/business-registration",
  "/services/mailing-address",
  "/services/ecommerce-apob-vpob",
  "/virtual-offices",
  "/blogs",
  "/privacy-policy",
  "/terms-and-conditions",
];

const urlEntry = (path: string, lastmod?: string) =>
  `  <url><loc>${absoluteUrl(path)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const entries = [
          ...STATIC_PATHS.map((p) => urlEntry(p)),
          ...STATES.map((s) => urlEntry(`/locations/${s.slug}`)),
          ...CITIES.map((c) => urlEntry(`/locations/${c.stateSlug}/${c.slug}`)),
          ...OFFICES.map((o) => urlEntry(`/virtual-offices/${o.id}`)),
          ...BLOGS.map((b) => urlEntry(`/blogs/${b.slug}`, b.date)),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
