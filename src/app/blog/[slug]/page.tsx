import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found - MerchRadar Blog',
    };
  }

  return {
    title: `${post.title} - MerchRadar Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header Navigation */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Learning Center
          </Link>
        </div>
      </div>

      {/* Article Container */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Article Header */}
        <header className="space-y-6 pb-12 border-b border-border mb-12">
          <div className="flex items-center gap-4 text-xs uppercase tracking-wider text-muted-foreground">
            <span className="px-3 py-1 border border-border bg-muted/50">
              {post.category.title}
            </span>
            <span>{post.publishedAt}</span>
            <span>{post.readingTime} min read</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-medium leading-tight tracking-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Article Content */}
        <article
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer Navigation */}
        <footer className="pt-12 mt-12 border-t border-border">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm uppercase tracking-wider hover:text-foreground/70 transition-colors"
            >
              ← All Articles
            </Link>
            <Link
              href="/"
              className="inline-flex items-center text-sm uppercase tracking-wider hover:text-foreground/70 transition-colors"
            >
              Home →
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}