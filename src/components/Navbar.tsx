'use client'

import { useCallback, useMemo, useState } from 'react'
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

export default function Navbar() {
  const ids = useMemo(() => SECTIONS.map((s) => s.id), [])
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)

  const handleNav = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
    setOpen(false)
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav
        className="mx-auto max-w-6xl px-4 sm:px-6 mt-4"
        aria-label="Primary"
      >
        <div
          className="h-14 flex items-center justify-between rounded-2xl
                     border border-white/10 bg-black/50 backdrop-blur
                     shadow-[0_8px_30px_rgba(0,0,0,0.35)]
                     supports-[backdrop-filter]:bg-black/40"
        >
          {/* Brand */}
          <button
            onClick={() => handleNav('about')}
            className="ml-3 text-white font-semibold tracking-tight"
            aria-label="Zelstrom - go to About"
          >
            Zelstrom
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {SECTIONS.map((s) => {
              const isActive = active === s.id
              return (
                <li key={s.id}>
                  <button
                    onClick={() => handleNav(s.id)}
                    className="relative px-3 py-2 text-sm text-white/80 hover:text-white transition"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {s.label}
                    {/* active underline */}
                    <span
                      className={`pointer-events-none absolute left-2 right-2 -bottom-0.5 h-[2px] rounded
                                  transition-all duration-300
                                  ${isActive ? 'opacity-100 scale-100 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500' : 'opacity-0 scale-75'}`}
                    />
                  </button>
                </li>
              )
            })}
          </ul>

          {/* CTA + Mobile toggle */}
          <div className="mr-2 flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleNav('contact')
              }}
              className="hidden md:inline-flex rounded-full px-4 py-2 text-sm font-semibold
                         bg-cyan-500 text-black hover:bg-cyan-400 transition shadow"
            >
              Contact
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-2 rounded-2xl border border-white/10 bg-black/60 backdrop-blur p-2">
            {SECTIONS.map((s) => {
              const isActive = active === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => handleNav(s.id)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm text-white/85 hover:text-white hover:bg-white/10 transition
                              ${isActive ? 'bg-white/10' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {s.label}
                </button>
              )
            })}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleNav('contact')
              }}
              className="mt-1 block w-full text-center rounded-xl bg-cyan-500 px-3 py-2 text-sm font-semibold text-black hover:bg-cyan-400 transition"
            >
              Contact
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
