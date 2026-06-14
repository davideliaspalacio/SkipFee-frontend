import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Marketing site: fully static-friendly (SSG). Keep it lean and fast.
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
