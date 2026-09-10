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
    "Real spaces, comfortable rooms, outdoor salt-water pool and beautiful surrounds await at Cumberland Motor Inn.",
  image: "/images/room-one.png",
  alt: "Guest room at Cumberland Motor Inn Cessnock",
};

export const galleryIntroData = {
  eyebrow: "PHOTO GALLERY",
  heading: "Explore Cumberland Motor Inn.",
  description:
    "Browse our gallery and explore our comfortable Cessnock accommodation, outdoor salt-water pool, and Hunter Valley surroundings.",
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
    title: "Comfortable Rooms",
    description: "Spacious air-conditioned rooms for every stay.",
    image: "/images/room-two.png",
    alt: "Deluxe Twin Room at Cumberland Motor Inn",
    actionText: "VIEW ROOMS →",
    route: "/rooms",
  },
  {
    id: "explore-2",
    title: "Motel Facilities",
    description: "Outdoor salt-water pool, free parking and guest laundry.",
    image: "/images/gallery-five.png",
    alt: "Outdoor swimming pool area at Cumberland Motor Inn",
    actionText: "VIEW AMENITIES →",
    route: "/about#amenities",
  },
  {
    id: "explore-3",
    title: "Explore the Hunter Valley",
    description: "Wineries, dining, golf courses and local attractions.",
    image: "/images/gallery-seven.png",
    alt: "Hunter Valley vineyards and countryside",
    actionText: "VIEW EXPERIENCES →",
    route: "/experiences/wine-country",
  },
];

export const galleryCtaData = {
  heading: "Ready to make your own memories?",
  description: "Book your stay in Cessnock and enjoy convenient access to the Hunter Valley.",
  exploreRoomsRoute: "/rooms",
  bookStayRoute: "/#availability",
};
