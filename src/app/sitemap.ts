import type { MetadataRoute } from "next";
import {
  canonicalUrl,
  cities,
  cityPath,
  servicePath,
  services,
} from "@/config/site";

export const dynamic = "force-static";

/** Stable lastmod for the 2026-09-23 local-index restore. */
const restored = new Date("2026-09-23T00:00:00.000Z");

const educationPaths = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about/", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/sources/", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/consult/", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/privacy/", priority: 0.4, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const education = educationPaths.map((item) => ({
    url: canonicalUrl(item.path),
    lastModified: restored,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  const liveCities = cities.filter((city) => city.status === "live");
  const cityRoutes = liveCities.flatMap((city) => [
    {
      url: canonicalUrl(cityPath(city)),
      lastModified: restored,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...services.map((service) => ({
      url: canonicalUrl(servicePath(city, service)),
      lastModified: restored,
      changeFrequency: "weekly" as const,
      priority:
        service.slug === "tpo-solar" || service.slug === "solar-installation"
          ? 0.9
          : 0.7,
    })),
  ]);

  return [...education, ...cityRoutes];
}
