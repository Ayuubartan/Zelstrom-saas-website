// src/sections/Hero.tsx
'use client'

import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import { Suspense, useCallback } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

// ✅ local pieces you added earlier
import LoadingOverlay from '@/components/ui/LoadingOverlay'
import ScrollCue from '@/components/ui/ScrollCue'
import useParticleBudget from '@/hooks/useParticleBudget'

// Lazy-load the R3F scene to keep first paint snappy
const NeuralParticles = dynamic(
  () => import('@/components/three/NeuralParticles'),
  { ssr: false }
)

export default function Hero() {
  // Mobile/DPR-aware particle scaling
  const { count } = useParticleBudget()

  // When LoadingOverlay determines assets are ready, fade in hero copy
  const onReady = useCallback(() => {
    // Add a class to <html> so CSS can reveal text (see globals.css .hero-ready .hero-copy)
    document.documentElement.classList.add('hero-ready')
  }, [])

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Fixed overlay that hides itself when R3F loading completes */}
      <LoadingOverlay onReady={onReady} />

      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          // Cap DPR to reduce overdraw/heat on mobile
          dpr={[1, 1.75]}
        >
          {/* Your shader-based particle field */}
          <NeuralParticles particleCount={count} />


          {/* Tasteful glow; keep intensity modest for performance */}
          <EffectComposer>
            <Bloom luminanceThreshold={0.12} luminanceSmoothing={0.8} intensity={0.6} />
          </EffectComposer>
        </Canvas>
      </Suspense>

      {/* Scroll hint */}
      <ScrollCue />

      {/* Hero copy — hidden until .hero-ready is set (see globals.css helper) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-24 mx-auto max-w-3xl px-6 text-center">
        <h1 className="hero-copy opacity-0 translate-y-3 transition-all duration-500 text-3xl md:text-5xl font-semibold tracking-[-0.02em]">
          Zelstrom — Neural Vectors in Motion
        </h1>
        <p className="hero-copy mt-3 opacity-0 translate-y-3 transition-all duration-700 text-white/70">
          AI-native media intelligence: Vault (data), Cortex (predictive), OS (automation).
        </p>
      </div>
    </section>
  )
}
