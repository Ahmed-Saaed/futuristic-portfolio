import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Default to standard `.next` so Vercel deployments always find `/vercel/path0/.next`
  distDir: process.env.NEXT_BUILD_DIR || '.next',
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
