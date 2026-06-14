import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Marketing site: fully static (SSG) → exported to plain HTML for Cloudflare Pages.
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
