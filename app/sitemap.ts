import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "", priority: 1 },
    { path: "/para-tus-clientes", priority: 0.8 },
    { path: "/para-tu-negocio", priority: 0.9 },
    { path: "/precios", priority: 0.9 },
  ];
  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: r.priority,
  }));
}
