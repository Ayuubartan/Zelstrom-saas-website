// src/components/ForecastPreview.tsx
'use client'

import { useMemo, useState } from 'react'
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { TooltipProps } from 'recharts'
import { AlertCircle, TrendingUp } from 'lucide-react'

type Point = {
  /** ISO date string or label */
  t: string
  /** Observed actual (can be null/undefined for future) */
  y?: number | null
  /** Forecast mean */
  yhat: number
  /** P10 / lower band */
  yhat_lo?: number | null
  /** P90 / upper band */
  yhat_hi?: number | null
}

export type ForecastPreviewProps = {
  title?: string
  metric?: string
  data?: Point[]
  formatX?: (t: string) => string
  formatY?: (v: number) => string
  loading?: boolean
  error?: string | null
  horizons?: string[] // e.g. ['7d','14d','30d']
  horizon?: string
  onHorizonChange?: (h: string) => void
  compact?: boolean
  hideControls?: boolean
  defaultVisibility?: {
    actuals?: boolean
    forecast?: boolean
    interval?: boolean
  }
}

/* ---------- Formatters ---------- */

const defaultFormatY = (v: number) =>
  Math.abs(v) >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${Math.round(v)}`

const defaultFormatX = (t: string) => {
  const d = new Date(t)
  if (Number.isNaN(d.getTime())) return t
  return d.toLocaleDateString(undefined, { month: 'short', day: '2-digit' })
}

/* ---------- Demo series (if no data passed) ---------- */

function useDemoSeries(): Point[] {
  return useMemo(() => {
    const out: Point[] = []
    const today = new Date()
    let base = 120
    for (let i = 0; i < 28; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - (27 - i))
      base += (Math.random() - 0.45) * 6
      const actual = i < 20 ? Math.max(0, base + (Math.random() - 0.5) * 8) : null
      const mean = Math.max(0, base + (Math.random() - 0.5) * 4)
      const lo = Math.max(0, mean * 0.9)
      const hi = mean * 1.1
      out.push({ t: d.toISOString(), y: actual, yhat: mean, yhat_lo: lo, yhat_hi: hi })
    }
    return out
  }, [])
}

/* ---------- Small UI blocks ---------- */

function EmptyState({ message = 'No forecast available.' }: { message?: string }) {
  return (
    <div className="grid h-48 place-items-center rounded-2xl border border-white/10 bg-white/5">
      <div className="flex items-center gap-2 text-white/70 text-sm">
        <TrendingUp className="h-4 w-4" />
        {message}
      </div>
    </div>
  )
}

function ErrorState({ error }: { error: string }) {
  return (
    <div className="grid h-48 place-items-center rounded-2xl border border-red-500/30 bg-red-500/10">
      <div className="flex items-center gap-2 text-red-300 text-sm">
        <AlertCircle className="h-4 w-4" />
        {error}
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="rounded-2xl border border-white/10 p-4">
      <div className="h-6 w-40 rounded bg-white/10 animate-pulse" />
      <div className="mt-4 h-40 rounded-xl bg-white/5 animate-pulse" />
    </div>
  )
}

function ToggleChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-2.5 py-1 text-xs transition ${
        active ? 'bg-white/90 text-black font-semibold' : 'text-white/80 hover:text-white hover:bg-white/10'
      }`}
      aria-pressed={active}
    >
      {label}
    </button>
  )
}

/* ---------- Tooltip (typed) ---------- */

type FPTooltipProps = TooltipProps<number, string> & {
  formatX?: (t: string) => string
  formatY?: (v: number) => string
  label?: string // Add the label property to the type
  payload?: { name: string; value: number | null }[] // Define the payload type explicitly
}

function ForecastTooltip({
  active,
  payload,
  label,
  formatX = defaultFormatX,
  formatY = defaultFormatY,
}: FPTooltipProps) {
  if (!active || !payload || payload.length === 0) return null

  // Build a name → value map, keeping only numeric values
  const entries: [string, number][] = []
  for (const p of payload) {
    const name = String(p.name)
    const val = typeof p.value === 'number' ? p.value : undefined
    if (val !== undefined && !Number.isNaN(val)) entries.push([name, val])
  }
  const map = Object.fromEntries(entries) as Record<string, number>

  return (
    <div className="rounded-xl border border-white/10 bg-black/90 px-3 py-2 text-xs text-white/90 shadow-lg">
      <div className="mb-1 font-medium text-white">{typeof label === 'string' ? formatX(label) : label}</div>
      {map['Actual'] != null && (
        <div className="flex items-center justify-between gap-4">
          <span className="opacity-75">Actual</span>
          <span>{formatY(map['Actual'])}</span>
        </div>
      )}
      {map['Forecast'] != null && (
        <div className="flex items-center justify-between gap-4">
          <span className="opacity-75">Forecast</span>
          <span>{formatY(map['Forecast'])}</span>
        </div>
      )}
      {(map['P10'] != null || map['P90'] != null) && (
        <div className="mt-1 text-white/70">
          <span className="opacity-75">Interval</span>{' '}
          {map['P10'] != null && map['P90'] != null ? `${formatY(map['P10'])} – ${formatY(map['P90'])}` : ''}
        </div>
      )}
    </div>
  )
}

