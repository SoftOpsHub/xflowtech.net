import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static site, no backend: `next build` emits a fully static `out/` directory.
  output: 'export',
  images: { unoptimized: true },
  reactCompiler: true,
};

export default nextConfig;
