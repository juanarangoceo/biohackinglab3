import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental',
    reactCompiler: true,
  },
  images: { formats: ['image/avif', 'image/webp'] },
  logging: { fetches: { fullUrl: true } }
};

export default nextConfig;
