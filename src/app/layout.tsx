import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Geist, Geist_Mono, Fira_Code } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
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



export const metadata: Metadata = {
  title: "MerchRadar",
  description: "Scan. Spot. Sell.",
  generator: "v0.app",
  icons: {
    icon: "/fiveicon.png",
    shortcut: "/fiveicon.png",
    apple: "/fiveicon.png",
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
}
        `}</style>
      </head>
      <body>
        <header className="w-full py-6 sm:py-10 mt-8 sm:mt-24 mb-3 flex items-center justify-center px-4" style={{marginTop: '100px'}}>
          <Link href="/" aria-label="MerchRadar home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/merchradar2.svg" 
              alt="MerchRadar Logo" 
              className="h-[200px] sm:h-[300px] lg:h-[350px] w-auto"
            />
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
