import type React from "react"
import type { Metadata } from "next"
import { Analytics } from '@vercel/analytics/react'
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL('https://merchradar.vercel.app'),
  title: "MerchRadar – Find Winning Merch by Amazon Niches",
  description: "Spot profitable Merch by Amazon t-shirt, hoodie, and sweatshirt niches instantly. Scan. Spot. Sell.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/five5.png", type: "image/png" }
    ],
    shortcut: "/five5.png",
    apple: "/five5.png",
  },
  openGraph: {
    title: "MerchRadar – Amazon Merch Research Tool",
    description: "Spot profitable Merch by Amazon niches with one click.",
    url: "https://merchradar.vercel.app",
    siteName: "MerchRadar",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MerchRadar app preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
:root {
  --font-mono: "Google Sans Code", monospace;
}

html {
  font-family: "Google Sans Code", monospace;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

body {
  font-family: "Google Sans Code", monospace;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0;
}

/* Minimal monospace typography */
h1, h2, h3, h4, h5, h6 {
  font-family: "Google Sans Code", monospace;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  letter-spacing: 0;
}
        `}</style>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
