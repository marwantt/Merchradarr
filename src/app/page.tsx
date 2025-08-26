"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

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
    const trimmed = keyword.trim();
    const fallbackUrl = "https://www.amazon.com/gp/bestsellers/fashion/9057094011/ref=pd_zg_hrsr_fashion";
    if (!trimmed) {
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (!previewUrl) return;
    window.open(previewUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <main className="w-full max-w-2xl flex flex-col gap-4 sm:gap-6 items-stretch">
        <h1 className="text-xl sm:text-2xl font-semibold text-center px-2">Spot Merch tees instantly.</h1>
        
        {/* Settings Section */}
        <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4 space-y-4">
          <h2 className="text-sm font-medium text-black/80 dark:text-white/80">Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Marketplace Selector */}
            <div>
              <label className="block text-xs font-medium text-black/70 dark:text-white/70 mb-1">
                Marketplace
              </label>
              <select
                value={selectedMarketplace}
                onChange={(e) => setSelectedMarketplace(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-black/10 dark:border-white/20 bg-white dark:bg-black/20 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {marketplaces.map(marketplace => (
                  <option key={marketplace.id} value={marketplace.id}>
                    {marketplace.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Type Selector */}
            <div>
              <label className="block text-xs font-medium text-black/70 dark:text-white/70 mb-1">
                Product Type
              </label>
              <select
                value={selectedProductType}
                onChange={(e) => setSelectedProductType(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-black/10 dark:border-white/20 bg-white dark:bg-black/20 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {productTypes.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By Selector */}
            <div>
              <label className="block text-xs font-medium text-black/70 dark:text-white/70 mb-1">
                Sort By
              </label>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-black/10 dark:border-white/20 bg-white dark:bg-black/20 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={keyword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
            placeholder="Enter a theme or keyword (e.g., cat, retro, gaming)"
            className="flex-1 h-12 px-4 rounded-md border border-black/10 dark:border-white/20 bg-white dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            autoFocus
          />
          <button
            type="submit"
            className="h-12 px-5 rounded-md bg-foreground text-background font-medium whitespace-nowrap"
          >
            Search
          </button>
        </form>

        {/* Live URL Preview */}
        {previewUrl && (
          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-3">
            <div className="text-xs font-medium text-black/70 dark:text-white/70 mb-1">Preview URL:</div>
            <div className="text-xs text-black/60 dark:text-white/60 break-all font-mono">
              {previewUrl}
            </div>
          </div>
        )}

        <p className="text-sm text-center text-black/60 dark:text-white/60">
          Search {marketplace.name} for Merch by Amazon {productType.name.toLowerCase()} with your keywords.
        </p>

        {/* Navigation Section */}
        <nav className="bg-black/5 dark:bg-white/5 rounded-lg p-4">
          <div className="flex justify-center space-x-8">
            <Link 
              href="/guide" 
              className="text-sm font-medium text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors"
            >
              Guide
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors"
            >
              About
            </Link>
            <Link 
              href="/blog" 
              className="text-sm font-medium text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors"
            >
              Blog
            </Link>
          </div>
        </nav>

        {/* What is MerchRadar Section */}
        <section className="bg-black/5 dark:bg-white/5 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-black/90 dark:text-white/90">What is MerchRadar?</h2>
          <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">
            MerchRadar is a free tool for Merch by Amazon sellers.
            Instantly search for profitable niches in t-shirts, hoodies,
            and sweatshirts. Save time, scan trends, and grow your POD business.
          </p>
        </section>
      </main>
    </div>
  );
}
