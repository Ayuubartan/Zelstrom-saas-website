'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import NeuralParticles from '@/components/three/NeuralParticles'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

export default function Hero() {
  return (
    <section className="relative w-full h-screen bg-black">
      {/* Particles Canvas */}
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Suspense fallback={null}>
          <NeuralParticles />
          <EffectComposer>
            <Bloom intensity={1.2} luminanceThreshold={0.1} luminanceSmoothing={0.8} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Zelstrom — Live Neural Vectors in Motion
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Predictive media intelligence. Real-time optimization. Premium performance.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-full bg-teal-500 text-black font-semibold hover:bg-teal-400 transition">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-full border border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-black transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}
