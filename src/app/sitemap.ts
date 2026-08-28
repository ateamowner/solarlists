import type { MetadataRoute } from "next";
import { cities, servicePath, services, site } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/privacy"].map((path) => ({
    url: `${site.url}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.4,
  }));

  const cityRoutes = cities.flatMap((city) => [
    {
      url: `${site.url}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...services.map((service) => ({
      url: `${site.url}${servicePath(city, service)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority:
        service.slug === "tpo-solar" || service.slug === "solar-installation"
          ? 0.9
          : 0.7,
    })),
  ]);

  return [...staticRoutes, ...cityRoutes];
}
