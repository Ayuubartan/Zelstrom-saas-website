// src/components/three/NeuralParticles.tsx
'use client'

import * as THREE from 'three'
import { useMemo, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

export type NeuralParticlesProps = {
  /** New prop name */
  particleCount?: number
  /** Legacy/alternate prop names (kept for compatibility) */
  count?: number
  radius?: number
  pointSize?: number
}

export default function NeuralParticles(props: NeuralParticlesProps) {
  const {
    particleCount,
    count,
    radius = 3.0,
    pointSize = 1.75,
  } = props

  // Support both `particleCount` and legacy `count`
  const resolvedCount = particleCount ?? count ?? 48000

  const pointsRef = useRef<THREE.Points | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

  // ---------- Buffers (recomputed when resolvedCount/radius changes)
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    const positions = new Float32Array(resolvedCount * 3)

    // simple spiral-ish radial scatter influenced by radius
    const rng = (i: number) => (Math.sin(i * 12.9898) * 43758.5453) % 1
    for (let i = 0; i < resolvedCount; i++) {
      const ix = i * 3
      const r = (0.7 * radius) + (0.9 * radius) * rng(i + 7)
      const a = 6.2831853 * rng(i + 13)
      const z = (rng(i + 29) - 0.5) * (radius * 0.5)
      positions[ix + 0] = Math.cos(a) * r
      positions[ix + 1] = Math.sin(a) * r
      positions[ix + 2] = z
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geom
  }, [resolvedCount, radius])

  // ---------- Shaders
  const vertexShader = /* glsl */ `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uPointBase;
    varying float vAlpha;

    void main() {
      float t = uTime * 0.25;

      vec3 p = position;
      float wobble = sin(t + length(p.xy) * 0.75) * 0.06;
      p.xy += normalize(p.xy + 0.001) * wobble;

      float d = distance(p.xy, vec2(uMouse.x, uMouse.y) * 4.0);
      float repel = smoothstep(1.8, 0.0, d);
      p.xy += normalize(p.xy - vec2(uMouse.x, uMouse.y) * 4.0) * repel * 0.12;

      vAlpha = 0.35 + 0.65 * smoothstep(4.0, 0.0, d);

      vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      gl_PointSize = (uPointBase + 1.5 * repel) * (300.0 / -mvPosition.z);
    }
  `;

  const fragmentShader = /* glsl */ `
    varying float vAlpha;
    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      float m = smoothstep(0.5, 0.0, length(uv));
      gl_FragColor = vec4(1.0, 1.0, 1.0, m * vAlpha);
    }
  `;

  // ---------- Material (once)
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.0, 0.0) },
        uPointBase: { value: pointSize }, // base sprite size (from prop)
      },
      vertexShader,
      fragmentShader,
    })
  }, [pointSize])

  useEffect(() => {
    materialRef.current = material
  }, [material])

  // ---------- Mouse tracking
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

  // ---------- Cleanup
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
