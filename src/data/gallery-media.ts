export type GalleryCategory =
  | "All"
  | "Rooms"
  | "Property"
  | "Amenities"
  | "Dining"
  | "Experiences"
  | "Local Area";

export type GalleryMediaType = "image" | "video";

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, "All">;
  image: string;
  alt: string;
  description: string;
  mediaType: GalleryMediaType;
  duration?: string;
  layout: "wide" | "standard" | "tall";
  route?: string;
}

export interface HeroSlide {
  id: number;
  image: string;
  alt: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/images/hero-one.png",
    alt: "Outdoor salt-water swimming pool at Cumberland Motor Inn Cessnock",
  },
  {
    id: 2,
    image: "/images/hero-two.png",
    alt: "Cumberland Motor Inn exterior and landscaped grounds",
  },
  {
    id: 3,
    image: "/images/hero-three.png",
    alt: "Outdoor pool and relaxation area at Cumberland Motor Inn",
  },
];

export const galleryMediaDataset: Record<string, GalleryItem> = {
  "gal-1": {
    id: "gal-1",
    title: "Outdoor Swimming Pool",
    category: "Property",
    image: "/images/gallery-one.png",
    alt: "Cumberland Motor Inn outdoor salt-water swimming pool",
    description: "Relax, refresh and unwind in our outdoor salt-water swimming pool.",
    mediaType: "image",
    layout: "wide",
    route: "/about#amenities",
  },
  "gal-2": {
    id: "gal-2",
    title: "Deluxe Queen Room",
    category: "Rooms",
    image: "/images/room-one.png",
    alt: "Spacious Deluxe Queen Room at Cumberland Motor Inn",
    description: "Spacious air-conditioned Queen room with TV, microwave, fridge and tea/coffee making facilities.",
    mediaType: "image",
    layout: "wide",
    route: "/rooms/deluxe-queen-room",
  },
  "gal-3": {
    id: "gal-3",
    title: "Cumberland Motor Inn",
    category: "Property",
    image: "/images/content-image-one.png",
    alt: "Cumberland Motor Inn motel exterior in Cessnock",
    description: "Relaxed Cessnock accommodation set in the heart of the Hunter Valley.",
    mediaType: "image",
    layout: "standard",
    route: "/about",
  },
  "gal-4": {
    id: "gal-4",
    title: "Hunter Valley Dining",
    category: "Dining",
    image: "/images/eat-drink.png",
    alt: "Outdoor dining table with Hunter Valley wine glasses",
    description: "Enjoy local flavours, Cessnock bistros and cellar door dining.",
    mediaType: "image",
    layout: "standard",
    route: "/experiences/eat-and-drink",
  },
  "gal-5": {
    id: "gal-5",
    title: "Cessnock & Surroundings",
    category: "Local Area",
    image: "/images/gallery-three.png",
    alt: "Parks and state forests near Cessnock",
    description: "Parks, state forests and local attractions just moments from your stay.",
    mediaType: "image",
    layout: "standard",
    route: "/experiences/things-to-do",
  },
  "gal-6": {
    id: "gal-6",
    title: "Family Room",
    category: "Rooms",
    image: "/images/room-three.png",
    alt: "Spacious Family Room at Cumberland Motor Inn",
    description: "Large air-conditioned room with 2 single beds and 1 double bed for family stays.",
    mediaType: "image",
    layout: "standard",
    route: "/rooms/family-room",
  },
  "gal-7": {
    id: "gal-7",
    title: "Motel Amenities",
    category: "Amenities",
    image: "/images/gallery-four.png",
    alt: "On-site parking and motel facilities at Cumberland Motor Inn",
    description: "Off-street parking, free Wi-Fi and guest laundry facilities.",
    mediaType: "image",
    layout: "standard",
    route: "/about#amenities",
  },
  "gal-8": {
    id: "gal-8",
    title: "Wine Country",
    category: "Experiences",
    image: "/images/wine-country.png",
    alt: "Picturesque Hunter Valley vineyard rows",
    description: "Cellar doors, scenic drives and world-class regional wines.",
    mediaType: "image",
    layout: "standard",
    route: "/experiences/wine-country",
  },
  "gal-9": {
    id: "gal-9",
    title: "Deluxe Twin Room",
    category: "Rooms",
    image: "/images/gallery-two.png",
    alt: "Deluxe Twin Room interior",
    description: "Comfortable twin bedding configuration with 1 single bed and 1 double bed.",
    mediaType: "image",
    layout: "standard",
    route: "/rooms/deluxe-twin-room",
  },
  "gal-10": {
    id: "gal-10",
    title: "Cessnock Experiences",
    category: "Experiences",
    image: "/images/thinks-to-do.png",
    alt: "Cessnock Golf Course fairways",
    description: "Cessnock Golf Course, CPAC and surrounding Hunter Valley attractions.",
    mediaType: "image",
    layout: "tall",
    route: "/experiences/things-to-do",
  },
};

export const galleryItems: GalleryItem[] = Object.values(galleryMediaDataset);

export function getGalleryMediaById(id: string): GalleryItem | undefined {
  return galleryMediaDataset[id];
}
