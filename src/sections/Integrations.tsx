// src/sections/Integrations.tsx
'use client'

import Section from './Section'
import Image from 'next/image'

type Integration = {
  name: string
  logo: string
  tier: 1 | 2 | 3
  soon?: boolean
}

const integrations: Integration[] = [
  // Tier 1
  { name: 'Google Ads', logo: '/logos/google-ads.png', tier: 1 },
  { name: 'Meta Ads', logo: '/logos/meta-ads.png', tier: 1 },
  { name: 'TikTok', logo: '/logos/tiktok.png', tier: 1 },
  { name: 'DV360', logo: '/logos/dv360.png', tier: 1 },
  { name: 'The Trade Desk', logo: '/logos/trade-desk.png', tier: 1 },

  // Tier 2
  { name: 'Snap', logo: '/logos/snap.png', tier: 2 },
  { name: 'X Ads', logo: '/logos/x-ads.png', tier: 2 },
  { name: 'LinkedIn Ads', logo: '/logos/linkedin.png', tier: 2, soon: true },
  { name: 'Pinterest Ads', logo: '/logos/pinterest.png', tier: 2, soon: true },
  { name: 'Amazon Ads', logo: '/logos/amazon-ads.png', tier: 2, soon: true },

  // Tier 3
  { name: 'OOH Supply', logo: '/logos/ooh.png', tier: 3, soon: true },
  { name: 'CTV / Streaming', logo: '/logos/ctv.png', tier: 3, soon: true },
  { name: 'Spotify Ads', logo: '/logos/spotify.png', tier: 3, soon: true },
  { name: 'Reddit Ads', logo: '/logos/reddit.png', tier: 3, soon: true },
  { name: 'Taboola / Outbrain', logo: '/logos/taboola.png', tier: 3, soon: true },
]

export default function Integrations() {
  return (
    <Section
      id="integrations"
      heading="Integrations"
      subheading="Zelstrom connects with Tier-1 to Tier-3 ad platforms for unified intelligence."
    >
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {integrations.map((int) => (
          <div
            key={int.name}
            className="relative flex items-center justify-center rounded-2xl border border-white/10 bg-black/40 p-6 hover:bg-white/5 transition"
          >
            <Image
              src={int.logo}
              alt={int.name}
              width={36}
              height={36}
              className="mr-3 h-9 w-9 object-contain"
            />
            <span className="text-white/90 font-medium">{int.name}</span>

            {int.soon && (
              <span className="absolute top-2 right-2 rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
                soon
              </span>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
