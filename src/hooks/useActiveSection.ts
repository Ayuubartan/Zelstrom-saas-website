// src/hooks/useActiveSection.ts
'use client'

import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds: string[], options?: IntersectionObserverInit) {
  const [active, setActive] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    if (!elements.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        // pick the most visible entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      {
        root: null,
        rootMargin: '0px 0px -40% 0px', // highlight earlier during upward scroll
        threshold: [0.1, 0.25, 0.5, 0.75],
        ...options,
      }
    )

    elements.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [sectionIds, options])

  return active
}

