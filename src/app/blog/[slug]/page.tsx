import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

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
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Back to blog */}
      <Link
        href="/blog"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to Blog
      </Link>

      {/* Article header */}
      <header className="space-y-4">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="px-2 py-1 border border-border">{post.category.title}</span>
          <span>{post.publishedAt}</span>
          <span>{post.readingTime} min read</span>
        </div>

        <h1 className="text-3xl font-normal leading-tight">{post.title}</h1>

        {post.excerpt && (
          <p className="text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </header>

      {/* Article content */}
      <article
        className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-normal prose-headings:tracking-tight prose-p:leading-relaxed prose-code:font-mono prose-pre:bg-muted prose-pre:border prose-pre:border-border"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Footer */}
      <footer className="pt-8 border-t border-border">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm hover:text-foreground transition-colors"
        >
          ← Back to all posts
        </Link>
      </footer>
    </main>
  );
}