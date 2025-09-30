import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "MerchRadar Blog – Amazon Merch Tips, Strategies & Insights",
  description: "Get the latest Amazon Merch tips, niche research strategies, and Print on Demand insights from the MerchRadar blog.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-4">
          <Link
            href="/"
            className="inline-block text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl title-font tracking-wide">Learning Center</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Master Amazon Merch with comprehensive guides, strategies, and insights for Print on Demand success.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {posts.length > 0 ? (
          <div className="grid gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group border border-border hover:border-foreground/20 transition-all p-8"
              >
                <div className="space-y-4">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs uppercase tracking-wider text-muted-foreground">
                    <span
                      className={`px-3 py-1 border font-medium ${
                        post.category.title === 'Strategy'
                          ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
                          : post.category.title === 'Compliance'
                          ? 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                          : post.category.title === 'Trends'
                          ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                          : post.category.title === 'Tutorial'
                          ? 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300'
                          : 'bg-muted/50 border-border'
                      }`}
                    >
                      {post.category.title}
                    </span>
                    <span>{post.publishedAt}</span>
                    <span>{post.readingTime} min read</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-medium group-hover:text-foreground/80 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="pt-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm uppercase tracking-wider font-medium hover:text-foreground/70 transition-colors"
                    >
                      Read Article →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-border">
            <p className="text-sm text-muted-foreground">
              No blog posts yet. Create your first post in <code className="px-2 py-1 bg-muted font-mono text-xs">src/content/blog/</code>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
