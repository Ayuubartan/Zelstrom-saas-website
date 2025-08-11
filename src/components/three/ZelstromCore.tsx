import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

export function ZelstromCore() {
  const meshRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + 0.2 * Math.sin(clock.elapsedTime * 2))
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial color="cyan" emissive="blue" metalness={0.9} roughness={0.2} />
    </mesh>
  )
}
