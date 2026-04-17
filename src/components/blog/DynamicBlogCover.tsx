import type { BlogPostPreview } from "@/lib/blog";

/* ─── per-post config ─────────────────────────────────────────── */

interface Stat { label: string; value: string }

interface CoverConfig {
  tagline: string;
  stats: Stat[];
  visual: React.ReactNode;
  accent: string;   // tailwind bg- class for the accent strip
  dark?: boolean;   // invert the visual panel
}

/* ─── small reusable visual atoms ────────────────────────────── */

function Bar({ h, label }: { h: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-8 bg-current rounded-sm opacity-80"
        style={{ height: h }}
      />
      <span className="text-[8px] uppercase tracking-widest opacity-50">{label}</span>
    </div>
  );
}

function Step({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center shrink-0">
        <span className="text-[10px] font-bold">{n}</span>
      </div>
      <span className="text-xs opacity-70">{label}</span>
    </div>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <span className="text-[10px] uppercase tracking-widest border border-current px-2 py-0.5 opacity-70 rounded-sm">
      {label}
    </span>
  );
}

/* ─── visual panels per post ─────────────────────────────────── */

const BSRVisual = () => (
  <div className="flex flex-col gap-2 items-start">
    {[
      { bsr: "#1K", label: "Daily sales", w: "w-32" },
      { bsr: "#100K", label: "Weekly sales", w: "w-24" },
      { bsr: "#500K", label: "Monthly", w: "w-16" },
      { bsr: "#1M+", label: "Rare", w: "w-8" },
    ].map(r => (
      <div key={r.bsr} className="flex items-center gap-3">
        <span className="text-[10px] font-mono w-14 opacity-60">{r.bsr}</span>
        <div className={`${r.w} h-2 bg-current opacity-70 rounded-full`} />
        <span className="text-[10px] opacity-50">{r.label}</span>
      </div>
    ))}
  </div>
);

const TierVisual = () => (
  <div className="flex items-end gap-2 h-28">
    {[
      { tier: "10", h: 20 },
      { tier: "25", h: 32 },
      { tier: "100", h: 48 },
      { tier: "500", h: 64 },
      { tier: "1K", h: 80 },
      { tier: "4K", h: 96 },
    ].map(t => (
      <div key={t.tier} className="flex flex-col items-center gap-1">
        <div className="w-7 bg-current rounded-t-sm opacity-80" style={{ height: t.h }} />
        <span className="text-[8px] font-mono opacity-50">{t.tier}</span>
      </div>
    ))}
    <div className="ml-1 text-2xl self-end mb-4 opacity-70">→</div>
  </div>
);

const KeywordVisual = () => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2 border border-current rounded-sm px-3 py-1.5 opacity-70">
      <span className="text-xs">🔍</span>
      <span className="text-xs font-mono">funny cat mom shirt</span>
    </div>
    <div className="flex flex-wrap gap-1.5">
      {["cat lover", "cat mom gift", "funny cat tee", "pet shirt"].map(k => (
        <Pill key={k} label={k} />
      ))}
    </div>
    <div className="flex items-center gap-3 mt-1">
      <div className="h-1.5 bg-current opacity-80 rounded-full" style={{ width: "70%" }} />
      <span className="text-[10px] opacity-50">High volume</span>
    </div>
    <div className="flex items-center gap-3">
      <div className="h-1.5 bg-current opacity-50 rounded-full" style={{ width: "35%" }} />
      <span className="text-[10px] opacity-50">Low comp.</span>
    </div>
  </div>
);

const CalendarVisual = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const hot = [2, 4, 7, 9, 10, 11]; // March, May, Aug, Oct, Nov, Dec
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {months.map((m, i) => (
        <div
          key={m}
          className={`text-[9px] uppercase tracking-widest px-1.5 py-1 text-center rounded-sm border border-current
            ${hot.includes(i) ? "opacity-90 font-bold" : "opacity-30"}`}
        >
          {m}
        </div>
      ))}
    </div>
  );
};

