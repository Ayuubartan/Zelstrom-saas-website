'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          Zelstrom
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-gray-300 font-medium">
          <Link href="#work" className="hover:text-white transition">Work</Link>
          <Link href="#manifesto" className="hover:text-white transition">Manifesto</Link>
          <Link href="#lab" className="hover:text-white transition">Lab</Link>
          <Link href="#contact" className="hover:text-white transition">Contact</Link>
          <button className="ml-4 px-5 py-2 rounded-full border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black transition">
            Login
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/90 px-6 py-4 space-y-4 text-gray-300 font-medium">
          <Link href="#work" onClick={() => setOpen(false)} className="block hover:text-white">Work</Link>
          <Link href="#manifesto" onClick={() => setOpen(false)} className="block hover:text-white">Manifesto</Link>
          <Link href="#lab" onClick={() => setOpen(false)} className="block hover:text-white">Lab</Link>
          <Link href="#contact" onClick={() => setOpen(false)} className="block hover:text-white">Contact</Link>
          <button className="w-full px-5 py-2 rounded-full border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black transition">
            Login
          </button>
        </div>
      )}
    </header>
  )
}
