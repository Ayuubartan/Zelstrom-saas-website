// src/components/ui/LoadingOverlay.tsx
'use client'
import { useEffect, useState } from 'react'
import { Html, useProgress } from '@react-three/drei'

export default function LoadingOverlay({ onReady }: { onReady?: () => void }) {
  const { active, progress } = useProgress()
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (!active) {
      // brief delay to avoid flicker when instantly ready
      const t = setTimeout(() => {
        setHidden(true)
        onReady?.()
      }, 250)
      return () => clearTimeout(t)
    }
  }, [active, onReady])

  if (hidden) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center bg-[#0B0F1A]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-1.5 w-48 overflow-hidden rounded bg-white/10">
          <div
            className="h-full rounded bg-white/80 transition-[width]"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
        <p className="text-xs tracking-wide text-white/70">{Math.round(progress)}%</p>
      </div>
    </div>
  )
}
