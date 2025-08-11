'use client'
import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

export default function NeuralVectors() {
  const groupRef = useRef<THREE.Group>(null)

  // Create points
  const points = useMemo(() => {
    const arr: THREE.Vector3[] = []
    for (let i = 0; i < 100; i++) {
      arr.push(new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(10),
        THREE.MathUtils.randFloatSpread(10),
        THREE.MathUtils.randFloatSpread(10)
      ))
    }
    return arr
  }, [])

  // Create lines between nearby points
  const lines = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    const vertices: number[] = []

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = points[i].distanceTo(points[j])
        if (dist < 3) { // connect only nearby points
          vertices.push(
            points[i].x, points[i].y, points[i].z,
            points[j].x, points[j].y, points[j].z
          )
        }
      }
    }

    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geom
  }, [points])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Glowing points */}
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>
      ))}

      {/* Connecting lines */}
      <lineSegments geometry={lines}>
        <lineBasicMaterial color="#00ffff" transparent opacity={0.2} />
      </lineSegments>
    </group>
  )
}
