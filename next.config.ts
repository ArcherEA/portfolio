import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile at the drive root otherwise
  // makes Next infer the wrong root (see build warning).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
