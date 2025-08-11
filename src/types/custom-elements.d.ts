import * as THREE from 'three';
import { ThreeElements } from '@react-three/fiber';

// Augment the intrinsic elements for JSX
declare module '@react-three/fiber' {
  interface ThreeElements {
    particleMaterial: ThreeElements['shaderMaterial'] & {
      uTime?: number;
      uMouse?: THREE.Vector2;
    };
  }
}

export {};
