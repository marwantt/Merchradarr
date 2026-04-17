import Link from "next/link";

export const metadata = {
  title: "MerchRadar Academy – Learn Merch by Amazon from Scratch",
  description: "Free learning resources for Merch by Amazon sellers. Step-by-step guides, niche research tutorials, keyword strategies, and design tips for Print on Demand success.",
};

type Lesson = {
  title: string;
  href: string;
  type: "article" | "guide" | "tool";
};

type Module = {
  number: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  lessons: Lesson[];
};

const modules: Module[] = [
  {
    number: "01",
    title: "Getting Started",
    level: "Beginner",
    description: "Everything you need to know before uploading your first design.",
    lessons: [
      { title: "What is Merch by Amazon?", href: "/guide", type: "guide" },
      { title: "How to Use MerchRadar", href: "/guide", type: "tool" },
      { title: "Understanding Amazon Merch Products", href: "/guide", type: "guide" },
    ],
  },
  {
    number: "02",
    title: "Niche Research",
    level: "Beginner",
    description: "Find profitable niches before spending time on designs.",
    lessons: [
      { title: "Keyword Research Basics", href: "/blog/keyword-research-guide", type: "article" },
      { title: "Reading Amazon Search Results", href: "/guide", type: "guide" },
      { title: "Spotting Trends Early", href: "/blog/amazon-merch-trends-2024", type: "article" },
    ],
  },
  {
    number: "03",
    title: "Compliance & Rules",
    level: "Intermediate",
    description: "Stay on the right side of Amazon's content policies.",
    lessons: [
      { title: "Restricted Keywords Guide", href: "/blog/amazon-restricted-keywords-merch", type: "article" },
      { title: "Amazon FTC & Policy Updates", href: "/blog/amazon-ftc-settlement-2025", type: "article" },
    ],
  },
  {
    number: "04",
    title: "Design & Growth",
    level: "Advanced",
    description: "Design principles and scaling strategies for serious sellers.",
    lessons: [
      { title: "Best Ways to Learn Merch Design", href: "/blog/best-ways-learn-merch-amazon-design", type: "article" },
      { title: "Scaling Your Merch Catalog", href: "/blog", type: "article" },
    ],
  },
];

const levelStyle: Record<string, string> = {
  Beginner:     "text-muted-foreground border-border",
  Intermediate: "text-foreground border-foreground/40",
  Advanced:     "text-foreground border-foreground",
};

const typeLabel: Record<string, string> = {
  article: "Article",
  guide:   "Guide",
  tool:    "Tool",
};

const totalLessons = modules.reduce((n, m) => n + m.lessons.length, 0);

export default function AcademyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <Link
            href="/"
            className="inline-block text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            ← Back to Home
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-3">
              <h1 className="text-5xl title-font tracking-wide">Academy</h1>
              <p className="text-sm text-muted-foreground max-w-xl">
                Free structured learning for Merch by Amazon sellers. From your first upload to scaling a full catalog.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-muted-foreground shrink-0">
              <div className="text-center">
                <p className="text-2xl font-medium text-foreground tabular-nums">{modules.length}</p>
                <p>Modules</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-medium text-foreground tabular-nums">{totalLessons}</p>
                <p>Lessons</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-medium text-foreground">$0</p>
                <p>Cost</p>
              </div>
            </div>
          </div>

          {/* Level legend */}
          <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-border text-xs uppercase tracking-widest text-muted-foreground">
            <span>Difficulty:</span>
            {["Beginner", "Intermediate", "Advanced"].map(l => (
              <span key={l} className={`border px-2.5 py-1 ${levelStyle[l]}`}>{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-4">
        {modules.map((module) => (
          <div key={module.number} className="border border-border group/module">

            {/* Module header */}
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 px-8 py-6 border-b border-border bg-muted/10">
              <span className="text-4xl font-medium text-muted-foreground/20 tabular-nums leading-none w-12 shrink-0">
                {module.number}
              </span>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-lg font-medium uppercase tracking-wider">{module.title}</h2>
                </div>
                <p className="text-xs text-muted-foreground">{module.description}</p>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className={`text-xs uppercase tracking-widest border px-2.5 py-1 ${levelStyle[module.level]}`}>
                  {module.level}
                </span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {module.lessons.length} lessons
                </span>
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
                    <div className="flex items-center gap-4">
                      {/* Lesson dot */}
                      <span className="w-2 h-2 rounded-full border border-border group-hover:border-foreground group-hover:bg-foreground transition-all shrink-0" />
                      <span className="text-sm">{lesson.title}</span>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-xs uppercase tracking-widest text-muted-foreground border border-border px-2 py-0.5 hidden sm:block">
                        {typeLabel[lesson.type]}
                      </span>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                        →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-6 pb-12">
        <div className="border border-dashed border-border p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest">Ready to research?</p>
            <p className="text-xs text-muted-foreground mt-1">Use MerchRadar to validate niches from your lessons.</p>
          </div>
          <Link
            href="/"
            className="shrink-0 border border-foreground px-8 py-3 text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
          >
            Open Niche Finder →
          </Link>
        </div>
      </div>
    </main>
  );
}
