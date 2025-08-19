'use client'

import MobileNav from './MobileNav'
import { useScrollSpy } from '@/hooks/useScrollSpy'

export default function Navbar() {
  const activeId = useScrollSpy(['work', 'manifesto', 'lab', 'contact'], 80)

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <a href="/" className="text-white font-bold text-lg">Zelstrom</a>

        {/* Desktop nav */}
        <ul className="hidden md:flex space-x-6">
          {['work','manifesto','lab','contact'].map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`transition-colors ${
                  activeId === id ? 'text-cyan-400' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
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
