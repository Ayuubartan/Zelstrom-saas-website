// src/components/MobileNav.tsx
'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useActiveSection } from '@/hooks/useActiveSection'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'differentiators', label: 'Why Us' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'lab', label: 'Lab' },
  { id: 'manifesto', label: 'Manifesto' },
  { id: 'contact', label: 'Contact' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const ids = useMemo(() => SECTIONS.map(s => s.id), [])
  const active = useActiveSection(ids)

  // Lock body scroll while menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [open])

  // Close on ESC
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Click outside to close (only when clicking the dark backdrop)
  const onOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) setOpen(false)
  }, [])

  // Smooth scroll + update hash without jump
  const handleNav = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
    setOpen(false)
  }, [])

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="p-2 rounded-xl text-white/85 hover:text-white hover:bg-white/10 transition"
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {open && (
        <div
          id="mobile-menu"
          ref={overlayRef}
          onClick={onOverlayClick}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-x-4 top-20 rounded-2xl border border-white/10 bg-black/70 p-2">
            <nav aria-label="Mobile">
              {SECTIONS.map((s) => {
                const isActive = active === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => handleNav(s.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base transition
                                text-white/90 hover:text-white hover:bg-white/10
                                ${isActive ? 'bg-white/10' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {s.label}
                  </button>
                )
              })}
              <div className="px-4 pb-2 pt-1">
                <button
                  onClick={() => handleNav('contact')}
                  className="w-full rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-black hover:bg-cyan-400 transition"
                >
                  Contact
                </button>
              </div>
            </nav>
          </div>

          {/* Top-right close button inside overlay for convenience */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/85 hover:text-white hover:bg-white/10 transition"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}
