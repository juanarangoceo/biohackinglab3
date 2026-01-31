import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // ppr: 'incremental', // Disabled until stable/fixed
    // reactCompiler: true, // Disabled until stable
  },
  images: { formats: ['image/avif', 'image/webp'] },
  logging: { fetches: { fullUrl: true } }
};

export default nextConfig;
