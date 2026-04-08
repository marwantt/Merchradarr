"use client";

import { useState, useMemo, useEffect } from "react";
import { SearchAnalytics } from "@/utils/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { marketplaces, productTypes, sortOptions } from "@/lib/constants";

export default function SearchTool() {
  const [keyword, setKeyword] = useState("");
  const [selectedMarketplace, setSelectedMarketplace] = useState("us");
  const [selectedProductType, setSelectedProductType] = useState("tshirts");
  const [selectedSort, setSelectedSort] = useState("featured");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const marketplace = marketplaces.find(m => m.id === selectedMarketplace) || marketplaces[0];
  const productType = productTypes.find(p => p.id === selectedProductType) || productTypes[0];
  const sortOption = sortOptions.find(s => s.id === selectedSort) || sortOptions[0];

  useEffect(() => {
    window.scrollTo(0, 0);
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

      {/* Hint */}
      {!keyword && (
        <div className="text-center py-5 border-l-2 border-primary bg-accent px-6">
          <p className="text-xs text-accent-foreground uppercase tracking-widest font-medium">
            Try: &ldquo;Cat Shirts&rdquo; &nbsp;·&nbsp; &ldquo;Retro Gaming&rdquo; &nbsp;·&nbsp; &ldquo;Motivational Quotes&rdquo;
          </p>
        </div>
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
              {marketplaces.map(m => (
                <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedProductType} onValueChange={setSelectedProductType}>
            <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              {productTypes.map(p => (
                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedSort} onValueChange={setSelectedSort}>
            <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              {sortOptions.map(o => (
                <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

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
            <button
              onClick={handleCopy}
              className="text-xs uppercase tracking-widest text-primary hover:opacity-70 transition-opacity font-medium"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-xs text-muted-foreground break-all font-mono leading-relaxed">{previewUrl}</p>
        </div>
      )}
    </>
  );
}
