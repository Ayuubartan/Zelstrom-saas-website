// src/sections/Differentiators.tsx
'use client'
import useRevealOnScroll from '@/hooks/useRevealOnScroll'

export default function Differentiators() {
  const ref = useRevealOnScroll<HTMLDivElement>()
  return (
    <section
      ref={ref}
      className="mx-auto max-w-6xl px-6 py-24 opacity-0 translate-y-6 transition-all duration-700 will-change-transform revealed:opacity-100 revealed:translate-y-0"
    >
      {/* content */}
    </section>
  )
}
