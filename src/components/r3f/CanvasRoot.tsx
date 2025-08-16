// src/components/r3f/CanvasRoot.tsx
'use client'
import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, PropsWithChildren, useMemo } from 'react'
import PostFX from '@/components/r3f/PostFX'

function DPR() {
  const { gl } = useThree()
  const dprs = useMemo(() => {
    const mobile = /Mobi|Android/i.test(navigator.userAgent)
    return mobile ? [0.75, 1.25] : [1, 2]
  }, [])

  gl.setPixelRatio(Array.isArray(dprs) ? Math.max(...dprs) : dprs)
  return null
}


export default function CanvasRoot({ children }: PropsWithChildren) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
      <Suspense fallback={null}>
        <DPR />
        {children}
        <PostFX />
      </Suspense>
    </Canvas>
  )
}
