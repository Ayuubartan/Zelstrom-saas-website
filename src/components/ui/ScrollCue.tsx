// src/components/ui/ScrollCue.tsx
'use client'
export default function ScrollCue() {
  return (
    <div className="pointer-events-none absolute bottom-6 left-1/2 z-30 -translate-x-1/2 animate-bounce">
      <div className="h-8 w-px bg-white/30 mx-auto" />
      <div className="mt-2 h-3 w-3 rotate-45 border-b border-r border-white/60" />
    </div>
  )
}
