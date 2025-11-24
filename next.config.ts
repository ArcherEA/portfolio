import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Uncomment the basePath below if your repo name is NOT 'portfolio'
  basePath: '/portfolio',
  assetPrefix: "/portfolio",
};

export default nextConfig;
