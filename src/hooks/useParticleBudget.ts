// src/hooks/useParticleBudget.ts
'use client'
import { useEffect, useMemo, useState } from 'react'

// Narrow Navigator to include (optional) deviceMemory without using `any`
type NavigatorWithDeviceMemory = Navigator & { deviceMemory?: number }

export default function useParticleBudget() {
  const [w, setW] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )

  // DPR and device memory are runtime-only
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  const nav: NavigatorWithDeviceMemory | undefined =
    typeof navigator !== 'undefined' ? (navigator as NavigatorWithDeviceMemory) : undefined
  const mem = typeof nav?.deviceMemory === 'number' ? nav!.deviceMemory : undefined

  useEffect(() => {
    const onResize = () => setW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // crude buckets; tune with real device testing
  const tier = useMemo<'low' | 'mid' | 'high'>(() => {
    if (w < 420 || dpr > 2.5 || (mem !== undefined && mem <= 4)) return 'low'
    if (w < 768 || dpr > 2) return 'mid'
    return 'high'
  }, [w, dpr, mem])

  const count = tier === 'low' ? 12_000 : tier === 'mid' ? 24_000 : 48_000

  return { tier, count }
}
