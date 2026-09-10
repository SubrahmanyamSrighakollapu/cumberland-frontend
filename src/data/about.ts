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
    "Welcome to Cumberland Motor Inn, where a warm welcome and comfortable accommodation come together in the heart of Cessnock.",
  image: "/images/content-image-two.png",
  alt: "Cumberland Motor Inn exterior in Cessnock with warm lighting",
};

export const ourStoryData = {
  eyebrow: "OUR STORY",
  headingLines: ["Welcome to", "Cumberland Motor Inn."],
  paragraph1:
    "Welcome to Cumberland Motor Inn, where a warm welcome and comfortable accommodation come together in the heart of Cessnock.",
  paragraph2:
    "Whether you're visiting the Hunter Valley for a relaxing weekend away, exploring the region's renowned wineries and local attractions, travelling with family, or here for work or an event, our motel provides a convenient place to stay and unwind.",
  paragraph3:
    "With comfortable rooms, practical amenities and an outdoor swimming pool, we make it easy to relax after a day of discovering everything the Hunter Valley has to offer. Located close to Cessnock's shops, restaurants and local attractions, Cumberland Motor Inn puts you within easy reach of the vineyards, dining experiences and events that make the Hunter Valley such a popular destination.",
  accentLine: "Come for the Hunter Valley. Stay for the comfort.",
  image: "/images/content-image-one.png",
  alt: "Landscaped Cumberland Motor Inn grounds in Cessnock",
};

export const aboutStatsData: AboutStat[] = [
  {
    id: "rating",
    value: "4.5/5",
    label: "Guest Rating",
    iconName: "calendar",
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
    title: "Warm Welcome",
    description: "Friendly hosts who care about your stay.",
    iconName: "guests",
  },
  {
    id: "rooms",
    title: "Comfortable Rooms",
    description: "Spacious, air-conditioned rooms for a great night’s rest.",
    iconName: "bed",
  },
  {
    id: "location",
    title: "Convenient Location",
    description: "Close to wineries, dining, parks, state forests and local attractions.",
    iconName: "pin",
  },
  {
    id: "facilities",
    title: "Practical Amenities",
    description: "Outdoor swimming pool, free parking, free Wi-Fi, and guest laundry.",
    iconName: "coffee",
  },
];

export const cumberlandExperienceData = {
  eyebrow: "THE CUMBERLAND EXPERIENCE",
  headingLines: ["Easy stays,", "thoughtfully delivered."],
  description:
    "At Cumberland Motor Inn, we make it easy to relax, explore and enjoy everything the Hunter Valley has to offer. From comfortable rooms to helpful local tips, we’re here to ensure your stay is seamless and memorable.",
  image: "/images/content-image-three.png",
  alt: "Outdoor salt-water swimming pool at Cumberland Motor Inn",
  benefits: [
    {
      id: "rest",
      title: "Rest and Recharge",
      description: "Comfortable rooms and quiet surrounds for a better stay.",
      iconName: "bed",
    },
    {
      id: "explore",
      title: "Explore the Region",
      description: "Wineries, dining, golf, state forests and local events all close by.",
      iconName: "compass",
    },
    {
      id: "service",
      title: "Service You Can Rely On",
      description:
        "Friendly support and local knowledge, whenever you need it.",
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
  heading: "Come for the Hunter Valley. Stay for the comfort.",
  description:
    "Book your Cessnock stay and enjoy convenient access to Hunter Valley wineries, dining and attractions.",
  viewRoomsRoute: "/rooms",
  bookStayRoute: "/#availability",
};
