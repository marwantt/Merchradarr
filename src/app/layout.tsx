import type React from "react"
import type { Metadata } from "next"
import { Analytics } from '@vercel/analytics/react'
import { monoFont, titleFont } from "./fonts"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL('https://www.merchradar.app'),
  title: "MerchRadar – Find Winning Merch by Amazon Niches | Best Keyword Research Tool 2025",
  description: "Discover profitable Amazon Merch niches instantly with MerchRadar. Free keyword research tool for t-shirts, hoodies, and sweatshirts. Boost your Merch by Amazon sales today.",
  keywords: ["merch by amazon", "amazon merch keywords", "merch research tool", "amazon niche finder", "merch keyword research", "print on demand niches", "merch by amazon tips", "amazon merch seller tools"],
  authors: [{ name: "MerchRadar" }],
  creator: "MerchRadar",
  publisher: "MerchRadar",
  generator: "v0.app",
  applicationName: "MerchRadar",
  referrer: "origin-when-cross-origin",
  category: "E-commerce Tools",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/fiveicon.png", type: "image/png" }
    ],
    shortcut: "/fiveicon.png",
    apple: "/fiveicon.png",
  },
  openGraph: {
    title: "MerchRadar – Find Winning Amazon Merch Niches | Free Keyword Tool",
    description: "Discover profitable Amazon Merch niches instantly. Free keyword research tool for POD sellers. Boost your Merch by Amazon sales with smart niche finder.",
    url: "https://www.merchradar.app",
    siteName: "MerchRadar",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MerchRadar - Amazon Merch Keyword Research Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MerchRadar – Amazon Merch Niche Finder",
    description: "Find profitable Merch by Amazon niches instantly. Free keyword research tool for POD sellers.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your actual Google Search Console verification code
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${monoFont.variable} ${titleFont.variable}`}>
      <head>
        <style>{`
html {
  font-family: var(--font-mono), monospace;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

body {
  font-family: var(--font-mono), monospace;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0;
}

/* Minimal monospace typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-mono), monospace;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  letter-spacing: 0;
}

/* Title styling */
.title-font {
  font-family: var(--font-title), sans-serif;
  font-weight: 700;
  font-style: normal;
}
        `}</style>
      </head>
      <body className={monoFont.className}>
        {children}
        <Analytics />

        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "MerchRadar",
              "url": "https://www.merchradar.app",
              "description": "Free Amazon Merch by Amazon keyword research and niche finder tool. Find profitable t-shirt, hoodie, and sweatshirt niches instantly.",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "MerchRadar",
                "url": "https://www.merchradar.app"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "127"
              }
            })
          }}
        />
      </body>
    </html>
  )
}
