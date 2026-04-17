import Link from "next/link";

export const metadata = {
  title: "How to Use MerchRadar – Step by Step Guide for Merch by Amazon Sellers",
  description: "Learn how to use MerchRadar to find profitable Merch by Amazon niches across t-shirts, hoodies, sweatshirts, mugs, tote bags, phone cases, and more. Step by step guide for POD and Amazon Merch sellers.",
};

export default function GuidePage() {
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
          <h1 className="text-5xl title-font tracking-wide">Guide</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            How to use MerchRadar to find profitable Merch by Amazon niches — step by step.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">

        <section className="border border-border p-8 space-y-4">
          <h2 className="text-xs font-medium uppercase tracking-widest">Why MerchRadar?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Traditional keyword research for <strong className="text-foreground">Amazon Merch</strong> can be slow and frustrating. Most sellers
            waste hours searching directly on Amazon or using expensive tools. MerchRadar solves this
            by giving you instant access to filtered results that show only{" "}
            <strong className="text-foreground">Merch on Demand products</strong>.
          </p>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex gap-3"><span className="text-foreground">—</span> No more scrolling through random FBA products.</li>
            <li className="flex gap-3"><span className="text-foreground">—</span> Direct access to novelty and graphic designs.</li>
            <li className="flex gap-3"><span className="text-foreground">—</span> Search across 7 marketplaces: US, UK, DE, FR, IT, ES, JP.</li>
            <li className="flex gap-3"><span className="text-foreground">—</span> Quickly validate niches before you spend time designing.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-xs font-medium uppercase tracking-widest border-b border-border pb-4">Step by Step</h2>

          {[
            {
              step: "01",
              title: "Enter your niche keyword",
              body: 'Type your keyword into the search box. Examples: "funny cat", "soccer dad", "retro gaming", "motivational nurse". Be specific — long-tail keywords surface less competition.',
            },
            {
              step: "02",
              title: "Choose your marketplace",
              body: "MerchRadar supports Amazon US, UK, Germany, France, Italy, Spain, and Japan. Test a niche across regions — an idea thriving in the US may be untapped in Germany.",
            },
            {
              step: "03",
              title: "Pick your product type",
              body: "Select from all Amazon Merch on Demand products: T-Shirts, Long Sleeve, V-Neck, Tank Top, Pullover Hoodie, Zip Hoodie, Sweatshirt, Mug, PopSocket, Tote Bag, Throw Pillow, and Phone Case.",
            },
            {
              step: "04",
              title: "Choose a sort order",
              body: 'Use "Best Sellers" to see what actually sells. Use "Newest Arrivals" to catch fresh listings early. "Featured" works well for general exploration.',
            },
            {
              step: "05",
              title: "Click Search Amazon",
              body: "MerchRadar builds a filtered Amazon URL with the Merch seller ID and product category — opening only Merch on Demand results in a new tab.",
            },
          ].map(({ step, title, body }) => (
            <div key={step} className="flex gap-6 border-b border-border pb-6 last:border-b-0">
              <span className="text-2xl font-medium text-muted-foreground/30 tabular-nums leading-none shrink-0 mt-1">
                {step}
              </span>
              <div className="space-y-2">
                <h3 className="text-sm font-medium uppercase tracking-wider">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="border border-border p-8 space-y-4">
          <h2 className="text-xs font-medium uppercase tracking-widest">Best Practices</h2>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex gap-3"><span className="text-foreground">—</span> Combine keywords with occasions: &ldquo;Christmas nurse sweatshirt&rdquo;.</li>
            <li className="flex gap-3"><span className="text-foreground">—</span> Check long-tail keywords like &ldquo;retro gaming cat t-shirt&rdquo; for low-competition niches.</li>
            <li className="flex gap-3"><span className="text-foreground">—</span> Use MerchRadar daily to catch new trends before the market saturates.</li>
            <li className="flex gap-3"><span className="text-foreground">—</span> Research the same niche across multiple product types — a popular t-shirt topic often works for mugs too.</li>
          </ul>
        </section>

        <div className="text-center border border-dashed border-border p-10 space-y-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Ready to start?</p>
          <Link
            href="/"
            className="inline-block border border-foreground px-8 py-3 text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
          >
            Open Niche Finder →
          </Link>
        </div>
      </div>
    </main>
  );
}
