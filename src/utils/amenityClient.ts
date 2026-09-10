import { apiFetch } from "./apiClient";
import { Amenity, amenitiesDataset, amenitiesList } from "@/data/amenities";
import {
  RoomAmenityItem,
  defaultAmenities,
} from "@/data/rooms";

export interface ApiAmenity {
  id: string;
  slug: string;
  category: "home" | "room";
  title: string;
  description: string | null;
  iconKey: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const HOME_ICON_SET = new Set([
  "pool",
  "parking",
  "wifi",
  "ev",
  "kitchen",
  "bbq",
]);
const ROOM_ICON_SET = new Set([
  "wifi",
  "ac",
  "tv",
  "fridge",
  "coffee",
  "desk",
  "shower",
  "balcony",
  "parking",
  "non-smoking",
]);

export function apiToHomeAmenity(item: ApiAmenity): Amenity {
  const iconName = HOME_ICON_SET.has(item.iconKey)
    ? (item.iconKey as Amenity["iconName"])
    : "wifi";
  return {
    id: item.slug || item.id,
    title: item.title,
    description: item.description || "",
    iconName,
  };
}

export function apiToRoomAmenity(item: ApiAmenity): RoomAmenityItem {
  const icon = ROOM_ICON_SET.has(item.iconKey) ? item.iconKey : "wifi";
  return {
    id: item.slug || item.id,
    title: item.title,
    icon,
    description: item.description || undefined,
  };
}

export function fallbackHomeAmenities(): Amenity[] {
  return amenitiesList.slice();
}

export function fallbackRoomAmenities(): RoomAmenityItem[] {
  return defaultAmenities.slice();
}

export async function fetchHomeAmenities(): Promise<Amenity[]> {
  try {
    const res = await apiFetch(
      "/amenities?category=home&published_only=true&limit=200&offset=0&sort=sort_order_asc"
    );
    const items: ApiAmenity[] = Array.isArray(res?.data?.items)
      ? res.data.items
      : [];
    return items.map(apiToHomeAmenity);
  } catch {
    return [];
  }
}

export async function fetchRoomAmenities(): Promise<RoomAmenityItem[]> {
  try {
    const res = await apiFetch(
      "/amenities?category=room&published_only=true&limit=200&offset=0&sort=sort_order_asc"
    );
    const items: ApiAmenity[] = Array.isArray(res?.data?.items)
      ? res.data.items
      : [];
    return items.map(apiToRoomAmenity);
  } catch {
    return [];
  }
}

export function homeWithFallback(dynamic: Amenity[] | null): Amenity[] {
  if (dynamic && dynamic.length > 0) return dynamic;
  if (dynamic && !dynamic.length) return fallbackHomeAmenities();
  return fallbackHomeAmenities();
}

export function roomWithFallback(
  dynamic: RoomAmenityItem[] | null
): RoomAmenityItem[] {
  if (dynamic && dynamic.length > 0) return dynamic;
  if (dynamic && !dynamic.length) return fallbackRoomAmenities();
  return fallbackRoomAmenities();
}

export const HOME_ICON_OPTIONS: {
  value: string;
  label: string;
}[] = [
  { value: "pool", label: "Pool" },
  { value: "parking", label: "Parking" },
  { value: "wifi", label: "Wi-Fi" },
  { value: "ev", label: "EV Charging" },
  { value: "kitchen", label: "Kitchenette" },
  { value: "bbq", label: "BBQ Area" },
];

export const ROOM_ICON_OPTIONS: {
  value: string;
  label: string;
}[] = [
  { value: "wifi", label: "Wi-Fi" },
  { value: "ac", label: "Air Conditioning" },
  { value: "tv", label: "Smart TV" },
  { value: "fridge", label: "Mini Fridge" },
  { value: "coffee", label: "Coffee / Tea" },
  { value: "desk", label: "Work Desk" },
  { value: "shower", label: "Rain Shower" },
  { value: "balcony", label: "Balcony / Patio" },
  { value: "parking", label: "Parking" },
  { value: "non-smoking", label: "Non-Smoking" },
];

export function stringToSlug(s: string) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
