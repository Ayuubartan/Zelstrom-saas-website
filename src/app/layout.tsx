import type { Metadata } from 'next'
import './globals.css'

import Navbar from '@/components/Navbar'
import SmoothScroll from '@/components/SmoothScroll'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'Zelstrom — Neural Vectors in Motion',
  description:
    'AI-native media intelligence: Vault (data), Cortex (predictive), OS (automation).',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Zelstrom',
    description:
      'AI-native media intelligence: Vault, Cortex, OS.',
    url: 'https://www.zelstrom.io',
    images: ['/og.png'],
  },
  themeColor: '#0B0F1A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {/* Client components are fine to render here */}
        <Navbar />

        {/* Page content */}
        {children}

        {/* Global singletons (self-closing; DO NOT pass children) */}
        <Analytics />
        <SpeedInsights />

        {/* Smooth scrolling initializer (client component) */}
        <SmoothScroll />
      </body>
    </html>
  )
}
