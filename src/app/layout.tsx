import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
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
          <Link href="/" aria-label="MerchRadar home" className="flex items-center gap-3">
            <Image 
              src="/merchradar2.svg" 
              alt="MerchRadar Logo" 
              width={60} 
              height={60}
              className="w-8 h-8 sm:w-12 sm:h-12 lg:w-[60px] lg:h-[60px]"
            />
            <h1 className={`${audiowide.className} text-[32px] sm:text-[50px] lg:text-[70px] leading-none font-normal text-center`}>MerchRadar</h1>
          </Link>
        </header>
        {children}
      </body>
    </html>
  )
}
