import Link from "next/link";

export const metadata = {
  title: "MerchRadar Blog – Amazon Merch Tips, Strategies & Insights",
  description: "Get the latest Amazon Merch tips, niche research strategies, and Print on Demand insights from the MerchRadar blog.",
};

// This would normally fetch from Sanity, but for now showing static content + your existing posts
const staticPosts = [
  {
    title: "Amazon Restricted Keywords: The Ultimate Guide for Merch by Amazon Sellers",
    slug: "amazon-restricted-keywords-merch",
    excerpt: "Learn which restricted keywords Amazon bans in Merch by Amazon listings. Avoid rejections and suspensions with this comprehensive guide to safe alternatives and best practices.",
    category: { title: "Policy Guide", color: "red" },
    publishedAt: "January 2025",
    readingTime: 12,
    featured: true
  }
];

export default function BlogPage() {
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-normal">Blog</h1>
        <p className="text-sm text-muted-foreground">
          Amazon Merch insights and strategies
        </p>
      </div>

      <div className="space-y-8">
        {/* Featured Articles */}
        {staticPosts.map((post) => (
          <article key={post.slug} className="border-b border-border pb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{post.category.title}</span>
                <span>{post.publishedAt}</span>
                <span>{post.readingTime} min</span>
              </div>
              <h2 className="text-lg font-normal">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-foreground transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </article>
        ))}

        {/* Placeholder for Sanity Posts */}
        <div className="border border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Additional blog posts from Sanity CMS will appear here.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Visit localhost:3333 to manage content.
          </p>
        </div>

      </div>
    </main>
  );
}
