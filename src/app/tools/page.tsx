import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Tools for Merch by Amazon Creators – MerchRadar",
  description: "Curated list of the best AI tools, design software, and research tools for Merch by Amazon and Print on Demand creators.",
};

interface Tutorial {
  id: string;
  title: string;
  channel: string;
}

interface ToolItem {
  name: string;
  description: string;
  howTo: string;
  url: string;
  domain: string;
  badge: string | null;
  free: boolean;
}

interface ToolCategory {
  category: string;
  tutorials: Tutorial[];
  items: ToolItem[];
}

const tools: ToolCategory[] = [
  {
    category: "AI Design",
    tutorials: [
      { id: "OiVW0hWY4p4", title: "Using Ideogram This Way Feels Illegal", channel: "Philip Anders" },
      { id: "TwakRB_PusA", title: "Re-designing My Subscribers T-Shirts w/ Kittl", channel: "Philip Anders" },
    ],
    items: [
      {
        name: "Ideogram",
        description: "AI image generator that excels at text inside designs — perfect for quote tees and typography-based merch.",
        howTo: "Type your niche + design concept (e.g. 'minimalist cat mom quote tee, white background, black text, PNG'). Use the 'Design' style and download at highest resolution. Ideogram handles text better than any other AI tool.",
        url: "https://ideogram.ai",
        domain: "ideogram.ai",
        badge: "New",
        free: true,
      },
      {
        name: "Kittl",
        description: "Design platform built for POD creators. Templates, fonts, and AI generation tailored for t-shirts and merch.",
        howTo: "Start from a template in the T-shirt category, customize colors and text to fit your niche, then export as PNG (4500×5400px transparent background). Kittl's font library alone is worth the free plan.",
        url: "https://kittl.com",
        domain: "kittl.com",
        badge: "Popular",
        free: true,
      },
      {
        name: "Leonardo.ai",
        description: "High-quality AI art generation with fine-tuned models. Great for detailed, print-ready artwork.",
        howTo: "Use the 'Illustration' or 'Graphic Design' models. Enable transparent background in advanced settings. Generate at 1024px+ and upscale before exporting. Best for detailed nature, animal, and artistic designs.",
        url: "https://leonardo.ai",
        domain: "leonardo.ai",
        badge: "New",
        free: true,
      },
      {
        name: "Adobe Firefly",
        description: "Adobe's AI image and text effect generator. Commercially safe — trained on licensed content.",
        howTo: "Use 'Text to Image' for concepts and 'Generative Fill' to remove backgrounds. Firefly content is commercially licensed, so you can use outputs on Merch without IP concerns. Export via Creative Cloud.",
        url: "https://firefly.adobe.com",
        domain: "firefly.adobe.com",
        badge: null,
        free: true,
      },
      {
        name: "Midjourney",
        description: "Industry-leading AI art generation. Produces high-quality, artistic images for premium merch designs.",
        howTo: "Use /imagine with detailed prompts: style + subject + colors + '--no background --ar 1:1 --q 2'. Download the upscaled version. Remove background with Adobe Express or remove.bg before uploading to Merch.",
        url: "https://midjourney.com",
        domain: "midjourney.com",
        badge: null,
        free: false,
      },
    ],
  },
  {
    category: "AI Writing & Research",
    tutorials: [
      { id: "Hxl3Mf_qgXs", title: "This AI Listing Hack Saved Me 100+ Hours", channel: "Philip Anders" },
      { id: "YOoGbTz6WGY", title: "5 Ways I Find High-Demand POD Niches", channel: "Ryan Hogue" },
    ],
    items: [
      {
        name: "ChatGPT",
        description: "Use GPT-4 to brainstorm niche ideas, write bullet points, generate listing titles, and explore sub-niches fast.",
        howTo: "Prompt: 'Give me 20 Amazon Merch sub-niches within [topic] that are specific enough to have low competition but high buyer intent.' Then: 'Write 2 Amazon Merch bullet points for a [niche] t-shirt. Focus on who wears it and when.'",
        url: "https://chat.openai.com",
        domain: "openai.com",
        badge: null,
        free: true,
      },
      {
        name: "Claude",
        description: "Anthropic's AI assistant. Excellent for long-form niche research, content strategy, and writing product descriptions.",
        howTo: "Share a list of 10 keyword ideas and ask Claude to rank them by commercial intent, suggest sub-niches, and write a complete Merch listing (title + 2 bullets + description). Claude handles long context better than most.",
        url: "https://claude.ai",
        domain: "claude.ai",
        badge: "New",
        free: true,
      },
      {
        name: "Perplexity",
        description: "AI search engine that pulls real-time data. Use it to discover trending topics and seasonal niche opportunities.",
        howTo: "Ask: 'What are the trending [month] topics people are passionate about in the US?' or 'What are growing hobbies in 2026 that don't have much merch yet?' Perplexity cites sources so you can verify trends.",
        url: "https://perplexity.ai",
        domain: "perplexity.ai",
        badge: "New",
        free: true,
      },
    ],
  },
  {
    category: "Design Software",
    tutorials: [
      { id: "Ux1X2dPkiGg", title: "How To Create A NEW Top Selling T-Shirt Design", channel: "wtfamievendoing" },
      { id: "qHIhLIN8tWo", title: "How I Create Bestselling Designs (Step By Step)", channel: "wtfamievendoing" },
    ],
    items: [
      {
        name: "Canva",
        description: "Beginner-friendly design tool with a large template library and AI-powered Magic Studio features.",
        howTo: "Create a new design → Custom size: 4500×5400px → Design for print. Use 'Background Remover' on Pro plan. Export as PNG with transparent background. Canva's Magic Media can generate design elements directly inside your canvas.",
        url: "https://canva.com",
        domain: "canva.com",
        badge: null,
        free: true,
      },
      {
        name: "Adobe Illustrator",
        description: "Industry standard for vector design. Essential for creating scalable, print-quality artwork.",
        howTo: "Set artboard to 4500×5400px at 300dpi. Design in vector so it scales perfectly. Use 'Image Trace' to convert raster AI art to clean vectors. Export as PNG-24 with transparency. Master the Pen tool for custom typography.",
        url: "https://adobe.com/illustrator",
        domain: "adobe.com",
        badge: null,
        free: false,
      },
      {
        name: "Affinity Designer",
        description: "Professional vector design software. One-time purchase — a popular alternative to Illustrator.",
        howTo: "Create document at 4500×5400px, 300dpi. Switch between Vector and Pixel personas for mixed workflows. Export using Export Persona → PNG with transparency. Great for complex illustrations at a fraction of Adobe's cost.",
        url: "https://affinity.serif.com",
        domain: "affinity.serif.com",
        badge: null,
        free: false,
      },
    ],
  },
  {
    category: "Research & Analytics",
    tutorials: [
      { id: "uPKftr-O_Sg", title: "TOP 5 NICHES 🔥 Print on Demand Niche Research #306", channel: "Ryan Hogue" },
      { id: "qI4kyCdnDN4", title: "This Niche is Quietly Dominating Print on Demand", channel: "Jay's Way" },
    ],
    items: [
      {
        name: "MerchRadar",
        description: "Find profitable Merch by Amazon niches instantly across 6 marketplaces — US, UK, DE, FR, IT, ES.",
        howTo: "Enter a broad topic (e.g. 'hiking'), select your marketplace and product type, then click Search Amazon. Browse the results to gauge competition — if page 1 has designs with high BSR (low sales rank number), the niche is hot. Use sort options to see newest or bestsellers.",
        url: "/",
        domain: "merchradar.app",
        badge: "Free",
        free: true,
      },
      {
        name: "Merch Informer",
        description: "Dedicated Merch by Amazon research tool. BSR tracking, competition analysis, and keyword data.",
        howTo: "Use the 'Merch Hunter' to search niches and filter by BSR range (aim for designs with BSR under 500,000 for clothing). 'Keyword Finder' shows search volume estimates. 'Competition Checker' grades how hard a niche is to break into.",
        url: "https://merchinformer.com",
        domain: "merchinformer.com",
        badge: null,
        free: false,
      },
      {
        name: "Helium 10",
        description: "Comprehensive Amazon seller toolkit. Keyword research and trend data useful for Merch niche validation.",
        howTo: "Use 'Cerebro' to reverse-engineer a competitor's keywords, or 'Magnet' for keyword discovery. Enter a broad niche term and filter by Search Volume and Competing Products ratio. High volume + low competing products = opportunity.",
        url: "https://helium10.com",
        domain: "helium10.com",
        badge: null,
        free: false,
      },
    ],
  },
];

