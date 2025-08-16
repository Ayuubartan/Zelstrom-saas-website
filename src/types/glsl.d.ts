import { Object3DNode } from '@react-three/fiber'

// Keep this file only if you actually declare GLSL modules, otherwise delete it.
declare module '*.glsl' {
  const value: string
  export default value
}


// Replace `ShaderMaterial` with your custom shader material type if available
import { ParticleMaterial } from '@/components/three/NeuralParticles'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      particleMaterial: Object3DNode<typeof ParticleMaterial, typeof ParticleMaterial>
    }
  }
}
