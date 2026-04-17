import Link from "next/link";

export const metadata = {
  title: "MerchRadar Academy – Learn Merch by Amazon from Scratch",
  description: "Free learning resources for Merch by Amazon sellers. Step-by-step guides, niche research tutorials, keyword strategies, and design tips for Print on Demand success.",
};

const modules = [
  {
    number: "01",
    title: "Getting Started",
    description: "Everything you need to know before uploading your first design.",
    lessons: [
      { title: "What is Merch by Amazon?", href: "/guide" },
      { title: "How to Use MerchRadar", href: "/guide" },
      { title: "Understanding Amazon Merch Products", href: "/guide" },
    ],
  },
  {
    number: "02",
    title: "Niche Research",
    description: "Find profitable niches before spending time on designs.",
    lessons: [
      { title: "Keyword Research Basics", href: "/blog/keyword-research-guide" },
      { title: "Reading Amazon Search Results", href: "/guide" },
      { title: "Spotting Trends Early", href: "/blog/amazon-merch-trends-2024" },
    ],
  },
  {
    number: "03",
    title: "Compliance & Rules",
    description: "Stay on the right side of Amazon's content policies.",
    lessons: [
      { title: "Restricted Keywords Guide", href: "/blog/amazon-restricted-keywords-merch" },
      { title: "Amazon FTC & Policy Updates", href: "/blog/amazon-ftc-settlement-2025" },
    ],
  },
  {
    number: "04",
    title: "Design & Growth",
    description: "Design principles and scaling strategies for serious sellers.",
    lessons: [
      { title: "Best Ways to Learn Merch Design", href: "/blog/best-ways-learn-merch-amazon-design" },
      { title: "Scaling Your Merch Catalog", href: "/blog" },
    ],
  },
];

export default function AcademyPage() {
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
          <h1 className="text-5xl title-font tracking-wide">Academy</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Free structured learning for Merch by Amazon sellers. From your first upload to scaling a full catalog.
          </p>
        </div>
      </div>

      {/* Modules */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        {modules.map((module) => (
          <div key={module.number} className="border border-border">
            {/* Module header */}
            <div className="border-b border-border px-8 py-6 flex items-start gap-6">
              <span className="text-3xl font-medium text-muted-foreground/40 tabular-nums leading-none mt-1">
                {module.number}
              </span>
              <div>
                <h2 className="text-xl font-medium uppercase tracking-wider">{module.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
              </div>
            </div>

            {/* Lessons */}
            <ul>
              {module.lessons.map((lesson, i) => (
                <li key={i} className="border-b border-border last:border-b-0">
                  <Link
                    href={lesson.href}
                    className="flex items-center justify-between px-8 py-4 hover:bg-muted/30 transition-colors group"
                  >
                    <span className="text-sm uppercase tracking-wider">{lesson.title}</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider group-hover:text-foreground transition-colors">
                      Read →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="border border-dashed border-border p-10 text-center space-y-4">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Ready to research?</p>
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
