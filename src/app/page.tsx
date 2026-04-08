"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { SearchAnalytics } from "../utils/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { marketplaces, productTypes, sortOptions } from "@/lib/constants";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [selectedMarketplace, setSelectedMarketplace] = useState("us");
  const [selectedProductType, setSelectedProductType] = useState("tshirts");
  const [selectedSort, setSelectedSort] = useState("featured");
  const [isLoading, setIsLoading] = useState(false);

  // Safety: Fallback to first item if ID is invalid (prevents crashes from stale state)
  const marketplace = marketplaces.find(m => m.id === selectedMarketplace) || marketplaces[0];
  const productType = productTypes.find(p => p.id === selectedProductType) || productTypes[0];
  const sortOption = sortOptions.find(s => s.id === selectedSort) || sortOptions[0];

  // Scroll to top when page loads/refreshes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const previewUrl = useMemo(() => {
    if (!keyword.trim()) return "";

    const trimmed = keyword.trim();
    // Build visible search query so it shows in Amazon's search bar
    const searchQuery = `${productType.keyword} ${trimmed}`;

    // Start with primary search param `k`
    let url = `https://www.${marketplace.domain}/s?k=${encodeURIComponent(searchQuery)}`;

    const marketplaceFilters = productType.filters?.[marketplace.id];
    const sellerFilter = marketplace.sellerId ? `p_6:${marketplace.sellerId}` : "";
    const rhFilters: string[] = [];

    if (marketplaceFilters?.node) {
      rhFilters.push(`n:${marketplaceFilters.node}`);
    }

    if (sellerFilter) {
      rhFilters.push(sellerFilter);
    }

    if (marketplaceFilters?.category) {
      url += `&i=${marketplaceFilters.category}`;
    }

    if (rhFilters.length > 0) {
      url += `&rh=${rhFilters.join(",")}`;
    }

    // Add sort parameter if not featured (default)
    if (selectedSort !== "featured") {
      url += `&s=${sortOption.value}`;
    }

    return url;
  }, [keyword, marketplace, selectedSort, sortOption, productType]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    const trimmed = keyword.trim();
    const fallbackUrl = "https://www.amazon.com/gp/bestsellers/fashion/9057094011/ref=pd_zg_hrsr_fashion";

    // Add a small delay to show loading state
    setTimeout(() => {
      if (!trimmed) {
        window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      } else if (previewUrl) {
        // Track the search
        SearchAnalytics.trackSearch(
          trimmed,
          selectedMarketplace,
          selectedProductType,
          selectedSort,
          previewUrl
        );
        window.open(previewUrl, "_blank", "noopener,noreferrer");
      }
      setIsLoading(false);
    }, 300);
  }

  function handleTitleClick() {
    // Clear the search input and refresh the page state
    setKeyword("");
    setSelectedMarketplace("us");
    setSelectedProductType("tshirts");
    setSelectedSort("featured");
    setIsLoading(false);
  }

  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!previewUrl) return;
    navigator.clipboard.writeText(previewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-16">
      <main className="w-full max-w-xl flex flex-col gap-10 items-stretch">

        {/* Header */}
        <div className="text-center space-y-2">
          <button
            onClick={handleTitleClick}
            className="hover:opacity-70 transition-opacity focus:outline-none"
            type="button"
            aria-label="Reset search"
          >
            <h1 className="text-6xl title-font tracking-wide">
              Merch Radar
            </h1>
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
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {marketplaces.map(marketplace => (
                  <SelectItem key={marketplace.id} value={marketplace.id}>
                    {marketplace.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedProductType} onValueChange={setSelectedProductType}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {productTypes.map(product => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSort} onValueChange={setSelectedSort}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
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
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
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
            <p className="text-xs text-muted-foreground break-all font-mono leading-relaxed">
              {previewUrl}
            </p>
          </div>
        )}

        {/* Academy Section */}
        <div className="border border-border mt-4">
          <div className="border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">MerchRadar Academy</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">Free</span>
            </div>
            <Link
              href="/academy"
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="divide-y divide-border">
            {[
              { track: "01", title: "Getting Started", desc: "Launch your Merch by Amazon journey", href: "/academy" },
              { track: "02", title: "Niche Research", desc: "Find profitable niches before anyone else", href: "/academy" },
              { track: "03", title: "Design & Compliance", desc: "Create designs that sell and stay safe", href: "/academy" },
              { track: "04", title: "Scaling", desc: "Go from a few designs to a full catalog", href: "/academy" },
            ].map((item) => (
              <Link
                key={item.track}
                href={item.href}
                className="flex items-center justify-between px-6 py-4 hover:bg-accent group transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-muted-foreground">{item.track}</span>
                  <div>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="border border-border">
          <div className="border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Creator Tools</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">New Releases</span>
            </div>
            <Link
              href="/tools"
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="divide-y divide-border">
            {[
              { badge: "New", name: "Ideogram", desc: "AI image generation with text — perfect for quote tees", href: "https://ideogram.ai", domain: "ideogram.ai" },
              { badge: "New", name: "Claude", desc: "AI assistant for niche research and listing copy", href: "https://claude.ai", domain: "claude.ai" },
              { badge: "Popular", name: "Kittl", desc: "POD-focused design platform with AI features", href: "https://kittl.com", domain: "kittl.com" },
              { badge: "New", name: "Perplexity", desc: "Real-time AI search for trending niche discovery", href: "https://perplexity.ai", domain: "perplexity.ai" },
            ].map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-6 py-4 hover:bg-accent group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 border border-border flex items-center justify-center shrink-0 bg-muted overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=32`}
                      alt={tool.name}
                      width={20}
                      height={20}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">{tool.name}</p>
                      <span className={`text-xs px-1.5 py-0.5 font-medium ${
                        tool.badge === "New" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"
                      }`}>{tool.badge}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{tool.desc}</p>
                  </div>
                </div>
                <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-6 border-t">
          <nav className="flex justify-center gap-10 text-xs text-muted-foreground uppercase tracking-widest">
            <Link href="/guide" className="hover:text-foreground transition-colors">Guide</Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <Link href="/tools" className="hover:text-foreground transition-colors">Tools</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </nav>
        </div>
      </main>
    </div>
  );
}
