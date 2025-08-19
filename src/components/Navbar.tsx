'use client'

import Link from 'next/link'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import MobileNav from './MobileNav'

const sections = [
  { id: 'work', label: 'Work' },
  { id: 'manifesto', label: 'Manifesto' },
  { id: 'lab', label: 'Lab' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const activeId = useScrollSpy(sections.map((s) => s.id), 80)

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* MUST be Link, not <a href="/"> */}
        <Link href="/" className="text-white font-bold text-lg">
          Zelstrom
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex space-x-6">
          {sections.map((s) => (
            <li key={s.id}>
              {/* hash links are fine as <a> */}
              <a
                href={`#${s.id}`}
                className={`transition-colors ${
                  activeId === s.id ? 'text-cyan-400' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile nav */}
        <MobileNav />
      </div>
    </nav>
  )
}
