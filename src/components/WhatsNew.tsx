"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { updates, type Update, type UpdateType } from "@/data/updates";
import type { YouTubeVideo } from "@/lib/youtube";

const STORAGE_KEY = "merchradar_seen_updates";

const typeConfig: Record<UpdateType, { label: string; className: string }> = {
  blog:     { label: "Blog",     className: "text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800" },
  tool:     { label: "Tool",     className: "text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800" },
  tutorial: { label: "Tutorial", className: "text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800" },
  news:     { label: "News",     className: "text-red-700 dark:text-red-300 border-red-200 dark:border-red-800" },
  product:  { label: "Product",  className: "text-green-700 dark:text-green-300 border-green-200 dark:border-green-800" },
  video:    { label: "Video",    className: "text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function youtubeToUpdate(video: YouTubeVideo): Update {
  return {
    id: `yt-${video.id}`,
    type: "video",
    title: video.title,
    description: video.channelName,
    url: video.url,
    date: video.publishedAt,
    external: true,
    thumbnail: video.thumbnail,
  };
}

interface Props {
  youtubeVideos?: YouTubeVideo[];
}

export default function WhatsNew({ youtubeVideos = [] }: Props) {
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const allItems: Update[] = [
    ...updates,
    ...youtubeVideos.map(youtubeToUpdate),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSeenIds(new Set(JSON.parse(stored)));
    } catch {}
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const unreadCount = mounted ? allItems.filter((u) => !seenIds.has(u.id)).length : 0;

  function handleOpen() {
    setOpen((v) => !v);
    if (!open) {
      // Mark all seen when opening
      const allIds = allItems.map((u) => u.id);
      const next = new Set(allIds);
      setSeenIds(next);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(allIds)); } catch {}
    }
  }

  function handleItemClick(id: string) {
    const next = new Set([...seenIds, id]);
    setSeenIds(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch {}
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="fixed top-4 right-4 z-50">

      {/* Bell button */}
      <button
        onClick={handleOpen}
        type="button"
        className="relative flex items-center justify-center w-10 h-10 border border-border bg-background hover:bg-accent transition-colors"
        aria-label="What's New"
      >
        <Bell className="w-4 h-4" />
        {mounted && unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-12 w-80 sm:w-96 max-h-[80vh] overflow-y-auto border border-border bg-background flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border sticky top-0 bg-background z-10">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold">What&apos;s New</span>
            <span className="text-xs text-muted-foreground">{allItems.length} updates</span>
          </div>

          {/* Feed */}
          <div className="divide-y divide-border">
            {allItems.map((item) => {
              const isNew = !seenIds.has(item.id);
              const cfg = typeConfig[item.type];
              const isVideo = item.type === "video";
              const sharedClass = `block hover:bg-accent transition-colors ${isNew ? "bg-accent/40" : ""}`;

              const content = isVideo && item.thumbnail ? (
                /* Video card with thumbnail */
                <div className="p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    {isNew && <div className="w-1.5 h-1.5 bg-primary shrink-0" />}
                    <span className={`text-xs px-1.5 py-0.5 border font-medium ${cfg.className}`}>{cfg.label}</span>
                    <span className="text-xs text-muted-foreground">{formatDate(item.date)}</span>
                  </div>
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-video bg-muted overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 bg-black/70 flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[14px] border-l-white border-b-[7px] border-b-transparent ml-1" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-snug line-clamp-2">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                </div>
              ) : (
                /* Regular item */
                <div className="px-4 py-3 space-y-1">
                  <div className="flex items-center gap-2">
                    {isNew && <div className="w-1.5 h-1.5 bg-primary shrink-0" />}
                    <span className={`text-xs px-1.5 py-0.5 border font-medium ${cfg.className}`}>{cfg.label}</span>
                    <span className="text-xs text-muted-foreground">{formatDate(item.date)}</span>
                  </div>
                  <p className="text-sm font-medium leading-snug">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              );

              return item.external ? (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleItemClick(item.id)}
                  className={sharedClass}
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={() => handleItemClick(item.id)}
                  className={sharedClass}
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
