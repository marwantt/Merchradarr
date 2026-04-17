"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogPostPreview } from "@/lib/blog";

const CATEGORIES = ["All", "Strategy", "Trends", "Tutorial", "Compliance", "News"];

function categoryStyle(cat: string) {
  return "border-foreground/40 text-foreground";
}

function FeaturedCard({ post, index }: { post: BlogPostPreview; index: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block border border-border hover:border-foreground/30 transition-all">
      <article className="grid md:grid-cols-[1fr_2fr] divide-y md:divide-y-0 md:divide-x divide-border">
        <div className="p-8 flex flex-col justify-between gap-6 bg-muted/20">
          <div className="flex items-start justify-between">
            <span className="text-5xl font-medium text-muted-foreground/20 tabular-nums leading-none">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={`text-xs uppercase tracking-widest border px-2.5 py-1 font-medium ${categoryStyle(post.category.title)}`}>
              {post.category.title}
            </span>
          </div>
          <div className="space-y-1 text-xs uppercase tracking-widest text-muted-foreground">
            <p>{post.publishedAt}</p>
            <p>{post.readingTime} min read</p>
          </div>
        </div>
        <div className="p-8 flex flex-col justify-center gap-4">
          <h2 className="text-2xl font-medium leading-snug group-hover:text-foreground/70 transition-colors">
            {post.title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
          <span className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors mt-auto pt-2">
            Read Article →
          </span>
        </div>
      </article>
    </Link>
  );
}

function PostCard({ post, index }: { post: BlogPostPreview; index: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block border border-border hover:border-foreground/30 transition-all h-full">
      <article className="p-6 flex flex-col gap-4 h-full">
        <div className="flex items-start justify-between gap-2">
          <span className="text-2xl font-medium text-muted-foreground/20 tabular-nums leading-none">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`text-xs uppercase tracking-widest border px-2 py-0.5 font-medium shrink-0 ${categoryStyle(post.category.title)}`}>
            {post.category.title}
          </span>
        </div>
        <h2 className="text-base font-medium leading-snug group-hover:text-foreground/70 transition-colors flex-1">
          {post.title}
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">{post.readingTime} min</span>
          <span className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">Read →</span>
        </div>
      </article>
    </Link>
  );
}

interface Props {
  posts: BlogPostPreview[];
  availableCategories: string[];
}

export function BlogPostList({ posts, availableCategories }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter(p => p.category.title === activeCategory);

  const featured = filtered.filter(p => p.featured);
  const rest = filtered.filter(p => !p.featured);
  const displayFeatured = featured.length > 0 ? featured : filtered.slice(0, 1);
  const displayRest = featured.length > 0 ? rest : filtered.slice(1);

  const visibleCategories = CATEGORIES.filter(c => c === "All" || availableCategories.includes(c));

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
        {visibleCategories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`text-xs uppercase tracking-widest border px-3 py-1.5 transition-colors ${
              activeCategory === cat
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {cat}
            {cat !== "All" && (
              <span className="ml-1.5 opacity-50">
                {posts.filter(p => p.category.title === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="py-12 space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">No posts in this category yet</p>
          </div>
        ) : (
          <>
            {displayFeatured.map((post, i) => (
              <FeaturedCard key={post.slug} post={post} index={i} />
            ))}

            {displayRest.length > 0 && (
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs uppercase tracking-widest text-muted-foreground shrink-0">
                  {activeCategory === "All" ? "More Articles" : activeCategory}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
            )}

            {displayRest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayRest.map((post, i) => (
                  <PostCard key={post.slug} post={post} index={displayFeatured.length + i} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
