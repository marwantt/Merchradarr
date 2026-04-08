import Link from "next/link";
import SearchTool from "@/components/SearchTool";
import WhatsNew from "@/components/WhatsNew";
import { getChannelVideos } from "@/lib/youtube";

const YOUTUBE_CHANNELS = [
  "@RyanHoguePassiveIncome",
  "@PhilipAnders",
];

export default async function Home() {
  // Fetch latest videos from fav channels at build time
  const videoResults = await Promise.allSettled(
    YOUTUBE_CHANNELS.map(handle => getChannelVideos(handle, 3))
  );
  const youtubeVideos = videoResults.flatMap(r => r.status === "fulfilled" ? r.value : []);

  return (
    <>
      {/* Fixed top-right notification bell */}
      <WhatsNew youtubeVideos={youtubeVideos} />

    <div className="min-h-screen flex items-center justify-center p-4 py-16">
      <main className="w-full max-w-xl flex flex-col gap-10 items-stretch">

        <SearchTool />

        {/* Academy Section */}
        <div className="border border-border">
          <div className="border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">MerchRadar Academy</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">Free</span>
            </div>
            <Link href="/academy" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              View All →
            </Link>
          </div>
          <div className="divide-y divide-border">
            {[
              { track: "01", title: "Getting Started", desc: "Launch your Merch by Amazon journey", href: "/academy" },
              { track: "02", title: "Niche Research", desc: "Find profitable niches before anyone else", href: "/academy" },
              { track: "03", title: "Design & Compliance", desc: "Create designs that sell and stay safe", href: "/academy" },
              { track: "04", title: "Scaling", desc: "Go from a few designs to a full catalog", href: "/academy" },
            ].map((item) => (
              <Link
                key={item.track}
                href={item.href}
                className="flex items-center justify-between px-6 py-4 hover:bg-accent group transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-muted-foreground">{item.track}</span>
                  <div>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="border border-border">
          <div className="border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Creator Tools</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">New Releases</span>
            </div>
            <Link href="/tools" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              View All →
            </Link>
          </div>
          <div className="divide-y divide-border">
            {[
              { badge: "New", name: "Ideogram", desc: "AI image generation with text — perfect for quote tees", href: "https://ideogram.ai", domain: "ideogram.ai" },
              { badge: "New", name: "Claude", desc: "AI assistant for niche research and listing copy", href: "https://claude.ai", domain: "claude.ai" },
              { badge: "Popular", name: "Kittl", desc: "POD-focused design platform with AI features", href: "https://kittl.com", domain: "kittl.com" },
              { badge: "New", name: "Perplexity", desc: "Real-time AI search for trending niche discovery", href: "https://perplexity.ai", domain: "perplexity.ai" },
            ].map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-6 py-4 hover:bg-accent group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 border border-border flex items-center justify-center shrink-0 bg-muted overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=32`} alt={tool.name} width={20} height={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">{tool.name}</p>
                      <span className={`text-xs px-1.5 py-0.5 font-medium ${tool.badge === "New" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{tool.desc}</p>
                  </div>
                </div>
                <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-6 border-t">
          <nav className="flex justify-center gap-10 text-xs text-muted-foreground uppercase tracking-widest">
            <Link href="/guide" className="hover:text-foreground transition-colors">Guide</Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <Link href="/tools" className="hover:text-foreground transition-colors">Tools</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </nav>
        </div>

      </main>
    </div>
    </>
  );
}