const badgeStyles: Record<string, string> = {
  New: "bg-primary text-primary-foreground",
  Popular: "border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
  Free: "border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300",
};

function ToolIcon({ domain, name }: { domain: string; name: string }) {
  return (
    <div className="w-9 h-9 border border-border flex items-center justify-center shrink-0 bg-muted overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
        alt={`${name} logo`}
        width={28}
        height={28}
      />
    </div>
  );
}

function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${tutorial.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 p-3 border border-border hover:border-red-400 dark:hover:border-red-600 transition-colors"
    >
      {/* Thumbnail */}
      <div className="relative shrink-0 overflow-hidden" style={{ width: 96, height: 54 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://img.youtube.com/vi/${tutorial.id}/mqdefault.jpg`}
          alt={tutorial.title}
          className="w-full h-full object-cover"
        />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
          <div className="w-6 h-6 bg-red-600 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3 ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium leading-snug line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
          {tutorial.title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{tutorial.channel}</p>
      </div>
    </a>
  );
}

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* Hero */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-5">
          <Link
            href="/"
            className="inline-block text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            ← MerchRadar
          </Link>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Curated</p>
            <h1 className="text-5xl title-font tracking-wide">Creator Tools</h1>
          </div>
          <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
            The best AI tools, design software, and research platforms for Merch by Amazon creators —
            with tutorials from top POD educators.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground uppercase tracking-widest pt-2">
            <span>{tools.reduce((n, c) => n + c.items.length, 0)} Tools</span>
            <span>·</span>
            <span>{tools.length} Categories</span>
            <span>·</span>
            <span>Video Tutorials Included</span>
          </div>
        </div>
      </div>

      {/* Tools */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        {tools.map((category) => (
          <section key={category.category} className="space-y-6">

            <div className="border-b border-border pb-3">
              <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">{category.category}</h2>
            </div>

            {/* Tool cards */}
            <div className="space-y-3">
              {category.items.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target={tool.url.startsWith("http") ? "_blank" : undefined}
                  rel={tool.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group block p-5 border border-border hover:border-primary transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <ToolIcon domain={tool.domain} name={tool.name} />
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">{tool.name}</span>
                        {tool.badge ? (
                          <span className={`text-xs px-2 py-0.5 font-medium ${badgeStyles[tool.badge]}`}>
                            {tool.badge}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground uppercase tracking-widest">
                            {tool.free ? "Free" : "Paid"}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                      {/* How to use */}
                      <div className="mt-2 pt-2 border-t border-border/60">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1">How to use for Merch</p>
                        <p className="text-xs text-foreground/70 leading-relaxed">{tool.howTo}</p>
                      </div>
                    </div>
                    <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1">→</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Tutorial videos */}
            {category.tutorials.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
                  Video Tutorials
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {category.tutorials.map((t) => (
                    <TutorialCard key={t.id} tutorial={t} />
                  ))}
                </div>
              </div>
            )}

          </section>
        ))}

        {/* CTA */}
        <div className="border border-primary p-8 text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Start Researching</p>
          <h3 className="text-2xl font-medium">Find your next niche</h3>
          <p className="text-sm text-muted-foreground">Use MerchRadar to search Merch by Amazon niches across 6 marketplaces — free.</p>
          <Link
            href="/"
            className="inline-block mt-2 px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity"
          >
            Open MerchRadar
          </Link>
        </div>
      </div>
    </main>
  );
}