const NicheSearchVisual = () => (
  <div className="flex flex-col gap-3">
    {[
      { niche: "Hiking Dad", bsr: "42K", hot: true },
      { niche: "Cat Mom Gift", bsr: "88K", hot: true },
      { niche: "Nurse Life", bsr: "121K", hot: false },
      { niche: "Retro Gaming", bsr: "203K", hot: false },
    ].map(n => (
      <div key={n.niche} className="flex items-center justify-between gap-4">
        <span className={`text-xs ${n.hot ? "opacity-90 font-semibold" : "opacity-50"}`}>{n.niche}</span>
        <span className="text-[10px] font-mono opacity-60">BSR {n.bsr}</span>
        {n.hot && <span className="text-[8px] border border-current px-1 opacity-70">HOT</span>}
      </div>
    ))}
  </div>
);

const BulletVisual = () => (
  <div className="flex flex-col gap-2.5">
    {[
      { label: "Fit & Style", filled: true },
      { label: "Niche Keywords", filled: true },
      { label: "Buyer Benefits", filled: true },
      { label: "Gift Use Case", filled: true },
      { label: "Call to Action", filled: false },
    ].map((b, i) => (
      <div key={i} className="flex items-center gap-2">
        <div className={`w-4 h-4 border border-current rounded-sm flex items-center justify-center
          ${b.filled ? "bg-current" : ""}`}>
          {b.filled && <span className="text-background text-[8px]">✓</span>}
        </div>
        <div className={`h-1.5 rounded-full bg-current ${b.filled ? "opacity-70" : "opacity-20"}`}
          style={{ width: `${60 + i * 12}px` }} />
        <span className="text-[9px] opacity-50">{b.label}</span>
      </div>
    ))}
  </div>
);

const TrademarkVisual = () => (
  <div className="flex flex-col items-center justify-center gap-3">
    <div className="w-20 h-20 rounded-full border-4 border-current opacity-80 flex items-center justify-center">
      <span className="text-3xl font-bold opacity-90">™</span>
    </div>
    <div className="flex gap-2">
      <Pill label="Registered" />
      <Pill label="Common law" />
    </div>
  </div>
);

const FTCVisual = () => (
  <div className="flex flex-col items-center justify-center gap-2">
    <div className="text-5xl font-bold opacity-90 tracking-tight">$2.5B</div>
    <div className="text-[10px] uppercase tracking-widest opacity-50">FTC Settlement</div>
    <div className="flex gap-2 mt-1">
      <Pill label="2025" />
      <Pill label="Prime" />
    </div>
  </div>
);

const SummerVisual = () => (
  <div className="flex flex-col gap-2">
    {["Beach & Ocean", "Patriotic / 4th July", "Camping & Hiking", "Music Festivals", "Sunflower & Floral"].map((n, i) => (
      <div key={n} className="flex items-center gap-2">
        <span className="text-[10px] opacity-50 w-3">{i + 1}</span>
        <div className="h-1.5 rounded-full bg-current opacity-70"
          style={{ width: `${110 - i * 15}px` }} />
        <span className="text-[10px] opacity-70">{n}</span>
      </div>
    ))}
  </div>
);

const PetVisual = () => (
  <div className="flex flex-col items-center gap-3">
    <div className="text-4xl">🐾</div>
    <div className="grid grid-cols-2 gap-2">
      {["Dog lover", "Cat mom", "Rescue pup", "Vet life"].map(n => (
        <Pill key={n} label={n} />
      ))}
    </div>
    <div className="text-[10px] opacity-50 uppercase tracking-widest">$103B Pet Industry</div>
  </div>
);

