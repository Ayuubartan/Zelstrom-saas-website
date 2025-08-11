// 📁 src/app/page.tsx or src/pages/index.tsx

'use client'

import { Canvas } from '@react-three/fiber'
import NeuralParticles from '@/components/three/NeuralParticles'
// src/app/layout.tsx or src/pages/_app.tsx



export default function Home() {
  return (
    <main className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <NeuralParticles />
      </Canvas>
    </main>
  )
}
