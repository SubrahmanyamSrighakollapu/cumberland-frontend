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
    image: "/images/cumberland-main-exterior-day.jpg",
    alt: "Cumberland Motor Inn main exterior and accommodation suites under blue skies",
  },
  {
    id: 2,
    image: "/images/cumberland-grounds-skyline-view.jpg",
    alt: "Panoramic view of Cumberland Motor Inn grounds, outdoor pool and skyline",
  },
  {
    id: 3,
    image: "/images/cumberland-reception-pool-view.jpg",
    alt: "Elevated view of Cumberland Motor Inn reception building and outdoor salt-water pool",
  },
];

export const galleryMediaDataset: Record<string, GalleryItem> = {
  "gal-1": {
    id: "gal-1",
    title: "Outdoor Swimming Pool",
    category: "Property",
    image: "/images/cumberland-reception-pool-view.jpg",
    alt: "Cumberland Motor Inn outdoor salt-water swimming pool and reception grounds",
    description: "Relax, refresh and unwind in our outdoor salt-water swimming pool.",
    mediaType: "image",
    layout: "wide",
    route: "/about#amenities",
  },
  "gal-2": {
    id: "gal-2",
    title: "Guest Accommodation Suites",
    category: "Rooms",
    image: "/images/cumberland-courtyard-accommodation-day.jpg",
    alt: "Cumberland Motor Inn two-story guest accommodation wing",
    description: "Spacious air-conditioned accommodation with convenient ground and first floor access.",
    mediaType: "image",
    layout: "wide",
    route: "/rooms",
  },
  "gal-3": {
    id: "gal-3",
    title: "Cumberland Motor Inn Exterior",
    category: "Property",
    image: "/images/cumberland-main-exterior-day.jpg",
    alt: "Cumberland Motor Inn main motel exterior in Cessnock",
    description: "Relaxed Cessnock accommodation set in the heart of the Hunter Valley.",
    mediaType: "image",
    layout: "standard",
    route: "/about",
  },
  "gal-4": {
    id: "gal-4",
    title: "Covered BBQ Lounge",
    category: "Amenities",
    image: "/images/cumberland-outdoor-bbq-area.jpg",
    alt: "Covered outdoor BBQ area under brick arches with seating and grill",
    description: "Enjoy outdoor dining and social gatherings in our covered brick arch BBQ lounge.",
    mediaType: "image",
    layout: "standard",
    route: "/about#amenities",
  },
  "gal-5": {
    id: "gal-5",
    title: "Conference & Meeting Room",
    category: "Property",
    image: "/images/cumberland-conference-room.jpg",
    alt: "Spacious function and meeting room setup at Cumberland Motor Inn",
    description: "Equipped function room ideal for corporate meetings, events and group gatherings.",
    mediaType: "image",
    layout: "standard",
    route: "/about",
  },
  "gal-6": {
    id: "gal-6",
    title: "Courtyard Guest Suites",
    category: "Rooms",
    image: "/images/cumberland-courtyard-panoramic-day.jpg",
    alt: "Wide courtyard parking and two-story brick accommodation wing",
    description: "Quiet courtyard rooms with dedicated parking within the motel right outside.",
    mediaType: "image",
    layout: "standard",
    route: "/rooms",
  },
  "gal-7": {
    id: "gal-7",
    title: "Covered Carport Parking",
    category: "Amenities",
    image: "/images/cumberland-covered-carport-night.jpg",
    alt: "Illuminated covered carport parking area at night at Cumberland Motor Inn",
    description: "Covered parking within the motel and well-lit entryways for peace of mind.",
    mediaType: "image",
    layout: "standard",
    route: "/about#amenities",
  },
  "gal-8": {
    id: "gal-8",
    title: "Motel Grounds & Gardens",
    category: "Property",
    image: "/images/cumberland-building-facade-lawn.jpg",
    alt: "Landscaped lawn and brick facade of Cumberland Motor Inn",
    description: "Manicured gardens and pristine brick architecture under Hunter Valley skies.",
    mediaType: "image",
    layout: "standard",
    route: "/about",
  },
  "gal-9": {
    id: "gal-9",
    title: "Courtyard Garden Feature",
    category: "Property",
    image: "/images/cumberland-courtyard-wishing-well.jpg",
    alt: "Stone garden arch and wishing well in Cumberland Motor Inn courtyard",
    description: "Charming stone garden arch and courtyard features throughout the property.",
    mediaType: "image",
    layout: "standard",
    route: "/about",
  },
  "gal-10": {
    id: "gal-10",
    title: "Cumberland Motor Inn Sign",
    category: "Property",
    image: "/images/cumberland-pylon-sign-day.jpg",
    alt: "Cumberland Motor Inn roadside pylon sign showing 3.5 star rating in Cessnock",
    description: "Easily accessible location on Main Street, Cessnock, close to all Hunter Valley attractions.",
    mediaType: "image",
    layout: "tall",
    route: "/contact",
  },
  "gal-11": {
    id: "gal-11",
    title: "Reception Walkway",
    category: "Property",
    image: "/images/cumberland-reception-brick-archway.jpg",
    alt: "Brick archway corridor leading to reception office",
    description: "Welcoming brick archway entrance to our front reception office.",
    mediaType: "image",
    layout: "standard",
    route: "/about",
  },
  "gal-12": {
    id: "gal-12",
    title: "Illuminated Signage at Night",
    category: "Property",
    image: "/images/cumberland-pylon-sign-night.jpg",
    alt: "Illuminated Cumberland Motor Inn pylon sign at night",
    description: "Well-lit entrance sign making arrival late in the evening easy and secure.",
    mediaType: "image",
    layout: "standard",
    route: "/contact",
  },
  "gal-13": {
    id: "gal-13",
    title: "Balcony Courtyard View",
    category: "Property",
    image: "/images/cumberland-balcony-courtyard-view.jpg",
    alt: "View looking down from guest balcony across courtyard and grounds",
    description: "Elevated courtyard view from first-floor guest room balconies.",
    mediaType: "image",
    layout: "wide",
    route: "/rooms",
  },
};

export const galleryItems: GalleryItem[] = Object.values(galleryMediaDataset);

export function getGalleryMediaById(id: string): GalleryItem | undefined {
  return galleryMediaDataset[id];
}