const ProfessionVisual = () => (
  <div className="flex flex-col gap-2">
    {[
      { job: "👩‍⚕️ Nurse", tag: "Appreciation" },
      { job: "👩‍🏫 Teacher", tag: "Back to School" },
      { job: "👮 First Responder", tag: "Hero Gifts" },
      { job: "🧑‍💻 Engineer", tag: "Tech Humor" },
    ].map(p => (
      <div key={p.job} className="flex items-center justify-between">
        <span className="text-xs opacity-80">{p.job}</span>
        <Pill label={p.tag} />
      </div>
    ))}
  </div>
);

const TshirtVisual = () => (
  <div className="flex flex-col gap-2">
    {[
      { n: 1, label: "Research niche" },
      { n: 2, label: "Design at 4500×5400px" },
      { n: 3, label: "Export PNG transparent" },
      { n: 4, label: "Write listing copy" },
      { n: 5, label: "Upload & publish" },
    ].map(s => <Step key={s.n} n={s.n} label={s.label} />)}
  </div>
);

const LearnVisual = () => (
  <div className="flex flex-col gap-2">
    {[
      { tool: "YouTube", free: true },
      { tool: "Kittl / Canva", free: true },
      { tool: "Adobe Illustrator", free: false },
      { tool: "MerchRadar", free: true },
    ].map(t => (
      <div key={t.tool} className="flex items-center justify-between gap-3">
        <span className="text-xs opacity-80">{t.tool}</span>
        <span className={`text-[9px] border border-current px-1.5 py-0.5 rounded-sm
          ${t.free ? "opacity-70" : "opacity-40"}`}>
          {t.free ? "Free" : "Paid"}
        </span>
      </div>
    ))}
  </div>
);

const RestrictedVisual = () => (
  <div className="flex flex-col gap-2.5">
    {["Celebrity Names", "Brand Trademarks", "Hate Speech", "Misleading Claims", "Political Figures"].map(k => (
      <div key={k} className="flex items-center gap-2">
        <span className="text-red-500 text-xs font-bold shrink-0">✕</span>
        <span className="text-xs opacity-70 line-through decoration-red-400">{k}</span>
      </div>
    ))}
  </div>
);

const TrendsVisual = () => (
  <div className="flex items-end gap-2 h-28">
    {[
      { label: "Gaming", h: 60 },
      { label: "Mental", h: 80 },
      { label: "Cottage", h: 50 },
      { label: "WFH", h: 70 },
      { label: "Retro", h: 100 },
    ].map(t => <Bar key={t.label} h={t.h} label={t.label} />)}
  </div>
);

const ComfortColorsVisual = () => (
  <div className="flex flex-col gap-3">
    <div className="flex gap-2 flex-wrap">
      {["#E8C9A0", "#A8B5A2", "#C4A882", "#8B9EB0", "#D4927A", "#9CAF88", "#B8A0C8"].map(c => (
        <div key={c} className="w-8 h-8 rounded-full border-2 border-current opacity-80"
          style={{ backgroundColor: c }} />
      ))}
    </div>
    <div className="flex gap-2 mt-1">
      <Pill label="Garment dyed" />
      <Pill label="Heavyweight" />
    </div>
    <div className="text-xs opacity-60">Premium feel · Higher price point</div>
  </div>
);

const HatVisual = () => (
  <div className="flex flex-col items-center gap-3">
    <div className="text-5xl">🧢</div>
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-center">
        <Pill label="Baseball" />
        <div className="h-1.5 bg-current opacity-60 rounded-full w-20" />
      </div>
      <div className="flex justify-between items-center">
        <Pill label="Trucker" />
        <div className="h-1.5 bg-current opacity-40 rounded-full w-14" />
      </div>
    </div>
  </div>
);

/* ─── config map ─────────────────────────────────────────────── */

