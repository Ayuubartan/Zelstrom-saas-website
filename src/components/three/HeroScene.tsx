'use client';

import { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import NeuralParticles from './NeuralParticles'; // same folder

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 100 }}
        onCreated={({ scene, gl }) => {
          scene.background = new THREE.Color('#000000');
          gl.setClearColor('#000000', 1);
        }}
      >
        <Suspense fallback={null}>
          {/* Subtle tilt to match the reference diagonal */}
          <group rotation={[0.1, 0.0, 0.38]}>
            <NeuralParticles />
          </group>

          <EffectComposer>
            <Bloom
              intensity={0.9}
              luminanceThreshold={0.12}
              luminanceSmoothing={0.85}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
