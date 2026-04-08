"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { updates, type UpdateType } from "@/data/updates";

const STORAGE_KEY = "merchradar_seen_updates";

const typeConfig: Record<UpdateType, { label: string; className: string }> = {
  blog:     { label: "Blog",     className: "text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800" },
  tool:     { label: "Tool",     className: "text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800" },
  tutorial: { label: "Tutorial", className: "text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800" },
  news:     { label: "News",     className: "text-red-700 dark:text-red-300 border-red-200 dark:border-red-800" },
  product:  { label: "Product",  className: "text-green-700 dark:text-green-300 border-green-200 dark:border-green-800" },
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function WhatsNew() {
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSeenIds(new Set(JSON.parse(stored)));
    } catch {}
  }, []);

  const unreadCount = mounted
    ? updates.filter((u) => !seenIds.has(u.id)).length
    : 0;

  function markAllSeen() {
    const allIds = updates.map((u) => u.id);
    const next = new Set(allIds);
    setSeenIds(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allIds));
    } catch {}
  }

  function handleOpen() {
    setOpen((v) => !v);
    if (!open) markAllSeen();
  }

  function handleItemClick(id: string) {
    const next = new Set([...seenIds, id]);
    setSeenIds(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    } catch {}
  }

  return (
    <div className="border border-border">
      {/* Header */}
      <button
        onClick={handleOpen}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-accent transition-colors"
        type="button"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold">What&apos;s New</span>
          {mounted && unreadCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 bg-primary text-primary-foreground text-xs font-bold">
              {unreadCount}
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          {open ? "Close ↑" : "Show ↓"}
        </span>
      </button>

      {/* Feed */}
      {open && (
        <div className="divide-y divide-border border-t border-border">
          {updates.map((item) => {
            const isNew = mounted && !seenIds.has(item.id);
            const cfg = typeConfig[item.type];
            const isExternal = item.external;
            const Comp = isExternal ? "a" : Link;
            const linkProps = isExternal
              ? { href: item.url, target: "_blank", rel: "noopener noreferrer" }
              : { href: item.url };

            return (
              <Comp
                key={item.id}
                {...(linkProps as any)}
                onClick={() => handleItemClick(item.id)}
                className="flex items-start justify-between gap-4 px-6 py-4 hover:bg-accent group transition-colors"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {/* Unread dot */}
                  <div className="mt-1.5 shrink-0">
                    {isNew ? (
                      <div className="w-1.5 h-1.5 bg-primary" />
                    ) : (
                      <div className="w-1.5 h-1.5" />
                    )}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs px-1.5 py-0.5 border font-medium ${cfg.className}`}>
                        {cfg.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{formatDate(item.date)}</span>
                    </div>
                    <p className={`text-sm font-medium group-hover:text-primary transition-colors ${isNew ? "" : "text-foreground/70"}`}>
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1">→</span>
              </Comp>
            );
          })}
        </div>
      )}
    </div>
  );
}
