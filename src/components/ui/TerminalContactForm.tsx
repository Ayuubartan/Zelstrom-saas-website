// src/components/ui/TerminalContactForm.tsx
'use client'

import { useState } from 'react'

export default function TerminalContactForm() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    // TODO: hook up to Formspree, API route, or serverless function
    await new Promise((r) => setTimeout(r, 1200))

    console.log('Form submission:', {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    })

    setLoading(false)
    setSent(true)
    e.currentTarget.reset()
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/80 px-6 py-8 font-mono text-green-400 shadow-lg">
        <p>&gt; Message transmitted successfully ✅</p>
        <p className="mt-2 text-white/70 text-sm">We’ll be in touch soon.</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-black/80 px-6 py-8 font-mono text-white shadow-lg"
    >
      <p className="mb-4 text-cyan-400">&gt; init contact --with=Zelstrom</p>

      <label className="block mb-4">
        <span className="block text-sm text-white/70">name:</span>
        <input
          type="text"
          name="name"
          required
          className="mt-1 w-full rounded-md border border-white/20 bg-black/60 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
          placeholder="Jane Doe"
        />
      </label>

      <label className="block mb-4">
        <span className="block text-sm text-white/70">email:</span>
        <input
          type="email"
          name="email"
          required
          className="mt-1 w-full rounded-md border border-white/20 bg-black/60 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
          placeholder="jane@example.com"
        />
      </label>

      <label className="block mb-6">
        <span className="block text-sm text-white/70">message:</span>
        <textarea
          name="message"
          rows={4}
          required
          className="mt-1 w-full rounded-md border border-white/20 bg-black/60 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
          placeholder="Let's talk about predictive media intelligence..."
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center rounded-md bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 px-4 py-2 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-black border-t-transparent" />
            sending…
          </span>
        ) : (
          'send message'
        )}
      </button>
    </form>
  )
}
