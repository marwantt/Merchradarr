export interface Tutorial {
  id: string;
  title: string;
  channel: string;
}

export interface ToolItem {
  slug: string;
  name: string;
  description: string;
  howTo: string;
  tips: string[];
  url: string;
  domain: string;
  badge: string | null;
  free: boolean;
  tutorials: Tutorial[];
}

export interface ToolCategory {
  category: string;
  items: ToolItem[];
}

export const tools: ToolCategory[] = [
  {
    category: "AI Design",
    items: [
      {
        slug: "ideogram",
        name: "Ideogram",
        description: "AI image generator that excels at text inside designs — perfect for quote tees and typography-based merch.",
        howTo: "Type your niche + design concept (e.g. 'minimalist cat mom quote tee, white background, black text, PNG'). Use the 'Design' style and download at highest resolution. Ideogram handles text better than any other AI tool — letters stay legible and correctly spelled, which is critical for Merch by Amazon designs.",
        tips: [
          "Add 'transparent background' or 'white background' to your prompt to get a clean PNG",
          "Use the 'Design' render style for flat graphic t-shirt art",
          "Describe the font style you want: 'bold serif', 'hand-lettered', 'retro script'",
          "Generate 4 variations and pick the best — free plan gives you plenty of credits",
          "Upscale your chosen image before downloading for print quality",
        ],
        url: "https://ideogram.ai",
        domain: "ideogram.ai",
        badge: "New",
        free: true,
        tutorials: [
          { id: "OiVW0hWY4p4", title: "Using Ideogram This Way Feels Illegal", channel: "Philip Anders" },
          { id: "Am4XQaPoB48", title: "Easy T-Shirts w/ Gemini Prompt HACK", channel: "Philip Anders" },
        ],
      },
      {
        slug: "kittl",
        name: "Kittl",
        description: "Design platform built for POD creators. Templates, fonts, and AI generation tailored for t-shirts and merch.",
        howTo: "Start from a template in the T-shirt category, customize colors and text to fit your niche, then export as PNG (4500×5400px transparent background). Kittl's font library and pre-made graphic elements are specifically curated for print-on-demand, saving hours of design work per listing.",
        tips: [
          "Browse the 'T-shirt & Apparel' template category to find proven design layouts",
          "Use Kittl AI to generate background elements — great for nature, vintage, and retro styles",
          "Export at the highest resolution (3x) and choose PNG with transparent background",
          "Combine Kittl's pre-made elements with your own niche-specific text",
          "The free plan allows enough exports to test your first 10–20 designs",
        ],
        url: "https://kittl.com",
        domain: "kittl.com",
        badge: "Popular",
        free: true,
        tutorials: [
          { id: "TwakRB_PusA", title: "Re-designing My Subscribers T-Shirts w/ Kittl", channel: "Philip Anders" },
          { id: "CR28xltb5O0", title: "How To Make Better Designs Than 99% Of POD Sellers", channel: "wtfamievendoing" },
        ],
      },
      {
        slug: "leonardo-ai",
        name: "Leonardo.ai",
        description: "High-quality AI art generation with fine-tuned models. Great for detailed, print-ready artwork.",
        howTo: "Use the 'Illustration' or 'Graphic Design' models for Merch designs. Enable transparent background in advanced settings. Generate at 1024px+ and use the AI upscaler before exporting. Best for detailed nature, animal, fantasy, and artistic designs that have too much detail for Ideogram.",
        tips: [
          "Use the 'Anime General' model for Japanese-style art designs — huge niche on Merch",
          "Enable 'Alchemy' rendering for higher quality outputs on the free plan",
          "Use 'Elements' to fine-tune art style: add 'flat vector illustration' for clean lines",
          "Negative prompt: 'text, watermark, blur, low quality, distorted' for cleaner results",
          "Upscale your final image using Leonardo's built-in upscaler to 4x before downloading",
        ],
        url: "https://leonardo.ai",
        domain: "leonardo.ai",
        badge: "New",
        free: true,
        tutorials: [
          { id: "UIrNQZn-8LY", title: "The Problem With AI Design Tools for Print-on-Demand", channel: "Ryan Hogue" },
          { id: "5Q2rFdjZ9ns", title: "How I Create Unique Bestselling Designs", channel: "wtfamievendoing" },
        ],
      },
      {
        slug: "adobe-firefly",
        name: "Adobe Firefly",
        description: "Adobe's AI image and text effect generator. Commercially safe — trained on licensed content.",
        howTo: "Use 'Text to Image' for design concepts and 'Generative Fill' to remove or swap backgrounds. Firefly content is commercially licensed — unlike Midjourney or Stable Diffusion, you can confidently use Firefly outputs on Merch without IP concerns. Export via Creative Cloud or directly to Illustrator.",
        tips: [
          "Use 'Content Type: Graphic' for flat illustration styles suitable for t-shirts",
          "The 'Text Effects' feature creates stunning typographic art — great for quote tees",
          "Firefly is built into Photoshop — use Generative Fill to clean up AI art backgrounds",
          "All Firefly outputs are commercially safe — this is its biggest advantage for sellers",
          "Combine Firefly with Illustrator's Live Trace to convert to clean vectors",
        ],
        url: "https://firefly.adobe.com",
        domain: "firefly.adobe.com",
        badge: null,
        free: true,
        tutorials: [
          { id: "GhFzJxGYro8", title: "We've all been Prompting WRONG! Make Background Removal Easy", channel: "Philip Anders" },
          { id: "5GpRjkvVtZk", title: "I Can't Believe This Background Remover is Actually Free", channel: "Philip Anders" },
        ],
      },
      {
        slug: "midjourney",
        name: "Midjourney",
        description: "Industry-leading AI art generation. Produces the highest-quality, most artistic images for premium merch designs.",
        howTo: "Use /imagine with detailed prompts: style + subject + colors + '--no background --ar 1:1 --q 2'. Download the upscaled version (U1–U4 buttons). Remove background with Adobe Express or remove.bg. Then bring into Canva or Illustrator to add text. Best for premium, artistic niches where design quality is the key differentiator.",
        tips: [
          "Use '--style raw' for more literal, less stylized outputs — better for print designs",
          "Add '--no text, watermark, logo' to keep the image clean",
          "Use '--ar 4:5' for portrait format better suited to t-shirt chest placement",
          "Reference styles: 'flat vector illustration', 'vintage retro poster', 'minimalist line art'",
          "Use the /describe command on a successful design to reverse-engineer the prompt",
        ],
        url: "https://midjourney.com",
        domain: "midjourney.com",
        badge: null,
        free: false,
        tutorials: [
          { id: "mNSKDgc42QE", title: "How I Find Winning Etsy Designs (Then Scale with AI)", channel: "Ryan Hogue" },
          { id: "jk1Ks0j0jNI", title: "Copy This Design Formula, It'll Blow Up Your Sales", channel: "wtfamievendoing" },
        ],
      },
    ],
  },
  {
    category: "AI Writing & Research",
    items: [
      {
        slug: "chatgpt",
        name: "ChatGPT",
        description: "Use GPT-4 to brainstorm niche ideas, write bullet points, generate listing titles, and explore sub-niches fast.",
        howTo: "Use ChatGPT as your Merch research co-pilot. Give it context: 'I sell Amazon Merch by Amazon t-shirts. I need help finding profitable niches.' Then prompt it to generate sub-niches, write Amazon-optimized bullet points, suggest keywords, and draft listing titles. GPT-4o is best for research; the free version works fine for writing.",
        tips: [
          "Prompt: 'Give me 30 specific Amazon Merch sub-niches within [hobby] with low competition'",
          "Prompt: 'Write 2 Amazon Merch bullet points for a [niche] t-shirt. Max 250 chars each.'",
          "Prompt: 'Generate 10 Amazon Merch listing titles for a [niche] t-shirt. Include keywords.'",
          "Ask for sub-niches by persona: 'Who specifically would buy a [topic] shirt? List 15 buyer types.'",
          "Use it to check if a phrase sounds like a trademark: 'Is [phrase] likely trademarked?'",
        ],
        url: "https://chat.openai.com",
        domain: "openai.com",
        badge: null,
        free: true,
        tutorials: [
          { id: "Hxl3Mf_qgXs", title: "This AI Listing Hack Saved Me 100+ Hours", channel: "Philip Anders" },
          { id: "KA2AlulRMeM", title: "Everything You Need to Become a Top 1% POD Seller", channel: "wtfamievendoing" },
        ],
      },
      {
        slug: "claude",
        name: "Claude",
        description: "Anthropic's AI assistant. Excellent for long-form niche research, content strategy, and writing product descriptions.",
        howTo: "Claude excels at processing large amounts of information at once. Paste in a list of 20 niche ideas and ask Claude to rank them by commercial intent, competition level, and seasonal relevance. Then have it write full listings (title + bullets + description) for your top picks. Claude's longer context window makes it better than ChatGPT for deep research sessions.",
        tips: [
          "Paste a full Amazon search results page description and ask Claude to identify gaps",
          "Ask Claude to roleplay as an Amazon shopper in your niche to reveal buyer psychology",
          "Use Claude to write 5 different listing variations and A/B test them",
          "Claude is more cautious about trademarks — use it to flag risky keywords",
          "Ask: 'What questions would someone buying a [niche] gift be asking themselves?'",
        ],
        url: "https://claude.ai",
        domain: "claude.ai",
        badge: "New",
        free: true,
        tutorials: [
          { id: "YOoGbTz6WGY", title: "5 Ways I Find High-Demand POD Niches", channel: "Ryan Hogue" },
          { id: "idO_9amTPLw", title: "100% Free Etsy Trend Finder in 2026?! (MUST SEE!)", channel: "Philip Anders" },
        ],
      },
      {
        slug: "perplexity",
        name: "Perplexity",
        description: "AI search engine that pulls real-time data. Use it to discover trending topics and seasonal niche opportunities.",
        howTo: "Ask Perplexity questions about current trends and emerging niches. Unlike ChatGPT, it searches the web in real time and cites sources — so you get up-to-date information, not training data from 2023. Use it to discover what people are passionate about right now and match that to Amazon Merch product types.",
        tips: [
          "Ask: 'What hobbies and interests are growing in popularity in [current month] 2026?'",
          "Ask: 'What are niche communities on Reddit that are underserved on Amazon?'",
          "Ask: 'What are trending memes, phrases, or movements in [country] right now?'",
          "Use sources it cites (Reddit, Google Trends) to dig deeper into each niche",
          "Ask: 'What seasonal events in [month] drive gift purchases in the US?'",
        ],
        url: "https://perplexity.ai",
        domain: "perplexity.ai",
        badge: "New",
        free: true,
        tutorials: [
          { id: "aS-G9AGeKZM", title: "These Niches Will EXPLODE in 2026 (Get in Early!)", channel: "Brenon Dopp" },
          { id: "QsXD0sx50PE", title: "10 FREE Ways to Find Winning Etsy POD Trends", channel: "Brenon Dopp" },
        ],
      },
    ],
  },
  {
    category: "Design Software",
    items: [
      {
        slug: "canva",
        name: "Canva",
        description: "Beginner-friendly design tool with a large template library and AI-powered Magic Studio features.",
        howTo: "Create a new design at Custom size: 4500×5400px. Search the template library for t-shirt designs in your niche. Customize colors, fonts, and text to match your keyword strategy. Export as PNG with transparent background (Pro feature) or white background (free). Canva's Magic Media can generate AI art directly inside your canvas.",
        tips: [
          "Custom size: 4500 × 5400 pixels — this is Amazon Merch's required resolution",
          "Use 'Background Remover' on Pro to get transparent PNG from any image",
          "Search 'T-shirt' in templates for layouts already proven to work for merch",
          "Magic Write can draft t-shirt slogans and phrases directly in Canva",
          "Brand Kit (Pro) lets you save your niche color palettes for consistent uploads",
        ],
        url: "https://canva.com",
        domain: "canva.com",
        badge: null,
        free: true,
        tutorials: [
          { id: "Ux1X2dPkiGg", title: "How To Create A NEW Top Selling T-Shirt Design", channel: "wtfamievendoing" },
          { id: "T-F9cuPc2t0", title: "The EXACT System To Make Bestselling Etsy Designs", channel: "wtfamievendoing" },
        ],
      },
      {
        slug: "adobe-illustrator",
        name: "Adobe Illustrator",
        description: "Industry standard for vector design. Essential for creating scalable, print-quality artwork.",
        howTo: "Set your artboard to 4500×5400px at 300dpi. Design entirely in vector so your artwork scales perfectly regardless of t-shirt size. Use 'Image Trace' to convert raster AI-generated art into clean, scalable vectors. Export as PNG-24 with transparency enabled. Master the Pen tool and Type tool for custom typography that beats template-based designs.",
        tips: [
          "File → New → Width: 4500px, Height: 5400px, Resolution: 300 PPI",
          "Image Trace: Object → Image Trace → Make (High Fidelity Photo or 16 Colors)",
          "Use Pathfinder panel to combine, subtract, and merge shapes into clean vector art",
          "Type → Create Outlines converts text to paths — no font dependency when sharing files",
          "Export: File → Export → Export As → PNG, Resolution: 300 PPI, Transparent",
        ],
        url: "https://adobe.com/products/illustrator",
        domain: "adobe.com",
        badge: null,
        free: false,
        tutorials: [
          { id: "qHIhLIN8tWo", title: "How I Create Bestselling Designs (Step By Step)", channel: "wtfamievendoing" },
          { id: "idGV4iNFaJI", title: "I Made 3000+ Etsy Designs and Learned THIS", channel: "wtfamievendoing" },
        ],
      },
      {
        slug: "affinity-designer",
        name: "Affinity Designer",
        description: "Professional vector design software. One-time purchase — the best alternative to Illustrator for Merch creators.",
        howTo: "Create a new document at 4500×5400px, 300dpi. Switch between the Vector persona (for shape work) and Pixel persona (for raster effects) in the top toolbar. Use 'Place' to import AI-generated art and trace it. Export using the Export Persona — add a PNG slice with transparent background. One purchase, no subscription, full professional capability.",
        tips: [
          "Document setup: Width 4500px, Height 5400px, DPI 300, Color: RGB",
          "Use the Node tool (equivalent to Illustrator's Direct Selection) to edit vector paths",
          "Vector Flood Fill tool is faster than Illustrator's Paint Bucket for coloring designs",
          "Export Persona: drag a slice over your design, set format to PNG, enable transparency",
          "Affinity Publisher (included in the V2 suite) is great for multi-product mockup sheets",
        ],
        url: "https://affinity.serif.com",
        domain: "affinity.serif.com",
        badge: null,
        free: false,
        tutorials: [
          { id: "CR28xltb5O0", title: "How To Make Better Designs Than 99% Of POD Sellers", channel: "wtfamievendoing" },
          { id: "49CZ0dk9L8U", title: "What I Learned After Posting 10,000 Etsy Listings", channel: "wtfamievendoing" },
        ],
      },
    ],
  },
  {
    category: "Research & Analytics",
    items: [
      {
        slug: "merchradar",
        name: "MerchRadar",
        description: "Find profitable Merch by Amazon niches instantly across 6 marketplaces — US, UK, DE, FR, IT, ES.",
        howTo: "Enter a broad topic (e.g. 'hiking'), select your marketplace and product type, then click Search Amazon. Browse the results to gauge competition — if page 1 has designs with a high BSR number (above 500k in clothing), there's room for new sellers. Switch marketplaces to find underserved niches in the UK or German market before competitors do.",
        tips: [
          "Start broad, then refine: search 'dog' → see what sub-niches appear → search 'golden retriever'",
          "Use 'Bestsellers' sort to see what's already selling — validate before designing",
          "Try the same keyword across US, UK, and DE — competition varies dramatically",
          "Switch product type to Mugs to find niches with less competition than t-shirts",
          "The postal code helper ensures you see accurate local results for non-US markets",
        ],
        url: "/",
        domain: "merchradar.app",
        badge: "Free",
        free: true,
        tutorials: [
          { id: "uPKftr-O_Sg", title: "TOP 5 NICHES 🔥 Print on Demand Niche Research #306", channel: "Ryan Hogue" },
          { id: "rYl0sNqE8gY", title: "The BEST Etsy Hack For Finding Print On Demand Niches", channel: "wtfamievendoing" },
        ],
      },
      {
        slug: "merch-informer",
        name: "Merch Informer",
        description: "Dedicated Merch by Amazon research tool. BSR tracking, competition analysis, and keyword data.",
        howTo: "Use 'Merch Hunter' to search niches and filter by BSR range — target designs with BSR under 500,000 in the Clothing category for active sales. 'Keyword Finder' shows estimated search volumes. 'Competition Checker' grades difficulty from 1–10. Aim for niches with competition score under 5 and multiple designs in BSR 100k–500k range.",
        tips: [
          "BSR under 100,000 in Clothing = strong daily sales; under 500,000 = weekly sales",
          "Filter Merch Hunter results to show only Merch by Amazon seller designs",
          "Use 'Keyword Cloud' to find related terms you can target in your listing",
          "Monitor trends over 30/60/90 days — avoid niches that are suddenly declining",
          "Export niche lists to CSV to track your research and plan your upload schedule",
        ],
        url: "https://merchinformer.com",
        domain: "merchinformer.com",
        badge: null,
        free: false,
        tutorials: [
          { id: "YOoGbTz6WGY", title: "5 Ways I Find High-Demand POD Niches", channel: "Ryan Hogue" },
          { id: "N7y9GCfUPQk", title: "I Studied 100 Etsy Shops with 100K+ Sales", channel: "Brenon Dopp" },
        ],
      },
      {
        slug: "helium-10",
        name: "Helium 10",
        description: "Comprehensive Amazon seller toolkit. Keyword research and trend data useful for Merch niche validation.",
        howTo: "Use 'Cerebro' to reverse-engineer a competitor's top keywords by entering their ASIN. Use 'Magnet' for keyword discovery — enter a broad term and filter by Search Volume (aim for 1,000–50,000/month) and Competing Products (lower is better). 'Trendster' shows 2-year search volume history to confirm evergreen vs seasonal niches.",
        tips: [
          "Find a top-selling Merch design → copy its ASIN → run through Cerebro for keyword intel",
          "Magnet filter: Search Volume > 500, Competing Products < 5,000 = hidden opportunity",
          "Use Chrome Extension to see keyword data directly on Amazon search results pages",
          "Trendster: compare 2 niches side by side to see which has more consistent demand",
          "Free plan gives 2 Cerebro uses and 2 Magnet uses per day — enough for 10+ niches",
        ],
        url: "https://helium10.com",
        domain: "helium10.com",
        badge: null,
        free: false,
        tutorials: [
          { id: "qI4kyCdnDN4", title: "This Niche is Quietly Dominating Print on Demand", channel: "Jay's Way" },
          { id: "MXiJoJQHlAg", title: "These 5 Niches Will Dominate 2026 (Print on Demand)", channel: "Jay's Way" },
        ],
      },
    ],
  },
];

export function getAllTools(): ToolItem[] {
  return tools.flatMap((c) => c.items);
}

export function getToolBySlug(slug: string): ToolItem | undefined {
  return getAllTools().find((t) => t.slug === slug);
}

export function getToolCategory(slug: string): string {
  return tools.find((c) => c.items.some((t) => t.slug === slug))?.category ?? "";
}
