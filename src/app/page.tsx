// src/app/page.tsx
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Keep Hero eagerly loaded (above-the-fold)
import Hero from '@/sections/Hero'

// Lazy-load everything else to trim initial JS
const About = dynamic(() => import('@/sections/About'))
const Work = dynamic(() => import('@/sections/Work'))
const Differentiators = dynamic(() => import('@/sections/Differentiators'))
const Integrations = dynamic(() =>
  import('@/sections/Integrations').then((m) => m.default)
)
const Lab = dynamic(() => import('@/sections/Lab'))
const Manifesto = dynamic(() => import('@/sections/Manifesto'))
const Contact = dynamic(() => import('@/sections/Contact'))

function SectionSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
      <div className="h-8 w-64 animate-pulse rounded-lg bg-white/10" />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="h-24 animate-pulse rounded-2xl bg-white/5" />
        <div className="h-24 animate-pulse rounded-2xl bg-white/5" />
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
