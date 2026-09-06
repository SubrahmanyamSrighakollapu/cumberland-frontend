import { roomsDataset } from "./rooms";
import { Amenity, amenitiesDataset } from "./amenities";
import { Review, testimonialsDataset } from "./testimonials";
import { galleryMediaDataset } from "./gallery-media";

export interface Room {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  guests: string;
  bed: string;
  amenities: string[];
  price: number;
}

export type { Amenity, Review };

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface Experience {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  route: string;
}

export interface TravelTime {
  id: string;
  destination: string;
  duration: string;
  iconName: "beach" | "town" | "vineyard";
}

export const homeHeroContent = {
  headingLines: ["Make room for", "the good days."],
  description:
    "Boutique coastal stays, warmer days and unforgettable moments by the water.",
};

export const welcomeData = {
  eyebrow: "WELCOME",
  headingLines: ["A relaxed stay", "by the water."],
  paragraph1:
    "Cumberland Motor Inn is a boutique coastal escape where laid-back comfort meets the simple joys of waterfront living.",
  paragraph2:
    "Wake to ocean views, spend your days exploring nearby bays and vineyards, and return to modern comforts designed for real getaways.",
  learnMoreRoute: "/about",
  trustIndicators: [
    {
      id: "rating",
      primary: "4.8/5",
      secondary: "Guest rating",
      icon: "star",
    },
    {
      id: "location",
      primary: "Waterfront",
      secondary: "Prime location",
      icon: "pin",
    },
    {
      id: "renovated",
      primary: "Recently renovated",
      secondary: "Modern comforts",
      icon: "home",
    },
  ],
};

export const featuredRoomIds = ["cove-king", "ocean-twin", "family-suite"];

export const featuredRooms: Room[] = featuredRoomIds
  .map((id) => {
    const room = roomsDataset[id];
    if (!room) return null;
    return {
      id: room.id,
      slug: room.slug,
      name: room.name,
      description: room.shortDescription,
      image: room.gallery[0]?.src || "/images/room-one.png",
      guests: room.guestsLabel,
      bed: room.bedConfiguration,
      amenities: room.highlights.slice(0, 3),
      price: room.price,
    };
  })
  .filter((r): r is Room => r !== null);

export const featuredAmenityIds = [
  "pool",
  "parking",
  "wifi",
  "ev",
  "kitchen",
  "bbq",
];

export const amenitiesList: Amenity[] = featuredAmenityIds
  .map((id) => amenitiesDataset[id])
  .filter((a): a is Amenity => Boolean(a));

export const experiencesList: Experience[] = [
  {
    id: "wine-country",
    slug: "wine-country",
    title: "Wine Country",
    description: "Cellar doors, scenic drives and unhurried afternoons.",
    image: "/images/wine-country.png",
    route: "/experiences/wine-country",
  },
  {
    id: "eat-and-drink",
    slug: "eat-and-drink",
    title: "Eat & Drink",
    description: "Local flavours and waterfront dining.",
    image: "/images/eat-drink.png",
    route: "/experiences/eat-and-drink",
  },
  {
    id: "things-to-do",
    slug: "things-to-do",
    title: "Things to Do",
    description: "From bike adventures to coastal walks.",
    image: "/images/thinks-to-do.png",
    route: "/experiences/things-to-do",
  },
];

export const featuredReviewIds = ["review-1", "review-2", "review-3"];

export const guestReviews: Review[] = featuredReviewIds
  .map((id) => testimonialsDataset[id])
  .filter((r): r is Review => Boolean(r));

export const galleryPreviewIds = [
  "gal-1",
  "gal-2",
  "gal-3",
  "gal-4",
  "gal-5",
];

export const galleryImages: GalleryImage[] = galleryPreviewIds
  .map((id) => {
    const item = galleryMediaDataset[id];
    if (!item) return null;
    return {
      id: item.id,
      src: item.image,
      alt: item.alt,
    };
  })
  .filter((g): g is GalleryImage => g !== null);

export const travelTimes: TravelTime[] = [
  {
    id: "beach",
    destination: "Coastal Beach",
    duration: "2 mins",
    iconName: "beach",
  },
  {
    id: "town",
    destination: "Town Centre",
    duration: "6 mins",
    iconName: "town",
  },
  {
    id: "vineyard",
    destination: "Vineyard Region",
    duration: "25 mins",
    iconName: "vineyard",
  },
];
