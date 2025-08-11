'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import NeuralParticles from '@/components/three/NeuralParticles'

export default function Hero() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Canvas in background */}
      <Canvas
        className="!absolute !top-0 !left-0 !w-full !h-full z-0"
        camera={{ position: [0, 0, 10], fov: 60 }}
      >
        <Suspense fallback={null}>
          <NeuralParticles />
        </Suspense>
      </Canvas>

      {/* Overlay Title */}
      <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h1 className="text-white text-[48px] md:text-[72px] lg:text-[84px] font-extrabold tracking-tight leading-tight">
            Zelstrom
          </h1>
          <p className="text-cyan-400 text-[18px] md:text-[22px] lg:text-[26px] mt-2 font-light italic tracking-widest animate-pulse">
            Live Neural Vectors, In Motion
          </p>
        </div>
      </div>
    </section>
  )
}


