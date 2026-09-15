import { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/utils/seo";
import { getAllPublishedRoomsServer, BackendUnavailableError } from "@/utils/publicDataLoader";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticLastMod = new Date("2026-09-15T00:00:00.000Z");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_ORIGIN}/`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_ORIGIN}/about`,
      lastModified: staticLastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_ORIGIN}/rooms`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_ORIGIN}/experiences`,
      lastModified: staticLastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_ORIGIN}/experiences/wine-country`,
      lastModified: staticLastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_ORIGIN}/experiences/eat-and-drink`,
      lastModified: staticLastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_ORIGIN}/experiences/things-to-do`,
      lastModified: staticLastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_ORIGIN}/gallery`,
      lastModified: staticLastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_ORIGIN}/contact`,
      lastModified: staticLastMod,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_ORIGIN}/privacy-policy`,
      lastModified: staticLastMod,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_ORIGIN}/terms-and-conditions`,
      lastModified: staticLastMod,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  try {
    const rooms = await getAllPublishedRoomsServer();
    const roomRoutes: MetadataRoute.Sitemap = rooms.map((room) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rawDate = (room as any).updatedAt || (room as any).updated_at || (room as any).createdAt;
      const modDate = rawDate ? new Date(rawDate) : staticLastMod;

      return {
        url: `${SITE_ORIGIN}/rooms/${room.slug}`,
        lastModified: isNaN(modDate.getTime()) ? staticLastMod : modDate,
        changeFrequency: "weekly",
        priority: 0.8,
      };
    });

    return [...staticRoutes, ...roomRoutes];
  } catch (err: unknown) {
    if (err instanceof BackendUnavailableError) {
      // If CMS backend API is uncontactable during static build, return static indexable pages sitemap
      return staticRoutes;
    }
    throw err;
  }
}
