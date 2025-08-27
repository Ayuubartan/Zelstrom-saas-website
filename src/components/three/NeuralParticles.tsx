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

    // Subtle breathing
    float breathe = 0.22 * sin(uTime * 0.8 + aPhase * 6.2831853);
    p.xy *= (1.0 + breathe);

    // Mouse repel (tight + elegant)
    float d = distance(p.xy, uMouse);
    float repel = smoothstep(0.9 * uRadius, 0.0, d);
    vec2 dir = normalize(p.xy - uMouse);
    p.xy += dir * repel * 0.18;

    // Glow stronger near cursor
    vAlpha = 0.45 + 0.45 * smoothstep(0.9 * uRadius, 0.0, d);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);

    // Size pulse
    float sizePulse = 1.0 + 0.25 * sin(uTime * 1.3 + aPhase * 12.56637);
    gl_PointSize = uPointSize * sizePulse;
  }
`

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float m = smoothstep(1.0, 0.0, length(uv));
    gl_FragColor = vec4(0.60, 0.95, 1.00, m * vAlpha); // premium teal/cyan
  }
`

/* ===================== Material ===================== */
const ParticleMaterial = shaderMaterial(
  {
    uTime: 0 as number,
    uMouse: [0, 0] as [number, number],
    uPointSize: 3.2 as number, // bigger glow
    uRadius: 4.5 as number,    // larger field
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
  /** Desired max particle budget (auto-downscales on low-end/mobile) */
  count?: number
  /** Overall scale of the field (also mouse falloff) */
  radius?: number
  /** Base point size in px (scaled in shader) */
  pointSize?: number
  /** Arc window in degrees (default 200–350) */
  thetaStartDeg?: number
  thetaEndDeg?: number
}

/* ===================== Component ===================== */
export default function NeuralParticles({
  count = 12000,
  radius = 4.5,
  pointSize = 3.2,
  thetaStartDeg = 200,
  thetaEndDeg = 350,
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

  // Golden-angle arc (uniform, premium)
  const { positions, phases } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const pha = new Float32Array(particleCount)

    const golden = Math.PI * (3 - Math.sqrt(5)) // ~2.399963 rad
    const twoPi = Math.PI * 2
    const tStart = (thetaStartDeg * Math.PI) / 180
    const tEnd = (thetaEndDeg * Math.PI) / 180

    const norm = (a: number) => ((a % twoPi) + twoPi) % twoPi
    const a0 = norm(tStart)
    const a1Raw = norm(tEnd)
    const a1 = a1Raw === a0 ? a0 + twoPi : (a1Raw > a0 ? a1Raw : a1Raw + twoPi)

    let accepted = 0
    for (let i = 0; accepted < particleCount; i++) {
      const theta = i * golden
      const thetaN = norm(theta)
      const thetaU = thetaN < a0 ? thetaN + twoPi : thetaN
      if (thetaU < a0 || thetaU > a1) continue

      const u = accepted / Math.max(1, particleCount - 1) // 0..1 along arc
      // Spiral growth across the band; sqrt for even fill
      const r = Math.sqrt(u) * radius

      const x = Math.cos(theta) * r
      const y = Math.sin(theta) * r
      const z = (Math.random() - 0.5) * 0.3

      const base = accepted * 3
      pos[base + 0] = x
      pos[base + 1] = y
      pos[base + 2] = z

      pha[accepted] = u
      accepted++
    }

    return { positions: pos, phases: pha }
  }, [particleCount, radius, thetaStartDeg, thetaEndDeg])

  // Upgrade uMouse to Vector2 (once)
  useEffect(() => {
    const mat = materialRef.current
    if (!mat) return
    const v = mat.uniforms.uMouse.value
    if (Array.isArray(v)) {
      mat.uniforms.uMouse.value = new THREE.Vector2(v[0], v[1])
    }
  }, [])

  // Stable mouse listener (no changing deps)
  const radiusRef = useRef(radius)
  useEffect(() => { radiusRef.current = radius }, [radius])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const mat = materialRef.current
      if (!mat) return
      const xNdc = (e.clientX / window.innerWidth) * 2 - 1
      const yNdc = -(e.clientY / window.innerHeight) * 2 + 1
      const scale = radiusRef.current
      const u = mat.uniforms.uMouse.value
      if (u instanceof THREE.Vector2) {
        u.set(xNdc * scale, yNdc * scale)
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, []) // ← stable size; avoids the “final argument changed size” warning

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
