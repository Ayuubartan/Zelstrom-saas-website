// src/data/logos.ts
export type IntegrationLogo = {
  name: string
  slug: string
  tier: 1 | 2 | 3
  logo: string                 // local path or remote URL
  logoDark?: string            // optional dark variant
  fallback?: string            // remote fallback (e.g., Clearbit)
  invertOnDark?: boolean       // auto invert when only one variant
  soon?: boolean               // show "Soon" badge
}

export const INTEGRATION_LOGOS: IntegrationLogo[] = [
  // ---- Tier 1 (local, official) ----
  { name: 'Google Ads',       slug: 'google-ads',    tier: 1,
    logo: '/logos/google-ads.png',    logoDark: '/logos/google-ads-dark.png' },

  { name: 'Meta Ads',         slug: 'meta-ads',      tier: 1,
    logo: '/logos/meta-ads.png',      logoDark: '/logos/meta-ads-dark.png' },

  { name: 'TikTok',           slug: 'tiktok',        tier: 1,
    logo: '/logos/tiktok.png',        logoDark: '/logos/tiktok-dark.png' },

  { name: 'DV360',            slug: 'dv360',         tier: 1,
    logo: '/logos/dv360.png',         logoDark: '/logos/dv360-dark.png' },

  { name: 'The Trade Desk',   slug: 'trade-desk',    tier: 1,
    logo: '/logos/trade-desk.png',    logoDark: '/logos/trade-desk-dark.png' },

  // ---- Tier 2 (local, official) ----
  { name: 'Snap',             slug: 'snap',          tier: 2,
    logo: '/logos/snap.png',          logoDark: '/logos/snap-dark.png' },

  { name: 'X Ads',            slug: 'x-ads',         tier: 2,
    logo: '/logos/x-ads.png',         logoDark: '/logos/x-ads-dark.png' },

  { name: 'LinkedIn Ads',     slug: 'linkedin',      tier: 2,
    logo: '/logos/linkedin.png',      logoDark: '/logos/linkedin-dark.png',
    soon: true },

  { name: 'Pinterest Ads',    slug: 'pinterest',     tier: 2,
    logo: '/logos/pinterest.png',     logoDark: '/logos/pinterest-dark.png',
    soon: true },

  { name: 'Amazon Ads',       slug: 'amazon-ads',    tier: 2,
    logo: '/logos/amazon-ads.png',    logoDark: '/logos/amazon-ads-dark.png',
    soon: true },

  // ---- Tier 3 (Clearbit, fast bootstrap) ----
  // If you later download official assets, just swap `logo` to /logos/*.png and (optionally) add a logoDark.
  { name: 'OOH Supply',       slug: 'ooh',           tier: 3,
    logo: 'https://logo.clearbit.com/clearchannel.com',
    // no official dark → auto-adapt
    invertOnDark: true, soon: true },

  { name: 'CTV / Streaming',  slug: 'ctv',           tier: 3,
    logo: 'https://logo.clearbit.com/roku.com',
    invertOnDark: true, soon: true },

  { name: 'Spotify Ads',      slug: 'spotify',       tier: 3,
    logo: 'https://logo.clearbit.com/spotify.com',
    // you also have local files available:
    // logo: '/logos/spotify.png', logoDark: '/logos/spotify-dark.png',
    fallback: 'https://logo.clearbit.com/spotify.com',
    soon: true },

  { name: 'Reddit Ads',       slug: 'reddit',        tier: 3,
    logo: 'https://logo.clearbit.com/reddit.com',
    // or local:
    // logo: '/logos/reddit.png', logoDark: '/logos/reddit-dark.png',
    fallback: 'https://logo.clearbit.com/reddit.com',
    soon: true },

  { name: 'Taboola / Outbrain', slug: 'taboola',     tier: 3,
    logo: 'https://logo.clearbit.com/taboola.com',
    // or local:
    // logo: '/logos/taboola.png', logoDark: '/logos/taboola-dark.png',
    fallback: 'https://logo.clearbit.com/outbrain.com',
    soon: true },
]
