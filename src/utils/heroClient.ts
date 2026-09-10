import { heroSlides } from "@/data/gallery-media";
import { homeHeroContent } from "@/data/home";

export interface HeroSlide {
  id: string | number;
  slug: string;
  image: string;
  alt: string;
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface HeroSlideRow extends HeroSlide {
  id: string;
}

export interface HeroSlideApi {
  id: number | string;
  slug: string;
  image: string;
  alt: string;
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  sortOrder: number;
  sort_order?: number;
  isPublished: boolean;
  is_published?: boolean;
}

const API_BASE =
  (typeof process !== "undefined" &&
    (process.env.NEXT_PUBLIC_API_BASE_URL as string | undefined)) ||
  "/api";

export function stringToSlug(s: string): string {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "untitled";
}

export function apiToHeroSlide(item: Record<string, unknown>): HeroSlideRow {
  const pick = <T,>(k: string, fallback: T): T => {
    const v = (item as any)[k];
    return (v === null || v === undefined ? fallback : v) as T;
  };
  return {
    id: String(pick("id", "") || pick("slug", "")),
    slug: pick("slug", ""),
    image: pick("image", ""),
    alt: pick("alt", ""),
    eyebrow: pick("eyebrow", ""),
    headingLine1: pick("headingLine1", pick("heading_line_1", "")),
    headingLine2: pick("headingLine2", pick("heading_line_2", "")),
    description: pick("description", ""),
    sortOrder: Number(pick("sortOrder", pick("sort_order", 0)) ?? 0),
    isPublished: (() => {
      const v = pick("isPublished", pick("is_published", 1 as unknown as boolean | number | string) as unknown as boolean | number | string | null | undefined) as unknown;
      if (v === false || v === 0 || v === "false" || v === "0") return false;
      return true;
    })(),
    createdAt: pick("createdAt", pick("created_at", null)) as string | null,
    updatedAt: pick("updatedAt", pick("updated_at", null)) as string | null,
  };
}

export function fallbackHeroSlides(): HeroSlideRow[] {
  const eyebrowByIndex = [
    "Boutique Waterfront Retreat",
    "Coastal Poolside Escape",
    "Golden Hour Waterfront Views",
  ];
  return (heroSlides?.length ? heroSlides : []).map((s, i) => ({
    id: String(s.id),
    slug: `hero-slide-${s.id}`,
    image: s.image,
    alt: s.alt,
    eyebrow: eyebrowByIndex[i] ?? "Boutique Waterfront Retreat",
    headingLine1: homeHeroContent.headingLines[0] ?? "Make room for",
    headingLine2: homeHeroContent.headingLines[1] ?? "the good days.",
    description:
      homeHeroContent.description ??
      "Boutique coastal stays, warmer days and unforgettable moments by the water.",
    sortOrder: i + 1,
    isPublished: true,
    createdAt: null,
    updatedAt: null,
  }));
}

export async function fetchHeroSlides(
  options: { publishedOnly?: boolean; token?: string } = {}
): Promise<HeroSlideRow[]> {
  const { publishedOnly = true, token } = options;
  const params = new URLSearchParams();
  if (publishedOnly) params.set("published_only", "true");
  params.set("sort", "sort_order_asc");
  params.set("limit", "50");
  const url = `${API_BASE}/hero-slides${
    params.toString() ? `?${params.toString()}` : ""
  }`;
  try {
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(url, { headers, cache: "no-store" });
    if (!res.ok) return [];
    const json = (await res.json()) as any;
    const items = Array.isArray(json) ? json : json?.items ?? [];
    return items.map((x: any) => apiToHeroSlide(x));
  } catch {
    return [];
  }
}

export async function createHeroSlide(payload: {
  image?: File;
  slug?: string;
  alt: string;
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  sortOrder?: number;
  isPublished?: boolean;
  token: string;
}): Promise<HeroSlideRow> {
  const fd = new FormData();
  if (payload.image) fd.append("image", payload.image);
  const obj = {
    slug: payload.slug || stringToSlug(payload.headingLine1),
    alt: payload.alt,
    eyebrow: payload.eyebrow,
    headingLine1: payload.headingLine1,
    headingLine2: payload.headingLine2,
    description: payload.description,
    sortOrder: payload.sortOrder ?? 0,
    isPublished: payload.isPublished ?? true,
  };
  Object.entries(obj).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    fd.append(k, typeof v === "string" || typeof v === "number" || typeof v === "boolean" ? String(v) : (v as any));
  });
  const res = await fetch(`${API_BASE}/hero-slides`, {
    method: "POST",
    headers: { Authorization: `Bearer ${payload.token}` },
    body: fd,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.message || "Failed to create hero slide.");
  return apiToHeroSlide((json.data ?? json) as any);
}

export async function updateHeroSlide(
  id: string,
  payload: {
    image?: File | null;
    slug?: string;
    alt?: string;
    eyebrow?: string;
    headingLine1?: string;
    headingLine2?: string;
    description?: string;
    sortOrder?: number;
    isPublished?: boolean;
    token: string;
  }
): Promise<HeroSlideRow> {
  const fd = new FormData();
  if (payload.image) fd.append("image", payload.image);
  const obj: Record<string, any> = {};
  (["slug", "alt", "eyebrow", "headingLine1", "headingLine2", "description"] as const).forEach((k) => {
    if ((payload as any)[k] !== undefined) obj[k] = (payload as any)[k];
  });
  if (payload.sortOrder !== undefined) obj.sortOrder = payload.sortOrder;
  if (payload.isPublished !== undefined) obj.isPublished = payload.isPublished;
  Object.entries(obj).forEach(([k, v]) => {
    fd.append(k, typeof v === "boolean" ? (v ? "1" : "0") : String(v));
  });
  const res = await fetch(`${API_BASE}/hero-slides/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${payload.token}` },
    body: fd,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.message || "Failed to update hero slide.");
  return apiToHeroSlide((json.data ?? json) as any);
}

export async function toggleHeroSlidePublish(
  id: string,
  token: string
): Promise<{ id: string; isPublished: boolean }> {
  const res = await fetch(
    `${API_BASE}/hero-slides/${encodeURIComponent(id)}/toggle-publish`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
  const json = await res.json();
  if (!res.ok) throw new Error(json?.message || "Failed to toggle publish.");
  const d = json.data ?? json;
  return {
    id: String(d?.id ?? id),
    isPublished: !(d?.isPublished === false || d?.isPublished === 0 || d?.isPublished === "false"),
  };
}

export async function deleteHeroSlide(id: string, token: string): Promise<string> {
  const res = await fetch(`${API_BASE}/hero-slides/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error((json as any)?.message || "Failed to delete hero slide.");
  }
  return id;
}
