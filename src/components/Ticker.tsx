import Link from "next/link"
import { updates } from "@/data/updates"

const typeLabels: Record<string, string> = {
  blog: "Blog",
  tool: "Tool",
  tutorial: "Guide",
  news: "News",
  product: "New",
  video: "Video",
}

export default function Ticker() {
  const items = updates.slice(0, 10)

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-8 flex items-center border-b border-border bg-background overflow-hidden">
      {/* Fixed label */}
      <div className="shrink-0 flex items-center px-4 h-full border-r border-border bg-background relative z-10">
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-primary">Updates</span>
      </div>

      {/* Scrolling strip */}
      <div className="flex-1 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2.5 px-8">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-1.5 py-px">
                {typeLabels[item.type]}
              </span>
              {item.external ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] hover:text-primary transition-colors"
                >
                  {item.title}
                </a>
              ) : (
                <Link href={item.url} className="text-[11px] hover:text-primary transition-colors">
                  {item.title}
                </Link>
              )}
              <span className="text-border">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