const configs: Record<string, CoverConfig> = {
  "how-to-read-amazon-bsr-for-merch": {
    tagline: "Decode the ranking system that drives every niche decision",
    stats: [{ label: "BSR < 100K", value: "Daily Sales" }, { label: "BSR < 500K", value: "Weekly" }, { label: "BSR > 1M", value: "Rare" }],
    visual: <BSRVisual />,
    accent: "bg-purple-500",
  },
  "scaling-amazon-merch-tier-10-to-tier-4000": {
    tagline: "From 10 upload slots to 4,000 — a proven path",
    stats: [{ label: "Starting tier", value: "10 slots" }, { label: "Goal", value: "Tier 4000" }, { label: "Timeline", value: "90 days" }],
    visual: <TierVisual />,
    accent: "bg-green-500",
  },
  "keyword-research-guide": {
    tagline: "Find the exact words buyers type before they purchase",
    stats: [{ label: "Search intent", value: "Critical" }, { label: "Title weight", value: "Highest" }, { label: "Backend", value: "+25% reach" }],
    visual: <KeywordVisual />,
    accent: "bg-green-500",
  },
  "amazon-merch-keyword-optimization-listings": {
    tagline: "Rank higher on Amazon with a perfectly optimized listing",
    stats: [{ label: "A9 Algorithm", value: "Title first" }, { label: "Bullets", value: "250 chars" }, { label: "Backend", value: "249 bytes" }],
    visual: <KeywordVisual />,
    accent: "bg-purple-500",
  },
  "seasonal-merch-upload-calendar-strategy": {
    tagline: "Upload 8 weeks early. Rank before the rush hits",
    stats: [{ label: "Peak months", value: "Oct–Dec" }, { label: "Lead time", value: "8 weeks" }, { label: "Seasons", value: "12/year" }],
    visual: <CalendarVisual />,
    accent: "bg-green-500",
  },
  "how-to-find-profitable-merch-niches-2026": {
    tagline: "The exact research method top sellers use in 2026",
    stats: [{ label: "BSR target", value: "< 300K" }, { label: "Designs", value: "< 20 live" }, { label: "Keyword vol.", value: "1K–50K" }],
    visual: <NicheSearchVisual />,
    accent: "bg-green-500",
  },
  "amazon-merch-bullet-points-guidelines": {
    tagline: "5 bullet points that convert browsers into buyers",
    stats: [{ label: "Max length", value: "250 chars" }, { label: "Bullets", value: "5 total" }, { label: "No promo", value: "language" }],
    visual: <BulletVisual />,
    accent: "bg-red-500",
  },
  "amazon-merch-trademark-brand-infringement": {
    tagline: "One rejected design can flag your whole account",
    stats: [{ label: "USPTO search", value: "Required" }, { label: "Risk", value: "Account ban" }, { label: "Safe bet", value: "Generic terms" }],
    visual: <TrademarkVisual />,
    accent: "bg-red-500",
  },
  "amazon-ftc-settlement-2025": {
    tagline: "The $2.5B FTC case — what it means for Amazon sellers",
    stats: [{ label: "Settlement", value: "$2.5B" }, { label: "Plaintiff", value: "FTC" }, { label: "Impact", value: "Platform wide" }],
    visual: <FTCVisual />,
    accent: "bg-red-500",
  },
  "amazon_restricted_keywords_compliance1": {
    tagline: "These keywords will get your listing rejected instantly",
    stats: [{ label: "Risk", value: "Rejection" }, { label: "Repeat", value: "Account flag" }, { label: "Check", value: "Before upload" }],
    visual: <RestrictedVisual />,
    accent: "bg-red-500",
  },
  "best-merch-niches-summer-2026": {
    tagline: "The niches selling right now — before the peak hits",
    stats: [{ label: "Season", value: "Summer 2026" }, { label: "Top niche", value: "Beach & Ocean" }, { label: "Upload by", value: "May 1" }],
    visual: <SummerVisual />,
    accent: "bg-blue-500",
  },
  "pet-lover-merch-niche-guide": {
    tagline: "The $103B pet market — and how to own it on Merch",
    stats: [{ label: "Market size", value: "$103B" }, { label: "Top buyer", value: "Gift givers" }, { label: "Evergreen", value: "Year round" }],
    visual: <PetVisual />,
    accent: "bg-blue-500",
  },
  "profession-specific-merch-nurses-teachers": {
    tagline: "Profession niches sell gifts, not just t-shirts",
    stats: [{ label: "Gift season", value: "May & Dec" }, { label: "Top niche", value: "Nurses" }, { label: "Buyer", value: "Gift givers" }],
    visual: <ProfessionVisual />,
    accent: "bg-blue-500",
  },
  "amazon-merch-trends-2024": {
    tagline: "The 10 design trends that dominated 2024",
    stats: [{ label: "Top trend", value: "Retro" }, { label: "Rising fast", value: "Mental health" }, { label: "Evergreen", value: "Minimalist" }],
    visual: <TrendsVisual />,
    accent: "bg-blue-500",
  },
  "designing-first-amazon-merch-tshirt-guide": {
    tagline: "From blank canvas to live Amazon listing in 5 steps",
    stats: [{ label: "Canvas size", value: "4500×5400px" }, { label: "Format", value: "PNG" }, { label: "DPI", value: "300" }],
    visual: <TshirtVisual />,
    accent: "bg-purple-500",
  },
  "best-ways-learn-merch-amazon-design": {
    tagline: "The fastest path from zero to print-ready designs",
    stats: [{ label: "Free tools", value: "Kittl, Canva" }, { label: "Best resource", value: "YouTube" }, { label: "Time to skill", value: "2–4 weeks" }],
    visual: <LearnVisual />,
    accent: "bg-purple-500",
  },
  "amazon-merch-comfort-colors-guide": {
    tagline: "Premium garment-dyed shirts — higher price, higher royalty",
    stats: [{ label: "Price point", value: "$27–$35" }, { label: "Colors", value: "60+" }, { label: "Style", value: "Vintage wash" }],
    visual: <ComfortColorsVisual />,
    accent: "bg-green-500",
  },
  "amazon-merch-hat-niche-ideas": {
    tagline: "Hats on Merch: a low-competition product type to target now",
    stats: [{ label: "Types", value: "Baseball + Trucker" }, { label: "Competition", value: "Low" }, { label: "Royalty", value: "$4–$8" }],
    visual: <HatVisual />,
    accent: "bg-green-500",
  },
};

