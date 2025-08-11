'use client'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import NeuralParticles from '@/components/three/NeuralParticles'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

export default function Hero() {
  return (
    <section className="w-full h-screen relative">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Suspense fallback={null}>
          <NeuralParticles />
          <EffectComposer>
            <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.8} height={300} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <h1 className="text-center text-white font-semibold">
          <span className="block text-5xl md:text-6xl lg:text-7xl tracking-tight">
            Zelstrom
          </span>
          <span className="block text-lg md:text-xl lg:text-2xl font-light text-cyan-400 mt-2">
            Live Neural Vectors, In Motion
          </span>
        </h1>
      </div>
    </section>
  )
}
