"use client";

import { useState, useMemo, useEffect } from "react";
import { SearchAnalytics } from "@/utils/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Share2 } from "lucide-react";
import { marketplaces, productTypes, sortOptions, marketplaceLocations } from "@/lib/constants";

export default function SearchTool() {
  const [keyword, setKeyword] = useState("");
  const [selectedMarketplace, setSelectedMarketplace] = useState("us");
  const [selectedProductType, setSelectedProductType] = useState("tshirts");
  const [selectedSort, setSelectedSort] = useState("featured");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [copiedPostal, setCopiedPostal] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const marketplace = marketplaces.find(m => m.id === selectedMarketplace) || marketplaces[0];
  const productType = productTypes.find(p => p.id === selectedProductType) || productTypes[0];
  const sortOption = sortOptions.find(s => s.id === selectedSort) || sortOptions[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    // Load recent unique keywords from analytics
    const history = SearchAnalytics.getSearchHistory(20);
    const seen = new Set<string>();
    const unique: string[] = [];
    for (const r of history) {
      if (!seen.has(r.keyword)) {
        seen.add(r.keyword);
        unique.push(r.keyword);
        if (unique.length === 5) break;
      }
    }
    setRecentSearches(unique);
  }, []);

  const previewUrl = useMemo(() => {
    if (!keyword.trim()) return "";
    const trimmed = keyword.trim();
    const searchQuery = `${productType.keyword} ${trimmed}`;
    let url = `https://www.${marketplace.domain}/s?k=${encodeURIComponent(searchQuery)}`;
    const marketplaceFilters = productType.filters?.[marketplace.id];
    const sellerFilter = marketplace.sellerId ? `p_6:${marketplace.sellerId}` : "";
    const rhFilters: string[] = [];
    if (marketplaceFilters?.node) rhFilters.push(`n:${marketplaceFilters.node}`);
    if (sellerFilter) rhFilters.push(sellerFilter);
    if (marketplaceFilters?.category) url += `&i=${marketplaceFilters.category}`;
    if (rhFilters.length > 0) url += `&rh=${rhFilters.join(",")}`;
    if (selectedSort !== "featured") url += `&s=${sortOption.value}`;
    return url;
  }, [keyword, marketplace, selectedSort, sortOption, productType]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    const trimmed = keyword.trim();
    const fallbackUrl = "https://www.amazon.com/gp/bestsellers/fashion/9057094011/ref=pd_zg_hrsr_fashion";
    setTimeout(() => {
      if (!trimmed) {
        window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      } else if (previewUrl) {
        SearchAnalytics.trackSearch(trimmed, selectedMarketplace, selectedProductType, selectedSort, previewUrl);
        // Update recent searches
        setRecentSearches(prev => {
          const next = [trimmed, ...prev.filter(k => k !== trimmed)].slice(0, 5);
          return next;
        });
        window.open(previewUrl, "_blank", "noopener,noreferrer");
      }
      setIsLoading(false);
    }, 300);
  }

  function handleTitleClick() {
    setKeyword("");
    setSelectedMarketplace("us");
    setSelectedProductType("tshirts");
    setSelectedSort("featured");
    setIsLoading(false);
  }

  function handleCopy() {
    if (!previewUrl) return;
    navigator.clipboard.writeText(previewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleCopyPostal(code: string) {
    navigator.clipboard.writeText(code);
    setCopiedPostal(true);
    setTimeout(() => setCopiedPostal(false), 1500);
  }

  async function handleShare() {
    if (!previewUrl) return;
    const shareData = {
      title: `MerchRadar — ${keyword}`,
      text: `Check out this Amazon Merch niche: "${keyword}"`,
      url: previewUrl,
    };
    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(previewUrl);
        setShared(true);
        setTimeout(() => setShared(false), 1500);
      }
    } catch {}
  }

  return (
    <>
      {/* Header */}
      <div className="text-center space-y-2">
        <button
          onClick={handleTitleClick}
          className="hover:opacity-70 transition-opacity focus:outline-none"
          type="button"
          aria-label="Reset search"
        >
          <h1 className="text-6xl title-font tracking-wide">Merch Radar</h1>
        </button>
        <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Amazon Merch Niche Finder</p>
      </div>

      {/* Hint or Recent Searches */}
      {!keyword && (
        recentSearches.length > 0 ? (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground uppercase tracking-widest text-center">Recent Searches</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {recentSearches.map((k) => (
                <button
                  key={k}
                  onClick={() => setKeyword(k)}
                  className="px-3 py-1.5 border border-border text-xs uppercase tracking-wider hover:border-primary hover:text-primary transition-colors font-medium"
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-5 border-l-2 border-primary bg-accent px-6">
            <p className="text-xs text-accent-foreground uppercase tracking-widest font-medium">
              Try: &ldquo;Cat Shirts&rdquo; &nbsp;·&nbsp; &ldquo;Retro Gaming&rdquo; &nbsp;·&nbsp; &ldquo;Motivational Quotes&rdquo;
            </p>
          </div>
        )
      )}

      {/* Search */}
      <div className="space-y-4">
        <Input
          type="text"
          value={keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
          placeholder="Enter niche or keyword..."
          className="h-14 text-center text-base tracking-wider font-medium border-border focus-visible:border-primary"
          disabled={isLoading}
          autoFocus
        />
        <div className="grid grid-cols-3 gap-3 text-sm">
          <Select value={selectedMarketplace} onValueChange={setSelectedMarketplace}>
            <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              {marketplaces.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={selectedProductType} onValueChange={setSelectedProductType}>
            <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              {productTypes.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={selectedSort} onValueChange={setSelectedSort}>
            <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              {sortOptions.map(o => <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Location tip for non-US marketplaces */}
      {marketplaceLocations[selectedMarketplace] && (() => {
        const loc = marketplaceLocations[selectedMarketplace];
        return (
          <div className="border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 px-4 py-3 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 flex-1">
                <p className="text-xs font-semibold text-amber-800 dark:text-amber-200 uppercase tracking-wider">
                  {loc.flag} Set your Amazon location for accurate results
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                  Without a {loc.city} address, Amazon may show wrong or empty results.
                  Use this postal code on {marketplace.domain}:
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 flex-1 bg-white dark:bg-black/20 border border-amber-200 dark:border-amber-800 px-3 py-2">
                <span className="font-mono text-sm font-bold tracking-widest text-amber-900 dark:text-amber-100">
                  {loc.postalCode}
                </span>
                <span className="text-xs text-amber-600 dark:text-amber-400">— {loc.city}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyPostal(loc.postalCode)}
                className="shrink-0 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                {copiedPostal ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 leading-relaxed">
              How: {loc.steps}
            </p>
          </div>
        );
      })()}

      {/* Search Button */}
      <form onSubmit={handleSubmit}>
        <Button
          type="submit"
          disabled={isLoading}
          className="h-14 w-full text-sm uppercase tracking-[0.15em] font-semibold"
          variant="default"
        >
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Searching...</>
          ) : (
            "Search Amazon"
          )}
        </Button>
      </form>

      {/* URL Preview */}
      {previewUrl && (
        <div className="border-t pt-5 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Preview URL</p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                <Share2 className="w-3 h-3" />
                {shared ? "Copied!" : "Share"}
              </button>
              <button
                onClick={handleCopy}
                className="text-xs uppercase tracking-widest text-primary hover:opacity-70 transition-opacity font-medium"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground break-all font-mono leading-relaxed">{previewUrl}</p>
        </div>
      )}
    </>
  );
}
