import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Top: brand + columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <Link href="/" className="text-xl title-font tracking-wide hover:opacity-70 transition-opacity">
              Merch Radar
            </Link>
            <p className="text-xs text-muted-foreground uppercase tracking-wider leading-relaxed">
              Free niche research tool for Amazon Merch on Demand sellers.
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest">Tools</p>
            <ul className="space-y-2 text-xs text-muted-foreground uppercase tracking-wider">
              <li><Link href="/" className="hover:text-foreground transition-colors">Niche Finder</Link></li>
              <li><Link href="/amazon" className="hover:text-foreground transition-colors">Amazon Search</Link></li>
            </ul>
          </div>

          {/* Academy */}
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest">Academy</p>
            <ul className="space-y-2 text-xs text-muted-foreground uppercase tracking-wider">
              <li><Link href="/academy" className="hover:text-foreground transition-colors">Overview</Link></li>
              <li><Link href="/guide" className="hover:text-foreground transition-colors">Guide</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="/resources" className="hover:text-foreground transition-colors">Resources</Link></li>
              <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest">Company</p>
            <ul className="space-y-2 text-xs text-muted-foreground uppercase tracking-wider">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li>
                <a
                  href="https://x.com/imarwant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  X / Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            © {year} MerchRadar. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Built for Merch by Amazon sellers.
          </p>
        </div>
      </div>
    </footer>
  );
}
