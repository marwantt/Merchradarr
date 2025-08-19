import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Geist, Geist_Mono, Audiowide } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  title: "MerchRadar",
  description: "Scan. Spot. Sell.",
  generator: "v0.app",
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
}
        `}</style>
      </head>
      <body>
        <header className="w-full py-6 sm:py-10 mt-8 sm:mt-24 mb-3 flex items-center justify-center px-4">
          <Link href="/" aria-label="MerchRadar home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/merchradar2.svg" 
              alt="MerchRadar Logo" 
              className="h-[32px] sm:h-[50px] lg:h-[70px] w-auto"
              onError={(e) => console.log('Logo load error:', e)}
              onLoad={() => console.log('Logo loaded successfully')}
            />
          </Link>
        </header>
        {children}
      </body>
    </html>
  )
}
