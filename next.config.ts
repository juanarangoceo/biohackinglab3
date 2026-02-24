import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // ppr: 'incremental', // Disabled until stable/fixed
    // reactCompiler: true, // Disabled until stable
  },
  images: { 
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      }
    ]
  },
  logging: { fetches: { fullUrl: true } }
};

export default nextConfig;
