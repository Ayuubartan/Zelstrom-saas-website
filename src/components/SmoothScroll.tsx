// src/components/SmoothScroll.tsx
'use client'

import { PropsWithChildren, useEffect } from 'react'

export default function SmoothScroll({ children }: PropsWithChildren) {
  useEffect(() => {
    const Lenis = require('lenis').default
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true })
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return <>{children}</>
}
