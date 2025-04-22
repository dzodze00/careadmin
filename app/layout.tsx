import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import { StateSelector } from "@/components/state-selector"
import { StateProvider } from "@/components/state-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CareAdmin - Healthcare Administration Platform",
  description: "Complete healthcare administration platform for home health agencies",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <StateProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1">
                <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
                  <div className="flex-1">
                    <StateSelector />
                  </div>
                  <Button variant="ghost" size="icon" aria-label="Help">
                    <HelpCircle className="h-5 w-5" />
                  </Button>
                </header>
                <main className="p-6">{children}</main>
              </div>
            </div>
          </StateProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
