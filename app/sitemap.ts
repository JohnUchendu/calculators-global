import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/constants";
import { GEO_CONFIGS, type GeoKey } from "@/lib/geo";

const BASE_URL = "https://www.moneytoolslab.com";

const GEO_KEYS: GeoKey[] = ["nigeria", "uk", "us", "canada"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Static pages ────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url:              BASE_URL,
      lastModified:     now,
      changeFrequency:  "weekly",
      priority:         1.0,
    },
  ];

  // ── Base tool pages (global) ─────────────────
  const baseToolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url:             `${BASE_URL}/${tool.slug}`,
    lastModified:    now,
    changeFrequency: "monthly" as const,
    priority:        0.9,
  }));

  // ── Geo variant pages ────────────────────────
  const geoPages: MetadataRoute.Sitemap = TOOLS.flatMap((tool) =>
    GEO_KEYS.map((geoKey) => ({
      url:             `${BASE_URL}/${tool.slug}${GEO_CONFIGS[geoKey].urlSuffix}`,
      lastModified:    now,
      changeFrequency: "monthly" as const,
      priority:        0.8,
    }))
  );

  return [...staticPages, ...baseToolPages, ...geoPages];
}