/* ─── category colour map ─────────────────────────────────────── */

const categoryColors: Record<string, string> = {
  News: "bg-red-500",
  Compliance: "bg-red-500",
  Strategy: "bg-green-600",
  Tutorial: "bg-purple-500",
  Trends: "bg-blue-500",
};

/* ─── main component ─────────────────────────────────────────── */

interface Props {
  slug: string;
  post: Pick<BlogPostPreview, "title" | "category" | "publishedAt" | "readingTime">;
}

export function DynamicBlogCover({ slug, post }: Props) {
  const config = configs[slug];
  const accentClass = config?.accent ?? categoryColors[post.category?.title] ?? "bg-foreground";

  if (!config) return null;

  return (
    <div className="not-prose w-full border border-border overflow-hidden bg-background mb-12">
      {/* accent strip */}
      <div className={`${accentClass} h-1 w-full`} />

      <div className="grid md:grid-cols-[1fr_auto] divide-y md:divide-y-0 md:divide-x divide-border">
        {/* LEFT — meta + stats */}
        <div className="p-7 sm:p-10 flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase tracking-[0.2em] font-semibold px-2 py-0.5 text-white rounded-sm ${accentClass}`}>
                {post.category?.title ?? "Guide"}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {post.readingTime} min read
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold leading-snug tracking-tight max-w-lg">
              {post.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              {config.tagline}
            </p>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6">
            {config.stats.map(s => (
              <div key={s.label}>
                <p className="text-lg font-semibold tabular-nums">{s.value}</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — unique visual */}
        <div className="bg-muted/20 p-7 flex items-center justify-center min-w-[220px]">
          <div className="text-foreground">
            {config.visual}
          </div>
        </div>
      </div>
    </div>
  );
}
