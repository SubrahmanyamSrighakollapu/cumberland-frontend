import { testimonialsDataset, Review } from "./testimonials";
import { amenitiesDataset } from "./amenities";

export interface AboutStat {
  id: string;
  value: string;
  label: string;
  iconName: "calendar" | "bed" | "pin" | "guests";
}

export interface WhyChooseUsFeature {
  id: string;
  title: string;
  description: string;
  iconName: "guests" | "bed" | "pin" | "coffee";
}

export interface ExperienceBenefit {
  id: string;
  title: string;
  description: string;
  iconName: "bed" | "compass" | "guests";
}

export const aboutHeroData = {
  breadcrumbHome: "Home",
  breadcrumbCurrent: "About Us",
  eyebrow: "ABOUT CUMBERLAND",
  headingLines: ["Your comfortable base", "in Cessnock."],
  description:
    "Welcome to Cumberland Motor Inn, offering comfortable motel accommodation in Cessnock for visitors exploring the Hunter Valley.",
  image: "/images/cumberland-grounds-skyline-view.jpg",
  alt: "Cumberland Motor Inn grounds and outdoor pool beneath blue sky with clouds",
};

export const ourStoryData = {
  eyebrow: "OUR STORY",
  headingLines: ["Welcome to", "Cumberland Motor Inn."],
  paragraph1:
    "Welcome to Cumberland Motor Inn, where clean, comfortable motel accommodation and friendly hospitality come together in the heart of Cessnock.",
  paragraph2:
    "Whether you are visiting the Hunter Valley for a relaxing wine-tasting weekend, exploring regional dining and attractions, travelling with family, or visiting for work or an event, our motel provides a quiet, convenient base to unwind.",
  paragraph3:
    "Featuring air-conditioned rooms, an outdoor salt-water pool, free on-site parking, and a covered BBQ area, we make your stay easy and enjoyable. Located close to Cessnock CBD, shops, and restaurants, Cumberland Motor Inn places you within easy reach of the wineries, events, and natural beauty that make the Hunter Valley such a popular destination.",
  accentLine: "Come for the Hunter Valley. Stay for the comfort.",
  image: "/images/cumberland-building-facade-lawn.jpg",
  alt: "Exterior view of The Cumberland building facade and landscaped lawn",
};

export const aboutStatsData: AboutStat[] = [
  {
    id: "parking",
    value: "Free",
    label: "On-Site Parking",
    iconName: "pin",
  },
  {
    id: "location",
    value: "Cessnock",
    label: "Heart of Hunter Valley",
    iconName: "pin",
  },
  {
    id: "rooms",
    value: "28",
    label: "Comfortable Rooms",
    iconName: "bed",
  },
  {
    id: "pool",
    value: "Salt-Water",
    label: "Outdoor Pool",
    iconName: "guests",
  },
];

export const whyChooseUsData: WhyChooseUsFeature[] = [
  {
    id: "welcome",
    title: "Friendly Hospitality",
    description: "Welcoming hosts and dedicated local advice to help you enjoy your visit.",
    iconName: "guests",
  },
  {
    id: "rooms",
    title: "Versatile Room Choices",
    description: "Clean, air-conditioned motel rooms suited for solo travel, couples, and families.",
    iconName: "bed",
  },
  {
    id: "location",
    title: "Central Cessnock Location",
    description: "Minutes from Cessnock CBD, dining, golf, CPAC, and Pokolbin cellar doors.",
    iconName: "pin",
  },
  {
    id: "facilities",
    title: "Practical Facilities",
    description: "Outdoor salt-water pool, free on-site parking, free Wi-Fi, and covered BBQ area.",
    iconName: "coffee",
  },
];

export const cumberlandExperienceData = {
  eyebrow: "THE CUMBERLAND EXPERIENCE",
  headingLines: ["Easy stays,", "thoughtfully delivered."],
  description:
    "At Cumberland Motor Inn, we provide clean, quiet accommodation and practical amenities to make your Hunter Valley visit effortless, whether you are travelling for leisure, business, or family holidays.",
  image: "/images/cumberland-reception-pool-view.jpg",
  alt: "Outdoor salt-water swimming pool and reception grounds at Cumberland Motor Inn",
  benefits: [
    {
      id: "rest",
      title: "Rest and Recharge",
      description: "Air-conditioned rooms with comfortable bedding for a quiet night's rest.",
      iconName: "bed",
    },
    {
      id: "explore",
      title: "Explore the Region",
      description: "Easy access to wineries, Cessnock Golf Course, CPAC, and regional attractions.",
      iconName: "compass",
    },
    {
      id: "service",
      title: "Convenient Facilities",
      description: "Outdoor salt-water pool, free on-site parking, and guest laundry.",
      iconName: "guests",
    },
  ] as ExperienceBenefit[],
};

export const aboutAmenitiesData = [
  { id: "wifi", label: amenitiesDataset.wifi?.title || "Free WiFi", icon: "wifi" },
  { id: "parking", label: amenitiesDataset.parking?.title || "Free Parking", icon: "parking" },
  { id: "pool", label: amenitiesDataset.pool?.title || "Outdoor Swimming Pool", icon: "pool" },
  { id: "ev", label: amenitiesDataset.ev?.title || "Non-Smoking Rooms", icon: "ev" },
  { id: "kitchen", label: amenitiesDataset.kitchen?.title || "Accessible Facilities", icon: "kitchen" },
  { id: "bbq", label: amenitiesDataset.bbq?.title || "Family Rooms", icon: "bbq" },
];

export const featuredTestimonialId = "review-sarah-l";

const sarahTestimonial: Review = testimonialsDataset[featuredTestimonialId] || {
  id: "review-sarah-l",
  name: "Sarah L.",
  date: "March 2025",
  rating: 5,
  quote:
    "“The perfect base for exploring the Hunter Valley. Clean, comfortable and the friendliest staff. We’ll definitely be back!”",
  avatar: "/images/room-one.png",
};

export const aboutTestimonialData = {
  eyebrow: "WHAT OUR GUESTS SAY",
  heading: "A stay worth remembering.",
  quote: sarahTestimonial.quote,
  author: sarahTestimonial.name,
  date: sarahTestimonial.date,
  rating: sarahTestimonial.rating,
  image: sarahTestimonial.avatar,
  alt: sarahTestimonial.avatarAlt || "Guest room at Cumberland Motor Inn Cessnock",
};

export const aboutCtaData = {
  heading: "Plan your stay at Cumberland Motor Inn.",
  description:
    "Explore our room choices and enjoy convenient motel accommodation in Cessnock, gateway to the Hunter Valley.",
  viewRoomsRoute: "/rooms",
  bookStayRoute: "/#availability",
};
