// src/app/login/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // 🔐 TODO: hook up to real auth (NextAuth, Supabase, custom API, etc.)
    await new Promise((r) => setTimeout(r, 800))
    alert(`Login with ${email} / ${password}`)

    setLoading(false)
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur rounded-2xl border border-white/10 p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center">Login</h1>
        <p className="mt-2 text-center text-sm text-white/70">
          Access your Zelstrom account
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="sr-only" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg px-4 py-2 bg-zinc-800 text-white placeholder-zinc-400
                         border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          <div>
            <label className="sr-only" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg px-4 py-2 bg-zinc-800 text-white placeholder-zinc-400
                         border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full px-6 py-2 font-semibold
                       bg-cyan-500 text-black
                       hover:bg-cyan-400 hover:shadow-[0_0_20px_4px_rgba(34,211,238,0.7)]
                       transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white/70 space-y-2">
          <Link href="/forgot-password" className="hover:text-cyan-400">
            Forgot your password?
          </Link>
          <div>
            Don’t have an account?{' '}
            <Link href="/signup" className="text-cyan-400 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
