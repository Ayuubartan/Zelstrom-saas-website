'use client'

import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, extend, ThreeElements } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

/* ===================== Shaders ===================== */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uPointSize;
  uniform float uRadius;
  attribute float aPhase;
  varying float vAlpha;

  void main() {
    vec3 p = position;

    // Breathing motion
    float breathe = 0.22 * sin(uTime * 0.8 + aPhase * 6.2831853);
    p.xy *= (1.0 + breathe);

    // Mouse repel
    float d = distance(p.xy, uMouse);
    float repel = smoothstep(0.9 * uRadius, 0.0, d);
    vec2 dir = normalize(p.xy - uMouse);
    p.xy += dir * repel * 0.18;

    vAlpha = 0.45 + 0.45 * smoothstep(0.9 * uRadius, 0.0, d);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);

    float sizePulse = 1.0 + 0.25 * sin(uTime * 1.3 + aPhase * 12.56637);
    gl_PointSize = uPointSize * sizePulse;
  }
`

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float m = smoothstep(1.0, 0.0, length(uv));
    gl_FragColor = vec4(0.60, 0.95, 1.00, m * vAlpha); // cyan glow
  }
`

/* ===================== Material ===================== */

const ParticleMaterial = shaderMaterial(
  {
    uTime: 0 as number,
    uMouse: [0, 0] as [number, number],
    uPointSize: 3.2 as number, // ⬅️ bigger glow
    uRadius: 4.5 as number,    // ⬅️ larger spiral radius
  },
  vertexShader,
  fragmentShader
)

extend({ ParticleMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    particleMaterial: ThreeElements['meshStandardMaterial'] & {
      'uniforms-uPointSize-value'?: number
      'uniforms-uRadius-value'?: number
      'uniforms-uTime-value'?: number
      'uniforms-uMouse-value'?: [number, number] | THREE.Vector2
    }
  }
}

/* ===================== Types ===================== */

type ParticleShaderMaterial = THREE.ShaderMaterial & {
  uniforms: {
    uTime: { value: number }
    uMouse: { value: THREE.Vector2 | [number, number] }
    uPointSize: { value: number }
    uRadius: { value: number }
  }
}

export type NeuralParticlesProps = {
  count?: number
  radius?: number
  pointSize?: number
}

/* ===================== Component ===================== */

export default function NeuralParticles({
  count = 12000,
  radius = 4.5,
  pointSize = 3.2,
}: NeuralParticlesProps) {
  const materialRef = useRef<ParticleShaderMaterial | null>(null)

  // Adaptive budget
  const particleCount = useMemo(() => {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : ''
    const cores = (navigator as unknown as { hardwareConcurrency?: number })?.hardwareConcurrency ?? 4
    const mobile = /Mobi|Android/i.test(ua)
    if (mobile) return Math.min(count, 2500)
    if (cores <= 4) return Math.min(count, 5000)
    if (cores <= 8) return Math.min(count, 9000)
    return count
  }, [count])

  // Fibonacci spiral distribution
  const { positions, phases } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const pha = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount
      const angle = t * Math.PI * (3.0 - Math.sqrt(5.0))
      const r = Math.sqrt(t) * radius
      const x = r * Math.cos(angle)
      const y = r * Math.sin(angle)
      const z = (Math.random() - 0.5) * 0.3

      pos[i * 3 + 0] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z

      pha[i] = Math.random()
    }

    return { positions: pos, phases: pha }
  }, [particleCount, radius])

  // Upgrade uMouse to Vector2
  useEffect(() => {
    const mat = materialRef.current
    if (!mat) return
    const v = mat.uniforms.uMouse.value
    if (Array.isArray(v)) {
      mat.uniforms.uMouse.value = new THREE.Vector2(v[0], v[1])
    }
  }, [])

  // Mouse listener
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const xNdc = (e.clientX / window.innerWidth) * 2 - 1
      const yNdc = -(e.clientY / window.innerHeight) * 2 + 1
      const mat = materialRef.current
      if (mat && mat.uniforms.uMouse.value instanceof THREE.Vector2) {
        mat.uniforms.uMouse.value.set(xNdc * radius, yNdc * radius)
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [radius])

  // Animate time
  useFrame((_, dt) => {
    const mat = materialRef.current
    if (mat) mat.uniforms.uTime.value += dt
  })

  return (
    <group>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        </bufferGeometry>

        <particleMaterial
          ref={materialRef}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms-uPointSize-value={pointSize}
          uniforms-uRadius-value={radius}
        />
      </points>
    </group>
  )
}
