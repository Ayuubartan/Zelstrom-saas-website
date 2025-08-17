'use client'

import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import { Suspense, useCallback } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

import LoadingOverlay from '@/components/ui/LoadingOverlay'
import ScrollCue from '@/components/ui/ScrollCue'
import useParticleBudget from '@/hooks/useParticleBudget'

const NeuralParticles = dynamic(
  () => import('@/components/three/NeuralParticles'),
  { ssr: false }
)

export default function Hero() {
  const { count } = useParticleBudget()

  const onReady = useCallback(() => {
    document.documentElement.classList.add('hero-ready')
  }, [])

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <LoadingOverlay onReady={onReady} />

      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          dpr={[1, 1.75]}
          onCreated={({ gl }) => {
            gl.setClearColor('#0B0F1A', 1) // deep background like before
          }}
        >
          {/* Bring back the arc aesthetic via props */}
          <NeuralParticles count={20000} radius={5} pointSize={2} />

          <EffectComposer>
            <Bloom
              luminanceThreshold={0.6}
              luminanceSmoothing={0.9}
              intensity={0.20} // soft premium glow (not blown out)
              mipmapBlur
            />
          </EffectComposer>
        </Canvas>
      </Suspense>

      <ScrollCue />

      <div className="pointer-events-none absolute inset-x-0 bottom-24 mx-auto max-w-3xl px-6 text-center">
        <h1 className="hero-copy opacity-0 translate-y-3 transition-all duration-500 text-3xl md:text-5xl font-semibold tracking-[-0.02em]">
          Zelstrom — Live Neural Vectors in Motion
        </h1>
        <p className="hero-copy mt-3 opacity-0 translate-y-3 transition-all duration-700 text-white/70">
          Predictive media intelligence. Real-time optimization. Premium performance.
        </p>

        {/* CTA buttons (optional) */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href="#get-started"
            className="rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm backdrop-blur hover:bg-white/15"
          >
            Get Started
          </a>
          <a
            href="#learn-more"
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm hover:border-white/20"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}
