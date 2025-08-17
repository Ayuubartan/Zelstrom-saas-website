// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zelstrom.io';
  const routes = ['', '#work', '#manifesto', '#lab', '#contact'] // anchors included for reference
    .map((p) => ({
      url: `${base}/${p}`.replace(/\/#/, '#'),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 1 : 0.6,
    }));
  return routes;
}
