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
  headingLines: ["Your comfortable base for", "exploring the Hunter Valley."],
  description:
    "Comfortable accommodation in Cessnock, offering easy access to Hunter Valley wineries, dining, attractions and surrounding experiences.",
};

export const welcomeData = {
  eyebrow: "WELCOME",
  headingLines: ["A comfortable stay in the", "heart of the Hunter Valley."],
  paragraph1:
    "Cumberland Motor Inn is a relaxed Cessnock stay where comfort, convenience and country charm come together.",
  paragraph2:
    "Set in the heart of Cessnock, we're perfectly placed for exploring Hunter Valley wineries, local dining, events and attractions, while giving you a comfortable place to unwind at the end of the day.",
  learnMoreRoute: "/about",
  trustIndicators: [
    {
      id: "parking",
      primary: "Free Parking",
      secondary: "On-site parking",
      icon: "car",
    },
    {
      id: "location",
      primary: "Cessnock",
      secondary: "Hunter Valley",
      icon: "pin",
    },
    {
      id: "rooms",
      primary: "29 Rooms",
      secondary: "Comfortable stays",
      icon: "home",
    },
  ],
};

export const featuredRoomIds = [
  "deluxe-queen-room",
  "deluxe-twin-room",
  "family-room",
  "business-single-room",
];

export const featuredRooms: Room[] = featuredRoomIds
  .map((id) => {
    const room = roomsDataset[id];
    if (!room) return null;
    return {
      id: room.id,
      slug: room.slug,
      name: room.name,
      description: room.shortDescription,
      image: room.gallery[0]?.src || "/images/cumberland-main-exterior-day.jpg",
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
    description: "Cellar doors, vineyards and wine country experiences nearby.",
    image: "/images/wine-country.png",
    route: "/experiences/wine-country",
  },
  {
    id: "eat-and-drink",
    slug: "eat-and-drink",
    title: "Eat & Drink",
    description: "Covered BBQ area, Cessnock cafes and regional dining.",
    image: "/images/cumberland-outdoor-bbq-area.jpg",
    route: "/experiences/eat-and-drink",
  },
  {
    id: "things-to-do",
    slug: "things-to-do",
    title: "Things to Do",
    description: "From Cessnock Golf Course to state forests and CPAC.",
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
    id: "golf",
    destination: "Cessnock Golf Course",
    duration: "5 mins",
    iconName: "town",
  },
  {
    id: "cpac",
    destination: "Performing Arts Centre",
    duration: "Short walk",
    iconName: "town",
  },
  {
    id: "vineyard",
    destination: "Hunter Valley Wineries",
    duration: "10 mins",
    iconName: "vineyard",
  },
];
