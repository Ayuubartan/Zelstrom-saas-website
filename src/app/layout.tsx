// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import './globals.css'

import Navbar from '@/components/Navbar'
import SmoothScroll from '@/components/SmoothScroll'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  title: 'Zelstrom — Neural Vectors in Motion',
  description: 'AI-native media intelligence: Vault (data), Cortex (predictive), OS (automation).',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Zelstrom',
    description: 'AI-native media intelligence: Vault, Cortex, OS.',
    url: 'https://www.zelstrom.io',
    images: ['/og.png'],
  },
  themeColor: '#0B0F1A',
}

export const viewport: Viewport = {
  themeColor: '#0B0F1A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-black text-white antialiased [scrollbar-gutter:stable]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Skip link (only shows on keyboard focus) */}
          <a
            href="#main"
            className="sr-only focus-visible:fixed focus-visible:top-2 focus-visible:left-2 focus-visible:z-[100]
                       focus-visible:rounded-lg focus-visible:bg-cyan-500 focus-visible:px-3 focus-visible:py-2
                       focus-visible:text-black"
          >
            Skip to content
          </a>

          {/* Fixed glass navbar */}
          <Navbar />

          {/* Main content; offset for navbar height */}
          <main id="main" tabIndex={-1} className="pt-24">
            {children}
          </main>

          {/* Global singletons */}
          <Analytics />
          <SpeedInsights />
          <SmoothScroll />
        </ThemeProvider>
      </body>
    </html>
  )
}
