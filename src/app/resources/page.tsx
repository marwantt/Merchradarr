import Link from "next/link";
import type { Metadata } from "next";
import { designChannels, merchChannels, assetSites, communities } from "@/lib/resources-data";
import type { YTChannel, AssetSite, Community } from "@/lib/resources-data";
import { fetchChannelAvatars } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Resources for Merch by Amazon Creators – MerchRadar",
  description: "Curated YouTube channels, free design assets, fonts, mockups, and communities for Merch by Amazon and Print on Demand creators.",
};

// YouTube SVG icon
function YTIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function ChannelCard({ ch, avatarUrl }: { ch: YTChannel; avatarUrl?: string }) {
  return (
    <a
      href={ch.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col border border-border hover:border-foreground/40 transition-all bg-background overflow-hidden"
    >
      {/* Cover / thumbnail */}
      <div className="relative w-full overflow-hidden bg-muted" style={{ aspectRatio: "16/9" }}>
        {ch.previewVideoId ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://img.youtube.com/vi/${ch.previewVideoId}/mqdefault.jpg`}
            alt={`${ch.name} preview`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/60">
            <YTIcon className="w-10 h-10 text-foreground/20" />
          </div>
        )}

        {/* Hover play overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
            <YTIcon className="w-5 h-5 text-red-600" />
          </div>
        </div>

        {/* Channel avatar circle */}
        {avatarUrl && (
          <div className="absolute bottom-0 translate-y-1/2 left-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              alt={`${ch.name} avatar`}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full border-2 border-background object-cover shadow-md"
            />
          </div>
        )}
      </div>

      {/* Body — extra top padding when avatar is present to avoid overlap */}
      <div className={`flex flex-col flex-1 p-5 gap-3 ${avatarUrl ? "pt-8" : ""}`}>
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold group-hover:text-foreground/70 transition-colors">
            {ch.name}
          </h3>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono shrink-0">
            {ch.handle}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
          {ch.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-border">
          {ch.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-widest border border-border px-2 py-0.5 text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

function AssetCard({ site }: { site: AssetSite }) {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col border border-border hover:border-foreground/40 transition-all bg-background"
    >
      {/* Top */}
      <div className="border-b border-border bg-muted/20 px-5 py-4 flex items-center justify-between">
        <div className="w-7 h-7 border border-border bg-background flex items-center justify-center overflow-hidden shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://www.google.com/s2/favicons?domain=${site.domain}&sz=32`}
            alt={site.name}
            width={18}
            height={18}
          />
        </div>
        <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 border font-medium ${
          site.free
            ? "border-border text-muted-foreground"
            : "border-foreground/30 text-foreground"
        }`}>
          {site.free ? "Free" : "Paid"}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-sm font-semibold group-hover:text-foreground/70 transition-colors">
          {site.name}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
          {site.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-border">
          {site.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-widest border border-border px-2 py-0.5 text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

function CommunityCard({ c }: { c: Community }) {
  return (
    <a
      href={c.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start justify-between gap-4 border border-border hover:border-foreground/40 transition-all p-6"
    >
      <div className="space-y-2 flex-1">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold group-hover:text-foreground/70 transition-colors">{c.name}</h3>
          <span className="text-[10px] uppercase tracking-widest border border-border px-2 py-0.5 text-muted-foreground">
            {c.platform}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{c.description}</p>
      </div>
      <div className="shrink-0 text-right space-y-1">
        <p className="text-sm font-medium tabular-nums">{c.members}</p>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Members</p>
      </div>
    </a>
  );
}

function SectionHeader({ title, count, description }: { title: string; count: number; description?: string }) {
  return (
    <div className="border-b border-border pb-4 space-y-1">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">{title}</h2>
        <span className="text-xs uppercase tracking-widest text-muted-foreground">{count} total</span>
      </div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  );
}

export default async function ResourcesPage() {
  const allChannels = [...designChannels, ...merchChannels];
  const avatars = await fetchChannelAvatars(allChannels.map((c) => c.handle));

  const totalChannels = designChannels.length + merchChannels.length;
  const totalAssets = assetSites.length;
  const totalCommunities = communities.length;

  return (
    <main className="min-h-screen bg-background">

      {/* Hero */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <Link href="/" className="inline-block text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-6">
            ← Back to Home
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-3">
              <h1 className="text-5xl title-font tracking-wide">Resources</h1>
              <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                The YouTube channels, free assets, and communities that serious Merch by Amazon creators rely on.
                Curated from years of experience in the POD space.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-muted-foreground shrink-0">
              <div className="text-center">
                <p className="text-2xl font-medium text-foreground tabular-nums">{totalChannels}</p>
                <p>Channels</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-medium text-foreground tabular-nums">{totalAssets}</p>
                <p>Asset Sites</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-medium text-foreground tabular-nums">{totalCommunities}</p>
                <p>Communities</p>
              </div>
            </div>
          </div>

          {/* Jump links */}
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border">
            {[
              { label: "Design & Effects", href: "#design-effects" },
              { label: "Merch & POD Strategy", href: "#merch-strategy" },
              { label: "Free Assets", href: "#free-assets" },
              { label: "Communities", href: "#communities" },
            ].map(item => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-widest border border-border px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">

        {/* Design & Effects Channels */}
        <section id="design-effects" className="space-y-5">
          <SectionHeader
            title="Design & Visual Effects"
            count={designChannels.length}
            description="Master Photoshop, textures, and visual effects that make merch designs stand out."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {designChannels.map(ch => <ChannelCard key={ch.handle} ch={ch} avatarUrl={avatars[ch.handle]} />)}
          </div>
        </section>

        {/* Merch & POD Channels */}
        <section id="merch-strategy" className="space-y-5">
          <SectionHeader
            title="Merch & POD Strategy"
            count={merchChannels.length}
            description="Niche research, AI tools, listing strategy, and scaling from beginner to full-time seller."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {merchChannels.map(ch => <ChannelCard key={ch.handle} ch={ch} avatarUrl={avatars[ch.handle]} />)}
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground shrink-0">Free Assets & Sites</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Free Assets */}
        <section id="free-assets" className="space-y-5">
          <SectionHeader
            title="Fonts, Vectors & Mockups"
            count={assetSites.length}
            description="Free (and best-value paid) resources for building professional merch designs."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {assetSites.map(site => <AssetCard key={site.name} site={site} />)}
          </div>
        </section>

        {/* Communities */}
        <section id="communities" className="space-y-5">
          <SectionHeader
            title="Communities"
            count={communities.length}
            description="Where Merch sellers discuss niches, strategy, and the latest Amazon policy changes."
          />
          <div className="space-y-3">
            {communities.map(c => <CommunityCard key={c.name} c={c} />)}
          </div>
        </section>

        {/* CTA */}
        <div className="border border-dashed border-border p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest">Put it into practice</p>
            <p className="text-xs text-muted-foreground mt-1">Use MerchRadar to validate the niches you discover from these resources.</p>
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
