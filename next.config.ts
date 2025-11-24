import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Uncomment the basePath below if your repo name is NOT 'portfolio'
  basePath: '/portfolio',
};

export default nextConfig;
