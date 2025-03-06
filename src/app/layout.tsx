import type { Metadata } from 'next'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Geist, Geist_Mono } from 'next/font/google'
import { NavBar } from './_components/nav-bar'
import '@/styles/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header>
            <NavBar />
          </header>
          <main>
            <ScrollArea className="h-full">
              <div className="flex h-full flex-col">{children}</div>
            </ScrollArea>
          </main>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
