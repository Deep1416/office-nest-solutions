import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BLOGS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const post = BLOGS.find(b => b.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.post.title ?? "Blog"} — OfficeNest` },
      { name: "description", content: loaderData?.post.excerpt ?? "" },
      { property: "og:title", content: loaderData?.post.title ?? "" },
      { property: "og:image", content: loaderData?.post.image ?? "" },
      { property: "og:type", content: "article" },
    ],
  }),
  component: Post,
});

function Post() {
  const { post } = Route.useLoaderData() as { post: typeof BLOGS[number] };
  const related = BLOGS.filter(b => b.slug !== post.slug).slice(0, 3);
  return (
    <div className="bg-background">
      <div className="container-x max-w-3xl py-12">
        <div className="text-xs text-muted-foreground"><Link to="/blogs" className="hover:text-primary">Blogs</Link> / <span className="text-navy">{post.category}</span></div>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight">{post.title}</h1>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary">{post.category}</Badge> {post.date} · {post.read}
        </div>
        <img src={post.image} alt={post.title} className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover" />
        <div className="prose prose-slate mt-8 max-w-none text-navy/90">
          <p className="text-lg">{post.excerpt}</p>
          <p>
            India's business landscape is evolving rapidly, and virtual offices have emerged as an essential tool for founders navigating pan-India compliance. In this guide, we walk through the practicalities — what to look for, what to avoid, and how to use a virtual office as a growth lever rather than a compliance box-ticker.
          </p>
          <h2>Why it matters</h2>
          <p>Whether you're launching your first company or expanding your ecommerce brand into a new state, a compliant address unlocks GST, banking and marketplace listings without the overhead of physical space.</p>
          <h2>Key considerations</h2>
          <ul>
            <li>Ensure your provider offers a full documentation kit — rent agreement, NOC and utility bill.</li>
            <li>Ask about GST officer verification history in the state.</li>
            <li>Look for transparent pricing without renewal surprises.</li>
          </ul>
          <h2>Final thoughts</h2>
          <p>Virtual offices are no longer a workaround — they're a strategic advantage. Pick a partner who understands compliance <em>and</em> customer experience.</p>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-bold">Related articles</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {related.map(r => (
              <Link key={r.slug} to="/blogs/$slug" params={{ slug: r.slug }} className="card-soft card-soft-hover overflow-hidden">
                <img src={r.image} alt={r.title} className="aspect-[16/10] w-full object-cover" />
                <div className="p-4 text-sm font-semibold">{r.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
