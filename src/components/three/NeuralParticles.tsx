'use client'

import * as THREE from 'three'
import { useMemo, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

export type NeuralParticlesProps = {
  particleCount?: number
  count?: number               // legacy
  radius?: number
  pointSize?: number
  // color as HSV for easy brand tuning
  hue?: number                 // 0..360
  saturation?: number          // 0..1
  value?: number               // 0..1
  // arc controls (in radians around the ring)
  arcStart?: number            // e.g. -0.2
  arcEnd?: number              // e.g. 1.1
  arcFeather?: number          // softness at the arc edges (0..1)
  // center glow amount
  vignette?: number            // 0..1
}

export default function NeuralParticles(props: NeuralParticlesProps) {
  const {
    particleCount, count,
    radius = 3.0,
    pointSize = 1.1,
    hue = 165, saturation = 0.55, value = 0.9,
    arcStart = -0.25, arcEnd = 1.05, arcFeather = 0.6,
    vignette = 0.85,
  } = props

  const resolvedCount = particleCount ?? count ?? 42000

  const pointsRef = useRef<THREE.Points | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

  // Geometry with an arc mask: we still generate a full ring but store angle for shader mask
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    const positions = new Float32Array(resolvedCount * 3)
    const angles = new Float32Array(resolvedCount) // store polar angle for arc mask

    const rng = (i: number) => (Math.sin(i * 12.9898) * 43758.5453) % 1

    for (let i = 0; i < resolvedCount; i++) {
      const ix = i * 3
      const a = 2.0 * Math.PI * rng(i + 11)
      const r = (0.6 * radius) + (0.9 * radius) * rng(i + 7)
      const z = (rng(i + 29) - 0.5) * (radius * 0.45)

      positions[ix + 0] = Math.cos(a) * r
      positions[ix + 1] = Math.sin(a) * r
      positions[ix + 2] = z
      angles[i] = a
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.setAttribute('aAngle', new THREE.BufferAttribute(angles, 1))
    return geom
  }, [resolvedCount, radius])

  const vertexShader = /* glsl */ `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uPointBase;
    uniform float uArcStart;
    uniform float uArcEnd;
    uniform float uArcFeather;
    uniform float uVignette;

    attribute float aAngle;

    varying float vAlpha;

    float arcMask(float ang, float startA, float endA, float feather) {
      // remap to [0,2pi) to handle wrap-around gracefully
      float TWO_PI = 6.28318530718;
      float s = mod(startA + TWO_PI, TWO_PI);
      float e = mod(endA + TWO_PI, TWO_PI);
      float x = mod(ang + TWO_PI, TWO_PI);

      float inside;
      if (s < e) {
        inside = step(s, x) * step(x, e);
      } else {
        // arc spans across 0
        inside = step(s, x) + step(x, e) - step(s, e);
      }
      // feather edges by distance to nearest boundary
      float d1 = abs(x - s);
      float d2 = abs(x - e);
      float d = min(d1, d2);
      float soft = smoothstep(0.0, feather, d);
      return inside * soft;
    }

    void main() {
      float t = uTime * 0.25;

      vec3 p = position;

      // gentle breathing along radius
      float wobble = sin(t + length(p.xy) * 0.75) * 0.06;
      p.xy += normalize(p.xy + 0.001) * wobble;

      // mouse repel (mouse in NDC-ish scaled in shader)
      float dMouse = distance(p.xy, vec2(uMouse.x, uMouse.y) * 4.0);
      float repel = smoothstep(1.8, 0.0, dMouse);
      p.xy += normalize(p.xy - vec2(uMouse.x, uMouse.y) * 4.0) * repel * 0.12;

      // arc visibility (0..1)
      float mArc = arcMask(aAngle, uArcStart, uArcEnd, uArcFeather);

      // center vignette glow (particles nearer center slightly brighter)
      float dCenter = length(p.xy) / 4.0;
      float mV = smoothstep(1.3, 0.0, dCenter) * uVignette;

      // alpha composed
      vAlpha = 0.22 * mArc + 0.18 * mV + 0.12 * repel;

      vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      float size = (uPointBase + 1.0 * repel) * (300.0 / -mvPosition.z);
      gl_PointSize = clamp(size, 0.7, 2.4);
    }
  `

  const fragmentShader = /* glsl */ `
    uniform vec3 uColor;
    varying float vAlpha;

    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      float m = smoothstep(0.46, 0.0, length(uv)); // compact disc
      float a = m * vAlpha * 0.85; // keep additive under control
      if (a < 0.02) discard;
      gl_FragColor = vec4(uColor, a);
    }
  `

  // HSV to RGB in JS to avoid GLSL complexity
  function hsvToRgb(h: number, s: number, v: number) {
    const c = v * s
    const hp = (h % 360) / 60
    const x = c * (1 - Math.abs((hp % 2) - 1))
    let r = 0, g = 0, b = 0
    if (0 <= hp && hp < 1) { r = c; g = x; b = 0 }
    else if (1 <= hp && hp < 2) { r = x; g = c; b = 0 }
    else if (2 <= hp && hp < 3) { r = 0; g = c; b = x }
    else if (3 <= hp && hp < 4) { r = 0; g = x; b = c }
    else if (4 <= hp && hp < 5) { r = x; g = 0; b = c }
    else { r = c; g = 0; b = x }
    const m = v - c
    return new THREE.Color(r + m, g + m, b + m)
  }

  const baseColor = useMemo(
    () => hsvToRgb(hue, saturation, value),
    [hue, saturation, value]
  )

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPointBase: { value: Math.min(pointSize, 1.6) },
        uArcStart: { value: arcStart },
        uArcEnd: { value: arcEnd },
        uArcFeather: { value: arcFeather },
        uVignette: { value: vignette },
        uColor: { value: baseColor.clone() },
      },
      vertexShader,
      fragmentShader,
    })
  }, [pointSize, arcStart, arcEnd, arcFeather, vignette, baseColor])

  useEffect(() => {
    materialRef.current = material
  }, [material])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -((e.clientY / window.innerHeight) * 2 - 1)
      materialRef.current?.uniforms.uMouse.value.set(x, y)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((_, dt) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += dt
    }
  })

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
