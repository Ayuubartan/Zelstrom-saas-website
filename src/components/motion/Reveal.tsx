// src/components/motion/Reveal.tsx
'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type Dir = 'up' | 'down' | 'left' | 'right'

export default function Reveal({
  children,
  delay = 0,
  y = 16,                 // kept for backward compatibility
  once = true,
  dir,                    // 'up' | 'down' | 'left' | 'right'
  distance = 16,          // px
  blur = 4,               // px
  scaleFrom = 0.995,      // subtle pop
  duration = 0.6,
  easing = 'easeOut',
}: {
  children: ReactNode
  delay?: number
  y?: number
  once?: boolean
  dir?: Dir
  distance?: number
  blur?: number
  scaleFrom?: number
  duration?: number
  easing?: any
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { margin: '-10% 0px -10% 0px', once })
  const prefersReduced = useReducedMotion()

  // derive axis offset from dir (fallback to legacy `y`)
  const offset = (() => {
    if (dir === 'up') return { x: 0, y: distance }
    if (dir === 'down') return { x: 0, y: -distance }
    if (dir === 'left') return { x: distance, y: 0 }
    if (dir === 'right') return { x: -distance, y: 0 }
    return { x: 0, y } // legacy path
  })()

  const initial = prefersReduced
    ? { opacity: 0 }
    : { opacity: 0, x: offset.x, y: offset.y, filter: `blur(${blur}px)`, scale: scaleFrom }

  const animate = prefersReduced
    ? { opacity: 1 }
    : { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', scale: 1 }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? animate : {}}
      transition={{ duration, ease: easing, delay }}
    >
      {children}
    </motion.div>
  )
}
