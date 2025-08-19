'use client'

import { useEffect, useState } from 'react'

export function useScrollSpy(sectionIds: string[], offset: number = 0) {
  const [activeId, setActiveId] = useState<string>()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + offset + 1
      let currentId = sectionIds[0]

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          if (scrollY >= top) {
            currentId = id
          }
        }
      }

      setActiveId(currentId)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // run on mount

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sectionIds, offset])

  return activeId
}
