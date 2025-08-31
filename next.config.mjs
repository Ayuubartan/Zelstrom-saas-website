// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'], // optional bundle tweak
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['logo.clearbit.com', 'cdn.brand.com', 'images.ctfassets.net'],
  },
}

export default nextConfig
