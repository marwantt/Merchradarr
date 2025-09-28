"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SearchAnalytics } from "../utils/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <main className="w-full max-w-2xl flex flex-col gap-4 sm:gap-6 items-stretch">
        <h1 className="text-xl sm:text-2xl font-semibold text-center px-2">Spot Merch tees instantly.</h1>

        {/* Settings Section */}
        <Card className="bg-muted/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Marketplace Selector */}
              <div className="space-y-2">
                <Label htmlFor="marketplace" className="text-xs font-medium">
                  Marketplace
                </Label>
                <Select value={selectedMarketplace} onValueChange={setSelectedMarketplace}>
                  <SelectTrigger className="h-10">
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
              </div>

              {/* Product Type Selector */}
              <div className="space-y-2">
                <Label htmlFor="product-type" className="text-xs font-medium">
                  Product Type
                </Label>
                <Select value={selectedProductType} onValueChange={setSelectedProductType}>
                  <SelectTrigger className="h-10">
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
              </div>

              {/* Sort By Selector */}
              <div className="space-y-2">
                <Label htmlFor="sort-by" className="text-xs font-medium">
                  Sort By
                </Label>
                <Select value={selectedSort} onValueChange={setSelectedSort}>
                  <SelectTrigger className="h-10">
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
          </CardContent>
        </Card>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            value={keyword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
            placeholder="Enter a theme or keyword (e.g., cat, retro, gaming)"
            className="flex-1 h-12"
            disabled={isLoading}
            autoFocus
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 px-5 whitespace-nowrap"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </Button>
        </form>

        {/* Live URL Preview */}
        {previewUrl && (
          <Card className="bg-muted/30">
            <CardContent className="pt-4">
              <div className="text-xs font-medium text-muted-foreground mb-2">Preview URL:</div>
              <div className="text-xs text-muted-foreground break-all font-mono bg-background/50 p-2 rounded border">
                {previewUrl}
              </div>
            </CardContent>
          </Card>
        )}

        <p className="text-sm text-center text-muted-foreground">
          Search {marketplace.name} for Merch by Amazon {productType.name.toLowerCase()} with your keywords.
        </p>

        {/* Navigation Section */}
        <Card className="bg-muted/50">
          <CardContent className="pt-4">
            <nav className="flex justify-center space-x-8">
              <Link
                href="/guide"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Guide
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </nav>
          </CardContent>
        </Card>

        {/* What is MerchRadar Section */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">What is MerchRadar?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              MerchRadar is a free tool for Merch by Amazon sellers.
              Instantly search for profitable niches in t-shirts, hoodies,
              and sweatshirts. Save time, scan trends, and grow your POD business.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
