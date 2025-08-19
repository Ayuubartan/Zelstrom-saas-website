'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

type LenisInstance = {
  raf: (time: number) => void
  destroy: () => void
}

export default function SmoothScroll() {
  useEffect(() => {
    // Minimal constructor typing to avoid ts-ignore while keeping it robust
    const L = Lenis as unknown as {
      new (opts?: Record<string, unknown>): LenisInstance
    }

    const lenis: LenisInstance = new L({
      smoothWheel: true,
      syncTouch: true,
      lerp: 0.08,
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = window.requestAnimationFrame(raf)
    }

    rafId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return null
}
