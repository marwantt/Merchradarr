import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import type { BlogPostPreview } from "@/lib/blog";

export const metadata = {
  title: "MerchRadar Blog – Amazon Merch Tips, Strategies & Insights",
  description: "Get the latest Amazon Merch tips, niche research strategies, and Print on Demand insights from the MerchRadar blog.",
};

const CATEGORIES = ["All", "Strategy", "Trends", "Tutorial", "Compliance"];

function categoryStyle(cat: string) {
  const map: Record<string, string> = {
    Strategy:   "border-foreground/40 text-foreground",
    Compliance: "border-foreground/40 text-foreground",
    Trends:     "border-foreground/40 text-foreground",
    Tutorial:   "border-foreground/40 text-foreground",
  };
  return map[cat] ?? "border-border text-muted-foreground";
}

function categoryDot(cat: string) {
  const map: Record<string, string> = {
    Strategy:   "bg-foreground",
    Compliance: "bg-foreground",
    Trends:     "bg-foreground",
    Tutorial:   "bg-foreground",
  };
  return map[cat] ?? "bg-muted-foreground";
}

function FeaturedCard({ post, index }: { post: BlogPostPreview; index: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block border border-border hover:border-foreground/30 transition-all">
      <article className="grid md:grid-cols-[1fr_2fr] divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Left: number + meta */}
        <div className="p-8 flex flex-col justify-between gap-6 bg-muted/20">
          <div className="flex items-start justify-between">
            <span className="text-5xl font-medium text-muted-foreground/20 tabular-nums leading-none">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={`text-xs uppercase tracking-widest border px-2.5 py-1 font-medium ${categoryStyle(post.category.title)}`}>
              {post.category.title}
            </span>
          </div>
          <div className="space-y-1 text-xs uppercase tracking-widest text-muted-foreground">
            <p>{post.publishedAt}</p>
            <p>{post.readingTime} min read</p>
          </div>
        </div>

        {/* Right: title + excerpt */}
        <div className="p-8 flex flex-col justify-center gap-4">
          <h2 className="text-2xl font-medium leading-snug group-hover:text-foreground/70 transition-colors">
            {post.title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
          <span className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors mt-auto pt-2">
            Read Article →
          </span>
        </div>
      </article>
    </Link>
  );
}

function PostCard({ post, index }: { post: BlogPostPreview; index: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block border border-border hover:border-foreground/30 transition-all h-full">
      <article className="p-6 flex flex-col gap-4 h-full">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <span className="text-2xl font-medium text-muted-foreground/20 tabular-nums leading-none">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`text-xs uppercase tracking-widest border px-2 py-0.5 font-medium shrink-0 ${categoryStyle(post.category.title)}`}>
            {post.category.title}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-base font-medium leading-snug group-hover:text-foreground/70 transition-colors flex-1">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
            <span>{post.readingTime} min</span>
          </div>
          <span className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
            Read →
          </span>
        </div>
      </article>
    </Link>
  );
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  const featured = posts.filter(p => p.featured);
  const rest = posts.filter(p => !p.featured);
  const displayFeatured = featured.length > 0 ? featured : posts.slice(0, 1);
  const displayRest = featured.length > 0 ? rest : posts.slice(1);

  const totalPosts = posts.length;
  const categories = [...new Set(posts.map(p => p.category.title))];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <Link
            href="/"
            className="inline-block text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            ← Back to Home
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-3">
              <h1 className="text-5xl title-font tracking-wide">Blog</h1>
              <p className="text-sm text-muted-foreground max-w-xl">
                Strategies, trends, and insights for Merch by Amazon and Print on Demand sellers.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-muted-foreground shrink-0">
              <div className="text-center">
                <p className="text-2xl font-medium text-foreground tabular-nums">{totalPosts}</p>
                <p>Articles</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-medium text-foreground tabular-nums">{categories.length}</p>
                <p>Topics</p>
              </div>
            </div>
          </div>

          {/* Category filter row */}
          {totalPosts > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
              {CATEGORIES.filter(c => c === "All" || categories.includes(c)).map(cat => (
                <span
                  key={cat}
                  className="flex items-center gap-1.5 text-xs uppercase tracking-widest border border-border px-3 py-1.5 text-muted-foreground"
                >
                  {cat !== "All" && (
                    <span className={`w-1.5 h-1.5 rounded-full ${categoryDot(cat)}`} />
                  )}
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border">
            <p className="text-sm text-muted-foreground">
              No posts yet. Add markdown files to{" "}
              <code className="px-2 py-0.5 bg-muted font-mono text-xs">src/content/blog/</code>
            </p>
          </div>
        ) : (
          <>
            {/* Featured posts — full width */}
            {displayFeatured.map((post, i) => (
              <FeaturedCard key={post.slug} post={post} index={i} />
            ))}

            {/* Divider */}
            {displayRest.length > 0 && (
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs uppercase tracking-widest text-muted-foreground shrink-0">
                  More Articles
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
            )}

            {/* Remaining posts — 2-col grid */}
            {displayRest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayRest.map((post, i) => (
                  <PostCard key={post.slug} post={post} index={displayFeatured.length + i} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
