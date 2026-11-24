import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Isolate production build output when NEXT_BUILD_DIR is set so `next build` never corrupts a live `next dev` server
  distDir: process.env.NEXT_BUILD_DIR || '.next-dev',
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;

