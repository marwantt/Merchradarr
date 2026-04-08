import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MerchRadar Academy – Learn Merch by Amazon From Scratch",
  description: "Free tutorials and guides to master Merch by Amazon. Learn niche research, design, keyword strategy, and compliance — step by step.",
};

const tracks = [
  {
    id: "01",
    title: "Getting Started",
    level: "Beginner",
    description: "Everything you need to launch your Merch by Amazon journey.",
    lessons: [
      {
        title: "What is Merch by Amazon?",
        description: "Understand the platform, how royalties work, and what makes a profitable listing.",
        duration: "5 min",
        href: "/guide",
        available: true,
      },
      {
        title: "How to Use MerchRadar",
        description: "Find profitable niches in seconds using the MerchRadar search tool.",
        duration: "4 min",
        href: "/guide",
        available: true,
      },
      {
        title: "Setting Up Your Merch Account",
        description: "Step-by-step walkthrough of applying and getting accepted into Merch by Amazon.",
        duration: "8 min",
        href: null,
        available: false,
      },
    ],
  },
  {
    id: "02",
    title: "Niche Research",
    level: "Intermediate",
    description: "Find low-competition, high-demand niches before anyone else.",
    lessons: [
      {
        title: "Complete Keyword Research Guide",
        description: "Master the art of finding profitable keywords for your Amazon Merch designs.",
        duration: "12 min",
        href: "/blog/keyword-research-guide",
        available: true,
      },
      {
        title: "Top Merch Trends to Watch",
        description: "Discover the hottest design trends and profitable niches dominating Amazon Merch.",
        duration: "8 min",
        href: "/blog/amazon-merch-trends-2024",
        available: true,
      },
      {
        title: "How to Validate a Niche",
        description: "Use data signals to confirm demand before investing time in a design.",
        duration: "10 min",
        href: null,
        available: false,
      },
    ],
  },
  {
    id: "03",
    title: "Design & Compliance",
    level: "Intermediate",
    description: "Create designs that sell and stay within Amazon's policies.",
    lessons: [
      {
        title: "Best Ways to Learn Merch Design",
        description: "Master quality standards, content policies, and essential design skills for POD.",
        duration: "8 min",
        href: "/blog/best-ways-learn-merch-amazon-design",
        available: true,
      },
      {
        title: "Amazon Restricted Keywords",
        description: "Avoid account strikes by understanding what words are banned and why.",
        duration: "6 min",
        href: "/blog/amazon-restricted-keywords-merch",
        available: true,
      },
      {
        title: "FTC & Seller Compliance 2025",
        description: "What the latest Amazon FTC settlement means for Merch sellers.",
        duration: "5 min",
        href: "/blog/amazon-ftc-settlement-2025",
        available: true,
      },
    ],
  },
  {
    id: "04",
    title: "Scaling Your Business",
    level: "Advanced",
    description: "Go from a few designs to a full catalog with repeatable systems.",
    lessons: [
      {
        title: "Building a Niche Portfolio",
        description: "How to diversify across niches to create stable, growing royalty income.",
        duration: "15 min",
        href: null,
        available: false,
      },
      {
        title: "Multi-Marketplace Strategy",
        description: "Expand to UK, DE, FR, IT, and ES — how to adapt niches per region.",
        duration: "10 min",
        href: null,
        available: false,
      },
      {
        title: "Automating Your Research Workflow",
        description: "Tools and systems to find 10x more niches in the same amount of time.",
        duration: "12 min",
        href: null,
        available: false,
      },
    ],
  },
];

const levelColors: Record<string, string> = {
  Beginner: "text-green-700 dark:text-green-400 border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950",
  Intermediate: "text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950",
  Advanced: "text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950",
};

export default function AcademyPage() {
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
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Free Learning Hub</p>
            <h1 className="text-5xl title-font tracking-wide">MerchRadar Academy</h1>
          </div>
          <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
            Learn Merch by Amazon from scratch — niche research, design, compliance, and scaling.
            Structured tracks. No fluff.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground uppercase tracking-widest pt-2">
            <span>{tracks.reduce((n, t) => n + t.lessons.length, 0)} Lessons</span>
            <span>·</span>
            <span>{tracks.length} Tracks</span>
            <span>·</span>
            <span>100% Free</span>
          </div>
        </div>
      </div>

      {/* Tracks */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        {tracks.map((track) => (
          <section key={track.id} className="space-y-6">

            {/* Track Header */}
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground">TRACK {track.id}</span>
                  <span className={`text-xs px-2 py-0.5 border font-medium ${levelColors[track.level]}`}>
                    {track.level}
                  </span>
                </div>
                <h2 className="text-2xl font-medium">{track.title}</h2>
                <p className="text-sm text-muted-foreground">{track.description}</p>
              </div>
            </div>

            {/* Lessons */}
            <div className="space-y-3">
              {track.lessons.map((lesson, index) => (
                <div key={index}>
                  {lesson.available && lesson.href ? (
                    <Link
                      href={lesson.href}
                      className="group flex items-start justify-between gap-4 p-5 border border-border hover:border-primary transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-xs font-mono text-muted-foreground mt-0.5 shrink-0">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="space-y-1">
                          <p className="text-sm font-medium group-hover:text-primary transition-colors">{lesson.title}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 pt-0.5">
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        <span className="text-xs text-primary">→</span>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-start justify-between gap-4 p-5 border border-border border-dashed opacity-50">
                      <div className="flex items-start gap-4">
                        <span className="text-xs font-mono text-muted-foreground mt-0.5 shrink-0">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{lesson.title}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 pt-0.5">
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        <span className="text-xs uppercase tracking-widest text-muted-foreground">Soon</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <div className="border border-primary p-8 space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Start Researching</p>
          <h3 className="text-2xl font-medium">Ready to find your next niche?</h3>
          <p className="text-sm text-muted-foreground">Use MerchRadar to search Amazon Merch niches across 6 marketplaces — free.</p>
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
