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
    "Browse authentic photographs of our Cessnock motel rooms, grounds, outdoor salt-water pool and surrounding Hunter Valley region before booking.",
  image: "/images/cumberland-main-exterior-day.jpg",
  alt: "Real view of Cumberland Motor Inn exterior and guest suites in Cessnock",
};

export const galleryIntroData = {
  eyebrow: "PHOTO GALLERY",
  heading: "Explore Cumberland Motor Inn.",
  description:
    "Explore real photographs of our comfortable Cessnock motel accommodation, outdoor salt-water pool, covered BBQ lounge, and Hunter Valley surroundings.",
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
    image: "/images/cumberland-courtyard-accommodation-day.jpg",
    alt: "Cumberland Motor Inn guest room accommodation wing",
    actionText: "VIEW ROOMS →",
    route: "/rooms",
  },
  {
    id: "explore-2",
    title: "Motel Facilities",
    description: "Outdoor salt-water pool, free parking and guest laundry.",
    image: "/images/cumberland-reception-pool-view.jpg",
    alt: "Outdoor salt-water pool and reception grounds at Cumberland Motor Inn",
    actionText: "VIEW AMENITIES →",
    route: "/about#amenities",
  },
  {
    id: "explore-3",
    title: "Outdoor BBQ & Lounge",
    description: "Covered brick arch BBQ lounge and outdoor seating area.",
    image: "/images/cumberland-outdoor-bbq-area.jpg",
    alt: "Covered outdoor BBQ area and grounds at Cumberland Motor Inn",
    actionText: "VIEW AMENITIES →",
    route: "/about#amenities",
  },
];

export const galleryCtaData = {
  heading: "Ready to make your own memories?",
  description: "Book your stay in Cessnock and enjoy convenient access to the Hunter Valley.",
  exploreRoomsRoute: "/rooms",
  bookStayRoute: "/#availability",
};
