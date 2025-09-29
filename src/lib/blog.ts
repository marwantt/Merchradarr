import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readingTime: number;
  category: {
    title: string;
    color?: string;
  };
  featured?: boolean;
  draft?: boolean;
}

export interface BlogPostPreview {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: number;
  category: {
    title: string;
    color?: string;
  };
  featured?: boolean;
}

// Ensure the posts directory exists
function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

export function getAllPostSlugs(): string[] {
  ensurePostsDirectory();

  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => name.replace(/\.md$/, ''));
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  ensurePostsDirectory();

  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Skip draft posts in production
    if (data.draft && process.env.NODE_ENV === 'production') {
      return null;
    }

    // Process markdown content to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title || '',
      excerpt: data.excerpt || '',
      content: contentHtml,
      publishedAt: data.publishedAt || '',
      readingTime: data.readingTime || 5,
      category: data.category || { title: 'General' },
      featured: data.featured || false,
      draft: data.draft || false,
    };
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<BlogPostPreview[]> {
  ensurePostsDirectory();

  const slugs = getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      if (!post || (post.draft && process.env.NODE_ENV === 'production')) {
        return null;
      }

      // Return preview without content
      return {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        publishedAt: post.publishedAt,
        readingTime: post.readingTime,
        category: post.category,
        featured: post.featured,
      };
    })
  );

  // Filter out null posts and sort by date (newest first)
  return posts
    .filter((post) => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}