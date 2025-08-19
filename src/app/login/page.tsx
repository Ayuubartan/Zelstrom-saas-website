'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 🔐 TODO: add real auth logic here
    alert(`Login with ${email} / ${password}`)
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg px-4 py-2 bg-zinc-800 text-white placeholder-zinc-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg px-4 py-2 bg-zinc-800 text-white placeholder-zinc-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <button
            type="submit"
            className="w-full rounded-full px-6 py-2 font-semibold
                       bg-cyan-500 text-black
                       hover:bg-cyan-400 hover:shadow-[0_0_20px_4px_rgba(34,211,238,0.7)]
                       transition-all duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  )
}
