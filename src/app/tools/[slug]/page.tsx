import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllTools, getToolBySlug, getToolCategory } from "@/lib/tools-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found – MerchRadar" };
  return {
    title: `How to Use ${tool.name} for Amazon Merch – MerchRadar`,
    description: tool.description,
  };
}

export default async function ToolTutorialPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const category = getToolCategory(slug);

  return (
    <main className="min-h-screen bg-background">
      {/* Header nav */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="/tools"
            className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Creator Tools
          </Link>
          <a
            href={tool.url}
            target={tool.url.startsWith("http") ? "_blank" : undefined}
            rel={tool.url.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity"
          >
            Visit {tool.name} →
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">

        {/* Hero */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border border-border flex items-center justify-center bg-muted overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tool.iconUrl ?? `https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64`}
                alt={`${tool.name} logo`}
                width={32}
                height={32}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold">{tool.name}</h1>
                {tool.badge && (
                  <span className="text-xs px-2 py-0.5 bg-primary text-primary-foreground font-medium">
                    {tool.badge}
                  </span>
                )}
                <span className="text-xs text-muted-foreground uppercase tracking-widest border border-border px-2 py-0.5">
                  {tool.free ? "Free" : "Paid"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">{category}</p>
            </div>
          </div>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">{tool.description}</p>
        </div>

        {/* How to use */}
        <section className="space-y-4">
          <div className="border-l-2 border-primary pl-4">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">How to use for Merch</h2>
          </div>
          <p className="text-sm leading-relaxed text-foreground/80">{tool.howTo}</p>
        </section>

        {/* Tips */}
        <section className="space-y-4">
          <div className="border-l-2 border-border pl-4">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">Pro Tips</h2>
          </div>
          <ul className="space-y-2">
            {tool.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                <span className="shrink-0 w-5 h-5 flex items-center justify-center border border-border text-[10px] font-bold text-muted-foreground mt-0.5">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* Video tutorials */}
        {tool.tutorials.length > 0 && (
          <section className="space-y-5">
            <div className="border-l-2 border-red-500 pl-4">
              <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-red-600 dark:text-red-400">
                Video Tutorials
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Learn directly from top Amazon Merch creators
              </p>
            </div>

            <div className="space-y-6">
              {tool.tutorials.map((vid) => (
                <div key={vid.id} className="space-y-2">
                  {/* Embed */}
                  <div
                    className="w-full border border-border overflow-hidden bg-black"
                    style={{ paddingTop: "56.25%", position: "relative" }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${vid.id}`}
                      title={vid.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "none",
                      }}
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">{vid.title}</p>
                      <p className="text-xs text-muted-foreground">{vid.channel}</p>
                    </div>
                    <a
                      href={`https://www.youtube.com/watch?v=${vid.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-xs text-red-600 dark:text-red-400 hover:underline uppercase tracking-wider"
                    >
                      Watch on YouTube →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="border border-border p-8 space-y-4 text-center">
          <p className="text-sm font-medium">Ready to try {tool.name}?</p>
          <p className="text-xs text-muted-foreground">
            {tool.free ? "Free to start — no credit card required." : "Paid tool — worth the investment for serious sellers."}
          </p>
          <a
            href={tool.url}
            target={tool.url.startsWith("http") ? "_blank" : undefined}
            rel={tool.url.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-block px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity"
          >
            Open {tool.name} →
          </a>
          <p className="text-xs text-muted-foreground pt-2">
            <Link href="/tools" className="hover:text-foreground transition-colors">
              ← Back to all tools
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
