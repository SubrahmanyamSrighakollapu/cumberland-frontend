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
    alt: "Coastal motel pool overlooking the water at sunset",
  },
  {
    id: 2,
    image: "/images/hero-two.png",
    alt: "Cumberland Motor Inn balcony and landscaped courtyard",
  },
  {
    id: 3,
    image: "/images/hero-three.png",
    alt: "Waterfront motel terrace and pool during golden hour",
  },
];

export const galleryMediaDataset: Record<string, GalleryItem> = {
  "gal-1": {
    id: "gal-1",
    title: "Pool & Sun Deck",
    category: "Property",
    image: "/images/gallery-one.png",
    alt: "Cumberland Motor Inn swimming pool and sun loungers under palm trees",
    description: "Relax by our heated outdoor pool with sweeping ocean views.",
    mediaType: "image",
    layout: "wide",
    route: "/about#amenities",
  },
  "gal-2": {
    id: "gal-2",
    title: "Ocean View Room",
    category: "Rooms",
    image: "/images/room-one.png",
    alt: "Spacious king bedroom with private balcony facing the water",
    description: "Wake up to stunning ocean views from your private balcony.",
    mediaType: "image",
    layout: "wide",
    route: "/rooms/cove-king",
  },
  "gal-3": {
    id: "gal-3",
    title: "Our Boutique Motel",
    category: "Property",
    image: "/images/content-image-one.png",
    alt: "Renovated two-storey motel exterior and landscaped entrance",
    description: "Renovated coastal architecture surrounded by tropical gardens.",
    mediaType: "image",
    layout: "standard",
    route: "/about",
  },
  "gal-4": {
    id: "gal-4",
    title: "Waterfront Dining",
    category: "Dining",
    image: "/images/eat-drink.png",
    alt: "Outdoor dining table with wine glasses overlooking the water",
    description: "Enjoy local flavors and fresh seafood by the water.",
    mediaType: "image",
    layout: "standard",
    route: "/experiences/eat-and-drink",
  },
  "gal-5": {
    id: "gal-5",
    title: "Cumberland Beach",
    category: "Local Area",
    image: "/images/gallery-three.png",
    alt: "Secluded sandy cove and turquoise ocean bay",
    description: "Pristine beaches and quiet swimming coves just moments away.",
    mediaType: "image",
    layout: "standard",
    route: "/experiences/things-to-do",
  },
  "gal-6": {
    id: "gal-6",
    title: "Family Suite & Lounge",
    category: "Rooms",
    image: "/images/room-three.png",
    alt: "Spacious family suite with living area and comfortable seating",
    description: "Extra space for special family getaways and longer stays.",
    mediaType: "image",
    layout: "standard",
    route: "/rooms/family-suite",
  },
  "gal-7": {
    id: "gal-7",
    title: "BBQ & Outdoor Area",
    category: "Amenities",
    image: "/images/gallery-four.png",
    alt: "Shaded outdoor barbecue area and dining tables",
    description: "Gather with family and friends in our outdoor barbecue area.",
    mediaType: "image",
    layout: "standard",
    route: "/about#amenities",
  },
  "gal-8": {
    id: "gal-8",
    title: "Wine Country",
    category: "Experiences",
    image: "/images/wine-country.png",
    alt: "Picturesque vineyard rows during golden hour sunset",
    description: "Cellar doors, scenic drives and world-class regional wines.",
    mediaType: "image",
    layout: "standard",
    route: "/experiences/wine-country",
  },
  "gal-9": {
    id: "gal-9",
    title: "Private Balcony Room",
    category: "Rooms",
    image: "/images/gallery-two.png",
    alt: "Guest room interior with open sliding glass doors to balcony",
    description: "Boutique accommodations designed for real rest and relaxation.",
    mediaType: "image",
    layout: "standard",
    route: "/rooms/ocean-twin",
  },
  "gal-10": {
    id: "gal-10",
    title: "Coastal Adventures",
    category: "Experiences",
    image: "/images/thinks-to-do.png",
    alt: "Kayakers paddling across calm blue ocean water at dusk",
    description: "Explore coastal walking trails, bike paths and kayaking bays.",
    mediaType: "image",
    layout: "tall",
    route: "/experiences/things-to-do",
  },
};

export const galleryItems: GalleryItem[] = Object.values(galleryMediaDataset);

export function getGalleryMediaById(id: string): GalleryItem | undefined {
  return galleryMediaDataset[id];
}
