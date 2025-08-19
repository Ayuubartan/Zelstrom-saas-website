'use client'

import Link from 'next/link'

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="rounded-full px-6 py-2 font-semibold
                 bg-cyan-500 text-black
                 hover:bg-cyan-400 hover:shadow-[0_0_20px_4px_rgba(34,211,238,0.7)]
                 transition-all duration-300"
    >
      Login
    </Link>
  )
}
