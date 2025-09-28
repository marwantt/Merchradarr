"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SearchAnalytics } from "../utils/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface Marketplace {
  id: string;
  name: string;
  domain: string;
}

interface ProductType {
  id: string;
  name: string;
  keyword: string;
  category?: string;
  node?: string;
}

interface SortOption {
  id: string;
  name: string;
  value: string;
}

const marketplaces: Marketplace[] = [
  { id: "us", name: "Amazon US", domain: "amazon.com" },
  { id: "uk", name: "Amazon UK", domain: "amazon.co.uk" },
  { id: "de", name: "Amazon DE", domain: "amazon.de" },
  { id: "fr", name: "Amazon FR", domain: "amazon.fr" },
];

const productTypes: ProductType[] = [
  { id: "tshirts", name: "T-shirts", keyword: "t-shirt", category: "fashion-novelty", node: "12035955011" },
  { id: "sweatshirts", name: "Sweatshirts", keyword: "sweatshirt", category: "fashion-novelty", node: "12035955011" },
  { id: "hoodies", name: "Hoodies", keyword: "hoodie", category: "fashion-novelty", node: "12035955011" },
  { id: "mugs", name: "Mugs", keyword: "mug", category: "kitchen", node: "284507" },
];

const sortOptions: SortOption[] = [
  { id: "featured", name: "Featured", value: "relevanceblender" },
  { id: "price-low", name: "Price: Low to High", value: "price-asc-rank" },
  { id: "price-high", name: "Price: High to Low", value: "price-desc-rank" },
  { id: "review", name: "Avg. Customer Review", value: "review-rank" },
  { id: "newest", name: "Newest Arrivals", value: "date-desc-rank" },
  { id: "bestsellers", name: "Best Sellers", value: "salesrank" },
];

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [selectedMarketplace, setSelectedMarketplace] = useState("us");
  const [selectedProductType, setSelectedProductType] = useState("tshirts");
  const [selectedSort, setSelectedSort] = useState("featured");
  const [isLoading, setIsLoading] = useState(false);

  const marketplace = marketplaces.find(m => m.id === selectedMarketplace)!;
  const productType = productTypes.find(p => p.id === selectedProductType)!;
  const sortOption = sortOptions.find(s => s.id === selectedSort)!;

  const previewUrl = useMemo(() => {
    if (!keyword.trim()) return "";
    
    const trimmed = keyword.trim();
    // Build visible search query so it shows in Amazon's search bar
    const searchQuery = `${productType.keyword} ${trimmed}`;
    
    // Start with primary search param `k`
    let url = `https://www.${marketplace.domain}/s?k=${encodeURIComponent(searchQuery)}`;
    
    // Add category and node parameters if available
    if (productType.category && productType.node) {
      url += `&i=${productType.category}&rh=n:${productType.node},p_6:ATVPDKIKX0DER`;
    } else {
      // Fallback for products without specific category
      url += `&rh=p_6:ATVPDKIKX0DER`;
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

    // Optionally refresh the entire page
    // window.location.reload();
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <main className="w-full max-w-2xl flex flex-col gap-12 items-stretch">

        {/* Minimal Header */}
        <div className="text-center space-y-3">
          <h1
            className="text-6xl title-font tracking-wide cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleTitleClick}
          >
            Merch Radar
          </h1>
          <p className="text-sm text-muted-foreground uppercase tracking-wider">AMAZON MERCH NICHE FINDER</p>
        </div>

        {/* First-time user hint */}
        {!keyword && (
          <div className="text-center py-6 border border-dashed border-border">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              TRY: &ldquo;CAT SHIRTS&rdquo; | &ldquo;RETRO GAMING&rdquo; | &ldquo;MOTIVATIONAL QUOTES&rdquo;
            </p>
          </div>
        )}

        {/* Core Search */}
        <div className="space-y-8">
          {/* Primary Search Input */}
          <div className="space-y-4">
            <Input
              type="text"
              value={keyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
              placeholder="ENTER NICHE OR KEYWORD..."
              className="h-16 text-center text-lg uppercase tracking-wider font-medium"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {/* Minimal Settings - Horizontal Layout */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <Select value={selectedMarketplace} onValueChange={setSelectedMarketplace}>
              <SelectTrigger className="h-12">
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
              <SelectTrigger className="h-12">
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
              <SelectTrigger className="h-12">
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
            className="h-16 w-full text-lg uppercase tracking-wider font-medium"
            variant="default"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                SEARCHING...
              </>
            ) : (
              "SEARCH AMAZON"
            )}
          </Button>
        </form>

        {/* Live URL Preview - Minimal */}
        {previewUrl && (
          <div className="text-sm text-muted-foreground break-all border-t pt-6 font-mono">
            {previewUrl}
          </div>
        )}

        {/* Minimal Footer Links */}
        <div className="text-center pt-12 border-t">
          <nav className="flex justify-center gap-12 text-sm text-muted-foreground">
            <Link href="/guide" className="hover:text-foreground uppercase tracking-wider">GUIDE</Link>
            <Link href="/about" className="hover:text-foreground uppercase tracking-wider">ABOUT</Link>
            <Link href="/blog" className="hover:text-foreground uppercase tracking-wider">BLOG</Link>
            <Link href="/contact" className="hover:text-foreground uppercase tracking-wider">CONTACT</Link>
          </nav>
        </div>
      </main>
    </div>
  );
}
