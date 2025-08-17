// src/components/three/HeroScene.tsx
import { Suspense } from 'react'
import NeuralParticles from '@/components/three/NeuralParticles'

export default function HeroScene() {
  return (
    <Suspense fallback={null}>
      <NeuralParticles particleCount={19000} radius={3.1} pointSize={2.0} />
    </Suspense>
  )
}
