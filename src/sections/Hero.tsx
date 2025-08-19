'use client'

import HeroScene from '@/components/three/HeroScene'
import LoginButton from '../components/LoginButton'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* 3D background */}
      <HeroScene />

      {/* Overlay content */}
      <div className="pointer-events-none relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight 
                     bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 
                     bg-clip-text text-transparent"
        >
          Zelstrom — Live Neural Vectors in Motion
        </h1>

        <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/70">
          Predictive media intelligence. Real-time optimization. Premium performance.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#get-started"
            className="pointer-events-auto rounded-full px-6 py-2 font-semibold
                       bg-cyan-500 text-black
                       hover:bg-cyan-400 hover:shadow-[0_0_20px_4px_rgba(34,211,238,0.7)]
                       transition-all duration-300"
          >
            Get Started
          </a>

          <a
            href="#learn-more"
            className="pointer-events-auto rounded-full px-6 py-2 font-semibold
                       border border-cyan-500 text-cyan-400
                       hover:text-black hover:bg-cyan-400
                       hover:shadow-[0_0_20px_4px_rgba(34,211,238,0.7)]
                       transition-all duration-300"
          >
            Learn More
          </a>

          <div className="pointer-events-auto">
            <LoginButton />
          </div>
        </div>
      </div>
    </section>
  )
}
