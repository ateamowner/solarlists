import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/config/site";

export const dynamic = "force-static";

const indexedPaths = [
  "/",
  "/about/",
  "/sources/",
  "/consult/",
  "/privacy/",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return indexedPaths.map((path) => ({
    url: canonicalUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/consult/" ? 0.6 : 0.5,
  }));
}
