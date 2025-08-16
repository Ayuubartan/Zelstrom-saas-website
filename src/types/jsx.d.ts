import * as THREE from 'three'
import { Object3DNode } from '@react-three/fiber'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      particleMaterial: Object3DNode<THREE.ShaderMaterial, typeof THREE.ShaderMaterial> & {
        'uniforms-uPointSize-value'?: number
        'uniforms-uRadius-value'?: number
        'uniforms-uTime-value'?: number
        'uniforms-uMouse-value'?: [number, number] | THREE.Vector2
        transparent?: boolean
        depthWrite?: boolean
        blending?: THREE.Blending
      }
    }
  }
}
export {}
