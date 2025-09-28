import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "MerchRadar Blog – Amazon Merch Tips, Strategies & Insights",
  description: "Get the latest Amazon Merch tips, niche research strategies, and Print on Demand insights from the MerchRadar blog.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-normal">Blog</h1>
        <p className="text-sm text-muted-foreground">
          Amazon Merch insights and strategies
        </p>
      </div>

      <div className="space-y-8">
        {/* Blog Articles */}
        {posts.length > 0 ? (
          posts.map((post) => (
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
          ))
        ) : (
          <div className="text-center py-12 border border-dashed border-border">
            <p className="text-sm text-muted-foreground">
              No blog posts yet. Create your first post in <code>src/content/blog/</code>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
