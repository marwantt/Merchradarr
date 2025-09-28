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
    uniqueKeywords: 0
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
    if (confirm('Are you sure you want to clear all analytics data? This action cannot be undone.')) {
      SearchAnalytics.clearData();
      loadAnalytics();
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Search Analytics</h1>
            <p className="text-black/60 dark:text-white/60 mt-1">
              Track your research patterns and discover trending niches
            </p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors"
          >
            ← Back to Search
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-black/60 dark:text-white/60">Total Searches</div>
          </div>
          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4">
            <div className="text-2xl font-bold">{stats.today}</div>
            <div className="text-sm text-black/60 dark:text-white/60">Today</div>
          </div>
          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4">
            <div className="text-2xl font-bold">{stats.thisWeek}</div>
            <div className="text-sm text-black/60 dark:text-white/60">This Week</div>
          </div>
          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4">
            <div className="text-2xl font-bold">{stats.thisMonth}</div>
            <div className="text-sm text-black/60 dark:text-white/60">This Month</div>
          </div>
          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4">
            <div className="text-2xl font-bold">{stats.uniqueKeywords}</div>
            <div className="text-sm text-black/60 dark:text-white/60">Unique Keywords</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleExport}
            disabled={stats.total === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={handleClearData}
            disabled={stats.total === 0}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Clear Data
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Popular Keywords */}
          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Popular Keywords</h2>
            {popularKeywords.length > 0 ? (
              <div className="space-y-3">
                {popularKeywords.map((item, index) => (
                  <div key={item.keyword} className="flex items-center justify-between p-3 bg-white dark:bg-black/20 rounded-md">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-black/40 dark:text-white/40 w-6">
                        #{index + 1}
                      </span>
                      <div>
                        <div className="font-medium">{item.keyword}</div>
                        <div className="text-xs text-black/60 dark:text-white/60">
                          {item.marketplaces.join(', ')} • {item.productTypes.join(', ')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{item.count}</div>
                      <div className="text-xs text-black/60 dark:text-white/60">
                        {formatDate(item.lastSearched)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-black/60 dark:text-white/60">
                No search data yet. Start searching to see popular keywords!
              </div>
            )}
          </div>

          {/* Recent Searches */}
          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Searches</h2>
            {searchHistory.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {searchHistory.map((search) => (
                  <div key={search.id} className="p-3 bg-white dark:bg-black/20 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{search.keyword}</div>
                      <div className="text-xs text-black/60 dark:text-white/60">
                        {formatDate(search.timestamp)}
                      </div>
                    </div>
                    <div className="text-xs text-black/60 dark:text-white/60 mt-1">
                      {search.marketplace.toUpperCase()} • {search.productType} • {search.sortOption}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-black/60 dark:text-white/60">
                No search history yet. Your searches will appear here!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}