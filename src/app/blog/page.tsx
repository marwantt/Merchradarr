import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BlogPostList } from "./BlogPostList";

export const metadata = {
  title: "MerchRadar Blog – Amazon Merch Tips, Strategies & Insights",
  description: "Get the latest Amazon Merch tips, niche research strategies, and Print on Demand insights from the MerchRadar blog.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
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

          {totalPosts > 0 && (
            <BlogPostList posts={posts} availableCategories={categories} />
          )}

          {totalPosts === 0 && (
            <div className="mt-12 text-center py-20 border border-dashed border-border">
              <p className="text-sm text-muted-foreground">
                No posts yet. Add markdown files to{" "}
                <code className="px-2 py-0.5 bg-muted font-mono text-xs">src/content/blog/</code>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
