// src/types/custom-elements.d.ts
import * as THREE from 'three'
declare global {
  namespace JSX {
    interface IntrinsicElements {
      particleMaterial: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        ref?: React.Ref<THREE.ShaderMaterial>
        transparent?: boolean
        depthWrite?: boolean
        blending?: THREE.Blending
        // Allow setting uniform defaults via JSX (r3f pattern)
        'uniforms-uPointSize-value'?: number
        'uniforms-uRadius-value'?: number
      }
    }
  }
}
export {}
