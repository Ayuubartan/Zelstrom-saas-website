'use client'

import dynamic from 'next/dynamic'
import LinkButton from '@/components/ui/link-button'
import LoginButton from '../components/LoginButton'

// Lazy-load three.js scene on the client only.
// This keeps headline/CTAs rendering instantly.
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="h-full w-full animate-pulse bg-black/60" />
    </div>
  ),
})

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Zelstrom hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-black"
    >
      {/* 3D background (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" role="presentation">
        <HeroScene />
      </div>

      {/* Overlay content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <h1 className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
          Zelstrom — Live Neural Vectors in Motion
        </h1>

        <p className="mt-4 max-w-2xl text-balance text-white/70 sm:text-lg">
          Predictive media intelligence. Real-time optimization. Premium performance.
        </p>

        {/* CTAs */}
        <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-4">
          <LinkButton href="/login" size="lg" className="hover-lift">
            Log in
          </LinkButton>
          <LinkButton href="#contact" variant="outline" size="lg" className="hover-lift">
            Talk to us
          </LinkButton>
          <LoginButton />
        </div>
      </div>
    </section>
  )
}
