// src/components/r3f/PostFX.tsx
'use client'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

export default function PostFX() {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.65} />
      <Vignette eskil={false} offset={0.2} darkness={0.85} />
    </EffectComposer>
  )
}
