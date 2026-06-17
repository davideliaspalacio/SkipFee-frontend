import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Marketing site: 100% estático (SSG) → exportado a HTML plano para Cloudflare.
  // No toca Supabase ni secretos: el form /pre-registro postea al backend
  // (NEXT_PUBLIC_API_URL/api/leads), que guarda el lead y avisa a Discord.
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
