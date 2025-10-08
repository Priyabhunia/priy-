import type React from "react"
import type { Metadata } from "next"
import { Inter, Fira_Code } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LayoutClient } from "./layout-client" // Import the new client layout component
import { Suspense } from "react"

const geistSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const geistMono = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${geistSans.variable} ${geistMono.variable} flex h-screen`}>
        <Suspense fallback={<div>Loading...</div>}>
          <LayoutClient>{children}</LayoutClient>
        </Suspense>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
