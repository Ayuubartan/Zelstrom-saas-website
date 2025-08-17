// src/hooks/useRevealOnScroll.ts
'use client'

import { useEffect, useRef } from 'react'

export default function useRevealOnScroll<T extends HTMLElement>(
  opts?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a class or data-attr your CSS can target for reveal animations
          el.classList.add('revealed')
          io.unobserve(el)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1, ...(opts || {}) }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [opts])

  return ref
}
