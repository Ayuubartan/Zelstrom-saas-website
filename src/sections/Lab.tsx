'use client'

import Section from './Section'
import Reveal from '@/components/motion/Reveal'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'

const experiments = [
  {
    title: 'Z.A.O.E.',
    desc: 'Zelstrom Autonomous Optimization Engine — real-time campaign tuning.',
  },
  {
    title: 'Negotiator™',
    desc: 'AI-driven media procurement intelligence with live market dynamics.',
  },
  {
    title: 'Neural Vectors',
    desc: 'Experimental visual layer: cinematic storytelling for analytics.',
  },
]

export default function Lab() {
  return (
    <Section id="lab" heading="Lab" subheading="Where we push the frontier.">
      <div className="grid gap-6 md:grid-cols-3">
        {experiments.map((exp, i) => (
          <Reveal key={i}>
            <Card className="bg-gradient-to-br from-white/5 to-white/0 border-white/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white">
                  {exp.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 text-sm leading-relaxed">{exp.desc}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
