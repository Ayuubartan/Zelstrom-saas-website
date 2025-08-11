import { ParticleMaterial } from '@/components/three/NeuralParticles'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      particleMaterial: ReactThreeFiber.Object3DNode<
        typeof ParticleMaterial,
        typeof ParticleMaterial
      >
    }
  }
}
