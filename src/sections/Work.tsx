'use client'

import Section from './Section'
import Reveal from '@/components/motion/Reveal'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Database, Brain, Cpu } from 'lucide-react'

const features = [
  {
    icon: Database,
    title: 'Vault',
    desc: 'Unified ingestion layer. Normalize billions of media signals across every channel.',
  },
  {
    icon: Brain,
    title: 'Cortex',
    desc: 'Predictive intelligence. Forecast KPIs, optimize budgets, and adapt in real time.',
  },
  {
    icon: Cpu,
    title: 'OS',
    desc: 'Autonomous workflow engine. Automates reporting, insights, and optimization.',
  },
]

export default function Work() {
  return (
    <Section id="work" heading="Work" subheading="What we build.">
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={i}>
            <Card className="bg-gradient-to-br from-white/5 to-white/0 border-white/10 rounded-2xl">
              <CardHeader>
                <f.icon className="w-8 h-8 text-cyan-400 mb-2" />
                <CardTitle className="text-xl font-semibold text-white">
                  {f.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300 text-sm leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
