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
  rawContent: string;
  isMdx: boolean;
  publishedAt: string;
  readingTime: number;
  category: {
    title: string;
    color?: string;
  };
  coverImage?: string;
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
  coverImage?: string;
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
      .filter(name => name.endsWith('.md') || name.endsWith('.mdx'))
      .map(name => name.replace(/\.(md|mdx)$/, ''));
  } catch {
    return [];
  }
}

function resolvePostPath(slug: string): { filePath: string; isMdx: boolean } | null {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  if (fs.existsSync(mdxPath)) return { filePath: mdxPath, isMdx: true };
  if (fs.existsSync(mdPath)) return { filePath: mdPath, isMdx: false };
  return null;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  ensurePostsDirectory();

  try {
    const resolved = resolvePostPath(slug);
    if (!resolved) return null;

    const { filePath, isMdx } = resolved;
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    if (data.draft && process.env.NODE_ENV === 'production') return null;

    // For MDX files, skip remark processing — rendered in the page component
    let contentHtml = '';
    if (!isMdx) {
      const processedContent = await remark()
        .use(html, { sanitize: false })
        .process(content);
      contentHtml = processedContent.toString();
    }

    return {
      slug,
      title: data.title || '',
      excerpt: data.excerpt || '',
      content: contentHtml,
      rawContent: content,
      isMdx,
      publishedAt: data.publishedAt || '',
      readingTime: data.readingTime || 5,
      category: data.category || { title: 'General' },
      coverImage: data.coverImage || null,
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
    slugs.map(async (slug): Promise<BlogPostPreview | null> => {
      const post = await getPostBySlug(slug);
      if (!post || (post.draft && process.env.NODE_ENV === 'production')) {
        return null;
      }

      const preview: BlogPostPreview = {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        publishedAt: post.publishedAt,
        readingTime: post.readingTime,
        category: post.category,
        coverImage: post.coverImage,
      };

      if (typeof post.featured !== 'undefined') {
        preview.featured = post.featured;
      }

      return preview;
    })
  );

  // Filter out null posts and sort by date (newest first)
  const toTimestamp = (value: string) => {
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  return posts
    .filter((post): post is BlogPostPreview => post !== null)
    .sort((a, b) => toTimestamp(b.publishedAt) - toTimestamp(a.publishedAt));
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
