import Link from "next/link";
import type { Metadata } from "next";
import { tools } from "@/lib/tools-data";

export const metadata: Metadata = {
  title: "Best Tools for Merch by Amazon Creators – MerchRadar",
  description: "Curated list of the best AI tools, design software, and research tools for Merch by Amazon and Print on Demand creators.",
};

const badgeStyles: Record<string, string> = {
  New: "bg-primary text-primary-foreground",
  Popular: "border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
  Free: "border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300",
};

export default function ToolsPage() {
  const totalTools = tools.reduce((n, c) => n + c.items.length, 0);

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
            Each tool includes a step-by-step guide and video tutorials.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground uppercase tracking-widest pt-2">
            <span>{totalTools} Tools</span>
            <span>·</span>
            <span>{tools.length} Categories</span>
            <span>·</span>
            <span>Tutorials Included</span>
          </div>
        </div>
      </div>

      {/* Tools */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-14">
        {tools.map((category) => (
          <section key={category.category} className="space-y-4">

            <div className="border-b border-border pb-3">
              <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">
                {category.category}
              </h2>
            </div>

            <div className="space-y-3">
              {category.items.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group flex items-center justify-between gap-4 p-5 border border-border hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Favicon icon */}
                    <div className="w-9 h-9 border border-border flex items-center justify-center shrink-0 bg-muted overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64`}
                        alt={`${tool.name} logo`}
                        width={28}
                        height={28}
                      />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                          {tool.name}
                        </span>
                        {tool.badge ? (
                          <span className={`text-xs px-2 py-0.5 font-medium ${badgeStyles[tool.badge]}`}>
                            {tool.badge}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground uppercase tracking-widest">
                            {tool.free ? "Free" : "Paid"}
                          </span>
                        )}
                        {/* Tutorial badge */}
                        {tool.tutorials.length > 0 && (
                          <span className="text-xs px-2 py-0.5 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500" />
                            {tool.tutorials.length} video{tool.tutorials.length > 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-xs text-primary font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      View guide →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

          </section>
        ))}

        {/* CTA */}
        <div className="border border-primary p-8 text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Start Researching</p>
          <h3 className="text-2xl font-medium">Find your next niche</h3>
          <p className="text-sm text-muted-foreground">
            Use MerchRadar to search Merch by Amazon niches across 6 marketplaces — free.
          </p>
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
