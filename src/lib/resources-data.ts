export interface YTChannel {
  name: string;
  handle: string;
  url: string;
  description: string;
  tags: string[];
  category: "design" | "merch";
}

export interface AssetSite {
  name: string;
  url: string;
  domain: string;
  description: string;
  free: boolean;
  tags: string[];
}

export interface Community {
  name: string;
  url: string;
  platform: string;
  description: string;
  members: string;
}

export const designChannels: YTChannel[] = [
  {
    name: "Texture Labs",
    handle: "@Texturelabs",
    url: "https://www.youtube.com/@Texturelabs",
    description: "Free textures, overlays, and Photoshop effects. A goldmine for adding depth and grunge to merch designs.",
    tags: ["Textures", "Photoshop", "Free Assets"],
    category: "design",
  },
  {
    name: "Doron Studio",
    handle: "@DoronStudio",
    url: "https://www.youtube.com/@DoronStudio",
    description: "Motion design and visual effects tutorials. Great for learning advanced compositing and design aesthetics.",
    tags: ["Motion", "VFX", "Compositing"],
    category: "design",
  },
  {
    name: "Intuitive Designs",
    handle: "@IntuitiveDesigns",
    url: "https://www.youtube.com/@IntuitiveDesigns",
    description: "Graphic design tips and Photoshop workflows focused on practical, sellable design outcomes.",
    tags: ["Photoshop", "Design Tips", "Workflow"],
    category: "design",
  },
  {
    name: "Charley Pangus Films",
    handle: "@CharleyPangusFilms",
    url: "https://www.youtube.com/@CharleyPangusFilms",
    description: "Visual effects and cinematic design techniques adapted for graphic art and print-ready visuals.",
    tags: ["VFX", "Effects", "Cinematic"],
    category: "design",
  },
  {
    name: "PANTERvision",
    handle: "@PANTERvision",
    url: "https://www.youtube.com/@PANTERvision",
    description: "Creative Photoshop effects and design manipulation. Unique visual styles that stand out on any product.",
    tags: ["Photoshop", "Effects", "Creative"],
    category: "design",
  },
  {
    name: "PiXimperfect",
    handle: "@PiXimperfect",
    url: "https://www.youtube.com/@PiXimperfect",
    description: "One of the best Photoshop educators online. Masking, retouching, and compositing at a professional level.",
    tags: ["Photoshop", "Masking", "Compositing"],
    category: "design",
  },
];

export const merchChannels: YTChannel[] = [
  {
    name: "Ryan Hogue",
    handle: "@RyanHoguePassiveIncome",
    url: "https://www.youtube.com/@RyanHoguePassiveIncome",
    description: "Deep dives into Merch by Amazon strategy, niche research, and scaling POD income streams.",
    tags: ["Merch Strategy", "Niche Research", "Scaling"],
    category: "merch",
  },
  {
    name: "Philip Anders",
    handle: "@PhilipAnders",
    url: "https://www.youtube.com/@PhilipAnders",
    description: "AI design tools and POD workflows. Among the first to cover AI-powered merch creation techniques.",
    tags: ["AI Tools", "POD", "Design"],
    category: "merch",
  },
  {
    name: "Brenon Dopp",
    handle: "@brenondopp",
    url: "https://www.youtube.com/@brenondopp",
    description: "Etsy and Merch by Amazon growth strategies. Practical niche finding and listing optimization tips.",
    tags: ["Etsy", "Merch", "Growth"],
    category: "merch",
  },
  {
    name: "wtfamievendoing",
    handle: "@wtfamievendoing",
    url: "https://www.youtube.com/@wtfamievendoing",
    description: "Honest, detailed breakdowns of what actually works in POD — design quality, niches, and sales tactics.",
    tags: ["POD", "Design", "Sales"],
    category: "merch",
  },
  {
    name: "Jay's Way",
    handle: "@jayswayworks",
    url: "https://www.youtube.com/@jayswayworks",
    description: "Merch by Amazon tips, niche ideas, and consistent upload strategies for long-term catalog growth.",
    tags: ["Merch", "Niches", "Upload Strategy"],
    category: "merch",
  },
];

export const assetSites: AssetSite[] = [
  {
    name: "Google Fonts",
    url: "https://fonts.google.com",
    domain: "fonts.google.com",
    description: "1,500+ open-source fonts. The safest free fonts for commercial use on Merch designs.",
    free: true,
    tags: ["Fonts", "Commercial Use"],
  },
  {
    name: "DaFont",
    url: "https://dafont.com",
    domain: "dafont.com",
    description: "Huge library of decorative and display fonts. Check license on each — many are free for commercial use.",
    free: true,
    tags: ["Fonts", "Decorative"],
  },
  {
    name: "Fontshare",
    url: "https://fontshare.com",
    domain: "fontshare.com",
    description: "High-quality professional fonts, 100% free for commercial use. A hidden gem for clean merch typography.",
    free: true,
    tags: ["Fonts", "Professional"],
  },
  {
    name: "SVG Repo",
    url: "https://svgrepo.com",
    domain: "svgrepo.com",
    description: "500,000+ free SVG icons and vectors. Filter by commercial license. Great for icons and clipart on designs.",
    free: true,
    tags: ["Vectors", "Icons", "SVG"],
  },
  {
    name: "Vecteezy",
    url: "https://vecteezy.com",
    domain: "vecteezy.com",
    description: "Free and premium vector graphics, illustrations, and background elements for merch designs.",
    free: true,
    tags: ["Vectors", "Illustrations"],
  },
  {
    name: "Remove.bg",
    url: "https://remove.bg",
    domain: "remove.bg",
    description: "Instant background removal powered by AI. Paste any image and get a clean transparent PNG in seconds.",
    free: true,
    tags: ["Background Removal", "AI"],
  },
  {
    name: "Unsplash",
    url: "https://unsplash.com",
    domain: "unsplash.com",
    description: "High-resolution free photos. Useful for reference, mockup backgrounds, and design inspiration.",
    free: true,
    tags: ["Photos", "Free"],
  },
  {
    name: "Mockup World",
    url: "https://www.mockupworld.co",
    domain: "mockupworld.co",
    description: "Curated collection of free, high-quality PSD mockups — t-shirts, hoodies, mugs, and more.",
    free: true,
    tags: ["Mockups", "PSD"],
  },
  {
    name: "Placeit",
    url: "https://placeit.net",
    domain: "placeit.net",
    description: "The best online mockup generator. Create lifestyle t-shirt photos instantly — no Photoshop needed.",
    free: false,
    tags: ["Mockups", "Lifestyle"],
  },
];

export const communities: Community[] = [
  {
    name: "r/MerchByAmazon",
    url: "https://reddit.com/r/MerchByAmazon",
    platform: "Reddit",
    description: "The main Merch by Amazon community. Niche discussions, tier progression, policy updates, and seller support.",
    members: "60k+",
  },
  {
    name: "r/printondemand",
    url: "https://reddit.com/r/printondemand",
    platform: "Reddit",
    description: "Broader POD community covering Etsy, Merch, Redbubble, and more. Good for cross-platform strategies.",
    members: "40k+",
  },
  {
    name: "r/Entrepreneur",
    url: "https://reddit.com/r/Entrepreneur",
    platform: "Reddit",
    description: "Business strategy and ecommerce discussions. Useful for scaling mindset beyond just design and uploads.",
    members: "3M+",
  },
];
