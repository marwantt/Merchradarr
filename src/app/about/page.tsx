import Link from "next/link";

export const metadata = {
  title: "About MerchRadar – Free Amazon Merch Research Tool",
  description: "Learn about MerchRadar, the free tool helping Amazon Merch sellers find profitable niches and grow their Print on Demand business.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-4">
          <Link
            href="/"
            className="inline-block text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl title-font tracking-wide">About</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            MerchRadar is a free research tool built by a Merch by Amazon seller, for Merch by Amazon sellers.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">

        <div className="border border-border p-8 space-y-4">
          <h2 className="text-xs font-medium uppercase tracking-widest">The Problem We Solve</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Most sellers waste hours scrolling through Amazon search results filled with FBA products, trying to spot
            what&apos;s actually a Merch on Demand listing. There was no fast, free, purpose-built tool for this.
            MerchRadar fixes that — one search, filtered results, instant niche signal.
          </p>
        </div>

        <div className="border border-border p-8 space-y-4">
          <h2 className="text-xs font-medium uppercase tracking-widest">What Makes It Different</h2>
          <ul className="text-sm text-muted-foreground space-y-3">
            {[
              ["Merch-Only Results", "Every search filters by the Amazon Merch seller ID. No FBA noise."],
              ["All Product Types", "T-shirts, hoodies, mugs, PopSockets, tote bags, phone cases — the full catalog."],
              ["7 Marketplaces", "US, UK, DE, FR, IT, ES, JP. Find regional gaps before your competitors do."],
              ["Completely Free", "No account, no paywall, no limits. Good tools should be accessible to everyone."],
            ].map(([title, desc]) => (
              <li key={title} className="flex gap-4">
                <span className="text-foreground shrink-0">—</span>
                <span><strong className="text-foreground">{title}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-border p-8 space-y-4">
          <h2 className="text-xs font-medium uppercase tracking-widest">The Creator</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            MerchRadar was built by <strong className="text-foreground">Marouane</strong>, a graphic designer and
            Print on Demand seller with years of hands-on experience in Merch by Amazon. The frustration of manual
            research led to building a tool that does the filtering work automatically.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This is a tool built from real seller experience — not a generic SaaS product. If you have feedback
            or ideas, reach out directly.
          </p>
          <div className="flex gap-6 pt-2">
            <a
              href="https://x.com/imarwant"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              X / Twitter →
            </a>
            <a
              href="https://www.instagram.com/imarwant/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram →
            </a>
          </div>
        </div>

        <div className="text-center border border-dashed border-border p-10 space-y-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Start researching today</p>
          <div className="flex justify-center gap-4">
            <Link
              href="/"
              className="inline-block border border-foreground px-8 py-3 text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
            >
              Open Niche Finder →
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-border px-8 py-3 text-sm uppercase tracking-widest hover:border-foreground transition-colors text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
