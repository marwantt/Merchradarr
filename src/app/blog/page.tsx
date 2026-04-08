import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "MerchRadar Blog – Amazon Merch Tips, Strategies & Insights",
  description: "Get the latest Amazon Merch tips, niche research strategies, and Print on Demand insights from the MerchRadar blog.",
};

const categoryStyles: Record<string, string> = {
  Strategy:   "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300",
  Compliance: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300",
  Trends:     "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
  Tutorial:   "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-4">
          <Link href="/" className="inline-block text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-4">
            ← Back to Home
          </Link>
          <h1 className="text-5xl title-font tracking-wide">Learning Center</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Master Amazon Merch with guides, strategies, and insights for Print on Demand success.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        {posts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border">
            <p className="text-sm text-muted-foreground">No blog posts yet.</p>
          </div>
        ) : (
          <>
            {/* Featured post — large card */}
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="group block border border-border hover:border-primary transition-colors overflow-hidden">
                {featured.coverImage && (
                  <div className="w-full overflow-hidden bg-muted" style={{ height: "280px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featured.coverImage}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-8 space-y-3">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
                    <span className={`px-3 py-1 border font-medium ${categoryStyles[featured.category.title] || "bg-muted/50 border-border"}`}>
                      {featured.category.title}
                    </span>
                    <span>{featured.publishedAt}</span>
                    <span>{featured.readingTime} min read</span>
                    <span className="ml-auto text-primary font-semibold">Featured</span>
                  </div>
                  <h2 className="text-2xl font-medium group-hover:text-primary transition-colors">{featured.title}</h2>
                  <p className="text-base text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                  <p className="text-sm uppercase tracking-wider font-medium text-primary pt-1">Read Article →</p>
                </div>
              </Link>
            )}

            {/* Rest of posts — grid */}
            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-6">
                {rest.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group border border-border hover:border-primary transition-colors overflow-hidden flex flex-col"
                  >
                    {post.coverImage ? (
                      <div className="w-full overflow-hidden bg-muted" style={{ height: "180px" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-full bg-muted flex items-center justify-center" style={{ height: "180px" }}>
                        <span className="text-4xl text-muted-foreground/30 font-mono uppercase tracking-widest">
                          {post.category.title[0]}
                        </span>
                      </div>
                    )}
                    <div className="p-6 space-y-2 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                        <span className={`px-2 py-0.5 border font-medium ${categoryStyles[post.category.title] || "bg-muted/50 border-border"}`}>
                          {post.category.title}
                        </span>
                        <span>{post.readingTime} min</span>
                      </div>
                      <h2 className="text-base font-semibold leading-snug group-hover:text-primary transition-colors flex-1">
                        {post.title}
                      </h2>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                      <p className="text-xs uppercase tracking-wider font-medium text-primary pt-1">Read →</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
