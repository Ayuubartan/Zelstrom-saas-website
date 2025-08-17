// src/hooks/useParticleBudget.ts
'use client'
import { useEffect, useMemo, useState } from 'react'

export default function useParticleBudget() {
  const [w, setW] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  const mem = typeof (navigator as any)?.deviceMemory === 'number' ? (navigator as any).deviceMemory : undefined

  useEffect(() => {
    const onResize = () => setW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // crude buckets; tune with real device testing
  const tier = useMemo(() => {
    if (w < 420 || dpr > 2.5 || (mem && mem <= 4)) return 'low'
    if (w < 768 || dpr > 2) return 'mid'
    return 'high'
  }, [w, dpr, mem])

  const count = tier === 'low' ? 12000 : tier === 'mid' ? 24000 : 48000

  return { tier, count }
}
