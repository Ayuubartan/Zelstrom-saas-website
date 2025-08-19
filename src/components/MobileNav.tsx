'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const sections = [
  { id: 'work', label: 'Work' },
  { id: 'manifesto', label: 'Manifesto' },
  { id: 'lab', label: 'Lab' },
  { id: 'contact', label: 'Contact' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)} className="p-2 text-white">
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/90 z-40 flex flex-col items-center justify-center space-y-8">
          {sections.map((s) => (
            <Link
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className="text-2xl text-white hover:text-cyan-400 transition"
            >
              {s.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
