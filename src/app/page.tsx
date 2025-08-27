// src/app/page.tsx
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Keep Hero eagerly loaded (it’s your above-the-fold scene)
import Hero from '@/sections/Hero'

// Lazy-load everything else to trim initial JS
const About = dynamic(() => import('@/sections/About'))
const Work = dynamic(() => import('@/sections/Work'))
const Differentiators = dynamic(() => import('@/sections/Differentiators'))
const Integrations = dynamic(() => import('@/sections/Integrations'))
const Lab = dynamic(() => import('@/sections/Lab'))
const Manifesto = dynamic(() => import('@/sections/Manifesto'))
const Contact = dynamic(() => import('@/sections/Contact'))

// Tiny shimmer used while sections stream in
function SectionSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
      <div className="h-8 w-64 rounded-lg bg-white/10 animate-pulse" />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="h-24 rounded-2xl bg-white/5 animate-pulse" />
        <div className="h-24 rounded-2xl bg-white/5 animate-pulse" />
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      <Hero />

      <Suspense fallback={<SectionSkeleton />}>
        <About />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Work />
      </Suspense>

      {/* Ensure this section file uses id="differentiators" so the navbar "Why Us" works */}
      <Suspense fallback={<SectionSkeleton />}>
        <Differentiators />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Integrations />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Lab />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Manifesto />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Contact />
      </Suspense>
    </main>
  )
}
