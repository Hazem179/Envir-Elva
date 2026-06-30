/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static ./out folder (no SSR/server features in this app),
  // ideal for Cloudflare Pages / any CDN.
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // keep unoptimized so the app can be exported as fully static (CDN-friendly).
    // Source images in /public should be pre-compressed (WebP/AVIF) for best perf.
    unoptimized: true,
  },
  // Trim client bundles by tree-shaking heavy libraries' named imports.
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', 'date-fns'],
  },
}

export default nextConfig
