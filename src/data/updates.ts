export type UpdateType = "blog" | "tool" | "tutorial" | "news" | "product" | "video";

export interface Update {
  id: string;
  type: UpdateType;
  title: string;
  description: string;
  url: string;
  date: string;
  external?: boolean;
  thumbnail?: string;
}

// Add new items to the TOP — newest first
export const updates: Update[] = [
  {
    id: "amazon-merch-comfort-colors-eu-2026",
    type: "product",
    title: "Comfort Colors & Premium T-shirts now in DE, FR, IT, ES",
    description: "Heavyweight and premium tees available in European markets for qualifying accounts. Check the Create page when your account is enabled.",
    url: "https://merch.amazon.com/resource/policy/royalties",
    date: "2026-04-02",
    external: true,
  },
  {
    id: "amazon-merch-sun-visor-comfort-colors-us-2026",
    type: "product",
    title: "Sport Sun Visors + new Comfort Colors colors now in US",
    description: "Sport sun visors and new Comfort Colors heavyweight tee and long sleeve colors available for qualifying US accounts. Download updated templates from Merch Resources.",
    url: "https://merch.amazon.com/resource/policy/royalties",
    date: "2026-03-23",
    external: true,
  },
  {
    id: "amazon-merch-tumblers-uk-2026",
    type: "product",
    title: "Tumblers & Water Bottles now available in UK",
    description: "Available for qualifying UK accounts now, with EU marketplace expansion coming soon. Download updated product templates for artwork placement.",
    url: "https://merch.amazon.com/resource/policy/royalties",
    date: "2026-02-11",
    external: true,
  },
  {
    id: "amazon-merch-hats-us-2026",
    type: "product",
    title: "Printed Baseball & Trucker Hats now in US",
    description: "New hat products available for qualifying US accounts on the Create page. Download updated templates for artwork placement.",
    url: "https://merch.amazon.com/resource/policy/royalties",
    date: "2026-01-13",
    external: true,
  },
  {
    id: "marketplace-it-es-2026",
    type: "product",
    title: "Italy & Spain marketplaces now available",
    description: "Search Merch by Amazon on amazon.it and amazon.es — 6 marketplaces total.",
    url: "/",
    date: "2026-04-08",
  },
  {
    id: "academy-launch-2026",
    type: "tutorial",
    title: "MerchRadar Academy launched",
    description: "Free structured learning hub with 4 tracks covering niche research, design, compliance, and scaling.",
    url: "/academy",
    date: "2026-04-08",
  },
  {
    id: "tools-directory-2026",
    type: "tool",
    title: "Creator Tools directory added",
    description: "Curated list of the best AI tools and software for Merch by Amazon creators.",
    url: "/tools",
    date: "2026-04-08",
  },
  {
    id: "blog-ftc-2025",
    type: "news",
    title: "Amazon FTC Settlement 2025 — what Merch sellers need to know",
    description: "New compliance requirements affecting Merch by Amazon listings.",
    url: "/blog/amazon-ftc-settlement-2025",
    date: "2025-01-15",
  },
  {
    id: "blog-design-2024",
    type: "tutorial",
    title: "Best ways to learn Merch by Amazon design",
    description: "Master quality standards, content policies, and essential design skills.",
    url: "/blog/best-ways-learn-merch-amazon-design",
    date: "2024-12-20",
  },
  {
    id: "blog-trends-2024",
    type: "blog",
    title: "Top 10 Amazon Merch trends for 2024",
    description: "Hottest design trends and profitable niches dominating Amazon Merch.",
    url: "/blog/amazon-merch-trends-2024",
    date: "2024-12-15",
  },
  {
    id: "blog-keywords-2024",
    type: "tutorial",
    title: "Complete keyword research guide for Merch",
    description: "Step-by-step guide to finding profitable keywords for your designs.",
    url: "/blog/keyword-research-guide",
    date: "2024-12-10",
  },
  {
    id: "tool-ideogram-2024",
    type: "tool",
    title: "Ideogram — AI text-in-image generation",
    description: "New AI tool that generates text inside designs. Game-changer for quote tees.",
    url: "/tools",
    date: "2024-11-01",
    external: false,
  },
  {
    id: "blog-restricted-keywords",
    type: "news",
    title: "Amazon restricted keywords — full compliance guide",
    description: "Avoid account strikes by understanding what words are banned on Merch.",
    url: "/blog/amazon-restricted-keywords-merch",
    date: "2024-10-05",
  },
];
