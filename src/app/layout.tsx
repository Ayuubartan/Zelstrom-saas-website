// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import SmoothScroll from '../components/SmoothScroll'

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zelstrom.io'

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: 'Zelstrom — Neural Vectors in Motion',
  description:
    'AI-native media intelligence: Vault (data), Cortex (predictive), OS (automation).',
  openGraph: {
    title: 'Zelstrom',
    description: 'AI-native media intelligence: Vault, Cortex, OS.',
    url: base,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Zelstrom — Neural Vectors in Motion',
      },
    ],
    siteName: 'Zelstrom',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zelstrom',
    creator: '@zelstrom',
    title: 'Zelstrom — Neural Vectors in Motion',
    description:
      'AI-native media intelligence: Vault (data), Cortex (predictive), OS (automation).',
    images: ['/og.png'],
  },
  alternates: {
    canonical: 'https://www.zelstrom.io',
  },
  icons: { icon: '/favicon.ico' },
  themeColor: '#0B0F1A',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth bg-[#0B0F1A]">
      <body className="bg-[#0B0F1A] text-white antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
