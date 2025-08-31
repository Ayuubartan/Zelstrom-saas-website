// src/sections/Integrations.tsx
'use client'

import Reveal from '@/components/motion/Reveal'
import SmartLogo from '@/components/SmartLogo'
import { INTEGRATION_LOGOS } from '@/data/logos'

/**
 * Group integration items by tier for display
 */
function groupByTier(items: typeof INTEGRATION_LOGOS) {
  return {
    1: items.filter(i => i.tier === 1),
    2: items.filter(i => i.tier === 2),
    3: items.filter(i => i.tier === 3),
  } as const
}

function LogoCard({
  name,
  logo,
  logoDark,
  fallback,
  invertOnDark,
  soon,
}: {
  name: string
  logo: string
  logoDark?: string
  fallback?: string
  invertOnDark?: boolean
  soon?: boolean
}) {
  return (
    <li className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
      <SmartLogo
        src={logo}
        srcDark={logoDark}
        fallbackSrc={fallback}
        alt={name}
        boxClassName="h-10 w-32"
        invertOnDark={invertOnDark}
      />
      <span className="text-sm text-white/85">{name}</span>
      {soon && (
        <span
          className="ml-auto rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs text-yellow-400 ring-1 ring-yellow-500/30"
          aria-label={`${name} coming soon`}
        >
          Soon
        </span>
      )}
    </li>
  )
}

/**
 * Integrations Section
 */
export default function Integrations() {
  const tiers = groupByTier(INTEGRATION_LOGOS)

  return (
    <section
      id="integrations"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-40"
    >
      <Reveal>
        <h2 className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-3xl font-semibold tracking-tight text-transparent md:text-5xl">
          Integrations
        </h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-300">
          Tiered partners across paid social, programmatic, and traditional media.
        </p>

        {[1, 2, 3].map(tier => (
          <div key={tier} className="mt-12">
            <h3 className="mb-4 text-sm uppercase tracking-wider text-zinc-400">
              Tier {tier}
            </h3>
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {tiers[tier as 1 | 2 | 3].map(integration => (
                <LogoCard key={integration.slug} {...integration} />
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
