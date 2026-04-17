"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SearchAnalytics, SearchRecord, PopularKeyword } from "../../utils/analytics";

export default function AnalyticsPage() {
  const [searchHistory, setSearchHistory] = useState<SearchRecord[]>([]);
  const [popularKeywords, setPopularKeywords] = useState<PopularKeyword[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    uniqueKeywords: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    setSearchHistory(SearchAnalytics.getSearchHistory(50));
    setPopularKeywords(SearchAnalytics.getPopularKeywords(10));
    setStats(SearchAnalytics.getSearchStats());
  };

  const handleExport = () => {
    SearchAnalytics.downloadCsv();
  };

  const handleClearData = () => {
    if (confirm("Clear all analytics data? This cannot be undone.")) {
      SearchAnalytics.clearData();
      loadAnalytics();
    }
  };

  const formatDate = (timestamp: number) =>
    new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-xs uppercase tracking-widest text-muted-foreground animate-pulse">Loading…</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <Link
            href="/"
            className="inline-block text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            ← Back to Search
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">MerchRadar</p>
              <h1 className="text-4xl font-medium tracking-tight">Search Analytics</h1>
              <p className="text-sm text-muted-foreground">Your personal niche research history — stored locally.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                disabled={stats.total === 0}
                className="border border-border px-4 py-2 text-xs uppercase tracking-widest hover:border-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Export CSV
              </button>
              <button
                onClick={handleClearData}
                disabled={stats.total === 0}
                className="border border-border px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:border-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Clear Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 border border-border divide-y sm:divide-y-0 sm:divide-x divide-border">
          {[
            { label: "Total Searches", value: stats.total },
            { label: "Today", value: stats.today },
            { label: "This Week", value: stats.thisWeek },
            { label: "This Month", value: stats.thisMonth },
            { label: "Unique Keywords", value: stats.uniqueKeywords },
          ].map((s) => (
            <div key={s.label} className="px-6 py-5 space-y-1">
              <p className="text-2xl font-semibold tabular-nums">{s.value}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Popular Keywords */}
          <div className="border border-border">
            <div className="border-b border-border px-6 py-4 bg-muted/30">
              <p className="text-xs uppercase tracking-[0.2em] font-medium">Popular Keywords</p>
            </div>
            {popularKeywords.length > 0 ? (
              <div className="divide-y divide-border">
                {popularKeywords.map((item, i) => (
                  <div key={item.keyword} className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-muted-foreground w-5 shrink-0">#{i + 1}</span>
                      <div>
                        <p className="text-sm font-medium">{item.keyword}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                          {item.marketplaces.join(" · ")} · {item.productTypes.join(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold tabular-nums">{item.count}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{formatDate(item.lastSearched)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">No search data yet</p>
                <p className="text-xs text-muted-foreground mt-1">Start searching to see popular keywords</p>
              </div>
            )}
          </div>

          {/* Recent Searches */}
          <div className="border border-border">
            <div className="border-b border-border px-6 py-4 bg-muted/30">
              <p className="text-xs uppercase tracking-[0.2em] font-medium">Recent Searches</p>
            </div>
            {searchHistory.length > 0 ? (
              <div className="divide-y divide-border max-h-[480px] overflow-y-auto">
                {searchHistory.map((search: SearchRecord) => (
                  <div key={search.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{search.keyword}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest shrink-0 ml-4">
                        {formatDate(search.timestamp)}
                      </p>
                    </div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                      {search.marketplace.toUpperCase()} · {search.productType} · {search.sortOption}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">No search history yet</p>
                <p className="text-xs text-muted-foreground mt-1">Your searches will appear here</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
