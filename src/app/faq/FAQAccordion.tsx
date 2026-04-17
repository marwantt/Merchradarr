"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is MerchRadar?",
    a: "MerchRadar is a free niche research tool for Amazon Merch on Demand sellers. It builds filtered Amazon search URLs that show only Merch on Demand products, so you can validate niches without scrolling through irrelevant FBA listings.",
  },
  {
    q: "Is MerchRadar free?",
    a: "Yes, completely free. No account required, no paywalls, no limits.",
  },
  {
    q: "What product types does MerchRadar support?",
    a: "All current Amazon Merch on Demand products: T-Shirts, Long Sleeve, V-Neck, Tank Top, Pullover Hoodie, Zip Hoodie, Sweatshirt, Mug, PopSocket, Tote Bag, Throw Pillow, and Phone Case.",
  },
  {
    q: "Which Amazon marketplaces are supported?",
    a: "US, UK, Germany (DE), France (FR), Italy (IT), Spain (ES), and Japan (JP).",
  },
  {
    q: "How does MerchRadar filter for Merch on Demand products?",
    a: "Each search URL includes the Amazon Merch seller ID for that marketplace, combined with the correct product category node. This ensures results show only Merch on Demand listings.",
  },
  {
    q: "What is a good niche keyword to search for?",
    a: "Start with a broad interest like 'cat', 'hiking', or 'nurse', then narrow it down: 'funny nurse', 'hiking dad gift', 'black cat lover'. Long-tail keywords with low competition and clear buyer intent work best.",
  },
  {
    q: "How do I know if a niche is worth entering?",
    a: "Look at the number of results, check the BSR (Best Sellers Rank) of top listings, and scan for gaps — ideas present in the search but with few strong designs. Sort by Best Sellers to see what's actually moving.",
  },
  {
    q: "Can I use MerchRadar for products other than apparel?",
    a: "Yes. MerchRadar supports mugs, PopSockets, tote bags, throw pillows, and phone cases in addition to all apparel types.",
  },
  {
    q: "Does MerchRadar show sales data or BSR?",
    a: "No. MerchRadar opens Amazon's own search results, where you can see bestseller badges and review counts. For deeper data like historical BSR, pair it with a dedicated analytics tool.",
  },
  {
    q: "How often should I do niche research?",
    a: "Daily or weekly is ideal. Trends move fast on Amazon Merch, especially around holidays and pop-culture moments. Catching a niche two weeks early can mean the difference between page 1 and page 10.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border border border-border">
      {faqs.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-8 py-5 text-left hover:bg-muted/30 transition-colors group"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium pr-6">{item.q}</span>
              <span
                className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors text-lg leading-none"
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="px-8 pb-6 pt-1">
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
