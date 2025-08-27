// src/components/ui/ThemeToggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun, Laptop } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const current = theme === 'system' ? systemTheme : theme

  return (
    <div className="flex items-center gap-2">
      {/* Current mode indicator */}
      {current === 'dark' ? (
        <Moon className="h-5 w-5 text-cyan-400" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-400" />
      )}

      {/* Switcher */}
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="rounded-md border border-white/20 bg-black/60 px-2 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none"
      >
        <option value="system">system</option>
        <option value="light">light</option>
        <option value="dark">dark</option>
      </select>
    </div>
  )
}
