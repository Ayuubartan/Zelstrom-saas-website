// src/sections/Differentiators.tsx
'use client'
import Section from './Section'
import Reveal from '@/components/motion/Reveal'

const points = [
  {
    title: 'Predictive-first Architecture',
    desc: 'Feature pipelines, temporal CV, leakage checks, and backtests are built-in—not bolted on.',
  },
  {
    title: 'Causal + Econometric Spine',
    desc: 'Bayesian MMM fused with experiment data and sequence models avoids naive last-click traps.',
  },
  {
    title: 'Autonomous Controls (Z.A.O.E.)',
    desc: 'Budget/bid/pacing adjustments within guardrails—always explainable, always reversible.',
  },
  {
    title: 'EU-grade Compliance',
    desc: 'Data residency, RBAC, audit trails by default. Built for Nordics/EU standards.',
  },
]

export default function Differentiators() {
  return (
    <Section
      id="differentiators"
      heading="Why Zelstrom Wins"
      subheading="Replace manual ops with real-time intelligence that explains itself."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {points.map((p) => (
          <Reveal key={p.title}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
              <h3 className="text-white font-semibold text-lg">{p.title}</h3>
              <p className="mt-2 text-zinc-300 leading-relaxed">{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
