'use client'

import { Suspense, useMemo, useRef, useCallback, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import NeuralParticles from './NeuralParticles'
import LinkButton from "@/components/ui/link-button"
<><LinkButton href="/login" variant="default" size="lg">Log in</LinkButton><LinkButton href="#contact" variant="outline" size="lg">Talk to us</LinkButton></>


// Project mouse to world Z=0 plane and smooth it
function usePointerAttractor() {
  const target = useRef(new THREE.Vector3(0, 0, 0))
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])
  const ray = useMemo(() => new THREE.Ray(), [])
  const ndc = useRef(new THREE.Vector2())
  const tmp = useMemo(() => new THREE.Vector3(), [])
  const { camera } = useThree()

  const update = useCallback(
    (e: { clientX: number; clientY: number; currentTarget: HTMLElement }) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      ndc.current.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      )
      ray.origin.copy(camera.position)
      ray
        .direction.set(ndc.current.x, ndc.current.y, 0.5)
        .unproject(camera)
        .sub(camera.position)
        .normalize()
      ray.intersectPlane(plane, tmp)
      // smooth toward target to remove jitter
      target.current.lerp(tmp, 0.35)
    },
    [camera, plane, ray, tmp]
  )

  return { target, update }
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 8], fov: 55 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 1)
        }}
      >
        <Suspense fallback={null}>
          <PointerLayer />
        </Suspense>
      </Canvas>
    </div>
  )
}

function PointerLayer() {
  const { target, update } = usePointerAttractor()
  const { gl } = useThree()

  // ✅ React 19: provide initial values to refs
  const handlerRef = useRef<((e: PointerEvent) => void) | null>(null)

  useEffect(() => {
    const el = gl.domElement
    el.style.touchAction = 'none'

    // create handler once
    if (!handlerRef.current) {
      handlerRef.current = (e: PointerEvent) =>
        update({
          clientX: e.clientX,
          clientY: e.clientY,
          currentTarget: el,
        } as any)
    }

    const handler = handlerRef.current
    el.addEventListener('pointermove', handler!, { passive: true })
    el.addEventListener('pointerdown', handler!, { passive: true })
    el.addEventListener('pointerenter', handler!, { passive: true })

    return () => {
      el.removeEventListener('pointermove', handler!)
      el.removeEventListener('pointerdown', handler!)
      el.removeEventListener('pointerenter', handler!)
    }
  }, [gl, update])

  return (
    <group>
      <NeuralParticles
         count={9000}
  radius={4.5}
  pointSize={3.2}
  thetaStartDeg={200}
  thetaEndDeg={350}
      />
    </group>
  )
  
}

