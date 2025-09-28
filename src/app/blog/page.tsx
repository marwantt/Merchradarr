import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">MerchRadar Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Tips, strategies, and insights for Amazon Merch sellers and Print on Demand entrepreneurs.
        </p>
      </div>

      <Separator />

      <div className="grid gap-6">
        {/* Featured Articles */}
        {staticPosts.map((post) => (
          <Card key={post.slug} className={post.featured ? "border-primary/20 bg-gradient-to-br from-background to-muted/30" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Badge variant={post.category.color === "red" ? "destructive" : "secondary"}>
                  {post.category.title}
                </Badge>
                <span>•</span>
                <span>{post.publishedAt}</span>
                {post.featured && (
                  <>
                    <span>•</span>
                    <Badge variant="outline">Featured</Badge>
                  </>
                )}
              </div>
              <CardTitle className="text-xl leading-tight">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {post.readingTime} min read
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                >
                  Read more →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Placeholder for Sanity Posts */}
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Content from Sanity CMS</h3>
            <p className="text-muted-foreground mb-4">
              Blog posts you create in Sanity Studio will appear here automatically.
            </p>
            <p className="text-sm text-muted-foreground">
              Visit <strong>http://localhost:3333</strong> to create your first blog post!
            </p>
          </CardContent>
        </Card>

      </div>
    </main>
  );
}
