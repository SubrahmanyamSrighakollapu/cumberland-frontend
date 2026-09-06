import {
  GalleryCategory,
  GalleryMediaType,
  GalleryItem,
  galleryItems,
} from "./gallery-media";

export type { GalleryCategory, GalleryMediaType, GalleryItem };
export { galleryItems };

export interface MoreExploreCard {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  actionText: string;
  route: string;
}

export const galleryHeroData = {
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Gallery",
  eyebrow: "OUR GALLERY",
  headingLines: ["A closer look", "at your stay."],
  description:
    "Real spaces, beautiful surrounds and memorable moments await at Cumberland Motor Inn.",
  image: "/images/room-one.png",
  alt: "Ocean view guest room with balcony doors overlooking the coastline",
};

export const galleryIntroData = {
  eyebrow: "PHOTO & VIDEO GALLERY",
  heading: "Explore Cumberland Motor Inn.",
  description:
    "Browse our gallery and get a feel for the relaxed coastal experience that awaits.",
};

export const galleryCategories: GalleryCategory[] = [
  "All",
  "Rooms",
  "Property",
  "Amenities",
  "Dining",
  "Experiences",
  "Local Area",
];

export const moreToExploreCards: MoreExploreCard[] = [
  {
    id: "explore-1",
    title: "Restful Rooms",
    description: "Stylish, comfortable rooms for every stay.",
    image: "/images/room-two.png",
    alt: "Ocean Twin room with two queen beds",
    actionText: "VIEW ROOMS →",
    route: "/rooms",
  },
  {
    id: "explore-2",
    title: "Thoughtful Facilities",
    description: "Everything you need for a relaxing stay.",
    image: "/images/gallery-five.png",
    alt: "Poolside lounger chairs under evening umbrella light",
    actionText: "VIEW AMENITIES →",
    route: "/about#amenities",
  },
  {
    id: "explore-3",
    title: "Explore the Region",
    description: "Beaches, vineyards and local attractions.",
    image: "/images/gallery-seven.png",
    alt: "Scenic coastal viewpoint overlooking the bay",
    actionText: "VIEW EXPERIENCES →",
    route: "/experiences/wine-country",
  },
];

export const galleryCtaData = {
  heading: "Ready to make your own memories?",
  description: "Book your coastal escape and look forward to brighter days.",
  exploreRoomsRoute: "/rooms",
  bookStayRoute: "/#availability",
};
