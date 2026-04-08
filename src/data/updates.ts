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
