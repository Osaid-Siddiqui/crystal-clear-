import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import FullStoryLoader from "@/components/fullstory-loader"
import "./globals.css"

export const metadata: Metadata = {
  title: "Crystal Clear Auto Detailing - Premium Mobile Detailing Services",
  description:
    "Professional mobile auto detailing services in the Denver metro area. Premium car care that comes to you.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <FullStoryLoader />
        <Analytics />
      </body>
    </html>
  )
}
