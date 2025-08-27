// src/sections/About.tsx
'use client'

import Section from './Section'
import Reveal from '@/components/motion/Reveal'

export default function About() {
  return (
    <Section
      id="about"
      heading="About Zelstrom"
      subheading="AI-native infrastructure for predictive, autonomous marketing."
    >
      <div className="grid gap-8 md:grid-cols-2">
        <Reveal>
          <div className="rounded-2xl border border-white/10 p-6 bg-white/5">
            <h3 className="text-xl font-semibold text-white">Our Mission</h3>
            <p className="mt-3 text-zinc-300 leading-relaxed">
              Unify fragmented media signals into a single intelligence layer that plans, optimizes, and
              negotiates in real time—so brands compound performance, not overhead.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-white/10 p-6 bg-white/5">
            <h3 className="text-xl font-semibold text-white">What Makes Us Different</h3>
            <ul className="mt-3 space-y-3 text-zinc-300 leading-relaxed">
              <li>▹ Region-aware models (Nordics → EU) with hard validation.</li>
              <li>▹ Tabular DL + Bayesian MMM + sequence forecasting in one stack.</li>
              <li>▹ API-first: Vault (data), Cortex (models), OS (automation).</li>
              <li>▹ Explainable outputs. No black boxes. Decisions with rationale.</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