/* ---------- Main Component ---------- */

export default function ForecastPreview({
  title = 'Forecast Preview',
  metric = 'KPI',
  data,
  formatX = defaultFormatX,
  formatY = defaultFormatY,
  loading,
  error,
  horizons = ['7d', '14d', '30d'],
  horizon,
  onHorizonChange,
  compact = false,
  hideControls = false,
  defaultVisibility = { actuals: true, forecast: true, interval: true },
}: ForecastPreviewProps) {
  const demo = useDemoSeries()
  const series = data?.length ? data : demo

  const [localH, setLocalH] = useState(horizon ?? horizons[1] ?? '14d')
  const currentH = horizon ?? localH
  const setH = (h: string) => {
    setLocalH(h)
    onHorizonChange?.(h)
  }

  const [showActual, setShowActual] = useState(!!defaultVisibility.actuals)
  const [showForecast, setShowForecast] = useState(!!defaultVisibility.forecast)
  const [showInterval, setShowInterval] = useState(!!defaultVisibility.interval)

  // Filter by horizon (assumes daily points)
  const filtered = useMemo(() => {
    const n = currentH?.endsWith('d') ? Number(currentH.replace('d', '')) : NaN
    if (!Number.isFinite(n) || n <= 0) return series
    return series.slice(-n)
  }, [series, currentH])

  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} />
  if (!filtered.length) return <EmptyState />

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm uppercase tracking-wide text-white/60">{metric}</div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        {!hideControls && (
          <div className="flex items-center gap-2">
            {/* Horizon */}
            <div className="hidden sm:flex items-center gap-1 rounded-xl border border-white/10 bg-black/40 p-1">
              {horizons.map((h) => (
                <button
                  key={h}
                  onClick={() => setH(h)}
                  className={`rounded-lg px-3 py-1 text-xs transition ${
                    h === currentH
                      ? 'bg-white/90 text-black font-semibold'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>

            {/* Series toggles */}
            <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-black/40 p-1">
              <ToggleChip label="Actual" active={showActual} onClick={() => setShowActual((v) => !v)} />
              <ToggleChip label="Forecast" active={showForecast} onClick={() => setShowForecast((v) => !v)} />
              <ToggleChip label="CI" active={showInterval} onClick={() => setShowInterval((v) => !v)} />
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className={`mt-3 ${compact ? 'h-56' : 'h-80'}`}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filtered} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="t"
              tickFormatter={formatX}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
              tickLine={{ stroke: 'rgba(255,255,255,0.15)' }}
              minTickGap={16}
            />
            <YAxis
              tickFormatter={formatY}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
              tickLine={{ stroke: 'rgba(255,255,255,0.15)' }}
              width={56}
            />
            <Tooltip content={<ForecastTooltip formatX={formatX} formatY={formatY} />} />
            <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.8)' }} />

            {/* Uncertainty band (rendered as two translucent areas) */}
            {showInterval && (
              <>
                <Area
                  type="monotone"
                  dataKey="yhat_hi"
                  name="P90"
                  stroke="none"
                  fill="rgba(59,130,246,0.18)" // blue-500-ish
                  isAnimationActive={false}
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="yhat_lo"
                  name="P10"
                  stroke="none"
                  fill="rgba(34,211,238,0.18)" // cyan-400-ish
                  isAnimationActive={false}
                  dot={false}
                />
              </>
            )}

            {/* Forecast mean */}
            {showForecast && (
              <Line
                type="monotone"
                dataKey="yhat"
                name="Forecast"
                stroke="rgba(59,130,246,0.95)" // blue-500
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            )}

            {/* Actuals */}
            {showActual && (
              <Line
                type="monotone"
                dataKey="y"
                name="Actual"
                stroke="rgba(34,211,238,1)" // cyan-400
                strokeWidth={2}
                dot={{ r: 2 }}
                isAnimationActive={false}
                connectNulls={false}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
