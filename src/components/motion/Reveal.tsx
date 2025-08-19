// src/components/motion/Reveal.tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Reveal({
  children,
  delay = 0,
  y = 16,
  once = true,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  once?: boolean
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { margin: '-10% 0px -10% 0px', once })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
