'use client';

import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

type NeuralParticlesProps = {
  count?: number;
  radius?: number;
  pointSize?: number;
};

/**
 * Arc-distributed teal particles with depth-based size, subtle swirl,
 * and gentle mouse interaction. Matches the "Live Neural Vectors in Motion" look.
 */
export default function NeuralParticles({
  count = 20000,
  radius = 5.0,
  pointSize = 2.0,
}: NeuralParticlesProps) {
  const geomRef = useRef<THREE.BufferGeometry>(null!);
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const { viewport, pointer } = useThree();

  // —— Generate an arc ring (not a full sphere), with slight thickness
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);

    // Arc parameters
    const arcStart = -0.25 * Math.PI; // open at bottom-left
    const arcEnd = 1.25 * Math.PI;    // sweep to top-right
    const ringThickness = 0.55;       // radial jitter

    for (let i = 0; i < count; i++) {
      const t = Math.random();
      const angle = arcStart + t * (arcEnd - arcStart);

      const rJitter = (Math.random() - 0.5) * ringThickness;
      const rr = radius + rJitter;

      const x = Math.cos(angle) * rr;
      const y = Math.sin(angle) * rr;
      const z = (Math.random() - 0.5) * 0.6; // shallow depth

      arr[i * 3 + 0] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, [count, radius]);

  // ——— Shaders
  const vertexShader = /* glsl */ `
    uniform float uTime;
    uniform vec2  uMouse;       // world-ish units
    uniform float uPointSize;   // base px size
    varying float vAlpha;

    void main() {
      vec3 p = position;

      // Subtle swirl motion around origin (cinematic breathing)
      float r = length(p.xy);
      float theta = atan(p.y, p.x);
      theta += 0.07 * sin(uTime * 0.35 + r * 0.6);
      p.x = cos(theta) * r;
      p.y = sin(theta) * r;

      // Gentle mouse repulsion
      float d = distance(p.xy, uMouse);
      float influence = smoothstep(0.0, 1.5, 1.5 - d);
      p.xy += normalize(p.xy - uMouse) * influence * 0.045;

      vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);

      // Depth-based size scaling
      float depth = -mvPosition.z;
      float size = uPointSize * (1.0 + clamp(depth * 0.06, 0.0, 1.0));

      gl_PointSize = size;
      gl_Position = projectionMatrix * mvPosition;

      vAlpha = 0.6 + 0.4 * smoothstep(0.0, 8.0, depth);
    }
  `;

  const fragmentShader = /* glsl */ `
    precision mediump float;
    varying float vAlpha;
    const vec3 teal = vec3(0.0, 0.92, 0.76);

    void main() {
      vec2 uv = gl_PointCoord * 2.0 - 1.0;
      float r2 = dot(uv, uv);
      float mask = smoothstep(1.0, 0.6, r2);
      gl_FragColor = vec4(teal, vAlpha * mask);
      gl_FragColor.a *= smoothstep(1.0, 0.0, r2);
    }
  `;

  // ——— Material & uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, -radius * 0.8) },
      uPointSize: {
        value:
          pointSize *
          (typeof window !== 'undefined' ? window.devicePixelRatio : 1),
      },
    }),
    [pointSize, radius]
  );

  // ——— Animate time + mouse (map normalized pointer to world-ish coords)
  const { width, height } = viewport;
  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
      const mx = pointer.x * (width * 0.5);
      const my = pointer.y * (height * 0.5);
      matRef.current.uniforms.uMouse.value.set(mx, my);
    }
  });

  // ——— Cleanup
  useEffect(() => {
    return () => {
      geomRef.current?.dispose?.();
      matRef.current?.dispose?.();
    };
  }, []);

  return (
    <points frustumCulled>
      <bufferGeometry ref={geomRef}>
        {/* ✅ R3F v9: use args to construct BufferAttribute */}
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]} // new THREE.BufferAttribute(positions, 3)
          onUpdate={(attr: THREE.BufferAttribute) => {
            attr.needsUpdate = true;
            attr.setUsage(THREE.DynamicDrawUsage);
          }}
        />
      </bufferGeometry>

      <shaderMaterial
        ref={matRef}
        depthWrite={false}
        transparent
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </points>
  );
}
