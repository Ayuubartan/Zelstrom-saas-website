'use client'
import NeuralParticles from '@/components/three/NeuralParticles'
import { Suspense } from 'react'

export default function HeroScene() {
  return (
    <Suspense fallback={null}>
      <NeuralParticles count={19000} radius={3.1} pointSize={2.0} />
    </Suspense>
  )
}
