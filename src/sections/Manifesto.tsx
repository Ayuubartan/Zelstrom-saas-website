'use client'

import Section from './Section'
import Reveal from '@/components/motion/Reveal'

const principles = [
  'Data-in, value-out: every signal must yield measurable impact.',
  'Predictive by design, not afterthought.',
  'Automation > reports. Decisions at machine speed.',
  'Transparency beats opacity — always explainable.',
]

export default function Manifesto() {
  return (
    <Section id="manifesto" heading="Manifesto" subheading="Principles we stand by.">
      <ul className="space-y-4">
        {principles.map((p, i) => (
          <Reveal key={i}>
            <li className="text-zinc-300 text-lg leading-snug flex items-start">
              <span className="mr-3 text-cyan-400">▹</span>
              {p}
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
