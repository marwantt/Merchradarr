import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Tools for Merch by Amazon Creators – MerchRadar",
  description: "Curated list of the best AI tools, design software, and research tools for Merch by Amazon and Print on Demand creators.",
};

const tools = [
  {
    category: "AI Design",
    items: [
      {
        name: "Ideogram",
        description: "AI image generator that excels at text inside designs — perfect for quote tees and typography-based merch.",
        url: "https://ideogram.ai",
        domain: "ideogram.ai",
        badge: "New",
        free: true,
      },
      {
        name: "Kittl",
        description: "Design platform built for POD creators. Templates, fonts, and AI generation tailored for t-shirts and merch.",
        url: "https://kittl.com",
        domain: "kittl.com",
        badge: "Popular",
        free: true,
      },
      {
        name: "Leonardo.ai",
        description: "High-quality AI art generation with fine-tuned models. Great for detailed, print-ready artwork.",
        url: "https://leonardo.ai",
        domain: "leonardo.ai",
        badge: "New",
        free: true,
      },
      {
        name: "Adobe Firefly",
        description: "Adobe's AI image and text effect generator. Commercially safe — trained on licensed content.",
        url: "https://firefly.adobe.com",
        domain: "firefly.adobe.com",
        badge: null,
        free: true,
      },
      {
        name: "Midjourney",
        description: "Industry-leading AI art generation. Produces high-quality, artistic images for premium merch designs.",
        url: "https://midjourney.com",
        domain: "midjourney.com",
        badge: null,
        free: false,
      },
    ],
  },
  {
    category: "AI Writing & Research",
    items: [
      {
        name: "ChatGPT",
        description: "Use GPT-4 to brainstorm niche ideas, write bullet points, generate listing titles, and explore sub-niches fast.",
        url: "https://chat.openai.com",
        domain: "openai.com",
        badge: null,
        free: true,
      },
      {
        name: "Claude",
        description: "Anthropic's AI assistant. Excellent for long-form niche research, content strategy, and writing product descriptions.",
        url: "https://claude.ai",
        domain: "claude.ai",
        badge: "New",
        free: true,
      },
      {
        name: "Perplexity",
        description: "AI search engine that pulls real-time data. Use it to discover trending topics and seasonal niche opportunities.",
        url: "https://perplexity.ai",
        domain: "perplexity.ai",
        badge: "New",
        free: true,
      },
    ],
  },
  {
    category: "Design Software",
    items: [
      {
        name: "Canva",
        description: "Beginner-friendly design tool with a large template library and AI-powered Magic Studio features.",
        url: "https://canva.com",
        domain: "canva.com",
        badge: null,
        free: true,
      },
      {
        name: "Adobe Illustrator",
        description: "Industry standard for vector design. Essential for creating scalable, print-quality artwork.",
        url: "https://adobe.com/illustrator",
        domain: "adobe.com",
        badge: null,
        free: false,
      },
      {
        name: "Affinity Designer",
        description: "Professional vector design software. One-time purchase — a popular alternative to Illustrator.",
        url: "https://affinity.serif.com",
        domain: "affinity.serif.com",
        badge: null,
        free: false,
      },
    ],
  },
  {
    category: "Research & Analytics",
    items: [
      {
        name: "MerchRadar",
        description: "Find profitable Merch by Amazon niches instantly across 6 marketplaces — US, UK, DE, FR, IT, ES.",
        url: "/",
        domain: "merchradar.app",
        badge: "Free",
        free: true,
      },
      {
        name: "Merch Informer",
        description: "Dedicated Merch by Amazon research tool. BSR tracking, competition analysis, and keyword data.",
        url: "https://merchinformer.com",
        domain: "merchinformer.com",
        badge: null,
        free: false,
      },
      {
        name: "Helium 10",
        description: "Comprehensive Amazon seller toolkit. Keyword research and trend data useful for Merch niche validation.",
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
            The best AI tools, design software, and research platforms for Merch by Amazon creators.
            Updated regularly as new tools launch.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground uppercase tracking-widest pt-2">
            <span>{tools.reduce((n, c) => n + c.items.length, 0)} Tools</span>
            <span>·</span>
            <span>{tools.length} Categories</span>
            <span>·</span>
            <span>Regularly Updated</span>
          </div>
        </div>
      </div>

      {/* Tools */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-14">
        {tools.map((category) => (
          <section key={category.category} className="space-y-4">

            <div className="border-b border-border pb-3">
              <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">{category.category}</h2>
            </div>

            <div className="space-y-3">
              {category.items.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target={tool.url.startsWith("http") ? "_blank" : undefined}
                  rel={tool.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-4 p-5 border border-border hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <ToolIcon domain={tool.domain} name={tool.name} />
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">{tool.name}</span>
                        {tool.badge && (
                          <span className={`text-xs px-2 py-0.5 font-medium ${badgeStyles[tool.badge]}`}>
                            {tool.badge}
                          </span>
                        )}
                        {!tool.badge && (
                          <span className="text-xs text-muted-foreground uppercase tracking-widest">
                            {tool.free ? "Free" : "Paid"}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                    </div>
                  </div>
                  <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0">→</span>
                </a>
              ))}
            </div>
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
