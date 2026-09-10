import {
  RoomDetail,
  defaultAmenities,
  defaultStayInfo,
  roomsDataset,
  getAllRooms,
  getRoomBySlug,
} from "@/data/rooms";
import { normalizeAssetUrl } from "./mediaUrl";

export type { RoomDetail } from "@/data/rooms";

function normalizeGallerySrcs<T extends { src?: string; alt?: string }>(
  gallery: T[] | undefined,
  fallbackFirstSrc: string | undefined
): NonNullable<RoomDetail["gallery"]> {
  if (!gallery || !gallery.length) {
    return fallbackFirstSrc
      ? [
          {
            id: "gal-fallback-1",
            src: normalizeAssetUrl(fallbackFirstSrc),
            alt: "Room preview",
            caption: "",
          },
        ]
      : [];
  }
  return gallery.map((g, i) => {
    const rawSrc = g.src || "";
    const rawAlt = g.alt || `Room gallery image ${i + 1}`;
    const caption = (g as any).caption || "";
    return {
      id: `gal-${i}-${String(rawSrc).replace(/[^a-z0-9]/gi, "").slice(0, 12)}`,
      src: normalizeAssetUrl(rawSrc),
      alt: rawAlt,
      caption,
    };
  });
}

function transformApiItemToRoomDetail(item: any): RoomDetail {
  const primaryImage = item.primaryImage ?? item.primary_image ?? null;
  const galleryFromApi: any[] = Array.isArray(item.gallery)
    ? item.gallery
    : [];
  const gallery = normalizeGallerySrcs(galleryFromApi, primaryImage || undefined);
  const introFeatureTiles = (() => {
    if (item.intro?.featureTiles && Array.isArray(item.intro.featureTiles) && item.intro.featureTiles.length) {
      return item.intro.featureTiles;
    }
    const ft = item.intro_feature_tiles_json ?? item.intro?.featureTilesJson ?? null;
    const arr = Array.isArray(ft) ? ft : [];
    if (arr.length) return arr;
    const tiles: any[] = [];
    if (item.guestsLabel || item.guests_label) {
      tiles.push({ id: "auto-1", icon: "person" as const, label: item.guestsLabel || item.guests_label });
    }
    if (item.bedConfiguration || item.bed_configuration) {
      tiles.push({ id: "auto-2", icon: "bed" as const, label: item.bedConfiguration || item.bed_configuration });
    }
    if (item.areaLabel || item.area_label) {
      tiles.push({ id: "auto-3", icon: "area" as const, label: item.areaLabel || item.area_label });
    }
    if (item.balconyLabel || item.balcony_label) {
      tiles.push({ id: "auto-4", icon: "balcony" as const, label: item.balconyLabel || item.balcony_label });
    } else if (item.viewLabel || item.view_label) {
      tiles.push({ id: "auto-4", icon: "view" as const, label: item.viewLabel || item.view_label });
    }
    return tiles;
  })();

  const highlights = Array.isArray(item.highlights)
    ? item.highlights.filter(Boolean)
    : [];

  const related = Array.isArray(item.relatedRoomIds)
    ? item.relatedRoomIds.map(String)
    : [];

  return {
    id: String(item.id),
    slug: item.slug,
    name: item.name,
    eyebrow: item.eyebrow || "ROOM COLLECTION",
    shortDescription: item.shortDescription ?? item.short_description ?? "",
    price: Number(item.price ?? 0),
    currency: item.currency ?? "$",
    priceUnit: item.priceUnit ?? item.price_unit ?? "/ night",
    capacityGuests: Number(item.capacityGuests ?? item.capacity_guests ?? 0),
    guestsLabel: item.guestsLabel ?? item.guests_label ?? "",
    bedConfiguration: item.bedConfiguration ?? item.bed_configuration ?? "",
    areaM2:
      item.areaM2 ?? item.area_m2 ? Number(item.areaM2 ?? item.area_m2) : 0,
    areaLabel: item.areaLabel ?? item.area_label ?? "",
    viewLabel: item.viewLabel ?? item.view_label ?? "",
    balconyLabel: item.balconyLabel ?? item.balcony_label ?? "",
    seoTitle: item.seoTitle ?? item.seo_title ?? item.name,
    seoDescription:
      item.seoDescription ??
      item.seo_description ??
      item.shortDescription ??
      "",
    intro: {
      eyebrow: item.intro?.eyebrow ?? item.intro_eyebrow ?? "",
      heading:
        item.intro?.heading ?? item.intro_heading ?? item.name,
      paragraph1:
        item.intro?.paragraph1 ??
        item.intro_paragraph1 ??
        item.shortDescription ??
        "",
      paragraph2: item.intro?.paragraph2 ?? item.intro_paragraph2 ?? "",
      featureTiles: introFeatureTiles,
    },
    gallery,
    amenities: defaultAmenities,
    highlights,
    stayInfo: defaultStayInfo,
    relatedRoomIds: related,
  };
}

export function apiRoomToDetail(item: any): RoomDetail {
  return transformApiItemToRoomDetail(item);
}

export function fallbackRoomBySlug(slug: string): RoomDetail | undefined {
  const staticRoom = getRoomBySlug(slug);
  if (!staticRoom) return undefined;
  return {
    ...staticRoom,
    gallery: staticRoom.gallery.map((g) => ({
      ...g,
      src: normalizeAssetUrl(g.src),
    })),
  };
}

export function fallbackAllRooms(): RoomDetail[] {
  return getAllRooms().map((r) => ({
    ...r,
    gallery: r.gallery.map((g) => ({ ...g, src: normalizeAssetUrl(g.src) })),
  }));
}

export function fallbackFeaturedRooms(ids?: string[]): RoomDetail[] {
  const staticList = fallbackAllRooms();
  if (!ids || !ids.length) {
    return staticList.filter((r) => {
      const slug = r.slug;
      return (
        slug === "cove-king" || slug === "ocean-twin" || slug === "family-suite"
      );
    });
  }
  return ids
    .map((id) => staticList.find((r) => r.slug === id || r.id === id))
    .filter(Boolean) as RoomDetail[];
}

export function getRelatedRoomsFromIds(
  relatedIds: string[],
  lookupPool: RoomDetail[],
  currentSlug: string,
  fallbackCount = 3
): RoomDetail[] {
  const bySlug = new Map<string, RoomDetail>();
  lookupPool.forEach((r) => bySlug.set(r.slug, r));
  const found = relatedIds
    .map((id) => bySlug.get(id))
    .filter(Boolean) as RoomDetail[];
  if (found.length >= fallbackCount) return found.slice(0, Math.max(3, fallbackCount));
  const extras = lookupPool
    .filter((r) => r.slug !== currentSlug && !found.some((f) => f.slug === r.slug))
    .slice(0, Math.max(0, fallbackCount - found.length));
  return [...found, ...extras];
}

export function staticRoomsBySlug(): Record<string, RoomDetail> {
  return roomsDataset;
}
