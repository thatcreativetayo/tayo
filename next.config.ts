import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    remotePatterns: [],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Optimize production builds
  experimental: {
    optimizePackageImports: ['framer-motion', '@tiptap/react', '@hugeicons/react'],
  },
};

export default nextConfig;
