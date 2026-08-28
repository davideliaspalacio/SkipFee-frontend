import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "", priority: 1 },
    { path: "/para-tus-clientes", priority: 0.8 },
    { path: "/para-tu-negocio", priority: 0.9 },
    { path: "/precios", priority: 0.9 },
    { path: "/pre-registro", priority: 0.7 },
  ];
  const staticRoutes: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r.priority,
  }));

  const blogRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE.url}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...blogPosts.map((post) => ({
      url: `${SITE.url}/blog/${post.slug}`,
      lastModified: new Date(`${post.updated}T12:00:00-05:00`),
      changeFrequency: "monthly" as const,
      priority: post.featured ? 0.78 : 0.72,
    })),
  ];

  return [...staticRoutes, ...blogRoutes];
}
