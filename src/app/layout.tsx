import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Geist, Geist_Mono, Fira_Code, Passero_One } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
import DarkModeLogo from "../components/DarkModeLogo"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
})

const passeroOne = Passero_One({
  variable: "--font-passero-one",
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://merchradar.vercel.app'),
  title: "MerchRadar – Find Winning Merch by Amazon Niches",
  description: "Spot profitable Merch by Amazon t-shirt, hoodie, and sweatshirt niches instantly. Scan. Spot. Sell.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/merchradar1.svg", type: "image/svg+xml" }
    ],
    shortcut: "/merchradar1.svg",
    apple: "/merchradar1.svg",
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
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${geistSans.style.fontFamily};
  --font-sans: ${geistSans.variable};
  --font-mono: ${geistMono.variable};
  --font-fira-code: ${firaCode.variable};
  --font-passero-one: ${passeroOne.variable};
}

.passero-one-regular {
  font-family: var(--font-passero-one), "Passero One", sans-serif;
  font-weight: 400;
  font-style: normal;
}
        `}</style>
      </head>
      <body>
        <header className="w-full py-6 sm:py-10 mt-8 sm:mt-24 mb-3 flex items-center justify-center px-4" style={{marginTop: '100px'}}>
          <Link href="/" aria-label="MerchRadar home">
            <DarkModeLogo />
          </Link>
        </header>
        {children}
        <footer className="w-full py-8 mt-16 flex items-center justify-center px-4 border-t border-black/10 dark:border-white/20">
          <p className="text-sm text-black/60 dark:text-white/60 text-center">
            © 2025 MerchRadar 🌟 Built with love for creators, dreamers, and merch hustlers.
          </p>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
