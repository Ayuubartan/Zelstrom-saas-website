'use client'
import dynamic from 'next/dynamic'
import CanvasRoot from '@/components/r3f/CanvasRoot'

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false })

export default function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-black" />
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
        <h1 className="pointer-events-auto text-4xl md:text-6xl font-semibold tracking-tight text-white drop-shadow">
          Zelstrom — Live Neural Vectors in Motion
        </h1>
        <p className="mt-4 max-w-2xl text-white/70">
          Predictive media intelligence. Real-time optimization. Premium performance.
        </p>
        <div className="pointer-events-auto mt-8 flex gap-3">
          <a href="/signup" className="rounded-2xl bg-white/10 px-5 py-3 text-white backdrop-blur hover:bg-white/20 transition">
            Get Started
          </a>
          <a href="/docs" className="rounded-2xl border border-white/20 px-5 py-3 text-white hover:bg-white/10 transition">
            Learn More
          </a>
        </div>
      </div>

      <div className="absolute inset-0 z-10" aria-hidden>
        <CanvasRoot>
          <HeroScene />
        </CanvasRoot>
      </div>

      <div className="absolute inset-0 z-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,255,255,0.06)_0%,rgba(0,0,0,0.9)_70%)]" />
    </section>
  )
}
