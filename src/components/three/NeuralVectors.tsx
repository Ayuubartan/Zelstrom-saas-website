export type NeuralVectorsProps = {
  _text?: string
  _particleCount?: number
  _color?: string
  _radius?: number
  _pointSize?: number
  _enableBloom?: boolean
  _target?: 'text' | 'sphere' | 'logo'
  _morphSpeed?: number
}

export default function NeuralVectors({
  _text = 'ZELSTROM',
  _particleCount = 6000,
  _color = '#aefcff',
  _radius = 3.0,
  _pointSize = 2.0,
  _enableBloom = true,
  _target = 'text',
  _morphSpeed = 0.8,
}: NeuralVectorsProps) {
  // ...existing scene
  return <group />
}
