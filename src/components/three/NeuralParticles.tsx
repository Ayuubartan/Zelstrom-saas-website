// src/components/three/NeuralParticles.tsx
'use client'

import * as THREE from 'three'
import { useMemo, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

export type NeuralParticlesProps = {
  /** Desired particle count; will rebuild buffers when it changes */
  particleCount?: number
}

export default function NeuralParticles({ particleCount = 48000 }: NeuralParticlesProps) {
  const pointsRef = useRef<THREE.Points | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

  // ---------- Buffers (recomputed when particleCount changes)
  const { geometry, positions } = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)

    // Simple deterministic scatter (you likely have your own pattern—keep or replace)
    const rng = (i: number) => Math.sin(i * 12.9898) * 43758.5453 % 1
    for (let i = 0; i < particleCount; i++) {
      const ix = i * 3
      const r = 2.0 + 2.5 * rng(i + 7)
      const a = 6.2831853 * rng(i + 13)
      const z = (rng(i + 29) - 0.5) * 1.6
      positions[ix + 0] = Math.cos(a) * r
      positions[ix + 1] = Math.sin(a) * r
      positions[ix + 2] = z
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return { geometry: geom, positions }
  }, [particleCount])

  // ---------- Shaders (keep yours if you have them; this is a safe default)
  const vertexShader = /* glsl */ `
    uniform float uTime;
    uniform vec2 uMouse;
    attribute vec3 position;
    varying float vAlpha;

    void main() {
      // gentle breathing
      float t = uTime * 0.25;
      vec3 p = position;
      float wobble = sin(t + length(p.xy) * 0.75) * 0.06;
      p.xy += normalize(p.xy + 0.001) * wobble;

      // mouse repel in clip space-ish
      float d = distance(p.xy, vec2(uMouse.x, uMouse.y) * 4.0);
      float repel = smoothstep(1.8, 0.0, d); // closer → stronger
      p.xy += normalize(p.xy - vec2(uMouse.x, uMouse.y) * 4.0) * repel * 0.12;

      vAlpha = 0.35 + 0.65 * smoothstep(4.0, 0.0, d);

      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      gl_PointSize = 1.75 + 1.5 * repel; // slightly larger near mouse
      // scale with distance so mobile GPUs don’t overdraw huge points
      gl_PointSize *= (300.0 / -mvPosition.z);
    }
  `.replace('mvPosition', 'modelViewMatrix * vec4(p,1.0)');

  const fragmentShader = /* glsl */ `
    varying float vAlpha;
    void main() {
      // soft round sprite
      vec2 uv = gl_PointCoord - 0.5;
      float m = smoothstep(0.5, 0.0, length(uv));
      gl_FragColor = vec4(1.0, 1.0, 1.0, m * vAlpha);
    }
  `

  // ---------- Material (created once; uniforms updated per-frame)
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.0, 0.0) },
      },
      vertexShader,
      fragmentShader,
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // keep a ref for per-frame updates
  useEffect(() => {
    materialRef.current = material
  }, [material])

  // ---------- Mouse tracking in NDC-ish space
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -((e.clientY / window.innerHeight) * 2 - 1)
      materialRef.current?.uniforms.uMouse.value.set(x, y)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // ---------- Animate
  useFrame((_, dt) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += dt
    }
  })

  // ---------- Dispose old buffers/materials on unmount or rebuild
  // ---------- Dispose on unmount or when buffers/materials are recreated
useEffect(() => {
  return () => {
    geometry.dispose()
    material.dispose()
  }
}, [geometry, material])


  return (
    <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />
  )
}
