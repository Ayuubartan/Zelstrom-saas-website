'use client'
import { useFrame, useThree } from '@react-three/fiber'

export function ScrollCameraRig() {
  const { camera } = useThree()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    camera.position.z = 10 + Math.sin(t) * 0.5
  })

  return null
}
