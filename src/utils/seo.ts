import type { Metadata } from "next";
import type { RoomDetail } from "@/data/rooms";

export const SITE_ORIGIN = "https://www.cumberlandmotorinn.com.au";
export const SITE_NAME = "Cumberland Motor Inn";

export interface PageSeoContent {
  title: string;
  description: string;
  keywords?: string[];
  targetPhrases?: string[]; // Internal editorial planning data, not emitted to meta keywords
  canonical: string;
  socialImage?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  noIndex?: boolean;
}

export function sanitizeKeywords(keywords: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const kw of keywords) {
    if (!kw) continue;
    const trimmed = kw.trim();
    if (!trimmed) continue;
    const lower = trimmed.toLowerCase();
    if (!seen.has(lower)) {
      seen.add(lower);
      result.push(trimmed);
    }
  }

  return result;
}

export function generateRoomKeywords(room: RoomDetail): string[] {
  const candidates: string[] = [
    room.name,
    `${room.name} Cessnock`,
    `Cumberland Motor Inn ${room.name}`,
    `${room.name.toLowerCase()} in Cessnock`,
    `Cessnock ${room.name.toLowerCase()} booking`,
  ];

  if (room.bedConfiguration) {
    candidates.push(`${room.bedConfiguration} Cessnock`);
    candidates.push(`${room.bedConfiguration.toLowerCase()} room Cessnock`);
  }

  const nameLower = room.name.toLowerCase();
  const slugLower = room.slug.toLowerCase();

  if (slugLower.includes("single") || slugLower.includes("business") || nameLower.includes("single") || nameLower.includes("business")) {
    candidates.push(
      "business travel accommodation Cessnock",
      "solo travel accommodation Cessnock",
      "single motel room Cessnock"
    );
  }

  if (nameLower.includes("queen") || slugLower.includes("queen")) {
    candidates.push(
      "accommodation for couples in Cessnock",
      "queen room in Cessnock",
      "queen motel room Cessnock",
      "Cessnock queen room booking"
    );
  }

  if (nameLower.includes("twin") || slugLower.includes("twin")) {
    candidates.push(
      "twin room in Cessnock",
      "twin motel room Cessnock",
      "rooms for friends in Cessnock",
      "shared room accommodation Cessnock",
      "Cessnock twin room booking"
    );
  }

  if (nameLower.includes("family") || slugLower.includes("family")) {
    candidates.push(
      "Family Room Cessnock",
      "family accommodation in Cessnock",
      "family motel rooms Cessnock",
      "family stays near the Hunter Valley",
      "accommodation for families visiting the Hunter Valley",
      "Cessnock family room booking"
    );
  }

  candidates.push(
    "air conditioned room Cessnock",
    "Hunter Valley room accommodation",
    "motel room booking Cessnock"
  );

  return sanitizeKeywords(candidates);
}

export function buildRouteMetadata(seo: PageSeoContent): Metadata {
  const canonicalUrl = seo.canonical.startsWith("http")
    ? seo.canonical
    : `${SITE_ORIGIN}${seo.canonical.startsWith("/") ? seo.canonical : "/" + seo.canonical}`;

  const defaultImageUrl = `${SITE_ORIGIN}/images/cumberland-main-exterior-day.jpg`;
  const defaultImageAlt = "Cumberland Motor Inn entrance and exterior in Cessnock";

  const imageUrl = seo.socialImage?.url
    ? seo.socialImage.url.startsWith("http")
      ? seo.socialImage.url
      : `${SITE_ORIGIN}${seo.socialImage.url.startsWith("/") ? seo.socialImage.url : "/" + seo.socialImage.url}`
    : defaultImageUrl;

  const imageAlt = seo.socialImage?.alt || defaultImageAlt;

  const openGraphImages = [
    {
      url: imageUrl,
      alt: imageAlt,
      ...(seo.socialImage?.width && { width: seo.socialImage.width }),
      ...(seo.socialImage?.height && { height: seo.socialImage.height }),
    },
  ];

  const sanitizedKeywords = seo.keywords ? sanitizeKeywords(seo.keywords) : undefined;

  return {
    title: seo.title,
    description: seo.description,
    ...(sanitizedKeywords && sanitizedKeywords.length > 0 && { keywords: sanitizedKeywords }),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: seo.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
        },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_AU",
      type: "website",
      images: openGraphImages,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [imageUrl],
    },
  };
}

