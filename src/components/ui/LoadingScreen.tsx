// src/components/ui/LoadingScreen.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'

type Props = {
  /** Controls visibility (default: true) */
  show?: boolean
  /** Optional message under the spinner */
  message?: string
  /** 0–100 progress; if provided, a progress bar is shown */
  progress?: number | null
  /** Optional rotating tips shown beneath the message */
  tips?: string[]
  /** Minimum time (ms) to keep the loader visible to avoid flash (default: 400ms) */
  minVisibleMs?: number
}

export default function LoadingScreen({
  show = true,
  message = 'Booting Zelstrom Cortex…',
  progress = null,
  tips = [
    'Calibrating Bayesian MMM…',
    'Spinning up Neural Vectors…',
    'Syncing Vault connectors…',
    'Warming predictive caches…',
  ],
  minVisibleMs = 400,
}: Props) {
  const [mountedAt] = useState(() => Date.now())
  const [visible, setVisible] = useState(show)
  const [tipIdx, setTipIdx] = useState(0)

  // Smoothly hide after minVisibleMs has elapsed
  useEffect(() => {
    if (!show) {
      const elapsed = Date.now() - mountedAt
      const delay = Math.max(0, minVisibleMs - elapsed)
      const t = setTimeout(() => setVisible(false), delay)
      return () => clearTimeout(t)
    } else {
      setVisible(true)
    }
  }, [show, mountedAt, minVisibleMs])

  // Rotate tips every 2.2s
  useEffect(() => {
    if (!visible || tips.length <= 1) return
    const t = setInterval(() => setTipIdx((i) => (i + 1) % tips.length), 2200)
    return () => clearInterval(t)
  }, [visible, tips.length])

  const clamped = useMemo(
    () => (typeof progress === 'number' ? Math.min(100, Math.max(0, Math.round(progress))) : null),
    [progress]
  )

  if (!visible) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[1000] grid place-items-center bg-black/85 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center text-center px-6">
        {/* Brand mark */}
        <div className="mb-5 text-2xl font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Zelstrom
          </span>
        </div>

        {/* Spinner */}
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-white/15" />
          <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>

        {/* Message */}
        <p className="mt-4 text-sm text-white/80">{message}</p>

        {/* Progress bar (optional) */}
        {clamped !== null && (
          <div className="mt-4 w-64">
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-[width] duration-300"
                style={{ width: `${clamped}%` }}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={clamped}
              />
            </div>
            <div className="mt-1 text-xs text-white/60">{clamped}%</div>
          </div>
        )}

        {/* Rotating tips (optional) */}
        {tips.length > 0 && (
          <div className="mt-3 text-xs text-white/60 h-4">
            <span className="inline-block will-change-transform animate-[fadeIn_300ms_ease]">
              {tips[tipIdx]}
            </span>
          </div>
        )}
      </div>

      {/* Local keyframes for fade-in (no Tailwind config changes needed) */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
