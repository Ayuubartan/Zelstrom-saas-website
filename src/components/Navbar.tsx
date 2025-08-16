'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition
      ${scrolled ? 'backdrop-blur bg-black/40 border-b border-white/10' : 'bg-transparent'}`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="text-white font-semibold tracking-tight">Zelstrom</Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/#work" className="text-white/80 hover:text-white">Work</Link>
          <Link href="/#manifesto" className="text-white/80 hover:text-white">Manifesto</Link>
          <Link href="/#lab" className="text-white/80 hover:text-white">Lab</Link>
          <Link href="/#contact" className="text-white/80 hover:text-white">Contact</Link>
          <Link
            href="/login"
            className="ml-2 rounded-xl border border-white/20 px-3 py-1.5 text-white hover:bg-white/10 transition"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  )
}
