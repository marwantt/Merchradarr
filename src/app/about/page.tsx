import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About MerchRadar — Free Amazon Merch Research Platform",
  description: "MerchRadar is a free Amazon Merch by Amazon research platform built by a seller, for sellers. Niche finder, learning center, creator tools, and more.",
};

const features = [
  {
    label: "Niche Finder",
    description: "Search Amazon Merch across 6 marketplaces — US, UK, DE, FR, IT, ES. Filter by product type and sort by BSR, newest, or bestsellers.",
    tag: "Core Tool",
  },
  {
    label: "Postal Code Helper",
    description: "Non-US marketplaces require a local address to show accurate Merch results. Pick from 8 verified cities per country and copy the postal code instantly.",
    tag: "Research",
  },
  {
    label: "Learning Center",
    description: "18 in-depth articles across Strategy, Tutorial, Trends, and Compliance — written specifically for Amazon Merch sellers at every level.",
    tag: "Blog",
  },
  {
    label: "Creator Tools",
    description: "Curated directory of 13 tools for Merch sellers — AI design tools, research platforms, and writing assistants — each with a step-by-step Merch guide and embedded tutorial videos.",
    tag: "Tools",
  },
  {
    label: "What's New",
    description: "Stay current with the latest Amazon Merch announcements, new features, and video uploads from top POD creators — all in one feed.",
    tag: "Feed",
  },
  {
    label: "Chrome Extension",
    description: "See BSR, ASIN, brand, product age, niche signals, and sales data on any Amazon product page — inline, without leaving the page.",
    tag: "Coming Soon",
  },
];

const marketplaces = [
  { flag: "🇺🇸", name: "Amazon US", domain: "amazon.com" },
  { flag: "🇬🇧", name: "Amazon UK", domain: "amazon.co.uk" },
  { flag: "🇩🇪", name: "Amazon DE", domain: "amazon.de" },
  { flag: "🇫🇷", name: "Amazon FR", domain: "amazon.fr" },
  { flag: "🇮🇹", name: "Amazon IT", domain: "amazon.it" },
  { flag: "🇪🇸", name: "Amazon ES", domain: "amazon.es" },
];

const stats = [
  { value: "6", label: "Marketplaces" },
  { value: "18+", label: "Articles" },
  { value: "13", label: "Creator Tools" },
  { value: "100%", label: "Free" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* Hero */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-6">
          <Link href="/" className="inline-block text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            ← MerchRadar
          </Link>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">About</p>
            <h1 className="text-5xl title-font tracking-wide">Merch Radar</h1>
          </div>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            A free research platform for Amazon Merch by Amazon sellers. Built to make niche research faster,
            smarter, and accessible to every creator — from day one to tier 4000.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-0 border border-border mt-6">
            {stats.map((s, i) => (
              <div key={i} className="flex-1 min-w-[80px] px-6 py-4 border-r border-border last:border-r-0 text-center">
                <div className="text-2xl font-bold text-primary">{s.value}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">

        {/* Story */}
        <section className="space-y-5">
          <div className="border-b border-border pb-3">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">The Story</h2>
          </div>
          <div className="space-y-4 text-sm text-foreground/80 leading-relaxed max-w-2xl">
            <p>
              MerchRadar was built by <strong className="text-foreground">Marouane</strong>, a graphic designer
              and Print on Demand seller who got tired of spending hours on manual Amazon research.
              The problem was simple: finding a profitable niche meant opening Amazon, typing keywords,
              scrolling through hundreds of FBA products mixed with Merch designs, and trying to guess
              what was actually selling.
            </p>
            <p>
              So I built a tool to filter all of that away &mdash; showing only Merch by Amazon results,
              across every marketplace, for every product type. No logins. No subscriptions. No fluff.
            </p>
            <p>
              Over time, MerchRadar grew into a full research platform: a blog with expert guides,
              a curated tool directory with video tutorials, a live feed of Merch announcements,
              and a Chrome extension that puts key data directly on the Amazon product page.
            </p>
            <p>
              Everything here is built by a Merch seller, for Merch sellers.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="space-y-5">
          <div className="border-b border-border pb-3">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">What&apos;s Inside</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
            {features.map((f) => (
              <div key={f.label} className="bg-background p-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{f.label}</span>
                  <span className={`text-xs px-2 py-0.5 font-medium ${
                    f.tag === "Coming Soon"
                      ? "border border-border text-muted-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}>
                    {f.tag}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Marketplaces */}
        <section className="space-y-5">
          <div className="border-b border-border pb-3">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">Supported Marketplaces</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {marketplaces.map((m) => (
              <div key={m.name} className="border border-border p-4 space-y-1">
                <div className="text-xl">{m.flag}</div>
                <div className="text-sm font-semibold">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.domain}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Each marketplace includes verified postal codes for 8 cities to ensure accurate local results.
          </p>
        </section>

        {/* Built for */}
        <section className="space-y-5">
          <div className="border-b border-border pb-3">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">Built For</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              { who: "New Merch Sellers", what: "Learn the basics, find your first niche, avoid common mistakes with our guides." },
              { who: "Experienced POD Creators", what: "Validate niches faster, explore new marketplaces, and stay ahead of trends." },
              { who: "Graphic Designers", what: "Check what designs are selling before you spend time creating them." },
              { who: "POD Entrepreneurs", what: "Research niches at scale across multiple categories and 6 global markets." },
            ].map((item) => (
              <div key={item.who} className="border-l-2 border-primary pl-4 py-1 space-y-1">
                <div className="font-semibold text-xs uppercase tracking-wider">{item.who}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{item.what}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section className="space-y-5">
          <div className="border-b border-border pb-3">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">Principles</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {[
              { title: "Free, always", body: "The core research tool is and will stay free. No paywalls on the features that matter most." },
              { title: "Simple by design", body: "No dashboards. No accounts. No bloat. Enter a keyword, find a niche." },
              { title: "Seller-first", body: "Every feature is built around a real seller problem — not a marketing checkbox." },
              { title: "Always improving", body: "New marketplaces, better data, more tools. MerchRadar gets better every week." },
            ].map((p) => (
              <div key={p.title} className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">{p.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{p.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Creator */}
        <section className="space-y-5">
          <div className="border-b border-border pb-3">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">The Creator</h2>
          </div>
          <div className="border border-border p-6 space-y-4">
            <div className="space-y-1">
              <div className="text-lg font-semibold">Marouane</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">Graphic Designer · POD Seller · Builder</div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              I&apos;ve been designing and selling on Amazon Merch for years. I built MerchRadar because I
              needed it myself — and I knew other sellers did too. My background in design means
              I care deeply about how tools look and feel, not just what they do.
              MerchRadar is my way of giving back to a community that&apos;s taught me a lot.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Amazon Merch", "Print on Demand", "Graphic Design", "Niche Research"].map(tag => (
                <span key={tag} className="text-xs px-3 py-1 border border-border text-muted-foreground uppercase tracking-wider">{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border border-primary p-8 text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Start Now</p>
          <h3 className="text-2xl font-medium">Find your next profitable niche</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Free. No account needed. Search Amazon Merch niches across 6 marketplaces in seconds.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity"
            >
              Search Niches
            </Link>
            <Link
              href="/blog"
              className="inline-block px-8 py-3 border border-border text-sm uppercase tracking-widest font-semibold hover:border-primary hover:text-primary transition-colors"
            >
              Learning Center
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
