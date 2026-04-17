import Link from "next/link";
import type { Metadata } from "next";
import { tools } from "@/lib/tools-data";
import type { ToolItem } from "@/lib/tools-data";

export const metadata: Metadata = {
  title: "Best Tools for Merch by Amazon Creators – MerchRadar",
  description: "Curated list of the best AI tools, design software, and research tools for Merch by Amazon and Print on Demand creators.",
};

function BadgeChip({ badge, free }: { badge: string | null; free: boolean }) {
  if (badge === "New")
    return <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-foreground text-background font-semibold">New</span>;
  if (badge === "Popular")
    return <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 border border-foreground/50 text-foreground font-semibold">Popular</span>;
  if (badge === "Free" || free)
    return <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 border border-border text-muted-foreground">Free</span>;
  return <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 border border-border text-muted-foreground">Paid</span>;
}

function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col border border-border hover:border-foreground/40 transition-all bg-background"
    >
      {/* Icon area */}
      <div className="relative border-b border-border bg-muted/30 p-6 flex items-center justify-between">
        <div className="w-14 h-14 border border-border bg-background flex items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tool.iconUrl ?? `https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64`}
            alt={`${tool.name} logo`}
            width={36}
            height={36}
          />
        </div>

        {/* Tutorial badge */}
        {tool.tutorials.length > 0 && (
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
            {tool.tutorials.length} video{tool.tutorials.length > 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold group-hover:text-foreground/70 transition-colors leading-tight">
            {tool.name}
          </h3>
          <BadgeChip badge={tool.badge} free={tool.free} />
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-3">
          {tool.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{tool.domain}</span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
            Guide →
          </span>
        </div>
      </div>
    </Link>
  );
}

function FeaturedToolCard({ tool }: { tool: ToolItem }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group col-span-full border border-foreground/20 hover:border-foreground/50 transition-all bg-background"
    >
      <div className="grid md:grid-cols-[auto_1fr_auto] items-center divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Icon */}
        <div className="p-8 flex items-center justify-center bg-muted/20">
          <div className="w-16 h-16 border border-border bg-background flex items-center justify-center overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tool.iconUrl ?? `https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64`}
              alt={`${tool.name} logo`}
              width={40}
              height={40}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-2">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold group-hover:text-foreground/70 transition-colors">{tool.name}</h3>
            <BadgeChip badge={tool.badge} free={tool.free} />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-0.5">
              This Site
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{tool.description}</p>
        </div>

        {/* CTA */}
        <div className="p-8 flex flex-col items-center justify-center gap-2">
          {tool.tutorials.length > 0 && (
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
              {tool.tutorials.length} video{tool.tutorials.length > 1 ? "s" : ""}
            </span>
          )}
          <span className="text-xs uppercase tracking-widest text-foreground group-hover:text-foreground/70 transition-colors">
            View Guide →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ToolsPage() {
  const totalTools = tools.reduce((n, c) => n + c.items.length, 0);
  const totalVideos = tools.reduce((n, c) => n + c.items.reduce((m, t) => m + t.tutorials.length, 0), 0);

  return (
    <main className="min-h-screen bg-background">

      {/* Hero */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <Link
            href="/"
            className="inline-block text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            ← MerchRadar
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">Curated</p>
              <h1 className="text-5xl title-font tracking-wide">Creator Tools</h1>
              <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                The best AI tools, design software, and research platforms for Merch by Amazon creators.
                Every tool includes a step-by-step guide and video tutorials.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-muted-foreground shrink-0">
              <div className="text-center">
                <p className="text-2xl font-medium text-foreground tabular-nums">{totalTools}</p>
                <p>Tools</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-medium text-foreground tabular-nums">{tools.length}</p>
                <p>Categories</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-medium text-foreground tabular-nums">{totalVideos}</p>
                <p>Videos</p>
              </div>
            </div>
          </div>

          {/* Category quick-jump */}
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
            {tools.map(cat => (
              <a
                key={cat.category}
                href={`#${cat.category.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs uppercase tracking-widest border border-border px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                {cat.category} <span className="text-muted-foreground/50">({cat.items.length})</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Tool sections */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {tools.map((category) => {
          // Pull featured tool (free, this site) out separately
          const featured = category.items.find(t => t.domain === "merchradar.app");
          const regular = category.items.filter(t => t.domain !== "merchradar.app");

          return (
            <section
              key={category.category}
              id={category.category.toLowerCase().replace(/\s+/g, "-")}
              className="space-y-5"
            >
              {/* Category header */}
              <div className="flex items-baseline justify-between border-b border-border pb-4">
                <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">
                  {category.category}
                </h2>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {category.items.length} tool{category.items.length > 1 ? "s" : ""}
                </span>
              </div>

              {/* Featured card (MerchRadar if present) */}
              {featured && (
                <div className="grid grid-cols-1 gap-4 mb-2">
                  <FeaturedToolCard tool={featured} />
                </div>
              )}

              {/* Square grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {regular.map(tool => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <div className="border border-dashed border-border p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest">Start Researching</p>
            <p className="text-xs text-muted-foreground mt-1">Use MerchRadar to search niches across 7 marketplaces — free.</p>
          </div>
          <Link
            href="/"
            className="shrink-0 border border-foreground px-8 py-3 text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
          >
            Open MerchRadar →
          </Link>
        </div>
      </div>
    </main>
  );
}
