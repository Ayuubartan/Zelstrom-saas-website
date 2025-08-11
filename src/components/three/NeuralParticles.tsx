'use client'

import { useRef, useMemo } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { shaderMaterial } from '@react-three/drei';

// ✅ Shaders
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying float vAlpha;
  void main() {
    float dist = distance(position.xy, uMouse);
    float pulse = sin(uTime * 4.0 + dist * 5.0) * 0.5 + 0.5;
    vAlpha = 1.0 - smoothstep(0.0, 1.5, dist);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = (5.0 + 5.0 * pulse) * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(0.0, 1.0, 1.0, a * vAlpha);
  }
`;

// ✅ Create material
const ParticleMaterial = shaderMaterial(
  { uTime: 0, uMouse: new THREE.Vector2() },
  vertexShader,
  fragmentShader
);

// ✅ Register
extend({ ParticleMaterial });

export default function NeuralParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial & { uTime: number; uMouse: THREE.Vector2 }>(null);
  const { mouse, viewport } = useThree();
  const particleCount = 1000;

  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      arr[i * 3 + 0] = THREE.MathUtils.randFloatSpread(20);
      arr[i * 3 + 1] = THREE.MathUtils.randFloatSpread(20);
      arr[i * 3 + 2] = THREE.MathUtils.randFloatSpread(20);
    }
    return arr;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uTime = time;
      materialRef.current.uMouse.set(
        mouse.x * viewport.width * 0.5,
        mouse.y * viewport.height * 0.5
      );
    }

    if (meshRef.current) {
      for (let i = 0; i < particleCount; i++) {
        dummy.position.set(
          positions[i * 3 + 0],
          positions[i * 3 + 1],
          positions[i * 3 + 2]
        );
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <particleMaterial ref={materialRef} attach="material" />
      </instancedMesh>

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.8} height={300} />
      </EffectComposer>
    </>
  );
}
