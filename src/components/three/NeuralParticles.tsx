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
 * and gentle mouse interaction — tuned to match the first screenshot.
 */
export default function NeuralParticles({
  count = 20000,
  radius = 5.0,
  pointSize = 2.0,
}: NeuralParticlesProps) {
  const geomRef = useRef<THREE.BufferGeometry>(null!);
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const { viewport, pointer } = useThree();

  // Arc ring (not a sphere) with slight thickness
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);

    // Arc parameters: diagonal sweep like the photo
    const arcStart = -0.25 * Math.PI; // bottom-left
    const arcEnd = 1.25 * Math.PI;    // top-right
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

  // Vertex shader
  const vertexShader = /* glsl */ `
    uniform float uTime;
    uniform vec2  uMouse;       // world-ish units
    uniform float uPointSize;   // base px size
    varying float vAlpha;

    void main() {
      vec3 p = position;

      // Subtle swirl motion (cinematic breathing)
      float r = length(p.xy);
      float theta = atan(p.y, p.x);
      theta += 0.07 * sin(uTime * 0.35 + r * 0.6);
      p.x = cos(theta) * r;
      p.y = sin(theta) * r;

      // Gentle mouse repulsion (short range)
      float d = distance(p.xy, uMouse);
      float influence = smoothstep(0.0, 1.5, 1.5 - d);
      p.xy += normalize(p.xy - uMouse) * influence * 0.045;

      vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);

      // Depth-based size scaling
      float depth = -mvPosition.z; // closer => larger
      float size = uPointSize * (1.0 + clamp(depth * 0.06, 0.0, 1.0));

      gl_PointSize = size;
      gl_Position = projectionMatrix * mvPosition;

      // Soft fade by depth
      vAlpha = 0.6 + 0.4 * smoothstep(0.0, 8.0, depth);
    }
  `;

  // Fragment shader (fixed premium teal)
  const fragmentShader = /* glsl */ `
    precision mediump float;
    varying float vAlpha;
    const vec3 teal = vec3(0.0, 0.92, 0.76);

    void main() {
      // round particle with smooth edge
      vec2 uv = gl_PointCoord * 2.0 - 1.0;
      float r2 = dot(uv, uv);
      float mask = smoothstep(1.0, 0.6, r2);
      gl_FragColor = vec4(teal, vAlpha * mask);
      gl_FragColor.a *= smoothstep(1.0, 0.0, r2);
    }
  `;

  // Uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, -radius * 0.8) }, // start slightly below center
      uPointSize: {
        value:
          pointSize *
          (typeof window !== 'undefined' ? window.devicePixelRatio : 1),
      },
    }),
    [pointSize, radius]
  );

  // Animate time + pointer mapping
  const { width, height } = viewport;
  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
      const mx = pointer.x * (width * 0.5);
      const my = pointer.y * (height * 0.5);
      matRef.current.uniforms.uMouse.value.set(mx, my);
    }
  });

  // Cleanup
  useEffect(() => {
    return () => {
      geomRef.current?.dispose?.();
      matRef.current?.dispose?.();
    };
  }, []);

  return (
    <points frustumCulled>
      <bufferGeometry ref={geomRef}>
        {/* R3F v9 BufferAttribute signature */}
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
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
