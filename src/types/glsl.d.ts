import { Object3DNode } from '@react-three/fiber'

import { ShaderMaterial } from 'three'

// Replace `ShaderMaterial` with your custom shader material type if available
import { ParticleMaterial } from '@/components/three/NeuralParticles'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      particleMaterial: Object3DNode<typeof ParticleMaterial, typeof ParticleMaterial>
    }
  }
}
