'use client';

import { Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import NeuralParticles from '@/components/three/NeuralParticles';

type HeroSceneProps = {
  count?: number;
  radius?: number;
  pointSize?: number;
  tilt?: [number, number, number]; // Euler rotation
};

export default function HeroScene({
  count = 22000,
  radius = 5.2,
  pointSize = 2.2,
  tilt = [0.1, 0.0, 0.38], // subtle X tilt + diagonal Z tilt (matches your first pic)
}: HeroSceneProps) {
  const safeCount = useMemo(() => {
    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
    return isMobile ? Math.min(count, 9000) : count;
  }, [count]);

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 100 }}
        onCreated={({ scene, gl }) => {
          scene.background = new THREE.Color('#000000'); // force pure black
          gl.setClearColor('#000000', 1);
        }}
      >
        <Suspense fallback={null}>
          <group rotation={tilt}>
            <NeuralParticles count={safeCount} radius={radius} pointSize={pointSize} />
          </group>

          {/* Premium subtle glow — avoids white-out */}
          <EffectComposer>
            <Bloom
              intensity={0.35}
              luminanceThreshold={0.22}
              luminanceSmoothing={0.95}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
