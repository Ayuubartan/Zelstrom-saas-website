// src/sections/Section.tsx
'use client'

import * as React from 'react'
import Reveal from '../components/motion/Reveal'

export type SectionProps = React.PropsWithChildren<{
  id: string
  heading: string
  subheading?: string
  className?: string
}>

const Section: React.FC<SectionProps> = ({
  id,
  heading,
  subheading,
  children,
}) => {
  return (
    <section
      id={id}
      className="relative mx-auto max-w-6xl px-6 py-28 md:py-40 scroll-mt-24"
      aria-labelledby={`${id}-heading`}
    >
      <Reveal>
        <h2
          id={`${id}-heading`}
          className="text-3xl md:text-5xl font-semibold tracking-tight
                     bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500
                     bg-clip-text text-transparent"
        >
          {heading}
        </h2>
        {subheading && (
          <p className="mt-3 text-zinc-300 max-w-2xl text-lg leading-relaxed">
            {subheading}
          </p>
        )}
      </Reveal>
      <div className="mt-10">{children}</div>
    </section>
  )
}

export default Section
