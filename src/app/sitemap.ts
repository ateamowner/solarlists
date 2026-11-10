import type { MetadataRoute } from "next";
import {
  canonicalUrl,
  cities,
  cityPath,
  services,
} from "@/config/site";

import {
  cityPageLastmod,
  homePageLastmod,
  staticPageLastmod,
} from "@/lib/lastmod";

export const dynamic = "force-static";

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
    lastModified:
      item.path === "/"
        ? homePageLastmod()
        : staticPageLastmod(`src/app${item.path}page.tsx`),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  const liveCities = cities.filter((city) => city.status === "live");
  // One guide per city. /<city>/<service>/ URLs are redirect stubs (2026-10-23) and stay out of the sitemap.
  const cityRoutes = liveCities.flatMap((city) => [
    {
      url: canonicalUrl(cityPath(city)),
      lastModified: cityPageLastmod(
        city.slug,
        services.map((service) => service.slug)
      ),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ]);

  return [...education, ...cityRoutes];
}
