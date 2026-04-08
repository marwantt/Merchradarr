"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X, Bell } from "lucide-react";
import { updates, type Update, type UpdateType } from "@/data/updates";
import type { YouTubeVideo } from "@/lib/youtube";

const STORAGE_KEY = "merchradar_seen_updates";

const typeConfig: Record<UpdateType, { label: string; className: string }> = {
  blog:     { label: "Blog",     className: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300" },
  tool:     { label: "Tool",     className: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300" },
  tutorial: { label: "Tutorial", className: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300" },
  news:     { label: "News",     className: "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300" },
  product:  { label: "Product",  className: "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300" },
  video:    { label: "Video",    className: "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function playChime() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const notes = [523.25, 659.25, 783.99]; // C5 E5 G5 — major triad
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.13;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
      osc.start(t);
      osc.stop(t + 0.55);
    });
  } catch {}
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
  const [open, setOpen] = useState(true); // Always open by default
  const [mounted, setMounted] = useState(false);
  const soundPlayed = useRef(false);

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

  const unreadCount = mounted ? allItems.filter((u) => !seenIds.has(u.id)).length : 0;

  // Play chime once on mount when there are unread items
  useEffect(() => {
    if (mounted && unreadCount > 0 && !soundPlayed.current) {
      soundPlayed.current = true;
      const timer = setTimeout(playChime, 600);
      return () => clearTimeout(timer);
    }
  }, [mounted, unreadCount]);

  function markAllSeen() {
    const allIds = allItems.map((u) => u.id);
    const next = new Set(allIds);
    setSeenIds(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(allIds)); } catch {}
  }

  function handleItemClick(id: string) {
    const next = new Set([...seenIds, id]);
    setSeenIds(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch {}
  }

  return (
    <>
      {/* Bell / X toggle button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setOpen((v) => !v)}
          type="button"
          aria-label={open ? "Close notifications" : "Open notifications"}
          className="relative flex items-center justify-center w-10 h-10 bg-background border border-border hover:bg-accent transition-colors"
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}
        >
          {open ? <X className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
          {mounted && unreadCount > 0 && !open && (
            <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-primary text-primary-foreground text-[10px] font-bold">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Floating panel */}
      <div
        className={`fixed z-40 flex flex-col bg-background border border-border transition-all duration-300 ease-in-out ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{
          top: "60px",
          right: "16px",
          width: "340px",
          maxHeight: "calc(100vh - 80px)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.14)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-[0.15em]">What&apos;s New</span>
            {mounted && unreadCount > 0 && (
              <span className="flex items-center justify-center min-w-[22px] h-[22px] px-1.5 bg-primary text-primary-foreground text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {mounted && unreadCount > 0 && (
              <button
                onClick={markAllSeen}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-7 h-7 hover:bg-accent transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feed */}
        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {allItems.map((item) => {
            const isNew = mounted && !seenIds.has(item.id);
            const cfg = typeConfig[item.type];
            const isVideo = item.type === "video";
            const sharedClass = `block transition-colors hover:bg-accent/60 ${isNew ? "bg-accent/30" : ""}`;

            const inner = isVideo && item.thumbnail ? (
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  {isNew && <div className="w-2 h-2 bg-primary shrink-0" />}
                  <span className={`text-[10px] px-2 py-0.5 font-semibold uppercase tracking-wider ${cfg.className}`}>{cfg.label}</span>
                  <span className="text-[11px] text-muted-foreground ml-auto">{formatDate(item.date)}</span>
                </div>
                {/* Thumbnail */}
                <div className="relative w-full overflow-hidden bg-muted" style={{ aspectRatio: "16/9" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                    <div className="flex items-center justify-center w-12 h-12 bg-black/75">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className={`text-sm font-medium leading-snug line-clamp-2 ${isNew ? "" : "text-foreground/70"}`}>{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </div>
              </div>
            ) : (
              <div className="px-5 py-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  {isNew && <div className="w-2 h-2 bg-primary shrink-0" />}
                  <span className={`text-[10px] px-2 py-0.5 font-semibold uppercase tracking-wider ${cfg.className}`}>{cfg.label}</span>
                  <span className="text-[11px] text-muted-foreground ml-auto">{formatDate(item.date)}</span>
                </div>
                <p className={`text-sm font-medium leading-snug ${isNew ? "" : "text-foreground/70"}`}>{item.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            );

            return item.external ? (
              <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" onClick={() => handleItemClick(item.id)} className={sharedClass}>
                {inner}
              </a>
            ) : (
              <Link key={item.id} href={item.url} onClick={() => handleItemClick(item.id)} className={sharedClass}>
                {inner}
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border shrink-0">
          <p className="text-[11px] text-muted-foreground text-center uppercase tracking-widest">
            {allItems.length} updates · MerchRadar
          </p>
        </div>
      </div>

      {/* Backdrop on mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
