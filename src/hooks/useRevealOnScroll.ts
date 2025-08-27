// src/hooks/useRevealOnScroll.ts
'use client'

import { useEffect, useRef } from 'react'

export default function useRevealOnScroll<T extends HTMLElement>(
  options?: IntersectionObserverInit & { once?: boolean }
) {
  const ref = useRef<T | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const { once = true, root = null, rootMargin = '0px', threshold = 0.12 } = options ?? {}
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('revealed')
            if (once) obs.unobserve(entry.target)
          } else if (!once) {
            el.classList.remove('revealed')
          }
        })
      },
      { root, rootMargin, threshold }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [options])

  return ref
}
