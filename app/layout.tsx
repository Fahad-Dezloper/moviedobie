import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Spatial YouTube Movies",
  description: "A beautiful spatial UI for YouTube Movies",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Analytics />
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex flex-col md:flex-row">
          <Sidebar />
          <MobileNav />
          <main className="flex-1 md:ml-20">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

